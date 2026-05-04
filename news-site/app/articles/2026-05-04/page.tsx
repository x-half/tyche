import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026-05-04 · 国际・AI・Agent 日报',
  description: '国际・AI・Agent 日报，聚焦全球政治与大模型进展',
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
            <span className="article-date-badge">2026.05.04</span>
            <span className="article-weekday">周一</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>今天的关键词是"撤退"——阿联酋退出欧佩克+、巴克莱不再押注美联储降息、韩国人却在股市里创了历史新高。AI这边，国产具身智能开始万台级量产，中美两边的工程师在聊同一个问题：怎么让机器人真正落地。
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
            <h3>阿联酋退出欧佩克+，能源主权战略转身</h3>
            <p>阿布扎比国家石油公司（ADNOC）首席执行官苏丹·贾比尔近日密集发声，详解阿联酋退出石油输出国组织（欧佩克）及欧佩克+背后的战略逻辑。他表示，这是阿联酋重新定位自身在全球能源格局中地位的主权决定，"并非针对任何一方"。贾比尔同时强调，霍尔木兹海峡作为重要贸易航线的安全保障是"全球共同责任"，不能仅视为地区事务。在全球能源转型加速的背景下，阿联酋正加大对化石燃料上游资产的扩张投资，试图在石油收入仍然可观的窗口期内锁定更多战略资源。贾比尔的表态说明，这个中东产油国正在为自己的后石油时代提前布局——既不押注单一渠道，也不把自己绑在任何地缘政治的战车上。</p>
            <p>来源：<a href="https://finance.sina.com.cn/" target="_blank">新浪财经</a></p>
          </div>

          <div className="article-sub">
            <h3>波音737 MAX坠机事故再次面临民事诉讼</h3>
            <p>美国波音公司将于5月4日在芝加哥联邦法院出庭，就2019年埃塞俄比亚航空公司波音737 MAX客机坠机事故相关的民事诉讼应诉。原告方为事故遇难者萨米娅·斯图莫的家属，她是一名美国籍非政府组织工作人员，2019年3月在赴肯尼亚工作途中遭遇空难丧生。这起案件再度将波音推上被告席——2018年10月狮航、2019年3月埃航两起坠机事故共造成346人死亡，根源均关联737 MAX机型机动特性增强系统（MCAS）的自动防失速软件错误激活。波音已在刑事和解、航空公司赔偿之后，面临来自遇难者家属的新一轮民事追责，意味着这场持续七年的危机远未画上句号。</p>
            <p>来源：<a href="https://finance.sina.com.cn/" target="_blank">新浪财经</a></p>
          </div>

          <div className="article-sub">
            <h3>韩国综合股价指数KOSPI创历史新高6931点</h3>
            <p>韩国综合股价指数（KOSPI）5月4日涨幅扩大至5%，冲至6931.16点的历史最高位。半岛局势年内显著缓和，尹锡悦政府推动的"全球枢纽国家"战略叠加科技股业绩超预期，推动资金持续涌入韩股。分析师指出，半导体出口回暖与电池板块估值修复是本轮上涨的核心驱动力，但快速冲高也引发部分投资者对回调风险的警惕。</p>
            <p>来源：<a href="https://finance.sina.com.cn/" target="_blank">新浪财经</a></p>
          </div>

          <div className="article-sub">
            <h3>巴克莱修改美联储降息预测：2026年维持利率不变</h3>
            <p>巴克莱银行5月4日发布报告，大幅修正对美联储货币政策的预期，将此前预计的2026年9月降息25个基点的判断调整为"全年维持利率不变"。该行指出，美国经济韧性超出预期，通胀黏性尚未有效缓解，劳动力市场依旧紧张，这些因素共同支撑美联储保持观望态度。这一预期修正与部分华尔街机构转向一致，反映出市场对"higher for longer"的定价正在重新凝聚共识。</p>
            <p>来源：<a href="https://finance.sina.com.cn/" target="_blank">新浪财经</a></p>
          </div>

          <div className="article-sub">
            <h3>现货黄金失守4590美元/盎司，日内跌幅扩大</h3>
            <p>5月4日贵金属市场承压，现货黄金失守4590美元/盎司，日内跌幅达0.59%；纽约期金失守4600美元/盎司，跌幅扩大至0.96%。美元走强与美债收益率回升同步施压金价，地缘风险情绪缓和亦削弱避险需求。同期，现货白银跟随下跌，市场资金正从避险资产向风险资产再配置。</p>
            <p>来源：<a href="https://finance.sina.com.cn/" target="_blank">新浪财经</a></p>
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
            <h3>DeepClaude：Claude Code + DeepSeek V4 Pro，Cost降17倍</h3>
            <p>开发者 alattaran 开源了 DeepClaude 项目，将 Claude Code agent loop 与 DeepSeek V4 Pro 模型结合，实现成本削减17倍的效果。该项目在 Hacker News 引发热议，收获340+评分与126条讨论。核心思路是通过模型路由让轻量级任务绕开 Claude的高昂成本，保留 Claude Code 的执行能力用于复杂推理。目前该项目已在 GitHub 积累关注，展示了端侧模型与高阶Agent框架的互补可能。</p>
            <p>来源：<a href="https://github.com/aattaran/deepclaude" target="_blank">GitHub / Hacker News</a></p>
          </div>

          <div className="article-sub">
            <h3>苹果被曝内部用Claude Code构建生产级应用</h3>
            <p>苹果官方App意外打包了内部使用的 Claude.md 文档，坐实了这家全球市值最高的公司已在使用 Claude Code 构建生产级 AI 应用。外泄文档内容显示苹果团队曾围绕代码生成、自动化测试等场景使用 Anthropic 的编码工具。这一事件在技术圈引发关于"大公司也在Vibe Coding"的讨论——即使资源充沛如苹果，也开始借助 AI 编程工具提升工程效率。</p>
            <p>来源：<a href="https://36kr.com/p/3791662444911617" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>arXiv论文：AI Agents架构与真实世界应用全面综述</h3>
            <p>研究人员 Naveen Krishnan 在 arXiv 发表论文《AI Agents: Evolution, Architecture, and Real-World Applications》，系统梳理了AI Agent从单步任务执行到多智能体协作的演进路径，涵盖规划、记忆、工具调用、泛化等核心组件的技术选型，并列举了金融、医疗、客服等场景的落地案例。该论文为理解当前 Agent 技术栈提供了较完整的参考框架。</p>
            <p>来源：<a href="https://arxiv.org/abs/2503.12687" target="_blank">arXiv</a></p>
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
            <h3>智元机器人万台量产，具身智能规模化竞赛开启</h3>
            <p>2026年4月，智元机器人宣布第1万台机器人量产下线——从5000台到1万台仅用三个多月。宇树科技紧随其后递交IPO招股书，冲击"具身智能第一股"。在硅谷，中美具身公司也在秘密交流规模化落地的解法：数字竞速已从算法比赛蔓延到产线产能、出货量、招股说明书。具身智能的战事正在从实验室进入工厂。</p>
            <p>来源：<a href="https://36kr.com/p/3792155815304450" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>卓驭发布面向物理AI的多模态基础模型</h3>
            <p>自动驾驶算法厂商卓驭在北京车展期间发布了面向移动物理AI的原生多模态基础模型。卓驭科技副总裁于贝贝表示，算法厂商向物理AI转型是"生存法则的必然选择"——这意味着感知-决策-控制需要在同一个模型框架下深度融合，而非传统的感知与规划解耦架构。该方向与大模型厂商近期强调的"世界模型"路线正在殊途同归。</p>
            <p>来源：<a href="https://36kr.com/p/3789475357400068" target="_blank">36氪</a></p>
          </div>
        </section>

        {/* Section 4: 历史上的今天 */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">4</div>
            <div>
              <div className="section-title-text">历史上的今天</div>
              <div className="section-title-en">Today in History</div>
            </div>
          </div>

          <div className="article-sub">
            <h3>胡志明主席逝世50周年</h3>
            <p>2026年5月2日是胡志明主席逝世50周年纪念日。胡志明是越南民主共和国的缔造者，领导越南人民实现了民族独立与国家统一。他的诞辰和忌日在越南均为重要的国家纪念日。</p>
          </div>

          <div className="article-sub">
            <h3>欧洲怀疑主义浪潮持续升温</h3>
            <p>欧洲多国疑欧政党支持率持续攀升，英国脱欧的示范效应在法国、德国、意大利等国引发连锁反应，欧洲一体化进程面临严峻挑战。</p>
          </div>

          <div className="article-sub">
            <h3>教皇约翰·保罗二世诞辰纪念</h3>
            <p>天主教会在多个国家举行纪念活动，缅怀这位推动东西方对话、引领教会现代化的教皇。</p>
          </div>

          <div className="article-sub">
            <h3>第一届世界杯足球赛开幕</h3>
            <p>1930年5月2日，第一届世界杯足球赛在乌拉圭蒙得维的亚开幕，标志着现代足球运动进入新的发展阶段。</p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>阿联酋退出欧佩克+折射出产油国的战略焦虑——在能源转型窗口期加速锁定资源;</li>
            <li>波音737 MAX事故民事诉讼再度开庭，七年后危机仍未终结;</li>
            <li>DeepClaude开源：Claude Code + DeepSeek V4 Pro，推理成本降至1/17;</li>
            <li>国产具身智能进入万台量产阶段，具身机器人规模化竞争鸣枪;</li>
            <li>中美具身公司正在就"规模化落地"进行秘密交流，这或许是当前最务实的技术对话。</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-05-04 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}