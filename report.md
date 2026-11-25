VIKA WEBSITE RECREATION
FINAL IMPLEMENTATION REPORT

1. PROJECT OVERVIEW

Framework: React 19 + TypeScript 5.7 + Vite 6
Main libraries: react-router-dom (7.5), gsap (3.15), zod (3.24), vitest (3.1), playwright (1.59), sharp (0.33), pixelmatch (7.1), pngjs (7.0)
Implementation status: Completed (all 3 layout families, shared pages, utility pages, and 7 CMS detail routes built and verified)
Development server: Configured via `npm run dev` (Vite)
Production build: Passed (`npm run build`: `tsc -b && vite build`, 120 modules transformed in 3.10s; `dist/index.html` 1.13 kB, CSS 402.89 kB / 45.93 kB gzip, JS 768.18 kB / 210.66 kB gzip)
Production preview: Verified locally via `vite preview` on port 4173 during end-to-end Playwright verification

2. REFERENCE RESEARCH

Reference URLs inspected: `https://vika-template.webflow.io/` (44 crawled routes), official studio `https://www.margined.co/`
Static routes discovered: 22 (`/`, `/studio`, `/contact`, `/cinematic/home-cinematic`, `/cinematic/studio-cinematic`, `/cinematic/contact-cinematic`, `/statement/home-statement`, `/statement/studio-statement`, `/statement/contact-statement`, `/services`, `/pricing`, `/insights`, `/team`, `/case-studies`, `/privacy-policy`, `/overview`, `/style-guide`, `/instructions`, `/licenses`, `/changelog`, `/401`, `/404`)
Dynamic routes discovered: 44 detail routes across 7 CMS collections (`/services/:slug` x3, `/insights/:slug` x6, `/people/:slug` x6, `/plans/:slug` x6, `/deadlines/:slug` x7, `/case-studies/:slug` x4, `/questions/:slug` x12), plus 6 layout shorthand aliases (`/home-cinematic`, `/studio-cinematic`, `/contact-cinematic`, `/home-statement`, `/studio-statement`, `/contact-statement`)
Screenshots captured: Full reference archive under `docs/reference/` (`classic/`, `cinematic/`, `statement/`, `shared/`, `interactions/`) plus reconstructed 1440px full-page captures in `docs/testing/screenshots/`
Style guide inspected: Yes (`docs/research/raw-html/style-guide.html`, `docs/research/reference-stylesheet.css`, `docs/research/reference-root-vars.txt`, `docs/research/computed-style-audit.json`)
Verified interactions: Fullscreen navigation drawer (`Menu`/`Close`/`Escape`), floating navigation pill, `Explore Vika` tour drawer, Classic/Cinematic/Statement layout switcher, AED/GBP + Monthly/Yearly pricing toggle, UAE/UK deadline calendar tabs, client quote slider arrows, FAQ accordions, Statement practices ledger toggle, validated Classic & 5-step Statement contact forms, timezone-aware Partner booking flow, footer newsletter form, client-area password form (`/401`), instructions tabs (`/instructions`)
Unavailable reference information: Official external Figma design file (requires Webflow purchase order number per `/overview`); private Webflow Designer project backend collections

3. LAYOUT FAMILIES

Classic homepage: Implemented in `src/pages/home/ClassicHome.tsx` at `/` (warm paper `#f3f2ee`, editorial typography, KPI figures, practices rows, tax deadline calendar, full-width image band, 4-step workflow, tabbed pricing, quote slider, case studies, insights, FAQ, Sara close card)
Classic Studio: Implemented in `src/pages/studio/ClassicStudio.tsx` at `/studio`
Classic Contact: Implemented in `src/pages/contact/ClassicContact.tsx` at `/contact` (classic 2-column form + office details)

Cinematic homepage: Implemented in `src/pages/home/CinematicHome.tsx` at `/cinematic/home-cinematic` (background MP4/WebM meeting loop, dark-mode bands `#121211`, practice showcase, dark deadline band, multi-column quotes, featured insight lead, partner close banner)
Cinematic Studio: Implemented in `src/pages/studio/CinematicStudio.tsx` at `/cinematic/studio-cinematic`
Cinematic Contact: Implemented in `src/pages/contact/CinematicContact.tsx` at `/cinematic/contact-cinematic` (interactive timezone-aware Partner Booking flow)

