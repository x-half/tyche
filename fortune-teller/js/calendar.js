/**
 * 星辰命理 - 历法转换模块
 * 使用 lunar-javascript 库进行精确的农历转换
 */

const CalendarData = {
    tiangan: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    dizhi: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
    shengxiao: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
    wuxing: ['金', '木', '水', '火', '土'],
    nayin: ['海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火', '涧下水', '城头土', '白蜡金', '杨柳木', '泉中水', '屋上土', '霹雳火', '松柏木', '长流水', '沙中金', '山下火', '平地木', '壁上土', '金箔金', '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水'],
    jieqi: [{month:1,day:6},{month:2,day:4},{month:3,day:6},{month:4,day:5},{month:5,day:6},{month:6,day:6},{month:7,day:7},{month:8,day:7},{month:9,day:8},{month:10,day:8},{month:11,day:7},{month:12,day:7}],
    
    lunarMonthNames: ['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','冬月','腊月'],
    lunarDayNames: ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'],
    
    yiji: {
        yi: ['嫁娶','开光','出行','解除','出火','拆卸','修造','进人口','入宅','移徙','安床','栽种','纳畜','入殓','破土','安葬','启钻','会亲友','开市','交易','立券','挂匾','纳财'],
        ji: ['破土','安葬','行丧','开生坟','嫁娶','入宅','移徙','动土','祈福','求嗣','开光','出行','解除','出火','拆卸','修造','进人口','安床','栽种','纳畜','会亲友']
    },
    
    /**
     * 农历转阳历
     */
    lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeapMonth = false) {
        try {
            const lunar = Lunar.fromYmd(lunarYear, lunarMonth, lunarDay);
            const solar = lunar.getSolar();
            return { year: solar.getYear(), month: solar.getMonth(), day: solar.getDay() };
        } catch (e) {
            console.error('农历转换错误:', e);
            return { year: lunarYear, month: 1, day: 1 };
        }
    },
    
    /**
     * 阳历转农历
     */
    solarToLunar(year, month, day) {
        try {
            const solar = Solar.fromYmd(year, month, day);
            const lunar = solar.getLunar();
            const monthNum = lunar.getMonth();
            const dayNum = lunar.getDay();
            const isLeap = lunar.getMonth() < 0;
            const absMonth = Math.abs(monthNum);
            
            return {
                year: lunar.getYear(),
                month: absMonth,
                monthName: this.lunarMonthNames[(absMonth - 1) % 12],
                day: dayNum,
                dayName: this.lunarDayNames[Math.min(dayNum - 1, 29)],
                isLeap: isLeap
            };
        } catch (e) {
            console.error('阳历转换错误:', e);
            return { year, month, monthName: '正月', day, dayName: '初一', isLeap: false };
        }
    },
    
    getYearGanZhi(y) { 
        return this.tiangan[(y - 4) % 10] + this.dizhi[(y - 4) % 12]; 
    },
    
    getMonthGanZhi(y, m, d) {
        let m2 = m - 1;
        const jq = this.jieqi.find(j => j.month === m);
        if (jq && d >= jq.day) m2 = m;
        return this.tiangan[((y - 4) % 10 * 2 + m2) % 10] + this.dizhi[(m2 + 1) % 12];
    },
    
    getDayGanZhi(y, m, d) {
        const diff = Math.floor((new Date(y, m - 1, d) - new Date(1900, 0, 1)) / 86400000);
        return this.tiangan[(diff + 10) % 10] + this.dizhi[(diff + 10) % 12];
    },
    
    getHourGanZhi(dg, h) {
        const z = Math.floor((h + 1) / 2) % 12;
        return this.tiangan[(this.tiangan.indexOf(dg) * 2 + z) % 10] + this.dizhi[z];
    },
    
    getBaZi(y, m, d, h = null) {
        const yr = this.getYearGanZhi(y);
        const mo = this.getMonthGanZhi(y, m, d);
        const da = this.getDayGanZhi(y, m, d);
        let hr = '未知';
        if (h !== null) hr = this.getHourGanZhi(da[0], h);
        return { 
            year: yr, 
            month: mo, 
            day: da, 
            hour: hr, 
            fullBaZi: yr + ' ' + mo + ' ' + da + (hr !== '未知' ? ' ' + hr : '') 
        };
    },
    
    getNayin(gz) {
        const gi = this.tiangan.indexOf(gz[0]);
        const zi = this.dizhi.indexOf(gz[1]);
        return this.nayin[Math.floor((gi * 12 + zi) / 2) % 30];
    },
    
    getYiJi(dg) {
        const gi = this.tiangan.indexOf(dg[0]);
        const zi = this.dizhi.indexOf(dg[1]);
        return {
            yi: [...this.yiji.yi].sort(() => 0.5 - Math.random()).slice(0, 6 + gi % 3),
            ji: [...this.yiji.ji].sort(() => 0.5 - Math.random()).slice(0, 5 + zi % 3)
        };
    },
    
    getDateInfo(year, month, day, hour = null, calendarType = 'solar') {
        let sy, sm, sd, lunar;
        
        if (calendarType === 'lunar') {
            const s = this.lunarToSolar(year, month, day);
            sy = s.year;
            sm = s.month;
            sd = s.day;
            lunar = { 
                year, 
                month, 
                monthName: this.lunarMonthNames[(month - 1) % 12], 
                day, 
                dayName: this.lunarDayNames[Math.min(day - 1, 29)], 
                isLeap: false 
            };
        } else {
            sy = year;
            sm = month;
            sd = day;
            lunar = this.solarToLunar(year, month, day);
        }
        
        const bazi = this.getBaZi(sy, sm, sd, hour);
        const shengxiao = this.shengxiao[(this.dizhi.indexOf(bazi.year[1]) + 12) % 12];
        
        return { 
            solar: { year: sy, month: sm, day: sd, hour }, 
            lunar, 
            bazi, 
            shengxiao, 
            yiji: this.getYiJi(bazi.day) 
        };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalendarData;
}
