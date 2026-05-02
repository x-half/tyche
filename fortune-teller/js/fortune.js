/**
 * 星辰命理 - 周运势预测（基于传统命理学）
 */

const FortuneAnalyzer = {
    // 天干
    tiangan: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    
    // 地支
    dizhi: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
    
    // 天干五行
    tianganWuxing: { '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水' },
    
    // 地支五行
    dizhiWuxing: { '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水' },
    
    // 天干阴阳
    tianganYinyang: { '甲': '阳', '乙': '阴', '丙': '阳', '丁': '阴', '戊': '阳', '己': '阴', '庚': '阳', '辛': '阴', '壬': '阳', '癸': '阴' },
    
    // 十神关系表 [日主天干][其他天干] = 十神
    shishen: {
        '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印' },
        '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀', '壬': '正印', '癸': '偏印' },
        '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官' },
        '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '正官', '癸': '七杀' },
        '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
        '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
        '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
        '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
        '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
        '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
    },
    
    // 五行相生相克
    wuxing: {
        '木': { sheng: '火', ke: '土', shengBy: '水', keBy: '金' },
        '火': { sheng: '土', ke: '金', shengBy: '木', keBy: '水' },
        '土': { sheng: '金', ke: '水', shengBy: '火', keBy: '木' },
        '金': { sheng: '水', ke: '木', shengBy: '土', keBy: '火' },
        '水': { sheng: '木', ke: '火', shengBy: '金', keBy: '土' }
    },
    
    // 十神分数权重
    shishenScore: {
        '比肩': 5,   // 同类，稳定
        '劫财': 2,   // 同类但争夺
        '食神': 6,   // 我生，泄秀
        '伤官': 3,   // 我生，但叛逆
        '偏财': 4,   // 我克，收获
        '正财': 7,   // 我克，正当收获
        '七杀': -4,  // 克我，压力
        '正官': 2,   // 克我，但有制
        '偏印': 3,   // 生我，但偏门
        '正印': 8    // 生我，正统
    },
    
    // 节气数据（月份，日期，名称，五行旺衰）
    jieqi: [
        { month: 1, day: 6, name: '小寒', wuxing: '水' },
        { month: 2, day: 4, name: '立春', wuxing: '木' },
        { month: 3, day: 6, name: '惊蛰', wuxing: '木' },
        { month: 4, day: 5, name: '清明', wuxing: '火' },
        { month: 5, day: 6, name: '立夏', wuxing: '火' },
        { month: 6, day: 6, name: '芒种', wuxing: '土' },
        { month: 7, day: 7, name: '小暑', wuxing: '土' },
        { month: 8, day: 7, name: '立秋', wuxing: '金' },
        { month: 9, day: 8, name: '白露', wuxing: '金' },
        { month: 10, day: 8, name: '寒露', wuxing: '水' },
        { month: 11, day: 7, name: '立冬', wuxing: '水' },
        { month: 12, day: 7, name: '大雪', wuxing: '水' }
    ],
    
    /**
     * 主分析函数
     */
    analyze(params) {
        const { year, month, day, hour, gender, calendarType = 'solar', period = 'this' } = params;
        
        // 1. 获取命主八字
        const birthInfo = CalendarData.getDateInfo(year, month, day, hour, calendarType);
        const bazi = birthInfo.bazi;
        const dayGan = bazi.day[0];  // 日主天干
        const dayWuxing = this.tianganWuxing[dayGan];
        
        // 2. 分析日主强弱
        const dayMasterStrength = this.analyzeDayMaster(bazi);
        
        // 3. 确定喜用神
        const favorable = this.getFavorable(dayWuxing, dayMasterStrength);
        
        // 4. 获取本周/下周日期
        const weekDates = this.getWeekDates(period);
        
        // 5. 获取流年信息（当前年份）
        const currentYear = new Date().getFullYear();
        const yearGanZhi = CalendarData.getYearGanZhi(currentYear);
        const yearGan = yearGanZhi[0];
        const yearWuxing = this.tianganWuxing[yearGan];
        
        // 6. 计算每日运势
        const dailyFortune = weekDates.map((date, index) => {
            return this.calcDayFortune(date, dayGan, dayWuxing, dayMasterStrength, favorable, yearGan, yearWuxing);
        });
        
        // 7. 计算综合评分
        const overallScore = Math.round(dailyFortune.reduce((sum, d) => sum + d.score, 0) / 7);
        
        // 8. 生成分析内容
        const details = this.generateDetails(dayWuxing, overallScore, dailyFortune, dayMasterStrength);
        const advice = this.generateAdvice(dayWuxing, overallScore, dailyFortune, favorable);
        const lucky = this.getLuckyElements(dayWuxing, favorable, overallScore);
        
        return {
            period: period === 'this' ? '本周' : '下周',
            dateRange: weekDates,
            overallScore,
            dailyFortune,
            details,
            advice,
            lucky,
            bazi: {
                year: bazi.year,
                month: bazi.month,
                day: bazi.day,
                hour: bazi.hour,
                dayMaster: dayGan,
                dayWuxing: dayWuxing,
                strength: dayMasterStrength > 0 ? '偏强' : '偏弱',
                favorable: favorable
            },
            zodiacSign: AstrologyData.getSignByDate(birthInfo.solar.month, birthInfo.solar.day),
            zodiacAnimal: ChineseZodiacData.getAnimalByYear(birthInfo.solar.year)
        };
    },
    
    /**
     * 分析日主强弱
     * 根据四柱中各干支对日主的生扶/克泄耗来判断
     */
    analyzeDayMaster(bazi) {
        const dayGan = bazi.day[0];
        const dayWuxing = this.tianganWuxing[dayGan];
        
        let score = 0;
        
        // 分析其他三柱的天干
        ['year', 'month', 'hour'].forEach(pillar => {
            if (bazi[pillar] && bazi[pillar] !== '未知') {
                const gan = bazi[pillar][0];
                const ganWuxing = this.tianganWuxing[gan];
                
                // 生我（印星）加分
                if (this.wuxing[ganWuxing].sheng === dayWuxing) score += 2;
                // 同类（比劫）加分
                if (ganWuxing === dayWuxing) score += 1.5;
                // 我生（食伤）减分
                if (this.wuxing[dayWuxing].sheng === ganWuxing) score -= 0.5;
                // 我克（财星）减分
                if (this.wuxing[dayWuxing].ke === ganWuxing) score -= 1;
                // 克我（官杀）减分
                if (this.wuxing[ganWuxing].ke === dayWuxing) score -= 1.5;
            }
        });
        
        // 分析地支（按藏干权重0.5计算）
        ['year', 'month', 'hour'].forEach(pillar => {
            if (bazi[pillar] && bazi[pillar] !== '未知') {
                const zhi = bazi[pillar][1];
                const zhiWuxing = this.dizhiWuxing[zhi];
                
                if (this.wuxing[zhiWuxing].sheng === dayWuxing) score += 1;
                if (zhiWuxing === dayWuxing) score += 0.75;
                if (this.wuxing[dayWuxing].ke === zhiWuxing) score -= 0.5;
                if (this.wuxing[zhiWuxing].ke === dayWuxing) score -= 0.75;
            }
        });
        
        return score;
    },
    
    /**
     * 确定喜用神
     */
    getFavorable(dayWuxing, strength) {
        if (strength > 0) {
            // 身强，喜克泄耗
            return {
                element: this.wuxing[dayWuxing].keBy,  // 官杀
                reason: '日主偏强，喜克泄耗',
                favorable: [this.wuxing[dayWuxing].keBy, this.wuxing[dayWuxing].sheng, this.wuxing[dayWuxing].ke],
                avoid: [dayWuxing, this.wuxing[dayWuxing].shengBy]
            };
        } else {
            // 身弱，喜生扶
            return {
                element: this.wuxing[dayWuxing].shengBy,  // 印星
                reason: '日主偏弱，喜生扶',
                favorable: [this.wuxing[dayWuxing].shengBy, dayWuxing],
                avoid: [this.wuxing[dayWuxing].keBy, this.wuxing[dayWuxing].ke]
            };
        }
    },
    
    /**
     * 获取本周/下周日期
     */
    getWeekDates(period) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        
        if (period === 'next') {
            monday.setDate(monday.getDate() + 7);
        }
        
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            dates.push(d);
        }
        return dates;
    },
    
    /**
     * 计算单日运势
     * 核心算法：基于当日天干地支与命主八字的关系
     */
    calcDayFortune(date, dayGan, dayWuxing, dayMasterStrength, favorable, yearGan, yearWuxing) {
        // 1. 获取当日天干地支
        const dayGanZhi = CalendarData.getDayGanZhi(date.getFullYear(), date.getMonth() + 1, date.getDate());
        const dayStem = dayGanZhi[0];
        const dayBranch = dayGanZhi[1];
        const dayStemWuxing = this.tianganWuxing[dayStem];
        const dayBranchWuxing = this.dizhiWuxing[dayBranch];
        
        // 2. 计算当日天干与日主的关系（十神）
        const shishenRelation = this.shishen[dayGan][dayStem];
        const shishenScore = this.shishenScore[shishenRelation] || 0;
        
        // 3. 计算当日地支与日主的关系
        let branchScore = 0;
        if (this.wuxing[dayBranchWuxing].sheng === dayWuxing) branchScore = 3;  // 地支生我
        else if (dayBranchWuxing === dayWuxing) branchScore = 2;  // 地支同我
        else if (this.wuxing[dayWuxing].sheng === dayBranchWuxing) branchScore = 1;  // 我生地支
        else if (this.wuxing[dayWuxing].ke === dayBranchWuxing) branchScore = 0;  // 我克地支
        else if (this.wuxing[dayBranchWuxing].ke === dayWuxing) branchScore = -3;  // 地支克我
        
        // 4. 计算流年与当日的关系
        let yearScore = 0;
        const yearToDayStem = this.shishen[yearGan][dayStem];
        if (yearToDayStem === '正印' || yearToDayStem === '偏印') yearScore = 2;
        else if (yearToDayStem === '正财' || yearToDayStem === '偏财') yearScore = 1;
        else if (yearToDayStem === '七杀') yearScore = -2;
        
        // 5. 计算喜用神配合度
        let favorableScore = 0;
        if (dayStemWuxing === favorable.element || dayBranchWuxing === favorable.element) {
            favorableScore = 5;  // 当日五行是喜用神
        } else if (favorable.favorable.includes(dayStemWuxing) || favorable.favorable.includes(dayBranchWuxing)) {
            favorableScore = 3;  // 当日五行是喜用
        } else if (favorable.avoid.includes(dayStemWuxing) || favorable.avoid.includes(dayBranchWuxing)) {
            favorableScore = -3;  // 当日五行是忌神
        }
        
        // 6. 节气影响
        const jieqiScore = this.getJieqiScore(date, dayWuxing);
        
        // 7. 综合计算基础分
        // 基础分70 + 各项调整（控制在合理范围）
        const rawScore = 70 + shishenScore + branchScore + yearScore + favorableScore + jieqiScore;
        const baseScore = Math.max(55, Math.min(85, rawScore));
        
        // 8. 计算各项运势
        const love = this.calcCategoryScore(baseScore, 'love', dayGan, dayStem, dayBranch);
        const career = this.calcCategoryScore(baseScore, 'career', dayGan, dayStem, dayBranch);
        const wealth = this.calcCategoryScore(baseScore, 'wealth', dayGan, dayStem, dayBranch);
        const health = this.calcCategoryScore(baseScore, 'health', dayGan, dayStem, dayBranch);
        
        const avgScore = Math.round((love + career + wealth + health) / 4);
        
        // 9. 生成运势描述
        const fortune = this.getDayFortuneText(avgScore, shishenRelation, dayStemWuxing);
        const tags = this.getDayTags(avgScore, shishenRelation);
        
        const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        
        return {
            date,
            dayName: dayNames[this.getDayOfWeekIndex(date)],
            dateStr: `${date.getMonth() + 1}/${date.getDate()}`,
            score: avgScore,
            love, career, wealth, health,
            tags,
            fortune,
            dayStem,
            dayBranch,
            shishen: shishenRelation
        };
    },
    
    /**
     * 获取星期索引（周一=0）
     */
    getDayOfWeekIndex(date) {
        const day = date.getDay();
        return day === 0 ? 6 : day - 1;
    },
    
    /**
     * 节气分数
     * 根据节气对五行旺衰的影响
     */
    getJieqiScore(date, dayWuxing) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // 找到当前节气
        let currentJieqi = this.jieqi[0];
        for (const jq of this.jieqi) {
            if (month > jq.month || (month === jq.month && day >= jq.day)) {
                currentJieqi = jq;
            }
        }
        
        // 当前节气五行与日主五行的关系
        const jqWuxing = currentJieqi.wuxing;
        
        if (jqWuxing === dayWuxing) return 3;  // 当令，旺
        if (this.wuxing[jqWuxing].sheng === dayWuxing) return 2;  // 相
        if (this.wuxing[jqWuxing].ke === dayWuxing) return -2;  // 囚
        if (this.wuxing[dayWuxing].ke === jqWuxing) return 1;  // 休
        return 0;
    },
    
    /**
     * 计算各项运势分数
     */
    calcCategoryScore(baseScore, category, masterGan, dayStem, dayBranch) {
        // 各项运势的基础权重（基于十神）
        const categoryShishenBonus = {
            love: { '正财': 5, '偏财': 3, '食神': 2, '伤官': -2, '比肩': 1 },
            career: { '正官': 5, '七杀': 2, '正印': 4, '偏印': 2, '比肩': 1 },
            wealth: { '正财': 5, '偏财': 6, '食神': 2, '伤官': -1 },
            health: { '正印': 3, '偏印': 2, '比肩': 2, '劫财': -1 }
        };
        
        // 地支对特定运势的额外影响
        const branchWuxing = this.dizhiWuxing[dayBranch];
        let branchBonus = 0;
        
        if (category === 'love') {
            // 感情看桃花（子午卯酉为桃花位）
            if (['子', '午', '卯', '酉'].includes(dayBranch)) branchBonus = 5;
        } else if (category === 'wealth') {
            // 财运看财星五行
            if (branchWuxing === '金') branchBonus = 3;
            if (branchWuxing === '木') branchBonus = 2;
        } else if (category === 'career') {
            // 事业看官星五行
            if (branchWuxing === '金') branchBonus = 4;
            if (branchWuxing === '土') branchBonus = 2;
        } else if (category === 'health') {
            // 健康看五行平衡
            branchBonus = 0;
        }
        
        // 获取当日十神
        const shishenRelation = this.shishen[masterGan][dayStem];
        const shishenBonus = (categoryShishenBonus[category] || {})[shishenRelation] || 0;
        
        // 综合计算：基础分 + 十神加成 + 地支加成
        const score = baseScore + shishenBonus + branchBonus;
        return Math.max(45, Math.min(95, score));
    },
    
    /**
     * 获取每日标签
     */
    getDayTags(score, shishen) {
        const tags = [];
        
        if (score >= 80) tags.push({ text: '大吉', type: 'good' });
        else if (score >= 75) tags.push({ text: '吉', type: 'good' });
        else if (score < 55) tags.push({ text: '凶', type: 'bad' });
        else if (score < 60) tags.push({ text: '注意', type: 'bad' });
        
        if (shishen === '正印' || shishen === '偏印') tags.push({ text: '贵人', type: 'good' });
        if (shishen === '正财' || shishen === '偏财') tags.push({ text: '财运', type: 'good' });
        if (shishen === '七杀') tags.push({ text: '压力', type: 'bad' });
        if (shishen === '伤官') tags.push({ text: '变动', type: '' });
        
        return tags;
    },
    
    /**
     * 生成每日运势描述
     */
    getDayFortuneText(score, shishen, dayWuxing) {
        let text = '';
        
        // 根据十神给出具体建议
        const shishenText = {
            '比肩': '适合与人合作，团队协作顺畅',
            '劫财': '注意理财，避免冲动消费',
            '食神': '创意涌现，适合创作或表达',
            '伤官': '思维活跃，但要注意言辞',
            '偏财': '有意外收获，可适当投资',
            '正财': '正财运势佳，努力有回报',
            '七杀': '压力较大，需保持冷静',
            '正官': '贵人运旺，易获认可',
            '偏印': '适合学习研究，灵感丰富',
            '正印': '运势顺利，易得长辈帮助'
        };
        
        if (score >= 80) {
            text = `今日${shishenText[shishen] || '运势旺盛'}，把握机会。`;
        } else if (score >= 70) {
            text = `今日${shishenText[shishen] || '运势不错'}，稳步前进。`;
        } else if (score >= 60) {
            text = `今日运势平稳，宜守不宜攻。`;
        } else {
            text = `今日需谨慎，避免冲动决策。`;
        }
        
        return text;
    },
    
    /**
     * 生成详细分析
     */
    generateDetails(dayWuxing, overallScore, dailyFortune, strength) {
        const avgLove = Math.round(dailyFortune.reduce((s, d) => s + d.love, 0) / 7);
        const avgCareer = Math.round(dailyFortune.reduce((s, d) => s + d.career, 0) / 7);
        const avgWealth = Math.round(dailyFortune.reduce((s, d) => s + d.wealth, 0) / 7);
        const avgHealth = Math.round(dailyFortune.reduce((s, d) => s + d.health, 0) / 7);
        
        // 找出本周最佳和最差的十神日
        const bestShishen = dailyFortune.reduce((best, d) => d.score > best.score ? d : best);
        const worstShishen = dailyFortune.reduce((worst, d) => d.score < worst.score ? d : worst);
        
        return {
            love: {
                title: '感情运势',
                score: avgLove,
                text: this.getDetailText('love', avgLove, dayWuxing, bestShishen, worstShishen)
            },
            career: {
                title: '事业运势',
                score: avgCareer,
                text: this.getDetailText('career', avgCareer, dayWuxing, bestShishen, worstShishen)
            },
            wealth: {
                title: '财运分析',
                score: avgWealth,
                text: this.getDetailText('wealth', avgWealth, dayWuxing, bestShishen, worstShishen)
            },
            health: {
                title: '健康状况',
                score: avgHealth,
                text: this.getDetailText('health', avgHealth, dayWuxing, bestShishen, worstShishen)
            }
        };
    },
    
    /**
     * 获取详细文本
     */
    getDetailText(type, score, dayWuxing, bestDay, worstDay) {
        const shishenAdvice = {
            love: {
                '正印': '本周有长辈介绍或贵人牵线的机会',
                '偏印': '感情中可能有意外邂逅',
                '正财': '感情稳定，适合表达心意',
                '偏财': '桃花运旺，但要避免三角关系',
                '食神': '约会时多展示才华',
                '伤官': '注意言辞，避免争吵',
                '比肩': '与伴侣共同参与活动',
                '劫财': '注意财务问题影响感情',
                '正官': '对方可能给你压力，但也是成长',
                '七杀': '感情中需保持冷静'
            },
            career: {
                '正印': '本周易得领导赏识',
                '偏印': '适合学习新技能',
                '正财': '工作成果易获认可',
                '偏财': '有额外收入机会',
                '食神': '创意工作表现出色',
                '伤官': '注意与上级的沟通方式',
                '比肩': '团队合作顺利',
                '劫财': '注意同事竞争',
                '正官': '有晋升或考核机会',
                '七杀': '工作压力较大，需调整心态'
            },
            wealth: {
                '正印': '正财稳定，不宜投机',
                '偏印': '偏财运一般，适合稳健理财',
                '正财': '本周财运佳，努力有回报',
                '偏财': '有意外收入或投资机会',
                '食神': '通过才华变现',
                '伤官': '避免冲动消费',
                '比肩': '与人合伙需谨慎',
                '劫财': '注意钱财外借',
                '正官': '正财稳定',
                '七杀': '破财风险，谨慎投资'
            },
            health: {
                '正印': '身体状况良好',
                '偏印': '注意作息规律',
                '正财': '精力充沛',
                '偏财': '注意饮食健康',
                '食神': '心情愉悦，利于健康',
                '伤官': '注意心血管',
                '比肩': '适合运动锻炼',
                '劫财': '避免过度劳累',
                '正官': '注意工作压力',
                '七杀': '需要充分休息'
            }
        };
        
        const baseText = shishenAdvice[type];
        let text = '';
        
        if (score >= 75) {
            text = `本周${type === 'love' ? '感情' : type === 'career' ? '事业' : type === 'wealth' ? '财运' : '健康'}运势较旺。`;
            text += baseText[bestDay.shishen] || '适合积极行动。';
        } else if (score >= 60) {
            text = `本周${type === 'love' ? '感情' : type === 'career' ? '事业' : type === 'wealth' ? '财运' : '健康'}运势平稳。`;
            text += '保持平常心，稳中求进。';
        } else {
            text = `本周${type === 'love' ? '感情' : type === 'career' ? '事业' : type === 'wealth' ? '财运' : '健康'}运势一般。`;
            text += baseText[worstDay.shishen] || '建议保持低调。';
        }
        
        return text;
    },
    
    /**
     * 生成建议
     */
    generateAdvice(dayWuxing, overallScore, dailyFortune, favorable) {
        const bestDay = dailyFortune.reduce((best, d) => d.score > best.score ? d : best);
        const worstDay = dailyFortune.reduce((worst, d) => d.score < worst.score ? d : worst);
        
        return [
            {
                title: '最佳时机',
                text: `本周${bestDay.dayName}（${bestDay.dateStr}）运势最佳，综合评分${bestDay.score}分。当日为${bestDay.dayStem}${bestDay.dayBranch}日，十神为${bestDay.shishen}，适合安排重要事务。`
            },
            {
                title: '注意事项',
                text: `本周${worstDay.dayName}（${worstDay.dateStr}）运势较低，当日为${worstDay.dayStem}${worstDay.dayBranch}日，十神为${worstDay.shishen}，建议避免重大决策。`
            },
            {
                title: '开运建议',
                text: `您属${dayWuxing}命，喜用神为${favorable.element}。本周可多穿着${this.getWuxingColors(favorable.element).join('、')}色系服饰，往${this.getWuxingDirection(favorable.element)}方向活动有助提升运势。`
            },
            {
                title: '每周提醒',
                text: overallScore >= 75 
                    ? '本周整体运势不错，把握有利时机，保持积极心态。' 
                    : '本周运势平稳，稳中求进，注意五行调和。'
            }
        ];
    },
    
    /**
     * 获取五行对应颜色
     */
    getWuxingColors(element) {
        const colors = {
            '木': ['绿色', '青色'],
            '火': ['红色', '紫色'],
            '土': ['黄色', '棕色'],
            '金': ['白色', '银色'],
            '水': ['蓝色', '黑色']
        };
        return colors[element] || ['白色'];
    },
    
    /**
     * 获取五行对应方位
     */
    getWuxingDirection(element) {
        const directions = {
            '木': '东方',
            '火': '南方',
            '土': '中央',
            '金': '西方',
            '水': '北方'
        };
        return directions[element] || '中央';
    },
    
    /**
     * 获取幸运元素
     */
    getLuckyElements(dayWuxing, favorable, overallScore) {
        return {
            colors: this.getWuxingColors(favorable.element),
            numbers: this.getWuxingNumbers(favorable.element),
            direction: this.getWuxingDirection(favorable.element),
            element: favorable.element
        };
    },
    
    /**
     * 获取五行对应数字
     */
    getWuxingNumbers(element) {
        const numbers = {
            '木': [3, 8],
            '火': [2, 7],
            '土': [5, 0],
            '金': [4, 9],
            '水': [1, 6]
        };
        return numbers[element] || [1, 6];
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FortuneAnalyzer;
}
