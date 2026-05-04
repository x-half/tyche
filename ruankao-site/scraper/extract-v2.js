const axios = require('axios');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class RuanKaoExtractor {
    constructor() {
        this.client = axios.create({
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 60000
        });
        this.outputDir = path.join(__dirname, '../data/extracted');
        this.downloadDir = path.join(__dirname, '../downloads');
        
        [this.outputDir, this.downloadDir].forEach(dir => {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        });
    }

    async getRepoFiles(owner, repo, dirPath = '') {
        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`;
            const response = await this.client.get(url);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            return [];
        }
    }

    async getAllFiles(owner, repo, dirPath = '', depth = 0) {
        if (depth > 3) return [];
        const files = [];
        const items = await this.getRepoFiles(owner, repo, dirPath);
        
        for (const item of items) {
            if (item.type === 'file') {
                const ext = path.extname(item.name).toLowerCase();
                if (['.pdf', '.doc', '.docx', '.txt', '.md'].includes(ext)) {
                    files.push({
                        name: item.name,
                        path: item.path,
                        downloadUrl: item.download_url,
                        size: item.size,
                        ext: ext
                    });
                }
            } else if (item.type === 'dir') {
                await new Promise(r => setTimeout(r, 300));
                const subFiles = await this.getAllFiles(owner, repo, item.path, depth + 1);
                files.push(...subFiles);
            }
        }
        return files;
    }

    async downloadFile(url, filename) {
        const safeName = filename.replace(/[^a-zA-Z0-9\u4e00-\u9fa5._-]/g, '_');
        const filePath = path.join(this.downloadDir, safeName);
        
        if (fs.existsSync(filePath)) {
            return filePath;
        }
        
        try {
            const response = await this.client.get(url, { responseType: 'arraybuffer' });
            fs.writeFileSync(filePath, response.data);
            console.log(`  下载: ${safeName} (${(response.data.length / 1024).toFixed(0)}KB)`);
            return filePath;
        } catch (error) {
            console.error(`  下载失败: ${error.message}`);
            return null;
        }
    }

    async parsePDF(filePath) {
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(dataBuffer);
            return data.text;
        } catch (error) {
            console.error(`  PDF解析失败: ${error.message}`);
            return '';
        }
    }

    async parseWord(filePath) {
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const result = await mammoth.extractRawText({ buffer: dataBuffer });
            return result.value;
        } catch (error) {
            console.error(`  Word解析失败: ${error.message}`);
            return '';
        }
    }

    extractQuestions(text, subjectId, year, session) {
        const questions = [];
        if (!text || text.length < 50) return questions;
        
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        let currentQuestion = null;
        let questionIndex = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 匹配题目: 数字. 或 数字、
            const qMatch = line.match(/^(\d{1,3})[.、．\s]+(.+)/);
            if (qMatch && qMatch[2].length > 10) {
                if (currentQuestion && currentQuestion.options.length >= 2) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    id: `${subjectId}-${year}-${session}-q${++questionIndex}`,
                    text: qMatch[2].trim(),
                    options: [],
                    answer: '',
                    explanation: '',
                    year: year,
                    session: session
                };
                continue;
            }
            
            // 匹配选项: A. B. C. D.
            const optMatch = line.match(/^([A-D])[.、．\s]+(.+)/);
            if (optMatch && currentQuestion) {
                currentQuestion.options.push(`${optMatch[1]}. ${optMatch[2].trim()}`);
                continue;
            }
            
            // 匹配答案
            const ansMatch = line.match(/(?:答案|正确答案)[：:]\s*([A-D])/);
            if (ansMatch && currentQuestion) {
                currentQuestion.answer = ansMatch[1];
                continue;
            }
            
            // 匹配解析
            if (line.includes('解析') && currentQuestion) {
                currentQuestion.explanation = line.replace(/^.*?解析[：:]?\s*/, '');
            }
        }
        
        if (currentQuestion && currentQuestion.options.length >= 2) {
            questions.push(currentQuestion);
        }
        
        return questions;
    }

    extractFileInfo(filename) {
        const yearMatch = filename.match(/(20[2-9]\d)/);
        let year = yearMatch ? parseInt(yearMatch[1]) : 0;
        
        let session = '未知';
        if (filename.includes('上') || filename.includes('一')) session = '上半年';
        else if (filename.includes('下') || filename.includes('二')) session = '下半年';
        
        return { year, session };
    }

    async processRepo(owner, repo, subjectId) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`处理: ${owner}/${repo} (${subjectId})`);
        console.log('='.repeat(50));
        
        const files = await this.getAllFiles(owner, repo);
        console.log(`找到 ${files.length} 个文件`);
        
        const allQuestions = [];
        
        for (const file of files) {
            const { year, session } = this.extractFileInfo(file.name);
            
            // 只处理2020年及以后的文件
            if (year < 2020) continue;
            
            console.log(`\n处理: ${file.name} (${year}年${session})`);
            
            const filePath = await this.downloadFile(file.downloadUrl, `${subjectId}_${file.name}`);
            if (!filePath) continue;
            
            let text = '';
            if (file.ext === '.pdf') {
                text = await this.parsePDF(filePath);
            } else if (['.doc', '.docx'].includes(file.ext)) {
                text = await this.parseWord(filePath);
            } else {
                text = fs.readFileSync(filePath, 'utf-8');
            }
            
            if (!text || text.length < 100) {
                console.log(`  内容过短，跳过`);
                continue;
            }
            
            const questions = this.extractQuestions(text, subjectId, year, session);
            console.log(`  提取: ${questions.length} 题`);
            
            if (questions.length > 0) {
                allQuestions.push(...questions);
            }
            
            await new Promise(r => setTimeout(r, 500));
        }
        
        return allQuestions;
    }

    saveQuestionBank(subjectId, questions) {
        const outputFile = path.join(this.outputDir, `${subjectId}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2));
        
        const stats = {};
        questions.forEach(q => {
            const key = `${q.year}年${q.session}`;
            stats[key] = (stats[key] || 0) + 1;
        });
        
        console.log(`\n保存: ${outputFile}`);
        console.log(`总计: ${questions.length} 题`);
        Object.entries(stats).sort().forEach(([k, v]) => console.log(`  ${k}: ${v} 题`));
        
        return { total: questions.length, stats };
    }
}

async function main() {
    const extractor = new RuanKaoExtractor();
    
    console.log('=== 软考真题提取器 ===\n');
    
    const repos = [
        { owner: 'OrangeHao', repo: 'Software-level-test', subject: 'software-designer' },
        { owner: 'rendong3', repo: 'ruankao', subject: 'database-engineer' },
        { owner: 'youdianniubi', repo: 'ruankao-True-Questions', subject: 'network-engineer' }
    ];
    
    const summary = {};
    
    for (const { owner, repo, subject } of repos) {
        try {
            const questions = await extractor.processRepo(owner, repo, subject);
            if (questions.length > 0) {
                summary[subject] = extractor.saveQuestionBank(subject, questions);
            } else {
                console.log(`\n${subject}: 未提取到题目`);
                summary[subject] = { total: 0, stats: {} };
            }
        } catch (error) {
            console.error(`${subject} 处理失败:`, error.message);
            summary[subject] = { total: 0, error: error.message };
        }
    }
    
    const summaryFile = path.join(extractor.outputDir, 'summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    
    console.log('\n\n=== 完成 ===');
    Object.entries(summary).forEach(([k, v]) => console.log(`${k}: ${v.total} 题`));
}

main().catch(console.error);
