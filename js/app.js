/* ===== APP VIEW SWITCHER ===== */
(function(){
  'use strict';

  // Initialize Telegram Web App
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }

  var titles = {
    cart:['Ваша корзина','Проверьте заказ перед оплатой'],
    orders:['История заказов','Все игры, которые вы купили'],
    wishlist:['Мой вишлист','Уведомления о скидках на игры из списка']
  };
  var DEFAULT = 'cart';

  var sideLinks = [].slice.call(document.querySelectorAll('.side-link[data-view]'));
  var views = [].slice.call(document.querySelectorAll('.view[data-view]'));
  var appPage = document.querySelector('.pg[data-page="app"]');

  function viewFromHash(){
    var m = /^#\/app\/?([a-z]+)/.exec(location.hash || '');
    return (m && titles[m[1]]) ? m[1] : DEFAULT;
  }

  function switchView(v, push){
    if(!titles[v]) v = DEFAULT;
    sideLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('data-view') === v); });
    views.forEach(function(s){ s.hidden = s.getAttribute('data-view') !== v; });
    var t = titles[v];
    var tt = document.getElementById('appTitle');
    var ss = document.getElementById('appSub');
    if(t && tt) tt.textContent = t[0];
    if(t && ss) ss.textContent = t[1];
    if(push){
      try{ history.pushState(null, '', '#/app/' + v); }catch(_){}
    }
  }

  function sync(){ if(appPage && !appPage.hidden) switchView(viewFromHash(), false); }

  sideLinks.forEach(function(l){
    l.addEventListener('click', function(){ switchView(l.getAttribute('data-view'), true); });
  });

  window.addEventListener('popstate', sync);
  window.addEventListener('hashchange', sync);
  document.addEventListener('playdrop:page', sync);
  switchView(viewFromHash(), false);
})();
