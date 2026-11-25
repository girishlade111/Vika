# Build & Performance Report

Measured from `npm run build` (`tsc -b && vite build`) after final code edits.

- **Build Duration**: `5.85s` (`120` modules transformed)
- **Production Bundle (`dist/`)**:
  - `dist/index.html`: `1.13 kB` (`gzip: 0.55 kB`)
  - `dist/assets/index-DUJLRVBk.css`: `402.89 kB` (`gzip: 45.93 kB`)
  - `dist/assets/index-BYrlNGKU.js`: `768.17 kB` (`gzip: 210.65 kB`)
- **Asset Delivery**: All 7 font files (`.woff`), editorial images (`.webp`), brand SVGs, and background videos (`mp4`/`webm`) are served directly from `public/assets/` with `loading="lazy"` on below-the-fold editorial/card imagery and `rel="preload"` on primary display/mono font files.
