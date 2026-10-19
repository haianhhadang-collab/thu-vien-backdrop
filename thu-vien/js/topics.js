/* =========================================================================
 * topics.js — Gán chủ đề cho các mẫu chưa khai báo `topic`
 * ========================================================================= */
(function (root) {
  'use strict';
  const MAP = {
    B01: 'Hội nghị – hội thảo', B02: 'Hội nghị – hội thảo', B03: 'Tiệc – lễ kỷ niệm', B04: 'Lễ hội – văn hóa',
    B05: 'Giáo dục', B06: 'Giáo dục', B07: 'Tiệc – lễ kỷ niệm', B08: 'Cưới hỏi – gia đình',
    B09: 'Doanh nghiệp – công nghệ', B10: 'Giáo dục', B11: 'Thể thao – thanh niên', B12: 'Âm nhạc – sáng tạo',
  };
  root.BL.templates.forEach(t => { if (!t.topic) t.topic = MAP[t.id] || 'Khác'; });
  // Sắp xếp theo mã: B01…B28
  root.BL.templates.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
})(typeof window !== 'undefined' ? window : globalThis);
