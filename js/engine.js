/* FinLab engine — renders everything in data.js, owns app state, runs the calculators. */
(function(){
'use strict';

/* ---------------- STATE + PERSISTENCE ---------------- */
const STORE_KEY = 'finlab_state_v1';
// Grouped by MODULES order (not raw array order) so prev/next navigation always
// matches the sidebar's visual grouping, regardless of where a lesson was
// inserted into the LESSONS array in data.js.
const NAV_ORDER = MODULES.flatMap(m => LESSONS.filter(l => l.module === m.id).map(l => l.id));
const LESSON_BY_ID = Object.fromEntries(LESSONS.map(l => [l.id, l]));

function todayStr(){ return new Date().toISOString().slice(0,10); }

function loadState(){
  let s;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch(e){ s = null; }
  if (!s) s = { xp:0, completed:[], quizAnswers:{}, lastVisit:null, streak:0 };
  const today = todayStr();
  if (s.lastVisit !== today) {
    if (s.lastVisit) {
      const diffDays = Math.round((new Date(today) - new Date(s.lastVisit)) / 86400000);
      s.streak = diffDays === 1 ? (s.streak||0) + 1 : 1;
    } else {
      s.streak = 1;
    }
    s.lastVisit = today;
  } else if (!s.streak) {
    s.streak = 1;
  }
  return s;
}
const STATE = loadState();
function saveState(){ try { localStorage.setItem(STORE_KEY, JSON.stringify(STATE)); } catch(e){ /* private-browsing/quota — progress just won't persist this session */ } }
saveState();

function addXP(n){ STATE.xp += n; saveState(); byId('xpCount').textContent = STATE.xp; }

/* ---------------- ANALYTICS HOOK ----------------
   No third-party network calls — the CSP stays locked to 'self' and nothing
   about a student's usage leaves their browser. track() is the single choke
   point every interaction flows through, so wiring in a real backend later
   (Plausible, GoatCounter, a custom endpoint) is a one-function edit here,
   not a hunt through the codebase — see README for how. Until then it keeps
   a small rolling local event log for local debugging via
   FinLabDebug.events() in the browser console. */
const MAX_EVENTS = 200;
function track(event, props){
  try {
    const entry = { t:Date.now(), event, props:props||{} };
    const log = JSON.parse(sessionStorage.getItem('finlab_events_v1') || '[]');
    log.push(entry);
    if (log.length > MAX_EVENTS) log.splice(0, log.length - MAX_EVENTS);
    sessionStorage.setItem('finlab_events_v1', JSON.stringify(log));
  } catch(e){ /* best-effort only — must never block the UI */ }
  if (window.console && console.debug) console.debug('[finlab:event]', event, props||{});
}
window.FinLabDebug = { events: () => { try { return JSON.parse(sessionStorage.getItem('finlab_events_v1')||'[]'); } catch(e){ return []; } } };

/* ---------------- SMALL HELPERS ---------------- */
function byId(id){ return document.getElementById(id); }
function el(tag, attrs, ...kids){
  const n = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    if (k === 'html') n.innerHTML = attrs[k];
    else if (k === 'text') n.textContent = attrs[k];
    else if (k.startsWith('on') && typeof attrs[k] === 'function') n.addEventListener(k.slice(2), attrs[k]);
    else if (k === 'class') n.className = attrs[k];
    else n.setAttribute(k, attrs[k]);
  }
  for (const kid of kids) if (kid != null) n.append(kid.nodeType ? kid : document.createTextNode(kid));
  return n;
}
function fmtB(n){
  const sign = n < 0 ? '-' : '';
  n = Math.abs(n);
  if (n >= 1e9) return sign+'$'+(n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return sign+'$'+(n/1e6).toFixed(1)+'M';
  return sign+'$'+Math.round(n).toLocaleString();
}
function clamp(v,lo,hi){ return Math.max(lo, Math.min(hi, v)); }
function hashStr(s){
  // Small stable FNV-1a-style hash — used to key quiz answers by question
  // content instead of array index, so inserting/reordering a question in
  // data.js can't silently attach an old saved answer to a different question.
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}

/* ---------------- CONTENT BLOCK RENDERING ---------------- */
function renderConceptBody(b){
  if (b.a) return el('div', { class:'concept-a', html:b.a });
  if (b.steps) {
    const wrap = el('div', { class:'concept-a' });
    const list = el('div', { class:'steps-list' });
    b.steps.forEach((s,i) => {
      list.append(el('div', { class:'step-item' },
        el('div', { class:'step-num', 'aria-hidden':'true' }, String(i+1)),
        el('div', { class:'step-text', html:`<strong>${s.t}</strong> — ${s.d}` })
      ));
    });
    wrap.append(list);
    return wrap;
  }
  if (b.keyterms) return renderKeyTerms(b.keyterms);
  return el('div');
}
function renderKeyTerms(items){
  const grid = el('div', { class:'key-terms' });
  items.forEach(k => grid.append(el('div', { class:'key-term' },
    el('div', { class:'key-term-name', text:k.n }),
    el('div', { class:'key-term-def', text:k.d })
  )));
  return grid;
}
function renderBlock(b){
  switch(b.type){
    case 'concept': {
      const wrap = el('div', { class:'concept-block' });
      wrap.append(el('div', { class:'block-label', text:b.label }));
      wrap.append(el('div', { class:'concept-q', text:b.q }));
      wrap.append(renderConceptBody(b));
      return wrap;
    }
    case 'analogy':
      return el('div', { class:'analogy-block' },
        el('div', { class:'analogy-label' }, '💡 Think of it this way'),
        el('div', { html:b.text }));
    case 'warn':
      return el('div', { class:'warn-block' },
        el('div', { class:'warn-label' }, '⚠ ' + b.label),
        el('div', { html:b.text }));
    case 'insight':
      return el('div', { class:'insight-block' },
        el('div', { class:'insight-label' }, '💡 Insight'),
        el('div', { html:b.text }));
    case 'realworld': {
      const wrap = el('div', { class:'real-world' },
        el('div', { class:'rw-label' }, '🌍 Real Example — ' + b.label),
        el('div', { class:'rw-body', html:b.body }));
      return wrap;
    }
    case 'formula':
      return el('div', { class:'formula-card', html:b.html });
    case 'keyterms': {
      const wrap = el('div', { class:'concept-block' });
      wrap.append(el('div', { class:'block-label', text:'Key Terms' }));
      wrap.append(renderKeyTerms(b.items));
      return wrap;
    }
    default: return el('div');
  }
}

/* ---------------- QUIZ RENDERING ---------------- */
function quizKey(lessonId, q){ return lessonId + '-' + hashStr(q.q); }

function renderQuiz(lessonId, quiz){
  const container = el('div');
  quiz.forEach((q, qi) => {
    const key = quizKey(lessonId, q);
    const block = el('fieldset', { class:'quiz-block' });
    block.append(el('legend', { class:'quiz-q', text:(qi+1)+'. '+q.q }));
    const optsWrap = el('div', { class:'quiz-options', role:'radiogroup' });
    const feedback = el('div', { class:'quiz-feedback', id:key+'-fb' });
    const retryBtn = el('button', { type:'button', class:'quiz-retry', text:'↺ Try again' });
    retryBtn.style.display = 'none';

    function paint(){
      const rec = STATE.quizAnswers[key];
      optsWrap.querySelectorAll('.quiz-option').forEach((btn, oi) => {
        btn.classList.remove('correct','wrong');
        btn.disabled = !!rec;
        if (rec) {
          if (oi === q.correct) btn.classList.add('correct');
          else if (oi === rec.chosen) btn.classList.add('wrong');
        }
      });
      if (rec) {
        feedback.className = 'quiz-feedback show ' + (rec.chosen === q.correct ? 'ok' : 'no');
        feedback.textContent = rec.chosen === q.correct
          ? '✓ Correct!' + (rec.xpAwarded ? ' +10 XP' : '') + (q.why ? ' — ' + q.why : '')
          : '✗ Not quite — the highlighted option is correct. Review the lesson above, then try again.';
        retryBtn.style.display = rec.chosen === q.correct ? 'none' : 'inline-block';
      } else {
        feedback.className = 'quiz-feedback';
        retryBtn.style.display = 'none';
      }
    }

    q.opts.forEach((optText, oi) => {
      const btn = el('button', { type:'button', class:'quiz-option', role:'radio', 'aria-checked':'false' },
        el('span', { class:'quiz-radio', 'aria-hidden':'true' }),
        el('span', {}, optText)
      );
      btn.addEventListener('click', () => {
        if (STATE.quizAnswers[key]) return;
        const correct = oi === q.correct;
        const xpAwarded = correct;
        STATE.quizAnswers[key] = { chosen:oi, xpAwarded };
        saveState();
        if (correct) addXP(10);
        track('quiz_answer', { lessonId, correct });
        paint();
      });
      optsWrap.append(btn);
    });

    retryBtn.addEventListener('click', () => {
      delete STATE.quizAnswers[key];
      saveState();
      paint();
    });

    block.append(optsWrap, feedback, retryBtn);
    paint();
    container.append(block);
  });
  return container;
}

/* ---------------- SIDEBAR ---------------- */
function buildSidebar(){
  const nav = byId('sidebarNav');
  nav.innerHTML = '';
  const section = el('div', { class:'sidebar-section' });
  section.append(el('div', { class:'sidebar-label' }, 'Learning Path'));
  let lessonNum = 0;
  MODULES.forEach((mod, mi) => {
    if (mi > 0) section.append(el('div', { class:'sidebar-divider' }));
    LESSONS.filter(l => l.module === mod.id).forEach(l => {
      const isQuiz = l.type === 'quiz';
      const dotLabel = isQuiz ? (l.id === 'final-quiz' ? '🏆' : '★') : String(++lessonNum);
      const tagClass = isQuiz ? 'tag-quiz' : 'tag-lesson';
      const tagText = isQuiz ? 'Quiz' : 'Lesson';
      const item = el('button', { type:'button', class:'path-item', id:'path-'+l.id },
        el('span', { class:'path-connector' },
          el('span', { class:'path-dot', id:'dot-'+l.id }, dotLabel),
          l !== LESSONS[LESSONS.length-1] ? el('span', { class:'path-line', id:'line-'+l.id }) : el('span')
        ),
        el('span', { class:'path-content' },
          el('div', { class:'path-title', text:l.title }),
          el('div', { class:'path-meta' },
            el('span', { class:'path-tag '+tagClass }, tagText),
            ' ' + l.minutes + ' min')
        )
      );
      item.addEventListener('click', () => openLesson(l.id));
      section.append(item);
    });
  });
  nav.append(section);
  applyCompletionState();
}

function applyCompletionState(){
  NAV_ORDER.forEach(id => {
    const dot = byId('dot-'+id), line = byId('line-'+id), item = byId('path-'+id);
    if (!dot) return;
    const done = STATE.completed.includes(id);
    dot.classList.toggle('done', done);
    if (done && LESSON_BY_ID[id].type !== 'quiz') dot.textContent = '✓';
    if (line) line.classList.toggle('done', done);
    if (item) item.classList.toggle('active', false);
  });
  const pct = Math.round(STATE.completed.length / NAV_ORDER.length * 100);
  byId('progressPct').textContent = pct + '%';
  byId('progressFill').style.width = pct + '%';
  byId('xpCount').textContent = STATE.xp;
  byId('streakCount').textContent = STATE.streak;
  renderCertSection();
}

/* ---------------- COMPLETION CERTIFICATE ----------------
   Fully client-side (canvas → PNG download) — no backend, no accounts.
   Honest about what it is: self-paced coursework completion, not an
   accredited credential (says so on the certificate itself). */
function renderCertSection(){
  const section = byId('certSection');
  if (!section) return;
  section.innerHTML = '';
  const isComplete = NAV_ORDER.length > 0 && STATE.completed.length === NAV_ORDER.length;
  if (!isComplete) return;

  const card = el('div', { class:'cert-card' },
    el('div', { style:'font-size:28px;', 'aria-hidden':'true' }, '🎓'),
    el('div', { class:'cert-card-title' }, "You've completed the FinLab curriculum!"),
    el('div', { class:'cert-card-sub' }, `${NAV_ORDER.length} lessons, ${STATE.xp} XP. Download a certificate to share — enter your name as you'd like it to appear.`)
  );
  const nameInput = el('input', { type:'text', class:'cert-name-input', placeholder:'Your name', value: STATE.studentName || '', 'aria-label':'Your name for the certificate' });
  const dlBtn = el('button', { type:'button', class:'hero-cta', style:'margin-top:0;color:white;background:var(--blue-dk);', text:'⬇ Download Certificate' });
  nameInput.addEventListener('input', () => { STATE.studentName = nameInput.value; saveState(); });
  dlBtn.addEventListener('click', () => {
    const name = (nameInput.value || 'A FinLab Student').trim();
    track('certificate_download', { name_length: name.length });
    downloadCertificate(name);
  });
  const row = el('div', { class:'cert-card-actions' }, nameInput, dlBtn);
  card.append(row);
  section.append(card);
}

function roundRectPath(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}
function wrapText(ctx,text,cx,y,maxWidth,lineHeight){
  const words = text.split(' ');
  let line = '', lines = [];
  words.forEach(w => {
    const test = line ? line+' '+w : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  });
  if (line) lines.push(line);
  lines.forEach((l,i) => ctx.fillText(l, cx, y + i*lineHeight));
  return lines.length;
}

function downloadCertificate(name){
  const W = 1400, H = 990;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';

  const grad = ctx.createLinearGradient(0,0,W,H);
  grad.addColorStop(0,'#0969da'); grad.addColorStop(0.5,'#0550ae'); grad.addColorStop(1,'#0a6f66');
  ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);

  const m = 34;
  ctx.fillStyle = '#ffffff';
  roundRectPath(ctx, m, m, W-2*m, H-2*m, 18); ctx.fill();

  const cx = W/2;
  ctx.fillStyle = '#0969da';
  ctx.font = "800 34px Sora, sans-serif";
  ctx.fillText('FinLab', cx, 145);
  ctx.fillStyle = '#5f6672';
  ctx.font = "700 13px Inter, sans-serif";
  ctx.fillText('F I N A N C E   E D U C A T I O N   P L A T F O R M', cx, 172);

  ctx.strokeStyle = '#eaeef2'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx-160,200); ctx.lineTo(cx+160,200); ctx.stroke();

  ctx.fillStyle = '#57606a';
  ctx.font = "600 15px Inter, sans-serif";
  ctx.fillText('CERTIFICATE OF COMPLETION', cx, 250);

  ctx.fillStyle = '#0d1117';
  ctx.font = "500 20px Inter, sans-serif";
  ctx.fillText('This certifies that', cx, 320);

  ctx.fillStyle = '#0550ae';
  ctx.font = "800 54px Sora, sans-serif";
  ctx.fillText(name, cx, 400);

  ctx.fillStyle = '#24292f';
  ctx.font = "400 19px Inter, sans-serif";
  wrapText(ctx, `has completed the FinLab curriculum — ${NAV_ORDER.length} lessons across Financial Statements, Valuation, Deals & Transactions, Advanced Analysis, and Recruiting & Fit.`, cx, 460, 920, 28);

  ctx.fillStyle = '#57606a';
  ctx.font = "600 15px JetBrains Mono, monospace";
  const dateStr = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  ctx.fillText(`Issued ${dateStr}  ·  ${STATE.xp} XP earned`, cx, 590);

  ctx.fillStyle = '#8c959f';
  ctx.font = "400 12px Inter, sans-serif";
  wrapText(ctx, 'FinLab is an independent educational project. This certificate reflects completion of self-paced coursework and is not an accredited or professional credential.', cx, H-90, 900, 17);

  const doDownload = (url) => {
    const a = document.createElement('a');
    a.href = url; a.download = 'finlab-certificate.png';
    document.body.appendChild(a); a.click(); a.remove();
  };
  if (canvas.toBlob) {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      doDownload(url);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }, 'image/png');
  } else {
    doDownload(canvas.toDataURL('image/png'));
  }
}

