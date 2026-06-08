// Master script to generate all lesson content
// Run with: node scripts/run-content-generation.js

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
const outputDir = 'scripts/generated-content';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Group into batches
const BATCH_SIZE = 4;
const batches = [];
for (let i = 0; i < courses.length; i += BATCH_SIZE) {
  batches.push(courses.slice(i, i + BATCH_SIZE));
}

console.log('=== Content Generation ===');
console.log(`Total: ${courses.length} courses, ${courses.reduce((s, c) => s + c.lessons.length, 0)} lessons`);
console.log(`Batches: ${batches.length} (max ${BATCH_SIZE} courses each)`);
console.log('');

// Generate prompts for each batch
batches.forEach((batch, batchIndex) => {
  console.log(`\n=== Batch ${batchIndex + 1} ===`);
  batch.forEach(course => {
    console.log(`\n📚 ${course.name} (${course.lessons.length} lessons):`);
    course.lessons.forEach(l => {
      console.log(`   - ${l.title}`);
    });
  });
});

// Output the total lesson count
const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
console.log(`\n=== Summary ===`);
console.log(`Total lessons to generate: ${totalLessons}`);
console.log(`Estimated time: ${Math.ceil(totalLessons / 10)} minutes (at 10 lessons/min)`);
