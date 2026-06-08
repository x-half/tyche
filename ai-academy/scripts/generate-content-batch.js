// This script generates real educational content for all lessons
// It reads lessons-by-course.json and generates content for each course

const fs = require('fs');
const path = require('path');

// Read the lessons grouped by course
const lessonsByCourse = JSON.parse(fs.readFileSync('scripts/lessons-by-course.json', 'utf8'));

// Output directory for generated content
const outputDir = 'scripts/generated-content';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// List all courses and their lesson counts
const courses = Object.entries(lessonsByCourse).map(([name, data]) => ({
  name,
  courseId: data.courseId,
  lessonCount: data.lessons.length,
  lessons: data.lessons
}));

console.log('Total courses:', courses.length);
console.log('Total lessons to generate:', courses.reduce((sum, c) => sum + c.lessonCount, 0));

// Output course list for agent assignment
fs.writeFileSync(
  path.join(outputDir, 'course-list.json'),
  JSON.stringify(courses.map(c => ({ name: c.name, lessonCount: c.lessonCount })), null, 2)
);

console.log('\\nCourses:');
courses.forEach((c, i) => {
  console.log(`${i + 1}. ${c.name} (${c.lessonCount}节)`);
});
