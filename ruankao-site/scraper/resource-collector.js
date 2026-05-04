const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 软考真题资源整理器
class RuanKaoResourceCollector {
    constructor() {
        this.resources = {
            'software-designer': [],
            'network-engineer': [],
            'database-engineer': [],
            'security-engineer': [],
            'info-system-manager': []
        };
    }
    
    // 收集OrangeHao仓库的资源
    async collectFromOrangeHao() {
        console.log('收集 OrangeHao/Software-level-test 资源...\n');
        
        const files = [
            // 软件设计师真题
            { path: '软件设计师/历年上午真题word文档', subject: 'software-designer', years: '2009-2020' },
            { path: '软件设计师/2019年真题以及个人解析', subject: 'software-designer', years: '2019' },
            { path: '软件设计师/2020下半年上午+下午+答案解析', subject: 'software-designer', years: '2020' },
            { path: '软件设计师/软考真题12-15年', subject: 'software-designer', years: '2012-2015' },
            { path: '软件设计师/软考真题16-18年', subject: 'software-designer', years: '2016-2018' }
        ];
        
        for (const file of files) {
            this.resources[file.subject].push({
                name: `软件设计师 ${file.years}年真题`,
                type: 'word',
                path: file.path,
                downloadUrl: `https://github.com/OrangeHao/Software-level-test/tree/main/${encodeURIComponent(file.path)}`,
                source: 'GitHub',
                description: `包含${file.years}年软件设计师考试真题及答案`
            });
        }
    }
    
    // 收集网络工程师资源
    async collectFromNetworkEngineer() {
        console.log('收集网络工程师资源...\n');
        
        this.resources['network-engineer'].push({
            name: '网络工程师历年真题',
            type: 'pdf',
            downloadUrl: 'https://github.com/youdianniubi/ruankao-True-Questions',
            source: 'GitHub',
            description: '网络工程师历年真题及答案，无水印版本'
        });
    }
    
    // 收集数据库工程师资源
    async collectFromDatabaseEngineer() {
        console.log('收集数据库工程师资源...\n');
        
        this.resources['database-engineer'].push({
            name: '数据库系统工程师历年真题',
            type: 'pdf',
            downloadUrl: 'https://github.com/rendong3/ruankao',
            source: 'GitHub',
            description: '数据库系统工程师历年真题及参考答案'
        });
    }
    
    // 生成资源文件
    generateResourceFiles() {
        const outputDir = path.join(__dirname, '../data/real-questions');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // 保存资源列表
        const resourceFile = path.join(outputDir, 'resources.json');
        fs.writeFileSync(resourceFile, JSON.stringify(this.resources, null, 2));
        console.log('资源列表已保存:', resourceFile);
        
        // 生成Markdown格式的资源说明
        const readme = this.generateREADME();
        const readmeFile = path.join(outputDir, 'README.md');
        fs.writeFileSync(readmeFile, readme);
        console.log('资源说明已保存:', readmeFile);
    }
    
    // 生成README
    generateREADME() {
        let readme = '# 软考真题资源\n\n';
        readme += '> 以下资源收集自GitHub等开源平台，仅供学习参考\n\n';
        
        const subjectNames = {
            'software-designer': '软件设计师',
            'network-engineer': '网络工程师',
            'database-engineer': '数据库系统工程师',
            'security-engineer': '信息安全工程师',
            'info-system-manager': '信息系统管理工程师'
        };
        
        for (const [subject, resources] of Object.entries(this.resources)) {
            if (resources.length === 0) continue;
            
            readme += `## ${subjectNames[subject]}\n\n`;
            
            for (const resource of resources) {
                readme += `### ${resource.name}\n`;
                readme += `- **类型**: ${resource.type.toUpperCase()}\n`;
                readme += `- **来源**: ${resource.source}\n`;
                readme += `- **说明**: ${resource.description}\n`;
                readme += `- **下载**: [${resource.name}](${resource.downloadUrl})\n\n`;
            }
        }
        
        return readme;
    }
}

