"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LogOut, BookOpen, User } from "lucide-react";

const navigation = [
  { name: "课程", href: "/courses" },
  { name: "路径", href: "/paths" },
  { name: "认证", href: "/exams" },
];

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-bold text-gray-900 tracking-tight">
              学AI
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-900 rounded transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status === "loading" ? (
              <div className="w-6 h-6 bg-gray-100 rounded-full animate-pulse" />
            ) : session ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-50"
                >
                  <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium">{session.user?.name?.[0] || "U"}</span>
                  </div>
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-3 py-1.5 border-b border-gray-100">
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                      <BookOpen className="h-3 w-3" />我的学习
                    </Link>
                    <Link href="/profile/orders" className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                      <User className="h-3 w-3" />个人中心
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => { setMenuOpen(false); signOut(); }}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
                    >
                      <LogOut className="h-3 w-3" />退出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-900">
                  登录
                </Link>
                <Link href="/register" className="px-2.5 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-800 transition-colors">
                  注册
                </Link>
              </div>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1 text-gray-400">
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-2 border-t border-gray-100">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="block px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded" onClick={() => setMobileOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
