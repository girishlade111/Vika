# Multi-Layout Variant Architecture Audit

Vika supports three full design perspectives sharing unified tokens (`src/styles/tokens.css`) and CMS collections (`src/data/`):

## 1. Classic (`/`, `/studio`, `/contact`)
- Warm stone paper palette (`#f3f2ee`), calm editorial rhythm, top navbar strip (`Accounting, tax and audit / Dubai and London since 2016`), live Dubai office availability dot, floating bottom navigation dock on scroll, partner close card (`Talk to Sara`), and structured 2-column classic contact form.

## 2. Cinematic (`/cinematic/home-cinematic`, `/cinematic/studio-cinematic`, `/cinematic/contact-cinematic`)
- Full-bleed filmic hero (`6ad880b358f73cbbb9142e09_vika-cinematic-hero-meeting_1_mp4.mp4`), alternating near-black (`#121211`) dark-mode sections, wide widescreen architectural studio frames, and an integrated multi-partner appointment scheduler on Contact Cinematic.

## 3. Statement (`/statement/home-statement`, `/statement/studio-statement`, `/statement/contact-statement`)
- Oversized typographic display scale (`heading-style-display`), horizontal ruled ledger rows, expandable interactive practices drawer (`statement-practices_details.is-open`), studio growth bar chart + live analog clocks (`StudioStatement`), and a 5-step guided intake wizard (`ContactStatement`).
