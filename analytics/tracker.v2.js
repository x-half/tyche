/**
 * Tyche Analytics - 埋点库（轻量版）
 * 只追踪页面浏览，不追踪滚动和点击
 */
(function() {
    'use strict';
    
    const CONFIG = {
        server: 'https://analytics.tyche.love',
        site: '',
        debug: false
    };
    
    // Cookie 操作
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; domain=.tyche.love';
    }
    
    function getCookie(name) {
        return document.cookie.split('; ').reduce((acc, c) => {
            const [key, val] = c.split('=');
            return key === name ? decodeURIComponent(val) : acc;
        }, '');
    }
    
    // 生成或获取稳定的访客ID
    function getVisitorId() {
        let vid = getCookie('tyche_vid');
        if (!vid) {
            vid = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
            setCookie('tyche_vid', vid, 365);
        }
        return vid;
    }
    
    // 检测站点
    function detectSite() {
        const hostname = window.location.hostname;
        if (hostname.includes('news')) return 'news';
        if (hostname.includes('fortune')) return 'fortune';
        if (hostname.includes('resume')) return 'resume';
        if (hostname.includes('ruankao')) return 'ruankao';
        if (hostname === 'tyche.love' || hostname === 'www.tyche.love' || hostname === 'localhost') return 'main';
        return hostname;
    }
    
    // 发送 pageview
    function track() {
        const payload = {
            site: CONFIG.site || detectSite(),
            page: window.location.pathname + window.location.search,
            referrer: document.referrer,
            title: document.title,
            visitorId: getVisitorId(),
            type: 'pageview'
        };
        
        if (CONFIG.debug) console.log('[Analytics]', payload);
        
        fetch(CONFIG.server + '/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
        }).catch(function() {});
    }
    
    function init(options) {
        Object.assign(CONFIG, options);
        track();
    }
    
    window.TycheAnalytics = { init, track };
    
    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
