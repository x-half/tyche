import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.28 · 国际・AI・Agent 日报',
  description: '美伊霍尔木兹博弈持续升级，英美关系因伊朗战争出现裂痕；DeepSeek V4正面挑战GPT-5，OpenAI完成史上最大重组。',
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
            <span className="article-date-badge">2026.04.28</span>
            <span className="article-weekday">周二</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>美伊对峙已持续两月，霍尔木兹海峡这张牌正被双方反复试探；AI行业格局也在加速重塑，DeepSeek V4与OpenAI同周发布，大模型竞争进入新阶段。
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
            <h3>伊朗提议重开霍尔木兹换解除封锁，美方态度冷淡</h3>
            <p>伊朗4月27日通过巴基斯坦向美方传递提案：若美国解除封锁并终止战争，伊朗将重开霍尔木兹海峡，但核计划谈判将推迟至后续阶段处理。两名地区官员确认了这一消息。这是2月28日美以开战以来，伊朗首次提出附带条件的"解封换停战"方案。霍尔木兹海峡是全球五分之一石油和天然气的过境通道，战时封锁已导致布伦特原油价格从战前的70美元/桶飙升至108美元/桶上方，航班取消和消费品涨价正在向全球蔓延。联合国秘书长古特雷斯4月27日向安理会表示，人道代价正在累积，"压力正在流向空油箱、空货架——以及空盘子"。但美国务卿鲁比奥已在福克斯新闻上明确排除该方案，称"他们不能以核计划换取通行费"。伊朗外长阿拉格希同天在圣彼得堡与普京会面后表示，美方"没有达成任何目标，这就是他们要求谈判的原因"。</p>
            <p>来源：<a href="https://apnews.com/article/us-iran-war-hormuz-april-27-2026-374d81d1aac6d8f19c21e1d1e10ab103" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>查尔斯三世抵美进行4天国事访问，英美"特殊关系"承压</h3>
            <p>4月27日，英国国王查尔斯三世携夫人卡米拉抵达白宫，开始为期4天的国事访问。特朗普与梅拉尼娅在白宫南草坪迎接，并在绿室共饮下午茶，随后共同为一所由第一夫人安置的蜂巢形状白宫新设施揭幕。查尔斯此行正值英美关系因伊朗战争而急剧恶化：英国首相斯塔默拒绝让英国全面参与对伊军事行动后，特朗普公开斥责斯塔默"不是温斯顿·丘吉尔"，并称英国"不配合"。美军飞机目前仍从英国本土及迪戈加西亚基地起飞执行任务，英国战机也在协助拦截针对中东美军的无人机和导弹。英方坚称这是"特殊关系的实际行动"，但舆论压力显著。一封遭泄露的五角大楼内部邮件甚至暗示，美国可能重新评估对福克兰群岛主权的支持立场，以作为报复。</p>
            <p>来源：<a href="https://apnews.com/article/king-charles-iii-us-state-visit-trump-dae21842f51459be5fc8c22ef86db296" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>NATO秘书长与特朗普会面，联盟内部裂痕加深</h3>
            <p>NATO秘书长吕特4月24日与特朗普再次会面后，特朗普在社交媒体发文称"NATO在我们需要时不在场，如果我们再次需要他们，他们也不会在"。吕特拒绝证实特朗普是否威胁退出北约，仅表示他"感受到失望——太多盟友没有站在他身边"。这场摩擦的根源在于伊朗战争：北约并非参战方，但特朗普批评欧洲盟友"懦弱"且"无用"，拒绝支持对伊行动。吕特在4月23日的记者会上为特朗普辩护，称"需要为他的大胆领导力和愿景鼓掌"，并承认一些盟友"反应确实太慢"。西班牙已关闭领空禁止美军飞机参与伊朗战争，法国坚持战争"违反国际法"且未被提前知会。与此同时，伊朗外长访问莫斯科，普京称伊朗人民"英勇地为主权而战"，俄伊关系进一步深化。</p>
            <p>来源：<a href="https://apnews.com/article/nato-iran-rutte-trump-hormuz-support-e43e774a64341e3ad8d1b73823f07298" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>全球航空业陷入燃料危机，汉莎集团砍掉20000航班</h3>
            <p>伊朗战争导致的石油断供正在重塑全球航空版图。Lufthansa集团4月22日宣布，将通过10月削减20000个短途航班，主要集中在法兰克福和慕尼黑枢纽，此举可节省约40000吨航油。该公司上周已关闭区域子公司CityLine，并预告将进一步整合欧洲网络。国际能源署4月16日估计，欧洲航油储备仅剩约6周用量，多家航司已开始削减运力。达美航空取消原定6月增飞的计划，美联航下调全年盈利预测至每股7-11美元（此前为12-14美元）。航油价格从2月底的约99美元/桶飙升至4月初的209美元/桶峰值，多家航司提高行李托运费并加收燃油附加费。欧盟能源委员约恩森称，战争每天给欧洲造成约5亿欧元损失，"最乐观的情景下，局面依然严峻"。</p>
            <p>来源：<a href="https://apnews.com/article/jet-fuel-flight-cancellations-airlines-42a4c548b23f9dec02ff3f5771f7b4c3" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>伊朗战争影响渗透日常消费品：玩具到口红都在涨价</h3>
            <p>石油不只是燃料——它渗入了从玩具到口红的几乎所有消费品。石化产品（乙烯、丙烯、苯、甲苯、二甲苯）是塑料、尼龙、聚酯的原料，而这些原料广泛存在于计算机键盘、化妆品、服装、运动器材乃至药品包装中。AP报道，一家佛罗里达州玩具制造商因中国供应商通知材料成本上涨10%-15%，正在评估提价方案。服装行业聚酯纤维材料价格从战前的0.9美元/公斤涨至1.33美元/公斤，每件成衣生产成本增加10-15美分。鞋类约70%的材料依赖石化产品，石油价格波动直接影响其中30%的成本。玩具、服装、鞋类制造商需要在4月底前签署下半年订单合同，以赶在 holiday shopping season 前交货。如果油价持续维持在90美元/桶上方，消费者将在夏末至秋季感受到全面涨价压力。</p>
            <p>来源：<a href="https://apnews.com/article/iran-war-oil-consumer-products-petroleum-cdbcc14cca17d7db49b34e016adebac1" target="_blank">AP News</a></p>
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
            <h3>DeepSeek V4发布：华为芯片驱动，声称超越GPT-5.2</h3>
            <p>DeepSeek于4月25日发布V4系列（Pro/Flash两版本），这是继2024年末V3之后的重大更新。V4采用混合专家架构，由华为昇腾芯片提供部分算力支持，降低了对英伟达生态的依赖。DeepSeek自评测显示，V4 Pro Max在标准推理基准测试中"优于"GPT-5.2和Gemini 3.0-Pro，略微落后于GPT-5.4和Gemini 3.1-Pro。在Agent能力上，V4 Pro版本自称超越Claude Sonnet 4.5，接近Opus 4.5水平。上下文窗口扩展至100万token（V3为128000）。Omdia首席分析师宋俊（译音）评价："基于基准测试结果，V4确实很有竞争力。"但晨星高级分析师余毅（译音）认为，V4是"称职的续作"，而非R1那样级别的突破。美方持续指控DeepSeek通过"蒸馏"技术窃取美国模型能力，中美AI技术竞争正在从芯片延伸到整个生态链。</p>
            <p>来源：<a href="https://apnews.com/article/deepseek-ai-china-gpt-v4-d2ed33f2521917193616e061674d5f92" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>OpenAI完成史上最大重组：变身公益公司，微软持股约27%</h3>
            <p>OpenAI于4月22日宣布完成所有权结构重组，将业务转换为"公益公司"（Public Benefit Corporation），非营利组织保留控制权。特拉华州和加州两位检察长均表示不反对该方案，为历时近一年的谈判画上句号。重组后微软获得新公司约27%股权（价值约1350亿美元），非营利组织持股约1300亿美元，两者几乎持平。Altman在电话会上表示，"最可能的路径"是该公司未来公开上市，"考虑到我们的资金需求和公司规模"。Altman还透露未来数年将承担约1.4万亿美元"总财务义务"，涵盖数据中心、芯片合作等投资。非营利组织将更名为OpenAI Foundation，计划捐赠250亿美元用于医疗、网络安全等公共事业。但公益公民组织联合主席魏斯曼批评这一安排"不保证非营利独立性"，本质上是服务于营利公司的企业基金会。</p>
            <p>来源：<a href="https://apnews.com/article/openai-chatgpt-nonprofit-microsoft-c661df3242766d6b0ddbab401ad1fd84" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>Musk与Altman世纪审判开庭：OpenAI控制权争夺进入庭审阶段</h3>
            <p>一场围绕OpenAI控制权的世纪审判4月27日在加州奥克兰联邦法院开庭，庭审围绕马斯克2015年投资约3800万美元、帮助创立OpenAI后眼睁睁看着它变成价值8520亿美元的营利巨头的过程展开。马斯克指控Altman和总裁布罗克曼背叛了创始使命——以非营利方式开发"利他的AGI守护者"，却背着早期投资人转向利润驱动模式，损害了人类安全利益。Altman则在证人席上反驳称OpenAI始终将安全置于首位，并指出马斯克在停止资助后自行创办了xAI作为竞争产品。庭审预计将披露2015-2019年AI竞赛早期的内部邮件和决策细节。值得注意的是，SpaceX将于今年夏天IPO，可能让马斯克成为全球首个万亿富翁；与此同时，另一陪审团上月已裁定马斯克在2022年收购推特案中欺诈投资者。这场诉讼结果可能影响OpenAI的治理走向，以及AGI时代科技巨头权力边界的基本规则。</p>
            <p>来源：<a href="https://apnews.com/article/musk-altman-artificial-intelligence-trial-openai-eb854fa682675f70267abd8a7b9a6a43" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>台积电"二倍速"扩产：五座2nm晶圆厂同步爬坡</h3>
            <p>台积电资深副总经理侯永清4月27日透露，为应对AI与高性能计算需求爆发，台积电正以"二倍速"推进扩产计划，今年将有五座2nm晶圆厂同时进入产能爬坡阶段。受益于此，2nm首年产出将比3nm同期提升约45%。这一消息与当前全球AI芯片持续短缺的背景高度呼应——算力不足正在制约大模型训练和推理能力的扩张速度。2nm制程的量产速度直接影响苹果、AMD、Nvidia等芯片设计公司的产品迭代节奏，也是全球AI竞争力格局的关键变量。</p>
            <p>来源：<a href="https://www.jiemian.com/article/14338971.html" target="_blank">界面新闻 / 36氪</a></p>
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
            <h3>具身智能机器人公司"昇视唯盛"完成数千万A+轮融资</h3>
            <p>专注于焊接垂直场景的具身智能机器人公司"昇视唯盛"宣布完成数千万人民币A+轮融资，由韩国现代汽车与微光创投联合投资。资金将主要用于"具身大脑"的研发、软硬件产品迭代及市场推广。具身机器人将AI大模型能力与物理机体结合，让机器人能够自主理解和执行复杂任务，是当前AI Agent从数字世界延伸至物理世界的核心方向之一。焊接是工业场景中工艺要求高、工人短缺严重的工种，垂直切入有望率先实现商业化落地。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3785793793121540" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>五一视界SimOne 4.0发布：与英伟达Omniverse深度融合</h3>
            <p>五一视界发布SimOne 4.0先行版，以世界模型（World Model）和VLA（视觉-语言-动作）为技术底座进行全面重构，覆盖数据采集、训练、推理、验证与交付五大核心环节。SimOne 4.0已与英伟达Omniverse NuRec产品完成深度融合，构建了从真实数据采集、神经场景重建到闭环仿真执行的完整数据驱动流程。该平台此前已历经9年迭代，从高置信场景仿真、端到端数据闭环到数据驱动重建+生成，技术路线持续演进。英伟达生态的接入意味着SimOne在工业仿真、自动驾驶测试等场景的渲染和物理精度将达到行业标杆水平。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3785783585266689" target="_blank">36氪</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>霍尔木兹困局持续：伊朗提解除封锁换取停战，美方拒绝；油价突破108美元，全球消费品价格压力加剧</li>
            <li>英美关系裂痕扩大：查尔斯三世访美"救场"，NATO内部矛盾同步激化</li>
            <li>DeepSeek V4正面挑战GPT：华为昇腾芯片首次撑起大模型半边天，中美AI生态博弈进入新阶段</li>
            <li>OpenAI完成史上最大重组变公益公司，微软持股约27%，Altman称IPO是"最可能路径"</li>
          </ul>
        </div>

        {/* 历史上的今天 */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', color: '#e87a9f', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            📜 历史上的今天
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1927年</span>
              <span style={{ color: '#555' }}>中国共产党创始人之一李大钊等20人被北洋政府以叛乱罪名绞刑处决</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1928年</span>
              <span style={{ color: '#555' }}>毛泽东率领秋收起义部队与朱德八一南昌起义部队在井冈山胜利会师</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1770年</span>
              <span style={{ color: '#555' }}>英国航海家詹姆斯·库克率领探险队"发现"澳大利亚</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1945年</span>
              <span style={{ color: '#555' }}>意大利法西斯独裁者贝尼托·墨索里尼与情人贝塔西被游击队枪决</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>2008年</span>
              <span style={{ color: '#555' }}>胶济铁路列车相撞事故造成72人死亡、416人受伤</span>
            </div>
          </div>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-28 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
