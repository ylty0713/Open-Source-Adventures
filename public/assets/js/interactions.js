(function () {
  function initScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    if (!animateElements.length) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      animateElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animateElements.forEach((el) => observer.observe(el));
  }

  function initSkillProgressAnimation() {
    const progressBars = document.querySelectorAll('.progress__indicator[data-target]');
    if (!progressBars.length) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      progressBars.forEach((bar) => {
        const target = Number(bar.getAttribute('data-target')) || 0;
        bar.style.width = `${target}%`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const target = Number(bar.getAttribute('data-target')) || 0;
            bar.style.width = `${target}%`;
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.4 }
    );

    progressBars.forEach((bar) => observer.observe(bar));
  }

  function initNavHighlight() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.site-nav__link');
    if (!sections.length || !navLinks.length) return;
    const navMap = new Map();
    if (navLinks[0]) {
      navLinks[0].classList.add('is-active');
      navLinks[0].setAttribute('aria-current', 'true');
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        navMap.set(href.slice(1), link);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.remove('is-active');
              link.removeAttribute('aria-current');
            });
            const activeLink = navMap.get(id);
            if (activeLink) {
              activeLink.classList.add('is-active');
              activeLink.setAttribute('aria-current', 'true');
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    const updateState = (expanded) => {
      toggle.setAttribute('aria-expanded', String(expanded));
      nav.classList.toggle('is-open', expanded);
      document.body.classList.toggle('nav-open', expanded);
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      updateState(!expanded);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => updateState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        updateState(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) {
        updateState(false);
      }
    });
  }

  function init() {
    initScrollAnimations();
    initSkillProgressAnimation();
    initNavHighlight();
    initNavToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
