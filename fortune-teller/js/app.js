/**
 * 星辰命理 - 周运势预测 v2
 */

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    initYearSelect();
    initDaySelect();
    bindFormEvents();
    bindNavEvents();
    bindButtonEvents();
    bindInteractions();
    loadHistory();
    
    // 检查URL参数，如果有则自动测算
    const urlParams = getUrlParams();
    if (urlParams.year && urlParams.month && urlParams.day) {
        fillFormFromParams(urlParams);
        setTimeout(() => {
            document.getElementById('fortune-form').dispatchEvent(new Event('submit'));
        }, 300);
    }
}

// ========================================
// URL参数处理
// ========================================

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        year: params.get('y'),
        month: params.get('m'),
        day: params.get('d'),
        hour: params.get('h'),
        gender: params.get('g'),
        calendar: params.get('c'),
        period: params.get('p')
    };
}

function fillFormFromParams(params) {
    if (params.calendar === 'lunar') {
        document.getElementById('calendar-toggle').checked = true;
        updateDayOptions();
    }
    
    setTimeout(() => {
        if (params.year) document.getElementById('birth-year').value = params.year;
        if (params.month) document.getElementById('birth-month').value = params.month;
        
        setTimeout(() => {
            if (params.day) document.getElementById('birth-day').value = params.day;
            if (params.hour) document.getElementById('birth-hour').value = params.hour;
            if (params.gender) document.getElementById('gender').value = params.gender;
            if (params.period) {
                document.querySelectorAll('.period-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.period === params.period);
                });
            }
        }, 50);
    }, 50);
}

function generateShareUrl(params) {
    const url = new URL(window.location.origin + window.location.pathname);
    if (params.year) url.searchParams.set('y', params.year);
    if (params.month) url.searchParams.set('m', params.month);
    if (params.day) url.searchParams.set('d', params.day);
    if (params.hour) url.searchParams.set('h', params.hour);
    if (params.gender) url.searchParams.set('g', params.gender);
    if (params.calendarType === 'lunar') url.searchParams.set('c', 'lunar');
    if (params.period) url.searchParams.set('p', params.period);
    return url.toString();
}

// ========================================
// 初始化
// ========================================

function initYearSelect() {
    const select = document.getElementById('birth-year');
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y + '年';
        select.appendChild(opt);
    }
    // 设置最大值为当前年份
    select.dataset.max = currentYear;
}

function initDaySelect() {
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');
    
    for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m + '月';
        monthSelect.appendChild(opt);
    }
    
    monthSelect.addEventListener('change', updateDayOptions);
    document.getElementById('birth-year').addEventListener('change', updateDayOptions);
    
    // 初始化日期选项
    updateDayOptions();
}

function updateDayOptions() {
    const month = parseInt(document.getElementById('birth-month').value);
    const year = parseInt(document.getElementById('birth-year').value) || 2024;
    const daySelect = document.getElementById('birth-day');
    const isLunar = document.getElementById('calendar-toggle').checked;
    
    // 保存当前选中的日期
    const currentDay = daySelect.value;
    
    daySelect.innerHTML = '<option value="">日</option>';
    const maxDay = isLunar ? 30 : new Date(year, month, 0).getDate();
    
    for (let d = 1; d <= maxDay; d++) {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d + '日';
        daySelect.appendChild(opt);
    }
    
    // 尝试恢复之前选中的日期
    if (currentDay && currentDay <= maxDay) {
        daySelect.value = currentDay;
    }
}

// ========================================
// 交互绑定
// ========================================

function bindFormEvents() {
    // 周期选择
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 农历切换
    document.getElementById('calendar-toggle').addEventListener('change', updateDayOptions);
    
    // 可选区域展开
    document.getElementById('optional-toggle').addEventListener('click', function() {
        this.classList.toggle('expanded');
        document.getElementById('optional-content').classList.toggle('hidden');
    });
    
    // 表单提交
    document.getElementById('fortune-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const params = getFormData();
        if (!params) return;
        
        saveHistory(params);
        showLoading();
        
        setTimeout(() => {
            try {
                const result = FortuneAnalyzer.analyze(params);
                renderResults(result);
                hideLoading();
                showResults();
            } catch (err) {
                console.error('分析出错:', err);
                hideLoading();
                alert('分析出错，请重试');
            }
        }, 1200);
    });
}

function getFormData() {
    const year = parseInt(document.getElementById('birth-year').value);
    const month = parseInt(document.getElementById('birth-month').value);
    const day = parseInt(document.getElementById('birth-day').value);
    const hour = document.getElementById('birth-hour').value;
    const gender = document.getElementById('gender').value;
    const calendarType = document.getElementById('calendar-toggle').checked ? 'lunar' : 'solar';
    const period = document.querySelector('.period-btn.active').dataset.period;
    
    if (!year || !month || !day) {
        alert('请选择完整的出生日期');
        return null;
    }
    
    return { year, month, day, hour, gender, calendarType, period };
}

