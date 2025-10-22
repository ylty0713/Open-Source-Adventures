(function () {
  const data = window.portfolioData || {};
  const { createElement, getIconSvg, formatDate, calculateLifeProgress, setThemeColor } = window.utils;

  function renderProfile() {
    const profileSection = document.getElementById('profile');
    if (!profileSection) return;
    const { profile = {} } = data;
    const avatarEl = profileSection.querySelector('.hero__avatar');
    const titleEl = profileSection.querySelector('.hero__title');
    const subtitleEl = profileSection.querySelector('.hero__subtitle');
    const bioEl = profileSection.querySelector('.hero__bio');

    if (avatarEl) {
      avatarEl.src = profile.avatar || 'https://placehold.co/320x320/png';
    }

    if (titleEl) {
      titleEl.textContent = profile.displayName || '未命名创作者';
    }

    if (subtitleEl) {
      subtitleEl.textContent = profile.title || '多面向创作者';
    }

    if (bioEl) {
      bioEl.textContent = profile.bio || '';
    }

    const locationItem = profileSection.querySelector('.hero__meta-location');
    if (locationItem) {
      locationItem.innerHTML = `${getIconSvg('location')}<span>${profile.location || '星球未知'}</span>`;
    }

    const emailItem = profileSection.querySelector('.hero__meta-email');
    if (emailItem) {
      const email = profile.email || '';
      emailItem.innerHTML = `${getIconSvg('mail')}<a href="mailto:${email}">${email || 'hello@example.com'}</a>`;
    }

    const phoneItem = profileSection.querySelector('.hero__meta-phone');
    if (phoneItem) {
      const phone = profile.phone || '';
      phoneItem.innerHTML = `${getIconSvg('phone')}<a href="tel:${phone}">${phone || '+00-0000-0000'}</a>`;
    }

    const socialGroup = profileSection.querySelector('.hero__actions');
    if (socialGroup) {
      const links = profile.socialLinks || {};
      socialGroup.querySelectorAll('[data-social]').forEach((anchor) => {
        const key = anchor.getAttribute('data-social');
        const url = links[key];
        if (url) {
          anchor.href = url;
        } else {
          anchor.href = '#';
          anchor.classList.add('is-disabled');
          anchor.setAttribute('aria-disabled', 'true');
          anchor.setAttribute('tabindex', '-1');
        }
      });
    }
  }

  function renderSkills() {
    const container = document.querySelector('[data-skills]');
    if (!container) return;
    const skills = data.skills || [];
    if (!skills.length) {
      container.appendChild(createElement('p', { className: 'section__subtitle', text: '技能信息即将更新。' }));
      return;
    }

    const fragment = document.createDocumentFragment();

    skills.forEach((skill, index) => {
      const progressId = `skill-progress-${index}`;
      const card = createElement('article', { className: 'skill-card fade-in', attributes: { 'data-animate': '' } });
      const header = createElement('div', { className: 'skill-card__header' });
      header.appendChild(createElement('h3', { className: 'skill-card__name', text: skill.name }));
      header.appendChild(createElement('span', { className: 'skill-card__level', text: `${skill.level || 0}%` }));

      const progress = createElement('div', {
        className: 'progress',
        attributes: {
          role: 'progressbar',
          'aria-valuemin': '0',
          'aria-valuemax': '100',
          'aria-valuenow': String(skill.level || 0),
          id: progressId
        }
      });
      const progressTrack = createElement('div', { className: 'progress__track' });
      const progressIndicator = createElement('div', {
        className: 'progress__indicator',
        attributes: { 'data-target': String(skill.level || 0) }
      });
      progress.append(progressTrack, progressIndicator);

      const description = createElement('p', { className: 'section__subtitle', text: skill.description || '' });

      card.append(header, progress, description);
      fragment.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }

  function renderWorks() {
    const container = document.querySelector('[data-works]');
    if (!container) return;
    const works = data.works || [];
    if (!works.length) {
      container.appendChild(createElement('p', { className: 'section__subtitle', text: '作品整理中，敬请期待。' }));
      return;
    }

    const fragment = document.createDocumentFragment();
    works.forEach((work) => {
      const card = createElement('article', { className: 'work-card', attributes: { 'data-animate': '' } });
      const cover = createElement('div', { className: 'work-card__cover' });
      const coverImg = createElement('img', {
        attributes: {
          src: work.cover || 'https://placehold.co/640x420/png',
          alt: `${work.title || '作品'} 封面`,
          loading: 'lazy'
        }
      });
      cover.appendChild(coverImg);

      const body = createElement('div', { className: 'work-card__body' });
      body.appendChild(createElement('h3', { className: 'work-card__title', text: work.title || '未命名项目' }));

      if (Array.isArray(work.tags) && work.tags.length) {
        const tags = createElement('div', { className: 'work-card__tags' });
        work.tags.forEach((tag) => {
          tags.appendChild(createElement('span', { className: 'work-card__tag', text: tag }));
        });
        body.appendChild(tags);
      }

      body.appendChild(createElement('p', { className: 'work-card__summary', text: work.summary || '' }));

      if (work.url) {
        const link = createElement('a', {
          className: 'work-card__link',
          text: '浏览项目',
          attributes: {
            href: work.url,
            target: '_blank',
            rel: 'noopener'
          }
        });
        link.insertAdjacentHTML('beforeend', getIconSvg('arrow'));
        body.appendChild(link);
      }

      card.append(cover, body);
      fragment.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }

  function renderPosts() {
    const container = document.querySelector('[data-posts]');
    if (!container) return;
    const posts = data.posts || [];
    if (!posts.length) {
      container.appendChild(createElement('p', { className: 'section__subtitle', text: '最近还没有发布新动态。' }));
      return;
    }

    const fragment = document.createDocumentFragment();
    posts.forEach((post) => {
      const link = createElement('a', {
        className: 'post-item',
        attributes: {
          href: post.url || '#',
          target: '_blank',
          rel: 'noopener',
          'data-animate': ''
        }
      });
      link.appendChild(createElement('div', { className: 'post-item__meta', text: formatDate(post.date) }));
      link.appendChild(createElement('h3', { className: 'work-card__title', text: post.title || '未命名文章' }));
      fragment.appendChild(link);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }

  function renderInfoCards() {
    const container = document.querySelector('[data-infocards]');
    if (!container) return;
    const infoCards = data.infoCards || [];
    if (!infoCards.length) {
      container.appendChild(createElement('p', { className: 'section__subtitle', text: '更多灵感整理中。' }));
      return;
    }

    const fragment = document.createDocumentFragment();
    infoCards.forEach((item) => {
      const card = createElement('article', { className: 'info-card', attributes: { 'data-animate': '' } });
      const iconWrap = createElement('div', { className: 'info-card__icon', html: getIconSvg(item.icon) });
      card.appendChild(iconWrap);
      card.appendChild(createElement('h3', { className: 'info-card__title', text: item.title || '' }));
      card.appendChild(createElement('p', { className: 'info-card__description', text: item.description || '' }));
      fragment.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }

  function renderLifeProgress() {
    const card = document.querySelector('.card--life');
    if (!card) return;
    const { lifeProgress = {} } = data;
    const progressEl = card.querySelector('.progress__indicator');
    const labelEl = card.querySelector('.life-progress__label');
    const noteEl = card.querySelector('.life-progress__note');
    const progressContainer = card.querySelector('.progress');

    const expectancy = Number(lifeProgress.lifeExpectancy);
    const { percentage, yearsLived, yearsLeft } = calculateLifeProgress(
      lifeProgress.birthDate,
      Number.isFinite(expectancy) && expectancy > 0 ? expectancy : 100
    );
    const displayPercentage = Number(percentage.toFixed(1));

    if (labelEl) {
      labelEl.textContent = `人生旅程约完成 ${displayPercentage}% · 已走过 ${yearsLived} 年 · 预计剩余 ${yearsLeft} 年`;
    }

    if (noteEl) {
      noteEl.textContent = lifeProgress.note || '仅作为趣味展示，不代表真实预期。';
    }

    if (progressEl) {
      progressEl.style.width = `${percentage}%`;
    }

    if (progressContainer) {
      progressContainer.setAttribute('aria-valuenow', String(percentage));
    }
  }

  function configureContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    const { contact = {} } = data;
    if (contact.formspreeEndpoint) {
      form.action = contact.formspreeEndpoint;
    }
    const subtitle = document.querySelector('.contact__subtitle');
    if (subtitle && contact.cta) {
      subtitle.textContent = contact.cta;
    }
  }

  function updateFooter() {
    const yearEl = document.querySelector('[data-year]');
    const footerName = document.querySelector('[data-footer-name]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (footerName) footerName.textContent = data.profile?.displayName || '<DISPLAY_NAME>';
  }

  function applyTheme() {
    const themeColor = data.settings?.themeColor;
    setThemeColor(themeColor);
  }

  function init() {
    renderProfile();
    renderSkills();
    renderWorks();
    renderPosts();
    renderInfoCards();
    renderLifeProgress();
    configureContactForm();
    updateFooter();
    applyTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
