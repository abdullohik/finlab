# FinLab — Finance Education Platform

Finance education for students breaking into investment banking, private equity, and credit.

The same analytical frameworks used by analysts at banks, PE firms, and credit funds — taught from first principles, with real examples and live calculators you're encouraged to break on purpose.

## What's Inside
- 13-lesson learning path across 4 modules (Financial Statements → Valuation → Deals & Transactions → Advanced Analysis), plus a module quiz and a final assessment
- 4 live calculators: DCF (with an honest "undefined" state when WACC ≤ terminal growth), LBO (real cash-tax/CapEx schedule, not a magic constant), Credit Ratios, and a Football Field valuation-range builder
- 3 guided Deal Room case studies (sell-side M&A, PE buyout/credit, corporate M&A) linking back to the relevant lessons and calculators
- 31-term searchable finance glossary
- XP, streak, and quiz progress persisted locally in the browser (`localStorage`) — refreshing the page doesn't wipe progress
- Self-hosted fonts (no third-party font-CDN requests), keyboard-navigable UI with a real WCAG-AA-checked color palette, and a responsive layout down to phone widths
- Every page has a real, shareable URL (`#/dcf`, `#/deal-atlas`, ...) that survives refresh and works with the browser back/forward buttons

## Architecture
Static site, no build step: `index.html` (shell) + `css/style.css` + `js/data.js` (all lesson/quiz/glossary/deal content, data-only) + `js/engine.js` (renderer, state, calculators, router). Adding a lesson means adding an object to `js/data.js`, not writing markup.

Navigation is hash-based (`location.hash` + a `hashchange` listener) — `js/engine.js`'s `renderRoute(id)` is the single dispatcher: lesson ids render a lesson page, everything else (`home`, `dealroom`, `deal-atlas`, ...) renders whatever page element matches `#page-<id>`. Adding a new top-level page or Deal Room case is automatically linkable without touching the router.

## Analytics
There's no third-party analytics script (keeps the CSP locked to `'self'` and nothing about a student's usage leaves their browser). Every meaningful interaction — page views, lesson views/completions, quiz answers, calculator opens — already flows through one function, `track(event, props)` in `js/engine.js`. To wire in a real backend later:
1. Pick a static-site-friendly provider (Plausible, GoatCounter, Fathom, or your own endpoint).
2. Add its snippet/fetch call inside `track()`.
3. Add its origin to the CSP `connect-src`/`script-src` in `index.html`.

Until then, `track()` mirrors every event to `console.debug` and keeps the last 200 events in `sessionStorage` — open devtools and run `FinLabDebug.events()` in the console to inspect your own session while testing.

## Live Demo
👉 https://abdullohik.github.io/finlab

## Built by
Abdulloh Khabibullaev — Economics & IR, Webster University Tashkent
