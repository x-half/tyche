import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.05.03 · 国际・AI・Agent 日报',
  description: '美伊谈判重启，三周停火协议仍在延续；美德裂痕加深，美军从德国撤离5000人；欧盟汽车关税升至25%，跨大西洋贸易紧张升温',
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
            <span className="article-date-badge">2026.05.03</span>
            <span className="article-weekday">周日</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>美伊对峙进入关键窗口期，停火协议脆弱但仍在；欧洲这边同样不安稳，德美关系因伊朗战争裂痕加深，关税战又起。
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
            <h3>美伊谈判重启：巴基斯坦居中传递14点方案，三周停火仍在延续</h3>
            <p>伊朗通过巴基斯坦向美方递交了一份14点停火提案，特朗普5月2日在"空军一号"上对媒体表示正在审阅，但同时表达了怀疑态度。就在此前不到一周，特朗普刚刚拒绝了上一份提案。不过双方对话渠道并未关闭，据悉当下已执行三周的停火协议仍在延续，霍尔木兹海峡航运暂未受到进一步干扰。与此同时，美方警告各船运公司，若向伊朗支付过境费用以确保船只安全通过霍尔木兹，将面临制裁风险。伊朗方面则宣布处决了两名被认定向以色列从事间谍活动的人员，展示出强硬姿态。这轮博弈从关税制裁升级至海上截获，现在又回到外交谈判桌，变量依然密集。霍尔木兹是全球约五分之一石油的通道，任何误判都可能迅速推高油价。</p>
            <p><strong>来源：</strong><a href="https://apnews.com/article/iran-us-war-ceasefire-negotiations-strait-9317c11e51ba8dfa527b424f931fe04b" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>美德关系因伊朗战争持续承压，美军宣布从德国撤离5000人</h3>
            <p>五角大楼5月1日宣布，未来6至12个月内将从德国撤出约5000名士兵，撤军规模约占目前在德美军总数的14%。发言人肖恩·帕内尔表示，这一决定"经过对欧洲美军部署的全面评估"，旨在"回应战区需求和地面形势"。但在美德围绕伊朗战争问题公开分歧的背景下，这一撤军计划被普遍视为对德国总理弗里德里希·默茨施压的结果。特朗普曾多次暗示可能从这一北约盟友撤军，双方在伊朗问题上的立场差异让跨大西洋关系面临考验。北约内部安全协调的连续性也因此多了层阴影。</p>
            <p><strong>来源：</strong><a href="https://apnews.com/article/trump-merz-germany-troops-withdrawal-nato-d37af7bcd1a97e265f3b3afd8aa65142" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>欧盟汽车关税升至25%，欧美贸易关系再度紧绷</h3>
            <p>特朗普5月1日宣布，将于下周起对欧盟汽车和卡车进口关税提高至25%，震动全球汽车产业。欧洲议会贸易委员会主席伯恩德·朗格回应称这一决定"不可接受"，指责美方"一再违背承诺"。去年7月，特朗普与欧盟委员会主席冯德莱恩曾达成一项贸易协议，约定对大多数商品征收15%关税。如今美方单方面升级关税，理由是欧盟"未完全遵守已达成的协议"，但未详述具体异议。这已经是特朗普任内第二轮对欧关税行动，钢铝关税之后，汽车成为新的摩擦焦点。欧盟如何反制，将影响全球供应链格局。</p>
            <p><strong>来源：</strong><a href="https://apnews.com/article/trump-tariffs-eu-autos-trade-800e6ed469b73cd4c144edb65e40ba72" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>马里军方被指与极端分子联手，北部战略重镇失守，国防部长阵亡</h3>
            <p>马里国家公诉人5月1日深夜发表声明，指控部分军方军官与圣战分子及分离主义武装勾结，在近期发动了十多年来最大规模的联合攻击。分离主义武装"阿扎维德解放阵线"宣称已占领北部战略城镇泰萨利的一处军事基地，此前马里军队及其俄罗斯盟友已从此地撤离。本周更早之前，叛军还夺取了重要城市基达尔，马里国防部长萨迪奥·卡马拉在冲突中阵亡。这是马里军政府近年面临的最严重军事挫折，与极端分子和分离主义者的联合行动模式显示出该地区安全形势的复杂性持续上升。</p>
            <p><strong>来源：</strong><a href="https://apnews.com/article/rebels-mali-capture-tessalit-azawad-liberation-front-ad322075647daeda4332d71e1a102631" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>沙特等国斡旋有效，巴基斯坦与阿富汗宣布暂时停火</h3>
            <p>巴基斯坦与阿富汗宣布暂时停火，这一决定源于沙特阿拉伯、土耳其和卡塔尔三国的联合调解请求。两国冲突始于今年2月，在阿富汗指责巴基斯坦在喀布尔实施空袭造成数百人伤亡后，紧张局势急剧升级。双方宣布在开斋节前暂停敌对行动，为外交斡旋留出窗口。去年10月，三国也曾帮助两国达成停火协议，但未能长期维持。巴基斯坦与阿富汗的边境冲突涉及塔利班政权与巴基斯坦之间的复杂关系，包括对极端组织的不同立场和边境管理争议，此次停火脆弱性依然较高。</p>
            <p><strong>来源：</strong><a href="https://apnews.com/article/afghanistan-pakistan-hospital-drug-rehabilitation-airstrike-funeral-c457ea4cffb45299ab9967543610b4fe" target="_blank">AP News</a></p>
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
            <h3>美军与七大科技企业达成协议，将AI引入机密网络</h3>
            <p>五角大楼5月1日宣布，已与七家科技企业达成协议，将人工智能资源接入美军机密计算机网络。名单包括Google、Microsoft、Amazon Web Services、Nvidia、OpenAI、Reflection和SpaceX，这些公司将为"复杂作战环境中的决策者提供AI辅助"。值得注意的是，Anthropic未能入选，这与该公司此前就AI军事化伦理问题与特朗普政府产生的法律纠纷直接相关。美军正在加速推进AI部署，但如何确保不跨越伦理边界、避免隐私侵犯和战场自主决策风险，仍是这个进程中最核心的未解问题。</p>
            <p><strong>来源：</strong><a href="https://apnews.com/article/pentagon-artificial-intelligence-military-classified-systems-war-060cecf836c4cebcf012a3ceb5333f2c" target="_blank">AP News</a></p>
          </div>

          <div className="article-sub">
            <h3>苹果App Store误将内部Claude.md打包发布，Vibe Coding引发安全质疑</h3>
            <p>苹果公司5月1日向用户推送的Support应用更新中，意外内置了一份内部Claude.md文件，详细描述了如何构建项目、遵循哪些规范和避让哪些雷区。这份文件暴露了苹果使用Claude Code构建生产级应用的内部工作流程，而Claude Code是Anthropic开发的编程工具。这家全球最注重保密的科技公司，在24小时内紧急撤回了更新，但部分内容已经外流。有评论指出，这与此前的Claude Code源码泄露事件如出一辙——两次事故都涉及将source map打包进发布版本，矛头直指Claude Code本身的行为边界问题。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/p/3791662444911617" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>中国具身智能公司扎堆出海，中美从业者在硅谷同台对话</h3>
            <p>来自中国和美国的具身智能（Physical AI）公司近期在硅谷进行了一场闭门交流，核心议题围绕四个字：规模化落地。与往年不同，2026年各家的产线进度、招股书数据和实际出货量都已进入可对照的阶段。智元机器人4月宣布第1万台机器人量产下线，从5000台到1万台仅用了三个多月；宇树科技也在推进IPO招股。中国的具身公司正在用不同的路径尝试进入国际市场，与美国同行之间的竞合关系正在深化。这场对话的实际结论尚待观察，但行业已经从讲故事阶段进入了拼产能阶段。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/p/3792155815304450" target="_blank">36氪</a></p>
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
            <h3>本田宣布追加投资美国自动驾驶AI初创公司helm.ai</h3>
            <p>总部位于硅谷的自动驾驶AI软件初创公司helm.ai在社交媒体宣布，本田已与其达成追加投资的协议，所筹资金将用于推进2027年及以后推出的下一代端到端（E2E）自动驾驶和ADAS系统。本田称这笔投资源于双方此前的合作基础，希望借助helm.ai在端到端自动驾驶技术上的积累加速产品落地。helm.ai专注的端到端模型是近年来自动驾驶赛道的主流方向，不依赖高精地图、强调实时感知与决策的整合能力。本田在电动化转型上一直相对保守，此次对AI驾驶领域的加码透露出其想在下一代出行领域重新建立存在感的意图。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/newsflashes/3792810419543301" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>比尔·阿克曼向环球音乐发出640亿美元收购要约，周杰伦等顶流版权去向成焦点</h3>
            <p>华尔街大佬比尔·阿克曼旗下的潘兴广场资本正式向环球音乐（UMG）发出收购要约，以现金加股票的方式进行交易，估值约640亿美元。环球音乐是全球最大音乐唱片公司，周杰伦、陈奕迅、泰勒·斯威夫特、贾斯汀·比伯、防弹少年团等顶级艺人版权均在其麾下。阿克曼以精准选股和积极股东行动闻名，曾在疫情前做空赚了40亿美元，被称为电视剧《亿万》的原型人物。他一直有意将潘兴广场打造为对标伯克希尔的上市投资平台，此次收购是这一战略的最新动作。消息公布后，UMG股价波动明显，但最终收购能否落地，还取决于UMG董事会的态度和监管审批。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/p/3791838183234816" target="_blank">36氪</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>美伊通过巴基斯坦恢复谈判通道，三周停火协议脆弱延续，霍尔木兹航运暂未受进一步干扰</li>
            <li>美德关系因伊朗战争裂痕加深，美军撤离德国5000人，北约内部协调面临新考验</li>
            <li>欧美汽车关税升至25%，贸易摩擦从钢铝延伸至汽车制造，欧洲供应链承压</li>
            <li>美军与Google、微软、英伟达等七家科技企业达成协议，将AI引入机密作战网络，Anthropic缺席</li>
            <li>苹果误将Claude.md打包进App Store，暴露内部使用Claude Code构建生产应用，安全边界引关注</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-05-03 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}