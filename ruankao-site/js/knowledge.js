const KnowledgeModule = {
    currentSubject: null,
    currentChapter: null,
    subjects: {
        'software-designer': {
            name: '软件设计师',
            icon: '💻',
            description: '软件工程、数据结构、算法设计、面向对象等核心知识',
            chapters: [
                { id: 'sd-1', title: '计算机组成与体系结构', count: 12 },
                { id: 'sd-2', title: '操作系统', count: 10 },
                { id: 'sd-3', title: '数据库系统', count: 15 },
                { id: 'sd-4', title: '计算机网络', count: 8 },
                { id: 'sd-5', title: '数据结构与算法', count: 20 },
                { id: 'sd-6', title: '程序设计语言', count: 10 },
                { id: 'sd-7', title: '软件工程', count: 18 },
                { id: 'sd-8', title: '面向对象技术', count: 14 },
                { id: 'sd-9', title: '系统分析与设计', count: 12 },
                { id: 'sd-10', title: '软件项目管理', count: 8 },
                { id: 'sd-11', title: '软件质量保证', count: 6 },
                { id: 'sd-12', title: '知识产权与标准化', count: 5 }
            ]
        },
        'network-engineer': {
            name: '网络工程师',
            icon: '🌐',
            description: '网络规划、设计、实施和维护，TCP/IP协议栈等',
            chapters: [
                { id: 'ne-1', title: '网络体系结构', count: 10 },
                { id: 'ne-2', title: '物理层', count: 6 },
                { id: 'ne-3', title: '数据链路层', count: 8 },
                { id: 'ne-4', title: '网络层', count: 12 },
                { id: 'ne-5', title: '传输层', count: 8 },
                { id: 'ne-6', title: '应用层', count: 10 },
                { id: 'ne-7', title: '网络安全', count: 12 },
                { id: 'ne-8', title: '网络管理', count: 8 },
                { id: 'ne-9', title: '网络规划与设计', count: 10 },
                { id: 'ne-10', title: '无线网络', count: 6 },
                { id: 'ne-11', title: 'IPv6', count: 6 },
                { id: 'ne-12', title: '网络新技术', count: 4 }
            ]
        },
        'security-engineer': {
            name: '信息安全工程师',
            icon: '🔒',
            description: '网络安全、密码学、安全策略、安全审计等',
            chapters: [
                { id: 'se-1', title: '信息安全基础', count: 8 },
                { id: 'se-2', title: '密码学基础', count: 12 },
                { id: 'se-3', title: '对称密码体制', count: 8 },
                { id: 'se-4', title: '公钥密码体制', count: 8 },
                { id: 'se-5', title: '认证技术', count: 10 },
                { id: 'se-6', title: '访问控制', count: 8 },
                { id: 'se-7', title: '网络安全协议', count: 12 },
                { id: 'se-8', title: '防火墙与入侵检测', count: 10 },
                { id: 'se-9', title: '恶意代码防护', count: 8 },
                { id: 'se-10', title: '安全审计', count: 6 },
                { id: 'se-11', title: '安全管理体系', count: 6 },
                { id: 'se-12', title: '安全工程', count: 4 }
            ]
        },
        'database-engineer': {
            name: '数据库系统工程师',
            icon: '🗄️',
            description: '数据库设计、SQL语言、数据库管理、性能优化等',
            chapters: [
                { id: 'db-1', title: '数据库基础', count: 8 },
                { id: 'db-2', title: '关系数据库', count: 10 },
                { id: 'db-3', title: 'SQL语言', count: 15 },
                { id: 'db-4', title: '数据库设计', count: 12 },
                { id: 'db-5', title: '规范化理论', count: 8 },
                { id: 'db-6', title: '事务处理', count: 10 },
                { id: 'db-7', title: '并发控制', count: 8 },
                { id: 'db-8', title: '数据库恢复', count: 6 },
                { id: 'db-9', title: '数据库安全', count: 8 },
                { id: 'db-10', title: '分布式数据库', count: 6 },
                { id: 'db-11', title: 'NoSQL数据库', count: 6 },
                { id: 'db-12', title: '数据库性能优化', count: 4 }
            ]
        },
        'info-system-manager': {
            name: '信息系统管理工程师',
            icon: '⚙️',
            description: '信息系统运维、IT服务管理、系统管理等',
            chapters: [
                { id: 'im-1', title: '信息系统基础', count: 8 },
                { id: 'im-2', title: '系统规划', count: 6 },
                { id: 'im-3', title: '系统分析', count: 10 },
                { id: 'im-4', title: '系统设计', count: 10 },
                { id: 'im-5', title: '系统实施', count: 8 },
                { id: 'im-6', title: '系统运维', count: 12 },
                { id: 'im-7', title: 'IT服务管理', count: 10 },
                { id: 'im-8', title: '信息安全管理', count: 8 },
                { id: 'im-9', title: '系统可靠性', count: 6 },
                { id: 'im-10', title: '项目管理', count: 8 },
                { id: 'im-11', title: '法律法规', count: 4 },
                { id: 'im-12', title: '新技术应用', count: 4 }
            ]
        }
    },

    renderHomePage() {
        return `
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">知识点学习</h1>
                    <p class="page-desc">系统学习软考中级核心知识，夯实理论基础</p>
                </div>
            </div>
            <div class="container">
                <div class="subjects-grid">
                    ${Object.entries(this.subjects).map(([id, subject]) => {
                        const progress = Storage.getProgress(id);
                        const totalChapters = subject.chapters.length;
                        const completedCount = progress.completedChapters.length;
                        const percentage = Utils.calculatePercentage(completedCount, totalChapters);

                        return `
                            <a href="#/knowledge/${id}" class="subject-card" onclick="KnowledgeModule.selectSubject('${id}')">
                                <div class="subject-icon">${subject.icon}</div>
                                <div class="subject-name">${subject.name}</div>
                                <div class="subject-desc">${subject.description}</div>
                                <div class="progress-bar" style="margin-bottom:12px">
                                    <div class="progress-fill" style="width:${percentage}%"></div>
                                </div>
                                <div class="subject-meta">
                                    <span>${completedCount}/${totalChapters} 章节</span>
                                    <span>${percentage}% 完成</span>
                                </div>
                            </a>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    renderSubjectPage(subjectId) {
        const subject = this.subjects[subjectId];
        if (!subject) return this.renderHomePage();

        this.currentSubject = subjectId;
        const progress = Storage.getProgress(subjectId);

        return `
            <div class="page-header">
                <div class="container">
                    <div class="breadcrumb">
                        <a href="#/knowledge">知识点</a>
                        <span>/</span>
                        <span>${subject.name}</span>
                    </div>
                    <h1 class="page-title">${subject.icon} ${subject.name}</h1>
                    <p class="page-desc">${subject.description}</p>
                </div>
            </div>
            <div class="container">
                <div class="content-layout">
                    <aside class="sidebar">
                        <div class="sidebar-section">
                            <div class="sidebar-title">学习进度</div>
                            <div class="card" style="padding:16px;margin-bottom:16px">
                                <div style="text-align:center;margin-bottom:12px">
                                    <div style="font-size:32px;font-weight:700;color:var(--primary)">
                                        ${progress.completedChapters.length}/${subject.chapters.length}
                                    </div>
                                    <div style="font-size:13px;color:var(--text-muted)">已完成章节</div>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width:${Utils.calculatePercentage(progress.completedChapters.length, subject.chapters.length)}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <div class="sidebar-title">章节目录</div>
                            <nav class="sidebar-nav">
                                ${subject.chapters.map((chapter, index) => `
                                    <a href="#/knowledge/${subjectId}/${chapter.id}"
                                       class="sidebar-link ${this.currentChapter === chapter.id ? 'active' : ''}"
                                       onclick="KnowledgeModule.selectChapter('${chapter.id}')">
                                        <span>${index + 1}. ${chapter.title}</span>
                                        ${progress.completedChapters.includes(chapter.id) ?
                                            '<span class="badge badge-success">✓</span>' :
                                            `<span class="badge">${chapter.count}题</span>`
                                        }
                                    </a>
                                `).join('')}
                            </nav>
                        </div>
                    </aside>
                    <div class="main-content">
                        ${this.currentChapter ?
                            this.renderChapterContent(subjectId, this.currentChapter) :
                            this.renderWelcome(subjectId)
                        }
                    </div>
                </div>
            </div>
        `;
    },

    renderWelcome(subjectId) {
        const subject = this.subjects[subjectId];
        const progress = Storage.getProgress(subjectId);

        return `
            <div class="card">
                <h2 style="font-size:20px;margin-bottom:16px">欢迎学习 ${subject.name}</h2>
                <p style="color:var(--text-secondary);margin-bottom:24px">
                    请从左侧目录选择章节开始学习。完成章节学习后，点击"标记完成"来记录你的学习进度。
                </p>
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
                    <div style="padding:16px;background:var(--bg-secondary);border-radius:var(--radius)">
                        <div style="font-size:24px;font-weight:700;color:var(--primary)">
                            ${subject.chapters.length}
                        </div>
                        <div style="font-size:13px;color:var(--text-muted)">总章节数</div>
                    </div>
                    <div style="padding:16px;background:var(--bg-secondary);border-radius:var(--radius)">
                        <div style="font-size:24px;font-weight:700;color:var(--success)">
                            ${progress.completedChapters.length}
                        </div>
                        <div style="font-size:13px;color:var(--text-muted)">已完成</div>
                    </div>
                </div>
                ${subject.chapters.length > 0 && progress.completedChapters.length < subject.chapters.length ?
                    `<button class="btn btn-primary" style="margin-top:24px"
                             onclick="KnowledgeModule.selectChapter('${subject.chapters[0].id}')">
                        开始学习第一章
                    </button>` :
                    progress.completedChapters.length === subject.chapters.length ?
                    `<div style="margin-top:24px;padding:16px;background:var(--success-light);border-radius:var(--radius)">
                        <div style="font-weight:600;color:var(--success)">🎉 恭喜！你已完成所有章节的学习</div>
                    </div>` : ''
                }
            </div>
        `;
    },

    renderChapterContent(subjectId, chapterId) {
        const subject = this.subjects[subjectId];
        const chapter = subject.chapters.find(c => c.id === chapterId);
        if (!chapter) return this.renderWelcome(subjectId);

        const progress = Storage.getProgress(subjectId);
        const isCompleted = progress.completedChapters.includes(chapterId);
        const chapterIndex = subject.chapters.findIndex(c => c.id === chapterId);
        const prevChapter = subject.chapters[chapterIndex - 1];
        const nextChapter = subject.chapters[chapterIndex + 1];

        return `
            <div class="card knowledge-content">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border)">
                    <h2 style="margin:0;border:none;padding:0">${chapter.title}</h2>
                    <button class="btn ${isCompleted ? 'btn-success' : 'btn-outline'}"
                            onclick="KnowledgeModule.toggleComplete('${subjectId}', '${chapterId}')">
                        ${isCompleted ? '✓ 已完成' : '标记完成'}
                    </button>
                </div>

                ${this.getChapterKnowledge(subjectId, chapterId)}

                <div style="display:flex;justify-content:space-between;margin-top:32px;padding-top:24px;border-top:1px solid var(--border)">
                    ${prevChapter ?
                        `<a href="#/knowledge/${subjectId}/${prevChapter.id}" class="btn btn-ghost"
                            onclick="KnowledgeModule.selectChapter('${prevChapter.id}')">
                            ← ${prevChapter.title}
                        </a>` :
                        '<div></div>'
                    }
                    ${nextChapter ?
                        `<a href="#/knowledge/${subjectId}/${nextChapter.id}" class="btn btn-primary"
                            onclick="KnowledgeModule.selectChapter('${nextChapter.id}')">
                            ${nextChapter.title} →
                        </a>` :
                        '<div></div>'
                    }
                </div>
            </div>
        `;
    },

    getChapterKnowledge(subjectId, chapterId) {
        const knowledgeData = {
            'sd-1': `
                <h3>1.1 计算机系统概述</h3>
                <p>计算机系统由<strong>硬件系统</strong>和<strong>软件系统</strong>两大部分组成。</p>
                <h4>冯·诺依曼体系结构</h4>
                <p>现代计算机普遍采用冯·诺依曼体系结构，其主要特点：</p>
                <ul>
                    <li>采用<strong>存储程序</strong>的工作方式</li>
                    <li>计算机由<strong>运算器、控制器、存储器、输入设备、输出设备</strong>五大部件组成</li>
                    <li>指令和数据以同等地位存储在存储器中，按地址访问</li>
                    <li>指令和数据均用二进制表示</li>
                </ul>
                <blockquote>
                    <strong>考试重点：</strong>冯·诺依曼体系结构的核心概念是"存储程序"，即程序和数据存储在同一个存储器中。
                </blockquote>

                <h3>1.2 CPU结构与工作原理</h3>
                <p>CPU（中央处理器）是计算机的核心部件，主要由以下部分组成：</p>
                <ul>
                    <li><strong>运算器</strong>：执行算术运算和逻辑运算</li>
                    <li><strong>控制器</strong>：指挥协调各部件工作</li>
                    <li><strong>寄存器组</strong>：暂存指令、数据和地址</li>
                    <li><strong>内部总线</strong>：连接各部件</li>
                </ul>
                <h4>CPU主要寄存器</h4>
                <table>
                    <tr><th>寄存器</th><th>功能</th></tr>
                    <tr><td>程序计数器(PC)</td><td>存放下一条指令的地址</td></tr>
                    <tr><td>指令寄存器(IR)</td><td>存放当前正在执行的指令</td></tr>
                    <tr><td>地址寄存器(MAR)</td><td>存放访问内存的地址</td></tr>
                    <tr><td>数据寄存器(MDR)</td><td>存放读写内存的数据</td></tr>
                    <tr><td>累加器(ACC)</td><td>存放运算结果</td></tr>
                </table>

                <h3>1.3 指令系统</h3>
                <p>指令是计算机执行操作的命令，一条指令通常包含：</p>
                <ul>
                    <li><strong>操作码</strong>：指明操作类型</li>
                    <li><strong>地址码</strong>：指明操作数地址</li>
                </ul>
                <h4>寻址方式</h4>
                <ul>
                    <li><strong>立即寻址</strong>：操作数直接在指令中</li>
                    <li><strong>直接寻址</strong>：地址码为操作数的内存地址</li>
                    <li><strong>间接寻址</strong>：地址码为存放操作数地址的内存单元地址</li>
                    <li><strong>寄存器寻址</strong>：操作数在寄存器中</li>
                </ul>

                <h3>1.4 存储系统</h3>
                <p>存储系统采用层次化结构，从上到下速度递减、容量递增：</p>
                <ol>
                    <li><strong>寄存器</strong>：速度最快，容量最小</li>
                    <li><strong>Cache（高速缓存）</strong>：解决CPU与主存速度不匹配问题</li>
                    <li><strong>主存储器</strong>：计算机运行时存放程序和数据</li>
                    <li><strong>辅助存储器</strong>：容量大，可永久保存数据</li>
                </ol>
                <blockquote>
                    <strong>Cache命中率计算：</strong>设Cache命中率为h，Cache访问时间为t1，主存访问时间为t2，则平均访问时间 t = h×t1 + (1-h)×t2
                </blockquote>
            `,
            'sd-2': `
                <h3>2.1 操作系统概述</h3>
                <p>操作系统是管理计算机<strong>硬件资源</strong>和<strong>软件资源</strong>的系统软件，是用户与计算机之间的接口。</p>
                <h4>操作系统功能</h4>
                <ul>
                    <li><strong>处理机管理</strong>：进程调度、同步、通信</li>
                    <li><strong>存储管理</strong>：内存分配、回收、保护</li>
                    <li><strong>设备管理</strong>：I/O设备分配、控制</li>
                    <li><strong>文件管理</strong>：文件存储、检索、保护</li>
                    <li><strong>用户接口</strong>：命令接口、程序接口</li>
                </ul>

                <h3>2.2 进程管理</h3>
                <p>进程是程序的一次执行过程，是系统资源分配和调度的基本单位。</p>
                <h4>进程的状态</h4>
                <ul>
                    <li><strong>就绪状态</strong>：获得除CPU外的所有资源</li>
                    <li><strong>运行状态</strong>：获得CPU正在执行</li>
                    <li><strong>阻塞状态</strong>：等待某个事件发生</li>
                </ul>
                <h4>进程与线程的区别</h4>
                <table>
                    <tr><th>比较项</th><th>进程</th><th>线程</th></tr>
                    <tr><td>资源分配</td><td>是资源分配的基本单位</td><td>是CPU调度的基本单位</td></tr>
                    <tr><td>地址空间</td><td>独立的地址空间</td><td>共享进程的地址空间</td></tr>
                    <tr><td>开销</td><td>创建、切换开销大</td><td>创建、切换开销小</td></tr>
                </table>

                <h3>2.3 进程同步</h3>
                <p>多个并发进程访问共享资源时需要进行同步控制。</p>
                <h4>同步机制</h4>
                <ul>
                    <li><strong>互斥锁（Mutex）</strong>：保证同一时刻只有一个进程访问临界区</li>
                    <li><strong>信号量（Semaphore）</strong>：用于控制多个进程对共享资源的访问</li>
                    <li><strong>管程（Monitor）</strong>：高级同步原语</li>
                </ul>
                <blockquote>
                    <strong>经典同步问题：</strong>生产者-消费者问题、读者-写者问题、哲学家进餐问题
                </blockquote>

                <h3>2.4 存储管理</h3>
                <p>存储管理的主要功能是内存的分配、回收、保护和扩充。</p>
                <h4>常见存储管理方式</h4>
                <ul>
                    <li><strong>分区存储管理</strong>：将内存划分为若干区域</li>
                    <li><strong>页式存储管理</strong>：将程序和内存分为大小相同的页</li>
                    <li><strong>段式存储管理</strong>：按程序逻辑结构分段</li>
                    <li><strong>段页式存储管理</strong>：结合段式和页式优点</li>
                </ul>
                <blockquote>
                    <strong>虚拟存储器：</strong>利用外存扩充内存，实现程序的逻辑地址空间大于物理内存容量。
                </blockquote>
            `,
            'sd-5': `
                <h3>5.1 数据结构概述</h3>
                <p>数据结构是相互之间存在一种或多种特定关系的数据元素的集合。</p>
                <h4>逻辑结构</h4>
                <ul>
                    <li><strong>集合</strong>：数据元素之间没有关系</li>
                    <li><strong>线性结构</strong>：一对一关系（线性表、栈、队列）</li>
                    <li><strong>树形结构</strong>：一对多关系（二叉树、B树）</li>
                    <li><strong>图状结构</strong>：多对多关系</li>
                </ul>

                <h3>5.2 线性表</h3>
                <p>线性表是最基本的数据结构，具有唯一的"第一个"和"最后一个"元素。</p>
                <h4>顺序存储（数组）</h4>
                <ul>
                    <li>优点：随机访问，时间复杂度O(1)</li>
                    <li>缺点：插入删除需要移动元素，时间复杂度O(n)</li>
                </ul>
                <h4>链式存储（链表）</h4>
                <ul>
                    <li>优点：插入删除只需修改指针，时间复杂度O(1)</li>
                    <li>缺点：不能随机访问，需要顺序查找</li>
                </ul>

                <h3>5.3 栈和队列</h3>
                <h4>栈（LIFO）</h4>
                <p>后进先出的线性表，只允许在栈顶进行插入和删除。</p>
                <ul>
                    <li>push：入栈操作</li>
                    <li>pop：出栈操作</li>
                    <li>应用：表达式求值、递归实现、括号匹配</li>
                </ul>
                <h4>队列（FIFO）</h4>
                <p>先进先出的线性表，在队尾插入，队头删除。</p>
                <ul>
                    <li>enqueue：入队操作</li>
                    <li>dequeue：出队操作</li>
                    <li>应用：操作系统任务调度、打印任务队列</li>
                </ul>

                <h3>5.4 树与二叉树</h3>
                <h4>二叉树的性质</h4>
                <ol>
                    <li>第i层最多有 2<sup>i-1</sup> 个结点</li>
                    <li>深度为k的二叉树最多有 2<sup>k</sup>-1 个结点</li>
                    <li>叶子结点数 n<sub>0</sub> = 度为2的结点数 n<sub>2</sub> + 1</li>
                </ol>
                <h4>遍历方式</h4>
                <ul>
                    <li><strong>前序遍历</strong>：根-左-右</li>
                    <li><strong>中序遍历</strong>：左-根-右</li>
                    <li><strong>后序遍历</strong>：左-右-根</li>
                    <li><strong>层次遍历</strong>：逐层从左到右</li>
                </ul>

                <h3>5.5 排序算法</h3>
                <table>
                    <tr><th>算法</th><th>平均时间</th><th>最坏时间</th><th>空间</th><th>稳定性</th></tr>
                    <tr><td>冒泡排序</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>稳定</td></tr>
                    <tr><td>选择排序</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>不稳定</td></tr>
                    <tr><td>插入排序</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>稳定</td></tr>
                    <tr><td>快速排序</td><td>O(nlogn)</td><td>O(n²)</td><td>O(logn)</td><td>不稳定</td></tr>
                    <tr><td>归并排序</td><td>O(nlogn)</td><td>O(nlogn)</td><td>O(n)</td><td>稳定</td></tr>
                    <tr><td>堆排序</td><td>O(nlogn)</td><td>O(nlogn)</td><td>O(1)</td><td>不稳定</td></tr>
                </table>
            `
        };

        return knowledgeData[chapterId] || `
            <div style="padding:40px;text-align:center;color:var(--text-muted)">
                <p>本章节内容正在整理中，敬请期待...</p>
            </div>
        `;
    },

    selectSubject(subjectId) {
        this.currentSubject = subjectId;
        this.currentChapter = null;
    },

    selectChapter(chapterId) {
        this.currentChapter = chapterId;
        App.render();
        // 滚动到内容区域
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    toggleComplete(subjectId, chapterId) {
        const progress = Storage.getProgress(subjectId);
        const index = progress.completedChapters.indexOf(chapterId);

        if (index >= 0) {
            progress.completedChapters.splice(index, 1);
        } else {
            progress.completedChapters.push(chapterId);
        }

        Storage.setProgress(subjectId, progress);
        App.render();
        Utils.showToast(index >= 0 ? '已取消完成标记' : '章节已标记为完成', 'success');
    }
};
