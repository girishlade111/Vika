# Interactive Controls Inventory

1. **Fullscreen Editorial Header Menu (`src/components/layout/Header.tsx`)**: Toggle open/close button, `Escape` key handler, scroll lock, 25px left/right padded near-black drawer (`#121211`), hover reveal preview arrows, Classic/Cinematic/Statement layout switcher, Dubai & London real-time clocks, template links.
2. **Floating Bottom Navigation Dock (`src/components/layout/Header.tsx`)**: Appears on scroll above footer intersection, contains V mark home link, Services, Studio, Insights, Menu toggle.
3. **Explore Vika Tour Drawer (`src/components/layout/ExploreVika.tsx`)**: Bottom-left toggle pill opening quick navigation across all 3 Home/Studio/Contact variants plus shared & utility pages.
4. **Pricing Switcher (`src/context/PricingContext.tsx`, `src/components/pricing/PricingCardsSection.tsx`, `src/pages/shared/PricingPage.tsx`)**: Synchronizes `AED` / `GBP` currency and `Monthly` / `Yearly` billing across retainer tiers, project cards, extras, and comparison matrix.
5. **UAE & UK Deadline Calendar (`src/components/deadlines/DeadlineCalendar.tsx`)**: Filterable tabs (`UAE calendar` / `UK calendar`) linking each statutory date to `/deadlines/:slug`.
6. **Client Quote Slider (`src/components/testimonials/QuoteSlider.tsx`)**: Prev/Next circular arrows cycling all 4 client quotations and progress dots.
7. **FAQ Accordions (`src/components/faq/FAQSection.tsx`)**: Context-filtered (`home`, `services`, `pricing`) collapsible rows with individual question detail links.
8. **Statement Practices Accordion (`src/pages/home/StatementHome.tsx`)**: Expandable practice ledger (`is-open` CSS class toggle).
9. **Classic Contact Form (`src/components/contact/ClassicContactForm.tsx`)**: Zod schema validation, inline error states, office preference radios, privacy checkbox, demonstration submit confirmation.
10. **Statement 5-Step Contact Wizard (`src/pages/contact/StatementContact.tsx`)**: Interactive step progression with live sidebar summary.
11. **Partner Booking Flow (`src/components/booking/BookingFlow.tsx`, `src/components/booking/BookingOverlay.tsx`)**: Partner selection, timezone-aware Mon-Fri date picker, slot buttons, validated intake form.
12. **Footer Newsletter & Back to Top (`src/components/layout/Footer.tsx`)**: Zod email validation + scroll-to-top trigger.
13. **Client Area Password Gate (`/401`) & Instructions Tabs (`/instructions`)**.
