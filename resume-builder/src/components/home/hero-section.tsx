"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, FileText, Download, Palette } from "lucide-react"
import { useState } from "react"
import { AuthModal } from "@/components/auth/auth-modal"

export function HeroSection() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [authModal, setAuthModal] = useState(false)

  const handleStartClick = () => {
    if (status === "loading") return
    if (session) {
      router.push("/resumes/new")
    } else {
      setAuthModal(true)
    }
  }

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI 驱动的简历制作工具</span>
            </div>

            {/* 主标题 */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up">
              打造你的
              <br />
              <span className="gradient-text">完美简历</span>
            </h1>

            {/* 副标题 */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              精选专业模板，智能编辑体验，一键导出 PDF。
              <br className="hidden md:block" />
              让你的简历在众多求职者中脱颖而出。
            </p>

            {/* CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={handleStartClick}
              >
                <span className="flex items-center gap-2">
                  免费开始使用
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-primary/5">
                <Link href="/#templates" className="flex items-center gap-2">
                  浏览模板库
                </Link>
              </Button>
            </div>

            {/* 特性标签 */}
            <div className="flex flex-wrap items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-sm font-medium">10+ 精美模板</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                  <Download className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm font-medium">PDF 高清导出</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center">
                  <Palette className="h-4 w-4 text-purple-500" />
                </div>
                <span className="text-sm font-medium">自定义样式</span>
              </div>
            </div>
          </div>

          {/* 预览图 */}
          <div className="mt-20 relative max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden">
              <div className="h-8 bg-muted/50 border-b flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 text-xs text-muted-foreground">ResumeBuilder - 简历编辑器</div>
              </div>
              <div className="p-8 bg-gradient-to-br from-background to-muted/30">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1 space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                    <div className="h-3 bg-muted rounded w-4/5" />
                    <div className="mt-6 h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                  <div className="col-span-2 space-y-4">
                    <div className="h-8 bg-primary/20 rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-muted/50 rounded-lg" />
                      <div className="h-20 bg-muted/50 rounded-lg" />
                    </div>
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        defaultView="register"
      />
    </>
  )
}