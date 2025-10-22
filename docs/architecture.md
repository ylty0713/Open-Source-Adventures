# 作品集网站信息架构与设计总览

## 信息架构图（首页锚点）
```
Home
├─ Hero 名片（#profile)
├─ 技能进度（#skills）
├─ 作品展示（#works）
├─ 博客 / 动态（#posts）
├─ 信息卡片（#insights）
├─ 人生进度条（#life-progress）
├─ 联系表单（#contact）
└─ 页脚（#footer）
```

## 页面区块层级关系
```
<main>
  <section id="profile">个人名片卡</section>
  <section id="skills">技能进度条</section>
  <section id="works">作品展示网格</section>
  <section id="posts">博客 / 动态列表</section>
  <section id="insights">信息卡片</section>
  <section id="life-progress">人生进度条</section>
  <section id="contact">联系表单</section>
</main>
<footer id="footer">页脚</footer>
```

## 样式设计要点
- **视觉基调**：深色背景 + 玻璃拟态卡片；柔和光线、散景、渐变与柔光叠加层营造沉浸氛围。
- **玻璃卡风格**：
  - 背景：`rgba(255,255,255,0.12)` 级别半透明，结合 `backdrop-filter: blur(24px)`。
  - 边框：1px 半透明白（20% 透明度），顶部细高光描边+内阴影突出层次。
  - 阴影：柔和长阴影（如 `0 24px 48px rgba(15,23,42,0.45)`），鼠标悬停上浮 `transform: translateY(-2px)`。
  - 圆角：整体 24px，按钮与进度条 20px。
- **动效**：
  - 卡片 hover 发光 + 微缩放（1.01）；
  - 进入视口时淡入上浮（IntersectionObserver）；
  - 技能条动画：宽度从 0→目标值（CSS 变量 + JS）。
- **背景层**：
  1. 用户自定义照片 (`BACKGROUND_URL`)；
  2. 自动高斯模糊与暗化；
  3. 柔光渐变覆盖（深蓝→紫→青）；
  4. 多个动态散景（JS 渲染圆形 + 模糊 + 轻微飘动）。
- **响应式**：
  - 3 列作品网格（桌面）→2 列（平板）→1 列（移动）。
  - 导航在移动端收缩为抽屉菜单。
  - 文字尺寸使用 clamp()。
- **无障碍**：
  - 颜色对比度 ≥ WCAG AA；
  - 键盘焦点可见（自定义 focus 样式）；
  - 为图片/头像设置 alt；
  - `prefers-reduced-motion` 支持（降低动效强度）。

## 统一数据源 JSON 示例
```json
{
  "profile": {
    "avatar": "<AVATAR_URL>",
    "displayName": "<DISPLAY_NAME>",
    "title": "<TITLE_LABEL>",
    "location": "<LOCATION_LABEL>",
    "bio": "一段精炼的个人简介，突出价值与特色。",
    "email": "<EMAIL>",
    "phone": "<PHONE>",
    "socialLinks": {
      "github": "<GITHUB_URL>",
      "linkedin": "<LINKEDIN_URL>",
      "website": "<WEBSITE_URL>"
    }
  },
  "skills": [
    { "name": "Design Systems", "level": 90, "description": "构建统一的设计体系" },
    { "name": "Frontend Engineering", "level": 85, "description": "现代框架与可访问性" }
  ],
  "works": [
    {
      "title": "沉浸式交互展示",
      "cover": "https://placehold.co/600x400/png",
      "tags": ["UI/UX", "WebGL"],
      "summary": "为科技品牌打造的交互式体验站点。",
      "url": "https://example.com/work-1"
    }
  ],
  "posts": [
    {
      "title": "设计系统的可持续演进",
      "date": "2024-03-16",
      "url": "https://example.com/blog/design-systems"
    }
  ],
  "infoCards": [
    {
      "title": "在研项目",
      "icon": "flask",
      "description": "探索生成式 UI 流程" 
    }
  ],
  "lifeProgress": {
    "birthDate": "<BIRTH_YYYY-MM-DD>",
    "lifeExpectancy": "<LIFE_EXPECTANCY_YEARS>",
    "note": "仅供趣味展示，不代表真实预期。"
  },
  "contact": {
    "formspreeEndpoint": "https://formspree.io/f/your-id",
    "cta": "向我发来合作想法或灵感火花"
  },
  "settings": {
    "backgroundImage": "<BACKGROUND_URL>",
    "backgroundFallback": "gradient",
    "themeColor": "#38bdf8"
  }
}
```

### 字段说明
- `level`: 0–100 的整数，驱动动画进度。
- `cover`: 建议 16:10 或 4:3 比例图片，支持外链或本地路径。
- `icon`: 对应内置图标库的关键字（如 Lucide / Tabler 标识）。
- `lifeExpectancy`: 数值（年），用于计算百分比。
- `backgroundFallback`: `"gradient"` / `"solid"` / `"none"` 等预设，决定空背景时的备用样式。

## 文件与目录规划
```
/ (项目根)
├─ docs/
│  ├─ architecture.md        # 信息架构与设计说明
│  ├─ implementation-plan.md  # 代码生成计划与分步目标
│  └─ acceptance-checklist.md # 验收清单
├─ public/
│  ├─ index.html
│  └─ assets/
│     ├─ css/
│     │  ├─ variables.css     # CSS 变量与主题设置
│     │  ├─ base.css          # reset、排版、全局样式
│     │  ├─ layout.css        # 布局与响应式
│     │  ├─ components.css    # 组件样式（卡片、按钮等）
│     │  └─ utilities.css     # 工具类（动画、辅助类）
│     ├─ js/
│     │  ├─ data.js           # 统一数据源（JSON → JS 对象）
│     │  ├─ renderer.js       # 根据数据渲染 DOM
│     │  ├─ background.js     # 背景处理与散景效果
│     │  ├─ interactions.js   # 动效与事件处理
│     │  └─ utils.js          # 公共函数（日期格式、百分比等）
│     ├─ fonts/               # 本地或引入说明
│     └─ img/
│        └─ placeholders/     # 占位图或纹理资源
└─ README.md                  # 项目说明与使用指南
```
