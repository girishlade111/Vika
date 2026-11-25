# Functional & Route Test Report

Verified via Vitest (`npm test`) and Playwright end-to-end suite (`scripts/verify-all.ts`).

## Unit & Referential Integrity Tests (`tests/unit/vika-domain.test.ts`)
- **Result**: **8/8 tests passed**.
- Covered: AED/GBP & Monthly/Yearly retainer math (10-month yearly discount), fixed-fee project pricing, `Asia/Dubai` (`08:30-18:00`) & `Europe/London` (`09:00-17:30`) open/closed timezone calculations including weekends, Mon-Fri booking weekday generator, referential integrity across all 7 CMS collections (3 services, 6 people, 6 plans, 7 deadlines, 6 insights, 4 case studies, 12 questions), and on-disk asset existence.

## End-to-End Route & Interactive Verification (`scripts/verify-all.ts`)
- **Routes Checked**: **66/66 passed** (`0` console errors, `0` uncaught page errors, `0` broken images, `0px` horizontal overflow, `1` `<h1>` per page).
- **Interactive Controls Tested (`9/9` passed)**:
  1. `menuOpens`: Fullscreen editorial drawer opens from `Menu` button — `true`
  2. `menuClosesOnEscape`: `Escape` closes menu & restores focus — `true`
  3. `pricingCurrencyAndBillingSwitch`: `AED 2,500` -> `£550` -> `£5,500` live updates — `true`
  4. `calendarJurisdictionToggle`: UAE -> UK tab switches deadlines — `true`
  5. `quoteSliderNext`: Next circular arrow advances quotation — `true`
  6. `classicContactValidationAndSubmit`: Empty validation error & local submission state — `true`
  7. `statementWizardComplete`: 5-step intake wizard validation & submission — `true`
  8. `bookingFlowConfirm`: Partner switch (`Rami Nassar`), details, & confirmation — `true`
  9. `exploreVikaDrawer`: Floating tour drawer opens — `true`
- **Responsive Overflow Matrix**: **42/42 passed** (`0px` overflow across `1920`, `1440`, `1024`, `768`, `390`, `320`).
