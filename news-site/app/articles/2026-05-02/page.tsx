import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📮 2026.05.02 · 国际・AI・Agent 日报',
  description: '美伊局势持续升级，以色列公海扣押活动人士引发多国联合谴责；美军AI扫雷落地霍尔木兹，中国接棒安理会轮值主席',
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
            <span className="article-date-badge">2026.05.02</span>
            <span className="article-weekday">周六</span>
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
            <h3>特朗普称美军对伊朗港口"像海盗一样"实施海上封锁</h3>
            <p>美国总统特朗普5月1日晚在佛罗里达州棕榈滩发表讲话，描述美军扣押伊朗船只事件时表示，美国海军正"像海盗一样"对伊朗港口实施海上封锁。"我们接管了这艘船，我们接管了货物，我们接管了石油。这是一门非常有利可图的生意，"特朗普说，"我们就像海盗。但我们不是在玩游戏。"此前，美军在地中海扣押了一艘据称载有伊朗石油的船只，作为对伊制裁执行的一部分。伊朗方面随即发表强硬声明，革命卫队表示波斯湾区域新的管理模式将在伊朗最高领袖指挥下制定，革命卫队拥有对霍尔木兹海峡近2000公里海岸线的控制权。同日，伊朗外长阿拉格齐与欧盟外交与安全政策高级代表卡拉斯通话，介绍伊朗为结束战争、实现地区和平所采取的最新立场；卡拉斯则强调欧盟支持通过外交途径解决地区冲突。美伊博弈正从关税、制裁升级至海上截获与反截获的实质对抗，欧盟的外交斡旋空间正在快速收窄。</p>
            <p><strong>来源：</strong><a href="https://finance.sina.com.cn/world/2026-05-02/" target="_blank">新浪财经</a></p>
          </div>

          <div className="article-sub">
            <h3>以色列扣押"全球坚韧船队"22艘船175名活动人士，巴西西班牙联合谴责</h3>
            <p>以色列海军在希腊附近海域拦截了"全球坚韧船队"的22艘船只，扣押了175名活动人士，其中包括巴西活动人士蒂亚戈·阿维拉和西班牙籍巴勒斯坦裔活动人士赛义夫·阿布凯谢克。以色列方面声称阿布凯谢克涉嫌与恐怖组织有关，阿维拉涉嫌从事非法活动，但未出示相关证据，并表示将把两人带往以色列问询。巴西和西班牙随即发布联合声明，强烈谴责以色列在公海扣押两国公民的行为，称这构成"绑架"，要求立即释放并保障两人获得领事协助。此前，巴西、土耳其、孟加拉国、哥伦比亚、约旦、利比亚、马来西亚、马尔代夫、毛里塔尼亚、巴基斯坦、南非和西班牙已于4月30日发表联合声明谴责以方行动。这是本轮巴以冲突以来规模最大的海上拦截行动，人道主义物资运输船队遭扣押在国际法层面引发广泛质疑。</p>
            <p><strong>来源：</strong><a href="https://www.thepaper.cn/newsDetail_forward_33091761" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>美军AI扫雷落地霍尔木兹：训练周期从6个月压缩到数日</h3>
            <p>美国海军正与多米诺数据实验室公司合作，通过人工智能技术训练水下无人机在霍尔木兹海峡识别新型水雷。霍尔木兹海峡是全球最繁忙的石油运输通道，也是美伊军事对峙的焦点水域。根据双方合同，多米诺数据实验室的AI系统可将水下无人机的水雷识别训练时间从传统的6个月缩短至数日，大幅提升美军扫雷响应速度。这是美军将AI技术从研发实验室推向战术场景的典型案例，也意味着AI军事化应用正从信息战、情报分析向物理作战支援延伸。相比无人机、巡飞弹等进攻性武器，扫雷AI的对抗性较低，但其背后隐藏的无人潜航器集群控制能力更具战略价值。这场波斯湾的技术军备竞赛正在以AI扫雷为切入口加速。</p>
            <p><strong>来源：</strong><a href="https://www.eastmoney.com" target="_blank">东方财富</a></p>
          </div>

          <div className="article-sub">
            <h3>德国2025年右翼动机暴力事件创2016年以来新高</h3>
            <p>德国联邦刑事警察局发布的2025年统计数据显示，该年收到各州报告的右翼动机暴力犯罪事件达1598起，为2016年以来最高纪录，较2023年的1270起和2024年的1488起持续攀升。2025年大部分右翼动机暴力犯罪涉嫌造成人身伤害。德国典型的政治性动机犯罪包括诋毁国家及国家象征、煽动仇恨、侮辱等行为，相关暴力犯罪涵盖凶杀、人身伤害、扰乱公共秩序及暴力抗拒执法人员等。右翼极端主义暴力事件的持续上升与欧洲整体右倾政治生态形成呼应，在移民、难民政策持续引发社会撕裂的背景下，安全议题正成为德国政治博弈的核心变量。</p>
            <p><strong>来源：</strong><a href="https://www.eastmoney.com" target="_blank">东方财富</a></p>
          </div>

          <div className="article-sub">
            <h3>中国担任安理会5月轮值主席，重启中东斡旋与非洲发展议题</h3>
            <p>中国5月1日开始担任联合国安理会当月轮值主席。中国常驻联合国代表傅聪在记者会上介绍，安理会本月将聚焦三项重点：重振《联合国宪章》权威和联合国作用、推动中东问题政治解决、支持非洲国家稳定发展。在美伊局势骤然升级、联合国安理会面临新一轮压力的背景下，中国接棒轮值主席的时机颇为微妙。伊朗核问题、波斯湾航运安全、巴勒斯坦人道危机等议题都在安理会议程上，中国选择将"重振宪章权威"与"中东政治解决"并置，传递出在大国博弈加剧背景下维护多边主义的信号。非洲议题的加入则延续了 中国在全球南方国家的外交深耕。</p>
            <p><strong>来源：</strong><a href="https://www.eastmoney.com" target="_blank">东方财富</a></p>
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
            <h3>马斯克诉OpenAI案第四天：亲口承认Grok蒸馏了ChatGPT</h3>
            <p>5月30日（sic，本应为4月30日），加州奥克兰联邦法院，马斯克诉OpenAI案进入第四天。现场披露的信息让这场诉讼多了一层讽刺意味——起诉OpenAI"背叛使命"的马斯克，被发现在庭审中承认其旗下Grok模型使用了ChatGPT的输出进行蒸馏训练。消息一出，AI圈哗然。马斯克的诉讼主张与Grok自身的技术路径形成矛盾，"开源"与"闭源"之争、人规模预训练数据合规边界等议题再次被摆上台面。此案后续走向将影响AI行业对训练数据来源披露的规范方式。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/p/3791460373929221" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>追觅发布Nebula NEXT超跑：固体火箭推进器成最大看点</h3>
            <p>追觅科技4月27日在旧金山艺术宫举办"DREAME NEXT"全球发布会，展出了"星空计划"打造的Nebula NEXT红色超跑。最引人关注的并非其电动性能，而是尾部安装的两个固体火箭推进器。追觅从高速吹风机、扫地机器人起家，近年将电机核心技术延伸至汽车领域，但"火箭推进器"的工程可行性引发行业质疑。追觅称这是技术展示而非量产方案，意在强化其"高端技术品牌"的定位。从家电到汽车再到航天概念的整合叙事，追觅的多品类扩张路径在国内科技公司中独树一帜。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/p/3790587098832137" target="_blank">36氪</a></p>
          </div>

          <div className="article-sub">
            <h3>HappyHorse视频生成模型发布：市场反应不及预期</h3>
            <p>4月27日开放测试的HappyHorse视频生成模型遭遇市场冷遇。业内评价普遍认为，其在画质、动作连贯性等方面未能形成明显代际优势，未能达到发布前市场对标Seedance2.0的预期。视频生成赛道近期竞争激烈，OpenAI Sora、Runway、Runway、Pika等持续迭代，留给新玩家的窗口期正在快速收窄。HappyHorse的发布时机和完成度受到市场严格审视，技术积累与产品节奏的错配是AI创业公司常见陷阱。</p>
            <p><strong>来源：</strong><a href="https://36kr.com/p/3791460373929221" target="_blank">36氪</a></p>
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
            <h3>脑机接口创业者十年坚持："意念康复"从论文到产品</h3>
            <p>五一假期前夕，澎湃新闻推出"追光的你"系列报道，讲述脑机接口领域创业者许熙（化名）十年的创业历程。他从神经科学博士论文起步，经历融资困难、技术路线摇摆、市场冷遇，最终将"意念康复"产品落地至国内数十家康复中心。许熙的核心逻辑是：相比侵入式脑机接口的高风险，非侵入式方案加上AI信号解析，在康复场景中具有更快的商业化路径。这个领域的中国故事与马斯克的Neuralink叙事路径截然不同，更强调工程化落地和成本控制，而非技术颠覆。</p>
            <p><strong>来源：</strong><a href="https://www.thepaper.cn/newsDetail_forward_33059642" target="_blank">澎湃新闻</a></p>
          </div>

          <div className="article-sub">
            <h3>"AI幻觉"催生新职业：生成式AI系统测试员需求增长</h3>
            <p>AI系统测试员——或称"生成式人工智能系统测试员"——正成为一个新兴职业方向。央媒近日报道了这一职业的日常工作：通过设计异常场景测试题库，检验大模型面对诱导、逻辑矛盾提问时的安全响应；用自动化脚本进行大规模对抗测试；量化评估模型输出的准确率与偏见风险。传统软件测试的"输入确定、输出确定"逻辑在AI领域不再适用，取而代之的是概率分布与Prompt依赖。行业专家表示，AI系统测试的核心价值在于"守住安全边界，再拓展应用范围"。政策层面，国家网信办等七部门联合发布的《生成式人工智能服务管理暂行办法》已对AI服务的安全合规提出明确要求。</p>
            <p><strong>来源：</strong><a href="https://www.thepaper.cn/newsDetail_forward_33087669" target="_blank">澎湃新闻</a></p>
          </div>
        </section>

        {/* Summary */}
        <div className="summary-block">
          <h2>一句话总结</h2>
          <ul>
            <li>美伊对峙从制裁升级至海上截获与反截获，以色列扣押人道船队激怒多国，中东局势螺旋恶化</li>
            <li>美军AI扫雷技术落地霍尔木兹，军事AI应用正从信息战向物理作战延伸</li>
            <li>马斯克诉OpenAI案戏剧性反转，Grok蒸馏ChatGPT自证矛盾，AI开源边界再掀争议</li>
            <li>脑机接口"意念康复"商业化落地中国，差异化路径与Neuralink叙事形成对比</li>
          </ul>
        </div>

        <footer className="article-footer">
          📮 国际・AI・Agent 日报 · 2026-05-02 · 编发于同日 10:00
        </footer>
      </main>
    </>
  )
}