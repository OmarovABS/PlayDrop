/* ===== ROUTING MODULE ===== */
(function(){
  'use strict';

  var PGS = function(){ return [].slice.call(document.querySelectorAll('.pg[data-page]')); };
  var pgs = PGS();

  function show(k){
    var pgs = PGS();
    var t = null;
    pgs.forEach(function(p){
      var on = p.getAttribute('data-page')===k;
      p.hidden = !on;
      if(on) t = p;
    });
    if(!t && pgs[0]){
      t = pgs[0];
      t.hidden = false;
      k = t.getAttribute('data-page');
    }
    [].forEach.call(document.querySelectorAll('[data-nav]'),function(a){
      a.classList.toggle('nav-on',a.getAttribute('data-nav')===k);
    });
    window.scrollTo(0,0);
    try{ parent.postMessage({playdropNav:k},'*'); }catch(e){}
  }

  window.goPage = function(k){
    var t = k || (pgs[0] && pgs[0].getAttribute('data-page'));
    try{
      if((location.hash.replace(/^#\/?/,'').split('/')[0])!==t){
        history.pushState(null,'','#/'+t);
      }
    }catch(_){}
    show(t);
  };

  window.addEventListener('popstate',function(){
    show((location.hash.replace(/^#\/?/,'').split('/')[0])||(pgs[0] && pgs[0].getAttribute('data-page')));
  });

  document.addEventListener('click',function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[data-nav],[data-nav],a[href^="#/"]') : null;
    if(!a) return;
    e.preventDefault();
    var r = a.getAttribute('data-nav');
    if(r==null){
      r = (a.getAttribute('href')||'').replace(/^#\/?/,'').split('/')[0];
    }
    window.goPage(r);
  },false);

  var init = (location.hash.replace(/^#\/?/,'').split('/')[0])||(pgs[0] && pgs[0].getAttribute('data-page'));
  show(init);
})();
