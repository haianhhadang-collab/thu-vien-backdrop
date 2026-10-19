/* =========================================================================
 * backdrops2.js — 16 mẫu backdrop bổ sung (B13 – B28), khung 1200 × 600
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, TL, star, starPts, laurel, flower, leaf, mix, shade, tint, textW, fitSize, rng, r2, rad, logoSlot, esc } = root.BL;
  const { F, C, STD, lin, radial, sparkle, confetti, heart } = root.BL.bd;
  const add = t => root.BL.templates.push(Object.assign({ type: 'backdrop', w: 1200, h: 600 }, t));

  /* Chữ trong viên thuốc (pill) */
  function pill(text, cx, y, o) {
    if (!text) return '';
    const fam = o.font || 'Be Vietnam Pro', wt = o.weight || 600;
    const fs = fitSize(text, o.size || 20, o.maxW || 640, fam, wt, o.ls || 0), w = textW(text, fs, fam, wt, o.ls || 0);
    const x = o.anchor === 'start' ? cx : cx - w / 2 - 26;
    return `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w + 52)}" height="${r2(fs + 26)}" rx="${r2((fs + 26) / 2)}" fill="${o.bg}"${o.bgOp ? ` fill-opacity="${o.bgOp}"` : ''}/>` +
      T(text, x + 26 + w / 2, y + fs + 8, { size: fs, font: fam, weight: wt, fill: o.fill, ls: o.ls || 0 });
  }
  /* Bóng bay */
  function balloon(x, y, rx, color, tail) {
    const ry = rx * 1.22;
    return `<path d="M ${r2(x)} ${r2(y + ry)} C ${r2(x - 18)} ${r2(y + ry + 60)} ${r2(x + 22)} ${r2(y + ry + 110)} ${r2(x + (tail || 0))} ${r2(y + ry + 190)}" fill="none" stroke="${shade(color, 0.35)}" stroke-width="1.5"/>` +
      `<polygon points="${r2(x - 7)},${r2(y + ry + 9)} ${r2(x + 7)},${r2(y + ry + 9)} ${r2(x)},${r2(y + ry - 2)}" fill="${shade(color, 0.15)}"/>` +
      `<ellipse cx="${r2(x)}" cy="${r2(y)}" rx="${r2(rx)}" ry="${r2(ry)}" fill="${color}"/>` +
      `<ellipse cx="${r2(x - rx * 0.38)}" cy="${r2(y - ry * 0.4)}" rx="${r2(rx * 0.16)}" ry="${r2(ry * 0.26)}" fill="#fff" opacity="0.5" transform="rotate(-25 ${r2(x - rx * 0.38)} ${r2(y - ry * 0.4)})"/>`;
  }
  /* Dây cờ đuôi nheo */
  function bunting(x1, x2, y, sag, colors, n) {
    let s = `<path d="M ${x1} ${y} Q ${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}" fill="none" stroke="#5D4037" stroke-width="2"/>`;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, px = x1 + (x2 - x1) * t, py = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + sag * 2) + t * t * y;
      s += `<polygon points="${r2(px - 16)},${r2(py)} ${r2(px + 16)},${r2(py)} ${r2(px)},${r2(py + 38)}" fill="${colors[i % colors.length]}"/>`;
    }
    return s;
  }
  /* Bông tuyết */
  const flake = (x, y, s, op) => `<g stroke="#fff" stroke-width="${r2(s * 0.12)}" stroke-linecap="round" opacity="${op}">` +
    [0, 60, 120].map(a => `<line x1="${r2(x - s * Math.cos(rad(a)))}" y1="${r2(y - s * Math.sin(rad(a)))}" x2="${r2(x + s * Math.cos(rad(a)))}" y2="${r2(y + s * Math.sin(rad(a)))}"/>`).join('') + '</g>';
  /* Người cách điệu */
  const person = (x, y, s, fill, op) => `<g fill="${fill}" opacity="${op == null ? 1 : op}"><circle cx="${r2(x)}" cy="${r2(y - s * 0.95)}" r="${r2(s * 0.36)}"/>` +
    `<path d="M ${r2(x - s * 0.62)} ${r2(y + s * 0.6)} V ${r2(y - s * 0.1)} Q ${r2(x - s * 0.62)} ${r2(y - s * 0.5)} ${r2(x)} ${r2(y - s * 0.5)} Q ${r2(x + s * 0.62)} ${r2(y - s * 0.5)} ${r2(x + s * 0.62)} ${r2(y - s * 0.1)} V ${r2(y + s * 0.6)} Z"/></g>`;
  /* Tiêu đề chạy màu cầu vồng từng chữ */
  let rainbowN = 0;
  function rainbowTitle(text, x, y, o, colors, lh) {
    const lines = String(text || '').toUpperCase().split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (!lines.length) return { svg: '', h: 0 };
    const fam = o.font || 'Be Vietnam Pro', wt = o.weight || 900;
    const s = Math.min.apply(null, lines.map(l => fitSize(l, o.size * root.BL.headScale(), o.maxW, fam, wt, 0))), blk = 'r' + (++rainbowN);
    let k = 0;
    const svg = lines.map((l, i) => `<text x="${x}" y="${r2(y + i * s * lh)}" font-family="'${fam}', sans-serif" font-size="${r2(s)}" font-weight="${wt}" text-anchor="middle" stroke="#fff" stroke-width="${r2(s * 0.14)}" paint-order="stroke" stroke-linejoin="round" data-blk="${blk}">` +
      Array.from(l).map(ch => ch === ' ' ? ' ' : `<tspan fill="${colors[(k++) % colors.length]}">${esc(ch)}</tspan>`).join('') + '</text>').join('');
    return { svg, h: (lines.length - 1) * s * lh };
  }

  /* B13 — Đại hội Đoàn / thanh niên */
  add({
    id: 'B13', name: 'Đại hội Đoàn – thanh niên', styles: ['Trang trọng', 'Năng động'], topic: 'Thể thao – thanh niên',
    use: 'Đại hội Đoàn, Hội sinh viên, diễn đàn thanh niên, lễ kết nạp, chiến dịch tình nguyện',
    desc: 'Xanh dương thanh niên với tia sáng tỏa, ngôi sao lớn chìm và dải lụa đỏ – vàng uốn lượn phía dưới: trẻ trung nhưng vẫn trang trọng.',
    fields: STD({ org: 'Đoàn TNCS Hồ Chí Minh', kicker: 'Đại hội đại biểu', title: 'ĐOÀN TRƯỜNG ĐẠI HỌC ÁNH DƯƠNG\nLẦN THỨ X, NHIỆM KỲ 2026 – 2028', subtitle: 'Đoàn kết – Xung kích – Sáng tạo – Phát triển', info: 'Ngày 26 tháng 11 năm 2026' }),
    colors: [C('c1', 'Màu xanh chủ đạo', '#1565C0'), C('c2', 'Màu vàng', '#FFD600'), C('c3', 'Màu đỏ', '#E53935')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [tint(p.c1, 0.18), p.c1, shade(p.c1, 0.4)])}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      for (let i = 0; i < 36; i += 2) {
        const a1 = rad(i * 10), a2 = rad(i * 10 + 5);
        s += `<polygon points="600,330 ${r2(600 + 900 * Math.cos(a1))},${r2(330 + 900 * Math.sin(a1))} ${r2(600 + 900 * Math.cos(a2))},${r2(330 + 900 * Math.sin(a2))}" fill="#fff" opacity="0.045"/>`;
      }
      s += `<polygon points="${starPts(600, 320, 300, 118, 5)}" fill="#fff" opacity="0.06"/>` +
        star(150, 150, 14, p.c2) + star(1050, 150, 14, p.c2) + star(95, 330, 9, p.c2) + star(1105, 330, 9, p.c2) +
        `<path d="M 0 505 C 300 455 760 590 1200 470 L 1200 600 L 0 600 Z" fill="${p.c3}"/>` +
        `<path d="M 0 540 C 340 495 780 610 1200 510 L 1200 600 L 0 600 Z" fill="${p.c2}"/>` +
        `<path d="M 0 566 C 360 530 800 615 1200 548 L 1200 600 L 0 600 Z" fill="#fff"/>` +
        logoSlot(p, 600, 68, 60) +
        T(p.org, 600, 124, { size: 18, weight: 600, upper: true, ls: 2, maxW: 900 }) +
        T(p.kicker, 600, 190, { size: 32, weight: 800, fill: p.c2, upper: true, ls: 6, maxW: 900 });
      const t = TL(p.title, 600, 262, { size: 48, weight: 800, upper: true, maxW: 1000 }, 1.22);
      const ys = 262 + t.h + 52;
      s += t.svg + T(p.subtitle, 600, ys, { size: 24, weight: 500, italic: true, maxW: 900, attrs: 'fill-opacity="0.92"' }) +
        T(p.info, 600, Math.max(ys + 50, 445), { size: 20, weight: 600, fill: p.c2, maxW: 800 });
      return s;
    },
  });

  /* B14 — Tết Trung thu */
  add({
    id: 'B14', name: 'Tết Trung thu đêm trăng', styles: ['Truyền thống', 'Vui tươi'], topic: 'Lễ hội – văn hóa',
    use: 'Vui Tết Trung thu ở trường, khu phố, công ty; đêm hội trăng rằm cho thiếu nhi',
    desc: 'Đêm xanh tím, trăng tròn tỏa sáng, mây tường vân và đèn ông sao treo lơ lửng. Tiêu đề nhũ vàng, khẩu hiệu viết tay.',
    fields: STD({ org: 'Ban Đại diện Cha mẹ học sinh', kicker: 'Vui hội trăng rằm', title: 'TẾT TRUNG THU', subtitle: 'Rước đèn – Phá cỗ – Đón trăng', info: '19:00 • Rằm tháng Tám • Sân trường Tiểu học Hoa Sen' }),
    colors: [C('c1', 'Màu trời đêm', '#0B1A3A'), C('c2', 'Màu tím', '#3B1F6B'), C('c3', 'Màu trăng – vàng', '#FFD54F')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c1, p.c2], 0, 1)}${radial(u + 'gl', [[p.c3, 0, 0.45], [p.c3, 1, 0]], 0.5, 0.5, 0.5)}` +
        `${lin(u + 'gd', [[tint(p.c3, 0.7), 0], [p.c3, 0.5], [shade(p.c3, 0.2), 1]], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      const R = rng(31);
      for (let i = 0; i < 70; i++) s += `<circle cx="${r2(R() * 1200)}" cy="${r2(R() * 460)}" r="${r2(0.6 + R() * 1.6)}" fill="#fff" opacity="${r2(0.3 + R() * 0.7)}"/>`;
      for (let i = 0; i < 6; i++) s += sparkle(360 + R() * 520, 40 + R() * 120, 4 + R() * 6, '#fff', 0.8);
      s += `<circle cx="1000" cy="160" r="270" fill="url(#${u}gl)"/><circle cx="1000" cy="160" r="105" fill="${tint(p.c3, 0.55)}"/>` +
        `<circle cx="965" cy="130" r="18" fill="${tint(p.c3, 0.3)}" opacity="0.6"/><circle cx="1040" cy="190" r="24" fill="${tint(p.c3, 0.3)}" opacity="0.5"/><circle cx="1020" cy="115" r="10" fill="${tint(p.c3, 0.3)}" opacity="0.6"/>`;
      [[880, 245, 2.4], [1035, 270, 1.8], [130, 420, 1.6]].forEach(c => {
        s += `<path d="M 0 0 c 0 -14 18 -20 26 -10 c 4 -14 26 -16 32 0 c 12 -6 24 4 18 14 Z" fill="${p.c2}" stroke="${p.c3}" stroke-opacity="0.55" stroke-width="1.2" transform="translate(${c[0]} ${c[1]}) scale(${c[2]})"/>`;
      });
      [[110, 70, 52, '#E53935'], [230, 150, 38, '#FFB300'], [325, 40, 30, '#EC407A']].forEach(l => {
        const [x, len, Rr, col] = l, cy = len + Rr;
        s += `<line x1="${x}" y1="0" x2="${x}" y2="${len}" stroke="${p.c3}" stroke-width="1.5"/>` +
          `<polygon points="${starPts(x, cy, Rr, Rr * 0.46, 5)}" fill="${col}" stroke="${p.c3}" stroke-width="2.5" stroke-linejoin="round"/>` +
          `<polygon points="${starPts(x, cy, Rr * 0.45, Rr * 0.2, 5)}" fill="${tint(col, 0.5)}"/>` +
          `<line x1="${x}" y1="${r2(cy + Rr * 0.75)}" x2="${x}" y2="${r2(cy + Rr * 1.5)}" stroke="${p.c3}" stroke-width="2"/><circle cx="${x}" cy="${r2(cy + Rr * 1.55)}" r="4" fill="${p.c3}"/>`;
      });
      s += `<path d="M 0 520 Q 250 462 520 512 T 1200 498 L 1200 600 L 0 600 Z" fill="${shade(p.c2, 0.45)}"/>` +
        `<path d="M 0 560 Q 300 520 640 556 T 1200 545 L 1200 600 L 0 600 Z" fill="${shade(p.c1, 0.4)}"/>` +
        logoSlot(p, 640, 62, 54, { color: p.c3 }) +
        T(p.org, 640, 116, { size: 17, weight: 600, upper: true, ls: 2, maxW: 600, attrs: 'fill-opacity="0.9"' }) +
        T(p.kicker, 640, 186, { size: 26, weight: 700, fill: p.c3, upper: true, ls: 8, maxW: 600 });
      const t = TL(p.title, 640, 290, { size: 92, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 600 }, 1.05);
      s += t.svg + T(p.subtitle, 640, 290 + t.h + 70, { size: 44, font: 'Dancing Script', weight: 700, maxW: 600 }) +
        T(p.info, 640, 530, { size: 19, weight: 500, maxW: 640, attrs: 'fill-opacity="0.9"' });
      return s;
    },
  });

  /* B15 — Giáng sinh */
  add({
    id: 'B15', name: 'Giáng sinh ấm áp', styles: ['Vui tươi', 'Sang trọng'], topic: 'Lễ hội – văn hóa',
    use: 'Tiệc Noel, đêm Giáng sinh ở công ty, trường học, trung tâm thương mại, nhà thờ',
    desc: 'Xanh thông – đỏ – kem, cây thông cách điệu với quả châu và dây kim tuyến, tuyết rơi nhẹ. Tiêu đề serif lớn căn trái.',
    fields: STD({ org: 'Trung tâm Anh ngữ Kidz English', kicker: 'Merry Christmas', title: 'GIÁNG SINH\nAN LÀNH', subtitle: 'Ấm áp yêu thương', info: '18:00 • 24.12.2026 • Sảnh chính tầng 1' }),
    colors: [C('c1', 'Màu xanh thông', '#0F5132'), C('c2', 'Màu đỏ', '#C1121F'), C('c3', 'Màu kem', '#F8F1E5')],
    render(p, u) {
      const gold = '#E9C46A';
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.18), p.c1, shade(p.c1, 0.45)], 0.35, 0.4, 0.85)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      const R = rng(25);
      for (let i = 0; i < 46; i++) s += flake(R() * 1200, R() * 520, 4 + R() * 9, r2(0.25 + R() * 0.55));
      const tri = [[960, 110, 100, 170], [960, 185, 130, 190], [960, 270, 160, 200]];
      tri.forEach((t, i) => { s += `<polygon points="${t[0]},${t[1]} ${t[0] - t[2]},${t[1] + t[3]} ${t[0] + t[2]},${t[1] + t[3]}" fill="${mix(p.c1, '#52B788', 0.55 - i * 0.12)}"/>`; });
      s += `<rect x="940" y="470" width="40" height="44" fill="#6D4C41"/>` +
        `<path d="M 880 250 Q 965 285 1035 240 M 862 345 Q 960 390 1062 330 M 840 445 Q 960 490 1088 425" fill="none" stroke="${gold}" stroke-width="4" stroke-linecap="round"/>`;
      [[915, 228, p.c2], [1010, 265, p.c3], [880, 320, gold], [990, 360, p.c2], [1050, 320, p.c3], [870, 420, p.c2], [945, 445, gold], [1050, 430, p.c2], [960, 180, gold]].forEach(o => {
        s += `<circle cx="${o[0]}" cy="${o[1]}" r="11" fill="${o[2]}"/><circle cx="${o[0] - 3}" cy="${o[1] - 4}" r="3" fill="#fff" opacity="0.6"/>`;
      });
      s += star(960, 104, 30, gold);
      [[800, 470, 70, 52, p.c2, gold], [1090, 480, 60, 44, p.c3, p.c2], [1150, 495, 46, 34, gold, p.c2]].forEach(g => {
        const [x, y, w, h, c, r] = g;
        s += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" fill="${c}"/><rect x="${x - 5}" y="${y}" width="10" height="${h}" fill="${r}"/>` +
          `<ellipse cx="${x - 10}" cy="${y - 6}" rx="11" ry="7" fill="none" stroke="${r}" stroke-width="4"/><ellipse cx="${x + 10}" cy="${y - 6}" rx="11" ry="7" fill="none" stroke="${r}" stroke-width="4"/>`;
      });
      s += `<path d="M 0 535 Q 300 505 600 535 T 1200 520 L 1200 600 L 0 600 Z" fill="${p.c3}"/>` +
        logoSlot(p, 126, 90, 64, { color: p.c3 }) +
        T(p.org, 172, 98, { size: 18, weight: 600, fill: p.c3, anchor: 'start', upper: true, ls: 1, maxW: 560 }) +
        T(p.kicker, 92, 200, { size: 24, weight: 700, fill: gold, anchor: 'start', upper: true, ls: 8, maxW: 620 });
      const t = TL(p.title, 88, 298, { size: 86, font: 'Playfair Display', weight: 900, fill: p.c3, anchor: 'start', maxW: 640 }, 1.05);
      s += t.svg + T(p.subtitle, 94, 298 + t.h + 76, { size: 58, font: 'Great Vibes', weight: 400, fill: gold, anchor: 'start', maxW: 620 }) +
        T(p.info, 92, 500, { size: 19, weight: 500, fill: p.c3, anchor: 'start', maxW: 640 });
      return s;
    },
  });

  /* B16 — Lễ hội ẩm thực / hội chợ */
  add({
    id: 'B16', name: 'Lễ hội ẩm thực – hội chợ', styles: ['Vui tươi', 'Năng động'], topic: 'Lễ hội – văn hóa',
    use: 'Hội chợ ẩm thực, phiên chợ quê, food festival, hội chợ xuân, gian hàng sinh viên',
    desc: 'Mái hiên sọc đỏ – trắng kiểu quầy hàng, dây đèn rực rỡ, mặt quầy gỗ phía dưới. Tiêu đề siêu đậm có bóng đổ, cực kỳ bắt mắt.',
    fields: STD({ org: 'Hội Sinh viên Trường Đại học Ánh Dương', kicker: 'Lễ hội ẩm thực', title: 'HƯƠNG VỊ\nBA MIỀN', subtitle: 'Ăn ngon – Chơi vui – Kết nối', info: '08:00 – 21:00 • 12 – 13/12/2026 • Sân vận động trường' }),
    colors: [C('c1', 'Màu cam', '#FF8F00'), C('c2', 'Màu đỏ', '#C62828'), C('c3', 'Màu nền kem', '#FFF3E0'), C('c4', 'Màu chữ đậm', '#3E2723')],
    render(p, u) {
      let s = `<rect width="1200" height="600" fill="${p.c3}"/><g fill="${p.c1}" opacity="0.08">`;
      for (let x = 20; x < 1200; x += 40) for (let y = 110; y < 540; y += 40) s += `<circle cx="${x}" cy="${y}" r="3"/>`;
      s += '</g>';
      for (let i = 0; i < 20; i++) {
        const x = i * 60, c = i % 2 ? '#ffffff' : p.c2;
        s += `<rect x="${x}" y="0" width="60" height="70" fill="${c}"/><path d="M ${x} 70 A 30 30 0 0 0 ${x + 60} 70 Z" fill="${c}"/>`;
      }
      s += `<rect x="0" y="0" width="1200" height="10" fill="${shade(p.c2, 0.3)}"/>`;
      s += `<path d="M 0 118 Q 150 150 300 118 T 600 118 T 900 118 T 1200 118" fill="none" stroke="${p.c4}" stroke-width="1.5" opacity="0.6"/>`;
      const bulbs = ['#FFD54F', '#EF5350', '#66BB6A', '#42A5F5', '#FFA726'];
      for (let i = 0; i < 24; i++) {
        const x = 25 + i * 50, y = 118 + 16 * Math.sin((x / 300) * Math.PI) * -1 + 10;
        s += `<circle cx="${x}" cy="${r2(y)}" r="7" fill="${bulbs[i % 5]}"/><circle cx="${x}" cy="${r2(y)}" r="13" fill="${bulbs[i % 5]}" opacity="0.25"/>`;
      }
      s += confetti(41, 40, [p.c1, p.c2, '#66BB6A', '#42A5F5'], [30, 150, 1170, 500]) +
        `<rect x="0" y="540" width="1200" height="60" fill="#8D6E63"/><rect x="0" y="540" width="1200" height="8" fill="#6D4C41"/>` +
        `<g stroke="#6D4C41" stroke-width="2" opacity="0.6"><line x1="0" y1="570" x2="1200" y2="570"/><line x1="300" y1="548" x2="300" y2="600"/><line x1="700" y1="548" x2="700" y2="600"/><line x1="1000" y1="570" x2="1000" y2="600"/></g>` +
        logoSlot(p, 1110, 190, 70, { color: p.c4 }) +
        T(p.org, 600, 168, { size: 18, weight: 600, fill: p.c4, upper: true, ls: 2, maxW: 760 }) +
        T(p.kicker, 600, 220, { size: 28, weight: 800, fill: p.c2, upper: true, ls: 6, maxW: 760 });
      const o = { size: 96, weight: 900, upper: true, maxW: 860 };
      const sh = TL(p.title, 606, 320, Object.assign({}, o, { fill: p.c4, attrs: 'data-deco="1"' }), 1.0);
      const t = TL(p.title, 600, 314, Object.assign({}, o, { fill: p.c1 }), 1.0);
      const ys = 314 + t.h + 64;
      s += sh.svg + t.svg + T(p.subtitle, 600, ys, { size: 42, font: 'Dancing Script', weight: 700, fill: p.c4, maxW: 760 }) +
        pill(p.info, 600, ys + 22, { size: 18, fill: '#fff', bg: p.c2, maxW: 720 });
      return s;
    },
  });

  /* B17 — Hội nghị y khoa */
  add({
    id: 'B17', name: 'Hội nghị y khoa – sức khỏe', styles: ['Hiện đại', 'Tối giản'], topic: 'Hội nghị – hội thảo',
    use: 'Hội nghị y khoa, ngày hội khám bệnh miễn phí, hiến máu, tư vấn sức khỏe, khai trương phòng khám',
    desc: 'Nền sáng xanh ngọc sạch sẽ, mạng phân tử, chữ thập y tế và đường nhịp tim chạy ngang – chuyên nghiệp, tin cậy.',
    fields: STD({ org: 'Bệnh viện Đa khoa Bình An', kicker: 'Hội nghị khoa học thường niên', title: 'Y HỌC LÂM SÀNG\nCẬP NHẬT 2026', subtitle: 'Chẩn đoán sớm – Điều trị chuẩn – Chăm sóc toàn diện', info: 'Hội trường A • Ngày 05 – 06/12/2026' }),
    colors: [C('c1', 'Màu xanh ngọc đậm', '#0E7490'), C('c2', 'Màu xanh sáng', '#22D3EE'), C('c3', 'Màu nền', '#F0FDFF')],
    render(p, u) {
      const dark = shade(p.c1, 0.5);
      let s = `<defs>${lin(u + 'bg', [p.c3, tint(p.c2, 0.72)])}<filter id="${u}sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="${p.c1}" flood-opacity="0.25"/></filter></defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/><circle cx="1060" cy="110" r="260" fill="${p.c2}" opacity="0.12"/><circle cx="1150" cy="580" r="200" fill="${p.c1}" opacity="0.07"/>`;
      const nodes = [[760, 70], [820, 40], [880, 75], [880, 140], [820, 175], [760, 140], [940, 40], [1000, 75], [1000, 140]];
      s += `<g stroke="${p.c1}" stroke-opacity="0.3" stroke-width="2">` + [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [2, 6], [6, 7], [7, 8], [8, 3]].map(e => `<line x1="${nodes[e[0]][0]}" y1="${nodes[e[0]][1]}" x2="${nodes[e[1]][0]}" y2="${nodes[e[1]][1]}"/>`).join('') + '</g>' +
        nodes.map(n => `<circle cx="${n[0]}" cy="${n[1]}" r="6" fill="#fff" stroke="${p.c1}" stroke-opacity="0.5" stroke-width="2"/>`).join('');
      s += `<circle cx="960" cy="310" r="120" fill="#fff" filter="url(#${u}sh)"/><circle cx="960" cy="310" r="120" fill="none" stroke="${p.c2}" stroke-width="4"/>` +
        `<rect x="932" y="240" width="56" height="140" rx="14" fill="${p.c1}"/><rect x="890" y="282" width="140" height="56" rx="14" fill="${p.c1}"/>`;
      const ecg = [[0, 460], [640, 460], [660, 440], [680, 460], [700, 460], [715, 475], [735, 380], [755, 520], [772, 460], [800, 460], [825, 430], [850, 460], [1080, 460], [1095, 445], [1110, 470], [1125, 410], [1140, 495], [1155, 460], [1200, 460]];
      s += `<polyline points="${ecg.map(q => q.join(',')).join(' ')}" fill="none" stroke="${p.c2}" stroke-width="10" stroke-opacity="0.25" stroke-linejoin="round"/>` +
        `<polyline points="${ecg.map(q => q.join(',')).join(' ')}" fill="none" stroke="${p.c1}" stroke-width="3.5" stroke-linejoin="round"/>` +
        logoSlot(p, 126, 88, 64, { color: p.c1 }) +
        T(p.org, 172, 96, { size: 19, weight: 700, fill: dark, anchor: 'start', upper: true, ls: 1, maxW: 540 }) +
        T(p.kicker, 92, 200, { size: 22, weight: 700, fill: p.c1, anchor: 'start', upper: true, ls: 4, maxW: 600 });
      const t = TL(p.title, 90, 278, { size: 58, weight: 800, fill: dark, anchor: 'start', maxW: 600 }, 1.15);
      s += t.svg + T(p.subtitle, 92, 278 + t.h + 52, { size: 22, weight: 500, fill: p.c1, anchor: 'start', maxW: 600 }) +
        T(p.info, 92, 545, { size: 19, weight: 600, fill: dark, anchor: 'start', maxW: 620 });
      return s;
    },
  });

  /* B18 — Môi trường – sống xanh */
  add({
    id: 'B18', name: 'Ngày hội sống xanh', styles: ['Thiên nhiên', 'Vui tươi'], topic: 'Cộng đồng – xã hội',
    use: 'Ngày Môi trường 5/6, Giờ Trái đất, trồng cây, chống rác thải nhựa, dự án ESG doanh nghiệp',
    desc: 'Trái đất xanh với cây non mọc trên đỉnh, chùm lá ở góc, nền xanh lá nhạt – thông điệp bảo vệ môi trường thân thiện.',
    fields: STD({ org: 'UBND Phường Hòa An', kicker: 'Ngày hội sống xanh', title: 'CHUNG TAY\nVÌ MÔI TRƯỜNG', subtitle: 'Giảm nhựa – Trồng cây – Tiết kiệm năng lượng', info: '07:00 • Chủ nhật, 07/06/2026 • Công viên Hòa An' }),
    colors: [C('c1', 'Màu xanh lá đậm', '#2E7D32'), C('c2', 'Màu xanh lá nhạt', '#81C784'), C('c3', 'Màu nền', '#F1F8E9'), C('c4', 'Màu đại dương', '#0288D1')],
    render(p, u) {
      const dark = shade(p.c1, 0.4);
      let s = `<defs>${lin(u + 'bg', [p.c3, tint(p.c2, 0.55)], 0, 1)}${lin(u + 'sea', [tint(p.c4, 0.35), p.c4], 0, 1)}<clipPath id="${u}g"><circle cx="960" cy="640" r="380"/></clipPath></defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<circle cx="960" cy="640" r="396" fill="none" stroke="${p.c2}" stroke-opacity="0.5" stroke-width="10"/>` +
        `<circle cx="960" cy="640" r="380" fill="url(#${u}sea)"/><g clip-path="url(#${u}g)">` +
        `<ellipse cx="850" cy="390" rx="120" ry="60" fill="${p.c2}" transform="rotate(-20 850 390)"/><ellipse cx="1090" cy="340" rx="90" ry="48" fill="${p.c1}" transform="rotate(15 1090 340)"/>` +
        `<ellipse cx="990" cy="510" rx="150" ry="70" fill="${p.c1}"/><ellipse cx="740" cy="520" rx="80" ry="40" fill="${p.c2}"/><ellipse cx="1190" cy="480" rx="70" ry="40" fill="${p.c2}"/></g>` +
        `<rect x="952" y="196" width="16" height="70" rx="4" fill="#6D4C41"/>` +
        `<circle cx="960" cy="168" r="58" fill="${p.c1}"/><circle cx="912" cy="196" r="40" fill="${p.c2}"/><circle cx="1008" cy="196" r="40" fill="${p.c2}"/><circle cx="960" cy="140" r="28" fill="${tint(p.c2, 0.25)}"/>`;
      for (let i = 0; i < 8; i++) s += leaf(1200, 0, 100 + (i % 3) * 25, 100 + i * 10, i % 2 ? p.c2 : p.c1);
      s += logoSlot(p, 136, 92, 64, { color: p.c1 }) +
        T(p.org, 182, 100, { size: 18, weight: 700, fill: dark, anchor: 'start', upper: true, ls: 1, maxW: 520 }) +
        T(p.kicker, 100, 200, { size: 24, weight: 800, fill: p.c1, anchor: 'start', upper: true, ls: 4, maxW: 560 });
      const t = TL(p.title, 96, 290, { size: 66, weight: 900, fill: dark, anchor: 'start', maxW: 560 }, 1.08);
      s += t.svg + T(p.subtitle, 100, 290 + t.h + 54, { size: 23, weight: 500, fill: p.c1, anchor: 'start', maxW: 560 }) +
        T(p.info, 100, 535, { size: 19, weight: 600, fill: dark, anchor: 'start', maxW: 560 });
      return s;
    },
  });

  /* B19 — Lễ khởi công / khánh thành */
  add({
    id: 'B19', name: 'Lễ khởi công – khánh thành', styles: ['Trang trọng', 'Sự kiện'], topic: 'Doanh nghiệp – công nghệ',
    use: 'Lễ khởi công, động thổ, cất nóc, khánh thành công trình, khai trương nhà máy – showroom',
    desc: 'Bầu trời xanh, đường chân trời thành phố và cần cẩu, dải ruy băng đỏ thắt nơ giữa – biểu tượng cắt băng khánh thành.',
    fields: STD({ org: 'Tập đoàn Đầu tư Xây dựng An Phát', kicker: 'Lễ khởi công', title: 'DỰ ÁN KHU ĐÔ THỊ SINH THÁI\nAN PHÁT GREEN CITY', subtitle: 'Kiến tạo không gian sống xanh', info: 'Ngày 18 tháng 12 năm 2026' }),
    colors: [C('c1', 'Màu ruy băng đỏ', '#C62828'), C('c2', 'Màu vàng', '#F9A825'), C('c3', 'Màu chữ – nhà', '#1C2833')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', ['#E3F2FD', '#BBDEFB'], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<circle cx="180" cy="140" r="70" fill="#fff" opacity="0.6"/>`;
      const R = rng(55);
      const city = (minH, maxH, col, win, seed) => {
        const Rr = rng(seed); let x = -10, g = '';
        while (x < 1210) {
          const w = 50 + Rr() * 60, h = minH + Rr() * (maxH - minH);
          g += `<rect x="${r2(x)}" y="${r2(600 - h)}" width="${r2(w - 4)}" height="${r2(h)}" fill="${col}"/>`;
          if (win) for (let yy = 600 - h + 12; yy < 590; yy += 18) for (let xx = x + 8; xx < x + w - 14; xx += 14) g += `<rect x="${r2(xx)}" y="${r2(yy)}" width="6" height="8" fill="#fff" opacity="0.35"/>`;
          x += w;
        }
        return g;
      };
      s += city(70, 170, mix(p.c3, '#ffffff', 0.62), false, 3) + city(40, 105, mix(p.c3, '#ffffff', 0.3), true, 8);
      s += `<g stroke="${p.c2}" stroke-width="4" fill="none"><line x1="1010" y1="600" x2="1010" y2="190"/><line x1="1034" y1="600" x2="1034" y2="190"/>` +
        Array.from({ length: 13 }, (_, i) => `<line x1="1010" y1="${600 - i * 32}" x2="1034" y2="${568 - i * 32}"/>`).join('') +
        `<line x1="860" y1="190" x2="1160" y2="190"/><line x1="860" y1="206" x2="1160" y2="206" stroke-width="2"/><line x1="1022" y1="150" x2="880" y2="190" stroke-width="2"/><line x1="1022" y1="150" x2="1160" y2="190" stroke-width="2"/><line x1="1022" y1="150" x2="1022" y2="190"/></g>` +
        `<line x1="1120" y1="206" x2="1120" y2="300" stroke="${p.c3}" stroke-width="2"/><path d="M 1112 300 h 16 v 10 q -8 10 -16 0 Z" fill="${p.c3}"/>`;
      s += `<rect x="0" y="456" width="1200" height="40" fill="${p.c1}"/><rect x="0" y="456" width="1200" height="4" fill="${p.c2}"/><rect x="0" y="492" width="1200" height="4" fill="${p.c2}"/>` +
        `<polygon points="586,486 548,560 572,552 584,574 604,490" fill="${shade(p.c1, 0.15)}"/><polygon points="614,486 652,560 628,552 616,574 596,490" fill="${shade(p.c1, 0.15)}"/>` +
        `<ellipse cx="556" cy="464" rx="48" ry="24" fill="${p.c1}" stroke="${p.c2}" stroke-width="2" transform="rotate(-18 556 464)"/>` +
        `<ellipse cx="644" cy="464" rx="48" ry="24" fill="${p.c1}" stroke="${p.c2}" stroke-width="2" transform="rotate(18 644 464)"/>` +
        `<circle cx="600" cy="474" r="18" fill="${shade(p.c1, 0.1)}" stroke="${p.c2}" stroke-width="2"/>` +
        logoSlot(p, 600, 60, 56, { color: p.c3 }) +
        T(p.org, 600, 116, { size: 18, weight: 700, fill: p.c3, upper: true, ls: 2, maxW: 900 }) +
        T(p.kicker, 600, 184, { size: 48, weight: 900, fill: p.c1, upper: true, ls: 4, maxW: 900, attrs: 'stroke="#fff" stroke-width="8" paint-order="stroke" stroke-linejoin="round"' });
      const t = TL(p.title, 600, 252, { size: 42, weight: 800, fill: p.c3, maxW: 980, attrs: 'stroke="#fff" stroke-width="6" paint-order="stroke" stroke-linejoin="round"' }, 1.2);
      const ys = 252 + t.h + 44;
      s += t.svg + T(p.subtitle, 600, ys, { size: 22, weight: 500, italic: true, fill: p.c3, maxW: 860 }) +
        T(p.info, 600, Math.max(ys + 46, 410), { size: 20, weight: 700, fill: p.c1, maxW: 860, attrs: 'stroke="#fff" stroke-width="5" paint-order="stroke"' });
      return s;
    },
  });

  /* B20 — Hội nghị khách hàng / tri ân đối tác */
  add({
    id: 'B20', name: 'Tri ân khách hàng xanh ngọc – vàng', styles: ['Sang trọng', 'Trang trọng'], topic: 'Hội nghị – hội thảo',
    use: 'Hội nghị khách hàng, tri ân đối tác, lễ ký kết hợp tác, gala ngân hàng – bảo hiểm',
    desc: 'Xanh lục bảo sâu với lưới kim cương nhũ vàng, khung vòm cổng (arch) ở trung tâm ôm trọn nội dung – sang trọng kiểu khách sạn 5 sao.',
    fields: STD({ org: 'Ngân hàng TMCP Phương Đông', kicker: 'Hội nghị khách hàng', title: 'TRI ÂN\nĐỐI TÁC 2026', subtitle: 'Đồng hành – Bền vững – Thịnh vượng', info: '18:30 • 20.12.2026 • Khách sạn Grand Plaza' }),
    colors: [C('c1', 'Màu xanh lục bảo', '#064E3B'), C('c2', 'Màu vàng', '#D4AF37')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.14), p.c1, shade(p.c1, 0.5)], 0.5, 0.45, 0.8)}` +
        `${lin(u + 'gd', [[tint(p.c2, 0.75), 0], [p.c2, 0.5], [shade(p.c2, 0.25), 1]], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/><g stroke="${p.c2}" stroke-opacity="0.08" stroke-width="1.2">`;
      for (let k = -600; k <= 1800; k += 60) s += `<line x1="${k}" y1="0" x2="${k + 600}" y2="600"/><line x1="${k}" y1="600" x2="${k + 600}" y2="0"/>`;
      s += '</g>' +
        `<path d="M 330 600 L 330 310 A 270 270 0 0 1 870 310 L 870 600 Z" fill="${shade(p.c1, 0.3)}" fill-opacity="0.92" stroke="${p.c2}" stroke-width="2.5"/>` +
        `<path d="M 344 600 L 344 310 A 256 256 0 0 1 856 310 L 856 600" fill="none" stroke="${p.c2}" stroke-width="0.8"/>` +
        `<g stroke="${p.c2}" stroke-width="1.2"><line x1="500" y1="500" x2="586" y2="500"/><line x1="614" y1="500" x2="700" y2="500"/></g><polygon points="600,492 608,500 600,508 592,500" fill="${p.c2}"/>`;
      const R = rng(61);
      for (let i = 0; i < 12; i++) { const x = R() < 0.5 ? 40 + R() * 250 : 910 + R() * 250; s += sparkle(x, 40 + R() * 520, 4 + R() * 9, tint(p.c2, 0.5), 0.4 + R() * 0.5); }
      s += logoSlot(p, 600, 126, 54, { color: p.c2 }) +
        T(p.org, 600, 182, { size: 16, weight: 600, fill: p.c2, upper: true, ls: 3, maxW: 460 }) +
        T(p.kicker, 600, 236, { size: 20, weight: 600, font: 'Montserrat', upper: true, ls: 8, maxW: 460 });
      const t = TL(p.title, 600, 318, { size: 64, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 470 }, 1.08);
      s += t.svg + T(p.subtitle, 600, 318 + t.h + 62, { size: 40, font: 'Great Vibes', weight: 400, maxW: 460 }) +
        T(p.info, 600, 540, { size: 14, weight: 600, font: 'Montserrat', fill: p.c2, upper: true, ls: 2, maxW: 460 });
      return s;
    },
  });

  /* B21 — Sinh nhật / thôi nôi */
  add({
    id: 'B21', name: 'Sinh nhật – thôi nôi bóng bay', styles: ['Vui tươi', 'Lãng mạn'], topic: 'Cưới hỏi – gia đình',
    use: 'Thôi nôi, đầy tháng, sinh nhật bé, tiệc sinh nhật công ty, baby shower',
    desc: 'Chùm bóng bay pastel hai bên, dây cờ đuôi nheo, hoa giấy – ngọt ngào, đáng yêu, rất hợp chụp ảnh check-in.',
    fields: [F('kicker', 'Dòng trên', 'Happy Birthday'), F('title', 'Tiêu đề (Enter để xuống dòng)', 'MỪNG THÔI NÔI\nBÉ BẮP', { multi: true }),
      F('subtitle', 'Dòng phụ', 'Tròn 1 tuổi thật ngoan'), F('info', 'Thời gian – địa điểm', '11:00 • Chủ nhật, 20.12.2026 • Nhà hàng Sen Vàng')],
    colors: [C('c1', 'Màu hồng', '#F48FB1'), C('c2', 'Màu xanh', '#81D4FA'), C('c3', 'Màu vàng', '#FFE082'), C('c4', 'Màu chữ', '#4E5D78')],
    render(p, u) {
      let s = `<rect width="1200" height="600" fill="${tint(p.c3, 0.82)}"/>` +
        confetti(71, 70, [p.c1, p.c2, p.c3, shade(p.c1, 0.1)], [20, 20, 1180, 580]) +
        bunting(330, 870, 20, 40, [p.c1, p.c2, p.c3], 11);
      const L = [[150, 180, 58, p.c1, 40], [255, 125, 52, p.c2, 10], [225, 260, 50, p.c3, 20], [92, 300, 46, p.c2, 60], [290, 262, 38, shade(p.c1, 0.05), -10]];
      L.forEach(b => { s += balloon(b[0], b[1], b[2], b[3], b[4]); });
      L.forEach(b => { s += balloon(1200 - b[0], b[1] + 10, b[2], [p.c3, p.c1, p.c2, p.c1, p.c2][L.indexOf(b)], -b[4]); });
      s += logoSlot(p, 600, 120, 54, { optional: true, color: p.c4 }) +
        T(p.kicker, 600, 186, { size: 46, font: 'Dancing Script', weight: 700, fill: shade(p.c1, 0.3), maxW: 560 });
      const t = TL(p.title, 600, 280, { size: 70, weight: 900, fill: p.c4, upper: true, maxW: 500 }, 1.12);
      const ys = 280 + t.h + 64;
      s += t.svg + T(p.subtitle, 600, ys, { size: 42, font: 'Dancing Script', weight: 700, fill: shade(p.c2, 0.45), maxW: 560 }) +
        pill(p.info, 600, ys + 30, { size: 18, fill: p.c4, bg: '#ffffff', maxW: 560 });
      return s;
    },
  });

  /* B22 — Đêm nhạc */
  add({
    id: 'B22', name: 'Đêm nhạc neon', styles: ['Năng động', 'Hiện đại'], topic: 'Âm nhạc – sáng tạo',
    use: 'Đêm nhạc, liveshow, hội diễn văn nghệ, cuộc thi hát, prom – dạ hội sinh viên',
    desc: 'Nền đen với đèn sân khấu, đĩa than lớn, dải equalizer chuyển màu hồng – tím và tiêu đề phát sáng kiểu neon.',
    fields: STD({ org: 'CLB Âm nhạc Sinh viên', kicker: 'Live Concert', title: 'ĐÊM NHẠC\nMÙA THU', subtitle: 'Những bản tình ca không tuổi', info: '19:30 • 31.10.2026 • Nhà hát Tuổi Trẻ' }),
    colors: [C('c1', 'Màu nền', '#0A0A14'), C('c2', 'Màu neon hồng', '#FF2E88'), C('c3', 'Màu tím', '#7B61FF')],
    render(p, u) {
      let s = `<defs>${radial(u + 'g1', [[p.c3, 0, 0.5], [p.c3, 1, 0]], 0.5, 0.5, 0.5)}${radial(u + 'g2', [[p.c2, 0, 0.35], [p.c2, 1, 0]], 0.5, 0.5, 0.5)}` +
        `${lin(u + 'eq', [p.c2, p.c3], 0, 1)}${lin(u + 'lb', [p.c2, p.c3])}<filter id="${u}glow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="9"/></filter></defs>` +
        `<rect width="1200" height="600" fill="${p.c1}"/><circle cx="300" cy="620" r="520" fill="url(#${u}g1)"/><circle cx="1000" cy="80" r="420" fill="url(#${u}g2)"/>` +
        `<polygon points="250,0 60,600 440,600" fill="#fff" opacity="0.05"/><polygon points="960,0 780,600 1140,600" fill="#fff" opacity="0.05"/><polygon points="610,0 520,600 700,600" fill="#fff" opacity="0.03"/>` +
        `<circle cx="1040" cy="320" r="210" fill="#111" stroke="#2a2a2a" stroke-width="2"/>`;
      for (let r = 190; r > 80; r -= 11) s += `<circle cx="1040" cy="320" r="${r}" fill="none" stroke="#262626" stroke-width="1.5"/>`;
      s += `<path d="M 900 200 A 180 180 0 0 1 1000 145" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="6" stroke-linecap="round"/>` +
        `<circle cx="1040" cy="320" r="70" fill="url(#${u}lb)"/><circle cx="1040" cy="320" r="6" fill="${p.c1}"/>`;
      for (let i = 0; i < 60; i++) {
        const h = 16 + 74 * Math.abs(Math.sin(i * 0.45) * Math.cos(i * 0.13));
        s += `<rect x="${12 + i * 20}" y="${r2(600 - h)}" width="12" height="${r2(h + 6)}" rx="3" fill="url(#${u}eq)" opacity="0.85"/>`;
      }
      s += logoSlot(p, 124, 86, 60) +
        T(p.org, 168, 94, { size: 17, weight: 600, anchor: 'start', upper: true, ls: 2, maxW: 520, attrs: 'fill-opacity="0.85"' }) +
        T(p.kicker, 90, 190, { size: 22, weight: 700, fill: p.c2, anchor: 'start', upper: true, ls: 10, maxW: 600 });
      const o = { size: 98, font: 'Montserrat', weight: 900, anchor: 'start', maxW: 620 };
      const glow = TL(p.title, 86, 290, Object.assign({}, o, { fill: p.c2, attrs: 'data-deco="1"' }), 1.0);
      const t = TL(p.title, 86, 290, Object.assign({}, o, { fill: '#fff' }), 1.0);
      const ys = 290 + t.h + 58;
      s += `<g filter="url(#${u}glow)">${glow.svg}</g>` + t.svg +
        T(p.subtitle, 90, ys, { size: 28, weight: 500, anchor: 'start', maxW: 600, attrs: 'fill-opacity="0.88"' }) +
        T(p.info, 90, ys + 44, { size: 18, weight: 600, fill: p.c2, anchor: 'start', ls: 1, maxW: 600 });
      return s;
    },
  });

  /* B23 — Ngày hội việc làm */
  add({
    id: 'B23', name: 'Ngày hội việc làm – tuyển dụng', styles: ['Hiện đại', 'Năng động'], topic: 'Doanh nghiệp – công nghệ',
    use: 'Ngày hội việc làm, tuyển dụng, kết nối doanh nghiệp – sinh viên, hướng nghiệp, career fair',
    desc: 'Bố cục chia đôi bằng mảng xanh chéo, biểu tượng cặp tài liệu và nhóm người – rõ ràng, chuyên nghiệp, truyền thông tốt trên mạng xã hội.',
    fields: STD({ org: 'Trung tâm Hỗ trợ sinh viên', kicker: 'Ngày hội việc làm 2026', title: 'KẾT NỐI\nTÀI NĂNG TRẺ', subtitle: 'Hơn 50 doanh nghiệp – 2.000 vị trí tuyển dụng', info: '08:00 • 15.11.2026 • Nhà thi đấu đa năng' }),
    colors: [C('c1', 'Màu xanh', '#1565C0'), C('c2', 'Màu cam', '#FF7043'), C('c3', 'Màu nền', '#FFFFFF')],
    render(p, u) {
      const dark = shade(p.c1, 0.55);
      let s = `<rect width="1200" height="600" fill="${p.c3}"/>` +
        `<polygon points="700,0 1200,0 1200,600 560,600" fill="${p.c1}"/><polygon points="650,0 688,0 548,600 510,600" fill="${p.c2}"/>` +
        `<circle cx="1090" cy="100" r="70" fill="${p.c2}" opacity="0.9"/><g fill="#fff" opacity="0.25">`;
      for (let x = 0; x < 6; x++) for (let y = 0; y < 5; y++) s += `<circle cx="${740 + x * 18}" cy="${470 + y * 18}" r="2.5"/>`;
      s += '</g>' +
        `<rect x="895" y="180" width="130" height="92" rx="12" fill="#fff"/><rect x="935" y="160" width="50" height="26" rx="8" fill="none" stroke="#fff" stroke-width="7"/>` +
        `<rect x="895" y="214" width="130" height="6" fill="${p.c1}" opacity="0.5"/><rect x="950" y="208" width="20" height="18" rx="3" fill="${p.c2}"/>` +
        `<path d="M 800 420 Q 960 330 1120 420" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="4 6"/>` +
        person(820, 420, 36, '#fff', 0.7) + person(890, 400, 42, '#fff', 0.85) + person(960, 385, 52, '#fff') + person(1030, 400, 42, '#fff', 0.85) + person(1100, 420, 36, '#fff', 0.7) +
        logoSlot(p, 126, 88, 64, { color: p.c1 }) +
        T(p.org, 172, 96, { size: 18, weight: 700, fill: dark, anchor: 'start', upper: true, ls: 1, maxW: 420 }) +
        T(p.kicker, 92, 192, { size: 24, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 3, maxW: 480 });
      const t = TL(p.title, 88, 282, { size: 68, weight: 900, fill: p.c1, anchor: 'start', maxW: 480 }, 1.08);
      const ys = 282 + t.h + 52;
      s += t.svg + T(p.subtitle, 92, ys, { size: 21, weight: 500, fill: dark, anchor: 'start', maxW: 470 }) +
        pill(p.info, 90, Math.max(ys + 34, 470), { size: 17, fill: '#fff', bg: p.c2, anchor: 'start', maxW: 420 });
      return s;
    },
  });

  /* B24 — Ngày Phụ nữ 8/3 – 20/10 */
  add({
    id: 'B24', name: 'Tôn vinh phụ nữ 8/3 – 20/10', styles: ['Lãng mạn', 'Sang trọng'], topic: 'Cộng đồng – xã hội',
    use: 'Ngày Quốc tế Phụ nữ 8/3, Ngày Phụ nữ Việt Nam 20/10, hội thi duyên dáng, Ngày của Mẹ',
    desc: 'Bó hoa tulip nhiều màu bên phải, nền hồng tím dịu, tiêu đề serif đậm phối chữ thư pháp – nữ tính, thanh lịch.',
    fields: STD({ org: 'Công đoàn Công ty CP An Phát', kicker: 'Chào mừng Ngày Phụ nữ Việt Nam 20/10', title: 'TÔN VINH\nPHÁI ĐẸP', subtitle: 'Dịu dàng – Tự tin – Tỏa sáng', info: '15:00 • 20.10.2026 • Hội trường tầng 3' }),
    colors: [C('c1', 'Màu tím', '#8E24AA'), C('c2', 'Màu hồng', '#F06292'), C('c3', 'Màu nền', '#FFF0F6')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c3, tint(p.c2, 0.68)], 1, 0.3)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<circle cx="950" cy="300" r="235" fill="${tint(p.c2, 0.5)}" opacity="0.55"/>`;
      const R = rng(83);
      for (let i = 0; i < 12; i++) s += heart(540 + R() * 640, 30 + R() * 540, 5 + R() * 9, p.c2, r2(0.2 + R() * 0.35));
      const heads = [[860, 230, p.c2], [950, 175, p.c1], [1040, 220, tint(p.c1, 0.3)], [900, 315, '#FFB74D'], [1005, 305, shade(p.c2, 0.1)], [955, 260, tint(p.c2, 0.25)]];
      heads.forEach(h => { s += `<path d="M 950 520 Q ${(950 + h[0]) / 2} ${h[1] + 160} ${h[0]} ${h[1] + 30}" fill="none" stroke="#66BB6A" stroke-width="6" stroke-linecap="round"/>`; });
      s += leaf(950, 470, 130, -125, '#4CAF50') + leaf(950, 470, 130, -55, '#66BB6A') + leaf(950, 490, 100, -150, '#81C784') + leaf(950, 490, 100, -30, '#81C784');
      heads.forEach(h => {
        const [x, y, c] = h, k = 34;
        s += `<path d="M ${x - k} ${y - k * 0.2} Q ${x - k} ${y + k} ${x} ${y + k} Q ${x + k} ${y + k} ${x + k} ${y - k * 0.2} L ${x + k * 0.5} ${y - k * 0.7} L ${x} ${y - k * 0.2} L ${x - k * 0.5} ${y - k * 0.7} Z" fill="${c}"/>` +
          `<path d="M ${x - k * 0.45} ${y} Q ${x} ${y - k * 0.95} ${x + k * 0.45} ${y} Q ${x} ${y + k * 0.7} ${x - k * 0.45} ${y} Z" fill="${tint(c, 0.3)}"/>`;
      });
      s += `<polygon points="850,430 1050,430 970,600 930,600" fill="#fff" opacity="0.92"/><polygon points="850,430 900,430 930,600 905,600" fill="${tint(p.c2, 0.7)}" opacity="0.8"/>` +
        `<ellipse cx="925" cy="470" rx="26" ry="12" fill="${p.c1}" transform="rotate(-20 925 470)"/><ellipse cx="975" cy="470" rx="26" ry="12" fill="${p.c1}" transform="rotate(20 975 470)"/><circle cx="950" cy="474" r="9" fill="${shade(p.c1, 0.2)}"/>` +
        logoSlot(p, 126, 88, 60, { color: p.c1 }) +
        T(p.org, 170, 96, { size: 17, weight: 600, fill: shade(p.c1, 0.3), anchor: 'start', upper: true, ls: 1, maxW: 520 }) +
        T(p.kicker, 92, 196, { size: 20, weight: 700, fill: p.c1, anchor: 'start', upper: true, ls: 2, maxW: 580 });
      const t = TL(p.title, 88, 296, { size: 86, font: 'Playfair Display', weight: 900, fill: p.c1, anchor: 'start', maxW: 580 }, 1.06);
      s += t.svg + T(p.subtitle, 94, 296 + t.h + 72, { size: 52, font: 'Great Vibes', weight: 400, fill: shade(p.c2, 0.1), anchor: 'start', maxW: 580 }) +
        T(p.info, 92, 535, { size: 19, weight: 600, fill: shade(p.c1, 0.3), anchor: 'start', maxW: 600 });
      return s;
    },
  });

  /* B25 — Văn hóa đọc */
  add({
    id: 'B25', name: 'Ngày hội văn hóa đọc', styles: ['Tối giản', 'Cổ điển'], topic: 'Lễ hội – văn hóa',
    use: 'Ngày Sách 21/4, hội sách, ra mắt sách, thư viện, cuộc thi đại sứ văn hóa đọc',
    desc: 'Nền giấy kem kẻ dòng, cuốn sách mở ở dưới với trang giấy và con chữ bay lên – ấm áp, trí thức, gợi cảm hứng.',
    fields: STD({ org: 'Thư viện Trường Đại học Ánh Dương', kicker: 'Ngày Sách và Văn hóa đọc Việt Nam 21/4', title: 'MỖI NGÀY\nMỘT TRANG SÁCH', subtitle: 'Đọc để hiểu – Hiểu để yêu', info: '21.04.2027 • Sảnh Thư viện tầng 1' }),
    colors: [C('c1', 'Màu nâu', '#5D4037'), C('c2', 'Màu vàng mù tạt', '#E8A33D'), C('c3', 'Màu giấy', '#FBF3E4')],
    render(p, u) {
      let s = `<rect width="1200" height="600" fill="${p.c3}"/><g stroke="${p.c1}" stroke-opacity="0.06">`;
      for (let y = 40; y < 600; y += 32) s += `<line x1="0" y1="${y}" x2="1200" y2="${y}"/>`;
      s += `</g><line x1="70" y1="0" x2="70" y2="600" stroke="${p.c2}" stroke-opacity="0.35" stroke-width="2"/>` +
        `<path d="M 600 600 Q 460 560 300 590 L 300 482 Q 460 452 600 498 Q 740 452 900 482 L 900 590 Q 740 560 600 600 Z" fill="${p.c1}"/>` +
        `<path d="M 600 592 Q 465 548 318 574 L 318 470 Q 465 440 600 486 Z" fill="#fff" stroke="${p.c1}" stroke-width="1.5"/>` +
        `<path d="M 600 592 Q 735 548 882 574 L 882 470 Q 735 440 600 486 Z" fill="${tint(p.c2, 0.85)}" stroke="${p.c1}" stroke-width="1.5"/><g stroke="${p.c1}" stroke-opacity="0.25" stroke-width="1.5" fill="none">`;
      for (let i = 0; i < 4; i++) s += `<path d="M ${345} ${492 + i * 20} Q 465 ${468 + i * 20} 578 ${506 + i * 20}"/><path d="M ${855} ${492 + i * 20} Q 735 ${468 + i * 20} 622 ${506 + i * 20}"/>`;
      s += '</g>';
      [[930, 400, -20], [1010, 320, 15], [1090, 230, -10], [250, 380, 18], [170, 290, -12]].forEach((g, i) => {
        s += `<rect x="${g[0] - 26}" y="${g[1] - 18}" width="52" height="36" rx="3" fill="#fff" stroke="${p.c1}" stroke-opacity="0.4" transform="rotate(${g[2]} ${g[0]} ${g[1]})"/>` +
          `<line x1="${g[0]}" y1="${g[1] - 18}" x2="${g[0]}" y2="${g[1] + 18}" stroke="${p.c1}" stroke-opacity="0.3" transform="rotate(${g[2]} ${g[0]} ${g[1]})"/>`;
      });
      [['A', 980, 450, 34], ['Ă', 1060, 380, 28], ['Đ', 1130, 300, 24], ['Ư', 210, 440, 30], ['B', 130, 350, 24]].forEach(c => {
        s += T(c[0], c[1], c[2], { size: c[3], font: 'Lora', weight: 700, fill: p.c2, noScale: true, attrs: 'data-deco="1"' });
      });
      const R = rng(91);
      for (let i = 0; i < 10; i++) s += sparkle(320 + R() * 560 + (R() < 0.5 ? -200 : 200), 380 + R() * 80, 4 + R() * 5, p.c2, 0.7);
      s += logoSlot(p, 600, 58, 50, { color: p.c1 }) +
        T(p.org, 600, 108, { size: 17, weight: 600, fill: p.c1, upper: true, ls: 2, maxW: 800 }) +
        T(p.kicker, 600, 160, { size: 20, weight: 700, fill: shade(p.c2, 0.15), upper: true, ls: 3, maxW: 900 });
      const t = TL(p.title, 600, 245, { size: 70, font: 'Lora', weight: 700, fill: p.c1, maxW: 780 }, 1.1);
      const ys = 245 + t.h + 56;
      s += t.svg + T(p.subtitle, 600, ys, { size: 36, font: 'Dancing Script', weight: 700, fill: shade(p.c2, 0.25), maxW: 700 }) +
        T(p.info, 600, Math.min(ys + 42, 445), { size: 18, weight: 600, fill: p.c1, maxW: 700 });
      return s;
    },
  });

  /* B26 — Thiện nguyện */
  add({
    id: 'B26', name: 'Chương trình thiện nguyện', styles: ['Lãng mạn', 'Tối giản'], topic: 'Cộng đồng – xã hội',
    use: 'Quyên góp từ thiện, hiến máu, Mùa đông ấm, tiếp sức mùa thi, gây quỹ học bổng',
    desc: 'Tông cam ấm, đôi bàn tay nâng trái tim và những trái tim nhỏ bay lên – thông điệp sẻ chia, nhân ái rõ ràng.',
    fields: STD({ org: 'CLB Tình nguyện Sinh viên', kicker: 'Chương trình thiện nguyện', title: 'ÁO ẤM\nCHO EM', subtitle: 'Mỗi tấm lòng – một mùa đông ấm', info: 'Tiếp nhận quyên góp: 01 – 30/11/2026 • Phòng Công tác Sinh viên' }),
    colors: [C('c1', 'Màu cam đậm', '#E65100'), C('c2', 'Màu cam nhạt', '#FFB74D'), C('c3', 'Màu nền', '#FFF8F0')],
    render(p, u) {
      const dark = '#4E342E';
      let s = `<defs>${lin(u + 'bg', [p.c3, tint(p.c2, 0.68)])}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<circle cx="950" cy="320" r="225" fill="${tint(p.c2, 0.45)}" opacity="0.7"/><circle cx="950" cy="320" r="260" fill="none" stroke="${p.c2}" stroke-width="1.5" stroke-dasharray="3 9"/>` +
        heart(950, 285, 82, p.c1) + `<path d="M 905 255 Q 915 230 940 228" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="8" stroke-linecap="round"/>` +
        `<path d="M 805 330 Q 800 440 950 448 Q 1100 440 1095 330" fill="none" stroke="${shade(p.c2, 0.2)}" stroke-width="30" stroke-linecap="round"/>` +
        `<g stroke="${shade(p.c2, 0.2)}" stroke-width="14" stroke-linecap="round"><line x1="805" y1="330" x2="790" y2="292"/><line x1="822" y1="318" x2="812" y2="282"/><line x1="1095" y1="330" x2="1110" y2="292"/><line x1="1078" y1="318" x2="1088" y2="282"/></g>`;
      [[870, 160, 14], [1030, 140, 18], [960, 110, 10], [1080, 200, 10], [830, 210, 9]].forEach(h => { s += heart(h[0], h[1], h[2], p.c1, 0.55); });
      s += logoSlot(p, 126, 88, 64, { color: p.c1 }) +
        T(p.org, 172, 96, { size: 18, weight: 700, fill: dark, anchor: 'start', upper: true, ls: 1, maxW: 520 }) +
        T(p.kicker, 92, 196, { size: 22, weight: 800, fill: p.c1, anchor: 'start', upper: true, ls: 3, maxW: 580 });
      const t = TL(p.title, 88, 292, { size: 84, weight: 900, fill: dark, anchor: 'start', maxW: 580 }, 1.05);
      s += t.svg + T(p.subtitle, 92, 292 + t.h + 66, { size: 40, font: 'Dancing Script', weight: 700, fill: p.c1, anchor: 'start', maxW: 580 }) +
        T(p.info, 92, 538, { size: 18, weight: 600, fill: dark, anchor: 'start', maxW: 620 });
      return s;
    },
  });

  /* B27 — Quốc tế Thiếu nhi 1/6 */
  add({
    id: 'B27', name: 'Ngày hội thiếu nhi cầu vồng', styles: ['Vui tươi', 'Năng động'], topic: 'Giáo dục',
    use: 'Quốc tế Thiếu nhi 1/6, ngày hội trường mầm non, lễ bế giảng, hội trại hè, sinh nhật tập thể',
    desc: 'Cầu vồng lớn ôm lấy tiêu đề, mây trắng hai chân cầu vồng, chữ tiêu đề mỗi ký tự một màu – rực rỡ, cực kỳ hợp trẻ em.',
    fields: STD({ org: 'Trường Mầm non Hoa Hướng Dương', kicker: 'Chào mừng ngày 1/6', title: 'NGÀY HỘI\nTHIẾU NHI', subtitle: 'Vui khỏe – Ngoan ngoãn – Học giỏi', info: '08:00 • 01.06.2027 • Sân trường' }),
    colors: [C('c1', 'Màu bầu trời', '#4FC3F7'), C('c2', 'Màu cam', '#FF7043'), C('c3', 'Màu chữ', '#5E35B1')],
    render(p, u) {
      const bands = ['#EF5350', '#FFA726', '#FFEE58', '#66BB6A', '#42A5F5', '#7E57C2'];
      let s = `<defs>${lin(u + 'bg', [tint(p.c1, 0.35), tint(p.c1, 0.9)], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      bands.forEach((c, i) => { s += `<circle cx="600" cy="610" r="${520 - i * 28}" fill="none" stroke="${c}" stroke-width="28" opacity="0.9"/>`; });
      const cloud = (x, y, k) => `<g fill="#fff"><ellipse cx="${x}" cy="${y + 20 * k}" rx="${110 * k}" ry="${34 * k}"/><circle cx="${x - 50 * k}" cy="${y}" r="${42 * k}"/><circle cx="${x + 10 * k}" cy="${y - 22 * k}" r="${54 * k}"/><circle cx="${x + 62 * k}" cy="${y + 4 * k}" r="${38 * k}"/></g>`;
      s += cloud(150, 560, 1.2) + cloud(1060, 560, 1.2) + cloud(1040, 90, 0.6) + cloud(560, 60, 0.45);
      const R = rng(17);
      for (let i = 0; i < 14; i++) s += star(R() * 1200, 20 + R() * 200, 5 + R() * 6, bands[i % 6]);
      s += balloon(1110, 220, 34, p.c2, -10) + balloon(1160, 260, 28, '#FFEE58', 10) + balloon(1060, 270, 26, '#66BB6A', 0) +
        logoSlot(p, 116, 74, 58, { color: p.c3 }) +
        T(p.org, 160, 82, { size: 18, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 1, maxW: 400 }) +
        T(p.kicker, 600, 330, { size: 24, weight: 800, fill: p.c3, upper: true, ls: 3, maxW: 520 });
      const t = rainbowTitle(p.title, 600, 404, { size: 64, maxW: 560 }, ['#E53935', '#FB8C00', '#FDD835', '#43A047', '#1E88E5', '#8E24AA'], 1.05);
      const ys = 404 + t.h + 50;
      s += t.svg + T(p.subtitle, 600, ys, { size: 22, weight: 700, fill: p.c3, maxW: 560 }) +
        pill(p.info, 600, ys + 18, { size: 17, fill: p.c3, bg: '#fff', maxW: 480 });
      return s;
    },
  });

  /* B28 — Hội thảo quốc tế song ngữ */
  add({
    id: 'B28', name: 'Hội thảo quốc tế song ngữ', styles: ['Hiện đại', 'Trang trọng'], topic: 'Hội nghị – hội thảo',
    use: 'Hội thảo quốc tế, hội nghị đồng tổ chức, diễn đàn hợp tác, sự kiện có khách nước ngoài',
    desc: 'Mảng navy chéo chứa tiêu đề tiếng Việt + tiếng Anh, mạng lưới kết nối toàn cầu và dải logo các đơn vị đồng tổ chức bên phải.',
    fields: [F('org', 'Đơn vị tổ chức', 'Trường Đại học Hà Nội'), F('kicker', 'Loại sự kiện (song ngữ)', 'Hội thảo quốc tế • International Conference'),
      F('title', 'Tiêu đề tiếng Việt', 'GIẢNG DẠY NGOẠI NGỮ\nTRONG KỶ NGUYÊN AI', { multi: true }), F('titleEn', 'Tiêu đề tiếng Anh', 'Language Teaching in the Age of AI', { multi: true }),
      F('info', 'Thời gian – địa điểm', 'Hà Nội, 12 – 13/12/2026 • Hanoi, December 12 – 13, 2026'), F('partners', 'Nhãn dải đồng tổ chức (để trống = ẩn)', 'Đơn vị đồng tổ chức • Co-organizers')],
    colors: [C('c1', 'Màu navy', '#002B5B'), C('c2', 'Màu xanh sáng', '#00A8E8')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c1, mix(p.c1, p.c2, 0.3)], 1, 1)}</defs><rect width="1200" height="600" fill="#fff"/>`;
      const R = rng(7), N = [];
      for (let i = 0; i < 24; i++) N.push([720 + R() * 460, 40 + R() * (p.partners ? 370 : 520)]);
      s += `<g stroke="${p.c1}" stroke-opacity="0.15" stroke-width="1.5">`;
      N.forEach((a, i) => {
        N.map((b, j) => [j, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2]).filter(d => d[0] !== i).sort((x, y) => x[1] - y[1]).slice(0, 2)
          .forEach(d => { s += `<line x1="${r2(a[0])}" y1="${r2(a[1])}" x2="${r2(N[d[0]][0])}" y2="${r2(N[d[0]][1])}"/>`; });
      });
      s += '</g>' + N.map((n, i) => `<circle cx="${r2(n[0])}" cy="${r2(n[1])}" r="${i % 4 ? 4 : 7}" fill="${i % 4 ? p.c2 : p.c1}"/>`).join('') +
        `<polygon points="0,0 760,0 640,600 0,600" fill="url(#${u}bg)"/><polygon points="760,0 784,0 664,600 640,600" fill="${p.c2}"/>`;
      if (p.partners) {
        s += T(p.partners, 960, 470, { size: 13, weight: 700, fill: p.c1, upper: true, ls: 2, maxW: 420 }) +
          [0, 1, 2].map(i => `<rect x="${806 + i * 120}" y="488" width="100" height="58" rx="8" fill="none" stroke="${p.c1}" stroke-opacity="0.35" stroke-dasharray="5 4"/>` +
            T('LOGO', 856 + i * 120, 522, { size: 13, weight: 700, font: 'Montserrat', fill: tint(p.c1, 0.5), ls: 1, attrs: 'data-deco="1"' })).join('');
      }
      s += logoSlot(p, 116, 84, 60) +
        T(p.org, 160, 92, { size: 16, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 480 }) +
        T(p.kicker, 80, 180, { size: 18, weight: 700, fill: p.c2, anchor: 'start', upper: true, ls: 3, maxW: 560 });
      const t = TL(p.title, 78, 254, { size: 46, weight: 800, anchor: 'start', maxW: 560 }, 1.15);
      const te = TL(p.titleEn, 80, 254 + t.h + 52, { size: 28, font: 'Playfair Display', weight: 400, italic: true, fill: tint(p.c2, 0.45), anchor: 'start', maxW: 540 }, 1.2);
      s += t.svg + te.svg + `<line x1="80" y1="${r2(Math.min(254 + t.h + te.h + 90, 492))}" x2="140" y2="${r2(Math.min(254 + t.h + te.h + 90, 492))}" stroke="${p.c2}" stroke-width="3"/>` +
        T(p.info, 80, 535, { size: 17, weight: 500, anchor: 'start', maxW: 540, attrs: 'fill-opacity="0.88"' });
      return s;
    },
  });
  root.BL.bd2 = { pill, balloon, bunting, flake, person, rainbowTitle };
})(typeof window !== 'undefined' ? window : globalThis);
