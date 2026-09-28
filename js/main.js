/* ===== MAIN UI LOGIC ===== */
(function(){
  'use strict';

  // nav scroll shadow
  var nav = document.getElementById('nav');
  function onScroll(){
    if(nav){
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();

  // burger scroll to catalog
  var burger = document.getElementById('burger');
  if(burger){
    burger.addEventListener('click', function(){
      var c = document.getElementById('catalog');
      if(c) c.scrollIntoView({behavior: 'smooth'});
    });
  }

  // reveal animations
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(function(r){ io.observe(r); });
  } else {
    reveals.forEach(function(r){ r.classList.add('in'); });
  }

  // prevent home forms
  var footForm = document.getElementById('footForm');
  if(footForm){
    footForm.addEventListener('submit', function(e){
      e.preventDefault();
      var i = footForm.querySelector('input');
      if(i){
        i.value = '';
        i.placeholder = 'Спасибо, письмо придёт на почту';
      }
    });
  }

  // signin form
  var signinForm = document.getElementById('signinForm');
  if(signinForm){
    signinForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(window.goPage){ window.goPage('app'); }
    });
  }

  // ===== CATALOG FILTER =====
  var filters = document.getElementById('filters');
  var catGrid = document.getElementById('catalogGrid');
  var catCount = document.getElementById('catCount');
  var lightNames = {all:'всех жанров', low:'RPG', medium:'экшен', bright:'спорт и гонки'};

  if(filters && catGrid){
    filters.addEventListener('click', function(e){
      var b = e.target.closest('.chip');
      if(!b) return;
      [].forEach.call(filters.querySelectorAll('.chip'), function(c){ c.classList.remove('on'); });
      b.classList.add('on');
      var f = b.getAttribute('data-light');
      var shown = 0;
      [].forEach.call(catGrid.querySelectorAll('.pcard'), function(card){
        var ok = (f === 'all' || card.getAttribute('data-catlight') === f);
        card.classList.toggle('hide', !ok);
        if(ok) shown++;
      });
      if(catCount){
        catCount.innerHTML = 'Показано <b>'+shown+'</b> игр'+(shown===1?'а':(shown<5?'ы':''))+' в жанре <b>'+lightNames[f]+'</b>';
      }
    });
  }
})();
