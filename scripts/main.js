// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const welcomeNotification = document.getElementById('welcomeNotification');
    const closeNotificationBtn = document.getElementById('closeNotification');
    const dismissBtn = document.getElementById('dismissBtn');

    // 返回顶部按钮功能
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }
    
    // 检查系统偏好
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = 'light_mode';
    }
    
    // 主题切换按钮事件
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.textContent = 'light_mode';
        } else {
            themeIcon.textContent = 'dark_mode';
        }
    });
    
    // 卡片悬停效果
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
    
    // 分类标签交互
    const categoryItems = document.querySelectorAll('.category-list li');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // 标签交互
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });

    // 显示通知
    function showNotification(isFirstVisit = false) {
        const welcomeNotification = document.getElementById('welcomeNotification');
        if (!welcomeNotification) return;
    
        welcomeNotification.classList.remove('hide');
        welcomeNotification.classList.add('show');
        
        // 首次访问不设置自动关闭
        if (!isFirstVisit) {
            setTimeout(() => {
                hideNotification();
            }, 10000);
        }
    }
    // 隐藏通知
    function hideNotification() {
        const welcomeNotification = document.getElementById('welcomeNotification');
        if (!welcomeNotification) return;
        
        welcomeNotification.classList.remove('show');
        welcomeNotification.classList.add('hide');
        
        // 动画结束后移除通知元素
        setTimeout(() => {
            welcomeNotification.remove();
        }, 500);
    }
    
    // 初始化显示通知
    setTimeout(() => {
        const isNewVisit = sessionStorage.getItem('visited') === null;
        const notificationExists = document.getElementById('welcomeNotification');
        
        if (!notificationExists && isNewVisit) {
            // 首次访问，修改欢迎消息
            const notificationTitle = document.querySelector('.notification-title');
            const notificationMessage = document.querySelector('.notification-message');
            
            notificationTitle.textContent = '欢迎光临！';
            notificationMessage.textContent = '当前网站处于测试中！你可以关闭这个窗口，然后返回旧版网站。';
            
            // 标记为已访问
            sessionStorage.setItem('visited', 'true');
            
            // 显示通知（首次访问不自动关闭）
            showNotification(true);
        } else if (!notificationExists) {
            // 显示通知（非首次访问10秒后自动关闭）
            showNotification(false);
        }
    }, 1500);
    
    // 关闭按钮事件
    closeNotificationBtn.addEventListener('click', hideNotification);
    
    // 我知道了按钮事件
    dismissBtn.addEventListener('click', hideNotification);

});
