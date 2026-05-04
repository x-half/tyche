import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.22 · 国际・AI・Agent 日报',
  description: '美伊停火谈判陷入僵局；日本解禁杀伤性武器出口；OpenAI升级ChatGPT图像生成模型',
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
            <span className="article-date-badge">2026.04.22</span>
            <span className="article-weekday">周三</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>中东局势是今天毫无悬念的主线。美伊谈判僵持、伊朗授权民兵自主行动、霍尔木兹反复开合——这些都不是孤立的新闻，它们构成一个仍在演化的危机。AI这边，OpenAI和Anthropic各自有新动作，苹果的接班故事也在持续。
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
            <h3>美伊停火僵局：谈判无限期推迟，"炸弹将落下"警告言犹在耳</h3>
            <p>4月21日，特朗普通过Truth Social宣布美国"无限期延长"与伊朗的停火协议——原定22日到期。背景是巴基斯坦一直在大力斡旋，力促双方在伊斯兰堡举行第二轮谈判，但副总统JD Vance的访问行程被无限期搁置，原因是伊朗拒绝参会。伊朗外长Baghaei明确表示"没有最终决定"，因为美国的封锁行动"不可接受"。</p>
            <p>霍尔木兹海峡的控制权是核心卡点。伊朗驻联合国大使Iravani同一天透露，德黑兰已收到美方准备解除港口封锁的"一些信号"，但条件是伊朗先恢复霍尔木兹海峡的正常通行——这里是全球五分之一天然气和原油的过境通道。Brent原油价已升至每桶约95美元，较2月28日美以对伊开战前高出30%以上。伊朗伊斯兰革命卫队一名高级指挥官Majid Mousavi警告："如果南部邻国允许敌人利用其设施攻击伊朗，他们可以跟这个地区的石油生产告别了。"</p>
            <p>局势的本质是"边打边谈"：特朗普称若谈判失败"大量炸弹将开始落下"，伊朗首席谈判代表则暗示"战场上还有新牌没出"。延伸思考：欧洲的航空燃油储备只剩约六周（能源部长语），这个时间窗口实际上在给双方施压——伊朗需要解除封锁以换取收入，美国需要维持能源市场稳定。巴基斯坦的调停角色值得关注：这个南亚国家夹在伊朗和海湾之间，其地理位置决定了它在调解中的独特分量。</p>
            <p>来源：<a href="https://apnews.com/article/us-iran-war-pakistan-april-21-2026-177a2d0701ef172c3e51686bc1f18f30" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>伊朗授权伊拉克民兵自主行动：德黑兰正在失去对前线的控制？</h3>
            <p>就在美伊停火谈判陷入僵局的同时，巴格达传出另一条令人不安的消息：伊朗已大幅放宽对伊拉克民兵组织的指挥管控，允许部分武装派系在未经德黑兰批准的情况下独立发动军事行动。消息来自三位民兵成员和两位伊拉克官员，他们形容这是伊朗从"中央集权"向"战场分布式指挥"的转变。</p>
            <p>这些伊朗支持的民兵组织通过伊拉克国家预算获得资金，嵌入在伊拉克安全体系中。美国长期以来指责伊拉克政府未能有效管控它们。此轮权力下放意味着：即便美伊达成停火协议，伊拉克民兵对美军基地和外交设施的零星攻击风险可能反而上升——因为更分散的指挥结构更难被统一约束。美国已于周五对参与袭击的7名民兵指挥官实施制裁。</p>
            <p>延伸思考：这种"失控中的有序"其实是伊朗的一贯策略：通过降低直接掌控，换取前线的灵活性和对美施压的弹性。但对华盛顿来说，这反而让军事打击决策更加复杂——打谁？打多少？打了之后伊朗会不会彻底翻脸？</p>
            <p>来源：<a href="https://apnews.com/article/iraq-militias-iran-war-c2fce96e2769bc8b3be43a729da5517b" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>日本解禁杀伤性武器出口：战后和平主义的重大转折</h3>
            <p>4月21日，日本执政的自民党高市早苗内阁正式修改"防卫装备转移三原则"及其运用指南，原则上允许出口包括护卫舰、潜艇、导弹在内的杀伤性武器成品。这是日本战后和平主义政策的重大调整——此前日本只允许出口非战斗用途装备。修改后的规则将装备品分为"武器"与"非武器"两类，武器出口对象限于与美国、英国等17个缔结保密协定的国家。</p>
            <p>日本军工体系完善，能够生产从步枪到驱逐舰到各型导弹的大部分主战装备。此次政策松绑的直接受益者之一是澳大利亚：堪培拉已于4月18日签署首批3艘"最上"级护卫舰的采购合同，由三菱重工业建造，价值最高达200亿澳元（约977亿人民币）。此外，日本还在向菲律宾推销6艘"阿武隈"级护卫舰，向印度推销US-2水上飞机，并与英国、意大利合作推进GCAP下一代战斗机项目。</p>
            <p>延伸思考：日本的政策转向是地缘政治格局深刻变化的缩影——在美国战略收缩压力下，盟友体系内的军备自主化正在加速。对东南亚国家来说，这既是采购多元化的机会，也带来如何在大国竞争中保持平衡的新课题。</p>
            <p>来源：<a href="https://www.thepaper.cn/newsDetail_forward_33020491" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>美国民权组织SPLC被联邦起诉：监控极端主义的代价</h3>
            <p>美国司法部于4月21日宣布，南方贫困法律中心（SPLC）在阿拉巴马州联邦法院被起诉，罪名是电信欺诈、银行欺诈和洗钱共谋。起诉书指控SPLC通过一个已解散的 informant 项目，向包括三K党在内的仇恨组织成员支付超过300万美元以获取情报，欺骗了捐款人——他们以为钱被用于"打击极端主义"，实际上部分资金被用于实施其他犯罪行为。</p>
            <p>起诉书详细列出：至少9名 informant 通过"幻影公司"账户（如"Fox Photography"）收款；一人在2014至2023年间获得超过100万美元，另一人参与了2017年弗吉尼亚州夏洛茨维尔的"联合右翼"集会并协调交通，获款超过27万美元。代理司法部长Blanche的措辞相当严厉："SPLC不是在瓦解这些组织，而是在制造它声称要反对的极端主义。"SPLC则发表声明，称 informant 项目"拯救了生命"，将"坚决自卫"。</p>
            <p>延伸思考：这一案件在美国政治极化的背景下格外敏感——SPLC长期被保守派批评为"激进左翼组织"，而拜登政府的司法部此前对其持保护态度。批评者担忧，特朗普时代的司法部正在利用刑事调查打击传统上倾向自由派的公民组织。</p>
            <p>来源：<a href="https://apnews.com/article/southern-poverty-law-center-criminal-investigation-db7fdcf9baa0d1b24b8f1e1f2cebc0be" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>特朗普经济支持率跌至30%：伊朗战争正在侵蚀选民耐心</h3>
            <p>AP-NORC于4月16日至20日进行的最新民调显示，特朗普的经济工作支持率已从3月的38%下滑至30%，仅约四分之一美国成年人认可他对生活成本的处理方式。通胀在3月同比上升3.3%，略高于特朗普就职时的3%，而汽油价格较开战前上涨约35%。更让执政者警觉的是：51%的共和党人认可特朗普的经济表现，但其中35岁以下群体的反对率高达61%。</p>
            <p>有意思的是，特朗普本人似乎对油价上涨并不焦虑。他21日接受CNBC采访时表示，他"惊讶"油价仅约90美元/桶——他声称自己预期的是200美元。但选民的感受显然不同：一位来自科罗拉多州的60岁退休空军女军官Kathryn Bright说得直接："我对自己感到恶心，感觉被背叛了，他就是个披着羊皮的狼。"这代表了一批当初支持特朗普的选民正在重新评估。</p>
            <p>延伸思考：对2026年中期选举而言，这个信号值得警惕。特朗普在经济议题上的弱点正在从边缘向核心扩散，而伊朗战争延续得越久，能源价格压力传导到消费端的滞后效应就越难掩盖。</p>
            <p>来源：<a href="https://apnews.com/article/trump-approval-iran-economy-cost-of-living-poll-fff492898cc8ff34e11df90ec4837a79" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>The Onion再战Infowars：接管制裁阴谋论的法庭博弈</h3>
            <p>讽刺新闻媒体The Onion于4月21日向得克萨斯州法院提交新方案，计划通过许可协议接管Alex Jones的Infowars平台，将其改造为讽刺内容网站。如果获法官批准，The Onion将获得6个月的独家许可运营Infowars网站及社交媒体账号，并计划聘请Tim and Eric喜剧搭档成员Tim Heidecker参与运营。Infowars拖欠Sandy Hook枪击案受害者家属超过10亿美元赔偿金。</p>
            <p>Jones本人在节目中对这一计划表示将"在法庭上抗争"，但也承认可能在月底前被赶出当前工作室。他已在筹备备用方案：通过个人X账号和其他社媒平台继续播出，并搭建了新的商品销售网站——包括膳食补充剂和服装，这些每年带来数百万美元收入。此次是The Onion第二次尝试接管Infowars，2024年11月的拍卖结果被破产法官以程序问题为由推翻。</p>
            <p>延伸思考：这不是一个单纯的媒体事件。法庭最终如何处置Infowars，将成为数字时代如何处理仇恨言论与新闻自由边界的标志性案例。新Sandy Hook原告律师表示支持The Onion方案，利润将用于赔偿受害者家属。</p>
            <p>来源：<a href="https://apnews.com/article/alex-jones-infowars-onion-sandy-hook-f0e523468af6811f9634c75ae76f605f" target="_blank">AP News</a></p>
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
            <h3>OpenAI推出ChatGPT Images 2.0：多图生成与文字渲染大幅升级</h3>
            <p>OpenAI于4月21日发布ChatGPT Images 2.0图像生成模型，最大的改进是支持从单一提示词生成多张图片（如整套学习手册），并显著提升了文字渲染能力——包括中文和印地语等非英语语言。新模型还接入了ChatGPT的"推理"能力，可以联网搜索实时信息来辅助生成，图片知识截止日期也更新至2025年12月。付费订阅用户可使用更强大的版本。</p>
            <p>来源：<a href="https://www.wired.com/story/openai-beefs-up-chatgpts-image-generation-model/" target="_blank">Wired</a></p>
          </div>

          <div className="article-sub">
            <h3>Mozilla联手Anthropic：AI模型Mythos Preview发现271个Firefox漏洞</h3>
            <p>Mozilla于本周发布的Firefox 150浏览器中，包含271个由Anthropic的Mythos Preview AI模型协助发现并修复的安全漏洞。Firefox首席技术官Bobby Holley表示，Mythos等工具让漏洞发现从"人类分析才能找到"跨越到了"自动化全面覆盖"的阶段，Mozilla因此得以将大量潜在漏洞消灭在发布前。</p>
            <p>来源：<a href="https://www.wired.com/story/mozilla-used-anthropics-mythos-to-find-271-bugs-in-firefox/" target="_blank">Wired</a></p>
          </div>

          <div className="article-sub">
            <h3>John Ternus接棒Tim Cook：苹果AI战略正式进入"追赶模式"</h3>
            <p>苹果官方4月21日宣布，硬件工程负责人John Ternus将于9月接任CEO。Ternus在苹果任职25年，是MacBook Neo、iPhone多代产品的工程主导者，被视为硬件领域的顶级专家。分析师普遍认为这次换帅的核心原因正是苹果在AI领域的落后：Siri智能化进展缓慢、AI功能多次延期、与谷歌的Gemini合作最终落地，都是"追赶"的注脚。</p>
            <p>来源：<a href="https://apnews.com/article/apple-iphone-succession-jobs-cook-ternus-374bd6399b3fbd14695286055228cd58" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>苹果与谷歌Gemini合作深化：Siri将获AI升级</h3>
            <p>在John Ternus即将接任的背景下，苹果与谷歌在AI上的合作已从产品层深入到系统层。苹果的AI战略正从"自研优先"转向"合作+自研并行"，这一转变背后是市值被英伟达超越的压力，以及AI功能缺失对iPhone产品竞争力的侵蚀。</p>
            <p>来源：<a href="https://apnews.com/article/apple-google-artificial-intelligence-partnership-865dfa575279c292bc729a2dfa4e1583" target="_blank">AP News</a></p>
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
            <h3>The Onion接管Infowars：AI时代的"反阴谋论"实验</h3>
            <p>The Onion此次方案不仅是商业行为，更像是一场"用幽默对抗虚假信息"的AI时代实验——计划由专业喜剧人运营，将Infowars的品牌和流量转化为反讽内容，收益用于赔偿受害者家属。从平台治理角度看，这提供了一个"不封禁，而是用优质内容淹没"的思路。</p>
            <p>来源：<a href="https://apnews.com/article/alex-jones-infowars-onion-sandy-hook-f0e523468af6811f9634c75ae76f605f" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>中国人形机器人半马50分26秒完赛：具身智能加速落地</h3>
            <p>中国机器人公司Honor的人形机器人在半程马拉松中以2小时26秒完赛——比人类半马纪录快约7分钟。这一成绩虽在特定环境下达成（机器人无需休息、无体温调节压力），但它揭示了具身智能在耐力、复杂地形导航和实时平衡控制上的快速进步。具身智能正在从实验室走向实际场景。</p>
            <p>来源：<a href="https://www.wired.com/story/a-humanoid-robot-set-a-half-marathon-record-in-china/" target="_blank">Wired</a></p>
          </div>

          <div className="article-sub">
            <h3>OpenAI高管Kevin Weil离职：AI科学应用并入Codex</h3>
            <p>前Instagram副总裁、OpenAI高管Kevin Weil确认离开ChatGPT制造商，其领导的AI科学应用项目将并入Codex团队。这是一系列OpenAI高管人事变动的最新一例，折射出公司内部对产品优先级和战略方向的持续调整。</p>
            <p>来源：<a href="https://www.wired.com/story/openai-executive-kevin-weil-is-leaving-the-company/" target="_blank">Wired</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>美伊停火谈判"无限期推迟"：伊朗要解除封锁才肯谈，美国要伊朗先开放海峡——双方的核心诉求实际上是同一个筹码的两面</li>
            <li>伊朗对伊拉克民兵授权下放，令前线更不可控；日本借机大步迈出武器出口禁令；SPLC被起诉是政治敏感度极高的司法案件</li>
            <li>特朗普经济支持率跌至30%，共和党年轻人尤其不满——能源价格是眼下最直接的民心战场</li>
            <li>OpenAI图像模型升级、Mozilla用Anthropic工具一天修271个漏洞——AI能力的提升速度正在重新定义软件开发节奏</li>
            <li>The Onion试图用"接管制裁"而非"封禁"处理Infowars，是个值得关注的平台治理实验</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-22 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