// 模拟真题数据生成器（基于考纲和公开资料）
class MockExamGenerator {
    constructor() {
        this.questionTemplates = {
            'software-designer': {
                topics: ['计算机组成', '操作系统', '数据库', '数据结构', '软件工程', '面向对象', '网络', '安全'],
                years: [2021, 2022, 2023, 2024, 2025]
            },
            'network-engineer': {
                topics: ['网络体系结构', 'TCP/IP', '路由交换', '网络安全', '无线网络', 'IPv6'],
                years: [2021, 2022, 2023, 2024, 2025]
            },
            'database-engineer': {
                topics: ['关系数据库', 'SQL语言', '数据库设计', '事务处理', '并发控制', '数据库安全'],
                years: [2021, 2022, 2023, 2024, 2025]
            },
            'security-engineer': {
                topics: ['密码学', '网络安全', '访问控制', '安全协议', '安全管理'],
                years: [2021, 2022, 2023, 2024, 2025]
            },
            'info-system-manager': {
                topics: ['信息系统', 'IT服务管理', '项目管理', '系统运维', '信息安全'],
                years: [2021, 2022, 2023, 2024, 2025]
            }
        };
    }
    
    // 生成基于考纲的题目
    generateQuestions(subjectId, year, session) {
        const template = this.questionTemplates[subjectId];
        if (!template) return [];
        
        const questions = [];
        const questionCount = 10; // 每套生成10道示例题
        
        for (let i = 0; i < questionCount; i++) {
            const topic = template.topics[i % template.topics.length];
            questions.push({
                id: `${subjectId}-${year}${session}-q${i + 1}`,
                year: year,
                session: session,
                topic: topic,
                text: `【${year}年${session}】${topic}相关题目 ${i + 1}`,
                options: [
                    `A. 选项A`,
                    `B. 选项B`,
                    `C. 选项C`,
                    `D. 选项D`
                ],
                answer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
                explanation: `这是${year}年${session}${topic}的考试题目解析。`
            });
        }
        
        return questions;
    }
    
    // 生成所有科目的模拟真题
    generateAllMockExams() {
        const allQuestions = {};
        
        for (const [subjectId, template] of Object.entries(this.questionTemplates)) {
            allQuestions[subjectId] = [];
            
            for (const year of template.years) {
                // 上半年
                const springQuestions = this.generateQuestions(subjectId, year, '上半年');
                allQuestions[subjectId].push(...springQuestions);
                
                // 下半年
                const fallQuestions = this.generateQuestions(subjectId, year, '下半年');
                allQuestions[subjectId].push(...fallQuestions);
            }
        }
        
        return allQuestions;
    }
}

// 主函数
async function main() {
    console.log('=== 软考真题资源收集器 ===\n');
    
    // 1. 收集GitHub资源
    const collector = new RuanKaoResourceCollector();
    await collector.collectFromOrangeHao();
    await collector.collectFromNetworkEngineer();
    await collector.collectFromDatabaseEngineer();
    collector.generateResourceFiles();
    
    // 2. 生成模拟真题数据（用于展示结构）
    console.log('\n生成模拟真题数据...');
    const generator = new MockExamGenerator();
    const mockQuestions = generator.generateAllMockExams();
    
    const outputDir = path.join(__dirname, '../data/real-questions');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 保存模拟真题
    const mockFile = path.join(outputDir, 'mock-exams.json');
    fs.writeFileSync(mockFile, JSON.stringify(mockQuestions, null, 2));
    console.log('模拟真题已保存:', mockFile);
    
    // 统计
    console.log('\n=== 统计 ===');
    for (const [subject, questions] of Object.entries(mockQuestions)) {
        console.log(`${subject}: ${questions.length} 道题目`);
    }
}

main().catch(console.error);
