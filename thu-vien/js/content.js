/* =========================================================================
 * content.js — Nội dung tab "Nguyên tắc thiết kế" và "Nguồn tham khảo"
 * ========================================================================= */
(function (root) {
  'use strict';
  const pal = (name, use, cols) => `<div class="p"><b>${name}</b><div class="sw">${cols.map(c => `<span style="background:${c}"></span>`).join('')}</div>` +
    `<small>${use}</small><br>${cols.map(c => `<code>${c}</code>`).join(' ')}</div>`;
  const font = (fam, w, sample, note) => `<div class="fontrow"><div><b>${fam}</b><small>${note}</small></div>` +
    `<div style="font-family:'${fam}';font-weight:${w};font-size:30px;line-height:1.25">${sample}</div></div>`;
  const link = (href, title, note) => `<a href="${href}" target="_blank" rel="noopener noreferrer"><b>${title} ↗</b><span>${note}</span></a>`;

  const guide = `
<h2>1. Kích thước backdrop thường gặp</h2>
<table>
  <tr><th>Kích thước thật</th><th>Tỉ lệ</th><th>Dùng cho</th><th>Ghi chú</th></tr>
  <tr><td>4 × 2 m, 5 × 2,5 m, 6 × 3 m, 8 × 4 m</td><td>2 : 1</td><td>Hội trường, hội nghị, lễ kỷ niệm</td><td>Đúng tỉ lệ của 12 mẫu trong thư viện</td></tr>
  <tr><td>3 × 2 m, 4,5 × 3 m</td><td>3 : 2</td><td>Phòng họp nhỏ, sân khấu lớp học</td><td>Thêm khoảng trống phía trên – dưới</td></tr>
  <tr><td>Màn LED 16 : 9 (ví dụ 5,12 × 2,88 m)</td><td>16 : 9</td><td>Hội trường có màn hình LED</td><td>Xuất PNG 3840 × 2160 px hoặc theo độ phân giải màn hình</td></tr>
  <tr><td>Standee 0,8 × 1,8 m; banner cuốn 0,8 × 2 m</td><td>dọc</td><td>Lối vào, sảnh đón khách</td><td>Đặt logo, tên sự kiện ở 1/3 trên</td></tr>
  <tr><td>Backdrop chụp ảnh (photobooth) 2,4 × 2,4 m</td><td>1 : 1</td><td>Check-in, tiệc cưới</td><td>Lặp logo dạng lưới để ảnh chụp nào cũng có logo</td></tr>
</table>
<div class="box"><b>Gửi file cho nhà in:</b> ưu tiên file <b>SVG</b> (vector – phóng bao nhiêu cũng không vỡ). Nếu nhà in chỉ nhận ảnh, chọn PNG <b>9.600 px</b> cho backdrop từ 5 m trở lên. Hỏi nhà in có cần thêm <b>bù xén / tràn lề</b> (thường 3–5 cm mỗi cạnh) và có cần chuyển sang hệ màu CMYK không – màu in luôn trầm hơn màu trên màn hình.</div>

<h2>2. Bố cục và thứ bậc thông tin</h2>
<ol>
  <li><b>Logo + tên cơ quan chủ quản / đơn vị tổ chức</b> – nhỏ, ở trên cùng hoặc góc trên trái.</li>
  <li><b>Loại sự kiện</b> (HỘI NGHỊ, LỄ KHAI GIẢNG, HỘI THẢO…) – chữ in hoa, giãn chữ.</li>
  <li><b>Tiêu đề chính</b> – lớn nhất, đậm nhất; chiều cao chữ nên bằng khoảng 1/10 chiều cao backdrop để người ngồi cuối hội trường vẫn đọc được.</li>
  <li><b>Chủ đề / khẩu hiệu</b> – nhỏ hơn, có thể dùng chữ nghiêng hoặc viết tay.</li>
  <li><b>Thời gian – địa điểm</b> – nhỏ nhất, ở dưới cùng.</li>
</ol>
<div class="box warn"><b>Vùng an toàn:</b> chừa 5–10 % mỗi mép. Khoảng 1/5 phía dưới thường bị bục phát biểu, bàn chủ tọa, lẵng hoa che – không đặt tiêu đề ở đó. Nếu biết vị trí bục (thường lệch trái hoặc phải), tránh đặt chữ quan trọng phía sau bục.</div>
<h3>Ba kiểu bố cục dùng trong thư viện</h3>
<ul>
  <li><b>Đối xứng giữa</b> (B02, B03, B04, B05, B08, B13, B14, B16, B19, B21, B25, B27, B29, B30, B33, B35, B37, B38, B39, B41, B43, B45, B47, B49): trang trọng, dễ cân đối – hợp hội nghị, lễ, tiệc.</li>
  <li><b>Căn trái + hình minh họa bên phải</b> (B01, B06, B09, B11, B12, B15, B17, B18, B22, B23, B24, B26, B28, B32, B34, B36, B40, B44, B46, B48, B50, B51, B52): hiện đại, chừa chỗ cho hình ảnh, đọc nhanh.</li>
  <li><b>Hai cột / hai bên</b> (B07, B10, B42 – ký kết có logo hai bên): một bên là con số / hình lớn, bên kia là chữ – hợp lễ kỷ niệm, tri ân.</li>
  <li><b>Khung vòm / huy hiệu trung tâm</b> (B20, B31): nội dung nằm trong cổng vòm hoặc huy hiệu tròn – hợp gala, khai trương.</li>
</ul>

<h2>3. Phông chữ hỗ trợ tiếng Việt (miễn phí, dùng thương mại được)</h2>
${font('Be Vietnam Pro', 800, 'HỘI NGHỊ TỔNG KẾT', 'Chữ không chân, đọc rõ dấu – dùng cho mọi tiêu đề')}
${font('Montserrat', 800, 'YEAR END PARTY 2026', 'Hình học, hiện đại – công nghệ, sự kiện trẻ')}
${font('Oswald', 600, 'GIẢI CHẠY HỘI THAO', 'Chữ cao, hẹp – thể thao, nhãn mác vintage')}
${font('Playfair Display', 900, 'Tri Ân Thầy Cô', 'Serif tương phản cao – trang trọng, sang trọng')}
${font('Lora', 700, 'Mỗi Ngày Một Trang Sách', 'Serif mềm – thiên nhiên, giáo dục, sách')}
${font('Cormorant Garamond', 600, 'LỄ THÀNH HÔN', 'Serif thanh mảnh – cưới hỏi, thời trang')}
${font('Dancing Script', 700, 'Vạn sự như ý', 'Viết tay vui tươi – khẩu hiệu, Tết')}
${font('Great Vibes', 400, 'Quốc Bảo &amp; Minh Anh', 'Thư pháp mềm mại – tên cô dâu chú rể, chữ ký')}
<div class="box"><b>Quy tắc phối:</b> tối đa 2–3 phông cho một thiết kế. Công thức an toàn: <i>1 phông tiêu đề có cá tính</i> + <i>1 phông không chân cho thông tin</i> + (tùy chọn) <i>1 phông viết tay cho khẩu hiệu</i>. Không dùng chữ viết tay cho câu dài hoặc chữ IN HOA. Muốn mở file SVG bằng Illustrator / CorelDRAW / Inkscape mà giữ đúng phông, hãy tải và cài các phông trên từ Google Fonts.</div>

<h2>4. Bảng màu gợi ý theo loại sự kiện</h2>
<div class="pal">
${pal('Hội nghị trang trọng', 'Đỏ – vàng nhũ, kết hợp hoa văn trống đồng', ['#B3001B', '#7A0012', '#F2C14E', '#FFF3C4'])}
${pal('Hội thảo khoa học', 'Xanh navy – xanh dương – xanh ngọc', ['#0B1F4B', '#1565C0', '#4FC3F7', '#FFFFFF'])}
${pal('Gala / Tất niên', 'Đen – vàng gold, thêm trắng làm điểm sáng', ['#0C0B0D', '#2A241A', '#D4AF37', '#FFF6D5'])}
${pal('Tết – Xuân', 'Đỏ thắm, vàng mai, nâu cành, kem', ['#C62828', '#FFD54F', '#5D3A1A', '#FFF8E1'])}
${pal('Giáo dục – thiếu nhi', 'Xanh trời, vàng, đỏ, xanh lá – tươi sáng', ['#29B6F6', '#0D3B66', '#E53935', '#66BB6A'])}
${pal('Cưới hỏi', 'Hồng phấn, nâu socola, xanh lá xô thơm, kem', ['#E8A0A8', '#6B4E3D', '#9DB59A', '#FFF8F0'])}
${pal('Công nghệ', 'Tím than, tím điện, xanh neon', ['#050816', '#1A0B3B', '#7C4DFF', '#00E5FF'])}
${pal('Thể thao', 'Xanh đen, cam, xanh ngọc – tương phản mạnh', ['#0F172A', '#FF6D00', '#00E5B0', '#FFFFFF'])}
${pal('Tối giản / sáng tạo', 'Be giấy, đen, một màu nhấn duy nhất', ['#F5F1EA', '#111111', '#E63946', '#8D99AE'])}
</div>
<p>Nguyên tắc <b>60 – 30 – 10</b>: 60 % màu nền, 30 % màu phụ, 10 % màu nhấn. Chữ trên nền phải đủ tương phản – chữ vàng nhạt trên nền vàng, hoặc chữ đỏ trên nền xanh lá sẽ rất khó đọc từ xa.</p>

<h2>5. Họa tiết, hoa văn và gradient</h2>
<p>Trong trình chỉnh sửa, mục <b>Họa tiết – hoa văn</b> có 31 loại, xếp mục “Gợi ý” theo chủ đề của mẫu:</p>
<table>
  <tr><th>Nhóm</th><th>Họa tiết</th><th>Hợp với</th></tr>
  <tr><td>Truyền thống Việt</td><td>Trống đồng Đông Sơn, chim Lạc bay, mây tường vân, hoa văn triện (chữ công), hoa thị (cửa sổ cổ), vảy cá – ngói âm dương, hoa sen, cành mai, cành đào, sóng nước, đồng tiền vàng</td><td>Hội nghị trang trọng, Tết, lễ hội văn hóa, Vu Lan, cưới hỏi</td></tr>
  <tr><td>Lễ hội – tiệc</td><td>Quạt Art Deco, pháo hoa, dây đèn lấp lánh, chùm bóng bay, sao lấp lánh, hoa giấy, nốt nhạc bay</td><td>Gala, tất niên, vinh danh, khai trương, sinh nhật, đêm nhạc</td></tr>
  <tr><td>Hiện đại – công nghệ</td><td>Lưới công nghệ, mạch điện tử, bánh răng, tổ ong lục giác, tam giác hình học, lưới mắt cáo, chấm bi bán sắc, tia nắng tỏa, sóng lụa mềm</td><td>Ra mắt sản phẩm, STEM, hội thảo, việc làm</td></tr>
  <tr><td>Thiên nhiên – tình cảm</td><td>Lá nhiệt đới, lá thu rơi, trái tim, bông tuyết</td><td>Môi trường, gia đình, cưới, Giáng sinh</td></tr>
</table>
<p>Mỗi họa tiết chọn được vị trí (4 góc, 2 góc chéo, 2 bên, viền khung, dải trên – dưới, rải toàn nền…), màu, độ đậm và kích thước. Họa tiết luôn nằm <b>dưới chữ</b> nên không che nội dung. Nên để độ đậm 20–40 % để họa tiết làm nền, không tranh chấp với tiêu đề.</p>
<div class="box"><b>Gradient nền</b> phủ một lớp chuyển màu (thẳng hoặc tỏa tròn) với các kiểu hòa trộn: phủ màu, lồng, ánh sáng dịu, nhân, sáng hơn, đổi tông. Kiểu “Tối dần về đáy” giúp chữ ở phần dưới dễ đọc hơn.<br>
<b>Gradient chữ</b> có nhũ vàng, ánh bạc, đồng đỏ, vàng hồng (hiệu ứng kim loại), cầu vồng, hoàng hôn, đại dương, neon, rừng xanh, lửa hoặc tự chọn 2 màu; áp cho tiêu đề, mọi chữ lớn hoặc toàn bộ chữ.</div>

<h2>6. Xuất file PowerPoint (PPTX)</h2>
<table>
  <tr><th>Kiểu</th><th>Bên trong file</th><th>Dùng khi</th></tr>
  <tr><td><b>Chữ sửa được</b></td><td>Nền là một ảnh (hình trang trí, logo, hiệu ứng nền); mỗi dòng chữ là một hộp chữ riêng giữ phông, cỡ, màu, giãn chữ, căn lề và bóng / viền / phát sáng.</td><td>Cần sửa nhanh nội dung trong PowerPoint, chiếu lên màn LED, gửi người khác chỉnh tiếp.</td></tr>
  <tr><td><b>Ảnh nguyên bản</b></td><td>Cả backdrop là một ảnh 2.880 px phủ kín slide.</td><td>Muốn hiển thị giống 100 % bản xem trước, không cần sửa chữ.</td></tr>
</table>
<div class="box warn"><b>Lưu ý phông chữ:</b> PowerPoint chỉ hiển thị đúng khi máy đã cài phông của mẫu (Be Vietnam Pro, Playfair Display, Montserrat…). Tên phông cần cài được ghi trong phần <i>Ghi chú</i> của slide; tải miễn phí ở Google Fonts. Chữ chuyển màu nhũ vàng được chuyển thành màu đơn; muốn giữ hiệu ứng nhũ, dùng kiểu “Ảnh nguyên bản”. Slide có tỉ lệ 2:1 giống backdrop.</div>

<h2>7. Kiểm tra trước khi gửi in</h2>
<ul>
  <li>☐ Chính tả, <b>dấu tiếng Việt</b>, tên cơ quan đúng theo quyết định thành lập (không viết tắt tùy tiện).</li>
  <li>☐ Ngày, giờ, thứ khớp lịch; ghi đúng thể thức “Hà Nội, ngày … tháng … năm …”.</li>
  <li>☐ Logo là <b>bản gốc chất lượng cao</b> (SVG/AI/PNG lớn), không chụp màn hình.</li>
  <li>☐ Quốc huy, cờ, logo cơ quan nhà nước, logo đối tác: dùng đúng mẫu chuẩn, đúng tỉ lệ và màu quy định.</li>
  <li>☐ Đứng cách màn hình 3–4 m (hoặc thu nhỏ còn 10 %) xem tiêu đề còn đọc được không.</li>
  <li>☐ In thử một bản A4 màu để soát màu và lỗi trước khi in khổ lớn.</li>
</ul>

<h2>8. Cách nhờ Claude làm backdrop theo mẫu</h2>
<p>Chỉ cần nêu <b>mã mẫu</b> + nội dung, ví dụ:</p>
<pre class="prompt">Dựa theo mẫu B02, làm backdrop cho:
- Đơn vị: Trường Đại học Hà Nội – Khoa Tiếng Anh
- Sự kiện: HỘI NGHỊ
- Tiêu đề: VIÊN CHỨC, NGƯỜI LAO ĐỘNG NĂM HỌC 2026 – 2027
- Thời gian: Hà Nội, ngày 10 tháng 10 năm 2026
- Kích thước: 6 × 3 m, gửi kèm logo khoa (file logo.png)</pre>
<pre class="prompt">Làm 3 phương án backdrop Tết cho Khoa Tiếng Trung, dựa trên B04 và B14,
xuất file PowerPoint có chữ sửa được.</pre>
<pre class="prompt">Lấy bố cục B09 nhưng đổi sang tông xanh lá – trắng cho sự kiện
“Ngày hội Khởi nghiệp Xanh 2026”, thêm mã QR đăng ký ở góc phải dưới.</pre>
`;

  const refs = `
<h2>Kho mẫu để tham khảo ý tưởng</h2>
<p>Những trang dưới đây có hàng nghìn mẫu backdrop. Dùng để <b>lấy cảm hứng về bố cục, màu sắc</b>; khi dùng nguyên mẫu cần đọc kỹ giấy phép (nhiều mẫu yêu cầu ghi nguồn hoặc trả phí).</p>
<h3>Backdrop – banner sự kiện</h3>
<div class="links">
${link('https://www.canva.com/search/templates?q=backdrop', 'Canva – mẫu backdrop', 'Chỉnh trực tuyến, có tiếng Việt; nhiều mẫu miễn phí')}
${link('https://www.freepik.com/search?format=search&query=event%20backdrop', 'Freepik – event backdrop', 'Vector, PSD nhiều phong cách; cần ghi nguồn với bản miễn phí')}
${link('https://www.vecteezy.com/free-vector/backdrop', 'Vecteezy – backdrop vector', 'Kho vector có lọc giấy phép miễn phí')}
${link('https://www.behance.net/search/projects?search=backdrop%20event', 'Behance – dự án backdrop', 'Bộ nhận diện sự kiện trọn gói của các nhà thiết kế')}
${link('https://www.pinterest.com/search/pins/?q=backdrop%20h%E1%BB%99i%20ngh%E1%BB%8B', 'Pinterest – backdrop hội nghị', 'Ảnh thực tế các backdrop tại Việt Nam')}
${link('https://www.pinterest.com/search/pins/?q=year%20end%20party%20backdrop', 'Pinterest – Year End Party', 'Ý tưởng gala, tất niên, trao giải')}
</div>
<h3>Phông chữ và màu sắc</h3>
<div class="links">
${link('https://fonts.google.com/?subset=vietnamese', 'Google Fonts – lọc tiếng Việt', 'Toàn bộ phông miễn phí có hỗ trợ dấu tiếng Việt')}
${link('https://coolors.co/palettes/trending', 'Coolors – bảng màu', 'Bảng màu thịnh hành, tạo nhanh bộ 5 màu')}
${link('https://color.adobe.com/', 'Adobe Color', 'Bánh xe màu, trích màu từ ảnh, kiểm tra tương phản')}
${link('https://webaim.org/resources/contrastchecker/', 'WebAIM Contrast Checker', 'Kiểm tra chữ có đủ tương phản với nền không')}
</div>
<h3>Công cụ chỉnh file SVG xuất từ thư viện</h3>
<div class="links">
${link('https://inkscape.org/', 'Inkscape', 'Phần mềm vector miễn phí, mở và sửa SVG trực tiếp')}
${link('https://www.figma.com/', 'Figma', 'Kéo thả file SVG vào để chỉnh, cộng tác trực tuyến')}
${link('https://www.canva.com/', 'Canva', 'Tải SVG/PNG lên làm nền rồi chèn thêm ảnh, QR')}
</div>
`;

  root.BL_CONTENT = { guide, refs };
})(window);
