import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const RESEARCH_DIR = path.resolve('docs/research');
const ASSETS_ROOT = path.resolve('public/assets');

interface RawAsset {
  url: string;
  route: string;
  routes: string[];
  tag: string;
  className: string;
  alt: string;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
}

interface AssetRecord {
  id: string;
  sourceUrl: string;
  referenceRoute: string;
  allRoutes: string[];
  layoutFamily: string;
  component: string;
  mediaType: 'image' | 'video' | 'svg' | 'font' | 'other';
  mimeType: string;
  originalFilename: string;
  originalWidth: number;
  originalHeight: number;
  displayWidth: number;
  displayHeight: number;
  aspectRatio: string;
  objectFit: string;
  objectPosition: string;
  hasTransparency: boolean;
  localPath: string;
  licenseStatus: string;
  acquisitionStatus: 'acquired' | 'deduplicated' | 'failed';
  sha256: string;
  optimizedVariants: string[];
  notes: string;
}

function classifyFolder(asset: RawAsset): string {
  const fn = asset.url.toLowerCase();
  const cls = (asset.className || '').toLowerCase();
  if (fn.endsWith('.svg') || cls.includes('logo') || cls.includes('wordmark')) return 'brand';
  if (cls.includes('people') || cls.includes('team') || cls.includes('person') || cls.includes('avatar') || fn.includes('person') || fn.includes('partner')) return 'images/people';
  if (cls.includes('service') || fn.includes('service')) return 'images/services';
  if (cls.includes('case') || fn.includes('case')) return 'images/case-studies';
  if (cls.includes('insight') || cls.includes('article') || fn.includes('insight')) return 'images/insights';
  if (cls.includes('office') || fn.includes('dubai') || fn.includes('london') || fn.includes('studio')) return 'images/studio';
  if (cls.includes('hero') || cls.includes('cinematic')) return 'images/hero';
  return 'images/shared';
}