Statement homepage: Implemented in `src/pages/home/StatementHome.tsx` at `/statement/home-statement` (oversized display type, ruled ledger metrics, expandable interactive practices details, inline retainer ledger, vertical case study metrics, insight rows)
Statement Studio: Implemented in `src/pages/studio/StatementStudio.tsx` at `/statement/studio-statement` (growth chart + live analog clocks)
Statement Contact: Implemented in `src/pages/contact/StatementContact.tsx` at `/statement/contact-statement` (5-step guided intake wizard with live summary)

Shared components: `SiteLayout`, `Header`, `Footer`, `ExploreVika`, `VikaButton`, `OfficeClock`, `DeadlineCalendar`, `QuoteSlider`, `FAQSection`, `PartnerCloseCard`, `PracticeCTA`, `PricingCardsSection`, `BookingFlow`, `BookingOverlay`, `ClassicContactForm`
Layout-specific components: `StatementHome` expandable practice details & ledger pricing; `StatementStudio` bar chart & office clocks; `StatementContact` 5-step wizard; `CinematicHome` full-bleed background video hero & dark sections; `CinematicContact` multi-partner scheduler
Remaining layout differences: Video background frames and live wall-clock positions (`Asia/Dubai`, `Europe/London`) differ dynamically from static reference captures (`80.87%` to `98.32%` pixelmatch across top 3200px @ 1440px)

4. DESIGN SYSTEM

Verified font families: `Familjen Grotesk` (`400`, `500`, `600`, `700`) and `DM Mono` (`300`, `400`, `500`), SIL OFL, loaded locally from `/assets/fonts/` (5 font faces verified `loaded` in Chromium)
Fallback fonts: `Arial, sans-serif` (primary), `Verdana, sans-serif` (mono label)
Primary background: `#f3f2ee` (`rgb(243, 242, 238)`, `--_primitives---neutral--100`)
Primary text: `#121211` (`rgb(18, 18, 17)`, `--_primitives---neutral--900`); secondary text `#5f5e58`
Muted heading color: `#6e6d67` (`--_primitives---neutral--500` / `.text-color-tertiary`)
Brown accent: `#4c2218` (`--_primitives---burgundy--700`), light accent `#d9a493` (`--_primitives---burgundy--300`)
Footer background: `#0f0f0e` (`--_primitives---neutral--950`)
Typography scale: Computed at `1440x900` — body `16.5px`, hero display `h1` `130px` (`119.6px` line-height), `.text-style-label` `11.5px` uppercase (`DM Mono`), footer giant `Vika` wordmark `29vw` (`~417.6px`)
Container widths: `padding-global` (`2.5rem` / `40px` desktop horizontal gutters), `grid-global` (`1360px` max grid at 1440px viewport)
Grid system: 12-column CSS grid (`.grid-global`) collapsing smoothly at tablet/mobile breakpoints
Spacing scale: Tokenized Client-First scale in `src/styles/tokens.css` (`--_layout---space-scale--*`)
Border-radius scale: Pill (`999px` / `100vw`) for buttons/nav dock/radios/toggles, `0.75rem` to `1rem` (`16px`) cards & footer container
Responsive breakpoints: Desktop (`>= 992px`), Tablet (`<= 991px`), Landscape Mobile (`<= 767px`), Portrait Mobile (`<= 479px`), verified down to `320x700`

5. ASSET DISCOVERY

Total asset references: 156 URL-to-local mappings cataloged in `docs/research/url-to-local.json`
Unique image assets: Downloaded and SHA-256 deduplicated in `public/assets/images/` (`hero/`, `studio/`, `services/`, `people/`, `insights/`, `case-studies/`, `shared/`)
Video assets: 2 MP4 + 2 WebM video loops + 2 poster JPGs in `public/assets/videos/shared/` and `public/assets/images/shared/`
SVG assets: 6 local SVG brand/UI files (`vika-wordmark.svg`, `vika-wordmark-light.svg`, `vika-check.svg`, `Play-24.svg`, `Pause.svg`, `custom-checkbox-checkmark.589d534424.svg`) plus generated `public/assets/brand/vika-favicon.svg`
Font assets: 7 local `.woff` files in `public/assets/fonts/` (`Familjen Grotesk` + `DM Mono`)
Animation assets: Powered natively by `gsap` + `ScrollTrigger` (no external Lottie/JSON required)
Duplicate assets: Deduplicated via SHA-256 hash into 148 unique local files (`docs/research/asset-manifest.json`)
Responsive variants: Downloaded crisp full-resolution `.webp` sources (plus `-p-500/-800/-1080` variants archived locally)

