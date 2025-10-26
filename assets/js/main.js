const NAV_LINK_SELECTOR = '.navbar__links a';

function setupNavigation() {
  const navToggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('is-open'));
    });

    navLinks.addEventListener('click', (event) => {
      if (event.target.matches('a')) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const currentPage = document.body.dataset.page;
  document.querySelectorAll(NAV_LINK_SELECTOR).forEach((link) => {
    const target = link.dataset.pageTarget || '';
    if (target && currentPage && target === currentPage) {
      link.classList.add('is-active');
    }
  });
}

function initHome() {
  const typedTarget = document.querySelector('[data-typed]');
  if (typedTarget) {
    const phrases = typedTarget.dataset.typed.split('|').map((item) => item.trim());
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentPhrase = phrases[phraseIndex] || '';
      const displayText = currentPhrase.substring(0, charIndex);
      typedTarget.textContent = displayText;

      if (!isDeleting && charIndex < currentPhrase.length) {
        charIndex += 1;
      } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
      }

      if (charIndex === currentPhrase.length && !isDeleting) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      const delay = isDeleting ? 65 : 120;
      setTimeout(type, delay);
    };

    type();
  }

  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      parallaxElements.forEach((element) => {
        const depth = Number.parseFloat(element.dataset.parallax) || 0.2;
        element.style.transform = `translate3d(0, ${offset * depth * -0.2}px, 0)`;
      });
    });
  }

  const audio = document.querySelector('#bg-music');
  const toggleButton = document.querySelector('[data-music-toggle]');
  if (audio && toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => toggleButton.classList.add('is-muted'));
        toggleButton.classList.remove('is-muted');
        toggleButton.querySelector('strong').textContent = '暂停';
      } else {
        audio.pause();
        toggleButton.classList.add('is-muted');
        toggleButton.querySelector('strong').textContent = '播放';
      }
    });

    audio.addEventListener('ended', () => {
      toggleButton.classList.add('is-muted');
      toggleButton.querySelector('strong').textContent = '播放';
    });
  }
}

function initPhotography() {
  const sliderImages = document.querySelectorAll('.photography-slider img');
  if (sliderImages.length) {
    let current = 0;
    sliderImages[current].classList.add('is-active');
    setInterval(() => {
      sliderImages[current].classList.remove('is-active');
      current = (current + 1) % sliderImages.length;
      sliderImages[current].classList.add('is-active');
    }, 4500);
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  document.querySelectorAll('.masonry-item img').forEach((img) => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightbox.classList.add('is-visible');
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
    });
  });

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.hasAttribute('data-lightbox-close')) {
      lightbox.classList.remove('is-visible');
    }
  });
}

