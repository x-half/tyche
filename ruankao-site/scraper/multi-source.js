const axios = require('axios');
const fs = require('fs');

// 多源软考题库爬虫
class RuanKaoScraper {
    constructor() {
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
        };
    }
    
    // 从51CTO获取题目
    async get51CTOQuestions() {
        try {
            const response = await axios.get('https://www.5cto.com/ruankao/', {
                headers: this.headers,
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error('51CTO获取失败:', error.message);
            return null;
        }
    }
    
    // 从希赛网获取题目
    async getXicaiQuestions() {
        try {
            const response = await axios.get('https://www.educity.cn/ruankao/', {
                headers: this.headers,
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error('希赛网获取失败:', error.message);
            return null;
        }
    }
    
    // 从软考网获取题目
    async getRuanKaoWangQuestions() {
        try {
            const response = await axios.get('https://www.rkw.com.cn/', {
                headers: this.headers,
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error('软考网获取失败:', error.message);
            return null;
        }
    }
    
    // 从CSDN等平台搜索软考真题
    async searchFromCSDN(keyword) {
        try {
            const response = await axios.get(`https://so.csdn.net/so/search?q=${encodeURIComponent(keyword + ' 真题')}&t=all`, {
                headers: this.headers,
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error('CSDN搜索失败:', error.message);
            return null;
        }
    }
    
    // 从知乎搜索软考真题
    async searchFromZhihu(keyword) {
        try {
            const response = await axios.get(`https://www.zhihu.com/search?type=content&q=${encodeURIComponent(keyword + ' 真题')}`, {
                headers: this.headers,
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error('知乎搜索失败:', error.message);
            return null;
        }
    }
    
    // 从GitHub搜索软考题库
    async searchFromGitHub(keyword) {
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}&sort=stars&order=desc`, {
                headers: {
                    ...this.headers,
                    'Accept': 'application/vnd.github.v3+json'
                },
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            console.error('GitHub搜索失败:', error.message);
            return null;
        }
    }
    
    // 解析题目数据
    parseQuestions(html, source) {
        // 根据不同来源解析题目
        const questions = [];
        
        // 通用题目匹配模式
        const patterns = {
            // 匹配题目文本
            question: /[0-9]+[.、]\s*(.+?)(?=[A-D][.、]|答案)/gs,
            // 匹配选项
            option: /[A-D][.、]\s*(.+?)(?=[A-D][.、]|答案|$)/g,
            // 匹配答案
            answer: /答案[：:]\s*([A-D])/g,
            // 匹配解析
            explanation: /解析[：:]\s*(.+?)(?=[0-9]+[.、]|$)/gs
        };
        
        return questions;
    }
}

// 主函数
async function main() {
    const scraper = new RuanKaoScraper();
    
    console.log('=== 软考题库多源爬虫 ===\n');
    
    // 搜索GitHub上的软考题库
    console.log('1. 搜索GitHub软考题库...');
    const githubResults = await scraper.searchFromGitHub('软考 真题');
    if (githubResults && githubResults.items) {
        console.log(`找到 ${githubResults.total_count} 个仓库:`);
        githubResults.items.slice(0, 5).forEach((repo, i) => {
            console.log(`  ${i+1}. ${repo.full_name} - ${repo.description?.substring(0, 50) || '无描述'}`);
            console.log(`     Stars: ${repo.stargazers_count} | 链接: ${repo.html_url}`);
        });
        
        // 保存GitHub结果
        fs.writeFileSync('github-results.json', JSON.stringify(githubResults.items.slice(0, 10), null, 2));
    }
    
    // 尝试从其他来源获取
    console.log('\n2. 尝试其他来源...');
    
    const sources = [
        { name: '51CTO', fn: () => scraper.get51CTOQuestions() },
        { name: '希赛网', fn: () => scraper.getXicaiQuestions() },
        { name: '软考网', fn: () => scraper.getRuanKaoWangQuestions() }
    ];
    
    for (const source of sources) {
        console.log(`\n尝试 ${source.name}...`);
        const result = await source.fn();
        if (result) {
            console.log(`  ✓ 获取成功 (${result.length || 0} 字节)`);
        }
    }
}

main().catch(console.error);
