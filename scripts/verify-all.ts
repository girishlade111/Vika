import fs from 'node:fs';
import path from 'node:path';
import { preview } from 'vite';
import { chromium, type Page } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';
import { SERVICES } from '../src/data/services';
import { INSIGHTS } from '../src/data/insights';
import { PEOPLE } from '../src/data/people';
import { PLANS } from '../src/data/plans';
import { DEADLINES } from '../src/data/deadlines';
import { CASE_STUDIES } from '../src/data/caseStudies';
import { QUESTIONS } from '../src/data/questions';

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROOT_DIR = process.cwd();
const OUT_SCREENSHOT_DIR = path.join(ROOT_DIR, 'docs/testing/screenshots');
fs.mkdirSync(OUT_SCREENSHOT_DIR, { recursive: true });

const ALL_ROUTES = [
  '/',
  '/studio',
  '/contact',
  '/cinematic/home-cinematic',
  '/cinematic/studio-cinematic',
  '/cinematic/contact-cinematic',
  '/statement/home-statement',
  '/statement/studio-statement',
  '/statement/contact-statement',
  '/services',
  '/pricing',
  '/insights',
  '/team',
  '/case-studies',
  '/privacy-policy',
  '/overview',
  '/style-guide',
  '/instructions',
  '/licenses',
  '/changelog',
  '/401',
  '/404',
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...INSIGHTS.map((i) => `/insights/${i.slug}`),
  ...PEOPLE.map((p) => `/people/${p.slug}`),
  ...PLANS.map((p) => `/plans/${p.slug}`),
  ...DEADLINES.map((d) => `/deadlines/${d.slug}`),
  ...CASE_STUDIES.map((c) => `/case-studies/${c.slug}`),
  ...QUESTIONS.map((q) => `/questions/${q.slug}`),
];

interface RouteCheckResult {
  route: string;
  title: string;
  consoleErrors: string[];
  pageErrors: string[];
  brokenImages: string[];
  horizontalOverflowPx: number;
  h1Count: number;
  fontsLoaded: number;
  status: 'PASS' | 'FAIL';
}

async function checkRoute(page: Page, route: string): Promise<RouteCheckResult> {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  const onConsole = (msg: { type: () => string; text: () => string }) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  };
  const onPageError = (err: Error) => pageErrors.push(err.message);

  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {});
  await page.evaluate('document.fonts.ready');
  await page.waitForTimeout(100);

  // Scroll through viewport steps so every lazy-loaded image is triggered cleanly
  for (const frac of [0.25, 0.5, 0.75, 1.0, 0]) {
    await page.evaluate(`window.scrollTo(0, document.body.scrollHeight * ${frac})`);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(100);

  const metrics = (await page.evaluate(`(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    const broken = imgs
      .filter((img) => {
        const style = window.getComputedStyle(img);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        if (img.closest('.navbar_menu:not(.is-open)')) return false;
        return !img.complete || img.naturalWidth === 0;
      })
      .map((img) => img.getAttribute('src') || img.alt);
    const overflow = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
    const h1Count = document.querySelectorAll('h1').length;
    const loadedFonts = Array.from(document.fonts).filter((f) => f.status === 'loaded').length;
    return {
      title: document.title,
      broken,
      overflow,
      h1Count,
      loadedFonts
    };
  })()`)) as {
    title: string;
    broken: string[];
    overflow: number;
    h1Count: number;
    loadedFonts: number;
  };

  page.off('console', onConsole);
  page.off('pageerror', onPageError);

  const passed =
    consoleErrors.length === 0 &&
    pageErrors.length === 0 &&
    metrics.broken.length === 0 &&
    metrics.overflow <= 1 &&
    metrics.h1Count === 1;

  return {
    route,
    title: metrics.title,
    consoleErrors,
    pageErrors,
    brokenImages: metrics.broken,
    horizontalOverflowPx: metrics.overflow,
    h1Count: metrics.h1Count,
    fontsLoaded: metrics.loadedFonts,
    status: passed ? 'PASS' : 'FAIL',
  };
}

