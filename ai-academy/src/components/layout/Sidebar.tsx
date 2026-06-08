"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home, BookOpen, GraduationCap, Award, User, LogOut,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const mainNav = [
  { name: "首页", href: "/", icon: Home },
  { name: "课程", href: "/courses", icon: BookOpen },
  { name: "学习路径", href: "/paths", icon: GraduationCap },
  { name: "认证考试", href: "/exams", icon: Award },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 hidden md:flex flex-col border-r ${
          collapsed ? "w-16" : "w-56"
        }`}
        style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b" style={{ borderColor: "var(--color-border)" }}>
          {collapsed ? (
            <Link href="/" className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto" style={{ background: "var(--gradient-accent)" }}>
              <span className="text-white font-bold text-sm">学</span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                <span className="text-white font-bold text-sm">学</span>
              </div>
              <span className="font-bold text-sm tracking-tight" style={{ color: "var(--foreground)" }}>学AI</span>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative ${
                  collapsed ? "justify-center" : ""
                }`}
                style={{
                  color: active ? "var(--color-nav-active)" : "var(--foreground-secondary)",
                  background: active ? "var(--color-nav-active-bg)" : "transparent",
                  fontWeight: active ? 600 : 400,
                }}
                title={collapsed ? item.name : undefined}
              >
                {/* Active indicator - left border */}
                {active && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: "var(--color-nav-active)" }}
                  />
                )}
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="px-2 pb-2">
          <div className={`flex ${collapsed ? "justify-center" : ""}`}>
            <ThemeToggle className={collapsed ? "" : "w-full"} />
          </div>
        </div>

        {/* User Section */}
        <div className="p-3 border-t" style={{ borderColor: "var(--color-border)" }}>
          {session ? (
            <div className={`${collapsed ? "flex justify-center" : ""}`}>
              {collapsed ? (
                <Link
                  href="/profile"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "var(--color-hover)" }}
                >
                  <span className="text-xs font-medium" style={{ color: "var(--foreground-secondary)" }}>
                    {session.user?.name?.[0] || "U"}
                  </span>
                </Link>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                      <span className="text-white text-[10px] font-medium">
                        {session.user?.name?.[0] || "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                        {session.user?.name || "用户"}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--foreground-muted)" }}>
                        {session.user?.email}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-xs rounded-lg transition-colors"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>退出登录</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {collapsed ? (
                <Link
                  href="/login"
                  className="w-8 h-8 rounded-full flex items-center justify-center mx-auto block transition-colors"
                  style={{ background: "var(--color-hover)" }}
                >
                  <User className="h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block w-full text-center px-3 py-2 text-sm rounded-xl border transition-all"
                    style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)" }}
                  >
                    登录
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center px-3 py-2 text-sm rounded-xl font-medium transition-all"
                    style={{ background: "var(--color-primary)", color: "var(--color-primary-text)" }}
                  >
                    注册
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-10 border-t flex items-center justify-center transition-colors"
          style={{ borderColor: "var(--color-border)", color: "var(--foreground-muted)" }}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>

      {/* Mobile Header */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 h-14 z-40 flex items-center justify-between px-4 border-b"
        style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
            <span className="text-white font-bold text-xs">学</span>
          </div>
          <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>学AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session ? (
            <Link href="/profile" className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
              <span className="text-white text-[10px] font-medium">
                {session.user?.name?.[0] || "U"}
              </span>
            </Link>
          ) : (
            <Link href="/login" className="px-3 py-1.5 text-xs rounded-lg border" style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)" }}>
              登录
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t"
        style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center justify-around h-14">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1 relative"
                style={{ color: active ? "var(--color-nav-active)" : "var(--foreground-muted)" }}
              >
                {active && (
                  <div
                    className="absolute -top-px left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                    style={{ background: "var(--color-nav-active)" }}
                  />
                )}
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
