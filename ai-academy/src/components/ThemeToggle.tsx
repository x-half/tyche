"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const r = Math.hypot(cx, cy);

    // 1. 先切换主题
    setTheme(newTheme);

    // 2. 给 body 加 clip-path：从中心圆点开始，隐藏新主题的全貌
    document.body.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

    // 3. 下一帧设置过渡和目标值，触发动画
    requestAnimationFrame(() => {
      document.body.style.transition = "clip-path 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      document.body.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`;
    });

    // 4. 动画结束后清理
    setTimeout(() => {
      document.body.style.transition = "none";
      document.body.style.clipPath = "none";
    }, 650);
  };

  return (
    <button
      onClick={toggle}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-hover)] ${className}`}
      aria-label={theme === "light" ? "切换到深色模式" : "切换到浅色模式"}
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-300 ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`} />
        <Moon className={`absolute inset-0 h-5 w-5 text-indigo-400 transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      </div>
    </button>
  );
}
