import type { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'svc-accounting',
    slug: 'accounting',
    number: '01',
    name: 'Accounting',
    tagline: 'Bookkeeping, payroll, management accounts',
    shortSummary: 'Monthly books, closed by the tenth.',
    description:
      'We run your bookkeeping, payroll and management accounts every month and close the books by the tenth working day. You get one set of numbers that your board, your bank and your investors can all use.',
    startingPrice: { AED: 2500, GBP: 550 },
    priceUnit: 'a month',
    image: '/assets/images/shared/6ad74ed5edaf003b60748840_hf_20261020_105325_0483af75-2c2d-4e59-9397-52b32d039067_min.webp',
    imageAlt: 'Laptop showing financial figures beside a burgundy notebook and pen on an oak desk',
    deliverables: [
      'Bookkeeping in Xero, QuickBooks or Zoho Books',
      'Bank and card reconciliations every week',
      'Payroll, with WPS files for UAE teams',
      'Management accounts by the tenth working day',
      'A cash flow forecast, rolled forward monthly',
      'A named accountant who knows your business',
    ],
    steps: [
      {
        number: 'Step 01',
        title: 'Week one',
        description: 'We map your accounts, connect your bank feeds and bring last year’s balances across.',
      },
      {
        number: 'Step 02',
        title: 'Every month',
        description: 'Receipts in, reconciliations done, payroll run. You approve, we post.',
      },
      {
        number: 'Step 03',
        title: 'By the tenth',
        description: 'Management accounts arrive with a one page note on what moved and why.',
      },
      {
        number: 'Step 04',
        title: 'Every quarter',
        description: 'A review call with your accountant and the numbers that matter next quarter.',
      },
    ],
    notes: [
      {
        number: '01',
        title: 'Software',
        description: 'Xero, QuickBooks Online and Zoho Books. Anything else, we tell you whether to stay or move.',
      },
      {
        number: '02',
        title: 'Joining mid year',
        description: 'Most clients do. We rebuild the earlier months so the year closes on one set of books.',
      },
      {
        number: '03',
        title: 'Your data',
        description: 'Everything lives in your own ledger and your own folder. You can leave with all of it.',
      },
    ],
    leadPersonSlug: 'leo-brandt',
    relatedPlans: ['essential', 'growth', 'group'],
    relatedQuestions: ['accounting-software', 'join-mid-year', 'who-works-with-me'],
    relatedDeadlines: ['uae-vat-q3-2026', 'uk-companies-house-2026'],
    relatedCaseStudies: ['trading-group-monthly-close', 'hospitality-group-dubai-london'],
    seo: {
      title: 'Accounting | Vika accounting, tax and audit',
      description: 'Monthly bookkeeping, payroll and management accounts closed by the tenth working day in Dubai and London.',
    },
  },
  {
    id: 'svc-tax',
    slug: 'tax',
    number: '02',
    name: 'Tax',
    tagline: 'VAT, corporate tax, registrations',
    shortSummary: 'VAT and corporate tax, filed early.',
    description:
      'We register you, keep the tax calendar and file every VAT and corporate tax return before it falls due, in the UAE and the UK. Nothing is filed until you have read it and approved it.',
    startingPrice: { AED: 1500, GBP: 330 },
    priceUnit: 'a quarter',
    image: '/assets/images/shared/6ad74ed5edaf003b6074883d_hf_20261020_105322_265f1e53-8b4b-49f1-a360-e902c82bfb9b_min.webp',
    imageAlt: 'Burgundy document folder, black calculator and pen on a pale studio desk',
    deliverables: [
      'VAT and corporate tax registration',
      'Quarterly VAT returns in the UAE and the UK',
      'The annual corporate tax return and computation',
      'Transfer pricing disclosures where they apply',
      'Small Business Relief checks for eligible companies',
      'Letters and reviews from the tax authority, handled',
    ],
    steps: [
      {
        number: 'Step 01',
        title: 'Registration',
        description: 'We check what you need to register for, in which country, and register you.',
      },
      {
        number: 'Step 02',
        title: 'The calendar',
        description: 'Every deadline for every entity goes on one calendar, with a reminder a month out.',
      },
      {
        number: 'Step 03',
        title: 'Preparation',
        description: 'Each return is prepared from closed books and sent to you with a short summary.',
      },
      {
        number: 'Step 04',
        title: 'Filing',
        description: 'You approve, we file, and the receipt is in your shared folder the same day.',
      },
    ],
    notes: [
      {
        number: '01',
        title: 'Two countries',
        description: 'One team keeps the UAE and UK calendars together, so groups see every deadline in one place.',
      },
      {
        number: '02',
        title: 'Early by default',
        description: 'Returns are ready ten working days before they are due. Late information is the only exception.',
      },
      {
        number: '03',
        title: 'Fixed fees',
        description: 'Each return has a fixed fee agreed in advance. Authority queries are quoted before we start.',
      },
    ],
    leadPersonSlug: 'rami-nassar',
    relatedPlans: ['tax-registration', 'essential', 'growth', 'group'],
    relatedQuestions: ['how-fees-work', 'outside-uae-uk'],
    relatedDeadlines: ['uae-vat-q3-2026', 'uae-ct-2026', 'uk-vat-q3-2026', 'uk-ct600-2026'],
    relatedCaseStudies: ['software-group-first-corporate-tax-return', 'hospitality-group-dubai-london'],
    seo: {
      title: 'Tax | Vika accounting, tax and audit',
      description: 'VAT and corporate tax registrations, quarterly returns and transfer pricing across the UAE and the UK.',
    },
  },
  {
    id: 'svc-audit',
    slug: 'audit',
    number: '03',
    name: 'Audit',
    tagline: 'Statutory audit, licence renewals, group packs',
    shortSummary: 'Statutory audits, without the scramble.',
    description:
      'Our audit team signs statutory audits for free zone and mainland companies in the UAE, and for UK companies that need one. We plan in the first month of your year, so year end is a review, not a rescue.',
    startingPrice: { AED: 18000, GBP: 3950 },
    priceUnit: 'an audit',
    image: '/assets/images/shared/6ad74ed5edaf003b60748843_hf_20261020_105323_00b2eef3-ab54-41a5-bf8e-71007ed59093_min.webp',
    imageAlt: 'Accountant hand writing notes in a ledger beside a burgundy notebook',
    deliverables: [
      'Statutory audit of annual financial statements',
      'Audits for free zone licence renewals',
      'Reporting packs for overseas parent companies',
      'Agreed procedures and special purpose reports',
      'A management letter you can act on',
      'Run as a separate team from our accounting practice',
    ],
    steps: [
      {
        number: 'Step 01',
        title: 'Planning',
        description: 'We meet in the first month of your financial year and agree the timetable and the list.',
      },
      {
        number: 'Step 02',
        title: 'Interim',
        description: 'Controls and early testing happen during the year, not after it.',
      },
      {
        number: 'Step 03',
        title: 'Fieldwork',
        description: 'Two to three weeks after year end, mostly remote, with one visit to your office.',
      },
      {
        number: 'Step 04',
        title: 'Sign off',
        description: 'A signed report and management letter, usually within eight weeks of year end.',
      },
    ],
    notes: [
      {
        number: '01',
        title: 'Independence',
        description: 'We never audit a company whose books we keep. If you need both, we introduce a firm we trust.',
      },
      {
        number: '02',
        title: 'One list',
        description: 'You get the full request list in month one. No new requests appear in week three.',
      },
      {
        number: '03',
        title: 'The letter',
        description: 'The management letter ranks findings by cost to you, not by audit standard.',
      },
    ],
    leadPersonSlug: 'hannah-okoye',
    relatedPlans: ['statutory-audit', 'due-diligence'],
    relatedQuestions: ['audit-same-books', 'audit-not-in-plan'],
    relatedDeadlines: ['uk-companies-house-2026'],
    relatedCaseStudies: ['free-zone-logistics-audit'],
    seo: {
      title: 'Audit | Vika accounting, tax and audit',
      description: 'Statutory audits for free zone and mainland companies in the UAE and UK companies, planned from month one.',
    },
  },
];

