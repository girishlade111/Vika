# Configuration Guide

## Environment Variables

Copy `.env.example` to `.env` to configure firm metadata or optional external form webhooks:

| Variable | Purpose | Default |
|---|---|---|
| `VITE_CONTACT_ENDPOINT` | Optional POST JSON webhook for Classic & Statement contact forms | `''` (demo mode) |
| `VITE_NEWSLETTER_ENDPOINT` | Optional POST JSON webhook for Footer newsletter signups | `''` (demo mode) |
| `VITE_BOOKING_ENDPOINT` | Optional POST JSON webhook for Partner call bookings | `''` (demo mode) |
| `VITE_ENABLE_EXPLORE_VIKA` | Set `'false'` to hide the floating Explore Vika tour widget | `'true'` |
| `VITE_DEMO_MODE` | Indicates local demonstration mode with sample firm/tax data | `'true'` |

When endpoints are omitted or left blank, forms validate inputs client-side with Zod and display a clearly labeled demonstration confirmation state without submitting data to any external server.

## Editing Brand & Design Tokens

All visual tokens live in `src/styles/tokens.css`:
- Paper surface: `--_primitives---neutral--100` (`#f3f2ee`)
- Secondary stone surface: `--_primitives---neutral--200` (`#e9e7e1`)
- Card surface: `--_primitives---neutral--50` (`#fbfaf8`)
- Primary ink: `--_primitives---neutral--900` (`#121211`)
- Primary burgundy accent: `--_primitives---burgundy--700` (`#4c2218`)
- Dark-section rose accent: `--_primitives---burgundy--300` (`#d9a493`)

## Editing Content & CMS Collections

Every CMS item is stored in `src/data/`:
- `src/data/services.ts` — Accounting, Tax, and Audit practice lines
- `src/data/plans.ts` — Retainer plans (Essential, Growth, Group), Projects (Tax registration, Statutory audit, Due diligence), Comparison rows, and Extras
- `src/data/deadlines.ts` — UAE FTA and UK HMRC / Companies House deadlines
- `src/data/people.ts` — Dubai and London partners and managers
- `src/data/insights.ts` — Long-form articles with reading times and sections
- `src/data/caseStudies.ts` — Client outcomes, challenges, deliverables, and metrics
- `src/data/questions.ts` — Contextual FAQs (`home`, `services`, `pricing`)
- `src/data/offices.ts` — Dubai (`Asia/Dubai`) and London (`Europe/London`) hours, phones, and addresses
- `src/data/booking.ts` — Partner availability windows and weekday slot generation