function highlightSidebar(id){
  document.querySelectorAll('.path-item').forEach(i => i.classList.remove('active'));
  const item = byId('path-'+id);
  if (item) item.classList.add('active');
}

/* ---------------- PAGE NAV ----------------
   showPage(id)/openLesson(id) are the public entry points every click handler
   calls. Both route through go(), which owns location.hash — this gives every
   page a real, bookmarkable/shareable/back-button-able URL for free, and is
   also what makes Deal Room cards (page ids like "deal-atlas") work: renderRoute
   falls through to showPageInternal for any id that isn't a lesson. */
function showPageInternal(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.top-nav-btn').forEach(b => b.removeAttribute('aria-current'));
  document.querySelectorAll('.path-item').forEach(i => i.classList.remove('active'));
  const page = byId('page-'+id);
  if (page) page.classList.add('active');
  const navBtn = document.querySelector(`.top-nav-btn[data-page="${id}"]`);
  if (navBtn) navBtn.setAttribute('aria-current','page');
  byId('mainArea').scrollTop = 0;
  closeMobileSidebar();
  if (id === 'glossary') renderGlossaryList('');
  if (id === 'recall') startRecallSession();
  updateFeedbackLink(id);
  track('page_view', { id });
}

function updateFeedbackLink(context){
  const link = byId('feedbackLink');
  if (!link) return;
  const title = encodeURIComponent(`Issue on "${context}"`);
  const body = encodeURIComponent(`What's wrong, and where:\n\n\n---\nPage: ${context}\nURL: ${location.href}`);
  link.href = `https://github.com/abdullohik/finlab/issues/new?title=${title}&body=${body}&labels=feedback`;
}

function openLessonInternal(id){
  const lesson = LESSON_BY_ID[id];
  if (!lesson) { showPageInternal('home'); return; }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.top-nav-btn').forEach(b => b.removeAttribute('aria-current'));
  byId('page-'+id).classList.add('active');
  byId('mainArea').scrollTop = 0;
  highlightSidebar(id);
  closeMobileSidebar();
  if (lesson.calc === 'dcf') dcfCalc(id);
  if (lesson.calc === 'lbo') lboCalc(id);
  if (lesson.calc === 'credit') creditCalc(id);
  if (lesson.calc === 'football') footballCalc(id);
  if (lesson.calc === 'comps') compsCalc(id);
  if (lesson.calc === 'merger') mergerCalc(id);
  updateFeedbackLink(lesson.title);
  track('lesson_view', { id, type:lesson.type });
}

function parseHash(){
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  return raw || 'home';
}
function renderRoute(id){
  if (LESSON_BY_ID[id]) openLessonInternal(id);
  else if (byId('page-'+id)) showPageInternal(id);
  else showPageInternal('home');
}
function showPage(id){
  const newHash = '#/' + id;
  if (location.hash === newHash) renderRoute(id);
  else location.hash = newHash; // triggers the hashchange listener, which renders
}
function openLesson(id){ showPage(id); } // same dispatcher handles both — kept as a separate name for readability at call sites

function switchTab(lessonId, tab){
  const page = byId('page-'+lessonId);
  page.querySelectorAll('.lesson-tab').forEach(t => t.setAttribute('aria-selected', t.dataset.tab === tab ? 'true' : 'false'));
  page.querySelectorAll('.tab-panel').forEach(p => p.style.display = p.dataset.tab === tab ? 'block' : 'none');
  const lesson = LESSON_BY_ID[lessonId];
  if (tab === 'calc') {
    if (lesson.calc === 'dcf') dcfCalc(lessonId);
    if (lesson.calc === 'lbo') lboCalc(lessonId);
    if (lesson.calc === 'credit') creditCalc(lessonId);
    if (lesson.calc === 'football') footballCalc(lessonId);
    if (lesson.calc === 'comps') compsCalc(lessonId);
    if (lesson.calc === 'merger') mergerCalc(lessonId);
    track('calc_open', { lessonId, calc:lesson.calc });
  }
}

