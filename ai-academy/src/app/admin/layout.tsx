"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingBag,
  BarChart3,
  Settings,
  FileText,
  Award,
  MessageSquare,
  Bell,
  Eye,
} from "lucide-react";

const sidebarLinks = [
  {
    title: "概览",
    links: [
      { name: "仪表盘", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "内容管理",
    links: [
      { name: "课程管理", href: "/admin/courses", icon: BookOpen },
      { name: "博客管理", href: "/admin/blog", icon: FileText },
      { name: "证书管理", href: "/admin/certificates", icon: Award },
    ],
  },
  {
    title: "用户与订单",
    links: [
      { name: "用户管理", href: "/admin/users", icon: Users },
      { name: "订单管理", href: "/admin/orders", icon: ShoppingBag },
      { name: "评论管理", href: "/admin/comments", icon: MessageSquare },
    ],
  },
  {
    title: "数据分析",
    links: [
      { name: "数据报表", href: "/admin/analytics", icon: BarChart3 },
      { name: "课时预览", href: "/admin/lesson-views", icon: Eye },
    ],
  },
  {
    title: "系统",
    links: [
      { name: "通知管理", href: "/admin/notifications", icon: Bell },
      { name: "系统设置", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background-secondary)" }}>
      {/* Sidebar */}
      <aside className="w-64 border-r flex flex-col" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="p-6 border-b" style={{ borderColor: "var(--color-border)" }}>
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-lg font-bold" style={{ color: "var(--foreground)" }}>管理后台</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {sidebarLinks.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 px-3" style={{ color: "var(--foreground-muted)" }}>
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all relative"
                      style={{
                        color: isActive ? "var(--color-nav-active)" : "var(--foreground-secondary)",
                        background: isActive ? "var(--color-nav-active-bg)" : "transparent",
                      }}
                    >
                      {isActive && (
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                          style={{ background: "var(--color-nav-active)" }}
                        />
                      )}
                      <link.icon className="h-5 w-5 mr-3" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm rounded-xl transition-colors"
            style={{ color: "var(--foreground-secondary)" }}
          >
            返回主站
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
