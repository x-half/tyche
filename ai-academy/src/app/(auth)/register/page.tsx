"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, Shield, BookOpen, GraduationCap, Award, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const pwdChecks = [
    { label: "至少6位", ok: password.length >= 6 },
    { label: "含字母", ok: /[a-zA-Z]/.test(password) },
    { label: "含数字", ok: /[0-9]/.test(password) },
  ];

  const handleSendCode = async () => {
    if (!email) { toast.error("请输入邮箱"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { toast.error("邮箱格式不正确"); return; }

    setSendingCode(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "发送失败"); return; }
      toast.success("验证码已发送到邮箱");
      setCountdown(60);
    } catch { toast.error("发送失败"); }
    finally { setSendingCode(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !code) { toast.error("请填写所有字段"); return; }
    if (password !== confirm) { toast.error("密码不一致"); return; }
    if (password.length < 6) { toast.error("密码至少6位"); return; }
    if (code.length !== 6) { toast.error("请输入6位验证码"); return; }
    if (!agreed) { toast.error("请同意服务条款"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, code }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "注册失败"); return; }
      toast.success("注册成功，请登录");
      router.push("/login");
    } catch { toast.error("注册失败"); }
    finally { setLoading(false); }
  };

  const inputStyle = {
    background: "var(--color-surface)",
    borderColor: "var(--color-border)",
    color: "var(--foreground)",
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left - Brand Showcase */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
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
              开启你的AI学习之旅<br />
              从入门到精通
            </h1>
            <div className="space-y-4">
              {[
                { icon: BookOpen, text: "免费课程无限畅学" },
                { icon: GraduationCap, text: "实战项目驱动学习" },
                { icon: Award, text: "获得专业认证证书" },
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

      {/* Right - Register Form */}
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
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>创建账户</h2>
            <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>注册后即可开始学习AI课程</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>用户名</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="你的用户名"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all"
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Email */}
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
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Verification Code */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>邮箱验证码</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="6位验证码"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all"
                    style={inputStyle}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={sendingCode || countdown > 0}
                  className="px-4 py-3 rounded-xl text-sm font-medium border transition-all disabled:opacity-50 whitespace-nowrap"
                  style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)", background: "var(--color-surface)" }}
                >
                  {sendingCode ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : countdown > 0 ? (
                    `${countdown}秒`
                  ) : (
                    "发送验证码"
                  )}
                </button>
              </div>
            </div>

            {/* Password */}
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
                  style={inputStyle}
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
              <div className="flex gap-3 mt-2">
                {pwdChecks.map((c) => (
                  <span
                    key={c.label}
                    className="flex items-center gap-1 text-xs"
                    style={{ color: c.ok ? "var(--color-success)" : "var(--foreground-muted)" }}
                  >
                    <CheckCircle className="h-3 w-3" />
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>确认密码</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
                <input
                  type={showPwd ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all"
                  style={inputStyle}
                  required
                />
              </div>
              {confirm && password !== confirm && (
                <p className="text-xs mt-1.5" style={{ color: "var(--color-error)" }}>密码不一致</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm cursor-pointer" style={{ color: "var(--foreground-secondary)" }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-indigo-500"
              />
              <span>
                我已阅读并同意{" "}
                <Link href="/terms" className="font-medium hover:underline" style={{ color: "var(--color-primary)" }}>
                  服务条款
                </Link>
              </span>
            </label>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01] disabled:opacity-50 flex items-center justify-center"
              style={{ background: "var(--gradient-accent)", color: "#ffffff" }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "注册"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>
              已有账户？{" "}
              <Link href="/login" className="font-medium hover:underline" style={{ color: "var(--color-primary)" }}>
                登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
