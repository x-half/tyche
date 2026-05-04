import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.05.04 · 国际・AI・Agent 日报',
  description: '马斯克法庭承认Grok蒸馏ChatGPT；OpenAI o1急诊诊断超人类医生；苹果内部代码泄露暴露Claude应用',
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
            <h3>马斯克诉OpenAI案第四天：亲口承认Grok蒸馏了ChatGPT</h3>
            <p>4月30日，加州奥克兰联邦法院，马斯克诉OpenAI案进入第四天。OpenAI首席律师William Savitt当庭追问：xAI是否蒸馏了OpenAI的模型？马斯克先是打了个太极，说&quot;所有AI公司都在这么干&quot;，随后被迫承认&quot;部分如此&quot;。这一幕极具讽刺意味——一边起诉OpenAI&quot;背叛非营利使命&quot;的人，亲口承认了另一种&quot;偷&quot;。蒸馏本质上就是让竞争对手的AI当家教，低成本教出一个差不多水平的学生。庭审中，马斯克还被法官 Yvonne Gonzalez Rogers 当场教育：&quot;我不相信有人愿意把人类的未来交到马斯克手中。&quot; 这句话的潜台词远比字面意思锋利。</p>
            <p>来源：<a href="https://36kr.com/p/3791460373929221" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>苹果把Claude.md误打包进官方App，内幕曝光</h3>
            <p>苹果官方Apple Support应用5月1日推送v5.13版本更新，意外夹带了内部使用的Claude.md文件。MacRumors分析师Aaron Perris发现并曝光了这一点。泄露的文件揭示了苹果客服系统的技术骨架：一个AI和人类无缝切换的对话系统，Juno AI负责自动应答，Live Agents负责真人客服接管，两套后端通过Protocol协议层无缝切换。苹果在24小时内紧急撤回，但部分内容已经曝光。早在三个月前，彭博社Mark Gurman就透露&quot;Apple runs on Anthropic at this point&quot;——苹果在自家服务器上跑定制版Claude模型，数据不出基础设施。某种程度上，连苹果都会把不该提交的文件推进生产环境，这意味着什么？</p>
            <p>来源：<a href="https://36kr.com/p/3791662444911617" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>以色列电信基础设施被用于追踪全球10余国公民</h3>
            <p>据加拿大公民实验室（Citizen Lab）近日发布的报告，以色列电信基础设施被用于追踪10余国公民，长达三年。报告揭示了两起独立的追踪行动，均由向各国政府出售监控技术的商业公司运营。其中一起行动利用了以色列的定位技术，通过019Mobile和Partner Communications的网络追踪目标。以色列公司均否认参与。另一项更复杂的行动则与一家瑞士公司有关，该公司在2023年就已接受调查，允许Rayzone等以色列监控公司冒充移动运营商连接SS7网络，从而追踪全球用户。英国监管机构上周已禁止这种做法。这是十多年来调查报道的突破性进展。</p>
            <p>来源：<a href="https://www.haaretz.com/israel-news/security-aviation/2026-05-03/ty-article-magazine/ghost-operators-how-israeli-telecoms-were-exploited-to-track-citizens-worldwide/0000019d-e9c0-dd9a-a79d-ede90a450000" target="_blank">Haaretz</a></p>
          </div>

          <div className="article-sub">
            <h3>Banksy在伦敦放置新雕像：被旗帜遮眼、不知走向悬崖边缘的人</h3>
            <p>本周三清晨，伦敦滑铁卢广场（Waterloo Place）出现了一尊新雕像——一名西装男子，手持被风吹动的旗帜遮住双眼，浑然不知正走向高台的边缘。作品署名Banksy，底座有涂鸦签名，周四Banksy还在Instagram发布视频似乎在确认其参与。这尊雕像用玻璃钢制成，高度与周围爱德华七世、弗洛伦斯·南丁格尔等历史人物雕像相近。伦敦当局已设置安全屏障。艺术评论家Philip Mould评价：&quot;比例完美契合这个空间，当艺术能够引发争议、刺激思考时，这是件好事。&quot; 这是Banksy身份调查发布后不到两个月内创作的新作，再次引发人们对其真实身份的猜测。</p>
            <p>来源：<a href="https://www.smithsonianmag.com/smart-news/attributed-to-banksy-a-new-statue-of-a-suited-man-blinded-by-a-flag-and-walking-off-a-ledge-appeared-in-central-london-180988662/" target="_blank">Smithsonian</a></p>
          </div>

          <div className="article-sub">
            <h3>刚果（金）反政府武装逼近东部重要城市，援助走廊告急</h3>
            <p>得到卢旺达支持的反政府武装（M23运动）近日进入刚果民主共和国东部城市戈马（Goma）周边地区，这是该地区重要的援助枢纽和人道主义走廊。联合国和援助机构正在评估撤离计划。据华尔街日报报道，武装分子已控制部分高速公路，切断了部分补给线。数十万平民被困在交火区。这是2012年以来最严重的安全危机。卢旺达政府否认支持M23，但多份联合国报告和现场证据指向明确。某种程度上，这场危机正在演变成地区性冲突，牵扯安哥拉、乌干达等多个非洲国家。</p>
            <p>来源：<a href="https://www.wsj.com/articles/rwanda-backed-rebels-enter-congo-safe-haven-city-aid-hub-09fdccb8" target="_blank">Wall Street Journal</a></p>
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
            <h3>OpenAI o1在哈佛急诊分诊试验中正确诊断67%患者，超越人类医生</h3>
            <p>哈佛大学附属医院一项新试验显示，OpenAI的o1模型在急诊分诊中正确诊断了67%的患者，而人类急诊分诊医生的准确率只有50-55%。o1能够通过症状描述快速判断病情的紧急程度，并给出初步诊断建议。这不是AI第一次在医疗领域超越人类——但这是在真实急诊环境、真实病例下的盲测结果，不是精心挑选的测试集。某种程度上，这验证了AI在医疗辅助决策中的巨大潜力。当然，AI诊断的法律责任归属、误诊后的保险理赔等问题，目前法律层面还没有答案。</p>
            <p>来源：<a href="https://www.theguardian.com/technology/2026/apr/30/ai-outperforms-doctors-in-harvard-trial-of-emergency-triage-diagnoses" target="_blank">The Guardian</a></p>
          </div>

          <div className="article-sub">
            <h3>苹果官方App误打包Claude.md：内部用Claude Code构建生产级应用坐实</h3>
            <p>Apple Support应用v5.13更新中意外夹带的Claude.md，揭示了苹果内部AI应用的双后端架构——Juno AI做自动应答，Live Agents做人工接管，用户根本不知道对面是AI还是真人。苹果选择Claude而不是Gemini来构建内部开发工具，加上与谷歌在Gemini上的合作，形成了一个有趣的对比：对外合作Gemini，对内依赖Claude。某种程度上，这是对Anthropic技术实力的最强背书。消息传出后，Anthropic的商务团队大概在开香槟。</p>
            <p>来源：<a href="https://36kr.com/p/3791662444911617" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>SK海力士股价涨幅扩大至12%，AI存储芯片需求持续强劲</h3>
            <p>SK海力士股价今日涨幅扩大至12%，成为市场焦点。作为HBM（高带宽存储）芯片的主要供应商，SK海力士直接受益于AI大模型对高性能存储的爆炸式需求。英伟达最新的AI服务器集群需要大量HBM，而SK海力士是其主要供应商之一。某种程度上，HBM的供需格局决定了AI大模型训练成本的下降速度——如果存储跟不上，再强的算力也发挥不出来。</p>
            <p>来源：<a href="https://36kr.com/newsflashes/3794574058363910" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>DeepClaude：用DeepSeek V4 Pro给Claude Code做&quot;家教&quot;，成本降至1/17</h3>
            <p>开发者aattaran在GitHub上发布了DeepClaude项目，将Claude Code与DeepSeek V4 Pro结合，实现了一个agent loop。核心思路是：用更便宜的DeepSeek V4 Pro做初步推理和搜索，Claude Code负责代码生成和执行。简单说，就是让DeepSeek当&quot;助教&quot;，Claude Code当&quot;主讲&quot;。项目声称可以将成本降低17倍，同时保持代码质量。这个项目的出现，某种程度上反映了AI编码工具市场的竞争格局：不是在能力上比拼，而是在性价比上内卷。</p>
            <p>来源：<a href="https://github.com/aattaran/deepclaude" target="_blank">GitHub</a></p>
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
            <h3>&quot;Agentic Coding is a Trap&quot;：AI编程 agent 热潮中的冷思考</h3>
            <p>Hacker News上热转的一篇文章直指AI编程agent的核心问题：AI生成代码的非确定性，导致周围系统复杂度增加；开发者技能退化；供应商锁定；成本不可预测。一个健康的AI编程流程，需要有经验丰富的工程师在架构层面把关——但讽刺的是，AI工具恰恰在削弱人的批判性思维能力。某种程度上，这篇文章揭示了一个根本矛盾：越是依赖AI来弥补能力差距，越是在制造更大的能力差距。开发者变成了&quot;抽拉杆的&quot;，而不是真正理解代码的人。</p>
            <p>来源：<a href="https://larsfaye.com/articles/agentic-coding-is-a-trap" target="_blank">Lars Faye</a></p>
          </div>

          <div className="article-sub">
            <h3>多个开源AI Agent框架更新：Tars、OpenCow、Kagura Story</h3>
            <p>Hacker News显示的开源热榜上，多个AI Agent项目获得关注。Tars是一个自托管的AI agent运行时，支持chat、多sub-agent并行、三层模型路由、后台看门狗和定时任务，单个Go二进制文件实现。OpenCow是一个基于LangChain和LangGraph的轻量级个人AI agent框架。Kagura Story则是一个AI agent的学习和成长日记。这些项目的涌现，说明AI agent的标准化和工程化正在加速——不再是实验品，而是开始进入生产工具序列。</p>
            <p>来源：<a href="https://news.ycombinator.com/" target="_blank">Hacker News</a></p>
          </div>

          <div className="article-sub">
            <h3>Chrome浏览器MCP Agent Connector：浏览器成为AI Agent的控制终端</h3>
            <p>biome-os发布的chrome-extension项目，将Chrome浏览器连接到AI agent编排器，实现浏览器操作的自动化。这意味着AI agent可以直接控制浏览器进行网页操作、数据抓取、表单填写等任务。对于需要大规模浏览器自动化的场景（如市场调研、竞品监控、自动化测试），这是一个值得关注的方向。当然，这也带来了安全风险——如果AI agent可以控制你的浏览器，它能做很多事情。</p>
            <p>来源：<a href="https://github.com/biome-os/chrome-extension" target="_blank">GitHub</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>马斯克诉OpenAI案暴露AI行业&quot;蒸馏&quot;潜规则，Grok被指用ChatGPT训练</li>
            <li>苹果内部代码泄露坐实使用Claude Code，Anthropic获得最强背书</li>
            <li>OpenAI o1在真实急诊环境中超越人类分诊医生，医疗AI加速落地</li>
            <li>DeepClaude将Claude Code与DeepSeek结合，成本降至1/17</li>
            <li>AI编程agent热潮中，有开发者开始反思&quot;抽拉杆&quot;陷阱</li>
          </ul>
        </div>

        {/* 历史上的今天 */}
        <div style={{ marginTop: '24px', padding: '20px', background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', color: '#e87a9f', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            📜 历史上的今天
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1970</span>
              <span style={{ color: '#555' }}>美国国民警卫队在肯特州立大学向抗议入侵柬埔寨的学生开枪，造成4人死亡、9人受伤</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1972</span>
              <span style={{ color: '#555' }}>加拿大环保组织&quot;不要制造波浪委员会&quot;正式更名为&quot;绿色和平基金会&quot;</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1945</span>
              <span style={{ color: '#555' }}>德国国防军在吕讷堡荒原签署投降书，标志着二战欧洲战事结束</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1919</span>
              <span style={{ color: '#555' }}>五四运动：北京学生在天安门广场抗议巴黎和会，将德国在山东权益转让日本</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              <span style={{ color: '#c9996b', fontWeight: 600, flexShrink: 0 }}>1886</span>
              <span style={{ color: '#555' }}>芝加哥干草市场事件：抗议罢工中炸弹爆炸，7名警察和4名平民死亡</span>
            </div>
          </div>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-05-04 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}
