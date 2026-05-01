export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          Tyc<span>h</span>e
        </a>
        <div className="nav-links">
          <a href="#product">产品</a>
          <a href="#features">理念</a>
          <a href="#about">关于</a>
          <a href="https://news.tyche.love" className="nav-cta" target="_blank" rel="noopener">
            访问日报 →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI 时代的信息基础设施
        </div>

        <h1>
          在信息洪流中
          <br />
          为你<span className="accent">筛选真相</span>
        </h1>

        <p className="hero-subtitle">
          Tyche 是 AI 时代的信息品牌。我们相信，真正有价值的不是信息的数量，而是认知的增量。每一天，我们用 AI 为你筛选最值得深读的新闻。
        </p>

        <div className="hero-actions">
          <a href="https://news.tyche.love" className="btn-primary" target="_blank" rel="noopener">
            阅读今日日报
          </a>
          <a href="#about" className="btn-secondary">
            了解 Tyche
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">3</div>
            <div className="hero-stat-label">核心板块</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">18+</div>
            <div className="hero-stat-label">已发期刊</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">54+</div>
            <div className="hero-stat-label">深度解读</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">∞</div>
            <div className="hero-stat-label">认知增量</div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="section product-section" id="product">
        <div className="section-container">
          <div className="section-eyebrow">Product</div>
          <h2 className="section-title">我们的第一个产品</h2>
          <p className="section-desc">
            「国际・AI・Agent 日报」不是又一个新闻聚合器。每期只聊三条真正值得读的新闻，每一条都有认知增量。
          </p>

          <div className="product-card">
            <div className="product-card-inner">
              <div className="product-visual">
                <div className="product-date-stack">
                  <div className="product-date-item">
                    <span className="product-date-num">30</span>
                    <div className="product-date-meta">
                      <div className="product-date-title">四月 · 周四</div>
                      <div className="product-date-desc">国际・AI・Agent 日报</div>
                    </div>
                    <span className="product-date-tag">最新</span>
                  </div>
                  <div className="product-date-item">
                    <span className="product-date-num">29</span>
                    <div className="product-date-meta">
                      <div className="product-date-title">四月 · 周三</div>
                      <div className="product-date-desc">国际・AI・Agent 日报</div>
                    </div>
                  </div>
                  <div className="product-date-item">
                    <span className="product-date-num">28</span>
                    <div className="product-date-meta">
                      <div className="product-date-title">四月 · 周一</div>
                      <div className="product-date-desc">国际・AI・Agent 日报</div>
                    </div>
                  </div>
                  <div className="product-date-item">
                    <span className="product-date-num">27</span>
                    <div className="product-date-meta">
                      <div className="product-date-title">四月 · 周日</div>
                      <div className="product-date-desc">国际・AI・Agent 日报</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-info">
                <div className="product-name">Flagship Product</div>
                <h3 className="product-title">国际・AI・Agent 日报</h3>
                <p className="product-desc">
                  每周一至周五更新。聚焦三个板块 — 国际局势、大模型动态、AI Agent 前沿 — 各一条真正值得聊的新闻。不是快讯合集，是有「认知增量」的深度解读。
                </p>
                <div className="product-tags">
                  <span className="product-tag">国际局势</span>
                  <span className="product-tag">大模型</span>
                  <span className="product-tag">AI Agent</span>
                  <span className="product-tag">深度解读</span>
                </div>
                <a href="https://news.tyche.love" className="product-link" target="_blank" rel="noopener">
                  立即阅读 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="section-container">
          <div className="section-eyebrow">Principles</div>
          <h2 className="section-title">我们的编辑原则</h2>
          <p className="section-desc">
            在信息过载的时代，少即是多。我们用三条原则，确保每一期日报都值得你的时间。
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">克制</h3>
              <p className="feature-desc">
                每期只选三条新闻。不是因为懒，是因为绝大多数新闻不值得你花时间。我们帮你做第一轮筛选。
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">深度</h3>
              <p className="feature-desc">
                不做标题党，不做快讯搬运。每条新闻都有背景分析、因果链条和我们的独立解读，让你真正理解发生了什么。
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3 className="feature-title">认知增量</h3>
              <p className="feature-desc">
                如果一条新闻不能改变你对世界的某个认知，它就不配出现在日报里。我们追求的是「读完之后，你不一样了」。
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI 驱动</h3>
              <p className="feature-desc">
                用 AI 做信息采集、初筛和整理，但最终的判断和解读由人类完成。AI 是工具，不是替代品。
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3 className="feature-title">全球视野</h3>
              <p className="feature-desc">
                国际板块关注的不只是大国博弈，还有那些被主流媒体忽略但可能影响世界走向的事件。
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">前沿追踪</h3>
              <p className="feature-desc">
                AI Agent 和大模型领域变化极快。我们帮你追踪最重要的技术突破和产品动态，不错过关键节点。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section philosophy-section" id="about">
        <div className="section-container">
          <div className="philosophy-grid">
            <div className="philosophy-content">
              <div className="section-eyebrow">About Tyche</div>
              <h2 className="section-title">为什么叫 Tyche？</h2>
              <p className="section-desc">
                Tyche（Τύχη）是希腊神话中的命运女神，掌管着城市的兴衰和个人的际遇。在古希腊人看来，命运不是迷信，而是对不确定性的敬畏。
              </p>
              <div className="philosophy-quote">
                在 AI 时代，信息就是新的命运。你读到什么、理解什么、错过什么，决定了你看到的世界。Tyche 的使命，就是帮你在这个充满不确定性的时代，做出更好的信息选择。
              </div>
            </div>

            <div className="philosophy-visual">
              <div className="philosophy-card">
                <div className="philosophy-card-icon">🏛️</div>
                <div className="philosophy-card-title">命运女神</div>
                <div className="philosophy-card-desc">
                  Tyche，希腊神话中<br />掌管命运与机遇的女神
                </div>
              </div>
              <div className="philosophy-card">
                <div className="philosophy-card-icon">📰</div>
                <div className="philosophy-card-title">信息即命运</div>
                <div className="philosophy-card-desc">
                  你消费的信息<br />塑造你理解的世界
                </div>
              </div>
              <div className="philosophy-card">
                <div className="philosophy-card-icon">🧭</div>
                <div className="philosophy-card-title">认知导航</div>
                <div className="philosophy-card-desc">
                  在信息洪流中<br />做你的指南针
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">
          从今天开始<br />重新定义你的信息源
        </h2>
        <p className="cta-desc">
          每天花 5 分钟，读三条真正有价值的新闻。这不是消费，是投资。
        </p>
        <div className="hero-actions">
          <a href="https://news.tyche.love" className="btn-primary" target="_blank" rel="noopener">
            立即开始阅读
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            Tyc<span>h</span>e
          </div>
          <div className="footer-copy">
            © 2026 Tyche. AI 时代的信息基础设施.
          </div>
          <div className="footer-links">
            <a href="https://news.tyche.love" target="_blank" rel="noopener">日报</a>
            <a href="mailto:hi@tyche.love">联系我们</a>
          </div>
        </div>
      </footer>
    </>
  )
}
