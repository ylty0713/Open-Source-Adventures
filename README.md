# 玻璃拟态个人作品集网站

本项目是基于纯静态技术栈（HTML + CSS + JavaScript）的单页作品集模板，采用玻璃拟态/毛玻璃风格，突出柔和散景、半透明质感与现代交互动效。所有内容均来自统一的数据文件，便于快速定制。

## 目录
- [特性](#特性)
- [快速开始](#快速开始)
- [自定义指南](#自定义指南)
- [结构总览](#结构总览)
- [开发计划与文档](#开发计划与文档)
- [部署建议](#部署建议)
- [许可](#许可)

## 特性
- 深色玻璃拟态视觉，叠加柔光渐变与散景光斑。
- 模块化区块：个人名片、技能进度、作品网格、博客列表、信息卡、人生进度、联系表单、页脚。
- 所有数据均来自 `public/assets/js/data.js`，新增作品/动态无需修改结构。
- 响应式设计，覆盖移动/平板/桌面，移动端含抽屉导航。
- 动效：滚动淡入、卡片悬浮、技能进度动画、背景散景漂浮。
- 可替换背景图片（支持上传）并自动模糊/暗化。
- 可访问性增强：ARIA 标签、可见焦点、`prefers-reduced-motion` 处理。
- 无构建依赖，适合直接部署在静态托管服务（GitHub Pages、Vercel、Netlify 等）。

## 快速开始
1. 克隆仓库或下载压缩包。
2. 打开 `public/index.html` 即可预览效果。
3. 按需修改 `public/assets/js/data.js` 中的示例数据。
4. 通过浏览器本地服务器（如 VSCode Live Server）或直接部署到静态托管服务。

## 自定义指南
### 1. 个人信息
在 `portfolioData.profile` 内修改头像、昵称、简介、社交链接、联系方式。

### 2. 技能进度
`portfolioData.skills` 数组中每个对象包含 `name`、`level`（0–100）、`description`。新增技能仅需添加新对象。

### 3. 作品与博客
- `portfolioData.works`：封面图 `cover`、标题、标签数组、简述、外部链接。
- `portfolioData.posts`：标题、日期（ISO 格式）与链接。

### 4. 信息卡片
`portfolioData.infoCards` 控制“在研/常读/记录”等小卡，每项支持 `icon`、`title`、`description`。

### 5. 人生进度条
在 `portfolioData.lifeProgress` 中设置生日 `birthDate` 与期望寿命 `lifeExpectancy`（年）。页面将计算已过比例并显示说明。

### 6. 联系表单
`portfolioData.contact.formspreeEndpoint` 可填入 Formspree 或其他无后端服务地址。

### 7. 背景与主题
- `portfolioData.settings.backgroundImage`：替换背景图片 URL（可为空）。
- `backgroundSwitcher` 按钮可上传本地图片实时更新。
- `themeColor` 控制高亮色，`backgroundFallback` 选择备用背景策略。

### 8. SEO & Meta
`index.html` 中预留 meta 标签（标题/描述/OG），请根据实际内容调整。

## 结构总览
详见 `docs/architecture.md`。核心文件：
```
public/
├─ index.html
└─ assets/
   ├─ css/
   │  ├─ variables.css
   │  ├─ base.css
   │  ├─ layout.css
   │  ├─ components.css
   │  └─ utilities.css
   └─ js/
      ├─ data.js
      ├─ utils.js
      ├─ renderer.js
      ├─ background.js
      └─ interactions.js
```

## 开发计划与文档
- 分步计划：`docs/implementation-plan.md`
- 信息架构与设计说明：`docs/architecture.md`
- 验收清单：`docs/acceptance-checklist.md`

## 部署建议
- 推荐启用 HTTP/2 与 gzip/ Brotli 压缩。
- 图片资源可上传至 CDN，减轻加载压力。
- 如需多语言或博客系统，可在数据层扩展字段并在渲染逻辑中渲染条件分支。

## 许可
此模板可自由用于个人或商业项目，署名非必需。欢迎根据需求自定义与扩展。
