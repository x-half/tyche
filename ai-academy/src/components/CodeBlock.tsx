"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Highlight
      theme={isDark ? themes.nightOwl : themes.nightOwlLight}
      code={code.trim()}
      language={language || "text"}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} overflow-x-auto p-4 rounded-xl border`}
          style={{
            ...style,
            backgroundColor: "var(--code-bg)",
            color: "var(--code-text)",
            borderColor: "var(--code-border)",
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="table-row">
              <span className="table-cell pr-4 select-none text-right w-8 text-xs" style={{ color: "var(--foreground-muted)" }}>
                {i + 1}
              </span>
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
