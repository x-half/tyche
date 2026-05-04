const axios = require('axios');
const fs = require('fs');

// 考试宝API爬虫
// 通过分析网页请求获取题目数据

class KaoShiBaoScraper {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://www.kaoshibao.com',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Referer': 'https://www.kaoshibao.com/'
            },
            timeout: 30000
        });
    }
    
    // 搜索题库
    async searchPapers(keyword, page = 1) {
        try {
            const response = await this.client.get('/api/search', {
                params: {
                    text: keyword,
                    page: page,
                    size: 20,
                    type: 'paper'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`搜索失败 [${keyword}]:`, error.message);
            return null;
        }
    }
    
    // 获取试卷详情
    async getPaperDetail(paperId) {
        try {
            const response = await this.client.get('/api/paper/detail', {
                params: { paperId }
            });
            return response.data;
        } catch (error) {
            console.error(`获取试卷详情失败 [${paperId}]:`, error.message);
            return null;
        }
    }
    
    // 获取试卷题目
    async getQuestions(paperId) {
        try {
            const response = await this.client.get('/api/paper/questions', {
                params: {
                    paperId: paperId,
                    practice: 1
                }
            });
            return response.data;
        } catch (error) {
            console.error(`获取题目失败 [${paperId}]:`, error.message);
            return null;
        }
    }
    
    // 尝试不同的API端点
    async tryDifferentEndpoints(paperId) {
        const endpoints = [
            `/api/paper/questions?paperId=${paperId}`,
            `/api/question/list?paperId=${paperId}`,
            `/ks/api/paper/${paperId}/questions`,
            `/api/v1/paper/questions?paperId=${paperId}`,
            `/online/api/questions?paperId=${paperId}`
        ];
        
        const results = {};
        
        for (const endpoint of endpoints) {
            try {
                const response = await this.client.get(endpoint);
                results[endpoint] = {
                    status: response.status,
                    data: response.data
                };
                console.log(`✓ ${endpoint} - 成功`);
            } catch (error) {
                results[endpoint] = {
                    status: error.response?.status || 'error',
                    message: error.message
                };
                console.log(`✗ ${endpoint} - ${error.response?.status || error.message}`);
            }
        }
        
        return results;
    }
    
    // 获取页面HTML分析结构
    async getPageHTML(url) {
        try {
            const response = await this.client.get(url, {
                headers: {
                    'Accept': 'text/html'
                }
            });
            return response.data;
        } catch (error) {
            console.error('获取页面失败:', error.message);
            return null;
        }
    }
}

// 主函数
async function main() {
    const scraper = new KaoShiBaoScraper();
    
    // 保存日志
    const log = [];
    
    console.log('=== 考试宝API分析 ===\n');
    
    // 1. 尝试不同的API端点
    console.log('1. 测试API端点...');
    const endpoints = await scraper.tryDifferentEndpoints('26595007');
    log.push({ type: 'endpoints', data: endpoints });
    
    // 2. 获取页面HTML分析
    console.log('\n2. 获取页面HTML...');
    const html = await scraper.getPageHTML('/online/?paperId=26595007');
    if (html) {
        // 提取可能的API URL
        const apiMatches = html.match(/\/api\/[^"'\s]+/g) || [];
        const fetchMatches = html.match(/fetch\(['"]([^'"]+)['"]\)/g) || [];
        const axiosMatches = html.match(/axios\.[a-z]+\(['"]([^'"]+)['"]\)/g) || [];
        
        console.log('发现的API路径:', [...new Set(apiMatches)]);
        console.log('发现的fetch调用:', fetchMatches);
        console.log('发现的axios调用:', axiosMatches);
        
        log.push({ 
            type: 'html_analysis', 
            apis: apiMatches,
            fetches: fetchMatches,
            axios: axiosMatches
        });
        
        // 保存HTML供分析
        fs.writeFileSync('page.html', html);
        console.log('HTML已保存到 page.html');
    }
    
    // 3. 搜索软考题库
    console.log('\n3. 搜索软考题库...');
    const keywords = ['软件设计师', '网络工程师', '软考'];
    
    for (const keyword of keywords) {
        const result = await scraper.searchPapers(keyword);
        if (result) {
            console.log(`\n${keyword} 搜索结果:`, JSON.stringify(result).substring(0, 200) + '...');
            log.push({ type: 'search', keyword, data: result });
        }
    }
    
    // 保存日志
    fs.writeFileSync('scraper-log.json', JSON.stringify(log, null, 2));
    console.log('\n日志已保存到 scraper-log.json');
}

// 运行
main().catch(console.error);
