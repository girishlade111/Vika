# Vika — Accounting, Tax and Audit Studio Website

High-fidelity React + TypeScript + Vite reconstruction of the **Vika** multi-layout website (`https://vika-template.webflow.io/`), featuring three layout perspectives (**Classic**, **Cinematic**, **Statement**), seven interconnected CMS collections, UAE/UK tax deadline calendars, interactive AED/GBP monthly/yearly pricing, timezone-aware Dubai (`Asia/Dubai`) and London (`Europe/London`) office clocks, partner call booking, GSAP scroll choreography, and locally served verified media.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Scripts

- `npm run dev` — Start local Vite dev server
- `npm run lint` — Run TypeScript typechecking (`tsc --noEmit`)
- `npm run build` — Build production bundle (`tsc -b && vite build`) into `dist/`
- `npm run preview` — Preview production bundle locally
- `npm test` — Run Vitest unit and CMS integrity tests (`tests/unit/vika-domain.test.ts`)
- `npx tsx scripts/verify-all.ts` — Run end-to-end Playwright verification (all routes, responsive viewports, interactive controls, accessibility, and pixelmatch visual comparison)

## Architecture

- **Layout Perspectives (`src/pages/home/`, `studio/`, `contact/`)**:
  - **Classic**: `/`, `/studio`, `/contact`
  - **Cinematic**: `/cinematic/home-cinematic`, `/cinematic/studio-cinematic`, `/cinematic/contact-cinematic`
  - **Statement**: `/statement/home-statement`, `/statement/studio-statement`, `/statement/contact-statement`
- **Shared Practice Pages (`src/pages/shared/`)**: `/services`, `/pricing`, `/insights`, `/team`, `/case-studies`, `/privacy-policy`
- **Utility Pages (`src/pages/utility/`)**: `/overview`, `/style-guide`, `/instructions`, `/licenses`, `/changelog`, `/401`, `/404`
- **Seven Interconnected CMS Collections (`src/data/` & `src/pages/detail/`)**:
  1. `services` (`/services/:slug`)
  2. `insights` (`/insights/:slug`)
  3. `people` (`/people/:slug`)
  4. `plans` (`/plans/:slug`)
  5. `deadlines` (`/deadlines/:slug`)
  6. `caseStudies` (`/case-studies/:slug`)
  7. `questions` (`/questions/:slug`)

## Configuration & Documentation

- See [`docs/configuration.md`](docs/configuration.md) for branding, office clocks, pricing, CMS editing, and optional webhook endpoints.
- See `docs/research/` for live reference audits, design tokens, media licenses, pricing matrix, calendar audit, and booking flow mapping.
- See `docs/testing/` for measured functional, typography, asset, responsive, motion, and visual regression reports.
