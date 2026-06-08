"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { BookOpen, GraduationCap, Award, User, LogOut, Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const mainNav = [
  { name: "课程", href: "/courses", icon: BookOpen },
  { name: "学习路径", href: "/paths", icon: GraduationCap },
  { name: "认证考试", href: "/exams", icon: Award },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "var(--color-card)", borderColor: "var(--color-border)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
              <span className="text-white font-bold text-sm">学</span>
            </div>
            <span className="font-extrabold text-lg tracking-tight" style={{ color: "var(--foreground)" }}>学AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNav.map(item => {
              const active = isActive(item.href);
              return (
                <Link key={item.name} href={item.href} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ background: active ? "var(--color-primary-soft)" : "transparent", color: active ? "var(--color-primary)" : "var(--foreground-secondary)" }}>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {session ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-[var(--color-hover)]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--gradient-accent)" }}>
                    {session.user?.name?.[0] || "U"}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{session.user?.name || "用户"}</span>
                  <ChevronDown className="h-3.5 w-3.5" style={{ color: "var(--foreground-muted)" }} />
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border p-1.5 z-50 shadow-xl" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                      <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors" style={{ color: "var(--foreground)" }}>
                        <User className="h-4 w-4" /> 个人中心
                      </Link>
                      {session.user?.role === "admin" && (
                        <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors" style={{ color: "var(--foreground)" }}>
                          <Award className="h-4 w-4" /> 管理后台
                        </Link>
                      )}
                      <div className="my-1 border-t" style={{ borderColor: "var(--color-border)" }} />
                      <button onClick={() => { signOut(); setUserMenuOpen(false); }} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm w-full transition-colors" style={{ color: "var(--color-error)" }}>
                        <LogOut className="h-4 w-4" /> 退出登录
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-medium transition-colors" style={{ color: "var(--foreground-secondary)" }}>
                  登录
                </Link>
                <Link href="/register" className="px-5 py-2 rounded-xl text-sm font-bold transition-all" style={{ background: "var(--color-primary)", color: "#fff" }}>
                  注册
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "var(--foreground)" }}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
            <div className="px-6 py-4 space-y-1">
              {mainNav.map(item => {
                const active = isActive(item.href);
                return (
                  <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ background: active ? "var(--color-primary-soft)" : "transparent", color: active ? "var(--color-primary)" : "var(--foreground-secondary)" }}>
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-3 border-t" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>主题</span>
                  <ThemeToggle />
                </div>
              </div>
              {session ? (
                <div className="pt-2 space-y-1">
                  <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm" style={{ color: "var(--foreground)" }}>
                    <User className="h-4 w-4" /> 个人中心
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm w-full" style={{ color: "var(--color-error)" }}>
                    <LogOut className="h-4 w-4" /> 退出登录
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex gap-3 px-4">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center border" style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)" }}>登录</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center" style={{ background: "var(--color-primary)", color: "#fff" }}>注册</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
