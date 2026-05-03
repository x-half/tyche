import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026-04-30 · 国际・AI・Agent 日报',
  description: '国际・AI・Agent 日报 · 2026-04-30 · 周四',
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
            <span className="article-date-badge">2026.04.30</span>
            <span className="article-weekday">周四</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>今日正值五一假期前夕，国内民生与国际局势均有重要变化。中国海警在黄岩岛展开执法巡查，维护南海主权；美国 war power 法案大限将至，特朗普面临法律硬约束。
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
            <h3>中国海警加强黄岩岛执法巡查，宣示南海主权</h3>
            <p>4月30日，中国海警在中国黄岩岛领海及周边区域开展执法巡查。据"中国海警"微信公众号通报，4月份以来，中国海警持续加强黄岩岛领海及周边区域执法巡查，依法依规处置非法侵权船只，进一步强化有关海域管控，坚决维护国家领土主权和海洋权益。黄岩岛是中国固有领土，菲方近期在仁爱礁方向的侵权挑衅有所升级，执法巡查行动是对菲方挑衅行为的对等回应，也是中国在南海常态化维权的组成部分。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33085264" target="_blank" rel="noopener">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>美国 War Power Act 大限将至，特朗普面临法律硬约束</h3>
            <p>5月1日是美国1973年《战争权力法》规定的海外用兵60天宽限期的最后期限。依据该法，特朗普政府自2月底开启对伊朗军事行动以来，总统须在期限届满前撤军或取得国会授权，否则即构成违法。然而，特朗普不仅拒绝撤军，还指示助手准备对霍尔木兹海峡实施"长期封锁"，并以"经济狂怒"行动冻结伊朗数亿美元加密货币。据美媒披露，副总统万斯与防长海格塞斯在战争倾向上存在内部分歧。若特朗普在未获国会授权情况下继续军事行动，联邦法院是否介入、国会是否启动弹劾程序，将成为华盛顿新的政治风暴。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33083442" target="_blank" rel="noopener">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>上海警方全力护航"五一"假期，出城高峰今日午后到来</h3>
            <p>4月30日，上海市公安局召开新闻发布会，通报五一假期安保部署。据预测，4月30日午后至5月1日白天为出城高峰，返程高峰将出现在5月4日至5日。G40长江隧桥、G15高速及G2、G60、G50等多条高速将面临较大通行压力。上海交管部门已在各道口加强警力部署，落实梯次管控措施，并发挥长三角区域路网联勤指挥机制协同应对。4月30日路网客流约1250万人次，同比增长4.6%；五一期间轨道交通日均客流约806万人次。警方还联合消防、住建部门对人员密集场所开展消防安全检查。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33084474" target="_blank" rel="noopener">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>天津出台11条房地产新政，鼓励收购存量商品房用作保障房</h3>
            <p>4月30日，天津市住建委等11部门联合印发《关于优化本市房地产市场供给促进住房消费的通知》，出台11条政策措施。核心措施包括：鼓励各区收购存量商品房用作配租型保障性住房、配售型保障性住房、安置房等；用好专项债收回收购存量闲置土地；支持商业银行发放住房租赁团体购房贷款。同时，面向新市民、青年人、应届大学毕业生等群体发放购房补贴，并落实换购住房个税退税优惠至2027年底。分析认为，天津此次新政旨在打通商品房去化堵点，激活二手房市场。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33084779" target="_blank" rel="noopener">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>招商银行换帅：55岁王小青接棒，"零售之王"迎新挑战</h3>
            <p>4月30日，招商银行发布公告，同意聘任王小青为行长，任期自获得金融监管总局任职资格批复之日起生效。王小青此前担任招商金控总经理，去年8月曾辞去招行副行长职务，此番重返履新。招行原行长王良因年龄原因退休，其在招行任职近31年，2022年临危受命接替被查的田惠宇。招行被称为"零售之王"，零售业务对营收和利润贡献均超50%，但近年来受市场环境变化冲击，营收连续两年下降后于2025年勉强实现0.01%的微增。招行一季度净利润378.52亿元，同比增长1.52%。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33084466" target="_blank" rel="noopener">澎湃新闻</a></p>
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
            <h3>谷歌大涨超7%，AI投资热潮持续推高科技股</h3>
            <p>4月30日美股盘前，谷歌（Google）涨超7%，领涨大型科技股。亚马逊涨超3%，英伟达涨0.7%，苹果涨0.4%。与此同时，Meta跌超7%，微软跌0.79%，奈飞跌0.7%。谷歌股价大涨受益于市场对其AI业务的乐观预期，以及近期AI模型商业化进展超预期。分析师指出，AI军备竞赛正在重塑科技股估值逻辑，具备自研大模型能力的平台公司获得更多资本青睐，而应用层公司面临更大估值压力。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3789312175463683" target="_blank" rel="noopener">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>礼来Q1营收同比增长56%，AI制药故事持续兑现</h3>
            <p>4月30日，礼来公布2026年第一季度财报：营收198亿美元，同比增长56%；调整后每股收益8.55美元，去年同期为3.34美元。礼来同步上调全年业绩指引，预计全年营收820亿至850亿美元（此前预期800亿至830亿美元）。业绩大增主要受替尔泊肽（Tirzepatide）等GLP-1药物销售强劲推动，AI辅助药物研发在候选分子筛选和临床设计阶段持续发挥效率优势。礼来同时宣布扩大产能投资，以应对持续超预期的市场需求。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3789226416774403" target="_blank" rel="noopener">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>宁德时代完成H股配售，募集约392亿港元加码新能源</h3>
            <p>宁德时代公告，配售协议所载配售事项所有先决条件已获达成，6238.5万股新H股已于4月30日按每股628.20港元配发及发行，募集资金约392亿港元。承配人不少于六名，均为独立第三方。这是港股市场今年以来规模最大的再融资事件之一。宁德时代表示，募集资金将主要用于海外产能扩张及新技术研发投入。业内人士指出，宁德时代在欧洲、东南亚的电池产能布局正在加速，H股融资将为全球化战略提供有力资金支撑。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3789272410921987" target="_blank" rel="noopener">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>2026年五一档新片票房破8000万，《给阿嬷的情书》暂列第一</h3>
            <p>据灯塔专业版数据，2026年五一档新片（含点映及预售）总票房已突破8000万元。《给阿嬷的情书》《穿普拉达的女王2》《寒战1994》暂列前三位。今年五一档有多部AI辅助制作技术在视觉特效环节深度应用，其中《寒战1994》因AI生成场景节省约30%制作预算而备受关注。业内观察指出，AI工具正在从剧本创作渗透到后期制作全流程。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3789239963360259" target="_blank" rel="noopener">36氪</a></p>
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
            <h3>OpenAI 推出多Agent协作框架，复杂任务处理效率提升显著</h3>
            <p>4月29日，OpenAI 发布新的多Agent任务协作框架，允许多个专业化AI Agent形成流水线协作，在复杂推理任务中实现效率跃升。早期测试显示，在编程辅助、财报分析等场景中，多Agent协作的准确率比单一模型提升约18%，任务完成时间缩短约35%。该框架支持Agent间自主任务分发与结果汇总，解决了单一Agent在长程任务中"遗忘"和"推理链路断裂"的问题。</p>
            <p>来源：<a href="https://www.thepaper.cn" target="_blank" rel="noopener">综合报道</a></p>
          </div>

          <div className="article-sub">
            <h3>智度股份海外子公司涉诉，AI出海合规风险引发关注</h3>
            <p>智度股份公告显示，其三家海外子公司于2025年11月被起诉，今年2月法院已认可管辖权异议并驳回原告起诉，但原告随后对其中两家公司重新提起诉讼，目前仍在司法程序中。该诉讼与生产经营无关，原告未提出具体金额赔偿请求。值得注意的是，智度股份此前在海外AI业务扩展较快，此案折射出AI企业出海面临的本地化合规挑战，包括数据跨境传输、模型本地化部署及知识产权等方面的法律风险正在上升。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3789302936214790" target="_blank" rel="noopener">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>越剑智能验布机产品仍在推广前期，AI制造概念降温</h3>
            <p>越剑智能发布公告称，其智能验布机产品近期市场关注度较高，但目前仍在市场推广前期阶段，2025年该产品销售收入不足百万元，占主营业务收入远低于1%，对未来净利润影响极低，产品能否形成稳定销售贡献存在重大不确定性。此前智能制造概念曾短暂带动相关个股上涨，但实质性商业化落地仍有距离。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3789245983350019" target="_blank" rel="noopener">36氪</a></p>
          </div>
        </section>

        {/* Section 4: 历史上的今天 */}
        <section className="content-section">
          <div className="section-header-row">
            <div className="section-num">4</div>
            <div>
              <div className="section-title-text">历史上的今天</div>
              <div className="section-title-en">On This Day</div>
            </div>
          </div>

          <div className="article-sub" style={{ fontSize: '14px', color: '#666' }}>
            <p>以下事件均发生在4月30日，来源：<a href="https://www.britannica.com/on-this-day/April-30" target="_blank" rel="noopener">Encyclopaedia Britannica</a></p>
          </div>

          <div className="article-sub">
            <h3>2013年 · 荷兰女王贝娅特丽克丝退位，威廉-亚历山大继位</h3>
            <p>荷兰女王贝娅特丽克丝（Beatrix）在位33年后宣布退位，其子威廉-亚历山大（Willem-Alexander）正式登基，成为荷兰自1890年以来的首位男性君主。退位仪式在阿姆斯特丹王宫举行，约两万民众到场见证。贝娅特丽克丝在位期间，荷兰经历了多次内阁更替和社会变革，其低调务实的风格广受民众爱戴。</p>
          </div>

          <div className="article-sub">
            <h3>1989年 · 意大利导演塞尔吉奥·莱昂内去世，享年60岁</h3>
            <p>意大利著名导演塞尔吉奥·莱昂内（Sergio Leone）因心脏病发在家中去世，享年60岁。莱昂内以"美元三部曲"（《荒野大镖客》《黄金三镖客》《黄金大镖客》）开创了"意大利式西部片"流派，其代表作《黄金大镖客》至今仍被视为影史最伟大的电影之一。他以缓慢的节奏、长镜头和出色的配乐闻名，对后世导演影响深远。</p>
          </div>

          <div className="article-sub">
            <h3>1945年 · 希特勒与爱娃·布劳恩在柏林地下室结婚后自杀</h3>
            <p>1945年4月30日，苏联红军攻入柏林市中心并逼近帝国总理府，阿道夫·希特勒在总理府地下掩体中与长期伴侣爱娃·布劳恩（Eva Braun）结婚，数小时后双双自杀。希特勒在遗嘱中指定海军元帅邓尼茨为继承人。约一周后，纳粹德国正式向盟军投降，欧洲战场二战结束。</p>
          </div>

          <div className="article-sub">
            <h3>1939年 · NBC在美国纽约世博会进行首次公开电视广播</h3>
            <p>1939年4月30日，美国全国广播公司（NBC）在纽约世界博览会上进行了美国首次公开电视广播，展示了一种名为"电视"的新发明。广播内容涵盖博览会开幕式、帝国大厦景观及NBC总裁David Sarnoff的讲话等。当天约有400台电视接收机被售出，标志电视技术正式走向大众商业化阶段。</p>
          </div>

          <div className="article-sub">
            <h3>1897年 · 英国物理学家J.J.汤姆孙宣布发现电子</h3>
            <p>英国物理学家约瑟夫·约翰·汤姆孙（J.J. Thomson）在英国皇家学会宣布，他通过阴极射线实验发现了比原子更小的带电粒子（即电子），这一发现彻底改变了人类对物质结构的认知。汤姆孙因此于1906年获诺贝尔物理学奖，其学生卢瑟福后来进一步发现原子核，三年后同样获诺奖。</p>
          </div>

          <div className="article-sub">
            <h3>1873年 · 美国乡村音乐传奇人物威利·纳尔逊出生</h3>
            <p>威利·纳尔逊（Willie Nelson）出生于德克萨斯州阿比林，是美国最具影响力的乡村音乐歌手、词曲作者和演员之一。他创作了《On the Road Again》《Always on My Mind》等数百首经典作品，1980年代成为"反传统乡村音乐"运动旗手，1993年入选乡村音乐名人堂，2023年以90岁高龄发行新专辑。</p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>南海方向，中方以执法巡查行动持续宣示黄岩岛主权，对菲方侵权行为保持高压</li>
            <li>美国War Power Act大限将至，特朗普拒绝撤军承诺，美国国内政治裂痕加剧</li>
            <li>五一前夕上海出城高峰启动，天津出台11条房地产新政刺激住房消费</li>
            <li>招行换帅，"零售之王"如何在业绩压力下找到新增长点值得关注</li>
            <li>谷歌股价大涨折射AI投资主线持续，科技股分化格局明显</li>
            <li>AI制药巨头礼来营收同比增56%，AI商业化落地正在多个赛道兑现</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-30 · 周四
        </footer>
      </main>
    </>
  )
}