async function computeVisualComparison(
  localPath: string,
  refPath: string,
): Promise<{ width: number; height: number; matchPercent: number; diffPixels: number } | null> {
  if (!fs.existsSync(localPath) || !fs.existsSync(refPath)) return null;
  const localMeta = await sharp(localPath).metadata();
  const refMeta = await sharp(refPath).metadata();
  const width = 1440;
  const height = Math.min(localMeta.height || 900, refMeta.height || 900, 3200);

  const [bufA, bufB] = await Promise.all([
    sharp(localPath)
      .extract({ left: 0, top: 0, width: Math.min(width, localMeta.width || width), height: Math.min(height, localMeta.height || height) })
      .resize(width, height, { fit: 'cover', position: 'top' })
      .ensureAlpha()
      .raw()
      .toBuffer(),
    sharp(refPath)
      .extract({ left: 0, top: 0, width: Math.min(width, refMeta.width || width), height: Math.min(height, refMeta.height || height) })
      .resize(width, height, { fit: 'cover', position: 'top' })
      .ensureAlpha()
      .raw()
      .toBuffer(),
  ]);

  const diffPng = new PNG({ width, height });
  const diffPixels = pixelmatch(bufA, bufB, diffPng.data, width, height, {
    threshold: 0.15,
  });
  const totalPixels = width * height;
  const matchPercent = Number((((totalPixels - diffPixels) / totalPixels) * 100).toFixed(2));
  return { width, height, matchPercent, diffPixels };
}

