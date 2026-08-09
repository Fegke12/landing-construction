/* ============================================
   BuildPro — main.js
   Burger menu, smooth scroll, review slider,
   form validation, project filters, back-to-top
   ============================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initBurger();
    initSmoothScroll();
    initReviewSlider();
    initForm();
    initFilters();
    initToTop();
    initSpotlight();
    initReveal();
  }

  /* ---------- Spotlight hover (service cards) ---------- */
  function initSpotlight() {
    var cards = document.querySelectorAll('.service');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
      });
    });
  }

  /* ---------- Scroll-reveal (staggered) ---------- */
  function initReveal() {
    var targets = document.querySelectorAll('.step, .project, .project-card');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Burger + mobile drawer ---------- */
  function initBurger() {
    var burger = document.getElementById('burger');
    var navLinks = document.getElementById('navLinks');
    if (!burger || !navLinks) return;

    // Build a proper drawer with backdrop from the nav links
    var backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);

    var drawer = document.createElement('aside');
    drawer.className = 'drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Меню');
    drawer.innerHTML = '<button type="button" class="drawer-close" aria-label="Закрыть">✕</button>' + navLinks.innerHTML;
    document.body.appendChild(drawer);

    var closeBtn = drawer.querySelector('.drawer-close');

    function open() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function toggle() {
      if (drawer.classList.contains('open')) close(); else open();
    }

    burger.addEventListener('click', toggle);
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) close();
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var nav = document.querySelector('.site-nav');
      var offset = nav ? nav.offsetHeight : 0;
      var y = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }

  /* ---------- Reviews slider ---------- */
  function initReviewSlider() {
    var slider = document.getElementById('reviewSlider');
    if (!slider) return;
    var reviews = slider.querySelectorAll('.review');
    var dotsBox = document.getElementById('reviewDots');
    var btns = slider.querySelectorAll('.slider-btn');
    if (!reviews.length) return;

    var idx = 0;

    // Build dots
    if (dotsBox) {
      dotsBox.innerHTML = '';
      for (var i = 0; i < reviews.length; i++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Отзыв ' + (i + 1));
        (function (n) { d.addEventListener('click', function () { go(n); }); })(i);
        dotsBox.appendChild(d);
      }
    }

    function render() {
      reviews.forEach(function (r, i) { r.classList.toggle('active', i === idx); });
      if (dotsBox) {
        dotsBox.querySelectorAll('.dot').forEach(function (d, i) {
          d.classList.toggle('active', i === idx);
        });
      }
    }
    function go(n) { idx = (n + reviews.length) % reviews.length; render(); reset(); }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var dir = parseInt(b.getAttribute('data-dir'), 10) || 1;
        go(idx + dir);
      });
    });

    render();

    // Autoplay
    var timer;
    function reset() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 7000); }
    reset();
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', reset);
  }

  /* ---------- Form validation ---------- */
  function initForm() {
    var form = document.getElementById('calcForm');
    if (!form) return;
    var successBox = document.getElementById('formSuccess');

    var nameEl = form.querySelector('[name="name"]');
    var phoneEl = form.querySelector('[name="phone"]');
    var emailEl = form.querySelector('[name="email"]');

    // Phone mask (light): keep +7 and format digits
    if (phoneEl) {
      phoneEl.addEventListener('input', function () {
        var digits = phoneEl.value.replace(/\D/g, '');
        if (digits.length && digits[0] === '8') digits = '7' + digits.slice(1);
        if (digits.length && digits[0] !== '7') digits = '7' + digits;
        digits = digits.slice(0, 11);
        var out = '+7';
        if (digits.length > 1) out += ' (' + digits.slice(1, 4);
        if (digits.length >= 4) out += ') ' + digits.slice(4, 7);
        if (digits.length >= 7) out += '-' + digits.slice(7, 9);
        if (digits.length >= 9) out += '-' + digits.slice(9, 11);
        phoneEl.value = out;
      });
    }

    // Clear error on change
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () { setError(el.name, ''); });
      el.addEventListener('change', function () { setError(el.name, ''); });
    });

    function setError(name, msg) {
      var slot = form.querySelector('[data-error-for="' + name + '"]');
      var field = form.querySelector('[name="' + name + '"]');
      if (slot) slot.textContent = msg || '';
      if (field && field.closest('.field')) field.closest('.field').classList.toggle('error', !!msg);
    }

    function validate() {
      var ok = true;
      var name = (nameEl.value || '').trim();
      if (name.length < 2) { setError('name', 'Введите имя (минимум 2 символа)'); ok = false; }
      else setError('name', '');

      var phoneDigits = (phoneEl.value || '').replace(/\D/g, '');
      if (phoneDigits.length < 11) { setError('phone', 'Введите корректный номер телефона'); ok = false; }
      else setError('phone', '');

      var email = (emailEl.value || '').trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('email', 'Некорректный email');
        ok = false;
      } else setError('email', '');

      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      // Simulated submit
      form.querySelectorAll('.field, .submit-row').forEach(function (el) { el.style.display = 'none'; });
      if (successBox) {
        successBox.hidden = false;
        successBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      setTimeout(function () {
        form.reset();
        form.querySelectorAll('.field, .submit-row').forEach(function (el) { el.style.display = ''; });
        if (successBox) successBox.hidden = true;
      }, 8000);
    });
  }

  /* ---------- Project filters ---------- */
  function initFilters() {
    var chipsBox = document.getElementById('filterChips');
    var grid = document.getElementById('projectsGrid');
    var countEl = document.getElementById('filterCount');
    var emptyEl = document.getElementById('emptyState');
    if (!chipsBox || !grid) return;

    var chips = chipsBox.querySelectorAll('.chip');
    var cards = grid.querySelectorAll('.project-card');

    function apply(filter) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown;
      if (emptyEl) emptyEl.hidden = shown !== 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        apply(chip.getAttribute('data-filter'));
      });
    });

    apply('all');
  }

  /* ---------- Back to top ---------- */
  function initToTop() {
    var btn = document.getElementById('toTop');
    if (!btn) return;
    function onScroll() {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }
})();
