# FinLab — Finance Education Platform

Finance education for students breaking into investment banking, private equity, and credit.

The same analytical frameworks used by analysts at banks, PE firms, and credit funds — taught from first principles, with real examples and live calculators you're encouraged to break on purpose.

## What's Inside
- 21-lesson learning path across 6 modules (Financial Statements → Excel & Modeling → Valuation → Deals & Transactions → Advanced Analysis → Recruiting & Fit) — every module ends with its own capstone quiz, plus one comprehensive 12-question Final Assessment spanning all six
- A dedicated **Excel & Modeling** module — shortcuts, the blue/black/green formatting convention, the nine-step three-statement build order, and how professionals handle circularity, checks, and debugging. The mechanics a modelling test actually assesses, not just the theory
- **How the Three Statements Link** — the single most-asked technical interview question, including the full "$10 of depreciation" walkthrough and four practice variants
- **WACC & Cost of Capital** — CAPM, the components, unlevering/relevering beta, and why a one-point WACC change moves a DCF 15–25%
- 6 live calculators: DCF (with an honest "undefined" state when WACC ≤ terminal growth), LBO (real debt paydown with a D&A tax shield, so taxes are levied on EBIT less interest rather than on EBITDA), Comps, Accretion/Dilution, Credit Ratios, and a Football Field valuation-range builder
- Recall Drills — flashcard-style practice over the glossary that tests whether you can actually produce an answer, not just recognize one from four multiple-choice options; missed terms resurface first next session
- 5 guided Deal Room case studies (sell-side M&A, PE buyout, corporate M&A, credit/restructuring, and a beginner comps-only case), each with a **worked solution** gated behind a deliberate click — reference ranges, step-by-step reasoning, a recommendation, and the most common mistake
- A downloadable completion certificate (client-side canvas → PNG, no backend) once every lesson and quiz is done
- Module 6 covers the non-technical half of breaking in — story/behavioral fit, networking and cold outreach, and resume — not just DCF/LBO mechanics
- 53-term searchable finance glossary, filterable by category (Statements, Valuation, Deals, Credit, Careers)
- Two standalone, crawlable guide articles (`/guides/`) outside the app shell, for anyone who lands from search rather than the homepage
- A one-click "Found a mistake? Report it" link (pre-filled GitHub issue, contextual to whatever page you're on) — no backend needed
- XP, streak, and quiz progress persisted locally in the browser (`localStorage`) — refreshing the page doesn't wipe progress
- **Optional cross-device sync, no accounts**: a device generates a random code (e.g. `7K3P-LM9Q`) and, once turned on, syncs progress to a small backend in the background — no repeated copy/paste. A second device links to that code once, either by tapping a link (`?sync=CODE`) or typing the code, and after that both devices stay in sync automatically. Off by default; the manual export/import code (below) still works with zero backend, e.g. on a static-only deployment
- **Back up / restore progress** (no server, works offline): progress can also be exported as a portable text code and restored on another device or browser by pasting it in. Restoring merges rather than overwrites, so it never deletes work done locally
- The home CTA resumes at your first unfinished lesson rather than always restarting at lesson one, and switches to "Get your certificate" once everything is done
- Self-hosted fonts (no third-party font-CDN requests), keyboard-navigable UI with a real WCAG-AA-checked color palette, and a responsive layout down to phone widths
- Every page has a real, shareable URL (`#/dcf`, `#/deal-atlas`, ...) that survives refresh and works with the browser back/forward buttons

## Architecture
Static site, no build step: `index.html` (shell) + `css/style.css` + `js/data.js` (all lesson/quiz/glossary/deal content, data-only) + `js/engine.js` (renderer, state, calculators, router). Adding a lesson means adding an object to `js/data.js`, not writing markup — lesson subtitles ("Module 3 · Lesson 2 of 5") are derived from position at render time, so inserting a lesson never requires renumbering its siblings.

Navigation is hash-based (`location.hash` + a `hashchange` listener) — `js/engine.js`'s `renderRoute(id)` is the single dispatcher: lesson ids render a lesson page, everything else (`home`, `dealroom`, `deal-atlas`, ...) renders whatever page element matches `#page-<id>`. Adding a new top-level page or Deal Room case is automatically linkable without touching the router.

The app still works as a pure static site (e.g. GitHub Pages) with zero backend — every `fetch('/api/...')` call in the sync feature fails silently and falls back to local-only behavior. `server.js` is an *optional* thin layer on top: a small Express server that serves the exact same static files and adds two JSON endpoints (`GET`/`POST /api/sync/:code`) backed by Postgres, for deployments that want cross-device sync turned on. `package.json` exists only for that optional server (`npm start` → `node server.js`); GitHub Pages ignores it entirely.

## Analytics & data
There's no third-party analytics script, and the CSP stays locked to `'self'` — nothing about a student's usage is ever sent to a third party. Every meaningful interaction — page views, lesson views/completions, quiz answers, calculator opens — flows through one function, `track(event, props)` in `js/engine.js`, which mirrors to `console.debug` and keeps the last 200 events in `sessionStorage` (`FinLabDebug.events()` in devtools).

The one exception is the opt-in cross-device **sync** feature: turning it on sends lesson-completion/XP/quiz-answer state to `server.js`, keyed by a random per-device code — no accounts, no PII, and off by default. See `server.js` for exactly what's stored (nothing beyond that state).

## Live Demo
👉 https://abdullohik.github.io/finlab

## Built by
Abdulloh Khabibullaev — Economics & IR, Webster University Tashkent
