/* FinLab content data — every lesson, quiz, glossary term, and deal case lives here.
   Adding a lesson means adding an object to LESSONS, not writing markup. */

const MODULES = [
  { id:'fs',    name:'Financial Statements', icon:'📊', color:'blue',   desc:'Learn to read Income Statements, Balance Sheets, and Cash Flow Statements the way analysts actually do. Everything starts here.' },
  { id:'val',   name:'Valuation Models',     icon:'🎯', color:'teal',   desc:'DCF, Comps, and Precedent Transactions — how to value any company, with live calculators to practice on every concept.' },
  { id:'deals', name:'Deals & Transactions', icon:'⚡', color:'purple', desc:'LBO modelling, merger analysis, credit assessment — the deal-execution toolkit used by PE firms and investment banks.' },
  { id:'adv',   name:'Advanced Analysis',    icon:'🔍', color:'amber',  desc:'Football field charts, red flag detection, and understanding how bankers, PE investors, and credit officers think differently.' },
];

/* ---------- QUIZ ANSWER FORMAT ----------
   quiz: [{ q:'...', opts:['a','b','c','d'], correct: 1, why:'short explanation shown on the feedback line' }]
   correct is the index into opts. Nothing answer-related lives in markup or onclick attributes. */

const LESSONS = [

/* ============ MODULE 1 — FINANCIAL STATEMENTS ============ */
{
  id:'fs-intro', module:'fs', type:'lesson', title:'What Are Financial Statements?',
  subtitle:'Module 1 · Lesson 1 of 5 · 8 min read', minutes:8,
  blocks:[
    { type:'concept', label:'The Big Picture', q:'What is a financial statement, and why does every banker read one first?',
      a:"A financial statement is a company's official record of its financial activity — how much it earned, what it owns, what it owes, and how much cash moved in and out. Every public company publishes these every quarter and year. <strong>Analysts, bankers, and investors use these three documents to make every major financial decision.</strong><br><br>When a bank evaluates whether to lend to a company, they read its financial statements. When a PE firm considers buying a business, they read its financial statements. When you value a company in a DCF, every input comes from financial statements. Everything in finance starts here." },
    { type:'analogy', text:"Imagine you're buying a used car from someone. You'd want to know three things: How much did they earn from using it? (Income Statement). What is it worth today, and does it have any loans on it? (Balance Sheet). Did it actually generate cash, or was it always being repaired? (Cash Flow). Same logic — just much bigger numbers." },
    { type:'concept', label:'The Three Statements', q:'Three documents. Each answers a completely different question.',
      steps:[
        { t:'Income Statement', d:'"Did we make money this period?" Covers a window of time (Q1, or the full year). Shows revenue, costs, and profit. Also called the P&L (Profit &amp; Loss). This is what most people look at first — and what most people misread.' },
        { t:'Balance Sheet', d:'"What do we own and owe right now?" A snapshot at a single point in time — not a period. Shows assets (what the company owns), liabilities (what it owes), and equity (what\'s left for shareholders). Must always balance: Assets = Liabilities + Equity. Always.' },
        { t:'Cash Flow Statement', d:'"Where did the actual cash go?" Shows the movement of real cash — in and out. Often reveals a completely different picture from the profit numbers. The most honest of the three.' },
      ] },
    { type:'concept', label:'How They Connect', q:'These three are not separate documents — they are one interconnected system.',
      a:"<strong>Net Income</strong> from the Income Statement flows into <strong>Retained Earnings</strong> on the Balance Sheet every single period. This is how profitable companies build equity over time.<br><br>The Cash Flow Statement <strong>starts with Net Income</strong> from the Income Statement, then adjusts for every non-cash item to arrive at actual cash generated. The final net change in cash must match the <strong>change in the Cash line</strong> on the Balance Sheet.<br><br>If any of these links don't reconcile — something is wrong. Either an accounting error, or something deliberately hidden." },
    { type:'warn', label:'The most important rule in all of accounting', text:'<strong>Net Income is not Cash.</strong> A company can report $200M of profit and simultaneously be running out of money. It can also report a loss while generating strong cash. This disconnect — between what is earned and what is collected — is the entire reason the Cash Flow Statement exists. And it is the most common place where financial problems (and outright fraud) are hidden.' },
    { type:'realworld', label:'Luckin Coffee (2020)', body:'Luckin Coffee reported strong revenue growth for years. But analysts who compared the Income Statement to the Cash Flow Statement noticed operating cash flow was consistently far below reported profits — revenue was being recognised before cash was collected. In April 2020 the company admitted it had fabricated $310M of revenue. The red flag was visible in the financial statements quarters earlier — if you knew what to look for.' },
  ],
  quiz:[
    { q:"Which financial statement shows a company's revenue, costs, and profit over a period of time?", opts:['Balance Sheet','Income Statement','Cash Flow Statement','Statement of Changes in Equity'], correct:1 },
    { q:'A company reports $150M net income but only $20M cash from operations. What does this most likely indicate?', opts:['The company is very efficient at collecting cash','The balance sheet must be negative','Revenue is being recognised before cash is collected — an earnings quality concern','The company should pay a larger dividend'], correct:2 },
    { q:'Which equation must ALWAYS hold on a Balance Sheet?', opts:['Revenue − Costs = Profit','Assets = Liabilities + Equity','Cash In − Cash Out = Net Change','EV = Market Cap + Net Debt'], correct:1 },
  ]
},

{
  id:'income-stmt', module:'fs', type:'lesson', title:'The Income Statement',
  subtitle:'Module 1 · Lesson 2 of 5 · 10 min read', minutes:10,
  blocks:[
    { type:'concept', label:'Core Concept', q:'What question does the Income Statement answer, and why does it read top to bottom like a waterfall?',
      a:"The Income Statement answers one question: <strong>did the business make money this period, and where did it go?</strong> It starts with everything the company sold (Revenue) and subtracts costs in a specific order, so each stopping point tells you something different about the business." },
    { type:'analogy', text:"Think of a lemonade stand. You sell $100 of lemonade (Revenue). Lemons and sugar cost $30 — that leaves $70 (Gross Profit), which tells you how good your product economics are. Then you pay $20 for your stand's rent and your assistant (Operating Expenses) — $50 left (Operating Profit / EBIT), which tells you how well you run the business day-to-day. Finally you pay interest on the loan you took to build the stand, and tax — whatever survives all of that is what you actually keep (Net Income)." },
    { type:'concept', label:'The Waterfall', q:'Six lines, six different questions.', steps:[
        { t:'Revenue', d:'Total sales. The top line — everything else is a subtraction from here.' },
        { t:'− COGS = Gross Profit', d:'Cost of Goods Sold: the direct cost of what was sold. Gross Profit ÷ Revenue = Gross Margin, the cleanest read on product/pricing economics.' },
        { t:'− OpEx = EBIT', d:'Operating Expenses: salaries, marketing, R&D, rent — running the business. EBIT (Earnings Before Interest &amp; Tax) is "operating profit" — how the business performs independent of how it\'s financed.' },
        { t:'− Interest = EBT', d:'Interest on debt. This is where capital structure (how much the company borrowed) starts to matter.' },
        { t:'− Tax = Net Income', d:'What survives everything. Flows into Retained Earnings on the Balance Sheet.' },
      ] },
    { type:'keyterms', items:[
        { n:'Gross Margin', d:'Gross Profit ÷ Revenue. Software: 70–90%. Retail: 20–40%. Tells you product economics before any overhead.' },
        { n:'EBITDA', d:'EBIT + Depreciation & Amortization added back. A rough proxy for operating cash generation — the most commonly quoted profitability number in deal conversations.' },
        { n:'Net Margin', d:'Net Income ÷ Revenue. The final, all-in profitability number — after interest, tax, everything.' },
        { n:'Non-recurring Item', d:'A one-time gain or charge (a lawsuit settlement, a factory closure) that doesn\'t reflect ongoing operations. Analysts strip these out to see the "real" run-rate business.' },
      ] },
    { type:'warn', label:'"Adjusted" numbers deserve a second look', text:'Companies often report "Adjusted EBITDA" — a version with certain costs excluded because management calls them one-time or non-cash. Sometimes that\'s fair. Sometimes the same "one-time" charge shows up every single quarter. Always check what was adjusted out and ask whether it\'s really non-recurring.' },
    { type:'realworld', label:'WeWork\'s S-1 (2019)', body:'WeWork\'s IPO filing introduced a metric called "Community Adjusted EBITDA" — which excluded not just interest and tax, but also marketing, admin costs, and stock compensation. By that measure the company looked profitable. By standard GAAP net income, it lost $1.9B in the prior year. Investors who read past the adjusted number balked, and the IPO collapsed within weeks.' },
  ],
  quiz:[
    { q:'Gross Profit is calculated as:', opts:['Revenue minus Operating Expenses','Revenue minus COGS','EBIT minus Interest','Net Income plus Tax'], correct:1 },
    { q:'A company reports strong "Adjusted EBITDA" every quarter, but the adjustments (mostly stock compensation) recur every single period. What should an analyst do?', opts:['Trust the adjusted number — management knows the business best','Treat the recurring "adjustment" as a real cost and question the adjusted metric', 'Ignore the Income Statement entirely and use the Balance Sheet instead', 'Average the adjusted and unadjusted numbers'], correct:1 },
    { q:'Which margin is the cleanest read on pricing power and product economics, before any overhead is included?', opts:['Net Margin','EBITDA Margin','Gross Margin','Operating Margin'], correct:2 },
  ]
},

{
  id:'balance-sheet', module:'fs', type:'lesson', title:'The Balance Sheet',
  subtitle:'Module 1 · Lesson 3 of 5 · 10 min read', minutes:10,
  blocks:[
    { type:'concept', label:'Core Concept', q:'What does the Balance Sheet capture that the Income Statement can\'t?',
      a:"The Balance Sheet is a <strong>snapshot at one exact moment</strong> — not a period. It answers: what does the company own (Assets), what does it owe (Liabilities), and what's left over for shareholders (Equity)? The defining feature is that it must always balance: <strong>Assets = Liabilities + Equity</strong>. Every single asset was paid for either by borrowing (a liability) or by the owners' own money (equity) — there's no third option." },
    { type:'analogy', text:"It's your personal net worth statement. Your house and car are assets. Your mortgage and car loan are liabilities. What's left if you sold everything and paid off every debt — that's your equity. A company's Balance Sheet is the exact same idea, just with more line items." },
    { type:'concept', label:'The Three Sections', q:'Assets, Liabilities, and Equity — each has a current (within 1 year) and non-current split.', steps:[
        { t:'Assets', d:'Current: cash, receivables, inventory — things that turn into cash within a year. Non-current: property, equipment, goodwill — things held for the long run.' },
        { t:'Liabilities', d:'Current: accounts payable, short-term debt — due within a year. Non-current: long-term debt, pension obligations — due later.' },
        { t:'Equity', d:'Share capital raised from investors, plus Retained Earnings (all profit ever kept, never paid out as dividends). What shareholders actually own.' },
      ] },
    { type:'keyterms', items:[
        { n:'Working Capital', d:'Current Assets − Current Liabilities. Positive means the company can cover its near-term obligations from near-term assets.' },
        { n:'Goodwill', d:'The premium paid above fair value in an acquisition. Not a real, sellable asset — if the acquisition disappoints, this gets written down, destroying book equity instantly.' },
        { n:'Retained Earnings', d:'Cumulative profit ever earned minus all dividends ever paid. The direct link from the Income Statement into the Balance Sheet.' },
        { n:'Net Debt', d:'Total Debt minus Cash. Negative net debt means the company holds more cash than it owes — a strong position.' },
      ] },
    { type:'warn', label:'A snapshot can be staged', text:'Because the Balance Sheet is measured on one specific date, companies sometimes temporarily improve it right before that date — paying down debt just before quarter-end, then re-borrowing right after ("window dressing"). Compare quarter-end balances to the average balance during the quarter when something looks unusually clean.' },
    { type:'realworld', label:'Enron\'s Off-Balance-Sheet Entities (2001)', body:"Enron used special purpose entities (SPEs) — technically separate companies — to move billions in debt off its own Balance Sheet, so its official liabilities looked far smaller than reality. Assets looked strong; the debt backing them was hidden in a web of related entities. When the structure unravelled, Enron collapsed within weeks. It's the textbook case for why analysts read the footnotes, not just the summary lines." },
  ],
  quiz:[
    { q:'Which equation must always hold true on a Balance Sheet?', opts:['Revenue − Costs = Profit','Assets = Liabilities + Equity','Cash In − Cash Out = Net Change','EBITDA = EBIT + D&A'], correct:1 },
    { q:'A company pays off short-term debt three days before quarter-end, then re-borrows the same amount three days after. What is this called, and why does it matter?', opts:['Normal cash management — it doesn\'t matter','"Window dressing" — it temporarily flatters a snapshot metric that resets right after','Debt restructuring — it permanently lowers leverage','A covenant breach'], correct:1 },
    { q:'Goodwill on the Balance Sheet represents:', opts:['Cash held in reserve','The premium paid above fair value of net assets in an acquisition','Total shareholder equity','Unpaid customer invoices'], correct:1 },
  ]
},

{
  id:'cashflow', module:'fs', type:'lesson', title:'Cash Flow Statement',
  subtitle:'Module 1 · Lesson 4 of 5 · 10 min read', minutes:10,
  blocks:[
    { type:'concept', label:'Core Concept', q:'Why does the Cash Flow Statement exist when we already have Net Income?',
      a:"Net Income includes non-cash items (depreciation, changes in receivables and payables) that don't reflect actual money moving. The Cash Flow Statement strips all of that out and shows <strong>real cash</strong> — split into three buckets that each tell a different story about how the business is funded and where money is going." },
    { type:'analogy', text:"It's your bank statement, not your budget spreadsheet. Your budget might say you \"earned\" $3,000 this month, but if a client hasn't paid your invoice yet, that money isn't in your account. The Cash Flow Statement is the bank-statement version of the Income Statement — what actually moved." },
    { type:'concept', label:'The Three Sections', q:'Operating, Investing, Financing — each answers a different question.', steps:[
        { t:'Operating (CFO)', d:'Starts with Net Income, adds back non-cash items (like Depreciation), then adjusts for changes in working capital (receivables, payables, inventory). Answers: "does the core business generate cash?"' },
        { t:'Investing (CFI)', d:'Cash spent on CapEx (equipment, buildings) or acquisitions, and cash received from selling assets. Answers: "how much is the company reinvesting in itself?"' },
        { t:'Financing (CFF)', d:'Cash from issuing debt or equity, minus cash used to repay debt, buy back stock, or pay dividends. Answers: "how is the company funded, and is it returning cash to owners or borrowers?"' },
      ] },
    { type:'formula', html:`<span class="fc">Free Cash Flow (FCF)</span> = <span class="fv">CFO</span> − <span class="fv">CapEx</span>
<span class="cm">// The single most important number in valuation — this is what a DCF discounts.</span>
<span class="cm">// "Free" means free to distribute to lenders and shareholders after keeping the business running.</span>` },
    { type:'warn', label:'CFO can be flattered short-term', text:'A company can temporarily boost operating cash flow by stretching out payments to suppliers (delaying payables) or selling receivables to a factoring company. Neither improves the underlying business — both are one-time cash pulls that reverse eventually. A rising CFO built on stretching payables, not on more sales, is a flag, not a win.' },
    { type:'realworld', label:'General Electric (2018)', body:"For years GE's headline earnings looked stable while cash generation from its core industrial business was quietly weakening — obscured partly by its finance arm and long-term insurance liabilities that didn't require cash today but would eventually. When the gap between reported profit and real cash could no longer be papered over, GE cut its dividend and its stock fell more than 50% in 2018. The Income Statement told one story; the Cash Flow Statement, read carefully, told the truer one." },
  ],
  quiz:[
    { q:'Free Cash Flow is calculated as:', opts:['Net Income minus Dividends','Operating Cash Flow minus CapEx','Revenue minus COGS','EBITDA minus Interest'], correct:1 },
    { q:'A company\'s operating cash flow rises sharply, driven mostly by delaying payments to suppliers rather than higher sales. How should an analyst read this?', opts:['As a genuine improvement in the business','As a one-time cash pull that will likely reverse — not a sign of stronger operations','As evidence of accounting fraud automatically','It has no effect on future cash flow'], correct:1 },
    { q:'Which section of the Cash Flow Statement shows cash spent on new equipment or acquisitions?', opts:['Operating Activities','Investing Activities','Financing Activities','None — CapEx appears only on the Balance Sheet'], correct:1 },
  ]
},

{
  id:'fs-quiz', module:'fs', type:'quiz', title:'Statements Quiz',
  subtitle:'Module 1 · Capstone Quiz · 5 min', minutes:5,
  intro:'You\'ve now covered all three financial statements — and how they connect. This quiz mixes concepts across the Income Statement, Balance Sheet, and Cash Flow Statement, the way a real interview question would.',
  quiz:[
    { q:'Which two statements does Net Income flow into or connect through?', opts:['Balance Sheet (via Retained Earnings) and the Cash Flow Statement (as the starting line)','Only the Cash Flow Statement','Only the Balance Sheet','Neither — Net Income is a standalone figure'], correct:0 },
    { q:'A company shows rising revenue and rising net income, but its receivables are growing even faster than revenue. What is the most likely concern?', opts:['The company is collecting cash faster than it sells','Cash is being converted into inventory','Revenue is being booked before cash is actually collected — a quality-of-earnings flag','Nothing — growing receivables always means growing sales'], correct:2 },
    { q:'Which financial statement would you check FIRST to find out how much debt a company currently has outstanding?', opts:['Income Statement','Balance Sheet','Cash Flow Statement','None of the three — debt isn\'t disclosed'], correct:1 },
    { q:'EBITDA is intended to approximate:', opts:['Net cash in the bank','Operating cash generation, before financing and accounting choices','Total shareholder equity','Revenue growth rate'], correct:1 },
    { q:'A company reports positive Net Income but negative Free Cash Flow every year for three years straight. What should an analyst do?', opts:['Nothing — profitable companies always have positive FCF eventually', 'Investigate why: heavy growth CapEx can explain it honestly, but so can earnings manipulation — the statements need to be read together, not separately', 'Assume fraud immediately','Only look at the next quarter\'s Income Statement'], correct:1 },
  ]
},

/* ============ MODULE 2 — VALUATION MODELS ============ */
{
  id:'val-intro', module:'val', type:'lesson', title:'What Is Valuation?',
  subtitle:'Module 2 · Lesson 1 of 4 · 6 min read', minutes:6,
  blocks:[
    { type:'concept', label:'The Big Picture', q:'"What is this company worth?" — and why there is never exactly one answer.',
      a:"Valuation is the process of putting a number on a business. Every deal — an IPO, an acquisition, a fundraise — needs one. But no method is perfectly right, so analysts always build <strong>several</strong> and present a range, not a single figure. There are two broad families of approach." },
    { type:'analogy', text:"It's like getting a house appraised before you buy it. An appraiser might build an income-based estimate (what could this property earn as a rental, discounted for risk — that's intrinsic value). Or they might just look at what similar houses on the street recently sold for (that's relative value). Neither is \"the\" answer — a good buyer looks at both." },
    { type:'concept', label:'Two Families of Method', q:'Intrinsic value vs. relative value.', steps:[
        { t:'Intrinsic Value — DCF', d:'Values a company based purely on the cash it will generate in the future, discounted back to today. Theoretically the most rigorous. Practically the most sensitive to assumptions.' },
        { t:'Relative Value — Comps & Precedent Transactions', d:'Values a company based on what similar companies trade for in the market (Comps), or what similar companies were actually acquired for (Precedent Transactions, which include a control premium). Fast, market-anchored, but only as good as the peer set.' },
      ] },
    { type:'keyterms', items:[
        { n:'Valuation Range', d:'The output of a real valuation exercise — a low-to-high band from multiple methods, not one number. See it visualised in the Football Field lesson.' },
        { n:'Control Premium', d:'The extra amount a buyer pays to gain full control of a company, above its current trading price. Typically 25–40%.' },
        { n:'Enterprise Value (EV)', d:'What the whole business is worth to all capital providers — debt and equity together. The common currency every valuation method converts into.' },
      ] },
    { type:'insight', text:'No single method is "the truth." When a bank presents a valuation, it shows a DCF range next to a Comps range next to a Precedent Transactions range, on one chart — the Football Field. Where those ranges overlap is the most defensible answer. The analyst\'s real job is explaining why they agree or disagree, not picking a favorite.' },
  ],
  quiz:[
    { q:'Which of these is an "intrinsic value" approach to valuation?', opts:['Comparable Company Analysis','Precedent Transactions','Discounted Cash Flow','Trading multiples'], correct:2 },
    { q:'Why do Precedent Transactions typically imply a higher value than trading Comps for the same company?', opts:['They use older data, which is always higher','They include a control premium — the extra paid to acquire the whole company','They ignore EBITDA entirely','Comps are always wrong'], correct:1 },
    { q:'What is the standard way to present a valuation conclusion in a real pitch book?', opts:['A single precise number','A range from multiple methods shown together, e.g. on a Football Field chart','Only the DCF result, since it\'s theoretically the most correct','Whatever number the client wants to hear'], correct:1 },
  ]
},

{
  id:'dcf', module:'val', type:'lesson', title:'Discounted Cash Flow (DCF)',
  subtitle:'Module 2 · Lesson 2 of 4 · 12 min read', minutes:12,
  calc:'dcf',
  blocks:[
    { type:'concept', label:'Core Concept', q:'What is a DCF and what question does it answer?',
      a:"A DCF asks: <em>what is this company intrinsically worth, based purely on the cash it will generate in the future?</em><br><br>The core idea: <strong>a dollar you receive in the future is worth less than a dollar you receive today.</strong> Two reasons: you could invest today's dollar and earn a return, and there's always risk the future dollar never arrives. A DCF captures both factors — discounting every future cash flow back to its present value, then adding them up." },
    { type:'analogy', text:"Someone offers to pay you $100 in one year. If you could earn 10% investing elsewhere, you'd only pay $90.91 today for that promise ($100 ÷ 1.10). That's discounting. A DCF does this for every single year of a company's future cash flows — usually 10 years — then adds a \"terminal value\" for everything after." },
    { type:'concept', label:'The Three Inputs', q:'Every DCF needs exactly three things.', keyterms:[
        { n:'Free Cash Flow (FCF)', d:'The actual cash generated after maintaining and growing the business. Not profit — cash. = Operating Cash Flow minus CapEx. This is what gets discounted.' },
        { n:'WACC', d:'The discount rate. What return investors require to commit capital to this business. Higher risk = higher WACC = lower valuation today.' },
        { n:'Terminal Value', d:'The value of all cash flows beyond year 10, into perpetuity. Typically 60–80% of total DCF value. The most important and most dangerous input.' },
        { n:'Enterprise Value (EV)', d:'The output. Total value of the business to all capital providers. Subtract Net Debt to get Equity Value, divide by shares for per-share price.' },
      ] },
    { type:'formula', html:`<span class="fc">EV</span> = <span class="fo">Σ</span> [<span class="fv">FCFₜ</span> ÷ (<span class="fc">1 + WACC</span>)<span class="fv">ᵗ</span>]  +  <span class="fc">Terminal Value</span> ÷ (<span class="fc">1 + WACC</span>)<span class="fv">ⁿ</span>

<span class="cm">// Terminal Value — Gordon Growth Model:</span>
<span class="fc">TV</span> = <span class="fv">FCFₙ</span> × (<span class="fv">1 + g</span>) ÷ (<span class="fc">WACC</span> - <span class="fv">g</span>)
<span class="cm">// g = terminal growth rate (~2–3%, close to long-run GDP)</span>
<span class="cm">// WACC must be greater than g — or the formula is mathematically undefined</span>

<span class="cm">// Bridge to Equity:</span>
<span class="fc">Equity Value</span> = EV - Net Debt
<span class="fc">Share Price</span>  = Equity Value ÷ Diluted Shares Outstanding` },
    { type:'warn', label:'The Terminal Value Trap', text:'In most DCFs, <strong>60–80% of total EV comes from terminal value</strong> — not from the 10 years you projected. A tiny change in terminal growth rate or WACC moves the final answer by 20–40%. This is why DCF outputs are always presented as a range with a full sensitivity table — never as a single number.' },
    { type:'concept', label:'The Formula', q:'How to build a DCF — 6 steps', steps:[
        { t:'Project Revenue & Margins', d:'Forecast 5–10 years based on historical growth, industry trends, and management guidance.' },
        { t:'Calculate FCF each year', d:'EBIT × (1 − tax rate) + D&A − CapEx ± Working Capital changes. This is cash available to all capital providers.' },
        { t:'Calculate WACC', d:'Blend cost of equity (via CAPM: Rf + β × ERP) and after-tax cost of debt, weighted by capital structure. Typical range: 7–14%.' },
        { t:'Calculate Terminal Value', d:'Gordon Growth Model using a terminal growth rate, or an exit multiple applied to year-10 EBITDA.' },
        { t:'Discount everything', d:"Divide each year's FCF and the terminal value by (1 + WACC)^t. Sum all present values." },
        { t:'Bridge to equity', d:'EV minus Net Debt = Equity Value. Divide by diluted shares for implied share price. Compare to market price.' },
      ] },
    { type:'insight', text:'DCF is the theoretical anchor — never the only answer shown to a client. A DCF showing $2B when comps trade at $1.4B needs a clear explanation: either the assumptions are too aggressive or the market is mispricing. The analyst\'s job is to understand why the models disagree, not just run them.' },
    { type:'realworld', label:'Why Tech Crashed in 2022', body:'Zoom, Peloton, DocuSign lost 70–80% of their value in 2022 — not because their businesses collapsed, but because interest rates rose sharply. Higher rates → higher WACC → the same future cash flows are worth much less today. Companies where most of the DCF value was in distant future cash flows (high terminal value %) got hit hardest. Pure DCF theory playing out in real markets.' },
  ],
  quiz:[
    { q:'In a typical DCF, terminal value represents what fraction of total enterprise value?', opts:['10–20% — most value comes from the 10-year projection','30–50% — roughly half and half','60–80% — terminal value dominates almost all DCFs','90–100% — the projection period barely matters'], correct:2 },
    { q:'Interest rates rise sharply. What happens to DCF valuations of high-growth companies?', opts:['They increase — growth companies benefit from rising rates','They decrease sharply — higher WACC discounts future cash flows more heavily','They stay the same — rates don\'t affect equity valuation','It depends only on revenue growth'], correct:1 },
    { q:'Your DCF shows EV of $2B. Comps trade at EV of $1.4B. What is the correct response?', opts:['Always trust the DCF — it\'s theoretically superior','Ignore the DCF and use Comps only','Investigate why they diverge — check if DCF assumptions are too aggressive or if the market is mispricing','Average them and present $1.7B'], correct:2 },
  ]
},

{
  id:'comps', module:'val', type:'lesson', title:'Comparable Company Analysis',
  subtitle:'Module 2 · Lesson 3 of 4 · 10 min read', minutes:10,
  blocks:[
    { type:'concept', label:'Core Concept', q:'What is "Comps" and why is it usually the first valuation a banker runs?',
      a:"Comparable Company Analysis values a business by looking at what similar, publicly traded companies are worth right now, expressed as a multiple (like EV/EBITDA), and applying that multiple to your target's own numbers. It's fast, it's grounded in real market prices today, and it requires no assumptions about the distant future — which is exactly what a DCF can't offer." },
    { type:'analogy', text:'It\'s exactly how you\'d price a used car without hiring an appraiser: look at what similar cars — same make, similar mileage, similar year — are actually listed for right now, and use that as your anchor.' },
    { type:'concept', label:'How To Build It', q:'Five steps from peer set to implied value.', steps:[
        { t:'Select a peer set', d:'Companies in the same industry, similar size, similar growth and margin profile. This is the step that makes or breaks the analysis.' },
        { t:'Gather each peer\'s EV, EBITDA, Revenue', d:'Pull from public filings or market data. Calculate each peer\'s multiple: EV/EBITDA, EV/Revenue, P/E.' },
        { t:'Calculate the median (not average)', d:'Median resists distortion from one outlier company trading at a crazy multiple.' },
        { t:'Apply the multiple to your target', d:'Median EV/EBITDA × Target\'s EBITDA = Implied Enterprise Value for your target.' },
        { t:'Sanity check against DCF', d:'If Comps and DCF land in wildly different places, that gap itself is the analysis — dig into why.' },
      ] },
    { type:'keyterms', items:[
        { n:'EV/EBITDA', d:'The most widely used multiple. Capital-structure neutral, so it lets you compare companies with very different debt levels fairly.' },
        { n:'EV/Revenue', d:'Used when a company isn\'t yet profitable (common for high-growth startups) — EBITDA multiples don\'t work on negative EBITDA.' },
        { n:'P/E Ratio', d:'Price per share ÷ Earnings per share. An equity-level multiple (not EV-based) — sensitive to capital structure, so less clean for cross-company comparison.' },
        { n:'Peer Set', d:'The group of comparable companies chosen. The single biggest source of error in a Comps analysis — a bad peer set produces a meaningless multiple.' },
      ] },
    { type:'warn', label:'Garbage in, garbage out', text:'The whole method rests on one judgment call: who counts as "comparable"? Include a company that\'s twice the size, in a faster-growing niche, or in a different regulatory environment, and your multiple is quietly wrong. Always be ready to defend every name on your peer list.' },
    { type:'realworld', label:'SaaS Multiple Compression (2021 → 2022)', body:'High-growth SaaS companies traded at 30–40x revenue in late 2021. By late 2022, the same companies — often growing just as fast — traded at 4–8x revenue. Nothing about their businesses collapsed; the market\'s required return went up as interest rates rose, and every peer\'s multiple compressed together. This is the core weakness of Comps: it\'s only ever as good as what the market is willing to pay today, and that changes fast.' },
  ],
  quiz:[
    { q:'Why do analysts typically use the median multiple of a peer set rather than the average?', opts:['Median is always higher','Median resists distortion from one extreme outlier','Average is illegal to use in banking','They are always the same number'], correct:1 },
    { q:'Why is EV/EBITDA generally preferred over P/E for comparing companies with different amounts of debt?', opts:['EV/EBITDA is capital-structure neutral — it isn\'t affected by how much debt each company carries','P/E is always more accurate','EV/EBITDA ignores profitability entirely','They measure the exact same thing'], correct:0 },
    { q:'A SaaS company\'s revenue and growth rate are unchanged year over year, but its trading multiple falls from 35x to 7x revenue. What is the most likely explanation?', opts:['The company\'s fundamentals collapsed','The whole peer group re-rated lower as market conditions (like interest rates) changed','This is impossible','Its EBITDA turned negative'], correct:1 },
  ]
},

{
  id:'prec', module:'val', type:'lesson', title:'Precedent Transactions',
  subtitle:'Module 2 · Lesson 4 of 4 · 9 min read', minutes:9,
  blocks:[
    { type:'concept', label:'Core Concept', q:'How is this different from Comps, if both use multiples from other companies?',
      a:"Precedent Transactions values a company using multiples paid in <strong>actual past M&A deals</strong> for similar companies — not where similar companies currently trade, but what someone actually paid to buy one outright. That distinction matters enormously: acquiring a company means taking full control, and buyers pay extra for that." },
    { type:'analogy', text:'Comps is checking what similar houses are currently listed for. Precedent Transactions is checking what similar houses actually sold for recently — and sale prices run higher than list prices, because a buyer who wants a specific house badly enough will pay a premium to actually get it.' },
    { type:'concept', label:'Why It Runs Higher', q:'The control premium — and who pays it.', a:"A buyer acquiring 100% of a company gets full control: the right to change management, redirect cash flow, merge operations, sell assets. The current trading price only reflects a small minority stake changing hands. To convince existing shareholders to sell control, an acquirer typically pays a <strong>25–40% premium</strong> above the unaffected trading price. That premium is baked directly into every precedent transaction multiple." },
    { type:'keyterms', items:[
        { n:'Control Premium', d:'The extra amount paid above the pre-deal trading price to acquire a controlling stake. Historically 25–40%.' },
        { n:'Strategic Buyer', d:'A company buying a competitor or complementary business — usually pays more, because it can capture synergies (cost savings, cross-selling).' },
        { n:'Financial Buyer', d:'A PE firm buying purely for investment return — usually more price-disciplined, since there are no operational synergies to justify overpaying.' },
        { n:'Deal Multiple', d:'EV ÷ EBITDA (or Revenue) paid in a specific historical transaction — the raw data point this whole method is built from.' },
      ] },
    { type:'warn', label:'Precedent deals age fast', text:'A deal from three years ago was priced under different interest rates, different market sentiment, and possibly a different competitive landscape. And because M&A deals in any given sector are relatively rare, the sample size is often small — five or six data points, not fifty. Weight recent deals more heavily, and don\'t treat one outlier deal as the market standard.' },
    { type:'realworld', label:'Elon Musk / Twitter (2022)', body:'Musk\'s offer for Twitter was $54.20 per share — a roughly 38% premium over Twitter\'s trading price before the offer became public. That premium is a textbook control premium: the price to convince shareholders to give up the company entirely, not just trade shares on the open market. Every precedent transaction multiple has a version of that premium baked in.' },
  ],
  quiz:[
    { q:'Why do Precedent Transaction multiples typically imply higher values than trading Comps for the same industry?', opts:['They use fake data','They include a control premium paid to acquire the entire company','They only look at bankrupt companies','There is no real difference'], correct:1 },
    { q:'Which type of buyer typically pays the highest premium, and why?', opts:['A financial buyer, because PE firms always overpay','A strategic buyer, because it can capture cost or revenue synergies the target can\'t achieve alone','Neither — premiums are random','A retail investor'], correct:1 },
    { q:'What is a key limitation of Precedent Transactions as a valuation method?', opts:['It never uses real data','Deals age — a transaction from years ago reflects different market conditions, and sample sizes are often small','It is always identical to the DCF result','It cannot be used for private companies'], correct:1 },
  ]
},

/* ============ MODULE 3 — DEALS & TRANSACTIONS ============ */
{
  id:'lbo', module:'deals', type:'lesson', title:'The Leveraged Buyout (LBO)',
  subtitle:'Module 3 · Lesson 1 of 3 · 14 min read', minutes:14,
  calc:'lbo',
  blocks:[
    { type:'concept', label:'Core Concept', q:'What is an LBO and why does private equity use leverage?',
      a:"An LBO is when a private equity firm buys a company using mostly borrowed money. The PE firm puts in a small equity check — typically 30–40% of the purchase price — and borrows the rest (60–70%) from banks and bond markets. <em>The company itself then uses its own cash flows to repay that debt over 4–7 years.</em><br><br>The reason PE uses leverage is simple: it amplifies returns. Buy a $100 business with your own $100, sell for $120 — you made 20%. Buy the same $100 business with $40 of your money and $60 borrowed, sell for $120, pay back the $60 — you turned $40 into $60. That's 50%. <strong>Same business outcome. Dramatically different equity return.</strong>" },
    { type:'analogy', text:"Exactly like buying a house with a mortgage. Put down 20% ($40K), borrow 80% ($160K), buy a $200K house. House goes to $240K — you made $40K profit on your $40K investment: 100% return. Without the mortgage you'd have made $40K on $200K — only 20%. Leverage is the same mechanic, just applied to entire companies." },
    { type:'concept', label:'Three Value Creation Levers', q:'LBO returns come from exactly three places — and they are not all equally legitimate.', steps:[
        { t:'EBITDA Growth (~45% of returns)', d:'Revenue expansion, cost cutting, new products, bolt-on acquisitions. Real operational improvement. The most legitimate lever — real value created from the business itself.' },
        { t:'Debt Paydown (~27% of returns)', d:'Every dollar the business repays from its own cash flows transfers directly to equity value. Pure financial mechanics. No business improvement required. This is the financial engineering lever.' },
        { t:'Multiple Expansion (~28% of returns)', d:'Selling at a higher EV/EBITDA multiple than you paid. Can be market-driven or from transforming the business quality. Conservative models never assume this. Never build a return case that requires multiple expansion to work.' },
      ] },
    { type:'insight', text:'These percentages are broad industry estimates (commonly cited from research by firms like Bain & Company and McKinsey on historical PE returns) — actual splits vary a lot deal to deal. The point to remember is the ranking: operational improvement first, financial engineering second, hoping the market pays more third.' },
    { type:'keyterms', items:[
        { n:'IRR', d:'Internal Rate of Return. Annualised return on equity invested. PE target: 20–25%+. Below 15% = typically a failed investment that returns money but misses the fund hurdle.' },
        { n:'MOIC', d:'Multiple on Invested Capital. Exit equity ÷ entry equity. 3x means you tripled the money. Target: 2.5–3.5x. Below 2x = considered a failure regardless of IRR.' },
        { n:'Hold Period', d:'Typically 4–7 years. A 3x MOIC over 5 years ≈ 25% IRR. Same 3x over 7 years ≈ 17% IRR. Timing matters enormously. PE funds have a ~10-year life.' },
        { n:'Entry / Exit Multiple', d:'EV/EBITDA paid at purchase vs received at sale. Typical LBO entry: 8–14x. Conservative models hold entry = exit multiple. Multiple expansion is upside, never the base case.' },
      ] },
    { type:'warn', label:'Leverage amplifies losses too', text:"If the business EBITDA falls 30% in a recession, the equity can be completely wiped out while the debt sits at full face value. The company still owes every dollar. This is exactly why banks stress-test every LBO against a severe downside scenario before approving the debt package — and why covenant structures exist." },
    { type:'realworld', label:'Blackstone / Hilton Hotels (2007–2018)', body:'Blackstone acquired Hilton for $26B in 2007 — just before the financial crisis. Hilton\'s EBITDA fell ~40% in 2008–2009. Disaster scenario. Yet Blackstone generated ~$14B profit on exit in 2018 — the largest PE profit ever at that time. How? They renegotiated the debt during the crisis, installed new management, invested heavily in Hilton\'s Honors loyalty program, and expanded from 3,000 to 5,700 hotels globally. EBITDA more than doubled. Final return: ~3.0x MOIC, ~25% IRR over 10 years. The lesson: the best LBO returns come from real operational improvement — not financial engineering.' },
  ],
  quiz:[
    { q:'A PE firm buys a company for $500M: $200M equity, $300M debt. Sells for $700M five years later, having repaid $120M of debt. Approximate MOIC?', opts:['1.4x — Exit EV ($700M) divided by Entry EV ($500M)','2.6x — Exit equity ($520M) divided by Entry equity ($200M)','3.5x','1.0x — effectively broke even'], correct:1 },
    { q:'Which value creation lever is considered the most legitimate in an LBO?', opts:['Multiple expansion — buying cheap and selling at a premium','Debt paydown — using FCF to reduce borrowings mechanically','EBITDA growth — actually improving the business operationally','All three are equally legitimate'], correct:2 },
    { q:'Why do banks stress-test every LBO against a severe downside scenario before approving the loan?', opts:['To calculate a more accurate base-case return','Regulatory requirement with no practical purpose','If EBITDA falls significantly, the equity is wiped out but the debt still exists — the bank could lose the full loan','To negotiate a lower interest rate with the PE sponsor'], correct:2 },
  ]
},

{
  id:'merger', module:'deals', type:'lesson', title:'Merger Model — M&A',
  subtitle:'Module 3 · Lesson 2 of 3 · 11 min read', minutes:11,
  blocks:[
    { type:'concept', label:'Core Concept', q:'When one company buys another, how do you tell if the deal actually helps the buyer\'s shareholders?',
      a:"A merger model combines the two companies' financials and asks one central question: does the combined company's earnings per share (EPS) go <strong>up</strong> (accretive) or <strong>down</strong> (dilutive) versus the acquirer's EPS before the deal? Boards are intensely focused on this number — but it is not the same thing as \"does this deal create value.\"" },
    { type:'analogy', text:"Imagine two friends pooling money to buy a food truck together. If you put in real cash and get a fair share of future profits, your slice per dollar invested stays the same or improves. But if you pay for your share mostly with a promise of future earnings (like paying with your own company's stock) and you overpay, you've diluted your own claim on profits — even if the truck itself is a good business." },
    { type:'concept', label:'Building the Model', q:'Five steps from offer to verdict.', steps:[
        { t:'Estimate purchase price & premium', d:'What is the acquirer offering, and how much of a premium is that over the target\'s current trading price?' },
        { t:'Determine financing mix', d:'Cash on hand, new debt, new stock issued to target shareholders, or some blend of the three.' },
        { t:'Combine financials + synergies', d:'Add the two income statements together, then layer in expected cost savings or revenue synergies from combining the businesses.' },
        { t:'Calculate pro forma EPS', d:'Combined net income ÷ combined share count (which changes if new stock was issued to pay for the deal).' },
        { t:'Compare to acquirer\'s standalone EPS', d:'Higher pro forma EPS = accretive. Lower = dilutive. This is the number that gets reported to the market on deal day.' },
      ] },
    { type:'keyterms', items:[
        { n:'Accretion / Dilution', d:'Whether combined EPS rises (accretive) or falls (dilutive) after the deal. The headline number boards focus on.' },
        { n:'Synergies', d:'Value created by combining two businesses that neither could generate alone. Cost synergies (cutting duplicate overhead) are far more reliable than revenue synergies (cross-selling), which are frequently overestimated.' },
        { n:'Exchange Ratio', d:'In an all-stock deal, how many acquirer shares each target shareholder receives per target share owned.' },
        { n:'Pro Forma', d:'"As if combined" — the hypothetical financials of the merged company, used to project results before the deal has actually closed.' },
      ] },
    { type:'warn', label:'Accretive doesn\'t mean value-creating', text:"A deal can be mechanically accretive purely because the acquirer trades at a higher P/E than the target — cheap financing dressed up as a smart deal. That's an accounting effect of relative valuation multiples, not proof the combined business is actually stronger. Always ask what's driving the accretion before treating it as good news." },
    { type:'realworld', label:'AOL–Time Warner (2000)', body:'AOL bought Time Warner in an all-stock deal worth roughly $165B — at the time, the largest merger in history — using AOL\'s sky-high dot-com stock as currency. On paper, using an inflated stock price as "cheap" acquisition currency looked accretive and clever. When the dot-com bubble burst, AOL\'s stock (and the logic behind the deal) collapsed with it. The combined company wrote down roughly $99B in a single year — still one of the largest value-destroying mergers ever completed. Being accretive on day one guaranteed nothing about day 1,000.' },
  ],
  quiz:[
    { q:'A merger is described as "accretive." What does that mean?', opts:['The target company\'s stock price rose','The acquirer\'s combined pro forma EPS is higher than its standalone EPS before the deal','The deal was paid entirely in cash','The target\'s debt was paid off'], correct:1 },
    { q:'Which type of synergy is generally considered least reliable to underwrite in a deal model?', opts:['Cost synergies from eliminating duplicate overhead','Revenue synergies from cross-selling — harder to predict and often overestimated','Tax synergies','There is no meaningful difference in reliability'], correct:1 },
    { q:'A deal is accretive purely because the acquirer trades at a much higher P/E than the target. What should this prompt an analyst to ask?', opts:['Nothing — accretive always means value-creating','Whether the accretion reflects real operational benefit or just a valuation-multiple mismatch used as cheap currency','Whether the target overpaid','Whether the deal should be all-cash instead'], correct:1 },
  ]
},

{
  id:'credit', module:'deals', type:'lesson', title:'Credit Analysis',
  subtitle:'Module 3 · Lesson 3 of 3 · 10 min read', minutes:10,
  calc:'credit',
  blocks:[
    { type:'concept', label:'Core Concept', q:'Why does a lender think completely differently from an equity investor?',
      a:"An equity investor wants upside — the bigger the company's success, the more they make. A lender gets none of that upside: at best, they get their interest and principal back, on schedule, in full. Their risk is entirely asymmetric — <strong>limited reward, real downside</strong> — so credit analysis is built around one question only: <em>can this company reliably pay me back, even in a bad year?</em>" },
    { type:'analogy', text:"A landlord renting an apartment doesn't care if the tenant gets a huge promotion — the rent check is the same either way. What the landlord cares about is whether the tenant can reliably make rent every single month, especially if something goes wrong. Lending to a company is the exact same mindset, just with much bigger numbers." },
    { type:'concept', label:'How a Credit Analyst Underwrites a Loan', q:'Five checks, in order.', steps:[
        { t:'Leverage — Net Debt / EBITDA', d:'How large is the debt burden relative to the cash the business generates? Below 2x is conservative; 3–4x is standard investment grade; above 5x is speculative.' },
        { t:'Coverage — EBITDA / Interest Expense', d:'Can the company comfortably pay interest from operations? Below 3x is a warning sign; below 1.5x means any EBITDA miss risks default.' },
        { t:'DSCR — EBITDA / Total Debt Service', d:'Covers interest AND scheduled principal repayment, not just interest. Lenders typically require 1.25–1.50x at underwriting.' },
        { t:'Covenant headroom', d:'How much can EBITDA fall before the company breaches a loan covenant and triggers technical default? A thin cushion means the lender is one bad quarter away from trouble.' },
        { t:'Downside / stress case', d:'Run the numbers assuming a recession — a meaningful EBITDA decline. Does coverage stay above the minimum threshold, or does the deal fall apart?' },
      ] },
    { type:'keyterms', items:[
        { n:'Leverage Ratio', d:'Net Debt ÷ EBITDA. The primary measure of how indebted a company is relative to its cash generation.' },
        { n:'Interest Coverage', d:'EBITDA ÷ Interest Expense. Measures the cushion above the bare minimum needed to service interest.' },
        { n:'Covenant', d:'A contractual guardrail in a loan agreement. Maintenance covenants must be met every quarter — breaching one is a technical default even if payments are current.' },
        { n:'Credit Rating', d:'A letter grade (AAA down to D) from agencies like Moody\'s or S&P estimating default risk. Investment grade (BBB-/Baa3 or higher) borrows far more cheaply than speculative/"junk" grade.' },
      ] },
    { type:'warn', label:'EBITDA is not cash — again', text:'A company can show comfortable EBITDA interest coverage while still running out of actual cash, if it has heavy CapEx needs or is burning working capital. This is the exact same warning from the very first lesson of this course — it matters just as much here. Coverage ratios calculated on EBITDA can flatter a business that is capital-intensive.' },
    { type:'realworld', label:'The 2008 Subprime Mortgage Crisis', body:'Rating agencies gave AAA ratings — the safest possible grade — to bonds backed by pools of risky subprime mortgages, based on models that assumed housing prices would never fall nationwide at once. When that assumption broke, those "safest" bonds defaulted in enormous numbers, helping trigger the global financial crisis. It remains the starkest lesson in credit analysis: a rating is only as good as the stress case it was actually tested against.' },
  ],
  quiz:[
    { q:'Why is a lender\'s risk described as "asymmetric" compared to an equity investor\'s?', opts:['Lenders always earn more than equity investors','Lenders have limited upside (interest and principal) but real downside if the company defaults','Lenders never take any risk at all','There is no real difference'], correct:1 },
    { q:'A company has strong EBITDA interest coverage but is spending heavily on CapEx and burning working capital. What should a credit analyst do?', opts:['Approve the loan immediately — coverage is strong','Look past EBITDA-based coverage to actual free cash flow, since EBITDA is not cash','Ignore CapEx entirely','Assume the company is committing fraud'], correct:1 },
    { q:'What does DSCR measure that basic interest coverage does not?', opts:['Stock price volatility','Scheduled principal repayment in addition to interest','Revenue growth','Tax expense'], correct:1 },
  ]
},

/* ============ MODULE 4 — ADVANCED ANALYSIS ============ */
{
  id:'football', module:'adv', type:'lesson', title:'Football Field Chart',
  subtitle:'Module 4 · Lesson 1 of 3 · 8 min read', minutes:8,
  calc:'football',
  blocks:[
    { type:'concept', label:'Core Concept', q:'How do you present four different valuation methods to a client without confusing them?',
      a:"A football field chart plots the valuation range from every method — DCF, Comps, Precedent Transactions, and sometimes an LBO floor — as horizontal bars, stacked on the same axis, with the actual offer price marked as a vertical line. It's called a \"football field\" because the stacked bars resemble the yard lines on an American football field. It is the single most common chart in investment banking." },
    { type:'concept', label:'Reading the Chart', q:'What the shape of the field actually tells you.', steps:[
        { t:'Each bar = one method\'s range', d:'A low-to-high band, not one number — every method already produces a range, not a point estimate.' },
        { t:'The offer line', d:'A vertical marker showing where the actual (or proposed) price sits relative to every method at once.' },
        { t:'The overlap zone', d:'Where most or all of the bars overlap — the most defensible valuation territory. An offer landing here is easy to justify.' },
        { t:'Outlier bars', d:"If one method's range sits far from the others, that method's assumptions need a clear explanation — not automatic distrust, but scrutiny." },
      ] },
    { type:'insight', text:'The football field is the analytical core of a fairness opinion — the formal statement a bank gives a board on whether a deal price is fair to shareholders. An offer inside the overlap zone of most methods is straightforward to defend. An offer well outside it needs the board (and the bank) to explain exactly why.' },
    { type:'realworld', label:'Atlas Robotics — Fairness Opinion (Deal Room)', body:'This is exactly the exercise behind the Atlas Robotics case in the Deal Room: a $1.65B offer needs to be checked against DCF, Comps, and Precedent Transaction ranges before a board can responsibly say yes. Build your own ranges in the calculator below, then open the Deal Room to see how the pieces fit together.' },
  ],
  quiz:[
    { q:'Why is it called a "football field" chart?', opts:['It was invented by a former football player','The stacked horizontal valuation-range bars resemble the yard lines on a football field','It is only used for sports company valuations','It has no real meaning'], correct:1 },
    { q:'An offer price sits well outside the range of every valuation method shown on the football field. What does that mean for a board?', opts:['The offer should be automatically rejected','The situation needs a clear explanation — either the offer is genuinely mispriced or the valuation assumptions need revisiting','It has no significance','The chart is definitely wrong'], correct:1 },
    { q:'What is the primary use of a football field chart in a real deal?', opts:['Replacing all other valuation work','Comparing multiple valuation methods\' ranges side by side, forming the core of a fairness opinion','Showing only the DCF result in a nicer format','Predicting exact future stock price'], correct:1 },
  ]
},

{
  id:'redflag', module:'adv', type:'lesson', title:'Red Flags to Spot',
  subtitle:'Module 4 · Lesson 2 of 3 · 12 min read', minutes:12,
  blocks:[
    { type:'concept', label:'Core Concept', q:'What separates a good analyst from a great one?',
      a:"Anyone can plug numbers into a model. What makes an analyst valuable is noticing <strong>when the numbers don't add up</strong> — before it becomes a public scandal. Every real-world example across this course (Luckin Coffee, Enron, GE, WeWork) had warning signs visible in the financial statements, months or years before the truth came out. This lesson collects the patterns into one checklist." },
    { type:'concept', label:'The Checklist', q:'Seven patterns worth checking on every company.', steps:[
        { t:'CFO consistently far below Net Income', d:'The single biggest red flag in this entire course. Profitable on paper, not generating cash — see Financial Statements, Module 1.' },
        { t:'Receivables growing faster than revenue', d:'Can indicate "channel stuffing" — pushing product to customers who haven\'t really committed to paying, to inflate reported sales.' },
        { t:'Frequent auditor or CFO turnover', d:'Auditors and CFOs rarely leave a healthy company without reason. A pattern of sudden departures is worth investigating.' },
        { t:'Heavy reliance on "adjusted" metrics', d:'When a company\'s preferred number excludes more and more real, recurring costs over time — see the WeWork example in Module 1.' },
        { t:'Complex or opaque corporate structure', d:'Off-balance-sheet entities and related-party transactions can hide liabilities or move value in ways the main financial statements don\'t show — see Enron.' },
        { t:'Rising leverage with falling coverage', d:'A company taking on more debt while its ability to service that debt is shrinking — see Credit Analysis, Module 3.' },
        { t:'Large insider stock sales', d:'Not proof of anything alone, but executives selling a large share of their holdings while publicly promoting the stock is worth noting.' },
      ] },
    { type:'warn', label:'One flag rarely proves anything', text:"None of these signals alone is proof of fraud — plenty of honest, high-growth companies show one or two of them for legitimate reasons (heavy CapEx explains negative FCF; fast expansion explains rising receivables). What matters is the accumulation of multiple flags together, and — critically — how management responds when directly asked to explain them." },
    { type:'realworld', label:'Wirecard (2020)', body:'German payments company Wirecard reported €1.9 billion in cash sitting in trustee bank accounts in the Philippines. That cash simply did not exist. For years, a large share of the company\'s profit came from a murky "third-party acquirer" business that outside analysts struggled to independently verify — exactly the kind of opaque structure this checklist warns about. Short-sellers and journalists raised these questions publicly for years before regulators acted; the stock lost nearly all its value within days once the fraud was confirmed, and the CEO was later charged.' },
  ],
  quiz:[
    { q:'What is generally considered the single most important red flag covered across this course?', opts:['A rising stock price','Operating cash flow persistently and significantly below net income','A company hiring more employees','A company opening new offices'], correct:1 },
    { q:'A company shows two or three items from the red flag checklist. What is the correct response?', opts:['Assume fraud and stop analysis immediately','Treat each flag alone as meaningless and ignore all of them','Investigate further — accumulation of multiple flags, and how management responds when asked, matters more than any single flag','Only trust the company\'s own press releases'], correct:2 },
    { q:'In the Wirecard case, what was the core red flag that outside analysts pointed to for years before the fraud was confirmed?', opts:['A rising stock price','An opaque, hard-to-verify "third-party acquirer" business responsible for a large share of profit','Too many employees','Low executive pay'], correct:1 },
  ]
},

{
  id:'final-quiz', module:'adv', type:'quiz', title:'Final Assessment',
  subtitle:'Module 4 · Capstone · 20 min', minutes:20,
  intro:'This pulls together everything across all four modules — statements, valuation, deals, and the judgment calls that separate a good analyst from a great one. It\'s written at the level of a real first-round finance interview.',
  quiz:[
    { q:'A company reports rising Net Income but falling Free Cash Flow for three straight years, driven by heavy growth CapEx. Is this automatically a red flag?', opts:['Yes, always','Not automatically — heavy reinvestment can be a legitimate reason; it depends on whether that CapEx is generating a return', 'It only matters for public companies','FCF is irrelevant to this question'], correct:1 },
    { q:'Which valuation method requires no assumptions about the distant future, but is only as reliable as the peer set chosen?', opts:['DCF','Comparable Company Analysis','Precedent Transactions','LBO'], correct:1 },
    { q:'In a DCF, what happens mathematically if the terminal growth rate is set higher than WACC?', opts:['Terminal value becomes very large but valid','The Gordon Growth formula becomes undefined — the model breaks','Nothing changes','Terminal value becomes exactly zero, which is fine'], correct:1 },
    { q:'A PE firm underwrites an LBO assuming 3x multiple expansion (buying at 8x, selling at 11x) to hit its target IRR. How should a credit committee view this?', opts:['Favorably — multiple expansion is the most reliable return lever','Cautiously — multiple expansion is market-dependent and should never be the base case for underwriting debt','It\'s irrelevant to the credit decision','This guarantees the deal will succeed'], correct:1 },
    { q:'Why does a lender care more about a company\'s downside scenario than its upside potential?', opts:['Lenders get a fixed return at best (interest and principal) but bear real loss risk if the company defaults — the risk is asymmetric','Lenders always lose money on upside','Lenders are legally required to ignore upside','There is no real reason'], correct:0 },
    { q:'A merger is accretive to EPS. Does that guarantee the deal creates real value for shareholders?', opts:['Yes, always','No — accretion can result purely from a valuation-multiple mismatch between acquirer and target, not real operational benefit','Only in all-cash deals','Only if the target is larger than the acquirer'], correct:1 },
    { q:'On a football field chart, an offer price sits inside the overlap zone of DCF, Comps, and Precedent Transactions. What does this suggest?', opts:['The offer is fraudulent','The offer is well-supported across independent valuation methods — the most defensible position for a fairness opinion','The chart is invalid','Nothing meaningful'], correct:1 },
    { q:'Which single financial-statement relationship is most repeated as a fraud and red-flag indicator throughout this course?', opts:['Revenue growing while headcount grows','Operating cash flow diverging significantly and persistently from reported net income','Marketing spend rising','Inventory turning over quickly'], correct:1 },
  ]
},

];

