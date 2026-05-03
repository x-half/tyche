import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.27 · 国际・AI・Agent 日报',
  description: '三星工人集会求加薪、英政府力挺BBC抗特朗普诉讼；中国电力设备出口激增26%，AI基础设施潮推动出口订单井喷。',
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
            <span className="article-date-badge">2026.04.27</span>
            <span className="article-weekday">周一</span>
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
            <h3>三星工人聚集逼宫，要求提高奖金并威胁罢工</h3>
            <p>数千名三星电子工人在韩国平泽芯片工厂综合体集会，要求提高奖金，并威胁若诉求未获回应将发动罢工。组织方声称参与人数达数千，工人诉求主要指向近年来薪资增长停滞与公司利润持续攀升之间的落差。三星作为全球最大存储芯片制造商，此次劳工行动发生在芯片行业景气回升的关键节点，一旦真的罢工，全球存储芯片供应链将面临新一轮不确定性。韩国劳动法传统上对罢工权限制较严，但工会近年来逐渐活跃。</p>
            <p>这不只是三星一家的事。韩国半导体工人群体的集体行动，折射出整个行业在AI驱动需求爆发背景下的劳资博弈新常态。</p>
            <p className="source-ref">来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>，2026年4月</p>
          </div>

          <div className="article-sub">
            <h3>英政府力挺BBC，抗衡特朗普诉讼威胁</h3>
            <p>英国政府周二为BBC公开辩护，以对抗特朗普就2020年总统选举失败演讲被编辑处理一事发出的诉讼威胁。特朗普此前指控BBC在播出的演讲中故意删减对其不利内容，BBC方面坚持编辑操作符合编辑标准，政府则强调BBC的编辑独立性不容政治干预。这起纠纷发生在英美关系本就承压的背景下——特朗普第二任期对英国表现出明显冷落，卡梅伦政府在国际舞台上的腾挪空间日益逼仄。</p>
            <p>BBC作为全球最具影响力的英语媒体，其编辑独立性是英国软实力的核心组成。此事如何收场，将是观察英美"特殊关系"真实温度的一个重要切面。</p>
            <p className="source-ref">来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>，2026年4月</p>
          </div>

          <div className="article-sub">
            <h3>马里燃油封锁下的民间自救：巨偶巡演带来喘息</h3>
            <p>在马里政府军与分裂武装围绕燃油运输的博弈持续之际，巴马科的街头出现了巨型木偶巡演——这个名为民间艺术复兴计划的项目，用传统偶戏为困顿中的城市注入一丝喘息。巴马科居民在燃油短缺的阴霾下已煎熬数周，医院、公交系统陆续受到影响，物资配送几近瘫痪。国际人道主义组织虽有所介入，但受制于安全局势，援助效率大打折扣。</p>
            <p>偶戏不能当饭吃，但它在这个特殊时刻承载了某种集体心理修复的功能。文化在极端压力下，有时比援助物资更能持久。</p>
            <p className="source-ref">来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>，2026年4月</p>
          </div>

          <div className="article-sub">
            <h3>加拿大失去麻疹消除地位，疫情持续成诱因</h3>
            <p>世界卫生组织正式宣布加拿大失去麻疹消除地位，这在该国公共卫生史上属罕见事件。消除地位认定要求特定时间内无持续传播链，而加拿大近月持续报告的本地感染病例已超出认定阈值。麻疹本属疫苗可预防疾病此次失守，与部分社区接种率下滑直接相关。公卫专家担忧，取消消除地位将引发连锁反应——跨境旅行限制、其他国家对加拿大人入境的防疫要求均可能升级。</p>
            <p>反疫苗情绪在全球的渗透，让一些早已被控制的传染病有了回潮的土壤。这个趋势值得关注，因为它不只是加拿大一国的问题。</p>
            <p className="source-ref">来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>，2026年4月</p>
          </div>

          <div className="article-sub">
            <h3>波斯湾船员被困数周，能源通道危机传导至人身</h3>
            <p>因美伊冲突导致霍尔木兹海峡航运受阻，大批船员已在波斯湾海域被困数周，物资与心理压力双线告急。国际航运工会已发出紧急呼吁，敦促各方保障船员基本权益。霍尔木兹海峡承担全球约五分之一石油运输，美伊开战后该通道的实际通行效率大幅下降，影子油轮被扣押更是加剧了恐慌情绪。</p>
            <p>战争的经济账，最终会分摊到每一个具体的人身上——不只是阵亡士兵，也包括这些被困海域、无力回家的普通船员。</p>
            <p className="source-ref">来源：<a href="https://apnews.com" target="_blank" rel="noopener">AP News</a>，2026年4月</p>
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
            <h3>DeepSeek-V4成OpenClaw默认模型</h3>
            <p>DeepSeek-V4已正式取代前期版本，成为OpenClaw平台的默认模型。这一切换在AI圈引发了不少讨论——DeepSeek一直以高性价比和开源策略著称，此次默认化意味着更多用户将直接体验其多模态与长上下文能力。对于国内开发者而言，这同时也是一个明确的信号：国产模型已进入"能用、耐用"的实用阶段。</p>
            <p className="source-ref">来源：<a href="https://36kr.com" target="_blank" rel="noopener">36氪</a>，2026年4月26日</p>
          </div>

          <div className="article-sub">
            <h3>Alphabet被曝拟向Anthropic追加400亿美元投资</h3>
            <p>据多个渠道证实，Alphabet正在推进向Anthropic的新一轮注资，规模或达400亿美元。这将是科技巨头对AI实验室有史以来最大的单笔资金支持之一。Anthropic旗下Claude系列模型在企业市场表现强劲，其安全性定位与Google的企业客户网络形成高度协同。这笔资金若落地，将直接改变大模型竞争格局的基础设施维度。</p>
            <p className="source-ref">来源：<a href="https://36kr.com" target="_blank" rel="noopener">36氪</a>，2026年4月</p>
          </div>

          <div className="article-sub">
            <h3>中国电力设备出口跃升26%，AI基础设施潮是主驱</h3>
            <p>财新数据显示，2026年一季度中国电力设备出口同比大增26%，新兴市场国家在电网基础设施上的投入是核心拉动因素。全球数据中心建设井喷，对稳定电力供应的需求传导至变压器、开关设备等上游品类。中国厂商凭借性价比与交付能力，在东南亚、中东、非洲连续拿下订单。但部分发达国家市场仍存在准入壁垒。</p>
            <p className="source-ref">来源：<a href="https://www.caixin.com" target="_blank" rel="noopener">财新</a>，2026年4月27日</p>
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
            <h3>OpenAI手机曝光：2028年量产</h3>
            <p>36氪获悉，OpenAI正在推进自研AI手机项目，计划2028年实现量产。该设备预计将深度集成Agent能力，实现端侧模型与云端服务的无缝切换。目前产品形态尚未最终确定，但消息人士透露其将搭载定制AI芯片，主打"随时在线的智能助手"概念。软硬件一体化趋势在AI终端赛道越来越清晰。</p>
            <p className="source-ref">来源：<a href="https://36kr.com" target="_blank" rel="noopener">36氪</a>，2026年4月</p>
          </div>

          <div className="article-sub">
            <h3>曹操出行发布无方向盘Robotaxi商业方案</h3>
            <p>曹操出行正式发布首款无方向盘Robotaxi从技术到商业的完整答案。该方案实现了L4级自动驾驶的量产适配，并公布了初步的定价模型与运营城市计划。此举意味着国内出行平台正式加入Robotaxi的商业化竞争，与萝卜快跑、小马智行形成三角格局。安全员移除后的成本结构优化，是这场竞争的核心。</p>
            <p className="source-ref">来源：<a href="https://36kr.com" target="_blank" rel="noopener">36氪</a>，2026年4月</p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>国际：波斯湾困局正在从抽象的地缘博弈，落地为具体的人道危机；三星工人集会是大供应链脆弱性的一个新注脚</li>
            <li>大模型：国产模型实用化提速，Alphabet对Anthropic的巨额注资将重塑竞争格局的基础设施维度</li>
            <li>AI Agent：OpenAI自研AI手机曝光，Robotaxi商业化正式拉开竞争大幕</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026.04.27 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
