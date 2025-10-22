# 代码实现分步计划

1. **初始化骨架**
   - 创建 `public/index.html`，引入 CSS 与 JS 文件占位。
   - 搭建基础 `<header> / <main> / <footer>` 结构与导航锚点。

2. **定义全局样式变量与基础样式**
   - 在 `assets/css/variables.css` 中声明颜色、渐变、玻璃参数。
   - `base.css`：重置样式、排版、全局背景层容器。

3. **布局与响应式栅格**
   - `layout.css` 定义导航、主内容、网格布局、媒体查询。
   - 为移动端准备抽屉导航结构与动画。

4. **组件化样式**
   - `components.css`：玻璃卡、按钮、进度条、表单、散景元素。
   - `utilities.css`：动画工具类、辅助对齐、隐藏/可见控制。

5. **准备数据层**
   - `assets/js/data.js` 中导出 `portfolioData` 对象，填充示例数据及变量占位。

6. **实现在 utils.js 中的通用函数**
   - 包括日期格式化、寿命进度计算、元素创建工具、节流函数等。

7. **渲染逻辑 renderer.js**
   - 根据 `portfolioData` 生成个人名片、技能条、作品卡、博客列表、信息卡、人生进度条、页脚。
   - 确保所有可变文本/链接都来自数据文件。

8. **背景层与散景效果 background.js**
   - 根据 `portfolioData.settings` 设置背景图片、模糊、暗化与柔光层。
   - 动态生成散景光斑与背景切换控件（底部按钮 + 文件选择）。

9. **交互与动画 interactions.js**
   - IntersectionObserver 实现滚动淡入、技能条动画触发。
   - 导航高亮当前区块、移动端菜单开关、背景切换事件。
   - Hover 悬浮效果与 `prefers-reduced-motion` 处理。

10. **访问性与性能增强**
    - 补充 ARIA 标签、可访问表单属性、键盘控制。
    - lazy-loading 图片、focus 样式、SEO meta 占位。

11. **最终检查与文档更新**
    - 完善 README：使用说明、定制指南、数据结构说明、部署提示。
    - 更新 `docs/acceptance-checklist.md`（验收项同步执行结果）。
