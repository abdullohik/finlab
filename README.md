# FinLab — Finance Education Platform

Finance education for students breaking into investment banking, private equity, and credit.

The same analytical frameworks used by analysts at banks, PE firms, and credit funds — taught from first principles, with real examples and live calculators you're encouraged to break on purpose.

## What's Inside
- 13-lesson learning path across 4 modules (Financial Statements → Valuation → Deals & Transactions → Advanced Analysis), plus a module quiz and a final assessment
- 4 live calculators: DCF (with an honest "undefined" state when WACC ≤ terminal growth), LBO (real cash-tax/CapEx schedule, not a magic constant), Credit Ratios, and a Football Field valuation-range builder
- 3 guided Deal Room case studies (sell-side M&A, PE buyout/credit, corporate M&A) linking back to the relevant lessons and calculators
- 31-term searchable finance glossary
- XP, streak, and quiz progress persisted locally in the browser (`localStorage`) — refreshing the page doesn't wipe progress
- Self-hosted fonts (no third-party font-CDN requests), keyboard-navigable UI, and a responsive layout down to phone widths

## Architecture
Static site, no build step: `index.html` (shell) + `css/style.css` + `js/data.js` (all lesson/quiz/glossary/deal content, data-only) + `js/engine.js` (renderer, state, calculators). Adding a lesson means adding an object to `js/data.js`, not writing markup.

## Live Demo
👉 https://abdullohik.github.io/finlab

## Built by
Abdulloh Khabibullaev — Economics & IR, Webster University Tashkent
