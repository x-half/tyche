// Workflow script to generate content for all courses using parallel agents
// This script will be executed by the Workflow tool

const fs = require('fs');

// Read course data
const lessonsByCourse = JSON.parse(fs.readFileSync('scripts/lessons-by-course.json', 'utf8'));
const courses = Object.entries(lessonsByCourse).map(([name, data]) => ({
  name,
  courseId: data.courseId,
  lessons: data.lessons
}));

// Group courses into batches for parallel processing
// Each batch will be handled by one sub-agent
const BATCH_SIZE = 4; // 4 courses per agent
const batches = [];
for (let i = 0; i < courses.length; i += BATCH_SIZE) {
  batches.push(courses.slice(i, i + BATCH_SIZE));
}

console.log(`Total courses: ${courses.length}`);
console.log(`Total lessons: ${courses.reduce((sum, c) => sum + c.lessons.length, 0)}`);
console.log(`Batches: ${batches.length} (max ${BATCH_SIZE} courses per batch)`);

// Output batch assignments
batches.forEach((batch, i) => {
  console.log(`\nBatch ${i + 1}:`);
  batch.forEach(c => {
    console.log(`  - ${c.name} (${c.lessons.length} lessons)`);
  });
});
