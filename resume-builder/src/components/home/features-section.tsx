"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, Palette, Download, Zap, Shield, Clock, Sparkles, Layout } from "lucide-react"

const features = [
  {
    icon: Layout,
    title: "精美模板",
    description: "10+ 专业设计的简历模板，适配不同行业和场景",
    color: "bg-blue-500/10 text-blue-500",
    gradient: "from-blue-500/5 to-transparent",
  },
  {
    icon: Palette,
    title: "自定义样式",
    description: "自由调整颜色、字体、布局，打造个性化简历",
    color: "bg-purple-500/10 text-purple-500",
    gradient: "from-purple-500/5 to-transparent",
  },
  {
    icon: Download,
    title: "PDF导出",
    description: "一键导出高质量PDF，完美呈现你的简历",
    color: "bg-green-500/10 text-green-500",
    gradient: "from-green-500/5 to-transparent",
  },
  {
    icon: Zap,
    title: "智能编辑",
    description: "拖拽式编辑器，实时预览，轻松调整内容顺序",
    color: "bg-amber-500/10 text-amber-500",
    gradient: "from-amber-500/5 to-transparent",
  },
  {
    icon: Shield,
    title: "数据安全",
    description: "你的数据加密存储，隐私安全有保障",
    color: "bg-rose-500/10 text-rose-500",
    gradient: "from-rose-500/5 to-transparent",
  },
  {
    icon: Clock,
    title: "云端保存",
    description: "随时随地访问和编辑你的简历",
    color: "bg-cyan-500/10 text-cyan-500",
    gradient: "from-cyan-500/5 to-transparent",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">强大功能</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            为什么选择
            <span className="gradient-text">我们</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            我们提供专业的简历制作工具，让你轻松创建令人印象深刻的简历
          </p>
        </div>

        {/* 特性卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <CardContent className="relative p-8">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10+", label: "精美模板" },
            { value: "50K+", label: "用户信赖" },
            { value: "100K+", label: "简历创建" },
            { value: "4.9", label: "用户评分" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}