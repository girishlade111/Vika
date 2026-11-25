import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'q-software',
    slug: 'which-accounting-software',
    question: 'Which accounting software do you work in?',
    answer:
      'Xero, QuickBooks Online and Zoho Books. If you use something else, we will either work in it or move you, and we will tell you which costs less.',
    contexts: ['home', 'services'],
    relatedServices: ['accounting'],
    relatedPlans: ['essential', 'growth', 'group'],
    seo: {
      title: 'Which accounting software do you work in? | Vika FAQ',
      description: 'Xero, QuickBooks Online and Zoho Books supported by Vika.',
    },
  },
  {
    id: 'q-mid-year',
    slug: 'take-over-halfway-through-year',
    question: 'Can you take over halfway through the year?',
    answer:
      'Yes. Most clients join mid year. We rebuild the months before we started, so the year closes on one consistent set of books.',
    contexts: ['home', 'services', 'pricing'],
    relatedServices: ['accounting'],
    relatedPlans: ['essential', 'growth'],
    seo: {
      title: 'Can you take over halfway through the year? | Vika FAQ',
      description: 'Mid-year onboarding and ledger catch-up process at Vika.',
    },
  },
  {
    id: 'q-audit-independence',
    slug: 'audit-companies-whose-books-you-keep',
    question: 'Do you audit companies whose books you keep?',
    answer:
      'No. Our audit team never audits a company that our accounting team works for. If you need both, we will introduce you to an audit firm we trust.',
    contexts: ['home', 'services'],
    relatedServices: ['audit', 'accounting'],
    relatedPlans: ['statutory-audit'],
    seo: {
      title: 'Do you audit companies whose books you keep? | Vika FAQ',
      description: 'Audit independence policy at Vika.',
    },
  },
  {
    id: 'q-who-works-with-me',
    slug: 'who-will-i-actually-work-with',
    question: 'Who will I actually work with?',
    answer:
      'A named accountant for the monthly work and a partner who reviews everything that leaves the building. You will have both of their numbers.',
    contexts: ['home', 'services'],
    relatedServices: ['accounting', 'tax', 'audit'],
    relatedPlans: ['essential', 'growth', 'group'],
    seo: {
      title: 'Who will I actually work with? | Vika FAQ',
      description: 'Named accountant and partner review structure at Vika.',
    },
  },
  {
    id: 'q-how-fees-work',
    slug: 'how-fees-work',
    question: 'How do your fees work?',
    answer:
      'Monthly work is a fixed fee agreed up front. Projects such as audits and registrations are quoted before we start. We do not bill by the hour.',
    contexts: ['home', 'services', 'pricing'],
    relatedServices: ['accounting', 'tax', 'audit'],
    relatedPlans: ['essential', 'growth', 'group', 'tax-registration', 'statutory-audit', 'due-diligence'],
    seo: {
      title: 'How do your fees work? | Vika FAQ',
      description: 'Fixed monthly retainers and upfront project quotes with no hourly billing.',
    },
  },
  {
    id: 'q-outside-uae-uk',
    slug: 'work-outside-uae-and-uk',
    question: 'Do you work outside the UAE and the UK?',
    answer:
      'We look after group companies in Saudi Arabia, Bahrain and the EU through partner firms, coordinated by one team at Vika.',
    contexts: ['home', 'services'],
    relatedServices: ['tax', 'accounting'],
    relatedPlans: ['group'],
    seo: {
      title: 'Do you work outside the UAE and the UK? | Vika FAQ',
      description: 'Cross-border coordination across Saudi Arabia, Bahrain and the EU.',
    },
  },
  {
    id: 'q-plus-vat',
    slug: 'are-fees-plus-vat',
    question: 'Are the fees on this page plus VAT?',
    answer: 'Yes. Every fee here is shown before VAT, which is 5% in the UAE and 20% in the UK.',
    contexts: ['pricing'],
    relatedServices: ['tax'],
    relatedPlans: ['essential', 'growth', 'group'],
    seo: {
      title: 'Are the fees plus VAT? | Vika FAQ',
      description: 'VAT rates in the UAE (5%) and UK (20%) on Vika fees.',
    },
  },
  {
    id: 'q-not-a-quote',
    slug: 'are-prices-a-quote',
    question: 'Are the prices on this page a quote?',
    answer:
      'Not yet. They are our standard fees for the plans, projects and extras most clients need. A partner confirms your fee in writing after a 30 minute call.',
    contexts: ['pricing'],
    relatedServices: ['accounting', 'tax', 'audit'],
    relatedPlans: ['essential', 'growth', 'group'],
    seo: {
      title: 'Are the prices on this page a quote? | Vika FAQ',
      description: 'Standard fee schedules and written partner proposals.',
    },
  },
  {
    id: 'q-grow-during-year',
    slug: 'what-happens-if-we-grow',
    question: 'What happens if we grow during the year?',
    answer:
      'The extras on this page are priced now, so a second company or a bigger payroll never comes as a surprise. If a bigger plan fits better, we agree it with you before anything changes.',
    contexts: ['pricing'],
    relatedServices: ['accounting'],
    relatedPlans: ['essential', 'growth', 'group'],
    seo: {
      title: 'What happens if we grow during the year? | Vika FAQ',
      description: 'Transparent add-on pricing and annual plan reviews.',
    },
  },
  {
    id: 'q-pay-yearly',
    slug: 'pay-for-the-year-up-front',
    question: 'Can we pay for the year up front?',
    answer:
      'Yes. Pay yearly and you pay ten months of fees for twelve months of work. The fee is still reviewed with you once a year.',
    contexts: ['pricing'],
    relatedServices: ['accounting'],
    relatedPlans: ['essential', 'growth', 'group'],
    seo: {
      title: 'Can we pay for the year up front? | Vika FAQ',
      description: 'Annual billing with two months free across monthly plans.',
    },
  },
  {
    id: 'q-notice-period',
    slug: 'what-is-the-notice-period',
    question: 'What is the notice period?',
    answer:
      'Three months on Essential and Growth, six months on Group. Projects are paid half at the start and half on delivery.',
    contexts: ['pricing'],
    relatedServices: ['accounting'],
    relatedPlans: ['essential', 'growth', 'group'],
    seo: {
      title: 'What is the notice period? | Vika FAQ',
      description: 'Contract notice periods and project milestone billing.',
    },
  },
  {
    id: 'q-audit-not-in-plan',
    slug: 'why-is-audit-not-part-of-plan',
    question: 'Why is the audit not part of my plan?',
    answer:
      'Independence rules. We never audit a company whose books we keep. If you need both, we introduce you to an audit firm we trust.',
    contexts: ['pricing'],
    relatedServices: ['audit'],
    relatedPlans: ['statutory-audit'],
    seo: {
      title: 'Why is the audit not part of my plan? | Vika FAQ',
      description: 'Regulatory separation between bookkeeping and statutory audit.',
    },
  },
];
