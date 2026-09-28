/* ===== APP VIEW SWITCHER ===== */
(function(){
  'use strict';

  var titles = {
    cart:['Ваша корзина','Проверьте заказ перед оплатой'],
    orders:['История заказов','Все игры, которые вы купили'],
    wishlist:['Мой вишлист','Уведомления о скидках на игры из списка']
  };

  var sideLinks = [].slice.call(document.querySelectorAll('.side-link[data-view]'));
  var views = [].slice.call(document.querySelectorAll('.view[data-view]'));

  function switchView(v){
    sideLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('data-view')===v); });
    views.forEach(function(s){ s.hidden = s.getAttribute('data-view')!==v; });
    var t = titles[v];
    var tt = document.getElementById('appTitle');
    var ss = document.getElementById('appSub');
    if(t&&tt) tt.textContent = t[0];
    if(t&&ss) ss.textContent = t[1];
  }

  sideLinks.forEach(function(l){
    l.addEventListener('click', function(){ switchView(l.getAttribute('data-view')); });
  });
})();
