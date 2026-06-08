"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background-secondary)" }}>
      <div className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>关于</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl">
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>关于学AI</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--foreground-secondary)" }}>
            学AI是一个专注于AI技术学习的平台。我们提供系统化的课程和学习路径，
            帮助开发者掌握LLM、Agent、RAG、微调等前沿技术。
          </p>

          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>我们的理念</h2>
          <div className="space-y-3 mb-6">
            {[
              { title: "内容为王", desc: "每门课程都经过精心设计，确保学完就能用" },
              { title: "实战导向", desc: "所有课程以实际项目为核心，不做纯理论" },
              { title: "持续更新", desc: "课程内容紧跟技术前沿，持续迭代" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--color-primary)" }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{item.title}</p>
                  <p className="text-xs" style={{ color: "var(--foreground-secondary)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>联系我们</h2>
          <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>邮箱：contact@xueai.com</p>
        </div>
      </div>
    </div>
  );
}