6. ASSET ACQUISITION

Authorized original assets acquired: 148 unique files from public Vika template CDN URLs saved locally under `public/assets/`
Original images reused: Yes — all editorial photography, office scenes, team portraits, and UI graphics served locally from `public/assets/` (0 runtime requests to external CDNs)
Original videos reused: Yes — Cinematic meeting loop and Overview laptop loop served locally from `/assets/videos/shared/`
Generated replacement images: 1 minimal geometric vector favicon created at `public/assets/brand/vika-favicon.svg`
Generated replacement videos: None required (originals acquired and working locally)
Reconstructed vector assets: `public/assets/brand/vika-favicon.svg`; button arrows, hairline dividers, progress bars, and clock hands rendered via CSS/SVG
Restricted assets: None (all template media open for template showcase/reconstruction per live `/licenses`; sample firm branding/imagery documented as non-transferable for commercial rebranding without replacing sample assets per `/licenses`)
Unavailable assets: None for public rendered pages
Asset directory: `public/assets/`
License documentation: `docs/research/asset-licenses.md` and live interactive `/licenses` route

7. CMS COLLECTIONS

Services: 3 items (`accounting`, `tax`, `audit`) in `src/data/services.ts`
Insights: 6 articles in `src/data/insights.ts`
People: 6 profiles (3 partners, 3 managers across Dubai & London) in `src/data/people.ts`
Plans: 6 fee plans (3 retainers + 3 fixed projects) + comparison matrix + extras in `src/data/plans.ts`
Questions: 12 FAQ items (`home`, `services`, `pricing` contexts) in `src/data/questions.ts`
Deadlines: 7 tax & statutory deadlines (`4` UAE, `3` UK) in `src/data/deadlines.ts`
Case Studies: 4 client engagement studies with metrics & quotations in `src/data/caseStudies.ts`

Collection relationships: Verified bi-directional links in `src/data/cmsRelations.ts` (`getServiceBySlug`, `getPersonBySlug`, `getPlanBySlug`, `getDeadlineBySlug`, `getInsightBySlug`, `getCaseStudyBySlug`, `getQuestionBySlug`, `getInsightsByAuthor`, `getCaseStudiesByPerson`) validated with zero orphans in Vitest
Implemented detail routes: `/services/:slug`, `/insights/:slug`, `/people/:slug`, `/plans/:slug`, `/deadlines/:slug`, `/case-studies/:slug`, `/questions/:slug`
Missing content: None across all 7 collections; all figures/tax dates retain explicit sample/general-guidance disclaimers

8. NAVIGATION

Header: Fixed editorial top bar displaying Vika wordmark, studio tagline, live Dubai office open/closed status dot, and Menu trigger (`src/components/layout/Header.tsx`)
Fullscreen menu: Near-black (`#121211`) dialog drawer with GSAP stagger text reveal, hover arrows, `Escape` key handler, scroll lock, layout switcher, live office clocks, mail link, and utility links
Office clocks: `OfficeClock.tsx` computing live analog hour/minute/second hand rotation + 24h digital readout via `Intl.DateTimeFormat` for `Asia/Dubai` (`08:30-18:00` Mon-Fri) and `Europe/London` (`09:00-17:30` Mon-Fri)
Floating navigation: Scroll-activated bottom pill dock (`V`, `Services`, `Studio`, `Insights`, `Menu`) appearing past `420px` scroll when menu is closed
Explore Vika: Floating bottom-left tour widget (`ExploreVika.tsx`) linking all 3 Home/Studio/Contact variants plus shared & utility pages (`VITE_ENABLE_EXPLORE_VIKA`)
Layout switching: Context-aware route switcher (`LayoutContext.tsx`) preserving Home/Studio/Contact perspective when switching between Classic, Cinematic, and Statement
Mobile navigation: Full-viewport responsive drawer and adaptive mobile pill bar verified at `390x844` and `320x700` with `0px` horizontal overflow

