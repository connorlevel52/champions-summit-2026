/**
 * Champions Summit 2026 — Main JavaScript
 * Handles: Navigation toggle, Accordion, Smooth scroll, Fade-in animations
 */

(function () {
  'use strict';

  /* ─── Mobile Navigation Toggle ─── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav-open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── Sticky Nav Background on Scroll ─── */
  if (mainNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        mainNav.classList.add('nav-scrolled');
      } else {
        mainNav.classList.remove('nav-scrolled');
      }
    });
  }

  /* ─── Accordion (Agenda Page) ─── */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('accordion-open');

      // Close all other items (optional — remove for multi-open)
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('accordion-open');
          otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          const otherBody = otherItem.querySelector('.accordion-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current item
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

  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = mainNav ? mainNav.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* ─── Fade-In on Scroll (Intersection Observer) ─── */
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
    // Fallback: just show everything
    fadeElements.forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }

  /* ─── Registration Form (placeholder handler) ─── */
  const regForm = document.querySelector('.registration-form');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // TODO: Replace with actual form submission logic
      var btn = regForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
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

})();
