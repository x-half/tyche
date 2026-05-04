import fs from 'fs'
import path from 'path'

function getDescription(articleDir: string): string {
  try {
    const content = fs.readFileSync(
      path.join(process.cwd(), 'app', 'articles', articleDir, 'page.tsx'),
      'utf8'
    )
    const match = content.match(/description:\s*['"]([^'"]+)['"]/)
    return match ? match[1] : '国际、AI、大模型 Agent 领域的今日要闻'
  } catch {
    return '国际、AI、大模型 Agent 领域的今日要闻'
  }
}

function getArticles() {
  const articlesDir = path.join(process.cwd(), 'app', 'articles')
  if (!fs.existsSync(articlesDir)) return []

  return fs.readdirSync(articlesDir)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse()
    .map((date) => {
      const [y, m, d] = date.split('-').map(Number)
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const weekday = weekdays[new Date(y, m - 1, d).getDay()]
      const description = getDescription(date)
      return {
        date,
        month: `${m}月`,
        day: `${d}日`,
        weekday,
        description,
        href: `/articles/${date}`,
      }
    })
}

export default function HomePage() {
  const articles = getArticles()
  const [latest, ...older] = articles

  return (
    <>
      <header className="site-header">
        <span className="site-name">📮 日报</span>
        <span className="site-date">每周一至周五 · 深度・克制・有认知增量</span>
      </header>

      <main className="home-layout page-enter">
        <div className="home-left">
          <section className="hero hero-enter">
            <div className="hero-eyebrow">
              <span className="hero-date-badge">Daily</span>
              <span className="hero-updated">每周一至周五更新</span>
            </div>
            <h1>国际・AI・Agent 日报</h1>
            <p className="hero-desc">
              每期聚焦三个板块各一条真正值得聊的新闻。不是快讯合集，是有&quot;认知增量&quot;的事件。有些读起来可能不舒服，但它发生了。
            </p>
          </section>

          {latest && (
            <a href={latest.href} className="latest-issue latest-enter">
              <div className="latest-issue-left">
                <div className="latest-issue-eyebrow">
                  <span className="latest-issue-badge">{latest.date}</span>
                  <span className="latest-issue-weekday">{latest.weekday}</span>
                </div>
                <div className="latest-issue-title">最新一期已发布</div>
                <div className="latest-issue-desc">{latest.description}</div>
              </div>
              <div className="latest-issue-arrow">→</div>
            </a>
          )}

          {articles.length === 0 && (
            <div style={{ padding: '48px 0', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>
              第一期正在生成中，稍后刷新页面…
            </div>
          )}

          <div className="home-slogan slogan-pc">天下大事，尽在 NEWS</div>
        </div>

        {older.length > 0 && (
          <div className="home-right archive-enter">
            <div className="archive-header">
              <span className="archive-header-text">往期</span>
            </div>
            <div className="archive-scroll">
              {older.map((article, i) => (
                <a key={article.date} href={article.href} className="archive-item" style={{ animationDelay: `${0.3 + i * 0.05}s` }}>
                  <div className="archive-date-block">
                    <span className="archive-date-month">{article.month}</span>
                    <span className="archive-date-day">{article.day}</span>
                    <span className="archive-weekday">{article.weekday}</span>
                  </div>
                  <div className="archive-content">
                    <div className="archive-desc">{article.description}</div>
                  </div>
                  <div className="archive-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="home-slogan slogan-mobile">天下大事，尽在 NEWS</div>
      </main>
    </>
  )
}
