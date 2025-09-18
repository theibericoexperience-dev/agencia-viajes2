This folder contains image mapping templates and helpers.

- `images-map.template.json` — sample mapping file to rename/assign images to targets.
- `import_images.js` — helper script to swap placeholder images with uploaded images according to a mapping file (place this in `scripts/` for execution).

When you're ready to upload your images, place them into `public/images/uploads/` and provide a JSON mapping file. Then run the helper script to apply changes.
