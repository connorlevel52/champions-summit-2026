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
    navToggle.setAttribute('aria-controls', 'site-navigation');
    navLinks.setAttribute('id', 'site-navigation');

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

    navToggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (navLinks.classList.contains('nav-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });

    if (mainNav) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
          mainNav.classList.add('nav-scrolled');
        } else {
          mainNav.classList.remove('nav-scrolled');
        }
      });
    }
  }

  function initAccordion() {
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
      anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        const navHeight = mainNav ? mainNav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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

      fadeElements.forEach(function (element) {
        fadeObserver.observe(element);
      });
    } else {
      fadeElements.forEach(function (element) {
        element.classList.add('fade-in--visible');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNavigation();
    initAccordion();
    initSmoothScroll();
    initFadeIn();
  });
})();
