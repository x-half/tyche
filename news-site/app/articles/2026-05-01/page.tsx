import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.05.01 · 国际・AI・Agent 日报',
  description: '苹果营收超预期，特斯拉披露关联收益，标普500创两年最大月涨幅；小鹏/小红书加码AI布局，HappyHorse不及预期',
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
            <span className="article-date-badge">2026.05.01</span>
            <span className="article-weekday">周五</span>
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
            <h3>苹果第二财季营收1111.8亿美元，批准千亿美元回购</h3>
            <p>苹果5月1日公布第二财季业绩，营收1111.8亿美元，同比增长17%，超市场预期；iPhone收入569.9亿美元，同比增长22%。净利润295.8亿美元，每股收益2.01美元，同样高于预期。公司批准至多1000亿美元的股票回购计划，并提高派息至每股0.27美元。库克同时释放了一个不太乐观的信号：第二季度内存成本已高于第一季度，预计第三季度内存成本将"显著高于"第二季度，后续对业务影响更大。苹果内存需求与AI算力布局高度绑定，存储芯片价格的波动正成为其成本结构中的新变量。这份财报整体稳健，但内存成本的预警让市场对下半年的利润率多了一分警惕。苹果同时宣布加大AI研发投入，分析师预期iPhone 17系列将搭载更强大的端侧AI能力，成为年内最大看点。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/newsflashes/3790016302095363" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>特斯拉年报复线：去年从SpaceX与xAI斩获5.73亿美元关联收入</h3>
            <p>特斯拉在修订版年度备案文件中披露，2025年通过向马斯克旗下SpaceX和xAI销售产品，共确认营收5.73亿美元。其中xAI占比最大，约4.301亿美元，主要涉及AI数据和服务往来；SpaceX贡献约1.433亿美元，媒体报道指向SpaceX去年第四季度采购了超1亿美元价值的赛博卡车。这份文件的特殊之处在于：特斯拉在1月发布的初始年度报告中并未披露SpaceX这笔金额，4月30日提交修订版时补全了这项数据。马斯克同时执掌特斯拉、SpaceX和xAI三家公司，三者之间的关联交易一直存在利益输送争议。特斯拉自身核心汽车业务2025年表现疲软，Cybertruck销量低迷，修订文件此时"补充"披露大额关联收入的时间节点颇为微妙，也再次引发市场对特斯拉关联交易透明度的质疑。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/newsflashes/3790021931883783" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>标普考虑将指数纳入观察期从12个月缩短至6个月</h3>
            <p>标普道琼斯指数5月1日发布征求意见文件，拟将标普综合1500指数候选公司的纳入观察期从12个月缩短至6个月，覆盖标普500、标普中型股400和标普小型股600指数的纳入资格标准。该提议目前处于征询市场参与者意见阶段，最终落地时间未定。支持者认为更短的观察期有利于让优质公司更快进入指数，提升市场效率；批评者则担忧观察期缩短会增加指数波动性，并给试图"操纵纳入预期"的投机行为留出更小的时间窗口。标普500指数作为全球最大的市值加权指数，其成分股变动直接影响数万亿美元被动资金的配置，规则调整从来不只是技术层面的问题。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/newsflashes/3790024327273731" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>美股四月普涨，标普500创2020年来最大单月涨幅</h3>
            <p>截至4月30日收盘，美股三大指数集体上涨，道指单月累计上涨7.14%，纳指上涨15.29%，标普500指数上涨10.42%，创2020年11月以来最大单月涨幅。科技股走势分化：高通涨超15%，谷歌涨超10%创收盘新高，AMD涨超5%，博通涨超3%，特斯拉涨超2%；与此同时Meta跌超8%，英伟达跌超4%，微软跌超3%。板块间轮动明显，稀土概念、美国基建股、减肥药概念涨幅居前，卡特彼勒涨近10%，礼来涨超9%。AI叙事短期似乎正从基础设施层向应用层扩散，而英伟达作为AI算力核心资产连续回调，可能是市场对算力需求预期的一次阶段性修正。4月的涨幅在很大程度上受益于关税担忧缓解和财报季整体好于悲观预期，但宏观不确定性并未消失。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/newsflashes/3790020549319945" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>5月1日起多项新规正式施行</h3>
            <p>5月1日起，国内多部新规开始生效，涵盖经济、社会治理、互联网等多个领域。具体政策内容包括优化市场准入、互联网信息服务管理修订以及部分行业监管新标准。同日，人民日报、光明日报、经济日报、工人日报等央媒集中刊发社论，庆祝"五一"国际劳动节，社论强调"十五五"开局之年的奋斗目标，呼吁全国劳动者在新征程上团结奋斗。《经济日报》社论指出，中国正处于从量变到质变跃升的关键阶段，经济转型的阵痛与新动能加速崛起并存，考验定力与智慧。央媒在五一当天集中发声，既是对劳动者权益的宣示，也隐含对经济信心的托底信号。</p>
            <p><strong>来源：</strong><a href="https://www.thepaper.cn/newsDetail_forward_33087601" target="_blank">澎湃新闻</a></p>
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
            <h3>小鹏汽车将推AI Agent"小 P"，计划年内量产搭载</h3>
            <p>小鹏汽车近期披露了AI Agent战略布局，计划在量产车型中内置自研"小 P"AI助手，定位为车辆专属的智能交互 Agent，能够调用车端传感器数据实现场景感知与主动服务。小鹏的思路是将AI Agent与大模型结合，让车机系统从被动响应转向主动服务。这是国内新势力车企在端侧AI落地方面的一次具体尝试，差异化在于深度整合车端数据而非通用对话。量产节奏和实际体验稳定性仍待观察。</p>
            <p><strong>来源：</strong>36氪资讯</p>
          </div>

          <div className="article-sub">
            <h3>小红书内部信：加大AI投入，柯南出任总裁</h3>
            <p>小红书发布内部信，宣布加大AI领域投入，并任命"柯南"出任总裁统筹AI业务。小红书近年来将AI视为内容匹配和商业化的核心能力，此次组织升级意味着AI战略在内部被提升至更优先级。柯南此前负责小红书技术团队，此番任命被视为公司推动AI战略从实验室走向规模化落地的信号。外界关注小红书能否在内容平台格局中靠AI差异化突围。</p>
            <p><strong>来源：</strong>36氪</p>
          </div>

          <div className="article-sub">
            <h3>HappyHorse发布即遭质疑，被指未达市场预期</h3>
            <p>4月27日开放测试的HappyHorse模型在发布后迅速遭到市场质疑，业内评价普遍认为其性能未能超出预期，未能像Seedance2.0那样引发轰动。HappyHorse定位为视频生成方向的新选手，发布前市场预期较高，但实测效果在画质、动作连贯性等方面未形成明显代际优势。视频生成赛道竞争日趋激烈，OpenAI、Runway、Pika等玩家持续迭代，HappyHorse的发布时机和完成度都在经受市场严格审视。</p>
            <p><strong>来源：</strong>36氪</p>
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
            <h3>脑机接口创业者十年坚持："意念康复"从论文到产品</h3>
            <p>五一假期前夕，澎湃新闻推出"追光的你"系列报道，讲述脑机接口领域创业者许熙（化名）十年的创业历程。他从神经科学博士论文起步，经历融资困难、技术路线摇摆、市场冷遇，最终将"意念康复"产品落地至国内数十家康复中心。许熙的核心逻辑是：相比侵入式脑机接口的高风险，非侵入式方案加上AI信号解析，在康复场景中具有更快的商业化路径。这个领域的中国故事与马斯克的Neuralink叙事路径截然不同，更强调工程化落地和成本控制，而非技术颠覆。</p>
            <p><strong>来源：</strong><a href="https://www.thepaper.cn/newsDetail_forward_33059642" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>"AI幻觉"催生新职业：生成式AI系统测试员需求增长</h3>
            <p>AI系统测试员——或称"生成式人工智能系统测试员"——正成为一个新兴职业方向。央媒近日报道了这一职业的日常工作：通过设计异常场景测试题库，检验大模型面对诱导、逻辑矛盾提问时的安全响应；用自动化脚本进行大规模对抗测试；量化评估模型输出的准确率与偏见风险。传统软件测试的"输入确定、输出确定"逻辑在AI领域不再适用，取而代之的是概率分布与Prompt依赖。行业专家表示，AI系统测试的核心价值在于"守住安全边界，再拓展应用范围"。政策层面，国家网信办等七部门联合发布的《生成式人工智能服务管理暂行办法》已对AI服务的安全合规提出明确要求，第三方测试机构也正在兴起。</p>
            <p><strong>来源：</strong><a href="https://www.thepaper.cn/newsDetail_forward_33087669" target="_blank">澎湃新闻</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>苹果Q2财报超预期但内存成本预警，特斯拉披露与马斯克旗下企业5.73亿美元关联收入引发透明度质疑</li>
            <li>标普500指数创两年最大月度涨幅，科技股内部出现明显分化，高通谷歌领涨vs英伟达微软回调</li>
            <li>小鹏、小红书加速AI Agent落地，HappyHorse发布未达预期；脑机接口创业者和AI系统测试员成为AI应用落地两个侧写</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-05-01 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}