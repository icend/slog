# 知筑集 - 静态内容分享网站

纯原生 HTML/CSS/JavaScript 构建的静态博客/内容分享网站，无需任何构建工具，本地双击 `index.html` 即可直接运行，也可上传至任意静态托管服务。

## 目录结构

```
static-site/
├── index.html              # 网站主页（分类导航 + 网站介绍）
├── assets/                 # 静态资源目录
│   ├── css/style.css       # 全局样式
│   ├── js/main.js          # 全局交互脚本
│   └── images/             # 网站图片资源存放处
├── architecture/           # 分类1：建筑形制
│   ├── index.html          # 分类首页（该分类下的文章列表）
│   ├── hall-of-supreme-harmony.html  # 文章1
│   └── dougong-structure.html        # 文章2
├── history/                # 分类2：历史沿革
│   ├── index.html
│   ├── ming-qing-palace.html
│   └── forbidden-city-evolution.html
└── culture/                # 分类3：文化装饰
    ├── index.html
    ├── ridge-beasts.html
    └── caihua-decoration.html
```

## 结构规则说明

1. **每个分类一个独立目录**：如 `architecture/`、`history/`、`culture/`
2. **分类目录下只包含**：
   - 一个 `index.html`（分类首页，展示本分类下所有文章链接）
   - 若干个 `.html` 或 `.md` 文档文件（单篇文章内容）
3. **所有静态资源**（css/js/图片/音视频）统一放在根目录 `assets/` 下，不在分类目录中存放资源
4. **内容页采用三列布局**：
   - 左列：当前分类的文档树形目录
   - 中列：文章正文
   - 右列：本文章节索引（JS自动根据h2/h3标题生成，滚动时自动高亮当前章节）

## 功能特性

- ✅ 简约清爽的设计风格
- ✅ 响应式布局，支持移动端（移动端自动折叠侧边栏和导航菜单）
- ✅ 右侧章节目录自动生成，滚动高亮当前章节
- ✅ 左侧文档树导航，当前文章自动高亮
- ✅ 平滑滚动 + 回到顶部按钮
- ✅ 纯原生实现，无任何框架依赖，本地直接打开即可使用
- ✅ 支持HTML格式文章；若需支持Markdown，可启动本地静态服务器后扩展引入轻量Markdown解析库

## 如何新增内容

### 新增一个分类
1. 在根目录新建分类文件夹，如 `crafts/`
2. 复制任意分类下的 `index.html` 到新文件夹，修改标题、介绍和文章列表
3. 在主页 `index.html` 的分类网格和顶部导航中添加新分类的链接
4. 在所有内容页的左侧文档树中添加新分类入口

### 新增一篇文章
1. 在对应分类目录下新建HTML文件，复制已有文章模板
2. 修改：标题、面包屑导航、左侧文档树active状态、正文内容
3. 在该分类的 `index.html` 文章列表中添加新文章链接
4. 在同分类其他文章的左侧文档树中添加新文章条目

### 新增图片
将图片文件放入 `assets/images/` 目录，文章中用相对路径引用：`../assets/images/你的图片.jpg`

## 本地预览

直接用浏览器打开 `index.html` 即可浏览完整网站，无需启动服务器。
