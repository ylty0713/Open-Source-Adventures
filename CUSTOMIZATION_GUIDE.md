# 自定义指南

下面的说明帮助你快速替换站点中的背景图、头像、音乐播放列表等素材，同时也涵盖其余页面常见内容的调整方式。建议配合代码编辑器使用「查找」功能快速定位文件中的对应片段。

## 1. 全局背景与色彩

站点的所有页面会继承 `assets/css/style.css` 顶部 `:root` 中定义的 CSS 变量。

```css
:root {
  --background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80');
  --primary-color: #8cc9ff;
  --secondary-color: #ffd580;
  /* … */
}
```

### 更换全站背景图
1. 在 `assets/css/style.css` 中找到 `--background-image`。 
2. 将 `url('...')` 内的地址替换为你自己的图片链接，或替换成本地文件相对路径（例如 `url('../images/aurora.jpg')`）。
3. 如果使用本地图片，请将图片放在 `assets/images/` 或任何你喜欢的文件夹下，并注意路径写法是以 CSS 文件所在目录为基准。
4. 可根据图片明暗程度，微调 `body::before` 与 `body::after` 下面的 `filter`、`opacity` 或线性渐变色值，确保玻璃拟态的层次感。

> 若希望不同页面使用不同背景，可在单独页面的 `<body>` 标签上添加内联样式或新增页面专属的 CSS 变量覆盖，例如：
> ```html
> <body data-page="music" style="--background-image: url('assets/images/music-bg.jpg');">
> ```

## 2. 头像与个人信息

### 首页侧边名片头像
- 文件：`index.html`
- 查找：`<div class="hero__profile">`
- 将 `<img src="…" alt="Wei Tingting">` 中的 `src` 换成你的头像地址，`alt` 替换成你的姓名或描述。

同时可在同一模块内修改：
- `<div class="name">`：展示姓名。
- `<div class="role">`：一句话身份介绍。
- `<p class="fade-in">`：简介文案。
- `.hero__socials` 内的链接（`href`）和 emoji / 图标。

### 自我介绍页头像
- 文件：`about.html`
- 查找：`<div class="about__header">` 下的 `<img>`。
- 按同样方式替换 `src` 与 `alt`，并更新 `h1`、`p` 文案、时间轴条目内容。

## 3. 背景音乐与播放器

### 首页背景音乐
- 文件：`index.html`
- 元素：`<audio id="bg-music" src="..." loop></audio>`
- 将 `src` 改为你想播放的 MP3/OGG 链接。若使用本地文件，请放在 `assets/audio/` 等目录并写成相对路径（例：`src="assets/audio/bg-theme.mp3"`）。
- 背景音乐控制按钮通过 `data-music-toggle` 自动与此音频绑定，无需额外调整。

### 音乐播放器（歌曲列表、歌词等）
- 文件：`assets/js/main.js`
- 查找函数 `initMusic()` 中的 `const playlist = [ … ];`

每一首歌的数据结构如下：
```js
{
  title: '曲名',
  artist: '演唱者 / 创作者',
  src: '音频文件地址',
  lyrics: ['第一行歌词', '第二行歌词', '...']
}
```
调整方式：
1. 替换 `title`、`artist`、`src` 为自己的歌曲信息。
2. `lyrics` 是数组形式，可根据需要增减行数。如果不想展示歌词，可将数组留空（`lyrics: []`）。
3. 想添加更多歌曲，只需在数组末尾继续追加对象。播放器会自动渲染播放列表按钮。

如需更新音乐封面、标题等静态内容，可在 `music.html` 中调整对应的文本元素（例如模块标题、简介文案）。

## 4. 摄影作品与画廊

### 顶部自动轮播图
- 文件：`photography.html`
- 查找：`<div class="photography-slider">` 内的 `<img>` 列表。
- 将每个图片 `src` 换成你的作品链接，并调整 `alt` 描述。

### 瀑布流画廊
- 同一文件中 `.masonry` 容器里的 `<img>` 控制瀑布流。替换图片与 `alt` 后，灯箱（Lightbox）功能会自动生效。
- 需要增加/减少作品，只需增删 `.masonry-item` 卡片。

## 5. 博客文章数据

- 文件：`assets/js/main.js`，函数 `loadBlogPosts()`（使用 `const articles = [ … ];`）。
- 这里定义了博客列表与详情页内容。每篇文章包含 `title`、`date`、`cover`、`excerpt`、`content` 等字段。
- 调整后刷新页面即可看到新的文章卡片；`blog-post.html` 会根据查询参数显示对应文章详情。

## 6. 视频、联系表单与其他内容

- `videos.html` 中的 `<iframe>` 支持嵌入 Bilibili、YouTube 或自托管视频。替换 `src` 为目标平台的嵌入链接即可。
- `contact.html` 的表单字段占位提示可以直接修改文本，社交链接在 `.contact-links` 列表里维护。

## 7. 静态资源建议

- 将自己的图片、音频等文件放置在 `assets/images/`、`assets/audio/` 等目录，保证路径清晰。
- 如果部署到线上，确保外链资源（如网盘、图床）支持跨域访问与 HTTPS。
- 修改资源后，为避免缓存问题，记得刷新浏览器缓存（快捷键 `Ctrl + Shift + R` 或 `Cmd + Shift + R`）。

## 8. 快速验证

- 本项目为纯静态页面，可直接在浏览器打开 `.html` 文件预览。
- 如需本地服务器以获得更好的体验，可在项目根目录运行：
  ```bash
  npx serve .
  ```
  或使用任意静态服务器工具。

希望以上说明能帮助你快速定制出自己的风格！如需新增模块，可以参考现有结构复制粘贴，并适当调整类名、文案和资源路径。
