import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.04.29 · 国际・AI・Agent 日报',
  description: '阿联酋宣布退出欧佩克、中东格局生变；大模型价格战持续、小米全面开源万亿模型；Manus收购案遭中国监管拦截。',
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
            <span className="article-date-badge">2026.04.29</span>
            <span className="article-weekday">周三</span>
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
            <h3>阿联酋宣布退出欧佩克，石油地缘格局生变</h3>
            <p>阿联酋政府4月28日正式声明，将于5月1日退出石油输出国组织（欧佩克）。阿联酋是该组织第三大产油国，日均产量约300万桶。这一决定对欧佩克而言是一次实质性打击——该组织已在减产问题上内部分歧加剧，阿联酋的离开意味着组织向心力进一步削弱。</p>
            <p>从背景看，阿联酋近年来一直在能源政策上寻求更大自主权，与沙特等传统主导力量路线差异明显。同时，阿联酋正在大力推进经济多元化，减少对石油的依赖。退出欧佩克后，阿联酋可以更灵活地调整产量和定价策略，抢占市场份额。</p>
            <p>影响层面，国际油价短期内面临波动风险。如果阿联酋选择增产，将直接冲击沙特的减产保价战略。此外，这一变动还将加速全球石油市场"非欧佩克化"趋势，传统产油国联盟的影响力将继续下降。对亚洲买家而言，多了一个独立的供应方，供应链安全性反而可能提升。</p>
            <p>延伸来看，欧佩克的式微并非一夜之间发生。美国页岩油崛起、全球能源转型加速、化石燃料投资情绪转变——这些结构性因素早已在侵蚀这个卡特尔的存在根基。阿联酋的退出，更像是一个已经酝酿多年的结果，而非孤立的政治决策。</p>
            <p>来源：<a href="https://apnews.com" target="_blank">AP News</a>、<a href="https://www.caixin.com" target="_blank">财新</a></p>
          </div>

          <div className="article-sub">
            <h3>美伊谈判陷入僵局，伊朗版和平方案遭特朗普冷遇</h3>
            <p>伊朗政府近日向美方提交了一份包含核问题谈判时间表和地区紧张局势降温方案的"和平方案"。方案核心是：伊朗愿意推迟铀浓缩活动的部分推进，同时要求美国解除部分制裁。作为交换，伊朗提出开放霍尔木兹海峡的航运管控措施，以示诚意。</p>
            <p>然而特朗普政府对这份方案并不买账。美方认为伊朗的诉求仍过于激进，谈判立场缺乏实质让步。伊朗官员则表示，尽管经济制裁重创了该国石油收入和民生，但领导层判断特朗普政府最终会在压力下率先妥协。</p>
            <p>霍尔木兹海峡是全球约五分之一石油运输的咽喉要道。伊朗若真的在这一海峡做动作，将直接冲击全球能源市场，这也是谈判久拖不决的核心风险点。目前双方均在施压，但都在避免走到彻底撕破脸的一步。</p>
            <p>从更宏观的视角看，美伊谈判的走向不仅关乎两国，更直接影响中东权力格局。沙特、以色列、阿联酋等地区国家都在密切关注谈判进展，并据此调整各自的安全和外交策略。美伊关系的任何突破或破裂，都将在该地区引发连锁反应。</p>
            <p>来源：<a href="https://apnews.com" target="_blank">AP News</a>、<a href="https://www.caixin.com" target="_blank">财新</a></p>
          </div>

          <div className="article-sub">
            <h3>乌克兰发生恐怖袭击，枪手随机扫射致6死10余伤</h3>
            <p>乌克兰当地时间4月28日发生一起严重的恐怖袭击事件，不明枪手在公共场所向人群随意开火，造成至少6人死亡、10余人受伤。乌克兰政府已将该事件定性为恐怖袭击，并启动了紧急调查程序。事件具体细节和袭击者身份目前尚未完全披露。</p>
            <p>在俄乌战争持续进入第四年的背景下，乌克兰社会承受着巨大的军事和心理压力。此类随机暴力事件的发生，折射出社会安全防线在长期冲突消耗下的脆弱性。战争不仅在前线作战，也在后方社会的稳定性和公共安全层面持续制造代价。</p>
            <p>对于国际社会而言，乌克兰的这场袭击进一步复杂化了本就严峻的地区安全局势。援助乌克兰的西方国家面临国内厌战情绪上升的压力，而俄罗斯则可能在外交上利用这类事件进行叙事操作。战争机器的惯性，使得任何局部缓和的尝试都变得异常艰难。</p>
            <p>来源：<a href="https://www.caixin.com" target="_blank">财新</a></p>
          </div>

          <div className="article-sub">
            <h3>联合国秘书长角逐揭幕，全球秩序承压之际谁将掌舵</h3>
            <p>联合国现任秘书长的任期即将届满，新一届秘书长的遴选程序已经悄然启动。在国际秩序面临多重压力——地缘冲突加剧、全球治理机制失灵、大国竞争白热化——的背景下，这一职位的角逐备受关注。</p>
            <p>与以往不同，这一次的遴选过程被更多国家视为重塑联合国权威和合法性的关键窗口。传统上，秘书长职位由各大洲轮流出任，但实际人选往往是大国博弈的结果。发展中国家普遍希望新秘书长能在全球发展议题上投入更多资源，而发达国家则更关注维和、人权等传统多边议程。</p>
            <p>值得关注的是，当前联合国在应对气候变化、冲突调解、公共卫生等全球性挑战上的表现备受质疑。秘书长作为联合国最高行政长官，其领导力和外交手腕将直接影响该组织在未来危机中的公信力。在中美博弈加剧的背景下，秘书长需要在两大国之间保持相对中立的立场，同时又要有足够的政治资本推动实质进展。</p>
            <p>来源：<a href="https://www.caixin.com" target="_blank">财新</a></p>
          </div>

          <div className="article-sub">
            <h3>印尼列车相撞致14死84伤，基础设施安全再敲警钟</h3>
            <p>印度尼西亚爪哇岛4月28日发生一起严重的列车相撞事故，造成至少14人死亡、84人受伤，多节车厢在撞击中严重损毁。这已是该地区近两年来的第二起重大铁路安全事故，暴露了印尼铁路系统在安全管理、基础设施维护和运营监管方面的系统性漏洞。</p>
            <p>印尼是东南亚最大的经济体之一，铁路网络覆盖主要岛屿，但整体铁路基础设施老旧、技术标准不统一的问题长期存在。政府在推进现代化铁路建设的同时，对存量线路的安全投入明显不足。</p>
            <p>对于东南亚地区而言，印尼的这次事故具有警示意义。区域内多个国家正在大力推进铁路基建升级，但在追求速度和规模的同时，安全监管体系的同步完善至关重要。一旦重大事故频发，将严重损害公众对铁路交通的信任，影响长期投资意愿。</p>
            <p>来源：<a href="https://www.caixin.com" target="_blank">财新</a></p>
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
            <h3>DeepSeek Token价格被打至"骨折"，大模型价格战持续白热化</h3>
            <p>DeepSeek再次引爆行业价格战。其最新一代模型的Token单价已降至"1分钱不到20万字"级别，将大模型推理成本推向新低。行业分析认为，DeepSeek的激进定价策略正在重新定义大模型商业化的成本基准，倒逼整个行业加速压缩利润空间。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>小米万亿模型全面开源，MIT协议加1M上下文</h3>
            <p>小米宣布将其万亿参数大模型全面开源，采用MIT许可协议，上下文窗口达100万Token。从测试结果看，该模型在多项基准上表现不俗，但与DeepSeek等头部玩家相比仍有差距。开源策略意在构建开发者生态，而非直接竞争商业化最优性能。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>腾讯上调智能体CodeBuddy与WorkBuddy价格</h3>
            <p>腾讯旗下AI编码助手CodeBuddy和企业级智能体WorkBuddy同步上调价格，成为国内大模型厂商中少见的"逆向降价"案例。分析认为，腾讯在达到一定用户规模和调用量后，开始从用户补贴阶段向商业变现阶段过渡。</p>
            <p>来源：<a href="https://www.caixin.com" target="_blank">财新</a>、<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>具身智能人才需求爆发式增长，9所高校获批开设相关专业</h3>
            <p>具身智能（Embodied AI）领域的人才争夺战正在加速。据教育部门最新数据，全国已有9所高校获批开设具身智能相关专业和方向，企业端需求呈现爆发式增长，年薪普遍在50万至150万元区间。人才供给的速度，远跟不上产业扩张的节奏。</p>
            <p>来源：<a href="https://www.caixin.com" target="_blank">财新</a></p>
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
            <h3>Meta收购Manus遭中国监管拦截，"AI主权"概念落地</h3>
            <p>中国发改委正式要求Meta撤销对AI Agent产品Manus的收购案，理由涉及境外并购合规和数据安全审查。这一决定被视为中国在AI领域划定的第一条明确的"监管红线"——涉及中国用户数据和算法主权的跨境交易，即使标的是海外团队，也必须通过国内监管审批。</p>
            <p>这起收购案金额约20亿美元，是AI Agent领域迄今为止最大规模的并购交易。中国的否决意味着该交易已基本告吹，也给全球AI并购的中国监管路径提供了重要参照。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a>、<a href="https://www.caixin.com" target="_blank">财新</a></p>
          </div>

          <div className="article-sub">
            <h3>OpenClaw大版本更新：AI Agent不再是黑箱</h3>
            <p>OpenClaw发布重大版本更新，主打"AI智能体可视化"概念。新版本允许用户实时查看Agent的推理链路、工具调用顺序和中间状态，大幅提升了透明度和可调试性。官方口号"少点神秘"，直指当前AI Agent方案最大的信任痛点。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>AI Agent"删库跑路"事件：Claude背后公司封杀110人</h3>
            <p>一则关于Anthropic封杀110人规模公司的传闻在科技圈热传，事件据称起因是该公司利用Claude开发了自动化"删库跑路"脚本。这条荒诞但真实的技术新闻，折射出AI Agent在自动化权限管理上的深层安全隐患——当Agent拥有过高系统权限时，风险已不亚于人为恶意操作。</p>
            <p>来源：<a href="https://36kr.com" target="_blank">36氪</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>阿联酋退出欧佩克是全球石油权力格局重塑的标志性事件，中东地缘风险上升</li>
            <li>美伊谈判僵局折射出双方都在等待对方先让步，但霍尔木兹海峡的任何异动都将震动全球市场</li>
            <li>大模型价格战已到"自损八百"阶段，开源和降价策略的核心目标是锁定开发者生态</li>
            <li>Manus收购案被否决，意味着中国AI监管已进入"主动干预"阶段，出海并购需重新评估合规路径</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-04-29 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
