"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, X } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultView?: "login" | "register"
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, defaultView = "login", onSuccess }: AuthModalProps) {
  const router = useRouter()
  const [view, setView] = useState<"login" | "register">(defaultView)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  // 同步 defaultView 变化
  useEffect(() => {
    if (isOpen) {
      setView(defaultView)
      resetForm()
    }
  }, [isOpen, defaultView])

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setName("")
    setCode("")
    setError("")
    setSuccess("")
    setShowPassword(false)
  }

  const switchView = (newView: "login" | "register") => {
    setView(newView)
    setError("")
    setSuccess("")
  }

  const handleSendCode = async () => {
    if (!email) {
      setError("请输入邮箱地址")
      return
    }

    setError("")
    setSendingCode(true)

    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      } else {
        setSuccess("验证码已发送到您的邮箱")
        setCountdown(60)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    } catch (err) {
      setError("发送验证码失败，请重试")
    } finally {
      setSendingCode(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        resetForm()
        onClose()
        router.refresh()
        onSuccess?.()
      }
    } catch (err) {
      setError("登录失败，请重试")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, code }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      } else {
        setSuccess("注册成功！正在自动登录...")
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (result?.ok) {
          setTimeout(() => {
            resetForm()
            onClose()
            router.refresh()
            onSuccess?.()
          }, 1000)
        }
      }
    } catch (err) {
      setError("注册失败，请重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden border-0 shadow-2xl bg-card [&>button]:hidden">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* 标题区域 */}
        <div className="px-8 pt-8 pb-6">
          <DialogTitle className="text-2xl font-bold text-center">
            {view === "login" ? "登录账户" : "创建账户"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {view === "login" ? "欢迎回来，请输入您的账户信息" : "注册一个新账户，开始制作简历"}
          </p>
        </div>

        {/* 表单区域 */}
        <div className="px-8 pb-8">
          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 text-sm text-green-500 bg-green-50 rounded-lg border border-green-100 animate-in fade-in slide-in-from-top-2 duration-300">
              {success}
            </div>
          )}

          {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-email" className="text-sm font-medium">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="modal-email"
                    type="email"
                    placeholder="请输入邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-muted/50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="modal-password" className="text-sm font-medium">密码</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="modal-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-muted/50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 rounded-lg font-medium transition-all hover:shadow-lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                {loading ? "登录中..." : "登录"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-name" className="text-sm font-medium">姓名</Label>
                <Input
                  id="modal-name"
                  type="text"
                  placeholder="请输入姓名（可选）"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 bg-muted/50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-reg-email" className="text-sm font-medium">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="modal-reg-email"
                    type="email"
                    placeholder="请输入邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-muted/50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-reg-password" className="text-sm font-medium">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="modal-reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="至少6个字符"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-muted/50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-code" className="text-sm font-medium">验证码</Label>
                <div className="flex gap-2">
                  <Input
                    id="modal-code"
                    type="text"
                    placeholder="请输入6位验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="h-11 bg-muted/50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    maxLength={6}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendCode}
                    disabled={sendingCode || countdown > 0}
                    className="shrink-0 h-11 px-4 border-0 bg-muted/50 hover:bg-muted transition-all"
                  >
                    {sendingCode
                      ? "发送中..."
                      : countdown > 0
                        ? `${countdown}s`
                        : "发送验证码"}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 rounded-lg font-medium transition-all hover:shadow-lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                {loading ? "注册中..." : "注册"}
              </Button>
            </form>
          )}

          {/* 切换登录/注册 */}
          <div className="mt-6 pt-6 border-t text-center">
            {view === "login" ? (
              <p className="text-sm text-muted-foreground">
                还没有账户？{" "}
                <button
                  onClick={() => switchView("register")}
                  className="text-primary font-medium hover:underline transition-colors"
                >
                  立即注册
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                已有账户？{" "}
                <button
                  onClick={() => switchView("login")}
                  className="text-primary font-medium hover:underline transition-colors"
                >
                  立即登录
                </button>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}