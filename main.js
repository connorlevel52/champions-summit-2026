/**
 * Champions Summit 2026 — Main JavaScript
 * Handles mobile navigation, same-page anchor scrolling, nav state, and fade-in animations.
 */
(function () {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mainNav = document.querySelector('.main-nav');

  function closeMobileNav() {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove('nav-open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileNav(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!navToggle || !navLinks) return;
    const isOpen = navLinks.classList.toggle('nav-open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function scrollToHash(hash) {
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;

    const navHeight = mainNav ? mainNav.offsetHeight : 0;
    const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 18;
    window.scrollTo({ top: Math.max(targetPos, 0), behavior: 'smooth' });
  }

  if (navToggle && navLinks) {
    navToggle.style.pointerEvents = 'auto';
    navToggle.style.touchAction = 'manipulation';
    navToggle.style.position = 'relative';
    navToggle.style.zIndex = '1002';

    navToggle.addEventListener('click', toggleMobileNav);
    navToggle.addEventListener('touchend', toggleMobileNav, { passive: false });

    document.addEventListener('click', function (event) {
      if (!navLinks.classList.contains('nav-open')) return;
      if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
      closeMobileNav();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();

      var hash = link.getAttribute('href');
      if (!hash || hash === '#' || hash === '#top') return;

      var target = document.querySelector(hash);
      if (!target) return;

      // Find the fade-in container inside the target section
      var fadeEl = target.querySelector('.fade-in, .fade-in--visible');
      if (!fadeEl) return;

      // Reset the animation
      fadeEl.classList.remove('fade-in--visible');
      fadeEl.classList.add('fade-in');

      // Re-trigger after a short delay to let the scroll start
      setTimeout(function () {
        fadeEl.classList.add('fade-in--visible');
      }, 400);
    });
  });

  if (mainNav) {
    window.addEventListener('scroll', function () {
      mainNav.classList.toggle('nav-scrolled', window.scrollY > 60);
    });
  }

  window.addEventListener('load', function () {
    if (window.location.hash) {
      setTimeout(function () { scrollToHash(window.location.hash); }, 80);
    }
  });

  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const body = item.querySelector('.accordion-body');
      const accordion = item.closest('.accordion');
      const isOpen = item.classList.contains('accordion-open');

      if (accordion) {
        accordion.querySelectorAll('.accordion-item').forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('accordion-open');
            const otherHeader = otherItem.querySelector('.accordion-header');
            const otherBody = otherItem.querySelector('.accordion-body');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });
      }

      if (!body) return;
      item.classList.toggle('accordion-open', !isOpen);
      this.setAttribute('aria-expanded', String(!isOpen));
      body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
    });
  });


  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(function (el) { fadeObserver.observe(el); });
  } else {
    fadeElements.forEach(function (el) { el.classList.add('fade-in--visible'); });
  }
})();

