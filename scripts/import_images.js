#!/usr/bin/env node
/*
  Simple helper to map uploaded images into placeholder locations based on a JSON mapping file.
  Usage: node scripts/import_images.js path/to/images-map.json
  The mapping file should be an array of objects with `filename` and `targetPath` or `target` fields.
*/
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const uploadsDir = path.join(repoRoot, 'public', 'images', 'uploads');

function usage() {
  console.log('Usage: node scripts/import_images.js path/to/images-map.json');
}

async function main() {
  const mapPath = process.argv[2];
  if (!mapPath) {
    usage();
    process.exit(1);
  }

  const absMap = path.isAbsolute(mapPath) ? mapPath : path.join(process.cwd(), mapPath);
  if (!fs.existsSync(absMap)) {
    console.error('Mapping file not found:', absMap);
    process.exit(1);
  }

  const map = JSON.parse(fs.readFileSync(absMap, 'utf8'));
  for (const item of map) {
    const src = path.join(uploadsDir, item.filename);
    if (!fs.existsSync(src)) {
      console.warn('Source image missing, skipping:', src);
      continue;
    }

    // Determine destination. If item.targetPath provided, use it, otherwise place in public/images/<target>/
    const destDir = item.targetPath
      ? path.join(repoRoot, item.targetPath)
      : path.join(repoRoot, 'public', 'images', item.target || 'misc');

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const dest = path.join(destDir, item.filename);
    fs.copyFileSync(src, dest);
    console.log('Copied', src, '→', dest);
  }

  console.log('Import completed. Commit the changes and push to your branch.');
}

main().catch(err => { console.error(err); process.exit(1); });
