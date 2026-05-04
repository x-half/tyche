const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 考试宝API接口分析
// 通过浏览器开发者工具分析网络请求，获取题目数据的API

const KaoShiBaoAPI = {
    // 基础URL
    baseURL: 'https://www.kaoshibao.com',
    
    // 获取题库列表
    async getPaperList(keyword = '软考') {
        try {
            const response = await axios.get(`${this.baseURL}/ks/search`, {
                params: {
                    text: keyword,
                    page: 1,
                    size: 20
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json',
                    'Referer': 'https://www.kaoshibao.com/'
                }
            });
            return response.data;
        } catch (error) {
            console.error('获取题库列表失败:', error.message);
            return null;
        }
    },
    
    // 获取试卷题目
    async getQuestions(paperId) {
        try {
            const response = await axios.get(`${this.baseURL}/ks/paper/questions`, {
                params: {
                    paperId: paperId,
                    practice: 1
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json',
                    'Referer': `https://www.kaoshibao.com/online/?paperId=${paperId}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('获取题目失败:', error.message);
            return null;
        }
    },
    
    // 搜索软考相关题库
    async searchRuanKaoPapers() {
        const keywords = [
            '软件设计师',
            '网络工程师', 
            '信息安全工程师',
            '数据库系统工程师',
            '信息系统管理工程师'
        ];
        
        const results = [];
        
        for (const keyword of keywords) {
            console.log(`搜索: ${keyword}`);
            const data = await this.getPaperList(keyword);
            if (data && data.list) {
                results.push({
                    keyword,
                    papers: data.list
                });
            }
            // 避免请求过快
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        return results;
    }
};

// 使用Puppeteer进行更深入的爬取
const puppeteer = require('puppeteer');

class KaoShiBaoScraper {
    constructor() {
        this.browser = null;
        this.page = null;
    }
    
    async init() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.page = await this.browser.newPage();
        
        // 设置User-Agent
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
    
    // 搜索题库
    async searchPapers(keyword) {
        console.log(`正在搜索: ${keyword}`);
        
        try {
            await this.page.goto(`https://www.kaoshibao.com/online/?text=${encodeURIComponent(keyword)}`, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });
            
            // 等待页面加载
            await this.page.waitForSelector('.paper-list, .search-result', { timeout: 10000 }).catch(() => {});
            
            // 获取题库列表
            const papers = await this.page.evaluate(() => {
                const items = document.querySelectorAll('.paper-item, .search-item, [class*="paper"]');
                return Array.from(items).map(item => {
                    const title = item.querySelector('.paper-title, .title, h3')?.textContent?.trim();
                    const link = item.querySelector('a')?.href;
                    const count = item.querySelector('.paper-count, .count, [class*="num"]')?.textContent?.trim();
                    return { title, link, count };
                }).filter(p => p.title);
            });
            
            return papers;
        } catch (error) {
            console.error(`搜索失败: ${error.message}`);
            return [];
        }
    }
    
    // 获取试卷题目
    async getQuestions(paperUrl) {
        console.log(`正在获取题目: ${paperUrl}`);
        
        try {
            await this.page.goto(paperUrl, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });
            
            // 等待题目加载
            await this.page.waitForSelector('.question, .topic, [class*="question"]', { timeout: 10000 }).catch(() => {});
            
            // 拦截网络请求，获取题目数据
            const questions = await this.page.evaluate(() => {
                // 尝试从页面中提取题目
                const questionElements = document.querySelectorAll('.question-item, .topic-item, [class*="question"]');
                
                return Array.from(questionElements).map((el, index) => {
                    const text = el.querySelector('.question-text, .topic-text, .stem')?.textContent?.trim();
                    const options = Array.from(el.querySelectorAll('.option, .choice, [class*="option"]')).map(opt => opt.textContent?.trim());
                    const answer = el.querySelector('.answer, [class*="answer"]')?.textContent?.trim();
                    
                    return {
                        id: `q-${index + 1}`,
                        text: text || '',
                        options: options,
                        answer: answer || ''
                    };
                }).filter(q => q.text);
            });
            
            return questions;
        } catch (error) {
            console.error(`获取题目失败: ${error.message}`);
            return [];
        }
    }
    
    // 监听网络请求，获取API数据
    async interceptAPI(paperId) {
        const apiData = [];
        
        // 监听XHR请求
        this.page.on('response', async (response) => {
            const url = response.url();
            if (url.includes('/api/') || url.includes('/ks/') || url.includes('question')) {
                try {
                    const json = await response.json();
                    apiData.push({
                        url,
                        data: json
                    });
                } catch (e) {}
            }
        });
        
        await this.page.goto(`https://www.kaoshibao.com/online/?paperId=${paperId}`, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        // 等待API请求完成
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        return apiData;
    }
    
    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// 导出模块
module.exports = { KaoShiBaoAPI, KaoShiBaoScraper };

// 命令行执行
if (require.main === module) {
    const scraper = new KaoShiBaoScraper();
    
    (async () => {
        try {
            await scraper.init();
            
            // 搜索软考题库
            const keywords = ['软件设计师', '网络工程师'];
            
            for (const keyword of keywords) {
                const papers = await scraper.searchPapers(keyword);
                console.log(`\n${keyword} 相关题库:`);
                papers.forEach(p => {
                    console.log(`  - ${p.title} (${p.count || '未知题量'})`);
                });
            }
            
            // 尝试拦截API获取数据
            console.log('\n尝试拦截API请求...');
            const apiData = await scraper.interceptAPI('26595007');
            console.log('捕获到API请求:', apiData.length);
            
            // 保存API数据
            if (apiData.length > 0) {
                fs.writeFileSync('api-data.json', JSON.stringify(apiData, null, 2));
                console.log('API数据已保存到 api-data.json');
            }
            
        } catch (error) {
            console.error('爬取失败:', error);
        } finally {
            await scraper.close();
        }
    })();
}
