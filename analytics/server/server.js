const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3033;

const DATA_FILE = path.join(__dirname, '../data/visits.json');

// PV 去重缓存
const pvCache = new Map();
const PV_DEDUP_INTERVAL = 2000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dashboard')));
app.use('/tracker.js', express.static(path.join(__dirname, '../tracker.js')));
app.use('/tracker.v2.js', express.static(path.join(__dirname, '../tracker.v2.js')));

app.use('/track', (req, res, next) => {
    if (req.method === 'POST') {
        console.log('[Track Request]', { body: req.body });
    }
    next();
});

app.post('/track', (req, res, next) => {
    if (req.body && req.body.data && typeof req.body.data === 'string') {
        try { req.body = JSON.parse(req.body.data); } catch (e) {}
    }
    next();
});

// 确保数据目录存在
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 默认数据结构
function defaultData() {
    return {
        visits: [],
        stats: {
            totalPV: 0,
            visitors: [],
            daily: {},
            sites: {}
        }
    };
}

// 读取数据
function readData() {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        // 兼容旧格式
        if (!data.stats.visitors) data.stats.visitors = [];
        if (!data.stats.daily) data.stats.daily = {};
        if (!data.stats.sites) data.stats.sites = {};
        return data;
    } catch (e) {
        return defaultData();
    }
}

// 保存数据
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 生成访客ID
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

// IP 地理位置缓存
const locationCache = new Map();

