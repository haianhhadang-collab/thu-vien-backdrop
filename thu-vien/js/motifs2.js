/* =========================================================================
 * motifs2.js — 13 họa tiết – hoa văn bổ sung (nối vào BLMotifs)
 * ========================================================================= */
(function (root) {
  'use strict';
  const BL = root.BL, MO = root.BLMotifs, { mix, shade, tint, rng, r2, rad, starPts, leaf } = BL;
  const { corner, scatter, pattern } = MO.helpers;

  /* Tô một vùng (dải / viền / toàn nền) bằng mẫu lặp url(#id) */
  function fillPlace(pl, W, H, id, b, color) {
    const m = H * 0.03, f = `fill="url(#${id})"`;
    const band = y => `<rect x="0" y="${r2(y)}" width="${W}" height="${r2(b)}" ${f}/>` +
      `<line x1="0" y1="${r2(y - 3)}" x2="${W}" y2="${r2(y - 3)}" stroke="${color}" stroke-width="1.5"/><line x1="0" y1="${r2(y + b + 3)}" x2="${W}" y2="${r2(y + b + 3)}" stroke="${color}" stroke-width="1.5"/>`;
    if (pl === 'full') return `<rect width="${W}" height="${H}" ${f}/>`;
    if (pl === 'bottom') return band(H - b - m);
    if (pl === 'topband') return band(m);
    if (pl === 'bands') return band(m) + band(H - b - m);
    return `<rect x="${r2(m)}" y="${r2(m)}" width="${r2(W - 2 * m)}" height="${r2(b)}" ${f}/><rect x="${r2(m)}" y="${r2(H - m - b)}" width="${r2(W - 2 * m)}" height="${r2(b)}" ${f}/>` +
      `<rect x="${r2(m)}" y="${r2(m + b)}" width="${r2(b)}" height="${r2(H - 2 * m - 2 * b)}" ${f}/><rect x="${r2(W - m - b)}" y="${r2(m + b)}" width="${r2(b)}" height="${r2(H - 2 * m - 2 * b)}" ${f}/>` +
      `<rect x="${r2(m - 4)}" y="${r2(m - 4)}" width="${r2(W - 2 * m + 8)}" height="${r2(H - 2 * m + 8)}" fill="none" stroke="${color}" stroke-width="1.5"/>`;
  }
  const lacBird = (L, c) => `<path d="M ${r2(-L)} 0 Q 0 ${r2(-L * 0.28)} ${r2(L)} ${r2(-L * 0.05)} L ${r2(L * 1.7)} ${r2(L * 0.04)} L ${r2(L * 0.9)} ${r2(L * 0.14)} Q 0 ${r2(L * 0.32)} ${r2(-L)} 0 Z` +
    ` M ${r2(-L * 0.2)} ${r2(-L * 0.12)} L ${r2(-L * 0.75)} ${r2(-L * 0.6)} L ${r2(-L * 0.05)} ${r2(-L * 0.22)} Z M ${r2(L * 0.55)} ${r2(-L * 0.12)} L ${r2(L * 0.4)} ${r2(-L * 0.5)} L ${r2(L * 0.75)} ${r2(-L * 0.1)} Z" fill="${c}"/>` +
    `<g stroke="${c}" stroke-width="${r2(L * 0.07)}" stroke-linecap="round"><line x1="${r2(-L)}" y1="0" x2="${r2(-L * 1.7)}" y2="${r2(-L * 0.25)}"/><line x1="${r2(-L)}" y1="0" x2="${r2(-L * 1.8)}" y2="${r2(L * 0.05)}"/><line x1="${r2(-L)}" y1="0" x2="${r2(-L * 1.6)}" y2="${r2(L * 0.3)}"/></g>`;

  const NEW = {
    chimlac: {
      name: 'Chim Lạc bay (Đông Sơn)', places: ['bands', 'bottom', 'topband', 'center'], def: 'bands',
      draw(pl, W, H, o) {
        const L = 26 * o.scale;
        if (pl === 'center') {
          let g = ''; const R = H * 0.42 * o.scale;
          for (let i = 0; i < 12; i++) g += `<g transform="rotate(${i * 30} ${W / 2} ${H / 2}) translate(${W / 2} ${r2(H / 2 - R)})">${lacBird(L, o.color)}</g>`;
          return g + `<circle cx="${W / 2}" cy="${H / 2}" r="${r2(R + L * 1.2)}" fill="none" stroke="${o.color}" stroke-width="1.5"/><circle cx="${W / 2}" cy="${H / 2}" r="${r2(R - L * 1.2)}" fill="none" stroke="${o.color}" stroke-width="1.5"/>`;
        }
        const row = y => { let g = `<line x1="0" y1="${r2(y - L)}" x2="${W}" y2="${r2(y - L)}" stroke="${o.color}" stroke-width="1.5"/><line x1="0" y1="${r2(y + L * 0.8)}" x2="${W}" y2="${r2(y + L * 0.8)}" stroke="${o.color}" stroke-width="1.5"/>`; for (let x = L * 2.2; x < W; x += L * 4.4) g += `<g transform="translate(${r2(x)} ${r2(y)})">${lacBird(L, o.color)}</g>`; return g; };
        const top = H * 0.03 + L * 1.1, bot = H - H * 0.03 - L;
        return pl === 'bottom' ? row(bot) : pl === 'topband' ? row(top) : row(top) + row(bot);
      },
    },
    hoathi: {
      name: 'Hoa thị (cửa sổ cổ)', places: ['full', 'bands', 'border', 'bottom'], def: 'border',
      draw(pl, W, H, o, id) {
        const s = 34 * o.scale, c = s / 2, e = (rot) => `<ellipse cx="${r2(c)}" cy="${r2(c - s * 0.2)}" rx="${r2(s * 0.13)}" ry="${r2(s * 0.2)}" fill="none" stroke="${o.color}" stroke-width="1.5" transform="rotate(${rot} ${r2(c)} ${r2(c)})"/>`;
        const tile = e(0) + e(90) + e(180) + e(270) + `<circle cx="${r2(c)}" cy="${r2(c)}" r="${r2(s * 0.06)}" fill="${o.color}"/>` +
          [[0, 0], [s, 0], [0, s], [s, s]].map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="${r2(s * 0.1)}" fill="none" stroke="${o.color}" stroke-width="1.5"/>`).join('');
        return pattern(id, s, s, tile) + fillPlace(pl, W, H, id, s * 1.5, o.color);
      },
    },
    vayca: {
      name: 'Vảy cá – ngói âm dương', places: ['full', 'bottom', 'bands'], def: 'bottom',
      draw(pl, W, H, o, id) {
        const r = 18 * o.scale;
        const tile = `<path d="M ${-r} 0 A ${r} ${r} 0 0 0 ${r} 0 M ${r} 0 A ${r} ${r} 0 0 0 ${3 * r} 0 M 0 ${r} A ${r} ${r} 0 0 0 ${2 * r} ${r}" fill="none" stroke="${o.color}" stroke-width="1.6"/>`;
        return pattern(id, 2 * r, 2 * r, tile) + fillPlace(pl, W, H, id, H * 0.16 * o.scale, o.color);
      },
    },
    matcao: {
      name: 'Lưới mắt cáo', places: ['full', 'bands', 'border'], def: 'full',
      draw(pl, W, H, o, id) {
        const s = 30 * o.scale;
        const tile = `<path d="M 0 0 L ${s} ${s} M ${s} 0 L 0 ${s}" stroke="${o.color}" stroke-width="1"/><circle cx="${s / 2}" cy="${s / 2}" r="${r2(s * 0.07)}" fill="${o.color}"/>`;
        return pattern(id, s, s, tile) + fillPlace(pl, W, H, id, s * 1.2, o.color);
      },
    },
    dongtien: {
      name: 'Đồng tiền vàng', places: ['full', 'corners', 'bottom'], def: 'corners',
      draw(pl, W, H, o) {
        const coin = (x, y, r) => `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(r)}" fill="${o.color}"/><circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(r * 0.82)}" fill="none" stroke="${shade(o.color, 0.3)}" stroke-width="${r2(r * 0.08)}"/>` +
          `<rect x="${r2(x - r * 0.22)}" y="${r2(y - r * 0.22)}" width="${r2(r * 0.44)}" height="${r2(r * 0.44)}" fill="${shade(o.color, 0.45)}"/>`;
        if (pl === 'bottom') { let g = ''; const R = rng(4); for (let x = 20; x < W; x += 34 * o.scale) g += coin(x + R() * 10, H - 30 - R() * 30, (12 + R() * 8) * o.scale); return g; }
        return scatter(pl, W, H, pl === 'full' ? 30 : 40, 33, (x, y, R) => coin(x, y, (8 + R() * 14) * o.scale));
      },
    },
    phaohoa: {
      name: 'Pháo hoa', places: ['topband', 'full', 'corners'], def: 'topband',
      draw(pl, W, H, o) {
        const cols = [o.color, '#FFD54F', '#FF6B6B', '#4FC3F7', '#C77DFF'];
        const burst = (x, y, R, c) => {
          let g = `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(R * 0.9)}" fill="${c}" opacity="0.08"/>`;
          for (let i = 0; i < 18; i++) {
            const a = rad(i * 20), x1 = x + R * 0.25 * Math.cos(a), y1 = y + R * 0.25 * Math.sin(a), x2 = x + R * Math.cos(a), y2 = y + R * Math.sin(a);
            g += `<line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" stroke="${c}" stroke-width="2" stroke-linecap="round"/><circle cx="${r2(x2)}" cy="${r2(y2)}" r="2.6" fill="${c}"/>`;
          }
          return g;
        };
        const R = rng(12); let g = '';
        const n = pl === 'full' ? 9 : 6;
        for (let i = 0; i < n; i++) {
          let x = R() * W, y = pl === 'full' ? R() * H : 40 + R() * H * 0.28;
          if (pl === 'corners') { x = (i % 2 ? W - 60 - R() * 220 : 60 + R() * 220); y = (i % 4 < 2 ? 60 + R() * 120 : H - 60 - R() * 120); }
          g += burst(x, y, (40 + R() * 50) * o.scale, cols[i % cols.length]);
        }
        return g;
      },
    },
    bongbay: {
      name: 'Chùm bóng bay', places: ['bottomcorners', 'sides', 'top'], def: 'bottomcorners',
      draw(pl, W, H, o) {
        const b = BL.bd2.balloon, k = o.scale, cols = [o.color, tint(o.color, 0.45), shade(o.color, 0.15), '#ffffff'];
        const cluster = (x0, y0, dir) => [[0, 0, 44], [70, -50, 38], [40, 60, 36], [110, 30, 30], [-10, -90, 30]].map((q, i) =>
          b(x0 + dir * q[0] * k, y0 + q[1] * k, q[2] * k, cols[i % 4], -dir * 15)).join('');
        if (pl === 'sides') return cluster(70, H * 0.45, 1) + cluster(W - 70, H * 0.45, -1);
        if (pl === 'top') return cluster(80, 120, 1) + cluster(W - 80, 120, -1);
        return cluster(80, H - 230 * k, 1) + cluster(W - 80, H - 230 * k, -1);
      },
    },
    notnhac: {
      name: 'Nốt nhạc bay', places: ['full', 'corners'], def: 'corners',
      draw: (pl, W, H, o) => scatter(pl, W, H, 26, 51, (x, y, R) => {
        const s = (14 + R() * 18) * o.scale, rot = r2(-20 + R() * 40);
        if (R() < 0.5) return `<g transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})" fill="${o.color}"><ellipse cx="0" cy="0" rx="${r2(s * 0.42)}" ry="${r2(s * 0.3)}" transform="rotate(-20)"/>` +
          `<rect x="${r2(s * 0.32)}" y="${r2(-s * 1.6)}" width="${r2(s * 0.1)}" height="${r2(s * 1.6)}"/><path d="M ${r2(s * 0.42)} ${r2(-s * 1.6)} q ${r2(s * 0.6)} ${r2(s * 0.3)} ${r2(s * 0.4)} ${r2(s * 0.9)} q ${r2(-s * 0.05)} ${r2(-s * 0.45)} ${r2(-s * 0.4)} ${r2(-s * 0.55)} Z"/></g>`;
        return `<g transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})" fill="${o.color}"><ellipse cx="0" cy="0" rx="${r2(s * 0.38)}" ry="${r2(s * 0.27)}" transform="rotate(-20)"/><ellipse cx="${r2(s * 1.1)}" cy="${r2(-s * 0.2)}" rx="${r2(s * 0.38)}" ry="${r2(s * 0.27)}" transform="rotate(-20 ${r2(s * 1.1)} ${r2(-s * 0.2)})"/>` +
          `<rect x="${r2(s * 0.3)}" y="${r2(-s * 1.5)}" width="${r2(s * 0.09)}" height="${r2(s * 1.5)}"/><rect x="${r2(s * 1.4)}" y="${r2(-s * 1.7)}" width="${r2(s * 0.09)}" height="${r2(s * 1.5)}"/><polygon points="${r2(s * 0.3)},${r2(-s * 1.5)} ${r2(s * 1.49)},${r2(-s * 1.7)} ${r2(s * 1.49)},${r2(-s * 1.5)} ${r2(s * 0.3)},${r2(-s * 1.3)}"/></g>`;
      }),
    },
    lathu: {
      name: 'Lá thu rơi', places: ['full', 'corners', 'top'], def: 'top',
      draw(pl, W, H, o) {
        const cols = [o.color, '#E76F51', '#F4A261', '#E9C46A', '#BC4749'];
        const maple = (x, y, s, c, rot) => `<g transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})"><polygon points="${starPts(0, 0, s, s * 0.5, 5)}" fill="${c}" stroke="${c}" stroke-width="${r2(s * 0.25)}" stroke-linejoin="round"/><line x1="0" y1="${r2(s * 0.3)}" x2="0" y2="${r2(s * 1.3)}" stroke="${shade(c, 0.3)}" stroke-width="${r2(s * 0.08)}"/></g>`;
        if (pl === 'top') {
          const R = rng(61); let g = '';
          for (let i = 0; i < 30; i++) { const x = R() * W, y = Math.pow(R(), 2) * H * 0.55; g += maple(x, y, (8 + R() * 12) * o.scale, cols[i % 5], r2(R() * 360)); }
          return g;
        }
        return scatter(pl, W, H, 28, 61, (x, y, R, k) => maple(x, y, (8 + R() * 12) * o.scale, cols[k % 5], r2(R() * 360)));
      },
    },
    songlua: {
      name: 'Sóng lụa mềm', places: ['bottom', 'topband', 'bands'], def: 'bottom',
      draw(pl, W, H, o) {
        const k = o.scale;
        let g = `<path d="M 0 ${r2(H * 0.8)} C ${r2(W * 0.3)} ${r2(H * (0.8 - 0.14 * k))} ${r2(W * 0.6)} ${r2(H * (0.8 + 0.16 * k))} ${W} ${r2(H * (0.8 - 0.1 * k))} L ${W} ${H} L 0 ${H} Z" fill="${o.color}" fill-opacity="0.45"/>`;
        for (let i = 0; i < 16; i++) {
          const y = H * 0.74 + i * 5 * k;
          g += `<path d="M -40 ${r2(y)} C ${r2(W * 0.3)} ${r2(y - H * 0.14 * k + i * 2)} ${r2(W * 0.6)} ${r2(y + H * 0.16 * k - i * 1.5)} ${W + 40} ${r2(y - H * 0.1 * k + i * 3)}" fill="none" stroke="${i % 4 ? o.color : tint(o.color, 0.5)}" stroke-width="${i % 4 ? 1.2 : 2.4}" opacity="${r2(0.25 + (i % 5) * 0.12)}"/>`;
        }
        const top = `<g transform="translate(${W} ${H}) rotate(180)">${g}</g>`;
        return pl === 'bottom' ? g : pl === 'topband' ? top : g + top;
      },
    },
    toong: {
      name: 'Tổ ong lục giác', places: ['corners', 'diag', 'full'], def: 'diag',
      draw(pl, W, H, o) {
        const s = 22 * o.scale, hx = s * 1.5, hy = s * Math.sqrt(3);
        const hex = (x, y, op, fill) => `<polygon points="${starPts(x, y, s * 0.92, s * 0.92, 3, 0)}" fill="${fill ? o.color : 'none'}" stroke="${o.color}" stroke-width="1.5" opacity="${r2(op)}"/>`;
        let a = '';
        if (pl === 'full') {
          for (let i = 0; i * hx < W + s; i++) for (let j = 0; j * hy < H + s; j++) a += hex(i * hx, j * hy + (i % 2 ? hy / 2 : 0), 0.6, false);
          return a;
        }
        const R = rng(8), S = H * 0.45 * o.scale;
        for (let i = 0; i * hx < S; i++) for (let j = 0; j * hy < S; j++) {
          const x = i * hx, y = j * hy + (i % 2 ? hy / 2 : 0), d = 1 - Math.hypot(x, y) / S;
          if (d > 0) a += hex(x, y, d, R() < 0.15);
        }
        return corner(pl, W, H, a);
      },
    },
    tianang: {
      name: 'Tia nắng tỏa', places: ['center', 'topband', 'diag'], def: 'center',
      draw(pl, W, H, o) {
        const fan = (cx, cy, a0, a1, n) => {
          let g = ''; const st = (a1 - a0) / n;
          for (let i = 0; i < n; i += 2) g += `<polygon points="${r2(cx)},${r2(cy)} ${r2(cx + 1600 * Math.cos(rad(a0 + i * st)))},${r2(cy + 1600 * Math.sin(rad(a0 + i * st)))} ${r2(cx + 1600 * Math.cos(rad(a0 + (i + 1) * st)))},${r2(cy + 1600 * Math.sin(rad(a0 + (i + 1) * st)))}" fill="${o.color}"/>`;
          return g;
        };
        const n = Math.round(36 / o.scale) * 2;
        if (pl === 'topband') return fan(W / 2, -40, 0, 180, n / 2);
        if (pl === 'diag') return fan(0, 0, 0, 90, n / 4) + fan(W, H, 180, 270, n / 4);
        return fan(W / 2, H / 2, 0, 360, n);
      },
    },
    denday: {
      name: 'Dây đèn lấp lánh', places: ['topband', 'bands', 'full'], def: 'topband',
      draw(pl, W, H, o) {
        const cols = [o.color, '#FFD54F', '#FF6B6B', '#4FC3F7', '#81C784'];
        const string = (y, sag, flip, seed) => {
          const R = rng(seed);
          let g = `<path d="M -10 ${y} Q ${W / 2} ${y + sag * 2 * flip} ${W + 10} ${y}" fill="none" stroke="#5D4037" stroke-opacity="0.6" stroke-width="1.5"/>`;
          const n = Math.round(W / (55 * o.scale));
          for (let i = 0; i <= n; i++) {
            const t = i / n, x = -10 + (W + 20) * t, yy = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + sag * 2 * flip) + t * t * y, c = cols[Math.floor(R() * 5)];
            g += `<circle cx="${r2(x)}" cy="${r2(yy + 10 * flip)}" r="${r2(14 * o.scale)}" fill="${c}" opacity="0.25"/><ellipse cx="${r2(x)}" cy="${r2(yy + 10 * flip)}" rx="${r2(5 * o.scale)}" ry="${r2(7 * o.scale)}" fill="${c}"/>`;
          }
          return g;
        };
        if (pl === 'bands') return string(14, 40, 1, 3) + string(H - 14, 40, -1, 5);
        if (pl === 'full') return string(14, 50, 1, 3) + string(H * 0.38, 40, 1, 7) + string(H - 14, 40, -1, 5);
        return string(14, 45, 1, 3) + string(-20, 70, 1, 9);
      },
    },
  };
  Object.assign(MO.MOTIFS, NEW);

  /* Bổ sung gợi ý theo chủ đề */
  const ADD = {
    'Hội nghị – hội thảo': ['songlua', 'chimlac', 'matcao', 'toong'],
    'Lễ hội – văn hóa': ['chimlac', 'hoathi', 'vayca', 'dongtien', 'phaohoa', 'denday', 'lathu'],
    'Giáo dục': ['bongbay', 'notnhac', 'toong', 'tianang'],
    'Tiệc – lễ kỷ niệm': ['phaohoa', 'denday', 'bongbay', 'songlua', 'dongtien'],
    'Cưới hỏi – gia đình': ['bongbay', 'denday', 'hoathi'],
    'Doanh nghiệp – công nghệ': ['toong', 'songlua', 'tianang', 'dongtien'],
    'Cộng đồng – xã hội': ['lathu', 'bongbay', 'tianang'],
    'Thể thao – thanh niên': ['tianang', 'toong', 'phaohoa'],
    'Âm nhạc – sáng tạo': ['notnhac', 'denday', 'phaohoa'],
  };
  Object.keys(ADD).forEach(k => { MO.SUGGEST[k] = (MO.SUGGEST[k] || []).concat(ADD[k].filter(x => !(MO.SUGGEST[k] || []).includes(x))); });
})(window);
