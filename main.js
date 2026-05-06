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
