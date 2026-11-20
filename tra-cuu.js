// Lọc bảng tên hoa: tìm không dấu + lọc theo nhóm. Bảng đã có sẵn trong HTML (để Google đọc được), JS chỉ ẩn / hiện hàng.
(function () {
  var o = document.getElementById('tim');
  var hang = Array.prototype.slice.call(document.querySelectorAll('tbody tr'));
  var nut = Array.prototype.slice.call(document.querySelectorAll('.loc'));
  var so = document.getElementById('so');
  var khongThay = document.querySelector('.khong-thay');
  var nhom = 'tat-ca';

  function khongDau(s) {
    return s.replace(/đ/g, 'd').replace(/Đ/g, 'D').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }

  function loc() {
    var tu = khongDau(o.value);
    var dem = 0;
    hang.forEach(function (h) {
      var hop = (nhom === 'tat-ca' || h.dataset.nhom === nhom) && (!tu || h.dataset.tim.indexOf(tu) !== -1);
      var dangAn = h.classList.contains('an');
      h.classList.toggle('an', !hop);
      if (hop && dangAn) { h.classList.remove('hien'); void h.offsetWidth; h.classList.add('hien'); }
      if (hop) dem++;
    });
    so.textContent = dem;
    khongThay.hidden = dem !== 0;
  }

  o.addEventListener('input', loc);
  nut.forEach(function (n) {
    n.addEventListener('click', function () {
      nhom = n.dataset.loc;
      nut.forEach(function (k) { var chon = k === n; k.classList.toggle('dang-chon', chon); k.setAttribute('aria-pressed', chon); });
      loc();
    });
  });
})();