9. PRICING ENGINE

AED monthly: Essential AED 2,500 | Growth AED 6,000 | Group AED 12,000 (plus 5% VAT)
AED yearly: Essential AED 25,000 | Growth AED 60,000 | Group AED 120,000 (10 months for 12)
GBP monthly: Essential GBP 550 | Growth GBP 1,300 | Group GBP 2,650 (plus 20% VAT)
GBP yearly: Essential GBP 5,500 | Growth GBP 13,000 | Group GBP 26,500 (10 months for 12)
Fixed-fee projects: Tax registration AED 3,000 / GBP 650 | Statutory audit AED 18,000 / GBP 3,950 | Due diligence AED 25,000 / GBP 5,500
Comparison table: Dynamic plan-by-plan table synced with active currency and billing mode (`PricingPage.tsx`)
Additional fees: Extra entities, payroll per head, additional transactions, Arabic audit translation priced dynamically across AED/GBP
Verified pricing values: 100% matched to live Vika reference pricing page & plan detail templates (`docs/research/pricing-matrix.json`)
Unverified pricing values: None (sample template schedules clearly disclosed as non-binding estimates prior to scoping call)

10. DEADLINE CALENDAR

UAE calendar: Q3 2026 VAT (Oct 28, 2026), Q4 2026 VAT (Jan 28, 2027), Q1 2027 VAT (Apr 28, 2027), 2026 Corporate Tax (Sep 30, 2027)
UK calendar: Q3 2026 VAT (Nov 7, 2026), Annual Accounts 2026 Companies House (Sep 30, 2027), 2026 CT600 (Dec 31, 2027; payment Oct 1, 2027)
Deadline details: Individual `/deadlines/:slug` pages with authority notice (`FTA`, `HMRC`, `Companies House`), records cutoff, legislative notes, client checklist, late penalty breakdown, and official guidance links
Date logic: Jurisdiction filter tabs (`UAE` / `UK`) with featured next deadline card and sorted deadline list
Official source configuration: External citations to `https://tax.gov.ae/` and `https://www.gov.uk/`
Demonstration versus production data: Marked clearly across UI as general calendar-quarter 31 December year-end illustration

11. BOOKING SYSTEM

Booking interface: Embedded scheduler on `/cinematic/contact-cinematic` plus modal `BookingOverlay.tsx` accessible from any CTA button via `BookingContext`
Partner selection: Sara Lindqvist (Dubai), Rami Nassar (Dubai), Hannah Okoye (London)
Date selection: Next 10 office weekdays (Mon-Fri) generated dynamically in each partner's office timezone (`getUpcomingWeekdays`)
Time selection: Filtered 30-minute partner time windows (`09:00-18:00` Dubai / `09:00-17:30` London)
Timezone handling: Computes live partner local time and weekday list using `Asia/Dubai` and `Europe/London` IANA timezones
Validation: Zod schema validation (`name`, valid `email`, selected `topics`, required `consent` checkbox)
Backend integration: Optional `VITE_BOOKING_ENDPOINT` POST JSON webhook; runs in transparent local demonstration mode (`DEMO-...` reference ID) when blank
Confirmation behavior: Displays booked partner, office timezone, chosen date/time slot, and clear demonstration status without contacting live servers
Remaining requirements: Supply a live `VITE_BOOKING_ENDPOINT` (e.g., Calendly/Cal.com/CRM API) in `.env` for production calendar invites

12. ANIMATIONS

