/**
 * 星辰命理 - 星座知识库
 * 基于西方占星学的十二星座详细数据
 */

const AstrologyData = {
    signs: {
        aries: {
            name: '白羊座',
            symbol: '♈',
            englishName: 'Aries',
            dateRange: '3月21日 - 4月19日',
            element: '火象星座',
            quality: '开创宫',
            rulingPlanet: '火星',
            house: 1,
            keywords: ['热情', '勇敢', '直接', '冲动', '领导力', '竞争'],
            personality: '白羊座是黄道十二宫的第一个星座，象征着新的开始和原始的生命力。作为火象星座的开创宫，白羊座天生具有领导才能和开拓精神。他们热情洋溢、勇往直前，面对挑战从不退缩。火星赋予了白羊座强大的行动力和竞争意识，使他们在任何领域都能成为先锋。',
            strengths: ['行动力强', '勇于开拓', '乐观积极', '忠诚可靠', '有领导才能'],
            weaknesses: ['冲动急躁', '缺乏耐心', '自我中心', '容易放弃', '不够细腻'],
            love: '在爱情中，白羊座热情似火，追求刺激和浪漫。他们喜欢主动出击，但有时会因为太过冲动而忽略对方的感受。理想的伴侣需要能够理解他们的热情，同时也能给予适当的空间。',
            career: '白羊座适合需要开拓精神和行动力的工作，如创业者、运动员、销售、军事等。他们喜欢挑战，不适合单调重复的工作。',
            health: '白羊座需要特别注意头部和面部的健康，容易出现头痛、面部问题。由于性格急躁，也需要注意心血管健康。建议通过运动释放多余的精力。',
            luckyNumbers: [1, 8, 17],
            luckyColors: ['红色', '橙色'],
            luckyDays: '星期二',
            compatibleSigns: ['狮子座', '射手座', '双子座', '水瓶座'],
            birthstone: '钻石',
            flower: '雏菊',
            country: '英国',
            city: '佛罗伦萨'
        },
        taurus: {
            name: '金牛座',
            symbol: '♉',
            englishName: 'Taurus',
            dateRange: '4月20日 - 5月20日',
            element: '土象星座',
            quality: '固定宫',
            rulingPlanet: '金星',
            house: 2,
            keywords: ['稳重', '务实', '忠诚', '固执', '享乐', '艺术'],
            personality: '金牛座是黄道十二宫的第二个星座，代表着物质世界的价值与享受。作为土象星座的固定宫，金牛座性格稳重、踏实，追求安全感和舒适的生活。金星赋予了他们对美的敏锐感知和对高品质生活的追求。',
            strengths: ['可靠稳重', '耐心持久', '忠诚专一', '品味出众', '善于理财'],
            weaknesses: ['固执己见', '占有欲强', '过于保守', '贪图享乐', '变化困难'],
            love: '金牛座在爱情中忠诚专一，追求稳定长久的关系。他们用行动表达爱意，喜欢用物质和陪伴来证明自己的心意。需要一个能够给予安全感、懂得享受生活的伴侣。',
            career: '金牛座适合稳定且有实际回报的工作，如金融、农业、美食、艺术、设计等。他们有很强的审美能力和商业头脑。',
            health: '金牛座需要特别注意咽喉、颈部和甲状腺的健康。由于喜欢美食，容易出现体重问题。建议保持规律的运动习惯。',
            luckyNumbers: [2, 6, 9],
            luckyColors: ['粉色', '绿色'],
            luckyDays: '星期五',
            compatibleSigns: ['处女座', '摩羯座', '巨蟹座', '双鱼座'],
            birthstone: '祖母绿',
            flower: '玫瑰',
            country: '法国',
            city: '都柏林'
        },
        gemini: {
            name: '双子座',
            symbol: '♊',
            englishName: 'Gemini',
            dateRange: '5月21日 - 6月21日',
            element: '风象星座',
            quality: '变动宫',
            rulingPlanet: '水星',
            house: 3,
            keywords: ['聪明', '好奇', '善变', '沟通', '灵活', '多才'],
            personality: '双子座是黄道十二宫的第三个星座，象征着思想的交流与变化。作为风象星座的变动宫，双子座思维敏捷、反应迅速，对世界充满好奇心。水星赋予了他们卓越的沟通能力和学习能力。',
            strengths: ['聪明机智', '适应力强', '善于沟通', '好奇心强', '多才多艺'],
            weaknesses: ['善变不定', '表面肤浅', '缺乏专注', '焦虑紧张', '优柔寡断'],
            love: '双子座在爱情中追求智识的契合和精神的交流。他们需要一个能够跟上他们思维节奏、有趣且不无聊的伴侣。害怕被束缚，需要一定的自由空间。',
            career: '双子座适合需要沟通和思维能力的工作，如记者、作家、教师、销售、公关等。他们能够同时处理多项任务，但可能需要选择一个专注的领域。',
            health: '双子座需要特别注意肺部、手臂和神经系统的健康。由于思维活跃，容易出现焦虑和失眠问题。建议通过冥想或运动来放松身心。',
            luckyNumbers: [5, 7, 14],
            luckyColors: ['黄色', '银色'],
            luckyDays: '星期三',
            compatibleSigns: ['天秤座', '水瓶座', '白羊座', '狮子座'],
            birthstone: '珍珠',
            flower: '薰衣草',
            country: '美国',
            city: '伦敦'
        },
        cancer: {
            name: '巨蟹座',
            symbol: '♋',
            englishName: 'Cancer',
            dateRange: '6月22日 - 7月22日',
            element: '水象星座',
            quality: '开创宫',
            rulingPlanet: '月亮',
            house: 4,
            keywords: ['温柔', '顾家', '敏感', '情绪化', '保护', '直觉'],
            personality: '巨蟹座是黄道十二宫的第四个星座，象征着家庭和情感的归属。作为水象星座的开创宫，巨蟹座情感丰富、重视家庭，有着强烈的保护欲。月亮赋予了他们敏锐的直觉和细腻的情感。',
            strengths: ['温柔体贴', '忠诚可靠', '直觉敏锐', '善于照顾人', '记忆力强'],
            weaknesses: ['情绪多变', '过于敏感', '逃避现实', '依赖性强', '容易受伤'],
            love: '巨蟹座在爱情中渴望温暖和安全感，是理想的恋人和伴侣。他们用全部的心去爱，但也需要对方给予足够的安全感和回应。重视家庭，希望与伴侣建立温馨的家庭。',
            career: '巨蟹座适合需要关怀和照顾他人的工作，如护理、教育、餐饮、房地产等。他们有很强的同理心，能够理解他人的需求。',
            health: '巨蟹座需要特别注意胸部、胃部和消化系统的健康。情绪波动较大，容易影响消化功能。建议保持情绪的稳定，学会释放压力。',
            luckyNumbers: [2, 7, 11],
            luckyColors: ['银色', '白色'],
            luckyDays: '星期一',
            compatibleSigns: ['天蝎座', '双鱼座', '金牛座', '处女座'],
            birthstone: '珍珠',
            flower: '百合',
            country: '荷兰',
            city: '阿姆斯特丹'
        },
        leo: {
            name: '狮子座',
            symbol: '♌',
            englishName: 'Leo',
            dateRange: '7月23日 - 8月22日',
            element: '火象星座',
            quality: '固定宫',
            rulingPlanet: '太阳',
            house: 5,
            keywords: ['自信', '热情', '大方', '骄傲', '领导', '创意'],
            personality: '狮子座是黄道十二宫的第五个星座，象征着创造力和自我表达。作为火象星座的固定宫，狮子座自信、热情、光芒四射。太阳赋予了他们强大的生命力和领袖气质，使他们天生就是舞台的焦点。',
            strengths: ['自信大方', '热情开朗', '有领导力', '慷慨仁慈', '创意十足'],
            weaknesses: ['骄傲自负', '爱慕虚荣', '独断专行', '嫉妒心强', '不能接受批评'],
            love: '狮子座在爱情中热情奔放，喜欢用华丽的方式表达爱意。他们渴望被崇拜和欣赏，需要一个能够配合他们的光芒、给予足够关注的伴侣。',
            career: '狮子座适合需要表现力和领导力的工作，如演员、导演、政治家、管理等。他们有很强的创意能力和组织能力。',
            health: '狮子座需要特别注意心脏、脊柱和背部的健康。由于性格骄傲，容易积累压力。建议适当放松，学会接受他人的帮助。',
            luckyNumbers: [1, 3, 10],
            luckyColors: ['金色', '橙色'],
            luckyDays: '星期日',
            compatibleSigns: ['白羊座', '射手座', '双子座', '天秤座'],
            birthstone: '红宝石',
            flower: '向日葵',
            country: '意大利',
            city: '罗马'
        },
        virgo: {
            name: '处女座',
            symbol: '♍',
            englishName: 'Virgo',
            dateRange: '8月23日 - 9月22日',
            element: '土象星座',
            quality: '变动宫',
            rulingPlanet: '水星',
            house: 6,
            keywords: ['完美', '细致', '务实', '挑剔', '健康', '服务'],
            personality: '处女座是黄道十二宫的第六个星座，象征着完美和服务。作为土象星座的变动宫，处女座追求完美、注重细节、务实可靠。水星赋予了他们敏锐的分析能力和批判性思维。',
            strengths: ['细心周到', '追求完美', '务实可靠', '善于分析', '乐于助人'],
            weaknesses: ['过于挑剔', '焦虑紧张', '保守谨慎', '吹毛求疵', '过度劳累'],
            love: '处女座在爱情中谨慎认真，不会轻易开始一段感情。他们用行动表达爱意，会为伴侣做很多实际的事情。需要一个能够理解他们追求完美、给予耐心的伴侣。',
            career: '处女座适合需要细致和专业能力的工作，如医生、会计、编辑、研究等。他们有很强的分析能力和执行力。',
            health: '处女座需要特别注意肠道、腹部和神经系统的健康。由于追求完美，容易出现焦虑和消化问题。建议学会放松，不要给自己太大压力。',
            luckyNumbers: [5, 14, 23],
            luckyColors: ['灰色', '米色'],
            luckyDays: '星期三',
            compatibleSigns: ['金牛座', '摩羯座', '巨蟹座', '天蝎座'],
            birthstone: '蓝宝石',
            flower: '玫瑰',
            country: '希腊',
            city: '巴黎'
        },
        libra: {
            name: '天秤座',
            symbol: '♎',
            englishName: 'Libra',
            dateRange: '9月23日 - 10月23日',
            element: '风象星座',
            quality: '开创宫',
            rulingPlanet: '金星',
            house: 7,
            keywords: ['平衡', '和谐', '优雅', '犹豫', '公正', '社交'],
            personality: '天秤座是黄道十二宫的第七个星座，象征着平衡和关系。作为风象星座的开创宫，天秤座追求和谐、注重美感、善于社交。金星赋予了他们优雅的气质和对美的追求。',
            strengths: ['优雅和谐', '善于社交', '公正客观', '有外交手腕', '追求平衡'],
            weaknesses: ['犹豫不决', '逃避冲突', '过于依赖', '优柔寡断', '虚伪'],
            love: '天秤座在爱情中追求浪漫和和谐，是理想的恋人。他们重视伴侣关系，会努力维持感情的平衡。需要一个能够给予安全感、理解他们社交需求的伴侣。',
            career: '天秤座适合需要人际交往和审美能力的工作，如外交、法律、艺术、设计等。他们有很强的社交能力和公正的判断力。',
            health: '天秤座需要特别注意肾脏、腰部和皮肤的健康。由于追求平衡，容易出现内分泌失调问题。建议保持生活的规律性。',
            luckyNumbers: [6, 9, 15],
            luckyColors: ['粉色', '蓝色'],
            luckyDays: '星期五',
            compatibleSigns: ['双子座', '水瓶座', '狮子座', '射手座'],
            birthstone: '蛋白石',
            flower: '玫瑰',
            country: '奥地利',
            city: '维也纳'
        },
        scorpio: {
            name: '天蝎座',
            symbol: '♏',
            englishName: 'Scorpio',
            dateRange: '10月24日 - 11月22日',
            element: '水象星座',
            quality: '固定宫',
            rulingPlanet: '冥王星',
            house: 8,
            keywords: ['神秘', '深沉', '执着', '洞察', '变革', '激情'],
            personality: '天蝎座是黄道十二宫的第八个星座，象征着转化和重生。作为水象星座的固定宫，天蝎座情感深沉、意志坚定、洞察力强。冥王星赋予了他们强大的意志力和变革的能力。',
            strengths: ['意志坚定', '洞察力强', '忠诚可靠', '有魅力', '善于隐藏'],
            weaknesses: ['占有欲强', '报复心重', '多疑猜忌', '极端偏执', '控制欲强'],
            love: '天蝎座在爱情中全情投入，追求灵魂深处的连接。他们的爱深沉而强烈，但也可能带来压力。需要一个能够理解他们的深度、给予信任的伴侣。',
            career: '天蝎座适合需要洞察力和专业深度的工作，如心理学、侦探、研究、金融等。他们有很强的专注力和分析能力。',
            health: '天蝎座需要特别注意生殖系统、泌尿系统和心理健康的保护。由于情感深沉，容易积累负面情绪。建议学会释放和转化情绪。',
            luckyNumbers: [4, 13, 22],
            luckyColors: ['深红色', '黑色'],
            luckyDays: '星期二',
            compatibleSigns: ['巨蟹座', '双鱼座', '处女座', '摩羯座'],
            birthstone: '黄玉',
            flower: '菊花',
            country: '挪威',
            city: '利物浦'
        },
        sagittarius: {
            name: '射手座',
            symbol: '♐',
            englishName: 'Sagittarius',
            dateRange: '11月23日 - 12月21日',
            element: '火象星座',
            quality: '变动宫',
            rulingPlanet: '木星',
            house: 9,
            keywords: ['自由', '乐观', '冒险', '哲学', '直率', '探索'],
            personality: '射手座是黄道十二宫的第九个星座，象征着探索和智慧。作为火象星座的变动宫，射手座热爱自由、乐观开朗、追求真理。木星赋予了他们宽广的视野和好运。',
            strengths: ['乐观开朗', '热爱自由', '诚实直率', '思想开放', '有冒险精神'],
            weaknesses: ['粗心大意', '缺乏耐心', '过于理想主义', '承诺困难', '不够细心'],
            love: '射手座在爱情中追求自由和真实的连接。他们害怕被束缚，需要一个能够理解他们探索精神的伴侣。喜欢与伴侣一起旅行和探索世界。',
            career: '射手座适合需要自由和探索的工作，如旅行家、哲学家、教育、出版等。他们有很强的适应能力和学习能力。',
            health: '射手座需要特别注意臀部、大腿和肝脏的健康。由于喜欢冒险，容易出现运动损伤。建议在运动时注意安全。',
            luckyNumbers: [3, 7, 9],
            luckyColors: ['紫色', '蓝色'],
            luckyDays: '星期四',
            compatibleSigns: ['白羊座', '狮子座', '天秤座', '水瓶座'],
            birthstone: '绿松石',
            flower: '康乃馨',
            country: '西班牙',
            city: '马德里'
        },
        capricorn: {
            name: '摩羯座',
            symbol: '♑',
            englishName: 'Capricorn',
            dateRange: '12月22日 - 1月19日',
            element: '土象星座',
            quality: '开创宫',
            rulingPlanet: '土星',
            house: 10,
            keywords: ['稳重', '务实', '野心', '保守', '责任', '耐力'],
            personality: '摩羯座是黄道十二宫的第十个星座，象征着成就和责任。作为土象星座的开创宫，摩羯座脚踏实地、有野心、重视责任。土星赋予了他们坚韧的意志和长远的眼光。',
            strengths: ['脚踏实地', '有责任心', '意志坚定', '善于规划', '有野心'],
            weaknesses: ['过于保守', '缺乏情趣', '太在意地位', '不够灵活', '容易孤独'],
            love: '摩羯座在爱情中认真负责，追求稳定长久的关系。他们用行动表达爱意，会为家庭和未来努力奋斗。需要一个能够理解他们事业心、给予支持的伴侣。',
            career: '摩羯座适合需要长期规划和责任感的工作，如管理、政治、金融、建筑等。他们有很强的组织能力和执行力。',
            health: '摩羯座需要特别注意骨骼、关节和皮肤的健康。由于工作压力大，容易出现腰背疼痛和皮肤问题。建议保持正确的坐姿和适当的运动。',
            luckyNumbers: [4, 8, 13],
            luckyColors: ['黑色', '深灰色'],
            luckyDays: '星期六',
            compatibleSigns: ['金牛座', '处女座', '天蝎座', '双鱼座'],
            birthstone: '石榴石',
            flower: '常春藤',
            country: '墨西哥',
            city: '波士顿'
        },
        aquarius: {
            name: '水瓶座',
            symbol: '♒',
            englishName: 'Aquarius',
            dateRange: '1月20日 - 2月18日',
            element: '风象星座',
            quality: '固定宫',
            rulingPlanet: '天王星',
            house: 11,
            keywords: ['独立', '创新', '人道', '叛逆', '友谊', '未来'],
            personality: '水瓶座是黄道十二宫的第十一个星座，象征着创新和人道主义。作为风象星座的固定宫，水瓶座独立自主、思想前卫、重视友情。天王星赋予了他们独特的视角和创新的能力。',
            strengths: ['独立自主', '思想前卫', '有创新精神', '重视友情', '人道主义'],
            weaknesses: ['过于叛逆', '情感疏离', '固执己见', '难以理解', '过于理想主义'],
            love: '水瓶座在爱情中追求精神的契合和独立的空间。他们害怕被束缚，需要一个能够理解他们独立精神的伴侣。喜欢与伴侣建立深厚的友谊基础。',
            career: '水瓶座适合需要创新思维和独立性的工作，如科技、社会工作、艺术、研究等。他们有很强的创新能力和社会责任感。',
            health: '水瓶座需要特别注意小腿、脚踝和循环系统的健康。由于思维活跃，容易出现失眠和神经衰弱问题。建议保持规律的作息。',
            luckyNumbers: [4, 7, 11],
            luckyColors: ['蓝色', '银色'],
            luckyDays: '星期三',
            compatibleSigns: ['双子座', '天秤座', '白羊座', '射手座'],
            birthstone: '紫水晶',
            flower: '兰花',
            country: '俄罗斯',
            city: '赫尔辛基'
        },
        pisces: {
            name: '双鱼座',
            symbol: '♓',
            englishName: 'Pisces',
            dateRange: '2月19日 - 3月20日',
            element: '水象星座',
            quality: '变动宫',
            rulingPlanet: '海王星',
            house: 12,
            keywords: ['梦幻', '直觉', '同理心', '艺术', '牺牲', '神秘'],
            personality: '双鱼座是黄道十二宫的最后一个星座，象征着灵性和无意识。作为水象星座的变动宫，双鱼座富有同理心、直觉敏锐、充满艺术气息。海王星赋予了他们丰富的想象力和超凡的直觉。',
            strengths: ['富有同理心', '直觉敏锐', '艺术天赋', '温柔善良', '想象力丰富'],
            weaknesses: ['逃避现实', '优柔寡断', '过度敏感', '容易受影响', '缺乏实际'],
            love: '双鱼座在爱情中浪漫梦幻，渴望灵魂的连接。他们用全部的心去爱，但也容易受伤。需要一个能够给予安全感、保护他们的伴侣。',
            career: '双鱼座适合需要艺术感和同理心的工作，如艺术、音乐、护理、心理咨询等。他们有很强的创造力和直觉能力。',
            health: '双鱼座需要特别注意脚部、免疫系统和心理健康的保护。由于敏感，容易受到外界影响。建议保持内心的平静，学会保护自己。',
            luckyNumbers: [3, 7, 12],
            luckyColors: ['海蓝色', '紫色'],
            luckyDays: '星期四',
            compatibleSigns: ['巨蟹座', '天蝎座', '金牛座', '摩羯座'],
            birthstone: '海蓝宝',
            flower: '睡莲',
            country: '葡萄牙',
            city: '亚历山大'
        }
    },

    /**
     * 根据月日获取星座
     * @param {number} month - 月份 (1-12)
     * @param {number} day - 日期 (1-31)
     * @returns {Object} 星座信息
     */
    getSignByDate(month, day) {
        const dates = [
            { sign: 'capricorn', start: [12, 22], end: [1, 19] },
            { sign: 'aquarius', start: [1, 20], end: [2, 18] },
            { sign: 'pisces', start: [2, 19], end: [3, 20] },
            { sign: 'aries', start: [3, 21], end: [4, 19] },
            { sign: 'taurus', start: [4, 20], end: [5, 20] },
            { sign: 'gemini', start: [5, 21], end: [6, 21] },
            { sign: 'cancer', start: [6, 22], end: [7, 22] },
            { sign: 'leo', start: [7, 23], end: [8, 22] },
            { sign: 'virgo', start: [8, 23], end: [9, 22] },
            { sign: 'libra', start: [9, 23], end: [10, 23] },
            { sign: 'scorpio', start: [10, 24], end: [11, 22] },
            { sign: 'sagittarius', start: [11, 23], end: [12, 21] }
        ];

        for (const date of dates) {
            const [startMonth, startDay] = date.start;
            const [endMonth, endDay] = date.end;

            if (startMonth > endMonth) {
                // 跨年的情况（摩羯座）
                if ((month === startMonth && day >= startDay) || 
                    (month === endMonth && day <= endDay)) {
                    return this.signs[date.sign];
                }
            } else {
                if ((month === startMonth && day >= startDay) || 
                    (month === endMonth && day <= endDay) ||
                    (month > startMonth && month < endMonth)) {
                    return this.signs[date.sign];
                }
            }
        }

        // 默认返回摩羯座（边界情况）
        return this.signs.capricorn;
    },

    /**
     * 获取星座兼容性
     * @param {string} sign1 - 第一个星座key
     * @param {string} sign2 - 第二个星座key
     * @returns {Object} 兼容性信息
     */
    getCompatibility(sign1, sign2) {
        const s1 = this.signs[sign1];
        const s2 = this.signs[sign2];

        if (!s1 || !s2) return null;

        const elementMatch = s1.element === s2.element;
        const qualityMatch = s1.quality === s2.quality;

        let score = 50;
        if (elementMatch) score += 20;
        if (s1.compatibleSigns.includes(s2.name)) score += 30;
        if (s2.compatibleSigns.includes(s1.name)) score += 30;
        if (qualityMatch) score -= 10;

        return {
            score: Math.min(score, 100),
            elementMatch,
            description: elementMatch ? 
                '同属一个元素，有着天然的默契和理解' : 
                '不同元素的组合，需要更多的理解和包容'
        };
    },

    /**
     * 获取所有星座列表
     * @returns {Array} 星座列表
     */
    getAllSigns() {
        return Object.entries(this.signs).map(([key, value]) => ({
            key,
            ...value
        }));
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AstrologyData;
}