function initMusic() {
  const audio = document.querySelector('#music-audio');
  if (!audio) return;

  const titleEl = document.querySelector('[data-track-title]');
  const artistEl = document.querySelector('[data-track-artist]');
  const progressBar = document.querySelector('.music-progress__inner');
  const playBtn = document.querySelector('[data-play]');
  const prevBtn = document.querySelector('[data-prev]');
  const nextBtn = document.querySelector('[data-next]');
  const lyricsList = document.querySelector('.lyrics ul');
  const playlistContainer = document.querySelector('.playlist');

  const playlist = [
    {
      title: '星河漫游',
      artist: 'Wei Tingting',
      src: 'https://cdn.pixabay.com/download/audio/2023/08/23/audio_736650bc1f.mp3?filename=space-ambience-178676.mp3',
      lyrics: ['沿着光的轨迹航行', '穿越无垠的星海', '耳畔是心跳与宇宙交织', '灵感在静谧中闪耀']
    },
    {
      title: '晨曦序曲',
      artist: 'Wei Tingting',
      src: 'https://cdn.pixabay.com/download/audio/2022/10/20/audio_3ba02d9ae3.mp3?filename=morning-garden-12469.mp3',
      lyrics: ['黎明唤醒沉睡的风', '树梢描绘琥珀晨光', '咖啡香气与旋律摇曳', '心绪在微光中升腾']
    },
    {
      title: '海风信笺',
      artist: 'Wei Tingting',
      src: 'https://cdn.pixabay.com/download/audio/2022/10/20/audio_d0b6d8f8f3.mp3?filename=ocean-vibes-12463.mp3',
      lyrics: ['海浪写下未寄出的信', '风带来咸甜的吟唱', '指尖在琴弦间游走', '思念随潮声回响']
    }
  ];

  let currentTrack = 0;

  const renderLyrics = (lines) => {
    if (!lyricsList) return;
    lyricsList.innerHTML = '';
    lines.forEach((line) => {
      const li = document.createElement('li');
      li.textContent = line;
      lyricsList.appendChild(li);
    });
  };

  const renderPlaylist = () => {
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';
    playlist.forEach((track, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${track.title} · ${track.artist}`;
      if (index === currentTrack) {
        button.classList.add('is-active');
      }
      button.addEventListener('click', () => {
        currentTrack = index;
        loadTrack();
        audio.play();
      });
      playlistContainer.appendChild(button);
    });
  };

  const loadTrack = () => {
    const track = playlist[currentTrack];
    audio.src = track.src;
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    renderLyrics(track.lyrics);
    renderPlaylist();
  };

  const togglePlay = () => {
    if (audio.paused) {
      audio.play();
      playBtn?.setAttribute('data-state', 'playing');
      playBtn && (playBtn.innerHTML = '❚❚');
    } else {
      audio.pause();
      playBtn?.setAttribute('data-state', 'paused');
      playBtn && (playBtn.innerHTML = '▶');
    }
  };

  playBtn?.addEventListener('click', togglePlay);
  prevBtn?.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack();
    audio.play();
  });

  nextBtn?.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack();
    audio.play();
  });

  audio.addEventListener('timeupdate', () => {
    if (!progressBar) return;
    const percent = (audio.currentTime / audio.duration) * 100 || 0;
    progressBar.style.width = `${percent}%`;
  });

  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack();
    audio.play();
  });

  loadTrack();
}

function initBlog() {
  const blogList = document.querySelector('.blog-list');
  if (!blogList) return;

  const loadingIndicator = document.querySelector('.blog-loading');
  const articles = [
    {
      id: 1,
      title: '山谷里的第一缕光',
      cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      date: '2024-03-01',
      category: '旅行随笔',
      excerpt: '跟随晨光行走，记录山谷从沉睡到苏醒的每一个瞬间。'
    },
    {
      id: 2,
      title: '镜头里的城市呼吸',
      cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80',
      date: '2024-02-19',
      category: '摄影手记',
      excerpt: '在夜幕与霓虹交汇处，城市的节奏被定格成流动的诗。'
    },
    {
      id: 3,
      title: '一杯咖啡的慢叙事',
      cover: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      date: '2024-02-02',
      category: '生活方式',
      excerpt: '咖啡与音乐，是创作最亲密的搭档，也是灵感萌芽的土壤。'
    },
    {
      id: 4,
      title: '北纬45°的星空',
      cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      date: '2024-01-18',
      category: '摄影手记',
      excerpt: '当星辰在头顶缓缓划过，世界只剩下呼吸与快门声。'
    },
    {
      id: 5,
      title: '胶片的温度',
      cover: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      date: '2023-12-20',
      category: '创作感悟',
      excerpt: '胶片的颗粒像时间的回响，让记忆被细腻地保存。'
    },
    {
      id: 6,
      title: '风从海上来',
      cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      date: '2023-11-05',
      category: '旅行随笔',
      excerpt: '轻盈的浪花敲打着礁石，也敲开了创作的新篇章。'
    },
    {
      id: 7,
      title: '夜行者的电台',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
      date: '2023-10-14',
      category: '音乐灵感',
      excerpt: '当旋律在耳机里流淌，夜的故事悄然展开。'
    },
    {
      id: 8,
      title: '山雨欲来',
      cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
      date: '2023-09-22',
      category: '摄影手记',
      excerpt: '暴雨前的风，带着紧张也带着期待，像极了创作的心境。'
    }
  ];

  let rendered = 0;
  const BATCH_SIZE = 4;

  const renderArticles = () => {
    const slice = articles.slice(rendered, rendered + BATCH_SIZE);
    slice.forEach((article) => {
      const card = document.createElement('article');
      card.className = 'blog-card';
      card.innerHTML = `
        <a href="blog-post.html?id=${article.id}">
          <img src="${article.cover}" alt="${article.title}">
        </a>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <span>${article.category}</span>
            <span>${article.date}</span>
          </div>
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <a class="button" href="blog-post.html?id=${article.id}">阅读全文</a>
        </div>
      `;
      blogList.appendChild(card);
    });
    rendered += slice.length;

    if (rendered >= articles.length && loadingIndicator) {
      loadingIndicator.textContent = '已经到底啦 ✨';
    }
  };

  const handleScroll = () => {
    if (rendered >= articles.length) return;
    const { scrollY, innerHeight } = window;
    const { offsetHeight } = document.body;
    if (scrollY + innerHeight >= offsetHeight - 200) {
      renderArticles();
    }
  };

  renderArticles();
  window.addEventListener('scroll', handleScroll);
}

function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineItems.forEach((item) => observer.observe(item));
}

function init() {
  setupNavigation();
  const page = document.body.dataset.page;
  const pageMap = {
    home: initHome,
    about: initTimelineAnimations,
    photography: initPhotography,
    music: initMusic,
    blog: initBlog,
    contact: () => {},
    videos: () => {}
  };

  const initPage = pageMap[page];
  if (initPage) initPage();
}

document.addEventListener('DOMContentLoaded', init);