/* ---------- DEAL ROOM CASES ---------- */
const DEALS = [
  {
    id:'atlas', tag:'sellside', tagLabel:'SELL-SIDE M&A', name:'Atlas Robotics — Fairness Opinion',
    desc:'A $340M revenue industrial automation company has received a $1.65B takeover offer. Build the full valuation range and advise the board whether to accept. Does the offer reflect fair value?',
    pills:['DCF','Comps','Prec Tx','Football Field'], difficulty:2,
    brief:"Atlas Robotics is a private industrial-automation company: $340M revenue, ~24% EBITDA margin, growing ~15% a year by selling robotic arms and vision systems to auto-parts manufacturers. A strategic acquirer has offered $1.65B (≈ 20x EBITDA) to buy the whole company. The board has asked your team for a fairness opinion: is $1.65B a fair price, or is Atlas worth meaningfully more (or less)?",
    approach:[
      "Run the DCF Calculator with a mid-teens revenue growth assumption and a WACC around 9-11% — industrial automation is capital-intensive but not high-risk. See what Enterprise Value falls out.",
      "Build a rough Comps range: industrial automation peers typically trade 12-18x EBITDA. Apply that to Atlas's ~$82M EBITDA (24% of $340M).",
      "Build a Precedent Transactions range: recent robotics/automation acquisitions have closed at 16-24x EBITDA, reflecting a control premium over trading comps.",
      "Plot all three ranges plus the $1.65B offer (≈20x EBITDA) on the Football Field Calculator. Where does the offer land relative to the overlap zone?",
      "Form a recommendation: if the offer sits inside the overlap of most methods, it's defensible. If it sits well above or below, explain why using the specific assumptions driving the gap.",
    ],
    links:['dcf-calc','comps','prec','football']
  },
  {
    id:'vantage', tag:'lbo', tagLabel:'PE BUYOUT', name:'Vantage Logistics — Take-Private',
    desc:'A PE sponsor wants to take a freight company private at 9x EBITDA with 65% leverage. Size the debt package, underwrite the return model, and stress-test whether the loan should be approved.',
    pills:['LBO','Credit','Scenario'], difficulty:3,
    brief:"Vantage Logistics is a publicly traded freight and trucking company generating $180M EBITDA. A PE sponsor wants to take it private at 9x EBITDA (≈$1.62B enterprise value), funded with 65% leverage. You're sitting on both sides of this: as the PE analyst building the return model, and as the bank's credit team deciding whether to underwrite the debt.",
    approach:[
      "Open the LBO Calculator. Set Entry EBITDA to $180M, Entry Multiple to 9x, Leverage to 65%.",
      "As the PE analyst: test EBITDA growth assumptions of 5-8% a year (freight is cyclical, not high-growth) and a 5-year hold. Does the deal clear a 20%+ IRR without assuming multiple expansion?",
      "As the credit team: switch to the Credit Ratio Calculator. Check leverage (Net Debt/EBITDA), interest coverage, and DSCR at entry — freight is a cyclical, capital-intensive industry, so lenders demand more cushion than they would for a stable software business.",
      "Stress-test the downside: freight volumes fell double digits in past recessions. Cut EBITDA growth to -10% for one year in your mental model — does coverage stay above the bank's minimum, or does the covenant break?",
      "Reach a verdict from both seats: would the PE firm do this deal, and would the bank approve this loan? They don't have to agree.",
    ],
    links:['lbo-calc','credit']
  },
  {
    id:'northwind', tag:'buyside', tagLabel:'CORPORATE M&A', name:'Northwind + Cascade — Merger',
    desc:'Northwind Software ($2B revenue) wants to acquire Cascade, a faster-growing SaaS competitor. Determine the deal structure, run the accretion/dilution logic, and decide: cash, stock, or blended?',
    pills:['Merger Model','Comps','Synergies'], difficulty:2,
    brief:"Northwind Software is a mature, profitable $2B-revenue SaaS company trading at 18x EBITDA. Cascade is a smaller, faster-growing competitor ($400M revenue, growing 35%/year, not yet profitable) that trading comps suggest is worth 12x revenue. Northwind's board wants to acquire Cascade and has asked you to think through how to pay for it.",
    approach:[
      "Read the Merger Model lesson's accretion/dilution walkthrough, then think through Northwind's three financing options: cash on hand, new debt, or issuing Northwind stock to Cascade's shareholders.",
      "Consider Northwind's much higher trading multiple (18x EBITDA) versus what it would be effectively 'paying' via Cascade's revenue multiple — where does relative valuation make the deal look accretive or dilutive, and is that a real signal or a multiple-mismatch artifact (see the Merger Model warning block)?",
      "Estimate cost synergies (overlapping G&A, sales infrastructure) versus revenue synergies (cross-selling Cascade into Northwind's customer base) — and which of the two your model should trust more.",
      "Use the Comps lesson's peer-set logic to sanity check whether 12x revenue is a fair price for Cascade given its growth rate, or whether Northwind is paying a premium that needs strategic justification beyond the spreadsheet.",
      "Write the one-paragraph case to the board: cash, stock, or blended — and why.",
    ],
    links:['merger','comps']
  },
];

