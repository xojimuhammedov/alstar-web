// Converts the source images in assets-src/ into responsive WebP files in
// public/images/ and writes src/config/image-manifest.json (widths + intrinsic
// size, used for srcset and width/height attributes to avoid layout shift).
// Also generates the Open Graph image and the PNG app icons.
import sharp from 'sharp';
import { mkdir, readdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'assets-src');
const outDir = path.join(root, 'public/images');
const manifestPath = path.join(root, 'src/config/image-manifest.json');

// Target widths per image group (never upscaled past the source width).
const widthsFor = (name) => {
  if (name === 'hero-facade') return [828, 1280, 1672];
  if (name === 'why-facility') return [800, 1280, 1672];
  if (name.startsWith('product-')) return [560, 840];
  if (name === 'cta-bg') return [1200];
  if (name.startsWith('finish-')) return [420, 648];
  if (name === 'project-commercial') return [880, 1200];
  if (name.startsWith('project-')) return [520, 996];
  if (name === 'news-acp') return [800, 1200];
  if (name.startsWith('news-')) return [220];
  if (name.startsWith('tech-')) return [256];
  return [1200];
};

await mkdir(outDir, { recursive: true });
const manifest = {};

for (const file of (await readdir(srcDir)).sort()) {
  if (!/\.(png|webp|jpe?g)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, '');
  const input = path.join(srcDir, file);
  const meta = await sharp(input).metadata();
  const widths = [...new Set(widthsFor(name).map((w) => Math.min(w, meta.width)))];
  for (const w of widths) {
    await sharp(input).resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(path.join(outDir, `${name}-${w}.webp`));
  }
  manifest[name] = { widths, width: meta.width, height: meta.height };
  console.log(`${name}: ${widths.join(', ')}`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

// Open Graph / social preview image (1200×630) built from the hero visual.
const ogText = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#060708" stop-opacity=".92"/><stop offset=".55" stop-color="#060708" stop-opacity=".45"/><stop offset="1" stop-color="#060708" stop-opacity=".05"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="64" y="470" width="56" height="4" fill="#e3262e"/>
  <text x="64" y="150" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#e3262e">ALSTAR</text>
  <text x="66" y="182" font-family="Helvetica, Arial, sans-serif" font-size="16" letter-spacing="3" fill="#9a9b9e">ALUMINIUM COMPOSITE PANEL</text>
  <text x="64" y="320" font-family="Helvetica, Arial, sans-serif" font-size="72" font-weight="800" fill="#f5f4f1">BUILT TO INSPIRE.</text>
  <text x="64" y="400" font-family="Helvetica, Arial, sans-serif" font-size="72" font-weight="800" fill="#f5f4f1">ENGINEERED TO PROTECT.</text>
  <text x="64" y="530" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#d4d3d0">PE · B1 / FR-B1 · A2 / FR-A2 — architectural façade panels</text>
</svg>`);
await sharp(path.join(srcDir, 'hero-facade.png'))
  .resize(1200, 630, { fit: 'cover', position: 'right' })
  .composite([{ input: ogText }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'));

// App icons rendered from the SVG favicon.
const favicon = await readFile(path.join(root, 'public/favicon.svg'));
for (const [size, file] of [[180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
  await sharp(favicon, { density: 600 }).resize(size, size).png().toFile(path.join(root, 'public', file));
}

console.log('Done → public/images, public/og-image.jpg, app icons, src/config/image-manifest.json');
