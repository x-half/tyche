import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "学AI - 管理后台",
  description: "学AI学习平台管理后台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
