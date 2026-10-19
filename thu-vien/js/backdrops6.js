/* =========================================================================
 * backdrops6.js — 12 mẫu chủ đề chính trị – lịch sử – văn hóa (B65 – B76)
 * Các mốc "kỷ niệm … năm" tính theo lần kỷ niệm sắp tới; sửa lại theo năm tổ chức.
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, TL, star, starPts, laurel, flower, leaf, mix, shade, tint, textW, fitSize, rng, r2, rad, logoSlot, photoSlot, drum } = root.BL;
  const { F, C, STD, lin, radial, sparkle } = root.BL.bd;
  const { person } = root.BL.bd2;
  const S = root.BL.sym;
  const add = t => root.BL.templates.push(Object.assign({ type: 'backdrop', w: 1200, h: 600, topic: 'Chính trị – lịch sử' }, t));
  const gold = (u, id, c) => lin(u + id, [[tint(c, 0.75), 0], [c, 0.5], [shade(c, 0.2), 1]], 0, 1);
  const divider = (cx, y, w, c) => `<g stroke="${c}" stroke-width="1.4"><line x1="${r2(cx - w / 2)}" y1="${r2(y)}" x2="${r2(cx - 10)}" y2="${r2(y)}"/><line x1="${r2(cx + 10)}" y1="${r2(y)}" x2="${r2(cx + w / 2)}" y2="${r2(y)}"/></g>` +
    `<polygon points="${r2(cx)},${r2(y - 7)} ${r2(cx + 7)},${r2(y)} ${r2(cx)},${r2(y + 7)} ${r2(cx - 7)},${r2(y)}" fill="${c}"/>`;
  const rays = (cx, cy, c, op, a0, a1, n) => {
    let s = ''; const st = (a1 - a0) / n;
    for (let i = 0; i < n; i += 2) {
      const p1 = rad(a0 + i * st), p2 = rad(a0 + (i + 1) * st);
      s += `<polygon points="${r2(cx)},${r2(cy)} ${r2(cx + 1500 * Math.cos(p1))},${r2(cy + 1500 * Math.sin(p1))} ${r2(cx + 1500 * Math.cos(p2))},${r2(cy + 1500 * Math.sin(p2))}" fill="${c}" opacity="${op}"/>`;
    }
    return s;
  };
  const frame = c => `<rect x="22" y="22" width="1156" height="556" fill="none" stroke="${c}" stroke-width="2"/><rect x="32" y="32" width="1136" height="536" fill="none" stroke="${c}" stroke-width="0.8" opacity="0.7"/>`;
  const redBg = (u, c) => `<defs>${radial(u + 'bg', [tint(c, 0.15), c, shade(c, 0.4)], 0.5, 0.35, 0.85)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;

  /* B65 — Mừng Đảng, mừng Xuân */
  add({
    id: 'B65', name: 'Mừng Đảng – mừng Xuân', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Kỷ niệm ngày thành lập Đảng Cộng sản Việt Nam 3/2, gặp mặt đầu xuân, văn nghệ mừng Đảng',
    desc: 'Nền đỏ với tia nắng vàng, cờ Đảng và cờ Tổ quốc tung bay hai góc trên, cành mai vàng hai góc dưới và trống đồng chìm – trang trọng, rộn ràng sắc xuân.',
    fields: STD({ org: 'Đảng bộ Trường Đại học Ánh Dương', kicker: 'Mừng Đảng quang vinh – Mừng Xuân Đinh Mùi', title: 'KỶ NIỆM 97 NĂM NGÀY THÀNH LẬP\nĐẢNG CỘNG SẢN VIỆT NAM', subtitle: '(03/02/1930 – 03/02/2027)', info: 'Hà Nội, tháng 02 năm 2027' }),
    colors: [C('c1', 'Màu đỏ', '#C8102E'), C('c2', 'Màu vàng', '#F9D16B'), C('c3', 'Màu chữ sáng', '#FFF5D6')],
    render(p, u) {
      let s = redBg(u, p.c1) + `<defs>${gold(u, 'gd', p.c2)}</defs>` + rays(600, -60, p.c2, 0.06, 20, 160, 28) + drum(600, 790, 430, p.c2, { opacity: 0.18 }) +
        S.flagOnPole(56, 46, 290, 230, 150, 'dang', 1, p.c2) + S.flagOnPole(1144, 46, 290, 230, 150, 'vn', -1, p.c2);
      let br = `<g fill="none" stroke="#5D3A1A" stroke-linecap="round"><path d="M -20 60 C 120 80 200 40 300 110 C 360 150 380 140 430 130" stroke-width="9"/><path d="M 150 70 C 170 120 160 160 190 200" stroke-width="5"/><path d="M 300 110 C 290 160 320 190 300 230" stroke-width="4"/></g>`;
      [[60, 62, 16], [140, 72, 20], [190, 200, 14], [240, 82, 18], [300, 110, 20], [300, 230, 13], [362, 146, 15], [430, 130, 17], [166, 140, 12]].forEach((f, i) => { br += flower(f[0], f[1], f[2], '#FFC93C', '#E8740C', { n: 5, rot: i * 13 }); });
      s += `<g transform="translate(0 600) scale(0.7 -0.7)">${br}</g><g transform="translate(1200 600) scale(-0.7 -0.7)">${br}</g>` +
        logoSlot(p, 600, 70, 54, { color: p.c2 }) +
        T(p.org, 600, 124, { size: 18, weight: 700, fill: p.c3, upper: true, ls: 2, maxW: 560 }) +
        T(p.kicker, 600, 196, { size: 24, weight: 700, fill: p.c2, upper: true, ls: 3, maxW: 600 });
      const t = TL(p.title, 600, 272, { size: 50, weight: 900, fill: `url(#${u}gd)`, maxW: 780 }, 1.2);
      const ys = 272 + t.h + 52;
      s += t.svg + T(p.subtitle, 600, ys, { size: 26, weight: 600, italic: true, fill: p.c3, maxW: 700 }) +
        T(p.info, 600, Math.min(ys + 48, 470), { size: 20, weight: 500, italic: true, fill: p.c2, maxW: 700 });
      return s;
    },
  });

  /* B66 — Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh */
  add({
    id: 'B66', name: 'Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh', styles: ['Trang trọng', 'Truyền thống'], photo: 'Ảnh chân dung Chủ tịch Hồ Chí Minh',
    use: 'Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh 19/5, lễ dâng hương, hội thi tìm hiểu về Bác, chương trình văn nghệ',
    desc: 'Khung ảnh chân dung bầu dục viền nhũ vàng (tải ảnh chính thức lên) với tia sáng tỏa và cụm hoa sen dưới chân; tiêu đề trang nghiêm ở cột phải.',
    fields: STD({ org: 'Trường Đại học Ánh Dương', kicker: 'Kỷ niệm 137 năm ngày sinh', title: 'CHỦ TỊCH\nHỒ CHÍ MINH', subtitle: '(19/5/1890 – 19/5/2027)', info: '“Không có gì quý hơn độc lập, tự do”' }),
    colors: [C('c1', 'Màu đỏ', '#B71C1C'), C('c2', 'Màu vàng', '#F2C14E'), C('c3', 'Màu chữ sáng', '#FFF5D6'), C('c4', 'Màu hoa sen', '#F48FB1')],
    render(p, u) {
      const px = 310, py = 280;
      let s = redBg(u, p.c1) + `<defs>${gold(u, 'gd', p.c2)}</defs>` + rays(px, py, p.c2, 0.07, 0, 360, 48) + frame(p.c2) +
        `<circle cx="${px}" cy="${py}" r="215" fill="${p.c2}" opacity="0.08"/>` +
        photoSlot(p, px, py, 270, 350, { shape: 'oval', color: p.c2, id: u + 'pf', label: 'ẢNH CHÂN DUNG\nCHỦ TỊCH HỒ CHÍ MINH' }) +
        S.lotus(px, 520, 78, p.c4, '#4C8C4A') + S.lotus(px - 105, 532, 50, p.c4) + S.lotus(px + 105, 532, 50, p.c4) +
        leaf(px - 160, 540, 70, -160, '#4C8C4A') + leaf(px + 160, 540, 70, -20, '#4C8C4A') +
        S.langBac(880, 560, 360, p.c2).replace('<g ', '<g opacity="0.14" ') +
        logoSlot(p, 840, 80, 52, { color: p.c2 }) +
        T(p.org, 840, 132, { size: 17, weight: 700, fill: p.c3, upper: true, ls: 2, maxW: 560 }) +
        T(p.kicker, 840, 208, { size: 28, weight: 800, fill: p.c3, upper: true, ls: 3, maxW: 580 });
      const t = TL(p.title, 840, 292, { size: 68, weight: 900, fill: `url(#${u}gd)`, maxW: 580 }, 1.1);
      const ys = 292 + t.h + 56;
      s += t.svg + T(p.subtitle, 840, ys, { size: 26, weight: 600, italic: true, fill: p.c3, maxW: 560 }) +
        divider(840, ys + 34, 220, p.c2) +
        T(p.info, 840, ys + 78, { size: 26, font: 'Playfair Display', weight: 700, italic: true, fill: p.c2, maxW: 560 });
      return s;
    },
  });

  /* B67 — Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh */
  add({
    id: 'B67', name: 'Học tập và làm theo Bác', styles: ['Trang trọng', 'Tối giản'], photo: 'Ảnh chân dung Chủ tịch Hồ Chí Minh',
    use: 'Hội nghị học tập chuyên đề, sơ kết – tổng kết Chỉ thị 05, sinh hoạt chính trị, tuyên dương điển hình',
    desc: 'Nền kem ấm, khung ảnh vòm nhũ vàng bên phải (tải ảnh lên), nhà sàn Bác chìm, hoa sen góc trái và dải lụa đỏ – vàng dưới chân – trang trọng, gần gũi.',
    fields: STD({ org: 'Đảng ủy Trường Đại học Ánh Dương', kicker: 'Hội nghị học tập chuyên đề năm 2027', title: 'HỌC TẬP VÀ LÀM THEO\nTƯ TƯỞNG, ĐẠO ĐỨC,\nPHONG CÁCH HỒ CHÍ MINH', subtitle: 'Về ý chí tự lực, tự cường và khát vọng phát triển đất nước', info: 'Hà Nội, ngày 15 tháng 3 năm 2027' }),
    colors: [C('c1', 'Màu đỏ', '#B3001B'), C('c2', 'Màu vàng', '#C9A227'), C('c3', 'Màu nền kem', '#FFF8EC')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [p.c3, mix(p.c3, '#F3DDB3', 0.6)], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        S.nhaSan(930, 470, 380, p.c2).replace('<g ', '<g opacity="0.12" ') +
        `<circle cx="910" cy="280" r="230" fill="${p.c2}" opacity="0.08"/>` +
        photoSlot(p, 910, 266, 240, 316, { shape: 'arch', color: p.c2, id: u + 'pf', label: 'ẢNH CHÂN DUNG\nCHỦ TỊCH HỒ CHÍ MINH' }) +
        S.silk(1200, 600, p.c1, tint(p.c2, 0.3)) +
        S.lotus(76, 548, 58, '#EC407A', '#4C8C4A') + S.lotus(150, 560, 38, '#F48FB1');
      s += logoSlot(p, 116, 80, 58, { color: p.c1 }) +
        T(p.org, 158, 88, { size: 17, weight: 700, fill: p.c1, anchor: 'start', upper: true, ls: 1, maxW: 500 }) +
        T(p.kicker, 92, 168, { size: 21, weight: 800, fill: p.c2, anchor: 'start', upper: true, ls: 2, maxW: 620 });
      const t = TL(p.title, 88, 236, { size: 44, weight: 900, fill: p.c1, anchor: 'start', maxW: 630 }, 1.2);
      const ys = t.h + 236 + 46;
      s += t.svg + T(p.subtitle, 92, ys, { size: 20, weight: 600, italic: true, fill: '#5D4037', anchor: 'start', maxW: 620 }) +
        T(p.info, 92, Math.min(ys + 38, 448), { size: 18, weight: 500, italic: true, fill: p.c1, anchor: 'start', maxW: 600 });
      return s;
    },
  });

  /* B68 — Giải phóng miền Nam, thống nhất đất nước 30/4 */
  add({
    id: 'B68', name: 'Giải phóng miền Nam 30/4', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Kỷ niệm Ngày Giải phóng miền Nam, thống nhất đất nước 30/4; Quốc tế Lao động 1/5; chương trình về nguồn',
    desc: 'Bản đồ Việt Nam hình chữ S nhũ vàng (có Hoàng Sa, Trường Sa) bên phải, chim bồ câu hòa bình, tiêu đề căn trái trên nền đỏ – tự hào non sông liền một dải.',
    fields: STD({ org: 'Ủy ban nhân dân phường Hòa An', kicker: 'Kỷ niệm 52 năm', title: 'NGÀY GIẢI PHÓNG MIỀN NAM,\nTHỐNG NHẤT ĐẤT NƯỚC', subtitle: '(30/4/1975 – 30/4/2027)', info: 'Bắc – Nam sum họp một nhà' }),
    colors: [C('c1', 'Màu đỏ', '#C8102E'), C('c2', 'Màu vàng', '#F9D16B'), C('c3', 'Màu chữ sáng', '#FFF5D6')],
    render(p, u) {
      const mh = 540, mw = S.vnMap.width(mh), mx = 1180 - mw;
      let s = redBg(u, p.c1) + `<defs>${gold(u, 'gd', p.c2)}${gold(u, 'mp', p.c2)}</defs>` + rays(930, 300, p.c2, 0.05, 0, 360, 40) +
        S.vnMap(mx, 30, mh, `url(#${u}mp)`, { island: p.c2, label: p.c3 }) +
        S.star5(mx + (105.85 - 102) * mh / 16.6, 30 + (23.6 - 21.03) * mh / 16.6 * 1.03, 12, p.c1) +
        S.star5(mx + (106.7 - 102) * mh / 16.6, 30 + (23.6 - 10.78) * mh / 16.6 * 1.03, 12, p.c1) +
        S.dove(560, 90, 1.2) + S.dove(640, 140, 0.8) + S.dove(500, 150, 0.7) +
        logoSlot(p, 116, 84, 60, { color: p.c2 }) +
        T(p.org, 160, 92, { size: 17, weight: 700, fill: p.c3, anchor: 'start', upper: true, ls: 1, maxW: 420 }) +
        T(p.kicker, 92, 220, { size: 34, weight: 900, fill: `url(#${u}gd)`, anchor: 'start', upper: true, ls: 3, maxW: 640 });
      const t = TL(p.title, 88, 290, { size: 42, weight: 800, fill: p.c3, anchor: 'start', maxW: 660 }, 1.22);
      const ys = 290 + t.h + 52;
      s += t.svg + T(p.subtitle, 92, ys, { size: 26, weight: 600, italic: true, fill: p.c2, anchor: 'start', maxW: 640 }) +
        `<line x1="92" y1="500" x2="160" y2="500" stroke="${p.c2}" stroke-width="3"/>` +
        T(p.info, 92, 540, { size: 22, font: 'Playfair Display', weight: 700, italic: true, fill: p.c3, anchor: 'start', maxW: 620 });
      return s;
    },
  });

  /* B69 — Ngày thành lập Quân đội nhân dân Việt Nam 22/12 */
  add({
    id: 'B69', name: 'Ngày thành lập QĐND Việt Nam 22/12', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Kỷ niệm ngày thành lập Quân đội nhân dân Việt Nam 22/12, Ngày hội Quốc phòng toàn dân, gặp mặt cựu chiến binh',
    desc: 'Nền xanh quân phục, ngôi sao vàng lớn tỏa sáng trong vòng nguyệt quế, dải lụa đỏ – vàng ở chân – kiên cường, trang nghiêm.',
    fields: STD({ org: 'Hội Cựu chiến binh phường Hòa An', kicker: 'Kỷ niệm 82 năm ngày thành lập', title: 'QUÂN ĐỘI NHÂN DÂN VIỆT NAM', subtitle: '(22/12/1944 – 22/12/2026)', info: 'Và 37 năm Ngày hội Quốc phòng toàn dân (22/12/1989 – 22/12/2026)' }),
    colors: [C('c1', 'Màu xanh quân phục', '#2F4A1F'), C('c2', 'Màu vàng', '#F2C14E'), C('c3', 'Màu đỏ', '#C8102E')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.2), p.c1, shade(p.c1, 0.5)], 0.5, 0.3, 0.85)}${gold(u, 'gd', p.c2)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        rays(600, 130, p.c2, 0.06, 0, 360, 44) + laurel(600, 132, 92, p.c2, { from: 100, to: 240, n: 8 }) +
        `<circle cx="600" cy="128" r="62" fill="${p.c3}" stroke="${p.c2}" stroke-width="4"/>` + S.star5(600, 130, 48, '#FFDE00') +
        S.silk(1200, 600, p.c3, p.c2) + frame(p.c2) +
        logoSlot(p, 100, 80, 54, { color: p.c2 }) +
        T(p.org, 140, 87, { size: 16, weight: 700, fill: p.c2, anchor: 'start', upper: true, ls: 1, maxW: 360 }) +
        T(p.kicker, 600, 262, { size: 28, weight: 800, fill: '#FFF5D6', upper: true, ls: 4, maxW: 900 });
      const t = TL(p.title, 600, 336, { size: 56, weight: 900, fill: `url(#${u}gd)`, maxW: 1000 }, 1.15);
      const ys = 336 + t.h + 50;
      s += t.svg + T(p.subtitle, 600, ys, { size: 26, weight: 600, italic: true, fill: '#FFF5D6', maxW: 800 }) +
        T(p.info, 600, Math.min(ys + 42, 455), { size: 19, weight: 500, italic: true, fill: p.c2, maxW: 900 });
      return s;
    },
  });

  /* B70 — Tri ân anh hùng liệt sĩ 27/7 */
  add({
    id: 'B70', name: 'Tri ân anh hùng liệt sĩ 27/7', styles: ['Trang trọng', 'Tối giản'],
    use: 'Kỷ niệm Ngày Thương binh – Liệt sĩ 27/7, lễ thắp nến tri ân, viếng nghĩa trang liệt sĩ, gặp mặt gia đình chính sách',
    desc: 'Nền sẫm trầm mặc với hàng nến tri ân lung linh, ngôi sao vàng nhỏ và tia sáng dịu – tiêu đề serif trang nghiêm, xúc động.',
    fields: STD({ org: 'Đoàn Thanh niên phường Hòa An', kicker: 'Kỷ niệm 80 năm Ngày Thương binh – Liệt sĩ', title: 'TRI ÂN\nANH HÙNG LIỆT SĨ', subtitle: '(27/7/1947 – 27/7/2027)', info: 'Uống nước nhớ nguồn – Đền ơn đáp nghĩa' }),
    colors: [C('c1', 'Màu nền trầm', '#1C1426'), C('c2', 'Màu vàng', '#E9C46A'), C('c3', 'Màu đỏ', '#8E1B1B')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', [mix(p.c1, p.c3, 0.35), p.c1, shade(p.c1, 0.4)], 0, 1)}${gold(u, 'gd', p.c2)}${radial(u + 'gl', [['#FFB74D', 0, 0.45], ['#FFB74D', 1, 0]], 0.5, 0.5, 0.5)}</defs>` +
        `<rect width="1200" height="600" fill="url(#${u}bg)"/>` + rays(600, -40, p.c2, 0.04, 30, 150, 24) +
        `<ellipse cx="600" cy="600" rx="600" ry="170" fill="url(#${u}gl)"/>` + S.star5(600, 70, 26, p.c2);
      const R = rng(27);
      for (let i = 0; i < 15; i++) {
        const x = 70 + i * 76 + (R() - 0.5) * 20, h = 34 + R() * 34;
        s += S.candle(x, 585 - (i % 2) * 8, h);
      }
      s += logoSlot(p, 600, 130, 46, { color: p.c2 }) +
        T(p.org, 600, 180, { size: 17, weight: 600, fill: p.c2, upper: true, ls: 3, maxW: 800 }) +
        T(p.kicker, 600, 230, { size: 22, weight: 700, fill: '#F5E6C8', upper: true, ls: 3, maxW: 900 });
      const t = TL(p.title, 600, 304, { size: 62, font: 'Playfair Display', weight: 800, fill: `url(#${u}gd)`, maxW: 900 }, 1.1);
      const ys = 304 + t.h + 46;
      s += t.svg + T(p.subtitle, 600, ys, { size: 22, weight: 600, italic: true, fill: '#F5E6C8', maxW: 700 }) +
        T(p.info, 600, Math.min(ys + 44, 455), { size: 34, font: 'Dancing Script', weight: 700, fill: p.c2, maxW: 760 });
      return s;
    },
  });

  /* B71 — Đại hội Đảng bộ */
  add({
    id: 'B71', name: 'Đại hội Đảng bộ – cờ Đảng, cờ Tổ quốc', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Đại hội Đảng bộ, đại hội chi bộ, hội nghị Ban Chấp hành, hội nghị quán triệt nghị quyết',
    desc: 'Cờ Đảng và cờ Tổ quốc bắt chéo tung bay ở trung tâm phía trên, búa liềm chìm phía sau tiêu đề, khung chỉ vàng – theo bố cục backdrop đại hội truyền thống.',
    fields: STD({ org: 'Đảng bộ Trường Đại học Ánh Dương', kicker: 'Đại hội đại biểu', title: 'LẦN THỨ VIII, NHIỆM KỲ 2025 – 2030', subtitle: 'Đoàn kết – Dân chủ – Kỷ cương – Sáng tạo – Phát triển', info: 'Hà Nội, ngày 20 tháng 5 năm 2025' }),
    colors: [C('c1', 'Màu đỏ', '#C8102E'), C('c2', 'Màu vàng', '#F9D16B'), C('c3', 'Màu chữ sáng', '#FFF5D6')],
    render(p, u) {
      let s = redBg(u, p.c1) + `<defs>${gold(u, 'gd', p.c2)}</defs>` + rays(600, 110, p.c2, 0.05, 0, 360, 48) +
        S.hammerSickle(600, 360, 420, p.c2).replace('<g ', '<g opacity="0.07" ') + frame(p.c2) +
        `<line x1="584" y1="196" x2="470" y2="44" stroke="${p.c2}" stroke-width="5" stroke-linecap="round"/><line x1="616" y1="196" x2="730" y2="44" stroke="${p.c2}" stroke-width="5" stroke-linecap="round"/>` +
        `<circle cx="468" cy="40" r="6" fill="${p.c2}"/><circle cx="732" cy="40" r="6" fill="${p.c2}"/>` +
        S.flag(270, 46, 200, 128, 'dang', { flip: true }) + S.flag(730, 46, 200, 128, 'vn') +
        logoSlot(p, 100, 80, 54, { color: p.c2, optional: true }) +
        T(p.org, 600, 232, { size: 22, weight: 700, fill: p.c3, upper: true, ls: 2, maxW: 900 }) +
        T(p.kicker, 603, 294, { size: 52, weight: 900, fill: `url(#${u}gd)`, upper: true, ls: 5, maxW: 900 });
      const t = TL(p.title, 600, 362, { size: 42, weight: 800, fill: p.c3, maxW: 980 }, 1.2);
      const ys = 362 + t.h + 46;
      s += t.svg + T(p.subtitle, 600, ys, { size: 23, weight: 500, italic: true, fill: p.c3, maxW: 900 }) +
        T(p.info, 600, 540, { size: 20, weight: 500, italic: true, fill: p.c2, maxW: 800 });
      return s;
    },
  });

  /* B72 — Hội thảo lịch sử – văn hóa: Khuê Văn Các */
  add({
    id: 'B72', name: 'Hội thảo lịch sử – văn hiến (Khuê Văn Các)', styles: ['Trang trọng', 'Cổ điển'],
    use: 'Hội thảo lịch sử – văn hóa, tôn vinh truyền thống hiếu học, lễ vinh danh thủ khoa, khai bút đầu xuân',
    desc: 'Nền giấy dó ngà cổ, bóng Khuê Văn Các và lũy tre hai bên, mây tường vân – chữ serif nâu son trầm mặc, đậm chất văn hiến.',
    fields: STD({ org: 'Hội Khoa học Lịch sử Hà Nội', kicker: 'Hội thảo khoa học', title: 'THĂNG LONG – HÀ NỘI\nNGHÌN NĂM VĂN HIẾN', subtitle: 'Kế thừa – Bảo tồn – Phát huy giá trị di sản', info: 'Văn Miếu – Quốc Tử Giám, ngày 10 tháng 10 năm 2026' }),
    colors: [C('c1', 'Màu nâu son', '#6B2D1A'), C('c2', 'Màu vàng đồng', '#B8862F'), C('c3', 'Màu giấy dó', '#F3E5C8')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c3, 0.4), p.c3, shade(p.c3, 0.12)], 0.5, 0.4, 0.8)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>`;
      const R = rng(72);
      for (let i = 0; i < 60; i++) { const y = R() * 600; s += `<line x1="0" y1="${r2(y)}" x2="1200" y2="${r2(y + (R() - 0.5) * 6)}" stroke="${p.c1}" stroke-opacity="0.03"/>`; }
      [[120, 130, 2], [1000, 110, 1.8], [250, 400, 1.3], [880, 400, 1.5]].forEach(c => {
        s += `<path d="M 0 0 c 0 -14 18 -20 26 -10 c 4 -14 26 -16 32 0 c 12 -6 24 4 18 14 Z M 10 -4 a 6 6 0 1 1 8 -2 M 36 -6 a 7 7 0 1 1 9 -1" fill="none" stroke="${p.c2}" stroke-opacity="0.45" stroke-width="1.6" transform="translate(${c[0]} ${c[1]}) scale(${c[2]})"/>`;
      });
      s += S.bamboo(20, 600, 360, shade(p.c2, 0.15), 1).replace(/<path/g, '<path opacity="0.55"') + S.bamboo(1180, 600, 360, shade(p.c2, 0.15), -1).replace(/<path/g, '<path opacity="0.55"') +
        S.khueVanCac(600, 596, 210, p.c1) +
        `<rect x="40" y="40" width="1120" height="520" fill="none" stroke="${p.c1}" stroke-opacity="0.5" stroke-width="1.5"/>` +
        logoSlot(p, 600, 70, 50, { color: p.c1 }) +
        T(p.org, 600, 120, { size: 17, weight: 700, fill: p.c1, upper: true, ls: 3, maxW: 800 }) +
        T(p.kicker, 605, 170, { size: 22, font: 'Montserrat', weight: 700, fill: p.c2, upper: true, ls: 8, maxW: 800 });
      const t = TL(p.title, 600, 240, { size: 58, font: 'Playfair Display', weight: 900, fill: p.c1, maxW: 860 }, 1.12);
      const ys = 240 + t.h + 48;
      s += t.svg + T(p.subtitle, 600, ys, { size: 28, font: 'Cormorant Garamond', weight: 600, italic: true, fill: shade(p.c1, 0.1), maxW: 800 }) +
        T(p.info, 600, Math.min(ys + 38, 390), { size: 17, weight: 600, fill: p.c1, maxW: 760 });
      return s;
    },
  });

  /* B73 — Giỗ Tổ Hùng Vương */
  add({
    id: 'B73', name: 'Giỗ Tổ Hùng Vương', styles: ['Truyền thống', 'Trang trọng'],
    use: 'Giỗ Tổ Hùng Vương 10/3 âm lịch, lễ hội Đền Hùng, chương trình văn hóa cội nguồn dân tộc',
    desc: 'Nền nâu đồng cổ, mặt trống đồng Đông Sơn lớn phía sau, dải chim Lạc bay trên – dưới và khung chỉ vàng – thiêng liêng, cội nguồn.',
    fields: STD({ org: 'Ủy ban nhân dân phường Hòa An', kicker: 'Hướng về cội nguồn', title: 'GIỖ TỔ HÙNG VƯƠNG', subtitle: 'Dù ai đi ngược về xuôi – Nhớ ngày Giỗ Tổ mùng Mười tháng Ba', info: 'Mùng 10 tháng 3 năm Đinh Mùi' }),
    colors: [C('c1', 'Màu nâu đồng', '#4E2A12'), C('c2', 'Màu vàng đồng', '#E3B04B'), C('c3', 'Màu chữ sáng', '#FFF1D0')],
    render(p, u) {
      let s = `<defs>${radial(u + 'bg', [tint(p.c1, 0.25), p.c1, shade(p.c1, 0.5)], 0.5, 0.5, 0.75)}${gold(u, 'gd', p.c2)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        drum(600, 300, 400, p.c2, { opacity: 0.2 });
      const bird = (x, y, L) => `<g transform="translate(${x} ${y})" fill="${p.c2}"><path d="M ${-L} 0 Q 0 ${-L * 0.28} ${L} ${-L * 0.05} L ${L * 1.7} ${L * 0.04} L ${L * 0.9} ${L * 0.14} Q 0 ${L * 0.32} ${-L} 0 Z M ${-L * 0.2} ${-L * 0.12} L ${-L * 0.75} ${-L * 0.6} L ${-L * 0.05} ${-L * 0.22} Z"/></g>`;
      [[54, 1], [546, -1]].forEach(b => {
        s += `<line x1="40" y1="${b[0] - 22}" x2="1160" y2="${b[0] - 22}" stroke="${p.c2}" stroke-width="1.5"/><line x1="40" y1="${b[0] + 20}" x2="1160" y2="${b[0] + 20}" stroke="${p.c2}" stroke-width="1.5"/>`;
        for (let x = 90; x < 1140; x += 110) s += bird(x, b[0], 22);
      });
      s += logoSlot(p, 600, 118, 50, { color: p.c2 }) +
        T(p.org, 600, 168, { size: 17, weight: 700, fill: p.c3, upper: true, ls: 2, maxW: 800 }) +
        T(p.kicker, 606, 222, { size: 24, weight: 700, fill: p.c2, upper: true, ls: 8, maxW: 800 });
      const t = TL(p.title, 600, 310, { size: 76, font: 'Playfair Display', weight: 900, fill: `url(#${u}gd)`, maxW: 960 }, 1.08);
      const ys = 310 + t.h + 54;
      s += t.svg + T(p.subtitle, 600, ys, { size: 30, font: 'Dancing Script', weight: 700, fill: p.c3, maxW: 980 }) +
        T(p.info, 600, Math.min(ys + 48, 480), { size: 20, weight: 600, italic: true, fill: p.c2, maxW: 760 });
      return s;
    },
  });

  /* B74 — Biển đảo Việt Nam */
  add({
    id: 'B74', name: 'Biển đảo Việt Nam – chủ quyền', styles: ['Trang trọng', 'Thiên nhiên'],
    use: 'Tuần lễ Biển và Hải đảo Việt Nam, tuyên truyền chủ quyền biển đảo, cuộc thi tìm hiểu, chương trình "Vì Trường Sa thân yêu"',
    desc: 'Nền xanh đại dương với sóng biển, bản đồ Việt Nam trắng nổi bật hai quần đảo Hoàng Sa, Trường Sa và lá cờ Tổ quốc tung bay – thiêng liêng, tự hào.',
    fields: STD({ org: 'Đoàn Thanh niên Trường Đại học Ánh Dương', kicker: 'Tuần lễ Biển và Hải đảo Việt Nam', title: 'BIỂN ĐẢO VIỆT NAM\nCHỦ QUYỀN THIÊNG LIÊNG', subtitle: 'Hoàng Sa, Trường Sa là của Việt Nam', info: '01 – 08/6/2027' }),
    colors: [C('c1', 'Màu biển đậm', '#03396C'), C('c2', 'Màu biển sáng', '#3B8DBD'), C('c3', 'Màu vàng', '#F9D16B')],
    render(p, u) {
      const mh = 500, mw = S.vnMap.width(mh), mx = 1170 - mw;
      let s = `<defs>${lin(u + 'bg', [shade(p.c1, 0.3), p.c1, p.c2], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/><g fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="2">`;
      for (let y = 380; y < 600; y += 26) s += `<path d="M 0 ${y} q 40 -12 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0"/>`;
      s += '</g>' + S.vnMap(mx, 50, mh, '#ffffff', { island: p.c3, label: p.c3 }).replace('<path ', '<path fill-opacity="0.92" ') +
        S.flagOnPole(mx + (110.4 - 102) * mh / 16.6, 50 + (23.6 - 14.6) * mh / 16.6 * 1.03, 90, 74, 48, 'vn', 1, p.c3) +
        logoSlot(p, 116, 84, 60, { color: '#ffffff' }) +
        T(p.org, 160, 92, { size: 17, weight: 700, anchor: 'start', upper: true, ls: 1, maxW: 460 }) +
        T(p.kicker, 92, 200, { size: 22, weight: 800, fill: p.c3, anchor: 'start', upper: true, ls: 3, maxW: 600 });
      const t = TL(p.title, 88, 280, { size: 50, weight: 900, anchor: 'start', maxW: 640 }, 1.15);
      const ys = 280 + t.h + 54;
      s += t.svg + T(p.subtitle, 92, ys, { size: 28, font: 'Playfair Display', weight: 700, italic: true, fill: p.c3, anchor: 'start', maxW: 620 }) +
        T(p.info, 92, 545, { size: 19, weight: 600, anchor: 'start', maxW: 600, attrs: 'fill-opacity="0.9"' });
      return s;
    },
  });

  /* B75 — Lễ kết nạp đảng viên mới */
  add({
    id: 'B75', name: 'Lễ kết nạp đảng viên mới', styles: ['Trang trọng', 'Truyền thống'],
    use: 'Lễ kết nạp đảng viên, lễ trao Huy hiệu Đảng, lễ công nhận đảng viên chính thức',
    desc: 'Lá cờ Đảng lớn tung bay ở trung tâm phía trên, tia sáng vàng tỏa, khung chỉ vàng kép và hoa sen dưới chân – trang nghiêm, vinh dự.',
    fields: STD({ org: 'Chi bộ Khoa Tiếng Anh', kicker: 'Lễ kết nạp', title: 'ĐẢNG VIÊN MỚI', subtitle: 'Vinh dự – Trách nhiệm – Tiên phong – Gương mẫu', info: 'Hà Nội, ngày 03 tháng 02 năm 2027' }),
    colors: [C('c1', 'Màu đỏ', '#C8102E'), C('c2', 'Màu vàng', '#F9D16B'), C('c3', 'Màu chữ sáng', '#FFF5D6')],
    render(p, u) {
      let s = redBg(u, p.c1) + `<defs>${gold(u, 'gd', p.c2)}</defs>` + rays(600, 110, p.c2, 0.06, 0, 360, 48) + frame(p.c2) +
        S.flag(480, 40, 240, 150, 'dang', { stroke: p.c2 }) +
        S.lotus(600, 572, 70, p.c2) + S.lotus(480, 580, 46, p.c2) + S.lotus(720, 580, 46, p.c2) +
        logoSlot(p, 100, 80, 54, { color: p.c2, optional: true }) +
        T(p.org, 600, 236, { size: 22, weight: 700, fill: p.c3, upper: true, ls: 3, maxW: 900 }) +
        T(p.kicker, 604, 296, { size: 40, weight: 800, fill: p.c3, upper: true, ls: 8, maxW: 900 });
      const t = TL(p.title, 600, 376, { size: 72, weight: 900, fill: `url(#${u}gd)`, maxW: 960 }, 1.1);
      const ys = 376 + t.h + 50;
      s += t.svg + T(p.subtitle, 600, ys, { size: 23, weight: 500, italic: true, fill: p.c3, maxW: 900 }) +
        T(p.info, 600, Math.min(ys + 40, 488), { size: 19, weight: 500, italic: true, fill: p.c2, maxW: 800 });
      return s;
    },
  });

  /* B76 — Ngày hội Đại đoàn kết toàn dân tộc 18/11 */
  add({
    id: 'B76', name: 'Ngày hội Đại đoàn kết toàn dân tộc', styles: ['Vui tươi', 'Truyền thống'],
    use: 'Ngày hội Đại đoàn kết toàn dân tộc ở khu dân cư 18/11, ngày truyền thống Mặt trận Tổ quốc, hội nghị dân vận',
    desc: 'Nền trời vàng ấm, cánh đồng lúa xanh, hàng người nắm tay nhau nhiều màu áo, cờ Tổ quốc tung bay – đoàn kết, gần gũi, vui tươi.',
    fields: STD({ org: 'Ban Công tác Mặt trận khu dân cư số 5', kicker: 'Ngày hội Đại đoàn kết toàn dân tộc', title: 'KHU DÂN CƯ SỐ 5\nPHƯỜNG HÒA AN', subtitle: 'Kỷ niệm 96 năm Ngày truyền thống Mặt trận Tổ quốc Việt Nam (18/11/1930 – 18/11/2026)', info: 'Chủ nhật, ngày 15 tháng 11 năm 2026' }),
    colors: [C('c1', 'Màu đỏ', '#C8102E'), C('c2', 'Màu vàng nắng', '#FFD166'), C('c3', 'Màu lúa', '#4C9A2A')],
    render(p, u) {
      let s = `<defs>${lin(u + 'bg', ['#FFF8E1', tint(p.c2, 0.4)], 0, 1)}</defs><rect width="1200" height="600" fill="url(#${u}bg)"/>` +
        rays(600, 640, p.c2, 0.18, 180, 360, 36) +
        S.flagOnPole(60, 40, 300, 210, 136, 'vn', 1, '#B8862F') +
        `<path d="M 0 470 Q 300 440 600 468 T 1200 455 L 1200 600 L 0 600 Z" fill="${tint(p.c3, 0.35)}"/><path d="M 0 515 Q 400 490 800 518 T 1200 505 L 1200 600 L 0 600 Z" fill="${p.c3}"/>`;
      const cols = ['#E63946', '#F4A261', '#2A9D8F', '#264653', '#E9C46A', '#8E44AD', '#1D70B8', '#C2185B'];
      let row = `<path d="M 110 520 ${Array.from({ length: 13 }, (_, i) => `L ${110 + i * 82} ${i % 2 ? 528 : 520}`).join(' ')}" fill="none" stroke="#5D4037" stroke-width="3" stroke-linejoin="round"/>`;
      for (let i = 0; i < 13; i++) row += person(110 + i * 82, i % 2 ? 532 : 520, i % 3 === 1 ? 24 : 32, cols[i % cols.length]);
      s += row;
      s += logoSlot(p, 1110, 80, 56, { color: p.c1 }) +
        T(p.org, 1070, 87, { size: 16, weight: 700, fill: p.c1, anchor: 'end', upper: true, ls: 1, maxW: 520 }) +
        T(p.kicker, 640, 186, { size: 30, weight: 900, fill: p.c1, upper: true, ls: 2, maxW: 760 });
      const t = TL(p.title, 640, 262, { size: 52, weight: 900, fill: shade(p.c1, 0.25), maxW: 760 }, 1.15);
      const ys = 262 + t.h + 48;
      s += t.svg + T(p.subtitle, 640, ys, { size: 20, weight: 600, italic: true, fill: '#5D4037', maxW: 820 }) +
        T(p.info, 640, Math.min(ys + 40, 440), { size: 20, weight: 700, fill: p.c1, maxW: 700 });
      return s;
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
