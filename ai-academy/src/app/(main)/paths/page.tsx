"use client";

import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Target } from "lucide-react";

const paths = [
  { id: "ai-engineer", title: "AI工程师路径", desc: "从零基础到AI工程师的完整路线", icon: "\u{1F680}", courses: 12, duration: "6个月", steps: ["Python基础", "机器学习", "深度学习", "LLM应用", "RAG系统", "AI Agent"] },
  { id: "llm-developer", title: "LLM应用开发", desc: "专注大模型应用开发的专项路径", icon: "\u{1F48E}", courses: 8, duration: "3个月", steps: ["LLM基础", "Prompt工程", "Function Calling", "RAG", "Agent", "部署"] },
  { id: "agent-developer", title: "AI Agent开发", desc: "掌握Agent开发的核心技术栈", icon: "\u{1F916}", courses: 7, duration: "4个月", steps: ["Agent架构", "工具调用", "单Agent系统", "多Agent协作", "记忆系统", "生产部署"] },
  { id: "rag-specialist", title: "RAG系统专家", desc: "成为RAG系统专家", icon: "\u{1F50D}", courses: 6, duration: "3个月", steps: ["RAG原理", "文档处理", "向量数据库", "检索优化", "GraphRAG", "企业级RAG"] },
  { id: "fine-tuning", title: "模型微调专家", desc: "掌握大模型微调技术", icon: "\u{1F527}", courses: 5, duration: "3个月", steps: ["微调概念", "LoRA/QLoRA", "数据准备", "RLHF对齐", "模型部署"] },
  { id: "cv-engineer", title: "计算机视觉", desc: "从基础到高级CV技术", icon: "\u{1F441}\u{FE0F}", courses: 5, duration: "3个月", steps: ["CV基础", "目标检测", "图像生成", "视频处理", "多模态"] },
];

export default function PathsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background-secondary)" }}>
      <div className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--foreground)" }}>学习路径</h1>
          <p className="text-sm mt-1" style={{ color: "var(--foreground-secondary)" }}>为不同目标设计的系统化学习路线</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paths.map((path) => (
            <div
              key={path.id}
              className="rounded-2xl border p-6 card-hover"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
            >
              <div className="text-3xl mb-4">{path.icon}</div>
              <h3 className="font-semibold text-sm mb-1.5" style={{ color: "var(--foreground)" }}>{path.title}</h3>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>{path.desc}</p>
              <div className="flex items-center gap-3 text-[11px] mb-4" style={{ color: "var(--foreground-muted)" }}>
                <span>{path.courses}门课程</span>
                <span>{path.duration}</span>
              </div>
              <div className="space-y-2 mb-5">
                {path.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "var(--foreground-secondary)" }}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold"
                      style={{ background: "var(--color-primary-soft)", color: "var(--color-primary)" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
              <Link
                href="/courses"
                className="flex items-center gap-1 text-xs font-medium transition-colors"
                style={{ color: "var(--color-primary)" }}
              >
                开始学习 <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
