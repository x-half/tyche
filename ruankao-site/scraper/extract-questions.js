const axios = require('axios');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

// GitHub软考真题提取器
class RuanKaoExtractor {
    constructor() {
        this.client = axios.create({
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 60000
        });
        this.outputDir = path.join(__dirname, '../data/extracted');
        this.downloadDir = path.join(__dirname, '../downloads');
        
        // 创建目录
        [this.outputDir, this.downloadDir].forEach(dir => {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        });
    }

    // 获取仓库文件列表
    async getRepoFiles(owner, repo, dirPath = '') {
        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`;
            const response = await this.client.get(url);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error(`获取文件列表失败 [${dirPath}]:`, error.message);
            return [];
        }
    }

    // 递归获取所有文件
    async getAllFiles(owner, repo, dirPath = '', depth = 0) {
        if (depth > 3) return []; // 限制深度
        
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

    // 下载文件
    async downloadFile(url, filename) {
        const filePath = path.join(this.downloadDir, filename);
        
        if (fs.existsSync(filePath)) {
            console.log(`  文件已存在: ${filename}`);
            return filePath;
        }
        
        try {
            const response = await this.client.get(url, { responseType: 'arraybuffer' });
            fs.writeFileSync(filePath, response.data);
            console.log(`  下载完成: ${filename} (${(response.data.length / 1024).toFixed(1)}KB)`);
            return filePath;
        } catch (error) {
            console.error(`  下载失败: ${filename} - ${error.message}`);
            return null;
        }
    }

    // 解析PDF文件
    async parsePDF(filePath) {
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            return data.text;
        } catch (error) {
            console.error(`  PDF解析失败: ${error.message}`);
            return '';
        }
    }

    // 解析Word文件
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

    // 从文本中提取题目
    extractQuestions(text, subjectId, year, session) {
        const questions = [];
        
        // 清理文本
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // 题目分隔模式
        const patterns = [
            // 模式1: 数字. 题目内容 A.选项 B.选项 C.选项 D.选项 答案：X
            /(\d+)[.、．]\s*(.+?)(?=\d+[.、．]|$)/gs,
        ];
        
        // 尝试按行解析
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        let currentQuestion = null;
        let questionIndex = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 检测题目开始 (数字开头)
            const qMatch = line.match(/^(\d+)[.、．\s]+(.+)/);
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
                    session: session,
                    source: 'github'
                };
                continue;
            }
            
            // 检测选项
            const optMatch = line.match(/^([A-D])[.、．\s]+(.+)/);
            if (optMatch && currentQuestion) {
                currentQuestion.options.push(`${optMatch[1]}. ${optMatch[2].trim()}`);
                continue;
            }
            
            // 检测答案
            const ansMatch = line.match(/(?:答案|正确答案)[：:]\s*([A-D])/);
            if (ansMatch && currentQuestion) {
                currentQuestion.answer = ansMatch[1];
                continue;
            }
            
            // 检测解析
            if (line.startsWith('解析') || line.startsWith('【解析】')) {
                if (currentQuestion) {
                    currentQuestion.explanation = line.replace(/^【?解析】?[：:]?\s*/, '');
                }
                continue;
            }
            
            // 如果当前行可能是题目的延续
            if (currentQuestion && !optMatch && !ansMatch && line.length > 5) {
                // 检查是否是选项的延续
                if (currentQuestion.options.length > 0) {
                    const lastOpt = currentQuestion.options[currentQuestion.options.length - 1];
                    currentQuestion.options[currentQuestion.options.length - 1] = lastOpt + line;
                }
            }
        }
        
        // 添加最后一个题目
        if (currentQuestion && currentQuestion.options.length >= 2) {
            questions.push(currentQuestion);
        }
        
        return questions;
    }

    // 从文件名提取年份和考试类型
    extractFileInfo(filename) {
        const yearMatch = filename.match(/(20\d{2})/);
        const sessionMatch = filename.match(/(上|下)半年|上半年|下半年|(一|二)次/);
        
        let year = yearMatch ? parseInt(yearMatch[1]) : 0;
        let session = '未知';
        
        if (sessionMatch) {
            if (sessionMatch[1] === '上' || sessionMatch[2] === '一') {
                session = '上半年';
            } else {
                session = '下半年';
            }
        }
        
        return { year, session };
    }

    // 处理单个仓库
    async processRepo(owner, repo, subjectId) {
        console.log(`\n========== 处理仓库: ${owner}/${repo} ==========`);
        console.log(`科目: ${subjectId}\n`);
        
        // 获取所有文件
        const files = await this.getAllFiles(owner, repo);
        console.log(`找到 ${files.length} 个文件\n`);
        
        const allQuestions = [];
        
        // 处理每个文件
        for (const file of files) {
            const { year, session } = this.extractFileInfo(file.name);
            
            if (year < 2020) {
                console.log(`跳过旧文件: ${file.name}`);
                continue;
            }
            
            console.log(`\n处理: ${file.name}`);
            console.log(`  年份: ${year}, 考期: ${session}`);
            
            // 下载文件
            const safeFilename = file.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5._-]/g, '_');
            const filePath = await this.downloadFile(file.downloadUrl, `${subjectId}_${safeFilename}`);
            
            if (!filePath) continue;
            
            // 解析文件
            let text = '';
            if (file.ext === '.pdf') {
                text = await this.parsePDF(filePath);
            } else if (['.doc', '.docx'].includes(file.ext)) {
                text = await this.parseWord(filePath);
            } else if (['.txt', '.md'].includes(file.ext)) {
                text = fs.readFileSync(filePath, 'utf-8');
            }
            
            if (!text || text.length < 100) {
                console.log(`  文件内容过短或解析失败`);
                continue;
            }
            
            // 提取题目
            const questions = this.extractQuestions(text, subjectId, year, session);
            console.log(`  提取到 ${questions.length} 道题目`);
            
            if (questions.length > 0) {
                allQuestions.push(...questions);
            }
            
            // 避免请求过快
            await new Promise(r => setTimeout(r, 500));
        }
        
        return allQuestions;
    }

    // 保存题库
    saveQuestionBank(subjectId, questions) {
        // 按年份分组
        const groupedByYear = {};
        questions.forEach(q => {
            const key = `${q.year}-${q.session}`;
            if (!groupedByYear[key]) {
                groupedByYear[key] = {
                    year: q.year,
                    session: q.session,
                    questions: []
                };
            }
            groupedByYear[key].questions.push(q);
        });
        
        // 保存完整题库
        const outputFile = path.join(this.outputDir, `${subjectId}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2));
        console.log(`\n保存题库: ${outputFile}`);
        console.log(`  总题数: ${questions.length}`);
        
        // 保存按年份分组的题库
        const yearFile = path.join(this.outputDir, `${subjectId}-by-year.json`);
        fs.writeFileSync(yearFile, JSON.stringify(groupedByYear, null, 2));
        console.log(`  按年份保存: ${yearFile}`);
        
        // 统计信息
        const stats = {};
        questions.forEach(q => {
            const key = `${q.year}年${q.session}`;
            stats[key] = (stats[key] || 0) + 1;
        });
        console.log('\n  年份统计:');
        Object.entries(stats).sort().forEach(([year, count]) => {
            console.log(`    ${year}: ${count} 题`);
        });
        
        return { total: questions.length, stats };
    }
}

