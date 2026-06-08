import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 默认首页配置
export const DEFAULT_HOMEPAGE_CONFIG = {
  siteName: "学AI",
  hero: {
    badge: "2026 全新升级 · 系统化AI学习平台",
    titleLine1: "掌握",
    titleLine2: "AI核心技能",
    description: "从零基础到实战专家，涵盖 LLM、Agent、RAG、微调等前沿方向。300+ 课时结构化内容，助你弯道超车。",
    ctaPrimary: "开始学习",
    ctaSecondary: "学习路径",
  },
  stats: [
    { label: "精品课程", value: "auto", icon: "BookOpen" },
    { label: "课时内容", value: "300+", icon: "GraduationCap" },
    { label: "注册学员", value: "500+", icon: "Users" },
    { label: "认证方向", value: "6", icon: "Award" },
  ],
  features: {
    sectionTitle: "为什么选择学AI",
    sectionSubtitle: "不只是课程，是完整的成长体系",
    items: [
      {
        icon: "BookOpen",
        title: "体系化课程",
        description: "从入门到精通，每门课程都有清晰的学习目标和实战项目，拒绝碎片化学习。",
        gradient: "from-indigo-500 to-purple-500",
      },
      {
        icon: "Cpu",
        title: "前沿技术覆盖",
        description: "涵盖LLM、Agent、RAG、微调、多模态等最新AI技术方向，紧跟行业趋势。",
        gradient: "from-emerald-500 to-teal-500",
      },
      {
        icon: "Award",
        title: "专业认证体系",
        description: "完成学习路径获得专业认证证书，证明你的AI技能水平，提升职业竞争力。",
        gradient: "from-amber-500 to-orange-500",
      },
    ],
  },
  coursesSection: {
    freeTitle: "免费入门课程",
    paidTitle: "精品付费课程",
    ctaText: "查看全部课程",
  },
  pathsSection: {
    sectionTitle: "学习路径",
    sectionSubtitle: "不知道学什么？跟着路径走",
    sectionDescription: "我们为你规划了清晰的学习路线，从入门到精通",
    items: [
      { title: "LLM 应用开发", description: "掌握大模型应用开发的核心技能，从 API 调用到自建应用", count: 5, icon: "Zap", gradient: "from-amber-400 to-orange-500" },
      { title: "RAG 系统架构", description: "构建企业级知识库系统，实现智能检索增强生成", count: 4, icon: "Brain", gradient: "from-blue-400 to-indigo-500" },
      { title: "AI Agent 开发", description: "打造能自主决策的智能代理系统", count: 4, icon: "GraduationCap", gradient: "from-purple-400 to-pink-500" },
    ],
  },
  ctaSection: {
    title: "准备好开启你的\nAI学习之旅了吗？",
    description: "加入 500+ 学员，系统掌握AI技术，让未来多一种可能",
    ctaPrimary: "免费注册",
    ctaSecondary: "浏览课程",
  },
  footer: {
    copyright: "© 2026 学AI. All rights reserved.",
  },
};

// GET - 公开接口，获取首页配置
export async function GET() {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: "homepage_config" },
    });

    if (setting) {
      return NextResponse.json(JSON.parse(setting.value));
    }

    // 没有配置则返回默认值
    return NextResponse.json(DEFAULT_HOMEPAGE_CONFIG);
  } catch {
    return NextResponse.json(DEFAULT_HOMEPAGE_CONFIG);
  }
}
