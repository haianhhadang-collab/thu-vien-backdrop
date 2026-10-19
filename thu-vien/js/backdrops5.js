/* =========================================================================
 * backdrops5.js — 12 mẫu hội nghị – hội thảo trang trọng (B53 – B64)
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, TL, star, starPts, laurel, flower, leaf, mix, shade, tint, textW, fitSize, rng, r2, rad, arcPath, logoSlot, drum } = root.BL;
  const { F, C, STD, lin, radial, sparkle, heart } = root.BL.bd;
  const add = t => root.BL.templates.push(Object.assign({ type: 'backdrop', w: 1200, h: 600, topic: 'Hội nghị – hội thảo' }, t));
  const multiOrg = fs => fs.map(f => f.k === 'org' ? Object.assign(f, { multi: true, label: 'Đơn vị tổ chức (Enter để xuống dòng)' }) : f);
  const cloud = 'M 0 0 c 0 -14 18 -20 26 -10 c 4 -14 26 -16 32 0 c 12 -6 24 4 18 14 Z M 10 -4 a 6 6 0 1 1 8 -2 M 36 -6 a 7 7 0 1 1 9 -1';
  const gold = (u, id, c) => lin(u + id, [[tint(c, 0.75), 0], [c, 0.5], [shade(c, 0.22), 1]], 0, 1);
  const divider = (cx, y, w, c) => `<g stroke="${c}" stroke-width="1.4"><line x1="${r2(cx - w / 2)}" y1="${r2(y)}" x2="${r2(cx - 10)}" y2="${r2(y)}"/><line x1="${r2(cx + 10)}" y1="${r2(y)}" x2="${r2(cx + w / 2)}" y2="${r2(y)}"/></g>` +
    `<polygon points="${r2(cx)},${r2(y - 7)} ${r2(cx + 7)},${r2(y)} ${r2(cx)},${r2(y + 7)} ${r2(cx - 7)},${r2(y)}" fill="${c}"/>`;
  const lotus = (x, y, s, c) => {
    const pet = (len, rot, f) => `<path d="M 0 0 C ${r2(-len * 0.45)} ${r2(-len * 0.35)} ${r2(-len * 0.3)} ${r2(-len * 0.85)} 0 ${r2(-len)} C ${r2(len * 0.3)} ${r2(-len * 0.85)} ${r2(len * 0.45)} ${r2(-len * 0.35)} 0 0 Z" fill="${f}" transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})"/>`;
    return pet(s * 0.7, -72, shade(c, 0.25)) + pet(s * 0.7, 72, shade(c, 0.25)) + pet(s * 0.85, -40, shade(c, 0.1)) + pet(s * 0.85, 40, shade(c, 0.1)) + pet(s, 0, c);
  };
  /* Khối chữ giữa dùng chung: logo – đơn vị – loại sự kiện – tiêu đề – chủ đề – thời gian */
  function centerBlock(p, o) {
    let s = logoSlot(p, 600, o.logoY, o.logoS || 58, { color: o.logoC }) +
      T(p.org, 600, o.orgY, Object.assign({ size: 18, weight: 700, upper: true, ls: 2, maxW: 900 }, o.org)) +
      T(p.kicker, 600 + (o.kick.ls || 0) / 2, o.kickY, Object.assign({ upper: true, maxW: 900 }, o.kick));
    const t = TL(p.title, 600, o.titleY, Object.assign({ maxW: 980 }, o.title), o.lh || 1.2);
    const ys = o.titleY + t.h + (o.subGap || 48);
    s += t.svg + (o.between ? o.between(ys - (o.subGap || 48) / 2 - 4) : '') + T(p.subtitle, 600, ys + (o.between ? 14 : 0), Object.assign({ maxW: 900 }, o.sub)) +
      T(p.info, 600, o.infoY == null ? Math.min(ys + 46, o.infoMax || 540) : o.infoY, Object.assign({ maxW: 900 }, o.info));
    return s;
  }

  /* B53 — Đỏ – vàng hoa sen, trống đồng chìm */
  add({
    id: 'B53', name: 'Hội nghị đỏ – vàng hoa sen', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Hội nghị Ban Chấp hành, đại hội, hội nghị đại biểu, kỷ niệm ngày truyền thống ngành',
    desc: 'Nền đỏ chuyển sẫm, mặt trống đồng lớn chìm sau tiêu đề, ba đóa sen vàng trên dải sóng ở chân – bố cục đối xứng trang nghiêm.',
    fields: STD({ org: 'Đảng bộ Trường Đại học Ánh Dương', kicker: 'Hội nghị', title: 'BAN CHẤP HÀNH ĐẢNG BỘ LẦN THỨ VII\nNHIỆM KỲ 2025 – 2030', subtitle: 'Đoàn kết – Dân chủ – Kỷ cương – Đổi mới – Phát triển', info: 'Hà Nội, ngày 15 tháng 12 năm 2026' }),
    colors: [C('c1', 'Màu đỏ', '#B71C1C'), C('c2', 'Màu vàng', '#F9D16B'), C('c3', 'Màu chữ sáng', '#FFF5D6')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [tint(p.c1, 0.12), shade(p.c1, 0.35)], 0, 1)}${gold(u, 'gd', p.c2)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        drum(600, 255, 330, p.c2, { opacity: 0.13 }) +
        `<rect y="18" width="1200" height="3" fill="${p.c2}"/><rect y="26" width="1200" height="1" fill="${p.c2}" opacity="0.7"/>` +
        `<path d="M 0 565 Q 150 538 300 565 T 600 565 T 900 565 T 1200 565 V 600 H 0 Z" fill="${shade(p.c2, 0.25)}" opacity="0.55"/>` +
        `<path d="M 0 582 Q 150 558 300 582 T 600 582 T 900 582 T 1200 582 V 600 H 0 Z" fill="${shade(p.c2, 0.1)}" opacity="0.7"/>` +
        lotus(600, 572, 92, p.c2) + lotus(445, 580, 62, p.c2) + lotus(755, 580, 62, p.c2) +
        [[330, 586, -150], [870, 586, -30]].map(l => leaf(l[0], l[1], 70, l[2], shade(p.c2, 0.3))).join('');
      s += centerBlock(p, {
        logoY: 72, logoC: p.c2, orgY: 128, org: { fill: p.c3 },
        kickY: 198, kick: { size: 48, weight: 800, fill: `url(#${u}gd)`, ls: 6 },
        titleY: 268, title: { size: 46, weight: 800, fill: p.c3 },
        sub: { size: 24, weight: 500, italic: true, fill: p.c3 }, info: { size: 20, weight: 500, italic: true, fill: p.c2 }, infoMax: 452,
      });
      return s;
    },
  });

  /* B54 — Hội thảo học thuật trắng – xanh */
  add({
    id: 'B54', name: 'Hội thảo học thuật trắng – xanh', styles: ['Trang trọng', 'Tối giản'],
    use: 'Hội thảo khoa học cấp trường – cấp quốc gia, bảo vệ luận án, seminar chuyên đề, hội nghị học thuật',
    desc: 'Nền trắng học thuật, thanh màu navy trên cùng, mạng lưới tri thức mảnh ở góc phải dưới, tiêu đề navy căn giữa với đường phân cách vàng – sạch sẽ, nghiêm túc.',
    fields: multiOrg(STD({ org: 'Trường Đại học Hà Nội\nKhoa Sau đại học', kicker: 'Hội thảo khoa học quốc gia', title: 'NGÔN NGỮ HỌC ỨNG DỤNG\nTRONG BỐI CẢNH CHUYỂN ĐỔI SỐ', subtitle: 'Applied Linguistics in the Digital Transformation Era', info: 'Hà Nội, ngày 28 tháng 11 năm 2026' })),
    colors: [C('c1', 'Màu navy', '#0A3D7A'), C('c2', 'Màu xanh', '#1E88E5'), C('c3', 'Màu vàng nhấn', '#C9A227')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="#ffffff"/><rect width="1200" height="12" fill="${p.c1}"/><rect y="12" width="1200" height="4" fill="${p.c3}"/>` +
        `<circle cx="1120" cy="560" r="230" fill="none" stroke="${p.c2}" stroke-opacity="0.12" stroke-width="2"/><circle cx="1120" cy="560" r="170" fill="none" stroke="${p.c2}" stroke-opacity="0.12" stroke-width="2"/>`;
      const R = rng(54), P = [];
      for (let i = 0; i < 22; i++) P.push([760 + R() * 440, 330 + R() * 270]);
      s += `<g stroke="${p.c2}" stroke-opacity="0.22" stroke-width="1.3">`;
      P.forEach((a, i) => P.map((b, j) => [j, Math.hypot(a[0] - b[0], a[1] - b[1])]).filter(d => d[0] !== i).sort((x, y) => x[1] - y[1]).slice(0, 2)
        .forEach(d => { s += `<line x1="${r2(a[0])}" y1="${r2(a[1])}" x2="${r2(P[d[0]][0])}" y2="${r2(P[d[0]][1])}"/>`; }));
      s += '</g>' + P.map((a, i) => `<circle cx="${r2(a[0])}" cy="${r2(a[1])}" r="${i % 4 ? 3 : 5}" fill="${i % 4 ? p.c2 : p.c3}" opacity="0.5"/>`).join('');
      const org = TL(p.org, 150, 76, { size: 18, weight: 700, fill: p.c1, anchor: 'start', upper: true, ls: 1, maxW: 600 }, 1.35);
      s += logoSlot(p, 98, 86, 70, { color: p.c1 }) + org.svg +
        T(p.kicker, 603, 208, { size: 24, weight: 700, fill: p.c3, upper: true, ls: 6, maxW: 900 });
      const t = TL(p.title, 600, 282, { size: 50, weight: 800, fill: p.c1, maxW: 1000 }, 1.2);
      const ys = 282 + t.h + 34;
      s += t.svg + divider(600, ys, 220, p.c3) +
        T(p.subtitle, 600, ys + 46, { size: 24, weight: 500, italic: true, fill: p.c2, maxW: 900 }) +
        T(p.info, 600, 548, { size: 19, weight: 500, fill: p.c1, maxW: 800 });
      return s;
    },
  });

  /* B55 — Navy – vàng kim khung kép */
  add({
    id: 'B55', name: 'Hội nghị navy – vàng kim khung kép', styles: ['Trang trọng', 'Sang trọng'],
    use: 'Hội nghị thường niên, đại hội cổ đông, hội nghị cấp cao, lễ công bố quyết định, gặp mặt đối tác',
    desc: 'Nền navy sâu với lưới mảnh, khung viền kép nhũ vàng có hoa văn góc, tiêu đề serif nhũ vàng và đường phân cách kim cương – đẳng cấp, trầm tĩnh.',
    fields: STD({ org: 'Tổng công ty Đầu tư Phát triển An Phát', kicker: 'Hội nghị thường niên', title: 'TẦM NHÌN 2030\nVỮNG BƯỚC HỘI NHẬP', subtitle: 'Bản lĩnh – Trí tuệ – Phát triển bền vững', info: 'Ngày 18 tháng 3 năm 2027 • Trung tâm Hội nghị Quốc gia' }),
    colors: [C('c1', 'Màu navy', '#0B1E3F'), C('c2', 'Màu vàng kim', '#D4AF37'), C('c3', 'Màu chữ sáng', '#F5E6B8')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.14), p.c1, shade(p.c1, 0.5)], 0.5, 0.45, 0.8)}${gold(u, 'gd', p.c2)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/><g stroke="${p.c2}" stroke-opacity="0.05">`;
      for (let k = -600; k <= 1800; k += 48) s += `<line x1="${k}" y1="0" x2="${k + 600}" y2="600"/><line x1="${k}" y1="600" x2="${k + 600}" y2="0"/>`;
      s += `</g><rect x="26" y="26" width="1148" height="548" fill="none" stroke="${p.c2}" stroke-width="2.5"/><rect x="38" y="38" width="1124" height="524" fill="none" stroke="${p.c2}" stroke-width="0.8"/>`;
      const orn = `<path d="M 0 70 V 0 H 70" fill="none" stroke="${p.c2}" stroke-width="3"/><path d="M 14 58 Q 14 14 58 14" fill="none" stroke="${p.c2}" stroke-width="1.5"/>` +
        `<circle cx="22" cy="22" r="5" fill="${p.c2}"/><path d="M 30 44 q 6 -14 14 -14" fill="none" stroke="${p.c2}" stroke-width="1.2"/>`;
      [[48, 48, 1, 1], [1152, 48, -1, 1], [48, 552, 1, -1], [1152, 552, -1, -1]].forEach(c => { s += `<g transform="translate(${c[0]} ${c[1]}) scale(${c[2]} ${c[3]})">${orn}</g>`; });
      s += divider(600, 40, 160, p.c2) + centerBlock(p, {
        logoY: 92, logoS: 56, logoC: p.c2, orgY: 148, org: { size: 17, weight: 600, fill: p.c2, ls: 3 },
        kickY: 206, kick: { size: 22, font: 'Montserrat', weight: 600, fill: p.c3, ls: 10 },
        titleY: 290, title: { size: 60, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 920 }, lh: 1.14,
        subGap: 80, between: y => divider(600, y, 240, p.c2),
        sub: { size: 24, weight: 500, italic: true, fill: p.c3 }, infoY: 528, info: { size: 15, font: 'Montserrat', weight: 600, fill: p.c2, upper: true, ls: 2 },
      });
      return s;
    },
  });

  /* B56 — Hội thảo quốc tế xanh ngọc, địa cầu chấm */
  add({
    id: 'B56', name: 'Hội thảo quốc tế – địa cầu chấm', styles: ['Trang trọng', 'Công nghệ'],
    use: 'Hội thảo quốc tế, diễn đàn hợp tác khu vực, hội nghị trực tuyến kết hợp trực tiếp, hội thảo song ngữ',
    desc: 'Nền xanh ngọc sâu, quả địa cầu tạo từ các chấm sáng có đường bay kết nối các châu lục – hiện đại, quốc tế mà vẫn trang trọng.',
    fields: STD({ org: 'Trường Đại học Hà Nội', kicker: 'Hội thảo quốc tế • International Conference', title: 'GIÁO DỤC ĐẠI HỌC\nVÀ HỘI NHẬP TOÀN CẦU', subtitle: 'Higher Education and Global Integration', info: 'Hà Nội, 05 – 06/12/2026 • Hanoi, December 5 – 6, 2026' }),
    colors: [C('c1', 'Màu xanh ngọc đậm', '#004E64'), C('c2', 'Màu xanh sáng', '#00A5CF'), C('c3', 'Màu bạc hà', '#9FFFCB')],
    render(p, u) {
      const cx = 930, cy = 300, R = 225;
      let s = `<defs>${lin(u + 'bg', [tint(p.c1, 0.08), shade(p.c1, 0.45)])}${radial(u + 'gl', [[p.c2, 0, 0.35], [p.c2, 1, 0]], 0.5, 0.5, 0.5)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/><circle cx="${cx}" cy="${cy}" r="${R + 80}" fill="url(#${u}gl)"/>`;
      for (let lat = -80; lat <= 80; lat += 8) for (let lon = -88; lon <= 88; lon += 7) {
        const d = Math.cos(rad(lat)) * Math.cos(rad(lon));
        if (d < 0.05) continue;
        s += `<circle cx="${r2(cx + R * Math.cos(rad(lat)) * Math.sin(rad(lon)))}" cy="${r2(cy - R * Math.sin(rad(lat)))}" r="${r2(1 + d * 2.2)}" fill="${(lat + lon) % 3 ? p.c2 : p.c3}" opacity="${r2(0.25 + d * 0.6)}"/>`;
      }
      const pts = [[-30, 40], [10, -20], [45, 30], [-60, -10], [20, 55], [60, -40]].map(q => [cx + R * Math.cos(rad(q[0])) * Math.sin(rad(q[1])), cy - R * Math.sin(rad(q[0]))]);
      [[0, 1], [1, 2], [2, 4], [3, 1], [5, 2], [0, 4]].forEach(e => {
        const a = pts[e[0]], b = pts[e[1]], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - 60;
        s += `<path d="M ${r2(a[0])} ${r2(a[1])} Q ${r2(mx)} ${r2(my)} ${r2(b[0])} ${r2(b[1])}" fill="none" stroke="${p.c3}" stroke-opacity="0.7" stroke-width="1.6"/>`;
      });
      s += pts.map(q => `<circle cx="${r2(q[0])}" cy="${r2(q[1])}" r="5" fill="${p.c3}"/><circle cx="${r2(q[0])}" cy="${r2(q[1])}" r="11" fill="none" stroke="${p.c3}" stroke-opacity="0.5"/>`).join('') +
        `<ellipse cx="${cx}" cy="${cy}" rx="${R + 40}" ry="70" fill="none" stroke="${p.c2}" stroke-opacity="0.35" stroke-width="1.5" transform="rotate(-18 ${cx} ${cy})"/>` +
        logoSlot(p, 126, 88, 62) +
        T(p.org, 172, 96, { size: 18, weight: 700, anchor: 'start', upper: true, ls: 1, maxW: 520 }) +
        T(p.kicker, 92, 196, { size: 19, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 3, maxW: 580 });
      const t = TL(p.title, 88, 278, { size: 52, weight: 800, anchor: 'start', maxW: 600 }, 1.18);
      const ys = 278 + t.h + 52;
      s += t.svg + T(p.subtitle, 92, ys, { size: 25, font: 'Playfair Display', weight: 400, italic: true, fill: tint(p.c2, 0.35), anchor: 'start', maxW: 580 }) +
        `<line x1="92" y1="${r2(Math.min(ys + 44, 500))}" x2="152" y2="${r2(Math.min(ys + 44, 500))}" stroke="${p.c3}" stroke-width="3"/>` +
        T(p.info, 92, 545, { size: 17, weight: 500, anchor: 'start', maxW: 620, attrs: 'fill-opacity="0.88"' });
      return s;
    },
  });

  /* B57 — Mảng chéo đỏ đô – vàng, nền sáng */
  add({
    id: 'B57', name: 'Hội nghị mảng chéo đỏ đô', styles: ['Trang trọng', 'Hiện đại'],
    use: 'Hội nghị chuyên đề, hội nghị khách hàng doanh nghiệp, hội nghị ngành, đối thoại chính sách',
    desc: 'Nền sáng màu ngà, mảng chéo đỏ đô có chỉ vàng bên phải chứa logo, chữ tiêu đề đỏ đô căn trái – chuyên nghiệp kiểu doanh nghiệp lớn.',
    fields: STD({ org: 'Hiệp hội Doanh nghiệp Hà Nội', kicker: 'Hội nghị chuyên đề', title: 'ĐỐI THOẠI CHÍNH SÁCH\nTHUẾ VÀ HẢI QUAN 2027', subtitle: 'Đồng hành cùng doanh nghiệp vượt thách thức', info: 'Thứ Năm, 14.01.2027 • Khách sạn Melia Hà Nội' }),
    colors: [C('c1', 'Màu đỏ đô', '#7B1E3A'), C('c2', 'Màu vàng', '#C9A227'), C('c3', 'Màu nền ngà', '#F7F5F2')],
    render(p, u) {
      let s = `<defs>${lin(u + 'rd', [tint(p.c1, 0.12), shade(p.c1, 0.35)])}</defs><rect width="1200" height="600" fill="${p.c3}"/>` +
        `<polygon points="770,0 1200,0 1200,600 630,600" fill="url(#${u}rd)"/><polygon points="730,0 756,0 616,600 590,600" fill="${p.c2}"/>` +
        `<circle cx="1010" cy="330" r="190" fill="none" stroke="${p.c2}" stroke-opacity="0.35" stroke-width="1.5"/><circle cx="1010" cy="330" r="150" fill="none" stroke="${p.c2}" stroke-opacity="0.2" stroke-width="1"/>` +
        drum(1010, 330, 140, p.c2, { opacity: 0.12 }) +
        logoSlot(p, 1010, 330, 150, { color: '#ffffff' }) +
        `<rect x="92" y="80" width="60" height="5" fill="${p.c2}"/>` +
        T(p.org, 92, 120, { size: 18, weight: 700, fill: p.c1, anchor: 'start', upper: true, ls: 2, maxW: 500 }) +
        T(p.kicker, 92, 196, { size: 22, weight: 800, fill: shade(p.c2, 0.2), anchor: 'start', upper: true, ls: 4, maxW: 500 });
      const t = TL(p.title, 88, 278, { size: 54, weight: 800, fill: p.c1, anchor: 'start', maxW: 520 }, 1.18);
      const ys = 278 + t.h + 50;
      s += t.svg + T(p.subtitle, 92, ys, { size: 22, weight: 500, fill: '#55505a', anchor: 'start', maxW: 500 }) +
        `<line x1="92" y1="505" x2="540" y2="505" stroke="${p.c1}" stroke-opacity="0.35"/>` +
        T(p.info, 92, 540, { size: 18, weight: 600, fill: p.c1, anchor: 'start', maxW: 470 });
      return s;
    },
  });

  /* B58 — Diễn đàn, tia sáng sân khấu */
  add({
    id: 'B58', name: 'Diễn đàn – tia sáng sân khấu', styles: ['Trang trọng', 'Hiện đại'],
    use: 'Diễn đàn kinh tế, diễn đàn thanh niên, hội nghị toàn quốc, lễ phát động, sự kiện chiếu màn LED lớn',
    desc: 'Nền xanh đêm với chùm tia sáng từ trên cao, dải đèn phối cảnh dưới sàn sân khấu – chữ DIỄN ĐÀN rất lớn, giãn rộng, uy nghi.',
    fields: STD({ org: 'Bộ Khoa học và Công nghệ', kicker: 'Diễn đàn', title: 'ĐỔI MỚI SÁNG TẠO QUỐC GIA 2026', subtitle: 'Khơi thông nguồn lực – Bứt phá tăng trưởng', info: 'Hà Nội, ngày 08 tháng 12 năm 2026' }),
    colors: [C('c1', 'Màu nền đêm', '#020B2D'), C('c2', 'Màu xanh điện', '#1F6FEB'), C('c3', 'Màu xanh sáng', '#7CC4FF')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c1, mix(p.c1, p.c2, 0.38)], 0, 1)}${radial(u + 'st', [[p.c2, 0, 0.6], [p.c2, 1, 0]], 0.5, 0.5, 0.5)}` +
        `${lin(u + 'tx', ['#ffffff', p.c3], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      for (let i = 0; i < 9; i++) {
        const x = 600 + (i - 4) * 140;
        s += `<polygon points="${600 + (i - 4) * 8},-10 ${x - 40},600 ${x + 40},600" fill="#ffffff" opacity="${r2(0.03 + (i % 3) * 0.015)}"/>`;
      }
      s += `<ellipse cx="600" cy="620" rx="640" ry="150" fill="url(#${u}st)"/><g stroke="${p.c3}" stroke-opacity="0.35">`;
      for (let i = 1; i <= 6; i++) { const y = 500 + i * i * 2.6; s += `<line x1="0" y1="${r2(y)}" x2="1200" y2="${r2(y)}"/>`; }
      for (let xb = -600; xb <= 1800; xb += 120) s += `<line x1="${r2(600 + (xb - 600) * 0.15)}" y1="500" x2="${xb}" y2="600"/>`;
      s += '</g>';
      const R = rng(58);
      for (let i = 0; i < 50; i++) s += `<circle cx="${r2(R() * 1200)}" cy="${r2(R() * 480)}" r="${r2(0.6 + R() * 1.4)}" fill="#fff" opacity="${r2(0.2 + R() * 0.5)}"/>`;
      s += centerBlock(p, {
        logoY: 68, logoS: 54, orgY: 122, org: { size: 17, weight: 600, ls: 3, attrs: 'fill-opacity="0.88"' },
        kickY: 214, kick: { size: 72, weight: 900, fill: `url(#${u}tx)`, ls: 16 },
        titleY: 292, title: { size: 44, weight: 800 },
        sub: { size: 24, weight: 500, italic: true, fill: p.c3 }, infoMax: 468, info: { size: 18, weight: 500, ls: 1, attrs: 'fill-opacity="0.88"' },
      });
      return s;
    },
  });

  /* B59 — Hội nghị khoa học trẻ, vòng phân tử */
  add({
    id: 'B59', name: 'Hội nghị khoa học trẻ – phân tử', styles: ['Trang trọng', 'Công nghệ'],
    use: 'Hội nghị sinh viên nghiên cứu khoa học, hội nghị khoa học trẻ, hội thảo hóa – sinh – y dược, giải thưởng sáng tạo',
    desc: 'Nền trắng xanh nhạt, chuỗi vòng phân tử lục giác với các nút vàng bên phải, chữ navy căn trái – khoa học, chỉn chu.',
    fields: STD({ org: 'Trường Đại học Ánh Dương', kicker: 'Hội nghị sinh viên nghiên cứu khoa học', title: 'KHOA HỌC TRẺ\nKIẾN TẠO TƯƠNG LAI', subtitle: 'Năm học 2026 – 2027', info: 'Ngày 22 tháng 4 năm 2027 • Hội trường A' }),
    colors: [C('c1', 'Màu navy', '#0B3954'), C('c2', 'Màu xanh', '#3FA7D6'), C('c3', 'Màu vàng', '#F2C14E')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', ['#FFFFFF', '#E6F2F9'])}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<circle cx="960" cy="300" r="250" fill="${tint(p.c2, 0.88)}"/>`;
      const a = 58, rings = [[850, 205], [951, 205], [900.5, 292], [1001.5, 292], [951, 379]];
      rings.forEach((c, i) => {
        s += `<polygon points="${starPts(c[0], c[1], a, a, 3, -90)}" fill="none" stroke="${p.c1}" stroke-width="3.5" stroke-linejoin="round"/>`;
        if (i % 2 === 0) s += `<polygon points="${starPts(c[0], c[1], a * 0.7, a * 0.7, 3, -90)}" fill="none" stroke="${p.c2}" stroke-width="2"/>`;
      });
      const vs = new Set(); rings.forEach(c => { for (let k = 0; k < 6; k++) { const ag = rad(-90 + k * 60); vs.add(`${r2(c[0] + a * Math.cos(ag))},${r2(c[1] + a * Math.sin(ag))}`); } });
      vs.forEach(v => { const [x, y] = v.split(','); s += `<circle cx="${x}" cy="${y}" r="6" fill="${p.c3}" stroke="${p.c1}" stroke-width="2"/>`; });
      [[850, 147, 850, 95], [1001.5, 350, 1060, 383], [951, 437, 951, 490], [799, 234, 745, 205]].forEach(b => {
        s += `<line x1="${b[0]}" y1="${b[1]}" x2="${b[2]}" y2="${b[3]}" stroke="${p.c1}" stroke-width="3"/><circle cx="${b[2]}" cy="${b[3]}" r="10" fill="${p.c2}"/>`;
      });
      s += logoSlot(p, 126, 88, 64, { color: p.c1 }) +
        T(p.org, 172, 96, { size: 18, weight: 700, fill: p.c1, anchor: 'start', upper: true, ls: 1, maxW: 480 }) +
        T(p.kicker, 92, 198, { size: 20, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 2, maxW: 560 });
      const t = TL(p.title, 88, 286, { size: 66, weight: 900, fill: p.c1, anchor: 'start', maxW: 580 }, 1.08);
      const ys = 286 + t.h + 52;
      s += t.svg + T(p.subtitle, 92, ys, { size: 24, weight: 600, fill: shade(p.c3, 0.3), anchor: 'start', maxW: 560 }) +
        `<rect x="92" y="505" width="6" height="44" fill="${p.c3}"/>` +
        T(p.info, 112, 534, { size: 18, weight: 600, fill: p.c1, anchor: 'start', maxW: 560 });
      return s;
    },
  });

  /* B60 — Đỏ mận – kem cổ điển */
  add({
    id: 'B60', name: 'Hội nghị đỏ mận – kem cổ điển', styles: ['Trang trọng', 'Cổ điển'],
    use: 'Hội nghị tổng kết, hội nghị cán bộ – viên chức, lễ kỷ niệm, hội thảo văn hóa – lịch sử',
    desc: 'Nền kem ấm với hai dải đỏ mận viền chỉ vàng trên – dưới, chuỗi hoa văn kim cương, chữ serif đỏ mận căn giữa – cổ điển, thanh lịch.',
    fields: STD({ org: 'Viện Nghiên cứu Văn hóa Việt Nam', kicker: 'Hội nghị cán bộ, viên chức', title: 'NĂM 2027\nĐỔI MỚI – HIỆU QUẢ – PHÁT TRIỂN', subtitle: 'Kế thừa tinh hoa – Lan tỏa giá trị', info: 'Hà Nội, ngày 20 tháng 01 năm 2027' }),
    colors: [C('c1', 'Màu đỏ mận', '#6D1A36'), C('c2', 'Màu vàng đồng', '#B8860B'), C('c3', 'Màu nền kem', '#FBF6EE')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="${p.c3}"/><rect width="1200" height="64" fill="${p.c1}"/><rect y="536" width="1200" height="64" fill="${p.c1}"/>` +
        `<g stroke="${p.c2}"><line x1="0" y1="70" x2="1200" y2="70" stroke-width="2"/><line x1="0" y1="76" x2="1200" y2="76" stroke-width="0.8"/>` +
        `<line x1="0" y1="530" x2="1200" y2="530" stroke-width="2"/><line x1="0" y1="524" x2="1200" y2="524" stroke-width="0.8"/></g><g fill="${p.c2}" opacity="0.75">`;
      for (let x = 20; x < 1200; x += 40) s += `<polygon points="${x},24 ${x + 8},32 ${x},40 ${x - 8},32"/><circle cx="${x + 20}" cy="32" r="2.5"/>`;
      s += '</g>' + logoSlot(p, 600, 126, 56, { color: p.c1 }) +
        T(p.org, 600, 182, { size: 17, weight: 700, fill: p.c1, upper: true, ls: 3, maxW: 900 }) +
        divider(600, 208, 160, p.c2) +
        T(p.kicker, 605, 250, { size: 22, font: 'Montserrat', weight: 700, fill: p.c2, upper: true, ls: 8, maxW: 900 });
      const t = TL(p.title, 600, 322, { size: 54, font: 'Playfair Display', weight: 800, fill: p.c1, maxW: 960 }, 1.16);
      const ys = 322 + t.h + 50;
      s += t.svg + T(p.subtitle, 600, Math.min(ys, 470), { size: 30, font: 'Cormorant Garamond', weight: 600, italic: true, fill: '#5A4A42', maxW: 900 }) +
        T(p.info, 600, 576, { size: 15, font: 'Montserrat', weight: 600, fill: p.c3, upper: true, ls: 3, maxW: 900 });
      return s;
    },
  });

  /* B61 — Hội thảo giáo dục lục bảo – vàng, sách & nguyệt quế */
  add({
    id: 'B61', name: 'Hội thảo giáo dục lục bảo – sách mở', styles: ['Trang trọng', 'Sang trọng'],
    use: 'Hội thảo giáo dục, hội nghị hiệu trưởng, tổng kết năm học, lễ tôn vinh nhà giáo, hội đồng khoa học',
    desc: 'Nền lục bảo sâu, biểu tượng sách mở trong vòng nguyệt quế vàng ở trên cùng – trí tuệ, uy tín, rất hợp ngành giáo dục.',
    fields: STD({ org: 'Sở Giáo dục và Đào tạo', kicker: 'Hội thảo khoa học', title: 'ĐỔI MỚI PHƯƠNG PHÁP DẠY HỌC\nTHEO CHƯƠNG TRÌNH GIÁO DỤC PHỔ THÔNG 2018', subtitle: 'Giáo dục toàn diện – Phát triển năng lực người học', info: 'Ngày 12 tháng 12 năm 2026' }),
    colors: [C('c1', 'Màu lục bảo', '#0F4C3A'), C('c2', 'Màu vàng', '#E0B84C'), C('c3', 'Màu chữ sáng', '#F4F1E8')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.14), p.c1, shade(p.c1, 0.5)], 0.5, 0.3, 0.85)}${gold(u, 'gd', p.c2)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        `<circle cx="600" cy="300" r="420" fill="none" stroke="${p.c2}" stroke-opacity="0.06" stroke-width="60"/><circle cx="600" cy="300" r="560" fill="none" stroke="${p.c2}" stroke-opacity="0.04" stroke-width="40"/>` +
        laurel(600, 112, 74, p.c2, { from: 95, to: 225, n: 7 }) +
        `<g fill="none" stroke="${p.c2}" stroke-width="3" stroke-linejoin="round"><path d="M 600 138 C 580 124 556 122 536 128 V 84 C 556 78 580 80 600 94 Z"/><path d="M 600 138 C 620 124 644 122 664 128 V 84 C 644 78 620 80 600 94 Z"/></g>` +
        `<g stroke="${p.c2}" stroke-width="1.5" opacity="0.8"><line x1="548" y1="96" x2="588" y2="104"/><line x1="548" y1="108" x2="588" y2="116"/><line x1="652" y1="96" x2="612" y2="104"/><line x1="652" y1="108" x2="612" y2="116"/></g>` +
        star(600, 62, 9, p.c2) +
        logoSlot(p, 100, 80, 58, { color: p.c2 }) +
        T(p.org, 142, 87, { size: 16, weight: 600, fill: p.c2, anchor: 'start', upper: true, ls: 1, maxW: 360 }) +
        T(p.kicker, 606, 220, { size: 26, weight: 700, fill: `url(#${u}gd)`, upper: true, ls: 8, maxW: 800 });
      const t = TL(p.title, 600, 292, { size: 44, weight: 800, fill: p.c3, maxW: 1000 }, 1.22);
      const ys = 292 + t.h + 34;
      s += t.svg + divider(600, ys, 200, p.c2) +
        T(p.subtitle, 600, ys + 44, { size: 23, weight: 500, italic: true, fill: p.c3, maxW: 900 }) +
        T(p.info, 600, 545, { size: 19, weight: 500, fill: p.c2, maxW: 800 });
      return s;
    },
  });

  /* B62 — Trống đồng toàn nền nâu đỏ */
  add({
    id: 'B62', name: 'Hội nghị trống đồng nâu son', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Hội nghị cấp tỉnh – thành, đại hội thi đua yêu nước, kỷ niệm ngày thành lập ngành, lễ đón nhận huân chương',
    desc: 'Nền nâu son sâu, mặt trống đồng Đông Sơn phủ kín phía sau tiêu đề, mây tường vân bốn góc và khung chỉ vàng – trang nghiêm, đậm bản sắc.',
    fields: STD({ org: 'Ủy ban nhân dân tỉnh Hòa An', kicker: 'Đại hội thi đua yêu nước', title: 'LẦN THỨ VI\nGIAI ĐOẠN 2025 – 2030', subtitle: 'Thi đua đổi mới sáng tạo, xây dựng quê hương giàu đẹp', info: 'Hòa An, ngày 25 tháng 11 năm 2026' }),
    colors: [C('c1', 'Màu nâu son', '#5C1A1B'), C('c2', 'Màu vàng', '#E3B04B'), C('c3', 'Màu chữ sáng', '#FFF1D0')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.2), p.c1, shade(p.c1, 0.5)], 0.5, 0.5, 0.75)}${gold(u, 'gd', p.c2)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        drum(600, 300, 430, p.c2, { opacity: 0.15 }) +
        `<rect x="24" y="24" width="1152" height="552" fill="none" stroke="${p.c2}" stroke-width="2"/><rect x="34" y="34" width="1132" height="532" fill="none" stroke="${p.c2}" stroke-width="0.8" opacity="0.7"/>`;
      [[64, 92, 1], [1136, 92, -1], [64, 538, 1], [1136, 538, -1]].forEach(c => {
        s += `<path d="${cloud}" fill="${p.c2}" fill-opacity="0.3" stroke="${p.c2}" stroke-width="1.2" transform="translate(${c[0]} ${c[1]}) scale(${2.4 * c[2]} 2.4)"/>`;
      });
      s += centerBlock(p, {
        logoY: 82, logoS: 58, logoC: p.c2, orgY: 140, org: { fill: p.c3 },
        kickY: 214, kick: { size: 46, weight: 900, fill: `url(#${u}gd)`, ls: 3 },
        titleY: 290, title: { size: 50, weight: 800, fill: p.c3, maxW: 940 },
        sub: { size: 24, weight: 500, italic: true, fill: p.c3 }, infoY: 530, info: { size: 20, weight: 500, italic: true, fill: p.c2 },
      });
      return s;
    },
  });

  /* B63 — Bảng chia đôi: cột navy trái + nội dung trắng phải */
  add({
    id: 'B63', name: 'Hội thảo bảng chia cột navy', styles: ['Trang trọng', 'Tối giản'],
    use: 'Hội thảo chuyên đề, tọa đàm khoa học, hội nghị nội bộ, sinh hoạt học thuật định kỳ, seminar',
    desc: 'Cột navy bên trái chứa logo, tên đơn vị và thời gian; phần trắng bên phải là tiêu đề lớn căn trái với điểm nhấn vàng cam – rõ ràng, dễ đọc từ xa.',
    fields: multiOrg(STD({ org: 'Viện Kinh tế\nvà Quản lý', kicker: 'Hội thảo chuyên đề', title: 'KINH TẾ SỐ\nVÀ NĂNG SUẤT LAO ĐỘNG', subtitle: 'Cơ hội và thách thức đối với doanh nghiệp vừa và nhỏ', info: '14:00 • 05.11.2026 • Phòng 501, nhà A' })),
    colors: [C('c1', 'Màu navy', '#14213D'), C('c2', 'Màu vàng cam', '#FCA311'), C('c3', 'Màu nền', '#FFFFFF')],
    render(p) {
      let s = `<rect width="1200" height="600" fill="${p.c3}"/><g stroke="${p.c1}" stroke-opacity="0.05" stroke-width="18">`;
      for (let i = 0; i < 8; i++) s += `<line x1="${900 + i * 50}" y1="600" x2="${1200 + i * 50}" y2="300"/>`;
      s += `</g><rect width="360" height="600" fill="${p.c1}"/><rect x="360" width="12" height="600" fill="${p.c2}"/>` +
        `<rect x="1100" y="70" width="30" height="30" fill="${p.c2}"/><rect x="1140" y="70" width="14" height="14" fill="${p.c1}"/>` +
        logoSlot(p, 180, 150, 120);
      const org = TL(p.org, 180, 268, { size: 19, weight: 700, upper: true, ls: 1, maxW: 290 }, 1.3);
      s += org.svg + `<line x1="140" y1="${r2(300 + org.h)}" x2="220" y2="${r2(300 + org.h)}" stroke="${p.c2}" stroke-width="3"/>` +
        T(p.info, 180, 520, { size: 15, weight: 600, maxW: 300, attrs: 'fill-opacity="0.9"' }) +
        T(p.kicker, 432, 190, { size: 22, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 6, maxW: 680 });
      const t = TL(p.title, 428, 280, { size: 62, weight: 900, fill: p.c1, anchor: 'start', maxW: 700 }, 1.12);
      s += t.svg + T(p.subtitle, 432, 280 + t.h + 56, { size: 24, weight: 500, fill: '#475569', anchor: 'start', maxW: 680 });
      return s;
    },
  });

  /* B64 — Xúc tiến đầu tư, đường chân trời nét vàng */
  add({
    id: 'B64', name: 'Hội nghị xúc tiến đầu tư', styles: ['Trang trọng', 'Sang trọng'],
    use: 'Hội nghị xúc tiến đầu tư, công bố quy hoạch, diễn đàn kinh tế địa phương, hội nghị bất động sản – hạ tầng',
    desc: 'Nền navy với đường chân trời thành phố vẽ nét vàng kim, ánh phản chiếu mặt nước bên dưới – thịnh vượng, tầm nhìn, đáng tin cậy.',
    fields: STD({ org: 'Ủy ban nhân dân tỉnh Hòa An', kicker: 'Hội nghị xúc tiến đầu tư', title: 'HÒA AN 2030\nĐIỂM ĐẾN CỦA KỶ NGUYÊN MỚI', subtitle: 'Kết nối – Hợp tác – Thịnh vượng', info: 'Ngày 10 tháng 3 năm 2027 • Trung tâm Hội nghị tỉnh' }),
    colors: [C('c1', 'Màu navy', '#0A1931'), C('c2', 'Màu vàng kim', '#C9A227'), C('c3', 'Màu chữ sáng', '#E8EEF7')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [tint(p.c1, 0.1), shade(p.c1, 0.4)], 0, 1)}${gold(u, 'gd', p.c2)}${radial(u + 'gl', [[p.c2, 0, 0.3], [p.c2, 1, 0]], 0.5, 0.5, 0.5)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/><ellipse cx="600" cy="560" rx="620" ry="120" fill="url(#${u}gl)"/>`;
      const R = rng(64); let x = -10, g = '', refl = '';
      while (x < 1210) {
        const w = 40 + R() * 60, h = 30 + R() * 85, y = 540 - h;
        g += `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w - 6)}" height="${r2(h)}"/>`;
        if (R() < 0.3) g += `<polyline points="${r2(x + (w - 6) / 2 - 8)},${r2(y)} ${r2(x + (w - 6) / 2)},${r2(y - 26)} ${r2(x + (w - 6) / 2 + 8)},${r2(y)}"/>`;
        for (let wy = y + 10; wy < 532; wy += 16) for (let wx = x + 7; wx < x + w - 14; wx += 12) if (R() < 0.35) g += `<rect x="${r2(wx)}" y="${r2(wy)}" width="3" height="5" fill="${p.c2}" stroke="none" opacity="0.6"/>`;
        refl += `<rect x="${r2(x)}" y="546" width="${r2(w - 6)}" height="${r2(h * 0.35)}"/>`;
        x += w;
      }
      s += `<g fill="none" stroke="${p.c2}" stroke-width="1.4" opacity="0.75">${g}</g><line x1="0" y1="542" x2="1200" y2="542" stroke="${p.c2}" stroke-width="2"/>` +
        `<g fill="none" stroke="${p.c2}" stroke-width="1" opacity="0.18">${refl}</g>`;
      for (let i = 0; i < 18; i++) s += sparkle(40 + R() * 1120, 30 + R() * 260, 2 + R() * 4, tint(p.c2, 0.5), 0.35 + R() * 0.4);
      s += centerBlock(p, {
        logoY: 66, logoS: 54, logoC: p.c2, orgY: 120, org: { size: 17, weight: 600, fill: p.c2, ls: 3 },
        kickY: 182, kick: { size: 26, weight: 800, fill: p.c3, ls: 4 },
        titleY: 258, title: { size: 50, weight: 800, fill: `url(#${u}gd)`, maxW: 980 }, lh: 1.18,
        sub: { size: 24, weight: 500, italic: true, fill: p.c3 }, infoMax: 404, info: { size: 18, weight: 600, fill: p.c2, ls: 1 },
      });
      return s;
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
