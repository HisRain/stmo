/**
 * 海口实验中学科技社 - 主脚本文件
 * 版本：1.0
 * 最后更新：2025年
 */

// ==================== 全局变量和配置 ====================
const CONFIG = {
    notification: {
        showDelay: 1500,      // 通知显示延迟(ms)
        autoHideDelay: 10000  // 通知自动隐藏延迟(ms)
    },
    theme: {
        darkClass: 'dark-theme', // 暗色主题的CSS类名
        lightIcon: 'light_mode', // 亮色模式图标
        darkIcon: 'dark_mode'    // 暗色模式图标
    }
};

// ==================== 核心功能函数 ====================

/**
 * 获取相对于根目录的正确路径
 */
function getBasePath() {
    // 获取当前页面的路径
    const path = window.location.pathname;
    
    // 如果路径包含'/pages/'，说明在pages子目录中
    if (path.includes('/pages/')) {
        return '../'; // 返回上级目录
    }
    
    return './'; // 默认在当前目录
}

/**
 * 初始化页面 - DOM加载完成后执行
 */
function initPage() {
    loadHeaderAndFooter();
    initBackToTop();
    initCardHover();
    initCategoryItems();
    initTags();
    initNotification();
}

/**
 * 加载页眉和页脚组件
 */
function loadHeaderAndFooter() {
    const basePath = getBasePath();
    
    // 加载页眉
    fetch(`${basePath}header.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initHeader();
        })
        .catch(error => {
            console.error('加载页眉失败:', error);
            // 显示备用导航
            showFallbackHeader();
        });

    // 加载页脚
    fetch(`${basePath}footer.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('加载页脚失败:', error);
            // 显示备用页脚
            showFallbackFooter();
        });
}

/**
 * 显示备用页眉（当加载失败时）
 */
function showFallbackHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header>
                <div class="header-container">
                    <div class="logo-container">
                        <img src="../assets/logo-l.png" alt="HKEMS-STMO" class="logo">
                    </div>
                    
                    <nav class="nav-links">
                        <a href="../index.html"><span class="material-symbols-rounded">home</span>首页</a>
                        <a href="https://github.com/HKEMS-STMO/New-official-website/blob/main/README.md"><span class="material-symbols-rounded">person</span>关于</a>
                        <a href="https://github.com/HKEMS-STMO-Webmasters"><span class="material-symbols-rounded">mail</span>联系</a>
                    </nav>

                    <div class="header-actions">
                        <form class="search-container" action="https://www.bing.com/search" method="GET" target="_blank">
                            <span class="material-symbols-rounded search-icon">search</span>
                            <input id="search" type="search" name="q" required placeholder="必应搜索...">
                        </form>

                        <button class="theme-toggle" id="themeToggle">
                            <span class="material-symbols-rounded" id="themeIcon">dark_mode</span>
                        </button>
                    </div>
                </div>
            </header>
        `;
        initHeader();
    }
}

/**
 * 显示备用页脚（当加载失败时）
 */
function showFallbackFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer>
                <div class="footer-container">
                    <div class="footer-col">
                        <h3>HKEMS-STMO</h3>
                        <p>海口实验中学科技社（科技配套组织）是由海口实验中学（以下简称我校）学生自发组织、由我校社团联合会、校团委等组织管理的科学技术类学生社团，是我校学子在实践中运用所学知识、探求新知、提升科技创新能力的校内活动平台。</p>
                    </div>
                    
                    <div class="footer-col">
                        <h3>快速链接</h3>
                        <ul>
                            <li><a href="#top"><span class="material-symbols-rounded">chevron_right</span>返回页首</a></li>
                            <li><a href="https://hkems-stmo.top/"><span class="material-symbols-rounded">chevron_right</span>旧版网站</a></li>
                            <li><a href="https://github.com/HKEMS-STMO/New-official-website/blob/main/README.md"><span class="material-symbols-rounded">chevron_right</span>关于我们</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="copyright">
                    <p>© 2025 HKEMS-STMO | 基于 <a href="https://m3.material.io/" style="color:#d0bcff; text-decoration: none;">Material Design 3</a> 构建</p>
                    <p>厚德、博学、明志、和谐、探索、进取、勤思、创新</p>
                </div>
            </footer>
        `;
    }
}

/**
 * 初始化页眉功能
 * 包括主题切换按钮的功能
 */
