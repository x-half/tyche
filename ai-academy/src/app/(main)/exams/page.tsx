"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Clock, FileText, Users } from "lucide-react";

const examData = [
  { id: "llm-basics-cert", title: "LLM基础认证", desc: "测试大语言模型基础知识", course: "LLM应用开发入门", questions: 30, time: 45, pass: 60, free: true, price: 0, attempts: 0, rate: 0 },
  { id: "prompt-cert", title: "Prompt Engineering 认证", desc: "验证提示词工程能力", course: "Prompt Engineering 精通指南", questions: 40, time: 60, pass: 70, free: false, price: 9.9, attempts: 0, rate: 0 },
  { id: "rag-cert", title: "RAG系统专家认证", desc: "证明RAG系统构建能力", course: "企业级RAG实战", questions: 50, time: 75, pass: 70, free: false, price: 15.9, attempts: 0, rate: 0 },
  { id: "agent-cert", title: "AI Agent开发认证", desc: "验证Agent开发能力", course: "LangGraph 工作流开发", questions: 45, time: 60, pass: 70, free: false, price: 15.9, attempts: 0, rate: 0 },
];

export default function ExamsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background-secondary)" }}>
      <div className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--foreground)" }}>考试认证</h1>
          <p className="text-sm mt-1" style={{ color: "var(--foreground-secondary)" }}>通过考试获得专业证书</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {examData.map((exam) => (
            <div
              key={exam.id}
              className="rounded-2xl border p-6 card-hover"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--color-primary-soft)" }}>
                  <Award className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: exam.free ? "var(--color-success-light)" : "var(--color-primary-soft)", color: exam.free ? "var(--color-success)" : "var(--color-primary)" }}>
                  {exam.free ? "免费" : `¥${exam.price}`}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-1.5" style={{ color: "var(--foreground)" }}>{exam.title}</h3>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>{exam.desc}</p>
              <div className="flex items-center gap-3 text-[11px] mb-3" style={{ color: "var(--foreground-muted)" }}>
                <span>{exam.questions}题</span>
                <span>{exam.time}分钟</span>
                <span>及格{exam.pass}分</span>
              </div>
              <p className="text-[11px] mb-4" style={{ color: "var(--foreground-muted)" }}>关联课程：{exam.course}</p>
              <Link
                href={`/exams/${exam.id}`}
                className="block w-full py-2.5 rounded-xl text-xs font-semibold text-center transition-all hover:scale-[1.01]"
                style={{ background: "var(--color-primary)", color: "var(--color-primary-text)" }}
              >
                开始考试
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
