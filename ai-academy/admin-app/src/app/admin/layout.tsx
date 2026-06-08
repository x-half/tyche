"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
  LogOut,
  Menu,
  X,
  Shield,
  AlertTriangle,
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
    ],
  },
  {
    title: "系统",
    links: [
      { name: "管理员管理", href: "/admin/admins", icon: Shield },
      { name: "数据对账", href: "/admin/reconciliation", icon: AlertTriangle },
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
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!data.user || data.user.role !== "admin") {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - fixed, independent scroll */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo - fixed */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-lg font-bold text-gray-900">管理后台</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav - scrollable */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {sidebarLinks.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <link.icon className="h-5 w-5 mr-3" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User section - fixed */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name || "管理员"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-3" />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main Content - independent scroll */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar - fixed */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* Page content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
