# Live Reference & Design Audit Summary

- **Primary Reference**: `https://vika-template.webflow.io/` (crawled across 44 public routes into `docs/research/raw-html/` and `docs/reference/`).
- **Extracted Stylesheet**: `docs/research/reference-stylesheet.css` (`427,338` bytes) formatted into `docs/research/vika-styles-formatted.css` (`10,755` lines).
- **Root Variables & Computed Measurements**: Extracted into `docs/research/reference-root-vars.txt` and `docs/research/computed-style-audit.json` at `1440x900`.
- **Evidence Priority**: Live reference rendering and measured CSS properties override static screenshots where animations or live clocks vary over time.
- **Discrepancy Note**: Static full-page screenshots capture fixed historical clock times (`14:29` Dubai / `10:29` London), sticky floating dock visibility, and preloader states; the reconstructed application computes live `Intl.DateTimeFormat` clock hands in real time and respects `prefers-reduced-motion: reduce`.
