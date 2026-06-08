"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Award, Clock, ShoppingBag, ChevronRight, User } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const controller = new AbortController();

    const loadEnrollments = async () => {
      try {
        const res = await fetch("/api/user/enrollments", {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setEnrollments(data || []);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to fetch enrollments");
        }
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();

    return () => {
      controller.abort();
    };
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background-secondary)" }}>
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background-secondary)" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <div
          className="rounded-2xl border p-6 mb-6"
          style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
              <span className="text-white font-bold text-xl">
                {session.user?.name?.[0] || "U"}
              </span>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{session.user?.name}</h1>
              <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "我的课程", href: "/profile", icon: BookOpen },
            { label: "我的订单", href: "/profile/orders", icon: ShoppingBag },
            { label: "我的证书", href: "/profile/certificates", icon: Award },
            { label: "考试中心", href: "/exams", icon: Clock },
          ].map((item) => {
            const isCurrent = item.href === "/profile" && typeof window !== "undefined" && window.location.pathname === "/profile";
            return (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-2xl border p-4 card-hover transition-all"
                style={{
                  background: "var(--color-card)",
                  borderColor: isCurrent ? "var(--color-primary)" : "var(--color-border)",
                  boxShadow: isCurrent ? "0 0 0 1px var(--color-primary)" : "none",
                }}
              >
                <item.icon
                  className="h-5 w-5 mb-3"
                  style={{ color: isCurrent ? "var(--color-primary)" : "var(--foreground-muted)" }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: isCurrent ? "var(--color-primary)" : "var(--foreground-secondary)" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Enrolled Courses */}
        <div
          className="rounded-2xl border p-6"
          style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--foreground)" }}>我的课程</h2>
          {loading ? (
            <div className="text-center py-8 text-sm" style={{ color: "var(--foreground-muted)" }}>加载中...</div>
          ) : enrollments.length > 0 ? (
            <div className="space-y-2">
              {enrollments.map((enrollment: any) => (
                <Link
                  key={enrollment.id}
                  href={`/learn/${enrollment.courseId}`}
                  className="flex items-center justify-between p-4 rounded-xl transition-all"
                  style={{ background: "var(--color-surface)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--color-primary-soft)" }}>
                      <BookOpen className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{enrollment.course?.title}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>进度 {Math.round(enrollment.progress)}%</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--color-hover)" }}>
                <BookOpen className="h-7 w-7" style={{ color: "var(--foreground-muted)" }} />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>还没有报名任何课程</p>
              <p className="text-xs mb-4" style={{ color: "var(--foreground-muted)" }}>开始你的AI学习之旅</p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                style={{ color: "var(--color-primary)" }}
              >
                浏览课程 <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
