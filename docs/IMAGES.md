# Image optimization

This project uses a small script to generate responsive optimized images for production.

- Source images live in `public/images/`.
- Optimized outputs are written to `public/_optimized/` as `NAME-w{width}.webp` and `NAME-w{width}.jpg`.

To regenerate optimized images locally:

```bash
npm run optimize:images
```

This will produce variants for widths: 400, 800, 1200, 1600.

How to add a new image:
1. Put the high-resolution source into `public/images/` (e.g. `IMG_1234.JPG`).
2. Run `npm run optimize:images`.
3. Reference the optimized variants in code using the helper in `lib/imageHelper.ts`:

```ts
import { optimizedImage } from '../lib/imageHelper';
const hero = optimizedImage('IMG_1234.JPG', 1600);
```

Notes:
- The site will serve WebP variants which reduces bandwidth; JPG fallbacks are also generated.
- If you want additional widths, edit `scripts/optimize_images.js`.
