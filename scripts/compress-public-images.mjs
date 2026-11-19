/**
 * Compress static images under website/public (in place, same paths).
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT =
  process.env.WEBSITE_PUBLIC ||
  "/Users/msvishwanath/Developer/intecai/urban-living/project-urban-living-website/public";

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (IMAGE_EXT.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

async function compressFile(file) {
  const stat = await fs.stat(file);
  if (stat.size < 80_000) return { skipped: true, file, oldSize: stat.size };

  const ext = path.extname(file).toLowerCase();
  const input = await fs.readFile(file);
  const meta = await sharp(input).metadata();
  let pipeline = sharp(input).rotate();
  const maxWidth = ext === ".png" ? 1600 : 1920;
  if ((meta.width || 0) > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  let body;
  if (ext === ".jpg" || ext === ".jpeg") {
    body = await pipeline
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toBuffer();
  } else if (ext === ".webp") {
    body = await pipeline.webp({ quality: 78 }).toBuffer();
  } else {
    body = await pipeline
      .png({ quality: 70, compressionLevel: 9, palette: true, effort: 10 })
      .toBuffer();
  }

  if (body.length >= stat.size * 0.97) {
    return { skipped: true, file, oldSize: stat.size, newSize: body.length };
  }
  await fs.writeFile(file, body);
  return { skipped: false, file, oldSize: stat.size, newSize: body.length };
}

const files = await walk(ROOT);
let saved = 0;
for (const f of files) {
  const r = await compressFile(f);
  if (!r.skipped) {
    saved += r.oldSize - r.newSize;
    console.log(
      `${path.relative(ROOT, f)}: ${(r.oldSize / 1024).toFixed(0)}KB -> ${(r.newSize / 1024).toFixed(0)}KB`,
    );
  }
}
console.log(`Static images done. saved=${(saved / 1024 / 1024).toFixed(2)}MB`);