// 主函数
async function main() {
    const extractor = new RuanKaoExtractor();
    
    console.log('=== 软考真题提取器 ===');
    console.log('目标: 从GitHub仓库提取软考真题并整理成题库\n');
    
    // 定义要处理的仓库
    const repos = [
        { owner: 'OrangeHao', repo: 'Software-level-test', subject: 'software-designer' },
        { owner: 'rendong3', repo: 'ruankao', subject: 'database-engineer' },
        { owner: 'youdianniubi', repo: 'ruankao-True-Questions', subject: 'network-engineer' }
    ];
    
    const summary = {};
    
    // 处理每个仓库
    for (const { owner, repo, subject } of repos) {
        try {
            const questions = await extractor.processRepo(owner, repo, subject);
            
            if (questions.length > 0) {
                const stats = extractor.saveQuestionBank(subject, questions);
                summary[subject] = stats;
            } else {
                console.log(`\n${subject}: 未提取到题目`);
                summary[subject] = { total: 0, stats: {} };
            }
        } catch (error) {
            console.error(`\n处理 ${subject} 失败:`, error.message);
            summary[subject] = { total: 0, stats: {}, error: error.message };
        }
    }
    
    // 保存汇总
    const summaryFile = path.join(extractor.outputDir, 'summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    
    console.log('\n\n========== 提取完成 ==========');
    console.log('\n汇总:');
    Object.entries(summary).forEach(([subject, stats]) => {
        console.log(`  ${subject}: ${stats.total} 题`);
    });
}

main().catch(console.error);
