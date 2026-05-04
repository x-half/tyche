const axios = require('axios');
const fs = require('fs');

// 查看仓库文件结构
async function listRepoFiles(owner, repo, path = '', depth = 0) {
    const indent = '  '.repeat(depth);
    
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        const items = response.data;
        
        for (const item of items) {
            if (item.type === 'dir') {
                console.log(`${indent}📁 ${item.name}/`);
                // 递归查看子目录（限制深度）
                if (depth < 2) {
                    await new Promise(r => setTimeout(r, 200));
                    await listRepoFiles(owner, repo, item.path, depth + 1);
                }
            } else {
                console.log(`${indent}📄 ${item.name} (${(item.size / 1024).toFixed(1)}KB)`);
            }
        }
    } catch (error) {
        console.error(`${indent}错误: ${error.message}`);
    }
}

async function main() {
    console.log('=== 查看仓库文件结构 ===\n');
    
    // 查看软件设计师仓库
    console.log('1. OrangeHao/Software-level-test:');
    await listRepoFiles('OrangeHao', 'Software-level-test');
    
    console.log('\n2. rendong3/ruankao:');
    await listRepoFiles('rendong3', 'ruankao');
    
    console.log('\n3. youdianniubi/ruankao-True-Questions:');
    await listRepoFiles('youdianniubi', 'ruankao-True-Questions');
}

main().catch(console.error);
