#!/usr/bin/env node
/**
 * 日报生成脚本
 * 用法: node scripts/generate.mjs [YYYY-MM-DD]
 * 不带参数则生成今天的日报
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// 解析日期
const dateArg = process.argv[2]
const today = new Date()
const [y, m, d] = dateArg
  ? dateArg.split('-').map(Number)
  : [today.getFullYear(), today.getMonth() + 1, today.getDate()]

const dateStr = `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const weekDay = weekDays[new Date(y, m - 1, d).getDay()]

// 文章保存路径
const articleDir = path.join(ROOT, 'app', 'articles', dateStr)
const articlePagePath = path.join(articleDir, 'page.tsx')

// 检查是否已存在（非当天日期的文件不覆盖，当天的直接覆盖）
const todayStr = new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
const isToday = dateStr === todayStr
if (fs.existsSync(articlePagePath) && !isToday) {
  console.log(`⏭️  ${dateStr} 已存在，跳过生成`)
  process.exit(0)
}
if (isToday && fs.existsSync(articlePagePath)) {
  console.log(`📝 ${dateStr} 已存在（当日），即将覆盖重写`)
}

// 确保目录存在
fs.mkdirSync(articleDir, { recursive: true })

// 如果是未来日期，不生成
const now = new Date()
const articleDate = new Date(y, m - 1, d)
if (articleDate > now) {
  console.log(`⏭️  ${dateStr} 是未来日期，跳过生成`)
  process.exit(0)
}

// 文章页模板
const template = `import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 ${dateStr} · 国际・AI・Agent 日报',
  description: '（请编辑 description 内容）',
}

export default function ArticlePage() {
  return (
    <>
      <header className="site-header">
        <a href="/" className="site-name">📮 日报</a>
        <a href="/" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none' }}>← 返回目录</a>
      </header>

      <main className="article-container">
        {/* Hero */}
        <section className="article-hero">
          <div className="article-eyebrow">
            <span className="article-date-badge">${dateStr.replace(/-/g, '.')}</span>
            <span className="article-weekday">${weekDay}</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>三个板块各挑了一条真正值得聊的。不是快讯合集，是有&quot;认知增量&quot;的事件。有些读起来可能不舒服，但它发生了。
          </div>
        </section>

        {/* Section 1: 国际 */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">1</div>
            <div>
              <div className="section-title-text">国际</div>
              <div className="section-title-en">International</div>
            </div>
          </div>
          <div className="article-sub">
            <h3>（标题）</h3>
            <p>（正文内容，编辑后替换）</p>
          </div>
        </section>

        {/* Section 2: 大模型 */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">2</div>
            <div>
              <div className="section-title-text">大模型</div>
              <div className="section-title-en">Large Language Models</div>
            </div>
          </div>
          <div className="article-sub">
            <h3>（标题）</h3>
            <p>（正文内容，编辑后替换）</p>
          </div>
        </section>

        {/* Section 3: AI Agent */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">3</div>
            <div>
              <div className="section-title-text">AI Agent</div>
              <div className="section-title-en">AI Agent</div>
            </div>
          </div>
          <div className="article-sub">
            <h3>（标题）</h3>
            <p>（正文内容，编辑后替换）</p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>（待编辑）</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · ${dateStr} · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
`

fs.writeFileSync(articlePagePath, template)
console.log(`✅ 已生成: app/articles/${dateStr}/page.tsx`)