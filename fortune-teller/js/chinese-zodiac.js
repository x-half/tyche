/**
 * 星辰命理 - 中国生肖知识库
 * 基于中国传统生肖命理的十二生肖详细数据
 */

const ChineseZodiacData = {
    animals: {
        rat: {
            name: '鼠',
            stem: '子',
            fullName: '子鼠',
            element: '水',
            yinYang: '阳',
            direction: '北',
            season: '冬',
            hours: '23:00-01:00',
            years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032],
            personality: '鼠是十二生肖之首，象征着智慧和机敏。属鼠的人聪明伶俐、反应敏捷、善于交际。他们有着敏锐的洞察力和强大的适应能力，能够在复杂的环境中生存和发展。鼠年出生的人通常有着强烈的好奇心和求知欲，善于发现机会并把握机遇。',
            strengths: ['聪明机智', '善于交际', '适应力强', '勤奋努力', '有商业头脑'],
            weaknesses: ['多疑谨慎', '过于计较', '缺乏胆量', '容易紧张', '有时狡猾'],
            love: '属鼠的人在爱情中聪明机智，懂得讨好伴侣。他们渴望稳定的家庭生活，对感情专一忠诚。理想的伴侣需要能够给予安全感，同时理解他们的交际需求。',
            career: '属鼠的人适合从事商业、金融、传媒、教育等需要智慧和交际能力的工作。他们有很强的商业嗅觉和谈判能力。',
            health: '属鼠的人需要特别注意肾脏和泌尿系统的健康。由于容易紧张，也需要注意神经系统和睡眠质量。',
            luckyNumbers: [2, 3],
            luckyColors: ['蓝色', '绿色', '金色'],
            luckyFlowers: '百合花、非洲紫罗兰',
            luckyDirection: '东南、东北',
            avoidNumbers: [5, 9],
            avoidColors: ['红色', '棕色', '黄色'],
            compatibleAnimals: ['牛', '龙', '猴'],
            conflictAnimals: ['马', '羊', '兔']
        },
        ox: {
            name: '牛',
            stem: '丑',
            fullName: '丑牛',
            element: '土',
            yinYang: '阴',
            direction: '东北',
            season: '冬',
            hours: '01:00-03:00',
            years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033],
            personality: '牛是勤劳和坚韧的象征。属牛的人踏实稳重、勤劳肯干、有耐心。他们有着坚定的意志和强大的执行力，一旦确定目标就会坚持到底。牛年出生的人通常性格内向但内心坚强，重视承诺和责任。',
            strengths: ['勤劳踏实', '意志坚定', '诚实可靠', '有耐心', '有责任心'],
            weaknesses: ['固执己见', '不够灵活', '过于保守', '不善表达', '缺乏情趣'],
            love: '属牛的人在爱情中忠诚专一，是理想的伴侣。他们用行动表达爱意，会为家庭默默付出。需要一个能够理解他们沉默寡言、给予耐心的伴侣。',
            career: '属牛的人适合从事农业、工程、金融、医疗等需要耐心和专业技能的工作。他们有很强的执行力和专业精神。',
            health: '属牛的人需要特别注意脾胃和消化系统的健康。由于工作劳累，也需要注意关节和骨骼的保养。',
            luckyNumbers: [1, 4],
            luckyColors: ['黄色', '绿色', '白色'],
            luckyFlowers: '郁金香、康乃馨',
            luckyDirection: '东南、正南',
            avoidNumbers: [3, 6],
            avoidColors: ['蓝色', '红色'],
            compatibleAnimals: ['鼠', '蛇', '鸡'],
            conflictAnimals: ['马', '羊', '狗']
        },
        tiger: {
            name: '虎',
            stem: '寅',
            fullName: '寅虎',
            element: '木',
            yinYang: '阳',
            direction: '东',
            season: '春',
            hours: '03:00-05:00',
            years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034],
            personality: '虎是勇猛和力量的象征。属虎的人勇敢自信、热情大方、有领导力。他们有着强烈的正义感和保护欲，喜欢冒险和挑战。虎年出生的人通常性格直爽、慷慨大方，有着强烈的自尊心。',
            strengths: ['勇敢自信', '热情大方', '有领导力', '有正义感', '有魅力'],
            weaknesses: ['冲动急躁', '独断专行', '过于自信', '容易发怒', '缺乏耐心'],
            love: '属虎的人在爱情中热情奔放，喜欢轰轰烈烈的恋情。他们渴望被崇拜和依赖，会全力保护自己的伴侣。需要一个能够配合他们的热情、给予崇拜的伴侣。',
            career: '属虎的人适合从事军警、政治、创业、演艺等需要勇气和领导力的工作。他们有很强的行动力和感染力。',
            health: '属虎的人需要特别注意肝脏和胆囊的健康。由于性格急躁，也需要注意心血管和血压问题。',
            luckyNumbers: [1, 3, 4],
            luckyColors: ['蓝色', '灰色', 'orange'],
            luckyFlowers: '百合、兰草',
            luckyDirection: '正南、正东',
            avoidNumbers: [6, 7, 8],
            avoidColors: ['棕色', '金色'],
            compatibleAnimals: ['马', '狗', '猪'],
            conflictAnimals: ['蛇', '猴']
        },
        rabbit: {
            name: '兔',
            stem: '卯',
            fullName: '卯兔',
            element: '木',
            yinYang: '阴',
            direction: '东',
            season: '春',
            hours: '05:00-07:00',
            years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035],
            personality: '兔是温和和优雅的象征。属兔的人温和善良、心思细腻、有品味。他们有着敏锐的直觉和艺术天赋，追求和谐美好的生活。兔年出生的人通常性格内敛、善解人意，有着很高的审美标准。',
            strengths: ['温和善良', '心思细腻', '有品味', '善于交际', '有艺术天赋'],
            weaknesses: ['过于谨慎', '优柔寡断', '缺乏自信', '容易逃避', '有时虚伪'],
            love: '属兔的人在爱情中温柔体贴，是理想的恋人。他们渴望浪漫的爱情和和谐的家庭生活。需要一个能够给予安全感、理解他们敏感内心的伴侣。',
            career: '属兔的人适合从事艺术、设计、教育、外交等需要品味和交际能力的工作。他们有很强的审美能力和创造力。',
            health: '属兔的人需要特别注意肝脏和神经系统的健康。由于性格敏感，容易出现焦虑和失眠问题。',
            luckyNumbers: [3, 4, 6],
            luckyColors: ['粉色', '紫色', '蓝色'],
            luckyFlowers: '莲花、山茶花',
            luckyDirection: '正东、正南',
            avoidNumbers: [1, 7, 8],
            avoidColors: ['深红色', '深黄色'],
            compatibleAnimals: ['羊', '猪', '狗'],
            conflictAnimals: ['鼠', '牛', '龙']
        },
        dragon: {
            name: '龙',
            stem: '辰',
            fullName: '辰龙',
            element: '土',
            yinYang: '阳',
            direction: '东南',
            season: '春',
            hours: '07:00-09:00',
            years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036],
            personality: '龙是尊贵和力量的象征。属龙的人自信强大、有领导力、有魅力。他们有着远大的抱负和强大的执行力，天生就是领导者。龙年出生的人通常性格豪爽、慷慨大方，有着强烈的自信心。',
            strengths: ['自信强大', '有领导力', '有魅力', '有远见', '有创造力'],
            weaknesses: ['骄傲自负', '缺乏耐心', '过于理想主义', '独断专行', '不善妥协'],
            love: '属龙的人在爱情中热情奔放，喜欢用华丽的方式表达爱意。他们渴望被崇拜和依赖，会全力保护自己的伴侣。需要一个能够配合他们的热情、给予崇拜的伴侣。',
            career: '属龙的人适合从事政治、创业、演艺、金融等需要领导力和创造力的工作。他们有很强的组织能力和影响力。',
            health: '属龙的人需要特别注意脾胃和消化系统的健康。由于性格急躁，也需要注意心血管和血压问题。',
            luckyNumbers: [1, 6, 7],
            luckyColors: ['金色', '银色', '灰色'],
            luckyFlowers: '龙吐珠、桃花',
            luckyDirection: '正西、正北',
            avoidNumbers: [3, 8],
            avoidColors: ['绿色', '蓝色'],
            compatibleAnimals: ['鼠', '猴', '鸡'],
            conflictAnimals: ['狗', '兔', '龙']
        },
        snake: {
            name: '蛇',
            stem: '巳',
            fullName: '巳蛇',
            element: '火',
            yinYang: '阴',
            direction: '南',
            season: '夏',
            hours: '09:00-11:00',
            years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037],
            personality: '蛇是智慧和神秘的象征。属蛇的人聪明机智、洞察力强、有魅力。他们有着敏锐的直觉和深邃的思想，善于隐藏自己的真实想法。蛇年出生的人通常性格沉稳、深思熟虑，有着很强的神秘感。',
            strengths: ['聪明机智', '洞察力强', '有魅力', '深思熟虑', '有艺术天赋'],
            weaknesses: ['多疑猜忌', '过于冷漠', '报复心重', '嫉妒心强', '不够坦诚'],
            love: '属蛇的人在爱情中深沉专一，追求灵魂的连接。他们不会轻易表达感情，但一旦爱上就会全心投入。需要一个能够理解他们深沉内心、给予信任的伴侣。',
            career: '属蛇的人适合从事研究、金融、心理、艺术等需要智慧和洞察力的工作。他们有很强的分析能力和创造力。',
            health: '属蛇的人需要特别注意心脏和循环系统的健康。由于性格内向，容易积累负面情绪。',
            luckyNumbers: [2, 8, 9],
            luckyColors: ['红色', '浅黄色', '黑色'],
            luckyFlowers: '兰花、紫薇花',
            luckyDirection: '西南、南',
            avoidNumbers: [1, 6, 7],
            avoidColors: ['金色', '白色'],
            compatibleAnimals: ['牛', '鸡', '猴'],
            conflictAnimals: ['虎', '猪']
        },
        horse: {
            name: '马',
            stem: '午',
            fullName: '午马',
            element: '火',
            yinYang: '阳',
            direction: '南',
            season: '夏',
            hours: '11:00-13:00',
            years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038],
            personality: '马是自由和奔放的象征。属马的人热情开朗、自由奔放、有活力。他们有着强烈的好奇心和探索精神，喜欢冒险和挑战。马年出生的人通常性格直爽、慷慨大方，有着强烈的自尊心。',
            strengths: ['热情开朗', '自由奔放', '有活力', '善于交际', '有冒险精神'],
            weaknesses: ['缺乏耐心', '不够专注', '过于冲动', '容易放弃', '不够细心'],
            love: '属马的人在爱情中热情奔放，喜欢轰轰烈烈的恋情。他们害怕被束缚，需要一定的自由空间。需要一个能够理解他们自由精神、给予支持的伴侣。',
            career: '属马的人适合从事旅游、销售、演艺、体育等需要活力和交际能力的工作。他们有很强的行动力和感染力。',
            health: '属马的人需要特别注意心脏和循环系统的健康。由于性格急躁，也需要注意血压问题。',
            luckyNumbers: [2, 3, 7],
            luckyColors: ['黄色', '绿色', '红色'],
            luckyFlowers: '紫薇、牡丹',
            luckyDirection: '正南、正西',
            avoidNumbers: [1, 5, 6],
            avoidColors: ['蓝色', '白色'],
            compatibleAnimals: ['虎', '羊', '狗'],
            conflictAnimals: ['鼠', '牛']
        },
        goat: {
            name: '羊',
            stem: '未',
            fullName: '未羊',
            element: '土',
            yinYang: '阴',
            direction: '西南',
            season: '夏',
            hours: '13:00-15:00',
            years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039],
            personality: '羊是温和和善良的象征。属羊的人温和善良、富有同情心、有艺术天赋。他们有着敏锐的直觉和丰富的想象力，追求和谐美好的生活。羊年出生的人通常性格内敛、善解人意，有着很高的审美标准。',
            strengths: ['温和善良', '富有同情心', '有艺术天赋', '善于交际', '有创造力'],
            weaknesses: ['过于敏感', '优柔寡断', '缺乏自信', '容易逃避', '有时悲观'],
            love: '属羊的人在爱情中温柔体贴，是理想的恋人。他们渴望浪漫的爱情和和谐的家庭生活。需要一个能够给予安全感、理解他们敏感内心的伴侣。',
            career: '属羊的人适合从事艺术、设计、教育、医疗等需要品味和同情心的工作。他们有很强的审美能力和创造力。',
            health: '属羊的人需要特别注意脾胃和消化系统的健康。由于性格敏感，容易出现焦虑和失眠问题。',
            luckyNumbers: [2, 7],
            luckyColors: ['绿色', '红色', '紫色'],
            luckyFlowers: '康乃馨、报春花',
            luckyDirection: '正北、正西',
            avoidNumbers: [4, 9],
            avoidColors: ['蓝色', '黑色'],
            compatibleAnimals: ['兔', '马', '猪'],
            conflictAnimals: ['鼠', '牛', '狗']
        },
        monkey: {
            name: '猴',
            stem: '申',
            fullName: '申猴',
            element: '金',
            yinYang: '阳',
            direction: '西',
            season: '秋',
            hours: '15:00-17:00',
            years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040],
            personality: '猴是聪明和灵活的象征。属猴的人聪明机智、活泼好动、有创造力。他们有着敏锐的思维和强大的适应能力，善于解决问题。猴年出生的人通常性格开朗、幽默风趣，有着很强的社交能力。',
            strengths: ['聪明机智', '活泼好动', '有创造力', '善于交际', '适应力强'],
            weaknesses: ['不够专注', '过于投机', '缺乏耐心', '善变不定', '有时狡猾'],
            love: '属猴的人在爱情中活泼有趣，喜欢浪漫的恋情。他们害怕被束缚，需要一定的自由空间。需要一个能够理解他们活泼性格、给予支持的伴侣。',
            career: '属猴的人适合从事科技、传媒、演艺、商业等需要智慧和创造力的工作。他们有很强的学习能力和创新能力。',
            health: '属猴的人需要特别注意肺部和呼吸系统的健康。由于性格活泼，容易出现意外伤害。',
            luckyNumbers: [4, 9],
            luckyColors: ['白色', '蓝色', '金色'],
            luckyFlowers: '菊花、葱花',
            luckyDirection: '正西、正北',
            avoidNumbers: [2, 7],
            avoidColors: ['红色', '深黄色'],
            compatibleAnimals: ['鼠', '龙', '蛇'],
            conflictAnimals: ['虎', '猪']
        },
        rooster: {
            name: '鸡',
            stem: '酉',
            fullName: '酉鸡',
            element: '金',
            yinYang: '阴',
            direction: '西',
            season: '秋',
            hours: '17:00-19:00',
            years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041],
            personality: '鸡是勤奋和守时的象征。属鸡的人勤奋努力、有条理、有责任感。他们有着敏锐的观察力和很强的执行力，善于组织和管理。鸡年出生的人通常性格直爽、慷慨大方，有着很强的自信心。',
            strengths: ['勤奋努力', '有条理', '有责任感', '有观察力', '有组织能力'],
            weaknesses: ['过于挑剔', '不够灵活', '爱慕虚荣', '有时自负', '缺乏情趣'],
            love: '属鸡的人在爱情中忠诚专一，是理想的伴侣。他们用行动表达爱意，会为家庭默默付出。需要一个能够理解他们追求完美、给予耐心的伴侣。',
            career: '属鸡的人适合从事金融、管理、法律、医疗等需要条理和责任感的工作。他们有很强的组织能力和执行力。',
            health: '属鸡的人需要特别注意肺部和呼吸系统的健康。由于追求完美，容易出现焦虑和压力问题。',
            luckyNumbers: [5, 7, 8],
            luckyColors: ['金色', '棕色', '黄色'],
            luckyFlowers: '剑兰、凤仙花',
            luckyDirection: '正南、正北',
            avoidNumbers: [1, 3],
            avoidColors: ['红色', '蓝色'],
            compatibleAnimals: ['牛', '龙', '蛇'],
            conflictAnimals: ['兔', '狗', '鸡']
        },
        dog: {
            name: '狗',
            stem: '戌',
            fullName: '戌狗',
            element: '土',
            yinYang: '阳',
            direction: '西北',
            season: '秋',
            hours: '19:00-21:00',
            years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042],
            personality: '狗是忠诚和正直的象征。属狗的人忠诚可靠、正直善良、有正义感。他们有着强烈的正义感和保护欲，喜欢帮助他人。狗年出生的人通常性格直爽、慷慨大方，有着很强的责任心。',
            strengths: ['忠诚可靠', '正直善良', '有正义感', '有责任心', '有同情心'],
            weaknesses: ['过于敏感', '容易焦虑', '不够灵活', '有时悲观', '缺乏自信'],
            love: '属狗的人在爱情中忠诚专一，是理想的伴侣。他们用行动表达爱意，会为家庭默默付出。需要一个能够理解他们敏感内心、给予安全感的伴侣。',
            career: '属狗的人适合从事法律、教育、医疗、社会工作等需要正义感和同情心的工作。他们有很强的责任心和执行力。',
            health: '属狗的人需要特别注意脾胃和消化系统的健康。由于性格敏感，容易出现焦虑和失眠问题。',
            luckyNumbers: [3, 4, 9],
            luckyColors: ['绿色', '红色', '紫色'],
            luckyFlowers: '玫瑰、茉莉',
            luckyDirection: '正南、正东',
            avoidNumbers: [1, 6, 7],
            avoidColors: ['蓝色', '白色'],
            compatibleAnimals: ['虎', '兔', '马'],
            conflictAnimals: ['龙', '羊', '鸡']
        },
        pig: {
            name: '猪',
            stem: '亥',
            fullName: '亥猪',
            element: '水',
            yinYang: '阴',
            direction: '北',
            season: '冬',
            hours: '21:00-23:00',
            years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043],
            personality: '猪是福气和财富的象征。属猪的人诚实善良、热情大方、有福气。他们有着宽广的胸怀和乐观的性格，喜欢享受生活。猪年出生的人通常性格温和、善解人意，有着很好的人缘。',
            strengths: ['诚实善良', '热情大方', '有福气', '有同情心', '乐观开朗'],
            weaknesses: ['过于天真', '容易受骗', '缺乏警惕', '有时懒惰', '不够细心'],
            love: '属猪的人在爱情中温柔体贴，是理想的恋人。他们渴望浪漫的爱情和和谐的家庭生活。需要一个能够给予安全感、理解他们善良内心的伴侣。',
            career: '属猪的人适合从事服务、餐饮、旅游、娱乐等需要热情和福气的工作。他们有很好的人缘和福气。',
            health: '属猪的人需要特别注意肾脏和泌尿系统的健康。由于喜欢享受，容易出现体重问题。',
            luckyNumbers: [2, 5, 8],
            luckyColors: ['黄色', '灰色', '棕色'],
            luckyFlowers: '绣球花、茉莉',
            luckyDirection: '正东、正南',
            avoidNumbers: [1, 3, 6],
            avoidColors: ['红色', '蓝色'],
            compatibleAnimals: ['虎', '兔', '羊'],
            conflictAnimals: ['蛇', '猴']
        }
    },

    /**
     * 根据年份获取生肖
     * @param {number} year - 年份
     * @returns {Object} 生肖信息
     */
    getAnimalByYear(year) {
        const animalKeys = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
        const index = (year - 1900) % 12;
        return this.animals[animalKeys[index]];
    },

    /**
     * 获取生肖兼容性
     * @param {string} animal1 - 第一个生肖key
     * @param {string} animal2 - 第二个生肖key
     * @returns {Object} 兼容性信息
     */
    getCompatibility(animal1, animal2) {
        const a1 = this.animals[animal1];
        const a2 = this.animals[animal2];

        if (!a1 || !a2) return null;

        let score = 50;
        let relationship = '普通';

        if (a1.compatibleAnimals.includes(a2.name)) {
            score += 30;
            relationship = '相合';
        }

        if (a1.conflictAnimals.includes(a2.name)) {
            score -= 30;
            relationship = '相冲';
        }

        return {
            score: Math.max(0, Math.min(score, 100)),
            relationship,
            description: `两人的生肖${relationship}`
        };
    },

    /**
     * 获取所有生肖列表
     * @returns {Array} 生肖列表
     */
    getAllAnimals() {
        return Object.entries(this.animals).map(([key, value]) => ({
            key,
            ...value
        }));
    },

    /**
     * 获取五行相生相克关系
     * @param {string} element - 五行元素
     * @returns {Object} 相生相克关系
     */
    getElementRelations(element) {
        const relations = {
            wood: { generate: '火', control: '土', generatedBy: '水', controlledBy: '金' },
            fire: { generate: '土', control: '金', generatedBy: '木', controlledBy: '水' },
            earth: { generate: '金', control: '水', generatedBy: '火', controlledBy: '木' },
            metal: { generate: '水', control: '木', generatedBy: '土', controlledBy: '火' },
            water: { generate: '木', control: '火', generatedBy: '金', controlledBy: '土' }
        };
        return relations[element];
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChineseZodiacData;
}
