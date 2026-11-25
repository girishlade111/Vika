import fs from 'node:fs';
import path from 'node:path';

const REF_CSS = fs.readFileSync(path.resolve('docs/research/reference-stylesheet.css'), 'utf8');
const OUT_DIR = path.resolve('src/styles');
fs.mkdirSync(OUT_DIR, { recursive: true });

// 1. tokens.css: local @font-face + exact :root tokens
const fontFaces = `/* Verified Vika Typography - Familjen Grotesk & DM Mono (SIL OFL) */
@font-face {
  font-family: "Familjen Grotesk";
  src: url("/assets/fonts/6adba9b951dd02105152b8f6_FamiljenGrotesk-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Familjen Grotesk";
  src: url("/assets/fonts/6adba9b9b6943178c27d0ba4_FamiljenGrotesk-Medium.woff") format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Familjen Grotesk";
  src: url("/assets/fonts/6adba9b9b35518892117602e_FamiljenGrotesk-SemiBold.woff") format("woff");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Familjen Grotesk";
  src: url("/assets/fonts/6adba9b933101e42e8bcca03_FamiljenGrotesk-Bold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "DM Mono";
  src: url("/assets/fonts/6adba9baddaa635165c039a3_DMMono-Light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "DM Mono";
  src: url("/assets/fonts/6adba9ba96755381884be122_DMMono-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "DM Mono";
  src: url("/assets/fonts/6adba9ba96755381884be11f_DMMono-Medium.woff") format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
`;

const rootMatch = REF_CSS.match(/:root\{[^}]+\}/)?.[0] || '';
const formattedRoot = rootMatch
  .replace(':root{', ':root {\n  ')
  .replace(/;/g, ';\n  ')
  .replace(/\s+\}$/, '\n}');

fs.writeFileSync(
  path.join(OUT_DIR, 'tokens.css'),
  `${fontFaces}\n${formattedRoot}\n`,
  'utf8'
);

// 2. typography.css
const typographyCss = `/* Vika Typography System */
body {
  background-color: var(--background-color--background-primary);
  font-family: var(--_typography---font--primary);
  color: var(--text-color--text-primary);
  font-size: var(--_typography---size--text-regular);
  line-height: var(--_typography---line-height--height-155);
  font-weight: var(--_typography---weight--regular);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "ss01", "cv05";
}

h1 {
  margin-top: var(--_layout---space--none);
  margin-bottom: var(--_layout---space--none);
  font-size: var(--_typography---size--h1);
  line-height: var(--_typography---line-height--height-95);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-50);
}

h2 {
  margin-top: var(--_layout---space--none);
  margin-bottom: var(--_layout---space--none);
  font-size: var(--_typography---size--h2);
  line-height: var(--_typography---line-height--height-102);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-42);
}

h3 {
  margin-top: var(--_layout---space--none);
  margin-bottom: var(--_layout---space--none);
  font-size: var(--_typography---size--h3);
  line-height: var(--_typography---line-height--height-118);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-22);
}

h4 {
  margin-top: var(--_layout---space--none);
  margin-bottom: var(--_layout---space--none);
  font-size: var(--_typography---size--h4);
  line-height: var(--_typography---line-height--height-125);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-15);
}

h5 {
  margin-top: var(--_layout---space--none);
  margin-bottom: var(--_layout---space--none);
  font-size: var(--_typography---size--h5);
  line-height: var(--_typography---line-height--height-130);
  font-weight: var(--_typography---weight--medium);
}

h6 {
  margin-top: var(--_layout---space--none);
  margin-bottom: var(--_layout---space--none);
  font-size: var(--_typography---size--h6);
  line-height: var(--_typography---line-height--height-140);
  font-weight: var(--_typography---weight--medium);
}

p {
  margin-top: var(--_layout---space--none);
  margin-bottom: var(--_layout---space--none);
}

.heading-style-display {
  font-size: var(--_typography---size--display);
  line-height: var(--_typography---line-height--height-92);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-55);
}

.heading-style-h1 {
  font-size: var(--_typography---size--h1);
  line-height: var(--_typography---line-height--height-95);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-50);
}

.heading-style-h2 {
  font-size: var(--_typography---size--h2);
  line-height: var(--_typography---line-height--height-102);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-42);
}

.heading-style-h3 {
  font-size: var(--_typography---size--h3);
  line-height: var(--_typography---line-height--height-118);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-22);
}

.heading-style-h4 {
  font-size: var(--_typography---size--h4);
  line-height: var(--_typography---line-height--height-125);
  font-weight: var(--_typography---weight--medium);
  letter-spacing: var(--_typography---tracking--tight-15);
}

.heading-style-h5 {
  font-size: var(--_typography---size--h5);
  line-height: var(--_typography---line-height--height-130);
  font-weight: var(--_typography---weight--medium);
}

.heading-style-h6 {
  font-size: var(--_typography---size--h6);
  line-height: var(--_typography---line-height--height-140);
  font-weight: var(--_typography---weight--medium);
}

.text-size-large {
  font-size: var(--_typography---size-scale--size-22);
  line-height: var(--_typography---line-height--height-142);
  letter-spacing: var(--_typography---tracking--tight-14);
}

.text-size-medium {
  font-size: var(--_typography---size--text-medium);
  line-height: var(--_typography---line-height--height-150);
}

.text-size-regular {
  font-size: var(--_typography---size--text-regular);
  line-height: var(--_typography---line-height--height-155);
}

.text-size-small {
  font-size: var(--_typography---size--text-small);
  line-height: var(--_typography---line-height--height-150);
}

.text-size-tiny {
  font-size: var(--_typography---size--text-tiny);
  line-height: var(--_typography---line-height--height-145);
}

.text-style-label {
  font-family: var(--_typography---font--mono);
  color: var(--text-color--text-secondary);
  font-size: var(--_typography---size--label);
  line-height: var(--_typography---line-height--height-145);
  font-weight: var(--_typography---weight--regular);
  letter-spacing: var(--_typography---tracking--wide-60);
  text-transform: uppercase;
}

.text-color-primary { color: var(--text-color--text-primary); }
.text-color-secondary { color: var(--text-color--text-secondary); }
.text-color-tertiary { color: var(--text-color--text-tertiary); }
.text-color-alternate { color: var(--text-color--text-alternate); }
.text-style-muted { color: var(--text-color--text-tertiary); }
.text-weight-light { font-weight: var(--_typography---weight--light); }
.text-weight-normal { font-weight: var(--_typography---weight--regular); }
.text-weight-medium { font-weight: var(--_typography---weight--medium); }
.text-weight-semibold { font-weight: var(--_typography---weight--semibold); }
.text-weight-bold { font-weight: var(--_typography---weight--bold); }
.text-style-italic { font-style: italic; }
.text-style-allcaps { text-transform: uppercase; }
.text-style-nowrap { white-space: nowrap; }
.text-style-strikethrough { text-decoration: line-through; }
`;
fs.writeFileSync(path.join(OUT_DIR, 'typography.css'), typographyCss, 'utf8');

