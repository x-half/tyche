/**
 * Tyche 官网 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
});

// 移动端菜单
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
        btn.classList.toggle('active');
    });
    
    // 点击链接关闭菜单
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            btn.classList.remove('active');
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.product-card, .feature-card, .philosophy-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 动画类
document.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.8)';
    }
});

// 添加动画入场类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
