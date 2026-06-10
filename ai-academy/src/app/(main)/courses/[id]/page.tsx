"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Mermaid from "@/components/Mermaid";
import CodeBlock from "@/components/CodeBlock";
import {
  BookOpen, Users, ChevronRight, ChevronDown, Play, FileText,
  Code, Lock, CheckCircle, ArrowLeft, GraduationCap, HelpCircle, X, Clock
} from "lucide-react";
import toast from "react-hot-toast";
import { levelMap } from "@/lib/constants";

const lessonTypeIcons: Record<string, any> = {
  text: FileText, coding: Code, "hands-on": Code, quiz: HelpCircle, project: GraduationCap,
};

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [previewCount, setPreviewCount] = useState(0);
  const [previewLimit, setPreviewLimit] = useState(3);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showOutline, setShowOutline] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const courseId = params.id as string;
  const preselectedLessonId = searchParams.get("lesson");

  const handleLessonClick = useCallback(async (lesson: any) => {
    // 已登录：付费课程需购买
    if (!lesson.isFree && !session) { setShowLoginPrompt(true); return; }

    // 未登录：调用服务端 IP 计数接口
    if (!session) {
      try {
        const viewRes = await fetch(`/api/lessons/${lesson.id}/view`, { method: "POST" });
        const viewData = await viewRes.json();
        setPreviewCount(viewData.viewed);
        setPreviewLimit(viewData.limit);
        if (!viewData.allowed) { setShowLoginPrompt(true); return; }
      } catch { /* 继续加载 */ }
    }

    setLessonLoading(true);
    setCompleted(false);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}`);
      if (res.ok) {
        const data = await res.json();
        setActiveLesson(data);
        requestAnimationFrame(() => {
          const heroSection = document.querySelector('[data-course-hero]');
          const nav = document.querySelector('nav');
          if (heroSection && nav) {
            const navBottom = nav.getBoundingClientRect().bottom;
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const offset = heroBottom - navBottom + 8;
            window.scrollBy({ top: offset, behavior: 'smooth' });
          }
          const contentArea = document.querySelector('[data-lesson-content]');
          if (contentArea) contentArea.scrollTop = 0;
        });
      }
    } catch { toast.error("加载课时失败"); }
    finally { setLessonLoading(false); }
  }, [session]);

  const fetchCourse = useCallback(async () => {
    try {
      const res = await fetch(`/api/courses/${courseId}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
        setIsEnrolled(data.isEnrolled || false);

        if (data.modules?.length > 0) {
          setActiveModule(0);
          if (preselectedLessonId) {
            for (let i = 0; i < data.modules.length; i++) {
              const lesson = data.modules[i].lessons?.find((l: any) => l.id === preselectedLessonId);
              if (lesson) { setActiveModule(i); handleLessonClick(lesson); break; }
            }
          }
        }
      } else { toast.error("课程不存在"); router.push("/courses"); }
    } catch { toast.error("加载失败"); }
    finally { setLoading(false); }
  }, [courseId, preselectedLessonId, handleLessonClick, router]);

  useEffect(() => {
    fetchCourse();

    // 支付成功跳回，显示提示
    const enrolled = searchParams.get("enrolled");
    if (enrolled === "1") {
      toast.success("支付成功！课程已解锁");
      // 清除 URL 参数
      router.replace(`/courses/${courseId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleEnroll = async () => {
    if (course.isFree) { if (course.modules?.[0]?.lessons?.[0]) handleLessonClick(course.modules[0].lessons[0]); return; }
    if (!session) { router.push("/login"); return; }
    if (isEnrolled) { toast.error("您已购买过该课程"); return; }
    try {
      const res = await fetch("/api/payment/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId: course.id, type: "course" }) });
      const data = await res.json();
      if (data.success) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.data.payUrl;
        Object.entries(data.data.payParams).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error(data.error || "创建订单失败");
      }
    } catch { toast.error("请求失败"); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
    </div>
  );

  if (!course) return null;

  const level = levelMap[course.level] || levelMap.beginner;
  const totalLessons = course.modules?.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0) || 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ===== 顶部 Hero：课程信息 ===== */}
      <section data-course-hero className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors" style={{ color: "var(--foreground-muted)" }}>
            <ArrowLeft className="h-4 w-4" /> 返回课程列表
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ background: level.color.includes("emerald") ? "var(--color-success-light)" : level.color.includes("blue") ? "#eff6ff" : "#f5f3ff", color: level.color.includes("emerald") ? "var(--color-success)" : level.color.includes("blue") ? "#2563eb" : "#7c3aed" }}>
                  {level.label}
                </span>
                {course.isFree && <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ background: "var(--color-success-light)", color: "var(--color-success)" }}>免费</span>}
                {course.category && <span className="px-3 py-1 text-xs rounded-full" style={{ background: "var(--color-hover)", color: "var(--foreground-muted)" }}>{course.category.name}</span>}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "var(--foreground)" }}>{course.title}</h1>
              <p className="text-sm leading-relaxed max-w-2xl mb-4" style={{ color: "var(--foreground-secondary)" }}>{course.description}</p>
              <div className="flex items-center gap-5 text-sm" style={{ color: "var(--foreground-muted)" }}>
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" />{totalLessons} 课时</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{course._count?.enrollments || 0} 学员</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />约 {Math.round(totalLessons * 15)} 分钟</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              {isEnrolled ? (
                <button onClick={() => course.modules?.[0]?.lessons?.[0] && handleLessonClick(course.modules[0].lessons[0])} className="px-8 py-3.5 rounded-2xl text-base font-bold transition-all hover:scale-[1.02] shadow-lg" style={{ background: "var(--color-success)", color: "#fff" }}>
                  <Play className="h-5 w-5 inline mr-2" /> 继续学习
                </button>
              ) : !course.isFree ? (
                <button onClick={handleEnroll} className="px-8 py-3.5 rounded-2xl text-base font-bold transition-all hover:scale-[1.02] shadow-lg" style={{ background: "var(--gradient-accent)", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="line-through text-white/60 text-sm mr-2">¥{course.originalPrice}</span>
                  )}
                  ¥{course.price.toFixed(1)} 立即购买
                </button>
              ) : !activeLesson ? (
                <button onClick={() => course.modules?.[0]?.lessons?.[0] && handleLessonClick(course.modules[0].lessons[0])} className="px-8 py-3.5 rounded-2xl text-base font-bold transition-all hover:scale-[1.02] shadow-lg" style={{ background: "var(--gradient-accent)", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}>
                  <Play className="h-5 w-5 inline mr-2" /> 开始学习
                </button>
              ) : null}
            </div>
          </div>

          {/* 学习目标 */}
          {course.objectives && (
            <div className="mt-6 pt-6 border-t flex flex-wrap gap-3" style={{ borderColor: "var(--color-border)" }}>
              {course.objectives.split("\n").filter(Boolean).slice(0, 4).map((obj: string, i: number) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
                  <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--color-success)" }} />
                  <span style={{ color: "var(--foreground)" }}>{obj}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 主内容区：大纲 + 课时内容 ===== */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[340px_1fr] gap-8">

          {/* 左侧：课程大纲 */}
          <div className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-8">
              <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <button onClick={() => setShowOutline(!showOutline)} className="w-full flex items-center justify-between p-4 lg:hidden" style={{ color: "var(--foreground)" }}>
                  <span className="text-sm font-bold">课程大纲</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showOutline ? "rotate-180" : ""}`} />
                </button>
                <div className={`${showOutline ? "block" : "hidden lg:block"}`}>
                  <div className="p-4 border-b hidden lg:block" style={{ borderColor: "var(--color-border)" }}>
                    <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>课程大纲</h3>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {course.modules?.map((module: any, moduleIndex: number) => (
                      <div key={module.id} className="mb-1">
                        <button onClick={() => setActiveModule(activeModule === moduleIndex ? null : moduleIndex)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all" style={{ background: activeModule === moduleIndex ? "var(--color-hover)" : "transparent", color: "var(--foreground)" }}>
                          <span className="font-semibold text-xs">{module.title}</span>
                          <ChevronRight className="h-3.5 w-3.5 transition-transform" style={{ color: "var(--foreground-muted)", transform: activeModule === moduleIndex ? "rotate(90deg)" : "none" }} />
                        </button>
                        {activeModule === moduleIndex && (
                          <div className="ml-2 mt-1 space-y-0.5">
                            {module.lessons?.map((lesson: any) => {
                              const Icon = lessonTypeIcons[lesson.type] || FileText;
                              const isActive = activeLesson?.id === lesson.id;
                              const isViewed = false;
                              const canAccess = lesson.isFree || session;
                              return (
                                <button key={lesson.id} onClick={() => handleLessonClick(lesson)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left transition-all" style={{ background: isActive ? "var(--color-primary)" : "transparent", color: isActive ? "#fff" : canAccess ? "var(--foreground-secondary)" : "var(--foreground-muted)", fontWeight: isActive ? 600 : 400 }}>
                                  {!canAccess ? <Lock className="h-3 w-3 flex-shrink-0" /> : isViewed ? <CheckCircle className="h-3 w-3 flex-shrink-0" style={{ color: isActive ? "#fff" : "var(--color-success)" }} /> : <Icon className="h-3 w-3 flex-shrink-0" />}
                                  <span className="truncate flex-1">{lesson.title}</span>
                                  {lesson.isFree && !session && !isActive && <span className="text-[10px] font-bold" style={{ color: "var(--color-success)" }}>免费</span>}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：课时内容 */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto" data-lesson-content>
            {activeLesson ? (
              activeLesson.locked ? (
                /* 未购买：显示锁定提示 */
                <div className="flex items-center justify-center py-32">
                  <div className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--color-primary-soft)" }}>
                      <Lock className="h-10 w-10" style={{ color: "var(--color-primary)" }} />
                    </div>
                    <h2 className="text-xl font-bold mb-3" style={{ color: "var(--foreground)" }}>此课时需要购买</h2>
                    <p className="text-sm mb-6" style={{ color: "var(--foreground-secondary)" }}>
                      购买课程后即可解锁全部课时内容
                    </p>
                    {!session ? (
                      <Link href="/login" className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]" style={{ background: "var(--color-primary)", color: "#fff" }}>
                        登录后购买
                      </Link>
                    ) : (
                      <button onClick={handleEnroll} className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]" style={{ background: "var(--gradient-accent)", color: "#fff" }}>
                        ¥{course.price} 立即购买
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* 已购买：显示内容 */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs mb-1" style={{ color: "var(--foreground-muted)" }}>{activeLesson.module?.title}</p>
                      <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{activeLesson.title}</h2>
                    </div>
                    <button onClick={() => { if (!session) { toast.error("请先登录"); return; } setCompleted(true); toast.success("已完成本课"); }} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all" style={completed ? { background: "var(--color-success-light)", color: "var(--color-success)" } : { background: "var(--color-primary)", color: "#fff" }}>
                      {completed ? <><CheckCircle className="h-4 w-4" /> 已完成</> : "标记完成"}
                    </button>
                  </div>
                  <div className="rounded-2xl border p-6 sm:p-8" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        pre({ children, ...props }) {
                          const codeChild = children as any;
                          if (codeChild?.props?.className?.includes("language-mermaid")) return <>{children}</>;
                          if (codeChild?.props?.className?.includes("language-")) {
                            return <CodeBlock code={String(codeChild.props.children).replace(/\n$/, "")} language={codeChild.props.className.replace("language-", "")} />;
                          }
                          return <pre {...props}>{children}</pre>;
                        },
                        code({ node, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const language = match ? match[1] : "";
                          if (language === "mermaid") return <Mermaid chart={String(children).replace(/\n$/, "")} />;
                          if (!className) return <code className="px-1.5 py-0.5 rounded text-sm" style={{ background: "var(--code-bg)", color: "var(--code-text)" }} {...props}>{children}</code>;
                          return <code className={className} {...props}>{children}</code>;
                        },
                      }}>
                        {activeLesson.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )
            ) : lessonLoading ? (
              <div className="flex items-center justify-center py-32">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
              </div>
            ) : (
              <div className="flex items-center justify-center py-32">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--color-hover)" }}>
                    <BookOpen className="h-10 w-10" style={{ color: "var(--foreground-muted)" }} />
                  </div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: "var(--foreground)" }}>选择一节课开始学习</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
                    {!session ? <>未登录用户可免费预览 {previewLimit} 节课，<Link href="/login" className="font-semibold hover:underline" style={{ color: "var(--color-primary)" }}>登录</Link>后解锁全部内容</> : "从左侧课程大纲中选择一节课"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 登录提示模态框 */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="rounded-2xl p-6 max-w-sm w-full" style={{ background: "var(--color-card)", boxShadow: "var(--shadow-xl)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>登录后继续学习</h3>
              <button onClick={() => setShowLoginPrompt(false)} style={{ color: "var(--foreground-muted)" }}><X className="h-5 w-5" /></button>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--foreground-secondary)" }}>
              {session ? "请购买课程后继续学习完整内容" : `您已免费预览${previewCount}/${previewLimit}节课，登录后可继续学习`}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowLoginPrompt(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium" style={{ background: "var(--color-hover)", color: "var(--foreground-secondary)" }}>取消</button>
              <Link href={session ? `/courses/${courseId}` : "/login"} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center" style={{ background: "var(--color-primary)", color: "#fff" }}>{session ? "购买课程" : "立即登录"}</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
