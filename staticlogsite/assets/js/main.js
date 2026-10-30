/**
 * 全局JS：移动端菜单 + 内容页TOC生成 + 滚动高亮
 * 纯原生实现，无外部依赖，兼容本地file协议打开
 */

(function () {
    'use strict';

    // ========== 1. 移动端菜单切换 ==========
    var menuBtn = document.getElementById('menuBtn');
    var mainNav = document.getElementById('mainNav');
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('show');
        });
    }

    // ========== 2. 内容页：自动生成右侧TOC目录 ==========
    var contentArea = document.querySelector('.article-content');
    var tocContainer = document.getElementById('tocList');

    if (contentArea && tocContainer) {
        var headings = contentArea.querySelectorAll('h2, h3');
        var tocHTML = '';

        headings.forEach(function (heading, index) {
            // 为每个标题生成锚点ID
            var id = 'section-' + index;
            heading.id = id;

            // 根据标题级别生成对应缩进
            if (heading.tagName.toLowerCase() === 'h2') {
                tocHTML += '<li><a href="#' + id + '">' + heading.textContent + '</a></li>';
            } else {
                tocHTML += '<li><a href="#' + id + '" class="toc-h3">' + heading.textContent + '</a></li>';
            }
        });

        tocContainer.innerHTML = tocHTML;

        // TOC链接点击平滑滚动
        var tocLinks = tocContainer.querySelectorAll('a');
        tocLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var targetId = this.getAttribute('href').substring(1);
                var targetEl = document.getElementById(targetId);
                if (targetEl) {
                    var headerHeight = 70;
                    var top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });

        // ========== 3. 滚动监听：高亮当前章节 ==========
        function updateActiveToc() {
            var scrollPos = window.scrollY + 100;
            var currentId = '';

            headings.forEach(function (heading) {
                if (heading.offsetTop <= scrollPos) {
                    currentId = heading.id;
                }
            });

            tocLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentId) {
                    link.classList.add('active');
                }
            });

            // 同时高亮左侧文档树当前文章
            var docLinks = document.querySelectorAll('.doc-tree a');
            docLinks.forEach(function (docLink) {
                docLink.classList.remove('active');
            });
            var currentPath = window.location.pathname.split('/').pop();
            docLinks.forEach(function (docLink) {
                var href = docLink.getAttribute('href');
                if (href === currentPath || href === './' + currentPath) {
                    docLink.classList.add('active');
                }
            });
        }

        // 防抖优化滚动性能
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    updateActiveToc();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // 页面加载后立即执行一次高亮
        updateActiveToc();
    }

    // ========== 4. 回到顶部按钮（滚动时显示） ==========
    // 简单实现，无需额外DOM
    var backToTop = document.createElement('div');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = 'position:fixed;bottom:32px;right:32px;width:44px;height:44px;background:#2c3e50;color:#fff;border-radius:50%;display:none;align-items:center;justify-content:center;cursor:pointer;font-size:20px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:99;transition:all 0.2s ease;';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

})();
