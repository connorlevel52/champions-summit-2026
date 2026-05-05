/**
 * Champions Summit 2026 — Main JavaScript
 * Handles: Mobile navigation, sticky nav, accordion, smooth scroll, fade-in animations
 */

(function () {
  'use strict';

  function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mainNav = document.querySelector('.main-nav');

    if (!navToggle || !navLinks) return;

    navToggle.setAttribute('type', 'button');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', navLinks.id || 'site-navigation');
    if (!navLinks.id) navLinks.id = 'site-navigation';

    function closeMenu() {
      navLinks.classList.remove('nav-open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-menu-open');
    }

    function openMenu() {
      navLinks.classList.add('nav-open');
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-menu-open');
    }

    function toggleMenu(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (navLinks.classList.contains('nav-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    navToggle.addEventListener('click', toggleMenu);

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });

    return mainNav;
  }

  function initStickyNav(mainNav) {
    if (!mainNav) mainNav = document.querySelector('.main-nav');
    if (!mainNav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        mainNav.classList.add('nav-scrolled');
      } else {
        mainNav.classList.remove('nav-scrolled');
      }
    });
  }

  function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(function (header) {
      header.addEventListener('click', function () {
        const item = this.parentElement;
        const body = item.querySelector('.accordion-body');
        const accordion = item.closest('.accordion');
        const isOpen = item.classList.contains('accordion-open');

        if (!body || !accordion) return;

        accordion.querySelectorAll('.accordion-item').forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('accordion-open');
            const otherHeader = otherItem.querySelector('.accordion-header');
            const otherBody = otherItem.querySelector('.accordion-body');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('accordion-open');
          this.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = null;
        } else {
          item.classList.add('accordion-open');
          this.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  function initSmoothScroll() {
    const mainNav = document.querySelector('.main-nav');

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = mainNav ? mainNav.offsetHeight : 0;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  }

  function initFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
      const fadeObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in--visible');
              fadeObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
      });
    } else {
      fadeElements.forEach(function (el) {
        el.classList.add('fade-in--visible');
      });
    }
  }

  function initRegistrationFormPlaceholder() {
    const regForm = document.querySelector('.registration-form');
    if (!regForm) return;

    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = regForm.querySelector('button[type="submit"]');
      if (!btn) return;

      const originalText = btn.textContent;
      btn.textContent = 'Thank you! We\'ll be in touch.';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 4000);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const mainNav = initMobileNavigation();
    initStickyNav(mainNav);
    initAccordions();
    initSmoothScroll();
    initFadeIn();
    initRegistrationFormPlaceholder();
  });
})();
