/* FinLab content data — every lesson, quiz, glossary term, and deal case lives here.
   Adding a lesson means adding an object to LESSONS, not writing markup. */

const MODULES = [
  { id:'fs',    name:'Financial Statements', icon:'📊', color:'blue',   desc:'Learn to read Income Statements, Balance Sheets, and Cash Flow Statements the way analysts actually do. Everything starts here.' },
  { id:'excel', name:'Excel & Modeling',     icon:'📐', color:'green',  desc:'The mechanics nobody teaches you: shortcuts, formatting conventions, and how to actually build and audit a working three-statement model in Excel.' },
  { id:'val',   name:'Valuation Models',     icon:'🎯', color:'teal',   desc:'DCF, Comps, and Precedent Transactions — how to value any company, with live calculators to practice on every concept.' },
  { id:'deals', name:'Deals & Transactions', icon:'⚡', color:'purple', desc:'LBO modelling, merger analysis, credit assessment — the deal-execution toolkit used by PE firms and investment banks.' },
  { id:'adv',   name:'Advanced Analysis',    icon:'🔍', color:'amber',  desc:'Football field charts, red flag detection, and understanding how bankers, PE investors, and credit officers think differently.' },
  { id:'recruit', name:'Recruiting & Fit',  icon:'🗣️', color:'red',   desc:'The half of breaking in that isn\'t a formula — your story, your network, and the resume that gets you in the room in the first place.' },
];

/* ---------- QUIZ ANSWER FORMAT ----------
   quiz: [{ q:'...', opts:['a','b','c','d'], correct: 1, why:'short explanation shown on the feedback line' }]
   correct is the index into opts. Nothing answer-related lives in markup or onclick attributes. */

