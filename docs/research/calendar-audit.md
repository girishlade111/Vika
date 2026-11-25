# Tax & Statutory Calendar Audit

Verified against `src/data/deadlines.ts` and `deadlines__uk-ct600-2026.html`.

## Jurisdictions & Schedule

- **UAE (`4` entries)**:
  1. `uae-vat-q3-2026` — VAT return Q3 2026 (Due October 28, 2026, FTA)
  2. `uae-vat-q4-2026` — VAT return Q4 2026 (Due January 28, 2027, FTA)
  3. `uae-vat-q1-2027` — VAT return Q1 2027 (Due April 28, 2027, FTA)
  4. `uae-corporate-tax-2026` — Corporate tax return 2026 (Due September 30, 2027, FTA)
- **UK (`3` entries)**:
  1. `uk-vat-q3-2026` — UK MTD VAT return Q3 2026 (Due November 7, 2026, HMRC)
  2. `uk-companies-house-2026` — Annual accounts 2026 (Due September 30, 2027, Companies House)
  3. `uk-ct600-2026` — Company Tax Return CT600 2026 (Due December 31, 2027, HMRC; tax payable October 1, 2027)

Each calendar entry renders in the interactive UAE/UK switcher (`DeadlineCalendar.tsx`) and links to a full `/deadlines/:slug` page with records-due cutoff dates, new regulatory notes, penalty consequences, client checklists, and official GOV.UK / FTA citations.
