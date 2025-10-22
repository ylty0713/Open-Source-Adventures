(function () {
  const data = window.portfolioData || {};
  const BACKGROUND_KEY = 'portfolio-background-image';

  function getBackgroundUrl() {
    const stored = window.localStorage?.getItem(BACKGROUND_KEY);
    if (stored) return stored;
    return data.settings?.backgroundImage || '';
  }

  function setBackgroundImage(url) {
    const layer = document.querySelector('.background__image-layer');
    if (!layer) return;
    if (url) {
      layer.style.backgroundImage = `url("${url}")`;
    } else {
      const fallback = data.settings?.backgroundFallback;
      if (fallback === 'gradient') {
        layer.style.backgroundImage =
          'radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.32), transparent 60%), radial-gradient(circle at 80% 15%, rgba(129, 140, 248, 0.36), transparent 55%), linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 0.85))';
      } else if (fallback === 'solid') {
        layer.style.backgroundImage = 'linear-gradient(135deg, #0f172a, #1e293b)';
      } else {
        layer.style.backgroundImage = 'linear-gradient(135deg, #0b1120, #1f2937)';
      }
    }
  }

  function createBokehLights(count = 12) {
    const container = document.querySelector('[data-bokeh-container]');
    if (!container) return;
    container.innerHTML = '';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 180 + 60;
      const light = document.createElement('span');
      light.className = 'bokeh-light';
      light.style.width = `${size}px`;
      light.style.height = `${size}px`;
      light.style.left = `${Math.random() * 100}%`;
      light.style.top = `${Math.random() * 100}%`;
      light.style.animationDelay = `${Math.random() * 8}s`;
      light.style.background = `radial-gradient(circle, rgba(56, 189, 248, ${Math.random() * 0.35 + 0.2}), rgba(255, 255, 255, 0))`;
      if (prefersReducedMotion) {
        light.style.animation = 'none';
      }
      container.appendChild(light);
    }
  }

  function handleBackgroundSwitcher() {
    const switcher = document.querySelector('.background-switcher');
    const input = document.querySelector('.background-switcher__input');
    if (!switcher || !input) return;

    switcher.addEventListener('click', () => {
      input.click();
    });

    input.addEventListener('change', (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        if (typeof dataUrl === 'string') {
          try {
            window.localStorage?.setItem(BACKGROUND_KEY, dataUrl);
          } catch (error) {
            console.warn('无法保存背景到本地存储', error);
          }
          setBackgroundImage(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function init() {
    setBackgroundImage(getBackgroundUrl());
    createBokehLights();
    handleBackgroundSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