// 3. global.css: reset + core Vika stylesheet from :root onwards (rewriting any CDN urls to local)
const rootEnd = REF_CSS.indexOf('}', REF_CSS.indexOf(':root{')) + 1;
let coreBody = REF_CSS.slice(rootEnd)
  .replace(/https:\/\/cdn\.prod\.website-files\.com\/6ad70fa4dbb1938da989fd76\/6ad8d94d7fd4b7fdf5bbf773_vika-check\.svg/g, '/assets/brand/6ad8d94d7fd4b7fdf5bbf773_vika-check.svg')
  .replace(/https:\/\/d3e54v103j8qbb\.cloudfront\.net\/static\/custom-checkbox-checkmark\.589d534424\.svg/g, '/assets/brand/custom-checkbox-checkmark.589d534424.svg')
  .replace(/https:\/\/cdn\.prod\.website-files\.com\/[^)"']+/g, '');

const baseReset = `/* Base Reset & Core Layout Primitives */
*, *::before, *::after {
  box-sizing: border-box;
}
html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}
body {
  margin: 0;
  min-height: 100%;
}
.w-inline-block {
  max-width: 100%;
  display: inline-block;
}
.w-button {
  display: inline-block;
  border: 0;
  cursor: pointer;
  text-decoration: none;
}
.w-input, .w-select {
  display: block;
  width: 100%;
}
.w-dropdown {
  display: inline-block;
  position: relative;
}
.w-dropdown-list {
  position: absolute;
}
.w-tab-content {
  position: relative;
  overflow: visible;
}
.w-richtext ul {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 1.25rem;
}
.w-richtext li {
  margin-bottom: 0.375rem;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;

fs.writeFileSync(
  path.join(OUT_DIR, 'global.css'),
  `${baseReset}\n${coreBody}\n`,
  'utf8'
);

// 4. layouts.css: React state hooks + Booking + Interactive overrides layered cleanly over global.css
const layoutsCss = `/* Layout & Interactive State Overrides for React */

/* Fullscreen menu open state */
.navbar_menu {
  display: none;
  opacity: 0;
}
.navbar_menu.is-open {
  display: block;
  opacity: 1;
}

/* Floating bottom navigation dock */
.navbar_pill {
  transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.4s;
}
.navbar_pill.is-visible {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}
.navbar_pill:not(.is-visible) {
  visibility: hidden;
  opacity: 0;
  transform: translateY(16px);
  pointer-events: none;
}

/* Explore Vika floating tour panel */
.tour_list {
  display: none;
}
.tour_list.is-open {
  display: block;
}
.tour_plus-line {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s;
}
.tour_toggle.is-open .tour_plus-line.is-vertical {
  transform: rotate(90deg);
  opacity: 0;
}

/* Pricing region & billing visibility */
.price_uk,
.price_year {
  display: none;
}
[data-pricing-region="UK"] .price_ae {
  display: none;
}
[data-pricing-region="UK"] .price_uk {
  display: block;
}
[data-pricing-billing="Yearly"] .price_month {
  display: none;
}
[data-pricing-billing="Yearly"] .price_year {
  display: block;
}

/* Statement Home Expandable Practices Accordion */
.practices_row.is-summary {
  cursor: pointer;
}
.practices_detail {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.42s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}
.practices_detail-inner {
  min-height: 0;
  overflow: hidden;
}
.practices_item.is-open .practices_detail {
  grid-template-rows: 1fr;
}
.practices_icon.is-plus {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.practices_item.is-open .practices_icon.is-plus {
  transform: rotate(45deg);
}

/* Shared FAQ Accordion */
.questions_question {
  width: 100%;
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  color: inherit;
}
.questions_answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}
.questions_answer-inner {
  min-height: 0;
  overflow: hidden;
}
.questions_item.is-open .questions_answer {
  grid-template-rows: 1fr;
}
.questions_icon {
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.questions_item.is-open .questions_icon {
  transform: rotate(45deg);
}

/* Form Pill Controls (Semantic inputs inside pill labels) */
.form_radio.is-pill input[type="radio"],
.form_checkbox.is-pill input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
.form_radio.is-pill.is-active,
.form_checkbox.is-pill.is-active {
  border-color: var(--accent-color--accent-primary);
  background-color: var(--accent-color--accent-primary);
  color: var(--text-color--text-alternate);
}
.form_radio.is-pill:focus-within,
.form_checkbox.is-pill:focus-within {
  outline: 2px solid var(--accent-color--accent-primary);
  outline-offset: 2px;
}

/* Booking Slots & Partner Selection */
.booking_slot-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color--border-secondary);
  border-radius: var(--_layout---radius--round);
  background: transparent;
  color: var(--text-color--text-primary);
  font-family: var(--_typography---font--primary);
  font-size: var(--_typography---size-scale--size-14-half);
  font-weight: var(--_typography---weight--medium);
  cursor: pointer;
  transition: background-color 0.25s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s, border-color 0.25s;
}
.booking_slot-btn:hover {
  border-color: var(--accent-color--accent-primary);
}
.booking_slot-btn.is-active {
  background-color: var(--accent-color--accent-primary);
  border-color: var(--accent-color--accent-primary);
  color: var(--accent-color--accent-text);
}
.booking_slot-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

