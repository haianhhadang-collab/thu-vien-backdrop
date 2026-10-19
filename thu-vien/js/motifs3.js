/* =========================================================================
 * motifs3.js — Họa tiết chủ đề chính trị – lịch sử – văn hóa (nối vào BLMotifs)
 * ========================================================================= */
(function (root) {
  'use strict';
  const BL = root.BL, MO = root.BLMotifs, S = BL.sym, { r2, tint, shade } = BL;
  Object.assign(MO.PLACES, { left: 'Bên trái', right: 'Bên phải', bottomcenter: 'Giữa dưới' });

  const NEW = {
    codang: {
      name: 'Cờ Đảng – cờ Tổ quốc tung bay', places: ['top', 'sides'], def: 'top', defOp: 100, defColor: '#E9C46A',
      draw(pl, W, H, o) {
        const k = o.scale, fw = 230 * k, fh = 150 * k;
        if (pl === 'sides') return S.flagOnPole(40, H * 0.22, H * 0.7, fw, fh, 'dang', 1, o.color) + S.flagOnPole(W - 40, H * 0.22, H * 0.7, fw, fh, 'vn', -1, o.color);
        return S.flagOnPole(46, 40, 300 * k, fw, fh, 'dang', 1, o.color) + S.flagOnPole(W - 46, 40, 300 * k, fw, fh, 'vn', -1, o.color);
      },
    },
    cotoquoc: {
      name: 'Cờ Tổ quốc tung bay', places: ['top', 'sides'], def: 'top', defOp: 100, defColor: '#E9C46A',
      draw(pl, W, H, o) {
        const k = o.scale, fw = 230 * k, fh = 150 * k;
        if (pl === 'sides') return S.flagOnPole(40, H * 0.22, H * 0.7, fw, fh, 'vn', 1, o.color) + S.flagOnPole(W - 40, H * 0.22, H * 0.7, fw, fh, 'vn', -1, o.color);
        return S.flagOnPole(46, 40, 300 * k, fw, fh, 'vn', 1, o.color) + S.flagOnPole(W - 46, 40, 300 * k, fw, fh, 'vn', -1, o.color);
      },
    },
    busao: {
      name: 'Búa liềm (chìm)', places: ['center', 'sides', 'corners'], def: 'center', defOp: 12, defColor: '#FFDE00',
      draw(pl, W, H, o) {
        if (pl === 'sides') return S.hammerSickle(H * 0.3, H / 2, H * 0.55 * o.scale, o.color) + S.hammerSickle(W - H * 0.3, H / 2, H * 0.55 * o.scale, o.color);
        if (pl === 'corners') return [[1, 1], [W - 1, 1], [1, H - 1], [W - 1, H - 1]].map(q => S.hammerSickle(q[0] + (q[0] < W / 2 ? 70 : -70) * o.scale, q[1] + (q[1] < H / 2 ? 70 : -70) * o.scale, 130 * o.scale, o.color)).join('');
        return S.hammerSickle(W / 2, H / 2, H * 0.85 * o.scale, o.color);
      },
    },
    saovang: {
      name: 'Sao vàng tỏa sáng', places: ['center', 'topband', 'sides'], def: 'topband', defOp: 85, defColor: '#FFDE00',
      draw(pl, W, H, o) {
        const R = 46 * o.scale;
        if (pl === 'center') return S.starBurst(W / 2, H / 2, R * 2.2, o.color, 48);
        if (pl === 'sides') return S.starBurst(H * 0.3, H / 2, R * 1.2, o.color, 40) + S.starBurst(W - H * 0.3, H / 2, R * 1.2, o.color, 40);
        return S.starBurst(W / 2, R * 1.4, R, o.color, 40);
      },
    },
    bando: {
      name: 'Bản đồ Việt Nam (có Hoàng Sa, Trường Sa)', places: ['right', 'left', 'center'], def: 'right', defOp: 60,
      draw(pl, W, H, o) {
        const h = H * 0.9 * Math.min(1.1, o.scale), w = S.vnMap.width(h);
        const x0 = pl === 'left' ? 30 : pl === 'center' ? (W - w) / 2 : W - w - 20;
        return S.vnMap(x0, (H - h) / 2, h, o.color, { label: o.color });
      },
    },
    langbac: {
      name: 'Lăng Chủ tịch Hồ Chí Minh', places: ['bottomcenter', 'center', 'right', 'left'], def: 'bottomcenter',
      draw(pl, W, H, o) {
        const w = 420 * o.scale;
        if (pl === 'center') return S.langBac(W / 2, H * 0.72, w * 1.5, o.color);
        if (pl === 'right') return S.langBac(W - w / 2 - 30, H - 8, w, o.color);
        if (pl === 'left') return S.langBac(w / 2 + 30, H - 8, w, o.color);
        return S.langBac(W / 2, H - 6, w, o.color);
      },
    },
    khuevan: {
      name: 'Khuê Văn Các (Văn Miếu)', places: ['bottomcenter', 'center', 'right', 'left'], def: 'bottomcenter',
      draw(pl, W, H, o) {
        const w = 210 * o.scale;
        if (pl === 'center') return S.khueVanCac(W / 2, H * 0.8, w * 1.8, o.color);
        if (pl === 'right') return S.khueVanCac(W - w / 2 - 40, H - 6, w, o.color);
        if (pl === 'left') return S.khueVanCac(w / 2 + 40, H - 6, w, o.color);
        return S.khueVanCac(W / 2, H - 6, w, o.color);
      },
    },
    chuamotcot: {
      name: 'Chùa Một Cột', places: ['bottomcenter', 'right', 'left'], def: 'right',
      draw(pl, W, H, o) {
        const w = 260 * o.scale;
        const x = pl === 'right' ? W - w / 2 - 30 : pl === 'left' ? w / 2 + 30 : W / 2;
        return S.chuaMotCot(x, H - 4, w, o.color);
      },
    },
    cotco: {
      name: 'Cột cờ Hà Nội', places: ['right', 'left', 'sides'], def: 'right',
      draw(pl, W, H, o) {
        const w = 150 * o.scale;
        const one = x => S.cotCo(x, H - 4, w, o.color, true);
        return pl === 'left' ? one(w / 2 + 40) : pl === 'sides' ? one(w / 2 + 40) + one(W - w / 2 - 40) : one(W - w / 2 - 40);
      },
    },
    nhasan: {
      name: 'Nhà sàn Bác Hồ', places: ['bottomcenter', 'right', 'left'], def: 'right',
      draw(pl, W, H, o) {
        const w = 330 * o.scale;
        const x = pl === 'right' ? W - w / 2 - 30 : pl === 'left' ? w / 2 + 30 : W / 2;
        return S.nhaSan(x, H - 4, w, o.color);
      },
    },
    luytre: {
      name: 'Lũy tre làng', places: ['bottomcorners', 'sides'], def: 'bottomcorners',
      draw(pl, W, H, o) {
        const h = H * 0.62 * o.scale, base = pl === 'sides' ? H * 0.85 : H;
        return S.bamboo(30, base, h, o.color, 1) + S.bamboo(W - 30, base, h, o.color, -1);
      },
    },
    dailua: {
      name: 'Dải lụa đỏ – vàng', places: ['bottom', 'bands', 'topband'], def: 'bottom', defOp: 95, defColor: '#C8102E',
      draw(pl, W, H, o) {
        const c1 = o.color, c2 = tint(o.color, 0.55);
        return pl === 'bottom' ? S.silk(W, H, c1, c2) : pl === 'topband' ? S.silk(W, H, c1, c2, true) : S.silk(W, H, c1, c2) + S.silk(W, H, c1, c2, true);
      },
    },
  };
  Object.assign(MO.MOTIFS, NEW);

  const ADD = {
    'Chính trị – lịch sử': ['codang', 'cotoquoc', 'saovang', 'busao', 'dailua', 'bando', 'langbac', 'trongdong', 'chimlac', 'sen', 'cotco', 'khuevan', 'nhasan', 'luytre', 'trien', 'may'],
    'Hội nghị – hội thảo': ['dailua', 'saovang', 'codang', 'busao', 'khuevan', 'langbac', 'bando'],
    'Lễ hội – văn hóa': ['khuevan', 'chuamotcot', 'luytre', 'cotco', 'cotoquoc', 'bando'],
    'Giáo dục': ['khuevan', 'cotoquoc'],
    'Thể thao – thanh niên': ['cotoquoc', 'saovang', 'codang'],
    'Cộng đồng – xã hội': ['cotoquoc', 'luytre', 'bando'],
  };
  Object.keys(ADD).forEach(k => { MO.SUGGEST[k] = (MO.SUGGEST[k] || []).concat(ADD[k].filter(x => !(MO.SUGGEST[k] || []).includes(x))); });
})(window);