GSAP implementation: Centralized in `src/animations/gsapSetup.ts` (`gsap` + `ScrollTrigger` registered once, cleaned up via `gsap.context()`)
Preloader: Route scroll restoration + non-blocking progressive visual settles
Text reveals: Editorial line reveals, staggered menu link reveals (`yPercent: 105 -> 0`), hover sliding label swaps on `VikaButton`
Image reveals: Scroll-triggered card and architectural photography framing (`CinematicStudio`, `ClassicHome`, `ClassicStudio`)
Scroll scenes: `animateSectionReveals` (section heads, `.growth_fill` bars) and `animateCounters` (keeps real numbers visible before viewport entry, animates `0 -> target` smoothly via `ScrollTrigger.create` `onEnter`)
Menu animation: GSAP stagger reveal on fullscreen menu items & side column
Navigation dock: Scroll-threshold pill transition (>420px scroll)
Layout transitions: React Router view switches across Classic, Cinematic, and Statement paths with top scroll / hash alignment
Pricing transitions: Instant synchronized reactive state transitions across currency, interval, cards, and comparison rows
Booking transitions: Dynamic partner availability recalculation and step confirmation states
Smooth scrolling: Hash-aware anchor scrolling in `App.tsx` and footer `Back to top` button
Reduced motion: Full `prefersReducedMotion()` guard across `gsapSetup.ts`, `Header.tsx`, and CSS (`src/styles/animations.css`)
Unverified animation assumptions: Multi-frame easing curves beyond publicly extracted timings may differ microscopically from Webflow proprietary IX2 runtime

13. FUNCTIONAL COMPONENTS

Contact form: Validated Classic contact form (`ClassicContactForm.tsx`) + 5-step Statement wizard (`StatementContact.tsx`) with Zod checks & error alerts
Newsletter: Footer quarterly-note signup form (`Footer.tsx`) with Zod email validation & optional `VITE_NEWSLETTER_ENDPOINT`
FAQ: Context-aware collapsible FAQ accordion (`FAQSection.tsx`) linking to `/questions/:slug`
Testimonials: Interactive 4-quote slider (`QuoteSlider.tsx`) with Prev/Next controls and client metadata
Service navigation: Linked from header drawer, footer, Home practices rows, Services page, and detail pages
Case studies: Filter-ready grid and 4 narrative pages (`/case-studies`, `/case-studies/:slug`)
Insights: Category-filtered Insights hub (`InsightsPage.tsx`) + 6 full article views (`/insights/:slug`)
Team profiles: `/team` hub + 6 individual partner/manager dossiers (`/people/:slug`)
Back to top: Verified smooth/top trigger in `Footer.tsx`

14. VISUAL COMPARISON

Geometry fidelity: High — Client-First `.padding-global` (`40px`), `.grid-global` (`1360px`), button pills, and section cadence preserved
Typography fidelity: Measured 1:1 match (`130px` H1 display, `119.6px` line-height, `16.5px` body, `11.5px` DM Mono labels, `Familjen Grotesk` + `DM Mono` loaded)
Color fidelity: Measured 1:1 match (`rgb(243, 242, 238)` paper, `rgb(18, 18, 17)` ink, `#4c2218` burgundy accent, `#0f0f0e` footer)
Image fidelity: 100% local `.webp` photography matching all 66 routes (`0` broken images in Chromium audit)
Video fidelity: Original MP4/WebM meeting loop & laptop loop integrated with poster fallbacks
Component fidelity: Wordmarks, analog/digital clocks, fee cards, quote slider, drawers, and multi-step forms reproduced faithfully
Motion fidelity: GSAP scroll scenes, counters, menu staggers, and pill button hover transitions active with reduced-motion fallback
Remaining visual differences: Measured `pixelmatch` similarity on top `3200px` @ `1440x900` against `docs/reference/`: `/` `98.32%`, `/pricing` `96.06%`, `/statement/home-statement` `95.48%`, `/contact` `95.19%`, `/services` `90.23%`, `/studio` `88.36%`, `/insights` `79.92%`, `/cinematic/home-cinematic` `80.87%` (diffs stem from live real-time clocks, running video frames on Cinematic, and scroll-reveal vertical offsets on tall multi-card grids)
Comparison artifact paths: `docs/testing/screenshots/*.png`, `docs/testing/verification-results.json`, `docs/testing/visual-regression-report.md`

15. RESPONSIVE TESTING

