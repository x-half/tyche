"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      if (!containerRef.current) return;

      try {
        const mermaid = (await import("mermaid")).default;

        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: isDark ? "#1e293b" : "#f3f4f6",
            primaryTextColor: isDark ? "#f1f5f9" : "#111827",
            primaryBorderColor: isDark ? "#334155" : "#d1d5db",
            lineColor: isDark ? "#94a3b8" : "#6b7280",
            secondaryColor: isDark ? "#263548" : "#e5e7eb",
            tertiaryColor: isDark ? "#1e293b" : "#f9fafb",
            background: isDark ? "#1e293b" : "#ffffff",
            mainBkg: isDark ? "#1e293b" : "#ffffff",
            nodeBorder: isDark ? "#334155" : "#d1d5db",
            clusterBkg: isDark ? "#0f172a" : "#f9fafb",
            clusterBorder: isDark ? "#334155" : "#e5e7eb",
            titleColor: isDark ? "#f1f5f9" : "#111827",
            edgeLabelBackground: isDark ? "#1e293b" : "#ffffff",
            nodeTextColor: isDark ? "#f1f5f9" : "#111827",
            fontSize: "14px",
          },
          securityLevel: "loose",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 15,
          },
          sequence: {
            diagramMarginX: 20,
            diagramMarginY: 20,
          },
        });

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        containerRef.current.innerHTML = "";
        const { svg } = await mermaid.render(id, chart);

        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err: any) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setError(err.message || "渲染失败");
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 p-4 rounded-xl border" style={{ background: "var(--color-error-light)", borderColor: "var(--color-error)" }}>
        <p className="text-sm mb-2" style={{ color: "var(--color-error)" }}>图表渲染失败</p>
        <pre className="text-xs overflow-auto" style={{ color: "var(--color-error)" }}>{chart}</pre>
      </div>
    );
  }

  return (
    <div className="my-6 p-6 rounded-2xl border" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
      <div ref={containerRef} className="flex justify-center overflow-x-auto" />
    </div>
  );
}
