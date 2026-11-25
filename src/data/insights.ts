import type { Insight } from './types';

export const INSIGHTS: Insight[] = [
  {
    id: 'ins-first-uae-ct',
    slug: 'first-uae-corporate-tax-return',
    title: 'First UAE corporate tax return: what to have ready',
    category: 'Tax',
    publicationDate: 'October 6, 2026',
    readingTime: 6,
    excerpt:
      'The first return is the hardest one. After that it is a routine. Here is the list we give every client, and why each item is on it.',
    leadParagraph:
      'The first return is the hardest one. After that it is a routine. Here is the list we give every client in the months before their first UAE corporate tax return, and why each item is on it.',
    coverImage:
      '/assets/images/insights/6ad74ed70180ecbacfafd39a_hf_20261020_105653_0814399d-5b22-4e1a-8262-78717b01a012_min.webp',
    coverAlt: 'Printed financial statements, a burgundy notebook and coffee on an oak table',
    authorSlug: 'rami-nassar',
    sections: [
      {
        heading: 'When it is due',
        paragraphs: [
          'The return, and any tax you owe, is due nine months after the end of your tax period. For a company with a 31 December year end, that means 30 September of the following year.',
        ],
        callouts: [
          '0% on taxable income up to AED 375,000',
          '9% on taxable income above AED 375,000',
          '9 months after year end to file and pay',
        ],
      },
      {
        heading: 'What to have ready',
        paragraphs: ['Tick these off as you go. We keep the same list in every client’s shared folder.'],
        bullets: [
          'Your corporate tax registration number',
          'Financial statements for the period, audited if you need an audit',
          'A trial balance and general ledger that agree to those statements',
          'A fixed asset register, with depreciation',
          'Agreements for every transaction with a related party',
          'Details of any loans and the interest paid on them',
          'Last year’s return, if you filed one',
        ],
      },
      {
        heading: 'Small Business Relief',
        paragraphs: [
          'If your revenue is AED 3 million or less, you can elect to be treated as having no taxable income for the period. The relief covers tax periods ending on or before 31 December 2026, so for a company with a calendar year, 2026 is the last year it can apply.',
        ],
      },
      {
        heading: 'When you need an audit',
        paragraphs: [
          'Audited financial statements are required if your revenue for the period is more than AED 50 million, or if your company is a Qualifying Free Zone Person. If either applies, book the audit before you book the return.',
        ],
      },
      {
        heading: 'If you are late',
        paragraphs: [
          'Filing late costs AED 500 a month for the first twelve months and AED 1,000 a month after that. Paying late carries its own monthly penalty on the tax unpaid. Both are avoidable with a calendar and a reminder a month out.',
        ],
      },
      {
        heading: 'Keep the records',
        paragraphs: [
          'Keep the records behind the return for seven years after the end of the tax period. A shared folder, organised by year, is enough.',
        ],
      },
    ],
    closingNote:
      'If you would like us to check your list before you start, send it to Rami. It usually takes us a day.',
    disclaimer:
      'General information as at October 2026. Not advice for your company: speak to us, or to your own adviser, before you act on it.',
    relatedInsights: [
      'close-the-month-in-ten-days',
      'free-zone-audits-start-in-january',
      'uk-vat-for-gulf-companies',
    ],
    relatedServices: ['tax'],
    seo: {
      title: 'First UAE corporate tax return: what to have ready | Vika Insights',
      description: 'Checklist, deadlines, Small Business Relief and audit thresholds for your first UAE corporate tax return.',
    },
  },
  {
    id: 'ins-close-ten-days',
    slug: 'close-the-month-in-ten-days',
    title: 'How we close the month in ten working days',
    category: 'Accounting',
    publicationDate: 'September 22, 2026',
    readingTime: 4,
    excerpt:
      'A closed month by the tenth is not a heroic effort. It is five habits, kept every week, so the last week of the month is quiet.',
    leadParagraph:
      'A closed month by the tenth working day is not a heroic effort. It is five habits, kept every week, so that the last week of the month is quiet.',
    coverImage:
      '/assets/images/insights/6ad74ed70180ecbacfafd39d_hf_20261020_105655_0524c85e-01bc-443b-b4b9-f24330481881_min.webp',
    coverAlt: 'A burgundy folder of month end accounts passed across a desk',
    authorSlug: 'leo-brandt',
    sections: [
      {
        heading: 'Reconcile weekly',
        paragraphs: [
          'Banks and cards are reconciled every Friday. By month end, four fifths of the work is already done.',
        ],
      },
      {
        heading: 'One cut off',
        paragraphs: [
          'Invoices received after the third working day go into the next month. Everyone knows the date, so nobody argues about it.',
        ],
      },
      {
        heading: 'A one page note',
        paragraphs: [
          'Every pack starts with a page that says what moved and why, in plain words. If the board reads one page, it is that one.',
        ],
      },
    ],
    closingNote: 'Write to Leo if your month end still runs into the third week.',
    disclaimer:
      'General information as at October 2026. Not advice for your company: speak to us, or to your own adviser, before you act on it.',
    relatedInsights: [
      'first-uae-corporate-tax-return',
      'free-zone-audits-start-in-january',
      'management-accounts-your-board-reads',
    ],
    relatedServices: ['accounting'],
    seo: {
      title: 'How we close the month in ten working days | Vika Insights',
      description: 'Weekly reconciliations, clear cutoffs and a one-page narrative note.',
    },
  },
  {
    id: 'ins-free-zone-audits',
    slug: 'free-zone-audits-start-in-january',
    title: 'Free zone audits: start in January, not in March',
    category: 'Audit',
    publicationDate: 'September 8, 2026',
    readingTime: 5,
    excerpt:
      'Most free zone licences need audited accounts to renew. Most audit stress comes from starting after year end. Both are fixable in January.',
    leadParagraph:
      'Most free zone licences need audited accounts to renew. Most audit stress comes from starting after year end. Both are fixable in January.',
    coverImage:
      '/assets/images/insights/6ad74ed60180ecbacfafd389_hf_20261020_105655_893b4d04-ae7b-4341-87ad-9241f1b99c41_min.webp',
    coverAlt: 'Archive boxes and burgundy ledgers on a black steel shelf',
    authorSlug: 'hannah-okoye',
    sections: [
      {
        heading: 'Agree the list early',
        paragraphs: [
          'We send the full request list in the first month of your year. If an item will be hard to produce, we find out in January, not in March.',
        ],
      },
      {
        heading: 'Test during the year',
        paragraphs: [
          'Controls and early testing happen in an interim visit. Fieldwork after year end then takes two to three weeks, not two months.',
        ],
      },
    ],
    closingNote: 'Book a January planning call with Hannah if your licence renewal depends on an audit.',
    disclaimer:
      'General information as at October 2026. Not advice for your company: speak to us, or to your own adviser, before you act on it.',
    relatedInsights: [
      'first-uae-corporate-tax-return',
      'close-the-month-in-ten-days',
      'uk-vat-for-gulf-companies',
    ],
    relatedServices: ['audit'],
    seo: {
      title: 'Free zone audits: start in January, not in March | Vika Insights',
      description: 'Why early audit planning prevents March licence renewal scrambles.',
    },
  },
  {
    id: 'ins-uk-vat-gulf',
    slug: 'uk-vat-for-gulf-companies',
    title: 'UK VAT for Gulf companies selling into Britain',
    category: 'Tax',
    publicationDate: 'August 19, 2026',
    readingTime: 5,
    excerpt:
      'Selling to UK customers from the Gulf can mean registering for UK VAT from the first sale. What triggers it, and what to do first.',
    leadParagraph:
      'Selling to UK customers from the Gulf can mean registering for UK VAT from your first sale. Overseas businesses do not get the registration threshold that UK businesses do.',
    coverImage: '/assets/images/studio/6ad74e5e105689040c7bbf22_vika-dubai-office.webp',
    coverAlt: 'A low office building in a Gulf city at golden hour',
    authorSlug: 'maya-iyer',
    sections: [
      {
        heading: 'What triggers it',
        paragraphs: [
          'Supplying goods or services that are treated as made in the UK. Digital services to consumers and goods held in UK warehouses are the two we see most.',
        ],
      },
      {
        heading: 'What to do first',
        paragraphs: [
          'Map what you sell, to whom and from where. That one page decides whether you register, and saves most of the cost of getting it wrong.',
        ],
      },
    ],
    closingNote: 'Send Maya a summary of your UK customer flows before launching.',
    disclaimer:
      'General information as at October 2026. Not advice for your company: speak to us, or to your own adviser, before you act on it.',
    relatedInsights: [
      'first-uae-corporate-tax-return',
      'close-the-month-in-ten-days',
      'free-zone-audits-start-in-january',
    ],
    relatedServices: ['tax'],
    seo: {
      title: 'UK VAT for Gulf companies selling into Britain | Vika Insights',
      description: 'Non-established taxable person rules, digital supplies and UK warehouse VAT triggers.',
    },
  },
  {
    id: 'ins-ten-years-vika',
    slug: 'ten-years-of-vika',
    title: 'Ten years of Vika, and what we would change',
    category: 'Studio',
    publicationDate: 'August 1, 2026',
    readingTime: 3,
    excerpt:
      'We opened with four clients and one rule. Ten years on, the rule is the same. A few other things are not.',
    leadParagraph:
      'We opened with four clients and one rule: close by the tenth. Ten years on, the rule is the same. A few other things are not.',
    coverImage: '/assets/images/studio/6ad74e66105689040c7bc939_vika-london-reception.webp',
    coverAlt: 'Quiet London office reception with burgundy armchair and soft daylight',
    authorSlug: 'sara-lindqvist',
    sections: [
      {
        heading: 'What we kept',
        paragraphs: [
          'Fixed fees, named accountants and partners who answer their phones. Every one of those costs us something. All of them are why clients stay.',
        ],
      },
      {
        heading: 'What we would change',
        paragraphs: [
          'We would have opened the audit practice as a separate team from the start. Independence is easier to design than to retrofit.',
        ],
      },
    ],
    closingNote: 'Thank you to the 340 companies who keep us honest.',
    disclaimer:
      'General information as at October 2026. Not advice for your company: speak to us, or to your own adviser, before you act on it.',
    relatedInsights: [
      'first-uae-corporate-tax-return',
      'close-the-month-in-ten-days',
      'free-zone-audits-start-in-january',
    ],
    relatedServices: ['accounting', 'tax', 'audit'],
    seo: {
      title: 'Ten years of Vika, and what we would change | Vika Insights',
      description: 'Reflections on ten years of building a partner-led accounting studio across Dubai and London.',
    },
  },
  {
    id: 'ins-board-accounts',
    slug: 'management-accounts-your-board-reads',
    title: 'Management accounts your board will actually read',
    category: 'Accounting',
    publicationDate: 'July 15, 2026',
    readingTime: 4,
    excerpt:
      'Forty pages of reports, one page of reading. How we design board packs around the page people actually open.',
    leadParagraph:
      'Forty pages of reports, one page of reading. We design every board pack around the page people actually open.',
    coverImage:
      '/assets/images/shared/6ad74ed60180ecbacfafd386_hf_20261020_105654_22a70122-d335-4f73-b63b-b89b24f6108d_min.webp',
    coverAlt: 'Bound management accounts pack beside a coffee cup and fountain pen',
    authorSlug: 'sara-lindqvist',
    sections: [
      {
        heading: 'Lead with the note',
        paragraphs: [
          'What moved, why it moved and what we would watch next month. Three short paragraphs, before any table.',
        ],
      },
      {
        heading: 'Fewer, steadier numbers',
        paragraphs: [
          'Pick eight measures and keep them for a year. A number only means something when you can compare it with last month.',
        ],
      },
    ],
    closingNote: 'Ask Sara for a sample one-page management note.',
    disclaimer:
      'General information as at October 2026. Not advice for your company: speak to us, or to your own adviser, before you act on it.',
    relatedInsights: [
      'first-uae-corporate-tax-return',
      'close-the-month-in-ten-days',
      'free-zone-audits-start-in-january',
    ],
    relatedServices: ['accounting'],
    seo: {
      title: 'Management accounts your board will actually read | Vika Insights',
      description: 'Why leading with a one-page narrative note beats forty pages of unannotated tables.',
    },
  },
];
