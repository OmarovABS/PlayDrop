/* ===== PROFILE PANEL — TELEGRAM ID ===== */
(function(){
  'use strict';

  var api = window.PLAYDROP || {};
  var btn    = document.getElementById('profileBtn');
  var sheet  = document.getElementById('profileSheet');
  var closeB = document.getElementById('profileClose');

  var elName = document.getElementById('pfName');
  var elUser = document.getElementById('pfUsername');
  var elTgid = document.getElementById('pfTgid');
  var elNote = document.getElementById('pfNote');
  var elDemo = document.getElementById('pfDemo');
  var elAv1  = document.getElementById('navAvatar');
  var elAv2  = document.getElementById('pfAvatar');
  var elOrd  = document.getElementById('pfOrders');
  var elWish = document.getElementById('pfWish');
  var elWishB= document.getElementById('pfWishBadge');
  var elBal  = document.getElementById('pfBalance');

  function money(n){ return n.toLocaleString('ru-RU') + ' ₽'; }

  function render(){
    var p = api.getProfile ? api.getProfile() : null;
    if(!p) return;

    if(elAv1) elAv1.textContent = p.initials;
    if(elAv2) elAv2.textContent = p.initials;
    if(elName) elName.textContent = p.name;
    if(elUser) elUser.textContent = p.username || 'без username';
    if(elTgid) elTgid.textContent = p.id;
    if(elDemo) elDemo.hidden = !p.demo;

    if(elNote){
      elNote.textContent = p.demo
        ? 'Вы открыли сайт вне Telegram — показан демо-профиль. Запустите Mini App в Telegram, и профиль создастся автоматически по вашему ID.'
        : 'Профиль создан автоматически по вашему Telegram ID — регистрация не нужна.';
    }

    if(elOrd) elOrd.textContent = p.orders;
    if(elWish) elWish.textContent = p.wishlist;
    if(elWishB) elWishB.textContent = p.wishlist;
    if(elBal) elBal.textContent = money(p.balance);
  }

  api.renderProfile = render;

  function isOpen(){ return sheet && sheet.classList.contains('on'); }

  // keep the sheet glued under the top bar (its height changes on mobile)
  function anchor(){
    var bar = document.getElementById('topbar');
    if(!bar || !sheet) return;
    sheet.style.top = (bar.getBoundingClientRect().bottom + 6) + 'px';
  }

  function open(){
    if(!sheet) return;
    render();
    anchor();
    sheet.classList.add('on');
    if(btn) btn.classList.add('open');
    if(btn) btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  }

  function close(){
    if(!sheet) return;
    sheet.classList.remove('on');
    if(btn) btn.classList.remove('open');
    if(btn) btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  api.openProfile = open;
  api.closeProfile = close;

  if(btn) btn.addEventListener('click', function(e){
    e.stopPropagation();
    isOpen() ? close() : open();
  });
  if(closeB) closeB.addEventListener('click', close);

  document.addEventListener('click', function(e){
    if(!isOpen()) return;
    if(e.target.closest('.sheet') || e.target.closest('#profileBtn')) return;
    close();
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && isOpen()) close();
  });

  document.addEventListener('playdrop:profile', render);
  window.addEventListener('resize', function(){ if(isOpen()) anchor(); });
  window.addEventListener('scroll', function(){ if(isOpen()) anchor(); }, {passive:true});

  // placeholder rows
  document.addEventListener('click', function(e){
    var row = e.target.closest('[data-pf]');
    if(!row) return;
    var kind = row.getAttribute('data-pf');
    var msg = {
      orders: 'Раздел «Мои заказы» появится после первой оплаты.',
      wishlist: 'Добавьте игру в избранное — и она появится здесь.',
      settings: 'Настройки скоро будут доступны.'
    }[kind] || '';
    if(window.PlayDropToast && msg) window.PlayDropToast(msg);
  });

  render();
})();
