import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tyche — AI 时代的信息基础设施',
  description: 'Tyche 是 AI 时代的信息品牌。我们的第一个产品「国际・AI・Agent 日报」，每天为你筛选真正值得读的新闻。',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'Tyche — AI 时代的信息基础设施',
    description: '每天为你筛选真正值得读的新闻。深度、克制、有认知增量。',
    url: 'https://tyche.love',
    siteName: 'Tyche',
    locale: 'zh_CN',
    type: 'website',
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
