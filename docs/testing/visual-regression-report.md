# Visual Regression Report

Generated from Playwright full-page captures at `1440x900` compared against live Webflow reference screenshots (`docs/reference/`) using `sharp` + `pixelmatch` (`threshold: 0.15`, top `3200px` crop) via `scripts/verify-all.ts`.

| Route | Reference Screenshot | Local Screenshot | Pixelmatch Similarity | Diff Pixels |
|---|---|---|---:|---:|
| `/` | `docs/reference/classic/home-1440-full.png` | `docs/testing/screenshots/classic-home.png` | **98.32%** | 77,197 |
| `/studio` | `docs/reference/classic/studio-1440-full.png` | `docs/testing/screenshots/classic-studio.png` | **88.36%** | 536,457 |
| `/contact` | `docs/reference/classic/contact-1440-full.png` | `docs/testing/screenshots/classic-contact.png` | **95.19%** | 203,769 |
| `/services` | `docs/reference/shared/services-1440-full.png` | `docs/testing/screenshots/shared-services.png` | **90.23%** | 450,345 |
| `/pricing` | `docs/reference/shared/pricing-1440-full.png` | `docs/testing/screenshots/shared-pricing.png` | **96.06%** | 181,552 |
| `/insights` | `docs/reference/shared/insights-1440-full.png` | `docs/testing/screenshots/shared-insights.png` | **79.92%** | 925,365 |
| `/cinematic/home-cinematic` | `docs/reference/cinematic/cinematic__home-cinematic-1440-full.png` | `docs/testing/screenshots/cinematic-home.png` | **80.87%** | 881,332 |
| `/statement/home-statement` | `docs/reference/statement/statement__home-statement-1440-full.png` | `docs/testing/screenshots/statement-home.png` | **95.48%** | 208,288 |

### Diff Sources (Expected vs Dynamic)
- Live Dubai (`Asia/Dubai`) & London (`Europe/London`) office clock hands/times reflect wall-clock time rather than the static `14:29` / `10:29` reference snapshot.
- `/cinematic/home-cinematic` plays a background MP4/WebM meeting film whose frame timing varies per capture.
- Scroll-triggered animations and subtle image rendering offsets across sections account for minor vertical pixel shifts below the fold (most pronounced on tall multi-card grids like `/insights`).