function completeAndNext(id){
  if (!STATE.completed.includes(id)) {
    STATE.completed.push(id);
    saveState();
    addXP(50);
    applyCompletionState();
    const banner = byId(id+'-complete');
    if (banner) banner.classList.add('show');
    track('lesson_complete', { id });
  }
  const idx = NAV_ORDER.indexOf(id);
  const next = NAV_ORDER[idx+1];
  if (next) openLesson(next); else showPage('home');
}

/* ---------------- MOBILE SIDEBAR ---------------- */
function openMobileSidebar(){
  byId('sidebar').classList.add('open');
  byId('sidebarScrim').classList.add('show');
  byId('menuToggle').setAttribute('aria-expanded','true');
}
function closeMobileSidebar(){
  byId('sidebar').classList.remove('open');
  byId('sidebarScrim').classList.remove('show');
  byId('menuToggle').setAttribute('aria-expanded','false');
}

/* ---------------- PAGE BUILDERS ---------------- */
function buildLessonPage(lesson){
  const page = el('div', { class:'page', id:'page-'+lesson.id });
  const header = el('div', { class:'lesson-header' });
  const crumb = el('div', { class:'lesson-breadcrumb' },
    el('button', { type:'button', onclick:()=>showPage('home'), text:'Home' }),
    ' / ',
    el('span', { text: MODULES.find(m=>m.id===lesson.module).name })
  );
  if (lesson.type === 'lesson') crumb.append(' / ', el('span', { text:lesson.title }));
  header.append(crumb);
  header.append(el('h1', { class:'lesson-title', text:lesson.title }));
  header.append(el('div', { class:'lesson-subtitle', text:lesson.subtitle }));

  const tabs = el('div', { class:'lesson-tabs', role:'tablist' });
  const tabDefs = [{ id:'learn', label:'📖 Learn' }];
  if (lesson.calc) tabDefs.push({ id:'calc', label:'🔧 Calculator' });
  if (lesson.quiz) tabDefs.push({ id:'check', label:'✅ Check' });
  tabDefs.forEach((t,i) => {
    const btn = el('button', { type:'button', class:'lesson-tab', role:'tab', 'data-tab':t.id, 'aria-selected': i===0?'true':'false', text:t.label });
    btn.addEventListener('click', () => switchTab(lesson.id, t.id));
    tabs.append(btn);
  });
  if (tabDefs.length > 1) header.append(tabs);
  page.append(header);

  // Learn panel
  const learnPanel = el('div', { class:'lesson-body tab-panel', 'data-tab':'learn' });
  (lesson.blocks||[]).forEach(b => learnPanel.append(renderBlock(b)));
  if (lesson.intro) learnPanel.prepend(el('p', { class:'calc-note', text:lesson.intro }));
  if (lesson.type === 'lesson') {
    const banner = el('div', { class:'complete-banner', id:lesson.id+'-complete' },
      el('div', { 'aria-hidden':'true', style:'font-size:28px;' }, '🎉'),
      el('div', {},
        el('div', { style:'font-family:var(--display);font-size:15px;font-weight:700;', text:'Lesson Complete! +50 XP' }),
        el('div', { style:'font-size:12.5px;opacity:.85;margin-top:2px;', text:'Great work — on to the next one.' }))
    );
    learnPanel.append(banner);
  }
  page.append(learnPanel);

  // Calc panel
  if (lesson.calc) {
    const calcPanel = el('div', { class:'lesson-body tab-panel', 'data-tab':'calc', style:'display:none;' });
    calcPanel.append(buildCalcEmbed(lesson.calc, lesson.id));
    page.append(calcPanel);
  }

  // Check panel
  if (lesson.quiz) {
    const checkPanel = el('div', { class:'lesson-body tab-panel', 'data-tab':'check', style:'display:none;' });
    if (lesson.type === 'quiz' && lesson.intro) checkPanel.append(el('p', { class:'calc-note', text:lesson.intro }));
    checkPanel.append(renderQuiz(lesson.id, lesson.quiz));
    page.append(checkPanel);
  }

  // For quiz-type lessons (fs-quiz/final-quiz) the "learn" tab IS the quiz — no separate tabs
  if (lesson.type === 'quiz') {
    learnPanel.remove();
    const soloPanel = el('div', { class:'lesson-body' });
    if (lesson.intro) soloPanel.append(el('p', { class:'calc-note', text:lesson.intro }));
    soloPanel.append(renderQuiz(lesson.id, lesson.quiz));
    page.querySelector('.tab-panel[data-tab="check"]')?.remove();
    page.append(soloPanel);
  }

  // Nav
  const idx = NAV_ORDER.indexOf(lesson.id);
  const prevId = NAV_ORDER[idx-1], nextId = NAV_ORDER[idx+1];
  const nav = el('div', { class:'lesson-nav' });
  const prevBtn = el('button', { type:'button', class:'lesson-nav-btn', text: prevId ? '← Previous' : '← Home' });
  prevBtn.addEventListener('click', () => prevId ? openLesson(prevId) : showPage('home'));
  const dots = el('div', { class:'lesson-progress-dots', 'aria-hidden':'true' });
  MODULES.filter(m=>m.id===lesson.module).forEach(m => {
    LESSONS.filter(l=>l.module===m.id).forEach(l => {
      dots.append(el('span', { class:'dot-step' + (l.id===lesson.id?' active':'') }));
    });
  });
  const nextBtn = el('button', { type:'button', class:'lesson-nav-btn primary', text: nextId ? 'Next: ' + LESSON_BY_ID[nextId].title + ' →' : 'Finish →' });
  nextBtn.addEventListener('click', () => completeAndNext(lesson.id));
  nav.append(prevBtn, dots, nextBtn);
  page.append(nav);

  return page;
}

function buildCalcEmbed(calcType, lessonId){
  const cfg = {
    dcf:     { title:'🔧 DCF Calculator',        note:'Sliders update outputs instantly' },
    lbo:     { title:'⚡ LBO Return Calculator',  note:'Try leverage 40% → 70% — watch the IRR' },
    credit:  { title:'🛡 Credit Ratio Calculator', note:'Used by lenders to underwrite a loan' },
    football:{ title:'◫ Football Field Builder',  note:'Plot every method on one chart' },
    comps:   { title:'📊 Comps Calculator',        note:'Median peer multiple → implied value' },
    merger:  { title:'🤝 Accretion / Dilution Calculator', note:'Cash, stock, or blended — see the EPS impact' },
  }[calcType];
  const embed = el('div', { class:'calc-embed', id:'embed-'+lessonId+'-'+calcType });
  embed.append(el('div', { class:'calc-header' },
    el('div', { class:'calc-title', text:cfg.title }),
    el('span', { style:'font-size:11px;color:var(--ink4);', text:cfg.note })
  ));
  const body = el('div', { class:'calc-body', id:'calcbody-'+calcType+'-'+lessonId });
  embed.append(body);
  buildCalcInputs(calcType, body, lessonId);
  return embed;
}

