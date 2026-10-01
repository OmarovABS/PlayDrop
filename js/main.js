/* ===== MAIN UI LOGIC ===== */
(function(){
  'use strict';

  // nav scroll shadow
  var nav = document.getElementById('topbar');
  function onScroll(){
    if(nav){
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();

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
  var plural = function(n, one, few, many){
    var m = n % 100, k = n % 10;
    if(m > 10 && m < 20) return many;
    if(k === 1) return one;
    if(k >= 2 && k <= 4) return few;
    return many;
  };

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
        catCount.innerHTML = 'Показано <b>'+shown+'</b> '+plural(shown,'игра','игры','игр')+' в жанре <b>'+lightNames[f]+'</b>';
      }
    });
  }

  // ===== TOP NAVIGATION =====
  // only same-page anchors switch sections; links to other pages navigate normally
  var sidebarLinks = [].slice.call(document.querySelectorAll('.seg-opt')).filter(function(link){
    return (link.getAttribute('href') || '').charAt(0) === '#';
  });
  var segThumb = document.getElementById('segThumb');
  var sections = {
    'games': document.getElementById('catalog'),
    'accounts': document.getElementById('accounts'),
    'subscriptions': document.getElementById('subscriptions')
  };

  var seg = document.querySelector('.seg');

  // move the segmented-control thumb under the active pill
  function moveThumb(){
    var active = seg && seg.querySelector('.seg-opt.is-on');
    if(!segThumb || !active) return;
    segThumb.style.width = active.offsetWidth + 'px';
    segThumb.style.transform = 'translateX(' + (active.offsetLeft - 2) + 'px)';
  }

  // reserve exact space for the fixed top bar
  function syncBar(){
    if(!nav) return;
    document.documentElement.style.setProperty('--bar-h', nav.offsetHeight + 'px');
  }

  function switchSection(sectionId){
    // Hide all sections
    Object.keys(sections).forEach(function(key){
      if(sections[key]){
        sections[key].hidden = true;
      }
    });

    // Show selected section
    if(sections[sectionId]){
      sections[sectionId].hidden = false;
    }

    // Update active link
    sidebarLinks.forEach(function(link){
      var href = link.getAttribute('href');
      if(href === '#' + sectionId){
        link.classList.add('is-on');
      } else {
        link.classList.remove('is-on');
      }
    });

    moveThumb();

    // Scroll to top
    window.scrollTo(0, 0);

    // Re-trigger reveal animations for the new section
    if('IntersectionObserver' in window){
      var reveals = [].slice.call(document.querySelectorAll('#' + sectionId + ' .reveal'));
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, {threshold: 0.12});
      reveals.forEach(function(r){ io.observe(r); });
    }
  }

  // Add click handlers to sidebar links
  sidebarLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      var sectionId = link.getAttribute('href').replace('#', '');
      switchSection(sectionId);
    });
  });

  // Initialize with games section visible (only on pages that have sections)
  if(sections.games){
    switchSection('games');
  }

  function relayout(){ moveThumb(); syncBar(); }

  window.addEventListener('resize', relayout);
  window.addEventListener('load', relayout);
  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(relayout).catch(function(){});
  }
  relayout();
  if(window.ResizeObserver && nav){
    new ResizeObserver(syncBar).observe(nav);
  }
})();
