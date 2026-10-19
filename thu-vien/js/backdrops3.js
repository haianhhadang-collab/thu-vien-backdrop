/* =========================================================================
 * backdrops3.js — 12 mẫu backdrop bổ sung (B29 – B40), khung 1200 × 600
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, TL, star, starPts, laurel, flower, leaf, mix, shade, tint, textW, fitSize, rng, r2, rad, logoSlot } = root.BL;
  const { F, C, STD, lin, radial, sparkle, confetti, heart } = root.BL.bd;
  const { pill, balloon, person } = root.BL.bd2;
  const add = t => root.BL.templates.push(Object.assign({ type: 'backdrop', w: 1200, h: 600 }, t));

  const rose = (x, y, R, c) => flower(x, y, R, tint(c, 0.25), c, { n: 8, w: 0.45 }) + flower(x, y, R * 0.66, c, shade(c, 0.2), { n: 6, w: 0.5, rot: 22 }) +
    flower(x, y, R * 0.36, shade(c, 0.15), shade(c, 0.35), { n: 5, w: 0.5, rot: 10 });
  const cloud = 'M 0 0 c 0 -14 18 -20 26 -10 c 4 -14 26 -16 32 0 c 12 -6 24 4 18 14 Z M 10 -4 a 6 6 0 1 1 8 -2 M 36 -6 a 7 7 0 1 1 9 -1';
  function lantern(x, len, k, red, gold, word) {
    const cy = len + 45 * k;
    return `<line x1="${x}" y1="0" x2="${x}" y2="${len}" stroke="${gold}" stroke-width="2"/>` +
      `<rect x="${r2(x - 16 * k)}" y="${r2(len - 2)}" width="${r2(32 * k)}" height="${r2(10 * k)}" fill="${gold}"/>` +
      `<ellipse cx="${x}" cy="${r2(cy + 4 * k)}" rx="${r2(38 * k)}" ry="${r2(40 * k)}" fill="${red}" stroke="${gold}" stroke-width="2"/>` +
      `<ellipse cx="${x}" cy="${r2(cy + 4 * k)}" rx="${r2(18 * k)}" ry="${r2(40 * k)}" fill="none" stroke="${gold}" stroke-width="1"/>` +
      `<rect x="${r2(x - 16 * k)}" y="${r2(cy + 42 * k)}" width="${r2(32 * k)}" height="${r2(10 * k)}" fill="${gold}"/>` +
      `<line x1="${x}" y1="${r2(cy + 52 * k)}" x2="${x}" y2="${r2(cy + 95 * k)}" stroke="${gold}" stroke-width="3"/>` +
      T(word, x, r2(cy + 14 * k), { size: 22 * k, font: 'Dancing Script', weight: 700, fill: gold, noScale: true, attrs: 'data-deco="1"' });
  }
  function gear(cx, cy, r, teeth, c, w) {
    const pts = [];
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2, st = Math.PI * 2 / teeth;
      [[0, r], [0.15, r * 1.18], [0.35, r * 1.18], [0.5, r]].forEach(q => pts.push(`${r2(cx + q[1] * Math.cos(a + q[0] * st))},${r2(cy + q[1] * Math.sin(a + q[0] * st))}`));
    }
    return `<polygon points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/><circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r * 0.35)}" fill="none" stroke="${c}" stroke-width="${w}"/>`;
  }
  const halo = w => `stroke="#fff" stroke-width="${w}" paint-order="stroke" stroke-linejoin="round"`;

  /* B29 — Lễ vu quy / ăn hỏi */
  add({
    id: 'B29', name: 'Lễ vu quy – ăn hỏi truyền thống', styles: ['Truyền thống', 'Lãng mạn'], topic: 'Cưới hỏi – gia đình',
    use: 'Lễ ăn hỏi, lễ vu quy, lễ tân hôn tại tư gia, lễ dạm ngõ',
    desc: 'Nền đỏ son, khung viền kép nhũ vàng, mây tường vân ở bốn góc, đèn lồng chữ Hỷ hai bên và vòng tròn viên mãn ôm tên cô dâu chú rể.',
    fields: [F('kicker', 'Tên lễ', 'Lễ vu quy'), F('title', 'Tên hai bạn', 'Quốc Bảo & Minh Anh', { multi: true }),
      F('info', 'Ngày', '12 . 12 . 2026'), F('subtitle', 'Địa điểm', 'Tư gia nhà gái – Số 12 Hàng Bạc, Hà Nội')],
    colors: [C('c1', 'Màu đỏ son', '#A4161A'), C('c2', 'Màu nhũ vàng', '#E9C46A'), C('c3', 'Màu chữ sáng', '#FFF4E0')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.14), p.c1, shade(p.c1, 0.45)], 0.5, 0.45, 0.8)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<rect x="22" y="22" width="1156" height="556" fill="none" stroke="${p.c2}" stroke-width="2"/><rect x="32" y="32" width="1136" height="536" fill="none" stroke="${p.c2}" stroke-width="0.8"/>`;
      [[60, 90, 1], [1140, 90, -1], [60, 540, 1], [1140, 540, -1]].forEach(c => {
        s += `<path d="${cloud}" fill="${p.c2}" fill-opacity="0.25" stroke="${p.c2}" stroke-width="1.2" transform="translate(${c[0]} ${c[1]}) scale(${2.2 * c[2]} 2.2)"/>`;
      });
      s += `<circle cx="600" cy="300" r="235" fill="${shade(p.c1, 0.15)}" fill-opacity="0.5" stroke="${p.c2}" stroke-width="1.5"/>` +
        `<circle cx="600" cy="300" r="222" fill="none" stroke="${p.c2}" stroke-width="1.2" stroke-dasharray="2 7"/>` +
        lantern(170, 40, 1.15, shade(p.c1, 0.1), p.c2, 'Hỷ') + lantern(1030, 40, 1.15, shade(p.c1, 0.1), p.c2, 'Hỷ');
      [[95, 470, 34], [150, 515, 24], [1105, 470, 34], [1050, 515, 24]].forEach((f, i) => { s += flower(f[0], f[1], f[2], i % 2 ? p.c2 : tint(p.c1, 0.35), p.c2, { n: 6, w: 0.5, rot: i * 20 }); });
      s += logoSlot(p, 600, 112, 54, { optional: true }) +
        T(p.kicker, 605, 200, { size: 30, font: 'Cormorant Garamond', weight: 700, fill: p.c2, upper: true, ls: 10, maxW: 600 });
      const t = TL(p.title, 600, 312, { size: 100, font: 'Great Vibes', weight: 400, fill: p.c3, maxW: 680 }, 0.95);
      const y = 312 + t.h;
      s += t.svg + `<g stroke="${p.c2}" stroke-width="1.2"><line x1="480" y1="${y + 46}" x2="582" y2="${y + 46}"/><line x1="618" y1="${y + 46}" x2="720" y2="${y + 46}"/></g>` + heart(600, y + 44, 10, p.c2) +
        T(p.info, 603, y + 102, { size: 30, font: 'Cormorant Garamond', weight: 600, fill: p.c2, ls: 6, maxW: 560 }) +
        T(p.subtitle, 600, y + 144, { size: 23, font: 'Cormorant Garamond', weight: 500, italic: true, fill: p.c3, maxW: 620 });
      return s;
    },
  });

  /* B30 — Lễ vinh danh / trao giải */
  add({
    id: 'B30', name: 'Lễ vinh danh – trao giải', styles: ['Sang trọng', 'Sự kiện'], topic: 'Tiệc – lễ kỷ niệm',
    use: 'Lễ trao giải, vinh danh nhân viên – học sinh xuất sắc, đêm Gala Awards, tổng kết thi đua',
    desc: 'Nền tím than với đèn sân khấu, cúp vàng trong vòng nguyệt quế, tiêu đề serif nhũ vàng và sàn sân khấu phát sáng.',
    fields: STD({ org: 'Tập đoàn Ánh Dương', kicker: 'Lễ vinh danh', title: 'GIẢI THƯỞNG\nNHÂN VIÊN XUẤT SẮC 2026', subtitle: 'Tỏa sáng giá trị – Lan tỏa cảm hứng', info: '19:00 • 22.01.2027 • Khách sạn Grand Plaza' }),
    colors: [C('c1', 'Màu nền', '#1B1035'), C('c2', 'Màu vàng', '#F5C04E'), C('c3', 'Màu ánh tím', '#8E44AD')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [mix(p.c3, p.c1, 0.35), p.c1, shade(p.c1, 0.5)], 0.5, 0.35, 0.8)}` +
        `${lin(u + 'gd', [[tint(p.c2, 0.75), 0], [p.c2, 0.5], [shade(p.c2, 0.3), 1]], 0, 1)}${radial(u + 'fl', [[p.c3, 0, 0.6], [p.c3, 1, 0]], 0.5, 0.5, 0.5)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<polygon points="150,-10 30,600 430,600" fill="#fff" opacity="0.05"/><polygon points="1050,-10 770,600 1170,600" fill="#fff" opacity="0.05"/><polygon points="600,-10 470,600 730,600" fill="#fff" opacity="0.035"/>` +
        `<ellipse cx="600" cy="610" rx="560" ry="90" fill="url(#${u}fl)"/>`;
      const R = rng(19);
      for (let i = 0; i < 22; i++) s += sparkle(40 + R() * 1120, 30 + R() * 520, 3 + R() * 8, tint(p.c2, 0.4), 0.4 + R() * 0.5);
      s += laurel(600, 112, 84, p.c2, { from: 95, to: 205, n: 6 }) +
        `<path d="M 560 52 H 640 Q 640 120 600 132 Q 560 120 560 52 Z" fill="url(#${u}gd)"/>` +
        `<path d="M 562 64 Q 532 66 536 88 Q 540 106 566 108 M 638 64 Q 668 66 664 88 Q 660 106 634 108" fill="none" stroke="${p.c2}" stroke-width="6"/>` +
        `<rect x="594" y="132" width="12" height="22" fill="${p.c2}"/><rect x="576" y="154" width="48" height="10" rx="2" fill="${p.c2}"/><rect x="566" y="164" width="68" height="12" rx="3" fill="${shade(p.c2, 0.2)}"/>` +
        star(600, 88, 13, p.c1) +
        logoSlot(p, 100, 78, 56, { color: p.c2 }) +
        T(p.org, 140, 85, { size: 16, weight: 600, fill: p.c2, anchor: 'start', upper: true, ls: 2, maxW: 380 }) +
        T(p.kicker, 600, 236, { size: 22, font: 'Montserrat', weight: 600, upper: true, ls: 10, maxW: 800 });
      const t = TL(p.title, 600, 312, { size: 62, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 920 }, 1.12);
      s += t.svg + T(p.subtitle, 600, 312 + t.h + 68, { size: 50, font: 'Great Vibes', weight: 400, maxW: 820 }) +
        T(p.info, 600, 552, { size: 15, font: 'Montserrat', weight: 600, fill: p.c2, upper: true, ls: 3, maxW: 900 });
      return s;
    },
  });

  /* B31 — Khai trương */
  add({
    id: 'B31', name: 'Khai trương hồng phát', styles: ['Năng động', 'Vui tươi'], topic: 'Doanh nghiệp – công nghệ',
    use: 'Khai trương cửa hàng, showroom, chi nhánh, nhà hàng; tuần lễ ưu đãi, mừng sinh nhật cửa hàng',
    desc: 'Tia nắng đỏ tỏa từ tâm, huy hiệu răng cưa vàng lớn ở giữa chứa toàn bộ thông tin, bóng bay và hoa giấy hai bên – rộn ràng, may mắn.',
    fields: STD({ org: 'Hệ thống siêu thị An Phát', kicker: 'Khai trương', title: 'CHI NHÁNH\nCẦU GIẤY', subtitle: 'Giảm 30% toàn bộ sản phẩm – 3 ngày đầu', info: '08:00 • Chủ nhật, 06.12.2026' }),
    colors: [C('c1', 'Màu đỏ', '#D32F2F'), C('c2', 'Màu vàng', '#FFC107'), C('c3', 'Màu nền huy hiệu', '#FFF8E1')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="${p.c1}"/>`;
      for (let i = 0; i < 48; i += 2) {
        const a1 = rad(i * 7.5), a2 = rad(i * 7.5 + 7.5);
        s += `<polygon points="600,300 ${r2(600 + 900 * Math.cos(a1))},${r2(300 + 900 * Math.sin(a1))} ${r2(600 + 900 * Math.cos(a2))},${r2(300 + 900 * Math.sin(a2))}" fill="${shade(p.c1, 0.14)}"/>`;
      }
      s += confetti(37, 90, [p.c2, '#ffffff', tint(p.c2, 0.4)], [20, 20, 1180, 580]);
      [[120, 180, 52, p.c2, 20], [215, 125, 46, '#ffffff', 0], [190, 265, 44, shade(p.c2, 0.1), 30], [80, 310, 40, '#ffffff', 40]].forEach(b => {
        s += balloon(b[0], b[1], b[2], b[3], b[4]) + balloon(1200 - b[0], b[1] + 8, b[2], b[3], -b[4]);
      });
      s += `<polygon points="${starPts(600, 300, 274, 240, 28)}" fill="${p.c2}"/><circle cx="600" cy="300" r="232" fill="${p.c3}"/>` +
        `<circle cx="600" cy="300" r="219" fill="none" stroke="${p.c1}" stroke-width="2" stroke-dasharray="3 7"/>` +
        logoSlot(p, 600, 120, 46, { color: p.c1 }) +
        T(p.org, 600, 164, { size: 15, weight: 700, fill: shade(p.c1, 0.3), upper: true, ls: 2, maxW: 330 }) +
        T(p.kicker, 600, 234, { size: 62, weight: 900, fill: p.c1, upper: true, maxW: 400 });
      const t = TL(p.title, 600, 296, { size: 42, weight: 800, fill: '#3E2723', upper: true, maxW: 380 }, 1.12);
      const ys = 296 + t.h + 42;
      s += t.svg + T(p.subtitle, 600, ys, { size: 19, weight: 600, fill: p.c1, maxW: 360 }) +
        pill(p.info, 600, ys + 16, { size: 16, fill: '#fff', bg: p.c1, maxW: 320 });
      return s;
    },
  });

  /* B32 — Ngày hội STEM / robotics */
  add({
    id: 'B32', name: 'Ngày hội STEM – robotics', styles: ['Công nghệ', 'Năng động'], topic: 'Giáo dục',
    use: 'Ngày hội STEM, cuộc thi robot, khoa học kỹ thuật, câu lạc bộ lập trình, hackathon học sinh',
    desc: 'Nền bản vẽ kỹ thuật (blueprint) với lưới mảnh, bánh răng ăn khớp, nguyên tử và đường mạch – kích thích óc sáng tạo, khám phá.',
    fields: STD({ org: 'Trường THCS Nguyễn Trãi', kicker: 'Ngày hội STEM 2026', title: 'SÁNG TẠO\nCÙNG ROBOT', subtitle: 'Khoa học – Công nghệ – Kỹ thuật – Toán học', info: '08:00 • 21.11.2026 • Nhà đa năng' }),
    colors: [C('c1', 'Màu nền blueprint', '#0A2540'), C('c2', 'Màu nét xanh', '#00D4FF'), C('c3', 'Màu nhấn', '#FFB800')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="${p.c1}"/><g stroke="${p.c2}">`;
      for (let x = 0; x <= 1200; x += 30) s += `<line x1="${x}" y1="0" x2="${x}" y2="600" stroke-opacity="${x % 150 ? 0.06 : 0.16}"/>`;
      for (let y = 0; y <= 600; y += 30) s += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke-opacity="${y % 150 ? 0.06 : 0.16}"/>`;
      s += '</g>' + gear(930, 340, 92, 14, p.c2, 3) + gear(1068, 222, 56, 10, p.c2, 2.5) + gear(1062, 455, 42, 8, p.c3, 2.5) +
        `<g fill="none" stroke="${p.c3}" stroke-width="2.5">` + [0, 60, 120].map(a => `<ellipse cx="920" cy="120" rx="62" ry="20" transform="rotate(${a} 920 120)"/>`).join('') + `</g><circle cx="920" cy="120" r="8" fill="${p.c3}"/>` +
        `<g stroke="${p.c2}" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"><line x1="838" y1="470" x2="1022" y2="470"/></g>` +
        T('Ø 184', 930, 492, { size: 13, font: 'Montserrat', weight: 600, fill: p.c2, noScale: true, attrs: 'data-deco="1" fill-opacity="0.7"' });
      const R = rng(4);
      for (let i = 0; i < 6; i++) {
        const y = 470 + i * 22, x2 = 120 + R() * 220;
        s += `<polyline points="0,${y} ${r2(x2)},${y} ${r2(x2 + 20)},${y - 20}" fill="none" stroke="${p.c2}" stroke-opacity="0.35" stroke-width="2"/><circle cx="${r2(x2 + 24)}" cy="${y - 24}" r="4" fill="none" stroke="${p.c2}" stroke-opacity="0.5" stroke-width="2"/>`;
      }
      s += logoSlot(p, 126, 88, 60) +
        T(p.org, 170, 96, { size: 18, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 520, attrs: 'fill-opacity="0.9"' }) +
        T(p.kicker, 92, 200, { size: 24, weight: 800, fill: p.c3, anchor: 'start', upper: true, ls: 4, maxW: 600 });
      const t = TL(p.title, 88, 292, { size: 82, font: 'Montserrat', weight: 900, anchor: 'start', maxW: 640 }, 1.05);
      s += t.svg + T(p.subtitle, 92, 292 + t.h + 56, { size: 23, weight: 500, fill: p.c2, anchor: 'start', maxW: 620 }) +
        T(p.info, 400, 545, { size: 18, weight: 600, anchor: 'start', maxW: 420, attrs: 'fill-opacity="0.9"' });
      return s;
    },
  });

  /* B33 — Vu Lan báo hiếu */
  add({
    id: 'B33', name: 'Mùa Vu Lan báo hiếu', styles: ['Truyền thống', 'Lãng mạn'], topic: 'Lễ hội – văn hóa',
    use: 'Lễ Vu Lan, Ngày của Mẹ – Cha, chương trình tri ân cha mẹ, đêm thả hoa đăng',
    desc: 'Nền kem ấm, cụm hoa hồng góc trái, vầng sáng tròn sau chữ và những đóa hoa đăng sen trôi trên mặt nước – xúc động, thiêng liêng.',
    fields: STD({ org: 'Đoàn Thanh niên Phường Hòa An', kicker: 'Mùa Vu Lan báo hiếu', title: 'ƠN NGHĨA\nSINH THÀNH', subtitle: 'Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn chảy ra', info: 'Rằm tháng Bảy • 19:00 • Hồ Hòa An' }),
    colors: [C('c1', 'Màu hoa hồng – chữ', '#8B1E3F'), C('c2', 'Màu nền kem', '#F4E3C3'), C('c3', 'Màu vàng', '#C9A227')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [tint(p.c2, 0.5), p.c2], 0, 1)}${lin(u + 'wt', [[tint(p.c3, 0.6), 0, 0], [p.c3, 1, 0.45]], 0, 1)}${radial(u + 'gl', [['#FFE082', 0, 0.9], ['#FFE082', 1, 0]], 0.5, 0.5, 0.5)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/><circle cx="640" cy="250" r="235" fill="#fff" opacity="0.4"/>`;
      [[40, 70, -30, 120], [250, 40, 20, 100], [20, 320, -70, 110], [300, 190, 40, 80]].forEach((l, i) => { s += leaf(l[0], l[1], l[3], l[2], i % 2 ? '#7CB342' : '#558B2F'); });
      s += rose(110, 120, 82, p.c1) + rose(250, 85, 52, tint(p.c1, 0.55)) + rose(70, 270, 52, p.c1) + rose(220, 210, 40, tint(p.c1, 0.3));
      s += `<rect x="0" y="470" width="1200" height="130" fill="url(#${u}wt)"/><g stroke="#fff" stroke-opacity="0.6" stroke-width="2" fill="none">` +
        [495, 530, 565].map((y, i) => `<path d="M ${40 + i * 60} ${y} q 30 -8 60 0 t 60 0 M ${560 + i * 40} ${y + 8} q 30 -8 60 0 t 60 0 M ${960 - i * 50} ${y - 6} q 30 -8 60 0"/>`).join('') + '</g>';
      [[200, 530, 1], [440, 555, 0.75], [800, 548, 0.85], [1040, 525, 1.05]].forEach(l => {
        const [x, y, k] = l, pet = (rot, f, len) => `<path d="M 0 0 C ${r2(-len * 0.45)} ${r2(-len * 0.35)} ${r2(-len * 0.3)} ${r2(-len * 0.85)} 0 ${r2(-len)} C ${r2(len * 0.3)} ${r2(-len * 0.85)} ${r2(len * 0.45)} ${r2(-len * 0.35)} 0 0 Z" fill="${f}" transform="translate(${x} ${y}) rotate(${rot})"/>`;
        s += `<circle cx="${x}" cy="${r2(y - 40 * k)}" r="${r2(60 * k)}" fill="url(#${u}gl)"/>` +
          pet(-70, '#F8BBD0', 46 * k) + pet(70, '#F8BBD0', 46 * k) + pet(-35, '#F48FB1', 54 * k) + pet(35, '#F48FB1', 54 * k) +
          `<ellipse cx="${x}" cy="${r2(y - 48 * k)}" rx="${r2(6 * k)}" ry="${r2(12 * k)}" fill="#FFB300"/><ellipse cx="${x}" cy="${r2(y - 46 * k)}" rx="${r2(3 * k)}" ry="${r2(7 * k)}" fill="#FFF8E1"/>` +
          pet(0, '#EC407A', 40 * k);
      });
      s += logoSlot(p, 640, 70, 50, { color: p.c1 }) +
        T(p.org, 640, 120, { size: 16, weight: 600, fill: p.c1, upper: true, ls: 2, maxW: 640 }) +
        T(p.kicker, 640, 172, { size: 22, weight: 700, fill: shade(p.c3, 0.25), upper: true, ls: 4, maxW: 680 });
      const t = TL(p.title, 640, 262, { size: 74, font: 'Playfair Display', weight: 900, fill: p.c1, maxW: 720 }, 1.1);
      const ys = 262 + t.h + 62;
      s += t.svg + T(p.subtitle, 640, ys, { size: 32, font: 'Dancing Script', weight: 700, fill: shade(p.c1, 0.15), maxW: 760 }) +
        T(p.info, 640, Math.min(ys + 44, 458), { size: 18, weight: 600, fill: '#5D4037', maxW: 700 });
      return s;
    },
  });

  /* B34 — Halloween / hóa trang */
  add({
    id: 'B34', name: 'Đêm hội hóa trang Halloween', styles: ['Năng động', 'Vui tươi'], topic: 'Lễ hội – văn hóa',
    use: 'Halloween, lễ hội hóa trang ở trường – trung tâm tiếng Anh, tiệc theo chủ đề, đêm kể chuyện ma',
    desc: 'Đêm tím với trăng cam khổng lồ, đàn dơi, mạng nhện ở góc và bí ngô khắc mặt dưới chân – rùng rợn mà dễ thương.',
    fields: STD({ org: 'Trung tâm Anh ngữ Kidz English', kicker: 'Halloween Party', title: 'ĐÊM HỘI\nHÓA TRANG', subtitle: 'Trick or Treat – Hóa trang nhận quà', info: '18:00 • 31.10.2026 • Sân trường' }),
    colors: [C('c1', 'Màu nền đêm', '#1A1033'), C('c2', 'Màu cam bí ngô', '#FF7A00'), C('c3', 'Màu tím', '#7B2CBF')],
    render(p, u) {
      const bat = (x, y, k) => `<path d="M 0 0 C -10 -12 -30 -14 -44 -4 C -36 -4 -32 2 -34 8 C -26 2 -18 4 -14 10 C -10 4 -4 4 0 8 C 4 4 10 4 14 10 C 18 4 26 2 34 8 C 32 2 36 -4 44 -4 C 30 -14 10 -12 0 0 Z M -4 -2 L -6 -10 L -1 -4 L 1 -4 L 6 -10 L 4 -2 Z" fill="#0B0616" transform="translate(${x} ${y}) scale(${k})"/>`;
      const pumpkin = (x, y, r) => `<rect x="${r2(x - r * 0.08)}" y="${r2(y - r * 0.95)}" width="${r2(r * 0.16)}" height="${r2(r * 0.3)}" rx="3" fill="#33691E"/>` +
        [-0.36, 0.36, 0].map(o => `<ellipse cx="${r2(x + o * r)}" cy="${y}" rx="${r2(r * 0.58)}" ry="${r2(r * 0.78)}" fill="${o ? shade(p.c2, 0.12) : p.c2}"/>`).join('') +
        `<polygon points="${r2(x - r * 0.42)},${r2(y - r * 0.1)} ${r2(x - r * 0.18)},${r2(y - r * 0.1)} ${r2(x - r * 0.3)},${r2(y - r * 0.35)}" fill="#FFE082"/>` +
        `<polygon points="${r2(x + r * 0.18)},${r2(y - r * 0.1)} ${r2(x + r * 0.42)},${r2(y - r * 0.1)} ${r2(x + r * 0.3)},${r2(y - r * 0.35)}" fill="#FFE082"/>` +
        `<path d="M ${r2(x - r * 0.45)} ${r2(y + r * 0.15)} L ${r2(x - r * 0.3)} ${r2(y + r * 0.32)} L ${r2(x - r * 0.15)} ${r2(y + r * 0.18)} L ${x} ${r2(y + r * 0.35)} L ${r2(x + r * 0.15)} ${r2(y + r * 0.18)} L ${r2(x + r * 0.3)} ${r2(y + r * 0.32)} L ${r2(x + r * 0.45)} ${r2(y + r * 0.15)} Q ${x} ${r2(y + r * 0.6)} ${r2(x - r * 0.45)} ${r2(y + r * 0.15)} Z" fill="#FFE082"/>`;
      let s = `<defs>${lin(u + 'bg', [mix(p.c3, p.c1, 0.35), p.c1], 0, 1)}${radial(u + 'mg', [['#FFB74D', 0, 0.55], ['#FFB74D', 1, 0]], 0.5, 0.5, 0.5)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/><circle cx="930" cy="200" r="250" fill="url(#${u}mg)"/><circle cx="930" cy="200" r="122" fill="#FFD27F"/>` +
        `<circle cx="895" cy="170" r="18" fill="#F5B94F" opacity="0.6"/><circle cx="965" cy="235" r="26" fill="#F5B94F" opacity="0.5"/>`;
      let web = '';
      for (let a = 90; a <= 180; a += 15) web += `<line x1="1200" y1="0" x2="${r2(1200 + 280 * Math.cos(rad(a)))}" y2="${r2(280 * Math.sin(rad(a)))}"/>`;
      [70, 130, 190, 250].forEach(r => {
        const pts = []; for (let a = 90; a <= 180; a += 15) pts.push(`${r2(1200 + r * Math.cos(rad(a)))},${r2(r * Math.sin(rad(a)))}`);
        web += `<polyline points="${pts.join(' ')}"/>`;
      });
      s += `<g stroke="#fff" stroke-opacity="0.35" stroke-width="1.3" fill="none">${web}</g>` +
        bat(840, 120, 0.9) + bat(1010, 300, 0.6) + bat(770, 260, 0.55) + bat(1080, 120, 0.7) +
        `<path d="M 0 560 Q 300 520 600 556 T 1200 540 L 1200 600 L 0 600 Z" fill="#0B0616"/>` +
        pumpkin(930, 540, 72) + pumpkin(1072, 556, 52) + pumpkin(810, 566, 40);
      const R = rng(66);
      for (let i = 0; i < 40; i++) s += `<circle cx="${r2(R() * 700)}" cy="${r2(R() * 500)}" r="${r2(0.6 + R() * 1.4)}" fill="#fff" opacity="${r2(0.3 + R() * 0.6)}"/>`;
      s += logoSlot(p, 126, 88, 60, { color: p.c2 }) +
        T(p.org, 170, 96, { size: 18, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 480 }) +
        T(p.kicker, 92, 196, { size: 28, font: 'Oswald', weight: 600, fill: p.c2, anchor: 'start', upper: true, ls: 8, maxW: 560 });
      const t = TL(p.title, 88, 300, { size: 102, font: 'Oswald', weight: 700, fill: p.c2, anchor: 'start', upper: true, maxW: 600 }, 1.0);
      s += t.svg + T(p.subtitle, 92, 300 + t.h + 58, { size: 24, weight: 500, anchor: 'start', maxW: 600, attrs: 'fill-opacity="0.92"' }) +
        T(p.info, 92, 520, { size: 18, weight: 600, anchor: 'start', maxW: 560, attrs: 'fill-opacity="0.85"' });
      return s;
    },
  });

  /* B35 — Lễ hội biển / mùa hè */
  add({
    id: 'B35', name: 'Lễ hội biển mùa hè', styles: ['Vui tươi', 'Thiên nhiên'], topic: 'Lễ hội – văn hóa',
    use: 'Festival biển, du lịch hè, team building bãi biển, khai trương resort, trại hè',
    desc: 'Bầu trời trong, mặt trời lặn nửa trên đường chân trời, sóng biển, bãi cát và cây dừa nghiêng – tươi mát, đậm chất mùa hè.',
    fields: STD({ org: 'Sở Văn hóa – Thể thao và Du lịch', kicker: 'Lễ hội biển 2027', title: 'SẮC MÀU\nBIỂN XANH', subtitle: 'Vui hè rực rỡ – Kết nối yêu thương', info: '24 – 26/04/2027 • Quảng trường biển' }),
    colors: [C('c1', 'Màu biển', '#0096C7'), C('c2', 'Màu nắng – cát', '#FFD166'), C('c3', 'Màu san hô', '#EF476F')],
    render(p, u) {
      let s = `<defs>${lin(u + 'sky', ['#BDE9FF', '#FFF6E0'], 0, 1)}${lin(u + 'sea', [p.c1, shade(p.c1, 0.3)], 0, 1)}<clipPath id="${u}hz"><rect width="1200" height="382"/></clipPath>` +
        `${radial(u + 'sg', [[p.c2, 0, 0.6], [p.c2, 1, 0]], 0.5, 0.5, 0.5)}</defs><rect width="1200" height="600" fill="url(#${u}sky)"/>` +
        `<g clip-path="url(#${u}hz)"><circle cx="930" cy="380" r="230" fill="url(#${u}sg)"/><circle cx="930" cy="380" r="118" fill="${p.c2}"/></g>` +
        `<rect y="380" width="1200" height="110" fill="url(#${u}sea)"/><g stroke="#fff" stroke-opacity="0.55" stroke-width="2.5" fill="none" stroke-linecap="round">` +
        [400, 426, 454].map((y, i) => `<path d="M ${20 + i * 70} ${y} q 25 -10 50 0 t 50 0 M ${520 + i * 50} ${y} q 25 -10 50 0 t 50 0 t 50 0 M ${980 - i * 40} ${y} q 25 -10 50 0 t 50 0"/>`).join('') + '</g>' +
        `<path d="M 0 472 Q 300 452 600 476 T 1200 466 L 1200 600 L 0 600 Z" fill="${tint(p.c2, 0.35)}"/><path d="M 0 520 Q 400 500 800 525 T 1200 515 L 1200 600 L 0 600 Z" fill="${tint(p.c2, 0.15)}"/>` +
        `<path d="M 120 600 Q 140 450 232 302" fill="none" stroke="#8D6E63" stroke-width="22" stroke-linecap="round"/>`;
      for (let i = 0; i < 7; i++) s += `<line x1="${r2(122 + i * 15)}" y1="${r2(585 - i * 40)}" x2="${r2(146 + i * 15)}" y2="${r2(580 - i * 40)}" stroke="#6D4C41" stroke-width="3"/>`;
      [-165, -135, -100, -65, -30, 5, 35].forEach((a, i) => { s += leaf(232, 302, 150 - Math.abs(a + 65) * 0.3, a, i % 2 ? '#2E7D32' : '#43A047'); });
      s += `<circle cx="222" cy="318" r="11" fill="#6D4C41"/><circle cx="244" cy="322" r="10" fill="#5D4037"/>` +
        `<g fill="none" stroke="#37474F" stroke-width="2.5" stroke-linecap="round"><path d="M 700 120 q 8 -8 16 0 q 8 -8 16 0"/><path d="M 760 92 q 7 -7 14 0 q 7 -7 14 0"/><path d="M 820 140 q 6 -6 12 0 q 6 -6 12 0"/></g>` +
        logoSlot(p, 1110, 70, 54, { color: shade(p.c1, 0.3) }) +
        T(p.org, 1070, 77, { size: 16, weight: 700, fill: shade(p.c1, 0.4), anchor: 'end', upper: true, ls: 1, maxW: 520 }) +
        T(p.kicker, 640, 130, { size: 24, weight: 800, fill: p.c3, upper: true, ls: 4, maxW: 640, attrs: halo(6) });
      const t = TL(p.title, 640, 215, { size: 80, weight: 900, fill: shade(p.c1, 0.35), maxW: 680, attrs: halo(9) }, 1.05);
      s += t.svg + T(p.subtitle, 640, 215 + t.h + 58, { size: 38, font: 'Dancing Script', weight: 700, fill: shade(p.c3, 0.1), maxW: 680, attrs: halo(6) }) +
        pill(p.info, 640, 518, { size: 18, fill: '#fff', bg: p.c1, maxW: 640 });
      return s;
    },
  });

  /* B36 — Báo cáo thường niên / tài chính */
  add({
    id: 'B36', name: 'Đại hội cổ đông – tăng trưởng', styles: ['Hiện đại', 'Trang trọng'], topic: 'Doanh nghiệp – công nghệ',
    use: 'Đại hội đồng cổ đông, báo cáo thường niên, hội nghị ngân hàng – tài chính, tổng kết kinh doanh',
    desc: 'Nền navy với biểu đồ cột tăng dần, đường xu hướng vàng có mũi tên đi lên và con số tăng trưởng nổi bật – chuyên nghiệp, tin cậy.',
    fields: [F('big', 'Con số nổi bật', '+25%')].concat(STD({ org: 'Công ty Cổ phần Đầu tư An Phát', kicker: 'Đại hội đồng cổ đông thường niên 2027', title: 'BỨT PHÁ\nTĂNG TRƯỞNG', subtitle: 'Minh bạch – Hiệu quả – Bền vững', info: 'Hà Nội, ngày 25 tháng 4 năm 2027' })),
    colors: [C('c1', 'Màu navy', '#0B2545'), C('c2', 'Màu xanh ngọc', '#13A89E'), C('c3', 'Màu vàng', '#E3B23C')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [tint(p.c1, 0.1), shade(p.c1, 0.45)])}${lin(u + 'bar', [tint(p.c2, 0.2), shade(p.c2, 0.4)], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/><g stroke="#fff" stroke-opacity="0.08">`;
      for (let y = 220; y <= 520; y += 60) s += `<line x1="650" y1="${y}" x2="1160" y2="${y}"/>`;
      s += '</g>';
      const H = [70, 115, 95, 160, 205, 262], pts = [];
      H.forEach((h, i) => {
        const x = 680 + i * 76;
        s += `<rect x="${x}" y="${520 - h}" width="46" height="${h}" rx="4" fill="url(#${u}bar)"/>`;
        pts.push([x + 23, 520 - h - 34]);
      });
      s += `<polyline points="${pts.map(q => q.join(',')).join(' ')}" fill="none" stroke="${p.c3}" stroke-width="4" stroke-linejoin="round"/>` +
        pts.map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="6" fill="${p.c1}" stroke="${p.c3}" stroke-width="3"/>`).join('') +
        `<polygon points="1112,214 1140,196 1132,228" fill="${p.c3}"/><line x1="650" y1="520" x2="1160" y2="520" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>` +
        T(p.big, 1150, 170, { size: 88, font: 'Montserrat', weight: 900, fill: p.c3, anchor: 'end', maxW: 330 }) +
        logoSlot(p, 126, 88, 60, { color: p.c3 }) +
        T(p.org, 170, 96, { size: 17, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 560 }) +
        T(p.kicker, 92, 210, { size: 19, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 2, maxW: 520 });
      const t = TL(p.title, 88, 296, { size: 70, weight: 900, anchor: 'start', maxW: 520 }, 1.08);
      s += t.svg + T(p.subtitle, 92, 296 + t.h + 54, { size: 22, weight: 500, fill: tint(p.c2, 0.3), anchor: 'start', maxW: 520 }) +
        `<line x1="92" y1="512" x2="150" y2="512" stroke="${p.c3}" stroke-width="3"/>` +
        T(p.info, 92, 546, { size: 18, weight: 500, anchor: 'start', maxW: 520, attrs: 'fill-opacity="0.85"' });
      return s;
    },
  });

  /* B37 — Ngày hội gia đình */
  add({
    id: 'B37', name: 'Ngày hội gia đình', styles: ['Vui tươi', 'Lãng mạn'], topic: 'Cưới hỏi – gia đình',
    use: 'Family Day công ty, Ngày Gia đình Việt Nam 28/6, hội trại gia đình, ngày hội phụ huynh',
    desc: 'Đồi cỏ xanh, những ngôi nhà nhỏ nhiều màu, gia đình nắm tay nhau dưới mặt trời – ấm áp, thân thiện.',
    fields: STD({ org: 'Công đoàn Công ty CP An Phát', kicker: 'Family Day 2026', title: 'GIA ĐÌNH\nLÀ ĐIỀU TUYỆT VỜI NHẤT', subtitle: 'Gắn kết – Sẻ chia – Yêu thương', info: '07:30 • 28.06.2026 • Khu sinh thái Đồng Mô' }),
    colors: [C('c1', 'Màu đào', '#FFB4A2'), C('c2', 'Màu chữ', '#6D597A'), C('c3', 'Màu cỏ', '#80B918')],
    render(p) {
      const house = (x, y, w, c) => `<rect x="${x}" y="${y}" width="${w}" height="${r2(w * 0.8)}" fill="${c}"/><polygon points="${x - 8},${y} ${r2(x + w / 2)},${r2(y - w * 0.55)} ${x + w + 8},${y}" fill="${shade(c, 0.25)}"/>` +
        `<rect x="${r2(x + w * 0.38)}" y="${r2(y + w * 0.4)}" width="${r2(w * 0.24)}" height="${r2(w * 0.4)}" fill="#fff" opacity="0.8"/><rect x="${r2(x + w * 0.1)}" y="${r2(y + w * 0.15)}" width="${r2(w * 0.18)}" height="${r2(w * 0.18)}" fill="#fff" opacity="0.8"/>`;
      let s = `<rect width="1200" height="600" fill="#FFF7F0"/><polygon points="${starPts(1080, 105, 92, 70, 14)}" fill="#FFD166" opacity="0.45"/><circle cx="1080" cy="105" r="56" fill="#FFD166"/>`;
      [[120, 150, 1.6], [880, 95, 1.2], [420, 70, 1]].forEach(c => { s += `<path d="M 0 0 c 0 -14 18 -20 26 -10 c 4 -14 26 -16 32 0 c 12 -6 24 4 18 14 Z" fill="${tint(p.c1, 0.45)}" transform="translate(${c[0]} ${c[1]}) scale(${c[2]})"/>`; });
      s += `<path d="M 0 470 Q 300 410 600 460 T 1200 440 L 1200 600 L 0 600 Z" fill="${tint(p.c3, 0.45)}"/>` +
        house(70, 412, 70, '#E07A5F') + house(165, 402, 60, '#81B29A') + house(1010, 398, 64, '#F2CC8F') + house(1100, 408, 72, '#E07A5F') +
        `<path d="M 0 525 Q 400 485 800 528 T 1200 512 L 1200 600 L 0 600 Z" fill="${p.c3}"/>` +
        `<path d="M 830 520 Q 900 532 990 520" fill="none" stroke="${p.c2}" stroke-width="3"/>` +
        person(830, 505, 38, p.c2) + person(870, 520, 22, '#E07A5F') + person(950, 505, 40, shade(p.c1, 0.35)) + person(992, 522, 20, '#3D405B') +
        heart(910, 438, 16, '#E63946', 0.85);
      const R = rng(29);
      for (let i = 0; i < 10; i++) s += heart(380 + R() * 480, 40 + R() * 80, 5 + R() * 6, p.c1, 0.6);
      s += logoSlot(p, 100, 72, 54, { color: p.c2 }) +
        T(p.org, 140, 79, { size: 16, weight: 700, fill: p.c2, anchor: 'start', upper: true, ls: 1, maxW: 420 }) +
        T(p.kicker, 600, 160, { size: 24, weight: 800, fill: shade(p.c1, 0.35), upper: true, ls: 4, maxW: 700 });
      const t = TL(p.title, 600, 248, { size: 74, weight: 900, fill: p.c2, maxW: 760 }, 1.08);
      const ys = 248 + t.h + 62;
      s += t.svg + T(p.subtitle, 600, ys, { size: 40, font: 'Dancing Script', weight: 700, fill: shade(p.c1, 0.3), maxW: 700 }) +
        pill(p.info, 600, ys + 20, { size: 17, fill: '#fff', bg: p.c2, maxW: 600 });
      return s;
    },
  });

  /* B38 — Đêm thời trang */
  add({
    id: 'B38', name: 'Đêm hội thời trang – runway', styles: ['Sang trọng', 'Tối giản'], topic: 'Âm nhạc – sáng tạo',
    use: 'Fashion show, cuộc thi người đẹp – duyên dáng, ra mắt bộ sưu tập, gala nghệ thuật',
    desc: 'Nền đen tuyệt đối, đèn rọi trên cao và sàn catwalk phối cảnh với dải đèn champagne – tiêu đề serif nghiêng thanh lịch.',
    fields: STD({ org: 'Học viện Thời trang Ánh Dương', kicker: 'Fashion Show', title: 'ĐÊM HỘI\nTHỜI TRANG', subtitle: 'Bộ sưu tập Xuân – Hè 2027', info: '20:00 • 12.03.2027 • Nhà hát Lớn' }),
    colors: [C('c1', 'Màu nền', '#0D0D0D'), C('c2', 'Màu chữ', '#FFFFFF'), C('c3', 'Màu champagne', '#C8A96B')],
    render(p, u) {
      let s = `<defs>${radial(u + 'sp', [['#fff', 0, 0.22], ['#fff', 1, 0]], 0.5, 0.5, 0.5)}${lin(u + 'rw', ['#2b2b2b', '#111111'], 0, 1)}</defs><rect width="1200" height="600" fill="${p.c1}"/>` +
        `<circle cx="300" cy="0" r="380" fill="url(#${u}sp)"/><circle cx="900" cy="0" r="380" fill="url(#${u}sp)"/>` +
        `<polygon points="300,0 180,600 420,600" fill="#fff" opacity="0.035"/><polygon points="900,0 780,600 1020,600" fill="#fff" opacity="0.035"/>` +
        `<polygon points="560,430 640,430 940,600 260,600" fill="url(#${u}rw)"/>` +
        `<line x1="560" y1="430" x2="260" y2="600" stroke="${p.c3}" stroke-width="1.5"/><line x1="640" y1="430" x2="940" y2="600" stroke="${p.c3}" stroke-width="1.5"/>` +
        `<line x1="600" y1="432" x2="600" y2="600" stroke="${p.c3}" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="6 8"/>`;
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        [[560, 260], [640, 940]].forEach(e => { s += `<circle cx="${r2(e[0] + (e[1] - e[0]) * t)}" cy="${r2(430 + 170 * t)}" r="${r2(2 + t * 3)}" fill="${p.c3}"/>`; });
      }
      s += `<g stroke="${p.c3}" stroke-width="1"><line x1="80" y1="80" x2="80" y2="520"/><line x1="1120" y1="80" x2="1120" y2="520"/><line x1="70" y1="80" x2="90" y2="80"/><line x1="1110" y1="520" x2="1130" y2="520"/></g>` +
        logoSlot(p, 600, 56, 46, { color: p.c3 }) +
        T(p.org, 600, 104, { size: 14, font: 'Montserrat', weight: 500, fill: p.c3, upper: true, ls: 6, maxW: 800 }) +
        T(p.kicker, 608, 162, { size: 20, font: 'Montserrat', weight: 600, fill: p.c3, upper: true, ls: 16, maxW: 800 });
      const t = TL(p.title, 600, 252, { size: 82, font: 'Playfair Display', weight: 700, italic: true, fill: p.c2, maxW: 860 }, 1.0);
      const ys = 252 + t.h + 52;
      s += t.svg + T(p.subtitle, 604, ys, { size: 17, font: 'Montserrat', weight: 500, fill: p.c2, upper: true, ls: 8, maxW: 760, attrs: 'fill-opacity="0.85"' }) +
        T(p.info, 600, Math.min(ys + 36, 416), { size: 15, font: 'Montserrat', weight: 600, fill: p.c3, upper: true, ls: 3, maxW: 760 });
      return s;
    },
  });

  /* B39 — Hội xuân hoa đào */
  add({
    id: 'B39', name: 'Hội xuân hoa đào pastel', styles: ['Truyền thống', 'Lãng mạn'], topic: 'Lễ hội – văn hóa',
    use: 'Hội xuân, gặp mặt đầu năm, Tết Nguyên đán phong cách hiện đại, chợ hoa xuân, lễ khai bút',
    desc: 'Tông hồng phấn nhẹ nhàng, cành đào chéo hai góc, cánh hoa bay lả tả và con dấu đỏ chữ Xuân – Tết hiện đại, tinh tế.',
    fields: STD({ org: 'Công ty TNHH Đất Việt', kicker: 'Hội xuân 2027', title: 'XUÂN SUM VẦY', subtitle: 'An khang thịnh vượng – Vạn sự như ý', info: 'Mùng 8 Tết • 09:00 • Hội trường tầng 5' }),
    colors: [C('c1', 'Màu hoa đào', '#F7A8B8'), C('c2', 'Màu chữ đỏ', '#B23A48'), C('c3', 'Màu nền', '#FFF5F7')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c3, tint(p.c1, 0.55)])}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      let br = `<g fill="none" stroke="#6D4C41" stroke-linecap="round"><path d="M -20 60 C 120 80 200 40 300 110 C 360 150 380 140 430 130" stroke-width="9"/>` +
        `<path d="M 150 70 C 170 120 160 160 190 200" stroke-width="5"/><path d="M 300 110 C 290 160 320 190 300 230" stroke-width="4"/><path d="M 80 65 C 90 30 120 20 140 0" stroke-width="4"/></g>`;
      [[60, 62, 18], [140, 72, 22], [190, 200, 15], [240, 82, 19], [300, 110, 22], [300, 230, 14], [362, 146, 16], [430, 130, 18], [166, 140, 13], [122, 22, 14], [318, 178, 12]].forEach((f, i) => {
        br += flower(f[0], f[1], f[2], i % 3 ? p.c1 : tint(p.c1, 0.35), shade(p.c2, 0.1), { n: 5, rot: i * 13, w: 0.5 });
      });
      s += `<g transform="scale(0.95)">${br}</g><g transform="translate(1200 600) rotate(180) scale(0.95)">${br}</g>`;
      const R = rng(52);
      for (let i = 0; i < 34; i++) {
        const x = R() * 1200, y = R() * 600;
        s += `<ellipse cx="${r2(x)}" cy="${r2(y)}" rx="${r2(4 + R() * 4)}" ry="${r2(2.5 + R() * 2)}" fill="${p.c1}" opacity="${r2(0.4 + R() * 0.5)}" transform="rotate(${r2(R() * 180)} ${r2(x)} ${r2(y)})"/>`;
      }
      s += `<g transform="rotate(-6 1000 300)"><rect x="958" y="258" width="84" height="84" rx="10" fill="${p.c2}"/><rect x="964" y="264" width="72" height="72" rx="6" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="1.5"/>` +
        T('Xuân', 1000, 312, { size: 36, font: 'Dancing Script', weight: 700, fill: '#fff', noScale: true, attrs: 'data-deco="1"' }) + '</g>' +
        logoSlot(p, 600, 62, 52, { color: p.c2 }) +
        T(p.org, 600, 116, { size: 17, weight: 600, fill: p.c2, upper: true, ls: 2, maxW: 640 }) +
        T(p.kicker, 600, 182, { size: 24, weight: 700, fill: p.c2, upper: true, ls: 6, maxW: 640 });
      const t = TL(p.title, 600, 282, { size: 92, font: 'Playfair Display', weight: 900, fill: p.c2, maxW: 640 }, 1.05);
      s += t.svg + T(p.subtitle, 600, 282 + t.h + 70, { size: 44, font: 'Dancing Script', weight: 700, fill: shade(p.c1, 0.4), maxW: 680 }) +
        T(p.info, 600, 515, { size: 19, weight: 600, fill: p.c2, maxW: 560 });
      return s;
    },
  });

  /* B40 — Hội nghị nông nghiệp / mùa vàng */
  add({
    id: 'B40', name: 'Mùa vàng – ruộng bậc thang', styles: ['Thiên nhiên', 'Truyền thống'], topic: 'Hội nghị – hội thảo',
    use: 'Hội nghị nông nghiệp, lễ hội mùa vàng, hội chợ nông sản, tổng kết vụ mùa, du lịch Tây Bắc',
    desc: 'Ruộng bậc thang xanh – vàng uốn lượn nhiều tầng, mặt trời vàng và bông lúa trĩu hạt ở góc – mộc mạc, no ấm, đậm hồn quê.',
    fields: STD({ org: 'Sở Nông nghiệp và Môi trường', kicker: 'Hội nghị nông nghiệp 2026', title: 'MÙA VÀNG\nBỘI THU', subtitle: 'Nông nghiệp xanh – Nông dân giàu – Nông thôn đẹp', info: 'Ngày 10 tháng 12 năm 2026' }),
    colors: [C('c1', 'Màu xanh lúa', '#2E7D32'), C('c2', 'Màu vàng lúa', '#F2B705'), C('c3', 'Màu trời', '#FFF8E1')],
    render(p, u) {
      let s = `<defs>${lin(u + 'sky', [p.c3, tint(p.c2, 0.6)], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}sky)"/>` +
        `<polygon points="${starPts(1010, 150, 112, 86, 18)}" fill="${p.c2}" opacity="0.4"/><circle cx="1010" cy="150" r="70" fill="${p.c2}"/>`;
      const cols = [tint(p.c1, 0.5), mix(p.c1, p.c2, 0.6), tint(p.c1, 0.28), mix(p.c1, p.c2, 0.4), p.c1, mix(p.c1, p.c2, 0.7), shade(p.c1, 0.15)];
      cols.forEach((c, i) => {
        const y = 400 + i * 30;
        s += `<path d="M 0 ${y} Q 300 ${y - 34} 600 ${y + 8} T 1200 ${y - 12} L 1200 600 L 0 600 Z" fill="${c}"/>` +
          `<path d="M 0 ${y} Q 300 ${y - 34} 600 ${y + 8} T 1200 ${y - 12}" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="2"/>`;
      });
      [[60, 600, 110, 445], [115, 600, 185, 462], [28, 600, 38, 480]].forEach((st, k) => {
        const [x0, y0, x2, y2] = st, x1 = (x0 + x2) / 2 - 20, y1 = (y0 + y2) / 2;
        s += `<path d="M ${x0} ${y0} Q ${x1} ${y1} ${x2} ${y2}" fill="none" stroke="${shade(p.c1, 0.2)}" stroke-width="3"/>`;
        for (let i = 0; i < 9; i++) {
          const t = 0.45 + i * 0.06, bx = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t * t * x2, by = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
          s += `<ellipse cx="${r2(bx + (i % 2 ? 7 : -7))}" cy="${r2(by)}" rx="10" ry="4.5" fill="${p.c2}" transform="rotate(${i % 2 ? -50 : -130} ${r2(bx + (i % 2 ? 7 : -7))} ${r2(by)})"/>`;
        }
      });
      s += logoSlot(p, 126, 80, 60, { color: p.c1 }) +
        T(p.org, 170, 88, { size: 17, weight: 700, fill: shade(p.c1, 0.35), anchor: 'start', upper: true, ls: 1, maxW: 560 }) +
        T(p.kicker, 92, 172, { size: 22, weight: 800, fill: p.c1, anchor: 'start', upper: true, ls: 4, maxW: 620 });
      const t = TL(p.title, 88, 250, { size: 72, font: 'Lora', weight: 700, fill: shade(p.c1, 0.35), anchor: 'start', maxW: 620 }, 1.08);
      const ys = 250 + t.h + 50;
      s += t.svg + T(p.subtitle, 92, ys, { size: 21, weight: 600, fill: '#5D4037', anchor: 'start', maxW: 620 }) +
        pill(p.info, 90, ys + 18, { size: 16, fill: '#fff', bg: p.c1, anchor: 'start', maxW: 520 });
      return s;
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