/* ---------------- CALCULATOR: DCF ---------------- */
function buildCalcInputs(calcType, body, lessonId){
  const p = id => id + '__' + lessonId;
  if (calcType === 'dcf') {
    const cols = el('div', { class:'calc-cols' });
    const left = el('div');
    left.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Inputs' }));
    const sliders = [
      ['dc_rev','Revenue ($M)',50,5000,500,50],
      ['dc_m','FCF Margin (%)',5,45,20,1],
      ['dc_g','Revenue Growth (%)',1,40,10,1],
      ['dc_w','WACC (%)',5,20,10,0.5],
      ['dc_tg','Terminal Growth (%)',0.5,5,3,0.25],
      ['dc_nd','Net Debt ($M)',-200,3000,200,50],
    ];
    sliders.forEach(([key,label,min,max,val,step]) => left.append(sliderRow(p(key),label,min,max,val,step,()=>dcfCalc(lessonId))));
    cols.append(left);

    const right = el('div');
    right.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Output' }));
    const outs = el('div', { class:'calc-outputs' });
    outs.append(
      calcOut(p('dc_ev'),'Enterprise Value','Total business value','var(--blue)'),
      calcOut(p('dc_eqv'),'Equity Value','EV minus Net Debt','var(--teal)'),
      calcOut(p('dc_evrev'),'EV / Revenue','Implied multiple'),
      calcOut(p('dc_tvpct'),'Terminal Val %','Of total EV'),
    );
    right.append(outs);
    right.append(el('div', { class:'calc-break', id:p('dc_break') }));
    const sensWrap = el('div', { style:'margin-top:16px;' });
    sensWrap.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;', text:'Sensitivity — EV by WACC × Terminal Growth' }));
    sensWrap.append(el('div', { class:'table-scroll' }, el('table', { class:'data-table', id:p('dc_sens'), style:'font-size:11px;' })));
    right.append(sensWrap);
    cols.append(right);
    body.append(cols);
  }
  if (calcType === 'lbo') {
    const cols = el('div', { class:'calc-cols' });
    const left = el('div');
    left.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Deal Structure' }));
    [
      ['lb_eb','Entry EBITDA ($M)',10,1000,100,10],
      ['lb_em','Entry Multiple (x)',5,20,10,0.5],
      ['lb_lev','Leverage (Debt/EV %)',20,75,60,1],
      ['lb_rate','Interest Rate (%)',3,14,7,0.25],
      ['lb_grow','EBITDA Growth p.a. (%)',0,30,10,1],
      ['lb_xm','Exit Multiple (x)',5,20,10,0.5],
      ['lb_yrs','Hold Period (years)',2,10,5,1],
    ].forEach(([key,label,min,max,val,step]) => left.append(sliderRow(p(key),label,min,max,val,step,()=>lboCalc(lessonId))));
    left.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin:16px 0 10px;', text:'Cash Conversion Assumptions' }));
    [
      ['lb_tax','Cash Tax Rate (%)',10,35,25,1],
      ['lb_capex','CapEx + Δ Working Capital (% of EBITDA)',5,35,15,1],
    ].forEach(([key,label,min,max,val,step]) => left.append(sliderRow(p(key),label,min,max,val,step,()=>lboCalc(lessonId))));
    left.append(el('p', { style:'font-size:11px;color:var(--ink4);line-height:1.6;margin-top:8px;', text:'Simplified model: assumes D&A roughly offsets maintenance CapEx for cash-tax purposes (a common teaching approximation). Excess cash after debt is fully repaid accumulates on the balance sheet rather than disappearing.' }));
    cols.append(left);

    const right = el('div');
    right.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Returns' }));
    const outs1 = el('div', { class:'calc-outputs' });
    outs1.append(calcOutBig(p('lb_irr'),'CAGR (≈ IRR)','Target: 20–25%+'), calcOutBig(p('lb_moic'),'MOIC','Target: 2.5–3.5x'));
    right.append(outs1);
    right.append(el('p', { style:'font-size:10.5px;color:var(--ink4);margin-top:6px;', text:'"CAGR (≈ IRR)" — assumes one cash outflow at entry and one inflow at exit, no interim distributions.' }));
    const outs2 = el('div', { class:'calc-outputs', style:'margin-top:10px;' });
    outs2.append(
      calcOut(p('lb_entEV'),'Entry EV','',null,'16px'),
      calcOut(p('lb_eq'),'Equity Check','',null,'16px'),
      calcOut(p('lb_exitEV'),'Exit EV','',null,'16px'),
      calcOut(p('lb_exitEq'),'Exit Equity','',null,'16px'),
    );
    right.append(outs2);
    right.append(el('div', { id:p('lb_verdict') }));
    cols.append(right);
    body.append(cols);
  }
  if (calcType === 'credit') {
    const cols = el('div', { class:'calc-cols' });
    const left = el('div');
    left.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Company Financials' }));
    [
      ['cr_eb','EBITDA ($M)',5,1000,100,5],
      ['cr_debt','Total Debt ($M)',0,3000,400,10],
      ['cr_cash','Cash ($M)',0,1000,50,5],
      ['cr_int','Annual Interest Expense ($M)',1,300,28,1],
      ['cr_prin','Scheduled Principal Due ($M)',0,300,20,1],
    ].forEach(([key,label,min,max,val,step]) => left.append(sliderRow(p(key),label,min,max,val,step,()=>creditCalc(lessonId))));
    cols.append(left);

    const right = el('div');
    right.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Credit Metrics' }));
    const outs = el('div', { class:'calc-outputs' });
    outs.append(
      calcOut(p('cr_lev'),'Net Debt / EBITDA','Leverage ratio'),
      calcOut(p('cr_cov'),'Interest Coverage','EBITDA / Interest'),
      calcOut(p('cr_dscr'),'DSCR','EBITDA / Debt Service'),
    );
    right.append(outs);
    right.append(el('div', { id:p('cr_verdict') }));
    cols.append(right);
    body.append(cols);
  }
  if (calcType === 'football') {
    body.append(el('p', { class:'calc-note', text:'Enter a low–high Enterprise Value range for each method (in $M), plus the actual offer. Prefilled with the Atlas Robotics Deal Room numbers — try changing them.' }));
    const grid = el('div', { style:'display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 16px;margin-bottom:16px;max-width:640px;' });
    grid.append(el('div',{style:'font-size:11px;font-weight:700;color:var(--ink4);'},'Method'), el('div',{style:'font-size:11px;font-weight:700;color:var(--ink4);'},'Low ($M)'), el('div',{style:'font-size:11px;font-weight:700;color:var(--ink4);'},'High ($M)'));
    [
      ['ff_dcf','DCF',1200,1800],
      ['ff_comps','Comps',1000,1400],
      ['ff_prec','Precedent Tx',1400,2000],
      ['ff_lbo','LBO Floor',900,1300],
    ].forEach(([key,label,lo,hi]) => {
      grid.append(el('div',{style:'font-size:12.5px;color:var(--ink2);align-self:center;'},label));
      grid.append(numInput(p(key+'_lo'), lo, ()=>footballCalc(lessonId)));
      grid.append(numInput(p(key+'_hi'), hi, ()=>footballCalc(lessonId)));
    });
    body.append(grid);
    const offerRow = el('div', { class:'slider-row', style:'max-width:400px;' });
    offerRow.append(el('label', { class:'slider-lbl', for:p('ff_offer') }, 'Offer Price (EV, $M)'));
    offerRow.append(numInput(p('ff_offer'), 1650, ()=>footballCalc(lessonId)));
    body.append(offerRow);
    body.append(el('div', { class:'ff-chart', id:p('ff_chart') }));
  }
  if (calcType === 'comps') {
    body.append(el('p', { class:'calc-note', text:'Enter each peer\'s EV/EBITDA multiple, then the target\'s own numbers. The median peer multiple gets applied to the target — try dropping one peer to an outlier value and watch the median barely move while the average would swing hard.' }));
    const grid = el('div', { style:'display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;margin-bottom:16px;max-width:420px;' });
    grid.append(el('div',{style:'font-size:11px;font-weight:700;color:var(--ink4);'},'Peer'), el('div',{style:'font-size:11px;font-weight:700;color:var(--ink4);'},'EV / EBITDA'));
    [['cp_p1','Peer 1',9.5],['cp_p2','Peer 2',11.2],['cp_p3','Peer 3',8.7],['cp_p4','Peer 4',13.0],['cp_p5','Peer 5',10.1]]
      .forEach(([key,label,val]) => {
        grid.append(el('div',{style:'font-size:12.5px;color:var(--ink2);align-self:center;'},label));
        grid.append(numInput(p(key), val, ()=>compsCalc(lessonId)));
      });
    body.append(grid);
    const cols = el('div', { class:'calc-cols' });
    const left = el('div');
    left.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Target Company' }));
    [
      ['cp_eb','Target EBITDA ($M)',5,2000,340*0.24,5],
      ['cp_nd','Target Net Debt ($M)',-200,3000,120,10],
      ['cp_sh','Target Diluted Shares (M)',1,500,40,1],
    ].forEach(([key,label,min,max,val,step]) => left.append(sliderRow(p(key),label,min,max,Math.round(val*10)/10,step,()=>compsCalc(lessonId))));
    cols.append(left);
    const right = el('div');
    right.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Implied Value' }));
    const outs = el('div', { class:'calc-outputs' });
    outs.append(
      calcOut(p('cp_med'),'Median Multiple','Low–high range shown below','var(--blue)'),
      calcOut(p('cp_ev'),'Implied EV','Median × Target EBITDA','var(--teal)'),
      calcOut(p('cp_eqv'),'Implied Equity Value','EV minus Net Debt'),
      calcOut(p('cp_px'),'Implied Share Price','Equity Value ÷ Shares'),
    );
    right.append(outs);
    right.append(el('div', { id:p('cp_range'), style:'margin-top:12px;font-size:12px;color:var(--ink3);' }));
    cols.append(right);
    body.append(cols);
  }
  if (calcType === 'merger') {
    body.append(el('p', { class:'calc-note', text:'Set the deal size and financing mix, then watch whether the combined company\'s EPS rises (accretive) or falls (dilutive) versus the acquirer on its own. Try moving the mix from Stock toward Cash/Debt and see accretion improve — that\'s the "cheap financing" effect the lesson warns about.' }));
    const cols = el('div', { class:'calc-cols' });
    const left = el('div');
    left.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Acquirer & Target' }));
    [
      ['mg_ani','Acquirer Net Income ($M)',10,5000,400,10],
      ['mg_ash','Acquirer Diluted Shares (M)',10,2000,200,5],
      ['mg_apx','Acquirer Share Price ($)',5,500,80,1],
      ['mg_tni','Target Net Income ($M)',1,2000,60,5],
      ['mg_price','Purchase Price ($M)',10,20000,1200,50],
    ].forEach(([key,label,min,max,val,step]) => left.append(sliderRow(p(key),label,min,max,val,step,()=>mergerCalc(lessonId))));
    cols.append(left);
    const right = el('div');
    right.append(el('div', { style:'font-size:11px;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;', text:'Financing Mix & Synergies' }));
    [
      ['mg_cash','Cash-Funded (%)',0,100,30,5],
      ['mg_stock','Stock-Funded (%)',0,100,40,5],
      ['mg_rate','Cost of Cash/Debt (%)',1,12,5,0.5],
      ['mg_tax','Tax Rate (%)',10,35,25,1],
      ['mg_syn','Annual Pre-Tax Synergies ($M)',0,500,20,5],
    ].forEach(([key,label,min,max,val,step]) => right.append(sliderRow(p(key),label,min,max,val,step,()=>mergerCalc(lessonId))));
    right.append(el('p', { style:'font-size:10.5px;color:var(--ink4);line-height:1.6;margin-top:4px;', text:'Debt-funded % is whatever\'s left after Cash + Stock. "Cost of Cash/Debt" applies to both — new debt as after-tax interest expense, cash used as after-tax foregone interest income (opportunity cost).' }));
    cols.append(right);
    body.append(cols);
    const outs = el('div', { class:'calc-outputs', style:'margin-top:16px;' });
    outs.append(
      calcOut(p('mg_peps'),'Pro Forma EPS','Combined NI ÷ new share count','var(--blue)'),
      calcOut(p('mg_aeps'),'Acquirer Standalone EPS','Before the deal','var(--teal)'),
      calcOut(p('mg_adacc'),'Accretion / (Dilution)','% change in EPS'),
      calcOut(p('mg_shares'),'New Shares Issued','Stock portion ÷ share price'),
    );
    body.append(outs);
    body.append(el('div', { id:p('mg_verdict') }));
  }
}