function bindNavEvents() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function bindButtonEvents() {
    document.getElementById('btn-recalculate').addEventListener('click', () => {
        document.getElementById('results').classList.remove('has-results');
        document.getElementById('results-content').classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.getElementById('btn-share').addEventListener('click', shareResults);
}

function bindInteractions() {
    // 每日运势视图切换
    document.querySelectorAll('.day-nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.day-nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            document.getElementById('daily-grid').classList.toggle('hidden', view !== 'grid');
            document.getElementById('daily-list').classList.toggle('hidden', view !== 'list');
        });
    });
    
    // 详情标签切换
    document.querySelectorAll('.detail-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            showDetailTab(this.dataset.tab);
        });
    });
}

// ========================================
// 显示控制
// ========================================

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results-content').classList.add('hidden');
    document.getElementById('results').classList.add('has-results');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideLoading() { document.getElementById('loading').classList.add('hidden'); }

function showResults() {
    document.getElementById('results-content').classList.remove('hidden');
    document.getElementById('results').classList.add('has-results');
}

// ========================================
// 结果渲染
// ========================================

let currentResult = null;

function renderResults(result) {
    currentResult = result;
    renderResultHero(result);
    renderOverallScore(result);
    renderRadar(result);
    renderDailyGrid(result);
    renderDailyList(result);
    renderDetailContent(result, 'love');
    renderAdvice(result);
    renderLucky(result);
}

function renderResultHero(result) {
    const dates = result.dateRange;
    const start = `${dates[0].getMonth() + 1}/${dates[0].getDate()}`;
    const end = `${dates[6].getMonth() + 1}/${dates[6].getDate()}`;
    
    document.getElementById('period-badge').textContent = result.period;
    document.getElementById('result-title').textContent = `你的${result.period}运势`;
    document.getElementById('result-date').textContent = `${dates[0].getFullYear()}年${start} - ${end}`;
}

function renderOverallScore(result) {
    const score = result.overallScore;
    const scoreEl = document.getElementById('overall-score');
    const circleEl = document.getElementById('score-circle');
    const descEl = document.getElementById('score-desc');
    
    // 动画分数
    let current = 0;
    const animate = () => {
        if (current < score) {
            current += 2;
            scoreEl.textContent = Math.min(current, score);
            requestAnimationFrame(animate);
        }
    };
    animate();
    
    // 进度条动画
    const circumference = 264;
    const offset = circumference - (score / 100) * circumference;
    setTimeout(() => {
        circleEl.style.strokeDashoffset = offset;
    }, 100);
    
    // 根据分数设置颜色
    if (score >= 80) {
        circleEl.style.stroke = 'var(--success)';
        descEl.textContent = '本周运势旺盛，把握机会，积极行动！';
    } else if (score >= 70) {
        circleEl.style.stroke = 'var(--primary)';
        descEl.textContent = '本周运势不错，稳步前进，注意细节。';
    } else if (score >= 60) {
        circleEl.style.stroke = 'var(--warning)';
        descEl.textContent = '本周运势平稳，稳中求进，避免冒进。';
    } else {
        circleEl.style.stroke = 'var(--error)';
        descEl.textContent = '本周运势较低，保持低调，谨慎行事。';
    }
}

function renderRadar(result) {
    const daily = result.dailyFortune;
    const avgLove = Math.round(daily.reduce((s, d) => s + d.love, 0) / 7);
    const avgCareer = Math.round(daily.reduce((s, d) => s + d.career, 0) / 7);
    const avgWealth = Math.round(daily.reduce((s, d) => s + d.wealth, 0) / 7);
    const avgHealth = Math.round(daily.reduce((s, d) => s + d.health, 0) / 7);
    
    setTimeout(() => {
        document.getElementById('love-bar').style.width = avgLove + '%';
        document.getElementById('career-bar').style.width = avgCareer + '%';
        document.getElementById('wealth-bar').style.width = avgWealth + '%';
        document.getElementById('health-bar').style.width = avgHealth + '%';
        
        document.getElementById('love-score').textContent = avgLove;
        document.getElementById('career-score').textContent = avgCareer;
        document.getElementById('wealth-score').textContent = avgWealth;
        document.getElementById('health-score').textContent = avgHealth;
    }, 200);
}

