const ExamPapersModule = {
    currentSubject: null,
    currentPaper: null,
    currentQuestionIndex: 0,
    answers: {},
    showResults: false,
    flagged: {},

    subjects: {
        'software-designer': { name: '软件设计师', icon: '💻' },
        'network-engineer': { name: '网络工程师', icon: '🌐' },
        'security-engineer': { name: '信息安全工程师', icon: '🔒' },
        'database-engineer': { name: '数据库系统工程师', icon: '🗄️' },
        'info-system-manager': { name: '信息系统管理工程师', icon: '⚙️' }
    },

    mockPapers: null,

    init() {
        if (!this.mockPapers) {
            this.mockPapers = this.generateAllPapers();
        }
    },

    getRealQuestions(subjectId) {
        if (typeof RealQuestions !== 'undefined' && RealQuestions[subjectId]) {
            return RealQuestions[subjectId];
        }
        return [];
    },

    generateMockQuestions(subjectId, year, session) {
        const realQuestions = this.getRealQuestions(subjectId);
        if (realQuestions.length > 0) {
            const filtered = realQuestions.filter(q => q.year === year && q.session === session);
            if (filtered.length > 0) return filtered;
        }

        const bank = {
            'software-designer': [
                { text: '在CPU中用于跟踪指令地址的寄存器是（）。', options: ['地址寄存器(MAR)', '程序计数器(PC)', '数据寄存器(MDR)', '指令寄存器(IR)'], answer: 'B' },
                { text: '以下关于Cache的叙述中，正确的是（）。', options: ['Cache的容量通常大于主存', 'Cache的访问速度与CPU相同', 'Cache的内容是主存部分内容的副本', 'Cache可以永久保存数据'], answer: 'C' },
                { text: '在数据库中，关系R和S进行自然连接后，结果关系的属性数（）。', options: ['等于R和S的属性数之和', '小于R和S的属性数之和', '大于R和S的属性数之和', '不确定'], answer: 'B' },
                { text: '面向对象中，（）是指子类可以自动拥有父类的属性和方法。', options: ['封装', '继承', '多态', '抽象'], answer: 'B' },
                { text: '以下排序算法中，（）是不稳定的排序算法。', options: ['冒泡排序', '插入排序', '快速排序', '归并排序'], answer: 'C' }
            ],
            'network-engineer': [
                { text: 'OSI参考模型中，负责路由选择的是（）。', options: ['物理层', '数据链路层', '网络层', '传输层'], answer: 'C' },
                { text: '以太网帧的最大长度是（）字节。', options: ['64', '512', '1500', '1518'], answer: 'D' },
                { text: 'TCP建立连接需要（）次握手。', options: ['1', '2', '3', '4'], answer: 'C' },
                { text: 'IP地址192.168.1.0/26可以划分出（）个可用主机地址。', options: ['30', '62', '64', '126'], answer: 'B' },
                { text: '以下协议中，使用UDP作为传输层协议的是（）。', options: ['HTTP', 'FTP', 'DNS', 'SMTP'], answer: 'C' }
            ],
            'security-engineer': [
                { text: '以下加密算法中，属于对称加密算法的是（）。', options: ['RSA', 'AES', 'ECC', 'DSA'], answer: 'B' },
                { text: '数字签名的主要功能是（）。', options: ['保密性', '完整性', '不可否认性', '可用性'], answer: 'C' },
                { text: '信息安全的基本要素不包括（）。', options: ['机密性', '完整性', '可用性', '可追溯性'], answer: 'D' },
                { text: 'SSL/TLS协议位于TCP/IP模型的（）。', options: ['网络接口层', '网络层', '传输层', '应用层和传输层之间'], answer: 'D' },
                { text: 'PKI中，负责签发数字证书的是（）。', options: ['RA', 'CA', 'CRL', 'KMC'], answer: 'B' }
            ],
            'database-engineer': [
                { text: '关系数据库中，关系的每个分量必须是不可分的数据项，这属于（）。', options: ['第一范式', '第二范式', '第三范式', 'BC范式'], answer: 'A' },
                { text: 'SQL语句中，用于修改表结构的命令是（）。', options: ['UPDATE', 'ALTER', 'MODIFY', 'CHANGE'], answer: 'B' },
                { text: '事务的ACID特性中，（）是指数据库从一个一致性状态变到另一个一致性状态。', options: ['原子性', '一致性', '隔离性', '持久性'], answer: 'B' },
                { text: '在并发控制中，两阶段封锁协议可以保证（）。', options: ['不会发生死锁', '可串行化', '不会发生级联回滚', '以上都是'], answer: 'B' },
                { text: 'NoSQL数据库的特点不包括（）。', options: ['高可扩展性', '灵活的数据模型', '严格的ACID支持', '高性能'], answer: 'C' }
            ],
            'info-system-manager': [
                { text: '信息系统的生命周期包括（）阶段。', options: ['规划、分析、设计、实施、运维', '需求、设计、编码、测试', '启动、计划、执行、收尾', '以上都不是'], answer: 'A' },
                { text: 'ITIL是（）。', options: ['一种编程语言', '一套最佳实践框架', '一种数据库', '一种操作系统'], answer: 'B' },
                { text: '在项目管理中，（）图用于显示任务的依赖关系。', options: ['甘特图', '网络图', '直方图', '饼图'], answer: 'B' },
                { text: '在软件维护中，（）维护是为了增加新功能。', options: ['纠错性', '适应性', '完善性', '预防性'], answer: 'C' },
                { text: '在IT服务管理中，事件管理和问题管理的区别是（）。', options: ['事件管理关注根因，问题管理关注恢复', '事件管理关注恢复，问题管理关注根因', '两者没有区别', '以上都不是'], answer: 'B' }
            ]
        };

        const questions = bank[subjectId] || [];
        return questions.map((q, i) => ({
            id: `${subjectId}-${year}-${session}-q${i + 1}`,
            ...q,
            year, session
        }));
    },

    generateAllPapers() {
        const papers = {};
        Object.keys(this.subjects).forEach(subjectId => {
            papers[subjectId] = [
                { id: `${subjectId}-2025-上半年`, year: 2025, session: '上半年', title: '2025年上半年' },
                { id: `${subjectId}-2024-下半年`, year: 2024, session: '下半年', title: '2024年下半年' },
                { id: `${subjectId}-2024-上半年`, year: 2024, session: '上半年', title: '2024年上半年' },
                { id: `${subjectId}-2023-下半年`, year: 2023, session: '下半年', title: '2023年下半年' },
                { id: `${subjectId}-2023-上半年`, year: 2023, session: '上半年', title: '2023年上半年' }
            ];
        });
        
        // 软件设计师添加2020年真题
        if (this.getRealQuestions('software-designer').length > 0) {
            papers['software-designer'].unshift({
                id: 'software-designer-2020-上半年',
                year: 2020,
                session: '上半年',
                title: '2020年上半年',
                isReal: true
            });
        }
        
        return papers;
    },

    renderHomePage() {
        this.init();

        const currentSubject = this.currentSubject || 'software-designer';
        const subject = this.subjects[currentSubject];
        const papers = this.mockPapers[currentSubject] || [];

        return `
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">历年真题</h1>
                    <p class="page-desc">沉浸式答题体验，真实考试模拟</p>
                </div>
            </div>
            <div class="container">
                <div class="subject-tabs">
                    ${Object.entries(this.subjects).map(([id, s]) => `
                        <button class="subject-tab ${id === currentSubject ? 'active' : ''}" 
                                onclick="ExamPapersModule.switchSubject('${id}')">
                            ${s.icon} ${s.name}
                        </button>
                    `).join('')}
                </div>

                <div class="paper-list">
                    ${papers.map(paper => {
                        const isReal = paper.isReal;
                        const questionCount = isReal ? 
                            this.getRealQuestions(currentSubject).filter(q => q.year === paper.year && q.session === paper.session).length :
                            5;
                        return `
                            <div class="paper-card" onclick="ExamPapersModule.startExam('${currentSubject}', '${paper.id}')">
                                <div class="paper-card-header">
                                    <span class="badge badge-primary">${paper.year}年${paper.session}</span>
                                    <span class="badge ${isReal ? 'badge-success' : 'badge-warning'}">${isReal ? '真题' : '模拟'}</span>
                                </div>
                                <div class="paper-card-title">${subject.name}</div>
                                <div class="paper-card-meta">${questionCount} 道题目</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    switchSubject(subjectId) {
        this.currentSubject = subjectId;
        App.render();
    },

    startExam(subjectId, paperId) {
        this.init();
        this.currentSubject = subjectId;
        
        const paper = (this.mockPapers[subjectId] || []).find(p => p.id === paperId);
        if (!paper) return;

        this.currentPaper = {
            ...paper,
            subject: this.subjects[subjectId],
            questions: this.generateMockQuestions(subjectId, paper.year, paper.session)
        };
        this.answers = {};
        this.flagged = {};
        this.currentQuestionIndex = 0;
        this.showResults = false;

        this.renderExamPage();
    },

    renderExamPage() {
        const mainContent = document.getElementById('main-content');
        const paper = this.currentPaper;
        
        if (!paper) return;

        // 添加沉浸式模式
        document.body.classList.add('exam-mode');

        if (this.showResults) {
            document.body.classList.remove('exam-mode');
            this.renderResults();
            return;
        }

        const question = paper.questions[this.currentQuestionIndex];
        const selectedAnswer = this.answers[question.id];

        mainContent.innerHTML = `
            <div class="exam-container">
                <!-- 顶部状态栏 -->
                <div class="exam-topbar">
                    <div class="exam-topbar-inner">
                        <div class="exam-progress">
                            <span class="exam-progress-text">${this.currentQuestionIndex + 1}/${paper.questions.length}</span>
                            <div class="exam-progress-bar">
                                <div class="exam-progress-fill" style="width:${((this.currentQuestionIndex + 1) / paper.questions.length) * 100}%"></div>
                            </div>
                        </div>
                        <div class="exam-actions-top">
                            <button class="btn-exam-action" onclick="ExamPapersModule.toggleFlag('${question.id}')">
                                ${this.flagged[question.id] ? '⚑ 已标记' : '⚑ 标记'}
                            </button>
                            <button class="btn-exam-action" onclick="ExamPapersModule.confirmSubmit()">交卷</button>
                            <button class="btn-exam-action" onclick="ExamPapersModule.exitExam()">退出</button>
                        </div>
                    </div>
                </div>

                <!-- 题目导航点 -->
                <div class="question-dots">
                    ${paper.questions.map((q, i) => {
                        let cls = 'question-dot';
                        if (i === this.currentQuestionIndex) cls += ' current';
                        else if (this.answers[q.id + '_checked']) {
                            cls += this.answers[q.id] === q.answer ? ' correct' : ' wrong';
                        } else if (this.answers[q.id]) {
                            cls += ' answered';
                        }
                        return `<div class="${cls}" onclick="ExamPapersModule.goToQuestion(${i})">${i + 1}</div>`;
                    }).join('')}
                </div>

                <!-- 题目区域 -->
                <div class="question-area">
                    <div class="question-header">
                        <div class="question-number">
                            <span class="question-number-text">第</span>
                            <span class="question-number-index">${this.currentQuestionIndex + 1}</span>
                            <span class="question-number-text">题 / 共${paper.questions.length}题</span>
                        </div>
                    </div>

                    <div class="question-text">${question.text}</div>

                    <div class="options-list">
                        ${question.options.map((opt, i) => {
                            const letter = String.fromCharCode(65 + i);
                            let cls = 'option-item';
                            if (letter === selectedAnswer) {
                                cls += ' selected';
                            }
                            return `
                                <div class="${cls}" onclick="ExamPapersModule.selectOption('${question.id}', '${letter}')">
                                    <span class="option-letter">${letter}</span>
                                    <span class="option-text">${opt}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- 底部导航 -->
                <div class="exam-bottombar">
                    <div class="exam-bottombar-inner">
                        <button class="btn-nav prev" onclick="ExamPapersModule.prevQuestion()" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                            ← 上一题
                        </button>
                        <div class="btn-group">
                            <button class="btn-nav next" onclick="ExamPapersModule.nextQuestion()" ${!selectedAnswer ? 'disabled' : ''}>
                                ${this.currentQuestionIndex === paper.questions.length - 1 ? '交卷' : '下一题 →'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    selectOption(questionId, letter) {
        this.answers[questionId] = letter;
        this.renderExamPage();
        // 滚动到题目区域
        const questionArea = document.querySelector('.question-area');
        if (questionArea) {
            questionArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentPaper.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderExamPage();
            // 滚动到题目区域
            const questionArea = document.querySelector('.question-area');
            if (questionArea) {
                questionArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // 最后一题，交卷
            this.showResults();
        }
    },

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderExamPage();
            // 滚动到题目区域
            const questionArea = document.querySelector('.question-area');
            if (questionArea) {
                questionArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    },

    goToQuestion(index) {
        this.currentQuestionIndex = index;
        this.renderExamPage();
        // 滚动到题目区域
        const questionArea = document.querySelector('.question-area');
        if (questionArea) {
            questionArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    toggleFlag(questionId) {
        this.flagged[questionId] = !this.flagged[questionId];
        this.renderExamPage();
    },

    confirmSubmit() {
        const unanswered = this.currentPaper.questions.length - Object.keys(this.answers).filter(k => !k.endsWith('_checked')).length;
        if (unanswered > 0) {
            if (!confirm(`还有 ${unanswered} 题未作答，确定交卷吗？`)) return;
        } else {
            if (!confirm('确定交卷吗？')) return;
        }
        this.showResults();
    },

    exitExam() {
        if (confirm('确定退出吗？答题进度将不会保存。')) {
            document.body.classList.remove('exam-mode');
            this.currentPaper = null;
            this.answers = {};
            App.render();
        }
    },

    showResults() {
        document.body.classList.remove('exam-mode');
        this.showResults = true;
        this.renderResults();
    },

    renderResults() {
        const paper = this.currentPaper;
        let correct = 0;
        let answered = 0;

        paper.questions.forEach(q => {
            if (this.answers[q.id]) {
                answered++;
                if (this.answers[q.id] === q.answer) correct++;
            }
        });

        const score = Math.round((correct / paper.questions.length) * 100);
        const passed = score >= 60;
        const mainContent = document.getElementById('main-content');

        mainContent.innerHTML = `
            <div class="result-container">
                <div class="result-icon">${passed ? '🎉' : '💪'}</div>
                <div class="result-title">${passed ? '恭喜通过！' : '继续努力！'}</div>
                <div class="result-subtitle">${paper.title} ${paper.subject.name}</div>

                <div class="result-score">${score}</div>
                <div class="result-score-label">得分</div>

                <div class="result-stats">
                    <div class="result-stat">
                        <div class="result-stat-value" style="color:var(--success)">${correct}</div>
                        <div class="result-stat-label">答对</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-value" style="color:var(--danger)">${answered - correct}</div>
                        <div class="result-stat-label">答错</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-value">${paper.questions.length - answered}</div>
                        <div class="result-stat-label">未答</div>
                    </div>
                </div>

                <div class="result-actions">
                    <button class="btn btn-outline" onclick="ExamPapersModule.toggleReview()">查看解析</button>
                    <button class="btn btn-primary" onclick="ExamPapersModule.retakeExam()">重新做题</button>
                    <button class="btn btn-ghost" onclick="ExamPapersModule.backToList()">返回列表</button>
                </div>
            </div>

            <div class="answers-review" id="answers-review" style="display:none">
                <h3>答题解析</h3>
                ${paper.questions.map((q, i) => {
                    const userAnswer = this.answers[q.id];
                    const isCorrect = userAnswer === q.answer;
                    return `
                        <div class="answer-item ${isCorrect ? 'correct' : 'wrong'}">
                            <div class="answer-item-header">
                                <span class="answer-item-number">第 ${i + 1} 题</span>
                                <span class="answer-item-result" style="color:${isCorrect ? 'var(--success)' : 'var(--danger)'}">
                                    ${isCorrect ? '✓ 正确' : userAnswer ? '✗ 错误' : '未作答'}
                                </span>
                            </div>
                            <div class="answer-item-text">${q.text}</div>
                            <div class="answer-item-correct">
                                正确答案: ${q.answer}
                                ${userAnswer && !isCorrect ? ` · 你的答案: ${userAnswer}` : ''}
                            </div>
                            ${q.explanation ? `<div class="answer-item-explanation">${q.explanation}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    toggleReview() {
        const el = document.getElementById('answers-review');
        if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
    },

    retakeExam() {
        this.answers = {};
        this.flagged = {};
        this.showResults = false;
        this.currentQuestionIndex = 0;
        this.renderExamPage();
    },

    backToList() {
        this.currentPaper = null;
        this.answers = {};
        App.render();
    }
};