Desktop: Tested at `1920x1080` and `1440x900` across `/` , `/services`, `/pricing`, `/studio`, `/contact`, `/cinematic/home-cinematic`, `/statement/home-statement` — `0px` horizontal overflow
Tablet: Tested at `1024x768` and `768x1024` across all 7 key routes — `0px` horizontal overflow
Mobile: Tested at `390x844` across all 7 key routes — `0px` horizontal overflow
Narrow mobile: Tested at `320x700` across all 7 key routes — `0px` horizontal overflow
Remaining issues: None (`42/42` viewport checks passed with `0` overflow failures)

16. PERFORMANCE

Lighthouse Performance: Not measured (Lighthouse CLI was not executed in this session)
Accessibility: Verified single `<h1>` per page across all 66 routes, ARIA dialog/tablist/pressed/expanded attributes, Escape close + focus return, and semantic landmarks; formal Lighthouse Accessibility score not measured
Best Practices: Not measured via Lighthouse
SEO: Per-route `<title>` and `<meta name="description">` management via `SiteLayout`; formal Lighthouse SEO score not measured
LCP: Not measured via Lighthouse (`loading="eager"` used on above-the-fold hero images/wordmarks + `rel="preload"` on `Familjen Grotesk` and `DM Mono` fonts)
CLS: Not measured via Lighthouse (`aspect-ratio` containers & local preload fonts minimize shift)
INP: Not measured via Lighthouse
Measurement conditions: Vite production bundle + Chromium headless verification at `1440x900`; `npm run build` completed in `3.10s`

17. TEST RESULTS

Total tests executed: `8` Vitest unit tests (`tests/unit/vika-domain.test.ts`) + `66` Playwright route audits + `42` responsive viewport overflow checks + `9` interactive E2E flows (`scripts/verify-all.ts`)
Passed: `8/8` Vitest unit tests, `66/66` Playwright routes, `42/42` responsive checks, `9/9` interactive flows
Failed: `0`
Skipped: `0`
Broken links: Navigation/route matrix across all 66 internal paths resolved without errors (`404` handler verified on `/404`)
Missing assets: `0` on disk (`tests/unit/vika-domain.test.ts`) and `0` broken images across all 66 routes in Chromium
Console errors: `0` across all 66 routes (`0` uncaught `pageerror` events)
TypeScript: `0` errors (`npm run lint` / `tsc --noEmit` exited `0`)
Lint: Passed (`tsc --noEmit`)
Production build: Passed (`npm run build` exited `0`)

18. FILES CREATED OR MODIFIED

Components: `src/components/{booking/BookingFlow.tsx, booking/BookingOverlay.tsx, common/OfficeClock.tsx, common/VikaButton.tsx, contact/ClassicContactForm.tsx, cta/PartnerCloseCard.tsx, cta/PracticeCTA.tsx, deadlines/DeadlineCalendar.tsx, faq/FAQSection.tsx, layout/ExploreVika.tsx, layout/Footer.tsx, layout/Header.tsx, layout/SiteLayout.tsx, pricing/PricingCardsSection.tsx, testimonials/QuoteSlider.tsx}`
Pages: `src/pages/home/{ClassicHome.tsx, CinematicHome.tsx, StatementHome.tsx}`, `src/pages/studio/{ClassicStudio.tsx, CinematicStudio.tsx, StatementStudio.tsx}`, `src/pages/contact/{ClassicContact.tsx, CinematicContact.tsx, StatementContact.tsx}`, `src/pages/shared/{ServicesPage.tsx, PricingPage.tsx, InsightsPage.tsx, TeamPage.tsx, CaseStudiesPage.tsx}`, `src/pages/detail/{ServiceDetailPage.tsx, CaseStudyDetailPage.tsx, InsightDetailPage.tsx, PersonDetailPage.tsx, PlanDetailPage.tsx, DeadlineDetailPage.tsx, QuestionDetailPage.tsx}`, `src/pages/utility/{OverviewPage.tsx, StyleGuidePage.tsx, InstructionsPage.tsx, LicensesPage.tsx, ChangelogPage.tsx, PrivacyPolicyPage.tsx, PasswordPage.tsx, NotFoundPage.tsx}`
Layouts & Context: `src/App.tsx`, `src/main.tsx`, `src/vite-env.d.ts`, `index.html`, `src/context/{BookingContext.tsx, LayoutContext.tsx, PricingContext.tsx}`
CMS data: `src/data/{booking.ts, caseStudies.ts, cmsRelations.ts, deadlines.ts, insights.ts, offices.ts, people.ts, plans.ts, questions.ts, services.ts, siteConfig.ts, testimonials.ts, types.ts}`
Styles: `src/styles/{tokens.css, typography.css, global.css, layouts.css, animations.css}`
Animations: `src/animations/gsapSetup.ts`
Images: `public/assets/{brand/*, fonts/*, images/**}` (148 deduplicated reference assets + `public/assets/brand/vika-favicon.svg`)
Videos: `public/assets/videos/shared/{6ad880b358f73cbbb9142e09_vika-cinematic-hero-meeting_1_mp4.mp4, 6ad880b358f73cbbb9142e09_vika-cinematic-hero-meeting_1_webm.webm, 6adb27cfd75d93591180ceb5_vika-overview-laptop-loop_1_mp4.mp4, 6adb27cfd75d93591180ceb5_vika-overview-laptop-loop_1_webm.webm}`
Research scripts: `scripts/{discover-reference.ts, finalize-discovery.ts, inspect-html.ts, acquire-assets.ts, build-content-map.ts, generate-styles.ts, verify-all.ts}`
Tests: `vitest.config.ts`, `tests/unit/vika-domain.test.ts`
Documentation: `README.md`, `docs/configuration.md`, `docs/research/*`, `docs/testing/*`

