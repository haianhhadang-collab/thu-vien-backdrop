/* =========================================================================
 * core.js — Bộ công cụ vẽ dùng chung cho mọi mẫu logo / backdrop
 * Chạy được cả trong trình duyệt (window.BL) lẫn Node (globalThis.BL)
 * ========================================================================= */
(function (root) {
  'use strict';

  /* ---------- Phông chữ (đều hỗ trợ tiếng Việt, miễn phí trên Google Fonts) ---------- */
  const FONTS = {
    'Be Vietnam Pro':     { spec: 'wght@300;400;500;600;700;800;900', generic: 'sans-serif' },
    'Montserrat':         { spec: 'wght@400;500;600;700;800;900',     generic: 'sans-serif' },
    'Oswald':             { spec: 'wght@400;500;600;700',             generic: 'sans-serif' },
    'Playfair Display':   { spec: 'ital,wght@0,400;0,700;0,900;1,400;1,700', generic: 'serif' },
    'Lora':               { spec: 'ital,wght@0,400;0,600;0,700;1,400', generic: 'serif' },
    'Cormorant Garamond': { spec: 'ital,wght@0,400;0,500;0,600;0,700;1,400;1,600', generic: 'serif' },
    'Dancing Script':     { spec: 'wght@400;700', generic: 'cursive' },
    'Great Vibes':        { spec: '', generic: 'cursive' },
  };

  function fontsUrl(families, text) {
    const list = (families && families.length ? families : Object.keys(FONTS));
    const fams = list.map(f => 'family=' + f.replace(/ /g, '+') + (FONTS[f] && FONTS[f].spec ? ':' + FONTS[f].spec : '')).join('&');
    return 'https://fonts.googleapis.com/css2?' + fams + (text ? '&text=' + encodeURIComponent(text) : '') + '&display=swap';
  }

  /* ---------- Tiện ích chung ---------- */
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const r2 = n => Math.round(n * 100) / 100;
  const rad = d => d * Math.PI / 180;

  function hex2rgb(h) {
    h = String(h || '#000').replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16) || 0;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgb2hex(r, g, b) {
    return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  }
  function mix(a, b, t) {
    const A = hex2rgb(a), B = hex2rgb(b);
    return rgb2hex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
  }
  const shade = (c, t) => mix(c, '#000000', t);
  const tint = (c, t) => mix(c, '#ffffff', t);

  /* Bộ sinh số ngẫu nhiên có hạt giống (mẫu luôn vẽ giống nhau mỗi lần) */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* ---------- Đo chữ để tự co cỡ chữ cho vừa khung ---------- */
  let ctx = null;
  function textW(t, size, family, weight, ls, italic) {
    t = String(t || '');
    if (typeof document !== 'undefined') {
      ctx = ctx || document.createElement('canvas').getContext('2d');
      const gen = (FONTS[family] && FONTS[family].generic) || 'sans-serif';
      ctx.font = (italic ? 'italic ' : '') + weight + ' ' + size + 'px "' + family + '", ' + gen;
      return ctx.measureText(t).width + (ls || 0) * t.length;
    }
    // Ước lượng khi chạy ngoài trình duyệt (Node)
    const gen = (FONTS[family] && FONTS[family].generic) || 'sans-serif';
    const upper = t === t.toUpperCase();
    const k = gen === 'cursive' ? 0.42 : (upper ? 0.68 : 0.55);
    return t.length * size * k + (ls || 0) * t.length;
  }
  function fitSize(t, size, maxW, family, weight, ls, italic) {
    const w = textW(t, size, family, weight, ls, italic);
    if (w <= maxW || !t) return size;
    const n = String(t).length * (ls || 0);
    const k = (w - n) / size;
    return Math.max(6, (maxW - n) / k);
  }

  function fontAttr(fam) {
    const gen = (FONTS[fam] && FONTS[fam].generic) || 'sans-serif';
    return `font-family="'${fam}', ${gen}"`;
  }

  /* Tùy chọn cỡ chữ toàn cục do trình chỉnh sửa đặt trước khi vẽ:
   * head = hệ số cho chữ lớn (≥ 44), body = hệ số cho chữ nhỏ, fill = tự phóng tiêu đề cho lấp đầy chiều ngang */
  const RO = { head: 1, body: 1, fill: false };
  function setRO(o) { RO.head = (o && o.head) || 1; RO.body = (o && o.body) || 1; RO.fill = !!(o && o.fill); }
  function baseSize(o) {
    const s = o.size || 40;
    return o.noScale ? s : s * (s >= 44 ? RO.head : RO.body);
  }
  const headScale = () => RO.head * (RO.fill ? 1.3 : 1);
  const grows = o => RO.fill && !o.noScale && (o.size || 40) >= 44 && o.maxW;
  let blk = 0;

  /* Một dòng chữ. o: {size, font, weight, fill, anchor, ls, maxW, italic, upper, attrs, noScale} */
  function T(t, x, y, o) {
    o = o || {};
    const fam = o.font || 'Be Vietnam Pro', w = o.weight || 700, ls = o.ls || 0;
    t = o.upper ? String(t || '').toUpperCase() : String(t || '');
    if (!t.trim()) return '';
    let s = baseSize(o);
    if (o.maxW) s = fitSize(t, grows(o) ? s * 1.3 : s, o.maxW, fam, w, ls, o.italic);
    return `<text x="${r2(x)}" y="${r2(y)}" ${fontAttr(fam)} font-size="${r2(s)}" font-weight="${w}"` +
      (o.italic ? ' font-style="italic"' : '') +
      ` fill="${o.fill || '#fff'}" text-anchor="${o.anchor || 'middle'}"` +
      (ls ? ` letter-spacing="${r2(ls)}"` : '') + (o.attrs ? ' ' + o.attrs : '') + `>${esc(t)}</text>`;
  }

  /* Nhiều dòng (tách bằng xuống dòng). Trả về {svg, h, size, n} để căn các phần tử phía sau.
   * Các dòng cùng khối mang chung data-blk để bộ căn bố cục coi là một khối. */
  function TL(text, x, y, o, lh) {
    o = o || {}; lh = lh || 1.15;
    let lines = String(text || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (o.upper) lines = lines.map(l => l.toUpperCase());
    if (!lines.length) return { svg: '', h: 0, size: 0, n: 0 };
    const fam = o.font || 'Be Vietnam Pro', w = o.weight || 700, ls = o.ls || 0;
    let s = baseSize(o);
    if (o.maxW) { const g = grows(o) ? s * 1.3 : s; s = Math.min.apply(null, lines.map(l => fitSize(l, g, o.maxW, fam, w, ls, o.italic))); }
    const attrs = (o.attrs ? o.attrs + ' ' : '') + `data-blk="b${++blk}"`;
    const svg = lines.map((l, i) => T(l, x, y + i * s * lh, Object.assign({}, o, { size: s, maxW: 0, upper: false, noScale: true, attrs }))).join('');
    return { svg, h: (lines.length - 1) * s * lh, size: s, n: lines.length };
  }

  /* Chữ chạy theo cung tròn (dùng cho logo dạng huy hiệu) */
  function arcText(t, cx, cy, r, side, o, id) {
    o = o || {};
    t = o.upper ? String(t || '').toUpperCase() : String(t || '');
    if (!t.trim()) return '';
    const d = side === 'top'
      ? `M ${r2(cx - r)} ${r2(cy)} A ${r2(r)} ${r2(r)} 0 0 1 ${r2(cx + r)} ${r2(cy)}`
      : `M ${r2(cx - r)} ${r2(cy)} A ${r2(r)} ${r2(r)} 0 0 0 ${r2(cx + r)} ${r2(cy)}`;
    const fam = o.font || 'Montserrat', w = o.weight || 700, ls = o.ls || 0;
    const s = fitSize(t, o.size || 28, Math.PI * r * (o.maxArc || 0.8), fam, w, ls, o.italic);
    return `<defs><path id="${id}" d="${d}"/></defs>` +
      `<text ${fontAttr(fam)} font-size="${r2(s)}" font-weight="${w}" fill="${o.fill || '#000'}" text-anchor="middle"` +
      (ls ? ` letter-spacing="${r2(ls)}"` : '') + (o.italic ? ' font-style="italic"' : '') +
      `><textPath href="#${id}" xlink:href="#${id}" startOffset="50%">${esc(t)}</textPath></text>`;
  }

  /* Cung tròn từ góc a1 tới a2 (độ, chiều kim đồng hồ trên màn hình) */
  function arcPath(cx, cy, r, a1, a2) {
    const p1 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))];
    const p2 = [cx + r * Math.cos(rad(a2)), cy + r * Math.sin(rad(a2))];
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M ${r2(p1[0])} ${r2(p1[1])} A ${r2(r)} ${r2(r)} 0 ${large} 1 ${r2(p2[0])} ${r2(p2[1])}`;
  }

  /* Ngôi sao n cánh */
  function starPts(cx, cy, R, r, n, rot) {
    rot = rot == null ? -90 : rot;
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = rad(rot + i * 180 / n), rr = i % 2 ? r : R;
      pts.push(r2(cx + rr * Math.cos(a)) + ',' + r2(cy + rr * Math.sin(a)));
    }
    return pts.join(' ');
  }
  const star = (cx, cy, R, fill, n, inner) =>
    `<polygon points="${starPts(cx, cy, R, R * (inner || 0.42), n || 5)}" fill="${fill}"/>`;

  /* Vòng nguyệt quế (nhánh trái + nhánh phải đối xứng) */
  function laurel(cx, cy, r, color, o) {
    o = o || {};
    const from = o.from == null ? 100 : o.from, to = o.to == null ? 245 : o.to;
    const n = o.n || 9, lw = o.leaf || r * 0.14;
    let g = `<path d="${arcPath(cx, cy, r, from, to)}" fill="none" stroke="${color}" stroke-width="${r2(lw * 0.16)}" stroke-linecap="round"/>`;
    for (let i = 0; i < n; i++) {
      const a = from + (to - from) * (i + 0.35) / n;
      const sc = 1 - 0.35 * i / n;
      const px = cx + r * Math.cos(rad(a)), py = cy + r * Math.sin(rad(a));
      const nx = Math.cos(rad(a)), ny = Math.sin(rad(a));
      const tx = -Math.sin(rad(a)), ty = Math.cos(rad(a));
      [-1, 1].forEach(side => {
        const L = lw * sc;
        const ex = px + nx * side * L * 0.55 + tx * L * 0.35, ey = py + ny * side * L * 0.55 + ty * L * 0.35;
        const rot = a + 90 - side * 35;
        g += `<ellipse cx="${r2(ex)}" cy="${r2(ey)}" rx="${r2(L)}" ry="${r2(L * 0.36)}" transform="rotate(${r2(rot)} ${r2(ex)} ${r2(ey)})" fill="${color}"/>`;
      });
    }
    const ae = to, ex = cx + r * Math.cos(rad(ae)), ey = cy + r * Math.sin(rad(ae));
    g += `<ellipse cx="${r2(ex)}" cy="${r2(ey)}" rx="${r2(lw * 0.6)}" ry="${r2(lw * 0.24)}" transform="rotate(${r2(ae + 90)} ${r2(ex)} ${r2(ey)})" fill="${color}"/>`;
    return `<g>${g}</g><g transform="translate(${r2(2 * cx)} 0) scale(-1 1)">${g}</g>`;
  }

  /* Dải ruy băng uốn cong có chữ */
  function ribbon(cx, y, w, h, fill, dark, text, o, id) {
    o = o || {};
    const x1 = cx - w / 2, x2 = cx + w / 2, a = o.curve == null ? h * 0.35 : o.curve;
    const tail = `M ${r2(x1 + h * 0.6)} ${r2(y + h * 0.4)} L ${r2(x1 - h * 0.9)} ${r2(y + h * 0.4)} L ${r2(x1 - h * 0.45)} ${r2(y + h * 0.9)} L ${r2(x1 - h * 0.9)} ${r2(y + h * 1.4)} L ${r2(x1 + h * 0.6)} ${r2(y + h * 1.4)} Z`;
    const fold = `M ${r2(x1)} ${r2(y + h)} L ${r2(x1 + h * 0.6)} ${r2(y + h * 1.4)} L ${r2(x1 + h * 0.6)} ${r2(y + h)} Z`;
    let s = `<g><path d="${tail}" fill="${dark}"/><path d="${fold}" fill="${shade(dark, 0.3)}"/></g>`;
    s += `<g transform="translate(${r2(2 * cx)} 0) scale(-1 1)"><path d="${tail}" fill="${dark}"/><path d="${fold}" fill="${shade(dark, 0.3)}"/></g>`;
    s += `<path d="M ${r2(x1)} ${r2(y)} Q ${r2(cx)} ${r2(y + a * 2)} ${r2(x2)} ${r2(y)} L ${r2(x2)} ${r2(y + h)} Q ${r2(cx)} ${r2(y + h + a * 2)} ${r2(x1)} ${r2(y + h)} Z" fill="${fill}"/>`;
    if (text) {
      const fam = o.font || 'Montserrat', wt = o.weight || 800, ls = o.ls || 2;
      const t = o.upper === false ? text : String(text).toUpperCase();
      const size = fitSize(t, o.size || h * 0.48, w * 0.82, fam, wt, ls);
      const ym = y + h / 2 + size * 0.36;
      s += `<defs><path id="${id}" d="M ${r2(x1)} ${r2(ym)} Q ${r2(cx)} ${r2(ym + a * 2)} ${r2(x2)} ${r2(ym)}"/></defs>` +
        `<text ${fontAttr(fam)} font-size="${r2(size)}" font-weight="${wt}" fill="${o.fill || '#fff'}" text-anchor="middle" letter-spacing="${ls}">` +
        `<textPath href="#${id}" xlink:href="#${id}" startOffset="50%">${esc(t)}</textPath></text>`;
    }
    return s;
  }

  /* Hoa văn mặt trống đồng Đông Sơn (cách điệu) */
  function drum(cx, cy, R, color, o) {
    o = o || {};
    const sw = Math.max(0.6, R * 0.008);
    const ring = f => `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(R * f)}" fill="none" stroke="${color}" stroke-width="${r2(sw)}"/>`;
    let s = `<polygon points="${starPts(cx, cy, R * 0.22, R * 0.075, 14)}" fill="${color}"/>`;
    s += ring(0.26);
    for (let i = 0; i < 36; i++) { const a = rad(i * 10); s += `<circle cx="${r2(cx + R * 0.3 * Math.cos(a))}" cy="${r2(cy + R * 0.3 * Math.sin(a))}" r="${r2(R * 0.012)}" fill="${color}"/>`; }
    s += ring(0.34);
    for (let i = 0; i < 72; i++) {
      const a = rad(i * 5);
      s += `<line x1="${r2(cx + R * 0.36 * Math.cos(a))}" y1="${r2(cy + R * 0.36 * Math.sin(a))}" x2="${r2(cx + R * 0.42 * Math.cos(a + 0.04))}" y2="${r2(cy + R * 0.42 * Math.sin(a + 0.04))}" stroke="${color}" stroke-width="${r2(sw)}"/>`;
    }
    s += ring(0.45);
    for (let i = 0; i < 28; i++) {
      const a = i * 360 / 28;
      s += `<polygon points="${r2(-R * 0.025)},0 ${r2(R * 0.025)},0 0,${r2(-R * 0.06)}" fill="${color}" transform="rotate(${r2(a)} ${r2(cx)} ${r2(cy)}) translate(${r2(cx)} ${r2(cy - R * 0.47)})"/>`;
    }
    s += ring(0.56);
    const L = R * 0.075;
    for (let i = 0; i < 10; i++) {
      const a = i * 36;
      const bird = `M ${r2(-L)} 0 Q 0 ${r2(-L * 0.25)} ${r2(L)} ${r2(-L * 0.05)} L ${r2(L * 1.6)} ${r2(L * 0.05)} L ${r2(L * 0.9)} ${r2(L * 0.12)} Q 0 ${r2(L * 0.3)} ${r2(-L)} 0 Z` +
        ` M ${r2(-L * 0.2)} ${r2(-L * 0.12)} L ${r2(-L * 0.7)} ${r2(-L * 0.55)} L ${r2(-L * 0.05)} ${r2(-L * 0.2)} Z`;
      s += `<path d="${bird}" fill="${color}" transform="rotate(${r2(a)} ${r2(cx)} ${r2(cy)}) translate(${r2(cx)} ${r2(cy - R * 0.66)})"/>`;
    }
    s += ring(0.77);
    for (let i = 0; i < 40; i++) {
      const a = rad(i * 9);
      const x = cx + R * 0.83 * Math.cos(a), y = cy + R * 0.83 * Math.sin(a);
      s += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(R * 0.025)}" fill="none" stroke="${color}" stroke-width="${r2(sw)}"/><circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(R * 0.008)}" fill="${color}"/>`;
    }
    s += ring(0.89);
    for (let i = 0; i < 120; i++) {
      const a = rad(i * 3);
      s += `<line x1="${r2(cx + R * 0.91 * Math.cos(a))}" y1="${r2(cy + R * 0.91 * Math.sin(a))}" x2="${r2(cx + R * 0.97 * Math.cos(a))}" y2="${r2(cy + R * 0.97 * Math.sin(a))}" stroke="${color}" stroke-width="${r2(sw)}"/>`;
    }
    s += ring(1);
    return `<g opacity="${o.opacity == null ? 1 : o.opacity}">${s}</g>`;
  }

  /* Bông hoa nhiều cánh */
  function flower(cx, cy, R, petal, center, o) {
    o = o || {};
    const n = o.n || 5, rot = o.rot || 0;
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = rot + i * 360 / n;
      s += `<ellipse cx="${r2(cx)}" cy="${r2(cy - R * 0.55)}" rx="${r2(R * (o.w || 0.42))}" ry="${r2(R * 0.55)}" fill="${petal}" transform="rotate(${r2(a)} ${r2(cx)} ${r2(cy)})"${o.opacity ? ` opacity="${o.opacity}"` : ''}/>`;
    }
    s += `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(R * 0.24)}" fill="${center}"/>`;
    return s;
  }

  /* Lá (hình giọt) xoay theo góc */
  const leaf = (x, y, len, rot, fill) =>
    `<path d="M 0 0 Q ${r2(len * 0.5)} ${r2(-len * 0.32)} ${r2(len)} 0 Q ${r2(len * 0.5)} ${r2(len * 0.32)} 0 0 Z" fill="${fill}" transform="translate(${r2(x)} ${r2(y)}) rotate(${r2(rot)})"/>`;

  /* Vị trí đặt logo trên backdrop: ảnh người dùng tải lên hoặc khung chờ "LOGO" */
  function logoSlot(p, x, y, size, o) {
    o = o || {};
    if (p.logo) {
      return `<image href="${p.logo}" xlink:href="${p.logo}" x="${r2(x - size / 2)}" y="${r2(y - size / 2)}" width="${r2(size)}" height="${r2(size)}" preserveAspectRatio="xMidYMid meet"/>`;
    }
    if (o.optional || p.logoOn === false) return '';
    const c = o.color || '#ffffff';
    return `<g opacity="${o.opacity || 0.85}"><circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(size / 2)}" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="6 5"/>` +
      T('LOGO', x, y + size * 0.08, { size: size * 0.22, fill: c, font: 'Montserrat', weight: 700, ls: 1, noScale: true, attrs: 'data-deco="1"' }) + '</g>';
  }

  /* Khung ảnh (chân dung, quốc huy…): ảnh người dùng tải lên hoặc khung chờ.
   * o: {shape: 'oval' | 'arch' | 'rect', color, label, id} */
  function photoSlot(p, cx, cy, w, h, o) {
    o = o || {};
    const c = o.color || '#E9C46A', id = o.id || 'ph', x0 = cx - w / 2, y0 = cy - h / 2;
    const shape = (W, H, attrs) => {
      const x = cx - W / 2, y = cy - H / 2;
      if (o.shape === 'rect') return `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(W)}" height="${r2(H)}" rx="${r2(W * 0.04)}" ${attrs}/>`;
      if (o.shape === 'arch') return `<path d="M ${r2(x)} ${r2(y + H)} V ${r2(y + W / 2)} A ${r2(W / 2)} ${r2(W / 2)} 0 0 1 ${r2(x + W)} ${r2(y + W / 2)} V ${r2(y + H)} Z" ${attrs}/>`;
      return `<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(W / 2)}" ry="${r2(H / 2)}" ${attrs}/>`;
    };
    const frame = shape(w, h, `fill="none" stroke="${c}" stroke-width="4"`) + shape(w + 22, h + 22, `fill="none" stroke="${c}" stroke-width="1.5"`);
    if (p.photo) {
      return `<defs><clipPath id="${id}">${shape(w, h, '')}</clipPath></defs>` +
        `<image href="${p.photo}" xlink:href="${p.photo}" x="${r2(x0)}" y="${r2(y0)}" width="${r2(w)}" height="${r2(h)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>` + frame;
    }
    const lines = String(o.label || 'ẢNH CHÂN DUNG').split('\n');
    return shape(w, h, `fill="#ffffff" fill-opacity="0.08" stroke="${c}" stroke-width="2" stroke-dasharray="8 6"`) + shape(w + 22, h + 22, `fill="none" stroke="${c}" stroke-width="1.5"`) +
      lines.map((l, i) => T(l, cx, cy - (lines.length - 1) * 12 + i * 24, { size: 17, weight: 700, fill: c, ls: 1, noScale: true, maxW: w * 0.85, attrs: 'data-deco="1"' })).join('') +
      T('(tải ảnh lên trong trình chỉnh sửa)', cx, cy + lines.length * 12 + 18, { size: 12, weight: 500, fill: c, noScale: true, maxW: w * 0.85, attrs: 'data-deco="1" fill-opacity="0.8"' });
  }

  function svgDoc(w, h, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
  }

  root.BL = {
    FONTS, fontsUrl, esc, r2, rad, mix, shade, tint, hex2rgb, rng,
    textW, fitSize, T, TL, setRO, headScale, arcText, arcPath, starPts, star, laurel, ribbon, drum, flower, leaf,
    logoSlot, photoSlot, svgDoc,
    templates: [],
  };
})(typeof window !== 'undefined' ? window : globalThis);
