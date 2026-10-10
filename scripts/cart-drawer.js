/* ===== CART DRAWER — APPLE STYLE SHEET ===== */
(function(){
  'use strict';

  var btn      = document.getElementById('cartBtn');
  var drawer   = document.getElementById('cartDrawer');
  var closeBtn = document.getElementById('cartClose');
  var scrim    = document.getElementById('scrim');
  var badge    = document.getElementById('navCartCount');
  var checkout = document.getElementById('checkoutBtn');

  var api = window.PLAYDROP || {};
  var profile = api.getProfile ? api.getProfile() : null;
  var tg = window.Telegram && window.Telegram.WebApp;

  var lastFocus = null;

  function open(){
    if(!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add('on');
    if(scrim) scrim.classList.add('on');
    if(btn) btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
    document.dispatchEvent(new CustomEvent('playdrop:drawer', {detail:{open:true}}));
    setTimeout(function(){ if(closeBtn) closeBtn.focus(); }, 240);
  }

  function close(){
    if(!drawer) return;
    drawer.classList.remove('on');
    if(scrim) scrim.classList.remove('on');
    if(btn) btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
    document.dispatchEvent(new CustomEvent('playdrop:drawer', {detail:{open:false}}));
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function isOpen(){ return drawer && drawer.classList.contains('on'); }

  window.PLAYDROP = api;
  api.openCart = open;
  api.closeCart = close;

  if(btn) btn.addEventListener('click', function(){ isOpen() ? close() : open(); });
  if(closeBtn) closeBtn.addEventListener('click', close);
  if(scrim) scrim.addEventListener('click', close);

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && isOpen()) close();
  });

  // auto-close when switching sections
  document.addEventListener('click', function(e){
    var link = e.target.closest('.seg-opt');
    if(link && isOpen()) close();
  });

  // badge sync
  function syncBadge(){
    var cart = api.getCart ? api.getCart() : [];
    var count = cart.reduce(function(a,i){ return a + i.qty; }, 0);
    if(!badge) return;
    var was = badge.textContent;
    badge.textContent = count > 99 ? '99+' : count;
    badge.classList.toggle('on', count > 0);
    if(was !== badge.textContent && count > 0){
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    }
  }
  document.addEventListener('playdrop:cart', syncBadge);
  syncBadge();

  // checkout
  function buildOrder(){
    var items = (api.getCart ? api.getCart() : []).map(function(i){
      return { id: i.id, title: i.name, qty: i.qty, price: i.price };
    });
    var subtotal = items.reduce(function(a,i){ return a + i.price * i.qty; }, 0);
    var total = subtotal + Math.round(subtotal * 0.08);
    return {
      action: 'purchase',
      order_id: 'PD-' + Date.now().toString(36).toUpperCase(),
      user: profile || null,
      items: items,
      total: total,
      currency: 'RUB'
    };
  }

  if(checkout) checkout.addEventListener('click', function(){
    var order = buildOrder();
    if(!order.items.length){
      if(window.PlayDropToast) window.PlayDropToast('Корзина пуста — добавьте хотя бы одну игру.');
      return;
    }

    if(tg && tg.sendData) {
      try { tg.sendData(JSON.stringify(order)); } catch(err) {}
    }

    if(tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    if(window.PlayDropToast) window.PlayDropToast('Заказ отправлен! Ответ придёт в чат с ботом.');

    if(api.addOrder) api.addOrder(order.total);
    document.dispatchEvent(new CustomEvent('playdrop:profile'));

    checkout.disabled = true;
    checkout.textContent = 'Отправлено ✓';
    setTimeout(function(){
      checkout.disabled = false;
      checkout.textContent = 'Оплатить';
    }, 2200);

    if(api.clearCart) api.clearCart();
    setTimeout(close, 500);
  });

  document.addEventListener('playdrop:profile', syncBadge);
})();
