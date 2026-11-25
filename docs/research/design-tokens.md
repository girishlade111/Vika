# Design Tokens & Visual Language Audit

Source: `src/styles/tokens.css`, `docs/research/reference-root-vars.txt`, and `docs/research/computed-style-audit.json`.

## Core Palette Primitives

| Role | Token | Hex Value |
|---|---|---|
| Primary Paper Surface | `--_primitives---neutral--100` | `#f3f2ee` |
| Secondary Stone Surface | `--_primitives---neutral--200` | `#e9e7e1` |
| Elevated Card Surface | `--_primitives---neutral--50` | `#fbfaf8` |
| Primary Ink / Text | `--_primitives---neutral--900` | `#121211` |
| Footer Dark Surface | `--_primitives---neutral--950` | `#0f0f0e` |
| Secondary Text | `--_primitives---neutral--600` | `#5f5e58` |
| Muted Heading Accent (`text-color-tertiary`) | `--_primitives---neutral--500` | `#6e6d67` |
| Brand Primary Burgundy | `--_primitives---burgundy--700` | `#4c2218` |
| Dark Surface Rose Accent | `--_primitives---burgundy--300` | `#d9a493` |
| Dubai Open Dot | `--_primitives---green` | `#4ade80` |
| Hairline Border | `--_semantics---border--default` | `#1212111f` |

## Typography System

- **Primary Sans**: `Familjen Grotesk` (`400`, `500`, `600`, `700`), SIL OFL, served locally from `public/assets/fonts/`.
- **Monospace Metadata**: `DM Mono` (`300`, `400`, `500`), SIL OFL, served locally from `public/assets/fonts/`.
- **Computed Desktop Scale (`1440px`)**:
  - `heading-style-display`: `130px` (`~9.03vw`)
  - `text-style-label`: `11.5px` uppercase (`DM Mono`)
  - Footer giant `Vika` wordmark: `29vw` (`~417.6px` at `1440px`), line-height `74%`, letter-spacing `-0.075em`.
