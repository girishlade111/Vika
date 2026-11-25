# Responsive Breakpoint & Overflow Audit

Measured across `1920x1080`, `1440x900`, `1024x768`, `768x1024`, `390x844`, and `320x700` viewports via Playwright (`scripts/verify-all.ts`, recorded in `docs/testing/verification-results.json`).

- **Tested Matrix**: 7 primary routes (`/`, `/services`, `/pricing`, `/studio`, `/contact`, `/cinematic/home-cinematic`, `/statement/home-statement`) × 6 viewports = **42 checks**.
- **Measured Horizontal Overflow**: `0px` across all 42 viewport/route checks (`42 passed, 0 failed`), plus `0px` horizontal overflow across all 66 routes at `1440x900`.
- **Fluid Breakpoints (`src/styles/typography.css` & `src/styles/layouts.css`)**:
  - Desktop (`>= 992px`): 12-column `.grid-global` with `2.5rem` (`40px`) horizontal gutters.
  - Tablet (`<= 991px`): Collapses multi-column grids to responsive columns and scales typography cleanly.
  - Mobile (`<= 767px` / `<= 479px`): Full single-column stacking, `min-width: 0` grid tracks, accessible full-width buttons, and compact floating dock pill.
