/* ===== WISHLIST MODULE ===== */
(function(){
  'use strict';

  var wishlist = [
    {name:'Ratchet & Clank: Rift Apart',days:10,next:2},
    {name:'Elden Ring',days:21,next:9},
    {name:'Gran Turismo 7',days:7,next:5}
  ];

  var wishGrid = document.getElementById('wishGrid');
  var wishBadge = document.getElementById('wishBadge');

  function nextLabel(d){ if(d<=0) return 'Скидка сегодня'; if(d===1) return 'Скидка завтра'; return 'Скидка через '+d+'д'; }
  function chipClass(d){ if(d<=1) return 'rchip due'; if(d<=3) return 'rchip soon'; return 'rchip'; }

  function renderWishlist(){
    if(wishBadge) wishBadge.textContent = wishlist.length;
    if(wishGrid){
      wishGrid.innerHTML = wishlist.map(function(p,idx){
        return '<div class="wish-card" data-widx="'+idx+'">'+
          '<button class="pc-remove" data-wremove aria-label="Удалить из вишлиста"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><use href="#i-playdrop-6"/></svg></button>'+
          '<div class="pc-top"><div class="pc-emoji"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4.5 7l1.7 1.7L10 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'+
            '<div><h3>'+p.name+'</h3><div class="pc-sub">Проверяем каждые '+p.days+' дн.</div></div></div>'+
          '<div class="track-chips">'+
            '<span class="'+chipClass(p.next)+'"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><use href="#i-playdrop-3"/></svg>'+nextLabel(p.next)+'</span>'+
            '<span class="rchip"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M2 6h10M5 2v2M9 2v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>'+p.days+'-дневный цикл</span>'+
          '</div></div>';
      }).join('');
    }
    var set = function(id,v){ var el = document.getElementById(id); if(el) el.textContent = v; };
    set('statCount', wishlist.length);
    if(wishlist.length){
      var soonest = wishlist.slice().sort(function(a,b){ return a.next-b.next; })[0];
      set('statNext', soonest.next<=0?'сейчас':soonest.next+'д');
      set('statNextName', soonest.name);
      var avg = Math.round(wishlist.reduce(function(a,p){ return a+p.days; },0)/wishlist.length);
      set('statAvg', avg+'д');
    } else { set('statNext','–'); set('statNextName','нет игр в списке'); set('statAvg','–'); }
  }

  if(wishGrid){
    wishGrid.addEventListener('click', function(e){
      var card = e.target.closest('.wish-card'); if(!card) return;
      if(e.target.closest('[data-wremove]')){
        var idx = parseInt(card.getAttribute('data-widx'),10);
        wishlist.splice(idx,1); renderWishlist();
      }
    });
  }

  var trackForm = document.getElementById('trackForm');
  if(trackForm){
    trackForm.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('rf-name');
      var days = document.getElementById('rf-days');
      var nm = (name.value||'').trim(); if(!nm) return;
      var d = parseInt(days.value,10)||7;
      wishlist.push({name:nm,days:d,next:d});
      name.value = ''; renderWishlist();
    });
  }

  renderWishlist();
})();