const LESSONS = [

/* ============ MODULE 1 — FINANCIAL STATEMENTS ============ */
{
  id:'fs-intro', module:'fs', type:'lesson', title:'What Are Financial Statements?',
  minutes:8,
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
  minutes:10,
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
  minutes:10,
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
  minutes:10,
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
  id:'three-statement-link', module:'fs', type:'lesson', title:'How the Three Statements Link',
  minutes:14,
  blocks:[
    { type:'concept', label:'Why This Lesson Exists', q:'This is the single most-asked technical question in finance interviews.',
      a:"\"Walk me through how the three statements are connected.\" If you interview for investment banking, private equity, or credit, <strong>you will be asked this — and its follow-up, the depreciation walkthrough — more than any other technical question.</strong><br><br>It's asked so often because it can't be faked. Someone who has actually built a model answers it in thirty seconds. Someone who memorized definitions gets lost by the second step. The three statements aren't three documents — they're <strong>one system with three views</strong>, and every model you ever build depends on them tying out." },
    { type:'analogy', text:"Think of a company like a car on a road trip. The Income Statement is the trip odometer — distance covered this leg. The Balance Sheet is a photo of the car right now: fuel in the tank, dents on the body, how much is still owed on the loan. The Cash Flow Statement is the fuel gauge log — exactly how much fuel went in and out, and why. You can't understand the trip from any one of them alone, and all three describe the same car." },
    { type:'concept', label:'The Three Links', q:'Three connection points hold the entire system together.', steps:[
        { t:'Net Income → Retained Earnings', d:'Net Income from the bottom of the Income Statement flows into Retained Earnings inside the Equity section of the Balance Sheet (less any dividends paid). This is how a profitable company builds book equity over time.' },
        { t:'Net Income → Top of the Cash Flow Statement', d:'The Cash Flow Statement <em>starts</em> with Net Income, then adds back non-cash charges (D&A, stock comp) and adjusts for working-capital movements to arrive at real cash from operations.' },
        { t:'Ending Cash → Balance Sheet Cash', d:'The final line of the Cash Flow Statement — the net change in cash — must exactly equal the change in the Cash line on the Balance Sheet. If it doesn\'t, your model is broken.' },
      ] },
    { type:'insight', text:'Everything else is a consequence of those three links. D&A reduces the asset side of the Balance Sheet while being added back on the Cash Flow Statement. CapEx leaves through Investing and lands as an asset. Debt raised appears in Financing and as a liability. Once you internalize the three anchors, every other line follows logically instead of needing to be memorized.' },
    { type:'concept', label:'The Classic Interview Question', q:'"Depreciation increases by $10. Walk me through all three statements." (Assume a 25% tax rate.)', steps:[
        { t:'Income Statement first', d:'D&A rises $10, so pre-tax income falls $10. At a 25% tax rate, taxes fall $2.50. <strong>Net Income falls $7.50.</strong> Always start here — the other two statements depend on this number.' },
        { t:'Cash Flow Statement second', d:'Start with Net Income, now down $7.50. Add back the $10 of depreciation, because it is a non-cash charge. Net effect: <strong>cash from operations rises $2.50.</strong> No other section changes, so ending cash is up $2.50.' },
        { t:'Balance Sheet third — assets', d:'Cash is up $2.50. Net PP&E is down $10 (the asset was depreciated). <strong>Total assets fall $7.50.</strong>' },
        { t:'Balance Sheet third — liabilities & equity', d:'Retained Earnings falls by the $7.50 drop in Net Income. <strong>Total liabilities and equity fall $7.50.</strong>' },
        { t:'Confirm it balances', d:'Assets −$7.50 = Liabilities & Equity −$7.50. <strong>It balances.</strong> Always say this out loud in an interview — finishing with the check is what separates a complete answer from a partial one.' },
      ] },
    { type:'formula', html:`<span class="cm">// The depreciation walkthrough, in one view (25% tax rate):</span>

<span class="fc">INCOME STATEMENT</span>   D&A <span class="fo">+</span><span class="fv">10</span>  →  Pre-tax <span class="fo">−</span><span class="fv">10</span>  →  Tax <span class="fo">−</span><span class="fv">2.50</span>  →  <span class="fc">Net Income</span> <span class="fo">−</span><span class="fv">7.50</span>

<span class="fc">CASH FLOW</span>          Net Income <span class="fo">−</span><span class="fv">7.50</span>  <span class="fo">+</span> D&A add-back <span class="fv">10</span>  =  <span class="fc">Cash</span> <span class="fo">+</span><span class="fv">2.50</span>

<span class="fc">BALANCE SHEET</span>      Cash <span class="fo">+</span><span class="fv">2.50</span>, PP&E <span class="fo">−</span><span class="fv">10</span>      =  Assets <span class="fo">−</span><span class="fv">7.50</span>
                   Retained Earnings <span class="fo">−</span><span class="fv">7.50</span>   =  L&E    <span class="fo">−</span><span class="fv">7.50</span>

<span class="cm">// Assets = Liabilities + Equity. Balances. ✓</span>
<span class="cm">// Note the counterintuitive result: MORE depreciation means MORE cash,</span>
<span class="cm">// because depreciation is tax-deductible but never actually paid out.</span>` },
    { type:'warn', label:'The trap in this question', text:'Most candidates freeze at "how can more depreciation <em>increase</em> cash?" It increases cash because depreciation is <strong>tax-deductible but non-cash</strong> — you get the tax saving without writing a cheque. That $2.50 is called the <strong>depreciation tax shield</strong>, and it is exactly why capital-intensive businesses and heavily-levered LBOs care so much about D&A. If you can explain the tax shield unprompted, you have visibly answered better than most candidates.' },
    { type:'concept', label:'Practice These Variants', q:'The same three-step logic, different starting line. Try each before reading on.', keyterms:[
        { n:'$10 of CapEx', d:'IS: no change (CapEx is not an expense). CF: −$10 in Investing, so cash falls $10. BS: cash −$10, PP&E +$10. Assets net to zero. Balances with no equity change.' },
        { n:'$10 inventory purchase (on credit)', d:'IS: no change yet — inventory hits the IS only when sold. CF: no cash impact (it was on credit). BS: inventory +$10, accounts payable +$10. Balances.' },
        { n:'$10 of accrued but unpaid wages', d:'IS: expense +$10, so Net Income −$7.50 at 25% tax. CF: NI −$7.50, add back +$10 increase in accrued liabilities, cash +$2.50. BS: cash +$2.50, accrued liabilities +$10, retained earnings −$7.50. Balances.' },
        { n:'$100 of debt raised', d:'IS: no immediate change (interest starts next period). CF: +$100 in Financing. BS: cash +$100, debt +$100. Balances. Equity untouched — this is why debt raises never flow through the Income Statement.' },
      ] },
    { type:'realworld', label:'Why Models Break In Practice', body:'On a live deal, the most common reason a junior analyst\'s model "doesn\'t balance" is a broken link, not a maths error — a hardcoded number typed over a formula, a cash-flow line that isn\'t feeding the balance-sheet cash, or a working-capital sign flipped the wrong way. Senior bankers debug this by checking the three links in order: does Net Income tie? Does ending cash tie? Does Retained Earnings roll forward? Nearly every imbalance is found in one of those three places, which is why interviewers care that you know them cold.' },
  ],
  quiz:[
    { q:'Depreciation increases by $10 and the tax rate is 25%. What happens to Net Income?', opts:['Falls $10','Falls $7.50','Rises $2.50','No change — depreciation is non-cash'], correct:1 },
    { q:'In that same scenario, what happens to total cash?', opts:['Falls $10','Falls $7.50','Rises $2.50','No change'], correct:2 },
    { q:'Why does an increase in depreciation increase cash?', opts:['Because depreciation is a cash inflow from operations','Because it is tax-deductible but never actually paid — the tax saving is real cash, the expense is not','Because it increases the value of PP&E on the Balance Sheet','It doesn\'t — cash always falls when expenses rise'], correct:1 },
    { q:'A company spends $10 on CapEx. What is the effect on total assets?', opts:['Assets fall $10','Assets rise $10','No net change — cash falls $10 and PP&E rises $10','Assets rise $7.50 after tax'], correct:2 },
    { q:'Your model doesn\'t balance. Which three links should you check first?', opts:['Revenue growth, margins, and the tax rate','Net Income into Retained Earnings, Net Income into the Cash Flow Statement, and ending cash into Balance Sheet cash','The DCF, the comps, and the precedents','Interest expense, the debt schedule, and the exit multiple'], correct:1 },
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

/* ============ MODULE 2 — EXCEL & MODELING ============ */
{
  id:'excel-setup', module:'excel', type:'lesson', title:'Excel for Finance — The Setup',
  minutes:12,
  blocks:[
    { type:'concept', label:'Why This Module Exists', q:'Understanding a DCF and being able to build one are different skills.',
      a:"Everything up to this point has taught you what the numbers <em>mean</em>. This module teaches you to <strong>produce</strong> them — in Excel, the way it's actually done on a desk.<br><br>This matters more than students expect. In a first-year analyst role you will spend the majority of your day in Excel. In a modelling test — standard in private equity recruiting and increasingly common in banking — you get a blank workbook, a set of financials, and 60 to 90 minutes. Nobody asks you to define WACC. They ask you to <strong>build the thing and make it balance.</strong>" },
    { type:'warn', label:'You cannot learn this by reading', text:'This module is written to be done <strong>with Excel open</strong>, not read on a train. Every section is a set of actions. Reading about keyboard shortcuts and never using them produces exactly zero speed improvement — the entire benefit comes from the muscle memory. Open a blank workbook before you continue.' },
    { type:'concept', label:'Rule One', q:'The mouse is the enemy.', a:"Speed in Excel is almost entirely about <strong>never touching the mouse</strong>. A banker navigating by keyboard is roughly three to five times faster than one clicking around, and in a timed modelling test that difference decides whether you finish.<br><br>Excel's menus are all reachable through the <strong>Alt key</strong>: press Alt and the ribbon displays a letter for every command. Alt then H then O then I autofits a column width. You don't memorize these as trivia — you learn the ten you use constantly and the rest come with time." },
    { type:'concept', label:'The Shortcuts That Actually Matter', q:'Learn these ten first. They cover most of what you do all day.', keyterms:[
        { n:'F2', d:'Edit the active cell and — critically — highlight every cell its formula references. This is the single most important auditing key in Excel. Press it constantly.' },
        { n:'Ctrl + Arrow', d:'Jump to the edge of a data block. Ctrl+Down goes to the last filled row instantly instead of scrolling. Add Shift to select along the way.' },
        { n:'Alt + =', d:'Insert a SUM formula over the range Excel guesses above or left. Faster than typing =SUM( every time.' },
        { n:'F4', d:'Cycle absolute/relative references while editing ($A$1 → A$1 → $A1 → A1). Essential for dragging formulas across a model without breaking them.' },
        { n:'Ctrl + Shift + { ', d:'Select all cells a formula depends on (its precedents). Ctrl+] does the reverse — everything that depends on this cell. The fastest way to trace a broken link.' },
        { n:'Alt + E, S, V', d:'Paste Special → Values. Strips formulas and keeps only numbers. The most-used paste in finance, by a wide margin.' },
        { n:'Ctrl + Page Up / Down', d:'Move between worksheet tabs without the mouse. A real model has 8–15 tabs and you move constantly.' },
        { n:'Shift + Space / Ctrl + Space', d:'Select an entire row / entire column. Follow with Ctrl and + or − to insert or delete.' },
        { n:'F9', d:'Recalculate. Also: highlight part of a formula and press F9 to see what that fragment evaluates to, then Escape. Superb for debugging a long nested formula.' },
        { n:'Ctrl + `', d:'Toggle formula view — shows every formula in the sheet instead of its result. The fastest way to spot a hardcoded number sitting where a formula should be.' },
      ] },
    { type:'concept', label:'Formatting Is Not Decoration', q:'Every bank uses the same colour convention. Break it and your model reads as amateur.', steps:[
        { t:'Blue font = hardcoded input', d:'Any number typed by a human is blue. Growth assumptions, tax rates, entry multiples — anything someone might want to change. This is the most important convention in financial modelling.' },
        { t:'Black font = formula', d:'Anything calculated within the same worksheet is black. If it\'s black, nobody should be typing over it.' },
        { t:'Green font = link from another worksheet', d:'A reference pulled from a different tab in the same workbook. Lets a reviewer see instantly which numbers arrive from elsewhere.' },
        { t:'Red font = link to an external file', d:'A reference to a different workbook entirely. Flagged in red because external links break constantly and are the most fragile thing in any model.' },
        { t:'Consistent number formats', d:'Negatives in parentheses, not with a minus sign. Thousands separators everywhere. Multiples with an "x", percentages with a "%". One decimal place for multiples, none for large dollar figures.' },
      ] },
    { type:'insight', text:'The colour convention exists because models are handed between people under time pressure. A VP opening your model at 11pm needs to know in one glance which cells are safe to change. Blue means "this is an assumption, you may edit it." Black means "this is calculated, do not touch." Following this makes you look like you have done this before — ignoring it is the fastest way to look like you have not.' },
    { type:'concept', label:'Model Structure', q:'How a real model is laid out — and why.', steps:[
        { t:'Separate inputs from calculations from outputs', d:'Assumptions live in one clearly labelled place, ideally their own tab or a boxed section at the top. Calculations reference them. Outputs summarize. Never scatter hardcoded assumptions through the calculation sheets.' },
        { t:'One row, one formula, dragged right', d:'Every column in a projection should contain the identical formula. If column H differs from column G, that is either a deliberate exception (flag it) or a bug (usually a bug).' },
        { t:'Time runs left to right, consistently', d:'Historical periods, then projected. Use one row for period labels and one for whether the column is actual or forecast, and reference it — never re-type years.' },
        { t:'No hardcoded numbers inside formulas', d:'Never write =B12*1.05. Write =B12*(1+$C$4) and put the 5% in a labelled blue input cell. A number buried inside a formula is invisible to a reviewer and impossible to sensitize.' },
        { t:'Build a check row', d:'A row that computes Assets − Liabilities − Equity and should read zero. Make it conditionally format red when it isn\'t. This is covered fully in the model-integrity lesson.' },
      ] },
    { type:'warn', label:'The habit that gets analysts in trouble', text:'Typing a number over a formula to "make it work" is the most damaging thing you can do in a model. It fixes the cell you\'re looking at and silently breaks everything downstream — and because the cell now looks fine, nobody finds it until a managing director is presenting the output to a client. If a formula gives a wrong answer, <strong>find out why</strong>. Never plug it. Ctrl + ` exists specifically to hunt these down.' },
    { type:'realworld', label:'The London Whale (2012)', body:'JPMorgan lost over $6 billion on a derivatives position in 2012. The bank\'s own internal review found that the risk model used to size the position had been operated through a spreadsheet where data was copied and pasted manually between worksheets, and it contained an error that understated volatility — one calculation divided by a sum rather than an average. The trading losses had many causes, but a manual, unaudited spreadsheet process was a documented contributor. Spreadsheet discipline is not a cosmetic concern at scale.' },
  ],
  quiz:[
    { q:'In standard financial-modelling convention, what does a blue font indicate?', opts:['A formula calculated on the same sheet','A hardcoded input typed by a human','A link to another workbook','A cell containing an error'], correct:1 },
    { q:'You want to see every cell that a formula references. What is the fastest way?', opts:['Click through each reference manually','Press F2 to edit the cell — precedents highlight in colour','Delete the formula and rebuild it','Use Paste Special'], correct:1 },
    { q:'Why should you never write =B12*1.05 in a model?', opts:['Excel cannot multiply by decimals','The 5% assumption is invisible to a reviewer and impossible to sensitize — it belongs in a labelled input cell','It is slower to calculate','It breaks the colour convention only'], correct:1 },
    { q:'A formula returns the wrong number. What is the correct response?', opts:['Type the right number over it so the output looks correct','Trace the precedents and find the actual cause — plugging a number silently breaks everything downstream','Delete the row','Change the tax rate until it matches'], correct:1 },
  ]
},

{
  id:'excel-model', module:'excel', type:'lesson', title:'Building a Three-Statement Model',
  minutes:18,
  blocks:[
    { type:'concept', label:'The Goal', q:'What you are actually building, and in what order.',
      a:"A three-statement model projects a company's Income Statement, Balance Sheet, and Cash Flow Statement forward — usually five years — with all three <strong>linked</strong>, so that changing one assumption correctly ripples through everything.<br><br>This is the foundation model in finance. A DCF is a three-statement model with a discounting section bolted on. An LBO is a three-statement model with a debt schedule and a returns calculation. A merger model is two of them combined. <strong>Learn this one and the rest are variations.</strong>" },
    { type:'analogy', text:"Building a model is like plumbing a house. You lay the pipes in a specific order — supply first, then fixtures, then drainage — because each stage depends on the one before. Try to connect the drain before the fixture exists and you get a mess. Modellers who jump straight to the Balance Sheet before finishing revenue have made exactly that mistake, and they spend the rest of the build fighting it." },
    { type:'concept', label:'The Build Order', q:'Nine steps, always in this sequence.', steps:[
        { t:'Set up the shell and inputs', d:'Tabs for Assumptions, Model, and Outputs. Period headers across the top. Every assumption in blue, in one place. Do this before typing a single formula.' },
        { t:'Input historicals', d:'Three years of actual Income Statement and Balance Sheet data, typed in as blue hardcodes. These come from the 10-K. Calculate historical margins and growth rates from them — those drive your projections.' },
        { t:'Project revenue', d:'The most important assumption in the model. Growth rate, or price × volume if you have the detail. Everything downstream keys off this line, so it goes first.' },
        { t:'Project the Income Statement down to EBIT', d:'COGS and OpEx usually as a percentage of revenue, referencing historical margins. Stop at EBIT — you cannot complete the statement yet, because interest expense depends on debt you haven\'t scheduled.' },
        { t:'Build the working capital schedule', d:'Project receivables, inventory, and payables using historical ratios: days sales outstanding, days inventory, days payable. The <em>change</em> in each flows to the Cash Flow Statement.' },
        { t:'Build the PP&E and D&A schedule', d:'Opening PP&E, plus CapEx, minus depreciation, equals closing PP&E. Depreciation flows to the Income Statement; CapEx flows to Investing on the Cash Flow Statement; closing PP&E goes to the Balance Sheet.' },
        { t:'Build the debt schedule', d:'Opening debt, plus drawdowns, minus repayments, equals closing debt. Interest expense is calculated on the balance and flows back up to the Income Statement — completing it down to Net Income.' },
        { t:'Complete the Cash Flow Statement', d:'Start with Net Income, add back D&A, adjust for working-capital changes to get Operating. CapEx into Investing. Debt and equity movements into Financing. The three sections sum to the net change in cash.' },
        { t:'Complete the Balance Sheet and check', d:'Ending cash comes from the Cash Flow Statement. Retained Earnings rolls forward with Net Income less dividends. Then build the check row: Assets − Liabilities − Equity must equal zero.' },
      ] },
    { type:'warn', label:'Why you cannot finish the Income Statement first', text:'This is the step that confuses everyone building their first model. You cannot compute interest expense until you know the debt balance. You cannot know the closing debt balance until you know how much cash was available to repay debt. You cannot know available cash until you have Net Income — <strong>which requires interest expense.</strong> That loop is real, it is called circularity, and it is the subject of the next lesson. For now: build to EBIT, do the schedules, then come back and finish.' },
    { type:'formula', html:`<span class="cm">// The roll-forward pattern — used for PP&E, debt, equity, and working capital.</span>
<span class="cm">// Learn this shape once and you can build every schedule in the model.</span>

<span class="fc">Closing balance</span> = <span class="fv">Opening balance</span> <span class="fo">+</span> <span class="fv">Additions</span> <span class="fo">−</span> <span class="fv">Reductions</span>

<span class="cm">// PP&E:</span>       Closing = Opening <span class="fo">+</span> CapEx <span class="fo">−</span> Depreciation
<span class="cm">// Debt:</span>       Closing = Opening <span class="fo">+</span> Drawdowns <span class="fo">−</span> Repayments
<span class="cm">// Equity:</span>     Closing = Opening <span class="fo">+</span> Net Income <span class="fo">−</span> Dividends
<span class="cm">// Inventory:</span>  Closing = Opening <span class="fo">+</span> Purchases <span class="fo">−</span> COGS

<span class="cm">// In Excel, this period's opening ALWAYS references last period's closing:</span>
<span class="cm">//   D10 = C15      (opening = prior column's closing)</span>
<span class="cm">//   D15 = D10 + D11 - D12</span>
<span class="cm">// Never re-type an opening balance. Always link it.</span>` },
    { type:'concept', label:'Working Capital — The Part People Get Backwards', q:'Signs on the Cash Flow Statement, and why they feel wrong.',
      a:"An <strong>increase</strong> in a current asset is a <strong>use</strong> of cash — it shows as negative on the Cash Flow Statement. Receivables going up means you made sales but haven't been paid: cash left the business, or never arrived.<br><br>An <strong>increase</strong> in a current liability is a <strong>source</strong> of cash — it shows as positive. Payables going up means you received goods and haven't paid for them yet: you are holding onto cash a supplier is effectively lending you.<br><br>Most first-time modellers flip these signs, the model doesn't balance, and they spend an hour hunting. Memorize it as: <strong>assets up, cash down. Liabilities up, cash up.</strong>" },
    { type:'concept', label:'Sanity Checks While You Build', q:'Catch errors as you go, not at the end.', keyterms:[
        { n:'Do margins look sane?', d:'If projected EBITDA margin drifts to 60% for a grocery retailer, an assumption is wrong. Compare every projected margin to the historicals you calculated in step 2.' },
        { n:'Does revenue growth decay?', d:'Holding 30% growth flat for five years is almost never realistic. Growth should trend toward a sustainable rate. Reviewers look for this immediately.' },
        { n:'Is CapEx sensible versus D&A?', d:'In a mature business, CapEx should roughly approximate D&A over time. CapEx far below D&A means the asset base is shrinking — possible, but it needs a reason.' },
        { n:'Does cash go negative?', d:'A model that projects negative cash is telling you the company runs out of money and needs a revolver draw. That is a finding, not something to hide with a plug.' },
        { n:'Does the check row read zero?', d:'Every period, every column. If it breaks in year 3, the error is in year 3 — the check row tells you where to look.' },
      ] },
    { type:'realworld', label:'What a Modelling Test Actually Looks Like', body:'A typical private-equity modelling test hands you a company\'s historical financials and 90 minutes to build a working LBO with returns. Candidates rarely fail because they don\'t know what an LBO is — they fail because they run out of time, or their balance sheet doesn\'t balance and they spend 30 minutes hunting the error. The differentiator is build discipline: consistent formulas dragged across, no hardcodes buried in calculations, and a check row built early so an imbalance is caught in the period it appears rather than at the end.' },
  ],
  quiz:[
    { q:'Why can you not complete the Income Statement before building the debt schedule?', opts:['Because revenue depends on debt','Because interest expense depends on the debt balance, which depends on cash available to repay it','Because tax rates change with leverage','You can — the Income Statement is always built first, start to finish'], correct:1 },
    { q:'Accounts receivable increases by $20. What is the effect on the Cash Flow Statement?', opts:['+$20 — receivables are an asset','−$20 — an increase in a current asset is a use of cash','No effect until the cash is collected','+$20 in Financing activities'], correct:1 },
    { q:'What is the roll-forward pattern?', opts:['Closing = Opening + Additions − Reductions','Revenue × Margin = Profit','Assets = Liabilities + Equity','EV = Market Cap + Net Debt'], correct:0 },
    { q:'Your model balances in years 1 and 2 but breaks in year 3. Where is the error most likely?', opts:['In the historical data','In year 3 — the check row localizes the error to the period it first appears','In the assumptions tab','In the terminal value'], correct:1 },
    { q:'Projected EBITDA margin for a grocery retailer comes out at 55%. What should you do?', opts:['Accept it — the model calculated it','Compare to historical margins and find the broken assumption; grocery margins are low single digits','Increase revenue to compensate','Hardcode the margin to a lower number'], correct:1 },
  ]
},

{
  id:'excel-integrity', module:'excel', type:'lesson', title:'Model Integrity — Circularity, Checks & Debugging',
  minutes:14,
  blocks:[
    { type:'concept', label:'The Circularity Problem', q:'Why your model says #REF or spins forever — and what professionals actually do about it.',
      a:"Here is the loop, precisely:<br><br><strong>Interest expense</strong> depends on the average debt balance. The <strong>debt balance</strong> depends on how much cash was swept to repay debt. <strong>Available cash</strong> depends on Free Cash Flow. Free Cash Flow depends on Net Income. And <strong>Net Income depends on interest expense.</strong><br><br>The formula chain refers back to itself. Excel calls this a circular reference and, by default, refuses — displaying zeros or a warning. This is not a bug in your model. It is a genuine property of how the financials interconnect, and every real LBO model confronts it." },
    { type:'concept', label:'Three Ways To Handle It', q:'Each is used in practice. Know which and why.', steps:[
        { t:'Enable iterative calculation', d:'File → Options → Formulas → Enable iterative calculation, typically 100 iterations with maximum change 0.001. Excel solves the loop by converging numerically. It works and is widely used — but the model becomes fragile: one error anywhere can propagate zeros through everything, and the file can be slow.' },
        { t:'Use beginning-of-period debt', d:'Calculate interest on the opening debt balance rather than the average of opening and closing. This breaks the loop entirely because the opening balance is already known from the prior period. Slightly less precise, completely stable, and common in teaching models and quick builds.' },
        { t:'Build a circuit breaker', d:'A switch cell — an input reading 1 or 0 — wired into the interest formula so it can be forced to zero. When iteration blows up and the model fills with errors, you flip the breaker to 0, let it recalculate clean, then flip back to 1. Any model using iteration should have one.' },
      ] },
    { type:'formula', html:`<span class="cm">// The circular chain, stated plainly:</span>

  Interest expense  <span class="fo">→</span> depends on <span class="fo">→</span>  Debt balance
  Debt balance      <span class="fo">→</span> depends on <span class="fo">→</span>  Cash available to repay
  Cash available    <span class="fo">→</span> depends on <span class="fo">→</span>  Net Income
  Net Income        <span class="fo">→</span> depends on <span class="fo">→</span>  <span class="fc">Interest expense</span>  <span class="cm">← loop closes</span>

<span class="cm">// Circuit breaker pattern — wire the switch into the interest line:</span>

  <span class="fv">Interest</span> = <span class="fc">IF</span>(<span class="fv">$C$3</span>=1, AverageDebt * Rate, <span class="fv">0</span>)
                    <span class="cm">↑ breaker cell: 1 = live, 0 = force off</span>

<span class="cm">// Simplest fix of all — use opening debt, no circularity at any point:</span>
  <span class="fv">Interest</span> = <span class="fv">OpeningDebt</span> * Rate` },
    { type:'concept', label:'The Checks Every Model Needs', q:'Build these before you need them — not after something breaks.', keyterms:[
        { n:'Balance check', d:'Assets − Liabilities − Equity, computed every period. Should read exactly zero. Conditionally format it to turn red otherwise. This is non-negotiable in any three-statement model.' },
        { n:'Cash flow tie-out', d:'Ending cash on the Cash Flow Statement minus cash on the Balance Sheet. Also zero. Catches a different class of error than the balance check.' },
        { n:'Debt schedule tie-out', d:'Closing debt in the schedule should equal the debt shown on the Balance Sheet. Catches repayments that were calculated but never linked through.' },
        { n:'Sources = Uses', d:'In a transaction model, total funding sources must equal total uses. If they diverge, the deal structure itself is wrong before any returns math begins.' },
        { n:'Aggregate check cell', d:'One master cell at the top of the model summing every individual check. It reads OK or ERROR. This is the first cell anyone reviewing your model will look at.' },
      ] },
    { type:'warn', label:'Never plug a check to zero', text:'When a balance check reads −$4.2M, the temptation is to add a "plug" line that forces it to zero. This is the single worst habit in financial modelling. It hides the error rather than fixing it, and the wrong number stays in the model, flowing into the valuation, into the pitch book, and in front of a client. <strong>A check that reads non-zero is doing its job.</strong> Find the cause.' },
    { type:'concept', label:'How To Actually Find The Error', q:'A systematic order — not random clicking.', steps:[
        { t:'Find which period breaks first', d:'If the check is zero in years 1 and 2 and breaks in year 3, the error is in year 3. This single step eliminates most of the search space immediately.' },
        { t:'Check the size of the imbalance', d:'The amount is a clue. If it equals depreciation, look at the D&A links. If it equals CapEx, look at PP&E. If it equals exactly the dividend, look at Retained Earnings. Imbalances usually equal the item that was missed.' },
        { t:'Toggle formula view with Ctrl + `', d:'Scan the broken column for hardcoded numbers sitting where formulas belong. Someone typing over a formula is the most common cause of a model that worked yesterday and doesn\'t today.' },
        { t:'Trace precedents with Ctrl + Shift + {', d:'From the broken cell, walk backwards through what feeds it. Excel\'s Formula Auditing → Trace Precedents draws arrows if you prefer visual tracing.' },
        { t:'Verify the three links', d:'Net Income into Retained Earnings. Net Income into the top of the Cash Flow Statement. Ending cash into Balance Sheet cash. The overwhelming majority of imbalances are one of these three being broken or double-counted.' },
      ] },
    { type:'insight', text:'Notice the last debugging step is exactly the content of the "How the Three Statements Link" lesson in Module 1. That is not a coincidence. Understanding the links is what makes debugging systematic rather than random — and it is precisely why interviewers use that question to sort candidates. Someone who knows the links cold can fix a broken model. Someone who memorized definitions cannot.' },
    { type:'realworld', label:'Rogoff & Reinhart (2010)', body:'Two Harvard economists published a widely cited paper concluding that national debt above 90% of GDP was associated with sharply negative growth — a finding used to justify austerity policy across several countries. In 2013 a graduate student attempting to replicate the results obtained the original spreadsheet and found, among other issues, that an AVERAGE formula covered only 15 of the 20 country rows it should have included. Correcting the range materially changed the headline conclusion. A selection range off by five rows, in a spreadsheet nobody had audited, shaped public policy debate for three years.' },
  ],
  quiz:[
    { q:'What causes circularity in a financial model?', opts:['Revenue growth referencing itself','Interest expense depends on the debt balance, which depends on cash available, which depends on Net Income, which depends on interest expense','Using too many worksheet tabs','Linking to an external workbook'], correct:1 },
    { q:'Which approach eliminates circularity entirely rather than solving it numerically?', opts:['Enabling iterative calculation','Calculating interest on the opening debt balance instead of the average balance','Adding a plug line','Increasing the iteration count to 1000'], correct:1 },
    { q:'Your balance check reads −$4.2M in year 3 only. What is the best first move?', opts:['Add a plug line to force it to zero','Focus on year 3, and check whether $4.2M matches a specific line item like depreciation or CapEx','Rebuild the model from scratch','Change the tax rate until it balances'], correct:1 },
    { q:'What is a circuit breaker in a model with iterative calculation enabled?', opts:['A macro that rebuilds the model','A switch cell wired into the interest formula that can force it to zero, clearing propagated errors','A conditional format that highlights negatives','A second copy of the workbook kept as backup'], correct:1 },
    { q:'A balance check reading non-zero means:', opts:['The check is broken and should be deleted','The check is working correctly and has found a real error to investigate','The model needs more iterations','The historicals were entered wrong, always'], correct:1 },
  ]
},

/* ============ MODULE 3 — VALUATION MODELS ============ */
{
  id:'val-intro', module:'val', type:'lesson', title:'What Is Valuation?',
  minutes:6,
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
        { n:'Control Premium', d:'The extra amount a buyer pays to gain full control of a company, above its current trading price. Long-run average roughly 25–40%, but highly deal-specific.' },
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
  minutes:12,
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
  id:'wacc', module:'val', type:'lesson', title:'WACC & Cost of Capital',
  minutes:13,
  blocks:[
    { type:'concept', label:'Core Concept', q:'You used WACC as a slider in the DCF. Where does that number actually come from?',
      a:"WACC — Weighted Average Cost of Capital — is <strong>the minimum return a company must earn to satisfy everyone who funded it.</strong> A business is financed by two kinds of people: lenders, who want interest, and shareholders, who want returns. Each demands a different rate, and each supplies a different share of the money.<br><br>WACC blends the two, weighted by how much of the capital structure each represents. It is the discount rate in every DCF, and because a DCF's output moves violently with it, <strong>WACC is where most valuation arguments actually happen.</strong>" },
    { type:'analogy', text:"You buy a $400,000 flat with a $300,000 mortgage at 5% and $100,000 of your own savings. The bank needs 5%. You wouldn't have bothered unless you expected, say, 12% on your own money — you took more risk, since the bank gets paid first if it all goes wrong. Your blended cost of capital is (75% × 5%) + (25% × 12%) = 6.75%. If the flat doesn't return at least 6.75% a year, the deal destroyed value. WACC is the same arithmetic, for a company." },
    { type:'formula', html:`<span class="fc">WACC</span> = <span class="fv">(E/V)</span> × <span class="fc">Re</span>  <span class="fo">+</span>  <span class="fv">(D/V)</span> × <span class="fc">Rd</span> × <span class="fv">(1 − t)</span>

<span class="cm">// E = market value of equity      D = market value of debt</span>
<span class="cm">// V = E + D (total capital)       t = marginal tax rate</span>
<span class="cm">// Re = cost of equity             Rd = cost of debt (pre-tax)</span>

<span class="cm">// Cost of equity comes from CAPM:</span>
<span class="fc">Re</span> = <span class="fv">Rf</span> <span class="fo">+</span> <span class="fv">β</span> × <span class="fv">(Rm − Rf)</span>

<span class="cm">// Rf      = risk-free rate (10-year government bond yield)</span>
<span class="cm">// β       = beta — how much the stock moves vs the market</span>
<span class="cm">// Rm − Rf = equity risk premium (ERP), historically ~4.5–5.5%</span>` },
    { type:'concept', label:'The Components', q:'Four inputs. Each has a standard source and a standard argument.', keyterms:[
        { n:'Risk-free rate (Rf)', d:'The yield on a long-dated government bond in the currency of the cash flows — typically the 10-year US Treasury for USD models. The one input you can simply look up.' },
        { n:'Equity risk premium (ERP)', d:'The extra return investors demand for holding equities over government bonds. Most banks use roughly 4.5–5.5%, drawn from long-run historical data or a published survey. It is an assumption, not a fact — reasonable people defend different numbers.' },
        { n:'Beta (β)', d:'How volatile a stock is relative to the whole market. β = 1 moves with the market; β = 1.5 amplifies it by half again; β = 0.7 is defensive. Sourced from a data provider, or built from a peer set when valuing a private company.' },
        { n:'Cost of debt (Rd)', d:'The rate the company actually borrows at today — not the historical coupon on old debt. For a public issuer, use the yield to maturity on its traded bonds. Otherwise infer it from its credit rating and comparable issuers.' },
      ] },
    { type:'concept', label:'Why Debt Is Multiplied By (1 − t)', q:'The tax shield — the reason debt is cheaper than it looks.',
      a:"Interest is tax-deductible. Dividends are not. A company paying 8% on its debt at a 25% tax rate has an effective after-tax cost of 8% × (1 − 0.25) = <strong>6%</strong> — the government absorbs a quarter of the interest bill through a lower tax charge.<br><br>This is the same depreciation-tax-shield logic from Module 1, applied to interest. It's also the core reason leveraged buyouts work: swapping expensive equity for tax-advantaged debt lowers the blended cost of capital — right up until the leverage becomes risky enough that both lenders and shareholders start demanding more." },
    { type:'concept', label:'Unlevering and Relevering Beta', q:'How to get a beta for a company that has no stock price — the standard private-company problem.', steps:[
        { t:'Why you cannot just use a peer\'s beta', d:'An observed beta reflects both business risk and that specific company\'s leverage. A peer carrying far more debt has a higher beta purely because of its balance sheet, not because its operations are riskier.' },
        { t:'Unlever each peer\'s beta', d:'Strip out the effect of each peer\'s capital structure: βu = βl ÷ [1 + (1 − t) × D/E]. This yields "asset beta" — the underlying business risk, capital structure removed.' },
        { t:'Take the median unlevered beta', d:'Median across the peer set, not mean — one outlier peer would otherwise drag the whole estimate. This is the same median-versus-mean logic as the Comps lesson.' },
        { t:'Relever at your target\'s capital structure', d:'βl = βu × [1 + (1 − t) × D/E], using your company\'s own target debt-to-equity ratio. Now the beta reflects your target\'s business risk at your target\'s leverage.' },
        { t:'Feed it into CAPM', d:'Re = Rf + βl × ERP. That cost of equity goes into the WACC formula alongside the after-tax cost of debt.' },
      ] },
    { type:'warn', label:'WACC is the most-argued number in any valuation', text:'A one-percentage-point change in WACC can move a DCF valuation by <strong>15–25%</strong>. That makes it the easiest input to quietly manipulate: nudge WACC down half a point and the deal clears its hurdle. This is why bankers present DCF outputs as a sensitivity table across a WACC range rather than a single point, and why the first question a sceptical reviewer asks is "what WACC did you use, and why?" Be ready to defend every component — especially the ERP and the beta, which are judgement calls rather than lookups.' },
    { type:'insight', text:'Use the DCF calculator alongside this lesson. Set WACC to 9%, note the enterprise value, then set it to 10% and note it again. The gap you see for a single percentage point is exactly why analysts fight over this input — and why a DCF is a range, never a number.' },
    { type:'realworld', label:'The 2022 Rate Shock', body:'When the US 10-year Treasury yield rose from roughly 1.5% at the start of 2022 to around 4% by late 2023, the risk-free rate in every WACC calculation rose with it. Nothing about the underlying businesses had to change for valuations to fall sharply: a higher Rf feeds directly into cost of equity, which raises WACC, which discounts distant cash flows more heavily. Companies whose value sat furthest in the future — high-growth, low-current-profit technology names — were repriced hardest. That was cost of capital moving, not business quality.' },
  ],
  quiz:[
    { q:'Why is the cost of debt multiplied by (1 − tax rate) in the WACC formula?', opts:['Because lenders pay tax on the interest they receive','Because interest is tax-deductible for the company, so the effective cost is lower than the stated rate','To adjust for inflation','Because debt is riskier than equity'], correct:1 },
    { q:'In CAPM, what does beta measure?', opts:['The company\'s profit margin','How much the stock moves relative to the overall market','The risk-free rate','The company\'s debt-to-equity ratio directly'], correct:1 },
    { q:'You are valuing a private company and need a beta. What is the standard approach?', opts:['Use a beta of 1.0 always','Unlever the betas of public peers, take the median, then relever at the target\'s own capital structure','Use the beta of the largest company in the industry','Private companies have no beta, so skip CAPM'], correct:1 },
    { q:'The 10-year Treasury yield rises by 2 percentage points. All else equal, what happens to DCF valuations?', opts:['They rise — higher rates signal a stronger economy','They fall — a higher risk-free rate raises cost of equity and WACC, discounting future cash flows more heavily','No change — the risk-free rate affects only bond prices','Only companies with debt are affected'], correct:1 },
    { q:'Why do bankers present DCF output as a sensitivity table across a WACC range?', opts:['To make the pitch book longer','Because a one-point WACC change can move the valuation 15–25%, so a single point estimate implies false precision','Because Excel requires it','To hide the assumptions from the client'], correct:1 },
  ]
},

{
  id:'comps', module:'val', type:'lesson', title:'Comparable Company Analysis',
  minutes:10,
  calc:'comps',
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
    { type:'warn', label:'Never quote a multiple from memory', text:'Any multiple range you read in a textbook, a course, or this one is a <strong>snapshot of a moment</strong>. The SaaS example above shows a sector\'s multiple falling by roughly 80% in twelve months with no change to the underlying businesses. Every range on FinLab is labelled directional for exactly this reason. In real work you pull a live peer set from a terminal or filings on the day you need it — and if an interviewer asks where a sector trades, the strong answer names a rough range <em>and</em> says what it depends on (rates, growth, cycle), rather than reciting a number that may be two years stale.' },
  ],
  quiz:[
    { q:'Why do analysts typically use the median multiple of a peer set rather than the average?', opts:['Median is always higher','Median resists distortion from one extreme outlier','Average is illegal to use in banking','They are always the same number'], correct:1 },
    { q:'Why is EV/EBITDA generally preferred over P/E for comparing companies with different amounts of debt?', opts:['EV/EBITDA is capital-structure neutral — it isn\'t affected by how much debt each company carries','P/E is always more accurate','EV/EBITDA ignores profitability entirely','They measure the exact same thing'], correct:0 },
    { q:'A SaaS company\'s revenue and growth rate are unchanged year over year, but its trading multiple falls from 35x to 7x revenue. What is the most likely explanation?', opts:['The company\'s fundamentals collapsed','The whole peer group re-rated lower as market conditions (like interest rates) changed','This is impossible','Its EBITDA turned negative'], correct:1 },
  ]
},

{
  id:'prec', module:'val', type:'lesson', title:'Precedent Transactions',
  minutes:9,
  blocks:[
    { type:'concept', label:'Core Concept', q:'How is this different from Comps, if both use multiples from other companies?',
      a:"Precedent Transactions values a company using multiples paid in <strong>actual past M&A deals</strong> for similar companies — not where similar companies currently trade, but what someone actually paid to buy one outright. That distinction matters enormously: acquiring a company means taking full control, and buyers pay extra for that." },
    { type:'analogy', text:'Comps is checking what similar houses are currently listed for. Precedent Transactions is checking what similar houses actually sold for recently — and sale prices run higher than list prices, because a buyer who wants a specific house badly enough will pay a premium to actually get it.' },
    { type:'concept', label:'Why It Runs Higher', q:'The control premium — and who pays it.', a:"A buyer acquiring 100% of a company gets full control: the right to change management, redirect cash flow, merge operations, sell assets. The current trading price only reflects a small minority stake changing hands. To convince existing shareholders to sell control, an acquirer typically pays a <strong>25–40% premium</strong> above the unaffected trading price. That premium is baked directly into every precedent transaction multiple." },
    { type:'keyterms', items:[
        { n:'Control Premium', d:'The extra amount paid above the pre-deal trading price to acquire a controlling stake. Long-run average roughly 25–40%, varying widely with sector and deal competition.' },
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
  minutes:14,
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
        { n:'Entry / Exit Multiple', d:'EV/EBITDA paid at purchase vs received at sale. Typical LBO entry has run around 8–14x in recent cycles, but this moves with credit conditions. Conservative models hold entry = exit multiple. Multiple expansion is upside, never the base case.' },
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
  minutes:11,
  calc:'merger',
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
  minutes:10,
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
  minutes:8,
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
  minutes:12,
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
  subtitle:'Final Assessment · All modules · 20 min', minutes:20,
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

/* ============ MODULE 5 — RECRUITING & FIT ============ */
{
  id:'story', module:'recruit', type:'lesson', title:'Your Story & Behavioral Fit',
  minutes:9,
  blocks:[
    { type:'concept', label:'Core Concept', q:'Why does "walk me through your resume" decide more first-round outcomes than any technical question?',
      a:"Most first-round interviews spend their opening minutes almost entirely on fit — your story, your \"why banking,\" your \"why us.\" It's not a formality before the real interview starts; for a lot of interviewers, it <em>is</em> the interview. A strong technical answer rarely saves a rambling, generic story. A strong story often buys real slack on a shaky technical answer, because the interviewer is trying to answer one question above all others: <strong>would I want to sit next to this person for 80 hours a week?</strong>" },
    { type:'analogy', text:"Think of it like a movie trailer, not a biography. Nobody wants your life story in chronological order — they want two minutes that make a coherent case: here's where I started, here's the thread that connects what I've done, here's why it leads directly to this seat. Random unconnected facts, however impressive individually, don't add up to a pitch." },
    { type:'concept', label:'Building the Narrative', q:'Five steps from scattered facts to a coherent pitch.', steps:[
        { t:'Find your throughline', d:'Look back at what you\'ve actually done — classes, clubs, jobs, projects — and find the honest thread connecting them. It doesn\'t have to be finance from day one; it has to be true.' },
        { t:'Structure it: experience → skill → direction', d:'Not a timeline. A case. "Here\'s what I did, here\'s what it taught me I\'m good at and like doing, here\'s why that points at this specific seat."' },
        { t:'Keep it to 90 seconds', d:'Interviewers ask "walk me through your resume" expecting a pitch, not a recitation. If you\'re still talking at three minutes, you\'ve lost them.' },
        { t:'Answer "why this bank/fund" specifically', d:'"I want to work in finance" answers nothing — every candidate wants that. Name something real: the group\'s deal history, a specific person you spoke with, the culture you\'ve actually heard about from alumni.' },
        { t:'Prepare for the follow-up, not just the opener', d:'A good interviewer will push on whatever you said. If your story mentions a deal or project, be ready to go two levels deeper on it — that\'s often where the real evaluation happens.' },
      ] },
    { type:'keyterms', items:[
        { n:'Fit', d:'Shorthand for whether you\'d be pleasant, reliable, and low-drama to work alongside under real pressure. Evaluated constantly, rarely stated explicitly.' },
        { n:'Throughline', d:'The honest, single thread connecting your experiences into one coherent case — the backbone of a good "walk me through your resume" answer.' },
        { n:'"Why This Seat"', d:'The specific-to-this-firm version of "why finance." Generic answers here are one of the most common reasons a strong candidate doesn\'t advance.' },
      ] },
    { type:'warn', label:'"I\'ve always been passionate about finance" is a red flag, not an opener', text:'Interviewers on a busy recruiting season hear some version of this dozens of times a week. It signals a story that was written to sound good rather than to be true, and experienced interviewers can tell the difference almost immediately. A specific, slightly less polished true story consistently beats a smooth generic one.' },
    { type:'realworld', label:'The 15-Minute Rule', body:'It\'s common practice at large banks for a first-round interview to spend the first 10–15 minutes almost entirely on background and fit before a single technical question is asked — and for interviewers to privately decide within that window whether they\'re rooting for a candidate or not. The technical questions that follow are frequently scored more generously for candidates the interviewer is already rooting for. The fit portion isn\'t a warm-up; it\'s often the highest-leverage part of the entire interview.' },
  ],
  quiz:[
    { q:'Why does the "walk me through your resume" question carry so much weight in finance interviews?', opts:['It\'s a legal requirement','It\'s often where interviewers form their overall impression of the candidate before any technical question is asked','It tests memorization ability','It doesn\'t actually matter much'], correct:1 },
    { q:'What is the biggest problem with the answer "I\'ve always been passionate about finance"?', opts:['It\'s too short','It\'s generic — interviewers hear a version of it constantly and it signals a rehearsed, not a true, story','It\'s factually incorrect','It\'s too long'], correct:1 },
    { q:'A good "why this bank" answer should be:', opts:['As broad as possible so it applies to any firm','Specific to that firm — something real about the group, people, or culture, not just "I want to work in finance"','Focused entirely on compensation','Left out of the interview entirely'], correct:1 },
  ]
},

{
  id:'networking', module:'recruit', type:'lesson', title:'Networking & Cold Outreach',
  minutes:10,
  blocks:[
    { type:'concept', label:'Core Concept', q:'Why does networking matter more in finance recruiting than in most other industries?',
      a:"Finance recruiting runs heavily on referrals and informal signal, not just the online application. A recruiter or analyst who's met you, remembers a good conversation, and is willing to put your resume in front of the right person is worth more than a cold application sitting in a queue of thousands. This isn't unique to finance, but the effect is unusually strong here — many analyst offers can be traced back to some human touchpoint earlier in the process, not the online form alone." },
    { type:'analogy', text:"Networking well is planting seeds, not making sales calls. You're not trying to extract a job offer from a 20-minute call — you're trying to become a real, remembered person to someone who might mention your name in a room you're not in. That only works if the conversation is genuinely useful and pleasant for the other person too, not a thinly disguised pitch." },
    { type:'concept', label:'Doing It Well', q:'Five steps from a cold list to a warm referral.', steps:[
        { t:'Build a real target list', d:'Start with alumni from your school, past interns from your target firms, or second-degree LinkedIn connections. A warm-ish starting point beats a fully cold one.' },
        { t:'Write a short, specific cold email', d:'Three to five sentences. Who you are, one specific reason you\'re reaching out to *them* (not a template), and one easy, low-commitment ask — a 15-minute call, not "can you help me get a job."' },
        { t:'Run the call as a real conversation', d:'Ask about their path, what they actually work on day to day, what they wish they\'d known earlier. Listen more than you pitch. Save one or two smart questions for the end.' },
        { t:'Follow up like a person, not a bot', d:'A short thank-you note within a day or two. No "just checking in" messages every week — that reads as pressure, not interest.' },
        { t:'Let the referral happen naturally', d:'If the conversation went well, most people will offer to pass your resume along or connect you further without being asked. Asking too directly, too early, undercuts the relationship you just built.' },
      ] },
    { type:'keyterms', items:[
        { n:'Informational Interview', d:'A short conversation meant to learn about someone\'s role and path — not a disguised job interview. Treated as one, it usually backfires.' },
        { n:'Warm Intro', d:'Being introduced to someone through a mutual connection rather than reaching out cold. Consistently gets a faster, more generous response.' },
        { n:'Alumni Network', d:'Often the highest-yield starting point for outreach — shared school affiliation is a low-friction reason for someone to say yes to a call.' },
      ] },
    { type:'warn', label:'The two fastest ways to get ignored', text:'Sending the same templated message to 200 people (it reads as one, and people can tell), and asking directly for a job or referral in the very first message. Both signal that the person on the other end is a means to an end, not someone worth an actual conversation — and most people can feel that instantly.' },
    { type:'realworld', label:'Why "Just Applying Online" Underperforms', body:'At large banks, a single analyst posting can draw many thousands of online applications for a handful of seats — a volume no team can meaningfully differentiate on resume alone. A referral or a remembered conversation moves a resume out of that pile and in front of an actual person. This is precisely why career services and recruiting coaches at target schools push networking so hard: it\'s not etiquette, it\'s the most direct lever a candidate actually controls.' },
  ],
  quiz:[
    { q:'What is the main purpose of an informational interview?', opts:['To directly ask for a job offer','To learn about someone\'s role and path in a genuine conversation — not a disguised job interview','To negotiate salary','To submit a resume formally'], correct:1 },
    { q:'Why do templated, mass-sent cold emails tend to perform poorly?', opts:['They\'re against the law','They read as generic and impersonal, and people can usually tell', 'They are too short', 'Email is not used in recruiting'], correct:1 },
    { q:'Why does a referral typically outperform a cold online application?', opts:['It skips required application steps','It moves a resume in front of an actual person rather than sitting in a queue of thousands of undifferentiated applications','It guarantees an offer','It is required by every firm'], correct:1 },
  ]
},

{
  id:'resume', module:'recruit', type:'lesson', title:'Resume for Finance',
  minutes:8,
  blocks:[
    { type:'concept', label:'Core Concept', q:'Why does resume format matter as much as the substance behind it?',
      a:"During high-volume recruiting seasons, an analyst doing first-pass resume screens might genuinely spend well under a minute per resume. In that window, format does the sorting before content gets a fair read: one page, clean structure, and a strong first bullet under each role are what actually get a resume a second, slower look." },
    { type:'analogy', text:"Treat it like a one-page ad, not a life story. An ad doesn't try to tell you everything about the product — it leads with the single strongest, most relevant claim and gets out of the way. A resume that tries to include everything you've ever done ends up highlighting nothing." },
    { type:'concept', label:'What Actually Gets Read', q:'Five rules that separate a screened-in resume from a skipped one.', steps:[
        { t:'One page. No exceptions', d:'A finance resume is never two pages, regardless of experience level. Cut, don\'t shrink the font to fit.' },
        { t:'Every bullet: action verb + what you did + a number', d:'"Responsible for financial analysis" says nothing. "Built a 3-statement model used to evaluate a $40M acquisition target" says everything. If a bullet has no number, it\'s usually a sign the bullet is too vague, not that the work wasn\'t quantifiable.' },
        { t:'Lead with your strongest, most relevant line', d:'Under each experience, the first bullet is the one that gets read most carefully. Don\'t bury the best one third.' },
        { t:'Show GPA and test scores if they\'re strong', d:'If your GPA is competitive for your target firms, show it. Leaving it off when it\'s strong reads as a gap; when it\'s not competitive, leaving it off is normal and expected.' },
        { t:'Cut the filler sections', d:'No "Objective" paragraph, no photo, no unrelated hobbies padding the page. Every line should be doing work — if it doesn\'t support the case for this specific role, it\'s taking up space that could hold a stronger bullet.' },
      ] },
    { type:'keyterms', items:[
        { n:'Quantified Bullet', d:'A resume line with a specific number in it — dollars, percentage, headcount, time saved. The single most common gap between a weak resume and a strong one.' },
        { n:'ATS (Applicant Tracking System)', d:'Software many firms use to scan resumes for keywords before a human sees them. Standard section headers and a clean, simple format parse correctly; heavy graphics and unusual layouts often don\'t.' },
        { n:'Reverse Chronological', d:'The standard finance resume format — most recent experience first. Deviating from it (by theme, by category) reads as unconventional in a field that reads dozens of resumes a day and expects a familiar shape.' },
      ] },
    { type:'warn', label:'An unquantified bullet is a skipped bullet', text:'"Assisted with market research" and "performed due diligence on potential investments" could describe anything from a genuinely substantial project down to almost nothing. Without a number or a concrete outcome attached, a fast reader has no way to tell the difference — and in a 20-second screen, it gets treated as the weaker version by default.' },
    { type:'realworld', label:'The 20-Second Screen', body:'It\'s widely reported that large banks and funds, during peak recruiting weeks, receive resume volumes that make anything beyond a rapid first-pass scan impractical for the team doing initial screens. A resume that requires the reader to hunt for the point — dense paragraphs, no clear bolded numbers, inconsistent formatting — is disproportionately likely to be set aside in favor of one that makes its strongest claim obvious at a glance. This is exactly why format-as-triage is treated as a real, not cosmetic, part of recruiting prep.' },
  ],
  quiz:[
    { q:'Which resume bullet is stronger, and why?', opts:['"Responsible for financial analysis and reporting" — it sounds more professional','"Built a 3-statement model used to evaluate a $40M acquisition target" — it\'s specific and quantified','Both are equally strong','Neither matters since resumes aren\'t read closely'], correct:1 },
    { q:'How long should a finance resume be, regardless of experience level?', opts:['Exactly one page','Two pages to show more depth','As long as needed','Three pages for senior candidates'], correct:0 },
    { q:'Why do most finance resumes use reverse chronological order rather than a thematic/skills-based format?', opts:['It\'s legally required','It\'s the familiar, expected shape for a field that screens many resumes quickly — deviating from it reads as unconventional','Thematic formats are always better but banned','There is no real convention'], correct:1 },
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
    solution:{
      headline:'The $1.65B offer sits inside a defensible range — but at the low end of it. Recommend engaging, and push.',
      range:'Roughly $1.3B – $2.0B across methods, with an overlap zone around $1.5B – $1.8B.',
      steps:[
        { t:'Comps: ~$1.0B – $1.5B', d:'Atlas EBITDA is ~$82M (24% of $340M). Industrial automation peers at 12–18x give $0.98B – $1.48B. The $1.65B offer is ABOVE this entire range — expected, because trading comps carry no control premium.' },
        { t:'Precedent transactions: ~$1.3B – $2.0B', d:'Robotics/automation deals at 16–24x on $82M EBITDA give $1.31B – $1.97B. The $1.65B offer (≈20x) lands almost exactly mid-range. This is the most relevant benchmark, since it is also a control transaction.' },
        { t:'DCF: ~$1.5B – $1.9B', d:'At ~15% revenue growth decaying toward GDP, a 24% margin, ~10% WACC and 2.5% terminal growth, the DCF should land in the high-$1B range. If yours is far outside that, check terminal growth — it dominates the answer.' },
        { t:'Where the offer lands', d:'$1.65B sits inside the overlap of precedents and DCF, and above comps. That makes it defensible — a board could accept it without breaching its duty. It is not, however, a knockout number.' },
      ],
      verdict:'A fairness opinion could support $1.65B — it is within the range of what similar control transactions have paid. But it is mid-precedent and at the DCF low end, for an asset growing 15% a year. The correct advice is not "accept" or "reject": it is engage, and run a process. A single unsolicited bidder rarely produces the best price, and the analysis says there is room above $1.65B. If the buyer is strategic and synergies are real, $1.8B+ is arguable.',
      pitfall:'The most common mistake here is comparing the offer to trading comps and concluding it is generous. Trading comps price minority stakes; this is a purchase of 100% control. Comparing a control offer to trading multiples without adjusting for the control premium will make almost any takeover look like a great deal.'
    },
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
    solution:{
      headline:'The PE firm probably does this deal. The bank should be uncomfortable underwriting it at 65% leverage.',
      range:'Entry EV $1.62B, ~$1.05B debt, ~$567M equity. Base-case IRR lands in the high teens to low 20s.',
      steps:[
        { t:'Entry structure', d:'$180M EBITDA × 9x = $1.62B EV. At 65% leverage that is ~$1.05B of debt and ~$567M of sponsor equity. Entry leverage is 1,053/180 = ~5.9x EBITDA — already high.' },
        { t:'PE view: returns are adequate, not exciting', d:'At 5–8% EBITDA growth over 5 years with entry multiple = exit multiple, IRR should come out roughly 17–22% depending on where in that growth band you sit and how fast debt amortizes. It clears a 15% hurdle comfortably; it clears 20% only at the optimistic end.' },
        { t:'Credit view: coverage is thin', d:'Interest at ~7% on $1.05B is ~$74M against $180M EBITDA — interest coverage ~2.4x. Add scheduled amortization and DSCR falls toward 1.2–1.4x. For a stable business that is acceptable. For freight it is not much cushion.' },
        { t:'The downside case decides it', d:'Freight volumes fell double digits in 2008–09 and again in the 2022–23 freight recession. A 20% EBITDA decline takes $180M to $144M: leverage jumps to ~7.3x and coverage falls under 2.0x. A 30% decline breaches most realistic covenant packages.' },
      ],
      verdict:'Both seats are rational and they disagree — which is the point of the case. The sponsor is buying an option: their downside is capped at the $567M equity cheque and their upside is levered. The bank has no upside beyond its coupon and takes the same cyclical risk. A credit committee would likely approve this only with lower leverage (55–60%), tighter covenants, or higher pricing. This tension is exactly why leveraged finance desks and sponsors negotiate rather than simply agree.',
      pitfall:'Assuming multiple expansion. If you set exit multiple above 9x, returns look great and the analysis becomes meaningless — you have assumed the answer. Cyclical businesses should never be underwritten on exit multiple expansion; if the deal only works at 10x exit, it does not work.'
    },
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
    solution:{
      headline:'Blended cash-and-stock. All-stock is cheapest optically but hands Cascade shareholders too much of the upside.',
      range:'Cascade at 12x revenue on $400M = ~$4.8B purchase price.',
      steps:[
        { t:'The multiple mismatch is a trap', d:'Northwind trades at 18x EBITDA; Cascade is priced at 12x REVENUE. These are not comparable metrics. Cascade is unprofitable, so it has no EBITDA multiple at all. Any accretion/dilution conclusion drawn from comparing 18x to 12x is meaningless.' },
        { t:'The deal is dilutive to EPS, and that is fine', d:'Cascade has no earnings. Adding a loss-making business to Northwind reduces pro forma EPS under every financing structure. Accretion/dilution is the wrong lens for acquiring an unprofitable high-growth asset — the right lens is strategic value and long-run cash flow.' },
        { t:'All-cash / all-debt', d:'$4.8B is large relative to Northwind. Funding it entirely with debt loads a mature but not enormous company with significant leverage to buy an asset that burns cash. Interest expense worsens the EPS dilution immediately.' },
        { t:'All-stock', d:'Avoids the leverage, but Northwind is issuing shares at 18x EBITDA to buy an asset it believes is undervalued. It also hands Cascade shareholders a permanent claim on the combined upside — including the synergies Northwind creates.' },
        { t:'Synergies: trust cost, discount revenue', d:'Overlapping G&A and sales infrastructure are credible and largely controllable. Cross-selling Cascade into Northwind\'s base is the classic revenue synergy that arrives late and smaller than modelled. Underwrite the cost synergies; treat revenue synergies as upside.' },
      ],
      verdict:'Recommend a blend — meaningful cash or debt for the portion Northwind can service comfortably, with stock covering the rest. Cash signals confidence and limits dilution of the existing shareholder base; stock shares risk on an asset whose value depends on growth continuing. Tell the board plainly that the deal will be EPS-dilutive for several years and that this is the wrong metric to judge it by — the question is whether Cascade\'s growth is worth $4.8B, not what next year\'s EPS prints.',
      pitfall:'Presenting an accretion/dilution table as the primary recommendation. Boards ask for it, and you should produce it — but leading with it on a loss-making, high-growth target shows you have applied a framework without asking whether it fits.'
    },
    links:['merger','comps']
  },
  {
    id:'harbor', tag:'credit', tagLabel:'CREDIT / RESTRUCTURING', name:'Harbor Foods — Covenant Breach',
    desc:'A PE-owned packaged-foods company is 8 months from breaching its leverage covenant as EBITDA slides. Sit on the lender side: assess the damage, and decide what you\'d demand before granting a waiver.',
    pills:['Credit','DSCR','Scenario'], difficulty:3,
    brief:"Harbor Foods was bought by a PE sponsor three years ago at 7.5x EBITDA with 60% leverage. Since then, input costs rose and a key retail customer cut orders — EBITDA has fallen from $95M at entry to $71M today, while the debt balance has barely amortized. The credit agreement has a maintenance covenant requiring Net Debt/EBITDA to stay below 5.5x, tested quarterly. You're the lender's workout analyst: management is asking for a covenant waiver before the next test date, and you need to recommend terms.",
    approach:[
      "Open the Credit Ratio Calculator. Enter Harbor's current EBITDA ($71M) and outstanding debt from the original 60%-leverage structure on a 7.5x entry multiple — calculate today's actual leverage ratio and compare it to the 5.5x covenant.",
      "Check interest coverage and DSCR at the current EBITDA level. Is this a covenant problem only, or is Harbor actually at risk of failing to make cash interest payments?",
      "Model a downside case: if EBITDA falls another 10% next year (input cost pressure hasn't fully reversed), does leverage cross a level where the equity is effectively wiped out and the debt itself is impaired?",
      "Decide what you'd require for a waiver: extra amortization, a pricing step-up (higher spread), an equity cure right (letting the sponsor inject cash to cure the breach), or tighter reporting. Real lenders rarely just say yes for free.",
      "Write the one-paragraph credit memo: grant the waiver on your proposed terms, or push Harbor toward a broader restructuring? Justify it with the ratios, not just a gut call.",
    ],
    solution:{
      headline:'Harbor is already in breach on a look-forward basis. Grant a waiver only with an equity cure, tighter terms, and higher pricing.',
      range:'Entry debt ~$427M against $71M EBITDA = ~6.0x leverage, versus a 5.5x covenant.',
      steps:[
        { t:'Establish today\'s leverage', d:'Entry EV was $95M × 7.5x = $712M, with 60% leverage = ~$427M of debt. Against current EBITDA of $71M, leverage is ~6.0x. The covenant is 5.5x. Harbor is already through it — the next test date simply makes it official.' },
        { t:'Distinguish covenant breach from payment distress', d:'This is the key analytical step. At, say, a 7% rate, interest is ~$30M against $71M EBITDA — coverage ~2.4x. Harbor can still PAY. It is a covenant problem, not yet a liquidity problem. That distinction determines whether you are negotiating a waiver or running a restructuring.' },
        { t:'Run the downside', d:'Another 10% EBITDA decline takes $71M to ~$64M: leverage rises to ~6.7x and coverage falls toward 2.1x. At a 20% decline coverage approaches 1.7x and free cash flow after capex gets thin. The equity is deeply underwater well before the debt is impaired — sponsor equity was ~$285M against an enterprise now worth roughly 7.5x × $71M = $533M versus $427M of debt.' },
        { t:'Price the waiver', d:'The sponsor needs this waiver far more than you do. Standard asks: an equity cure (sponsor injects cash to bring leverage back under the covenant), a 50–150bp pricing step-up, mandatory excess-cash-flow sweep, a reset covenant schedule with step-downs, and monthly rather than quarterly reporting.' },
      ],
      verdict:'Grant the waiver, but priced and conditioned. Harbor is not a liquidation candidate — it services its debt, the enterprise still covers the debt quantum, and forcing a default here destroys value for everyone including the lender. But a free waiver rewards the sponsor for a deterioration the lender did not cause. Require the equity cure: it tests whether the sponsor still believes in the asset. A sponsor unwilling to inject cash is telling you they have written the equity off — and that answer changes your recommendation entirely.',
      pitfall:'Treating a covenant breach as an automatic default and jumping to restructuring. Most breaches are resolved through negotiated waivers because both sides lose in a formal default. The analytical work is figuring out what the borrower can afford to give, not whether to pull the trigger.'
    },
    links:['credit','lbo']
  },
  {
    id:'solstice', tag:'sellside', tagLabel:'SELL-SIDE M&A', name:'Solstice Health — Quick Comps Read',
    desc:'A founder-owned diagnostics company just got an unsolicited offer and wants a same-day gut check before hiring a bank. Build a comps-only valuation range fast — no DCF, no data room, just public multiples.',
    pills:['Comps','Football Field'], difficulty:1,
    brief:"Solstice Health is a founder-owned diagnostics-testing company doing $60M revenue and $14M EBITDA (≈23% margin), growing about 12% a year. A strategic buyer just sent an unsolicited letter offering $180M (≈12.9x EBITDA). The founder hasn't hired a bank yet and wants a rough, fast answer this week: is that offer even in the right neighborhood, or is it worth paying for real advice before responding? This is the case every junior analyst does first — one method, done well, under time pressure.",
    approach:[
      "Skip the DCF — you don't have a management forecast or enough time to build one credibly. This case is a comps-only gut check, which is exactly what happens in the real world before a formal process kicks off.",
      "Open the Comps Calculator. Enter Solstice's EBITDA ($14M) and build a peer set of 3-5 public diagnostics/healthcare-services companies with a plausible EV/EBITDA range for a company this size and growth rate.",
      "Watch what the median peer multiple implies for Solstice's value, and notice how much a single high or low outlier peer would swing an average versus a median — this is the exact mechanic the calculator is built to show you.",
      "Plot the comps range against the $180M offer (≈12.9x) on the Football Field Calculator. Does the offer sit inside, above, or below the peer range?",
      "Give the founder a one-line answer: is $180M worth taking seriously as-is, or does it look light enough that running a real process (with a DCF and precedent transactions too) would likely surface a higher number?",
    ],
    solution:{
      headline:'$180M is in the right neighbourhood but likely light. Worth hiring a bank.',
      range:'Comps-implied range roughly $154M – $210M on $14M EBITDA at 11–15x.',
      steps:[
        { t:'Anchor on EBITDA', d:'Solstice does $14M EBITDA on $60M revenue. The $180M offer is 180/14 = ~12.9x EBITDA, and 3.0x revenue. Always convert an offer into a multiple before judging it — a headline dollar figure means nothing on its own.' },
        { t:'Build the peer range', d:'Diagnostics and healthcare-services peers with mid-teens growth have generally traded in a low-to-mid teens EV/EBITDA band. Applying 11–15x to $14M gives roughly $154M – $210M. The offer sits just below the midpoint.' },
        { t:'Median, not mean', d:'If one peer trades at 25x because of a pending acquisition or a one-off EBITDA dip, an average is dragged upward and your whole answer is wrong. The median resists that. Move a single peer multiple in the Comps calculator to see the mean swing while the median barely moves — that is the entire lesson of this case.' },
        { t:'Remember what is missing', d:'This is a trading-comps range. It contains no control premium, and this is an offer for 100% of the company. A control transaction should reasonably clear the top of a trading-comps range, not sit below its midpoint.' },
      ],
      verdict:'Tell the founder: the offer is serious and not insulting — it is inside the range of what comparable businesses are worth. But it is a control offer priced below the midpoint of a minority-stake trading range, from a single unsolicited bidder with no competitive tension. That combination usually means there is room. Hiring a bank to run even a narrow process, and adding a DCF and precedent transactions to the analysis, is very likely worth more than the fee. Do not respond with a counter-number yet — respond by starting a process.',
      pitfall:'Doing this in ten minutes and calling it a valuation. A one-method, no-diligence range is a gut check to decide whether to invest in real analysis — not an answer to give a board. Say that out loud when you present it; being explicit about the limits of a quick read is what makes a junior analyst trusted with the real one.'
    },
    links:['comps','football']
  },
];

/* ---------- GLOSSARY ----------
   cat is one of: 'Statements','Valuation','Deals','Credit','Careers' — used to render
   filter chips on the Glossary page. Keep every term tagged; the "All" chip is derived. */
const GLOSSARY=[
  {t:'EBITDA',cat:'Statements',d:'Earnings Before Interest, Taxes, Depreciation and Amortization. The most widely used proxy for operating cash generation. Used in almost every valuation multiple and credit ratio in finance. Strips out capital structure choices and accounting policy.'},
  {t:'Free Cash Flow (FCF)',cat:'Statements',d:'Cash generated after maintaining and growing the asset base. = Operating Cash Flow minus CapEx. The input to every DCF model. More honest than net income because it\'s harder to manipulate.'},
  {t:'Enterprise Value (EV)',cat:'Valuation',d:'Total value of a business to all capital providers — both debt and equity holders. EV = Market Cap + Net Debt. Used in multiples like EV/EBITDA because it\'s capital-structure neutral.'},
  {t:'WACC',cat:'Valuation',d:'Weighted Average Cost of Capital. The discount rate in a DCF. Blends cost of equity (via CAPM) and after-tax cost of debt, weighted by their proportions in the capital structure.'},
  {t:'Net Debt',cat:'Statements',d:'Total Debt minus Cash. The bridge between Enterprise Value and Equity Value: EV minus Net Debt = Equity Value. Negative net debt = the company holds more cash than it owes.'},
  {t:'Terminal Value',cat:'Valuation',d:'In a DCF, the present value of all cash flows beyond the forecast period, into perpetuity. Typically 60–80% of total EV. Most sensitive and most important assumption in any DCF model.'},
  {t:'LBO',cat:'Deals',d:'Leveraged Buyout. A PE firm acquires a company using mostly borrowed money, with the company\'s own cash flows repaying the debt over time. Leverage amplifies equity returns — and equity losses.'},
  {t:'IRR',cat:'Deals',d:'Internal Rate of Return. The annualised return on equity invested. PE firms target 20–25%+. Below 15% is generally considered a failed investment that still returned capital but missed the hurdle rate.'},
  {t:'MOIC',cat:'Deals',d:'Multiple on Invested Capital. Exit Equity divided by Entry Equity. 3x MOIC means you tripled the money. PE target: 2.5–3.5x. Below 2x = failed investment even if IRR looks acceptable.'},
  {t:'DSCR',cat:'Credit',d:'Debt Service Coverage Ratio. EBITDA divided by all debt service (interest + scheduled principal). Lenders typically require 1.25–1.50x at underwriting. Below 1.0x means the company cannot service its debt from operations.'},
  {t:'Leverage Ratio',cat:'Credit',d:'Net Debt divided by EBITDA. Primary measure of debt burden relative to cash generation. Below 2x is conservative. 3–4x is standard investment grade. Above 5x is speculative territory requiring scrutiny.'},
  {t:'Control Premium',cat:'Deals',d:'Extra price paid above market value to acquire a controlling stake. Long-run historical average: roughly 25–40% above the unaffected share price, though it varies widely by sector, deal competition, and cycle. Justified by synergies and full operational control.'},
  {t:'Comps',cat:'Valuation',d:'Comparable Company Analysis. Values a company by applying trading multiples (EV/EBITDA, P/E, EV/Revenue) from similar publicly traded peers. The market\'s live verdict — fast and market-anchored.'},
  {t:'DCF',cat:'Valuation',d:'Discounted Cash Flow. Values a company based on present value of all future free cash flows discounted at WACC. The theoretical intrinsic value method — most rigorous but most assumption-sensitive.'},
  {t:'Accretion / Dilution',cat:'Deals',d:'In M&A, whether the deal increases (accretive) or decreases (dilutive) the acquirer\'s EPS. Boards are intensely focused on this. A deal can be accretive while still destroying long-run shareholder value.'},
  {t:'Goodwill',cat:'Statements',d:'Premium paid above fair value of net identifiable assets in an acquisition. Not a real asset. When acquisitions disappoint, goodwill is impaired — a large non-cash charge destroying book equity instantly.'},
  {t:'Working Capital',cat:'Statements',d:'Current Assets minus Current Liabilities. Rising working capital relative to revenue is a cash drain — the business is growing faster than it can collect cash or is paying suppliers faster than it collects from customers.'},
  {t:'CapEx',cat:'Statements',d:'Capital Expenditures. Cash spent on long-term physical assets. Maintenance CapEx keeps assets working; growth CapEx expands capacity. Subtracted from Operating Cash Flow to calculate Free Cash Flow.'},
  {t:'Covenant',cat:'Credit',d:'Contractual guardrails in a loan agreement. Maintenance covenants must be met every quarter — breach is a technical default. Incurrence covenants only apply when the borrower takes a specific action. Cov-lite = incurrence only.'},
  {t:'Retained Earnings',cat:'Statements',d:'Cumulative profits ever earned minus all dividends ever paid. Grows by net income each period. The critical link between Income Statement and Balance Sheet. Negative retained earnings = accumulated deficit.'},
  {t:'Interest Coverage',cat:'Credit',d:'EBITDA divided by Interest Expense. Below 3x is a warning sign. Below 1.5x means the company struggles to pay even interest from operations — any EBITDA miss triggers potential default.'},
  {t:'LTV/CAC',cat:'Valuation',d:'Lifetime Value to Customer Acquisition Cost. Above 3x = healthy unit economics. Below 1x = destroying value with every customer acquired regardless of revenue growth.'},
  {t:'EV/EBITDA',cat:'Valuation',d:'Enterprise Value divided by EBITDA. The most widely used valuation multiple. Capital-structure neutral. Indicative ranges (2024–25 market): Enterprise SaaS 15–30x, Consumer 8–14x, Industrials 8–13x, Energy 4–8x. Treat these as directional only — sector multiples reprice sharply with interest rates, so always pull a live peer set rather than quoting a remembered range.'},
  {t:'Football Field Chart',cat:'Valuation',d:'Standard pitch book visual showing valuation ranges from all methods (DCF, Comps, Precedent Tx, LBO, trading range) as horizontal bars, with the current offer as a vertical dashed line. In nearly every M&A pitch book.'},
  {t:'Synergies',cat:'Deals',d:'Value created by combining two businesses that neither could generate alone. Cost synergies (headcount, procurement) are more reliable. Revenue synergies (cross-selling, new markets) are harder to achieve and should be discounted.'},
  {t:'Fairness Opinion',cat:'Deals',d:'Formal written statement from an investment bank that the deal consideration is fair from a financial point of view to shareholders. The football field chart is the analytical core of every fairness opinion.'},
  {t:'Multiple Expansion',cat:'Deals',d:'Selling a business at a higher valuation multiple than it was bought at. Can be a legitimate result of improving business quality, or purely market-driven. Never assume it in a base-case LBO return.'},
  {t:'Credit Rating',cat:'Credit',d:'A letter grade (AAA down to D) from agencies like Moody\'s or S&P estimating a borrower\'s default risk. Investment grade (BBB-/Baa3 or above) borrows far more cheaply than speculative/junk grade.'},
  {t:'Exchange Ratio',cat:'Deals',d:'In an all-stock acquisition, the number of acquirer shares each target shareholder receives per share of the target they owned.'},
  {t:'Channel Stuffing',cat:'Statements',d:'Pushing more product onto distributors or customers than they actually need, to inflate reported revenue in a given period — usually reverses as returns or cancelled orders in the following period.'},
  {t:'Non-GAAP / Adjusted Metric',cat:'Statements',d:'A profitability figure that excludes certain costs management considers non-representative (like stock compensation or restructuring charges). Useful when used honestly; a red flag when the "adjustments" recur every period.'},
  {t:'Amortization',cat:'Statements',d:'The systematic write-down of an intangible asset (like acquired goodwill\'s identifiable intangibles, or a loan\'s premium/discount) over its useful life. Depreciation\'s counterpart for intangible, not physical, assets — added back to get EBITDA.'},
  {t:'Quality of Earnings (QoE)',cat:'Deals',d:'A due-diligence deep-dive, usually by an accounting firm, that normalizes a target\'s reported EBITDA — stripping out one-time items, aggressive accruals, and owner perks — to find the "real," sustainable number a buyer should actually pay a multiple on.'},
  {t:'Add-Back',cat:'Statements',d:'An expense added back to net income to reach an adjusted EBITDA — e.g. one-time legal fees, owner\'s above-market salary, a lawsuit settlement. Legitimate add-backs improve comparability; aggressive ones are a diligence red flag (see Quality of Earnings).'},
  {t:'Cap Table',cat:'Deals',d:'Capitalization Table. A ledger of everyone who owns a piece of a company — founders, employees (via options), and every investor round — and how much of the company each stake represents, including how a new financing round dilutes existing holders.'},
  {t:'Dilution',cat:'Deals',d:'The reduction in an existing shareholder\'s ownership percentage when a company issues new shares — to raise capital, pay for an acquisition, or grant employee equity. Distinct from EPS dilution in the Accretion/Dilution sense, though the mechanism (more shares outstanding) is the same idea.'},
  {t:'Vesting Schedule',cat:'Careers',d:'The timeline over which an employee earns the equity or options they were granted, most commonly four years with a one-year "cliff" (nothing vests until year one, then it starts accruing). Leaving before the cliff usually means forfeiting all of it.'},
  {t:'Rule of 40',cat:'Valuation',d:'A SaaS health check: revenue growth rate (%) plus profit margin (%) should add up to 40 or more. A company growing 50% with a -15% margin (35 total) is considered less healthy than one growing 25% at a 20% margin (45 total).'},
  {t:'Burn Rate',cat:'Statements',d:'How fast a company is spending its cash reserves, usually expressed per month. "Gross burn" is total cash out; "net burn" nets out revenue collected. The number that determines how much runway is left before the company needs to raise again.'},
  {t:'Runway',cat:'Statements',d:'Cash on hand divided by monthly net burn rate — how many months a company can keep operating before running out of money, assuming no new financing or change in spending.'},
  {t:'Carried Interest',cat:'Deals',d:'The PE firm\'s share of investment profits — typically 20% — paid to the fund\'s general partners once investors have gotten their capital back plus a minimum return (the hurdle rate). The primary long-term compensation mechanism in private equity.'},
  {t:'Dry Powder',cat:'Deals',d:'Capital that a PE or VC fund has raised and committed from investors but not yet deployed into deals. High industry-wide dry powder is often cited as a driver of rising purchase-price multiples — more capital chasing the same pool of targets.'},
  {t:'Club Deal',cat:'Deals',d:'An LBO where multiple PE firms jointly buy a target, splitting the equity check. Used for deals too large or too risky for a single fund\'s concentration limits — at the cost of shared control and split economics.'},
  {t:'Bolt-On Acquisition',cat:'Deals',d:'A smaller acquisition made by a PE-owned "platform" company to add capabilities, geography, or customers — cheaper per dollar of EBITDA than the original platform purchase, and a core lever for building returns during the hold period.'},
  {t:'Break-Up Fee',cat:'Deals',d:'A penalty a target company agrees to pay an acquirer if the target\'s board walks away from a signed deal — usually to accept a higher competing bid. Typically 2–4% of deal value; compensates the original acquirer for time and exposed strategy.'},
  {t:'Go-Shop Period',cat:'Deals',d:'A window after a merger agreement is signed during which the target is allowed to actively solicit competing offers, rather than passively waiting for one. A governance mechanism meant to prove the board didn\'t just accept the first bid on the table.'},
  {t:'PIK Interest',cat:'Credit',d:'Payment-in-Kind interest — instead of paying interest in cash, the borrower\'s debt balance simply grows by the interest amount. Preserves the borrower\'s cash in the near term but compounds the total amount owed at exit. A common feature in stretched or subordinated LBO debt tranches.'},
  {t:'Bridge Loan',cat:'Credit',d:'Short-term financing that "bridges" a company to a longer-term, permanent financing solution — e.g. a bank commits bridge debt to guarantee an LBO closes, intending to refinance it into high-yield bonds or a term loan shortly after.'},
  {t:'Precedent Transaction',cat:'Valuation',d:'A valuation method (distinct from trading Comps) that looks at multiples paid in prior real M&A deals for similar targets. Reflects an actual control premium a buyer paid, not just where a stock trades today — which is why precedent multiples usually run above trading comps.'},
  {t:'Circular Reference',cat:'Valuation',d:'When a formula in a financial model depends on its own output — classically, interest expense depends on the debt balance, which depends on the cash flow available to pay down debt, which depends on interest expense. Handled with a plug, an iterative-calculation setting, or a debt schedule built to avoid it entirely.'},
  {t:'Behavioral Fit',cat:'Careers',d:'The non-technical half of an interview — "walk me through your resume," "why this firm," "tell me about a time you disagreed with a teammate." Interviewers use it to judge whether they\'d want to sit next to you at 1am during a live deal, not just whether you can build a DCF.'},
  {t:'Cold Outreach',cat:'Careers',d:'Emailing or messaging an alum, banker, or investor you don\'t know to ask for a short call — the primary way students without a existing network get their resume in front of the right person. Effective outreach is short, specific about why you\'re reaching out to that person, and asks for time, not a job.'},
  {t:'Case Study Interview',cat:'Careers',d:'A recruiting round (common in PE and consulting) where a candidate is given a business scenario or a small model to build under time pressure, then presents a recommendation. Tests applied judgment, not just whether you\'ve memorized formulas.'},
];
