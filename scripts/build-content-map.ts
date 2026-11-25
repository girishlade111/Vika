import fs from 'node:fs';
import path from 'node:path';

const RAW_DIR = path.resolve('docs/research/raw-html');
const MANIFEST_PATH = path.resolve('docs/research/asset-manifest.json');
const OUT_PATH = path.resolve('docs/research/all-content-map.json');

const manifest: any[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const urlToLocal: Record<string, string> = {};
for (const m of manifest) {
  if (m.localPath) {
    urlToLocal[m.sourceUrl] = m.localPath;
    // Also map decoded URL
    try {
      urlToLocal[decodeURIComponent(m.sourceUrl)] = m.localPath;
    } catch {}
  }
}

fs.writeFileSync(
  path.resolve('docs/research/url-to-local.json'),
  JSON.stringify(urlToLocal, null, 2),
  'utf8'
);

// Extract key collections cleanly for TypeScript data authoring
function extractMainTextBlocks(file: string) {
  const html = fs.readFileSync(path.join(RAW_DIR, file), 'utf8');
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
  const imgs = Array.from(main.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/gi)).map((m) => ({
    src: m[1],
    local: urlToLocal[m[1]] || m[1],
    alt: m[0].match(/\balt="([^"]*)"/i)?.[1] || '',
  }));
  const cleanText = main
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<\/(p|h1|h2|h3|h4|li|div|section|header|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();
  return { imgs, text: cleanText };
}

const files = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.html')).sort();
const result: Record<string, any> = {};
for (const f of files) {
  result[f] = extractMainTextBlocks(f);
}
fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), 'utf8');
console.log(`Mapped ${Object.keys(urlToLocal).length} URLs and extracted ${files.length} pages.`);
