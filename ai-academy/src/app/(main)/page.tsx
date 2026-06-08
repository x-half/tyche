"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen, ArrowRight, GraduationCap, Award,
  Zap, Brain, Cpu, Users, ChevronRight, Sparkles,
  CheckCircle, Play, Star, TrendingUp
} from "lucide-react";
import CourseCard from "@/components/CourseCard";

const iconMap: Record<string, any> = { BookOpen, GraduationCap, Award, Users, Zap, Brain, Cpu, TrendingUp, Play, Star, CheckCircle };

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/courses?limit=100").then(r => r.json()),
      fetch("/api/settings").then(r => r.json()),
    ]).then(([courseData, settingsData]) => {
      setCourses(courseData.courses || []);
      setConfig(settingsData);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading || !config) return <div className="min-h-screen" style={{ background: "var(--background)" }} />;

  const freeCourses = courses.filter(c => c.isFree).slice(0, 3);
  const featuredCourses = courses.filter(c => !c.isFree).slice(0, 6);
  const getIcon = (name: string) => iconMap[name] || BookOpen;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ========== 1. HERO ========== */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-soft)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-glow" style={{ background: "var(--color-primary)", opacity: 0.12 }} />
        <div className="absolute bottom-1/4 left-1/6 w-[300px] h-[300px] rounded-full blur-[100px] animate-pulse-glow" style={{ background: "#8b5cf6", opacity: 0.1, animationDelay: "2s" }} />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8" style={{ background: "var(--color-primary-soft)", color: "var(--color-primary)" }}>
                <Sparkles className="h-3.5 w-3.5" />
                <span>{config.hero.badge}</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
                <span style={{ color: "var(--foreground)" }}>{config.hero.titleLine1}</span>
                <br />
                <span className="gradient-text">{config.hero.titleLine2}</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: "var(--foreground-secondary)" }}>
                {config.hero.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link href="/courses" className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-xl" style={{ background: "var(--gradient-accent)", color: "#fff", boxShadow: "0 8px 30px rgba(99,102,241,0.35)" }}>
                  {config.hero.ctaPrimary} <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/paths" className="inline-flex items-center gap-2 px-6 py-4 text-base font-semibold rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02]" style={{ borderColor: "var(--color-border)", color: "var(--foreground)", background: "var(--color-card)" }}>
                  <Play className="h-4 w-4" /> {config.hero.ctaSecondary}
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["bg-indigo-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500"].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                      {["李", "王", "张", "陈"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>500+ 学员好评</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-up-delay-2">
              <div className="relative">
                <div className="rounded-3xl border p-6 shadow-2xl" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>LLM 应用开发</h3>
                      <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>从零构建大模型应用</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    {["认识大语言模型", "Prompt Engineering 实战", "构建你的第一个 AI Agent"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "var(--color-hover)" }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: i < 2 ? "var(--color-success)" : "var(--color-border)", color: i < 2 ? "#fff" : "var(--foreground-muted)" }}>
                          {i < 2 ? <CheckCircle className="h-3.5 w-3.5 text-white" /> : i + 1}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <div className="flex items-center gap-4 text-xs" style={{ color: "var(--foreground-muted)" }}>
                      <span>12 课时</span><span>·</span><span>326 学员</span>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "var(--color-success-light)", color: "var(--color-success)" }}>免费</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-8 rounded-2xl border p-4 shadow-xl" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--color-success-light)" }}>
                      <TrendingUp className="h-5 w-5" style={{ color: "var(--color-success)" }} />
                    </div>
                    <div>
                      <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>98%</p>
                      <p className="text-[10px]" style={{ color: "var(--foreground-muted)" }}>学员满意度</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 rounded-2xl border p-3 shadow-xl" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="text-xs font-bold" style={{ color: "var(--foreground)" }}>认证证书</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. 数据统计条 ========== */}
      <section className="border-y" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {config.stats.map((stat: any, i: number) => {
              const Icon = getIcon(stat.icon);
              const value = stat.value === "auto" ? courses.length.toString() : stat.value;
              return (
                <div key={i} className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-transform group-hover:scale-110" style={{ background: "var(--color-primary-soft)" }}>
                    <Icon className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: "var(--foreground)" }}>{value}</p>
                  <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== 3. 为什么选择我们 ========== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold uppercase tracking-widest mb-4 block" style={{ color: "var(--color-primary)" }}>{config.features.sectionTitle}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "var(--foreground)" }}>{config.features.sectionSubtitle}</h2>
          </div>

          {config.features.items.map((feature: any, i: number) => {
            const Icon = getIcon(feature.icon);
            const isReversed = i % 2 === 1;
            return (
              <div key={i} className={`grid lg:grid-cols-2 gap-16 items-center ${i < config.features.items.length - 1 ? "mb-24" : ""}`}>
                <div className={isReversed ? "order-2 lg:order-1" : ""}>
                  <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "var(--color-primary)" }}>{feature.title}</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: "var(--foreground)" }}>{feature.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>{feature.description}</p>
                </div>
                <div className={`${isReversed ? "order-1 lg:order-2" : ""} rounded-3xl border p-8`} style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== 4. 热门课程 ========== */}
      <section className="py-20" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "var(--color-primary)" }}>精选课程</span>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "var(--foreground)" }}>从这里开始你的AI之旅</h2>
            </div>
            <Link href="/courses" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
              {config.coursesSection.ctaText} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {freeCourses.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-success)" }} />
                {config.coursesSection.freeTitle}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {freeCourses.map(course => <CourseCard key={course.id} course={course} />)}
              </div>
            </div>
          )}

          <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
            {config.coursesSection.paidTitle}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>

      {/* ========== 5. 学习路径 ========== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "var(--color-primary)" }}>{config.pathsSection.sectionTitle}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "var(--foreground)" }}>{config.pathsSection.sectionSubtitle}</h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "var(--foreground-secondary)" }}>{config.pathsSection.sectionDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {config.pathsSection.items.map((path: any, i: number) => {
              const Icon = getIcon(path.icon);
              return (
                <Link key={i} href="/paths" className="group relative rounded-3xl border p-8 card-hover overflow-hidden" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>{path.title}</h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>{path.description}</p>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>{path.count} 门课程 →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== 6. 底部 CTA ========== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center" style={{ background: "var(--gradient-hero)" }}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-white/30" />
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-2 border-white/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight whitespace-pre-line">
                {config.ctaSection.title}
              </h2>
              <p className="text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto">
                {config.ctaSection.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-2xl bg-white transition-all hover:scale-[1.03] shadow-xl" style={{ color: "#6366f1" }}>
                  {config.ctaSection.ctaPrimary} <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-2xl border-2 border-white/30 text-white transition-all hover:bg-white/10">
                  {config.ctaSection.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
