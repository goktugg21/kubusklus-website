import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, parse } from 'path';

const PROJECTS_DIR = 'public/images/projects';
const DELETE_ORIGINALS = process.argv.includes('--delete-originals');

async function convert() {
  const files = await readdir(PROJECTS_DIR);
  const jpegs = files.filter(f => /\.(jpe?g)$/i.test(f));

  if (jpegs.length === 0) {
    console.log('No JPEGs found.');
    return;
  }

  let totalBefore = 0, totalAfter = 0;

  for (const f of jpegs) {
    const inPath = join(PROJECTS_DIR, f);
    const outPath = join(PROJECTS_DIR, parse(f).name + '.webp');

    const before = (await stat(inPath)).size;
    try {
      await sharp(inPath, { failOn: 'none' })
        .rotate()
        .webp({ quality: 80 })
        .toFile(outPath);
    } catch (err) {
      console.log(`${f.padEnd(45)} FAILED: ${err.message}`);
      continue;
    }
    const after = (await stat(outPath)).size;

    totalBefore += before;
    totalAfter += after;
    const pct = ((1 - after/before) * 100).toFixed(1);
    console.log(`${f.padEnd(45)} ${(before/1024).toFixed(0).padStart(7)} KB -> ${(after/1024).toFixed(0).padStart(7)} KB  (-${pct}%)`);

    if (DELETE_ORIGINALS) {
      await unlink(inPath);
    }
  }

  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)} MB -> ${(totalAfter/1024/1024).toFixed(1)} MB (saved ${((1 - totalAfter/totalBefore)*100).toFixed(1)}%)`);
  if (DELETE_ORIGINALS) {
    console.log('Original JPEGs deleted.');
  } else {
    console.log('Originals kept. Re-run with --delete-originals to remove them after verifying refs.');
  }
}

convert().catch(e => { console.error(e); process.exit(1); });