function sliderRow(id,label,min,max,val,step,onInput){
  const row = el('div', { class:'slider-row' });
  row.append(el('label', { class:'slider-lbl', for:id, text:label }));
  const input = el('input', { type:'range', id, min, max, value:val, step });
  const out = el('span', { class:'slider-val', id:id+'V' });
  input.addEventListener('input', () => { onInput(); });
  row.append(input, out);
  return row;
}
function numInput(id, val, onInput){
  const input = el('input', { type:'number', id, value:val, style:'width:100%;padding:7px 9px;border:1.5px solid var(--line-ui);border-radius:var(--r);font:inherit;font-size:12.5px;' });
  input.addEventListener('input', onInput);
  return input;
}
function calcOut(id,label,sub,color,fontSize){
  return el('div', { class:'calc-out', style: color ? `border-top:3px solid ${color};` : '' },
    el('div', { class:'calc-out-label', text:label }),
    el('div', { class:'calc-out-val', id, style: fontSize ? `font-size:${fontSize};` : '' }, '—'),
    sub ? el('div', { class:'calc-out-sub', text:sub }) : el('div')
  );
}
function calcOutBig(id,label,sub){
  return el('div', { class:'calc-out', style:'border-top:3px solid var(--blue);' },
    el('div', { class:'calc-out-label', text:label }),
    el('div', { class:'calc-out-val', id, style:'font-size:28px;' }, '—'),
    el('div', { class:'calc-out-sub', text:sub }));
}

function dcfCalc(lessonId){
  const p = id => id + '__' + lessonId;
  const g = k => byId(p(k));
  if (!g('dc_rev')) return;
  const rev=+g('dc_rev').value, m=+g('dc_m').value/100, gr=+g('dc_g').value/100;
  const wacc=+g('dc_w').value/100, tg=+g('dc_tg').value/100, nd=+g('dc_nd').value;
  byId(p('dc_rev')+'V').textContent='$'+rev+'M';
  byId(p('dc_m')+'V').textContent=Math.round(m*100)+'%';
  byId(p('dc_g')+'V').textContent=Math.round(gr*100)+'%';
  byId(p('dc_w')+'V').textContent=(wacc*100).toFixed(1)+'%';
  byId(p('dc_tg')+'V').textContent=(tg*100).toFixed(2)+'%';
  byId(p('dc_nd')+'V').textContent='$'+nd+'M';

  const breakEl = byId(p('dc_break'));
  let pv=0,r=rev,lastFCF=0;
  for(let i=1;i<=10;i++){ r*=(1+gr); const fcf=r*m; pv+=fcf/Math.pow(1+wacc,i); lastFCF=fcf; }

  if (wacc <= tg) {
    breakEl.className = 'calc-break show';
    breakEl.textContent = `Undefined — WACC (${(wacc*100).toFixed(1)}%) must exceed Terminal Growth (${(tg*100).toFixed(2)}%), or the Gordon Growth formula divides by zero or a negative number. This is exactly why analysts cap terminal growth near long-run GDP (2–3%) — raise WACC or lower Terminal Growth to fix it.`;
    byId(p('dc_ev')).textContent = '∞ / undefined';
    byId(p('dc_eqv')).textContent = '—';
    byId(p('dc_evrev')).textContent = '—';
    byId(p('dc_tvpct')).textContent = '—';
  } else {
    breakEl.className = 'calc-break';
    const tv = lastFCF*(1+tg)/(wacc-tg)/Math.pow(1+wacc,10);
    const ev = pv+tv, eqv = ev-nd;
    byId(p('dc_ev')).textContent=fmtB(ev);
    byId(p('dc_eqv')).textContent=fmtB(eqv);
    byId(p('dc_evrev')).textContent=(ev/rev).toFixed(1)+'x';
    byId(p('dc_tvpct')).textContent=ev>0?Math.round(tv/ev*100)+'%':'—';
  }

  // Adaptive sensitivity table, centered on current sliders
  const waccPct = wacc*100, tgPct = tg*100;
  const waccs = [-3,-2,-1,0,1,2,3].map(d => clamp(Math.round((waccPct+d)*2)/2, 5, 20));
  const tgs = [-1,-0.5,0,0.5,1].map(d => clamp(Math.round((tgPct+d)*4)/4, 0.5, 5));
  const uniqW = [...new Set(waccs)], uniqT = [...new Set(tgs)];
  function getEV(w,t){
    if (w<=t) return null;
    let pv2=0, rv=rev;
    for(let i=1;i<=10;i++){ rv*=(1+gr); pv2+=rv*m/Math.pow(1+w,i); }
    return pv2 + rv*m*(1+t)/((w-t)*Math.pow(1+w,10));
  }
  const all = uniqW.flatMap(w=>uniqT.map(t=>getEV(w/100,t/100))).filter(v=>v!=null);
  const mn=Math.min(...all), mx=Math.max(...all);
  let html='<tr><th>WACC \\ TG</th>'+uniqT.map(t=>`<th>${t}%</th>`).join('')+'</tr>';
  uniqW.forEach(w=>{
    html+=`<tr><td class="mono" style="font-weight:700">${w}%</td>`;
    uniqT.forEach(t=>{
      const v=getEV(w/100,t/100);
      if (v==null){ html+=`<td class="mono sens-lo">n/a</td>`; return; }
      const isBase=Math.abs(w-waccPct)<0.3&&Math.abs(t-tgPct)<0.15;
      const norm=(mx>mn)?(v-mn)/(mx-mn):0.5;
      const cls=isBase?'sens-base':norm>0.65?'sens-hi':norm<0.35?'sens-lo':'sens-md';
      html+=`<td class="mono ${cls}">${fmtB(v)}</td>`;
    });
    html+='</tr>';
  });
  byId(p('dc_sens')).innerHTML=html;
}

function lboCalc(lessonId){
  const p = id => id + '__' + lessonId;
  const g = k => byId(p(k));
  if (!g('lb_eb')) return;
  const eb=+g('lb_eb').value, em=+g('lb_em').value, lev=+g('lb_lev').value/100;
  const rate=+g('lb_rate').value/100, grow=+g('lb_grow').value/100, xm=+g('lb_xm').value, yrs=+g('lb_yrs').value;
  const taxRate=+g('lb_tax').value/100, capexPct=+g('lb_capex').value/100;
  byId(p('lb_eb')+'V').textContent='$'+eb+'M';
  byId(p('lb_em')+'V').textContent=em+'x';
  byId(p('lb_lev')+'V').textContent=Math.round(lev*100)+'%';
  byId(p('lb_rate')+'V').textContent=(rate*100).toFixed(2)+'%';
  byId(p('lb_grow')+'V').textContent=Math.round(grow*100)+'%';
  byId(p('lb_xm')+'V').textContent=xm+'x';
  byId(p('lb_yrs')+'V').textContent=yrs+' yrs';
  byId(p('lb_tax')+'V').textContent=Math.round(taxRate*100)+'%';
  byId(p('lb_capex')+'V').textContent=Math.round(capexPct*100)+'%';

  const entEV=eb*em, debt=entEV*lev, equity=entEV-debt;
  let debtBal=debt, cashBal=0;
  for(let y=1;y<=yrs;y++){
    const ebitdaY=eb*Math.pow(1+grow,y);
    const interest=debtBal*rate;
    const taxableIncome=Math.max(0, ebitdaY-interest);
    const tax=taxableIncome*taxRate;
    const capexNwc=ebitdaY*capexPct;
    const fcf=ebitdaY-interest-tax-capexNwc;
    if (fcf>=0){ const repay=Math.min(fcf,debtBal); debtBal-=repay; cashBal+=(fcf-repay); }
    else { cashBal+=fcf; }
  }
  const exitEBITDA=eb*Math.pow(1+grow,yrs), exitEV=exitEBITDA*xm;
  const exitEq=Math.max(0, exitEV-debtBal+cashBal);
  const moic=exitEq/equity;
  const cagr=(Math.pow(Math.max(moic,0.0001),1/yrs)-1)*100;

  byId(p('lb_entEV')).textContent=fmtB(entEV);
  byId(p('lb_eq')).textContent=fmtB(equity);
  byId(p('lb_exitEV')).textContent=fmtB(exitEV);
  byId(p('lb_exitEq')).textContent=fmtB(exitEq);
  const irrEl=byId(p('lb_irr'));
  irrEl.textContent=cagr.toFixed(1)+'%';
  irrEl.style.color=cagr>=20?'var(--green)':cagr>=15?'var(--amber)':'var(--red)';
  const moicEl=byId(p('lb_moic'));
  moicEl.textContent=moic.toFixed(2)+'x';
  moicEl.style.color=moic>=2.5?'var(--green)':moic>=2?'var(--amber)':'var(--red)';
  const vd=byId(p('lb_verdict'));
  const vdStyle='margin-top:14px;padding:12px 14px;border-radius:var(--r);font-size:13px;font-weight:600;text-align:center;';
  if(cagr>=20&&moic>=2.5){ vd.style.cssText=vdStyle+'background:var(--green-bg);color:var(--green);border:1px solid #b7e4c7;'; vd.textContent='✓ Deal works — above PE hurdle rate'; }
  else if(cagr>=15){ vd.style.cssText=vdStyle+'background:var(--amber-bg);color:var(--amber);border:1px solid #fcd34d;'; vd.textContent='~ Marginal — below 20% IRR target'; }
  else { vd.style.cssText=vdStyle+'background:var(--red-bg);color:var(--red);border:1px solid #f5c6cb;'; vd.textContent='✗ Returns too low — PE would not do this deal'; }
}

