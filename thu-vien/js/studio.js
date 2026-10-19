/* =========================================================================
 * studio.js — Các công cụ "tự động" chạy trên bản vẽ đã hiển thị trong trang:
 *   1. autoLayout  : chống chồng chữ, giữ lề an toàn, báo phần tràn để thu nhỏ tiêu đề
 *   2. applyLook   : màu chữ tự tương phản + hiệu ứng chữ / nền phù hợp với nền thực tế
 *   3. PALETTES    : bảng màu gợi ý, tạo bảng màu từ 1 màu, ánh xạ vào các ô màu của mẫu
 * ========================================================================= */
(function (root) {
  'use strict';
  const BL = root.BL, { mix, shade, tint, hex2rgb, rng, r2 } = BL;

  /* ---------------- Màu sắc ---------------- */
  const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = rgb => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const toHex = rgb => '#' + rgb.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
  function hsl(hex) {
    const [r, g, b] = hex2rgb(hex).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
    if (mx === mn) return [0, 0, l];
    const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  }
  function fromHsl(h, s, l) {
    h = ((h % 360) + 360) % 360;
    const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return toHex([f(0) * 255, f(8) * 255, f(4) * 255]);
  }

  /* Đọc màu chữ: '#hex', tên màu đơn giản, hoặc url(#gradient) → màu giữa dải */
  function fillColor(el, svg) {
    let f = el.getAttribute('fill') || '#000';
    if (f === 'none') f = el.getAttribute('stroke') || '#000';
    const m = /url\(#([^)]+)\)/.exec(f);
    if (m) {
      // Chữ nhũ chuyển màu → lấy màu trung bình của các điểm dừng
      const g = svg.querySelector('[id="' + m[1] + '"]'), stops = g ? Array.from(g.querySelectorAll('stop')) : [];
      if (!stops.length) return [128, 128, 128];
      const cs = stops.map(st => hex2rgb(st.getAttribute('stop-color') || '#888'));
      return [0, 1, 2].map(i => cs.reduce((a, c) => a + c[i], 0) / cs.length);
    }
    if (f === 'white') f = '#ffffff';
    if (f === 'black') f = '#000000';
    return /^#/.test(f) ? hex2rgb(f) : [128, 128, 128];
  }

  /* ---------------- Đo vị trí chữ ---------------- */
  const CURSIVE = /Great Vibes|Dancing Script/;
  const DESC = /[gjpqyạặậẹệịọộợụựỵ,;]/i;
  function textItems(svg) {
    const out = [], blocks = {}, inv = svg.getScreenCTM().inverse();
    svg.querySelectorAll('text').forEach(el => {
      if (el.querySelector('textPath') || el.closest('[data-deco]') || !el.textContent.trim()) return;
      const sc = el.getScreenCTM();
      if (!sc) return;
      const M = inv.multiply(sc);
      const fs = parseFloat(el.getAttribute('font-size')) * Math.hypot(M.c, M.d);
      const bb = el.getBBox();
      const xs = [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]].map(q => {
        const pt = svg.createSVGPoint(); pt.x = q[0]; pt.y = q[1]; return pt.matrixTransform(M);
      });
      const pt = svg.createSVGPoint(); pt.x = parseFloat(el.getAttribute('x')) || 0; pt.y = parseFloat(el.getAttribute('y')) || 0;
      const base = pt.matrixTransform(M).y, cur = CURSIVE.test(el.getAttribute('font-family') || '');
      const it = {
        els: [el], size: fs,
        x1: Math.min.apply(null, xs.map(p => p.x)), x2: Math.max.apply(null, xs.map(p => p.x)),
        top: base - fs * (cur ? 0.85 : 0.93), bottom: base + fs * (cur ? 0.3 : (DESC.test(el.textContent) ? 0.22 : 0.06)),
      };
      const b = el.getAttribute('data-blk');
      if (b && blocks[b]) {
        const o = blocks[b];
        o.els.push(el); o.x1 = Math.min(o.x1, it.x1); o.x2 = Math.max(o.x2, it.x2);
        o.top = Math.min(o.top, it.top); o.bottom = Math.max(o.bottom, it.bottom); o.size = Math.min(o.size, it.size);
      } else { if (b) blocks[b] = it; out.push(it); }
    });
    return out;
  }

  function shift(it, dx, dy) {
    const moved = new Set();
    it.els.forEach(el => {
      [el, el.previousElementSibling].forEach((n, i) => {
        if (!n || moved.has(n)) return;
        if (i === 1) { // viên nền (pill) ngay trước chữ: chỉ dời khi nó ôm lấy chữ
          if (n.tagName !== 'rect' || n.hasAttribute('width') && +n.getAttribute('width') > 1100) return;
          const r = n.getBBox(), c = el.getBBox();
          const cx = c.x + c.width / 2, cy = c.y + c.height / 2;
          if (!(cx > r.x && cx < r.x + r.width && cy > r.y && cy < r.y + r.height)) return;
        }
        n.setAttribute('transform', `translate(${r2(dx)} ${r2(dy)})` + (n.getAttribute('transform') ? ' ' + n.getAttribute('transform') : ''));
        moved.add(n);
      });
    });
    it.x1 += dx; it.x2 += dx; it.top += dy; it.bottom += dy;
  }

  /* Trả về số đơn vị bị tràn đáy (> 0 thì nên thu nhỏ tiêu đề và vẽ lại) */
  function autoLayout(svg, t) {
    const W = t.w, H = t.h, m = t.type === 'logo' ? 8 : Math.round(H * 0.035);
    // 1. Lề trái – phải
    textItems(svg).forEach(it => {
      const w = it.x2 - it.x1;
      if (w > W - 2 * m) {
        const f = (W - 2 * m) / w;
        it.els.forEach(el => el.setAttribute('font-size', r2(parseFloat(el.getAttribute('font-size')) * f)));
      }
    });
    const items = textItems(svg).sort((a, b) => a.top - b.top);
    items.forEach(it => {
      if (it.x1 < m) shift(it, m - it.x1, 0);
      else if (it.x2 > W - m) shift(it, W - m - it.x2, 0);
    });
    // 2. Chống chồng chữ theo chiều dọc
    let movedAny = false, push = 0;
    for (let i = 0; i < items.length; i++) {
      const b = items[i];
      let need = 0;
      for (let j = 0; j < i; j++) {
        const a = items[j], ov = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
        if (ov <= Math.min(a.x2 - a.x1, b.x2 - b.x1) * 0.1) continue;
        const d = a.bottom + Math.max(4, 0.12 * Math.min(a.size, b.size)) - b.top;
        if (d > need) need = d;
      }
      if (need > 0.5) { shift(b, 0, need); movedAny = true; push = Math.max(push, need); }
    }
    // 3. Tràn đáy / đỉnh
    const top = Math.min.apply(null, items.map(i => i.top).concat([m]));
    const bottom = Math.max.apply(null, items.map(i => i.bottom).concat([0]));
    return { overflow: Math.max(0, bottom - (H - m), m - top), moved: movedAny, push };
  }

  /* ---------------- Lấy mẫu nền (vẽ bản không chữ ra canvas) ---------------- */
  async function sampleBg(svg, t) {
    const clone = svg.cloneNode(true);
    clone.querySelectorAll('text').forEach(n => n.remove());
    const SW = 480, k = SW / t.w, SH = Math.round(t.h * k);
    clone.setAttribute('width', SW); clone.setAttribute('height', SH);
    clone.removeAttribute('style');
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }));
    try {
      const img = new Image(); img.src = url; await img.decode();
      const cv = document.createElement('canvas'); cv.width = SW; cv.height = SH;
      const cx = cv.getContext('2d', { willReadFrequently: true });
      cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, SW, SH); // logo nền trong suốt → coi như nền trắng
      cx.drawImage(img, 0, 0, SW, SH);
      return { data: cx.getImageData(0, 0, SW, SH).data, k, SW, SH };
    } finally { URL.revokeObjectURL(url); }
  }
  function region(S, x1, y1, x2, y2) {
    const X1 = Math.max(0, Math.floor(x1 * S.k)), X2 = Math.min(S.SW - 1, Math.ceil(x2 * S.k));
    const Y1 = Math.max(0, Math.floor(y1 * S.k)), Y2 = Math.min(S.SH - 1, Math.ceil(y2 * S.k));
    let n = 0, r = 0, g = 0, b = 0, L = 0, L2 = 0;
    for (let y = Y1; y <= Y2; y += 2) for (let x = X1; x <= X2; x += 2) {
      const i = (y * S.SW + x) * 4, c = [S.data[i], S.data[i + 1], S.data[i + 2]], l = lum(c);
      r += c[0]; g += c[1]; b += c[2]; L += l; L2 += l * l; n++;
    }
    if (!n) return { rgb: [128, 128, 128], lum: 0.2, std: 0 };
    return { rgb: [r / n, g / n, b / n], lum: L / n, std: Math.sqrt(Math.max(0, L2 / n - (L / n) ** 2)) };
  }

  /* ---------------- Hiệu ứng ---------------- */
  function defsOf(svg) {
    let d = svg.querySelector('defs[data-fx]');
    if (!d) { d = document.createElementNS('http://www.w3.org/2000/svg', 'defs'); d.setAttribute('data-fx', '1'); svg.insertBefore(d, svg.firstChild); }
    return d;
  }
  let fxN = 0;
  function addFilter(svg, inner, region) {
    const id = 'fx' + (++fxN).toString(36);
    defsOf(svg).insertAdjacentHTML('beforeend', `<filter xmlns="http://www.w3.org/2000/svg" id="${id}" ${region || 'x="-25%" y="-40%" width="150%" height="190%"'} color-interpolation-filters="sRGB">${inner}</filter>`);
    return `url(#${id})`;
  }
  const FX = {
    shadow: (svg, s, txt, bg) => {
      const light = lum(txt) > lum(bg);
      return { filter: addFilter(svg, `<feDropShadow dx="0" dy="${r2(s * 0.05)}" stdDeviation="${r2(s * 0.06)}" flood-color="${light ? '#000' : '#fff'}" flood-opacity="${light ? 0.5 : 0.85}"/>`) };
    },
    soft: (svg, s, txt, bg) => {
      const light = lum(txt) > lum(bg);
      return { filter: addFilter(svg, `<feDropShadow dx="0" dy="${r2(s * 0.03)}" stdDeviation="${r2(s * 0.05)}" flood-color="${light ? '#000' : '#fff'}" flood-opacity="${light ? 0.3 : 0.7}"/>`) };
    },
    outline: (svg, s, txt, bg) => {
      const light = lum(txt) > 0.4;
      const col = light ? toHex(hex2rgb(mix(toHex(bg.map(v => v)), '#000000', 0.65))) : '#ffffff';
      return { stroke: col, 'stroke-width': r2(Math.max(1.5, s * 0.09)), 'paint-order': 'stroke', 'stroke-linejoin': 'round' };
    },
    glow: (svg, s, txt) => ({
      filter: addFilter(svg, `<feGaussianBlur in="SourceGraphic" stdDeviation="${r2(s * 0.12)}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>`, 'x="-30%" y="-60%" width="160%" height="220%"'),
    }),
    '3d': (svg, s, txt) => {
      const k = Math.max(0.6, s * 0.012), col = lum(txt) > 0.35 ? mix(toHex(txt), '#000000', 0.6) : mix(toHex(txt), '#ffffff', 0.55);
      let f = `<feFlood flood-color="${col}" result="c"/><feComposite in="c" in2="SourceAlpha" operator="in" result="a"/>`;
      for (let i = 1; i <= 6; i++) f += `<feOffset in="a" dx="${r2(i * k)}" dy="${r2(i * k)}" result="o${i}"/>`;
      f += '<feMerge>' + [6, 5, 4, 3, 2, 1].map(i => `<feMergeNode in="o${i}"/>`).join('') + '<feMergeNode in="SourceGraphic"/></feMerge>';
      return { filter: addFilter(svg, f, 'x="-10%" y="-20%" width="130%" height="160%"') };
    },
  };
  function setAttrs(el, a) { Object.keys(a).forEach(k => el.setAttribute(k, a[k])); }

  /* Chọn hiệu ứng phù hợp cho từng dòng chữ dựa trên nền thật phía sau */
  function autoFx(s, txt, bg) {
    const cr = contrast(txt, bg.rgb);
    if (cr < 2.6) return ['outline', 'soft'];
    if (cr < 4.5 || bg.std > 0.13) return ['soft'];
    if (s >= 60 && bg.lum < 0.45) return ['soft'];
    return [];
  }

  function bgLayer(svg, t, mode, S) {
    const W = t.w, H = t.h, NS = 'http://www.w3.org/2000/svg';
    let modes = mode === 'auto' ? null : [mode];
    if (!modes) {
      const L = region(S, 0, 0, W, H).lum;
      modes = L < 0.12 ? ['vignette', 'bokeh'] : L < 0.45 ? ['vignette'] : ['light', 'grain'];
    }
    const d = defsOf(svg), id = 'bgfx' + (++fxN).toString(36);
    let g = '';
    modes.forEach(m => {
      if (m === 'vignette') {
        d.insertAdjacentHTML('beforeend', `<radialGradient xmlns="${NS}" id="${id}v" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/></radialGradient>`);
        g += `<rect width="${W}" height="${H}" fill="url(#${id}v)"/>`;
      } else if (m === 'grain') {
        d.insertAdjacentHTML('beforeend', `<filter xmlns="${NS}" id="${id}g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`);
        g += `<rect width="${W}" height="${H}" filter="url(#${id}g)" opacity="0.07"/>`;
      } else if (m === 'light') {
        d.insertAdjacentHTML('beforeend', `<radialGradient xmlns="${NS}" id="${id}l1" cx="0.1" cy="0" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
          `<radialGradient xmlns="${NS}" id="${id}l2" cx="0.95" cy="1" r="0.55"><stop offset="0" stop-color="#FFD8A8" stop-opacity="0.35"/><stop offset="1" stop-color="#FFD8A8" stop-opacity="0"/></radialGradient>`);
        g += `<rect width="${W}" height="${H}" fill="url(#${id}l1)"/><rect width="${W}" height="${H}" fill="url(#${id}l2)"/>`;
      } else if (m === 'bokeh') {
        d.insertAdjacentHTML('beforeend', `<filter xmlns="${NS}" id="${id}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${r2(W * 0.004)}"/></filter>`);
        const R = rng(13);
        g += `<g filter="url(#${id}b)">`;
        for (let i = 0; i < 26; i++) g += `<circle cx="${r2(R() * W)}" cy="${r2(R() * H)}" r="${r2(W * (0.008 + R() * 0.03))}" fill="#fff" opacity="${r2(0.04 + R() * 0.12)}"/>`;
        g += '</g>';
      }
    });
    if (!g) return;
    // Đặt lớp hiệu ứng ngay dưới phần chữ đầu tiên (trên nền và hình trang trí)
    const kids = Array.from(svg.children);
    const at = kids.find(k => k.tagName !== 'defs' && (k.tagName === 'text' || k.querySelector('text')));
    const grp = document.createElementNS(NS, 'g');
    grp.setAttribute('data-bgfx', '1');
    grp.innerHTML = g;
    svg.insertBefore(grp, at || null);
  }

  /* p.textMode: template | contrast | custom ; p.fxText: auto | none | shadow | outline | glow | 3d ; p.fxBg: none | auto | vignette | grain | light | bokeh */
  async function applyLook(svg, t, p) {
    const textMode = p.textMode || 'template', fxText = p.fxText || 'auto', fxBg = t.type === 'logo' ? 'none' : (p.fxBg || 'auto');
    if (textMode === 'template' && fxText === 'none' && fxBg === 'none') return;
    let S = null;
    try { S = await sampleBg(svg, t); } catch (e) { S = null; }
    const items = textItems(svg);
    const colors = t.colors.map(c => p[c.k]).concat(['#ffffff', '#111111']);
    items.forEach(it => {
      const bg = S ? region(S, it.x1, it.top, it.x2, it.bottom) : { rgb: [128, 128, 128], lum: 0.2, std: 0.2 };
      it.els.forEach(el => {
        if (el.getAttribute('fill') === 'none') return;
        let txt = fillColor(el, svg);
        const grad = el.hasAttribute('data-grad');
        if (grad) { /* giữ gradient chữ do người dùng chọn */ } else if (textMode === 'custom' && p.textColor) { el.setAttribute('fill', p.textColor); txt = hex2rgb(p.textColor); }
        else if (textMode === 'contrast' && contrast(txt, bg.rgb) < 4.5) {
          const best = colors.map(c => [c, contrast(hex2rgb(c), bg.rgb)]).sort((a, b) => b[1] - a[1])[0][0];
          el.setAttribute('fill', best); txt = hex2rgb(best);
        }
        const s = parseFloat(el.getAttribute('font-size')) || 30;
        const list = fxText === 'auto' ? (S ? autoFx(s, txt, bg) : []) : fxText === 'none' ? [] : [fxText];
        const used = [];
        list.forEach(name => {
          if (name === 'outline' && fxText === 'auto' && el.hasAttribute('stroke')) return;
          setAttrs(el, FX[name](svg, s, txt, bg.rgb));
          used.push(name);
        });
        if (used.length) { // ghi lại để xuất PowerPoint dựng lại đúng hiệu ứng và màu bóng
          el.setAttribute('data-fx', used.join(' '));
          el.setAttribute('data-fx-col', lum(txt) > lum(bg.rgb) ? '000000' : 'FFFFFF');
        }
      });
    });
    if (fxBg !== 'none' && (S || fxBg !== 'auto')) bgLayer(svg, t, fxBg, S);
  }

  /* ---------------- Bảng màu ---------------- */
  const PALETTES = [
    ['Navy chuyên nghiệp', ['#0B1F4B', '#1565C0', '#4FC3F7', '#E3F2FD', '#FFFFFF']],
    ['Đỏ – vàng trang trọng', ['#7A0012', '#B3001B', '#F2C14E', '#FFE9A3', '#FFF8E1']],
    ['Đen – vàng gold', ['#0C0B0D', '#2A241A', '#8C6D1F', '#D4AF37', '#FFF6D5']],
    ['Lục bảo – vàng', ['#04342A', '#064E3B', '#0F766E', '#D4AF37', '#F3E9C6']],
    ['Thanh niên', ['#0D47A1', '#1E88E5', '#E53935', '#FFD600', '#FFFFFF']],
    ['Tết đỏ mai', ['#5D1010', '#C62828', '#E8740C', '#FFD54F', '#FFF8E1']],
    ['Pastel cưới', ['#6B4E3D', '#C9A27E', '#E8A0A8', '#F6D6D6', '#FFF8F0']],
    ['Hồng ngọt ngào', ['#831843', '#DB2777', '#F472B6', '#FBCFE8', '#FFF1F7']],
    ['Tím mộng mơ', ['#2E1065', '#6D28D9', '#A78BFA', '#F0ABFC', '#FDF4FF']],
    ['Neon đêm', ['#050816', '#1A0B3B', '#7C4DFF', '#FF2E88', '#00E5FF']],
    ['Cam năng động', ['#1F2937', '#C2410C', '#FB923C', '#FED7AA', '#FFF7ED']],
    ['Hoàng hôn', ['#2B193D', '#8E2C48', '#E35D5B', '#F7B267', '#FDE8C9']],
    ['Xanh lá tự nhiên', ['#1B4332', '#2D6A4F', '#52B788', '#B7E4C7', '#F1F8E9']],
    ['Biển nhiệt đới', ['#023047', '#219EBC', '#8ECAE6', '#FFB703', '#FFF3D6']],
    ['Xanh y tế', ['#0B3C49', '#0E7490', '#22D3EE', '#CFFAFE', '#F0FDFF']],
    ['Be Bắc Âu', ['#3E2C23', '#8D6E63', '#D7A86E', '#EADBC8', '#FAF6F0']],
    ['Đen trắng tối giản', ['#111111', '#3F3F46', '#E63946', '#E4E4E7', '#FAFAFA']],
    ['Cầu vồng thiếu nhi', ['#3949AB', '#E53935', '#43A047', '#FDD835', '#E1F5FE']],
  ];
  const SCHEMES = { mono: 'Đơn sắc', comp: 'Bổ túc', analog: 'Tương đồng', triad: 'Bộ ba' };
  function generate(base, scheme) {
    const [h, s] = hsl(base), S = Math.max(0.35, s);
    const acc = { mono: h, comp: h + 180, analog: h + 35, triad: h + 120 }[scheme] || h;
    return [fromHsl(h, S * 0.7, 0.13), base, fromHsl(acc, Math.min(0.9, S + 0.1), scheme === 'mono' ? 0.62 : 0.55), fromHsl(h, S * 0.6, 0.88), fromHsl(h, 0.3, 0.97)];
  }
  /* Ghép bảng màu vào các ô màu của mẫu: giữ đúng vai trò sáng / tối / rực rỡ của màu gốc */
  function mapPalette(t, pal) {
    const slots = t.colors.map(c => ({ k: c.k, h: hsl(c.v) }));
    const cands = pal.map(c => ({ c, h: hsl(c) }));
    const pairs = [];
    slots.forEach((s, i) => cands.forEach((c, j) => pairs.push([i, j, 2 * Math.abs(s.h[2] - c.h[2]) + Math.abs(s.h[1] - c.h[1])])));
    pairs.sort((a, b) => a[2] - b[2]);
    const out = {}, us = new Set(), uc = new Set();
    pairs.forEach(([i, j]) => { if (us.has(i) || uc.has(j)) return; us.add(i); uc.add(j); out[slots[i].k] = cands[j].c; });
    return out;
  }

  /* Khung chữ (theo hộp phông) trong hệ tọa độ của bản vẽ */
  function measure(svg, el) {
    const M = svg.getScreenCTM().inverse().multiply(el.getScreenCTM()), bb = el.getBBox();
    const ps = [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]].map(q => {
      const pt = svg.createSVGPoint(); pt.x = q[0]; pt.y = q[1]; return pt.matrixTransform(M);
    });
    return {
      x1: Math.min.apply(null, ps.map(p => p.x)), x2: Math.max.apply(null, ps.map(p => p.x)),
      y1: Math.min.apply(null, ps.map(p => p.y)), y2: Math.max.apply(null, ps.map(p => p.y)),
      scale: Math.hypot(M.c, M.d), skew: M.c / (M.d || 1),
    };
  }

  root.BLStudio = { measure, fillColor, lumOf: lum, autoLayout, applyLook, PALETTES, SCHEMES, generate, mapPalette, contrast, hex2rgb };
})(window);