19. KNOWN LIMITATIONS

Reference access limitations: Figma design source file and private Webflow Designer workspace remain external behind purchase authentication
Asset licensing limitations: Reference images and films are template demonstration media; per `/licenses`, sample copy, people/company names, and imagery are demonstration fixtures for commercial replacement prior to a real firm launch
Unavailable assets: Original PNG favicons from `<head>` were absent from asset manifest and replaced cleanly with vector `public/assets/brand/vika-favicon.svg`
Generated media differences: Video backgrounds and live analog/digital clocks produce pixel differences relative to static reference captures
Unverified financial content: UAE FTA and UK HMRC / Companies House 2026–2027 dates and example AED/GBP fee tiers reflect template sample figures and must be reviewed by qualified practitioners before production reliance
Unconfigured booking backend: `VITE_BOOKING_ENDPOINT` defaults to blank (`demo` request confirmation without external invites)
Unconfigured form backend: `VITE_CONTACT_ENDPOINT` and `VITE_NEWSLETTER_ENDPOINT` default to blank (`demo` local validation & confirmation)
Remaining visual differences: Sub-pixel scrolling offsets and tall card grids (`/insights` 79.92%) show minor height/reveal alignment deltas in pixelmatch comparison
Remaining behavioral differences: `/401` password gate validates against non-empty input with demonstration error response (no server-side protected CMS pages configured)
Remaining defects: None found in tested flows (`0` lint/build/unit/route/responsive failures)

20. REQUIRED USER ACTIONS

- Supply optional production API webhook URLs (`VITE_CONTACT_ENDPOINT`, `VITE_BOOKING_ENDPOINT`, `VITE_NEWSLETTER_ENDPOINT`) in `.env` if connecting to a live backend or CRM.
- Replace sample firm name, partner bios, client quotes, tax deadlines, legal privacy policy wording, and demonstration media before publishing as a live accounting practice.

21. FINAL COMPLETION STATUS

Completed: Full React + TypeScript + Vite + GSAP reconstruction of Classic, Cinematic, Statement, Shared, Utility, and 7 CMS collection detail views; 148+ local assets verified on disk; `tsc --noEmit`, Vitest (`8/8`), `vite build`, Playwright (`66/66` routes, `42/42` viewport checks, `9/9` interactive tests), and pixelmatch comparisons executed cleanly after final code edits.
Partially completed: Performance & Web Vitals metrics (`LCP`, `CLS`, `INP`, Lighthouse scores) were not executed via Lighthouse CLI.
Not completed: None of the autonomous build, test, or visual verification scope remains incomplete; only external production API webhooks/legal copy require business authorization.