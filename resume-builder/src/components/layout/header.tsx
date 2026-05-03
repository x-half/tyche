"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { signOut } from "next-auth/react"
import { FileText, Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { AuthModal } from "@/components/auth/auth-modal"

export function Header() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; view: "login" | "register" }>({
    isOpen: false,
    view: "login",
  })
  const [logoutConfirm, setLogoutConfirm] = useState(false)

  const openLogin = () => setAuthModal({ isOpen: true, view: "login" })
  const openRegister = () => setAuthModal({ isOpen: true, view: "register" })
  const closeAuthModal = () => setAuthModal({ ...authModal, isOpen: false })
  
  const handleLogout = () => {
    setLogoutConfirm(false)
    signOut({ callbackUrl: "/" })
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    
    // 检查当前是否在首页
    const isHomePage = window.location.pathname === "/"
    
    if (isHomePage) {
      // 在首页，直接滚动到对应板块
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // 不在首页，跳转到首页并带上 hash
      window.location.href = `/#${id}`
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">ResumeBuilder</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection("features")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
            >
              功能
            </button>
            <button
              onClick={() => scrollToSection("templates")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
            >
              模板
            </button>
            {session && (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
              >
                我的简历
              </Link>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {status === "loading" ? (
              <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="px-2 py-1.5 border-b mb-1">
                    <p className="text-sm font-medium">{session.user?.name || "用户"}</p>
                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                  </div>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full">我的简历</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/exports" className="w-full">导出记录</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="w-full">设置</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLogoutConfirm(true)}
                    className="text-red-500 focus:text-red-500"
                  >
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hidden md:flex" onClick={openLogin}>
                  登录
                </Button>
                <Button size="sm" className="rounded-lg shadow-md shadow-primary/20" onClick={openRegister}>
                  免费注册
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t glass">
            <div className="container py-4 space-y-2">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
              >
                功能
              </button>
              <button
                onClick={() => scrollToSection("templates")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
              >
                模板
              </button>
              {session && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  我的简历
                </Link>
              )}
              {!session && (
                <div className="pt-2 border-t flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => { openLogin(); setMobileMenuOpen(false); }}>
                    登录
                  </Button>
                  <Button className="flex-1" onClick={() => { openRegister(); setMobileMenuOpen(false); }}>
                    注册
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        defaultView={authModal.view}
      />

      {/* Logout Confirm Dialog */}
      <Dialog open={logoutConfirm} onOpenChange={setLogoutConfirm}>
        <DialogContent className="sm:max-w-[400px] p-0 gap-0 overflow-hidden border-0 shadow-2xl bg-card [&>button]:hidden">
          <button
            onClick={() => setLogoutConfirm(false)}
            className="absolute right-4 top-4 z-10 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <div className="px-8 pt-8 pb-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="h-6 w-6 text-red-500" />
            </div>
            <DialogTitle className="text-xl font-bold text-center">
              确认退出登录
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              退出后需要重新登录才能保存和导出简历
            </p>
          </div>

          <div className="px-8 pb-8 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-lg"
              onClick={() => setLogoutConfirm(false)}
            >
              取消
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-11 rounded-lg"
              onClick={handleLogout}
            >
              确认退出
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}