function renderDailyGrid(result) {
    const container = document.getElementById('daily-grid');
    const daily = result.dailyFortune;
    
    // 找出最好和最差的一天
    const bestDay = daily.reduce((best, d) => d.score > best.score ? d : best);
    const worstDay = daily.reduce((worst, d) => d.score < worst.score ? d : worst);
    
    // 判断今天是否在本周范围内
    const today = new Date();
    const todayStr = `${today.getMonth() + 1}/${today.getDate()}`;
    
    container.innerHTML = daily.map(day => {
        const scoreClass = day.score >= 75 ? 'high' : day.score >= 60 ? 'medium' : 'low';
        const isToday = day.dateStr === todayStr;
        const isBest = day.dayName === bestDay.dayName && day.dateStr === bestDay.dateStr;
        const isWorst = day.dayName === worstDay.dayName && day.dateStr === worstDay.dateStr;
        
        // 确定标签
        let badge = '';
        if (isToday) badge = '<span class="day-badge today">今</span>';
        else if (isBest) badge = '<span class="day-badge best">佳</span>';
        else if (isWorst) badge = '<span class="day-badge worst">慎</span>';
        
        return `
            <div class="day-cell ${scoreClass} ${isBest ? 'best' : ''} ${isToday ? 'today' : ''} ${isWorst ? 'worst' : ''}">
                <span class="day-name">${day.dayName.slice(1)}</span>
                <span class="day-num">${day.dateStr.split('/')[1]}</span>
                <span class="day-score">${day.score}</span>
                ${badge}
            </div>
        `;
    }).join('');
}

function renderDailyList(result) {
    const container = document.getElementById('daily-list');
    const daily = result.dailyFortune;
    
    // 找出最好和最差的一天
    const bestDay = daily.reduce((best, d) => d.score > best.score ? d : best);
    const worstDay = daily.reduce((worst, d) => d.score < worst.score ? d : worst);
    
    // 判断今天
    const today = new Date();
    const todayStr = `${today.getMonth() + 1}/${today.getDate()}`;
    
    container.innerHTML = daily.map(day => {
        const scoreClass = day.score >= 75 ? 'high' : day.score >= 60 ? 'medium' : 'low';
        const isToday = day.dateStr === todayStr;
        const isBest = day.dayName === bestDay.dayName && day.dateStr === bestDay.dateStr;
        const isWorst = day.dayName === worstDay.dayName && day.dateStr === worstDay.dateStr;
        
        let tag = '';
        if (isToday) tag = '<span class="detail-tag today">今天</span>';
        else if (isBest) tag = '<span class="detail-tag best">本周最佳</span>';
        else if (isWorst) tag = '<span class="detail-tag worst">需要谨慎</span>';
        
        return `
            <div class="day-detail ${isBest ? 'best' : ''} ${isToday ? 'today' : ''} ${isWorst ? 'worst' : ''}">
                <div class="day-detail-header">
                    <div>
                        <span class="day-detail-name">${day.dayName}</span>
                        <span class="day-detail-date">${day.dateStr}</span>
                        ${tag}
                    </div>
                    <span class="day-detail-score ${scoreClass}">${day.score}</span>
                </div>
                <p class="day-detail-text">${day.fortune}</p>
            </div>
        `;
    }).join('');
}

let currentDetail = 'love';

function renderDetailContent(result, type) {
    const container = document.getElementById('detail-content');
    const detail = result.details[type];
    
    container.innerHTML = `
        <h4>${detail.title}</h4>
        <p>${detail.text}</p>
    `;
}

function showDetailTab(type) {
    if (currentResult) {
        renderDetailContent(currentResult, type);
    }
}

function renderAdvice(result) {
    const container = document.getElementById('advice-list');
    
    const icons = { '最佳时机': '✨', '注意事项': '⚠️', '开运建议': '🎯', '每周提醒': '💡' };
    
    container.innerHTML = result.advice.map(a => `
        <div class="advice-item">
            <h5>${icons[a.title] || '📌'} ${a.title}</h5>
            <p>${a.text}</p>
        </div>
    `).join('');
}

function renderLucky(result) {
    const container = document.getElementById('lucky-list');
    const l = result.lucky;
    const bestDay = result.dailyFortune.reduce((best, d) => d.score > best.score ? d : best);
    
    container.innerHTML = `
        <div class="lucky-item">
            <span class="lucky-label">幸运颜色</span>
            <span class="lucky-value">${l.colors.join('、')}</span>
        </div>
        <div class="lucky-item">
            <span class="lucky-label">幸运数字</span>
            <span class="lucky-value">${l.numbers.join('、')}</span>
        </div>
        <div class="lucky-item">
            <span class="lucky-label">吉利方位</span>
            <span class="lucky-value">${l.direction}</span>
        </div>
        <div class="lucky-item">
            <span class="lucky-label">最佳日期</span>
            <span class="lucky-value">${bestDay.dayName} ${bestDay.score}分</span>
        </div>
    `;
}

