"use client";

import { useState, useEffect } from "react";
import { Eye, Globe, Calendar, Users, Loader2, Clock } from "lucide-react";

export default function LessonViewsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"recent" | "ips">("recent");

  useEffect(() => {
    fetch("/api/admin/lesson-views")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--color-primary)" }} />
    </div>
  );

  if (!data) return <div className="py-20 text-center" style={{ color: "var(--foreground-muted)" }}>加载失败</div>;

  const { summary, ipStats, recentViews } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>课时预览记录</h1>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "总预览次数", value: summary.totalViews, icon: Eye, color: "var(--color-primary)" },
          { label: "独立 IP 数", value: summary.uniqueIPs, icon: Globe, color: "var(--color-success)" },
          { label: "今日预览", value: summary.todayViews, icon: Calendar, color: "#f59e0b" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border p-5" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>{stat.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 切换标签 */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "recent" as const, label: "最近预览", icon: Clock },
          { id: "ips" as const, label: "IP 统计", icon: Globe },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ background: tab === t.id ? "var(--color-primary)" : "var(--color-card)", color: tab === t.id ? "#fff" : "var(--foreground-secondary)", border: `1px solid ${tab === t.id ? "var(--color-primary)" : "var(--color-border)"}` }}>
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* 最近预览 */}
      {tab === "recent" && (
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--color-surface)" }}>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>IP</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>课时 ID</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>预览时间</th>
              </tr>
            </thead>
            <tbody>
              {recentViews.map((view: any) => (
                <tr key={view.id} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: "var(--foreground)" }}>{view.ip}</td>
                  <td className="px-5 py-3 font-mono text-xs truncate max-w-[200px]" style={{ color: "var(--foreground-secondary)" }}>{view.lessonId}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>{new Date(view.viewedAt).toLocaleString("zh-CN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentViews.length === 0 && (
            <div className="text-center py-12" style={{ color: "var(--foreground-muted)" }}>暂无预览记录</div>
          )}
        </div>
      )}

      {/* IP 统计 */}
      {tab === "ips" && (
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--color-surface)" }}>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>IP 地址</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>预览课时数</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>最后预览时间</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>状态</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ipStats)
                .sort(([, a], [, b]) => (b as any).count - (a as any).count)
                .map(([ip, stat]: [string, any]) => (
                <tr key={ip} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: "var(--foreground)" }}>{ip}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--foreground-secondary)" }}>{stat.lessons.length} 个课时</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>{new Date(stat.lastView).toLocaleString("zh-CN")}</td>
                  <td className="px-5 py-3">
                    {stat.lessons.length >= 3 ? (
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: "var(--color-error-light)", color: "var(--color-error)" }}>已达上限</span>
                    ) : (
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: "var(--color-success-light)", color: "var(--color-success)" }}>{3 - stat.lessons.length} 次剩余</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Object.keys(ipStats).length === 0 && (
            <div className="text-center py-12" style={{ color: "var(--foreground-muted)" }}>暂无数据</div>
          )}
        </div>
      )}
    </div>
  );
}
