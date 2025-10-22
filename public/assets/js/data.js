/*
  所有可变内容集中于此文件。
  可根据实际情况替换为从远端 JSON 加载的数据。
*/

const portfolioData = {
  profile: {
    avatar: '<AVATAR_URL>',
    displayName: '<DISPLAY_NAME>',
    title: '<TITLE_LABEL>',
    location: '<LOCATION_LABEL>',
    bio: '设计驱动的前端 / 产品体验创造者，专注于沉浸式交互与系统化设计。',
    email: '<EMAIL>',
    phone: '<PHONE>',
    socialLinks: {
      github: '<GITHUB_URL>',
      linkedin: '<LINKEDIN_URL>',
      website: '<WEBSITE_URL>'
    }
  },
  skills: [
    {
      name: 'Design Systems',
      level: 92,
      description: '制定设计规范、组件库与跨端视觉一致性。'
    },
    {
      name: 'Creative Frontend',
      level: 88,
      description: '运用 WebGL、Canvas 与动效塑造沉浸式体验。'
    },
    {
      name: 'Product Strategy',
      level: 80,
      description: '数据驱动的产品决策与体验闭环构建。'
    },
    {
      name: 'Content Crafting',
      level: 74,
      description: '用叙事与视觉讲述故事，强化品牌记忆。'
    }
  ],
  works: [
    {
      title: 'Lumen Vision - XR 体验站点',
      cover: 'https://placehold.co/800x520/png',
      tags: ['XR', 'WebGL', 'Art Direction'],
      summary: '为 XR 创企打造的光影叙事网站，融合 3D 模型与 WebGL 粒子效果。',
      url: 'https://example.com/work-lumen'
    },
    {
      title: 'Atlas Design System',
      cover: 'https://placehold.co/800x520/png?text=Design+System',
      tags: ['Design System', 'Documentation'],
      summary: '构建跨端 UI 组件体系，提供自动化文档、无障碍与主题切换。',
      url: 'https://example.com/work-atlas'
    },
    {
      title: 'Synapse Analytics Dashboard',
      cover: 'https://placehold.co/800x520/png?text=Dashboard',
      tags: ['Data Viz', 'Product'],
      summary: '企业级数据分析后台，整合即时协作、可视化与自动化报告。',
      url: 'https://example.com/work-synapse'
    }
  ],
  posts: [
    {
      title: '在生成式浪潮中重新思考设计系统',
      date: '2024-04-18',
      url: 'https://example.com/blog/generative-design-systems'
    },
    {
      title: 'Immersive Web 的叙事力量',
      date: '2024-01-22',
      url: 'https://example.com/blog/immersive-web-storytelling'
    },
    {
      title: '打造拥有温度的仪表盘体验',
      date: '2023-10-09',
      url: 'https://example.com/blog/dashboards-with-emotion'
    }
  ],
  infoCards: [
    {
      title: '在研',
      icon: 'flask',
      description: '构建 AI 辅助的多模态界面生成流程。'
    },
    {
      title: '常读',
      icon: 'book',
      description: '交互设计、认知心理学、科学幻想。'
    },
    {
      title: '记录',
      icon: 'sparkles',
      description: '每周一篇 newsletter，总结灵感与实验。'
    },
    {
      title: '生活',
      icon: 'compass',
      description: '在 <LOCATION_LABEL> 探索慢跑、咖啡与摄影。'
    }
  ],
  lifeProgress: {
    birthDate: '<BIRTH_YYYY-MM-DD>',
    lifeExpectancy: '<LIFE_EXPECTANCY_YEARS>',
    note: '仅趣味展示：珍惜每一次呼吸与灵感。'
  },
  contact: {
    formspreeEndpoint: 'https://formspree.io/f/your-id',
    cta: '向我发来合作想法或灵感火花'
  },
  settings: {
    backgroundImage: '<BACKGROUND_URL>',
    backgroundFallback: 'gradient',
    themeColor: '#38bdf8'
  }
};

window.portfolioData = portfolioData;
