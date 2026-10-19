/* =========================================================================
 * logos2.js — 12 mẫu logo bổ sung (L13 – L24), khung 500 × 500, nền trong suốt
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, star, starPts, leaf, mix, shade, tint, r2, rad } = root.BL;
  const heart = root.BL.bd.heart;
  const F = (k, label, v, extra) => Object.assign({ k, label, v }, extra || {});
  const C = (k, label, v) => ({ k, label, v });
  const add = t => root.BL.templates.push(Object.assign({ type: 'logo', w: 500, h: 500 }, t));
  const NT = (n, t) => [F('name', 'Tên', n), F('tagline', 'Khẩu hiệu / dòng phụ', t)];

  /* L13 — Ngọn đuốc */
  add({
    id: 'L13', name: 'Ngọn đuốc thanh niên', styles: ['Năng động', 'Trang trọng'], topic: 'Thể thao – thanh niên',
    use: 'Đội tình nguyện, CLB thể thao, giải đấu, chiến dịch thanh niên, trung tâm huấn luyện',
    desc: 'Ngọn lửa ba lớp đỏ – cam – vàng trên tay cầm đuốc: nhiệt huyết, tiên phong, truyền lửa.',
    fields: NT('Tiếp Lửa', 'Đội Thanh niên Tình nguyện'),
    colors: [C('c1', 'Màu lửa ngoài', '#E53935'), C('c2', 'Màu lửa giữa', '#FB8C00'), C('c3', 'Màu lửa trong', '#FFD54F'), C('c4', 'Màu tay cầm – chữ', '#1A237E')],
    render(p) {
      const fl = 'M250 48 C 302 110 336 150 322 202 C 314 230 292 238 250 238 C 208 238 186 230 178 202 C 168 160 204 140 214 104 C 230 130 236 140 241 152 C 238 112 240 82 250 48 Z';
      const sc = k => `transform="translate(250 238) scale(${k}) translate(-250 -238)"`;
      return `<path d="${fl}" fill="${p.c1}"/><path d="${fl}" fill="${p.c2}" ${sc(0.7)}/><path d="${fl}" fill="${p.c3}" ${sc(0.42)}/>` +
        `<path d="M 200 236 L 300 236 L 284 268 L 216 268 Z" fill="${p.c4}"/><polygon points="228,272 272,272 260,382 240,382" fill="${p.c4}"/>` +
        `<rect x="224" y="292" width="52" height="8" fill="${p.c2}"/>` +
        T(p.name, 250, 428, { size: 48, font: 'Montserrat', weight: 800, fill: p.c4, upper: true, ls: 2, maxW: 450 }) +
        T(p.tagline, 250, 464, { size: 17, font: 'Montserrat', weight: 600, fill: p.c1, upper: true, ls: 3, maxW: 440 });
    },
  });

  /* L14 — Bát phở / ẩm thực Việt */
  add({
    id: 'L14', name: 'Bát phở – ẩm thực Việt', styles: ['Truyền thống', 'Vui tươi'], topic: 'Ẩm thực – đồ uống',
    use: 'Quán phở, bún, cơm, nhà hàng món Việt, bếp ăn, thương hiệu gia vị',
    desc: 'Tô nóng hổi với đôi đũa và làn khói – gần gũi, gợi vị ngon truyền thống. Tên quán dùng chữ serif mềm.',
    fields: NT('Phở Gia Truyền', 'Hương vị Hà Nội từ 1986'),
    colors: [C('c1', 'Màu tô', '#B71C1C'), C('c2', 'Màu nước dùng', '#F9A825'), C('c3', 'Màu chữ – đũa', '#3E2723')],
    render(p) {
      let s = '';
      [210, 250, 290].forEach((x, i) => { s += `<path d="M ${x} ${160 - i % 2 * 10} C ${x - 22} ${130 - i % 2 * 10} ${x + 22} ${105 - i % 2 * 10} ${x} ${72 - i % 2 * 10}" fill="none" stroke="${p.c3}" stroke-opacity="0.45" stroke-width="7" stroke-linecap="round"/>`; });
      s += `<ellipse cx="250" cy="222" rx="132" ry="20" fill="${p.c2}" stroke="${p.c1}" stroke-width="6"/>` +
        `<line x1="335" y1="96" x2="222" y2="232" stroke="${p.c3}" stroke-width="9" stroke-linecap="round"/><line x1="356" y1="108" x2="240" y2="238" stroke="${p.c3}" stroke-width="9" stroke-linecap="round"/>` +
        `<path d="M 118 222 L 382 222 Q 372 334 250 344 Q 128 334 118 222 Z" fill="${p.c1}"/>` +
        `<path d="M 134 256 Q 250 276 366 256" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="3"/><path d="M 145 280 Q 250 298 355 280" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>` +
        `<rect x="205" y="340" width="90" height="14" rx="4" fill="${shade(p.c1, 0.3)}"/>`;
      return s + T(p.name, 250, 420, { size: 50, font: 'Lora', weight: 700, fill: p.c3, maxW: 460 }) +
        T(p.tagline, 250, 458, { size: 17, font: 'Be Vietnam Pro', weight: 600, fill: p.c1, ls: 3, upper: true, maxW: 440 });
    },
  });

  /* L15 — Y tế */
  add({
    id: 'L15', name: 'Chữ thập nhịp tim – y tế', styles: ['Tối giản', 'Hiện đại'], topic: 'Y tế – sức khỏe',
    use: 'Phòng khám, nhà thuốc, bệnh viện, ứng dụng sức khỏe, trung tâm xét nghiệm',
    desc: 'Chữ thập bo tròn và đường nhịp tim xuyên qua trong vòng tròn sáng – sạch sẽ, an tâm, chuyên nghiệp.',
    fields: NT('MediCare+', 'Phòng khám Đa khoa'),
    colors: [C('c1', 'Màu chính', '#0E7490'), C('c2', 'Màu sáng', '#22D3EE')],
    render(p) {
      const dark = shade(p.c1, 0.45);
      return `<circle cx="250" cy="195" r="145" fill="${tint(p.c2, 0.85)}"/><circle cx="250" cy="195" r="145" fill="none" stroke="${p.c2}" stroke-width="4"/>` +
        `<rect x="205" y="100" width="90" height="190" rx="24" fill="${p.c1}"/><rect x="155" y="150" width="190" height="90" rx="24" fill="${p.c1}"/>` +
        `<polyline points="112,195 196,195 214,160 240,245 266,120 286,195 388,195" fill="none" stroke="#fff" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/>` +
        `<polyline points="112,195 196,195 214,160 240,245 266,120 286,195 388,195" fill="none" stroke="${p.c2}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>` +
        T(p.name, 250, 415, { size: 48, font: 'Be Vietnam Pro', weight: 800, fill: dark, maxW: 450 }) +
        T(p.tagline, 250, 455, { size: 18, font: 'Be Vietnam Pro', weight: 600, fill: p.c1, ls: 4, upper: true, maxW: 440 });
    },
  });

  /* L16 — Sách mở & ngôi sao (giáo dục) */
  add({
    id: 'L16', name: 'Sách mở – ngôi sao tri thức', styles: ['Trang trọng', 'Hiện đại'], topic: 'Giáo dục',
    use: 'Trung tâm giáo dục, gia sư, luyện thi, thư viện, nhà sách, khoa – bộ môn',
    desc: 'Cuốn sách mở như đôi cánh, ngôi sao tỏa sáng phía trên – tri thức mở ra tương lai. Dễ thu nhỏ làm con dấu.',
    fields: NT('Bright Future', 'Trung tâm Giáo dục'),
    colors: [C('c1', 'Màu sách', '#1E3A8A'), C('c2', 'Màu ngôi sao', '#F59E0B')],
    render(p) {
      let s = star(250, 112, 38, p.c2);
      for (let a = -160; a <= -20; a += 23.3) {
        s += `<line x1="${r2(250 + 54 * Math.cos(rad(a)))}" y1="${r2(118 + 54 * Math.sin(rad(a)))}" x2="${r2(250 + 72 * Math.cos(rad(a)))}" y2="${r2(118 + 72 * Math.sin(rad(a)))}" stroke="${p.c2}" stroke-width="5" stroke-linecap="round"/>`;
      }
      const page = 'M 250 330 C 200 300 140 300 92 315 L 92 192 C 140 178 200 178 250 208 Z';
      s += `<path d="${page}" fill="${p.c1}"/><path d="${page}" fill="${tint(p.c1, 0.25)}" transform="translate(500 0) scale(-1 1)"/><g stroke="#fff" stroke-opacity="0.6" stroke-width="3" fill="none" stroke-linecap="round">`;
      [0, 1, 2].forEach(i => { s += `<path d="M 112 ${220 + i * 28} C 160 ${206 + i * 28} 205 ${210 + i * 28} 234 ${226 + i * 28}"/><path d="M 388 ${220 + i * 28} C 340 ${206 + i * 28} 295 ${210 + i * 28} 266 ${226 + i * 28}"/>`; });
      return s + '</g>' + T(p.name, 250, 410, { size: 44, font: 'Montserrat', weight: 800, fill: p.c1, upper: true, ls: 1, maxW: 450 }) +
        T(p.tagline, 250, 450, { size: 18, font: 'Montserrat', weight: 600, fill: shade(p.c2, 0.2), ls: 4, upper: true, maxW: 430 });
    },
  });

  /* L17 — Bất động sản */
  add({
    id: 'L17', name: 'Mái nhà – bất động sản', styles: ['Sang trọng', 'Tối giản'], topic: 'Bất động sản – xây dựng',
    use: 'Sàn giao dịch bất động sản, công ty xây dựng, nội thất, dự án căn hộ, homestay',
    desc: 'Hai lớp mái nhà hình chữ V lồng nhau và các khối tòa nhà – vững chãi, cao cấp với cặp màu navy – vàng.',
    fields: NT('An Cư Land', 'Real Estate'),
    colors: [C('c1', 'Màu navy', '#0B2545'), C('c2', 'Màu vàng', '#C9A227')],
    render(p) {
      let s = `<polyline points="100,232 250,108 400,232" fill="none" stroke="${p.c1}" stroke-width="18" stroke-linejoin="miter"/>` +
        `<polyline points="158,232 250,156 342,232" fill="none" stroke="${p.c2}" stroke-width="12" stroke-linejoin="miter"/>` +
        `<rect x="186" y="250" width="28" height="80" fill="${p.c1}"/><rect x="224" y="214" width="52" height="116" fill="${p.c2}"/><rect x="286" y="246" width="28" height="84" fill="${p.c1}"/>`;
      for (let y = 228; y < 320; y += 20) s += `<rect x="234" y="${y}" width="10" height="10" fill="#fff"/><rect x="256" y="${y}" width="10" height="10" fill="#fff"/>`;
      return s + `<rect x="130" y="330" width="240" height="8" fill="${p.c1}"/>` +
        T(p.name, 250, 412, { size: 46, font: 'Playfair Display', weight: 700, fill: p.c1, upper: true, ls: 3, maxW: 460 }) +
        T(p.tagline, 250, 450, { size: 16, font: 'Montserrat', weight: 600, fill: p.c2, upper: true, ls: 8, maxW: 420 });
    },
  });

  /* L18 — Bông lúa */
  add({
    id: 'L18', name: 'Bông lúa trong vòng tròn', styles: ['Truyền thống', 'Thiên nhiên'], topic: 'Nông nghiệp – môi trường',
    use: 'Hợp tác xã nông nghiệp, gạo đặc sản, thực phẩm, khuyến nông, trường nông lâm',
    desc: 'Đôi bông lúa vàng trĩu hạt ôm lấy nhau trong vòng tròn kép – no đủ, mùa màng bội thu, đậm chất làng quê Việt.',
    fields: NT('Gạo Quê Hương', 'Hợp tác xã Nông nghiệp'),
    colors: [C('c1', 'Màu xanh lá', '#2E7D32'), C('c2', 'Màu vàng lúa', '#E0A526')],
    render(p) {
      const P0 = [250, 330], P1 = [205, 220], P2 = [182, 92];
      const at = t => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0], (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1]];
      let g = `<path d="M ${P0} Q ${P1} ${P2}" fill="none" stroke="${p.c1}" stroke-width="5" stroke-linecap="round"/>` + leaf(250, 318, 105, -128, p.c1);
      for (let i = 0; i < 10; i++) {
        const t = 0.38 + 0.064 * i, a = at(t), b = at(t + 0.01);
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, side = i % 2 ? 1 : -1;
        const nx = -(b[1] - a[1]), ny = b[0] - a[0], nl = Math.hypot(nx, ny);
        const cx = a[0] + side * 10 * nx / nl, cy = a[1] + side * 10 * ny / nl;
        g += `<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="15" ry="6.5" fill="${p.c2}" transform="rotate(${r2(ang + side * 32)} ${r2(cx)} ${r2(cy)})"/>`;
      }
      g += `<ellipse cx="${P2[0]}" cy="${P2[1] - 6}" rx="6.5" ry="14" fill="${p.c2}" transform="rotate(-12 ${P2[0]} ${P2[1]})"/>`;
      return `<circle cx="250" cy="210" r="152" fill="none" stroke="${p.c1}" stroke-width="6"/><circle cx="250" cy="210" r="140" fill="none" stroke="${p.c2}" stroke-width="1.5"/>` +
        `<g>${g}</g><g transform="translate(500 0) scale(-1 1)">${g}</g>` +
        T(p.name, 250, 420, { size: 48, font: 'Lora', weight: 700, fill: p.c1, maxW: 460 }) +
        T(p.tagline, 250, 458, { size: 17, font: 'Be Vietnam Pro', weight: 600, fill: shade(p.c2, 0.25), ls: 4, upper: true, maxW: 440 });
    },
  });

  /* L19 — Du lịch núi biển */
  add({
    id: 'L19', name: 'Núi – biển – mặt trời (du lịch)', styles: ['Thiên nhiên', 'Vui tươi'], topic: 'Văn hóa – du lịch',
    use: 'Công ty lữ hành, resort, homestay, điểm du lịch, CLB phượt – trekking',
    desc: 'Phong cảnh thu nhỏ trong vòng tròn: núi tuyết, mặt trời, sóng biển. Kể ngay câu chuyện "đi để trải nghiệm".',
    fields: NT('Việt Trip', 'Travel & Adventure'),
    colors: [C('c1', 'Màu biển', '#0277BD'), C('c2', 'Màu mặt trời', '#FF8F00'), C('c3', 'Màu núi', '#2E7D32')],
    render(p, u) {
      return `<defs><clipPath id="${u}c"><circle cx="250" cy="195" r="150"/></clipPath><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${tint(p.c2, 0.6)}"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>` +
        `<g clip-path="url(#${u}c)"><rect x="90" y="40" width="320" height="320" fill="url(#${u}s)"/><circle cx="305" cy="150" r="40" fill="${p.c2}"/>` +
        `<polygon points="80,290 200,150 320,290" fill="${p.c3}"/><polygon points="190,290 312,118 440,290" fill="${shade(p.c3, 0.28)}"/>` +
        `<polygon points="287,153 312,118 337,153 324,146 312,158 300,146" fill="#fff"/><polygon points="181,172 200,150 219,172 209,167 200,176 191,167" fill="#fff"/>` +
        `<rect x="90" y="262" width="320" height="110" fill="${p.c1}"/>` +
        `<path d="M 100 290 q 20 -12 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 M 120 318 q 20 -12 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="4" stroke-linecap="round"/></g>` +
        `<circle cx="250" cy="195" r="150" fill="none" stroke="${p.c1}" stroke-width="7"/>` +
        T(p.name, 250, 418, { size: 48, font: 'Montserrat', weight: 800, fill: p.c1, upper: true, ls: 2, maxW: 450 }) +
        T(p.tagline, 250, 456, { size: 17, font: 'Montserrat', weight: 600, fill: p.c2, upper: true, ls: 5, maxW: 430 });
    },
  });

  /* L20 — Hạt cà phê */
  add({
    id: 'L20', name: 'Hạt cà phê rang', styles: ['Cổ điển', 'Tối giản'], topic: 'Ẩm thực – đồ uống',
    use: 'Quán cà phê, xưởng rang xay, trà sữa, tiệm bánh, đặc sản Tây Nguyên',
    desc: 'Cặp hạt cà phê với đường rãnh chữ S và làn hương bốc lên trong vòng tròn mảnh – mộc mạc, thơm nồng.',
    fields: NT('Cà Phê Mộc', 'Rang xay nguyên chất'),
    colors: [C('c1', 'Màu nâu đậm', '#4E342E'), C('c2', 'Màu kem sữa', '#C8A27C')],
    render(p) {
      const bean = (cx, cy, rot, fill) => `<g transform="rotate(${rot} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="50" ry="72" fill="${fill}"/>` +
        `<path d="M ${cx} ${cy - 60} C ${cx - 24} ${cy - 22} ${cx + 24} ${cy + 22} ${cx} ${cy + 60}" fill="none" stroke="${p.c2}" stroke-width="7" stroke-linecap="round"/></g>`;
      return `<circle cx="250" cy="205" r="160" fill="none" stroke="${p.c2}" stroke-width="2"/><circle cx="250" cy="205" r="150" fill="none" stroke="${p.c2}" stroke-width="1" stroke-dasharray="2 6"/>` +
        `<path d="M 232 108 C 214 88 248 74 230 52 M 268 108 C 250 88 284 74 266 52" fill="none" stroke="${p.c2}" stroke-width="5" stroke-linecap="round"/>` +
        bean(212, 222, -28, p.c1) + bean(292, 228, 26, mix(p.c1, p.c2, 0.3)) +
        T(p.name, 250, 422, { size: 50, font: 'Playfair Display', weight: 700, fill: p.c1, maxW: 460 }) +
        T(p.tagline, 250, 460, { size: 16, font: 'Montserrat', weight: 600, fill: shade(p.c2, 0.15), upper: true, ls: 6, maxW: 430 });
    },
  });

  /* L21 — Hoa sen */
  add({
    id: 'L21', name: 'Hoa sen thanh tao', styles: ['Truyền thống', 'Sang trọng'], topic: 'Làm đẹp – thời trang',
    use: 'Spa, yoga, thiền, mỹ phẩm, nhà hàng chay, sự kiện văn hóa Việt',
    desc: 'Đóa sen bảy cánh đối xứng từ nhạt đến đậm trên mặt nước – thanh khiết, cân bằng, mang hồn Việt.',
    fields: NT('Sen Spa', 'Thư giãn – Tái tạo'),
    colors: [C('c1', 'Màu cánh đậm', '#C2185B'), C('c2', 'Màu cánh nhạt', '#F8BBD0'), C('c3', 'Màu chữ – nét', '#B08D57')],
    render(p) {
      const petal = (len, rot, fill) => `<path d="M 0 0 C ${r2(-len * 0.45)} ${r2(-len * 0.35)} ${r2(-len * 0.3)} ${r2(-len * 0.85)} 0 ${-len} C ${r2(len * 0.3)} ${r2(-len * 0.85)} ${r2(len * 0.45)} ${r2(-len * 0.35)} 0 0 Z" fill="${fill}" transform="translate(250 290) rotate(${rot})"/>`;
      let s = petal(120, -72, p.c2) + petal(120, 72, p.c2) + petal(135, -44, tint(p.c1, 0.55)) + petal(135, 44, tint(p.c1, 0.55)) +
        petal(155, -18, mix(p.c1, p.c2, 0.35)) + petal(155, 18, mix(p.c1, p.c2, 0.35)) + petal(175, 0, p.c1);
      s += `<path d="M 140 300 Q 250 318 360 300" fill="none" stroke="${p.c3}" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M 175 322 Q 250 334 325 322" fill="none" stroke="${p.c3}" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`;
      return s + T(p.name, 250, 410, { size: 54, font: 'Cormorant Garamond', weight: 600, fill: shade(p.c1, 0.3), maxW: 450 }) +
        T(p.tagline, 250, 450, { size: 15, font: 'Montserrat', weight: 500, fill: p.c3, upper: true, ls: 7, maxW: 420 });
    },
  });

  /* L22 — Âm nhạc */
  add({
    id: 'L22', name: 'Nốt nhạc – vòng equalizer', styles: ['Năng động', 'Hiện đại'], topic: 'Âm nhạc – sáng tạo',
    use: 'Trung tâm âm nhạc, ban nhạc, phòng thu, podcast, CLB văn nghệ, quán karaoke',
    desc: 'Nốt móc đơn ở giữa vòng equalizer nhảy nhịp hai màu – sôi động, trẻ trung, đậm chất âm thanh.',
    fields: NT('Melody House', 'Music Academy'),
    colors: [C('c1', 'Màu tím', '#7B61FF'), C('c2', 'Màu hồng', '#FF2E88')],
    render(p, u) {
      let s = `<defs><linearGradient id="${u}g" x1="0" x2="1"><stop offset="0" stop-color="${p.c1}"/><stop offset="1" stop-color="${p.c2}"/></linearGradient></defs>`;
      for (let i = 0; i < 48; i++) {
        const a = rad(i * 7.5 - 90), L = 14 + 34 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31));
        s += `<line x1="${r2(250 + 95 * Math.cos(a))}" y1="${r2(200 + 95 * Math.sin(a))}" x2="${r2(250 + (95 + L) * Math.cos(a))}" y2="${r2(200 + (95 + L) * Math.sin(a))}" stroke="${i % 2 ? p.c1 : p.c2}" stroke-width="6" stroke-linecap="round"/>`;
      }
      const ink = shade(p.c1, 0.45);
      s += `<circle cx="250" cy="200" r="82" fill="${tint(p.c1, 0.88)}"/>` +
        `<ellipse cx="232" cy="236" rx="25" ry="18" fill="${ink}" transform="rotate(-22 232 236)"/><rect x="250" y="142" width="9" height="94" fill="${ink}"/>` +
        `<path d="M 259 142 Q 296 160 290 200 Q 282 176 259 170 Z" fill="${ink}"/>`;
      return s + T(p.name, 250, 415, { size: 46, font: 'Montserrat', weight: 900, fill: `url(#${u}g)`, upper: true, ls: 1, maxW: 460 }) +
        T(p.tagline, 250, 453, { size: 17, font: 'Montserrat', weight: 600, fill: ink, upper: true, ls: 6, maxW: 430 });
    },
  });

  /* L23 — Thú cưng */
  add({
    id: 'L23', name: 'Dấu chân trong trái tim (thú cưng)', styles: ['Vui tươi', 'Tối giản'], topic: 'Dịch vụ – thú cưng',
    use: 'Pet shop, spa – khách sạn thú cưng, phòng khám thú y, cứu hộ động vật',
    desc: 'Dấu chân thú cưng màu trắng đặt trong trái tim cam đào – đáng yêu, thân thiện, dễ nhớ.',
    fields: NT('Pawsome', 'Pet Shop & Spa'),
    colors: [C('c1', 'Màu trái tim', '#FF8A65'), C('c2', 'Màu chữ', '#5D4037')],
    render(p) {
      return heart(250, 205, 112, p.c1) +
        `<g fill="#fff"><ellipse cx="250" cy="258" rx="38" ry="31"/><ellipse cx="204" cy="212" rx="14" ry="18" transform="rotate(-22 204 212)"/>` +
        `<ellipse cx="236" cy="194" rx="14" ry="19" transform="rotate(-6 236 194)"/><ellipse cx="266" cy="194" rx="14" ry="19" transform="rotate(6 266 194)"/>` +
        `<ellipse cx="298" cy="212" rx="14" ry="18" transform="rotate(22 298 212)"/></g>` +
        T(p.name, 250, 415, { size: 50, font: 'Be Vietnam Pro', weight: 800, fill: p.c2, maxW: 450 }) +
        T(p.tagline, 250, 453, { size: 18, font: 'Be Vietnam Pro', weight: 600, fill: shade(p.c1, 0.15), ls: 4, upper: true, maxW: 430 });
    },
  });

  /* L24 — Khung Art Deco */
  add({
    id: 'L24', name: 'Monogram khung Art Deco', styles: ['Sang trọng', 'Cổ điển'], topic: 'Làm đẹp – thời trang',
    use: 'Khách sạn, nhà hàng cao cấp, thời trang, trang sức, bất động sản hạng sang',
    desc: 'Khung bát giác đen – vàng với tia quạt Art Deco, chữ cái serif lớn ở giữa. Sang trọng kiểu thập niên 1920.',
    fields: [F('initials', 'Chữ cái', 'G'), F('name', 'Tên', 'The Grand'), F('tagline', 'Dòng phụ', 'Hotel & Residences')],
    colors: [C('c1', 'Màu nền khung', '#1C1C1C'), C('c2', 'Màu vàng', '#C9A227')],
    render(p) {
      let s = `<polygon points="${starPts(250, 200, 160, 160, 4, -67.5)}" fill="${p.c1}" stroke="${p.c2}" stroke-width="4"/>` +
        `<polygon points="${starPts(250, 200, 144, 144, 4, -67.5)}" fill="none" stroke="${p.c2}" stroke-width="1.2"/><g stroke="${p.c2}" stroke-opacity="0.45" stroke-width="1.5">`;
      for (let a = -160; a <= -20; a += 10) s += `<line x1="250" y1="270" x2="${r2(250 + 128 * Math.cos(rad(a)))}" y2="${r2(270 + 128 * Math.sin(rad(a)))}"/>`;
      s += `</g><circle cx="250" cy="200" r="74" fill="${p.c1}" stroke="${p.c2}" stroke-width="2"/>` +
        `<polygon points="80,200 90,190 100,200 90,210" fill="${p.c2}"/><polygon points="400,200 410,190 420,200 410,210" fill="${p.c2}"/>`;
      return s + T(p.initials, 250, 244, { size: 120, font: 'Cormorant Garamond', weight: 700, fill: p.c2, maxW: 130 }) +
        T(p.name, 250 + 5, 425, { size: 36, font: 'Montserrat', weight: 600, fill: p.c1, upper: true, ls: 10, maxW: 460 }) +
        T(p.tagline, 250, 462, { size: 24, font: 'Cormorant Garamond', weight: 500, italic: true, fill: shade(p.c2, 0.1), maxW: 420 });
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
