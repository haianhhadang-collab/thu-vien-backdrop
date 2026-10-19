/* =========================================================================
 * symbols.js — Biểu tượng chủ đề chính trị – lịch sử – văn hóa Việt Nam
 * (cờ Tổ quốc, cờ Đảng, búa liềm, sao vàng, Lăng Bác, Khuê Văn Các, Chùa Một Cột,
 *  Cột cờ Hà Nội, nhà sàn, cây tre, bản đồ Việt Nam, dải lụa, nến tri ân, chim bồ câu)
 * Dùng chung cho mẫu backdrop và họa tiết. Vẽ cách điệu, không thay thế bản chuẩn.
 * ========================================================================= */
(function (root) {
  'use strict';
  const { r2, rad, starPts, shade, tint, T } = root.BL;
  const RED = '#DA251D', YELLOW = '#FFDE00';

  /* Ngôi sao vàng năm cánh (tỉ lệ bán kính trong / ngoài 0,382) */
  const star5 = (cx, cy, R, fill) => `<polygon points="${starPts(cx, cy, R, R * 0.382, 5)}" fill="${fill}"/>`;

  /* Búa liềm — vẽ trong hộp 100 × 100, tâm (0,0); s = cạnh hộp */
  function hammerSickle(cx, cy, s, fill) {
    const P = (c, r, a) => [c[0] + r * Math.cos(rad(a)), c[1] + r * Math.sin(rad(a))];
    const oc = [4, -2], orr = 36, ic = [-0.2, -6.2], ir = 28;
    const o1 = P(oc, orr, 135), o2 = P(oc, orr, 212), it = P(ic, ir, 212), i1 = P(ic, ir, 135);
    const f = q => `${r2(q[0])} ${r2(q[1])}`;
    const blade = `M ${f(o1)} A ${orr} ${orr} 0 1 0 ${f(o2)} L ${f(it)} A ${ir} ${ir} 0 1 1 ${f(i1)} Z`;
    const hc = P(oc, orr + 4, 135);
    return `<g transform="translate(${r2(cx)} ${r2(cy)}) scale(${r2(s / 100)})" fill="${fill}">` +
      `<path d="${blade}"/>` +
      `<rect x="-6" y="-11" width="12" height="22" rx="3" transform="translate(${r2(hc[0])} ${r2(hc[1])}) rotate(45)"/>` +
      `<rect x="-4.6" y="-28" width="9.2" height="58" rx="2" transform="translate(8 8) rotate(-45)"/>` +
      `<rect x="-19" y="-7.5" width="38" height="15" rx="2" transform="translate(-17 -17) rotate(45)"/>` +
      `</g>`;
  }

  /* Lá cờ tung bay: kind 'vn' (cờ Tổ quốc) | 'dang' (cờ Đảng). (x,y) = góc trên trái của lá cờ */
  function flag(x, y, w, h, kind, o) {
    o = o || {};
    const a = h * (o.wave == null ? 0.12 : o.wave);
    const d = `M ${r2(x)} ${r2(y)} C ${r2(x + w * 0.33)} ${r2(y - a)} ${r2(x + w * 0.66)} ${r2(y + a)} ${r2(x + w)} ${r2(y)} L ${r2(x + w)} ${r2(y + h)} C ${r2(x + w * 0.66)} ${r2(y + h + a)} ${r2(x + w * 0.33)} ${r2(y + h - a)} ${r2(x)} ${r2(y + h)} Z`;
    const cx = x + w / 2, cy = y + h / 2;
    // o.flip: lá cờ bay sang trái – chỉ lật mép sóng, biểu tượng (búa liềm / sao) luôn giữ đúng chiều chuẩn
    const mir = o.flip ? ` transform="translate(${r2(2 * cx)} 0) scale(-1 1)"` : '';
    let s = `<g${mir}><path d="${d}" fill="${RED}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="1.5"` : ''}/>` +
      `<path d="M ${r2(x)} ${r2(y)} C ${r2(x + w * 0.33)} ${r2(y - a)} ${r2(x + w * 0.66)} ${r2(y + a)} ${r2(x + w)} ${r2(y)}" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="${r2(h * 0.08)}"/></g>`;
    s += kind === 'dang' ? hammerSickle(cx, cy, h * 0.62, YELLOW) : star5(cx, cy, h * 0.3, YELLOW);
    return s;
  }
  /* Cờ có cán: side = 1 cờ bay sang phải, -1 bay sang trái */
  function flagOnPole(px, top, len, w, h, kind, side, poleColor) {
    const x = side > 0 ? px : px - w;
    const fl = flag(x, top + 4, w, h, kind, { flip: side < 0 });
    return `<line x1="${r2(px)}" y1="${r2(top - 8)}" x2="${r2(px)}" y2="${r2(top + len)}" stroke="${poleColor || '#E9C46A'}" stroke-width="${r2(Math.max(3, h * 0.035))}" stroke-linecap="round"/>` +
      `<circle cx="${r2(px)}" cy="${r2(top - 10)}" r="${r2(Math.max(4, h * 0.04))}" fill="${poleColor || '#E9C46A'}"/>` + fl;
  }

  /* Sao vàng tỏa tia */
  function starBurst(cx, cy, R, color, rays) {
    let s = '';
    const n = rays || 36;
    for (let i = 0; i < n; i += 2) {
      const a1 = rad(i * 360 / n), a2 = rad((i + 1) * 360 / n);
      s += `<polygon points="${r2(cx)},${r2(cy)} ${r2(cx + R * 4 * Math.cos(a1))},${r2(cy + R * 4 * Math.sin(a1))} ${r2(cx + R * 4 * Math.cos(a2))},${r2(cy + R * 4 * Math.sin(a2))}" fill="${color}" opacity="0.12"/>`;
    }
    return s + `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(R * 1.25)}" fill="${color}" opacity="0.18"/>` + star5(cx, cy, R, color);
  }

  /* ---------------- Công trình (bóng đổ một màu, gốc tại chân giữa) ---------------- */
  const sil = (cx, base, w, fill, design, dw) => `<g transform="translate(${r2(cx)} ${r2(base)}) scale(${r2(w / dw)})" fill="${fill}">${design}</g>`;
  /* Lăng Chủ tịch Hồ Chí Minh */
  function langBac(cx, base, w, fill) {
    let d = `<rect x="-160" y="-14" width="320" height="14"/><rect x="-146" y="-26" width="292" height="12"/><rect x="-132" y="-40" width="264" height="14"/>`;
    for (let i = 0; i < 9; i++) d += `<rect x="${-118 + i * 28}" y="-92" width="12" height="52"/>`;
    d += `<rect x="-128" y="-104" width="256" height="12"/><rect x="-112" y="-114" width="224" height="10"/><rect x="-96" y="-124" width="192" height="10"/><rect x="-80" y="-132" width="160" height="8"/>` +
      `<rect x="-60" y="-84" width="120" height="10" opacity="0.5"/>`;
    return sil(cx, base, w, fill, d, 320);
  }
  /* Khuê Văn Các (Văn Miếu – Quốc Tử Giám) */
  function khueVanCac(cx, base, w, fill) {
    let d = `<rect x="-90" y="-10" width="180" height="10"/>`;
    [-66, -24, 24, 66].forEach(x => { d += `<rect x="${x - 12}" y="-78" width="24" height="68"/>`; });
    d += `<rect x="-84" y="-90" width="168" height="12"/>` +
      `<path d="M -110 -96 Q -96 -92 -84 -104 H 84 Q 96 -92 110 -96 L 96 -88 H -96 Z"/>` +
      `<rect x="-56" y="-150" width="112" height="56"/>` +
      `<circle cx="0" cy="-122" r="20" fill="#fff" fill-opacity="0.85"/>` +
      `<g stroke="${fill}" stroke-width="2.5">` + [0, 30, 60, 90, 120, 150].map(a => `<line x1="${r2(20 * Math.cos(rad(a)))}" y1="${r2(-122 + 20 * Math.sin(rad(a)))}" x2="${r2(-20 * Math.cos(rad(a)))}" y2="${r2(-122 - 20 * Math.sin(rad(a)))}"/>`).join('') + '</g>' +
      `<path d="M -96 -150 Q -80 -146 -68 -160 H 68 Q 80 -146 96 -150 L 84 -144 H -84 Z"/>` +
      `<path d="M -64 -160 L -40 -186 H 40 L 64 -160 Z"/><path d="M -76 -160 Q -66 -158 -60 -168 L -64 -160 Z M 76 -160 Q 66 -158 60 -168 L 64 -160 Z"/>` +
      `<rect x="-46" y="-192" width="92" height="7"/><circle cx="0" cy="-198" r="6"/>`;
    return sil(cx, base, w, fill, d, 220);
  }
  /* Chùa Một Cột */
  function chuaMotCot(cx, base, w, fill) {
    const d = `<ellipse cx="0" cy="-6" rx="120" ry="12" opacity="0.45"/><rect x="-9" y="-70" width="18" height="64"/>` +
      `<path d="M -40 -70 L -9 -54 H 9 L 40 -70 Z"/><rect x="-58" y="-80" width="116" height="10"/>` +
      [-50, -30, -10, 10, 30, 50].map(x => `<rect x="${x - 2}" y="-92" width="4" height="12"/>`).join('') +
      `<rect x="-58" y="-94" width="116" height="4"/><rect x="-42" y="-128" width="84" height="34"/>` +
      `<path d="M -84 -124 Q -72 -126 -64 -140 Q 0 -160 64 -140 Q 72 -126 84 -124 L 70 -132 Q 0 -150 -70 -132 Z"/>` +
      `<path d="M -62 -136 Q 0 -178 62 -136 Z"/><circle cx="0" cy="-166" r="5"/>`;
    return sil(cx, base, w, fill, d, 240);
  }
  /* Cột cờ Hà Nội (kèm lá cờ Tổ quốc nhỏ) */
  function cotCo(cx, base, w, fill, withFlag) {
    let d = `<rect x="-90" y="-40" width="180" height="40"/><rect x="-66" y="-76" width="132" height="36"/><rect x="-42" y="-106" width="84" height="30"/>` +
      `<path d="M -20 -106 L -16 -236 H 16 L 20 -106 Z"/><rect x="-28" y="-252" width="56" height="16"/><path d="M -24 -252 L 0 -268 L 24 -252 Z"/>` +
      `<rect x="-2" y="-340" width="4" height="74"/>`;
    [-150, -120, -90, -60].forEach(y => { d += `<rect x="-5" y="${y}" width="10" height="12" fill="#fff" fill-opacity="0.5"/>`; });
    const g = sil(cx, base, w, fill, d, 180);
    if (!withFlag) return g;
    const k = w / 180, fx = cx + 2 * k, fy = base - 338 * k;
    return g + flag(fx, fy, 64 * k, 42 * k, 'vn', { wave: 0.15 });
  }
  /* Nhà sàn Bác Hồ */
  function nhaSan(cx, base, w, fill) {
    let d = '';
    [-110, -60, 0, 60, 110].forEach(x => { d += `<rect x="${x - 5}" y="-60" width="10" height="60"/>`; });
    d += `<rect x="-130" y="-68" width="260" height="8"/><rect x="-120" y="-120" width="240" height="52" opacity="0.85"/>`;
    for (let x = -100; x <= 100; x += 40) d += `<rect x="${x - 12}" y="-110" width="24" height="30" fill="#fff" fill-opacity="0.35"/>`;
    d += `<path d="M -150 -116 L -96 -176 H 96 L 150 -116 Z"/><rect x="-100" y="-182" width="200" height="6"/>` +
      `<rect x="-150" y="-68" width="40" height="4"/><path d="M 120 -60 L 160 0 H 150 L 112 -60 Z" opacity="0.8"/>`;
    return sil(cx, base, w, fill, d, 320);
  }
  /* Bụi tre (gốc ở (x, base), cao h) */
  function bamboo(x, base, h, fill, dir) {
    dir = dir || 1;
    let s = '';
    [[0, 1, 0.08], [18, 0.85, 0.14], [36, 0.7, 0.2]].forEach((st, i) => {
      const bx = x + st[0] * dir, H = h * st[1], lean = H * st[2] * dir, tx = bx + lean, ty = base - H;
      s += `<path d="M ${r2(bx)} ${r2(base)} Q ${r2(bx + lean * 0.3)} ${r2(base - H * 0.5)} ${r2(tx)} ${r2(ty)}" fill="none" stroke="${fill}" stroke-width="${r2(Math.max(3, h * 0.022))}" stroke-linecap="round"/>`;
      for (let k = 1; k < 6; k++) {
        const t = k / 6, nx = bx + lean * t * t, ny = base - H * t;
        s += `<line x1="${r2(nx - 6)}" y1="${r2(ny)}" x2="${r2(nx + 6)}" y2="${r2(ny)}" stroke="${fill}" stroke-width="2.5"/>`;
        if (k >= 3) [-1, 1].forEach(sd => {
          const L = h * 0.09, a = rad(-90 + sd * 55 + dir * 10);
          s += `<path d="M ${r2(nx)} ${r2(ny)} Q ${r2(nx + L * 0.6 * Math.cos(a) - 3)} ${r2(ny + L * 0.6 * Math.sin(a) - 3)} ${r2(nx + L * Math.cos(a))} ${r2(ny + L * Math.sin(a))} Q ${r2(nx + L * 0.6 * Math.cos(a) + 3)} ${r2(ny + L * 0.6 * Math.sin(a) + 3)} ${r2(nx)} ${r2(ny)} Z" fill="${fill}"/>`;
        });
      }
    });
    return s;
  }

  /* ---------------- Bản đồ Việt Nam (cách điệu) ---------------- */
  const VN = [[105.32, 23.39], [105.9, 23.0], [106.6, 22.9], [106.75, 22.4], [106.6, 22.0], [107.4, 21.6], [108.05, 21.55], [107.8, 21.4], [107.3, 21.0], [106.8, 20.85],
    [106.6, 20.4], [106.2, 20.0], [105.95, 19.6], [105.8, 19.0], [105.7, 18.7], [106.1, 18.3], [106.5, 17.8], [106.7, 17.4], [107.1, 17.0], [107.6, 16.5], [108.2, 16.05],
    [108.7, 15.5], [108.9, 15.0], [109.05, 14.2], [109.25, 13.6], [109.2, 13.0], [109.3, 12.3], [109.15, 11.8], [109.0, 11.35], [108.6, 11.1], [108.0, 10.7], [107.4, 10.45],
    [107.0, 10.35], [106.75, 10.1], [106.6, 9.7], [106.2, 9.4], [105.6, 9.0], [105.1, 8.6], [104.75, 8.6], [104.85, 9.3], [104.9, 9.9], [105.1, 10.0], [104.6, 10.3],
    [104.45, 10.42], [104.9, 10.85], [105.6, 11.0], [106.2, 11.7], [106.7, 11.95], [107.4, 12.25], [107.6, 12.9], [107.5, 13.6], [107.45, 14.4], [107.5, 14.7], [107.2, 15.0],
    [107.0, 15.5], [107.3, 15.9], [107.0, 16.3], [106.7, 16.5], [106.5, 16.9], [106.3, 17.3], [105.9, 17.6], [105.6, 18.0], [105.2, 18.4], [104.6, 18.8], [104.1, 19.1],
    [104.0, 19.4], [104.5, 19.6], [104.9, 20.0], [104.6, 20.3], [104.1, 20.5], [103.6, 20.7], [103.2, 20.9], [102.9, 21.3], [102.7, 21.6], [102.4, 21.9], [102.14, 22.4],
    [102.5, 22.75], [103.0, 22.7], [103.5, 22.6], [104.0, 22.75], [104.4, 22.8], [104.8, 23.0]];
  /* (x0,y0) = góc trên trái khung bản đồ, h = chiều cao; trả về chiều rộng thực tế qua w() */
  function vnMap(x0, y0, h, fill, o) {
    o = o || {};
    const S = h / 16.6, X = lon => x0 + (lon - 102) * S, Y = lat => y0 + (23.6 - lat) * S * 1.03;
    let s = `<path d="M ${VN.map(q => r2(X(q[0])) + ' ' + r2(Y(q[1]))).join(' L ')} Z" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1.5}" stroke-linejoin="round"` : ''}/>`;
    const dot = (lon, lat, r) => `<circle cx="${r2(X(lon))}" cy="${r2(Y(lat))}" r="${r2(r * S / 30)}" fill="${o.island || fill}"/>`;
    s += `<ellipse cx="${r2(X(103.97))}" cy="${r2(Y(10.25))}" rx="${r2(S * 0.12)}" ry="${r2(S * 0.22)}" fill="${fill}"/>` + dot(106.6, 8.7, 4) + dot(107.73, 20.13, 3) + dot(107.05, 20.8, 4);
    const HS = [[111.6, 16.5], [111.9, 16.95], [112.3, 16.8], [112.1, 16.2], [111.75, 16.05], [112.6, 16.55]];
    const TS = [[114.3, 11.4], [114.0, 10.9], [114.4, 10.4], [113.8, 10.0], [114.9, 9.9], [114.1, 9.4], [113.4, 8.9], [114.5, 8.8], [112.9, 8.65], [114.9, 10.6]];
    HS.concat(TS).forEach(q => { s += dot(q[0], q[1], 5); });
    if (o.labels !== false) {
      const lc = o.label || fill, fs = Math.max(9, S * 0.42);
      s += T('Hoàng Sa', X(112.1), Y(17.45), { size: fs, weight: 700, fill: lc, noScale: true, attrs: 'data-deco="1"' }) +
        T('Trường Sa', X(113.9), Y(11.95), { size: fs, weight: 700, fill: lc, noScale: true, attrs: 'data-deco="1"' });
    }
    return s;
  }
  vnMap.width = h => 13.2 * h / 16.6;

  /* Dải lụa uốn lượn hai màu (dải dưới); flip = true cho dải trên */
  function silk(W, H, c1, c2, flip) {
    let s = `<path d="M 0 ${r2(H * 0.84)} C ${r2(W * 0.28)} ${r2(H * 0.68)} ${r2(W * 0.55)} ${r2(H * 1.0)} ${W} ${r2(H * 0.74)} L ${W} ${r2(H * 0.84)} C ${r2(W * 0.55)} ${r2(H * 1.08)} ${r2(W * 0.28)} ${r2(H * 0.77)} 0 ${r2(H * 0.93)} Z" fill="${c1}"/>` +
      `<path d="M 0 ${r2(H * 0.81)} C ${r2(W * 0.28)} ${r2(H * 0.65)} ${r2(W * 0.55)} ${r2(H * 0.97)} ${W} ${r2(H * 0.71)}" fill="none" stroke="${c2}" stroke-width="4"/>` +
      `<path d="M 0 ${r2(H * 0.95)} C ${r2(W * 0.28)} ${r2(H * 0.79)} ${r2(W * 0.55)} ${r2(H * 1.1)} ${W} ${r2(H * 0.86)}" fill="none" stroke="${c2}" stroke-width="2.5"/>` +
      `<path d="M 0 ${r2(H * 0.9)} C ${r2(W * 0.3)} ${r2(H * 0.76)} ${r2(W * 0.6)} ${r2(H * 1.05)} ${W} ${r2(H * 0.8)}" fill="none" stroke="#fff" stroke-opacity="0.25" stroke-width="2"/>`;
    return flip ? `<g transform="translate(${W} ${H}) rotate(180)">${s}</g>` : s;
  }

  /* Nến tri ân */
  function candle(x, base, h, c) {
    const w = h * 0.32;
    return `<circle cx="${r2(x)}" cy="${r2(base - h - h * 0.28)}" r="${r2(h * 0.55)}" fill="#FFD54F" opacity="0.18"/>` +
      `<rect x="${r2(x - w / 2)}" y="${r2(base - h)}" width="${r2(w)}" height="${r2(h)}" rx="${r2(w * 0.15)}" fill="${c || '#FFF3E0'}"/>` +
      `<rect x="${r2(x - w / 2)}" y="${r2(base - h)}" width="${r2(w * 0.3)}" height="${r2(h)}" fill="#fff" opacity="0.4"/>` +
      `<line x1="${r2(x)}" y1="${r2(base - h)}" x2="${r2(x)}" y2="${r2(base - h - h * 0.08)}" stroke="#3E2723" stroke-width="1.5"/>` +
      `<path d="M ${r2(x)} ${r2(base - h - h * 0.5)} C ${r2(x + w * 0.45)} ${r2(base - h - h * 0.25)} ${r2(x + w * 0.3)} ${r2(base - h - h * 0.05)} ${r2(x)} ${r2(base - h - h * 0.06)} C ${r2(x - w * 0.3)} ${r2(base - h - h * 0.05)} ${r2(x - w * 0.45)} ${r2(base - h - h * 0.25)} ${r2(x)} ${r2(base - h - h * 0.5)} Z" fill="#FF9800"/>` +
      `<path d="M ${r2(x)} ${r2(base - h - h * 0.34)} C ${r2(x + w * 0.2)} ${r2(base - h - h * 0.2)} ${r2(x + w * 0.12)} ${r2(base - h - h * 0.08)} ${r2(x)} ${r2(base - h - h * 0.08)} C ${r2(x - w * 0.12)} ${r2(base - h - h * 0.08)} ${r2(x - w * 0.2)} ${r2(base - h - h * 0.2)} ${r2(x)} ${r2(base - h - h * 0.34)} Z" fill="#FFF59D"/>`;
  }
  /* Chim bồ câu hòa bình */
  const dove = (x, y, k, c) => `<path d="M 0 0 C 10 -14 26 -16 34 -8 C 40 -22 58 -28 74 -24 C 60 -14 52 -4 46 6 C 56 6 64 10 68 16 C 52 16 38 14 28 10 C 18 15 8 15 0 10 C 6 6 6 3 0 0 Z" fill="${c || '#fff'}" opacity="0.92" transform="translate(${r2(x)} ${r2(y)}) scale(${r2(k)})"/>`;
  /* Hoa sen (đóa nhìn ngang) */
  function lotus(x, y, s, c, leafC) {
    const pet = (len, rot, f) => `<path d="M 0 0 C ${r2(-len * 0.45)} ${r2(-len * 0.35)} ${r2(-len * 0.3)} ${r2(-len * 0.85)} 0 ${r2(-len)} C ${r2(len * 0.3)} ${r2(-len * 0.85)} ${r2(len * 0.45)} ${r2(-len * 0.35)} 0 0 Z" fill="${f}" transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})"/>`;
    return (leafC ? `<ellipse cx="${r2(x)}" cy="${r2(y + s * 0.08)}" rx="${r2(s * 0.95)}" ry="${r2(s * 0.16)}" fill="${leafC}"/>` : '') +
      pet(s * 0.7, -72, tint(c, 0.35)) + pet(s * 0.7, 72, tint(c, 0.35)) + pet(s * 0.85, -40, tint(c, 0.15)) + pet(s * 0.85, 40, tint(c, 0.15)) + pet(s, 0, c);
  }

  root.BL.sym = { RED, YELLOW, star5, hammerSickle, flag, flagOnPole, starBurst, langBac, khueVanCac, chuaMotCot, cotCo, nhaSan, bamboo, vnMap, silk, candle, dove, lotus };
})(typeof window !== 'undefined' ? window : globalThis);
