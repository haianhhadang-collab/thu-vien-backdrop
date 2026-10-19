/* =========================================================================
 * logos.js — 12 mẫu logo (khung 500 × 500, nền trong suốt)
 * ========================================================================= */
(function (root) {
  'use strict';
  const { T, arcText, star, starPts, laurel, ribbon, drum, flower, leaf, mix, shade, tint, textW, fitSize, r2, rad } = root.BL;
  const F = (k, label, v, extra) => Object.assign({ k, label, v }, extra || {});
  const C = (k, label, v) => ({ k, label, v });
  const add = t => root.BL.templates.push(Object.assign({ type: 'logo', w: 500, h: 500 }, t));

  /* L01 — Huy hiệu tròn, chữ chạy vòng */
  add({
    id: 'L01', name: 'Huy hiệu tròn – chữ chạy vòng', styles: ['Trang trọng', 'Cổ điển'],
    use: 'Trường học, hội đồng, câu lạc bộ, tổ chức xã hội',
    desc: 'Emblem kinh điển: tên đơn vị chạy theo vòng tròn, chữ viết tắt lớn ở giữa. Dễ nhận diện, in con dấu, huy hiệu cài áo đều đẹp.',
    fields: [F('name', 'Tên đơn vị (vòng trên)', 'Câu lạc bộ Sách Hà Nội'), F('tagline', 'Dòng phụ (vòng dưới)', 'Đọc – Nghĩ – Hành động'),
      F('initials', 'Chữ viết tắt', 'HBC'), F('year', 'Năm / dòng nhỏ', '— 2026 —')],
    colors: [C('c1', 'Màu chính', '#1B2A4A'), C('c2', 'Màu nhấn', '#C9A227')],
    render(p, u) {
      return `<circle cx="250" cy="250" r="184" fill="${tint(p.c2, 0.88)}"/>` +
        `<circle cx="250" cy="250" r="232" fill="none" stroke="${p.c1}" stroke-width="8"/>` +
        `<circle cx="250" cy="250" r="196" fill="none" stroke="${p.c1}" stroke-width="2.5"/>` +
        arcText(p.name, 250, 250, 200, 'top', { size: 24, fill: p.c1, font: 'Montserrat', weight: 800, ls: 3, upper: true, maxArc: 0.78 }, u + 't') +
        arcText(p.tagline, 250, 250, 222, 'bottom', { size: 19, fill: p.c1, font: 'Montserrat', weight: 600, ls: 2, upper: true, maxArc: 0.62 }, u + 'b') +
        star(36, 250, 11, p.c2) + star(464, 250, 11, p.c2) +
        T(p.initials, 250, 300, { size: 150, font: 'Playfair Display', weight: 900, fill: p.c1, maxW: 290 }) +
        `<line x1="175" y1="332" x2="325" y2="332" stroke="${p.c2}" stroke-width="3"/>` +
        T(p.year, 250, 372, { size: 22, font: 'Montserrat', weight: 600, fill: p.c2, ls: 3, maxW: 220 });
    },
  });

  /* L02 — Khiên huy hiệu + ruy băng */
  add({
    id: 'L02', name: 'Khiên huy hiệu (Crest)', styles: ['Trang trọng', 'Cổ điển'],
    use: 'Trường học, đội tuyển thể thao, học viện, dòng họ',
    desc: 'Hình khiên tạo cảm giác truyền thống – vững chãi; dải ruy băng mang tên đơn vị. Hợp với áo đồng phục, cờ đội, bảng hiệu.',
    fields: [F('name', 'Tên trên ruy băng', 'Học viện Ánh Dương'), F('initials', 'Chữ viết tắt', 'AD'), F('year', 'Dòng năm', 'Est. 2026')],
    colors: [C('c1', 'Màu khiên', '#14213D'), C('c2', 'Màu nhũ / ruy băng', '#E0B03A')],
    render(p, u) {
      const shield = 'M250 30 L425 85 L425 240 Q425 380 250 455 Q75 380 75 240 L75 85 Z';
      return `<path d="${shield}" fill="${p.c1}"/>` +
        `<path d="${shield}" fill="none" stroke="${p.c2}" stroke-width="3" transform="translate(250 242) scale(0.9) translate(-250 -242)"/>` +
        star(250, 132, 34, p.c2) +
        T(p.initials, 250, 285, { size: 120, font: 'Playfair Display', weight: 900, fill: '#ffffff', maxW: 250 }) +
        T(p.year, 250, 338, { size: 20, font: 'Montserrat', weight: 600, fill: p.c2, ls: 3, upper: true, maxW: 220 }) +
        ribbon(250, 385, 370, 54, p.c2, shade(p.c2, 0.25), p.name, { fill: p.c1, size: 25 }, u + 'r');
    },
  });

  /* L03 — Wordmark hiện đại + biểu tượng giao thoa */
  add({
    id: 'L03', name: 'Wordmark hiện đại', styles: ['Hiện đại', 'Tối giản'],
    use: 'Studio, thương hiệu cá nhân, startup, cửa hàng',
    desc: 'Tên thương hiệu là trung tâm; biểu tượng hai vòng tròn giao nhau thể hiện kết nối. Dấu chấm màu nhấn tạo điểm nhớ.',
    fields: [F('name', 'Tên thương hiệu', 'Sao Mai'), F('tagline', 'Khẩu hiệu ngắn', 'Creative Studio')],
    colors: [C('c1', 'Màu chính', '#1D3557'), C('c2', 'Màu nhấn', '#E63946'), C('c3', 'Màu giao thoa', '#F4A261')],
    render(p, u) {
      const fam = 'Be Vietnam Pro', s = fitSize(p.name, 86, 390, fam, 800, -1);
      const w = textW(p.name, s, fam, 800, -1);
      return `<defs><clipPath id="${u}c"><circle cx="222" cy="170" r="62"/></clipPath></defs>` +
        `<circle cx="222" cy="170" r="62" fill="${p.c1}"/><circle cx="282" cy="170" r="62" fill="${p.c2}"/>` +
        `<circle cx="282" cy="170" r="62" fill="${p.c3}" clip-path="url(#${u}c)"/>` +
        T(p.name, 250 - 10, 330, { size: s, font: fam, weight: 800, fill: p.c1, ls: -1 }) +
        `<circle cx="${r2(250 - 10 + w / 2 + 14)}" cy="${r2(330 - s * 0.06)}" r="${r2(s * 0.11)}" fill="${p.c2}"/>` +
        T(p.tagline, 250, 385, { size: 19, font: fam, weight: 500, fill: tint(p.c1, 0.35), ls: 6, upper: true, maxW: 420 });
    },
  });

  /* L04 — Chữ cái trong lục giác gradient */
  add({
    id: 'L04', name: 'Lettermark lục giác', styles: ['Hiện đại', 'Công nghệ'],
    use: 'Công ty công nghệ, phần mềm, kỹ thuật, xây dựng',
    desc: 'Một chữ cái đậm trong khối lục giác chuyển màu – gọn, mạnh, dễ thu nhỏ thành icon ứng dụng hay favicon.',
    fields: [F('initials', 'Chữ cái', 'V'), F('name', 'Tên công ty', 'Vietek Solutions'), F('tagline', 'Khẩu hiệu', 'Smart Technology')],
    colors: [C('c1', 'Màu đầu', '#2563EB'), C('c2', 'Màu cuối', '#7C3AED')],
    render(p, u) {
      return `<defs><linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.c1}"/><stop offset="1" stop-color="${p.c2}"/></linearGradient></defs>` +
        `<polygon points="${starPts(250, 195, 150, 150, 3, -90)}" fill="url(#${u}g)"/>` +
        `<polygon points="${starPts(250, 195, 128, 128, 3, -90)}" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="2"/>` +
        T(p.initials, 250, 255, { size: 170, font: 'Montserrat', weight: 900, fill: '#ffffff', maxW: 200 }) +
        T(p.name, 250, 415, { size: 42, font: 'Montserrat', weight: 800, fill: shade(p.c1, 0.35), ls: 2, upper: true, maxW: 450 }) +
        T(p.tagline, 250, 455, { size: 18, font: 'Montserrat', weight: 500, fill: p.c2, ls: 5, upper: true, maxW: 420 });
    },
  });

  /* L05 — Huy hiệu vintage */
  add({
    id: 'L05', name: 'Huy hiệu Vintage', styles: ['Cổ điển', 'Năng động'],
    use: 'Quán cà phê, tiệm bánh, barber, thương hiệu thủ công',
    desc: 'Phong cách retro: nền tối, ruy băng thẳng cắt ngang, ngôi sao và năm thành lập. Hợp in tem nhãn, cốc, túi giấy.',
    fields: [F('name', 'Tên (vòng trên)', 'Phố Cổ Coffee'), F('short', 'Chữ trên dải ngang', 'COFFEE'),
      F('tagline', 'Vòng dưới', 'Rang xay thủ công'), F('year', 'Năm', 'EST. 2026')],
    colors: [C('c1', 'Màu nền', '#2B2D42'), C('c2', 'Màu dải', '#D90429'), C('c3', 'Màu chữ', '#EDE6D6')],
    render(p, u) {
      return `<circle cx="250" cy="250" r="228" fill="${p.c1}"/>` +
        `<circle cx="250" cy="250" r="212" fill="none" stroke="${p.c3}" stroke-width="3"/>` +
        `<circle cx="250" cy="250" r="200" fill="none" stroke="${p.c3}" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/>` +
        `<circle cx="250" cy="250" r="132" fill="none" stroke="${p.c3}" stroke-width="1.5"/>` +
        arcText(p.name, 250, 250, 163, 'top', { size: 30, fill: p.c3, font: 'Oswald', weight: 700, ls: 4, upper: true, maxArc: 0.75 }, u + 't') +
        arcText(p.tagline, 250, 250, 188, 'bottom', { size: 21, fill: p.c3, font: 'Oswald', weight: 500, ls: 3, upper: true, maxArc: 0.62 }, u + 'b') +
        star(212, 186, 9, p.c3) + star(250, 178, 13, p.c3) + star(288, 186, 9, p.c3) +
        ribbon(250, 216, 380, 64, p.c2, shade(p.c2, 0.35), p.short, { fill: p.c3, font: 'Oswald', weight: 700, size: 40, ls: 5, curve: 0 }, u + 'r') +
        T(p.year, 250, 340, { size: 24, font: 'Oswald', weight: 500, fill: p.c3, ls: 6, maxW: 200 });
    },
  });

  /* L06 — Mầm lá thiên nhiên */
  add({
    id: 'L06', name: 'Mầm lá xanh', styles: ['Tối giản', 'Thiên nhiên'],
    use: 'Nông sản sạch, mỹ phẩm thiên nhiên, dự án môi trường, spa',
    desc: 'Hai chiếc lá non vươn lên từ mặt đất – thông điệp tăng trưởng, an toàn, bền vững. Chữ serif mềm tạo cảm giác gần gũi.',
    fields: [F('name', 'Tên thương hiệu', 'Mầm Xanh'), F('tagline', 'Khẩu hiệu', 'Nông sản sạch Việt')],
    colors: [C('c1', 'Màu lá đậm', '#2D6A4F'), C('c2', 'Màu lá nhạt', '#74C69D')],
    render(p) {
      return `<path d="M250 265 C 175 255 140 175 165 110 C 235 120 270 190 250 265 Z" fill="${p.c2}"/>` +
        `<path d="M255 265 C 285 185 345 140 415 150 C 410 235 335 285 255 265 Z" fill="${p.c1}"/>` +
        `<path d="M250 260 Q 205 200 170 118" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="2.5" stroke-linecap="round"/>` +
        `<path d="M258 260 Q 330 212 408 156" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="2.5" stroke-linecap="round"/>` +
        `<path d="M252 340 Q 247 300 252 262" fill="none" stroke="${p.c1}" stroke-width="8" stroke-linecap="round"/>` +
        `<path d="M168 342 Q 252 318 336 342" fill="none" stroke="${p.c1}" stroke-width="5" stroke-linecap="round"/>` +
        T(p.name, 250, 418, { size: 56, font: 'Lora', weight: 700, fill: p.c1, maxW: 440 }) +
        T(p.tagline, 250, 458, { size: 17, font: 'Be Vietnam Pro', weight: 500, fill: shade(p.c2, 0.35), ls: 5, upper: true, maxW: 420 });
    },
  });

  /* L07 — Khối lập phương công nghệ */
  add({
    id: 'L07', name: 'Khối 3D công nghệ', styles: ['Công nghệ', 'Hiện đại'],
    use: 'Startup công nghệ, AI, dữ liệu, blockchain, kỹ thuật số',
    desc: 'Khối lập phương isometric với đường mạch điện tử – gợi tư duy hệ thống và nền tảng dữ liệu. Tên dùng chữ chuyển màu.',
    fields: [F('name', 'Tên công ty', 'Cubix AI'), F('tagline', 'Khẩu hiệu', 'Data • Cloud • AI')],
    colors: [C('c1', 'Màu mặt trái', '#0EA5E9'), C('c2', 'Màu mặt phải', '#6366F1'), C('c3', 'Màu đường mạch', '#0F172A')],
    render(p, u) {
      const cy = 205, V = { t: [250, cy - 95], ur: [332, cy - 47.5], c: [250, cy], ul: [168, cy - 47.5], b: [250, cy + 95], ll: [168, cy + 47.5], lr: [332, cy + 47.5] };
      const P = (...ks) => ks.map(k => V[k].join(',')).join(' ');
      const traces = [[V.t, [250, cy - 140]], [V.ur, [375, cy - 72], [412, cy - 72]], [V.ll, [125, cy + 72], [88, cy + 72]], [V.lr, [372, cy + 70]], [V.ul, [128, cy - 70]]];
      let s = `<defs><linearGradient id="${u}g" x1="0" x2="1"><stop offset="0" stop-color="${p.c1}"/><stop offset="1" stop-color="${p.c2}"/></linearGradient></defs>`;
      traces.forEach(tr => {
        s += `<polyline points="${tr.map(q => q.join(',')).join(' ')}" fill="none" stroke="${p.c3}" stroke-width="3" stroke-linejoin="round"/>`;
        const e = tr[tr.length - 1];
        s += `<circle cx="${e[0]}" cy="${e[1]}" r="7" fill="#fff" stroke="${p.c3}" stroke-width="3"/>`;
      });
      s += `<polygon points="${P('t', 'ur', 'c', 'ul')}" fill="${tint(p.c1, 0.4)}"/>` +
        `<polygon points="${P('ul', 'c', 'b', 'll')}" fill="${p.c1}"/>` +
        `<polygon points="${P('c', 'ur', 'lr', 'b')}" fill="${p.c2}"/>`;
      Object.values(V).forEach(q => { s += `<circle cx="${q[0]}" cy="${q[1]}" r="5.5" fill="#fff" stroke="${p.c3}" stroke-width="2"/>`; });
      return s + T(p.name, 250, 402, { size: 54, font: 'Montserrat', weight: 800, fill: `url(#${u}g)`, ls: 3, upper: true, maxW: 440 }) +
        T(p.tagline, 250, 442, { size: 18, font: 'Montserrat', weight: 600, fill: p.c3, ls: 5, upper: true, maxW: 420 });
    },
  });

  /* L08 — Logo kỷ niệm năm thành lập */
  add({
    id: 'L08', name: 'Logo kỷ niệm năm thành lập', styles: ['Trang trọng', 'Sự kiện'],
    use: 'Kỷ niệm 10/20/50 năm thành lập trường, công ty, ngành',
    desc: 'Con số lớn trong vòng nguyệt quế, dải ruy băng mang tên đơn vị. Dùng in kỷ niệm chương, quà tặng, góc backdrop.',
    fields: [F('num', 'Số năm', '20'), F('unit', 'Chữ dưới số', 'NĂM'), F('years', 'Mốc thời gian', '2006 – 2026'), F('name', 'Tên trên ruy băng', 'Trường THPT Chu Văn An')],
    colors: [C('c1', 'Màu chính', '#1E3A8A'), C('c2', 'Màu nguyệt quế', '#D4A017')],
    render(p, u) {
      return laurel(250, 252, 178, p.c2, { from: 108, to: 245, n: 9 }) +
        T(p.num, 250, 292, { size: 170, font: 'Playfair Display', weight: 900, fill: p.c1, maxW: 230 }) +
        T(p.unit, 250, 336, { size: 30, font: 'Montserrat', weight: 800, fill: p.c2, ls: 10, upper: true, maxW: 200 }) +
        T(p.years, 250, 372, { size: 18, font: 'Montserrat', weight: 600, fill: p.c1, ls: 2, maxW: 220 }) +
        ribbon(250, 398, 330, 50, p.c1, shade(p.c1, 0.35), p.name, { fill: '#ffffff', size: 22 }, u + 'r');
    },
  });

  /* L09 — Chữ ký thư pháp (boutique) */
  add({
    id: 'L09', name: 'Chữ ký thư pháp Boutique', styles: ['Sang trọng', 'Lãng mạn'],
    use: 'Thời trang, tiệm hoa, nail – spa, nhiếp ảnh, quán trà',
    desc: 'Tên viết tay mềm mại đặt trong khung tròn mảnh, dòng phụ chữ in giãn rộng. Cổ điển, nữ tính, cao cấp.',
    fields: [F('name', 'Tên (chữ viết tay)', 'Hoa Mộc'), F('tagline', 'Dòng phụ', 'Flower & Gift'), F('year', 'Dòng nhỏ', 'since 2026')],
    colors: [C('c1', 'Màu chữ', '#3D2C2E'), C('c2', 'Màu nhũ', '#B08D57')],
    render(p) {
      const fam = 'Montserrat', tg = String(p.tagline || '').toUpperCase();
      const tw = textW(tg, 16, fam, 500, 7) / 2;
      return `<circle cx="250" cy="250" r="205" fill="none" stroke="${p.c2}" stroke-width="1.6"/>` +
        `<circle cx="250" cy="250" r="196" fill="none" stroke="${p.c2}" stroke-width="0.8"/>` +
        `<polygon points="${starPts(250, 148, 13, 3, 4)}" fill="${p.c2}"/>` +
        T(p.name, 250, 275, { size: 118, font: 'Great Vibes', weight: 400, fill: p.c1, maxW: 350 }) +
        T(tg, 250 + 3.5, 330, { size: 16, font: fam, weight: 500, fill: p.c2, ls: 7, maxW: 260 }) +
        (tg ? `<line x1="${r2(Math.max(80, 250 - tw - 52))}" y1="325" x2="${r2(250 - tw - 14)}" y2="325" stroke="${p.c2}" stroke-width="1.2"/>` +
          `<line x1="${r2(250 + tw + 14)}" y1="325" x2="${r2(Math.min(420, 250 + tw + 52))}" y2="325" stroke="${p.c2}" stroke-width="1.2"/>` : '') +
        T(p.year, 250, 372, { size: 22, font: 'Cormorant Garamond', weight: 500, italic: true, fill: p.c1, maxW: 200 });
    },
  });

  /* L10 — Monogram đám cưới */
  add({
    id: 'L10', name: 'Monogram đám cưới', styles: ['Lãng mạn', 'Sang trọng'],
    use: 'Thiệp cưới, backdrop gate, tem dán quà, khăn ăn tiệc cưới',
    desc: 'Hai chữ cái đầu của cô dâu – chú rể nối bằng dấu "&" viết tay, vòng hoa lá nhẹ nhàng. Có thể ép kim, in nhũ.',
    fields: [F('i1', 'Chữ cái 1', 'B'), F('i2', 'Chữ cái 2', 'A'), F('date', 'Ngày cưới', '12 . 12 . 2026'), F('names', 'Tên hai bạn', 'Quốc Bảo & Minh Anh')],
    colors: [C('c1', 'Màu chữ', '#5C4033'), C('c2', 'Màu nhũ', '#C9A27E'), C('c3', 'Màu hoa', '#E8B4B8')],
    render(p) {
      const cx = 250, cy = 222, R = 165, green = '#8AA58C';
      const sprig = (a1, a2, dir) => {
        let s = '';
        for (let i = 0; i <= 6; i++) {
          const a = a1 + (a2 - a1) * i / 6, x = cx + R * Math.cos(rad(a)), y = cy + R * Math.sin(rad(a));
          const tan = a + 90 * dir;
          s += leaf(x, y, 26 - i * 1.5, tan + (i % 2 ? 40 : -40), i % 2 ? green : shade(green, 0.15));
        }
        return s;
      };
      return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${p.c2}" stroke-width="2"/>` +
        sprig(150, 105, -1) + sprig(-30, -75, -1) +
        flower(cx + R * Math.cos(rad(130)), cy + R * Math.sin(rad(130)), 22, p.c3, p.c2, { n: 5 }) +
        flower(cx + R * Math.cos(rad(152)), cy + R * Math.sin(rad(152)), 13, tint(p.c3, 0.3), p.c2, { n: 5, rot: 20 }) +
        flower(cx + R * Math.cos(rad(-50)), cy + R * Math.sin(rad(-50)), 22, p.c3, p.c2, { n: 5, rot: 10 }) +
        flower(cx + R * Math.cos(rad(-28)), cy + R * Math.sin(rad(-28)), 13, tint(p.c3, 0.3), p.c2, { n: 5 }) +
        T(p.i1, 166, 262, { size: 118, font: 'Cormorant Garamond', weight: 600, fill: p.c1, maxW: 110 }) +
        T('&', 250, 258, { size: 84, font: 'Great Vibes', weight: 400, fill: p.c2 }) +
        T(p.i2, 334, 262, { size: 118, font: 'Cormorant Garamond', weight: 600, fill: p.c1, maxW: 110 }) +
        T(p.date, 250, 312, { size: 19, font: 'Cormorant Garamond', weight: 600, fill: p.c1, ls: 4, maxW: 220 }) +
        T(p.names, 250, 455, { size: 46, font: 'Great Vibes', weight: 400, fill: p.c1, maxW: 450 });
    },
  });

  /* L11 — Biểu tượng ô vuông bo góc (kiểu app icon) */
  add({
    id: 'L11', name: 'Icon ô vuông bo góc', styles: ['Hiện đại', 'Vui tươi'],
    use: 'Ứng dụng di động, kênh mạng xã hội, trung tâm đào tạo, F&B trẻ trung',
    desc: 'Chữ cái trắng trên khối vuông bo tròn chuyển màu – tối ưu cho avatar Facebook/Zalo/TikTok và biểu tượng ứng dụng.',
    fields: [F('initials', 'Chữ cái', 'K'), F('name', 'Tên', 'Kidz English'), F('tagline', 'Khẩu hiệu', 'Học vui – Nói giỏi')],
    colors: [C('c1', 'Màu đầu', '#FF6B6B'), C('c2', 'Màu cuối', '#F06595'), C('c3', 'Màu điểm nhấn', '#FFD43B')],
    render(p, u) {
      return `<defs><linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.c1}"/><stop offset="1" stop-color="${p.c2}"/></linearGradient>` +
        `<clipPath id="${u}k"><rect x="110" y="40" width="280" height="280" rx="72"/></clipPath></defs>` +
        `<rect x="110" y="40" width="280" height="280" rx="72" fill="url(#${u}g)"/>` +
        `<g clip-path="url(#${u}k)"><circle cx="390" cy="40" r="115" fill="${p.c3}" opacity="0.55"/><circle cx="110" cy="320" r="70" fill="#fff" opacity="0.12"/></g>` +
        T(p.initials, 250, 248, { size: 190, font: 'Be Vietnam Pro', weight: 900, fill: '#ffffff', maxW: 220 }) +
        T(p.name, 250, 405, { size: 46, font: 'Be Vietnam Pro', weight: 800, fill: shade(p.c2, 0.45), maxW: 450 }) +
        T(p.tagline, 250, 447, { size: 19, font: 'Be Vietnam Pro', weight: 500, fill: shade(p.c1, 0.1), ls: 3, maxW: 420 });
    },
  });

  /* L12 — Hoa văn trống đồng */
  add({
    id: 'L12', name: 'Hoa văn trống đồng', styles: ['Truyền thống', 'Trang trọng'],
    use: 'Sự kiện văn hóa, du lịch, bảo tàng, sản phẩm thủ công mỹ nghệ, lễ hội',
    desc: 'Mặt trống đồng Đông Sơn cách điệu: ngôi sao 14 cánh, vòng chim Lạc, hoa văn răng cưa. Mang bản sắc Việt rõ nét.',
    fields: [F('name', 'Tên', 'Lễ hội Văn hóa Việt'), F('tagline', 'Dòng phụ', 'Hà Nội 2026')],
    colors: [C('c1', 'Màu nền trống', '#8B1E1E'), C('c2', 'Màu hoa văn', '#E2B65A')],
    render(p) {
      return `<circle cx="250" cy="200" r="168" fill="${p.c1}"/>` + drum(250, 200, 156, p.c2) +
        `<circle cx="250" cy="200" r="168" fill="none" stroke="${p.c2}" stroke-width="3"/>` +
        T(p.name, 250, 420, { size: 44, font: 'Playfair Display', weight: 700, fill: p.c1, maxW: 470 }) +
        T(p.tagline, 250, 458, { size: 18, font: 'Be Vietnam Pro', weight: 600, fill: shade(p.c2, 0.3), ls: 5, upper: true, maxW: 420 });
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
