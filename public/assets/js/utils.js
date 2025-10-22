(function () {
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return dateStr;
    }
  }

  function calculateLifeProgress(birthDate, expectancyYears) {
    if (!birthDate || !expectancyYears) return { percentage: 0, yearsLived: 0, yearsLeft: expectancyYears };
    const birth = new Date(birthDate);
    if (Number.isNaN(birth.getTime())) {
      return { percentage: 0, yearsLived: 0, yearsLeft: expectancyYears };
    }
    const today = new Date();
    const expectancyMs = Number(expectancyYears) * 365.25 * 24 * 60 * 60 * 1000;
    const livedMs = today.getTime() - birth.getTime();
    const percentage = Math.max(0, Math.min(100, (livedMs / expectancyMs) * 100));
    const yearsLived = livedMs / (365.25 * 24 * 60 * 60 * 1000);
    const yearsLeft = Math.max(0, expectancyYears - yearsLived);
    return {
      percentage: Number(percentage.toFixed(2)),
      yearsLived: Number(yearsLived.toFixed(1)),
      yearsLeft: Number(yearsLeft.toFixed(1))
    };
  }

  function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.text) el.textContent = options.text;
    if (options.html) el.innerHTML = options.html;
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          el.setAttribute(key, value);
        }
      });
    }
    if (options.children) {
      options.children.forEach((child) => {
        if (child) el.appendChild(child);
      });
    }
    return el;
  }

  const ICONS = {
    location:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-4.686-6-10a6 6 0 1 1 12 0c0 5.314-6 10-6 10Z"></path><circle cx="12" cy="11" r="2"></circle></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4z"></path><path d="m4 6 8 7 8-7"></path></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.12 3h3a1 1 0 0 1 1 .76 12.8 12.8 0 0 0 .7 2.27 1 1 0 0 1-.23 1l-1.27 1.27a16 16 0 0 0 6.58 6.58l1.27-1.27a1 1 0 0 1 1-.24 12.8 12.8 0 0 0 2.27.7A1 1 0 0 1 22 16.92Z"></path></svg>',
    github:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.31-1.71-1.31-1.71-1.07-.74.08-.73.08-.73 1.18.08 1.81 1.2 1.81 1.2 1.05 1.8 2.75 1.28 3.42.98.11-.76.41-1.28.74-1.57-2.55-.29-5.23-1.27-5.23-5.63 0-1.25.45-2.27 1.2-3.07-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.17a11.2 11.2 0 0 1 5.83 0c2.22-1.48 3.2-1.17 3.2-1.17.64 1.65.24 2.87.12 3.17.75.8 1.2 1.82 1.2 3.07 0 4.38-2.69 5.34-5.26 5.62.42.36.8 1.07.8 2.16v3.2c0 .31.21.67.8.55A10.5 10.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"></path></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.22 23.5h4.94V7.98H.22V23.5ZM8.1 7.98h4.73v2.13h.07c.66-1.24 2.27-2.55 4.67-2.55 5 0 5.92 3.28 5.92 7.55v8.39h-4.94v-7.43c0-1.77-.03-4.04-2.46-4.04-2.47 0-2.85 1.93-2.85 3.92v7.55H8.1V7.98Z"></path></svg>',
    website:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg>',
    flask:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6.26a2 2 0 0 1-.59 1.42l-5.25 5.25a4 4 0 0 0 2.83 6.83h9.98a4 4 0 0 0 2.83-6.83l-5.25-5.25A2 2 0 0 1 14 8.26V2"></path><path d="M8.5 2h7"></path></svg>',
    book:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19.5a2.5 2.5 0 0 1 2.5-2.5H20"></path><path d="M17 22H7.5A2.5 2.5 0 0 1 5 19.5V4.5A2.5 2.5 0 0 1 7.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path><path d="M9 8h6"></path></svg>',
    sparkles:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v2"></path><path d="m16.6 7.4 1.4 1.4"></path><path d="M21 12h-2"></path><path d="m16.6 16.6 1.4 1.4"></path><path d="M12 19v2"></path><path d="m6 19-1.4 1.4"></path><path d="M3 12h2"></path><path d="m6 5-1.4-1.4"></path><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path></svg>',
    compass:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m16 8-2.5 7.5L8 13l8-5Z"></path></svg>'
  };

  function getIconSvg(name) {
    return ICONS[name] || '';
  }

  function setThemeColor(color) {
    if (!color) return;
    document.documentElement.style.setProperty('--color-accent', color);
    document.documentElement.style.setProperty('--color-accent-soft', `${color}33`);
  }

  window.utils = {
    formatDate,
    calculateLifeProgress,
    createElement,
    getIconSvg,
    setThemeColor
  };
})();