async function main() {
  console.log('Starting Vite preview server...');
  const previewServer = await preview({
    preview: {
      port: PORT,
      host: '127.0.0.1',
      strictPort: true,
    },
  });

  const report: Record<string, unknown> = {
    executedAt: new Date().toISOString(),
    routeCount: ALL_ROUTES.length,
    routes: [] as RouteCheckResult[],
    responsiveChecks: [] as Array<{ route: string; width: number; overflow: number }>,
    interactiveTests: {} as Record<string, boolean>,
    typographyComputed: {} as Record<string, unknown>,
    visualComparisons: [] as Array<{
      route: string;
      reference: string;
      local: string;
      matchPercent: number;
      diffPixels: number;
    }>,
  };

  try {
    console.log('Preview server listening, launching Chromium...');
    const browser = await chromium.launch({ headless: true });
    console.log('Chromium launched.');

    try {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      context.setDefaultTimeout(10000);
      const page = await context.newPage();

      // 1. Verify all 66 routes
      console.log(`Checking all ${ALL_ROUTES.length} routes...`);
      const routeResults: RouteCheckResult[] = [];
      for (let i = 0; i < ALL_ROUTES.length; i++) {
        const route = ALL_ROUTES[i];
        console.log(`[${i + 1}/${ALL_ROUTES.length}] ${route}`);
        const res = await checkRoute(page, route);
        routeResults.push(res);
      }
      report.routes = routeResults;
      const failedRoutesNow = routeResults.filter((r) => r.status === 'FAIL');
      console.log(`Routes complete: ${routeResults.length - failedRoutesNow.length}/${routeResults.length} passed.`);
      if (failedRoutesNow.length > 0) {
        console.log('FAILED ROUTE DETAILS:', JSON.stringify(failedRoutesNow, null, 2));
      }

      // 2. Capture computed styles on Classic Home at 1440x900
      await page.goto(`${BASE_URL}/`, { waitUntil: 'load' });
      await page.evaluate('document.fonts.ready');
      report.typographyComputed = await page.evaluate(`(() => {
        const body = window.getComputedStyle(document.body);
        const h1 = document.querySelector('h1');
        const h1Style = h1 ? window.getComputedStyle(h1) : null;
        const label = document.querySelector('.text-style-label');
        const labelStyle = label ? window.getComputedStyle(label) : null;
        return {
          bodyFont: body.fontFamily,
          bodySize: body.fontSize,
          bodyBg: body.backgroundColor,
          bodyColor: body.color,
          h1Font: h1Style?.fontFamily,
          h1Size: h1Style?.fontSize,
          h1LineHeight: h1Style?.lineHeight,
          labelFont: labelStyle?.fontFamily,
          labelSize: labelStyle?.fontSize,
        };
      })()`);

      // 3. Interactive tests
      console.log('Running interactive tests...');
      const interactive: Record<string, boolean> = {};

      // Test fullscreen Menu open & Escape close
      await page.goto(`${BASE_URL}/`, { waitUntil: 'load' });
      await page.click('.navbar_menu-button');
      await page.waitForTimeout(300);
      const menuVisible = await page.evaluate(
        `document.querySelector('.navbar_menu')?.classList.contains('is-open') === true`,
      );
      interactive.menuOpens = Boolean(menuVisible);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const menuClosed = await page.evaluate(
        `document.querySelector('.navbar_menu')?.classList.contains('is-open') === false`,
      );
      interactive.menuClosesOnEscape = Boolean(menuClosed);

      // Test Pricing AED -> GBP & Monthly -> Yearly
      await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'load' });
      const initialBody = await page.innerText('body');
      await page.click('button:has-text("GBP")');
      await page.waitForTimeout(100);
      const gbpBody = await page.innerText('body');
      await page.click('button:has-text("Yearly")');
      await page.waitForTimeout(100);
      const gbpYearlyBody = await page.innerText('body');
      interactive.pricingCurrencyAndBillingSwitch =
        initialBody.includes('AED 2,500') &&
        gbpBody.includes('£550') &&
        gbpYearlyBody.includes('£5,500');

      // Test Deadline UAE -> UK tab (on Classic Home #calendar)
      await page.goto(`${BASE_URL}/`, { waitUntil: 'load' });
      await page.locator('#calendar .tabs_link:has-text("UK")').click();
      await page.waitForTimeout(150);
      const ukDeadlineVisible = await page.evaluate(
        `document.querySelector('#calendar')?.innerText.includes('HMRC') || document.querySelector('#calendar')?.innerText.includes('CT600')`,
      );
      interactive.calendarJurisdictionToggle = Boolean(ukDeadlineVisible);

      // Test Quote Slider next button
      await page.goto(`${BASE_URL}/`, { waitUntil: 'load' });
      const firstQuote = await page.textContent('.home-quotes_quote');
      await page.click('button[aria-label="Next client quote"]');
      await page.waitForTimeout(100);
      const secondQuote = await page.textContent('.home-quotes_quote');
      interactive.quoteSliderNext = Boolean(firstQuote && secondQuote && firstQuote !== secondQuote);

      // Test Classic Contact validation & submission
      await page.goto(`${BASE_URL}/contact`, { waitUntil: 'load' });
      await page.click('.contact_form-card button[type="submit"]');
      await page.waitForTimeout(100);
      const validationShown = await page.evaluate(
        `document.body.innerText.toLowerCase().includes('please enter your name')`,
      );
      await page.fill('#contact-name', 'Alex Mercer');
      await page.fill('#contact-email', 'alex@example.com');
      await page.fill('#contact-company', 'Mercer Trading LLC');
      await page.click('.contact_form-card .form_checkbox.is-consent input[type="checkbox"]');
      await page.click('.contact_form-card button[type="submit"]');
      await page.waitForTimeout(500);
      const formSuccess = await page.evaluate(
        `document.body.innerText.toLowerCase().includes('message received')`,
      );
      interactive.classicContactValidationAndSubmit = Boolean(validationShown && formSuccess);

      // Test Statement Contact 5-step wizard
      await page.goto(`${BASE_URL}/statement/contact-statement`, { waitUntil: 'load' });
      await page.fill('#q-name', 'Jordan Reid');
      await page.click('.questionnaire_question:not(.is-pending) .questionnaire_next');
      await page.fill('#q-email', 'jordan@example.com');
      await page.click('.questionnaire_question:not(.is-pending) .questionnaire_next');
      await page.click('.questionnaire_question:not(.is-pending) .questionnaire_next');
      await page.click('.questionnaire_question:not(.is-pending) .questionnaire_next');
      await page.click('.questionnaire_question:not(.is-pending) .questionnaire_next');
      await page.click('.questionnaire_submit .form_checkbox.is-consent input[type="checkbox"]');
      await page.click('.questionnaire_submit button[type="submit"]');
      await page.waitForTimeout(500);
      const wizardDone = await page.evaluate(
        `document.body.innerText.toLowerCase().includes('message received')`,
      );
      interactive.statementWizardComplete = Boolean(wizardDone);

      // Test Booking Flow on Cinematic Contact
      await page.goto(`${BASE_URL}/cinematic/contact-cinematic`, { waitUntil: 'load' });
      await page.click('.booking_form button:has-text("Rami Nassar")');
      await page.fill('#booking-name', 'Samira Al Noor');
      await page.fill('#booking-email', 'sam@example.com');
      await page.click('.booking_form .form_checkbox.is-consent input[type="checkbox"]');
      await page.click('.booking_form button[type="submit"]');
      await page.waitForTimeout(550);
      const bookingDone = await page.evaluate(
        `document.body.innerText.includes('Rami Nassar') && (document.body.innerText.toLowerCase().includes('request received') || document.body.innerText.toLowerCase().includes('demonstration request recorded'))`,
      );
      interactive.bookingFlowConfirm = Boolean(bookingDone);

      // Test Explore Vika tour drawer toggle
      await page.goto(`${BASE_URL}/`, { waitUntil: 'load' });
      await page.click('.tour_toggle');
      await page.waitForTimeout(150);
      const tourOpen = await page.evaluate(
        `document.querySelector('.tour_list')?.classList.contains('is-open') === true`,
      );
      interactive.exploreVikaDrawer = Boolean(tourOpen);

      report.interactiveTests = interactive;
      console.log('Interactive tests:', interactive);

      // 4. Responsive overflow audit across Desktop, Tablet, Mobile
      console.log('Running responsive viewport overflow checks...');
      const viewports = [
        { width: 1920, height: 1080 },
        { width: 1440, height: 900 },
        { width: 1024, height: 768 },
        { width: 768, height: 1024 },
        { width: 390, height: 844 },
        { width: 320, height: 700 },
      ];
      const keyRoutes = ['/', '/services', '/pricing', '/studio', '/contact', '/cinematic/home-cinematic', '/statement/home-statement'];
      const respResults: Array<{ route: string; width: number; overflow: number }> = [];
      for (const vp of viewports) {
        await page.setViewportSize(vp);
        for (const r of keyRoutes) {
          await page.goto(`${BASE_URL}${r}`, { waitUntil: 'load' });
          await page.waitForTimeout(120);
          const overflow = (await page.evaluate(
            `Math.max(0, document.documentElement.scrollWidth - window.innerWidth)`,
          )) as number;
          respResults.push({ route: r, width: vp.width, overflow });
        }
      }
      report.responsiveChecks = respResults;

      // 5. Screenshot captures + Visual Comparison against reference at 1440x900
      console.log('Capturing screenshots & computing pixelmatch comparison...');
      await page.setViewportSize({ width: 1440, height: 900 });
      const comparePairs = [
        { route: '/', out: 'classic-home.png', ref: 'docs/reference/classic/home-1440-full.png' },
        { route: '/studio', out: 'classic-studio.png', ref: 'docs/reference/classic/studio-1440-full.png' },
        { route: '/contact', out: 'classic-contact.png', ref: 'docs/reference/classic/contact-1440-full.png' },
        { route: '/services', out: 'shared-services.png', ref: 'docs/reference/shared/services-1440-full.png' },
        { route: '/pricing', out: 'shared-pricing.png', ref: 'docs/reference/shared/pricing-1440-full.png' },
        { route: '/insights', out: 'shared-insights.png', ref: 'docs/reference/shared/insights-1440-full.png' },
        { route: '/cinematic/home-cinematic', out: 'cinematic-home.png', ref: 'docs/reference/cinematic/cinematic__home-cinematic-1440-full.png' },
        { route: '/statement/home-statement', out: 'statement-home.png', ref: 'docs/reference/statement/statement__home-statement-1440-full.png' },
      ];
      const visualResults = [];
      for (const pair of comparePairs) {
        await page.goto(`${BASE_URL}${pair.route}`, { waitUntil: 'load' });
        await page.evaluate('document.fonts.ready');
        await page.waitForTimeout(450);
        const localFile = path.join(OUT_SCREENSHOT_DIR, pair.out);
        await page.screenshot({ path: localFile, fullPage: true });
        const refFile = path.join(ROOT_DIR, pair.ref);
        const cmp = await computeVisualComparison(localFile, refFile);
        if (cmp) {
          visualResults.push({
            route: pair.route,
            reference: pair.ref,
            local: `docs/testing/screenshots/${pair.out}`,
            matchPercent: cmp.matchPercent,
            diffPixels: cmp.diffPixels,
          });
        }
      }
      report.visualComparisons = visualResults;
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise<void>((resolve) => {
      previewServer.httpServer.close(() => resolve());
    });
  }

  fs.writeFileSync(
    path.join(ROOT_DIR, 'docs/testing/verification-results.json'),
    JSON.stringify(report, null, 2),
  );

  const failedRoutes = (report.routes as RouteCheckResult[]).filter((r) => r.status === 'FAIL');
  const failedResponsive = (report.responsiveChecks as Array<{ route: string; width: number; overflow: number }>).filter(
    (c) => c.overflow > 1,
  );
  const failedInteractive = Object.entries(report.interactiveTests as Record<string, boolean>).filter(
    ([, v]) => !v,
  );

  console.log(`Checked ${ALL_ROUTES.length} routes: ${ALL_ROUTES.length - failedRoutes.length} passed, ${failedRoutes.length} failed.`);
  if (failedRoutes.length > 0) console.log('FAILED ROUTES:', JSON.stringify(failedRoutes, null, 2));
  console.log('Responsive checks:', (report.responsiveChecks as unknown[]).length, 'failures:', failedResponsive.length);
  if (failedResponsive.length > 0) console.log('RESPONSIVE FAILURES:', failedResponsive);
  console.log('Interactive tests:', report.interactiveTests);
  console.log('Visual comparisons (top 3200px crop):', report.visualComparisons);

  if (failedRoutes.length > 0 || failedResponsive.length > 0 || failedInteractive.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
