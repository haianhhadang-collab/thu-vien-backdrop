/* Xuất toàn bộ mẫu ra file SVG tĩnh: node thu-vien/xuat-svg.js
 * File SVG dùng phông Google Fonts qua @import – mở bằng trình duyệt (có mạng) sẽ hiển thị đúng.
 * Muốn file tự chứa phông (dùng offline), hãy tải từ trang thư viện (nút "Tải SVG"). */
const fs = require('fs');
const path = require('path');
const here = __dirname;
['core.js', 'symbols.js', 'backdrops.js', 'backdrops2.js', 'backdrops3.js', 'backdrops4.js', 'backdrops5.js', 'backdrops6.js', 'topics.js'].forEach(f => require(path.join(here, 'js', f)));
const BL = globalThis.BL;

const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const out = path.join(here, '..', 'mau-svg');

BL.templates.forEach(t => {
  const p = {};
  t.fields.forEach(f => { p[f.k] = f.v; });
  t.colors.forEach(c => { p[c.k] = c.v; });
  p.logoOn = true;
  let svg = BL.svgDoc(t.w, t.h, t.render(p, t.id + '_'));
  const fams = Object.keys(BL.FONTS).filter(f => svg.includes(`'${f}'`));
  svg = svg.replace(/^(<svg[^>]*>)/, `$1<defs><style>@import url('${BL.fontsUrl(fams).replace(/&/g, '&amp;')}');</style></defs>`);
  const dir = path.join(out, 'backdrop');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${t.id}-${slug(t.name)}.svg`), '<?xml version="1.0" encoding="UTF-8"?>\n' + svg, 'utf8');
});
console.log('Đã xuất', BL.templates.length, 'mẫu vào', out);