/* Booking Modal / Drawer Overlay */
.booking-modal_backdrop {
  position: fixed;
  inset: 0;
  z-index: 95;
  background-color: rgba(15, 15, 14, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.booking-modal_panel {
  width: 100%;
  max-width: 52rem;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--background-color--background-primary);
  color: var(--text-color--text-primary);
  border-radius: var(--_layout---radius--large);
  border: 1px solid var(--border-color--border-primary);
  padding: 2.5rem;
  position: relative;
}

/* Case board hover image preview on Statement Home */
.case-ledger_row.is-board {
  position: relative;
}
.case-ledger_row.is-board .case-board_image {
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.case-ledger_row.is-board:hover .case-board_image {
  opacity: 1;
  visibility: visible;
}

/* Tabs active state */
.tabs_link {
  cursor: pointer;
}

/* Page layout switcher active pill */
.navbar_menu-layout.is-active,
.tour_layout.is-active,
.tour_page-layout.is-active {
  border-color: var(--accent-color--accent-primary);
  background-color: var(--accent-color--accent-primary);
  color: var(--accent-color--accent-text);
}

/* Ensure growth bar fills cleanly */
.growth_fill {
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Prevent horizontal overflow across viewports */
html, body, .page-wrapper {
  overflow-x: clip;
}
`;
fs.writeFileSync(path.join(OUT_DIR, 'layouts.css'), layoutsCss, 'utf8');

// 5. animations.css: Signature Vika button label-flip, arrow slide, marquee, status dot pulse, reduced-motion
const animationsCss = `/* Vika Signature Motion & Micro-interactions */

/* Dual-label button hover flip + circular arrow slide */
.button_label-wrap {
  position: relative;
  overflow: hidden;
  display: grid;
}
.button_label,
.button_label-hover {
  grid-area: 1 / 1;
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.button_label-hover {
  transform: translateY(100%);
  opacity: 0;
}
.button:hover .button_label {
  transform: translateY(-100%);
  opacity: 0;
}
.button:hover .button_label-hover {
  transform: translateY(0%);
  opacity: 1;
}

.button_arrow {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.button:hover .button_arrow {
  transform: translate(2px, -2px);
}

/* Marquee animation for client marks & quote track */
@keyframes vikaMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.home-clients_track {
  display: flex;
  width: max-content;
  animation: vikaMarquee 36s linear infinite;
}
.home-clients_track:hover {
  animation-play-state: paused;
}

/* Live office status dot pulse */
@keyframes vikaDotPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.85); }
}
.navbar_dot,
.offices_dot,
.person-hero_dot {
  animation: vikaDotPulse 2.6s ease-in-out infinite;
}

/* Preloader / Page reveal curtain */
.page-reveal_component {
  pointer-events: none;
}

/* Reduced motion compliance */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .home-clients_track {
    animation: none;
  }
}
`;
fs.writeFileSync(path.join(OUT_DIR, 'animations.css'), animationsCss, 'utf8');

console.log('Generated src/styles/{tokens,typography,global,layouts,animations}.css');