function initHeader() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (themeToggle && themeIcon) {
        // 检查系统颜色偏好并设置初始主题
        if (prefersDarkScheme.matches) {
            document.body.classList.add(CONFIG.theme.darkClass);
            themeIcon.textContent = CONFIG.theme.lightIcon;
        }
        
        // 主题切换按钮点击事件
        themeToggle.addEventListener('click', toggleTheme);
        
        // 监听系统主题变化
        prefersDarkScheme.addEventListener('change', e => {
            if (e.matches) {
                document.body.classList.add(CONFIG.theme.darkClass);
                themeIcon.textContent = CONFIG.theme.lightIcon;
            } else {
                document.body.classList.remove(CONFIG.theme.darkClass);
                themeIcon.textContent = CONFIG.theme.darkIcon;
            }
        });
    }
}

/**
 * 切换明暗主题
 */
function toggleTheme() {
    const themeIcon = document.getElementById('themeIcon');
    document.body.classList.toggle(CONFIG.theme.darkClass);
    
    if (document.body.classList.contains(CONFIG.theme.darkClass)) {
        themeIcon.textContent = CONFIG.theme.lightIcon;
    } else {
        themeIcon.textContent = CONFIG.theme.darkIcon;
    }
}

/**
 * 初始化返回顶部按钮功能
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // 点击返回顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }
}

/**
 * 初始化卡片悬停效果
 */
function initCardHover() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
        });
    });
}

/**
 * 初始化分类标签交互
 */
function initCategoryItems() {
    const categoryItems = document.querySelectorAll('.category-list li');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

/**
 * 初始化标签交互
 */
function initTags() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });
}

// ==================== 通知系统 ====================

/**
 * 显示通知
 * @param {boolean} isFirstVisit - 是否首次访问
 */
function showNotification(isFirstVisit = false) {
    const welcomeNotification = document.getElementById('welcomeNotification');
    if (!welcomeNotification) return;

    welcomeNotification.classList.remove('hide');
    welcomeNotification.classList.add('show');
    
    // 首次访问不自动关闭，非首次访问设置自动关闭
    if (!isFirstVisit) {
        setTimeout(() => {
            hideNotification();
        }, CONFIG.notification.autoHideDelay);
    }
}

/**
 * 隐藏通知
 */
function hideNotification() {
    const welcomeNotification = document.getElementById('welcomeNotification');
    if (!welcomeNotification) return;
    
    welcomeNotification.classList.remove('show');
    welcomeNotification.classList.add('hide');
    
    // 动画结束后移除通知元素
    setTimeout(() => {
        if (welcomeNotification.parentNode) {
            welcomeNotification.parentNode.removeChild(welcomeNotification);
        }
    }, 500);
}

/**
 * 初始化通知系统
 */
function initNotification() {
    setTimeout(() => {
        const isNewVisit = sessionStorage.getItem('visited') === null;
        const welcomeNotification = document.getElementById('welcomeNotification');
        
        if (welcomeNotification) {
            // 获取关闭按钮
            const closeNotificationBtn = welcomeNotification.querySelector('#closeNotification');
            const dismissBtn = welcomeNotification.querySelector('#dismissBtn');
            
            // 添加事件监听器
            if (closeNotificationBtn) {
                closeNotificationBtn.addEventListener('click', hideNotification);
            }
            
            if (dismissBtn) {
                dismissBtn.addEventListener('click', hideNotification);
            }
            
            // 根据访问状态显示不同的通知内容
            if (isNewVisit) {
                customizeFirstVisitNotification();
                sessionStorage.setItem('visited', 'true');
                showNotification(true);
            } else {
                showNotification(false);
            }
        }
    }, CONFIG.notification.showDelay);
}

/**
 * 自定义首次访问通知内容
 */
function customizeFirstVisitNotification() {
    const welcomeNotification = document.getElementById('welcomeNotification');
    if (!welcomeNotification) return;
    
    const notificationTitle = welcomeNotification.querySelector('.notification-title');
    const notificationMessage = welcomeNotification.querySelector('.notification-message');
    
    if (notificationTitle) {
        notificationTitle.textContent = '欢迎光临！';
    }
    
    if (notificationMessage) {
        notificationMessage.textContent = '这是你的首次访问，当前网站处于试运行阶段！';
    }
}

// ==================== 工具函数 ====================

/**
 * 防抖函数 - 防止函数频繁调用
 * @param {Function} func - 需要防抖的函数
 * @param {number} wait - 等待时间(ms)
 * @returns {Function} - 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数 - 限制函数执行频率
 * @param {Function} func - 需要节流的函数
 * @param {number} limit - 时间间隔(ms)
 * @returns {Function} - 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== 事件监听器设置 ====================

// DOM加载完成后初始化页面
document.addEventListener('DOMContentLoaded', initPage);

// 添加窗口调整大小时的防抖处理
window.addEventListener('resize', debounce(() => {
    // 可以在这里添加响应式布局相关的代码
}, 250));

// 添加性能监控
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载完成，耗时: ${loadTime}ms`);
        
        // 可以在这里发送性能数据到分析服务
    });
}