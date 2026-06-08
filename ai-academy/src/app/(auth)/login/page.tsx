"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2, BookOpen, GraduationCap, Award, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("请填写邮箱和密码"); return; }
    setLoading(true);
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) toast.error(result.error);
      else { toast.success("登录成功"); router.push("/"); router.refresh(); }
    } catch { toast.error("登录失败"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left - Brand Showcase */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full border-2 border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10" />
        </div>

        <div className="relative p-12 flex flex-col justify-between w-full">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-indigo-600 font-bold text-lg">学</span>
              </div>
              <span className="text-xl font-bold text-white">学AI</span>
            </Link>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-white/80" />
              <span className="text-xs font-medium text-white/90">系统化AI学习平台</span>
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight">
              系统学习AI技术<br />
              掌握未来核心技能
            </h1>
            <div className="space-y-4">
              {[
                { icon: BookOpen, text: "323节精品课程，涵盖AI全栈技术" },
                { icon: GraduationCap, text: "结构化学习路径，循序渐进" },
                { icon: Award, text: "专业认证证书，提升职业竞争力" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-white/80" />
                  </div>
                  <span className="text-sm text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/40">
            &copy; 2026 学AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                <span className="text-white font-bold text-lg">学</span>
              </div>
              <span className="text-xl font-bold" style={{ color: "var(--foreground)" }}>学AI</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>欢迎回来</h2>
            <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>登录你的账户，继续学习</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    color: "var(--foreground)",
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>密码</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    color: "var(--foreground)",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01] disabled:opacity-50 flex items-center justify-center"
              style={{ background: "var(--gradient-accent)", color: "#ffffff" }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "登录"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>
              没有账户？{" "}
              <Link href="/register" className="font-medium hover:underline" style={{ color: "var(--color-primary)" }}>
                免费注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
