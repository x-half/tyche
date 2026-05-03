const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3033;

// 数据存储路径
const DATA_FILE = path.join(__dirname, '../data/visits.json');

// PV 去重缓存：visitorId -> 最后访问时间
const pvCache = new Map();
const PV_DEDUP_INTERVAL = 2000; // 2秒内不去重

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dashboard')));
app.use('/tracker.js', express.static(path.join(__dirname, '../tracker.js')));
app.use('/tracker.v2.js', express.static(path.join(__dirname, '../tracker.v2.js')));

// 调试：记录原始请求
app.use('/track', (req, res, next) => {
    if (req.method === 'POST') {
        console.log('[Track Request]', {
            contentType: req.headers['content-type'],
            bodyKeys: Object.keys(req.body || {}),
            body: req.body
        });
    }
    next();
});

// 处理 FormData 格式的数据
app.post('/track', (req, res, next) => {
    if (req.body && req.body.data && typeof req.body.data === 'string') {
        try {
            req.body = JSON.parse(req.body.data);
        } catch (e) {}
    }
    next();
});

// 确保数据目录存在
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化数据文件
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        visits: [],
        stats: {
            totalPV: 0,
            totalUV: 0,
            sites: {}
        }
    }));
}

// 读取数据
function readData() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
        return { visits: [], stats: { totalPV: 0, totalUV: 0, sites: {} } };
    }
}

