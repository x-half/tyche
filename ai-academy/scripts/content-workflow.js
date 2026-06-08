// Workflow script for parallel content generation
// This will be executed by the Workflow tool

export const meta = {
  name: 'generate-lesson-content',
  description: 'Generate real educational content for all 300 lessons using parallel agents',
  phases: [
    { title: 'Generate', detail: 'Parallel agents generate content for course batches' },
    { title: 'Apply', detail: 'Update database with generated content' },
  ],
}

const fs = require('fs');
const path = require('path');

// Read course data
const lessonsByCourse = JSON.parse(fs.readFileSync('scripts/lessons-by-course.json', 'utf8'));
const courses = Object.entries(lessonsByCourse).map(([name, data]) => ({
  name,
  courseId: data.courseId,
  lessons: data.lessons
}));

// Create output directory
if (!fs.existsSync('scripts/generated-content')) {
  fs.mkdirSync('scripts/generated-content', { recursive: true });
}

// Group into batches of 4 courses each
const BATCH_SIZE = 4;
const batches = [];
for (let i = 0; i < courses.length; i += BATCH_SIZE) {
  batches.push(courses.slice(i, i + BATCH_SIZE));
}

log(`Starting content generation for ${courses.length} courses (${courses.reduce((s, c) => s + c.lessons.length, 0)} lessons)`);

// Phase 1: Generate content in parallel
phase('Generate');

const batchResults = await parallel(
  batches.map((batch, batchIndex) => () => {
    const courseList = batch.map(c => `${c.name}: ${c.lessons.map(l => l.title).join(', ')}`).join('\n');
    const lessonCount = batch.reduce((s, c) => s + c.lessons.length, 0);

    return agent(
      `You are generating educational content for an AI learning platform. Generate high-quality, real educational content in Chinese for the following ${lessonCount} lessons across ${batch.length} courses.

For each lesson, write 400-600 words of real educational content that:
- Explains concepts clearly with examples
- Includes code snippets (Python/JavaScript) where relevant
- Uses markdown tables for comparisons
- Has practical tips and best practices
- Is structured with clear headings (##, ###)
- Is written in Chinese

Output a JSON array where each element has: {id, title, content}

Courses and lessons:
${batch.map(c => `\n📚 ${c.name}:\n${c.lessons.map(l => `  - ${l.id}: ${l.title} (${l.type})`).join('\n')}`).join('\n')}

Write the JSON array to: scripts/generated-content/batch-${batchIndex + 1}.json

IMPORTANT: Each lesson's content must be REAL educational material, not template text. Include actual code examples, explanations, and practical knowledge.`,
      { label: `batch-${batchIndex + 1}`, phase: 'Generate' }
    );
  })
);

log(`Generated content for ${batches.length} batches`);

// Phase 2: Apply to database
phase('Apply');

const applyResult = await agent(
  `Read all JSON files from scripts/generated-content/ (except course-list.json) and create a Prisma script to update the database.

For each JSON file, read the array of {id, title, content} objects.
Then create a script at scripts/apply-content.js that:
1. Uses Prisma to connect to the database
2. Updates each lesson by ID with the new content
3. Logs success/failure for each lesson
4. Reports total success/failure count

Run the script after creating it.`,
  { label: 'apply-to-db', phase: 'Apply' }
);

log('Content generation complete!');
return { batches: batches.length, totalLessons: courses.reduce((s, c) => s + c.lessons.length, 0) };
