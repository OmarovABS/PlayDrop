/* ===== SUBSCRIPTIONS MODULE ===== */
(function(){
  'use strict';

  var switchEl = document.getElementById('subSwitch');
  var plans = [].slice.call(document.querySelectorAll('[data-p1]'));
  if(!plans.length) return;

  var opts = switchEl ? [].slice.call(switchEl.querySelectorAll('.sub-opt')) : [];
  var term = 12;
  var active = opts.filter(function(b){ return b.classList.contains('on'); })[0];
  if(active) term = parseInt(active.getAttribute('data-term'),10) || term;

  function money(n){ return n.toLocaleString('ru-RU')+' ₽'; }
  function termLabel(t){ return t === 1 ? '1 месяц' : t+' мес.'; }

  function render(){
    plans.forEach(function(card){
      var monthly = parseInt(card.getAttribute('data-p1'),10);
      var total = parseInt(card.getAttribute('data-p'+term),10);
      if(!monthly || !total) return;

      var perMonth = Math.round(total/term);
      var val = card.querySelector('[data-sub-val]');
      var per = card.querySelector('[data-sub-per]');
      var save = card.querySelector('[data-sub-save]');
      var btn = card.querySelector('[data-add]');

      if(val) val.textContent = money(total);
      if(per) per.textContent = term > 1
        ? (money(perMonth)+' в месяц при оплате за '+termLabel(term))
        : 'в месяц, отмена в любой момент';

      if(save){
        var diff = monthly*term - total;
        save.textContent = diff > 0 ? ('Выгода '+money(diff)+' против помесячной оплаты') : '';
        save.hidden = diff <= 0;
      }
      if(btn){
        btn.setAttribute('data-price', total);
        btn.setAttribute('data-latin', termLabel(term));
      }
    });
  }

  function setTerm(t){
    term = t;
    opts.forEach(function(b){
      var on = parseInt(b.getAttribute('data-term'),10) === t;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    render();
  }

  opts.forEach(function(b){
    b.addEventListener('click', function(){
      setTerm(parseInt(b.getAttribute('data-term'),10) || 12);
    });
  });

  setTerm(term);
})();
