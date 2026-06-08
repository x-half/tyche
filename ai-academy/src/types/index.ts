export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: string;
}

export interface AppSession {
  user: SessionUser;
  expires: string;
}

export interface CourseWithDetails {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  coverImage: string | null;
  price: number;
  originalPrice: number | null;
  isFree: boolean;
  level: string;
  status: string;
  featured: boolean;
  totalLessons: number;
  totalStudents: number;
  totalDuration: number;
  rating: number;
  ratingCount: number;
  tags: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  modules: ModuleWithLessons[];
  createdAt: Date;
}

export interface ModuleWithLessons {
  id: string;
  title: string;
  description: string | null;
  sortOrder: number;
  isFree: boolean;
  lessons: LessonBasic[];
}

export interface LessonBasic {
  id: string;
  title: string;
  slug: string;
  type: string;
  duration: number;
  sortOrder: number;
  isFree: boolean;
  isPreview: boolean;
}

export interface LessonWithContent extends LessonBasic {
  content: string | null;
  videoUrl: string | null;
  moduleId: string;
  module: {
    id: string;
    title: string;
    courseId: string;
  };
}

export interface UserProgressInfo {
  lessonId: string;
  status: "not_started" | "in_progress" | "completed";
  score: number | null;
  watchTime: number;
  completedAt: Date | null;
}

export interface EnrollmentInfo {
  id: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
}

export interface OrderInfo {
  id: string;
  orderNo: string;
  amount: number;
  status: string;
  paymentMethod: string | null;
  createdAt: Date;
  course: {
    title: string;
    slug: string;
    coverImage: string | null;
  } | null;
}

export interface CertificateInfo {
  id: string;
  certificateNo: string;
  title: string;
  issuedAt: Date;
  course: {
    title: string;
  } | null;
}

export interface AchievementInfo {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  expReward: number;
  unlockedAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "choice" | "multi_choice" | "boolean" | "fill";
  options: string[] | null;
  answer: string;
  explanation: string | null;
  difficulty: number;
}

export interface ExamInfo {
  id: string;
  title: string;
  description: string | null;
  passScore: number;
  timeLimit: number;
  isPaid: boolean;
  price: number;
  totalQuestions: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalOrders: number;
  totalRevenue: number;
  todayUsers: number;
  todayOrders: number;
  todayRevenue: number;
  recentOrders: any[];
  popularCourses: any[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  _count?: {
    courses: number;
  };
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  courses: CourseWithDetails[];
  totalCourses: number;
  totalLessons: number;
  totalDuration: number;
  level: string;
}

export interface BlogPostInfo {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string | null;
  tags: string | null;
  viewCount: number;
  publishedAt: Date | null;
  createdAt: Date;
}