function creditCalc(lessonId){
  const p = id => id + '__' + lessonId;
  const g = k => byId(p(k));
  if (!g('cr_eb')) return;
  const eb=+g('cr_eb').value, debt=+g('cr_debt').value, cash=+g('cr_cash').value;
  const interest=+g('cr_int').value, prin=+g('cr_prin').value;
  byId(p('cr_eb')+'V').textContent='$'+eb+'M';
  byId(p('cr_debt')+'V').textContent='$'+debt+'M';
  byId(p('cr_cash')+'V').textContent='$'+cash+'M';
  byId(p('cr_int')+'V').textContent='$'+interest+'M';
  byId(p('cr_prin')+'V').textContent='$'+prin+'M';

  const netDebt=debt-cash;
  const leverage=eb>0?netDebt/eb:0;
  const coverage=interest>0?eb/interest:99;
  const debtService=interest+prin;
  const dscr=debtService>0?eb/debtService:99;
  byId(p('cr_lev')).textContent=leverage.toFixed(2)+'x';
  byId(p('cr_cov')).textContent=coverage.toFixed(2)+'x';
  byId(p('cr_dscr')).textContent=dscr.toFixed(2)+'x';

  let rating, cls;
  if (leverage<2 && coverage>8) { rating='AA / AAA — very low credit risk'; cls='green'; }
  else if (leverage<3 && coverage>5) { rating='A — investment grade'; cls='green'; }
  else if (leverage<4 && coverage>3) { rating='BBB — investment grade (lower end)'; cls='amber'; }
  else if (leverage<5 && coverage>1.5) { rating='BB / B — speculative grade'; cls='amber'; }
  else { rating='CCC or below — high default risk'; cls='red'; }
  const vd=byId(p('cr_verdict'));
  const vdStyle='margin-top:14px;padding:12px 14px;border-radius:var(--r);font-size:13px;font-weight:600;text-align:center;';
  const colors={green:['var(--green-bg)','var(--green)','#b7e4c7'],amber:['var(--amber-bg)','var(--amber)','#fcd34d'],red:['var(--red-bg)','var(--red)','#f5c6cb']}[cls];
  vd.style.cssText=vdStyle+`background:${colors[0]};color:${colors[1]};border:1px solid ${colors[2]};`;
  vd.textContent='Implied Rating: '+rating+(dscr<1?' — DSCR below 1.0x: cannot service debt from operations':'');
}

function footballCalc(lessonId){
  const p = id => id + '__' + lessonId;
  const g = k => byId(p(k));
  if (!g('ff_dcf_lo')) return;
  const methods = [
    ['DCF','ff_dcf','var(--blue)'],
    ['Comps','ff_comps','var(--teal)'],
    ['Precedent Tx','ff_prec','var(--purple)'],
    ['LBO Floor','ff_lbo','var(--amber)'],
  ].map(([label,key,color]) => ({ label, color, lo:+g(key+'_lo').value, hi:+g(key+'_hi').value }));
  const offer = +g('ff_offer').value;
  const allVals = methods.flatMap(m=>[m.lo,m.hi]).concat([offer]);
  const min = Math.min(...allVals), max = Math.max(...allVals);
  const span = (max-min) || 1;
  const pad = span*0.08;
  const axisMin = min-pad, axisMax = max+pad, axisSpan = axisMax-axisMin;

  const chart = el('div');
  methods.forEach(m => {
    const loPct = (m.lo-axisMin)/axisSpan*100, hiPct = (m.hi-axisMin)/axisSpan*100;
    const track = el('div', { class:'ff-track' });
    track.append(el('div', { class:'ff-bar', style:`left:${loPct}%;width:${hiPct-loPct}%;background:${m.color};` }));
    const offerPct = (offer-axisMin)/axisSpan*100;
    track.append(el('div', { class:'ff-offer-line', style:`left:${offerPct}%;` }));
    chart.append(el('div', { class:'ff-row' },
      el('div', { class:'ff-label', text:`${m.label} (${fmtB(m.lo)}–${fmtB(m.hi)})` }),
      track
    ));
  });
  const offerPct = (offer-axisMin)/axisSpan*100;
  chart.append(el('div', { class:'ff-row' },
    el('div', { class:'ff-label' }, ''),
    el('div', { class:'ff-track', style:'background:none;border:none;height:auto;' },
      el('div', { class:'ff-offer-line', style:`left:${offerPct}%;background:var(--red);` }),
      el('div', { class:'ff-offer-lbl', style:`left:${offerPct}%;` }, `Offer ${fmtB(offer)}`)
    )
  ));
  const inAll = methods.every(m => offer >= m.lo && offer <= m.hi);
  const inAny = methods.some(m => offer >= m.lo && offer <= m.hi);
  const verdictText = inAll ? '✓ Offer sits inside the range of every method — a well-supported price.'
    : inAny ? '~ Offer sits inside some methods\' ranges but not all — worth explaining the gap.'
    : '✗ Offer sits outside every method\'s range — needs a strong justification.';
  chart.append(el('div', { class:'calc-out', style:'margin-top:16px;font-size:13px;font-weight:600;', text:verdictText }));
  const container = byId(p('ff_chart'));
  container.innerHTML='';
  container.append(chart);
}

