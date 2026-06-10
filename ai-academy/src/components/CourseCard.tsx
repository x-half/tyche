import Link from "next/link";
import { BookOpen, Users, ArrowRight, Zap, Brain, Cpu, Shield, Code, MessageSquare, Image, Wrench, GraduationCap, Layers } from "lucide-react";
import { levelMap } from "@/lib/constants";

const categoryIcons: Record<string, any> = {
  llm: Cpu, prompt: MessageSquare, rag: Brain, agent: Zap,
  "fine-tuning": Wrench, cv: Image, nlp: MessageSquare,
  safety: Shield, deployment: Layers, tools: Code, multimodal: Image,
};

const categoryColors: Record<string, string> = {
  llm: "#7c3aed", prompt: "#f59e0b", rag: "#3b82f6", agent: "#10b981",
  "fine-tuning": "#ef4444", cv: "#a855f7", nlp: "#0ea5e9",
  safety: "#64748b", deployment: "#22c55e", tools: "#f97316", multimodal: "#6366f1",
};

export default function CourseCard({ course }: { course: any }) {
  const levelInfo = levelMap[course.level] || levelMap.beginner;
  const totalLessons = course.modules?.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0) || 0;
  const catSlug = course.category?.slug || course.category?.name?.toLowerCase() || "";
  const CatIcon = categoryIcons[catSlug] || GraduationCap;
  const catColor = categoryColors[catSlug] || "#6b7280";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* 顶部：分类图标 + 标签 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${catColor}10`, color: catColor }}>
            <CatIcon className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold" style={{ color: catColor }}>{course.category?.name || "AI"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {course.isFree ? (
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-md" style={{ background: "var(--color-success-light)", color: "var(--color-success)" }}>免费</span>
          ) : (
            <span className="flex items-center gap-1">
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-[11px] line-through" style={{ color: "var(--foreground-muted)" }}>¥{course.originalPrice}</span>
              )}
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md" style={{ background: "var(--color-primary-soft)", color: "var(--color-primary)" }}>¥{course.price}</span>
            </span>
          )}
          <span className={`px-2 py-0.5 text-[11px] font-medium rounded-md ${levelInfo.color}`}>{levelInfo.label}</span>
        </div>
      </div>

      {/* 标题 */}
      <h3 className="text-[15px] font-bold mb-2 leading-snug line-clamp-2 group-hover:underline decoration-1 underline-offset-2" style={{ color: "var(--foreground)" }}>
        {course.title}
      </h3>

      {/* 描述 */}
      <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--foreground-muted)" }}>
        {course.description}
      </p>

      {/* 底部：统计 + 箭头 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--foreground-muted)" }}>
            <BookOpen className="h-3 w-3" />{totalLessons} 课时
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--foreground-muted)" }}>
            <Users className="h-3 w-3" />{course._count?.enrollments || 0}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2" style={{ color: "var(--color-primary)" }}>
          查看 <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
