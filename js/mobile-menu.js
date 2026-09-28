/* ===== MOBILE MENU MODULE ===== */
(function(){
  'use strict';

  var b = document.querySelector('.burger');
  if(!b) return;
  var nav = b.closest('nav, header') || document.querySelector('.nav');
  var list = nav && nav.querySelector('.nav-links');
  if(!nav || !list) return;

  var set = function(on){
    nav.classList.toggle('menu-open', on);
    b.setAttribute('aria-expanded', String(on));
  };

  b.setAttribute('aria-expanded', 'false');
  b.addEventListener('click', function(e){
    e.preventDefault();
    set(!nav.classList.contains('menu-open'));
  });

  list.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ set(false); });
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') set(false);
  });
})();
