/* =========================================================================
 * motifs.js — Họa tiết / hoa văn theo chủ đề + gradient nền + gradient chữ.
 * Chạy trên bản vẽ đã có trong trang (DOM), chèn lớp trang trí ngay DƯỚI phần chữ.
 * ========================================================================= */
(function (root) {
  'use strict';
  const BL = root.BL, { mix, shade, tint, rng, r2, rad, starPts, flower, leaf, drum } = BL;
  const NS = 'http://www.w3.org/2000/svg';
  let N = 0;

  /* Các vị trí đặt họa tiết */
  const PLACES = {
    corners: '4 góc', diag: '2 góc chéo', top: '2 góc trên', bottomcorners: '2 góc dưới', sides: '2 bên',
    border: 'Viền khung', bands: 'Dải trên + dưới', topband: 'Dải trên', bottom: 'Dải dưới', full: 'Rải toàn nền', center: 'Giữa nền (chìm)',
  };
  /* Biến đổi để vẽ một họa tiết góc (vẽ trong góc phần tư +x +y) ra các góc */
  function cornerTx(place, W, H) {
    const C = [`translate(0 0)`, `translate(${W} 0) scale(-1 1)`, `translate(${W} ${H}) scale(-1 -1)`, `translate(0 ${H}) scale(1 -1)`];
    return { corners: C, diag: [C[0], C[2]], top: [C[0], C[1]], bottomcorners: [C[3], C[2]] }[place] || C;
  }
  const corner = (place, W, H, art) => cornerTx(place, W, H).map(tx => `<g transform="${tx}">${art}</g>`).join('');
  /* Rải ngẫu nhiên (có hạt giống), mật độ tăng dần về các góc khi place != full */
  function scatter(place, W, H, n, seed, draw) {
    const R = rng(seed); let s = '';
    for (let i = 0, k = 0; i < n * 6 && k < n; i++) {
      const x = R() * W, y = R() * H;
      if (place !== 'full') {
        const d = Math.min(Math.hypot(x, y), Math.hypot(W - x, y), Math.hypot(x, H - y), Math.hypot(W - x, H - y));
        if (R() > Math.pow(1 - Math.min(1, d / (H * 0.75)), 1.6)) continue;
      }
      s += draw(x, y, R, k++);
    }
    return s;
  }
  const pattern = (id, w, h, body) => `<defs><pattern id="${id}" width="${r2(w)}" height="${r2(h)}" patternUnits="userSpaceOnUse">${body}</pattern></defs>`;

  /* ---------------- Danh mục họa tiết ---------------- */
  const cloudPath = 'M 0 0 c 0 -14 18 -20 26 -10 c 4 -14 26 -16 32 0 c 12 -6 24 4 18 14 Z M 10 -4 a 6 6 0 1 1 8 -2 M 36 -6 a 7 7 0 1 1 9 -1';
  const lotus = (x, y, s, c) => {
    const pet = (len, rot, f) => `<path d="M 0 0 C ${r2(-len * 0.45)} ${r2(-len * 0.35)} ${r2(-len * 0.3)} ${r2(-len * 0.85)} 0 ${r2(-len)} C ${r2(len * 0.3)} ${r2(-len * 0.85)} ${r2(len * 0.45)} ${r2(-len * 0.35)} 0 0 Z" fill="${f}" transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})"/>`;
    return pet(s * 0.7, -70, tint(c, 0.45)) + pet(s * 0.7, 70, tint(c, 0.45)) + pet(s * 0.85, -38, tint(c, 0.2)) + pet(s * 0.85, 38, tint(c, 0.2)) + pet(s, 0, c) +
      `<path d="M ${r2(x - s * 0.8)} ${r2(y + s * 0.06)} Q ${r2(x)} ${r2(y + s * 0.2)} ${r2(x + s * 0.8)} ${r2(y + s * 0.06)}" fill="none" stroke="${shade(c, 0.2)}" stroke-width="${r2(s * 0.04)}"/>`;
  };
  function branch(S, c, kind) {
    const wood = '#5D3A1A', petal = kind === 'dao' ? '#F8A5C2' : '#FFC93C', heart = kind === 'dao' ? '#C2185B' : '#E8740C';
    let g = `<g fill="none" stroke="${wood}" stroke-linecap="round" transform="scale(${r2(S / 300)})"><path d="M -20 60 C 120 80 200 40 300 110 C 360 150 380 140 430 130" stroke-width="9"/>` +
      `<path d="M 150 70 C 170 120 160 160 190 200" stroke-width="5"/><path d="M 300 110 C 290 160 320 190 300 230" stroke-width="4"/><path d="M 80 65 C 90 30 120 20 140 0" stroke-width="4"/></g>`;
    let f = '';
    [[60, 62, 16], [140, 72, 20], [190, 200, 14], [240, 82, 18], [300, 110, 20], [300, 230, 13], [362, 146, 15], [430, 130, 17], [166, 140, 12], [122, 22, 13]].forEach((q, i) => {
      f += flower(q[0], q[1], q[2], c && kind === 'custom' ? c : petal, heart, { n: 5, rot: i * 13 });
    });
    return g + `<g transform="scale(${r2(S / 300)})">${f}</g>`;
  }
  function gear(cx, cy, r, teeth, c, w) {
    const pts = [];
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2, st = Math.PI * 2 / teeth;
      [[0, r], [0.15, r * 1.18], [0.35, r * 1.18], [0.5, r]].forEach(q => pts.push(`${r2(cx + q[1] * Math.cos(a + q[0] * st))},${r2(cy + q[1] * Math.sin(a + q[0] * st))}`));
    }
    return `<polygon points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/><circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r * 0.35)}" fill="none" stroke="${c}" stroke-width="${w}"/>`;
  }

  const MOTIFS = {
    trongdong: {
      name: 'Trống đồng Đông Sơn', places: ['sides', 'corners', 'center'], def: 'sides',
      draw(pl, W, H, o) {
        const R = H * 0.55 * o.scale;
        if (pl === 'center') return drum(W / 2, H / 2, H * 0.62 * o.scale, o.color);
        if (pl === 'corners') return [[0, 0], [W, 0], [0, H], [W, H]].map(q => drum(q[0], q[1], R * 0.85, o.color)).join('');
        return drum(0, H / 2, R, o.color) + drum(W, H / 2, R, o.color);
      },
    },
    may: {
      name: 'Mây tường vân', places: ['corners', 'diag', 'full'], def: 'corners',
      draw(pl, W, H, o) {
        if (pl === 'full') return scatter('full', W, H, 18, 21, (x, y, R) => `<path d="${cloudPath}" fill="none" stroke="${o.color}" stroke-width="2" transform="translate(${r2(x)} ${r2(y)}) scale(${r2((1 + R() * 1.4) * o.scale)})"/>`);
        const k = o.scale * H / 600;
        const art = [[40, 70, 2.6], [150, 40, 1.8], [70, 160, 1.6], [190, 120, 1.2]].map(c => `<path d="${cloudPath}" fill="${tint(o.color, 0.15)}" fill-opacity="0.35" stroke="${o.color}" stroke-width="1.6" transform="translate(${r2(c[0] * k)} ${r2(c[1] * k)}) scale(${r2(c[2] * k)})"/>`).join('');
        return corner(pl, W, H, art);
      },
    },
    sen: {
      name: 'Hoa sen', places: ['bottom', 'bottomcorners', 'center'], def: 'bottomcorners',
      draw(pl, W, H, o) {
        const s = H * 0.16 * o.scale;
        if (pl === 'center') return lotus(W / 2, H * 0.75, H * 0.55 * o.scale, o.color);
        if (pl === 'bottom') { let g = ''; const n = Math.max(3, Math.round(W / (s * 2.4))); for (let i = 0; i < n; i++) g += lotus((i + 0.5) * W / n, H - s * 0.15, s * (i % 2 ? 0.8 : 1), o.color); return g; }
        return lotus(s * 1.1, H - s * 0.15, s * 1.2, o.color) + lotus(s * 2.6, H - s * 0.1, s * 0.75, o.color) + lotus(W - s * 1.1, H - s * 0.15, s * 1.2, o.color) + lotus(W - s * 2.6, H - s * 0.1, s * 0.75, o.color);
      },
    },
    mai: { name: 'Cành mai vàng', places: ['diag', 'corners', 'top'], def: 'diag', draw: (pl, W, H, o) => corner(pl, W, H, branch(H * 0.5 * o.scale, o.color, 'mai')) },
    dao: { name: 'Cành hoa đào', places: ['diag', 'corners', 'top'], def: 'diag', draw: (pl, W, H, o) => corner(pl, W, H, branch(H * 0.5 * o.scale, o.color, 'dao')) },
    song: {
      name: 'Sóng nước (thanh hải ba)', places: ['bottom', 'bands', 'full'], def: 'bottom',
      draw(pl, W, H, o, id) {
        const r = 22 * o.scale;
        let tile = '';
        [1, 0.72, 0.44].forEach((k, i) => {
          tile += `<circle cx="${r}" cy="${r}" r="${r2(r * k)}" fill="${i % 2 ? 'none' : o.bg}" stroke="${o.color}" stroke-width="1.6"/>`;
          tile += `<circle cx="0" cy="${r * 2}" r="${r2(r * k)}" fill="${i % 2 ? 'none' : o.bg}" stroke="${o.color}" stroke-width="1.6"/><circle cx="${r * 2}" cy="${r * 2}" r="${r2(r * k)}" fill="${i % 2 ? 'none' : o.bg}" stroke="${o.color}" stroke-width="1.6"/>`;
        });
        const p = pattern(id, r * 2, r, `<g transform="translate(0 ${-r})">${tile}</g>`);
        const h = H * 0.16 * o.scale;
        if (pl === 'full') return p + `<rect width="${W}" height="${H}" fill="url(#${id})"/>`;
        if (pl === 'bands') return p + `<rect width="${W}" height="${r2(h * 0.7)}" fill="url(#${id})"/><rect y="${r2(H - h * 0.7)}" width="${W}" height="${r2(h * 0.7)}" fill="url(#${id})"/>`;
        return p + `<rect y="${r2(H - h)}" width="${W}" height="${r2(h)}" fill="url(#${id})"/>`;
      },
    },
    trien: {
      name: 'Hoa văn triện (chữ công)', places: ['border', 'bands', 'bottom'], def: 'bands',
      draw(pl, W, H, o, id) {
        const u = 8 * o.scale, c = o.color;
        const key = `<path d="M 0 ${u * 4} V 0 H ${u * 4} V ${u * 3} H ${u} V ${u} H ${u * 3} V ${u * 2} H ${u * 2}" fill="none" stroke="${c}" stroke-width="${r2(u * 0.55)}" stroke-linecap="square"/>`;
        const p = pattern(id, u * 5, u * 5, `<g transform="translate(${r2(u * 0.5)} ${r2(u * 0.5)})">${key}</g>`);
        const b = u * 5, m = H * 0.03;
        const band = (y) => `<rect x="0" y="${r2(y)}" width="${W}" height="${r2(b)}" fill="url(#${id})"/><line x1="0" y1="${r2(y - 3)}" x2="${W}" y2="${r2(y - 3)}" stroke="${c}" stroke-width="1.5"/><line x1="0" y1="${r2(y + b + 3)}" x2="${W}" y2="${r2(y + b + 3)}" stroke="${c}" stroke-width="1.5"/>`;
        if (pl === 'bottom') return p + band(H - b - m);
        if (pl === 'bands') return p + band(m) + band(H - b - m);
        return p + `<g><rect x="${r2(m)}" y="${r2(m)}" width="${r2(W - 2 * m)}" height="${r2(b)}" fill="url(#${id})"/><rect x="${r2(m)}" y="${r2(H - m - b)}" width="${r2(W - 2 * m)}" height="${r2(b)}" fill="url(#${id})"/>` +
          `<rect x="${r2(m)}" y="${r2(m)}" width="${r2(b)}" height="${r2(H - 2 * m)}" fill="url(#${id})"/><rect x="${r2(W - m - b)}" y="${r2(m)}" width="${r2(b)}" height="${r2(H - 2 * m)}" fill="url(#${id})"/>` +
          `<rect x="${r2(m - 4)}" y="${r2(m - 4)}" width="${r2(W - 2 * m + 8)}" height="${r2(H - 2 * m + 8)}" fill="none" stroke="${c}" stroke-width="1.5"/></g>`;
      },
    },
    artdeco: {
      name: 'Quạt Art Deco', places: ['corners', 'top', 'diag'], def: 'corners',
      draw(pl, W, H, o) {
        const S = H * 0.3 * o.scale; let a = '';
        for (let i = 1; i <= 4; i++) a += `<path d="M ${r2(S * i / 4)} 0 A ${r2(S * i / 4)} ${r2(S * i / 4)} 0 0 1 0 ${r2(S * i / 4)}" fill="none" stroke="${o.color}" stroke-width="2"/>`;
        for (let d = 10; d < 90; d += 10) a += `<line x1="0" y1="0" x2="${r2(S * Math.cos(rad(d)))}" y2="${r2(S * Math.sin(rad(d)))}" stroke="${o.color}" stroke-width="1"/>`;
        a += `<path d="M ${r2(S * 1.15)} 6 H 6 V ${r2(S * 1.15)}" fill="none" stroke="${o.color}" stroke-width="2.5"/>`;
        return corner(pl, W, H, `<g transform="translate(18 18)">${a}</g>`);
      },
    },
    la: {
      name: 'Lá cây nhiệt đới', places: ['corners', 'diag', 'top', 'bottomcorners'], def: 'diag',
      draw(pl, W, H, o) {
        const L = H * 0.28 * o.scale; let a = '';
        for (let i = 0; i < 9; i++) a += leaf(0, 0, L * (0.7 + (i % 3) * 0.2), 5 + i * 10, i % 2 ? o.color : shade(o.color, 0.25));
        return corner(pl, W, H, a);
      },
    },
    hinhhoc: {
      name: 'Tam giác hình học', places: ['corners', 'diag', 'sides'], def: 'diag',
      draw(pl, W, H, o) {
        const R = rng(5), S = H * 0.07 * o.scale; let a = '';
        for (let gy = 0; gy < 5; gy++) for (let gx = 0; gx < 5 - gy; gx++) {
          const x = gx * S, y = gy * S, op = r2(0.25 + R() * 0.75) * (1 - (gx + gy) / 6);
          a += `<polygon points="${r2(x)},${r2(y)} ${r2(x + S)},${r2(y)} ${r2(x)},${r2(y + S)}" fill="${R() < 0.5 ? o.color : tint(o.color, 0.3)}" opacity="${r2(op)}"/>`;
          if (gx + gy < 4) a += `<polygon points="${r2(x + S)},${r2(y)} ${r2(x + S)},${r2(y + S)} ${r2(x)},${r2(y + S)}" fill="${shade(o.color, 0.2)}" opacity="${r2(op * 0.7)}"/>`;
        }
        if (pl === 'sides') return `<g transform="translate(0 ${r2(H / 2 - S * 2.5)})">${a}</g><g transform="translate(${W} ${r2(H / 2 - S * 2.5)}) scale(-1 1)">${a}</g>`;
        return corner(pl, W, H, a);
      },
    },
    luoi: {
      name: 'Lưới công nghệ', places: ['full', 'corners', 'diag'], def: 'diag',
      draw(pl, W, H, o, id) {
        if (pl === 'full') { const s = 40 * o.scale; return pattern(id, s, s, `<path d="M ${s} 0 H 0 V ${s}" fill="none" stroke="${o.color}" stroke-width="1"/><circle cx="0" cy="0" r="2" fill="${o.color}"/>`) + `<rect width="${W}" height="${H}" fill="url(#${id})"/>`; }
        const R = rng(9), S = H * 0.45 * o.scale, P = [];
        for (let i = 0; i < 16; i++) { const a = R() * 90, d = R() * S; P.push([d * Math.cos(rad(a)), d * Math.sin(rad(a))]); }
        let a = '';
        P.forEach((p, i) => P.map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])]).filter(d => d[0] !== i).sort((x, y) => x[1] - y[1]).slice(0, 2)
          .forEach(d => { a += `<line x1="${r2(p[0])}" y1="${r2(p[1])}" x2="${r2(P[d[0]][0])}" y2="${r2(P[d[0]][1])}" stroke="${o.color}" stroke-width="1.2"/>`; }));
        P.forEach((p, i) => { a += `<circle cx="${r2(p[0])}" cy="${r2(p[1])}" r="${i % 3 ? 3 : 5}" fill="${o.color}"/>`; });
        return corner(pl, W, H, a);
      },
    },
    mach: {
      name: 'Mạch điện tử', places: ['corners', 'diag', 'sides'], def: 'diag',
      draw(pl, W, H, o) {
        const R = rng(3), S = H * 0.4 * o.scale; let a = '';
        for (let i = 0; i < 9; i++) {
          let x = 0, y = 12 + i * S / 9; const pts = [[x, y]];
          x += S * (0.2 + R() * 0.3); pts.push([x, y]); y += (R() - 0.3) * S * 0.25; x += Math.abs(y - pts[1][1]); pts.push([x, y]); x += S * R() * 0.3; pts.push([x, y]);
          a += `<polyline points="${pts.map(p => r2(p[0]) + ',' + r2(p[1])).join(' ')}" fill="none" stroke="${o.color}" stroke-width="2"/><circle cx="${r2(x)}" cy="${r2(y)}" r="4" fill="none" stroke="${o.color}" stroke-width="2"/>`;
        }
        if (pl === 'sides') return `<g transform="translate(0 ${r2(H / 2 - S / 2)})">${a}</g><g transform="translate(${W} ${r2(H / 2 - S / 2)}) scale(-1 1)">${a}</g>`;
        return corner(pl, W, H, a);
      },
    },
    chambi: {
      name: 'Chấm bi bán sắc', places: ['corners', 'diag', 'full'], def: 'diag',
      draw(pl, W, H, o, id) {
        if (pl === 'full') { const s = 26 * o.scale; return pattern(id, s, s, `<circle cx="${s / 2}" cy="${s / 2}" r="${r2(s * 0.16)}" fill="${o.color}"/>`) + `<rect width="${W}" height="${H}" fill="url(#${id})"/>`; }
        const S = H * 0.4 * o.scale, g = 16 * o.scale; let a = '';
        for (let y = g / 2; y < S; y += g) for (let x = g / 2; x < S; x += g) { const d = 1 - Math.hypot(x, y) / S; if (d > 0) a += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(g * 0.45 * d)}" fill="${o.color}"/>`; }
        return corner(pl, W, H, a);
      },
    },
    sao: {
      name: 'Sao lấp lánh', places: ['full', 'corners'], def: 'full',
      draw: (pl, W, H, o) => scatter(pl, W, H, 40, 17, (x, y, R) => {
        const s = (3 + R() * 9) * o.scale;
        return R() < 0.6 ? `<polygon points="${starPts(x, y, s, s * 0.45, 5)}" fill="${o.color}"/>` :
          `<path d="M ${r2(x)} ${r2(y - s)} Q ${r2(x)} ${r2(y)} ${r2(x + s)} ${r2(y)} Q ${r2(x)} ${r2(y)} ${r2(x)} ${r2(y + s)} Q ${r2(x)} ${r2(y)} ${r2(x - s)} ${r2(y)} Q ${r2(x)} ${r2(y)} ${r2(x)} ${r2(y - s)} Z" fill="${o.color}"/>`;
      }),
    },
    confetti: {
      name: 'Hoa giấy', places: ['full', 'corners'], def: 'full',
      draw: (pl, W, H, o) => scatter(pl, W, H, 90, 41, (x, y, R) => {
        const c = [o.color, tint(o.color, 0.4), shade(o.color, 0.25), '#ffffff'][Math.floor(R() * 4)];
        return R() < 0.6 ? `<rect x="${r2(x)}" y="${r2(y)}" width="${r2((4 + R() * 7) * o.scale)}" height="${r2((2 + R() * 4) * o.scale)}" fill="${c}" transform="rotate(${r2(R() * 180)} ${r2(x)} ${r2(y)})"/>` : `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2((1.5 + R() * 3) * o.scale)}" fill="${c}"/>`;
      }),
    },
    tim: {
      name: 'Trái tim', places: ['full', 'corners'], def: 'corners',
      draw: (pl, W, H, o) => scatter(pl, W, H, 26, 8, (x, y, R) => { const s = (6 + R() * 14) * o.scale; return BL.bd.heart(x, y, s, o.color, r2(0.4 + R() * 0.6)); }),
    },
    tuyet: {
      name: 'Bông tuyết', places: ['full', 'corners'], def: 'full',
      draw: (pl, W, H, o) => scatter(pl, W, H, 40, 25, (x, y, R) => {
        const s = (4 + R() * 10) * o.scale;
        return `<g stroke="${o.color}" stroke-width="${r2(s * 0.14)}" stroke-linecap="round">` + [0, 60, 120].map(a => `<line x1="${r2(x - s * Math.cos(rad(a)))}" y1="${r2(y - s * Math.sin(rad(a)))}" x2="${r2(x + s * Math.cos(rad(a)))}" y2="${r2(y + s * Math.sin(rad(a)))}"/>`).join('') + '</g>';
      }),
    },
    banhrang: {
      name: 'Bánh răng kỹ thuật', places: ['corners', 'diag', 'sides'], def: 'diag',
      draw(pl, W, H, o) {
        const S = H * 0.12 * o.scale;
        const a = gear(S * 1.1, S * 1.1, S, 12, o.color, 2.5) + gear(S * 2.65, S * 2.2, S * 0.6, 9, o.color, 2) + gear(S * 0.9, S * 2.9, S * 0.45, 8, o.color, 2);
        if (pl === 'sides') return `<g transform="translate(0 ${r2(H / 2 - S * 2)})">${a}</g><g transform="translate(${W} ${r2(H / 2 - S * 2)}) scale(-1 1)">${a}</g>`;
        return corner(pl, W, H, a);
      },
    },
  };

  /* Gợi ý họa tiết theo chủ đề */
  const SUGGEST = {
    'Hội nghị – hội thảo': ['trongdong', 'trien', 'luoi', 'hinhhoc', 'may'],
    'Lễ hội – văn hóa': ['trongdong', 'may', 'mai', 'dao', 'sen', 'song', 'trien'],
    'Giáo dục': ['sao', 'chambi', 'la', 'banhrang', 'confetti'],
    'Tiệc – lễ kỷ niệm': ['artdeco', 'sao', 'confetti', 'trien'],
    'Cưới hỏi – gia đình': ['tim', 'sen', 'la', 'dao', 'may'],
    'Doanh nghiệp – công nghệ': ['luoi', 'mach', 'hinhhoc', 'banhrang', 'chambi'],
    'Cộng đồng – xã hội': ['la', 'tim', 'chambi', 'sen'],
    'Thể thao – thanh niên': ['hinhhoc', 'sao', 'chambi', 'confetti'],
    'Âm nhạc – sáng tạo': ['sao', 'hinhhoc', 'chambi', 'artdeco'],
  };

  /* ---------------- Gradient ---------------- */
  const TEXT_GRAD = {
    gold: ['Nhũ vàng', ['#FFF3B0', '#E6B422', '#9C6B12', '#F7D774'], 'v'],
    silver: ['Ánh bạc', ['#FFFFFF', '#C9CED6', '#7D8590', '#EEF1F5'], 'v'],
    bronze: ['Đồng đỏ', ['#F6D2A5', '#C47F3A', '#7A4319', '#E5A96B'], 'v'],
    rosegold: ['Vàng hồng', ['#FFE3D8', '#E8A19A', '#B7625F', '#F5C6B8'], 'v'],
    rainbow: ['Cầu vồng', ['#E53935', '#FB8C00', '#FDD835', '#43A047', '#1E88E5', '#8E24AA'], 'h'],
    sunset: ['Hoàng hôn', ['#FF5F6D', '#FFC371'], 'h'],
    ocean: ['Đại dương', ['#00C6FF', '#0072FF'], 'h'],
    neon: ['Neon', ['#FF2E88', '#7C4DFF', '#00E5FF'], 'h'],
    forest: ['Rừng xanh', ['#A8E063', '#2E7D32'], 'h'],
    fire: ['Lửa', ['#FFE259', '#FF7A00', '#D50000'], 'v'],
  };
  const BG_GRAD = {
    sunset: ['Hoàng hôn', ['#FF5F6D', '#FFC371']], ocean: ['Đại dương', ['#00C6FF', '#0072FF']], purple: ['Tím mộng mơ', ['#7F00FF', '#E100FF']],
    gold: ['Đêm vàng', ['#2B1D00', '#D4AF37']], forest: ['Rừng xanh', ['#134E5E', '#71B280']], dusk: ['Chạng vạng', ['#2C3E50', '#FD746C']],
    peach: ['Đào – bạc hà', ['#FFDEE9', '#B5FFFC']], fade: ['Tối dần về đáy', ['#000000', '#000000']], light: ['Sáng dần lên đỉnh', ['#FFFFFF', '#FFFFFF']],
  };
  const BLENDS = { normal: 'Phủ màu', overlay: 'Lồng (overlay)', 'soft-light': 'Ánh sáng dịu', multiply: 'Nhân (tối hơn)', screen: 'Sáng hơn', color: 'Đổi tông màu' };

  function gradDef(id, stops, dir, angle, type) {
    const st = stops.map((c, i) => `<stop offset="${r2(i / (stops.length - 1))}" stop-color="${c}"/>`).join('');
    if (type === 'radial') return `<radialGradient id="${id}" cx="0.5" cy="0.45" r="0.75">${st}</radialGradient>`;
    if (dir === 'v') return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st}</linearGradient>`;
    if (dir === 'h') return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${st}</linearGradient>`;
    const a = rad(angle || 0), dx = Math.cos(a) / 2, dy = Math.sin(a) / 2;
    return `<linearGradient id="${id}" x1="${r2(0.5 - dx)}" y1="${r2(0.5 - dy)}" x2="${r2(0.5 + dx)}" y2="${r2(0.5 + dy)}">${st}</linearGradient>`;
  }

  /* Điểm chèn: ngay trước phần tử cấp 1 đầu tiên có chứa chữ (tức là trên nền, dưới chữ) */
  function insertBelowText(svg, html, tag) {
    const at = Array.from(svg.children).find(k => k.tagName !== 'defs' && (k.tagName === 'text' || k.querySelector('text')));
    const g = document.createElementNS(NS, 'g');
    g.setAttribute(tag, '1');
    g.innerHTML = html;
    svg.insertBefore(g, at || null);
    return g;
  }

  /* p: motif, motifPlace, motifColor, motifOp, motifScale, bgGrad, bgGradA, bgGradB, bgGradAngle, bgGradType, bgGradOp, bgGradBlend, textGrad, textGradA, textGradB, textGradTarget */
  function decorate(svg, t, p) {
    const W = t.w, H = t.h;
    // 1. Gradient phủ nền
    if (p.bgGrad && p.bgGrad !== 'none') {
      const id = 'mg' + (++N).toString(36);
      let stops = p.bgGrad === 'custom' ? [p.bgGradA, p.bgGradB] : BG_GRAD[p.bgGrad][1];
      let html;
      if (p.bgGrad === 'fade' || p.bgGrad === 'light') {
        const c = stops[0];
        html = `<defs><linearGradient id="${id}" x1="0" y1="${p.bgGrad === 'fade' ? 0 : 1}" x2="0" y2="${p.bgGrad === 'fade' ? 1 : 0}"><stop offset="0.25" stop-color="${c}" stop-opacity="0"/><stop offset="1" stop-color="${c}" stop-opacity="1"/></linearGradient></defs>`;
      } else html = `<defs>${gradDef(id, stops, null, p.bgGradAngle, p.bgGradType)}</defs>`;
      html += `<rect width="${W}" height="${H}" fill="url(#${id})" opacity="${r2((p.bgGradOp == null ? 45 : p.bgGradOp) / 100)}" style="mix-blend-mode:${p.bgGradBlend || 'normal'}"/>`;
      insertBelowText(svg, html, 'data-bggrad');
    }
    // 2. Họa tiết
    if (p.motif && p.motif !== 'none' && MOTIFS[p.motif]) {
      const m = MOTIFS[p.motif], place = m.places.includes(p.motifPlace) ? p.motifPlace : m.def;
      const o = { color: p.motifColor || '#ffffff', scale: (p.motifScale || 100) / 100, bg: 'none' };
      const html = m.draw(place, W, H, o, 'mt' + (++N).toString(36));
      const g = insertBelowText(svg, html, 'data-motif');
      g.setAttribute('opacity', r2((p.motifOp == null ? 35 : p.motifOp) / 100));
      g.setAttribute('pointer-events', 'none');
    }
    // 3. Gradient chữ
    if (p.textGrad && p.textGrad !== 'none') {
      const g = p.textGrad === 'custom' ? ['', [p.textGradA, p.textGradB], 'h'] : TEXT_GRAD[p.textGrad];
      const id = 'tg' + (++N).toString(36);
      let defs = svg.querySelector('defs[data-tg]');
      if (!defs) { defs = document.createElementNS(NS, 'defs'); defs.setAttribute('data-tg', '1'); svg.insertBefore(defs, svg.firstChild); }
      defs.insertAdjacentHTML('beforeend', gradDef(id, g[1], g[2]));
      const texts = Array.from(svg.querySelectorAll('text')).filter(el => !el.closest('[data-deco]') && !el.querySelector('textPath') && el.getAttribute('fill') !== 'none' && el.textContent.trim());
      const sizes = texts.map(el => parseFloat(el.getAttribute('font-size')) || 0), max = Math.max.apply(null, sizes.concat([0]));
      const target = p.textGradTarget || 'title';
      texts.forEach((el, i) => {
        const sz = sizes[i];
        const ok = target === 'all' || (target === 'big' ? sz >= 40 : sz >= max * 0.85);
        if (ok) { el.setAttribute('fill', `url(#${id})`); el.setAttribute('data-grad', p.textGrad); }
      });
    }
  }
  const active = p => (p.motif && p.motif !== 'none') || (p.bgGrad && p.bgGrad !== 'none') || (p.textGrad && p.textGrad !== 'none');

  root.BLMotifs = { MOTIFS, PLACES, SUGGEST, TEXT_GRAD, BG_GRAD, BLENDS, decorate, active, helpers: { corner, scatter, pattern, cornerTx } };
})(window);
