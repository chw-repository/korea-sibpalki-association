(function () {
  var toggle = document.querySelector('.gnb-toggle');
  var nav = document.getElementById('gnb');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 지도자 연수 banners: the old site answered a click with this message.
  Array.prototype.forEach.call(document.querySelectorAll('.preparing'), function (btn) {
    btn.addEventListener('click', function () { alert('준비중입니다.'); });
  });

  // Cross-fading slides (replaces fla_main.swf and fla_book.swf).
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Array.prototype.forEach.call(document.querySelectorAll('.slides'), function (box) {
    var slides = box.querySelectorAll('.slide');
    if (still || slides.length < 2) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('on');
    }, 4000);
  });

  // Main page tabs: hover or focus switches the list, click opens the board.
  var tabs = document.querySelectorAll('.tabs .tab');
  var more = document.querySelector('.tabs .more-link');
  function show(tab) {
    Array.prototype.forEach.call(tabs, function (t) {
      var on = t === tab;
      t.classList.toggle('on', on);
      t.querySelector('img').src = on ? t.getAttribute('data-on') : t.getAttribute('data-off');
      document.getElementById('panel-' + t.getAttribute('data-panel')).hidden = !on;
    });
    if (more) more.href = tab.getAttribute('href');
  }
  var noHover = window.matchMedia('(hover: none)');
  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener('mouseenter', function () { show(tab); });
    tab.addEventListener('focus', function () { show(tab); });
    // Touch screens have no hover: the first tap shows the list, the next opens
    // the board. Read the state at pointerdown, before focus switches the tab.
    var wasOn = true;
    tab.addEventListener('pointerdown', function () { wasOn = tab.classList.contains('on'); });
    tab.addEventListener('click', function (e) {
      if (noHover.matches && !wasOn) {
        e.preventDefault();
        show(tab);
      }
      wasOn = true;
    });
  });
})();
