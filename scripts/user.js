/* ===== USER — TELEGRAM ID → PROFILE ===== */
(function(){
  'use strict';

  var KEY = 'playdrop.profile.v1';

  var tg = window.Telegram && window.Telegram.WebApp;
  var tgUser = (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) || null;
  var demo = !tgUser;

  if(demo){
    tgUser = {
      id: 777000123,
      first_name: 'Демо',
      last_name: 'Игрок',
      username: 'demo_player',
      language_code: 'ru'
    };
  }

  var name = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ').trim()
          || tgUser.username || 'Игрок';

  var profile = {
    id: tgUser.id,
    name: name,
    username: tgUser.username ? '@' + tgUser.username : (demo ? '@demo_player' : ''),
    initials: name.charAt(0).toUpperCase(),
    demo: demo,
    joinedAt: Date.now(),
    orders: 0,
    wishlist: 0,
    balance: 0
  };

  try {
    var saved = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if(saved && saved.id === profile.id){
      profile.orders = saved.orders || 0;
      profile.wishlist = saved.wishlist || 0;
      profile.balance = saved.balance || 0;
      profile.joinedAt = saved.joinedAt || profile.joinedAt;
    }
  } catch(err){}

  function persist(){
    try { window.localStorage.setItem(KEY, JSON.stringify(profile)); } catch(err){}
  }

  window.PLAYDROP = window.PLAYDROP || {};
  window.PLAYDROP.getProfile = function(){ return profile; };
  window.PLAYDROP.addOrder = function(total){
    profile.orders += 1;
    profile.balance += total || 0;
    persist();
    return profile;
  };
  window.PLAYDROP.demoMode = demo;

  window.addEventListener('load', function(){
    var av = document.getElementById('navAvatar');
    if(av) av.textContent = profile.initials;
  });
})();
