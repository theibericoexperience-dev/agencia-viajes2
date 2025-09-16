const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public', 'images');
const outputDir = path.join(__dirname, '..', 'public', '_optimized');
const widths = [400, 800, 1200, 1600];

if (!fs.existsSync(inputDir)) {
  console.error('No input images directory:', inputDir);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const optimizeFile = async (file) => {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const inputPath = path.join(inputDir, file);

  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  for (const w of widths) {
    const outWebp = path.join(outputDir, `${name}-w${w}.webp`);
    const outJpg = path.join(outputDir, `${name}-w${w}.jpg`);
    try {
      await sharp(inputPath)
        .resize({ width: w })
        .webp({ quality: 75 })
        .toFile(outWebp);
      // create jpg fallback at slightly higher quality
      await sharp(inputPath)
        .resize({ width: w })
        .jpeg({ quality: 85 })
        .toFile(outJpg);
      console.log('Optimized', file, '->', outWebp, outJpg);
    } catch (err) {
      console.error('Failed optimizing', file, 'width', w, err.message);
    }
  }
};

(async () => {
  const files = fs.readdirSync(inputDir);
  for (const f of files) {
    const stat = fs.statSync(path.join(inputDir, f));
    if (stat.isFile()) await optimizeFile(f);
  }
  console.log('Done optimizing images.');
})();
