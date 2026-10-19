/* =========================================================================
 * app.js — Giao diện thư viện: lưới mẫu, bộ lọc, trình chỉnh sửa, xuất file
 * ========================================================================= */
(function () {
  'use strict';
  const BL = window.BL, TPL = BL.templates, esc = BL.esc;
  const $ = s => document.querySelector(s);
  let uidN = 0;
  const uid = () => 'k' + (uidN++).toString(36) + '_';

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* bỏ qua */ } },
  };

  const state = { tab: 'backdrop', filter: 'Tất cả', cur: null, p: null, logo: store.get('bl.logo'), photo: store.get('bl.photo'), closed: store.get('bl.closed') || [] };

  /* ---------- Giá trị của mẫu ---------- */
  function defaults(t) {
    const p = {};
    t.fields.forEach(f => { p[f.k] = f.v; });
    t.colors.forEach(c => { p[c.k] = c.v; });
    p.logoOn = true;
    // Tùy chọn tự động (mặc định bật)
    Object.assign(p, { scaleHead: 100, scaleBody: 100, autoFill: false, autoLayout: true, fxText: 'auto', fxBg: 'auto', textMode: 'template', textColor: '#ffffff' });
    // Họa tiết & gradient (mặc định tắt để giữ nguyên mẫu)
    const accent = (t.colors[1] || t.colors[0]).v;
    Object.assign(p, {
      motif: 'none', motifPlace: '', motifColor: accent, motifOp: 35, motifScale: 100,
      bgGrad: 'none', bgGradA: '#FF5F6D', bgGradB: '#FFC371', bgGradAngle: 135, bgGradType: 'linear', bgGradOp: 45, bgGradBlend: 'overlay',
      textGrad: 'none', textGradA: '#FFD54F', textGradB: '#FF6F00', textGradTarget: 'title',
    });
    return p;
  }
  function values(t) {
    const p = Object.assign(defaults(t), store.get('bl.v.' + t.id) || {});
    p.logo = state.logo || null;
    if (t.photo) p.photo = state.photo || null;
    return p;
  }
  function save(t, p) {
    const copy = Object.assign({}, p);
    delete copy.logo;
    delete copy.photo;
    store.set('bl.v.' + t.id, copy);
  }
  function svgOf(t, p, headScale) {
    BL.setRO({ head: (headScale || 1) * (p.scaleHead || 100) / 100, body: (p.scaleBody || 100) / 100, fill: !!p.autoFill });
    try { return BL.svgDoc(t.w, t.h, t.render(p, uid())); } finally { BL.setRO(null); }
  }

  const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* ---------- Lưới mẫu ---------- */
  const fold = s => slug(s).replace(/-/g, ' ');
  function renderGallery() {
    const list = TPL.filter(t => t.type === 'backdrop');
    const count = k => list.filter(t => t.topic === k).length;
    const topics = ['Tất cả'].concat([...new Set(list.map(t => t.topic))].sort((a, b) => count(b) - count(a)));
    if (!topics.includes(state.filter)) state.filter = 'Tất cả';
    $('#chips').innerHTML = topics.map(s => `<button class="${s === state.filter ? 'on' : ''}" data-f="${esc(s)}">${esc(s)} <small>${s === 'Tất cả' ? list.length : count(s)}</small></button>`).join('');
    const styles = [...new Set(list.flatMap(t => t.styles))].sort();
    if (state.style && !styles.includes(state.style)) state.style = '';
    $('#styleSel').innerHTML = '<option value="">Mọi phong cách</option>' + styles.map(s => `<option${s === state.style ? ' selected' : ''}>${esc(s)}</option>`).join('');
    // Tìm theo cụm từ, khớp từ đầu một chữ, không phân biệt dấu ("y te" → "Y tế", không khớp "ngày tết")
    const phrase = fold(state.q || '').trim();
    const shown = list.filter(t => (state.filter === 'Tất cả' || t.topic === state.filter) &&
      (!state.style || t.styles.includes(state.style)) &&
      (!phrase || (' ' + fold([t.id, t.name, t.use, t.desc, t.topic].concat(t.styles).join(' ')) + ' ').includes(' ' + phrase)));
    $('#count').textContent = shown.length + ' / ' + list.length + ' mẫu';
    const grid = $('#grid');
    const filtering = !!phrase || !!state.style || state.filter !== 'Tất cả';
    const groups = topics.slice(1).map(k => [k, shown.filter(t => t.topic === k)]).filter(g => g[1].length);
    const card = t => `
      <article class="card">
        <div class="thumb ${t.type}" data-id="${t.id}" title="Mở để chỉnh sửa">${svgOf(t, values(t))}</div>
        <div class="meta">
          <span class="topic">${esc(t.topic)}</span>
          <h3><span class="id">${t.id}</span>${esc(t.name)}</h3>
          <div class="tags">${t.styles.map(s => `<span>${esc(s)}</span>`).join('')}</div>
          <p class="use">${esc(t.use)}</p>
          <button class="btn" data-id="${t.id}">Dùng mẫu này</button>
        </div>
      </article>`;
    grid.className = 'groups';
    grid.innerHTML = groups.length ? groups.map(([k, arr]) => `
      <details class="grp" data-topic="${esc(k)}"${filtering || !state.closed.includes(k) ? ' open' : ''}>
        <summary><span class="grp-name">${esc(k)}</span><span class="grp-n">${arr.length} mẫu</span>
          <span class="grp-peek">${arr.slice(0, 4).map(t => `<i style="background:${esc(t.colors[0].v)}"></i>`).join('')}</span></summary>
        <div class="grid">${arr.map(card).join('')}</div>
      </details>`).join('') : '<p class="empty">Không có mẫu phù hợp – thử từ khóa khác hoặc chọn “Tất cả”.</p>';
    // Thu gọn / mở rộng: ghi nhớ trạng thái từng chủ đề
    grid.querySelectorAll('details.grp').forEach(d => d.addEventListener('toggle', () => {
      if (filtering) return;
      const k = d.dataset.topic;
      state.closed = state.closed.filter(x => x !== k).concat(d.open ? [] : [k]);
      store.set('bl.closed', state.closed);
    }));
    // Họa tiết / gradient trên ảnh xem trước
    grid.querySelectorAll('.thumb').forEach(th => {
      const t = TPL.find(x => x.id === th.dataset.id), p = values(t);
      if (window.BLMotifs.active(p)) window.BLMotifs.decorate(th.querySelector('svg'), t, p);
    });
  }

  function showTab(tab) {
    state.tab = tab;
    document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
    const isGal = tab === 'backdrop';
    $('#gallery').hidden = !isGal;
    $('#guide').hidden = tab !== 'guide';
    $('#refs').hidden = tab !== 'refs';
    if (isGal) renderGallery();
    store.set('bl.tab', tab);
    window.scrollTo({ top: 0 });
  }

  /* ---------- Trình chỉnh sửa ---------- */
  function openEditor(id) {
    const t = TPL.find(x => x.id === id);
    if (!t) return;
    state.cur = t;
    state.p = values(t);
    $('#edId').textContent = t.id + ' · Backdrop tỉ lệ 2:1';
    $('#edTitle').textContent = t.name;
    $('#edDesc').innerHTML = `<b>Phù hợp:</b> ${esc(t.use)}.<br>${esc(t.desc)}`;
    $('#stage').className = 'stage ' + t.type;
    $('#pngSize').innerHTML = [[2400, '2.400 px – xem trước, gửi duyệt'], [4800, '4.800 px – màn LED, in khổ nhỏ'], [9600, '9.600 px – in bạt khổ lớn']]
      .map((o, i) => `<option value="${o[0]}"${i === 1 ? ' selected' : ''}>${o[1]}</option>`).join('');
    buildForm(t);
    drawStage();
    $('#status').textContent = '';
    $('#editor').hidden = false;
    document.body.style.overflow = 'hidden';
    const first = $('#edForm input, #edForm textarea');
    if (first && window.matchMedia('(min-width: 861px)').matches) first.focus();
  }
  function closeEditor() {
    $('#editor').hidden = true;
    document.body.style.overflow = '';
    state.cur = null;
    renderGallery();
  }

  function buildForm(t) {
    const p = state.p;
    let h = '<h4>Nội dung</h4>';
    t.fields.forEach(f => {
      h += `<label>${esc(f.label)}` + (f.multi
        ? `<textarea data-k="${f.k}" rows="${Math.max(2, String(p[f.k] || '').split('\n').length)}">${esc(p[f.k])}</textarea>`
        : `<input type="text" data-k="${f.k}" value="${esc(p[f.k])}">`) + '</label>';
    });
    const S = window.BLStudio, sel = (k, opts) => `<select data-k="${k}">` +
      opts.map(o => `<option value="${o[0]}"${String(p[k]) === o[0] ? ' selected' : ''}>${o[1]}</option>`).join('') + '</select>';
    // --- Cỡ chữ & bố cục tự động
    h += `<h4>Cỡ chữ &amp; bố cục tự động</h4>
      <label>Cỡ tiêu đề <output id="oHead">${p.scaleHead}%</output><input type="range" min="60" max="150" step="5" data-k="scaleHead" value="${p.scaleHead}"></label>
      <label>Cỡ chữ phụ <output id="oBody">${p.scaleBody}%</output><input type="range" min="70" max="140" step="5" data-k="scaleBody" value="${p.scaleBody}"></label>
      <label class="row"><input type="checkbox" data-k="autoFill"${p.autoFill ? ' checked' : ''}> Tự phóng tiêu đề cho lấp đầy chiều ngang</label>
      <label class="row"><input type="checkbox" data-k="autoLayout"${p.autoLayout !== false ? ' checked' : ''}> Tự căn bố cục: chống chồng chữ, giữ lề an toàn, tự thu nhỏ khi tràn</label>
      <p class="hint" id="layoutNote"></p>`;
    // --- Hiệu ứng
    h += `<h4>Hiệu ứng</h4><div class="two">
      <label>Chữ ${sel('fxText', [['auto', 'Tự động (theo nền)'], ['none', 'Không'], ['soft', 'Bóng mềm'], ['shadow', 'Bóng đổ rõ'], ['outline', 'Viền chữ'], ['glow', 'Phát sáng'], ['3d', 'Nổi khối 3D']])}</label>` +
      `<label>Nền ${sel('fxBg', [['auto', 'Tự động (theo độ sáng)'], ['none', 'Không'], ['vignette', 'Tối viền'], ['light', 'Vệt sáng'], ['grain', 'Hạt nhiễu'], ['bokeh', 'Đốm sáng bokeh']])}</label>` +
      `</div><p class="hint">“Tự động” đo màu nền thật sau từng dòng chữ: chữ thiếu tương phản được thêm viền + bóng, nền rối được thêm bóng mềm.</p>`;
    // --- Bảng màu
    h += `<h4>Bảng màu</h4><div class="pals">` + S.PALETTES.map((pl, i) =>
      `<button type="button" class="pal-chip" data-pal="${i}" title="${esc(pl[0])}">${pl[1].map(c => `<span style="background:${c}"></span>`).join('')}<em>${esc(pl[0])}</em></button>`).join('') + `</div>
      <div class="gen"><input type="color" id="genBase" value="${esc(p.c1)}" aria-label="Màu gốc">
        <select id="genScheme">${Object.keys(S.SCHEMES).map(k => `<option value="${k}">${S.SCHEMES[k]}</option>`).join('')}</select>
        <button type="button" class="btn" id="genApply">Tạo từ 1 màu</button></div>
      <label>Màu chữ ${sel('textMode', [['template', 'Theo mẫu'], ['contrast', 'Tự động tương phản với nền'], ['custom', 'Một màu cho mọi chữ']])}</label>` +
      (p.textMode === 'custom' ? `<label class="row"><input type="color" data-k="textColor" value="${esc(p.textColor)}"> Màu chữ chung</label>` : '') +
      `<details${state.openColors ? ' open' : ''} id="colorDetails"><summary>Chỉnh từng màu của mẫu</summary><div class="colors">` + t.colors.map(c =>
      `<label><input type="color" data-k="${c.k}" value="${esc(p[c.k])}">${esc(c.label)}</label>`).join('') + '</div></details>';
    // --- Họa tiết & gradient
    const MO = window.BLMotifs, sug = MO.SUGGEST[t.topic] || [], m = MO.MOTIFS[p.motif];
    const rng_ = (k, min, max, unit) => `<label>${{ motifOp: 'Độ đậm', motifScale: 'Kích thước', bgGradOp: 'Độ đậm', bgGradAngle: 'Góc' }[k]} <output data-o="${k}">${p[k]}${unit}</output><input type="range" min="${min}" max="${max}" step="5" data-k="${k}" value="${p[k]}"></label>`;
    h += `<h4>Họa tiết – hoa văn</h4>
      <label>Họa tiết <select data-k="motif"><option value="none">Không dùng</option>` +
      (sug.length ? `<optgroup label="Gợi ý cho “${esc(t.topic)}”">${sug.map(k => `<option value="${k}"${p.motif === k ? ' selected' : ''}>★ ${esc(MO.MOTIFS[k].name)}</option>`).join('')}</optgroup>` : '') +
      `<optgroup label="Tất cả họa tiết">${Object.keys(MO.MOTIFS).filter(k => !sug.includes(k)).map(k => `<option value="${k}"${p.motif === k ? ' selected' : ''}>${esc(MO.MOTIFS[k].name)}</option>`).join('')}</optgroup></select></label>` +
      (m ? `<div class="two"><label>Vị trí <select data-k="motifPlace">${m.places.map(pl => `<option value="${pl}"${(m.places.includes(p.motifPlace) ? p.motifPlace : m.def) === pl ? ' selected' : ''}>${MO.PLACES[pl]}</option>`).join('')}</select></label>
        <label>Màu <input type="color" data-k="motifColor" value="${esc(p.motifColor)}"></label></div>` + rng_('motifOp', 5, 100, '%') + rng_('motifScale', 50, 200, '%') : '');
    const gsel = (k, obj, extra) => `<select data-k="${k}"><option value="none">Không dùng</option>` + Object.keys(obj).map(g => `<option value="${g}"${p[k] === g ? ' selected' : ''}>${esc(obj[g][0])}</option>`).join('') + `<option value="custom"${p[k] === 'custom' ? ' selected' : ''}>Tự chọn 2 màu</option></select>`;
    h += `<h4>Gradient</h4><label>Phủ gradient nền ${gsel('bgGrad', MO.BG_GRAD)}</label>` +
      (p.bgGrad !== 'none' ? (p.bgGrad === 'custom' ? `<div class="two"><label>Màu đầu <input type="color" data-k="bgGradA" value="${esc(p.bgGradA)}"></label><label>Màu cuối <input type="color" data-k="bgGradB" value="${esc(p.bgGradB)}"></label></div>` : '') +
        `<div class="two"><label>Kiểu ${sel('bgGradType', [['linear', 'Thẳng'], ['radial', 'Tỏa tròn']])}</label><label>Hòa trộn ${sel('bgGradBlend', Object.keys(MO.BLENDS).map(b => [b, MO.BLENDS[b]]))}</label></div>` +
        rng_('bgGradOp', 5, 100, '%') + (p.bgGradType === 'radial' || p.bgGrad === 'fade' || p.bgGrad === 'light' ? '' : rng_('bgGradAngle', 0, 355, '°')) : '') +
      `<label>Gradient chữ ${gsel('textGrad', MO.TEXT_GRAD)}</label>` +
      (p.textGrad !== 'none' ? (p.textGrad === 'custom' ? `<div class="two"><label>Màu đầu <input type="color" data-k="textGradA" value="${esc(p.textGradA)}"></label><label>Màu cuối <input type="color" data-k="textGradB" value="${esc(p.textGradB)}"></label></div>` : '') +
        `<label>Áp cho ${sel('textGradTarget', [['title', 'Tiêu đề chính'], ['big', 'Mọi chữ lớn'], ['all', 'Toàn bộ chữ']])}</label>` : '') +
      `<p class="hint">Gradient chữ nhũ vàng / bạc / đồng tạo hiệu ứng kim loại. Khi xuất PowerPoint dạng “chữ sửa được”, chữ gradient được đổi thành màu trung bình.</p>`;
    if (t.photo) {
      h += `<h4>${esc(t.photo)}</h4>
        <div class="logo-pick">${state.photo ? `<img src="${state.photo}" alt="Ảnh đang dùng">` : ''}
          <label class="btn" style="flex-direction:row;color:var(--ink)">Tải ảnh lên…<input type="file" id="photoFile" accept="image/png,image/jpeg,image/webp" hidden></label>
          ${state.photo ? '<button type="button" class="btn ghost" id="photoDel">Bỏ ảnh</button>' : ''}</div>
        <p class="hint">Dùng ảnh chân dung / quốc huy <b>bản chính thức</b>, rõ nét, đúng tỉ lệ. Ảnh tự cắt vừa khung; ảnh dùng chung cho các mẫu có khung ảnh.</p>`;
    }
    {
      h += `<h4>Logo đơn vị</h4>
        <div class="logo-pick">${state.logo ? `<img src="${state.logo}" alt="Logo đang dùng">` : ''}
          <label class="btn" style="flex-direction:row;color:var(--ink)">Tải logo lên…<input type="file" id="logoFile" accept="image/png,image/svg+xml,image/jpeg,image/webp" hidden></label>
          ${state.logo ? '<button type="button" class="btn ghost" id="logoDel">Bỏ logo</button>' : ''}</div>
        <p class="hint">Logo dùng chung cho mọi backdrop. Nên dùng PNG nền trong suốt hoặc SVG.</p>
        <label class="row"><input type="checkbox" data-k="logoOn"${p.logoOn !== false ? ' checked' : ''}> Hiện khung “LOGO” khi chưa có logo</label>`;
    }
    h += '<p class="hint">Mẹo: chữ quá dài sẽ tự thu nhỏ cho vừa khung. Mọi chỉnh sửa được tự lưu trên trình duyệt này.</p>';
    $('#edForm').innerHTML = h;
  }

  /* Vẽ vào khung xem trước: vẽ → tự căn bố cục (thu nhỏ tiêu đề nếu tràn) → màu chữ & hiệu ứng (bất đồng bộ) */
  let raf = 0, token = 0;
  state.ready = Promise.resolve();
  function renderStage() {
    const t = state.cur, p = state.p, stage = $('#stage');
    let head = 1, info = null;
    for (let i = 0; i < 8; i++) {
      stage.innerHTML = svgOf(t, p, head);
      if (p.autoLayout === false) break;
      info = window.BLStudio.autoLayout(stage.querySelector('svg'), t);
      // Ưu tiên thu nhỏ tiêu đề khi phải dời chữ nhiều hoặc bị tràn, để giữ đúng thứ tự các dòng
      if ((info.overflow <= 1 && info.push <= 6) || head < 0.5) break;
      head *= 0.92;
    }
    window.BLMotifs.decorate(stage.querySelector('svg'), t, p);
    const my = ++token;
    state.ready = window.BLStudio.applyLook(stage.querySelector('svg'), t, p).catch(e => console.warn(e)).then(() => {
      if (my !== token) return;
      const notes = [];
      if (head < 1) notes.push('đã thu nhỏ tiêu đề còn ' + Math.round(head * 100) + '% để không tràn khung');
      else if (info && info.moved) notes.push('đã dời dòng chữ để không chồng nhau');
      $('#layoutNote').textContent = notes.length ? 'Tự căn bố cục: ' + notes.join('; ') + '.' : '';
    });
  }
  function drawStage() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { if (state.cur) renderStage(); });
  }
  /* Bản SVG đang hiển thị (đã căn bố cục + hiệu ứng) để xuất file */
  async function liveSvg() {
    cancelAnimationFrame(raf);
    renderStage();
    await state.ready;
    const el = $('#stage svg').cloneNode(true);
    el.removeAttribute('style');
    return new XMLSerializer().serializeToString(el);
  }

  /* ---------- Nhúng phông chữ để file xuất ra hiển thị đúng ở mọi nơi ---------- */
  const blobToDataURL = b => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(b); });
  const cssCache = {};
  async function embedFonts(svg) {
    const fams = Object.keys(BL.FONTS).filter(f => svg.includes(`'${f}'`));
    if (!fams.length) return svg;
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    const text = [...new Set(Array.from(doc.querySelectorAll('text')).map(n => n.textContent).join('') + 'LOGO')].join('');
    const url = BL.fontsUrl(fams, text);
    let css = cssCache[url];
    try {
      if (!css) {
        css = await (await fetch(url)).text();
        const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]))];
        for (const u of urls) css = css.split(u).join(await blobToDataURL(await (await fetch(u)).blob()));
        cssCache[url] = css;
      }
    } catch (e) {
      // Không có mạng: chèn liên kết phông (hiển thị đúng khi mở bằng trình duyệt có mạng)
      css = `@import url('${BL.fontsUrl(fams).replace(/&/g, '&amp;')}');`;
    }
    return svg.replace(/^(<svg[^>]*>)/, `$1<defs><style>${css}</style></defs>`);
  }

  function download(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  const fileBase = t => t.id + '-' + slug(t.name);

  async function busy(btn, msg, fn) {
    btn.disabled = true;
    $('#status').textContent = msg;
    try { await fn(); } catch (e) { $('#status').textContent = 'Có lỗi: ' + e.message; console.error(e); } finally { btn.disabled = false; }
  }

  async function exportSvg() {
    const t = state.cur;
    await busy($('#dlSvg'), 'Đang nhúng phông chữ…', async () => {
      const svg = await embedFonts(await liveSvg());
      download(new Blob([svg], { type: 'image/svg+xml' }), fileBase(t) + '.svg');
      $('#status').textContent = 'Đã tải file SVG – phóng to bao nhiêu cũng không vỡ, phù hợp gửi nhà in.';
    });
  }

  /* Vẽ một chuỗi SVG ra canvas W × H, trả về Blob */
  async function rasterize(svg, w0, h0, W, H, type, q) {
    svg = svg.replace(`width="${w0}" height="${h0}"`, `width="${W}" height="${H}"`);
    const img = new Image();
    img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    try {
      await img.decode();
      await new Promise(r => setTimeout(r, 120));
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      cv.getContext('2d').drawImage(img, 0, 0, W, H);
      return await new Promise(r => cv.toBlob(r, type || 'image/png', q));
    } finally { URL.revokeObjectURL(img.src); }
  }

  async function exportPng() {
    const t = state.cur, W = +$('#pngSize').value, H = Math.round(W * t.h / t.w);
    await busy($('#dlPng'), 'Đang dựng ảnh PNG ' + W + ' × ' + H + ' px…', async () => {
      const blob = await rasterize(await embedFonts(await liveSvg()), t.w, t.h, W, H);
      download(blob, fileBase(t) + '-' + W + 'px.png');
      $('#status').textContent = 'Đã tải PNG ' + W + ' × ' + H + ' px.';
    });
  }

  /* ---------- Xuất PowerPoint (.pptx) ----------
   * "edit" : ảnh nền (hình + hiệu ứng nền, không có chữ) + mỗi dòng chữ là một hộp chữ sửa được,
   *          giữ phông, cỡ, màu, giãn chữ, căn lề, bóng / viền / phát sáng.
   * "image": cả backdrop thành một ảnh phủ kín slide – giống 100 % bản xem trước. */
  let pptxLib = null;
  function loadPptx() {
    if (window.PptxGenJS) return Promise.resolve(window.PptxGenJS);
    const SRC = ['https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js',
      'https://unpkg.com/pptxgenjs@3.12.0/dist/pptxgen.bundle.js'];
    const tryLoad = i => new Promise((res, rej) => {
      if (i >= SRC.length) { rej(new Error('không tải được thư viện PowerPoint, hãy kiểm tra kết nối mạng')); return; }
      const sc = document.createElement('script');
      sc.src = SRC[i];
      sc.onload = () => res(window.PptxGenJS);
      sc.onerror = () => { sc.remove(); tryLoad(i + 1).then(res, rej); };
      document.head.appendChild(sc);
    });
    if (!pptxLib) pptxLib = tryLoad(0).catch(e => { pptxLib = null; throw e; });
    return pptxLib;
  }
  const hex6 = rgb => rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
  const fontName = el => (el.getAttribute('font-family') || 'Be Vietnam Pro').split(',')[0].replace(/['"]/g, '').trim();

  function pptxText(el, live, t, slideW) {
    const S = window.BLStudio, m = S.measure(live, el), pt = slideW * 72 / t.w, inch = slideW / t.w;
    const size = parseFloat(el.getAttribute('font-size')) * m.scale, anchor = el.getAttribute('text-anchor') || 'start';
    let x = m.x1, w = m.x2 - m.x1;
    const pad = w * 0.12 + size * 0.4;
    if (anchor === 'middle') { x -= pad / 2; w += pad; } else if (anchor === 'end') { x -= pad; w += pad; } else w += pad;
    const rgb = S.fillColor(el, live);
    const o = {
      x: x * inch, y: m.y1 * inch, w: w * inch, h: (m.y2 - m.y1) * inch,
      fontFace: fontName(el), fontSize: Math.round(size * pt * 10) / 10, color: hex6(rgb),
      bold: +(el.getAttribute('font-weight') || 400) >= 600, italic: el.getAttribute('font-style') === 'italic' || Math.abs(m.skew) > 0.05,
      align: anchor === 'middle' ? 'center' : anchor === 'end' ? 'right' : 'left', valign: 'middle',
      margin: 0, wrap: false, fit: 'none',
    };
    const ls = parseFloat(el.getAttribute('letter-spacing') || 0);
    if (ls) o.charSpacing = Math.round(ls * m.scale * pt * 10) / 10;
    const op = parseFloat(el.getAttribute('fill-opacity') || 1);
    if (op < 1) o.transparency = Math.round((1 - op) * 100);
    // Viền / quầng trắng sẵn có của mẫu (stroke + paint-order)
    const stroke = el.getAttribute('stroke'), sw = parseFloat(el.getAttribute('stroke-width') || 0) * m.scale;
    if (stroke && /^#/.test(stroke) && sw > 0) {
      const col = hex6(S.hex2rgb(stroke));
      if (sw < size * 0.1) o.outline = { size: Math.max(0.5, sw * pt * 0.6), color: col };
      else o.glow = { size: sw * pt * 0.5, opacity: 1, color: col };
    }
    // Hiệu ứng do công cụ tự động / người dùng chọn
    const fx = (el.getAttribute('data-fx') || '').split(' ');
    const col = el.getAttribute('data-fx-col') || (S.lumOf(rgb) > 0.4 ? '000000' : 'FFFFFF'), dark = col === '000000';
    const sh = (blur, off, angle, opDark, opLight) => ({ type: 'outer', blur: size * pt * blur, offset: size * pt * off, angle, color: col, opacity: dark ? opDark : opLight });
    if (fx.includes('soft')) o.shadow = sh(0.06, 0.03, 90, 0.35, 0.7);
    if (fx.includes('shadow')) o.shadow = sh(0.08, 0.05, 90, 0.55, 0.85);
    if (fx.includes('3d')) o.shadow = sh(0, 0.07, 45, 0.6, 0.6);
    if (fx.includes('glow')) o.glow = { size: size * pt * 0.12, opacity: 0.6, color: o.color };
    return o;
  }

  async function exportPptx() {
    const t = state.cur, mode = $('#pptxMode').value;
    await busy($('#dlPptx'), 'Đang tạo file PowerPoint…', async () => {
      const Pptx = await loadPptx();
      const full = await liveSvg(), live = $('#stage svg');
      const slideW = 13.333, slideH = Math.round(slideW * t.h / t.w * 1000) / 1000, PX = 2880, PY = Math.round(PX * t.h / t.w);
      const pptx = new Pptx();
      pptx.defineLayout({ name: 'BACKDROP', width: slideW, height: slideH });
      pptx.layout = 'BACKDROP';
      pptx.title = t.name;
      const slide = pptx.addSlide();
      const texts = [];
      let bgSvg = full;
      if (mode === 'edit') {
        live.querySelectorAll('text').forEach(el => {
          if (el.querySelector('textPath') || el.closest('[data-deco]') || !el.textContent.trim()) return;
          el.setAttribute('data-ppt', texts.length);
          texts.push(el);
        });
        const clone = live.cloneNode(true);
        clone.removeAttribute('style');
        clone.querySelectorAll('[data-ppt]').forEach(n => n.remove());
        bgSvg = new XMLSerializer().serializeToString(clone);
      }
      const bg = await blobToDataURL(await rasterize(await embedFonts(bgSvg), t.w, t.h, PX, PY));
      slide.background = { data: bg.replace(/^data:/, '') };
      texts.forEach(el => slide.addText(el.textContent, pptxText(el, live, t, slideW)));
      const fonts = [...new Set(texts.map(fontName))];
      slide.addNotes(`Mẫu ${t.id} – ${t.name}. ` + (mode === 'edit'
        ? `Nền là ảnh, chữ là các hộp chữ sửa được. Cài các phông sau trên máy để hiển thị đúng: ${fonts.join(', ')} (miễn phí tại fonts.google.com).`
        : `Toàn bộ backdrop là một ảnh ${PX} × ${PY} px.`));
      await pptx.writeFile({ fileName: fileBase(t) + (mode === 'edit' ? '' : '-anh') + '.pptx' });
      $('#status').textContent = mode === 'edit'
        ? `Đã tải PPTX: ${texts.length} hộp chữ sửa được trên nền ảnh. Cài phông ${fonts.join(', ')} trên máy để chữ hiển thị đúng.`
        : 'Đã tải PPTX dạng ảnh – hiển thị giống hệt bản xem trước.';
    });
  }

  /* ---------- Sự kiện ---------- */
  function bind() {
    document.querySelector('.tabs').addEventListener('click', e => {
      const b = e.target.closest('button[data-tab]');
      if (b) showTab(b.dataset.tab);
    });
    $('#chips').addEventListener('click', e => {
      const b = e.target.closest('button[data-f]');
      if (b) { state.filter = b.dataset.f; renderGallery(); }
    });
    let qt = 0;
    $('#q').addEventListener('input', e => { clearTimeout(qt); qt = setTimeout(() => { state.q = e.target.value; renderGallery(); }, 180); });
    $('#styleSel').addEventListener('change', e => { state.style = e.target.value; renderGallery(); });
    $('#openAll').addEventListener('click', () => { state.closed = []; store.set('bl.closed', []); renderGallery(); });
    $('#closeAll').addEventListener('click', () => {
      state.closed = [...new Set(TPL.map(t => t.topic))]; store.set('bl.closed', state.closed);
      document.querySelectorAll('details.grp').forEach(d => { d.open = false; });
    });
    $('#grid').addEventListener('click', e => {
      const el = e.target.closest('[data-id]');
      if (el) openEditor(el.dataset.id);
    });
    $('#edForm').addEventListener('input', e => {
      const k = e.target.dataset.k;
      if (!k) return;
      state.p[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'range' ? +e.target.value : e.target.value;
      if (k === 'scaleHead') $('#oHead').textContent = e.target.value + '%';
      if (k === 'scaleBody') $('#oBody').textContent = e.target.value + '%';
      const out = $(`#edForm output[data-o="${k}"]`);
      if (out) out.textContent = e.target.value + (k === 'bgGradAngle' ? '°' : '%');
      save(state.cur, state.p);
      if (k === 'motif') {
        const m = window.BLMotifs.MOTIFS[state.p.motif];
        if (m && m.defOp != null) state.p.motifOp = m.defOp;
        if (m && m.defColor) state.p.motifColor = m.defColor;
        save(state.cur, state.p);
      }
      if (['textMode', 'motif', 'bgGrad', 'bgGradType', 'textGrad'].includes(k)) buildForm(state.cur);
      drawStage();
    });
    $('#edForm').addEventListener('change', async e => {
      if (e.target.id === 'photoFile' && e.target.files[0]) {
        const f = e.target.files[0];
        if (f.size > 6 * 1024 * 1024) { $('#status').textContent = 'Ảnh lớn hơn 6 MB – hãy nén hoặc thu nhỏ trước.'; return; }
        state.photo = await blobToDataURL(f);
        const ok = store.set('bl.photo', state.photo);
        state.p.photo = state.photo;
        buildForm(state.cur); drawStage();
        $('#status').textContent = 'Đã gắn ảnh vào khung.' + (ok ? '' : ' (Ảnh hơi lớn nên không lưu được lâu dài trên trình duyệt.)');
        return;
      }
      if (e.target.id !== 'logoFile' || !e.target.files[0]) return;
      const f = e.target.files[0];
      if (f.size > 4 * 1024 * 1024) { $('#status').textContent = 'File logo lớn hơn 4 MB – hãy nén hoặc thu nhỏ trước.'; return; }
      state.logo = await blobToDataURL(f);
      const ok = store.set('bl.logo', state.logo);
      state.p.logo = state.logo;
      buildForm(state.cur);
      drawStage();
      $('#status').textContent = 'Đã gắn logo cho tất cả backdrop.' + (ok ? '' : ' (File hơi lớn nên không lưu được lâu dài.)');
    });
    const applyPalette = (pal, name) => {
      Object.assign(state.p, window.BLStudio.mapPalette(state.cur, pal));
      save(state.cur, state.p);
      buildForm(state.cur); drawStage();
      $('#status').textContent = 'Đã áp dụng bảng màu “' + name + '”. Màu sáng – tối được giữ đúng vai trò như mẫu gốc.';
    };
    $('#edForm').addEventListener('click', e => {
      const chip = e.target.closest('[data-pal]');
      if (chip) { const pl = window.BLStudio.PALETTES[+chip.dataset.pal]; applyPalette(pl[1], pl[0]); return; }
      if (e.target.id === 'genApply') {
        const sc = $('#genScheme').value;
        applyPalette(window.BLStudio.generate($('#genBase').value, sc), window.BLStudio.SCHEMES[sc] + ' từ màu ' + $('#genBase').value);
        return;
      }
      if (e.target.closest('#colorDetails summary')) { setTimeout(() => { state.openColors = $('#colorDetails').open; }, 0); return; }
      if (e.target.id === 'photoDel') { state.photo = null; state.p.photo = null; store.del('bl.photo'); buildForm(state.cur); drawStage(); return; }
      if (e.target.id !== 'logoDel') return;
      state.logo = null; state.p.logo = null; store.del('bl.logo');
      buildForm(state.cur); drawStage();
    });
    $('#edClose').addEventListener('click', closeEditor);
    $('#editor').addEventListener('click', e => { if (e.target.id === 'editor') closeEditor(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && state.cur) closeEditor(); });
    $('#dlSvg').addEventListener('click', exportSvg);
    $('#dlPng').addEventListener('click', exportPng);
    $('#dlPptx').addEventListener('click', exportPptx);
    $('#reset').addEventListener('click', () => {
      store.del('bl.v.' + state.cur.id);
      state.p = values(state.cur);
      buildForm(state.cur); drawStage();
      $('#status').textContent = 'Đã khôi phục nội dung và màu mặc định.';
    });
  }

  /* ---------- Khởi động: nạp phông trước để đo chữ chính xác ---------- */
  function fontLoads() {
    const sample = 'Aa Ăâ Đđ Ệệ Ữữ Ộộ 0123';
    const out = [];
    Object.keys(BL.FONTS).forEach(f => {
      const spec = BL.FONTS[f].spec;
      let combos = [['normal', '400']];
      if (spec.startsWith('ital,wght@')) combos = spec.slice(10).split(';').map(x => { const [i, w] = x.split(','); return [i === '1' ? 'italic' : 'normal', w]; });
      else if (spec.startsWith('wght@')) combos = spec.slice(5).split(';').map(w => ['normal', w]);
      combos.forEach(c => out.push(document.fonts.load(`${c[0]} ${c[1]} 40px "${f}"`, sample)));
    });
    return out;
  }

  function start() {
    $('#nB').textContent = TPL.filter(t => t.type === 'backdrop').length;
    $('#nAll').textContent = TPL.length;
    if (window.BL_CONTENT) { $('#guide').innerHTML = window.BL_CONTENT.guide; $('#refs').innerHTML = window.BL_CONTENT.refs; }
    bind();
    const tab = store.get('bl.tab');
    showTab(['backdrop', 'guide', 'refs'].includes(tab) ? tab : 'backdrop');
  }

  const link = $('#gfonts');
  let started = false;
  const go = () => { if (!started) { started = true; start(); } };
  link.addEventListener('load', () => {
    Promise.race([Promise.allSettled(fontLoads()), new Promise(r => setTimeout(r, 6000))]).then(() => {
      if (started) { if (state.cur) drawStage(); else renderGallery(); } else go();
    });
  });
  link.addEventListener('error', go);
  link.href = BL.fontsUrl();
  setTimeout(go, 8000);
})();
