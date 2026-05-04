import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.05.04 · 国际・AI・Agent 日报',
  description: '马斯克法庭上承认Grok蒸馏ChatGPT、潘兴广场640亿美元收购环球音乐、苹果误打包Claude.md进入官方App',
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
            <strong>编者按：</strong>三个板块各挑了一条真正值得聊的。不是快讯合集，是有"认知增量"的事件。有些读起来可能不舒服，但它发生了。
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
            <h3>华尔街大佬640亿美元收购环球音乐，周杰伦、陈奕迅、泰勒·斯威夫特都要换老板？</h3>
            <p>比尔·阿克曼的潘兴广场向环球音乐集团发出收购要约，对后者的估值高达约640亿美元（约合4300亿人民币）。这是一笔相当有意思的交易——阿克曼用每股30.40欧元的报价，比环球音乐当时的股价溢价了78%。他的目标很明确：让环球音乐从荷兰阿姆斯特丹搬到纽约证券交易所上市。</p>
            <p>环球音乐手里攥着全球最值钱的音乐版权库——Taylor Swift、Beatles、Justin Bieber、周杰伦、陈奕迅……这些顶流的版权全在它手里。每一次流媒体播放、每一次广告授权、每一次影视配乐，都要给环球交钱。版权永续生意，现金流稳定得吓人。阿克曼说"音乐是永恒的"，这话不假，经典曲库真的是"躺赚"。</p>
            <p>这笔交易另一个看点是腾讯。2020年开始，腾讯牵头的财团通过两次交易持有环球音乐约20%股权。当年投资如今面临退出节点，无论阿克曼能不能做成这单，腾讯都可能从中大赚一笔。而对整个流媒体音乐行业来说，如果一个华尔街"激进投资者"入主全球最大唱片公司，接下来怎么整合版权、怎么重新谈判平台分成，都是未知数。</p>
            <p>来源：<a href="https://36kr.com/p/3791838183234816" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>马斯克告OpenAI案第四天：承认Grok蒸馏ChatGPT，法庭当场被问"你在双标吗"</h3>
            <p>4月30日，加州奥克兰联邦法院，马斯克诉OpenAI案进入第四天。高潮出现在OpenAI首席律师William Savitt的追问：xAI是否蒸馏了OpenAI的模型？马斯克先是打了个太极说"所有AI公司都在这么干"，然后被追问到哑口无言——"所以答案是yes？""部分如此（Partly）。"这句话一出，全网瞬间炸锅。</p>
            <p>蒸馏本质上就是让竞争对手的AI"当家教"，低成本教出一个水平差不多的学生。马斯克一边在法庭上起诉OpenAI"背叛非营利使命"，一边承认自家模型在蒸馏OpenAI的数据——这个讽刺含量已经溢出屏幕。更戏剧性的是，法官Yvonne Gonzalez Rogers当场拦下了马斯克律师想让专家证人讨论"AI导致人类灭绝"的企图，说了一句："我注意到，尽管存在这些风险，马斯克先生本人也正在这个领域创建一家公司。"</p>
            <p>庭审中还曝光了另一个有意思的细节：马斯克被问及xAI在AI行业的排名时，给出的答案是"Anthropic第一，OpenAI第二，谷歌第三，xAI垫底"。那个在X上天天喊"Grok杀疯了"的男人，到了宣誓席突然变得无比谦虚。说白了，在法庭上他需要把xAI描述得越小越好，才能反驳"你起诉OpenAI是为了打击竞争对手"的指控。</p>
            <p>来源：<a href="https://36kr.com/p/3791460373929221" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>韩国3月网购销售额突破25万亿韩元创下历史新高，特斯拉需求激增</h3>
            <p>韩国政府周一公布的数据显示，受特斯拉汽车和餐饮服务强劲需求推动，韩国3月份网络购物销售额同比增长13.3%，达到25.58万亿韩元（约合173.7亿美元），创下自2017年开始收集相关数据以来的最高月度水平。</p>
            <p>韩国网购市场这次创纪录，特斯拉是重要拉动力。韩国消费者通过网络订购系统购买特斯拉汽车的量激增，带动整体汽车类目大幅增长。同时，餐饮服务板块也表现强劲，印证了韩国消费市场在疫后持续恢复的趋势。</p>
            <p>这个数字背后还有一个值得关注的点：韩国网络购物的天花板还在抬高。当一个成熟市场的网购额还能创历史新高，说明消费习惯的线上化迁移还没到头。这对所有做跨境电商的企业来说都是一个信号——韩国市场的线上消费潜力可能比想象中更大。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3794527211707398" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>张雪机车WSBK匈牙利站夺冠，荣耀宣布推出冠军联名款手表</h3>
            <p>2026世界超级摩托车锦标赛（WSBK）匈牙利站WorldSSP组别第一回合正赛，中国摩托车制造商张雪机车的法国车手瓦伦丁·德比斯在最后时刻反超绝杀，夺得冠军。这是张雪机车再次站上世界顶级赛事的领奖台。</p>
            <p>赛后，荣耀CEO李健发微博祝贺，同时宣布作为张雪机车WSBK首席战略合作品牌，荣耀将推出双方冠军联名款手表。此前荣耀在4月初就已正式成为张雪机车WSBK首席战略合作品牌，并向车队赠送了荣耀WIN系列手机和游戏本。</p>
            <p>从商业角度看，荣耀与张雪机车的合作是一种"借船出海"的打法——通过国际赛事背书，提升品牌在年轻用户群体和运动场景中的影响力。WSBK虽然不像MotoGP那样全球知名，但在细分领域有稳定的受众群体，荣耀选择这个赛事做营销联名，算是一种精准投放。</p>
            <p>来源：<a href="https://36kr.com/p/3792228036615430" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>港股恒指午盘涨1.7%，恒生科技指数涨2.86%</h3>
            <p>港股今日早盘表现强劲，恒生指数午间休盘上涨1.7%，恒生科技指数上涨2.86%。硬件设备、半导体、零售板块领涨，其中天数智芯涨超15%，剑桥科技涨超14%，小米集团涨超8%，阿里巴巴涨超5%。</p>
            <p>与此同时，石油石化、钢铁、煤炭等资源类板块跌幅居前。港股市场出现明显的风格切换，从传统经济周期股转向科技成长股。这个趋势值得持续关注——当科技股开始大幅反弹，往往意味着市场情绪在转变，资金在重新定价中国科技资产的估值。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3794457822059523" target="_blank">36氪</a></p>
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
            <h3>豆包App将推付费订阅，复杂任务场景开始收费</h3>
            <p>豆包App在App Store页面出现付费版本服务声明，官方回应称豆包始终提供免费服务，在此基础上也在探索更多增值服务。知情人士透露，付费功能将主要专注在复杂任务和生产力场景，如PPT生成、数据分析、影视制作等。</p>
            <p>豆包表示，随着模型能力持续升级，产品已能满足越来越多复杂高价值任务，但这类任务消耗更多算力与推理时间，因此计划上线付费服务满足这部分需求。免费版本继续面向日常使用。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3794495772712195" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>苹果官方App误打包Claude.md，暴露内部使用Claude Code构建生产级应用</h3>
            <p>苹果官方Apple Support应用v5.13版本更新中意外夹带了Claude.md文件，被MacRumors分析师Aaron Perris发现并曝光。泄露文件揭示了Apple Support的对话系统架构：Juno AI负责自动应答，Live Agents负责真人客服接管，两套后端通过Protocol协议层无缝切换。</p>
            <p>消息系统的三角色设计尤其值得注意：用户、苹果真人客服、AI三种身份走同一套处理流程，用户无法区分对面到底是人还是AI。苹果已紧急撤回该版本。</p>
            <p>这再次印证了苹果与Anthropic的深度合作——彭博社Mark Gurman三个月前就报道过"Apple runs on Anthropic at this point"。有趣的是，苹果选择Claude而非Gemini来构建内部开发工具。</p>
            <p>来源：<a href="https://36kr.com/p/3791662444911617" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>卓驭发布面向移动物理AI的原生多模态基础模型，转型成为生存法则</h3>
            <p>卓驭科技在北京车展发布了面向移动物理AI的原生多模态基础模型。卓驭副总裁于贝贝表示，算法厂商向物理AI转型不是迎合资本市场的想象空间，而是关乎存亡的生存法则。</p>
            <p>卓驭透露，其移动基座模型正在打破传统Tier 1"卖硬件、收开发费"的单一商业模式，探索基于订阅、利润分成和"动作令牌"的新商业形态。</p>
            <p>来源：<a href="https://36kr.com/p/3789475357400068" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>精锻科技机器人业务尚未形成销售收入，2026年陆续到位</h3>
            <p>精锻科技在业绩说明会表示，公司机器人相关业务目前仍处于研发和市场开拓阶段，量产设备计划于2026年陆续到位并安装调试，但规模化生产需待客户验证通过及订单落地，具体时间表存在不确定性。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3794483360046337" target="_blank">36氪</a></p>
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
            <h3>中美具身公司在硅谷激辩四大问题：数据、模型架构、灵巧手、规模化落地</h3>
            <p>4月28日，魔法原子在圣何塞发起全球具身智能创新大会（GEIS），Openmind、PrismaX、Chestnut Robotics等硅谷具身公司参会。会上讨论了四个核心问题：</p>
            <p>第一，合成数据vs真实数据。亚马逊前沿AI与机器人研究院科学家Haozhi Qi认为，合成数据适用于学习单一反应基本技能，但长程技能（如做早餐）需要真实数据训练。英伟达GEAR Lab采用50%模拟数据、40%真实数据的混合策略。</p>
            <p>第二，VLA是否是最优架构。VLA因强大任务泛化能力成为主流，但存在触觉和本体感知短板。业内共识是未来传感器和硬件发展后，算法也会迭代。</p>
            <p>第三，灵巧手设计路线之争。连杆、腱绳、直驱三种方案各有优劣，Chestnut Robotics选择了混合架构路线。</p>
            <p>第四，规模化落地的关键。OpenMind创始人斯坦福大学教授Jan Liphardt总结：机器人进入真实世界，越早越好。实验室无法模拟复杂现实场景，真实部署才能持续迭代。</p>
            <p>来源：<a href="https://36kr.com/p/3792155815304450" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>智元机器人第1万台下线，宇树科技IPO招股书披露5500台出货量</h3>
            <p>2026年4月以来，具身智能行业进入数字竞速阶段。智元机器人宣布第1万台机器人量产下线，从5000台到10000台仅用了三个多月。宇树科技IPO招股书也披露了激进商业化数据：2025年营收17.07亿元，出货量超过5500台，海外营收占总营收50%以上。</p>
            <p>魔法原子提出了更激进的营收目标：2036年实现140亿美元营收规模，并在硅谷召开全球发布会，发布Magic-Mix世界模型、MagicHand H01灵巧手和MagicBot X1人形机器人等产品。</p>
            <p>来源：<a href="https://36kr.com/p/3792155815304450" target="_blank">36氪</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>马斯克在法庭上承认Grok蒸馏ChatGPT，暴露了AI行业"大家都在干"的灰色操作</li>
            <li>阿克曼640亿美元收购环球音乐，腾讯持有的20%股权面临退出节点</li>
            <li>苹果误打包Claude.md进官方App，坐实了"Apple runs on Anthropic"</li>
            <li>具身智能进入量产竞速阶段，中国公司出海硅谷办会秀肌肉</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-05-04 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}