function classifyLayout(routes: string[]): string {
  if (routes.some((r) => r.startsWith('/cinematic/'))) return 'cinematic';
  if (routes.some((r) => r.startsWith('/statement/'))) return 'statement';
  if (routes.some((r) => r === '/' || r === '/studio' || r === '/contact')) return 'classic';
  return 'shared';
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function formatRatio(w: number, h: number): string {
  if (!w || !h) return 'unknown';
  const g = gcd(w, h);
  return `${Math.round(w / g)}:${Math.round(h / g)}`;
}

async function main() {
  const discoveredPath = path.join(RESEARCH_DIR, 'discovered-assets.json');
  const networkPath = path.join(RESEARCH_DIR, 'network-media.json');
  const cssPath = path.join(RESEARCH_DIR, 'reference-stylesheet.css');

  const rawAssets: RawAsset[] = JSON.parse(fs.readFileSync(discoveredPath, 'utf8'));
  const networkMedia: { fonts: string[]; videos: string[]; css: string[] } = JSON.parse(
    fs.readFileSync(networkPath, 'utf8')
  );

  // Also parse url(...) from CSS for fonts/images
  const cssUrls = new Set<string>();
  if (fs.existsSync(cssPath)) {
    const cssText = fs.readFileSync(cssPath, 'utf8');
    const matches = cssText.matchAll(/url\(["']?(https?:\/\/[^)"']+)["']?\)/g);
    for (const m of matches) {
      cssUrls.add(m[1]);
    }
  }

  for (const fontUrl of [...networkMedia.fonts, ...cssUrls]) {
    if (!rawAssets.some((a) => a.url === fontUrl)) {
      rawAssets.push({
        url: fontUrl,
        route: '/style-guide',
        routes: ['/style-guide'],
        tag: /\.(woff2?|ttf|otf)/i.test(fontUrl) ? 'font' : 'css-media',
        className: 'css-asset',
        alt: '',
        width: 0,
        height: 0,
        naturalWidth: 0,
        naturalHeight: 0,
      });
    }
  }

  for (const vidUrl of networkMedia.videos) {
    if (!rawAssets.some((a) => a.url === vidUrl)) {
      rawAssets.push({
        url: vidUrl,
        route: '/cinematic/home-cinematic',
        routes: ['/cinematic/home-cinematic'],
        tag: 'video',
        className: 'network-video',
        alt: '',
        width: 0,
        height: 0,
        naturalWidth: 0,
        naturalHeight: 0,
      });
    }
  }

  const shaToPath = new Map<string, string>();
  const manifest: AssetRecord[] = [];
  let idx = 1;

  for (const asset of rawAssets) {
    if (!asset.url.startsWith('http')) continue;
    const urlObj = new URL(asset.url);
    const origFilename = decodeURIComponent(path.basename(urlObj.pathname));
    const isFont = asset.tag === 'font' || /\.(woff2?|ttf|otf)(\?|$)/i.test(asset.url);
    const isVideo = asset.tag === 'video' || /\.(mp4|webm)(\?|$)/i.test(asset.url);
    const isSvg = origFilename.toLowerCase().endsWith('.svg');

    let folder = isFont ? 'fonts' : isVideo ? 'videos/shared' : classifyFolder(asset);
    const targetDir = path.join(ASSETS_ROOT, folder);
    fs.mkdirSync(targetDir, { recursive: true });

    const safeFilename = origFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const targetFile = path.join(targetDir, safeFilename);
    const publicRel = `/assets/${folder}/${safeFilename}`;

    try {
      const res = await fetch(asset.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/html')) throw new Error('Unexpected HTML response');
      const buf = Buffer.from(await res.arrayBuffer());
      const sha256 = crypto.createHash('sha256').update(buf).digest('hex');

      if (shaToPath.has(sha256)) {
        const existingLocal = shaToPath.get(sha256)!;
        manifest.push({
          id: `asset-${String(idx++).padStart(3, '0')}`,
          sourceUrl: asset.url,
          referenceRoute: asset.route,
          allRoutes: asset.routes,
          layoutFamily: classifyLayout(asset.routes),
          component: asset.className || asset.tag,
          mediaType: isFont ? 'font' : isVideo ? 'video' : isSvg ? 'svg' : 'image',
          mimeType: contentType,
          originalFilename: origFilename,
          originalWidth: asset.naturalWidth,
          originalHeight: asset.naturalHeight,
          displayWidth: asset.width,
          displayHeight: asset.height,
          aspectRatio: formatRatio(asset.naturalWidth, asset.naturalHeight),
          objectFit: 'cover',
          objectPosition: 'center',
          hasTransparency: false,
          localPath: existingLocal,
          licenseStatus: 'reference-template-preview-requires-license-review',
          acquisitionStatus: 'deduplicated',
          sha256,
          optimizedVariants: [],
          notes: `Deduplicated binary matching ${existingLocal}`,
        });
        continue;
      }

      fs.writeFileSync(targetFile, buf);
      shaToPath.set(sha256, publicRel);

      let width = asset.naturalWidth;
      let height = asset.naturalHeight;
      let hasTransparency = false;

      if (!isFont && !isVideo && !isSvg) {
        try {
          const meta = await sharp(buf).metadata();
          width = meta.width || width;
          height = meta.height || height;
          hasTransparency = Boolean(meta.hasAlpha);
        } catch {}
      }

      manifest.push({
        id: `asset-${String(idx++).padStart(3, '0')}`,
        sourceUrl: asset.url,
        referenceRoute: asset.route,
        allRoutes: asset.routes,
        layoutFamily: classifyLayout(asset.routes),
        component: asset.className || asset.tag,
        mediaType: isFont ? 'font' : isVideo ? 'video' : isSvg ? 'svg' : 'image',
        mimeType: contentType,
        originalFilename: origFilename,
        originalWidth: width,
        originalHeight: height,
        displayWidth: asset.width,
        displayHeight: asset.height,
        aspectRatio: formatRatio(width, height),
        objectFit: 'cover',
        objectPosition: 'center',
        hasTransparency,
        localPath: publicRel,
        licenseStatus: 'reference-template-preview-requires-license-review',
        acquisitionStatus: 'acquired',
        sha256,
        optimizedVariants: [],
        notes: 'Acquired from public reference preview for faithful reconstruction',
      });
    } catch (err: any) {
      manifest.push({
        id: `asset-${String(idx++).padStart(3, '0')}`,
        sourceUrl: asset.url,
        referenceRoute: asset.route,
        allRoutes: asset.routes,
        layoutFamily: classifyLayout(asset.routes),
        component: asset.className || asset.tag,
        mediaType: isFont ? 'font' : isVideo ? 'video' : isSvg ? 'svg' : 'image',
        mimeType: '',
        originalFilename: origFilename,
        originalWidth: asset.naturalWidth,
        originalHeight: asset.naturalHeight,
        displayWidth: asset.width,
        displayHeight: asset.height,
        aspectRatio: 'unknown',
        objectFit: 'cover',
        objectPosition: 'center',
        hasTransparency: false,
        localPath: '',
        licenseStatus: 'unavailable',
        acquisitionStatus: 'failed',
        sha256: '',
        optimizedVariants: [],
        notes: err?.message || 'Download failed',
      });
    }
  }

  fs.writeFileSync(
    path.join(RESEARCH_DIR, 'asset-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  console.log(`Processed ${manifest.length} assets. Unique files: ${shaToPath.size}`);
}

main().catch(console.error);
