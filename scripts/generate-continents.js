const fs = require('fs');
const path = require('path');
const { geoMercator, geoPath } = require('d3-geo');

async function main() {
  const inPath = path.join(__dirname, '..', 'public', 'countries.geojson');
  const outPath = path.join(__dirname, '..', 'public', 'continents-paths.json');
  if (!fs.existsSync(inPath)) {
    console.error('countries.geojson not found at', inPath);
    process.exit(1);
  }
  const raw = fs.readFileSync(inPath, 'utf8');
  const geo = JSON.parse(raw);
  const width = 1000;
  const height = 600;
  const projection = geoMercator().fitSize([width, height], geo);
  const pathGen = geoPath().projection(projection);
  const paths = (geo.features || []).map(f => pathGen(f)).filter(Boolean);
  fs.writeFileSync(outPath, JSON.stringify(paths, null, 2), 'utf8');
  console.log('Wrote', paths.length, 'paths to', outPath);

  // Compute southernmost projected Y for continental Argentina and Chile
  const countriesToCheck = ['argentina', 'chile'];
  let southernmostY = 0;
  const margin = 6; // px extra margin
  for (const f of (geo.features || [])) {
    const props = f.properties || {};
    const name = (props.ADMIN || props.NAME || props.name || '').toString().toLowerCase();
    if (!countriesToCheck.some(c => name.includes(c))) continue;
    const geom = f.geometry;
    if (!geom) continue;
    const coords = geom.coordinates;
    // handle Polygon and MultiPolygon
    if (geom.type === 'Polygon') {
      for (const ring of coords) {
        for (const coord of ring) {
          const p = projection(coord);
          if (p && p[1] > southernmostY) southernmostY = p[1];
        }
      }
    } else if (geom.type === 'MultiPolygon') {
      for (const poly of coords) {
        for (const ring of poly) {
          for (const coord of ring) {
            const p = projection(coord);
            if (p && p[1] > southernmostY) southernmostY = p[1];
          }
        }
      }
    }
  }

  const clipY = Math.min(height, Math.ceil(southernmostY + margin));
  const metaOut = path.join(__dirname, '..', 'public', 'continents-metadata.json');
  fs.writeFileSync(metaOut, JSON.stringify({ clipY, width, height }, null, 2), 'utf8');
  console.log('Wrote metadata to', metaOut, 'clipY=', clipY);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
