import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const RAW_DIR = path.resolve('docs/research/raw-html');
const OUT_DIR = path.resolve('docs/research/parsed');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const files = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.html'));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const file of files) {
    const html = fs.readFileSync(path.join(RAW_DIR, file), 'utf8');
    // strip external scripts so setContent doesn't wait on network
    const cleanHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    await page.setContent(cleanHtml, { waitUntil: 'domcontentloaded' });

    const summary = await page.evaluate(() => {
      const main = document.querySelector('main') || document.body;
      const sections = Array.from(main.querySelectorAll(':scope > section, :scope > div > section')).map((sec, idx) => {
        const texts = Array.from(sec.querySelectorAll('h1,h2,h3,h4,p,a,button,li,th,td,label,span'))
          .filter((el) => {
            // only leaf-ish or block text
            return el.children.length === 0 || ['H1','H2','H3','H4','P','A','BUTTON','LI','TD','TH'].includes(el.tagName);
          })
          .map((el) => ({
            tag: el.tagName.toLowerCase(),
            cls: el.className,
            href: el.getAttribute('href') || undefined,
            text: el.textContent?.replace(/\s+/g, ' ').trim(),
          }))
          .filter((t) => t.text && t.text.length > 0);
        const imgs = Array.from(sec.querySelectorAll('img')).map((img) => ({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt'),
          cls: img.className,
        }));
        const videos = Array.from(sec.querySelectorAll('video')).map((v) => ({
          src: v.getAttribute('src') || v.querySelector('source')?.getAttribute('src'),
          poster: v.getAttribute('poster'),
          cls: v.className,
        }));
        return {
          index: idx + 1,
          className: sec.className,
          id: sec.id,
          texts,
          imgs,
          videos,
        };
      });
      return {
        title: document.title,
        sectionCount: sections.length,
        sections,
      };
    });

    // Also extract inline scripts with regex from original html
    const scripts = Array.from(html.matchAll(/<!--([\s\S]*?)-->\s*<script>([\s\S]*?)<\/script>/gi)).map((m) => ({
      comment: m[1].trim(),
      code: m[2].trim(),
    }));

    fs.writeFileSync(
      path.join(OUT_DIR, file.replace('.html', '.json')),
      JSON.stringify({ ...summary, scripts }, null, 2),
      'utf8'
    );
  }

  await browser.close();
  console.log(`Parsed ${files.length} HTML files into docs/research/parsed`);
}

main().catch(console.error);
