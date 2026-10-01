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

/* ===== SUBSCRIPTION DESCRIPTION TOGGLE =====
   phones only (the buttons are hidden on wider screens);
   opening one card closes the one opened before it */
(function(){
  'use strict';

  var btns = [].slice.call(document.querySelectorAll('[data-sub-more]'));
  if(!btns.length) return;

  var panel = document.getElementById('subMore');
  var openBtn = null;

  function label(btn, expanded){
    var span = btn.querySelector('span');
    if(span) span.textContent = expanded ? 'Скрыть' : 'Описание';
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function close(){
    if(openBtn){
      var prev = openBtn.closest('.sub-card');
      if(prev) prev.classList.remove('is-open');
      label(openBtn, false);
    }
    if(panel){
      panel.innerHTML = '';
      panel.hidden = true;
    }
    openBtn = null;
  }

  function open(btn){
    var host = btn.closest('.sub-card');
    if(!host) return;
    openBtn = btn;
    host.classList.add('is-open');
    label(btn, true);

    if(!panel) return;

    panel.innerHTML = '';
    var title = host.querySelector('h3');
    if(title){
      var h = title.cloneNode(true);
      h.className = 'sub-more-title';
      panel.appendChild(h);
    }
    ['.sub-desc', '.sub-feats'].forEach(function(sel){
      var node = host.querySelector(sel);
      if(node) panel.appendChild(node.cloneNode(true));
    });
    panel.hidden = false;
  }

  btns.forEach(function(btn){
    btn.addEventListener('click', function(){
      if(openBtn === btn) close();
      else { close(); open(btn); }
    });
  });

  document.addEventListener('keydown', function(e){
    if((e.key === 'Escape' || e.keyCode === 27) && openBtn) close();
  });
})();