export interface AnnualMonthColumn {
  month: string;
  accounting: string;
  tax?: string;
  audit?: string;
  summary: string;
}

export const ANNUAL_SERVICE_CALENDAR: AnnualMonthColumn[] = [
  { month: 'Jan', accounting: 'Close', tax: 'VAT', audit: 'Planning', summary: 'Audit planning for the new year. UAE VAT for the quarter to 31 December is due on the 28th.' },
  { month: 'Feb', accounting: 'Close', audit: 'Fieldwork', summary: 'Audit fieldwork for last year begins. UK VAT for the quarter to 31 December was due on the 7th.' },
  { month: 'Mar', accounting: 'Close', audit: 'Sign off', summary: 'Signed audit reports and management letters go out.' },
  { month: 'Apr', accounting: 'Close', tax: 'VAT', summary: 'UAE VAT for the quarter to 31 March is due on the 28th.' },
  { month: 'May', accounting: 'Close', summary: 'UK VAT for the quarter to 31 March is due on the 7th.' },
  { month: 'Jun', accounting: 'Close', audit: 'Interim', summary: 'Interim audit visits and early testing.' },
  { month: 'Jul', accounting: 'Close', tax: 'VAT', summary: 'UAE VAT for the quarter to 30 June is due on the 28th.' },
  { month: 'Aug', accounting: 'Close', summary: 'UK VAT for the quarter to 30 June is due on the 7th.' },
  { month: 'Sep', accounting: 'Close', tax: 'CT', summary: 'UAE corporate tax returns for last year are due on the 30th, as are UK accounts at Companies House.' },
  { month: 'Oct', accounting: 'Close', tax: 'VAT', summary: 'UAE VAT for the quarter to 30 September is due on the 28th. UK corporation tax is payable on the 1st.' },
  { month: 'Nov', accounting: 'Close', summary: 'UK VAT for the quarter to 30 September is due on the 7th.' },
  { month: 'Dec', accounting: 'Close', tax: 'CT', summary: 'UK company tax returns for last year are due on the 31st.' },
];
