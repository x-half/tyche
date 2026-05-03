import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.17 · 国际・AI・Agent 日报',
  description: '美伊谈判释放谨慎乐观信号，欧洲能源危机倒计时；华为小艺引领端侧AI交互革新，具身智能国际标准破局。',
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
            <span className="article-date-badge">2026.04.17</span>
            <span className="article-weekday">周五</span>
          </div>
          <h1>国际・AI・Agent 日报</h1>
          <div className="article-note">
            <strong>编者按：</strong>伊朗在谈判桌上开始松口，但霍尔木兹的封锁还没撤。中东这盘棋，远没到收官的时候。科技这边，标准战悄悄开打——中国主导的首个具身智能国际标准立项，比任何新品发布都值得长期关注。
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
            <h3>美伊谈判释放"谨慎乐观"信号：伊核协议能否峰回路转？</h3>
            <p>
              伊朗驻联合国大使4月16日表示，伊朗对与美国谈判"持谨慎乐观态度"。这是自美伊直接对话中断以来双方首次公开确认接触意愿。背景是：美国海军持续封锁伊朗港口，中央司令部确认自封锁实施以来无任何船只成功通过霍尔木兹海峡，另有10艘商船被引导返回伊朗水域。财政部长Scott Bessent警告，继续与伊朗贸易的国家和私营企业将面临"与轰炸同等效力"的金融制裁。
            </p>
            <p>
              但僵局并未打破。三大核心议题——铀浓缩规模、霍尔木兹通行权、战损赔偿——仍是卡点。伊朗要求暂停铀浓缩5年，美方坚持20年冻结核计划。现有停火协议4月21日到期，时间窗口正在收窄。某种程度上，这份谨慎来自双方都不想再打、但都不想先让步的现实压力。
            </p>
            <p>
              来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>
            </p>
          </div>

          <div className="article-sub">
            <h3>欧洲航油告急：IEA警告仅剩六周储备</h3>
            <p>
              国际能源署（IEA）署长发出紧急警告，欧洲的航空燃料储备"可能只剩六周"。这一警告的背景是：红海航运中断持续迫使航空公司改道，导致全球航空燃料物流链重构，欧洲炼油厂的库存补充速度跟不上消耗节奏。主要欧洲机场已出现区域性航油供应紧张，多家航空公司被要求减少非必要航班。
            </p>
            <p>
              某种程度上，这不是单纯的能源危机，而是全球供应链"去红海化"的账单正在寄来——改道好望角的额外成本，最终会以航油价格的形式分摊到每个乘客头上。OPEC+尚无增产信号，中期来看航油价格压力难言缓解。
            </p>
            <p>
              来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>
            </p>
          </div>

          <div className="article-sub">
            <h3>美参议院否决停售以色列武器提案，民主党人多数"跑票"</h3>
            <p>
              美国参议院4月16日投票否决了一项要求停止向以色列出售武器的提案，民主党议员多数投下反对或弃权票。共和党人普遍支持继续军售，称停止军援会"向伊朗发送错误信号"。这是拜登政府上任以来国会第三次就以色列军售进行投票，前两次均以类似结果告终。
            </p>
            <p>
              表面是党派分歧，实质折射出美国中东政策的内在撕裂——要不要把"以色列安全"和"伊朗约束"打包处理？国会山已经给不出统一答案。
            </p>
            <p>
              来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>
            </p>
          </div>

          <div className="article-sub">
            <h3>美航母越战以来最长部署记录被打破：印太军事存在持续强化</h3>
            <p>
              美国海军一艘核动力航母打破了越战以来最长海外部署记录。美海军声明称，这一里程碑反映了当前印太地区安全形势的"持续性"——这也是五角大楼不情愿用的词。分析师指出，航母部署周期的延长，与伊朗局势升级、中国海军活动增加、朝鲜半岛变数抬头的时间线高度重合。
            </p>
            <p>
              某种程度上，航母deployment record不是荣耀，是压力。它意味着美军全球布武的弦绷得比预期更紧。
            </p>
            <p>
              来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>
            </p>
          </div>

          <div className="article-sub">
            <h3>联邦法院再次叫停特朗普白宫舞厅工程</h3>
            <p>
              一家联邦法院再次否决了特朗普政府在白宫东翼原址新建舞厅的项目，称其环境影响评估"存在重大疏漏"。这已是该项目第三次被法院挡下。特朗普随后在社交媒体发文怒批，称法院"用文书工作阻碍美国主权工程"。与此同时，联邦机构已批准在华盛顿建造"凯旋门"替代方案的概念设计，该项目同样引发法律争议。
            </p>
            <p>
              来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>
            </p>
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
            <h3>华为小艺伴随式AI：端侧交互的新样本</h3>
            <p>
              华为终端宣布推出"小艺伴随式AI"解决方案，采用侧边态交互形式，双击导航条即可唤醒。该方案将首发搭载于4月20日发布的Pura X Max。从官方描述看，这是一款深度整合在鸿蒙系统底层的AI助手——不是App，是一种交互范式。端侧AI的趋势正在从"能跑什么模型"演进到"怎么让人和模型自然地待在一起"。
            </p>
            <p>
              来源：<a href="https://36kr.com/newsflashes" target="_blank" rel="noopener">36氪</a>
            </p>
          </div>

          <div className="article-sub">
            <h3>具身智能领域首个国际标准立项：中国主导</h3>
            <p>
              中国在国际标准化组织（ISO）成功立项具身智能领域全球首项国际标准《人形机器人数据集》，并推动成立首个由中国专家担任召集人的工作组。这标志着中国在具身智能领域从"跟随者"转向"规则制定参与者"。标准争夺战是大模型竞争的下半场——谁主导数据集标准，谁就在下一代AI竞争中有结构性优势。
            </p>
            <p>
              来源：<a href="https://36kr.com/newsflashes" target="_blank" rel="noopener">36氪</a>
            </p>
          </div>

          <div className="article-sub">
            <h3>创业板指续创近十一年新高，AI概念持续强势</h3>
            <p>
              A股创业板指4月17日涨超1%，继续刷新近十一年新高。CPO、发电设备、电子元器件板块领涨，大金重工涨停，荣旗科技涨超7%，剑桥科技涨超5%。AI算力基础设施相关标的持续获资金流入，市场主线逻辑仍围绕"AI落地+国产替代"展开。
            </p>
            <p>
              来源：<a href="https://36kr.com/newsflashes" target="_blank" rel="noopener">36氪</a>
            </p>
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
            <h3>"龙虾出行"获近亿元天使轮融资：OpenClaw落地个人出行场景</h3>
            <p>
              AI出行品牌"龙虾出行"宣布完成近亿元人民币天使轮融资，并全球首发深度集成OpenClaw开源框架的AI个人出行助理。该轮融资由多家机构与产业投资人联合参与，资金将主要用于多Agent协作平台技术迭代、AI科学家团队组建及全球市场推广。这是OpenClaw框架在开源发布后，首个宣布基于其构建天使轮融资过亿级产品的创业公司。
            </p>
            <p>
              来源：<a href="https://36kr.com/newsflashes" target="_blank" rel="noopener">36氪</a>
            </p>
          </div>

          <div className="article-sub">
            <h3>华为小艺：从语音助手到"伴随式AI"的范式迁移</h3>
            <p>
              华为小艺伴随式AI的发布，折射出一个更本质的趋势：端侧AI Agent正在从"响应命令"向"主动伴随"演化。双击导航条唤醒、侧边态交互——交互入口的改变意味着AI不再是被"召唤"的工具，而是持续在场的协作节点。这对AI Agent的工程架构提出了新要求：持续感知、轻量运行、语境保留。
            </p>
            <p>
              来源：<a href="https://36kr.com/newsflashes" target="_blank" rel="noopener">36氪</a>
            </p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>国际：美伊谈判窗口未关闭但僵局依旧，欧洲航油储备危机是供应链重构的隐性账单</li>
            <li>大模型：具身智能国际标准立项，中国开始参与定义AI竞争规则</li>
            <li>AI Agent：OpenClaw框架首个亿元级产品落地，AI从工具向"伴随者"迁移</li>
          </ul>
        </div>

        {/* 历史上的今天 */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', color: '#e87a9f', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            📜 历史上的今天
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1997年</span>
              <span style={{ color: '#555' }}>韩国大法院对前总统全斗焕、卢泰愚作出终审判决，以军事叛乱和受贿罪判处无期及17年监禁。</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1989年</span>
              <span style={{ color: '#555' }}>中国台北体操队一行27人抵达北京，参加亚洲青年体操锦标赛，为1949年以来首支到大陆参赛的台湾团队。</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1980年</span>
              <span style={{ color: '#555' }}>国际货币基金组织正式恢复中华人民共和国代表权，标志着中国深度融入战后国际金融体系。</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1934年</span>
              <span style={{ color: '#555' }}>日本外务省情报部长天羽英二发表"天羽声明"，宣称日本在东亚有"特殊责任"，反对第三国援华。</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1917年</span>
              <span style={{ color: '#555' }}>列宁从芬兰回到彼得格勒，在布尔什维克会议上作《四月提纲》报告，提出从资产阶级民主革命过渡到社会主义革命的路线。</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1895年</span>
              <span style={{ color: '#555' }}>李鸿章与伊藤博文在日本马关春帆楼签订《马关条约》，中国割让台湾、澎湖及辽东半岛，赔款白银二亿两。</span>
            </div>
          </div>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-17 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
