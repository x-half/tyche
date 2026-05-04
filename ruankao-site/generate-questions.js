const fs = require('fs');
const path = require('path');

// 读取提取的题目
const inputFile = path.join(__dirname, 'data/extracted/software-designer.json');
const outputFile = path.join(__dirname, 'js/real-questions.js');

const rawQuestions = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

console.log(`原始题目数: ${rawQuestions.length}`);

// 清理和验证题目
const validQuestions = rawQuestions.filter(q => {
    // 确保有题目文本
    if (!q.text || q.text.length < 10) return false;
    
    // 确保有2-4个选项
    if (q.options.length < 2 || q.options.length > 4) return false;
    
    // 确保有答案
    if (!q.answer || !['A', 'B', 'C', 'D'].includes(q.answer)) return false;
    
    return true;
});

console.log(`有效题目数: ${validQuestions.length}`);

// 按年份分组
const groupedByYear = {};
validQuestions.forEach(q => {
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

console.log('\n按年份统计:');
Object.entries(groupedByYear).sort().forEach(([key, group]) => {
    console.log(`  ${key}: ${group.questions.length} 题`);
});

// 生成JS文件内容
const jsContent = `// 软考真题数据 - 从GitHub仓库提取
// 提取时间: ${new Date().toISOString()}
// 数据来源: GitHub开源仓库

const RealQuestions = {
    'software-designer': ${JSON.stringify(validQuestions, null, 8)}
};

// 按年份获取题目
function getQuestionsByYear(subjectId, year, session) {
    const questions = RealQuestions[subjectId] || [];
    return questions.filter(q => q.year === year && (!session || q.session === session));
}

// 获取所有可用的年份
function getAvailableYears(subjectId) {
    const questions = RealQuestions[subjectId] || [];
    const years = new Set();
    questions.forEach(q => years.add(\`\${q.year}-\${q.session}\`));
    return Array.from(years).sort().reverse();
}
`;

fs.writeFileSync(outputFile, jsContent);
console.log(`\n已保存到: ${outputFile}`);

// 同时保存清理后的JSON
const cleanFile = path.join(__dirname, 'data/extracted/software-designer-clean.json');
fs.writeFileSync(cleanFile, JSON.stringify(validQuestions, null, 2));
console.log(`清理后数据: ${cleanFile}`);
