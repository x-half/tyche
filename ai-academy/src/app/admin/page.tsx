"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, BookOpen, ShoppingBag, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, courses: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any)?.role !== "admin") {
      router.push("/login");
      return;
    }

    fetchStats();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !session || (session.user as any)?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background-secondary)" }}>
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: "var(--background-secondary)" }}>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>管理后台</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "用户数", value: stats.users, icon: Users, gradient: "from-blue-400 to-indigo-500" },
            { label: "课程数", value: stats.courses, icon: BookOpen, gradient: "from-emerald-400 to-teal-500" },
            { label: "订单数", value: stats.orders, icon: ShoppingBag, gradient: "from-purple-400 to-pink-500" },
            { label: "总收入", value: `¥${stats.revenue.toFixed(2)}`, icon: DollarSign, gradient: "from-amber-400 to-orange-500" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border p-4" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${item.gradient} mb-3`}>
                <item.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{item.value}</div>
              <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border p-5" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <h2 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>快捷操作</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "管理课程", href: "/admin/courses", icon: BookOpen },
              { label: "管理用户", href: "/admin/users", icon: Users },
              { label: "管理订单", href: "/admin/orders", icon: ShoppingBag },
              { label: "系统设置", href: "/admin/settings", icon: DollarSign },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 p-3 rounded-xl transition-all"
                style={{ background: "var(--color-surface)" }}
              >
                <item.icon className="h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--foreground-secondary)" }}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
