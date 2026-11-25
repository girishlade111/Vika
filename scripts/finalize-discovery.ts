import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://vika-template.webflow.io';
const RAW_DIR = path.resolve('docs/research/raw-html');
const OUT_RESEARCH = path.resolve('docs/research');
const OUT_REF = path.resolve('docs/reference');

function safeNameToRoute(file: string): string {
  const base = file.replace(/\.html$/, '');
  if (base === 'home') return '/';
  return '/' + base.replace(/__/g, '/');
}

function classifyLayout(p: string): 'classic' | 'cinematic' | 'statement' | 'shared' {
  if (p.startsWith('/cinematic/')) return 'cinematic';
  if (p.startsWith('/statement/')) return 'statement';
  if (p === '/' || p === '/studio' || p === '/contact') return 'classic';
  return 'shared';
}

async function main() {
  const files = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.html'));
  const assetsMap = new Map<string, any>();
  const routes: any[] = [];

  for (const file of files) {
    const html = fs.readFileSync(path.join(RAW_DIR, file), 'utf8');
    const routePath = safeNameToRoute(file);
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '';
    const desc = html.match(/<meta\s+content="([^"]*)"\s+name="description"/i)?.[1] || '';
    const links = Array.from(
      new Set(
        Array.from(html.matchAll(/href="(\/[^"#?]*)"/gi)).map((m) => m[1])
      )
    );

    const imgMatches = Array.from(html.matchAll(/<img\b[^>]*>/gi));
    for (const m of imgMatches) {
      const tag = m[0];
      const src = tag.match(/\bsrc="([^"]+)"/i)?.[1] || '';
      const alt = tag.match(/\balt="([^"]*)"/i)?.[1] || '';
      const cls = tag.match(/\bclass="([^"]*)"/i)?.[1] || '';
      if (!src || src.startsWith('data:')) continue;
      if (assetsMap.has(src)) {
        const ex = assetsMap.get(src);
        if (!ex.routes.includes(routePath)) ex.routes.push(routePath);
      } else {
        assetsMap.set(src, {
          url: src,
          route: routePath,
          routes: [routePath],
          tag: 'img',
          className: cls,
          alt,
          width: 0,
          height: 0,
          naturalWidth: 0,
          naturalHeight: 0,
        });
      }
      // Also capture srcset URLs if any
      const srcset = tag.match(/\bsrcset="([^"]*)"/i)?.[1] || '';
      if (srcset) {
        for (const part of srcset.split(',')) {
          const u = part.trim().split(/\s+/)[0];
          if (u && u.startsWith('http') && !assetsMap.has(u)) {
            assetsMap.set(u, {
              url: u,
              route: routePath,
              routes: [routePath],
              tag: 'img-srcset',
              className: cls,
              alt,
              width: 0,
              height: 0,
              naturalWidth: 0,
              naturalHeight: 0,
            });
          }
        }
      }
    }

    const vidMatches = Array.from(html.matchAll(/<source\b[^>]*src="([^"]+)"[^>]*>/gi));
    for (const m of vidMatches) {
      const src = decodeURIComponent(m[1]).replace(/&amp;/g, '&');
      if (src.startsWith('http') && !assetsMap.has(src)) {
        assetsMap.set(src, {
          url: src,
          route: routePath,
          routes: [routePath],
          tag: 'video',
          className: 'background-video',
          alt: '',
          width: 0,
          height: 0,
          naturalWidth: 0,
          naturalHeight: 0,
        });
      }
    }

    const linkIcons = Array.from(html.matchAll(/<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*href="([^"]+)"/gi));
    for (const m of linkIcons) {
      const src = m[1];
      if (src.startsWith('http') && !assetsMap.has(src)) {
        assetsMap.set(src, {
          url: src,
          route: routePath,
          routes: [routePath],
          tag: 'favicon',
          className: 'favicon',
          alt: 'favicon',
          width: 0,
          height: 0,
          naturalWidth: 0,
          naturalHeight: 0,
        });
      }
    }

    routes.push({
      url: `${BASE_URL}${routePath}`,
      path: routePath,
      title,
      description: desc,
      layoutFamily: classifyLayout(routePath),
      links,
    });
  }

  // Browser audit for computed styles, fonts, video network URLs, and pricing/calendar screenshots
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const fonts = new Set<string>();
  const videos = new Set<string>();

  page.on('response', (res) => {
    const u = res.url();
    const ct = res.headers()['content-type'] || '';
    if (ct.includes('font') || /\.(woff2?|ttf|otf)(\?|$)/i.test(u)) fonts.add(u);
    if (ct.includes('video') || /\.(mp4|webm)(\?|$)/i.test(u)) videos.add(u);
  });

  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  const computedHome = await page.evaluate(`(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        padding: cs.padding,
        borderRadius: cs.borderRadius,
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    };
    return {
      body: pick('body'),
      navbar: pick('.navbar_component'),
      navbarLogo: pick('.navbar_logo'),
      h1Display: pick('.heading-style-display, h1'),
      h2: pick('.heading-style-h2, h2'),
      h3: pick('.heading-style-h3, h3'),
      label: pick('.text-style-label'),
      button: pick('.button'),
      paddingGlobal: pick('.padding-global'),
      gridGlobal: pick('.grid-global'),
      footerBox: pick('.footer_box'),
      footerWord: pick('.footer_word'),
      navbarPill: pick('.navbar_pill'),
      tourToggle: pick('.tour_toggle'),
    };
  })()`);

  // Check cinematic video
  await page.goto(`${BASE_URL}/cinematic/home-cinematic`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Check pricing tabs (GBP, Yearly, Projects)
  await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.click('text=GBP').catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_REF, 'interactions', 'pricing-gbp-monthly.png'), fullPage: false }).catch(() => {});
  await page.click('text=Yearly').catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_REF, 'interactions', 'pricing-gbp-yearly.png'), fullPage: false }).catch(() => {});

  // Check calendar UK tab on home
  await page.goto(`${BASE_URL}/#calendar`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.click('.section-home-calendar >> text=UK').catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_REF, 'interactions', 'calendar-uk-active.png'), fullPage: false }).catch(() => {});

  // Mobile 390x844 captures for Classic, Cinematic, Statement home
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [r, name] of [
    ['/', 'classic-home-390-mobile.png'],
    ['/cinematic/home-cinematic', 'cinematic-home-390-mobile.png'],
    ['/statement/home-statement', 'statement-home-390-mobile.png'],
  ]) {
    await page.goto(`${BASE_URL}${r}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_REF, 'interactions', name), fullPage: true }).catch(() => {});
  }

  await browser.close();

  fs.writeFileSync(path.join(OUT_RESEARCH, 'discovered-routes.json'), JSON.stringify(routes, null, 2));
  fs.writeFileSync(path.join(OUT_RESEARCH, 'discovered-assets.json'), JSON.stringify(Array.from(assetsMap.values()), null, 2));
  fs.writeFileSync(path.join(OUT_RESEARCH, 'network-media.json'), JSON.stringify({ fonts: Array.from(fonts), videos: Array.from(videos), css: [] }, null, 2));
  fs.writeFileSync(path.join(OUT_RESEARCH, 'computed-style-audit.json'), JSON.stringify(computedHome, null, 2));

  console.log(`Finalized discovery: ${routes.length} routes, ${assetsMap.size} assets, ${fonts.size} fonts, ${videos.size} videos.`);
}

main().catch(console.error);