/* ---------- GLOSSARY ---------- */
const GLOSSARY=[
  {t:'EBITDA',d:'Earnings Before Interest, Taxes, Depreciation and Amortization. The most widely used proxy for operating cash generation. Used in almost every valuation multiple and credit ratio in finance. Strips out capital structure choices and accounting policy.'},
  {t:'Free Cash Flow (FCF)',d:'Cash generated after maintaining and growing the asset base. = Operating Cash Flow minus CapEx. The input to every DCF model. More honest than net income because it\'s harder to manipulate.'},
  {t:'Enterprise Value (EV)',d:'Total value of a business to all capital providers — both debt and equity holders. EV = Market Cap + Net Debt. Used in multiples like EV/EBITDA because it\'s capital-structure neutral.'},
  {t:'WACC',d:'Weighted Average Cost of Capital. The discount rate in a DCF. Blends cost of equity (via CAPM) and after-tax cost of debt, weighted by their proportions in the capital structure.'},
  {t:'Net Debt',d:'Total Debt minus Cash. The bridge between Enterprise Value and Equity Value: EV minus Net Debt = Equity Value. Negative net debt = the company holds more cash than it owes.'},
  {t:'Terminal Value',d:'In a DCF, the present value of all cash flows beyond the forecast period, into perpetuity. Typically 60–80% of total EV. Most sensitive and most important assumption in any DCF model.'},
  {t:'LBO',d:'Leveraged Buyout. A PE firm acquires a company using mostly borrowed money, with the company\'s own cash flows repaying the debt over time. Leverage amplifies equity returns — and equity losses.'},
  {t:'IRR',d:'Internal Rate of Return. The annualised return on equity invested. PE firms target 20–25%+. Below 15% is generally considered a failed investment that still returned capital but missed the hurdle rate.'},
  {t:'MOIC',d:'Multiple on Invested Capital. Exit Equity divided by Entry Equity. 3x MOIC means you tripled the money. PE target: 2.5–3.5x. Below 2x = failed investment even if IRR looks acceptable.'},
  {t:'DSCR',d:'Debt Service Coverage Ratio. EBITDA divided by all debt service (interest + scheduled principal). Lenders typically require 1.25–1.50x at underwriting. Below 1.0x means the company cannot service its debt from operations.'},
  {t:'Leverage Ratio',d:'Net Debt divided by EBITDA. Primary measure of debt burden relative to cash generation. Below 2x is conservative. 3–4x is standard investment grade. Above 5x is speculative territory requiring scrutiny.'},
  {t:'Control Premium',d:'Extra price paid above market value to acquire a controlling stake. Historical average: 25–40% above the unaffected share price. Justified by synergies and full operational control.'},
  {t:'Comps',d:'Comparable Company Analysis. Values a company by applying trading multiples (EV/EBITDA, P/E, EV/Revenue) from similar publicly traded peers. The market\'s live verdict — fast and market-anchored.'},
  {t:'DCF',d:'Discounted Cash Flow. Values a company based on present value of all future free cash flows discounted at WACC. The theoretical intrinsic value method — most rigorous but most assumption-sensitive.'},
  {t:'Accretion / Dilution',d:'In M&A, whether the deal increases (accretive) or decreases (dilutive) the acquirer\'s EPS. Boards are intensely focused on this. A deal can be accretive while still destroying long-run shareholder value.'},
  {t:'Goodwill',d:'Premium paid above fair value of net identifiable assets in an acquisition. Not a real asset. When acquisitions disappoint, goodwill is impaired — a large non-cash charge destroying book equity instantly.'},
  {t:'Working Capital',d:'Current Assets minus Current Liabilities. Rising working capital relative to revenue is a cash drain — the business is growing faster than it can collect cash or is paying suppliers faster than it collects from customers.'},
  {t:'CapEx',d:'Capital Expenditures. Cash spent on long-term physical assets. Maintenance CapEx keeps assets working; growth CapEx expands capacity. Subtracted from Operating Cash Flow to calculate Free Cash Flow.'},
  {t:'Covenant',d:'Contractual guardrails in a loan agreement. Maintenance covenants must be met every quarter — breach is a technical default. Incurrence covenants only apply when the borrower takes a specific action. Cov-lite = incurrence only.'},
  {t:'Retained Earnings',d:'Cumulative profits ever earned minus all dividends ever paid. Grows by net income each period. The critical link between Income Statement and Balance Sheet. Negative retained earnings = accumulated deficit.'},
  {t:'Interest Coverage',d:'EBITDA divided by Interest Expense. Below 3x is a warning sign. Below 1.5x means the company struggles to pay even interest from operations — any EBITDA miss triggers potential default.'},
  {t:'LTV/CAC',d:'Lifetime Value to Customer Acquisition Cost. Above 3x = healthy unit economics. Below 1x = destroying value with every customer acquired regardless of revenue growth.'},
  {t:'EV/EBITDA',d:'Enterprise Value divided by EBITDA. The most widely used valuation multiple. Capital-structure neutral. Typical ranges: Enterprise SaaS 20–40x, Consumer 8–14x, Industrials 8–13x, Energy 5–9x.'},
  {t:'Football Field Chart',d:'Standard pitch book visual showing valuation ranges from all methods (DCF, Comps, Precedent Tx, LBO, trading range) as horizontal bars, with the current offer as a vertical dashed line. In nearly every M&A pitch book.'},
  {t:'Synergies',d:'Value created by combining two businesses that neither could generate alone. Cost synergies (headcount, procurement) are more reliable. Revenue synergies (cross-selling, new markets) are harder to achieve and should be discounted.'},
  {t:'Fairness Opinion',d:'Formal written statement from an investment bank that the deal consideration is fair from a financial point of view to shareholders. The football field chart is the analytical core of every fairness opinion.'},
  {t:'Multiple Expansion',d:'Selling a business at a higher valuation multiple than it was bought at. Can be a legitimate result of improving business quality, or purely market-driven. Never assume it in a base-case LBO return.'},
  {t:'Credit Rating',d:'A letter grade (AAA down to D) from agencies like Moody\'s or S&P estimating a borrower\'s default risk. Investment grade (BBB-/Baa3 or above) borrows far more cheaply than speculative/junk grade.'},
  {t:'Exchange Ratio',d:'In an all-stock acquisition, the number of acquirer shares each target shareholder receives per share of the target they owned.'},
  {t:'Channel Stuffing',d:'Pushing more product onto distributors or customers than they actually need, to inflate reported revenue in a given period — usually reverses as returns or cancelled orders in the following period.'},
  {t:'Non-GAAP / Adjusted Metric',d:'A profitability figure that excludes certain costs management considers non-representative (like stock compensation or restructuring charges). Useful when used honestly; a red flag when the "adjustments" recur every period.'},
];