// 保存数据
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 生成访客ID（基于IP和UA的简单哈希）
function generateVisitorId(ip, ua) {
    let hash = 0;
    const str = ip + ua;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// 获取客户端真实IP
function getClientIp(req) {
    return req.headers['x-forwarded-for'] || 
           req.headers['x-real-ip'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           '0.0.0.0';
}

// 数据收集接口
app.post('/track', (req, res) => {
    const { site, page, referrer, title, visitorId: clientVisitorId, type } = req.body;
    const ip = getClientIp(req);
    const ua = req.headers['user-agent'] || '';
    // 使用客户端传来的 visitorId，如果没传则用 IP+UA 生成
    const visitorId = clientVisitorId || generateVisitorId(ip, ua);
    
    // PV 去重：同一访客短时间内多次 pageview 只算一次
    const cacheKey = `${visitorId}:${site}:${page}`;
    const now = Date.now();
    if (type === 'pageview' && pvCache.has(cacheKey)) {
        const lastTime = pvCache.get(cacheKey);
        if (now - lastTime < PV_DEDUP_INTERVAL) {
            return res.json({ success: true, deduped: true });
        }
    }
    pvCache.set(cacheKey, now);
    
    // 清理过期缓存
    if (pvCache.size > 10000) {
        pvCache.forEach((time, key) => {
            if (now - time > 60000) pvCache.delete(key);
        });
    }
    
    const data = readData();
    
    // 记录访问
    const visit = {
        id: Date.now().toString(36),
        site: site || 'unknown',
        page: page || '/',
        visitorId,
        ip: ip.replace(/^::ffff:/, ''),
        ua,
        referrer: referrer || '',
        title: title || '',
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        hour: new Date().getHours()
    };
    
    data.visits.push(visit);
    
    // 更新统计
    data.stats.totalPV++;
    
    // 保存数据（限制最近30天）
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    data.visits = data.visits.filter(v => new Date(v.timestamp) > thirtyDaysAgo);
    
    saveData(data);
    
    // 返回1x1像素图片（备用方案）
    if (req.query.pixel === '1') {
        const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.writeHead(200, { 'Content-Type': 'image/gif', 'Content-Length': pixel.length });
        res.end(pixel);
    } else {
        res.json({ success: true, id: visit.id });
    }
});

// 获取统计数据
app.get('/api/stats', (req, res) => {
    const data = readData();
    const { site, days = 7 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    // 过滤日期
    const filteredVisits = data.visits.filter(v => 
        new Date(v.timestamp) > startDate &&
        (!site || v.site === site)
    );
    
    // 按日期统计
    const dailyStats = {};
    const uniqueVisitors = new Set();
    
    filteredVisits.forEach(v => {
        if (!dailyStats[v.date]) {
            dailyStats[v.date] = { pv: 0, uv: 0, visitors: new Set() };
        }
        dailyStats[v.date].pv++;
        dailyStats[v.date].visitors.add(v.visitorId);
        uniqueVisitors.add(v.visitorId);
    });
    
    // 转换为数组并排序
    const daily = Object.entries(dailyStats)
        .map(([date, stats]) => ({
            date,
            pv: stats.pv,
            uv: stats.visitors.size
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
    
    // 页面统计（带域名）
    const siteDomainMap = { main: 'tyche.love', news: 'news.tyche.love', fortune: 'fortune.tyche.love' };
    const pageStats = {};
    filteredVisits.forEach(v => {
        const domain = siteDomainMap[v.site] || v.site;
        const fullPage = domain + v.page;
        if (!pageStats[fullPage]) {
            pageStats[fullPage] = 0;
        }
        pageStats[fullPage]++;
    });
    
    const pages = Object.entries(pageStats)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    
    // 来源统计
    const referrerStats = {};
    filteredVisits.forEach(v => {
        const ref = v.referrer || '直接访问';
        if (!referrerStats[ref]) {
            referrerStats[ref] = 0;
        }
        referrerStats[ref]++;
    });
    
    const referrers = Object.entries(referrerStats)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    
    // 站点统计
    const siteStats = {};
    filteredVisits.forEach(v => {
        if (!siteStats[v.site]) {
            siteStats[v.site] = { pv: 0, uv: 0, visitors: new Set() };
        }
        siteStats[v.site].pv++;
        siteStats[v.site].visitors.add(v.visitorId);
    });
    
    const sites = Object.entries(siteStats).map(([site, stats]) => ({
        site,
        pv: stats.pv,
        uv: stats.visitors.size
    }));
    
    // 小时分布
    const hourlyStats = Array(24).fill(0);
    filteredVisits.forEach(v => {
        hourlyStats[v.hour]++;
    });
    
    res.json({
        summary: {
            totalPV: filteredVisits.length,
            totalUV: uniqueVisitors.size,
            avgPV: uniqueVisitors.size > 0 ? (filteredVisits.length / uniqueVisitors.size).toFixed(2) : 0
        },
        daily,
        pages,
        referrers,
        sites,
        hourly: hourlyStats.map((count, hour) => ({ hour, count }))
    });
});

// 获取今日统计
app.get('/api/today', (req, res) => {
    const data = readData();
    const today = new Date().toISOString().split('T')[0];
    
    const todayVisits = data.visits.filter(v => v.date === today);
    const uniqueVisitors = new Set(todayVisits.map(v => v.visitorId));
    
    const sites = {};
    todayVisits.forEach(v => {
        if (!sites[v.site]) {
            sites[v.site] = { pv: 0, uv: 0, visitors: new Set() };
        }
        sites[v.site].pv++;
        sites[v.site].visitors.add(v.visitorId);
    });
    
    res.json({
        date: today,
        totalPV: todayVisits.length,
        totalUV: uniqueVisitors.size,
        sites: Object.entries(sites).map(([site, stats]) => ({
            site,
            pv: stats.pv,
            uv: stats.visitors.size
        }))
    });
});

// 获取详细访问记录
app.get('/api/visits', (req, res) => {
    const data = readData();
    const { site, limit = 50 } = req.query;
    
    let visits = data.visits.slice().reverse(); // 最新的在前
    
    if (site) {
        visits = visits.filter(v => v.site === site);
    }
    
    // 只返回最近的 N 条
    visits = visits.slice(0, parseInt(limit));
    
    // 清理 UA
    visits = visits.map(v => ({
        ...v,
        ua: v.ua ? v.ua.substring(0, 50) + '...' : ''
    }));
    
    res.json({ visits, total: data.visits.length });
});

// 清空数据
app.post('/api/clear', (req, res) => {
    const data = { visits: [], stats: { totalPV: 0, totalUV: 0, sites: {} } };
    saveData(data);
    res.json({ success: true });
});

// IP 地理位置缓存
const locationCache = new Map();

// 查询 IP 地理位置
app.get('/api/geo/:ip', async (req, res) => {
    const ip = req.params.ip;
    
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
        return res.json({ location: '本地' });
    }
    
    if (locationCache.has(ip)) {
        return res.json({ location: locationCache.get(ip) });
    }
    
    try {
        console.log('[Geo] Querying IP:', ip);
        const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN&fields=status,country,regionName,city`);
        const text = await response.text();
        console.log('[Geo] Response:', text);
        const data = JSON.parse(text);
        
        if (data.status === 'success') {
            const location = [data.country, data.regionName].filter(Boolean).join(' ');
            locationCache.set(ip, location);
            return res.json({ location });
        }
    } catch (e) {
        console.error('[Geo] Error:', e.message);
    }
    
    locationCache.set(ip, '-');
    res.json({ location: '-' });
});

// 启动服务器
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Analytics server running on http://127.0.0.1:${PORT}`);
});
