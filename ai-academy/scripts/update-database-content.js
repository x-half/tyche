// Script to update database with generated content
// Reads all JSON files from generated-content/ and updates lessons

const fs = require('fs');
const path = require('path');

const contentDir = 'scripts/generated-content';

async function main() {
  // Read all JSON files
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json') && f !== 'course-list.json');

  console.log(`Found ${files.length} content files`);

  const allLessons = [];
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const lessons = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allLessons.push(...lessons);
  }

  console.log(`Total lessons to update: ${allLessons.length}`);

  // Generate Prisma update script
  const script = `// Auto-generated script to update lesson content
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lessons = ${JSON.stringify(allLessons, null, 2)};

async function main() {
  console.log('Updating', lessons.length, 'lessons...');

  let success = 0;
  let failed = 0;

  for (const lesson of lessons) {
    try {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { content: lesson.content }
      });
      console.log('✅', lesson.title);
      success++;
    } catch (error) {
      console.error('❌', lesson.title, error.message);
      failed++;
    }
  }

  console.log('\\n=== 完成 ===');
  console.log('成功:', success, '失败:', failed);
}

main().catch(console.error).finally(() => prisma.$disconnect());
`;

  fs.writeFileSync('scripts/apply-content.js', script);
  console.log('Generated scripts/apply-content.js');
  console.log('Run: node scripts/apply-content.js');
}

main().catch(console.error);
