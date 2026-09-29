/* ===== TELEGRAM MINI APP BRIDGE ===== */
(function(){
  'use strict';

  var tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return;

  tg.ready();
  tg.expand();
  if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();
  if (tg.enableClosingConfirmation) tg.enableClosingConfirmation();
  try { if (tg.setHeaderColor) tg.setHeaderColor('#ffffff'); } catch (err) {}
  try { if (tg.setBackgroundColor) tg.setBackgroundColor('#ffffff'); } catch (err) {}

  document.documentElement.classList.add('tg');
  document.body.classList.add('tg');

  var user = (tg.initDataUnsafe && tg.initDataUnsafe.user) || null;

  function applyTheme(){
    var tp = tg.themeParams || {};
    var root = document.documentElement.style;
    var set = function(k, v){ if (v) root.setProperty(k, v); };
    set('--accent', tp.button_color);
    set('--accent-strong', tp.button_color);
    try { if (tg.setHeaderColor) tg.setHeaderColor('#ffffff'); } catch (err) {}
    try { if (tg.setBackgroundColor) tg.setBackgroundColor('#ffffff'); } catch (err) {}
  }

  applyTheme();
  if (tg.onEvent) tg.onEvent('themeChanged', applyTheme);

  if (user) {
    var name = user.first_name || user.username || 'Игрок';
    var chip = document.getElementById('tgUser');
    if (chip) {
      chip.hidden = false;
      var nm = document.getElementById('tgUserName');
      var av = document.getElementById('tgUserAvatar');
      if (nm) nm.textContent = name;
      if (av) av.textContent = name.charAt(0).toUpperCase();
    }
  }

  var toastEl = null, toastTimer = null;
  function toast(msg){
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'tg-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove('on'); }, 2800);
  }
  window.PlayDropToast = toast;

  document.addEventListener('click', function(e){
    if (e.target.closest('[data-add]') && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
  }, false);

  function buildOrder(){
    var api = window.PLAYDROP || {};
    var items = (api.getCart ? api.getCart() : []).map(function(i){
      return { id: i.id, title: i.name, qty: i.qty, price: i.price };
    });
    var total = items.reduce(function(a, i){ return a + i.price * i.qty; }, 0);
    return {
      action: 'purchase',
      order_id: 'PD-' + Date.now().toString(36).toUpperCase(),
      user: user,
      items: items,
      total: total,
      currency: 'RUB',
    };
  }

  var checkout = document.getElementById('checkoutBtn');
  if (checkout) {
    checkout.addEventListener('click', function(){
      var order = buildOrder();
      if (!order.items.length) {
        tg.showAlert('Корзина пуста — добавьте хотя бы одну игру.');
        return;
      }
      try {
        tg.sendData(JSON.stringify(order));
      } catch (err) {
        tg.showAlert('Не удалось отправить заказ. Попробуйте ещё раз.');
        return;
      }
      if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
      toast('Заказ отправлен! Ответ придёт в чат с ботом.');
      checkout.disabled = true;
      checkout.textContent = 'Отправлено ✓';
      if (window.PLAYDROP && window.PLAYDROP.clearCart) window.PLAYDROP.clearCart();
      setTimeout(function(){ checkout.disabled = false; checkout.textContent = 'Оплатить'; }, 4000);
    });
  }

  if (tg.BackButton && window.goPage) {
    var first = document.querySelector('.pg[data-page]');
    var firstPage = first && first.getAttribute('data-page');
    var syncBack = function(){
      var cur = (location.hash.replace(/^#\/?/, '').split('/')[0]) || firstPage;
      if (cur && cur !== firstPage) tg.BackButton.show(); else tg.BackButton.hide();
    };
    var goPage = window.goPage;
    window.goPage = function(){ var r = goPage.apply(null, arguments); syncBack(); return r; };
    window.addEventListener('popstate', syncBack);
    tg.BackButton.onClick(function(){ history.back(); });
    syncBack();
  }
})();
