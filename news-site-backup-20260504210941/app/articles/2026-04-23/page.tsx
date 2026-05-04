import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.23 · 国际・AI・Agent 日报',
  description: '五角大楼公布史上最大规模军费预算；日本松绑武器出口；GPT Images 2.0文生图能力断层领先',
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
            <span className="article-date-badge">2026.04.23</span>
            <span className="article-weekday">周四</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>今日头条是五角大楼那份"金穹"+"黄金舰队"+AI的史上最大军费预算，地缘政治格局正在被AI重新绘制。同时OpenAI的Images 2.0发布，文生图领域出现断层式领先。
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
            <h3>五角大楼公布史上最大规模军费预算："金穹"、舰队与AI</h3>
            <p>4月22日，美国国防部公布2026财年预算申请，金额创下历史新高。核心内容被概括为"金穹"（Golden Dome）反导系统、"黄金舰队"（Golden Fleet）海空力量更新，以及大规模AI军事化应用三个部分。"金穹"计划旨在构建面向太空的主动防御网络，拦截对手的高超音速武器；"黄金舰队"则聚焦于舰艇和潜艇的更新换代，以应对西太平洋日益复杂的海上对抗环境。</p>
            <p>这笔预算的规模意味着美国防务政策正式进入"AI优先"的新阶段。传统武器平台的研发周期被压缩，军费正在向算法、数据和无人系统倾斜。对全球军备竞赛而言，这意味着技术代差的窗口正在快速收窄——没有AI支撑的防御体系将面临系统性落后。</p>
            <p>延伸来看，"金穹"这类天基反导系统本质上是在将太空军事化，中俄两国势必会作出对等反应。某种程度上，这份预算不是在买安全，而是在买更大的不确定性。</p>
            <p>来源：<a href="https://www.thepaper.cn/list_25430" target="_blank">澎湃防务</a></p>
          </div>

          <div className="article-sub">
            <h3>日本正式松绑武器出口：跨越"和平主义"红线</h3>
            <p>日本政府4月22日正式宣布松绑武器出口限制，允许向"志同道合的国家"出口具有杀伤性的防御装备。这是战后日本安保政策的重大转折，意味着"无核三原则"和武器出口禁令这两条"和平主义"基石都在被侵蚀。</p>
            <p>根据新规，日本可以出口导弹、护卫舰等重型装备，参与多国联合研发项目。岸田政府将此包装为"维护印太自由开放"的必要举措，但国内民调显示75%民众仍支持维持"无核三原则"，67%反对武器出口。民意与政策的撕裂，某种程度上反映了日本精英层面对大国竞争焦虑的战略冒进。</p>
            <p>对亚洲安全格局而言，一个更"正常化"的日本意味着地区军备竞争的加剧。历史一再证明，当曾经的和平主义者开始武装自己，区域内其他国家很难不跟进。</p>
            <p>来源：<a href="https://www.thepaper.cn/list_25430" target="_blank">澎湃防务</a></p>
          </div>

          <div className="article-sub">
            <h3>美菲"肩并肩"史上最大规模军演：日本首次派兵参与</h3>
            <p>美菲两国4月22日启动"肩并肩"联合军演，此次规模为历年之最，焦点是南海争端模拟应对。更值得关注的是，日本自卫队今年首次正式派兵参与演习，这标志着美国在亚太的联盟体系正在从"双边为主"向"多边网络"演进。</p>
            <p>日本派兵参与南海方向的演习，本质上是在配合美国的"印太战略"布局，同时也为自身军事正常化寻找实践场景。对菲律宾而言，在中美之间的选边站队压力进一步加剧。</p>
            <p>这次军演的时间点恰好在中美元首通话之后，某种程度上是在用"秀肌肉"向北京传递信号。</p>
            <p>来源：<a href="https://www.thepaper.cn/list_25430" target="_blank">澎湃防务</a></p>
          </div>

          <div className="article-sub">
            <h3>美新型战略级隐身无人机首次实战：游戏规则改变者？</h3>
            <p>美国新型战略级隐身无人机据报已在中东执行实战任务，这是该型装备首次投入真实战场。与传统无人机不同，战略级隐身无人机具备穿透先进防空系统的能力，续航和载荷接近有人驾驶战略轰炸机，被军事观察者称为"游戏规则改变者"。</p>
            <p>其战略意义在于：过去执行穿透打击任务需要有人轰炸机承担巨大风险，而现在无人系统可以在不伤亡人员的情况下深入敌方领空。这不仅改变了空战样式，也降低了发动空袭的政治门槛——当风险降低，克制也会降低。</p>
            <p>来源：<a href="https://www.thepaper.cn/list_25430" target="_blank">澎湃防务</a></p>
          </div>

          <div className="article-sub">
            <h3>人民海军AI穿越微电影刷屏：技术与叙事的结合</h3>
            <p>4月23日是人民海军成立77周年，央视军事推出AI穿越微电影《致远归航》，用AI技术再现1894年黄海海战，让致远舰与当今的南昌舰、福建舰同框。影片在社交媒体广泛传播，展示了AI在军事叙事和舆论战中的新应用。</p>
            <p>这不仅是技术演示，更是一种"数字爱国主义"叙事的确立——用AI将历史与当下连接，在年轻受众中建立情感共鸣。某种程度上，军事宣传正在进入AIGC时代。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33032397" target="_blank">澎湃新闻</a></p>
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
            <h3>OpenAI发布Images 2.0：文生图领域出现断层式领先</h3>
            <p>4月22日，OpenAI发布ChatGPT Images 2.0，一经发布便以242分的优势登顶Image Arena文生图榜单榜首，创下该领域最大分差纪录。新版本新增"思考模式"——生成前先拆解任务、搜索网络、创建多版本并自我复核。更关键的是，中文、日文等非拉丁字母文字渲染能力取得突破，以往"中文乱码"的最大痛点被解决。</p>
            <p>实测显示，Images 2.0能够精准还原澎湃新闻Logo、App界面UI乃至珠峰大本营场景，中文标识字体排版与实际品牌视觉系统一致。这对设计行业、内容创作行业的冲击将是直接的。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33031058" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>谷歌发布第八代自研AI芯片：训练与推理拆分，性价比大增</h3>
            <p>谷歌在4月22日发布了第八代自研AI芯片，核心变化是将训练芯片和推理芯片完全拆分，针对不同任务优化设计。此举被业界视为对英伟达垄断的又一次挑战——训练侧和推理侧的芯片需求差异极大，通用GPU的效率损耗正在被专用芯片弥补。</p>
            <p>对云服务商和企业用户而言，专用推理芯片的成本优势将加速AI应用的普及。</p>
            <p>来源：<a href="https://www.thepaper.cn/list_25434" target="_blank">澎湃新闻 10%公司</a></p>
          </div>

          <div className="article-sub">
            <h3>蓝色光标一季度研发费用大增240%，AI营销加速落地</h3>
            <p>蓝色光标4月22日公布一季报，净利润1.26亿元同比增长超三成，研发费用大增240%。公司明确表示，AI营销工具正在成为的核心收入来源，AI生成广告素材、AI驱动的投放优化已规模化商用。</p>
            <p>这说明AI在营销行业的落地速度比预期更快——不是在概念验证阶段，而是已经进入收入贡献期。</p>
            <p>来源：<a href="https://www.thepaper.cn/list_25434" target="_blank">澎湃新闻 10%公司</a></p>
          </div>

          <div className="article-sub">
            <h3>特斯拉一季度净利润4.77亿美元同比增长17%</h3>
            <p>特斯拉4月22日发布财报，一季度净利润4.77亿美元，同比增长17%。增长主要来自递延收入和软件服务，FSD（完全自动驾驶）订阅收入贡献上升。汽车毛利率压力仍在，但软件收入的占比提升正在改变特斯拉的估值逻辑。</p>
            <p>来源：<a href="https://www.thepaper.cn/list_25434" target="_blank">澎湃新闻 10%公司</a></p>
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
            <h3>东辽县推素人直播带货培训：AI Agent下沉到县域就业</h3>
            <p>吉林省东辽县人社局联合抖音官方开展素人直播技能培训，面向待业妇女传授账号搭建、直播话术、选品和带货实战技能。首批学员已开启直播实践，实现居家就业。</p>
            <p>这类"数字技能下沉"正在成为县域经济的新基建——不是让所有人成为AI专家，而是让AI工具降低普通人参与数字经济的门槛。</p>
            <p>来源：<a href="https://m.thepaper.cn/newsDetail_forward_33032425" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>绍兴越城区打造"宠物友好街道"：萌宠经济的AI运营思路</h3>
            <p>浙江绍兴越城区城南街道一周内吸引167家商户加盟"宠物友好"网络，配套AI客流分析、宠物消费画像等数字化运营工具。当地目标到2028年宠物产业规模突破40亿元。</p>
            <p>这个案例说明，AI Agent不仅在高大上的技术场景落地，也在消费细分赛道悄悄渗透——用数据理解宠物主需求，比理解工业客户容易得多。</p>
            <p>来源：<a href="https://m.thepaper.cn/newsDetail_forward_33031901" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>郑州"五一"有奖发票即时开奖：政务Agent提升消费刺激效率</h3>
            <p>郑州市在"五一"假期推出有奖发票即时开奖活动，消费者上传发票后七天内奖金到账，平台基于云闪付和郑好办APP运行。这是一套"政务+消费+AI核验"的自动化流程，减少了人工审核环节。</p>
            <p>来源：<a href="https://m.thepaper.cn/newsDetail_forward_33031907" target="_blank">澎湃新闻</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>美国史上最大军费预算将AI军事化推向新阶段，"金穹"计划重塑太空安全格局</li>
            <li>日本武器出口禁令松绑，"和平主义"政治基础正在被侵蚀</li>
            <li>OpenAI Images 2.0发布，中文渲染突破，文生图领域出现断层式领先</li>
            <li>AI营销和AI应用正在从概念走向规模化收入，蓝色光标研发投入大增240%</li>
            <li>AI Agent加速下沉：县域直播培训、政务即时开奖、宠物经济运营</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-23 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
