import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.13 · 国际・AI・Agent 日报',
  description: 'Orbán下台、Trump vs教皇、168条人命、GLM-5.1开源首超闭源、Nvidia Agent Toolkit',
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
            <span className="article-date-badge">2026.04.13</span>
            <span className="article-weekday">周一</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>三个板块各挑了一条真正值得聊的。不是快讯合集，是有&quot;认知增量&quot;的事件。有些读起来可能不舒服，但它发生了。
          </div>
        </section>

        {/* Section 1: International */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">1</div>
            <div>
              <div className="section-title-text">国际</div>
              <div className="section-title-en">Three Events Reshaping the World Order</div>
            </div>
          </div>

          <div className="article-sub">
            <h3>Orbán 下台：欧洲政治最大的一声雷</h3>
            <p>
              4月12日，匈牙利现任总理 Viktor Orbán 承认败选，执政党 Fidesz 结束为期五届、跨越十六年的执政。
            </p>
            <p>
              胜出的是 Péter Magyar 领导的新政党 Tisza。出口民调显示 Tisza 可能赢得三分之二绝对多数——这意味着新政府有能力推翻 Orbán 任内修订的削弱司法独立、巩固政党控制的宪法修正案。投票率是匈牙利自1990年共产主义结束以来最高。
            </p>
            <p>
              Orbán 不到三小时就发出败选声明，这个速度本身就是一个信号——没有舞弊指控，没有质疑结果，承认得干脆利落。
            </p>
            <div className="highlight-block">
              <strong>这件事的国际意义，远超匈牙利本身。</strong>
              <br /><br />
              Orbán 是欧洲最明确亲普京的政治人物，过去几年反复否决欧盟对乌克兰的援助计划，目前匈牙利冻结着欧盟对基辅提供的 <strong>900亿欧元</strong> 财政支持。Orbán 下台后，乌克兰的欧盟资金通道将不再受阻——这是欧洲对乌克兰战争的直接转折点。
              <br /><br />
              同样失去的还有普京在欧洲心脏地带的政治据点。Kremlin 在欧盟内部曾经有一个可以随时否决援乌法案的成员，现在没有了。
            </div>
            <p>
              美国方面，副总统 JD Vance 在竞选期间亲自前往布达佩斯为 Orbán 站台。Trump 本人也通过视频向 Orbán 竞选集会致意。这两个人押注了 Orbán 的连任。现在赌输了。
            </p>
            <div className="highlight-block">
              <strong>对中国来说</strong>——匈牙利是&quot;一带一路&quot;进入欧洲的重要节点，也是中国在欧盟内部最稳定的关系。政权更替是否会影响中匈关系，值得观察，但目前 Tisza 党的外交立场更靠近欧盟主流，而不是转向反华。
            </div>
          </div>

          <div className="article-sub">
            <h3>Trump 与教皇公开开火：历史上极罕见的外交裂痕</h3>
            <p>
              这大概是过去一周里，最让人意外的一条新闻。
            </p>
            <p>
              4月12日周日晚上，Trump 发了一系列措辞激烈的社交媒体帖子，直接攻击刚刚选出不到两周的美国出身教皇 Leo XIV——说他&quot;对犯罪软弱&quot;，&quot;在外交上很糟糕&quot;，是&quot;一个非常自由派的人&quot;，并且&quot;不应该成为教皇&quot;。同时附上了一张自己身着圣经风格长袍、手抚病榻男人的图片，暗示自己具有类似耶稣的神力。
            </p>
            <p>
              起因是 Leo XIV 在当天早些时候于圣彼得大教堂主持了一场祈祷活动，公开表示&quot;全能的妄想&quot;正在助长美国-以色列对伊朗的战争。就在几天前，Trump 曾警告将对伊朗实施空袭，声称&quot;只需四小时就能摧毁伊朗所有桥梁和发电厂&quot;，并发誓&quot;整个文明将在今晚灭亡&quot;。Leo 将这类言论描述为&quot;完全不可接受&quot;。
            </p>
            <div className="highlight-block">
              <strong>更深一层的问题在战争本身。</strong>
              <br /><br />
              美国-以色列对伊朗的军事行动已经持续数周。在临时停火协议于巴基斯坦举行美伊面对面谈判的同一天，Trump 宣布将对进出霍尔木兹海峡的船只实施封锁——这是全球约 <strong>20%石油</strong> 的过境通道。谈判随即破裂，没有达成协议。Trump 的立场是：谁去伊朗港口，就击沉谁。
              <br /><br />
              Leo 的非洲之行4月14日启动，将访问11天。Trump 的那句&quot;如果不是我在白宫，他根本不会在梵蒂冈&quot;——几乎是在明说教皇的人选取决于对美政策。这句话本身，就足以写进美国-梵蒂冈关系的年鉴里。
            </div>
          </div>

          <div className="article-sub">
            <h3>168条人命，换来了什么</h3>
            <p>
              从2026年9月开始，美国军方在东太平洋和加勒比海对据称运送毒品的船只实施了打击。截至本周，被打死的总人数已经达到 <strong>168人</strong>。
            </p>
            <p>
              最新一次是4月11日，两艘船被炸毁，5人死亡，1人幸存。军方声称目标是&quot;纳恐组织&quot;，但几乎从未公布这些船只确实在运送毒品的证据。白宫的逻辑是：Fentanyl 通过陆地从墨西哥进入美国（化学品来自中国和印度），而这些被炸的船在海上——两者之间的关联，美国官员从未说清楚。
            </p>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-number">168</div>
                <div className="stat-label">累计死亡人数</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">公布物证数量</div>
              </div>
            </div>
            <p>
              批评者质疑的还不只是逻辑链。国际法如何看待一个国家对公海上无明确国籍标识船只的致命打击？五角大楼没有提供任何被击毁船只载有货物的证据。幸存者被美国海岸警卫队救起后，没有任何关于他被以什么身份起诉或释放的公开信息。
            </p>
            <p>
              168人。这个数字比美国在也门、胡塞武装相关行动中公布的大多数单次事件死亡人数都要大。但它发生在海上，离新闻热点最远的地方。
            </p>
          </div>
        </section>

        {/* Section 2: LLM */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">2</div>
            <div>
              <div className="section-title-text">大模型</div>
              <div className="section-title-en">Open Source Catches Up — Then What?</div>
            </div>
          </div>

          <div className="article-sub">
            <h3>GLM-5.1：开源社区追上来了，然后呢</h3>
            <p>
              GLM-5.1 这周刷了不少技术圈从业者的屏。
            </p>
            <p>
              Z.ai（智谱 AI，香港上市，市值约528亿美元）发布的这个模型，在 SWE-bench Pro——真实 GitHub issue 解决能力测试——上得分 <strong>58.4</strong>，超过了 GPT-5.4（57.7）、Claude Opus 4.6（57.3）和 Gemini 3.1 Pro（54.2）。
            </p>
            <p>
              这是开源模型第一次在全球顶级编程基准上正面击败所有主要闭源选手，而且用的是 MIT 许可证，可商用，可下载。
            </p>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-number">58.4</div>
                <div className="stat-label">SWE-bench Pro 得分</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1700</div>
                <div className="stat-label">连续自主步数</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">7540亿</div>
                <div className="stat-label">参数规模</div>
              </div>
            </div>
            <p>
              这些数字本身不是最让人印象深刻的——<strong>真正值得注意的是它的&quot;耐力&quot;。</strong>
            </p>
            <p>
              去年最好的代理系统，单任务大概能跑 20 步就卡住了。GLM-5.1 可以连续自主运行 <strong>1700 步</strong>，完成一个复杂任务，中间遇到瓶颈会自己诊断、自己调整策略、自己测试修复方案。
            </p>
            <p>
              具体例子：在一项向量数据库优化任务里，模型在第 90 次迭代主动切换了算法架构，在第 240 次迭代引入了新的处理流程，最终将性能从 3,547 QPS 提升到 21,500 QPS——比单次会话内的最优结果快约六倍。整个过程没有任何人类介入。
            </p>
            <p>
              API 价格是每百万输入 1.40 美元、输出 4.40 美元。比 Claude Opus 4.6 的 30 美元低了约五分之三。
            </p>
            <div className="highlight-block">
              <strong>但真正悬而未决的问题只有一个：谁来负责？</strong>
              <br /><br />
              GLM-5.1 可以跑八小时，产出一套代码，然后出了问题——谁是那个承担责任的主体？Z.ai 的商业模式里没有回答这个问题。整个行业也没有答案。
            </div>
          </div>
        </section>

        {/* Section 3: Agent */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">3</div>
            <div>
              <div className="section-title-text">AI Agent</div>
              <div className="section-title-en">Progress and Irony, Simultaneously</div>
            </div>
          </div>

          <div className="article-sub">
            <h3>Nvidia 的 Android 剧本</h3>
            <p>
              黄仁勋在 GTC 2026（4月3日）发布了完全开源的 <strong>Nvidia Agent Toolkit</strong>，首批合作伙伴包括 Adobe、Salesforce、SAP、ServiceNow、Siemens、CrowdStrike、Palantir 等17家企业软件巨头。
            </p>
            <p>
              组件是四件套：Nemotron 开源模型系列（优化代理推理）、AI-Q 蓝图（感知-推理-行动框架）、OpenShell 运行时（沙箱安全隔离）、cuOpt 优化库。
            </p>
            <p>
              听起来是给开发者送礼。但仔细看结构：<strong>代码开源，CUDA 闭源。</strong>模型可以下载修改商用，但在 Nvidia GPU 上跑得最优。合作伙伴越多，基于这个框架开发的 AI 代理就越多——而所有这些代理，都在为 Nvidia 的 GPU 需求买单。
            </p>
            <p>
              历史先例是 Google 的 Android：操作系统免费送给所有人，整个移动生态围绕 Google 运转，每台设备最终都在为 Google 广告业务服务。Nvidia 正在 AI 代理时代做完全一样的事。
            </p>
            <div className="highlight-block">
              <strong>对于中国开发者来说</strong>，这个框架目前没有中国版本。Nvidia 的开源，是在美国出口管制背景下的开源——高端芯片进不来中国的现实没有改变。
            </div>
          </div>

          <div className="article-sub">
            <h3>Anthropic 的安全故事，自己先打了个脸</h3>
            <p>
              同在4月7日，Anthropic 宣布了 <strong>Project Glasswing</strong>：把一个&quot;太危险不发布&quot;的模型（Claude Mythos Preview）交给12家 Fortune 500 公司，让它们去找全球开源软件的零日漏洞。
            </p>
            <p>
              这个模型找到了：OpenBSD 一个存在了27年的漏洞（攻击者远程连网即可崩溃系统）、FFmpeg 一个16年来测试500万次从未被发现的 bug、Linux 内核里可以实现权限提升的漏洞链。这些已修复。
            </p>
            <p>
              Anthropic 的逻辑是：与其让这种能力流落到敌对者手里，不如先让防御方占位。联盟成员包括 AWS、Apple、Google、Microsoft、Nvidia、JPMorganChase——几乎涵盖了全球最重要的科技和金融机构。
            </p>
            <div className="highlight-block">
              <strong>但讽刺立刻来了。</strong>
              <br /><br />
              就在这个&quot;我们能保护全球软件安全&quot;的发布前两周，Anthropic 自己的运营出了两起严重事故：3月底，一篇关于 Mythos 的博客草稿泄露在了一个未加密的公开数据存储里，涉及约3000份内部文件；紧接着3月31日，npm 打包错误导致任何人执行 <code>npm install claude-code</code> 时，在约三小时内下载到了 Anthropic 512,000 行完整源代码。
              <br /><br />
              公司自己的解释是&quot;发布工具的人为错误，不是安全架构被入侵&quot;——技术上站得住。但当同一家公司一边宣称要成为全球软件安全的守护者，一边因为最基本的数据存储配置错误和打包脚本错误反复泄密，信任这个词的重量，就显得格外单薄了。
            </div>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>匈牙利变天，欧洲对乌克兰援助的最大障碍消失了，中欧格局进入新周期</li>
            <li>Trump 与教皇公开决裂，是理解当前美国外交行为方式的最清晰切片</li>
            <li>GLM-5.1 证明开源编程能力追上闭源最强选手——但&quot;AI 产出谁来负责&quot;的答案，比模型本身更远</li>
            <li>Nvidia 在用开源建 GPU 护城河，Anthropic 在用&quot;危险模型&quot;重建安全叙事——两家的共同点是：讲一个好故事，比做好一个产品容易得多</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026.04.13 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}