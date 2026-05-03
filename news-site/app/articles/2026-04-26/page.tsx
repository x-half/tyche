import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.26 · 国际・AI・Agent 日报',
  description: '美伊谈判破裂叫停巴方行程，以色列空袭黎巴嫩再破停火；GPT-5.5与DeepSeek-V4同日登场，Alphabet将向Anthropic注资400亿美元。',
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
            <span className="article-date-badge">2026.04.26</span>
            <span className="article-weekday">周日</span>
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
            <h3>特朗普临时叫停巴国行程，美伊谈判"文件战"陷入僵局</h3>
            <p>4月25日原本计划赴巴基斯坦的美方特使史蒂夫·威特科夫与贾里德·库什纳，在最后一刻被特朗普叫停。特朗普在佛罗里达登上&quot;空军一号&quot;前对媒体表示，伊朗递来的&quot;文件不够好&quot;，但随后他又透露，取消行程后不到10分钟，伊朗方面就提交了一份&quot;好得多的文件&quot;。伊朗外长阿巴斯·阿拉格希随后访问阿曼，并表示这是美以&quot;侵略行动&quot;后首次访问该地区。巴基斯坦总理夏巴兹·谢里夫则与伊朗总统佩扎什基安通了50分钟电话，讨论地区局势。伊朗坚持要求解除制裁并获得和平保障，美方的底线则是伊朗必须放弃核计划——双方核心立场仍未靠近。</p>
            <p>延伸来看，这场&quot;文件拉锯&quot;背后是双方都不愿先让步的结构性僵局。伊朗通过巴基斯坦等第三方渠道传递信息，美方则保留了随时重新施压的筹码。中东地缘风险的实质并未改变。</p>
            <p className="source-ref">来源：<a href="https://www.cbsnews.com/live-updates/us-iran-war-trump-strait-of-hormuz-hezbollah-lebanon-israel-ceasefire/" target="_blank" rel="noopener">CBS News</a>，2026年4月25日</p>
          </div>

          <div className="article-sub">
            <h3>以色列恢复对黎巴嫩空袭，停火协议再受冲击</h3>
            <p>4月25日，以色列对黎巴嫩南部发动多轮空袭，造成至少6人死亡。黎巴嫩卫生部证实，纳巴提耶省的一辆卡车和一辆摩托车遭袭，4人遇难；随后在宾特杰贝伊勒地区又有2人死亡、17人受伤。以色列军方称，空袭击毙了多名真主党武装人员，其中包括一辆载满武器的车辆上的3人。以色列总理内塔尼亚胡已下令军队&quot;强力打击&quot;真主党目标。在此之前，美方刚刚宣布将黎以停火协议延长三周。</p>
            <p>这次空袭的时机值得注意——恰在停火延长期生效后不久。以色列方面认定真主党违反了停火条款，而真主党方面则宣称对以色列军用车辆发动了报复性袭击。中东短暂的窗口期正在以肉眼可见的速度收窄。</p>
            <p className="source-ref">来源：<a href="https://www.cbsnews.com/live-updates/us-iran-war-trump-strait-of-hormuz-hezbollah-lebanon-israel-ceasefire/" target="_blank" rel="noopener">CBS News</a>，2026年4月25日</p>
          </div>

          <div className="article-sub">
            <h3>美军直升机拦截伊朗影子油轮，扣押行动首次公开</h3>
            <p>4月25日，美军中央司令部宣布，一艘悬挂巴拿马旗帜的商船&quot;塞凡号&quot;（M/V Sevan）在阿拉伯海被美军直升机拦截。该船属于美国财政部最新制裁名单中的19艘&quot;影子舰队&quot;之一，该舰队通过欺骗性手段为受制裁国家运输石油。&quot;塞凡号&quot;由马绍尔群岛一家公司运营，曾在2025年8月至11月间向孟加拉国运送约75万桶伊朗丙烷和丁烷。目前该船在美军押解下掉头返回伊朗。</p>
            <p>这是美国首次公开披露对影子舰队船只的扣押行动，信号意义明显：制裁执行正在从纸面走向实际行动。对全球能源市场而言，油轮被押解这一具体事件本身影响有限，但它传递的是一种方向——伊朗的出口渠道正在被系统性地封堵。</p>
            <p className="source-ref">来源：<a href="https://www.cbsnews.com/live-updates/us-iran-war-trump-strait-of-hormuz-hezbollah-lebanon-israel-ceasefire/" target="_blank" rel="noopener">CBS News</a>，2026年4月25日</p>
          </div>

          <div className="article-sub">
            <h3>伊朗外长访阿曼推进外交，中东各国穿梭斡旋</h3>
            <p>4月25日，伊朗外长阿拉格希在结束与巴基斯坦官员的会晤后，前往阿曼进行正式访问。伊朗官方通讯社IRNA称，阿拉格希此次行程旨在向巴基斯坦传达伊朗关于&quot;全面结束战争、实现和平&quot;的立场。部分伊朗代表团成员已返回德黑兰进行&quot;进一步磋商&quot;，预计周日晚上重新与阿拉格希在伊斯兰堡会合。阿曼长期以来在波斯湾地区扮演调解角色，此次访问被伊朗媒体描述为&quot;美以侵略后首次地区访问&quot;。</p>
            <p>阿曼的介入让局势多了一层外交缓冲，但目前尚未看到明确的突破路径。各方都在试探彼此的底线，真正的谈判窗口还没有打开。</p>
            <p className="source-ref">来源：<a href="https://www.cbsnews.com/live-updates/us-iran-war-trump-strait-of-hormuz-hezbollah-lebanon-israel-ceasefire/" target="_blank" rel="noopener">CBS News</a>，2026年4月25日</p>
          </div>

          <div className="article-sub">
            <h3>以色列-真主党停火协议延长三周，脆弱平衡再度维系</h3>
            <p>在美国斡旋下，以色列与真主党的停火协议被延长三周。然而协议刚延不久，以色列就以&quot;违反停火条款&quot;为由重启空袭。真主党则实施了报复性打击。尽管双方目前仍维持着名义上的停火框架，但信任已严重侵蚀。每一次交火都可能成为下一轮升级的起点。</p>
            <p>这种&quot;边打边谈&quot;的模式在中东并不陌生，但每次重复都会让下一次和谈的难度变得更高。延长期给了外交窗口，但窗口本身也在不断收窄。</p>
            <p className="source-ref">来源：<a href="https://www.cbsnews.com/live-updates/us-iran-war-trump-strait-of-hormuz-hezbollah-lebanon-israel-ceasefire/" target="_blank" rel="noopener">CBS News</a>，2026年4月25日</p>
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
            <h3>DeepSeek正式发布V4系列：万亿参数开源，百万token上下文</h3>
            <p>4月24日，DeepSeek正式开源V4模型系列，包含V4-Pro（1.6万亿参数）和V4-Flash（2840亿参数）两个MoE变体，两者均支持100万token上下文窗口。V4-Pro在代理编码和STEM基准测试中自称开源最强。DSA稀疏注意力架构和混合注意力机制是实现长上下文效率提升的关键。该系列已在MIT许可下通过API和Hugging Face提供。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/835522837790986240" target="_blank" rel="noopener">aibars.net</a>，2026年4月24日</p>
          </div>

          <div className="article-sub">
            <h3>GPT-5.5登场：面向自主计算的新一代旗舰模型</h3>
            <p>4月23日，OpenAI发布GPT-5.5并向付费订阅用户推送。该模型在智能体编程、自主计算机使用和科学研究工作流方面取得显著进展，人工干预需求大幅减少。API接口预计在网络安全审查完成后开放。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/835519758437847040" target="_blank" rel="noopener">aibars.net</a>，2026年4月24日</p>
          </div>

          <div className="article-sub">
            <h3>Alphabet宣布向Anthropic投资400亿美元</h3>
            <p>谷歌母公司Alphabet宣布将向Anthropic投资高达400亿美元，使该公司估值达到3500亿美元。交易包括100亿美元前期现金，另有300亿美元与业绩里程碑挂钩，外加5吉瓦谷歌云算力。此轮投资正值Anthropic年化收入突破300亿美元（2026年4月），主要驱动力来自Claude Code的成功。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/835803599035568128" target="_blank" rel="noopener">aibars.net</a>，2026年4月25日</p>
          </div>

          <div className="article-sub">
            <h3>英特尔股价单日飙升24%，创1987年以来最佳表现</h3>
            <p>4月24日，英特尔股价暴涨24%，此前该公司公布第一季度营收135.8亿美元，连续第六次超出预期。AI推理和智能体工作负载正在推动至强6服务器CPU需求爆炸性增长，CPU与GPU比例从1:8收紧至1:1，供应紧张正在重塑半导体经济。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/835816773403152384" target="_blank" rel="noopener">aibars.net</a>，2026年4月25日</p>
          </div>

          <div className="article-sub">
            <h3>SK海力士季度营收首破350亿美元，AI内存需求打破季节性规律</h3>
            <p>2026年第一季度，SK海力士营业利润同比增长五倍至37.6万亿韩元（约254亿美元），季度营收首次突破350亿美元。AI服务器用高带宽内存（HBM）是主要增长引擎，HBM年营收同比增长超过200%。传统DRAM和NAND闪存价格因供应紧张也大幅上涨。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/835180766815195136" target="_blank" rel="noopener">aibars.net</a>，2026年4月23日</p>
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
            <h3>Claude Code强劲表现推动Anthropic年化收入突破300亿美元</h3>
            <p>Anthropic的AI编程工具Claude Code成为公司增长核心引擎，推动年化收入于2026年4月突破300亿美元。Alphabet随即将向Anthropic投资400亿美元。这表明AI Agent类产品已在企业市场实现规模化变现。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/835803599035568128" target="_blank" rel="noopener">aibars.net</a>，2026年4月25日</p>
          </div>

          <div className="article-sub">
            <h3>Meta与亚马逊签署数十亿美元协议：Graviton5芯片赋能具身智能</h3>
            <p>Meta与亚马逊签署多年期协议，将部署数千万个AWS Graviton5 ARM CPU核心，用于具身智能AI工作负载，包括实时推理、代码生成和多步骤任务编排。Meta由此成为全球最大Graviton客户之一，这是ARM架构芯片在AI基础设施领域又一次重要突破。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/836168336755789824" target="_blank" rel="noopener">aibars.net</a>，2026年4月26日</p>
          </div>

          <div className="article-sub">
            <h3>Cerebras Systems再次冲击华尔街IPO，晶圆级AI芯片受关注</h3>
            <p>Cerebras Systems已重新提交在纳斯达克上市的申请，计划2026年第二季度上市。该公司以1.4万亿晶体管的晶圆级引擎3处理器闻名，2025年营收5.1亿美元，净利润8790万美元。此次为第二次冲击华尔街，估值230亿美元。</p>
            <p className="source-ref">来源：<a href="https://www.aibars.net/zh/library/ai-news/details/833796600647258112" target="_blank" rel="noopener">aibars.net</a>，2026年4月19日</p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>国际：中东局势&quot;边打边谈&quot;，美伊谈判陷入文件拉锯，以色列对黎巴嫩停火协议发起新挑战</li>
            <li>大模型：DeepSeek-V4与GPT-5.5同日发布，Alphabet向Anthropic豪掷400亿美元</li>
            <li>AI Agent：Claude Code强劲变现能力推动Anthropic收入井喷，Meta押注ARM架构具身智能</li>
          </ul>
        </div>

        {/* 历史上的今天 */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', color: '#e87a9f', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            📜 历史上的今天
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>2017</span>
              <span style={{ color: '#555' }}>中国首艘国产航母在大连正式下水，中国自主设计建造的第一艘航空母舰</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1986</span>
              <span style={{ color: '#555' }}>苏联乌克兰共和国普里皮亚季市，切尔诺贝利核电站4号反应堆爆炸，人类和平利用核能史上最严重的事故</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1970</span>
              <span style={{ color: '#555' }}>《建立世界知识产权组织公约》正式生效，4月26日后来被定为&quot;世界知识产权日&quot;</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1964</span>
              <span style={{ color: '#555' }}>中国与坦桑尼亚联合共和国建立外交关系</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1917</span>
              <span style={{ color: '#555' }}>世界知名建筑大师贝聿铭诞生</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1911</span>
              <span style={{ color: '#555' }}>清华大学前身清华学堂正式建校</span>
            </div>
          </div>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-26 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
