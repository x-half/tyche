import type { Metadata } from 'next'
import Script from 'next/script'
import PageClassManager from '@/components/PageClassManager'
import './globals.css'

export const metadata: Metadata = {
  title: '📮 国际・AI・Agent 日报',
  description: '每日国际、大模型、AI Agent 三个维度的要闻深度解读',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PageClassManager />
        {children}
        <Script
          src="https://analytics.tyche.love/tracker.v2.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