async function getLocation(ip) {
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
        return '本地';
    }
    if (locationCache.has(ip)) return locationCache.get(ip);

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN&fields=status,country,regionName,city`, { timeout: 3000 });
        const data = await response.json();
        if (data.status === 'success') {
            const location = [data.country, data.regionName, data.city].filter(Boolean).join(' ');
            locationCache.set(ip, location);
            return location;
        }
    } catch (e) {
        console.error('[Geo] Error:', e.message);
    }

    locationCache.set(ip, '-');
    return '-';
}

// 更新累计统计（在裁剪 visits 之前调用）
function updateStats(data, visit) {
    const { site, visitorId, date, hour } = visit;
    const stats = data.stats;

    // 总 PV
    stats.totalPV++;

    // 总 UV（去重）
    if (!stats.visitors.includes(visitorId)) {
        stats.visitors.push(visitorId);
    }

    // 每日统计
    if (!stats.daily[date]) {
        stats.daily[date] = { pv: 0, visitors: [] };
    }
    stats.daily[date].pv++;
    if (!stats.daily[date].visitors.includes(visitorId)) {
        stats.daily[date].visitors.push(visitorId);
    }

    // 站点统计
    if (!stats.sites[site]) {
        stats.sites[site] = { pv: 0, visitors: [] };
    }
    stats.sites[site].pv++;
    if (!stats.sites[site].visitors.includes(visitorId)) {
        stats.sites[site].visitors.push(visitorId);
    }
}

// 数据收集接口
app.post('/track', async (req, res) => {
    const { site, page, referrer, title, visitorId: clientVisitorId, type } = req.body;
    const ip = getClientIp(req);
    const cleanIp = ip.replace(/^::ffff:/, '');
    const ua = req.headers['user-agent'] || '';
    const visitorId = clientVisitorId || generateVisitorId(ip, ua);

    // PV 去重
    const cacheKey = `${visitorId}:${site}:${page}`;
    const now = Date.now();
    if (type === 'pageview' && pvCache.has(cacheKey)) {
        if (now - pvCache.get(cacheKey) < PV_DEDUP_INTERVAL) {
            return res.json({ success: true, deduped: true });
        }
    }
    pvCache.set(cacheKey, now);

    if (pvCache.size > 10000) {
        pvCache.forEach((time, key) => {
            if (now - time > 60000) pvCache.delete(key);
        });
    }

    const location = await getLocation(cleanIp);
    const data = readData();
    const date = new Date().toISOString().split('T')[0];

    const visit = {
        id: Date.now().toString(36),
        site: site || 'unknown',
        page: page || '/',
        visitorId,
        ip: cleanIp,
        location,
        ua,
        referrer: referrer || '',
        title: title || '',
        timestamp: new Date().toISOString(),
        date,
        hour: new Date().getHours()
    };

    // 先更新累计统计
    updateStats(data, visit);

    // 再追加明细并裁剪到50条
    data.visits.push(visit);
    data.visits = data.visits.slice(-50);

    saveData(data);

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
    const stats = data.stats;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    const startDateStr = startDate.toISOString().split('T')[0];

    // 每日统计（按天数过滤）
    const daily = Object.entries(stats.daily)
        .filter(([date]) => date >= startDateStr)
        .map(([date, d]) => ({
            date,
            pv: d.pv,
            uv: d.visitors.length
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

    // 总 PV/UV（按站点过滤）
    let totalPV, totalUV;
    if (site) {
        const s = stats.sites[site] || { pv: 0, visitors: [] };
        totalPV = s.pv;
        totalUV = s.visitors.length;
    } else {
        totalPV = stats.totalPV;
        totalUV = stats.visitors.length;
    }

    // 站点统计
    const sites = Object.entries(stats.sites).map(([name, s]) => ({
        site: name,
        pv: s.pv,
        uv: s.visitors.length
    }));

    // 页面统计（从明细中计算）
    const siteDomainMap = { main: 'tyche.love', news: 'news.tyche.love', fortune: 'fortune.tyche.love', resume: 'resume.tyche.love' };
    const pageStats = {};
    data.visits.forEach(v => {
        if (site && v.site !== site) return;
        const domain = siteDomainMap[v.site] || v.site;
        const fullPage = domain + v.page;
        pageStats[fullPage] = (pageStats[fullPage] || 0) + 1;
    });
    const pages = Object.entries(pageStats)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    // 来源统计（从明细中计算）
    const referrerStats = {};
    data.visits.forEach(v => {
        if (site && v.site !== site) return;
        const ref = v.referrer || '直接访问';
        referrerStats[ref] = (referrerStats[ref] || 0) + 1;
    });
    const referrers = Object.entries(referrerStats)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    // 小时分布（从明细中计算）
    const hourlyStats = Array(24).fill(0);
    data.visits.forEach(v => {
        if (site && v.site !== site) return;
        hourlyStats[v.hour]++;
    });

    res.json({
        summary: {
            totalPV,
            totalUV,
            avgPV: totalUV > 0 ? (totalPV / totalUV).toFixed(2) : 0
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
    const todayStats = data.stats.daily[today] || { pv: 0, visitors: [] };

    const sites = {};
    for (const [name, s] of Object.entries(data.stats.sites)) {
        // 从明细中估算今日站点数据
        const todaySiteVisits = data.visits.filter(v => v.date === today && v.site === name);
        if (todaySiteVisits.length > 0) {
            const visitors = [...new Set(todaySiteVisits.map(v => v.visitorId))];
            sites[name] = { pv: todaySiteVisits.length, uv: visitors.length };
        }
    }

    res.json({
        date: today,
        totalPV: todayStats.pv,
        totalUV: todayStats.visitors.length,
        sites: Object.entries(sites).map(([site, s]) => ({ site, ...s }))
    });
});

// 获取详细访问记录
app.get('/api/visits', (req, res) => {
    const data = readData();
    const { site, limit = 50 } = req.query;

    let visits = data.visits.slice().reverse();
    if (site) visits = visits.filter(v => v.site === site);
    visits = visits.slice(0, parseInt(limit));

    visits = visits.map(v => ({
        ...v,
        ua: v.ua ? v.ua.substring(0, 50) + '...' : ''
    }));

    res.json({ visits, total: data.visits.length });
});

// 清空数据
app.post('/api/clear', (req, res) => {
    saveData(defaultData());
    res.json({ success: true });
});

// 补全历史记录的 IP 地理位置
app.post('/api/migrate-locations', async (req, res) => {
    const data = readData();
    let migrated = 0;
    for (const visit of data.visits) {
        if (!visit.location) {
            visit.location = await getLocation(visit.ip);
            migrated++;
        }
    }
    if (migrated > 0) saveData(data);
    res.json({ success: true, migrated });
});

// 查询 IP 地理位置（API 接口，保留兼容）
app.get('/api/geo/:ip', async (req, res) => {
    const location = await getLocation(req.params.ip);
    res.json({ location });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Analytics server running on http://127.0.0.1:${PORT}`);
});
