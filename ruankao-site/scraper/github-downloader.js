const axios = require('axios');
const fs = require('fs');
const path = require('path');

// GitHub软考题库下载器
class GitHubRuanKaoDownloader {
    constructor() {
        this.client = axios.create({
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/vnd.github.v3+json'
            },
            timeout: 30000
        });
        
        // 已知的软考题库仓库
        this.repos = [
            {
                name: 'Software-level-test',
                owner: 'OrangeHao',
                desc: '软件设计师真题',
                subjects: ['software-designer']
            },
            {
                name: 'ruankao',
                owner: 'rendong3',
                desc: '数据库系统工程师真题',
                subjects: ['database-engineer']
            },
            {
                name: 'ruankao-True-Questions',
                owner: 'youdianniubi',
                desc: '网络工程师真题',
                subjects: ['network-engineer']
            }
        ];
    }
    
    // 获取仓库文件列表
    async getRepoFiles(owner, repo, path = '') {
        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
            const response = await this.client.get(url);
            return response.data;
        } catch (error) {
            console.error(`获取文件列表失败: ${error.message}`);
            return [];
        }
    }
    
    // 下载文件内容
    async downloadFile(downloadUrl) {
        try {
            const response = await axios.get(downloadUrl, {
                timeout: 30000,
                responseType: 'text'
            });
            return response.data;
        } catch (error) {
            console.error(`下载失败: ${error.message}`);
            return null;
        }
    }
    
    // 解析Markdown格式的题目
    parseMarkdownQuestions(content, subjectId) {
        const questions = [];
        
        // 匹配题目模式
        const questionRegex = /(\d+)[.、．]\s*(.+?)(?=\d+[.、．]|$)/gs;
        const optionRegex = /([A-D])[.、．]\s*(.+?)(?=[A-D][.、．]|答案|$)/g;
        const answerRegex = /答案[：:]\s*([A-D])/g;
        
        // 分割题目
        const lines = content.split('\n');
        let currentQuestion = null;
        let questionIndex = 0;
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // 检测题目开始
            const qMatch = trimmedLine.match(/^(\d+)[.、．]\s*(.+)/);
            if (qMatch) {
                if (currentQuestion && currentQuestion.options.length >= 2) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    id: `${subjectId}-q${++questionIndex}`,
                    text: qMatch[2],
                    options: [],
                    answer: '',
                    explanation: ''
                };
                continue;
            }
            
            // 检测选项
            const optMatch = trimmedLine.match(/^([A-D])[.、．]\s*(.+)/);
            if (optMatch && currentQuestion) {
                currentQuestion.options.push(`${optMatch[1]}. ${optMatch[2]}`);
                continue;
            }
            
            // 检测答案
            const ansMatch = trimmedLine.match(/答案[：:]\s*([A-D])/);
            if (ansMatch && currentQuestion) {
                currentQuestion.answer = ansMatch[1];
                continue;
            }
            
            // 检测解析
            if (trimmedLine.startsWith('解析') && currentQuestion) {
                currentQuestion.explanation = trimmedLine.replace(/^解析[：:]?\s*/, '');
            }
        }
        
        // 添加最后一个题目
        if (currentQuestion && currentQuestion.options.length >= 2) {
            questions.push(currentQuestion);
        }
        
        return questions;
    }
    
    // 递归获取仓库中的所有文件
    async getAllFiles(owner, repo, path = '') {
        const files = [];
        const contents = await this.getRepoFiles(owner, repo, path);
        
        for (const item of contents) {
            if (item.type === 'file') {
                files.push({
                    name: item.name,
                    path: item.path,
                    downloadUrl: item.download_url,
                    size: item.size
                });
            } else if (item.type === 'dir') {
                const subFiles = await this.getAllFiles(owner, repo, item.path);
                files.push(...subFiles);
            }
            
            // 避免API限流
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        return files;
    }
    
    // 下载并整理题库
    async downloadAndParse(repoInfo) {
        console.log(`\n处理仓库: ${repoInfo.owner}/${repoInfo.name}`);
        console.log(`描述: ${repoInfo.desc}`);
        
        const allQuestions = [];
        
        // 获取所有文件
        const files = await this.getAllFiles(repoInfo.owner, repoInfo.name);
        console.log(`找到 ${files.length} 个文件`);
        
        // 筛选可能包含题目的文件
        const questionFiles = files.filter(f => {
            const name = f.name.toLowerCase();
            return (name.endsWith('.md') || name.endsWith('.txt')) &&
                   (name.includes('真题') || name.includes('题') || name.includes('question') ||
                    name.includes('2021') || name.includes('2022') || name.includes('2023') ||
                    name.includes('2024') || name.includes('2025'));
        });
        
        console.log(`筛选出 ${questionFiles.length} 个可能的题目文件`);
        
        // 下载并解析每个文件
        for (const file of questionFiles) {
            console.log(`\n下载: ${file.path}`);
            const content = await this.downloadFile(file.downloadUrl);
            
            if (content) {
                const subjectId = repoInfo.subjects[0];
                const questions = this.parseMarkdownQuestions(content, subjectId);
                
                if (questions.length > 0) {
                    console.log(`  解析出 ${questions.length} 道题目`);
                    allQuestions.push(...questions);
                }
            }
            
            // 避免请求过快
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        return allQuestions;
    }
}

// 主函数
async function main() {
    const downloader = new GitHubRuanKaoDownloader();
    
    console.log('=== 软考真题下载器 ===\n');
    
    const allQuestions = {};
    
    // 下载每个仓库的题目
    for (const repo of downloader.repos) {
        const questions = await downloader.downloadAndParse(repo);
        
        if (questions.length > 0) {
            const subjectId = repo.subjects[0];
            allQuestions[subjectId] = questions;
            console.log(`\n${repo.desc}: 共 ${questions.length} 道题目`);
        }
    }
    
    // 保存结果
    const outputDir = path.join(__dirname, '../data/real-questions');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    for (const [subjectId, questions] of Object.entries(allQuestions)) {
        const outputFile = path.join(outputDir, `${subjectId}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2));
        console.log(`\n已保存: ${outputFile}`);
    }
    
    // 保存汇总
    const summaryFile = path.join(outputDir, 'summary.json');
    const summary = {};
    for (const [subjectId, questions] of Object.entries(allQuestions)) {
        summary[subjectId] = {
            count: questions.length,
            withAnswer: questions.filter(q => q.answer).length,
            withExplanation: questions.filter(q => q.explanation).length
        };
    }
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    console.log('\n汇总已保存:', summaryFile);
    console.log('\n汇总:', summary);
}

main().catch(console.error);