// ========================================
// 历史记录
// ========================================

const HISTORY_KEY = 'fortune_history';

function saveHistory(params) {
    let history = getHistory();
    const exists = history.findIndex(h => h.year === params.year && h.month === params.month && h.day === params.day);
    if (exists !== -1) history.splice(exists, 1);
    history.unshift({ ...params, timestamp: Date.now() });
    if (history.length > 5) history = history.slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    loadHistory();
}

function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
}

function deleteHistory(index) {
    const history = getHistory();
    history.splice(index, 1);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = getHistory();
    const section = document.getElementById('history-section');
    const list = document.getElementById('history-list');
    
    if (!history.length) { section.classList.add('hidden'); return; }
    
    section.classList.remove('hidden');
    list.innerHTML = history.map((item, i) => {
        const cal = item.calendarType === 'lunar' ? '农历' : '阳历';
        return `
            <div class="history-item" data-index="${i}">
                <span class="history-text">${cal} ${item.year}.${item.month}.${item.day}</span>
                <span class="history-delete" data-index="${i}">×</span>
            </div>
        `;
    }).join('');
    
    list.querySelectorAll('.history-text').forEach(el => {
        el.addEventListener('click', function() {
            loadHistoryItem(history[this.closest('.history-item').dataset.index]);
        });
    });
    
    list.querySelectorAll('.history-delete').forEach(el => {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteHistory(parseInt(this.dataset.index));
        });
    });
}

function loadHistoryItem(item) {
    // 设置农历开关
    const toggle = document.getElementById('calendar-toggle');
    toggle.checked = item.calendarType === 'lunar';
    
    setTimeout(() => {
        document.getElementById('birth-year').value = item.year;
        document.getElementById('birth-month').value = item.month;
        document.getElementById('birth-month').dispatchEvent(new Event('change'));
        
        setTimeout(() => {
            document.getElementById('birth-day').value = item.day;
            if (item.hour) document.getElementById('birth-hour').value = item.hour;
            if (item.gender) document.getElementById('gender').value = item.gender;
            if (item.period) {
                document.querySelectorAll('.period-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.period === item.period);
                });
            }
        }, 30);
    }, 30);
}

function shareResults() {
    // 获取当前表单参数
    const params = getFormData();
    if (!params) return;
    
    // 生成分享链接
    const shareUrl = generateShareUrl(params);
    
    // 显示分享弹框
    showShareModal(shareUrl);
}

function showShareModal(url) {
    // 移除已有的弹框
    const existing = document.querySelector('.share-modal');
    if (existing) existing.remove();
    
    // 创建弹框
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-mask"></div>
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h4>分享给好友</h4>
                <button class="share-modal-close">×</button>
            </div>
            <div class="share-modal-body">
                <p class="share-tip">复制下方链接发送给好友，打开即可查看运势</p>
                <div class="share-link-box">
                    <input type="text" class="share-link-input" value="${url}" readonly>
                </div>
            </div>
            <div class="share-modal-footer">
                <button class="btn btn-secondary share-btn-copy">复制链接</button>
                <button class="btn btn-primary share-btn-native">系统分享</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 绑定事件
    modal.querySelector('.share-modal-mask').addEventListener('click', closeModal);
    modal.querySelector('.share-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.share-btn-copy').addEventListener('click', () => copyLink(url, modal));
    modal.querySelector('.share-btn-native').addEventListener('click', () => nativeShare(url));
    
    // 显示动画
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function copyLink(url, modal) {
    const copyBtn = modal.querySelector('.share-btn-copy');
    
    // 尝试使用 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            copyBtn.textContent = '已复制 ✓';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.textContent = '复制链接';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(() => {
            fallbackCopy(url, copyBtn);
        });
    } else {
        fallbackCopy(url, copyBtn);
    }
}

function fallbackCopy(text, btn) {
    // 降级方案：使用 textarea 复制
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        btn.textContent = '已复制 ✓';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '复制链接';
            btn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        // 复制失败，显示链接让用户手动复制
        const input = document.querySelector('.share-link-input');
        if (input) {
            input.select();
            input.setSelectionRange(0, 99999);
            alert('自动复制失败，请手动复制链接（已全选）');
        }
    }
    
    document.body.removeChild(textarea);
}

function nativeShare(url) {
    const shareText = `来看看我的运势吧！`;
    
    if (navigator.share) {
        navigator.share({ 
            title: 'Tyche · 命理运势', 
            text: shareText, 
            url: url 
        }).then(() => closeModal()).catch(() => {});
    } else {
        alert('您的浏览器不支持系统分享，请使用复制链接功能');
    }
}
