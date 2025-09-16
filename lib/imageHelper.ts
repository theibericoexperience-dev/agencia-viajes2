export function optimizedImage(baseName: string, preferredWidth = 1200, format = 'webp'){
  // baseName should be like 'IMG_3241.JPG' or '/images/IMG_3241.JPG'
  const name = baseName.split('/').pop() || baseName;
  const extIdx = name.lastIndexOf('.');
  const clean = extIdx > 0 ? name.slice(0, extIdx) : name;
  return `/_optimized/${clean}-w${preferredWidth}.${format}`;
}

export function responsiveSrcset(baseName: string, widths = [400,800,1200,1600], format='webp'){
  const name = baseName.split('/').pop() || baseName;
  const extIdx = name.lastIndexOf('.');
  const clean = extIdx > 0 ? name.slice(0, extIdx) : name;
  return widths.map(w => (`/_optimized/${clean}-w${w}.${format} ${w}w`)).join(', ');
}
