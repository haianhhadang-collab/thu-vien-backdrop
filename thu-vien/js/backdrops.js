/* =========================================================================
 * backdrops.js — 12 mẫu backdrop sự kiện (khung 1200 × 600, tỉ lệ 2:1)
 * Tỉ lệ 2:1 khớp các kích thước in phổ biến: 4×2 m, 5×2,5 m, 6×3 m, 8×4 m
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, TL, star, starPts, laurel, drum, flower, leaf, mix, shade, tint, textW, fitSize, rng, r2, rad, arcPath, logoSlot } = root.BL;
  const F = (k, label, v, extra) => Object.assign({ k, label, v }, extra || {});
  const C = (k, label, v) => ({ k, label, v });
  const add = t => root.BL.templates.push(Object.assign({ type: 'backdrop', w: 1200, h: 600 }, t));
  const STD = d => [
    F('org', 'Đơn vị tổ chức', d.org),
    F('kicker', 'Loại sự kiện (dòng giới thiệu)', d.kicker),
    F('title', 'Tiêu đề chính (Enter để xuống dòng)', d.title, { multi: true }),
    F('subtitle', 'Chủ đề / khẩu hiệu', d.subtitle),
    F('info', 'Thời gian – địa điểm', d.info),
  ];
  const lin = (id, stops, x2, y2) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2 == null ? 1 : x2}" y2="${y2 == null ? 1 : y2}">` +
    stops.map((c, i) => `<stop offset="${Array.isArray(c) ? c[1] : i / (stops.length - 1)}" stop-color="${Array.isArray(c) ? c[0] : c}"${Array.isArray(c) && c[2] != null ? ` stop-opacity="${c[2]}"` : ''}/>`).join('') + '</linearGradient>';
  const radial = (id, stops, cx, cy, r) => `<radialGradient id="${id}" cx="${cx == null ? 0.5 : cx}" cy="${cy == null ? 0.5 : cy}" r="${r == null ? 0.7 : r}">` +
    stops.map((c, i) => `<stop offset="${Array.isArray(c) ? c[1] : i / (stops.length - 1)}" stop-color="${Array.isArray(c) ? c[0] : c}"${Array.isArray(c) && c[2] != null ? ` stop-opacity="${c[2]}"` : ''}/>`).join('') + '</radialGradient>';
  const sparkle = (x, y, s, fill, op) => `<path d="M ${r2(x)} ${r2(y - s)} Q ${r2(x + s * 0.15)} ${r2(y - s * 0.15)} ${r2(x + s)} ${r2(y)} Q ${r2(x + s * 0.15)} ${r2(y + s * 0.15)} ${r2(x)} ${r2(y + s)} Q ${r2(x - s * 0.15)} ${r2(y + s * 0.15)} ${r2(x - s)} ${r2(y)} Q ${r2(x - s * 0.15)} ${r2(y - s * 0.15)} ${r2(x)} ${r2(y - s)} Z" fill="${fill}" opacity="${op == null ? 1 : op}"/>`;
  function confetti(seed, n, colors, box) {
    const R = rng(seed); let s = '';
    box = box || [0, 0, 1200, 600];
    for (let i = 0; i < n; i++) {
      const x = box[0] + R() * (box[2] - box[0]), y = box[1] + R() * (box[3] - box[1]);
      const c = colors[Math.floor(R() * colors.length)], op = r2(0.45 + R() * 0.5);
      if (R() < 0.55) s += `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(4 + R() * 7)}" height="${r2(2 + R() * 4)}" fill="${c}" opacity="${op}" transform="rotate(${r2(R() * 180)} ${r2(x)} ${r2(y)})"/>`;
      else s += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(1.5 + R() * 3)}" fill="${c}" opacity="${op}"/>`;
    }
    return s;
  }
  const heart = (x, y, s, fill, op) => `<path d="M ${r2(x)} ${r2(y + s * 0.9)} C ${r2(x - s * 1.4)} ${r2(y)} ${r2(x - s * 0.7)} ${r2(y - s * 0.9)} ${r2(x)} ${r2(y - s * 0.25)} C ${r2(x + s * 0.7)} ${r2(y - s * 0.9)} ${r2(x + s * 1.4)} ${r2(y)} ${r2(x)} ${r2(y + s * 0.9)} Z" fill="${fill}"${op != null ? ` opacity="${op}"` : ''}/>`;

  /* B01 — Hội thảo khoa học */
  add({
    id: 'B01', name: 'Hội thảo khoa học – xanh navy', styles: ['Trang trọng', 'Hiện đại'],
    use: 'Hội thảo, hội nghị khoa học, tọa đàm chuyên môn, diễn đàn',
    desc: 'Nền xanh navy chuyển màu, quả cầu lưới và các đường sóng mảnh gợi tri thức – kết nối toàn cầu. Chữ căn trái, thanh màu nhấn dẫn mắt.',
    fields: STD({ org: 'Trường Đại học Hà Nội', kicker: 'Hội thảo khoa học quốc gia', title: 'CHUYỂN ĐỔI SỐ\nTRONG GIÁO DỤC ĐẠI HỌC', subtitle: 'Cơ hội, thách thức và giải pháp', info: 'Hà Nội, ngày 20 tháng 11 năm 2026' }),
    colors: [C('c1', 'Màu nền đậm', '#0B1F4B'), C('c2', 'Màu nền sáng', '#1565C0'), C('c3', 'Màu nhấn', '#4FC3F7')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c1, mix(p.c1, p.c2, 0.65)])}${radial(u + 'gl', [[p.c3, 0, 0.35], [p.c3, 1, 0]])}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      for (let i = 0; i < 16; i++) s += `<path d="M 380 ${640 - i * 6} C 700 ${470 - i * 14}, 880 ${700 - i * 12}, 1220 ${420 - i * 16}" fill="none" stroke="${p.c3}" stroke-opacity="${r2(0.06 + i * 0.012)}" stroke-width="1.5"/>`;
      const gx = 965, gy = 265, R = 175;
      s += `<circle cx="${gx}" cy="${gy}" r="${R + 60}" fill="url(#${u}gl)"/>`;
      s += `<g fill="none" stroke="${p.c3}" stroke-opacity="0.35" stroke-width="1.4"><circle cx="${gx}" cy="${gy}" r="${R}"/>`;
      [0.3, 0.65].forEach(k => { s += `<ellipse cx="${gx}" cy="${gy}" rx="${R * k}" ry="${R}"/>`; });
      [-120, -60, 0, 60, 120].forEach(dy => { const hw = Math.sqrt(R * R - dy * dy); s += `<line x1="${r2(gx - hw)}" y1="${gy + dy}" x2="${r2(gx + hw)}" y2="${gy + dy}"/>`; });
      s += `</g>`;
      [[gx - 52, gy - 120], [gx + 114, gy - 60], [gx - 114, gy + 60], [gx + 52, gy + 120], [gx, gy], [gx + 160, gy + 60]].forEach(q => {
        s += `<circle cx="${r2(q[0])}" cy="${r2(q[1])}" r="9" fill="${p.c3}" opacity="0.25"/><circle cx="${r2(q[0])}" cy="${r2(q[1])}" r="4" fill="${p.c3}"/>`;
      });
      for (let x = 0; x < 7; x++) for (let y = 0; y < 4; y++) s += `<circle cx="${1050 + x * 18}" cy="${40 + y * 18}" r="2" fill="${p.c3}" opacity="0.45"/>`;
      s += logoSlot(p, 128, 92, 66) +
        T(p.org, 176, 100, { size: 20, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 700 }) +
        T(p.kicker, 110, 215, { size: 24, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 3, maxW: 720 });
      const t = TL(p.title, 110, 290, { size: 58, weight: 800, anchor: 'start', maxW: 720 }, 1.18);
      const ys = 290 + t.h + 56;
      s += t.svg + T(p.subtitle, 110, ys, { size: 26, weight: 500, italic: true, anchor: 'start', maxW: 720, attrs: 'fill-opacity="0.9"' }) +
        `<rect x="84" y="190" width="6" height="${r2(ys - 175)}" fill="${p.c3}"/>` +
        `<line x1="110" y1="533" x2="168" y2="533" stroke="${p.c3}" stroke-width="3"/>` +
        T(p.info, 184, 540, { size: 20, weight: 500, anchor: 'start', maxW: 700, attrs: 'fill-opacity="0.88"' });
      return s;
    },
  });

  /* B02 — Hội nghị trang trọng đỏ – vàng */
  add({
    id: 'B02', name: 'Hội nghị trang trọng đỏ – vàng', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Hội nghị tổng kết, đại hội, lễ ký kết, lễ kỷ niệm của cơ quan nhà nước – doanh nghiệp',
    desc: 'Bố cục đối xứng kinh điển của backdrop hội nghị Việt Nam: nền đỏ, chữ vàng nhũ, hoa văn trống đồng hai bên, khung viền kép.',
    fields: STD({ org: 'Công ty Cổ phần An Phát', kicker: 'Hội nghị', title: 'TỔNG KẾT CÔNG TÁC NĂM 2026\nVÀ TRIỂN KHAI NHIỆM VỤ NĂM 2027', subtitle: '', info: 'Hà Nội, ngày 28 tháng 12 năm 2026' }),
    colors: [C('c1', 'Màu nền đỏ', '#B3001B'), C('c2', 'Màu vàng nhũ', '#F2C14E'), C('c3', 'Màu chữ sáng', '#FFF3C4')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [mix(p.c1, '#ff5a5a', 0.18), p.c1, shade(p.c1, 0.38)], 0.5, 0.42, 0.8)}` +
        `${lin(u + 'gd', [[tint(p.c2, 0.75), 0], [p.c2, 0.5], [shade(p.c2, 0.2), 1]], 0, 1)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        drum(0, 300, 340, p.c2, { opacity: 0.17 }) + drum(1200, 300, 340, p.c2, { opacity: 0.17 }) +
        `<rect x="24" y="24" width="1152" height="552" fill="none" stroke="${p.c2}" stroke-width="2.5"/>` +
        `<rect x="34" y="34" width="1132" height="532" fill="none" stroke="${p.c2}" stroke-width="0.8" opacity="0.7"/>` +
        logoSlot(p, 600, 96, 78, { color: p.c2 }) +
        T(p.org, 600, 172, { size: 22, weight: 700, fill: p.c3, upper: true, ls: 2, maxW: 900 }) +
        T(p.kicker, 600, 240, { size: 50, weight: 800, fill: `url(#${u}gd)`, upper: true, ls: 4, maxW: 900 }) +
        `<g stroke="${p.c2}" stroke-width="1.5"><line x1="460" y1="264" x2="582" y2="264"/><line x1="618" y1="264" x2="740" y2="264"/></g>` +
        `<polygon points="600,256 608,264 600,272 592,264" fill="${p.c2}"/>`;
      const t = TL(p.title, 600, 328, { size: 50, weight: 800, fill: p.c3, maxW: 1000 }, 1.22);
      s += t.svg + T(p.subtitle, 600, 328 + t.h + 54, { size: 28, weight: 500, italic: true, fill: p.c3, maxW: 900 }) +
        T(p.info, 600, 528, { size: 22, weight: 500, italic: true, fill: p.c2, maxW: 900 });
      return s;
    },
  });

  /* B03 — Year End Party đen – vàng */
  add({
    id: 'B03', name: 'Year End Party đen – vàng', styles: ['Sang trọng', 'Sự kiện'],
    use: 'Tiệc tất niên, gala dinner, lễ trao giải, đêm vinh danh',
    desc: 'Phong cách Art Deco: nền đen, tia sáng tỏa từ đáy, khung viền vàng, chữ serif nhũ vàng kết hợp chữ viết tay. Sang trọng, lấp lánh.',
    fields: STD({ org: 'Công ty TNHH Đất Việt', kicker: 'Year End Party', title: 'GALA 2026', subtitle: 'Cùng nhau tỏa sáng', info: '19:00 • 15.01.2027 • Trung tâm Hội nghị Quốc gia' }),
    colors: [C('c1', 'Màu vàng', '#D4AF37'), C('c2', 'Màu nền tối', '#0C0B0D')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [mix(p.c2, p.c1, 0.16), p.c2], 0.5, 0.55, 0.75)}` +
        `${lin(u + 'gd', [[tint(p.c1, 0.8), 0], [p.c1, 0.45], [shade(p.c1, 0.3), 0.72], [tint(p.c1, 0.35), 1]], 0, 1)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      for (let i = 0; i <= 26; i++) {
        const a = rad(190 + i * 160 / 26);
        s += `<line x1="600" y1="640" x2="${r2(600 + 1100 * Math.cos(a))}" y2="${r2(640 + 1100 * Math.sin(a))}" stroke="${p.c1}" stroke-opacity="0.09" stroke-width="2"/>`;
      }
      s += `<rect x="28" y="28" width="1144" height="544" fill="none" stroke="${p.c1}" stroke-width="1.5"/>` +
        `<rect x="38" y="38" width="1124" height="524" fill="none" stroke="${p.c1}" stroke-width="0.6"/>`;
      const corner = `<path d="M 0 90 L 0 0 L 90 0 M 14 70 L 14 14 L 70 14 M 28 50 L 28 28 L 50 28" fill="none" stroke="${p.c1}" stroke-width="2"/>`;
      [[50, 50, 1, 1], [1150, 50, -1, 1], [50, 550, 1, -1], [1150, 550, -1, -1]].forEach(c => {
        s += `<g transform="translate(${c[0]} ${c[1]}) scale(${c[2]} ${c[3]})">${corner}</g>`;
      });
      s += confetti(11, 110, [p.c1, tint(p.c1, 0.5), '#ffffff'], [50, 50, 1150, 560]);
      const R = rng(5);
      for (let i = 0; i < 16; i++) s += sparkle(80 + R() * 1040, 70 + R() * 460, 5 + R() * 11, tint(p.c1, 0.6), 0.5 + R() * 0.5);
      s += logoSlot(p, 600, 84, 58, { color: p.c1 }) +
        T(p.org, 600, 140, { size: 18, font: 'Montserrat', weight: 600, fill: p.c1, upper: true, ls: 6, maxW: 800 }) +
        T(p.kicker, 600, 202, { size: 26, font: 'Montserrat', weight: 600, fill: '#ffffff', upper: true, ls: 12, maxW: 820 });
      const t = TL(p.title, 600, 318, { size: 118, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 900 }, 1.0);
      s += t.svg + T(p.subtitle, 600, 318 + t.h + 82, { size: 60, font: 'Great Vibes', weight: 400, fill: '#ffffff', maxW: 800 }) +
        T(p.info, 600, 522, { size: 18, font: 'Montserrat', weight: 500, fill: '#ffffff', upper: true, ls: 4, maxW: 900, attrs: 'fill-opacity="0.82"' });
      return s;
    },
  });

  /* B04 — Tết – Xuân */
  add({
    id: 'B04', name: 'Tết – Xuân đỏ thắm', styles: ['Truyền thống', 'Sự kiện'],
    use: 'Gặp mặt đầu xuân, tiệc tất niên kiểu Việt, hội chợ Tết, chương trình Xuân',
    desc: 'Cành mai vàng, đèn lồng, mây tường vân trên nền đỏ – không khí Tết rộn ràng. Tiêu đề serif nhũ vàng, khẩu hiệu viết tay.',
    fields: STD({ org: 'Công ty CP Thương mại Hòa Bình', kicker: 'Chúc mừng năm mới', title: 'XUÂN ĐINH MÙI 2027', subtitle: 'Gặp mặt đầu xuân – Vạn sự như ý', info: 'Mùng 6 Tết • 09:00 • Hội trường tầng 5' }),
    colors: [C('c1', 'Màu nền đỏ', '#C62828'), C('c2', 'Màu vàng', '#FFD54F'), C('c3', 'Màu chữ sáng', '#FFF8E1')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [mix(p.c1, '#ff6f61', 0.2), p.c1, shade(p.c1, 0.4)], 0.5, 0.45, 0.8)}` +
        `${lin(u + 'gd', [[tint(p.c2, 0.7), 0], [p.c2, 0.5], [shade(p.c2, 0.18), 1]], 0, 1)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      const R = rng(21);
      for (let i = 0; i < 14; i++) {
        const x = R() * 1200, y = R() * 600, k = 0.8 + R() * 1.2;
        s += `<path d="M 0 0 c 0 -14 18 -20 26 -10 c 4 -14 26 -16 32 0 c 12 -6 24 4 18 14 Z M 10 -4 a 6 6 0 1 1 8 -2 M 36 -6 a 7 7 0 1 1 9 -1" fill="none" stroke="${p.c2}" stroke-opacity="0.16" stroke-width="2" transform="translate(${r2(x)} ${r2(y)}) scale(${r2(k)})"/>`;
      }
      const wood = '#5D3A1A';
      let br = `<g fill="none" stroke="${wood}" stroke-linecap="round"><path d="M -20 60 C 120 80 200 40 300 110 C 360 150 380 140 430 130" stroke-width="9"/>` +
        `<path d="M 150 70 C 170 120 160 160 190 200" stroke-width="5"/><path d="M 300 110 C 290 160 320 190 300 230" stroke-width="4"/><path d="M 80 65 C 90 30 120 20 140 0" stroke-width="4"/></g>`;
      [[60, 62, 16], [140, 72, 20], [190, 200, 14], [240, 82, 18], [300, 110, 20], [300, 230, 13], [362, 146, 15], [430, 130, 17], [166, 140, 12], [122, 22, 13], [318, 178, 11]].forEach((f, i) => {
        br += flower(f[0], f[1], f[2], '#FFC93C', '#E8740C', { n: 5, rot: i * 13 });
      });
      [[95, 50], [215, 60], [400, 150], [180, 175], [270, 95]].forEach(b => { br += `<circle cx="${b[0]}" cy="${b[1]}" r="5" fill="#FFB300"/>`; });
      s += `<g transform="scale(0.95)">${br}</g><g transform="translate(1200 600) rotate(180) scale(0.95)">${br}</g>`;
      [[1020, 70, 1], [1120, 40, 0.8]].forEach(l => {
        const [x, len, k] = l, cy = len + 45 * k;
        s += `<line x1="${x}" y1="0" x2="${x}" y2="${len}" stroke="${p.c2}" stroke-width="2"/>` +
          `<rect x="${r2(x - 16 * k)}" y="${r2(len - 2)}" width="${r2(32 * k)}" height="${r2(10 * k)}" fill="${p.c2}"/>` +
          `<ellipse cx="${x}" cy="${r2(cy + 4 * k)}" rx="${r2(38 * k)}" ry="${r2(40 * k)}" fill="#E53935" stroke="${p.c2}" stroke-width="2"/>` +
          `<ellipse cx="${x}" cy="${r2(cy + 4 * k)}" rx="${r2(18 * k)}" ry="${r2(40 * k)}" fill="none" stroke="${p.c2}" stroke-width="1"/>` +
          `<rect x="${r2(x - 16 * k)}" y="${r2(cy + 42 * k)}" width="${r2(32 * k)}" height="${r2(10 * k)}" fill="${p.c2}"/>` +
          `<line x1="${x}" y1="${r2(cy + 52 * k)}" x2="${x}" y2="${r2(cy + 95 * k)}" stroke="${p.c2}" stroke-width="3"/>` +
          T('Phúc', x, r2(cy + 14 * k), { size: 22 * k, font: 'Dancing Script', weight: 700, fill: p.c2, noScale: true, attrs: 'data-deco="1"' });
      });
      s += logoSlot(p, 600, 68, 56, { color: p.c2 }) +
        T(p.org, 600, 122, { size: 18, weight: 600, fill: p.c3, upper: true, ls: 3, maxW: 640 }) +
        T(p.kicker, 600, 200, { size: 34, weight: 800, fill: p.c2, upper: true, ls: 4, maxW: 640 });
      const t = TL(p.title, 600, 296, { size: 86, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 760 }, 1.08);
      s += t.svg + T(p.subtitle, 600, 296 + t.h + 70, { size: 48, font: 'Dancing Script', weight: 700, fill: p.c3, maxW: 720 }) +
        T(p.info, 600, 528, { size: 20, weight: 500, fill: p.c3, maxW: 640 });
      return s;
    },
  });

  /* B05 — Lễ khai giảng */
  add({
    id: 'B05', name: 'Lễ khai giảng tươi sáng', styles: ['Vui tươi', 'Sự kiện'],
    use: 'Khai giảng năm học, ngày hội đến trường, Tết Trung thu ở trường, hội thi học sinh',
    desc: 'Bầu trời xanh, mây, mặt trời, đồi cỏ, chồng sách và bút chì – vui tươi, thân thiện học sinh. Chữ đậm viền trắng nổi bật.',
    fields: STD({ org: 'Trường THCS Nguyễn Trãi', kicker: 'Lễ khai giảng', title: 'NĂM HỌC 2026 – 2027', subtitle: 'Chào mừng các em học sinh khối 6', info: '07:30 • Thứ Bảy, ngày 05/09/2026' }),
    colors: [C('c1', 'Màu bầu trời', '#29B6F6'), C('c2', 'Màu chữ chính', '#0D3B66'), C('c3', 'Màu chữ nhấn', '#E53935')],
    render(p, u) {
      const cloud = (x, y, k) => `<g fill="#fff" opacity="0.95"><ellipse cx="${r2(x + 32 * k)}" cy="${r2(y + 10 * k)}" rx="${r2(62 * k)}" ry="${r2(18 * k)}"/><circle cx="${x}" cy="${y}" r="${r2(26 * k)}"/><circle cx="${r2(x + 32 * k)}" cy="${r2(y - 14 * k)}" r="${r2(34 * k)}"/><circle cx="${r2(x + 66 * k)}" cy="${r2(y)}" r="${r2(24 * k)}"/></g>`;
      let s = `<defs>${lin(u + 'bg', [p.c1, tint(p.c1, 0.85)], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<polygon points="${starPts(1085, 92, 100, 72, 16)}" fill="#FFE082" opacity="0.6"/><circle cx="1085" cy="92" r="60" fill="#FFD54F"/>` +
        cloud(70, 210, 1.1) + cloud(880, 150, 0.8) + cloud(300, 70, 0.7) + cloud(1040, 300, 0.9);
      const R = rng(3), cols = ['#FF7043', '#FFEE58', '#AB47BC', '#EF5350', '#66BB6A'];
      for (let i = 0; i < 26; i++) s += star(40 + R() * 1120, 30 + R() * 330, 4 + R() * 7, cols[i % cols.length]);
      s += `<path d="M 0 500 Q 300 440 600 492 T 1200 470 L 1200 600 L 0 600 Z" fill="#66BB6A"/>` +
        `<path d="M 0 545 Q 400 500 800 548 T 1200 532 L 1200 600 L 0 600 Z" fill="#43A047"/>`;
      [[70, 528, 190, '#E53935'], [85, 500, 170, '#FFB300'], [75, 472, 180, '#1E88E5']].forEach(b => {
        s += `<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="28" rx="4" fill="${b[3]}"/><rect x="${b[0] + b[2] - 14}" y="${b[1] + 4}" width="10" height="20" fill="#fff" opacity="0.85"/>`;
      });
      s += `<circle cx="165" cy="452" r="18" fill="#E53935"/>` + leaf(165, 436, 18, -60, '#43A047');
      s += `<g transform="translate(985 520) rotate(-25)"><rect x="0" y="-13" width="170" height="26" fill="#FFCA28"/><rect x="0" y="-13" width="170" height="8" fill="#FFB300"/>` +
        `<polygon points="170,-13 205,0 170,13" fill="#FFE0B2"/><polygon points="194,-4 205,0 194,4" fill="#333"/>` +
        `<rect x="-28" y="-13" width="22" height="26" rx="4" fill="#F48FB1"/><rect x="-8" y="-13" width="10" height="26" fill="#BDBDBD"/></g>`;
      const halo = w => `stroke="#fff" stroke-width="${w}" paint-order="stroke" stroke-linejoin="round"`;
      s += logoSlot(p, 108, 80, 70, { color: p.c2 }) +
        T(p.org, 156, 88, { size: 20, weight: 700, fill: p.c2, anchor: 'start', upper: true, ls: 1, maxW: 640 }) +
        T(p.kicker, 600, 215, { size: 72, weight: 900, fill: p.c2, upper: true, maxW: 880, attrs: halo(12) });
      const t = TL(p.title, 600, 292, { size: 48, weight: 800, fill: p.c3, maxW: 860, attrs: halo(9) }, 1.15);
      const ys = 292 + t.h + 52;
      s += t.svg + T(p.subtitle, 600, ys, { size: 28, weight: 600, fill: p.c2, maxW: 800, attrs: halo(6) });
      if (p.info) {
        const fs = fitSize(p.info, 20, 640, 'Be Vietnam Pro', 600, 0), w = textW(p.info, fs, 'Be Vietnam Pro', 600, 0);
        s += `<rect x="${r2(600 - w / 2 - 28)}" y="${ys + 26}" width="${r2(w + 56)}" height="46" rx="23" fill="#fff" opacity="0.92"/>` +
          T(p.info, 600, ys + 56, { size: fs, weight: 600, fill: p.c2 });
      }
      return s;
    },
  });

  /* B06 — Lễ tốt nghiệp */
  add({
    id: 'B06', name: 'Lễ tốt nghiệp navy – vàng', styles: ['Trang trọng', 'Sang trọng'],
    use: 'Lễ trao bằng tốt nghiệp, lễ trưởng thành, vinh danh học sinh – sinh viên',
    desc: 'Mũ tốt nghiệp trong vòng nguyệt quế, mảng chéo vàng, chữ serif lớn căn trái kết hợp chữ viết tay – trang trọng mà trẻ trung.',
    fields: STD({ org: 'Trường Đại học Ánh Dương', kicker: 'Lễ trao bằng tốt nghiệp', title: 'KHÓA 2022 – 2026', subtitle: 'Vững bước tương lai', info: '08:00 • 25/07/2026 • Hội trường A' }),
    colors: [C('c1', 'Màu nền', '#0A2342'), C('c2', 'Màu vàng', '#E0B13C')],
    render(p, u) {
      const cx = 925, cy = 300;
      let s = `<defs>${lin(u + 'bg', [shade(p.c1, 0.2), p.c1, tint(p.c1, 0.12)])}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<polygon points="0,0 120,0 0,150" fill="${p.c2}"/><polygon points="0,170 150,0 165,0 0,188" fill="${p.c2}" opacity="0.6"/>` +
        `<polygon points="0,600 0,440 270,600" fill="${p.c2}" opacity="0.9"/><polygon points="0,420 0,405 330,600 305,600" fill="${p.c2}" opacity="0.5"/>` +
        `<polygon points="1200,0 1080,0 1200,90" fill="${p.c2}" opacity="0.85"/>` +
        confetti(8, 70, [p.c2, tint(p.c2, 0.5), '#ffffff'], [640, 30, 1180, 580]) +
        `<circle cx="${cx}" cy="${cy}" r="190" fill="${shade(p.c1, 0.3)}" stroke="${p.c2}" stroke-width="2"/>` +
        `<circle cx="${cx}" cy="${cy}" r="172" fill="none" stroke="${p.c2}" stroke-width="0.8"/>` +
        laurel(cx, cy + 6, 148, p.c2, { from: 100, to: 248, n: 10 }) +
        `<g stroke="${p.c2}" stroke-width="1.6"><path d="M ${cx - 55} ${cy - 2} L ${cx - 55} ${cy + 40} Q ${cx} ${cy + 66} ${cx + 55} ${cy + 40} L ${cx + 55} ${cy - 2} Q ${cx} ${cy + 26} ${cx - 55} ${cy - 2} Z" fill="#0d1117"/>` +
        `<polygon points="${cx},${cy - 55} ${cx + 92},${cy - 18} ${cx},${cy + 18} ${cx - 92},${cy - 18}" fill="#11161d"/></g>` +
        `<polyline points="${cx},${cy - 18} ${cx + 70},${cy - 6} ${cx + 70},${cy + 52}" fill="none" stroke="${p.c2}" stroke-width="3"/>` +
        `<rect x="${cx + 63}" y="${cy + 50}" width="14" height="26" rx="3" fill="${p.c2}"/><circle cx="${cx}" cy="${cy - 18}" r="5" fill="${p.c2}"/>` +
        logoSlot(p, 126, 92, 70, { color: p.c2 }) +
        T(p.org, 176, 100, { size: 19, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 520 }) +
        T(p.kicker, 92, 218, { size: 26, weight: 700, fill: p.c2, anchor: 'start', upper: true, ls: 5, maxW: 600 });
      const t = TL(p.title, 90, 302, { size: 74, font: 'Playfair Display', weight: 900, anchor: 'start', maxW: 620 }, 1.1);
      s += t.svg + T(p.subtitle, 92, 302 + t.h + 74, { size: 56, font: 'Great Vibes', weight: 400, fill: p.c2, anchor: 'start', maxW: 600 }) +
        `<line x1="92" y1="532" x2="150" y2="532" stroke="${p.c2}" stroke-width="3"/>` +
        T(p.info, 166, 539, { size: 19, weight: 500, anchor: 'start', maxW: 520, attrs: 'fill-opacity="0.88"' });
      return s;
    },
  });

  /* B07 — Kỷ niệm thành lập */
  add({
    id: 'B07', name: 'Kỷ niệm năm thành lập', styles: ['Trang trọng', 'Sự kiện'],
    use: 'Kỷ niệm 10, 20, 30, 50… năm thành lập trường, công ty, ngành, đơn vị',
    desc: 'Con số kỷ niệm khổng lồ nhũ vàng trong vòng nguyệt quế bên trái, thông tin bên phải; dải sáng uốn lượn tạo chiều sâu.',
    fields: [F('num', 'Số năm kỷ niệm', '30'), F('unit', 'Chữ dưới số', 'NĂM')].concat(
      STD({ org: 'Sở Giáo dục và Đào tạo Hà Nội', kicker: 'Kỷ niệm ngày thành lập', title: 'TRƯỜNG THPT\nCHU VĂN AN', subtitle: '1996 – 2026', info: 'Hà Nội, ngày 15 tháng 10 năm 2026' })),
    colors: [C('c1', 'Màu nền', '#0D47A1'), C('c2', 'Màu vàng', '#FFC107')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [tint(p.c1, 0.08), shade(p.c1, 0.5)])}` +
        `${lin(u + 'gd', [[tint(p.c2, 0.75), 0], [p.c2, 0.5], [shade(p.c2, 0.25), 1]], 0, 1)}` +
        `${lin(u + 'st', [['#ffffff', 0, 0], ['#ffffff', 0.5, 0.18], ['#ffffff', 1, 0]], 1, 0)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      [[0, 0], [60, 1], [120, 2]].forEach(o => {
        s += `<path d="M -50 ${520 - o[0]} C 300 ${380 - o[0]} 700 ${640 - o[0]} 1250 ${360 - o[0]} L 1250 ${385 - o[0]} C 700 ${670 - o[0]} 300 ${410 - o[0]} -50 ${548 - o[0]} Z" fill="url(#${u}st)" opacity="${0.9 - o[1] * 0.25}"/>`;
      });
      s += confetti(14, 50, [p.c2, '#ffffff'], [40, 30, 1160, 570]) +
        laurel(330, 292, 208, p.c2, { from: 108, to: 250, n: 10 }) +
        T(p.num, 330, 388, { size: 280, font: 'Montserrat', weight: 900, fill: `url(#${u}gd)`, maxW: 330, ls: -6 }) +
        T(p.unit, 337, 446, { size: 36, font: 'Montserrat', weight: 800, fill: p.c2, upper: true, ls: 14, maxW: 220 }) +
        `<line x1="585" y1="160" x2="585" y2="450" stroke="${p.c2}" stroke-opacity="0.6" stroke-width="1.5"/>` +
        logoSlot(p, 652, 104, 62, { color: p.c2 }) +
        T(p.org, 696, 111, { size: 18, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 460 }) +
        T(p.kicker, 620, 210, { size: 28, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 3, maxW: 520 });
      const t = TL(p.title, 620, 280, { size: 54, weight: 800, anchor: 'start', maxW: 530 }, 1.15);
      s += t.svg + T(p.subtitle, 620, 280 + t.h + 64, { size: 44, font: 'Playfair Display', weight: 700, italic: true, fill: p.c2, anchor: 'start', maxW: 520 }) +
        T(p.info, 620, 540, { size: 19, weight: 500, anchor: 'start', maxW: 540, attrs: 'fill-opacity="0.85"' });
      return s;
    },
  });

  /* B08 — Lễ thành hôn */
  add({
    id: 'B08', name: 'Lễ thành hôn pastel hoa lá', styles: ['Lãng mạn', 'Sang trọng'],
    use: 'Tiệc cưới, lễ đính hôn, lễ kỷ niệm ngày cưới, photobooth',
    desc: 'Nền kem với mảng màu loang kiểu màu nước, cụm hoa ở hai góc chéo, tên cô dâu chú rể viết tay ở trung tâm.',
    fields: [F('kicker', 'Dòng trên', 'Lễ thành hôn'), F('title', 'Tên hai bạn', 'Quốc Bảo & Minh Anh', { multi: true }),
      F('info', 'Ngày cưới', '12 . 12 . 2026'), F('subtitle', 'Địa điểm', 'Trung tâm tiệc cưới Hoa Sen – Hà Nội')],
    colors: [C('c1', 'Màu hoa', '#E8A0A8'), C('c2', 'Màu chữ', '#6B4E3D'), C('c3', 'Màu lá', '#9DB59A'), C('c4', 'Màu nền', '#FFF8F0')],
    render(p, u) {
      let s = `<defs><filter id="${u}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter></defs>` +
        `<rect width="1200" height="600" fill="${p.c4}"/><g filter="url(#${u}b)">` +
        `<circle cx="100" cy="80" r="170" fill="${p.c1}" opacity="0.35"/><circle cx="1120" cy="540" r="180" fill="${p.c1}" opacity="0.35"/>` +
        `<circle cx="1150" cy="60" r="100" fill="${p.c3}" opacity="0.3"/><circle cx="60" cy="560" r="110" fill="${p.c3}" opacity="0.3"/></g>`;
      let cl = '';
      for (let i = 0; i < 9; i++) cl += leaf(60, 60, 95 + (i % 3) * 22, -10 + i * 12.5, i % 2 ? p.c3 : shade(p.c3, 0.18));
      cl += flower(72, 72, 54, p.c1, shade(p.c1, 0.3), { n: 6, w: 0.5 }) + flower(72, 72, 32, tint(p.c1, 0.35), shade(p.c1, 0.35), { n: 6, w: 0.5, rot: 30 }) +
        flower(178, 44, 30, tint(p.c1, 0.2), shade(p.c1, 0.3), { n: 5, w: 0.5, rot: 15 }) +
        flower(44, 180, 30, tint(p.c1, 0.2), shade(p.c1, 0.3), { n: 5, w: 0.5 }) +
        flower(150, 140, 18, tint(p.c1, 0.5), shade(p.c1, 0.2), { n: 5, w: 0.5, rot: 40 });
      [[230, 30], [210, 95], [100, 230], [30, 245]].forEach(b => { cl += `<circle cx="${b[0]}" cy="${b[1]}" r="6" fill="${p.c1}"/>`; });
      s += `<g>${cl}</g><g transform="translate(1200 600) rotate(180)">${cl}</g>` +
        logoSlot(p, 600, 78, 64, { optional: true }) +
        T(p.kicker, 600 + 5, 182, { size: 26, font: 'Cormorant Garamond', weight: 600, fill: p.c2, upper: true, ls: 10, maxW: 700 });
      const t = TL(p.title, 600, 300, { size: 112, font: 'Great Vibes', weight: 400, fill: p.c2, maxW: 860 }, 0.95);
      const y = 300 + t.h;
      s += t.svg + `<g stroke="${p.c2}" stroke-width="1.2"><line x1="470" y1="${y + 46}" x2="578" y2="${y + 46}"/><line x1="622" y1="${y + 46}" x2="730" y2="${y + 46}"/></g>` +
        heart(600, y + 44, 10, p.c1) +
        T(p.info, 600 + 3, y + 104, { size: 32, font: 'Cormorant Garamond', weight: 600, fill: p.c2, ls: 6, maxW: 700 }) +
        T(p.subtitle, 600, y + 148, { size: 26, font: 'Cormorant Garamond', weight: 500, italic: true, fill: p.c2, maxW: 760 });
      return s;
    },
  });

  /* B09 — Ra mắt sản phẩm công nghệ */
  add({
    id: 'B09', name: 'Ra mắt sản phẩm công nghệ', styles: ['Công nghệ', 'Hiện đại'],
    use: 'Launching sản phẩm, sự kiện công nghệ, hackathon, hội nghị khách hàng',
    desc: 'Nền tối với quầng sáng tím – xanh neon, sàn lưới phối cảnh và quả cầu năng lượng. Tiêu đề chữ không chân siêu đậm.',
    fields: STD({ org: 'Nova Technology JSC', kicker: 'Lễ ra mắt sản phẩm', title: 'NOVA X1', subtitle: 'Kỷ nguyên trí tuệ nhân tạo', info: '14:00 • 10.12.2026 • GEM Center, TP.HCM' }),
    colors: [C('c1', 'Màu nền', '#1A0B3B'), C('c2', 'Màu quầng tím', '#7C4DFF'), C('c3', 'Màu neon', '#00E5FF')],
    render(p, u) {
      const ox = 930, oy = 262;
      let s = `<defs>${lin(u + 'bg', ['#050816', p.c1])}${radial(u + 'g1', [[p.c2, 0, 0.75], [p.c2, 1, 0]], 0.5, 0.5, 0.5)}${radial(u + 'g2', [[p.c3, 0, 0.5], [p.c3, 1, 0]], 0.5, 0.5, 0.5)}` +
        `${lin(u + 'ring', [p.c2, p.c3])}${lin(u + 'tx', ['#ffffff', tint(p.c3, 0.45)], 0, 1)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<circle cx="${ox}" cy="${oy}" r="420" fill="url(#${u}g1)" opacity="0.7"/><circle cx="1120" cy="560" r="300" fill="url(#${u}g2)"/><circle cx="60" cy="620" r="320" fill="url(#${u}g1)" opacity="0.5"/>`;
      let g = '';
      for (let i = 1; i <= 9; i++) { const y = 430 + i * i * 2.1; g += `<line x1="0" y1="${r2(y)}" x2="1200" y2="${r2(y)}"/>`; }
      for (let xb = -900; xb <= 2700; xb += 150) { const t0 = (430 - 380) / 220; g += `<line x1="${r2(900 + (xb - 900) * t0)}" y1="430" x2="${xb}" y2="600"/>`; }
      s += `<g stroke="${p.c3}" stroke-opacity="0.28" stroke-width="1">${g}</g>` +
        `<circle cx="${ox}" cy="${oy}" r="122" fill="url(#${u}g2)"/>` +
        `<circle cx="${ox}" cy="${oy}" r="150" fill="none" stroke="url(#${u}ring)" stroke-width="3"/>` +
        `<circle cx="${ox}" cy="${oy}" r="178" fill="none" stroke="${p.c3}" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="2 9"/>` +
        `<circle cx="${ox}" cy="${oy}" r="98" fill="none" stroke="#fff" stroke-opacity="0.25" stroke-width="1"/>` +
        `<path d="${arcPath(ox, oy, 205, 200, 270)}" fill="none" stroke="${p.c3}" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="${arcPath(ox, oy, 205, 20, 80)}" fill="none" stroke="${p.c2}" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="${arcPath(ox, oy, 228, 300, 330)}" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>`;
      const R = rng(9);
      for (let i = 0; i < 70; i++) s += `<circle cx="${r2(R() * 1200)}" cy="${r2(R() * 430)}" r="${r2(0.6 + R() * 1.8)}" fill="#fff" opacity="${r2(0.2 + R() * 0.7)}"/>`;
      s += logoSlot(p, 134, 90, 64) +
        T(p.org, 182, 97, { size: 18, weight: 600, anchor: 'start', upper: true, ls: 2, maxW: 560, attrs: 'fill-opacity="0.9"' }) +
        T(p.kicker, 100, 210, { size: 22, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 6, maxW: 620 });
      const t = TL(p.title, 96, 318, { size: 108, font: 'Montserrat', weight: 900, fill: `url(#${u}tx)`, anchor: 'start', maxW: 660 }, 1.0);
      const ys = 318 + t.h + 58;
      s += t.svg + T(p.subtitle, 100, ys, { size: 30, weight: 500, anchor: 'start', maxW: 620, attrs: 'fill-opacity="0.88"' });
      if (p.info) {
        const fs = fitSize(p.info, 18, 600, 'Be Vietnam Pro', 500, 1), w = textW(p.info, fs, 'Be Vietnam Pro', 500, 1);
        s += `<rect x="100" y="${ys + 34}" width="${r2(w + 56)}" height="44" rx="22" fill="${p.c3}" fill-opacity="0.08" stroke="${p.c3}" stroke-width="1.5"/>` +
          T(p.info, 128, ys + 62, { size: fs, weight: 500, anchor: 'start', ls: 1 });
      }
      return s;
    },
  });

  /* B10 — Tri ân thầy cô 20/11 */
  add({
    id: 'B10', name: 'Tri ân thầy cô 20/11', styles: ['Lãng mạn', 'Vui tươi'],
    use: 'Ngày Nhà giáo Việt Nam 20/11, lễ tri ân, ngày hội tri ân cha mẹ, văn nghệ',
    desc: 'Tông hồng – kem dịu dàng, cụm hoa lớn bên trái, trái tim bay nhẹ. Tiêu đề serif đậm, câu ca dao viết tay đầy cảm xúc.',
    fields: STD({ org: 'Trường Tiểu học Hoa Sen', kicker: 'Kỷ niệm 44 năm Ngày Nhà giáo Việt Nam', title: 'TRI ÂN THẦY CÔ', subtitle: 'Một chữ cũng là thầy, nửa chữ cũng là thầy', info: '20.11.1982 – 20.11.2026' }),
    colors: [C('c1', 'Màu hoa', '#F48FB1'), C('c2', 'Màu chữ', '#AD1457'), C('c3', 'Màu nền', '#FFF5F0')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c3, tint(p.c1, 0.72)], 1, 0.4)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      const rose = (x, y, R) => flower(x, y, R, tint(p.c1, 0.25), p.c1, { n: 8, w: 0.45 }) + flower(x, y, R * 0.66, p.c1, shade(p.c1, 0.2), { n: 6, w: 0.5, rot: 22 }) +
        flower(x, y, R * 0.36, shade(p.c1, 0.15), shade(p.c1, 0.35), { n: 5, w: 0.5, rot: 10 });
      [[40, 70, -30, 120], [200, 250, 20, 110], [30, 400, -60, 130], [260, 470, 40, 100], [330, 90, 10, 90], [120, 560, -20, 110]].forEach((l, i) => {
        s += leaf(l[0], l[1], l[3], l[2], i % 2 ? '#81C784' : '#66BB6A');
      });
      s += rose(120, 140, 95) + rose(260, 330, 70) + rose(105, 470, 85) + rose(330, 120, 48) + rose(55, 315, 44) + rose(300, 540, 52);
      const R = rng(4);
      for (let i = 0; i < 14; i++) s += heart(480 + R() * 680, 40 + R() * 520, 6 + R() * 10, p.c1, r2(0.25 + R() * 0.4));
      s += logoSlot(p, 760, 70, 60, { color: p.c2 }) +
        T(p.org, 760, 128, { size: 18, weight: 600, fill: p.c2, upper: true, ls: 2, maxW: 720 }) +
        T(p.kicker, 760, 196, { size: 24, weight: 700, fill: p.c2, upper: true, ls: 2, maxW: 740 });
      const t = TL(p.title, 760, 292, { size: 88, font: 'Playfair Display', weight: 900, fill: p.c2, maxW: 740 }, 1.1);
      const ys = 292 + t.h + 70;
      s += t.svg + T(p.subtitle, 760, ys, { size: 42, font: 'Dancing Script', weight: 700, fill: '#6D4C41', maxW: 720 }) +
        `<g stroke="${p.c2}" stroke-width="1.2"><line x1="590" y1="${ys + 52}" x2="738" y2="${ys + 52}"/><line x1="782" y1="${ys + 52}" x2="930" y2="${ys + 52}"/></g>` +
        heart(760, ys + 50, 10, p.c2) +
        T(p.info, 760, ys + 100, { size: 22, weight: 600, fill: p.c2, ls: 2, maxW: 700 });
      return s;
    },
  });

  /* B11 — Hội thao năng động */
  add({
    id: 'B11', name: 'Hội thao – giải chạy năng động', styles: ['Năng động', 'Sự kiện'],
    use: 'Hội thao, giải chạy, giải bóng đá, team building, ngày hội thể thao',
    desc: 'Các dải màu chéo tốc độ, chữ nghiêng siêu đậm, huy chương vàng – năng lượng, chuyển động, tinh thần thi đấu.',
    fields: STD({ org: 'Công đoàn Công ty CP Xây dựng Số 1', kicker: 'Giải chạy • Bóng đá • Cầu lông', title: 'HỘI THAO\nNĂM 2026', subtitle: 'KHỎE ĐỂ CỐNG HIẾN', info: 'Sân vận động Mỹ Đình • 15 – 16/11/2026' }),
    colors: [C('c1', 'Màu cam', '#FF6D00'), C('c2', 'Màu xanh ngọc', '#00E5B0'), C('c3', 'Màu nền tối', '#0F172A')],
    render(p, u) {
      const stripe = (xb, w, fill, op) => `<polygon points="${xb},600 ${xb + w},600 ${xb + w + 350},0 ${xb + 350},0" fill="${fill}" opacity="${op}"/>`;
      let s = `<defs>${lin(u + 'md', ['#FFE082', '#FFA000'])}</defs><rect width="1200" height="600" fill="${p.c3}"/>` +
        stripe(250, 70, '#ffffff', 0.04) + stripe(560, 150, p.c1, 1) + stripe(745, 44, p.c2, 1) + stripe(822, 18, p.c1, 0.6) + stripe(870, 330, '#ffffff', 0.04);
      const R = rng(12);
      for (let i = 0; i < 20; i++) { const y = 30 + R() * 540, x = 620 + R() * 520; s += `<line x1="${r2(x)}" y1="${r2(y)}" x2="${r2(x + 60 + R() * 200)}" y2="${r2(y)}" stroke="#fff" stroke-opacity="0.25" stroke-width="${r2(2 + R() * 3)}" stroke-linecap="round"/>`; }
      s += `<polygon points="900,-10 965,-10 1015,230 972,252" fill="${p.c1}"/><polygon points="1100,-10 1035,-10 985,230 1028,252" fill="${p.c2}"/>` +
        `<circle cx="1000" cy="335" r="104" fill="url(#${u}md)" stroke="#fff" stroke-opacity="0.5" stroke-width="3"/>` +
        `<circle cx="1000" cy="335" r="82" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>` + star(1000, 340, 50, '#FFF8E1');
      s += logoSlot(p, 130, 90, 64) +
        T(p.org, 176, 98, { size: 18, weight: 600, anchor: 'start', upper: true, ls: 2, maxW: 520 }) +
        `<g transform="translate(55 0) skewX(-10)">` +
        T(p.kicker, 92, 200, { size: 24, weight: 800, fill: p.c1, anchor: 'start', upper: true, ls: 3, maxW: 560 });
      const t = TL(p.title, 88, 296, { size: 94, weight: 900, anchor: 'start', upper: true, maxW: 600 }, 1.0);
      const ys = 296 + t.h + 64;
      s += t.svg;
      if (p.subtitle) {
        const fs = fitSize(p.subtitle, 30, 560, 'Be Vietnam Pro', 800, 1), w = textW(p.subtitle, fs, 'Be Vietnam Pro', 800, 1);
        s += `<rect x="88" y="${r2(ys - fs - 4)}" width="${r2(w + 36)}" height="${r2(fs + 22)}" fill="${p.c2}"/>` +
          T(p.subtitle, 106, ys, { size: fs, weight: 800, fill: p.c3, anchor: 'start', ls: 1 });
      }
      s += T(p.info, 92, 540, { size: 20, weight: 500, anchor: 'start', maxW: 600, attrs: 'fill-opacity="0.85"' }) + '</g>';
      return s;
    },
  });

  /* B12 — Workshop tối giản kiểu Thụy Sĩ */
  add({
    id: 'B12', name: 'Workshop tối giản (Swiss style)', styles: ['Tối giản', 'Hiện đại'],
    use: 'Workshop, talkshow, ra mắt sách, triển lãm, sự kiện sáng tạo',
    desc: 'Lưới mảnh, hình tròn màu đơn sắc và chữ rất lớn căn trái – phong cách Thụy Sĩ, hiện đại, nhiều khoảng thở, dễ đọc từ xa.',
    fields: [F('big', 'Số / chữ lớn trang trí', '03')].concat(
      STD({ org: 'Hanoi Creative Hub', kicker: 'Workshop số 03', title: 'Thiết kế\ncho tương lai', subtitle: 'Tư duy thiết kế & ứng dụng AI trong sáng tạo', info: 'Thứ Bảy, 14.11.2026  |  14:00 – 17:00  |  Tầng 3, 22 Hàng Bài' })),
    colors: [C('c1', 'Màu nhấn', '#E63946'), C('c2', 'Màu chữ', '#111111'), C('c3', 'Màu nền', '#F5F1EA')],
    render(p, u) {
      let s = `<rect width="1200" height="600" fill="${p.c3}"/><g stroke="${p.c2}" stroke-opacity="0.07" stroke-width="1">`;
      for (let x = 100; x < 1200; x += 100) s += `<line x1="${x}" y1="0" x2="${x}" y2="600"/>`;
      s += `<line x1="0" y1="150" x2="1200" y2="150"/><line x1="0" y1="450" x2="1200" y2="450"/></g>` +
        `<circle cx="1010" cy="300" r="250" fill="${p.c1}"/>` +
        T(p.big, 1010, 372, { size: 210, font: 'Montserrat', weight: 900, fill: 'none', maxW: 400, noScale: true, attrs: 'stroke="#ffffff" stroke-width="2.5" data-deco="1"' }) +
        logoSlot(p, 120, 68, 52, { color: p.c2 }) +
        T(p.org, 160, 75, { size: 16, weight: 600, fill: p.c2, anchor: 'start', upper: true, ls: 2, maxW: 520 }) +
        `<rect x="92" y="138" width="56" height="7" fill="${p.c1}"/>` +
        T(p.kicker, 92, 182, { size: 20, weight: 700, fill: p.c2, anchor: 'start', upper: true, ls: 6, maxW: 600 });
      const t = TL(p.title, 86, 272, { size: 92, weight: 800, fill: p.c2, anchor: 'start', ls: -2, maxW: 640 }, 1.05);
      s += t.svg + T(p.subtitle, 90, 272 + t.h + 62, { size: 26, weight: 500, fill: mix(p.c2, '#ffffff', 0.3), anchor: 'start', maxW: 620 }) +
        `<line x1="92" y1="500" x2="690" y2="500" stroke="${p.c2}" stroke-width="1"/>` +
        T(p.info, 92, 535, { size: 17, weight: 600, fill: p.c2, anchor: 'start', ls: 0.5, maxW: 640 });
      return s;
    },
  });
  /* Dùng chung cho backdrops2.js */
  root.BL.bd = { F, C, STD, lin, radial, sparkle, confetti, heart };
})(typeof window !== 'undefined' ? window : globalThis);
