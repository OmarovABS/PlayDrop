/* ===== CART MODULE ===== */
(function(){
  'use strict';

  var cart = [
    {id:'eldenring',name:'Elden Ring',latin:'FromSoftware',price:3200,img:'eldenring',light:'RPG',qty:1},
    {id:'baldursgate',name:'Baldur\'s Gate 3',latin:'Larian Studios',price:3800,img:'baldursgate',light:'RPG',qty:1},
    {id:'riftapart',name:'Ratchet & Clank: Rift Apart',latin:'Insomniac Games',price:2400,img:'riftapart',light:'Экшен',qty:1}
  ];

  var COVERS = {
    eldenring: 'assets/images/games/Elden%20Ring.png',
    baldursgate: 'assets/images/games/Baldur\'s%20Gate3.png',
    riftapart: 'assets/images/games/Ratchet%20Clank.png',
    hogwarts: 'assets/images/games/Hogwarts%20Legacy.png',
    spiderman: 'assets/images/games/Spider-man%202.png',
    residentevil4: 'assets/images/games/Resident-evil%204.png',
    granturismo: 'assets/images/games/Gran-Turismo%207.png',
    eafc25: 'assets/images/games/Fc%2025.png',
    nba2k25: 'assets/images/games/NBA%202K25.png'
  };

  var navCartCount = document.getElementById('navCartCount');
  var cartBadge = document.getElementById('cartBadge');
  var cartList = document.getElementById('cartList');

  function qtyTotal(){ return cart.reduce(function(a,i){ return a+i.qty; },0); }
  function money(n){ return n.toLocaleString('ru-RU')+' ₽'; }
  function plural(n, one, few, many){
    var m = n % 100, k = n % 10;
    if(m > 10 && m < 20) return many;
    if(k === 1) return one;
    if(k >= 2 && k <= 4) return few;
    return many;
  }

  window.PLAYDROP = window.PLAYDROP || {};
  window.PLAYDROP.getCart = function(){ return cart.slice(); };
  window.PLAYDROP.clearCart = function(){ cart=[]; renderCart(); };

  var LIGHT_NAMES = {low:'RPG',medium:'Экшен',bright:'Спорт и гонки'};

  function renderCart(){
    var count = qtyTotal();
    if(navCartCount) navCartCount.textContent = count;
    if(cartBadge) cartBadge.textContent = count;
    if(!cartList) return;
    if(cart.length === 0){
      cartList.innerHTML = '<div class="cart-empty">'+
        '<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="20" stroke="currentColor" stroke-width="2.4"/><path d="M20 24h4l2 8h8l3-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
        '<h3>Ваша корзина пуста</h3><p>Вернитесь в каталог и выберите что-нибудь из хитов продаж.</p></div>';
    } else {
      cartList.innerHTML = cart.map(function(it){
        var media = it.ico
          ? '<div class="ci-media ci-ico">'+it.ico+'</div>'
          : '<div class="ci-media"><img src="'+(COVERS[it.img]||'')+'" width="76" height="76" alt="'+it.name+'"></div>';
        return '<div class="cart-item" data-cid="'+it.id+'">'+
          media+
          '<div class="ci-info"><h3>'+it.name+'</h3><div class="ci-latin">'+it.latin+'</div>'+
            '<div class="ci-meta"><span>'+it.light+'</span><span>· '+money(it.price)+' за шт.</span></div></div>'+
          '<div class="ci-right"><div class="ci-price">'+money(it.price*it.qty)+'</div>'+
            '<div class="qty"><button data-dec aria-label="Уменьшить количество">−</button><span class="qv">'+it.qty+'</span><button data-inc aria-label="Увеличить количество">+</button></div>'+
            '<button class="ci-remove" data-remove><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><use href="#i-playdrop-6"/></svg>Убрать</button>'+
          '</div></div>';
      }).join('');
    }
    renderSummary();
  }

  function renderSummary(){
    var sub = cart.reduce(function(a,i){ return a+i.price*i.qty; },0);
    var tax = Math.round(sub*0.08);
    var count = qtyTotal();
    var set = function(id,v){ var el = document.getElementById(id); if(el) el.textContent = v; };
    set('sumCount','('+count+' '+plural(count,'товар','товара','товаров')+')');
    set('sumSubtotal',money(sub));
    set('sumTax',money(tax));
    set('sumTotal',money(sub+tax));
  }

  if(cartList){
    cartList.addEventListener('click', function(e){
      var row = e.target.closest('.cart-item'); if(!row) return;
      var id = row.getAttribute('data-cid');
      var it = cart.filter(function(x){ return x.id===id; })[0]; if(!it) return;
      if(e.target.closest('[data-inc]')){ it.qty++; renderCart(); }
      else if(e.target.closest('[data-dec]')){ it.qty--; if(it.qty<1){ cart=cart.filter(function(x){ return x.id!==id; }); } renderCart(); }
      else if(e.target.closest('[data-remove]')){ cart=cart.filter(function(x){ return x.id!==id; }); renderCart(); }
    });
  }

  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-add]'); if(!b) return;
    var id = b.getAttribute('data-id');
    var ex = cart.filter(function(x){ return x.id===id; })[0];
    var rawLight = b.getAttribute('data-light');
    if(ex){ ex.qty++; } else {
      cart.push({id:id,name:b.getAttribute('data-name'),latin:b.getAttribute('data-latin'),
        price:parseInt(b.getAttribute('data-price'),10),img:b.getAttribute('data-img'),
        ico:b.getAttribute('data-ico')||'',
        light:LIGHT_NAMES[rawLight]||b.getAttribute('data-kind')||'Товар',qty:1});
    }
    renderCart();
    var orig = b.innerHTML; b.classList.add('added'); b.innerHTML='Добавлено ✓';
    setTimeout(function(){ b.classList.remove('added'); b.innerHTML = orig; }, 1100);
  });

  renderCart();
})();
