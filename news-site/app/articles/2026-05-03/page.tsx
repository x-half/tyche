import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.05.03 · 国际・AI・Agent 日报',
  description: '印度对苹果380亿美元罚款裁决倒计时；伊朗绕道叙利亚出口原油；美军AI扫雷霍尔木兹；中国具身机器人规模化落地提速',
}

export default function ArticlePage() {
  const weekDay = '周日'
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
            <span className="article-weekday">{weekDay}</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>苹果在印度面临的这次处罚不只是反垄断问题，背后是美印贸易谈判的筹码博弈。伊朗开始绕道叙利亚出口原油，霍尔木兹海峡的博弈还在继续。
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
            <h3>苹果在印度面临380亿美元罚款，5月21日最终裁决</h3>
            <p>这场耗时近五年的反垄断调查终于要见分晓了。印度竞争委员会将在5月21日对苹果处以最高380亿美元罚款的案件进行最终听证并做出裁决。起因是2021年 Tinder母公司Match集团投诉苹果强制应用开发者使用苹果应用内购买系统并抽取30%佣金。印度竞争委员会在2022年启动调查，2024年发布详细调查报告，确认苹果存在滥用市场主导地位的事实。苹果先后以商业机密、违宪诉讼、拒绝提交财务数据等方式抵制，但都没能阻止调查进入收官阶段。值得关注的是，如果按印度新规的"全球营业额"计算，罚款最高可达380亿美元，是苹果在印度累计净利润的30倍。苹果能接受的底线是按在印度年营收90亿美元的10%计算，即最多9亿美元。当前双方差距悬殊，背后其实是美印贸易谈判的延续——特朗普政府已在2月份备忘录中明确威胁对征收罚款或数字税的国家采取关税报复。美国商会和贸易代表办公室已为苹果发声，局势正在朝政治层面演化。</p>
          </div>

          <div className="article-sub">
            <h3>伊朗研究超8条贸易替代通道，伊拉克借道叙利亚运油</h3>
            <p>霍尔木兹海峡不通的情况下，伊朗开始系统性寻找替代路线。伊朗贸易促进组织副主任5月3日表示，伊朗正在研究超过8条贸易替代通道或路线，绕过南部海上威胁。同一天，伊拉克时隔13年后重新启用经叙利亚的陆地运油线路，70辆油罐车从伊拉克经拉比亚口岸进入叙利亚。与此同时，一艘载有超过190万桶原油、价值近2.2亿美元的伊朗超大型油轮成功"躲过"美国海军追踪，正穿越印度尼西亚水域驶往廖内群岛。海湾地区的供应链正在被重塑——伊朗已不再要求美国在直接谈判前解除霍尔木兹海峡封锁，这是一个微妙的姿态变化，意味着双方对话的门槛在降低，但实质进展仍取决于美方能否在制裁与海上封锁之间找到平衡点。</p>
          </div>

          <div className="article-sub">
            <h3>以军空袭黎巴嫩南部致9人死亡，黎真主党反击</h3>
            <p>中东局势在短暂缓和后又出现升级。5月2日下午，以色列对黎巴嫩南部多地发动空袭，造成至少9人死亡、两人受伤。黎巴嫩真主党随即出动两架自杀式无人机反击，袭击了拜亚代镇的以军士兵集结点，并用火炮打击了坎塔拉镇一处以军车辆和士兵集结点。真主党明确表示这些行动是对以军空袭的回应。近期黎以边境冲突呈周期性升级态势，每一次空袭都会引发真主党的报复，而报复又会招来下一轮空袭。这个循环目前没有停止的迹象。</p>
          </div>

          <div className="article-sub">
            <h3>美军近亿美元合同借AI探扫霍尔木兹海峡水雷</h3>
            <p>美国海军近日与一家AI企业签署了近亿美元合同，采购机器学习相关服务用于改进水雷探测能力，应用场景直指霍尔木兹海峡。美方没有公布是哪家企业，但结合伊朗正在研究超8条替代贸易通道的背景，美国在霍尔木兹海峡的军事部署和技术投入都在加码。AI扫雷的核心逻辑是：通过机器学习算法处理声呐和视觉数据，大幅提升水雷探测的准确性和速度，降低人工风险。这条新闻的潜台词是：美军正在为可能升级的霍尔木兹博弈做技术准备，扫雷能力一旦成熟，美国对封锁航道的应对选项会更多。</p>
          </div>

          <div className="article-sub">
            <h3>中国小将吴宜泽斯诺克世锦赛逆转进决赛，黑马成色十足</h3>
            <p>世锦赛半决赛打出了一场让所有人都没想到的剧本。中国小将吴宜泽在14-16落后、被逼入绝境的情况下，连续挽救两个赛点并在决胜局完成单局逆转，以17-16击败六冠王马克·艾伦，晋级决赛。艾伦在最后时刻打丢了难度不大的黑球，拱手送出了晋级名额。吴宜泽即将面对的是同样状态出色的墨菲，后者在半决赛中击败了"75三杰"之一的希金斯。从赔率看吴宜泽稍稍被看好，但更值得关注的是他的背景——16岁独自赴英，曾住在没有窗户的公寓、和父亲挤一张床。BBC专门用了大幅篇幅介绍他的故事。一匹黑马打进了斯诺克最高殿堂的决赛，这项运动的叙事正在被改写。</p>
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
            <h3>苹果内部用Claude Code写代码被实锤，官方App误打包Claude.md</h3>
            <p>苹果官方Apple Support应用v5.13在5月1日推送更新时，意外夹带了内部的Claude.md文件。MacRumors分析师Aaron Perris发现并曝光了这件事。泄露的文件揭示了苹果内部使用Claude作为开发工具的架构：Apple Support的客服系统实际上是Juno AI（自动应答）和Live Agents（真人客服）的双后端无缝切换，对用户完全不透明。三种身份——client（用户）、agent（真人客服）、assistant（AI）——走同一套处理流程，没有人知道对面是人还是机器。苹果对此拒绝置评。三个月前彭博社Mark Gurman就透露"Apple runs on Anthropic at this point"，现在这个判断被坐实了。值得注意的是，苹果在用户产品层面选择了与谷歌合作（Gemini取代旧版Siri），但在内部代码开发工具上押注的是Claude而非Gemini。业内评论指出的核心问题是：连苹果这么强调保密的公司都会把不该提交的文件推进生产环境，这意味着AI编程工具在工作流中的渗透程度已经超出大多数人的预期。</p>
          </div>

          <div className="article-sub">
            <h3>魔法原子在硅谷办全球具身智能创新大会，发布世界模型Magic-Mix</h3>
            <p>魔法原子4月28日在硅谷圣何塞举办了全球具身智能创新大会（GEIS），发布了一系列重磅产品。Magic-Mix是自研的"自主进化模型"，由Magic-WAM（理解真实世界）和Magic-Creator（离线生成大规模合成数据）两个引擎构成，可以在"数据生成-模型训练-真实世界反馈-再生成"的闭环中持续迭代。灵巧手MagicHand H01有20个自由度（人手约24-27 DOF）和44个高分辨率三维触觉传感器，定位工业制造和服务护理场景。人形机器人MagicBot X1身高180cm、体重70kg，全身31个主动DOF，关节极限扭矩450N·m，可7×24连续作业。会上中美具身公司讨论了数据策略：混合数据训练（真实数据+合成数据）是主流；VLA仍是主流架构但触觉传感器成熟后会迭代；灵巧手设计有连杆、腱绳、直驱三条路线，Chestnut Robotics选择了腱绳+AI控制的混合架构。</p>
          </div>

          <div className="article-sub">
            <h3>智元机器人第1万台量产下线，宇树科技披露IPO招股书</h3>
            <p>2026年4月，具身智能行业密集公布商业化里程碑。智元机器人宣布第1万台机器人量产下线，从5000台到10000台只用了三个多月。宇树科技的IPO招股书也揭示了激进的商业化数据：2025年营收17.07亿元，出货量超过5500台，海外营收占总营收50%以上。魔法原子更是提出2036年实现140亿美元营收的激进目标。数字竞速的背后是"低价、高性能"的中国机器人在全球的扩张策略。规模化落地成为今年具身公司的共同主题，机器人从"单一功能设备"向"多任务通用平台"演进的速度在加快。</p>
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
            <h3>美军AI扫雷合同落地，霍尔木兹海峡成AI军事应用试验场</h3>
            <p>美国海军与AI企业签署的近亿美元扫雷合同，目标是借助机器学习改进水雷探测能力，应用场景包括霍尔木兹海峡。这不是概念性的研究，而是有明确作战场景的合同。AI扫雷的核心在于：传统声呐识别依赖人工经验，漏检率和误报率居高不下，而机器学习可以在海量历史数据中找出水雷的声学特征规律，大幅提升探测效率。对美军而言，扫雷能力提升意味着封锁航道的应对选项增加。伊朗同日宣布研究超8条替代通道，两条新闻放在一起来看：伊朗在想办法绕开霍尔木兹，美军在想办法控制霍尔木兹，AI成了两边博弈的新变量。</p>
          </div>

          <div className="article-sub">
            <h3>具身智能规模化落地加速，中国机器人出海势头强劲</h3>
            <p>具身智能的2026年主题词是"规模化落地"。智元机器人第1万台量产下线、宇树科技冲刺IPO、魔法原子提出140亿美元营收目标——数字背后是同一条逻辑：机器人必须跑通工厂，才能证明商业化逻辑成立。宇树科技的海外营收占比超过50%，说明中国机器人已经在全球市场建立了竞争位置。与会硅谷公司透露，亚马逊前沿AI与机器人研究院科学家认为VLA之所以流行，是因为触觉传感器还在初级阶段，视觉是当前最成熟的感知系统。未来触觉传感器成熟后，算法架构会随之迭代。现在的领跑者未必是最终赢家。</p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>苹果印度天价罚单背后是美印贸易谈判筹码博弈，霍尔木兹海峡牵动全球能源供应链</li>
            <li>苹果用Claude做内部开发工具被实锤，AI编程工具渗透程度超出预期</li>
            <li>具身智能商业化竞速，智元万台量产、宇树科技冲刺IPO，中国机器人出海强势</li>
          </ul>
        </div>

        {/* 历史上的今天 */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', color: '#e87a9f', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            📜 历史上的今天
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>2024</span>
              <span style={{ color: '#555' }}>嫦娥六号探测器由长征五号遥八运载火箭在中国文昌航天发射场成功发射</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1979</span>
              <span style={{ color: '#555' }}>撒切尔夫人成为英国首位女首相，开启英国政治新篇章</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1868</span>
              <span style={{ color: '#555' }}>德川庆喜向忠于天皇的军队交出江户城，日本幕府统治时代结束</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1791</span>
              <span style={{ color: '#555' }}>波兰议会通过《五·三宪法》，在欧洲宪政史上具有里程碑意义</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1492</span>
              <span style={{ color: '#555' }}>哥伦布发现牙买加，开启了加勒比海地区被欧洲殖民的历史</span>
            </div>
          </div>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-05-03 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}