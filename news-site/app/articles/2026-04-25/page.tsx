import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.25 · 国际・AI・Agent 日报',
  description: '美伊谈判伊斯兰堡重启，欧盟900亿欧元援乌贷款过关；DeepSeek V4发布挑战开源格局，谷歌400亿美元押注Anthropic。',
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
            <span className="article-date-badge">2026.04.25</span>
            <span className="article-weekday">周六</span>
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
            <h3>美伊谈判转场伊斯兰堡：巴基斯坦成唯一中间人</h3>
            <p>4月24日，伊朗外长率团抵达巴基斯坦首都伊斯兰堡，巴政府消息人士披露，美伊两国将在此举行第二轮停火谈判。一支美国后勤和安全小组已先期抵达伊斯兰堡协助谈判进程。作为谈判中间人的巴基斯坦政府消息人士称，美方同时还在制定针对伊朗的军事打击新方案——"两手准备"态势明显。重重条件筛选之下，巴基斯坦几乎成为"独一无二"的中间人选项：与双方均保持接触，在伊斯兰世界有一定分量，又不至于引发大规模地区反噬。谈判能否达成暂时停火，关键变量在于伊朗是否接受由巴基斯坦转交的书面安全承诺。</p>
            <p>来源：<a href="https://international.caixin.com" target="_blank">财新国际</a>、<a href="https://www.thepaper.cn" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>以黎停火"官宣延期"背后：真主党尚未签字</h3>
            <p>4月24日，以色列与黎巴嫩政府间停火协议获延期三周。以色列总理办公室和黎巴嫩看守政府先后确认了这一消息。然而，实际参战的黎巴嫩真主党武装尚未承认停火协议及其延期决定，边境交火仍在持续。以色列军方当晚即通报，真主党武装向以色列北部发射多枚火箭弹，以军随后对黎巴嫩南部实施炮击回应。停火框架的脆弱性在于：它约束的是两国政府，而非真正在前线交火的武装组织。这种"上层握手、底层枪声不断"的局面，某种程度上是以黎边境过去一年多的常态。</p>
            <p>来源：<a href="https://international.caixin.com" target="_blank">财新国际</a></p>
          </div>

          <div className="article-sub">
            <h3>匈牙利否决票障碍移除：欧盟援乌900亿欧元贷款终通过</h3>
            <p>欧盟援乌贷款协议终于在4月24日走完最后一道程序。匈牙利议会在此前一天的表决中未再投反对票，移除了最后一个制度性障碍。这笔总规模约900亿欧元的贷款中，军事部分将包含"欧洲制造"条款——确保尽可能多的资金流向欧洲本土军工生产商，而非美国军工商。这一条款的设置，折射出欧洲在援乌问题上的战略自主意识正在强化：既要用钱支持乌克兰，又要让这笔钱留在欧洲产业链里。欧洲军工复合体正在因此获得一笔可观的定向输血。</p>
            <p>来源：<a href="https://international.caixin.com" target="_blank">财新国际</a></p>
          </div>

          <div className="article-sub">
            <h3>美以伊开火两月：油价已在百元边缘</h3>
            <p>美以联合军事行动打击伊朗已进入第二个月，全球油价持续在高位运行。市场普遍关注的焦点是：如果局势不进一步升级，油价是否能稳住百元以下？分析师的判断偏向悲观：伊朗原油出口目前已受到严厉制裁封锁，而胡塞武装对红海航道的袭扰使商船保险费率大幅攀升，绕航好望角的额外成本正在向终端消费品传导。油价最终反映的，是特定地缘关系为基础的全球供求变化——这轮涨价，不是供给侧冲击，而是物流通道的人为压缩。这个逻辑短期内很难消退。</p>
            <p>来源：<a href="https://international.caixin.com" target="_blank">财新国际</a></p>
          </div>

          <div className="article-sub">
            <h3>76岁内塔尼亚胡证实患癌：为什么"战争高峰期"不公布</h3>
            <p>以色列总理内塔尼亚胡在4月23日发布视频声明，证实自己被诊断出患有早期前列腺癌。他解释称，此前在"战争高峰期"选择不公开这一消息，是为了"避免动摇以色列国民的信心"。这份声明在以色列国内外引发不同解读：支持者认为这体现了领导人在非常时期的担当；批评者则指出，在战时隐瞒领导人健康状况，本身就是一种信息操控。内塔尼亚胡还面临多起腐败案件的司法审理，公众对其政治状态的关注与担忧交织。他的患癌声明，某种程度上也将外界注意力从司法压力上短暂转移开。</p>
            <p>来源：<a href="https://www.thepaper.cn" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>美国海军部长仓促离职：本届任期内首位离任军种部长</h3>
            <p>4月23日，美国海军部长杜诺威（John Whitley）突然宣布辞职，成为特朗普本届总统任期内首位离职的军种部长。海军部副部长高雄（Hung Cao）将暂时代理职务。辞职原因尚不明确，但多方消息指向其与五角大楼高层在预算分配和舰艇建造计划上存在分歧。值得注意的是，高雄为越南裔美国人，在当前美国军方高层人事动荡的背景下，他的代理任命本身也成了一个变量。军种部长的频繁更迭，对美国海军正在推进的印太战略布局会有什么影响，值得持续关注。</p>
            <p>来源：<a href="https://international.caixin.com" target="_blank">财新国际</a></p>
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
            <h3>DeepSeek V4预览版发布：开源领域推理性能领先</h3>
            <p>DeepSeek V4预览版本于4月24日正式发布，官方介绍称其Agent能力、世界知识和推理性能在开源领域处于领先位置。从各路测评来看，V4版本在代码生成任务上表现尤为突出，价格则低至竞品的1%左右。与此同时，有报道称DeepSeek已在华为芯片上完成部署运行——英伟达CEO黄仁勋此前将这一可能性形容为"灾难"。DeepSeek的效率路线正在被越来越多目光审视：它究竟是中国AI的突破，还是对现有芯片格局的结构性挑战？</p>
            <p>来源：<a href="https://www.thepaper.cn" target="_blank">澎湃新闻</a>、<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>谷歌向Anthropic追加投资：总规模最高400亿美元</h3>
            <p>谷歌宣布将向Anthropic投资100亿美元现金，并承诺在后者达成业绩目标时再追加最高300亿美元，使总投资规模达到400亿美元。此轮投资对Anthropic的估值为3500亿美元，与其今年2月融资时持平。Anthropic表示，这笔资金将主要用于大规模扩展算力基础设施。谷歌与Anthropic之间的关系日趋复杂：既在投资层面深度绑定，又在产品侧存在竞争——Anthropic的Claude系列与谷歌的Gemini系列在大模型市场上正面交锋。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>何恺明、谢赛宁署名：谷歌Vision Banana统一视觉任务</h3>
            <p>谷歌DeepMind推出Vision Banana，一个图像生成器即通才视觉学习者，由知名AI研究员何恺明、谢赛宁等人署名参与。该模型被描述为"生成即理解"，试图用一个统一框架处理图像生成与视觉理解两大任务。视觉Transformer领域近期进展密集，Vision Banana的推出被部分研究者称为"引爆视觉Transformer时刻"。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>光纤涨价650%背后：AI需求"挤爆"光通信产业链</h3>
            <p>光通信产业链上游原材料价格出现剧烈波动，普通光纤光缆价格涨幅达到650%。市场分析普遍指向AI算力基础设施的大规模扩张——数据中心内部和数据中心之间的高速光互连需求激增，直接拉动了上游光芯片、光纤预制棒等环节的供需紧张。有从业者形容当下的局面是"需求在以指数级增长，而产能爬坡需要时间"。</p>
            <p>来源：<a href="https://www.thepaper.cn" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>苹果CEO库克确定卸任：约翰·特努斯接棒，库克时代落幕</h3>
            <p>4月21日，苹果官方宣布CEO库克将在本届任期结束后卸任，由负责硬件工程的高级副总裁约翰·特努斯（John Ternus）接任。芯片业务负责人约翰尼·斯鲁吉将转任首席硬件官。库克执掌苹果超过十年，其任内苹果股价涨幅超过10倍，但也面临创新能力下滑、iPhone增长见顶的质疑。新领导层能否带来产品端的突破，是苹果投资者最关心的问题。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
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
            <h3>攀峰智能：要做电商Agent OS，再获数千万天使轮</h3>
            <p>前钉钉最年轻副总裁创立的公司"攀峰智能"宣布完成数千万人民币天使轮融资，由红杉中国、Monolith联合领投。公司的目标产品被定义为"电商Agent OS"——为电商商家提供覆盖运营、客服、供应链等多个环节的AI Agent平台。创始人认为，电商是Agent落地最高频的场景之一，但目前市面上缺乏真正打通全链路的一体化产品。攀峰智能想要做的事，本质上是把AI Agent从单点工具变成操作系统级的平台。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>智用开物：获近亿元天使+轮，要打通AI进厂最后一公里</h3>
            <p>工业智能体公司"智用开物"宣布完成近亿元人民币天使+轮融资，老股东瑞枫资本领投，创享投资跟投，同时获得立讯精密家族办公室及高管的战略投资。公司的核心产品是"工业语义引擎"，目标是将AI Agent以标准化方式部署进制造业高价值岗位——把"落地难"变成"标准交付"。值得注意的是，投资方中出现了立讯精密这样的制造业龙头，产业资本的引入对于其产品打磨和客户开拓意义重大。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>上海发证、硅谷打钱：脑机接口商用大门真正敞开</h3>
            <p>上海近期向脑机接口产品发放了首批合规"身份证"，与此同时硅谷脑机公司获得约2.3亿美元新融资。一证一票隔空呼应，脑机赛道的商业化进程明显加速。业内普遍将上海的动作视为监管层面首次对脑机产品给出明确合规路径，对于整个行业而言这是一个重要的信号：不再是实验室里的Demo，而是可以进入商用审批流程的产品了。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li><strong>国际：</strong>美伊谈判在伊斯兰堡重启，但军事选项仍在桌面；欧盟900亿欧元援乌贷款内置"欧洲制造"条款，欧洲军工正在定向受益；内塔尼亚胡患癌声明揭开战时信息管控一角。</li>
            <li><strong>大模型：</strong>DeepSeek V4搅动开源格局，光纤涨价折射AI算力需求已传导至上游原材料；谷歌400亿美元押注Anthropic显示大厂"双面下注"已成常态。</li>
            <li><strong>AI Agent：</strong>电商Agent OS和工业Agent标准交付成为两条清晰的落地路径；脑机接口监管破冰，商用法门槛正式开启。</li>
          </ul>
        </div>

        {/* 历史上的今天 */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', color: '#e87a9f', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            📜 历史上的今天
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>2015年</span>
              <span style={{ color: '#555' }}>尼泊尔发生8.1级强震，造成重大人员伤亡和财产损失</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1953年</span>
              <span style={{ color: '#555' }}>科学家在《自然》杂志发表论文，首次指出脱氧核糖核酸（DNA）具有双螺旋结构</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1949年</span>
              <span style={{ color: '#555' }}>毛泽东、朱德联名发布《中国人民解放军布告》，宣布"约法八章"</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1945年</span>
              <span style={{ color: '#555' }}>盟军与苏军在德国易北河畔会师，标志着欧洲战场反法西斯战争取得决定性进展</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1644年</span>
              <span style={{ color: '#555' }}>明思宗崇祯皇帝于北京景山自缢，明朝覆灭，中国进入清王朝统治时期</span>
            </div>
          </div>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-25 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
