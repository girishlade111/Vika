# Asset Fidelity & Integrity Report

Verified via `tests/unit/vika-domain.test.ts` and Playwright route audit (`scripts/verify-all.ts`).

- **Downloaded Unique Assets (`public/assets/`)**: 148 unique SHA-256 deduplicated files plus local `vika-favicon.svg`.
- **Unit Test Disk Verification (`tests/unit/vika-domain.test.ts`)**: Verified all CMS `image`, `coverImage`, `secondaryImage`, `portrait`, and office paths point to `/assets/...` and exist on disk (`8/8` unit tests passed).
- **Live Browser Image Verification (`66` routes)**: `0` broken or missing `<img>` elements (`complete && naturalWidth > 0` across all 66 routes).
- **Local Font & Video Assets**:
  - 7 `.woff` webfont files served locally from `/assets/fonts/`.
  - 2 MP4 + 2 WebM video files served locally from `/assets/videos/shared/` with poster frames.
  - 0 runtime requests to `cdn.prod.website-files.com`.
