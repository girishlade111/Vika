import { chromium, type Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const BASE_URL = 'https://vika-template.webflow.io';

const SEED_ROUTES = [
  '/',
  '/cinematic/home-cinematic',
  '/statement/home-statement',
  '/services',
  '/studio',
  '/cinematic/studio-cinematic',
  '/statement/studio-statement',
  '/team',
  '/insights',
  '/case-studies',
  '/pricing',
  '/contact',
  '/cinematic/contact-cinematic',
  '/statement/contact-statement',
  '/overview',
  '/style-guide',
  '/instructions',
  '/licenses',
  '/changelog',
  '/privacy-policy',
  '/401',
  '/404',
];

const OUT_RESEARCH = path.resolve('docs/research');
const OUT_REF = path.resolve('docs/reference');
const OUT_RAW_HTML = path.resolve('docs/research/raw-html');

for (const dir of [
  OUT_RESEARCH,
  OUT_REF,
  OUT_RAW_HTML,
  path.join(OUT_REF, 'classic'),
  path.join(OUT_REF, 'cinematic'),
  path.join(OUT_REF, 'statement'),
  path.join(OUT_REF, 'shared'),
  path.join(OUT_REF, 'interactions'),
  path.join(OUT_REF, 'measurements'),
]) {
  fs.mkdirSync(dir, { recursive: true });
}

interface DiscoveredRoute {
  url: string;
  path: string;
  title: string;
  description: string;
  layoutFamily: 'classic' | 'cinematic' | 'statement' | 'shared';
  links: string[];
  sections: { tag: string; className: string; id: string; heading?: string }[];
  inlineScripts: string[];
  hasVideo: boolean;
  status: number;
}

interface DiscoveredAsset {
  url: string;
  route: string;
  tag: string;
  className: string;
  alt: string;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  mimeType?: string;
}

function classifyLayout(p: string): 'classic' | 'cinematic' | 'statement' | 'shared' {
  if (p.startsWith('/cinematic/')) return 'cinematic';
  if (p.startsWith('/statement/')) return 'statement';
  if (p === '/' || p === '/studio' || p === '/contact') return 'classic';
  return 'shared';
}

function routeToSafeName(p: string): string {
  if (p === '/') return 'home';
  return p.replace(/^\//, '').replace(/\//g, '__');
}

async function waitForReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.slice(0, 20).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((res) => {
              img.addEventListener('load', () => res(), { once: true });
              img.addEventListener('error', () => res(), { once: true });
              setTimeout(res, 2500);
            })
      )
    );
  });
  await page.waitForTimeout(800);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const visited = new Set<string>();
  const queue: string[] = [...SEED_ROUTES];
  const routes: DiscoveredRoute[] = [];
  const assetsMap = new Map<string, DiscoveredAsset & { routes: string[] }>();
  const networkFonts = new Set<string>();
  const networkVideos = new Set<string>();
  const networkCss = new Set<string>();

  page.on('response', (res) => {
    const url = res.url();
    const ct = res.headers()['content-type'] || '';
    if (ct.includes('font') || /\.(woff2?|ttf|otf)(\?|$)/i.test(url)) {
      networkFonts.add(url);
    }
    if (ct.includes('video') || /\.(mp4|webm|m3u8)(\?|$)/i.test(url)) {
      networkVideos.add(url);
    }
    if (ct.includes('text/css') || /\.css(\?|$)/i.test(url)) {
      networkCss.add(url);
    }
  });

  while (queue.length > 0) {
    const routePath = queue.shift()!;
    const cleanPath = routePath.split('#')[0].split('?')[0] || '/';
    if (visited.has(cleanPath)) continue;
    visited.add(cleanPath);

    const fullUrl = `${BASE_URL}${cleanPath}`;
    console.log(`Visiting: ${fullUrl}`);
    let status = 200;
    try {
      const resp = await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      status = resp?.status() ?? 200;
      await waitForReady(page);
    } catch (err) {
      console.error(`Error loading ${fullUrl}:`, err);
      continue;
    }

    // Scroll once to trigger lazy loading & ScrollTrigger
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const title = document.title;
      const desc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const anchors = Array.from(document.querySelectorAll('a[href]'))
        .map((a) => a.getAttribute('href') || '')
        .filter((href) => href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#'));

      const sections = Array.from(document.querySelectorAll('main > section, main > div > section, main section')).map(
        (s) => ({
          tag: s.tagName.toLowerCase(),
          className: s.className,
          id: s.id,
          heading: s.querySelector('h1, h2, h3')?.textContent?.trim().slice(0, 120),
        })
      );

      const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'))
        .map((s) => s.textContent || '')
        .filter((t) => t.trim().length > 0);

      const imgs = Array.from(document.querySelectorAll('img')).map((img) => {
        const rect = img.getBoundingClientRect();
        return {
          url: img.currentSrc || img.src || img.getAttribute('src') || '',
          tag: 'img',
          className: img.className,
          alt: img.alt,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        };
      });

      const videos = Array.from(document.querySelectorAll('video')).map((v) => {
        const rect = v.getBoundingClientRect();
        const src = v.currentSrc || v.src || v.querySelector('source')?.getAttribute('src') || '';
        return {
          url: src,
          poster: v.poster || '',
          tag: 'video',
          className: v.className,
          alt: '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          naturalWidth: v.videoWidth,
          naturalHeight: v.videoHeight,
        };
      });

      return {
        title,
        desc,
        anchors: Array.from(new Set(anchors)),
        sections,
        inlineScripts,
        imgs,
        videos,
        html: document.documentElement.outerHTML,
      };
    });

    // Save raw HTML for deeper text/structure extraction
    const safeName = routeToSafeName(cleanPath);
    fs.writeFileSync(path.join(OUT_RAW_HTML, `${safeName}.html`), data.html, 'utf8');

    // Enqueue newly discovered internal links
    for (const link of data.anchors) {
      const normalized = link.split('#')[0].split('?')[0] || '/';
      if (!visited.has(normalized) && !queue.includes(normalized)) {
        queue.push(normalized);
      }
    }

    // Store assets
    for (const img of data.imgs) {
      if (!img.url) continue;
      const existing = assetsMap.get(img.url);
      if (existing) {
        if (!existing.routes.includes(cleanPath)) existing.routes.push(cleanPath);
      } else {
        assetsMap.set(img.url, { ...img, route: cleanPath, routes: [cleanPath] });
      }
    }
    for (const v of data.videos) {
      if (v.url) {
        const existing = assetsMap.get(v.url);
        if (!existing) assetsMap.set(v.url, { ...v, route: cleanPath, routes: [cleanPath] });
      }
      if (v.poster) {
        const existing = assetsMap.get(v.poster);
        if (!existing) {
          assetsMap.set(v.poster, {
            url: v.poster,
            route: cleanPath,
            routes: [cleanPath],
            tag: 'video-poster',
            className: v.className,
            alt: 'video poster',
            width: v.width,
            height: v.height,
            naturalWidth: 0,
            naturalHeight: 0,
          });
        }
      }
    }

    const layoutFamily = classifyLayout(cleanPath);
    routes.push({
      url: fullUrl,
      path: cleanPath,
      title: data.title,
      description: data.desc,
      layoutFamily,
      links: data.anchors,
      sections: data.sections,
      inlineScripts: data.inlineScripts,
      hasVideo: data.videos.length > 0,
      status,
    });

    // Capture key reference screenshots at 1440x900
    const shouldShot =
      SEED_ROUTES.includes(cleanPath) ||
      routes.length <= 28;
    if (shouldShot) {
      const folder = layoutFamily;
      const shotPath = path.join(OUT_REF, folder, `${safeName}-1440-full.png`);
      await page.screenshot({ path: shotPath, fullPage: true }).catch(() => {});
      const heroPath = path.join(OUT_REF, folder, `${safeName}-1440-hero.png`);
      await page.screenshot({ path: heroPath, fullPage: false }).catch(() => {});
    }
  }

  // Also capture interactive states on key pages
  console.log('Capturing interactive states...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' }).catch(() => {});
  await waitForReady(page);
  // Open menu
  await page.click('.navbar_menu-button').catch(() => {});
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_REF, 'interactions', 'navigation-fullscreen-open.png') }).catch(() => {});
  await page.click('.navbar_close-button').catch(() => {});
  await page.waitForTimeout(600);

  // Open Explore Vika
  await page.click('.tour_toggle').catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_REF, 'interactions', 'explore-vika-expanded.png') }).catch(() => {});
  await page.click('.tour_toggle').catch(() => {});

  // Scroll to show floating pill
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_REF, 'interactions', 'floating-pill-visible.png') }).catch(() => {});

  // Pricing page interactions
  await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' }).catch(() => {});
  await waitForReady(page);
  await page.screenshot({ path: path.join(OUT_REF, 'interactions', 'pricing-initial.png'), fullPage: true }).catch(() => {});

  // Capture CSS & computed style tokens from /style-guide and /
  await page.goto(`${BASE_URL}/style-guide`, { waitUntil: 'networkidle' }).catch(() => {});
  await waitForReady(page);
  const styleAudit = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const vars: Record<string, string> = {};
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rule instanceof CSSStyleRule && (rule.selectorText === ':root' || rule.selectorText === 'body')) {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i];
              if (prop.startsWith('--')) {
                vars[prop] = rule.style.getPropertyValue(prop).trim();
              }
            }
          }
        }
      } catch {
        // cross-origin stylesheet
      }
    }
    const sample = (sel: string) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
      };
    };
    return {
      vars,
      body: {
        fontFamily: bodyStyle.fontFamily,
        fontSize: bodyStyle.fontSize,
        lineHeight: bodyStyle.lineHeight,
        color: bodyStyle.color,
        backgroundColor: bodyStyle.backgroundColor,
      },
      h1: sample('.heading-style-display, h1'),
      h2: sample('.heading-style-h2, h2'),
      h3: sample('.heading-style-h3, h3'),
      label: sample('.text-style-label'),
      button: sample('.button'),
      container: (() => {
        const el = document.querySelector('.padding-global, .grid-global');
        if (!el) return null;
        const cs = getComputedStyle(el);
        return {
          maxWidth: cs.maxWidth,
          paddingLeft: cs.paddingLeft,
          paddingRight: cs.paddingRight,
          gap: cs.gap,
          gridTemplateColumns: cs.gridTemplateColumns,
        };
      })(),
    };
  });

  // Fetch external CSS text so we can inspect exact CSS rules and variables!
  const cssTexts: { url: string; content: string }[] = [];
  for (const cssUrl of networkCss) {
    try {
      const res = await fetch(cssUrl);
      if (res.ok) {
        const text = await res.text();
        cssTexts.push({ url: cssUrl, content: text });
      }
    } catch {}
  }

  fs.writeFileSync(
    path.join(OUT_RESEARCH, 'discovered-routes.json'),
    JSON.stringify(routes, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUT_RESEARCH, 'discovered-assets.json'),
    JSON.stringify(Array.from(assetsMap.values()), null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUT_RESEARCH, 'network-media.json'),
    JSON.stringify(
      {
        fonts: Array.from(networkFonts),
        videos: Array.from(networkVideos),
        css: Array.from(networkCss),
      },
      null,
      2
    ),
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUT_RESEARCH, 'computed-style-audit.json'),
    JSON.stringify(styleAudit, null, 2),
    'utf8'
  );
  if (cssTexts.length > 0) {
    fs.writeFileSync(
      path.join(OUT_RESEARCH, 'reference-stylesheet.css'),
      cssTexts.map((c) => `/* ${c.url} */\n${c.content}`).join('\n\n'),
      'utf8'
    );
  }

  console.log(`Discovery complete! Routes: ${routes.length}, Assets: ${assetsMap.size}`);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
