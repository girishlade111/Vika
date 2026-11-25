import type { Testimonial } from './types';

export const CLIENT_MARKS = [
  { name: 'Halcyon Pay', variant: 'is-sans' },
  { name: 'NORDHAUS', variant: 'is-caps' },
  { name: 'Mira Foods', variant: 'is-italic' },
  { name: 'Fernhill Capital', variant: 'is-light' },
  { name: 'TALLWATER', variant: 'is-caps' },
  { name: 'Seasons Group', variant: 'is-sans' },
  { name: 'Quill and Co', variant: 'is-italic' },
  { name: 'Kestrel Freight', variant: 'is-mono' },
] as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'quote-1',
    quote:
      '“We changed accountants three times in four years. Vika is the first firm our investors stopped asking questions about.”',
    author: 'Nadia Haddad',
    role: 'Chief Financial Officer, Halcyon Pay',
    company: 'Halcyon Pay',
    markVariant: 'is-sans',
    clientSince: '2021',
    scope: 'Accounting, payroll and tax',
  },
  {
    id: 'quote-2',
    quote:
      '“Our VAT group covers three companies in two free zones. In four years it has never once been late.”',
    author: 'Omar Farouk',
    role: 'Founder, Mira Foods',
    company: 'Mira Foods',
    markVariant: 'is-italic',
    clientSince: '2022',
    scope: 'VAT group and corporate tax',
  },
  {
    id: 'quote-3',
    quote:
      '“The audit used to take over our whole March. Now it is two weeks of fieldwork and a letter we actually read.”',
    author: 'James Whitlock',
    role: 'Finance Director, Nordhaus',
    company: 'NORDHAUS',
    markVariant: 'is-caps',
    clientSince: '2024',
    scope: 'Statutory audit',
  },
  {
    id: 'quote-4',
    quote:
      '“They told us what corporate tax would cost us a year before it applied. That year was worth more than the fee.”',
    author: 'Leila Mansour',
    role: 'Chief Operating Officer, Seasons Group',
    company: 'Seasons Group',
    markVariant: 'is-sans',
    clientSince: '2022',
    scope: 'Corporate tax and group reporting',
  },
];