// ── PAGE LOAD ENTRANCE ANIMATIONS ──
(function () {
  // 1. Nav — fade down from above
  var nav = document.querySelector('.main-nav');
  if (nav) {
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-20px)';
    nav.style.transition = 'opacity .6s ease, transform .6s ease';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
      });
    });
  }

  // 2. Hero elements — staggered fade in on DOMContentLoaded
  function animateHero() {
    var selectors = [
      '.hero-accent',
      '.hero-content h1',
      '.hero-content p',
      '.hero-ceo-card',
      '.hero-cta'
    ];

    selectors.forEach(function (sel, i) {
      var el = document.querySelector(sel);
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'none';

      setTimeout(function () {
        el.style.transition = 'opacity .8s cubic-bezier(0.22,1,0.36,1), transform .8s cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 160);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateHero);
  } else {
    animateHero();
  }
})();

// ── EXTERNAL LINKS — auto open in new tab ──
(function () {
  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    if (/^https?:\/\//i.test(href) && !href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();

// ── APPLY POPUP ──
// Triggers on exit intent (mouse leaving viewport top) OR after 10 seconds.
// Shows once per session using sessionStorage.
(function () {
  var STORAGE_KEY = 'cs2026_popup_seen';
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  var hasShown = false;

  function buildPopup() {
    var overlay = document.createElement('div');
    overlay.id = 'cs-popup-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9000',
      'background:rgba(2,47,74,0.75)', 'backdrop-filter:blur(4px)',
      'display:flex', 'align-items:center', 'justify-content:center',
      'padding:1.5rem', 'opacity:0', 'transition:opacity .35s ease'
    ].join(';');

    var modal = document.createElement('div');
    modal.style.cssText = [
      'background:#022F4A',
      'border:1px solid rgba(255,255,255,0.12)',
      'border-top:4px solid #D8722C',
      'border-radius:10px',
      'max-width:520px', 'width:100%',
      'padding:2.5rem 2.5rem 2rem',
      'position:relative',
      'transform:translateY(24px)',
      'transition:transform .35s ease',
      'text-align:center',
      'box-shadow:0 30px 80px rgba(0,0,0,0.5)'
    ].join(';');

    modal.innerHTML = [
      '<button id="cs-popup-close" aria-label="Close" style="position:absolute;top:1rem;right:1.25rem;background:none;border:none;color:rgba(255,255,255,0.4);font-size:1.4rem;cursor:pointer;line-height:1;transition:color .2s;" onmouseover="this.style.color=\'#FFF\'" onmouseout="this.style.color=\'rgba(255,255,255,0.4)\'">&#x2715;</button>',
      '<p style="font-family:\'Trebuchet MS\',sans-serif;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.22em;color:#D8722C;margin-bottom:1.25rem;">150 Seats · Application Only · October 26–27</p>',
      '<h2 style="font-family:\'Trebuchet MS\',sans-serif;font-size:clamp(1.5rem,3vw,2rem);font-weight:700;text-transform:uppercase;letter-spacing:.03em;color:#FFF;margin-bottom:1rem;line-height:1.2;">Before You Go.</h2>',
      '<p style="color:rgba(255,255,255,0.8);font-size:1rem;line-height:1.75;margin-bottom:2rem;">This room sells out. 150 seats, application-only, and reviewed on a rolling basis. Apply for your seat — or bring your team.</p>',
      '<div style="display:flex;flex-direction:column;align-items:center;gap:.75rem;margin-bottom:1.5rem;">',
        '<div style="display:flex;flex-direction:column;align-items:center;gap:.3rem;">',
          '<a href="https://level52.typeform.com/cs2026-app?typeform-source=www.google.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#D8722C;color:#FFF;font-family:\'Trebuchet MS\',sans-serif;font-size:.9rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:.9rem 2rem;border-radius:4px;border:2px solid #D8722C;text-decoration:none;min-width:220px;" onmouseover="this.style.background=\'#c0631f\';this.style.borderColor=\'#c0631f\'" onmouseout="this.style.background=\'#D8722C\';this.style.borderColor=\'#D8722C\'">Apply for a Seat</a>',
          '<p style="color:rgba(255,255,255,0.5);font-size:.72rem;margin:0;font-family:\'Trebuchet MS\',sans-serif;letter-spacing:.04em;">Rolling review. Only 150 seats.</p>',
        '</div>',
        '<div style="display:flex;flex-direction:column;align-items:center;gap:.3rem;">',
          '<a href="mailto:jayson@level52.ca?subject=Table%20Inquiry%20%E2%80%94%20Champions%20Summit%202026" style="display:inline-block;background:transparent;color:#FFF;font-family:\'Trebuchet MS\',sans-serif;font-size:.9rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:.9rem 2rem;border-radius:4px;border:2px solid rgba(255,255,255,0.4);text-decoration:none;min-width:220px;" onmouseover="this.style.borderColor=\'#D8722C\';this.style.color=\'#D8722C\'" onmouseout="this.style.borderColor=\'rgba(255,255,255,0.4)\';this.style.color=\'#FFF\'">Reserve Your Table</a>',
          '<p style="color:rgba(255,255,255,0.5);font-size:.72rem;margin:0;font-style:italic;">High-potential team? Inquire here.</p>',
        '</div>',
      '</div>',
      '<p style="margin-top:.5rem;"><button id="cs-popup-dismiss" style="background:none;border:none;color:rgba(255,255,255,0.35);font-size:.8rem;cursor:pointer;text-decoration:underline;font-family:\'Helvetica Neue\',sans-serif;transition:color .2s;" onmouseover="this.style.color=\'rgba(255,255,255,0.7)\'" onmouseout="this.style.color=\'rgba(255,255,255,0.35)\'">I\'m not interested</button></p>'
    ].join('');

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
      });
    });

    function closePopup() {
      overlay.style.opacity = '0';
      modal.style.transform = 'translateY(24px)';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 350);
    }

    document.getElementById('cs-popup-close').addEventListener('click', closePopup);
    document.getElementById('cs-popup-dismiss').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });
  }

  function showPopup() {
    if (hasShown) return;
    hasShown = true;
    sessionStorage.setItem(STORAGE_KEY, '1');
    buildPopup();
  }

  document.addEventListener('mouseleave', function (e) {
    if (e.clientY <= 0) showPopup();
  });

  setTimeout(showPopup, 10000);
})();