function compsCalc(lessonId){
  const p = id => id + '__' + lessonId;
  const g = k => byId(p(k));
  if (!g('cp_p1')) return;
  const peers = ['cp_p1','cp_p2','cp_p3','cp_p4','cp_p5'].map(k => +g(k).value).filter(v => v > 0);
  const eb = +g('cp_eb').value, nd = +g('cp_nd').value, sh = +g('cp_sh').value;
  byId(p('cp_eb')+'V').textContent = '$'+eb.toFixed(1)+'M';
  byId(p('cp_nd')+'V').textContent = '$'+nd+'M';
  byId(p('cp_sh')+'V').textContent = sh+'M';

  const sorted = [...peers].sort((a,b)=>a-b);
  const mid = Math.floor(sorted.length/2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
  const low = sorted[0], high = sorted[sorted.length-1];
  const ev = median * eb, eqv = ev - nd, px = sh > 0 ? eqv/sh : 0;

  byId(p('cp_med')).textContent = median.toFixed(1)+'x';
  byId(p('cp_ev')).textContent = fmtB(ev);
  byId(p('cp_eqv')).textContent = fmtB(eqv);
  byId(p('cp_px')).textContent = '$'+px.toFixed(2);
  byId(p('cp_range')).textContent = `Peer range: ${low.toFixed(1)}x – ${high.toFixed(1)}x across ${peers.length} peers · implied EV range ${fmtB(low*eb)} – ${fmtB(high*eb)}`;
}

function mergerCalc(lessonId){
  const p = id => id + '__' + lessonId;
  const g = k => byId(p(k));
  if (!g('mg_ani')) return;
  const ani=+g('mg_ani').value, ash=+g('mg_ash').value, apx=+g('mg_apx').value;
  const tni=+g('mg_tni').value, price=+g('mg_price').value;
  let cashPct=+g('mg_cash').value, stockPct=+g('mg_stock').value;
  if (cashPct+stockPct > 100) { stockPct = 100-cashPct; g('mg_stock').value = stockPct; }
  const debtPct = Math.max(0, 100-cashPct-stockPct);
  const rate=+g('mg_rate').value/100, taxRate=+g('mg_tax').value/100, synergies=+g('mg_syn').value;

  byId(p('mg_ani')+'V').textContent='$'+ani+'M';
  byId(p('mg_ash')+'V').textContent=ash+'M';
  byId(p('mg_apx')+'V').textContent='$'+apx;
  byId(p('mg_tni')+'V').textContent='$'+tni+'M';
  byId(p('mg_price')+'V').textContent='$'+price+'M';
  byId(p('mg_cash')+'V').textContent=cashPct+'%';
  byId(p('mg_stock')+'V').textContent=stockPct+'%';
  byId(p('mg_rate')+'V').textContent=rate*100+'%';
  byId(p('mg_tax')+'V').textContent=taxRate*100+'%';
  byId(p('mg_syn')+'V').textContent='$'+synergies+'M';

  const cashUsed = price*(cashPct/100);
  const debtRaised = price*(debtPct/100);
  const stockUsed = price*(stockPct/100);
  const newShares = apx > 0 ? stockUsed/apx : 0;

  const afterTaxSynergies = synergies*(1-taxRate);
  const afterTaxInterestCost = debtRaised*rate*(1-taxRate);
  const afterTaxForegoneInterest = cashUsed*rate*(1-taxRate);
  const combinedNI = ani + tni + afterTaxSynergies - afterTaxInterestCost - afterTaxForegoneInterest;
  const proFormaShares = ash + newShares;
  const proFormaEPS = proFormaShares > 0 ? combinedNI/proFormaShares : 0;
  const standaloneEPS = ash > 0 ? ani/ash : 0;
  const accretion = standaloneEPS !== 0 ? (proFormaEPS/standaloneEPS - 1)*100 : 0;

  byId(p('mg_peps')).textContent = '$'+proFormaEPS.toFixed(2);
  byId(p('mg_aeps')).textContent = '$'+standaloneEPS.toFixed(2);
  const adEl = byId(p('mg_adacc'));
  adEl.textContent = (accretion>=0?'+':'')+accretion.toFixed(1)+'%';
  adEl.style.color = accretion >= 0 ? 'var(--green)' : 'var(--red)';
  byId(p('mg_shares')).textContent = newShares.toFixed(1)+'M';

  const vd = byId(p('mg_verdict'));
  const vdStyle='margin-top:14px;padding:12px 14px;border-radius:var(--r);font-size:13px;font-weight:600;text-align:center;';
  if (accretion >= 1) { vd.style.cssText=vdStyle+'background:var(--green-bg);color:var(--green);border:1px solid #b7e4c7;'; vd.textContent=`✓ Accretive — pro forma EPS is ${accretion.toFixed(1)}% above the acquirer's standalone EPS. Debt-funded: ${debtPct.toFixed(0)}%.`; }
  else if (accretion <= -1) { vd.style.cssText=vdStyle+'background:var(--red-bg);color:var(--red);border:1px solid #f5c6cb;'; vd.textContent=`✗ Dilutive — pro forma EPS is ${Math.abs(accretion).toFixed(1)}% below standalone. More stock financing usually means more dilution.`; }
  else { vd.style.cssText=vdStyle+'background:var(--amber-bg);color:var(--amber);border:1px solid #fcd34d;'; vd.textContent='~ Roughly neutral — within 1% of standalone EPS.'; }
}

/* ---------------- HOME / LEARN / PRACTICE PAGES ---------------- */
function buildHomePage(){
  const page = el('div', { class:'page active', id:'page-home' });
  const lessonCount = LESSONS.filter(l=>l.type==='lesson').length;
  const calcCount = new Set(LESSONS.filter(l=>l.calc).map(l=>l.calc)).size;
  const hero = el('div', { class:'home-hero' },
    el('div', { class:'hero-eyebrow' }, 'For Students Breaking Into Finance'),
    el('h1', { class:'hero-title' }, 'Finance education built', el('br'), 'for people getting started.'),
    el('p', { class:'hero-sub' }, "The same analytical frameworks used by analysts at banks, PE firms, and credit funds — taught from first principles, with real examples and live models you can break on purpose."),
    el('div', { class:'hero-stats' },
      statBlock(lessonCount,'Lessons'), statBlock(calcCount,'Live Calculators'),
      statBlock(DEALS.length,'Deal Case Studies'), statBlock(GLOSSARY.length,'Glossary Terms')),
    (()=>{ const b=el('button', { class:'hero-cta', type:'button', text:'Start Learning →' }); b.addEventListener('click',()=>openLesson('fs-intro')); return b; })()
  );
  page.append(hero);
  const certSection = el('div', { id:'certSection' });
  page.append(certSection);
  const content = el('div', { class:'home-content' });
  content.append(el('div', { class:'section-heading' }, 'Learning Modules'));
  const grid = el('div', { class:'module-grid' });
  MODULES.forEach(mod => {
    const modLessons = LESSONS.filter(l=>l.module===mod.id);
    const mins = modLessons.reduce((s,l)=>s+l.minutes,0);
    const card = el('button', { type:'button', class:`module-card m-${mod.color}` },
      el('div', { class:'module-icon', 'aria-hidden':'true' }, mod.icon),
      el('div', { class:'module-name', text:mod.name }),
      el('div', { class:'module-desc', text:mod.desc }),
      el('div', { class:'module-footer' },
        el('span', { class:'module-lessons' }, `${modLessons.length} lessons · ~${mins} min`),
        el('span', { style:`font-size:11px;color:var(--${mod.color});font-weight:600` }, 'Start →'))
    );
    card.addEventListener('click', () => openLesson(modLessons[0].id));
    grid.append(card);
  });
  content.append(grid);
  content.append(el('div', { class:'section-heading' }, 'How FinLab Works'));
  const how = el('div', { class:'how-grid' });
  [
    ['📖','Concept First','Every lesson starts with the plain-English idea before any formula. You understand why before you learn how.'],
    ['💡','Real Analogies','Every abstract concept is anchored to something you already understand — a mortgage, a used car, a landlord.'],
    ['🔧','Live Calculators','Move sliders, watch values change. You don\'t understand DCF until you\'ve broken it by setting terminal growth above WACC.'],
    ['🌍','Real Examples','Every lesson cites a real company, deal, or failure — Luckin Coffee, Hilton, Enron, Wirecard — the concepts come alive.'],
  ].forEach(([icon,title,desc]) => how.append(el('div', { class:'how-card' },
    el('div', { class:'how-icon', 'aria-hidden':'true' }, icon),
    el('div', { class:'how-title', text:title },),
    el('div', { class:'how-desc', text:desc }))));
  content.append(how);
  page.append(content);
  return page;
}
function statBlock(val,label){
  return el('div', {}, el('div', { class:'hero-stat-val', text:String(val) }), el('div', { class:'hero-stat-lbl', text:label }));
}

function buildLearnIndexPage(){
  const page = el('div', { class:'page', id:'page-learn' });
  const wrap = el('div', { style:'padding:32px 40px;' });
  wrap.append(el('div', { class:'section-heading' }, 'All Modules'));
  const grid = el('div', { class:'module-grid' });
  MODULES.forEach(mod => {
    const modLessons = LESSONS.filter(l=>l.module===mod.id);
    const mins = modLessons.reduce((s,l)=>s+l.minutes,0);
    const card = el('button', { type:'button', class:`module-card m-${mod.color}` },
      el('div', { class:'module-icon', 'aria-hidden':'true' }, mod.icon),
      el('div', { class:'module-name', text:mod.name }),
      el('div', { class:'module-desc', text:mod.desc }),
      el('div', { class:'module-footer' }, el('span', { class:'module-lessons' }, `${modLessons.length} lessons · ~${mins} min`)));
    card.addEventListener('click', () => openLesson(modLessons[0].id));
    grid.append(card);
  });
  wrap.append(grid);
  page.append(wrap);
  return page;
}

function buildPracticePage(){
  const page = el('div', { class:'page', id:'page-practice' });
  const intro = el('div', { style:'padding:28px 40px;max-width:820px;' });
  intro.append(el('div', { class:'section-heading' }, '🔧 Practice Calculators'));
  intro.append(el('p', { style:'font-size:13.5px;color:var(--ink3);line-height:1.75;margin-bottom:24px;', text:'All live models in one place. Use these to explore freely, test edge cases, or rehearse for an interview. The best way to understand a model is to break it.' }));
  page.append(intro);
  const grid = el('div', { style:'padding:0 40px 40px;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;' });
  const calcLessons = { dcf:'dcf', lbo:'lbo', credit:'credit', football:'football' };
  const cards = [
    ['∫','DCF Model','Adjust WACC, growth, and margins. Watch EV change live. Try setting terminal growth above WACC to see the formula break — on purpose.','m-blue','dcf'],
    ['⚡','LBO Returns','Model entry, leverage, EBITDA growth, exit, taxes and CapEx. See MOIC and CAGR update instantly.','m-purple','lbo'],
    ['🛡','Credit Ratios','Input EBITDA, debt, and interest to get leverage, coverage, and DSCR with an implied rating — the ratios lenders check on every loan.','m-teal','credit'],
    ['◫','Football Field','Set your valuation ranges from each method and see where any offer stands relative to all methodologies simultaneously.','m-amber','football'],
    ['📊','Comps','Enter peer EV/EBITDA multiples and target financials to get an implied value — watch the median resist an outlier peer that would swing an average.','m-teal','comps'],
    ['🤝','Accretion / Dilution','Set the deal size and cash/stock/debt mix, then see whether pro forma EPS rises or falls versus the acquirer standalone.','m-purple','merger'],
  ];
  cards.forEach(([icon,name,desc,cls,calcType]) => {
    const card = el('button', { type:'button', class:`module-card ${cls}` },
      el('div', { class:'module-icon', 'aria-hidden':'true' }, icon),
      el('div', { class:'module-name', text:name }),
      el('div', { class:'module-desc', text:desc }));
    card.addEventListener('click', () => {
      const targetLesson = LESSONS.find(l=>l.calc===calcType);
      openLesson(targetLesson.id);
      setTimeout(()=>switchTab(targetLesson.id,'calc'), 60);
    });
    grid.append(card);
  });
  page.append(grid);

  const recallIntro = el('div', { style:'padding:8px 40px 0;max-width:820px;' });
  recallIntro.append(el('div', { class:'section-heading' }, '🧠 Recall Drills'));
  recallIntro.append(el('p', { style:'font-size:13.5px;color:var(--ink3);line-height:1.75;margin-bottom:16px;', text:'Multiple choice tests recognition — recall drills test whether you can actually produce the answer, the way a real interview does. Terms you miss come back around more often.' }));
  page.append(recallIntro);
  const recallGrid = el('div', { style:'padding:0 40px 40px;' });
  const recallCard = el('button', { type:'button', class:'module-card m-red', style:'max-width:280px;' },
    el('div', { class:'module-icon', 'aria-hidden':'true' }, '🧠'),
    el('div', { class:'module-name', text:'Start a Drill Session' }),
    el('div', { class:'module-desc', text:`${GLOSSARY.length} terms, weighted toward what you've missed before.` }));
  recallCard.addEventListener('click', () => showPage('recall'));
  recallGrid.append(recallCard);
  page.append(recallGrid);
  return page;
}

/* ---------------- RECALL DRILLS ---------------- */
function buildRecallPage(){
  const page = el('div', { class:'page', id:'page-recall' });
  const header = el('div', { class:'lesson-header', style:'padding-bottom:16px;' },
    el('div', { class:'lesson-breadcrumb' },
      (()=>{ const b=el('button',{type:'button',text:'Home'}); b.addEventListener('click',()=>showPage('home')); return b; })(),
      ' / ', (()=>{ const b=el('button',{type:'button',text:'Practice'}); b.addEventListener('click',()=>showPage('practice')); return b; })(),
      ' / ', el('span',{text:'Recall Drills'})),
    el('h1', { class:'lesson-title' }, '🧠 Recall Drills'),
    el('div', { class:'lesson-subtitle' }, 'Say the definition out loud (or in your head) before you reveal it. Be honest when you self-rate — the whole point is finding what you don\'t actually know yet.'));
  page.append(header);
  const body = el('div', { class:'lesson-body', id:'recallBody' });
  page.append(body);
  return page;
}

function startRecallSession(){
  if (!STATE.recall) STATE.recall = {};
  const weighted = [...GLOSSARY].sort((a,b) => {
    const am = STATE.recall[a.t]?.lastMissed ? 1 : 0;
    const bm = STATE.recall[b.t]?.lastMissed ? 1 : 0;
    return bm - am;
  });
  // light shuffle within same-weight groups so it's not identical every time
  for (let i = weighted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (!!weighted[i] && !!weighted[j] &&
        !!STATE.recall[weighted[i].t]?.lastMissed === !!STATE.recall[weighted[j].t]?.lastMissed) {
      [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
    }
  }
  renderRecallCard(weighted, 0, { correct:0, missed:0 });
}

function renderRecallCard(queue, idx, tally){
  const body = byId('recallBody');
  body.innerHTML = '';
  if (idx >= queue.length) {
    body.append(el('div', { class:'concept-block', style:'text-align:center;' },
      el('div', { style:'font-size:32px;margin-bottom:10px;', 'aria-hidden':'true' }, tally.missed === 0 ? '🎉' : '👍'),
      el('div', { class:'concept-q' }, `Session complete — ${tally.correct} of ${queue.length} on the first pass.`),
      el('div', { class:'concept-a', style:'margin-bottom:16px;' },
        tally.missed === 0 ? 'Clean sweep. Come back in a few days and these will have faded a little — that\'s normal, and worth re-testing.'
        : `${tally.missed} term${tally.missed===1?'':'s'} marked as missed — they'll come up first next time you start a session.`),
      (() => { const b = el('button', { type:'button', class:'lesson-nav-btn primary', text:'↺ Run Another Session' }); b.addEventListener('click', startRecallSession); return b; })()
    ));
    track('recall_session_complete', { total: queue.length, correct: tally.correct });
    return;
  }
  const item = queue[idx];
  const progress = el('div', { style:'font-size:11px;color:var(--ink4);font-weight:600;margin-bottom:10px;', text:`Card ${idx+1} of ${queue.length}` });
  const card = el('div', { class:'quiz-block' });
  card.append(el('div', { style:'font-family:var(--display);font-size:20px;font-weight:800;color:var(--ink);margin-bottom:16px;text-align:center;padding:20px 0;', text:item.t }));
  const revealBtn = el('button', { type:'button', class:'lesson-nav-btn primary', style:'display:block;margin:0 auto;', text:'Reveal Definition' });
  const answerWrap = el('div', { style:'display:none;margin-top:16px;' });
  answerWrap.append(el('div', { style:'font-size:13.5px;color:var(--ink2);line-height:1.75;padding:14px 16px;background:var(--canvas);border-radius:var(--r);margin-bottom:14px;', text:item.d }));
  const rateRow = el('div', { style:'display:flex;gap:10px;justify-content:center;' });
  const missBtn = el('button', { type:'button', class:'lesson-nav-btn', text:'😕 Missed It' });
  const gotBtn = el('button', { type:'button', class:'lesson-nav-btn primary', text:'✅ Got It' });
  rateRow.append(missBtn, gotBtn);
  answerWrap.append(rateRow);
  revealBtn.addEventListener('click', () => { revealBtn.style.display='none'; answerWrap.style.display='block'; });
  function rate(correct){
    STATE.recall[item.t] = { lastMissed: !correct };
    saveState();
    track('recall_answer', { term:item.t, correct });
    renderRecallCard(queue, idx+1, { correct: tally.correct + (correct?1:0), missed: tally.missed + (correct?0:1) });
  }
  missBtn.addEventListener('click', () => rate(false));
  gotBtn.addEventListener('click', () => rate(true));
  card.append(revealBtn, answerWrap);
  body.append(progress, card);
}

/* ---------------- DEAL ROOM ---------------- */
function buildDealRoomPage(){
  const page = el('div', { class:'page', id:'page-dealroom' });
  const header = el('div', { class:'lesson-header', style:'padding-bottom:16px;' },
    el('h1', { class:'lesson-title', style:'color:var(--amber);' }, '💼 Deal Room'),
    el('div', { class:'lesson-subtitle' }, 'Apply everything you\'ve learned to real company briefs — exactly like a first-year analyst would. These are guided case studies, not auto-graded models: work through the brief, then use the linked calculators and lessons to build your own numbers.'));
  page.append(header);
  const grid = el('div', { class:'deal-grid' });
  DEALS.forEach(d => {
    const card = el('button', { type:'button', class:'deal-card' },
      el('div', { class:'deal-card-top' },
        el('div', { class:`deal-tag tag-${d.tag}` }, d.tagLabel),
        el('div', { class:'deal-name', text:d.name }),
        el('div', { class:'deal-desc', text:d.desc })),
      el('div', { class:'deal-card-bottom' },
        el('div', { style:'display:flex;gap:5px;flex-wrap:wrap;' }, ...d.pills.map(pl=>el('span',{class:'deal-model-pill'},pl))),
        el('div', { style:'font-size:11px;font-weight:600;color:var(--ink4);' }, '⭐'.repeat(d.difficulty)+' '+['','Beginner','Intermediate','Advanced'][d.difficulty])));
    card.addEventListener('click', () => openLesson('deal-'+d.id));
    grid.append(card);
  });
  page.append(grid);
  return page;
}

function buildDealDetailPage(d){
  const page = el('div', { class:'page', id:'page-deal-'+d.id });
  const header = el('div', { class:'lesson-header', style:'padding-bottom:16px;' },
    el('div', { class:'lesson-breadcrumb' },
      (()=>{ const b=el('button',{type:'button',text:'Home'}); b.addEventListener('click',()=>showPage('home')); return b; })(),
      ' / ',
      (()=>{ const b=el('button',{type:'button',text:'Deal Room'}); b.addEventListener('click',()=>showPage('dealroom')); return b; })(),
      ' / ', el('span', { text:d.name })),
    el('h1', { class:'lesson-title', text:d.name }),
    el('div', { class:'lesson-subtitle' }, el('span',{class:`deal-tag tag-${d.tag}`},d.tagLabel)));
  page.append(header);
  const body = el('div', { class:'deal-detail' });
  body.append(el('div', { class:'concept-block' },
    el('div', { class:'block-label' }, 'The Brief'),
    el('div', { class:'concept-a', text:d.brief })));
  body.append(el('div', { class:'concept-block' },
    el('div', { class:'block-label' }, 'How To Approach It'),
    (() => {
      const list = el('div', { class:'steps-list' });
      d.approach.forEach((step,i) => list.append(el('div', { class:'step-item' },
        el('div', { class:'step-num', 'aria-hidden':'true' }, String(i+1)),
        el('div', { class:'step-text', text:step }))));
      return list;
    })()));
  const linkWrap = el('div', { style:'display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;' });
  d.links.forEach(id => {
    const label = { dcf:'DCF Lesson','dcf-calc':'DCF Calculator', comps:'Comps Lesson', prec:'Precedent Tx Lesson', football:'Football Field', lbo:'LBO Lesson', 'lbo-calc':'LBO Calculator', credit:'Credit Lesson', merger:'Merger Model Lesson' }[id] || id;
    const targetId = id === 'dcf-calc' ? 'dcf' : id === 'lbo-calc' ? 'lbo' : id;
    const btn = el('button', { type:'button', class:'lesson-nav-btn', text:'→ ' + label });
    btn.addEventListener('click', () => {
      openLesson(targetId);
      if (id.endsWith('-calc')) setTimeout(()=>switchTab(targetId,'calc'), 60);
    });
    linkWrap.append(btn);
  });
  body.append(linkWrap);
  page.append(body);
  const nav = el('div', { class:'lesson-nav' });
  const backBtn = el('button', { type:'button', class:'lesson-nav-btn', text:'← Deal Room' });
  backBtn.addEventListener('click', () => showPage('dealroom'));
  nav.append(backBtn);
  page.append(nav);
  return page;
}

/* ---------------- GLOSSARY ---------------- */
function buildGlossaryPage(){
  const page = el('div', { class:'page', id:'page-glossary' });
  const wrap = el('div', { style:'padding:32px 40px;' });
  wrap.append(el('div', { class:'section-heading' }, 'Finance Glossary'));
  wrap.append(el('p', { style:'font-size:13.5px;color:var(--ink3);line-height:1.75;margin-bottom:24px;', text:`Every term you'll encounter — defined plainly, not academically. ${GLOSSARY.length} terms.` }));
  const search = el('input', { type:'text', placeholder:'Search terms...', 'aria-label':'Search glossary terms', style:'width:100%;max-width:400px;padding:10px 14px;border:1.5px solid var(--line-ui);border-radius:var(--r);font-size:14px;font-family:var(--sans);color:var(--ink2);outline:none;margin-bottom:20px;display:block;' });
  search.addEventListener('input', () => renderGlossaryList(search.value));
  wrap.append(search);
  wrap.append(el('div', { id:'glossary-list' }));
  page.append(wrap);
  return page;
}
function renderGlossaryList(filter){
  const f = filter.toLowerCase().trim();
  const items = GLOSSARY.filter(g => !f || g.t.toLowerCase().includes(f) || g.d.toLowerCase().includes(f));
  const list = byId('glossary-list');
  list.innerHTML = '';
  if (!items.length) { list.append(el('div', { style:'color:var(--ink4);font-size:13px;padding:16px 0;', text:'No terms match.' })); return; }
  items.forEach(g => list.append(el('div', { style:'border-bottom:1px solid var(--line2);padding:14px 0;' },
    el('div', { style:'font-family:var(--mono);font-size:12px;font-weight:700;color:var(--blue);margin-bottom:5px;', text:g.t }),
    el('div', { style:'font-size:13px;color:var(--ink3);line-height:1.75;', text:g.d }))));
}

/* ---------------- INIT ---------------- */
function init(){
  buildSidebar();
  const mainArea = byId('mainArea');
  mainArea.append(buildHomePage());
  mainArea.append(buildLearnIndexPage());
  mainArea.append(buildPracticePage());
  mainArea.append(buildRecallPage());
  mainArea.append(buildDealRoomPage());
  DEALS.forEach(d => mainArea.append(buildDealDetailPage(d)));
  mainArea.append(buildGlossaryPage());
  LESSONS.forEach(l => mainArea.append(buildLessonPage(l)));
  applyCompletionState();

  document.querySelectorAll('.top-nav-btn').forEach(b => b.addEventListener('click', () => showPage(b.dataset.page)));
  byId('logoBtn').addEventListener('click', () => showPage('home'));
  byId('menuToggle').addEventListener('click', () => {
    byId('sidebar').classList.contains('open') ? closeMobileSidebar() : openMobileSidebar();
  });
  byId('sidebarScrim').addEventListener('click', closeMobileSidebar);

  window.addEventListener('hashchange', () => renderRoute(parseHash()));
  const initial = parseHash();
  if (!location.hash) history.replaceState(null, '', '#/home');
  renderRoute(initial);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
