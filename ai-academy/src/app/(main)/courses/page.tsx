"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, BookOpen, Users, X, ChevronDown } from "lucide-react";
import CourseCard from "@/components/CourseCard";

const categories = [
  { id: "all", name: "全部" },
  { id: "llm", name: "LLM开发" },
  { id: "prompt", name: "提示词工程" },
  { id: "rag", name: "RAG系统" },
  { id: "agent", name: "AI Agent" },
  { id: "fine-tuning", name: "模型微调" },
  { id: "cv", name: "计算机视觉" },
  { id: "nlp", name: "NLP" },
  { id: "safety", name: "AI安全" },
  { id: "deployment", name: "部署运维" },
  { id: "tools", name: "AI工具" },
  { id: "multimodal", name: "多模态" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [totalCourses, setTotalCourses] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("limit", "100");
    if (category !== "all") params.set("category", category);
    if (level !== "all") params.set("level", level);
    if (sort) params.set("sort", sort);
    if (search) params.set("search", search);

    setLoading(true);
    fetch(`/api/courses?${params.toString()}`)
      .then(r => r.json())
      .then(data => {
        let results = data.courses || [];
        if (freeOnly) results = results.filter((c: any) => c.isFree);
        setCourses(results);
        setTotalCourses(data.pagination?.total || results.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, level, sort, search, freeOnly]);

  const hasActiveFilters = category !== "all" || level !== "all" || freeOnly || search;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ===== 页面头部：大搜索区 ===== */}
      <section className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: "var(--foreground)" }}>探索课程</h1>
          <p className="text-base mb-8" style={{ color: "var(--foreground-secondary)" }}>共 {totalCourses} 门课程，涵盖 AI 各个方向</p>

          {/* 大搜索框 */}
          <div className="relative max-w-2xl mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: "var(--foreground-muted)" }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜索课程名称、技术方向..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-base border-2 transition-all focus:outline-none"
              style={{ background: "var(--color-card)", borderColor: search ? "var(--color-primary)" : "var(--color-border)", color: "var(--foreground)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--foreground-muted)" }}>
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* 筛选行 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setCategory(cat.id)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ background: category === cat.id ? "var(--color-primary)" : "var(--color-card)", color: category === cat.id ? "#fff" : "var(--foreground-secondary)", border: `1px solid ${category === cat.id ? "var(--color-primary)" : "var(--color-border)"}` }}>
                  {cat.name}
                </button>
              ))}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
              style={{ background: showFilters ? "var(--color-primary-soft)" : "var(--color-card)", borderColor: "var(--color-border)", color: showFilters ? "var(--color-primary)" : "var(--foreground-secondary)" }}>
              筛选 <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-5 rounded-2xl border flex flex-wrap gap-6" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--foreground-muted)" }}>难度等级</label>
                <div className="flex gap-2">
                  {[{ id: "all", label: "全部" }, { id: "beginner", label: "入门" }, { id: "intermediate", label: "进阶" }, { id: "advanced", label: "高级" }].map(l => (
                    <button key={l.id} onClick={() => setLevel(l.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{ background: level === l.id ? "var(--color-primary)" : "var(--color-hover)", color: level === l.id ? "#fff" : "var(--foreground-secondary)" }}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--foreground-muted)" }}>排序方式</label>
                <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs border" style={{ background: "var(--color-card)", color: "var(--foreground)", borderColor: "var(--color-border)" }}>
                  <option value="popular">最热门</option>
                  <option value="newest">最新</option>
                  <option value="price_asc">价格低到高</option>
                  <option value="price_desc">价格高到低</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--foreground-muted)" }}>价格</label>
                <button onClick={() => setFreeOnly(!freeOnly)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background: freeOnly ? "var(--color-success)" : "var(--color-hover)", color: freeOnly ? "#fff" : "var(--foreground-secondary)" }}>
                  仅免费
                </button>
              </div>
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button onClick={() => { setCategory("all"); setLevel("all"); setSearch(""); setFreeOnly(false); setSort("popular"); }}
                    className="text-xs font-medium underline" style={{ color: "var(--color-primary)" }}>清除所有筛选</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== 课程网格 ===== */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
                <div className="h-28" style={{ background: "var(--color-hover)" }} />
                <div className="p-5">
                  <div className="h-5 rounded mb-3 w-1/3" style={{ background: "var(--color-hover)" }} />
                  <div className="h-6 rounded mb-3" style={{ background: "var(--color-hover)" }} />
                  <div className="h-4 rounded mb-4 w-2/3" style={{ background: "var(--color-hover)" }} />
                  <div className="h-8 rounded" style={{ background: "var(--color-hover)" }} />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-hover)" }}>
              <BookOpen className="h-10 w-10" style={{ color: "var(--foreground-muted)" }} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--foreground)" }}>暂无匹配的课程</h3>
            <p className="text-sm mb-6" style={{ color: "var(--foreground-secondary)" }}>试试调整筛选条件，或者浏览全部课程</p>
            <button onClick={() => { setCategory("all"); setLevel("all"); setSearch(""); setFreeOnly(false); }}
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "var(--color-primary)", color: "#fff" }}>
              清除筛选
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
