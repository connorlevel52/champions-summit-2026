/**
 * Champions Summit 2026 — Main JavaScript
 * Handles: mobile navigation, clean same-page routing, smooth scroll, fade-in animations
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

  function openOrCloseMobileNav(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!navToggle || !navLinks) return;
    const isOpen = navLinks.classList.toggle('nav-open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function getSectionFromPath(pathname) {
    const cleanPath = pathname.replace(/\/$/, '');
    const map = {
      '': 'top',
      '/': 'top',
      '/the-room': 'the-room',
      '/agenda': 'agenda',
      '/code': 'code',
      '/partners': 'partners'
    };
    return map[cleanPath] || null;
  }

  function scrollToSection(sectionId, updateUrl) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const navHeight = mainNav ? mainNav.offsetHeight : 0;
    const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
    window.scrollTo({ top: Math.max(targetPos, 0), behavior: 'smooth' });

    if (updateUrl && window.history && window.history.pushState) {
      const path = sectionId === 'top' ? '/' : '/' + sectionId;
      window.history.pushState({ sectionId: sectionId }, '', path);
    }
  }

  if (navToggle && navLinks) {
    navToggle.style.pointerEvents = 'auto';
    navToggle.style.touchAction = 'manipulation';
    navToggle.style.position = 'relative';
    navToggle.style.zIndex = '1002';

    navToggle.addEventListener('click', openOrCloseMobileNav);
    navToggle.addEventListener('touchend', openOrCloseMobileNav, { passive: false });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('click', function (event) {
      if (!navLinks.classList.contains('nav-open')) return;
      if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
      closeMobileNav();
    });
  }

  if (mainNav) {
    window.addEventListener('scroll', function () {
      mainNav.classList.toggle('nav-scrolled', window.scrollY > 60);
    });
  }

  document.querySelectorAll('[data-scroll-target]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const sectionId = this.getAttribute('data-scroll-target');
      if (!sectionId) return;
      e.preventDefault();
      closeMobileNav();
      scrollToSection(sectionId, true);
    });
  });

  window.addEventListener('popstate', function () {
    const sectionId = getSectionFromPath(window.location.pathname);
    if (sectionId) scrollToSection(sectionId, false);
  });

  window.addEventListener('load', function () {
    const sectionId = getSectionFromPath(window.location.pathname);
    if (sectionId && sectionId !== 'top') {
      setTimeout(function () { scrollToSection(sectionId, false); }, 80);
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
