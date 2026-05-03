"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"
import { AuthModal } from "@/components/auth/auth-modal"

export function CTASection() {
  const [authModal, setAuthModal] = useState(false)

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="relative rounded-3xl overflow-hidden">
            {/* 背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-purple-600" />
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl" />
            
            {/* 内容 */}
            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">立即开始</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                准备好创建
                <br />
                你的简历了吗？
              </h2>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                免费注册，立即开始制作专业简历。只需几分钟，就能拥有一份令人印象深刻的简历。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="h-14 px-8 text-lg rounded-xl bg-white text-primary hover:bg-white/90 shadow-xl"
                  onClick={() => setAuthModal(true)}
                >
                  <span className="flex items-center gap-2">
                    免费开始使用
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 border-white/30 text-white hover:bg-white/10">
                  <Link href="/templates">
                    浏览模板
                  </Link>
                </Button>
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