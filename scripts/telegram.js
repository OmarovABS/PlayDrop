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
})();;
