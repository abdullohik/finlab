/* FinLab sync server — the smallest possible backend for cross-device progress.
   Serves the static site AND a tiny JSON API, from the same origin, so the
   page's existing CSP (default-src 'self') needs no changes for fetch() to work.

   No accounts, no passwords: a device is identified by a random code it
   generates itself (see js/engine.js `ensureSyncCode`). Anyone who has the
   code can read/overwrite that code's progress — that's the deliberate
   tradeoff for "no login," and is fine here because the data is just lesson
   completions and XP, nothing sensitive. */
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const PORT = process.env.PORT || 3000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('railway') ? { rejectUnauthorized: false } : false,
});

const CODE_RE = /^[A-Z2-9]{4,6}-[A-Z2-9]{4,6}$/;
const MAX_BODY_BYTES = 60 * 1024; // generous for a progress blob (completed ids, xp, quiz answers) — rejects abuse, not real usage

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS progress (
      code TEXT PRIMARY KEY,
      state JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

// Minimal in-memory rate limit — best-effort abuse guard, not a security
// boundary. Resets on redeploy; that's fine for this use case.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60_000, max = 60;
  const arr = (hits.get(ip) || []).filter(t => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // crude memory guard for a long-running process
  return arr.length > max;
}

const app = express();
app.use(express.json({ limit: MAX_BODY_BYTES }));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/sync/:code', async (req, res) => {
  const code = String(req.params.code || '').toUpperCase();
  if (!CODE_RE.test(code)) return res.status(400).json({ ok: false, error: 'bad_code' });
  if (rateLimited(req.ip)) return res.status(429).json({ ok: false, error: 'rate_limited' });
  try {
    const r = await pool.query('SELECT state, updated_at FROM progress WHERE code = $1', [code]);
    if (!r.rows.length) return res.status(404).json({ ok: false, error: 'not_found' });
    res.json({ ok: true, state: r.rows[0].state, updatedAt: r.rows[0].updated_at });
  } catch (e) {
    console.error('GET /api/sync error', e);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.post('/api/sync/:code', async (req, res) => {
  const code = String(req.params.code || '').toUpperCase();
  if (!CODE_RE.test(code)) return res.status(400).json({ ok: false, error: 'bad_code' });
  if (rateLimited(req.ip)) return res.status(429).json({ ok: false, error: 'rate_limited' });
  const state = req.body && req.body.state;
  if (!state || typeof state !== 'object' || !Array.isArray(state.completed)) {
    return res.status(400).json({ ok: false, error: 'bad_state' });
  }
  // Trim to only the fields we actually sync — never trust/store arbitrary extra keys.
  const clean = {
    xp: Number(state.xp) || 0,
    completed: Array.isArray(state.completed) ? state.completed.filter(x => typeof x === 'string').slice(0, 500) : [],
    quizAnswers: (state.quizAnswers && typeof state.quizAnswers === 'object') ? state.quizAnswers : {},
    streak: Number(state.streak) || 1,
    recall: (state.recall && typeof state.recall === 'object') ? state.recall : {},
  };
  try {
    await pool.query(
      `INSERT INTO progress (code, state, updated_at) VALUES ($1, $2, now())
       ON CONFLICT (code) DO UPDATE SET state = $2, updated_at = now()`,
      [code, JSON.stringify(clean)]
    );
    res.json({ ok: true, updatedAt: new Date().toISOString() });
  } catch (e) {
    console.error('POST /api/sync error', e);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`FinLab listening on :${PORT}`));
  })
  .catch(e => {
    console.error('DB init failed, starting server anyway (static site still works):', e);
    app.listen(PORT, () => console.log(`FinLab listening on :${PORT} (no DB)`));
  });
