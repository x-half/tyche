"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye } from "lucide-react"
import { templates } from "@/components/resume/template-previews"

export function TemplatesSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/20 text-primary">
            精选模板
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            找到适合你的
            <span className="gradient-text">完美模板</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            每种模板都有独特的布局设计，总有一款适合你的行业和风格
          </p>
        </div>

        {/* 模板网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {templates.map((template) => (
            <Link 
              key={template.id} 
              href={`/resumes/new?template=${template.id}`}
              className="group"
            >
              <div className="relative rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* 模板预览 */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <div className="absolute inset-1.5 shadow rounded-sm overflow-hidden">
                    <template.Preview />
                  </div>
                  
                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* 模板信息 */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}