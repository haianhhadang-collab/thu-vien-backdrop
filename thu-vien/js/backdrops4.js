/* =========================================================================
 * backdrops4.js — 12 mẫu backdrop bổ sung (B41 – B52), khung 1200 × 600
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, TL, star, starPts, laurel, flower, leaf, mix, shade, tint, textW, fitSize, rng, r2, rad, arcPath, logoSlot, drum } = root.BL;
  const { F, C, STD, lin, radial, sparkle, confetti, heart } = root.BL.bd;
  const { pill, person } = root.BL.bd2;
  const add = t => root.BL.templates.push(Object.assign({ type: 'backdrop', w: 1200, h: 600 }, t));
  const halo = (w, c) => `stroke="${c || '#fff'}" stroke-width="${w}" paint-order="stroke" stroke-linejoin="round"`;
  const deco = 'data-deco="1"';

  /* B41 — Hội nghị tổng kết, sóng lụa xanh – vàng */
  add({
    id: 'B41', name: 'Tổng kết năm – sóng lụa xanh vàng', styles: ['Trang trọng', 'Hiện đại'], topic: 'Hội nghị – hội thảo',
    use: 'Hội nghị tổng kết năm, hội nghị người lao động, sơ kết 6 tháng, hội nghị triển khai kế hoạch',
    desc: 'Nền trắng sáng sạch sẽ với dải sóng lụa xanh dương viền chỉ vàng ở chân và góc phải – kiểu backdrop doanh nghiệp được dùng nhiều nhất hiện nay.',
    fields: STD({ org: 'Công ty Cổ phần Đầu tư An Phát', kicker: 'Hội nghị', title: 'TỔNG KẾT HOẠT ĐỘNG KINH DOANH NĂM 2026\nVÀ TRIỂN KHAI KẾ HOẠCH NĂM 2027', subtitle: 'Đoàn kết – Đổi mới – Bứt phá', info: 'Hà Nội, ngày 10 tháng 01 năm 2027' }),
    colors: [C('c1', 'Màu xanh chủ đạo', '#0D3B8C'), C('c2', 'Màu chỉ vàng', '#F2C14E'), C('c3', 'Màu nền', '#FFFFFF')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c3, mix(p.c3, '#DCE8FF', 0.7)], 0, 1)}${lin(u + 'w1', [tint(p.c1, 0.35), p.c1], 0, 1)}${lin(u + 'w2', [p.c1, shade(p.c1, 0.45)], 0, 1)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<path d="M 760 0 C 900 60 1050 20 1200 125 L 1200 0 Z" fill="url(#${u}w1)" opacity="0.9"/>` +
        `<path d="M 820 0 C 940 48 1070 22 1200 92 L 1200 0 Z" fill="${shade(p.c1, 0.2)}"/>` +
        `<path d="M 790 0 C 920 70 1060 40 1200 145" fill="none" stroke="${p.c2}" stroke-width="3"/>` +
        `<path d="M 0 455 C 300 395 650 560 1200 420 L 1200 600 L 0 600 Z" fill="url(#${u}w1)"/>` +
        `<path d="M 0 500 C 350 440 700 600 1200 470 L 1200 600 L 0 600 Z" fill="url(#${u}w2)"/>` +
        `<path d="M 0 438 C 300 378 650 543 1200 403" fill="none" stroke="${p.c2}" stroke-width="5"/>` +
        `<path d="M 0 470 C 320 410 680 575 1200 440" fill="none" stroke="${p.c2}" stroke-opacity="0.7" stroke-width="2"/><g stroke="#fff" stroke-opacity="0.25" fill="none">`;
      for (let i = 0; i < 8; i++) s += `<path d="M 0 ${520 + i * 9} C 350 ${462 + i * 9} 700 ${615 + i * 6} 1200 ${490 + i * 9}"/>`;
      s += '</g>' + logoSlot(p, 600, 68, 60, { color: p.c1 }) +
        T(p.org, 600, 126, { size: 18, weight: 700, fill: p.c1, upper: true, ls: 2, maxW: 900 }) +
        T(p.kicker, 600, 196, { size: 42, weight: 800, fill: shade(p.c2, 0.25), upper: true, ls: 6, maxW: 900 });
      const t = TL(p.title, 600, 264, { size: 46, weight: 800, fill: p.c1, maxW: 1000 }, 1.22);
      const ys = 264 + t.h + 46;
      s += t.svg + T(p.subtitle, 600, ys, { size: 24, weight: 500, italic: true, fill: shade(p.c1, 0.2), maxW: 900 }) +
        T(p.info, 600, Math.min(ys + 42, 410), { size: 20, weight: 500, italic: true, fill: p.c1, maxW: 800 });
      return s;
    },
  });

  /* B42 — Lễ ký kết hợp tác */
  add({
    id: 'B42', name: 'Lễ ký kết hợp tác hai bên', styles: ['Trang trọng', 'Hiện đại'], topic: 'Doanh nghiệp – công nghệ',
    use: 'Lễ ký kết hợp tác, ký MOU, thỏa thuận liên kết đào tạo, ra mắt liên doanh, kết nghĩa',
    desc: 'Bố cục đối xứng hai bên: logo và tên của mỗi bên trong khung tròn, ở giữa là biểu tượng hai vòng lồng nhau và nội dung ký kết.',
    fields: [F('org', 'Bên A', 'Trường Đại học Ánh Dương'), F('partner', 'Bên B', 'Tập đoàn Công nghệ Nova'), F('kicker', 'Tên lễ', 'Lễ ký kết'),
      F('title', 'Nội dung ký kết', 'THỎA THUẬN HỢP TÁC\nĐÀO TẠO VÀ NGHIÊN CỨU', { multi: true }), F('subtitle', 'Dòng phụ', 'Giai đoạn 2027 – 2030'), F('info', 'Thời gian – địa điểm', 'Hà Nội, ngày 15 tháng 01 năm 2027')],
    colors: [C('c1', 'Màu navy', '#002B5B'), C('c2', 'Màu xanh sáng', '#00A3E0'), C('c3', 'Màu vàng', '#C9A227')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [shade(p.c1, 0.3), p.c1, mix(p.c1, p.c2, 0.25)])}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<polygon points="440,0 760,0 760,600 440,600" fill="#fff" opacity="0.04"/>` +
        `<line x1="440" y1="60" x2="440" y2="540" stroke="${p.c3}" stroke-opacity="0.5"/><line x1="760" y1="60" x2="760" y2="540" stroke="${p.c3}" stroke-opacity="0.5"/>`;
      [[200, 280], [1000, 280]].forEach(c => {
        s += `<circle cx="${c[0]}" cy="${c[1]}" r="112" fill="#fff" fill-opacity="0.07" stroke="${p.c3}" stroke-width="2"/><circle cx="${c[0]}" cy="${c[1]}" r="122" fill="none" stroke="${p.c3}" stroke-opacity="0.45" stroke-dasharray="2 6"/>`;
      });
      s += logoSlot(p, 200, 280, 140) +
        `<g opacity="0.85"><circle cx="1000" cy="280" r="70" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>` +
        T('LOGO', 1000, 274, { size: 22, font: 'Montserrat', weight: 700, ls: 1, noScale: true, attrs: deco }) +
        T('ĐỐI TÁC', 1000, 300, { size: 13, font: 'Montserrat', weight: 600, ls: 2, noScale: true, attrs: deco }) + '</g>' +
        T(p.org, 200, 445, { size: 17, weight: 700, upper: true, ls: 1, maxW: 360 }) +
        T(p.partner, 1000, 445, { size: 17, weight: 700, upper: true, ls: 1, maxW: 360 }) +
        `<g fill="none" stroke="${p.c3}" stroke-width="7"><circle cx="582" cy="112" r="30"/><circle cx="618" cy="112" r="30"/></g>` +
        T(p.kicker, 604, 196, { size: 26, weight: 800, fill: p.c3, upper: true, ls: 8, maxW: 300 });
      const t = TL(p.title, 600, 262, { size: 38, weight: 800, maxW: 300 }, 1.25);
      const ys = 262 + t.h + 46;
      s += t.svg + T(p.subtitle, 600, ys, { size: 19, weight: 500, italic: true, fill: tint(p.c2, 0.4), maxW: 300 }) +
        T(p.info, 600, 540, { size: 17, weight: 500, maxW: 700, attrs: 'fill-opacity="0.85"' });
      return s;
    },
  });

  /* B43 — Mừng Quốc khánh 2/9 */
  add({
    id: 'B43', name: 'Mừng Quốc khánh 2/9', styles: ['Trang trọng', 'Truyền thống'], topic: 'Lễ hội – văn hóa',
    use: 'Chào mừng Quốc khánh 2/9, ngày lễ lớn của đất nước, lễ chào cờ, văn nghệ chào mừng',
    desc: 'Nền đỏ với tia nắng vàng tỏa từ trên, lá cờ đỏ sao vàng tung bay, chim bồ câu hòa bình và vòng trống đồng chìm ở chân – trang nghiêm, tự hào.',
    fields: STD({ org: 'Trường Đại học Ánh Dương', kicker: 'Chào mừng', title: 'KỶ NIỆM 81 NĂM\nQUỐC KHÁNH 2/9', subtitle: '02/9/1945 – 02/9/2026', info: 'Hà Nội, ngày 01 tháng 9 năm 2026' }),
    colors: [C('c1', 'Màu đỏ', '#DA251D'), C('c2', 'Màu vàng', '#FFCD00'), C('c3', 'Màu chữ sáng', '#FFF8E1')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.15), p.c1, shade(p.c1, 0.38)], 0.5, 0.3, 0.85)}${lin(u + 'gd', [[tint(p.c2, 0.75), 0], [p.c2, 0.5], [shade(p.c2, 0.15), 1]], 0, 1)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      for (let i = 0; i < 30; i += 2) {
        const a1 = rad(15 + i * 5), a2 = rad(15 + i * 5 + 5);
        s += `<polygon points="600,-40 ${r2(600 + 1100 * Math.cos(a1))},${r2(-40 + 1100 * Math.sin(a1))} ${r2(600 + 1100 * Math.cos(a2))},${r2(-40 + 1100 * Math.sin(a2))}" fill="${p.c2}" opacity="0.07"/>`;
      }
      s += drum(600, 780, 430, p.c2, { opacity: 0.2 }) +
        `<line x1="46" y1="36" x2="46" y2="300" stroke="${p.c2}" stroke-width="5" stroke-linecap="round"/><circle cx="46" cy="32" r="7" fill="${p.c2}"/>` +
        `<path d="M 48 52 C 120 26 190 84 300 46 L 300 206 C 190 244 120 186 48 214 Z" fill="#E8302A" stroke="${p.c2}" stroke-width="2"/>` +
        `<polygon points="${starPts(174, 130, 46, 46 * 0.382, 5)}" fill="#FFDD00"/>`;
      const dove = (x, y, k) => `<path d="M 0 0 C 10 -14 26 -16 34 -8 C 40 -22 58 -28 74 -24 C 60 -14 52 -4 46 6 C 56 6 64 10 68 16 C 52 16 38 14 28 10 C 18 15 8 15 0 10 C 6 6 6 3 0 0 Z" fill="#fff" opacity="0.92" transform="translate(${x} ${y}) scale(${k})"/>`;
      s += dove(960, 120, 1.3) + dove(1060, 170, 0.9) + dove(1100, 80, 0.7) +
        logoSlot(p, 600, 66, 54, { color: p.c2 }) +
        T(p.org, 600, 122, { size: 18, weight: 700, fill: p.c3, upper: true, ls: 2, maxW: 700 }) +
        T(p.kicker, 606, 196, { size: 28, weight: 700, fill: p.c3, upper: true, ls: 8, maxW: 600 });
      const t = TL(p.title, 600, 280, { size: 64, weight: 900, fill: `url(#${u}gd)`, maxW: 760 }, 1.14);
      s += t.svg + T(p.subtitle, 600, 280 + t.h + 56, { size: 26, weight: 600, italic: true, fill: p.c3, maxW: 700 }) +
        T(p.info, 600, 545, { size: 20, weight: 500, italic: true, fill: p.c2, maxW: 760 });
      return s;
    },
  });

  /* B44 — Tuyển sinh / Open day */
  add({
    id: 'B44', name: 'Thông báo tuyển sinh', styles: ['Hiện đại', 'Năng động'], topic: 'Giáo dục',
    use: 'Tuyển sinh, ngày hội tư vấn – Open Day, giới thiệu trường, hội chợ du học',
    desc: 'Chữ lớn căn trái trên nền trắng, bên phải là vòng tròn xanh với tòa nhà cột kiểu học đường và mũ tốt nghiệp, cung tròn vàng ôm quanh.',
    fields: STD({ org: 'Trường Đại học Ánh Dương', kicker: 'Thông báo tuyển sinh', title: 'NĂM HỌC\n2027 – 2028', subtitle: 'Đào tạo 25 ngành – Học bổng đến 100% học phí', info: 'Hotline 0900 000 000 • tuyensinh.anhduong.edu.vn' }),
    colors: [C('c1', 'Màu xanh', '#1E40AF'), C('c2', 'Màu vàng hổ phách', '#F59E0B'), C('c3', 'Màu nền', '#FFFFFF')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="${p.c3}"/><g fill="${p.c2}" opacity="0.35">`;
      for (let x = 0; x < 6; x++) for (let y = 0; y < 5; y++) s += `<circle cx="${560 + x * 18}" cy="${470 + y * 18}" r="3"/>`;
      s += `</g><circle cx="930" cy="300" r="230" fill="${p.c1}"/>` +
        `<path d="${arcPath(930, 300, 252, -70, 120)}" fill="none" stroke="${p.c2}" stroke-width="14" stroke-linecap="round"/>` +
        `<path d="${arcPath(930, 300, 252, 150, 200)}" fill="none" stroke="${p.c2}" stroke-width="14" stroke-linecap="round"/>` +
        `<g fill="#fff"><polygon points="790,242 930,180 1070,242"/><rect x="800" y="246" width="260" height="18"/>`;
      for (let i = 0; i < 6; i++) s += `<rect x="${817 + i * 42}" y="270" width="18" height="108"/>`;
      s += `<rect x="796" y="380" width="268" height="12"/><rect x="784" y="394" width="292" height="12"/></g>` +
        `<polygon points="930,128 978,146 930,164 882,146" fill="${p.c2}"/><path d="M 906 154 V 172 Q 930 184 954 172 V 154" fill="${p.c2}"/><line x1="978" y1="146" x2="978" y2="176" stroke="${p.c2}" stroke-width="3"/>` +
        logoSlot(p, 126, 88, 64, { color: p.c1 }) +
        T(p.org, 172, 96, { size: 18, weight: 700, fill: shade(p.c1, 0.4), anchor: 'start', upper: true, ls: 1, maxW: 480 }) +
        T(p.kicker, 92, 198, { size: 24, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 3, maxW: 560 });
      const t = TL(p.title, 88, 292, { size: 78, weight: 900, fill: p.c1, anchor: 'start', maxW: 560 }, 1.05);
      const ys = 292 + t.h + 54;
      s += t.svg + T(p.subtitle, 92, ys, { size: 22, weight: 600, fill: '#334155', anchor: 'start', maxW: 560 }) +
        pill(p.info, 90, Math.max(ys + 30, 470), { size: 17, fill: '#fff', bg: p.c1, anchor: 'start', maxW: 520 });
      return s;
    },
  });

  /* B45 — Hội thi tài năng (rèm sân khấu) */
  add({
    id: 'B45', name: 'Hội thi tài năng – rèm nhung', styles: ['Sang trọng', 'Sự kiện'], topic: 'Âm nhạc – sáng tạo',
    use: 'Hội thi tài năng, văn nghệ chào mừng, hội diễn, chung kết cuộc thi, đêm kịch',
    desc: 'Rèm nhung đỏ hai bên với nếp gấp và dải diềm có tua, đèn rọi giữa sân khấu – tiêu đề serif nhũ vàng như mở màn một đêm diễn lớn.',
    fields: STD({ org: 'Đoàn Thanh niên Trường Ánh Dương', kicker: 'Hội thi', title: 'TÌM KIẾM\nTÀI NĂNG 2026', subtitle: 'Tỏa sáng đam mê', info: '19:00 • 20.12.2026 • Hội trường lớn' }),
    colors: [C('c1', 'Màu rèm nhung', '#7F0A1E'), C('c2', 'Màu vàng', '#F6C453'), C('c3', 'Màu sân khấu', '#1A0A0A')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [mix(p.c3, p.c2, 0.15), p.c3], 0.5, 0.55, 0.7)}${lin(u + 'gd', [[tint(p.c2, 0.75), 0], [p.c2, 0.5], [shade(p.c2, 0.3), 1]], 0, 1)}` +
        lin(u + 'ct', [[shade(p.c1, 0.5), 0], [p.c1, 0.14], [tint(p.c1, 0.18), 0.28], [shade(p.c1, 0.25), 0.44], [p.c1, 0.6], [tint(p.c1, 0.12), 0.76], [shade(p.c1, 0.45), 1]], 1, 0) +
        `${radial(u + 'fl', [[p.c2, 0, 0.35], [p.c2, 1, 0]], 0.5, 0.5, 0.5)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<polygon points="560,40 640,40 830,600 370,600" fill="#fff" opacity="0.06"/><ellipse cx="600" cy="590" rx="330" ry="60" fill="url(#${u}fl)"/>`;
      const curtain = `<path d="M 0 0 H 255 C 205 180 170 420 236 600 H 0 Z" fill="url(#${u}ct)"/><path d="M 236 600 C 170 420 205 180 255 0" fill="none" stroke="${shade(p.c1, 0.5)}" stroke-width="3"/>` +
        `<ellipse cx="190" cy="372" rx="30" ry="9" fill="${p.c2}"/><path d="M 190 380 v 50" stroke="${p.c2}" stroke-width="3"/><circle cx="190" cy="436" r="6" fill="${p.c2}"/>`;
      s += curtain + `<g transform="translate(1200 0) scale(-1 1)">${curtain}</g>` + `<rect width="1200" height="56" fill="${p.c1}"/>`;
      for (let x = 0; x < 1200; x += 60) s += `<path d="M ${x} 56 A 30 30 0 0 0 ${x + 60} 56 Z" fill="${p.c1}"/><path d="M ${x} 56 A 30 30 0 0 0 ${x + 60} 56" fill="none" stroke="${p.c2}" stroke-width="3"/>`;
      s += `<rect width="1200" height="8" y="50" fill="${p.c2}" opacity="0.8"/>`;
      const R = rng(45);
      for (let i = 0; i < 14; i++) s += sparkle(300 + R() * 600, 100 + R() * 420, 3 + R() * 7, tint(p.c2, 0.4), 0.5 + R() * 0.4);
      s += logoSlot(p, 600, 118, 46, { color: p.c2 }) +
        T(p.org, 600, 164, { size: 15, weight: 600, fill: p.c2, upper: true, ls: 3, maxW: 560 }) +
        T(p.kicker, 608, 218, { size: 22, font: 'Montserrat', weight: 600, upper: true, ls: 12, maxW: 560 });
      const t = TL(p.title, 600, 302, { size: 72, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 640 }, 1.08);
      s += t.svg + T(p.subtitle, 600, 302 + t.h + 64, { size: 48, font: 'Great Vibes', weight: 400, maxW: 600 }) +
        T(p.info, 600, 548, { size: 15, font: 'Montserrat', weight: 600, fill: p.c2, upper: true, ls: 3, maxW: 640 });
      return s;
    },
  });

  /* B46 — Giải bóng đá */
  add({
    id: 'B46', name: 'Giải bóng đá – sân cỏ', styles: ['Năng động', 'Sự kiện'], topic: 'Thể thao – thanh niên',
    use: 'Giải bóng đá mini, giải bóng đá sinh viên, khai mạc mùa giải, cổ vũ World Cup, trao cúp',
    desc: 'Sân cỏ kẻ sọc với vạch vôi, quả bóng lớn ngay chấm giữa sân và vệt tốc độ – chữ nghiêng siêu đậm, khung nhấn vàng chanh.',
    fields: STD({ org: 'Công đoàn Công ty CP Xây dựng Số 1', kicker: 'Giải bóng đá mini', title: 'CÚP\nÁNH DƯƠNG 2026', subtitle: 'FAIR PLAY – ĐOÀN KẾT – CỐNG HIẾN', info: 'Khai mạc 07:30 • 05.12.2026 • Sân Hòa An' }),
    colors: [C('c1', 'Màu cỏ', '#0B6E4F'), C('c2', 'Màu nhấn vàng chanh', '#FFD60A'), C('c3', 'Màu chữ tối', '#0B1D13')],
    render(p, u) {
      let s = `<rect width="1200" height="600" fill="${p.c1}"/>`;
      for (let x = 0; x < 1200; x += 100) s += x % 200 ? `<rect x="${x}" y="0" width="100" height="600" fill="${shade(p.c1, 0.1)}"/>` : '';
      s += `<g fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="3"><rect x="30" y="30" width="1140" height="540"/><line x1="900" y1="30" x2="900" y2="570"/>` +
        `<circle cx="900" cy="300" r="140"/><rect x="30" y="160" width="120" height="280"/><rect x="30" y="230" width="44" height="140"/></g>`;
      const R = rng(7);
      for (let i = 0; i < 9; i++) { const y = 200 + R() * 220, x = 560 + R() * 120; s += `<line x1="${r2(x)}" y1="${r2(y)}" x2="${r2(x + 80 + R() * 90)}" y2="${r2(y)}" stroke="#fff" stroke-opacity="0.45" stroke-width="${r2(2 + R() * 3)}" stroke-linecap="round"/>`; }
      const B = 120, cx = 900, cy = 300;
      s += `<ellipse cx="${cx + 20}" cy="${cy + B + 12}" rx="${B * 0.85}" ry="16" fill="#000" opacity="0.25"/>` +
        `<defs><clipPath id="${u}ball"><circle cx="${cx}" cy="${cy}" r="${B}"/></clipPath></defs><circle cx="${cx}" cy="${cy}" r="${B}" fill="#fff"/><g clip-path="url(#${u}ball)">` +
        `<polygon points="${starPts(cx, cy, B * 0.34, B * 0.34, 5 / 2 * 2, -90).split(' ').filter((_, i) => i % 2 === 0).join(' ')}" fill="#222"/>`;
      for (let i = 0; i < 5; i++) {
        const a = rad(-90 + i * 72), ox = cx + B * 0.95 * Math.cos(a), oy = cy + B * 0.95 * Math.sin(a);
        const pts = []; for (let k = 0; k < 5; k++) { const b = a + rad(180 + k * 72); pts.push(`${r2(ox + B * 0.3 * Math.cos(b))},${r2(oy + B * 0.3 * Math.sin(b))}`); }
        s += `<polygon points="${pts.join(' ')}" fill="#222"/><line x1="${r2(cx + B * 0.34 * Math.cos(a))}" y1="${r2(cy + B * 0.34 * Math.sin(a))}" x2="${r2(cx + B * 0.68 * Math.cos(a))}" y2="${r2(cy + B * 0.68 * Math.sin(a))}" stroke="#222" stroke-width="3"/>`;
      }
      s += `</g><circle cx="${cx}" cy="${cy}" r="${B}" fill="none" stroke="#222" stroke-width="3"/><ellipse cx="${cx - 40}" cy="${cy - 55}" rx="30" ry="16" fill="#fff" opacity="0.5" transform="rotate(-30 ${cx - 40} ${cy - 55})"/>` +
        logoSlot(p, 126, 90, 62) +
        T(p.org, 172, 98, { size: 17, weight: 700, anchor: 'start', upper: true, ls: 1, maxW: 460 }) +
        `<g transform="translate(45 0) skewX(-8)">` +
        T(p.kicker, 92, 200, { size: 24, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 3, maxW: 500 });
      const t = TL(p.title, 88, 298, { size: 90, weight: 900, anchor: 'start', upper: true, maxW: 520 }, 1.0);
      const ys = 298 + t.h + 62;
      s += t.svg;
      if (p.subtitle) {
        const fs = fitSize(p.subtitle, 26, 500, 'Be Vietnam Pro', 800, 1), w = textW(p.subtitle, fs, 'Be Vietnam Pro', 800, 1);
        s += `<rect x="88" y="${r2(ys - fs - 4)}" width="${r2(w + 36)}" height="${r2(fs + 22)}" fill="${p.c2}"/>` + T(p.subtitle, 106, ys, { size: fs, weight: 800, fill: p.c3, anchor: 'start', ls: 1 });
      }
      s += T(p.info, 92, 540, { size: 19, weight: 600, anchor: 'start', maxW: 520, attrs: 'fill-opacity="0.9"' }) + '</g>';
      return s;
    },
  });

  /* B47 — Lễ hội đèn lồng phố cổ */
  add({
    id: 'B47', name: 'Lễ hội đèn lồng phố cổ', styles: ['Truyền thống', 'Sang trọng'], topic: 'Lễ hội – văn hóa',
    use: 'Đêm phố cổ Hội An, lễ hội đèn lồng, đêm hội trăng rằm, du lịch văn hóa, tiệc phong cách Á Đông',
    desc: 'Đêm xanh thẫm với những dây đèn lồng nhiều màu tỏa sáng, mái ngói phố cổ in bóng và dòng sông lấp lánh phía dưới.',
    fields: STD({ org: 'Trung tâm Văn hóa – Thể thao Hội An', kicker: 'Đêm phố cổ', title: 'LỄ HỘI ĐÈN LỒNG', subtitle: 'Lung linh sắc màu – Ấm áp tình người', info: '19:00 • Rằm tháng Giêng 2027 • Bến sông Hoài' }),
    colors: [C('c1', 'Màu trời đêm', '#14213D'), C('c2', 'Màu ánh vàng', '#FCA311'), C('c3', 'Màu đèn đỏ', '#E63946')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c1, mix(p.c1, '#3A0CA3', 0.35)], 0, 1)}${lin(u + 'rv', [shade(p.c1, 0.1), shade(p.c1, 0.45)], 0, 1)}` +
        `${lin(u + 'gd', ['#FFE29A', p.c2, p.c3], 0, 1)}<filter id="${u}bl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      const R = rng(71);
      for (let i = 0; i < 50; i++) s += `<circle cx="${r2(R() * 1200)}" cy="${r2(R() * 300)}" r="${r2(0.6 + R() * 1.3)}" fill="#fff" opacity="${r2(0.3 + R() * 0.6)}"/>`;
      const cols = [p.c3, p.c2, '#FFD166', '#9B5DE5', '#06D6A0', '#F15BB5'];
      const lantern = (x, y, r, c) => `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(r * 2.3)}" fill="${c}" opacity="0.22" filter="url(#${u}bl)"/>` +
        `<line x1="${r2(x)}" y1="${r2(y - r * 1.6)}" x2="${r2(x)}" y2="${r2(y - r * 1.1)}" stroke="#2b2b2b" stroke-width="1.5"/>` +
        `<rect x="${r2(x - r * 0.45)}" y="${r2(y - r * 1.25)}" width="${r2(r * 0.9)}" height="${r2(r * 0.22)}" fill="#C9A227"/>` +
        `<ellipse cx="${r2(x)}" cy="${r2(y)}" rx="${r2(r)}" ry="${r2(r * 1.12)}" fill="${c}"/><ellipse cx="${r2(x)}" cy="${r2(y)}" rx="${r2(r * 0.5)}" ry="${r2(r * 1.12)}" fill="none" stroke="${shade(c, 0.25)}" stroke-width="1"/>` +
        `<rect x="${r2(x - r * 0.45)}" y="${r2(y + r * 1.05)}" width="${r2(r * 0.9)}" height="${r2(r * 0.22)}" fill="#C9A227"/><line x1="${r2(x)}" y1="${r2(y + r * 1.27)}" x2="${r2(x)}" y2="${r2(y + r * 2)}" stroke="${c}" stroke-width="2"/>`;
      [[40, 110, 90, 14, 0], [20, 165, 70, 20, 2]].forEach((st, si) => {
        const [y0, y1, sag, r, off] = st;
        s += `<path d="M -10 ${y0} Q 600 ${y0 + sag * 2} 1210 ${y1}" fill="none" stroke="#1b1b1b" stroke-width="1.5"/>`;
        for (let i = 0; i < 17; i++) {
          const t = (i + 0.5) / 17, x = -10 + 1220 * t, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * (y0 + sag * 2) + t * t * y1;
          s += lantern(x, y + r * 1.5, r * (si ? 0.9 : 1.1), cols[(i + off) % cols.length]);
        }
      });
      s += `<rect y="510" width="1200" height="90" fill="url(#${u}rv)"/>`;
      for (let i = 0; i < 14; i++) s += `<ellipse cx="${r2(40 + i * 85 + R() * 30)}" cy="${r2(535 + R() * 50)}" rx="${r2(14 + R() * 20)}" ry="3" fill="${cols[i % cols.length]}" opacity="0.45" filter="url(#${u}bl)"/>`;
      let x = -20;
      const Rr = rng(5);
      while (x < 1220) {
        const w = 70 + Rr() * 70, h = 40 + Rr() * 50, y = 510 - h;
        s += `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" fill="${shade(p.c1, 0.5)}"/>` +
          `<path d="M ${r2(x - 14)} ${r2(y)} Q ${r2(x)} ${r2(y - 6)} ${r2(x + 10)} ${r2(y - 26)} H ${r2(x + w - 10)} Q ${r2(x + w)} ${r2(y - 6)} ${r2(x + w + 14)} ${r2(y)} Z" fill="${shade(p.c1, 0.65)}"/>` +
          `<rect x="${r2(x + w * 0.3)}" y="${r2(y + 12)}" width="${r2(w * 0.16)}" height="${r2(h * 0.35)}" fill="${p.c2}" opacity="0.75"/><rect x="${r2(x + w * 0.58)}" y="${r2(y + 12)}" width="${r2(w * 0.16)}" height="${r2(h * 0.35)}" fill="${p.c2}" opacity="0.6"/>`;
        x += w + 8;
      }
      s += logoSlot(p, 1120, 230, 52, { optional: true }) +
        T(p.org, 600, 230, { size: 16, weight: 600, fill: p.c2, upper: true, ls: 3, maxW: 700 }) +
        T(p.kicker, 606, 270, { size: 24, weight: 700, upper: true, ls: 8, maxW: 700 });
      const t = TL(p.title, 600, 352, { size: 80, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 760 }, 1.05);
      s += t.svg + T(p.subtitle, 600, 352 + t.h + 56, { size: 36, font: 'Dancing Script', weight: 700, maxW: 700 }) +
        T(p.info, 600, 568, { size: 17, weight: 600, maxW: 800, attrs: 'fill-opacity="0.9"' });
      return s;
    },
  });

  /* B48 — Cắm trại / team building */
  add({
    id: 'B48', name: 'Team building – cắm trại', styles: ['Thiên nhiên', 'Năng động'], topic: 'Thể thao – thanh niên',
    use: 'Team building, cắm trại, dã ngoại, hội trại thanh niên, du lịch công ty',
    desc: 'Hoàng hôn trên núi, rừng thông, lều trại và đống lửa trại – không khí phiêu lưu, gắn kết, chữ đậm khỏe khoắn.',
    fields: STD({ org: 'Công ty TNHH Đất Việt', kicker: 'Team building 2026', title: 'KẾT NỐI\nSỨC MẠNH', subtitle: 'Một đội – Một nhịp – Một mục tiêu', info: '15 – 16/11/2026 • Ba Vì, Hà Nội' }),
    colors: [C('c1', 'Màu rừng', '#2D6A4F'), C('c2', 'Màu hoàng hôn', '#F4A261'), C('c3', 'Màu chữ tối', '#264653')],
    render(p, u) {
      const tree = (x, b, h) => `<rect x="${r2(x - h * 0.04)}" y="${r2(b - h * 0.18)}" width="${r2(h * 0.08)}" height="${r2(h * 0.18)}" fill="#3E2C23"/>` +
        [[0.15, 0.62], [0.42, 0.5], [0.66, 0.36]].map(q => `<polygon points="${r2(x - h * q[1] * 0.5)},${r2(b - h * q[0])} ${r2(x + h * q[1] * 0.5)},${r2(b - h * q[0])} ${r2(x)},${r2(b - h * (q[0] + 0.42))}" fill="${p.c3}"/>`).join('');
      let s = `<defs>${lin(u + 'sky', ['#FFE8D6', tint(p.c2, 0.25)], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}sky)"/>` +
        `<circle cx="880" cy="300" r="74" fill="${p.c2}"/><circle cx="880" cy="300" r="110" fill="${p.c2}" opacity="0.25"/>` +
        `<polygon points="0,380 180,250 330,360 520,215 720,370 900,240 1080,345 1200,280 1200,600 0,600" fill="${tint(p.c1, 0.55)}"/>` +
        `<polygon points="0,440 140,350 300,430 480,330 640,440 820,360 1000,440 1200,370 1200,600 0,600" fill="${tint(p.c1, 0.3)}"/>` +
        `<path d="M 0 480 Q 300 455 600 478 T 1200 470 L 1200 600 L 0 600 Z" fill="${p.c1}"/>` +
        tree(60, 530, 150) + tree(140, 540, 115) + tree(1150, 530, 160) + tree(1075, 545, 115) + tree(1005, 550, 90) +
        `<polygon points="680,530 772,405 864,530" fill="${p.c2}"/><polygon points="772,405 864,530 820,530" fill="${shade(p.c2, 0.2)}"/>` +
        `<polygon points="752,530 772,450 792,530" fill="${shade(p.c2, 0.45)}"/><line x1="772" y1="405" x2="772" y2="388" stroke="#3E2C23" stroke-width="4"/>` +
        `<g stroke="#5D4037" stroke-width="9" stroke-linecap="round"><line x1="905" y1="540" x2="955" y2="520"/><line x1="905" y1="520" x2="955" y2="540"/></g>` +
        `<path d="M 930 522 C 900 500 915 470 930 448 C 935 470 960 480 948 505 C 958 500 962 490 960 480 C 975 500 965 525 930 522 Z" fill="#FF7A00"/>` +
        `<path d="M 930 522 C 915 508 922 490 932 476 C 936 492 948 500 942 512 C 946 518 940 524 930 522 Z" fill="#FFD54F"/>` +
        logoSlot(p, 126, 84, 60, { color: p.c3 }) +
        T(p.org, 172, 92, { size: 17, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 1, maxW: 480 }) +
        T(p.kicker, 92, 176, { size: 24, weight: 800, fill: p.c1, anchor: 'start', upper: true, ls: 4, maxW: 560 });
      const t = TL(p.title, 88, 256, { size: 78, weight: 900, fill: p.c3, anchor: 'start', maxW: 600, attrs: halo(6, '#FFF3E6') }, 1.05);
      const ys = 256 + t.h + 50;
      s += t.svg + T(p.subtitle, 92, ys, { size: 22, weight: 700, fill: shade(p.c1, 0.2), anchor: 'start', maxW: 560, attrs: halo(5, '#FFF3E6') }) +
        pill(p.info, 90, ys + 22, { size: 17, fill: '#fff', bg: p.c3, anchor: 'start', maxW: 500 });
      return s;
    },
  });

  /* B49 — Tiệc cưới boho */
  add({
    id: 'B49', name: 'Tiệc cưới boho – vòm cổng', styles: ['Lãng mạn', 'Tối giản'], topic: 'Cưới hỏi – gia đình',
    use: 'Tiệc cưới phong cách boho / rustic, save the date, lễ đính hôn, kỷ niệm ngày cưới',
    desc: 'Vòm cổng tròn màu kem trên nền be, cụm cỏ lau và lá bạch đàn ở chân vòm, tên viết tay ở trung tâm – mộc mạc, hiện đại.',
    fields: [F('kicker', 'Dòng trên', 'Save the date'), F('title', 'Tên hai bạn', 'Quốc Bảo\n& Minh Anh', { multi: true }),
      F('info', 'Ngày cưới', '20 . 12 . 2026'), F('subtitle', 'Địa điểm', 'The Garden – Long Biên, Hà Nội')],
    colors: [C('c1', 'Màu cỏ lau – vòm', '#C8A27E'), C('c2', 'Màu chữ', '#5E503F'), C('c3', 'Màu nền', '#F5EFE6'), C('c4', 'Màu lá', '#A3B18A')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="${p.c3}"/>` +
        `<path d="M 380 600 V 300 A 220 220 0 0 1 820 300 V 600 Z" fill="${tint(p.c1, 0.72)}" stroke="${p.c1}" stroke-width="2"/>` +
        `<path d="M 394 600 V 300 A 206 206 0 0 1 806 300 V 600" fill="none" stroke="${p.c1}" stroke-width="0.8"/>`;
      const pampas = (x, y, ang, len, seed) => {
        const R = rng(seed), a = rad(ang), tx = x + len * Math.cos(a), ty = y + len * Math.sin(a);
        let g = `<path d="M ${x} ${y} Q ${r2(x + len * 0.5 * Math.cos(a) + 10)} ${r2(y + len * 0.5 * Math.sin(a))} ${r2(tx)} ${r2(ty)}" fill="none" stroke="${shade(p.c1, 0.25)}" stroke-width="2"/>`;
        for (let i = 0; i < 40; i++) {
          const t = 0.45 + R() * 0.55, px = x + len * t * Math.cos(a) + (R() - 0.5) * 22, py = y + len * t * Math.sin(a) + (R() - 0.5) * 22;
          g += `<ellipse cx="${r2(px)}" cy="${r2(py)}" rx="${r2(10 + R() * 8)}" ry="2.6" fill="${tint(p.c1, R() * 0.4)}" opacity="0.85" transform="rotate(${r2(ang + (R() - 0.5) * 50)} ${r2(px)} ${r2(py)})"/>`;
        }
        return g;
      };
      const euca = (x, y, ang, len) => {
        const a = rad(ang); let g = `<path d="M ${x} ${y} L ${r2(x + len * Math.cos(a))} ${r2(y + len * Math.sin(a))}" stroke="${shade(p.c4, 0.3)}" stroke-width="2"/>`;
        for (let i = 1; i <= 7; i++) { const t = i / 8, px = x + len * t * Math.cos(a), py = y + len * t * Math.sin(a), d = (i % 2 ? 1 : -1) * 14; g += `<circle cx="${r2(px - d * Math.sin(a))}" cy="${r2(py + d * Math.cos(a))}" r="${r2(11 - i * 0.6)}" fill="${p.c4}"/>`; }
        return g;
      };
      let cl = pampas(420, 600, -105, 260, 1) + pampas(430, 600, -128, 230, 2) + pampas(410, 600, -150, 200, 3) + euca(430, 600, -80, 170) + euca(410, 600, -165, 150);
      s += cl + `<g transform="translate(1200 0) scale(-1 1)">${cl}</g>` +
        T(p.kicker, 605, 176, { size: 20, font: 'Cormorant Garamond', weight: 600, fill: p.c2, upper: true, ls: 8, maxW: 380 });
      const t = TL(p.title, 600, 268, { size: 74, font: 'Great Vibes', weight: 400, fill: p.c2, maxW: 380 }, 1.0);
      const y = 268 + t.h;
      s += t.svg + `<line x1="540" y1="${y + 34}" x2="660" y2="${y + 34}" stroke="${p.c1}" stroke-width="1.2"/>` +
        T(p.info, 603, y + 80, { size: 26, font: 'Cormorant Garamond', weight: 600, fill: p.c2, ls: 5, maxW: 360 }) +
        T(p.subtitle, 600, y + 118, { size: 19, font: 'Cormorant Garamond', weight: 500, italic: true, fill: p.c2, maxW: 380 });
      return s;
    },
  });

  /* B50 — Ngày hội Tiếng Anh */
  add({
    id: 'B50', name: 'Ngày hội Tiếng Anh – ngoại ngữ', styles: ['Vui tươi', 'Hiện đại'], topic: 'Giáo dục',
    use: 'English Day, ngày hội ngoại ngữ, câu lạc bộ tiếng Anh, hùng biện, trại hè quốc tế',
    desc: 'Quả địa cầu xanh được bao quanh bởi bong bóng hội thoại nhiều màu với lời chào nhiều thứ tiếng – trẻ trung, cởi mở, quốc tế.',
    fields: STD({ org: 'Khoa Tiếng Anh – Trường Đại học Hà Nội', kicker: 'English Day 2026', title: 'SPEAK UP\nSHINE OUT', subtitle: 'Hùng biện – Kịch – Đố vui – Âm nhạc', info: '08:00 • 26.03.2026 • Hội trường A' }),
    colors: [C('c1', 'Màu xanh', '#3A86FF'), C('c2', 'Màu hồng', '#FF006E'), C('c3', 'Màu vàng', '#FFBE0B')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="#ffffff"/><g fill="${p.c1}" opacity="0.12">`;
      for (let x = 15; x < 1200; x += 30) for (let y = 15; y < 600; y += 30) s += `<circle cx="${x}" cy="${y}" r="2"/>`;
      s += `</g><circle cx="960" cy="320" r="170" fill="${tint(p.c1, 0.82)}" stroke="${p.c1}" stroke-width="3"/><g fill="none" stroke="${p.c1}" stroke-opacity="0.5" stroke-width="2">` +
        `<ellipse cx="960" cy="320" rx="70" ry="170"/><ellipse cx="960" cy="320" rx="130" ry="170"/><line x1="790" y1="320" x2="1130" y2="320"/>` +
        `<path d="M 806 250 H 1114 M 806 390 H 1114"/></g>` +
        `<path d="M 880 230 q 30 -20 60 0 q 10 30 -20 50 q -40 0 -40 -50 Z M 990 300 q 40 -10 60 20 q -10 40 -50 40 q -20 -30 -10 -60 Z M 900 380 q 30 0 40 30 q -20 20 -45 0 Z" fill="${p.c1}" opacity="0.35"/>`;
      const bubble = (x, y, w, txt, bg, fg, dir) => `<rect x="${x}" y="${y}" width="${w}" height="54" rx="27" fill="${bg}"/><polygon points="${x + (dir > 0 ? 30 : w - 30)},${y + 50} ${x + (dir > 0 ? 18 : w - 18)},${y + 74} ${x + (dir > 0 ? 54 : w - 54)},${y + 50}" fill="${bg}"/>` +
        T(txt, x + w / 2, y + 36, { size: 24, font: 'Montserrat', weight: 800, fill: fg, noScale: true, attrs: deco });
      s += bubble(720, 90, 150, 'Hello!', p.c2, '#fff', 1) + bubble(1010, 100, 160, 'Xin chào', p.c3, '#222', -1) + bubble(1040, 260, 140, 'Bonjour', p.c1, '#fff', -1) +
        bubble(740, 470, 120, 'Hola!', p.c3, '#222', 1) + bubble(1030, 470, 110, 'Ciao', p.c2, '#fff', -1) +
        logoSlot(p, 126, 88, 62, { color: p.c1 }) +
        T(p.org, 172, 96, { size: 17, weight: 700, fill: '#1f2937', anchor: 'start', upper: true, ls: 1, maxW: 460 }) +
        T(p.kicker, 92, 196, { size: 24, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 4, maxW: 540 });
      const o = { size: 84, font: 'Montserrat', weight: 900, anchor: 'start', maxW: 560 };
      const sh = TL(p.title, 96, 292, Object.assign({}, o, { fill: p.c3, attrs: deco }), 1.02);
      const t = TL(p.title, 88, 286, Object.assign({}, o, { fill: p.c1 }), 1.02);
      const ys = 286 + t.h + 54;
      s += sh.svg + t.svg + T(p.subtitle, 92, ys, { size: 22, weight: 600, fill: '#333', anchor: 'start', maxW: 560 }) +
        pill(p.info, 90, Math.max(ys + 28, 466), { size: 17, fill: '#fff', bg: p.c2, anchor: 'start', maxW: 500 });
      return s;
    },
  });

  /* B51 — Ngày hội hiến máu */
  add({
    id: 'B51', name: 'Ngày hội hiến máu nhân đạo', styles: ['Tối giản', 'Hiện đại'], topic: 'Cộng đồng – xã hội',
    use: 'Hiến máu tình nguyện, Chủ nhật Đỏ, Hành trình Đỏ, chiến dịch y tế cộng đồng',
    desc: 'Giọt máu lớn với trái tim trắng bên trong, đường nhịp tim và những giọt nhỏ rơi – thông điệp sẻ chia mạnh mẽ, dễ nhận biết.',
    fields: STD({ org: 'Hội Chữ thập đỏ Trường Ánh Dương', kicker: 'Ngày hội hiến máu tình nguyện', title: 'GIỌT MÁU\nNGHĨA TÌNH', subtitle: 'Một giọt máu cho đi – Một cuộc đời ở lại', info: '07:30 – 11:30 • 10.01.2027 • Nhà thi đấu' }),
    colors: [C('c1', 'Màu đỏ', '#C1121F'), C('c2', 'Màu nền kem', '#FDF0D5'), C('c3', 'Màu xanh đậm', '#003049')],
    render(p) {
      const drop = (x, y, r, fill, op) => `<path d="M 0 -1.5 C 0.5 -0.7 1 -0.2 1 0.35 A 1 1 0 0 1 -1 0.35 C -1 -0.2 -0.5 -0.7 0 -1.5 Z" fill="${fill}" transform="translate(${x} ${y}) scale(${r})"${op ? ` opacity="${op}"` : ''}/>`;
      let s = `<rect width="1200" height="600" fill="${p.c2}"/><circle cx="930" cy="300" r="235" fill="${tint(p.c1, 0.85)}"/>`;
      const R = rng(14);
      for (let i = 0; i < 12; i++) s += drop(640 + R() * 540, 40 + R() * 520, 8 + R() * 10, p.c1, r2(0.2 + R() * 0.3));
      s += drop(930, 300, 130, p.c1) + `<ellipse cx="878" cy="252" rx="18" ry="40" fill="#fff" opacity="0.35" transform="rotate(30 878 252)"/>` +
        heart(930, 330, 50, '#fff') + `<rect x="922" y="300" width="16" height="44" fill="${p.c1}"/><rect x="908" y="314" width="44" height="16" fill="${p.c1}"/>`;
      const ecg = [[590, 490], [600, 490], [625, 470], [645, 490], [668, 490], [684, 505], [705, 420], [726, 545], [744, 490], [1200, 490]];
      s += `<polyline points="${ecg.map(q => q.join(',')).join(' ')}" fill="none" stroke="${p.c1}" stroke-width="3.5" stroke-linejoin="round" opacity="0.8"/>` +
        logoSlot(p, 126, 88, 62, { color: p.c1 }) +
        T(p.org, 172, 96, { size: 17, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 1, maxW: 480 }) +
        T(p.kicker, 92, 196, { size: 21, weight: 800, fill: p.c1, anchor: 'start', upper: true, ls: 2, maxW: 540 });
      const t = TL(p.title, 88, 290, { size: 80, weight: 900, fill: p.c1, anchor: 'start', maxW: 540 }, 1.05);
      const ys = 290 + t.h + 58;
      s += t.svg + T(p.subtitle, 92, ys, { size: 32, font: 'Dancing Script', weight: 700, fill: p.c3, anchor: 'start', maxW: 540 }) +
        pill(p.info, 90, 528, { size: 17, fill: '#fff', bg: p.c3, anchor: 'start', maxW: 500 });
      return s;
    },
  });

  /* B52 — Talkshow / tọa đàm */
  add({
    id: 'B52', name: 'Talkshow – tọa đàm', styles: ['Hiện đại', 'Năng động'], topic: 'Hội nghị – hội thảo',
    use: 'Talkshow, tọa đàm, giao lưu khách mời, podcast trực tiếp, chia sẻ kinh nghiệm nghề nghiệp',
    desc: 'Nền tối với micro cổ điển lớn và sóng âm lan tỏa, nhãn LIVE đỏ ở góc – tiêu đề chữ không chân siêu đậm, nổi bật tên chương trình và khách mời.',
    fields: STD({ org: 'CLB Truyền thông Sinh viên', kicker: 'Talkshow', title: 'CHUYỆN NGHỀ\nCHUYỆN ĐỜI', subtitle: 'Khách mời: TS. Nguyễn An • Nhà báo Lê Bình', info: '14:00 • 18.04.2026 • Phòng hội thảo 3' }),
    colors: [C('c1', 'Màu nền', '#1B1B3A'), C('c2', 'Màu nhấn vàng', '#F7B32B'), C('c3', 'Màu đỏ LIVE', '#E94F37')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.15), p.c1, shade(p.c1, 0.5)], 0.75, 0.45, 0.85)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      [150, 195, 240, 285].forEach((r, i) => {
        s += `<path d="${arcPath(930, 240, r, -50, 50)}" fill="none" stroke="${p.c2}" stroke-opacity="${r2(0.55 - i * 0.12)}" stroke-width="4" stroke-linecap="round"/>` +
          `<path d="${arcPath(930, 240, r, 130, 230)}" fill="none" stroke="${p.c2}" stroke-opacity="${r2(0.55 - i * 0.12)}" stroke-width="4" stroke-linecap="round"/>`;
      });
      s += `<rect x="880" y="120" width="100" height="180" rx="50" fill="${tint(p.c1, 0.22)}" stroke="${p.c2}" stroke-width="4"/><g stroke="${p.c2}" stroke-opacity="0.6" stroke-width="2">`;
      for (let y = 150; y < 290; y += 14) s += `<line x1="892" y1="${y}" x2="968" y2="${y}"/>`;
      s += `</g><path d="M 858 240 Q 858 352 930 352 Q 1002 352 1002 240" fill="none" stroke="${p.c2}" stroke-width="7" stroke-linecap="round"/>` +
        `<line x1="930" y1="352" x2="930" y2="470" stroke="${p.c2}" stroke-width="7"/><ellipse cx="930" cy="476" rx="76" ry="13" fill="${p.c2}"/>` +
        `<rect x="1040" y="48" width="110" height="40" rx="8" fill="${p.c3}"/><circle cx="1062" cy="68" r="7" fill="#fff"/>` +
        T('LIVE', 1108, 77, { size: 22, font: 'Montserrat', weight: 900, noScale: true, attrs: deco }) +
        logoSlot(p, 126, 88, 62, { color: p.c2 }) +
        T(p.org, 172, 96, { size: 17, weight: 600, anchor: 'start', upper: true, ls: 1, maxW: 480, attrs: 'fill-opacity="0.9"' }) +
        T(p.kicker, 92, 200, { size: 24, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 8, maxW: 540 });
      const t = TL(p.title, 88, 292, { size: 80, font: 'Montserrat', weight: 900, anchor: 'start', maxW: 600 }, 1.03);
      const ys = 292 + t.h + 56;
      s += t.svg + T(p.subtitle, 92, ys, { size: 22, weight: 600, anchor: 'start', maxW: 600, attrs: 'fill-opacity="0.9"' }) +
        pill(p.info, 90, Math.max(ys + 28, 470), { size: 17, fill: p.c1, bg: p.c2, anchor: 'start', maxW: 520 });
      return s;
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
