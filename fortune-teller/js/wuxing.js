/**
 * 星辰命理 - 五行知识库
 * 基于中国传统五行学说的详细数据
 */

const WuxingData = {
    elements: {
        wood: {
            name: '木',
            symbol: '🌳',
            color: '绿色',
            direction: '东',
            season: '春',
            climate: '风',
            organ: '肝胆',
            emotion: '怒',
            taste: '酸',
            planet: '木星',
            numbers: [3, 8],
            shape: '长方形',
            body: '筋',
            generation: '火',
            control: '土',
            generatedBy: '水',
            controlledBy: '金',
            personality: '木主仁，其性直，其情和。木盛的人长得丰姿秀丽，骨骼修长，手足细腻，口尖发美，面色青白。为人有博爱恻隐之心，慈祥恺悌之意，清高慷慨，质朴无伪。',
            strengths: ['仁慈', '正直', '有同情心', '有进取心', '有创造力'],
            weaknesses: ['固执', '嫉妒', '嫉妒', '不够灵活', '过于理想主义'],
            career: '适合从事教育、文化、艺术、医疗、环保等与成长、发展相关的行业。',
            health: '木旺或木衰的人，容易出现肝胆方面的问题，如肝炎、胆结石等。也容易出现眼睛、筋骨方面的问题。',
            advice: '木旺的人需要学会控制自己的情绪，避免过于冲动。木衰的人需要多接触大自然，培养自己的同情心和进取心。'
        },
        fire: {
            name: '火',
            symbol: '🔥',
            color: '红色',
            direction: '南',
            season: '夏',
            climate: '暑',
            organ: '心小肠',
            emotion: '喜',
            taste: '苦',
            planet: '火星',
            numbers: [2, 7],
            shape: '尖形',
            body: '脉',
            generation: '土',
            control: '金',
            generatedBy: '木',
            controlledBy: '水',
            personality: '火主礼，其性急，其情恭。火盛的人长得面目红润，口尖发美，精神闪烁，为人有礼貌，谦虚恭敬，淳朴急躁。',
            strengths: ['热情', '有礼貌', '有领导力', '有感染力', '乐观开朗'],
            weaknesses: ['急躁', '冲动', '爱慕虚荣', '不够冷静', '容易发怒'],
            career: '适合从事电力、能源、餐饮、娱乐、演艺等与火、热、光相关的行业。',
            health: '火旺或火衰的人，容易出现心脏、血液方面的问题，如心脏病、高血压等。也容易出现眼睛、舌头方面的问题。',
            advice: '火旺的人需要学会控制自己的情绪，避免过于冲动。火衰的人需要多接触阳光，培养自己的热情和礼貌。'
        },
        earth: {
            name: '土',
            symbol: '⛰️',
            color: '黄色',
            direction: '中',
            season: '四季',
            climate: '湿',
            organ: '脾胃',
            emotion: '思',
            taste: '甘',
            planet: '土星',
            numbers: [5, 10],
            shape: '方形',
            body: '肉',
            generation: '金',
            control: '水',
            generatedBy: '火',
            controlledBy: '木',
            personality: '土主信，其性重，其情厚。土盛的人长得腰阔鼻阔，口阔声大，为人忠孝至诚，度量宽厚，言必信，行必果。',
            strengths: ['稳重', '诚实', '有信用', '有耐心', '有责任心'],
            weaknesses: ['固执', '保守', '不够灵活', '过于谨慎', '缺乏情趣'],
            career: '适合从事农业、房地产、建筑、金融、保险等与土地、稳定相关的行业。',
            health: '土旺或土衰的人，容易出现脾胃方面的问题，如胃炎、消化不良等。也容易出现肌肉、皮肤方面的问题。',
            advice: '土旺的人需要学会灵活变通，避免过于固执。土衰的人需要多接触大地，培养自己的诚信和耐心。'
        },
        metal: {
            name: '金',
            symbol: '⚔️',
            color: '白色',
            direction: '西',
            season: '秋',
            climate: '燥',
            organ: '肺大肠',
            emotion: '悲',
            taste: '辛',
            planet: '金星',
            numbers: [4, 9],
            shape: '圆形',
            body: '皮毛',
            generation: '水',
            control: '木',
            generatedBy: '土',
            controlledBy: '火',
            personality: '金主义，其性刚，其情烈。金盛的人长得骨肉相称，面方白净，眉高眼深，体健神清。为人坚定果断，疏财仗义，深知廉耻。',
            strengths: ['果断', '有义气', '有魄力', '有决断力', '有正义感'],
            weaknesses: ['过于刚强', '缺乏变通', '容易冲动', '有时冷酷', '过于计较'],
            career: '适合从事金融、银行、机械、汽车、军警等与金属、刚硬相关的行业。',
            health: '金旺或金衰的人，容易出现肺部、呼吸系统方面的问题，如肺炎、哮喘等。也容易出现皮肤、骨骼方面的问题。',
            advice: '金旺的人需要学会柔软变通，避免过于刚强。金衰的人需要多接触金属，培养自己的义气和决断力。'
        },
        water: {
            name: '水',
            symbol: '💧',
            color: '黑色',
            direction: '北',
            season: '冬',
            climate: '寒',
            organ: '肾膀胱',
            emotion: '恐',
            taste: '咸',
            planet: '水星',
            numbers: [1, 6],
            shape: '波形',
            body: '骨',
            generation: '木',
            control: '火',
            generatedBy: '金',
            controlledBy: '土',
            personality: '水主智，其性聪，其情善。水旺的人长得面黑有采，语言清和，为人足智多谋，学识过人，议论有物，善于变化。',
            strengths: ['聪明', '有智慧', '有谋略', '善于变化', '有洞察力'],
            weaknesses: ['过于多变', '不够坚定', '有时狡猾', '容易恐惧', '缺乏毅力'],
            career: '适合从事航运、水产、水利、旅游、传媒等与水、流动相关的行业。',
            health: '水旺或水衰的人，容易出现肾脏、泌尿系统方面的问题，如肾炎、膀胱炎等。也容易出现耳朵、骨骼方面的问题。',
            advice: '水旺的人需要学会坚定自己的意志，避免过于多变。水衰的人需要多接触水，培养自己的智慧和谋略。'
        }
    },

    /**
     * 根据天干获取五行
     * @param {string} stem - 天干
     * @returns {Object} 五行信息
     */
    getElementByStem(stem) {
        const stemElementMap = {
            '甲': 'wood', '乙': 'wood',
            '丙': 'fire', '丁': 'fire',
            '戊': 'earth', '己': 'earth',
            '庚': 'metal', '辛': 'metal',
            '壬': 'water', '癸': 'water'
        };
        return this.elements[stemElementMap[stem]];
    },

    /**
     * 根据地支获取五行
     * @param {string} branch - 地支
     * @returns {Object} 五行信息
     */
    getElementByBranch(branch) {
        const branchElementMap = {
            '子': 'water', '亥': 'water',
            '寅': 'wood', '卯': 'wood',
            '巳': 'fire', '午': 'fire',
            '申': 'metal', '酉': 'metal',
            '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth'
        };
        return this.elements[branchElementMap[branch]];
    },

    /**
     * 计算五行平衡
     * @param {Array} elements - 五行元素数组
     * @returns {Object} 平衡分析
     */
    calculateBalance(elements) {
        const counts = {
            wood: 0,
            fire: 0,
            earth: 0,
            metal: 0,
            water: 0
        };

        elements.forEach(el => {
            if (el && counts.hasOwnProperty(el)) {
                counts[el]++;
            }
        });

        const total = elements.length;
        const missing = [];
        const excess = [];

        Object.entries(counts).forEach(([element, count]) => {
            if (count === 0) {
                missing.push(this.elements[element].name);
            }
            if (count >= 3) {
                excess.push(this.elements[element].name);
            }
        });

        let balance = '平衡';
        if (missing.length > 0) {
            balance = '缺失：' + missing.join('、');
        }
        if (excess.length > 0) {
            balance += (missing.length > 0 ? '，' : '') + '过旺：' + excess.join('、');
        }

        return {
            counts,
            missing,
            excess,
            balance,
            dominant: Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
        };
    },

    /**
     * 获取喜用神
     * @param {string} dayElement - 日主五行
     * @param {Object} balance - 五行平衡
     * @returns {string} 喜用神
     */
    getFavorableElement(dayElement, balance) {
        const elementOrder = ['wood', 'fire', 'earth', 'metal', 'water'];
        const dayIndex = elementOrder.indexOf(dayElement);

        // 如果日主过旺，喜克泄耗
        if (balance.excess.includes(this.elements[dayElement].name)) {
            return this.elements[
                elementOrder[(dayIndex + 2) % 5] // 克我者
            ].name;
        }

        // 如果日主过弱，喜生扶
        if (balance.missing.includes(this.elements[dayElement].name)) {
            return this.elements[
                elementOrder[(dayIndex + 4) % 5] // 生我者
            ].name;
        }

        // 平衡状态，喜我生者
        return this.elements[
            elementOrder[(dayIndex + 1) % 5] // 我生者
        ].name;
    },

    /**
     * 获取五行相生关系
     * @param {string} element - 五行元素
     * @returns {Object} 相生关系
     */
    getGeneration(element) {
        const generations = {
            wood: { generated: '火', generatedBy: '水' },
            fire: { generated: '土', generatedBy: '木' },
            earth: { generated: '金', generatedBy: '火' },
            metal: { generated: '水', generatedBy: '土' },
            water: { generated: '木', generatedBy: '金' }
        };
        return generations[element];
    },

    /**
     * 获取五行相克关系
     * @param {string} element - 五行元素
     * @returns {Object} 相克关系
     */
    getControl(element) {
        const controls = {
            wood: { control: '土', controlledBy: '金' },
            fire: { control: '金', controlledBy: '水' },
            earth: { control: '水', controlledBy: '木' },
            metal: { control: '木', controlledBy: '火' },
            water: { control: '火', controlledBy: '土' }
        };
        return controls[element];
    },

    /**
     * 获取所有五行元素
     * @returns {Array} 五行元素列表
     */
    getAllElements() {
        return Object.entries(this.elements).map(([key, value]) => ({
            key,
            ...value
        }));
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WuxingData;
}
