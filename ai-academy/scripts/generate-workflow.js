// Workflow to generate educational content for all 300 lessons
// Uses parallel sub-agents for speed

const fs = require('fs');

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

// Generate batch assignments for agents
const BATCH_SIZE = 4;
const batches = [];
for (let i = 0; i < courses.length; i += BATCH_SIZE) {
  batches.push(courses.slice(i, i + BATCH_SIZE));
}

// Output what needs to be done
console.log('=== Content Generation Plan ===');
console.log(`Total courses: ${courses.length}`);
console.log(`Total lessons: ${courses.reduce((sum, c) => sum + c.lessons.length, 0)}`);
console.log(`Parallel batches: ${batches.length}`);
console.log(`Courses per batch: ${BATCH_SIZE}`);

// List all lessons that need content
courses.forEach(course => {
  console.log(`\n📚 ${course.name}:`);
  course.lessons.forEach(l => {
    console.log(`   - ${l.title}`);
  });
});
