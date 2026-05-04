const ExamModule = {
    currentSubject: null,
    questions: [],
    answers: {},
    flagged: {},
    currentIndex: 0,
    timeLeft: 0,
    timer: null,
    isFinished: false,
    startTime: null,

    subjects: {
        'software-designer': { name: '软件设计师', icon: '💻', duration: 150, questionCount: 75 },
        'network-engineer': { name: '网络工程师', icon: '🌐', duration: 150, questionCount: 75 },
        'security-engineer': { name: '信息安全工程师', icon: '🔒', duration: 150, questionCount: 75 },
        'database-engineer': { name: '数据库系统工程师', icon: '🗄️', duration: 150, questionCount: 75 },
        'info-system-manager': { name: '信息系统管理工程师', icon: '⚙️', duration: 150, questionCount: 75 }
    },

    renderHomePage() {
        return `
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">模拟考试</h1>
                    <p class="page-desc">模拟真实考试环境，检验学习成果</p>
                </div>
            </div>
            <div class="container">
                <div class="subjects-grid">
                    ${Object.entries(this.subjects).map(([id, subject]) => {
                        const history = Storage.getExamHistory().filter(h => h.subjectId === id);
                        const bestScore = history.length > 0 ? Math.max(...history.map(h => h.score)) : 0;

                        return `
                            <div class="subject-card" onclick="ExamModule.selectSubject('${id}')">
                                <div class="subject-icon">${subject.icon}</div>
                                <div class="subject-name">${subject.name}</div>
                                <div class="subject-desc">
                                    <div>考试时长: ${subject.duration}分钟</div>
                                    <div>题目数量: ${subject.questionCount}题</div>
                                </div>
                                <div class="subject-meta">
                                    <span>最高分: ${bestScore || '-'}</span>
                                    <span>已考 ${history.length} 次</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                ${this.renderExamHistory()}
            </div>
        `;
    },

    renderExamHistory() {
        const history = Storage.getExamHistory();
        if (history.length === 0) return '';

        return `
            <div class="section">
                <h2 style="font-size:20px;margin-bottom:16px">考试记录</h2>
                <div style="display:flex;flex-direction:column;gap:12px">
                    ${history.slice(0, 10).map(record => {
                        const subject = this.subjects[record.subjectId];
                        return `
                            <div class="card" style="padding:16px;display:flex;align-items:center;justify-content:space-between">
                                <div>
                                    <div style="font-weight:500">${subject ? subject.name : '未知科目'}</div>
                                    <div style="font-size:13px;color:var(--text-muted)">
                                        ${new Date(record.timestamp).toLocaleDateString()} ·
                                        用时 ${Utils.formatTime(record.duration)}
                                    </div>
                                </div>
                                <div style="text-align:right">
                                    <div style="font-size:24px;font-weight:700;color:${record.score >= 60 ? 'var(--success)' : 'var(--danger)'}">
                                        ${record.score}分
                                    </div>
                                    <div style="font-size:12px;color:var(--text-muted)">
                                        ${record.correct}/${record.total} 正确
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    selectSubject(subjectId) {
        this.currentSubject = subjectId;
        const subject = this.subjects[subjectId];

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'exam-modal';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">开始模拟考试</h3>
                    <button class="modal-close" onclick="ExamModule.closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom:16px">你即将开始 <strong>${subject.name}</strong> 模拟考试</p>
                    <div style="background:var(--bg-secondary);padding:16px;border-radius:var(--radius);margin-bottom:16px">
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                            <span>考试时长</span>
                            <span>${subject.duration} 分钟</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                            <span>题目数量</span>
                            <span>${subject.questionCount} 题</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span>满分</span>
                            <span>100 分</span>
                        </div>
                    </div>
                    <p style="font-size:13px;color:var(--text-muted)">
                        注意：考试开始后计时不会暂停，请确保有足够的时间完成考试。
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="ExamModule.closeModal()">取消</button>
                    <button class="btn btn-primary" onclick="ExamModule.startExam('${subjectId}')">开始考试</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    closeModal() {
        const modal = document.getElementById('exam-modal');
        if (modal) modal.remove();
    },

    startExam(subjectId) {
        this.closeModal();
        this.currentSubject = subjectId;
        this.answers = {};
        this.flagged = {};
        this.currentIndex = 0;
        this.isFinished = false;
        this.startTime = Date.now();

        const allQuestions = PracticeModule.questionBank[subjectId] || [];
        this.questions = Utils.getRandomItems(allQuestions, Math.min(10, allQuestions.length));

        const subject = this.subjects[subjectId];
        this.timeLeft = subject.duration * 60;

        this.renderExamPage();
        this.startTimer();
    },

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.finishExam();
            }
        }, 1000);
    },

    updateTimerDisplay() {
        const timerEl = document.getElementById('exam-timer');
        if (timerEl) {
            timerEl.textContent = Utils.formatTime(this.timeLeft);
            timerEl.className = 'exam-timer';
            if (this.timeLeft <= 300) timerEl.className += ' danger';
            else if (this.timeLeft <= 600) timerEl.className += ' warning';
        }
    },

    renderExamPage() {
        const subject = this.subjects[this.currentSubject];
        const question = this.questions[this.currentIndex];
        const mainContent = document.getElementById('main-content');

        mainContent.innerHTML = `
            <div class="exam-container" style="padding:24px">
                <div class="exam-header">
                    <div class="exam-info">
                        <div class="exam-title">${subject.name} - 模拟考试</div>
                        <div id="exam-timer" class="exam-timer">${Utils.formatTime(this.timeLeft)}</div>
                    </div>
                    <div class="exam-progress-info">
                        <span>进度: ${Object.keys(this.answers).length}/${this.questions.length}</span>
                        <div class="exam-progress-bar">
                            <div class="exam-progress-fill" style="width:${Utils.calculatePercentage(Object.keys(this.answers).length, this.questions.length)}%"></div>
                        </div>
                    </div>
                    <div class="exam-actions">
                        <button class="btn btn-danger btn-sm" onclick="ExamModule.confirmFinish()">交卷</button>
                    </div>
                </div>

                <div class="question-nav">
                    ${this.questions.map((q, i) => {
                        let className = 'question-nav-btn';
                        if (i === this.currentIndex) className += ' current';
                        if (this.answers[q.id]) className += ' answered';
                        if (this.flagged[q.id]) className += ' flagged';
                        return `<button class="${className}" onclick="ExamModule.goToQuestion(${i})">${i + 1}</button>`;
                    }).join('')}
                </div>

                <div class="exam-question">
                    <div class="exam-question-header">
                        <div>
                            <span class="exam-question-number">第 ${this.currentIndex + 1} 题</span>
                            <span class="exam-question-score">（${this.flagged[question.id] ? '已标记 · ' : ''}${Math.round(100 / this.questions.length)}分）</span>
                        </div>
                        <button class="flag-btn ${this.flagged[question.id] ? 'flagged' : ''}"
                                onclick="ExamModule.toggleFlag('${question.id}')">
                            ${this.flagged[question.id] ? '⚑ 已标记' : '⚑ 标记'}
                        </button>
                    </div>

                    <div class="exam-question-text">${question.text}</div>

                    <div class="exam-options">
                        ${question.options.map((option, i) => {
                            const letter = Utils.getLetter(i);
                            const isSelected = this.answers[question.id] === letter;
                            return `
                                <div class="exam-option ${isSelected ? 'selected' : ''}"
                                     onclick="ExamModule.selectAnswer('${question.id}', '${letter}')">
                                    <span class="exam-option-letter">${letter}</span>
                                    <span class="exam-option-text">${option.substring(2)}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="exam-nav">
                    <button class="exam-nav-btn" onclick="ExamModule.prevQuestion()" ${this.currentIndex === 0 ? 'disabled' : ''}>
                        ← 上一题
                    </button>
                    <div style="font-size:14px;color:var(--text-muted)">
                        ${this.currentIndex + 1} / ${this.questions.length}
                    </div>
                    <button class="exam-nav-btn" onclick="ExamModule.nextQuestion()" ${this.currentIndex === this.questions.length - 1 ? 'disabled' : ''}>
                        下一题 →
                    </button>
                </div>
            </div>
        `;
    },

    selectAnswer(questionId, letter) {
        this.answers[questionId] = letter;
        this.renderExamPage();
    },

    toggleFlag(questionId) {
        this.flagged[questionId] = !this.flagged[questionId];
        this.renderExamPage();
    },

    goToQuestion(index) {
        this.currentIndex = index;
        this.renderExamPage();
    },

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderExamPage();
        }
    },

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderExamPage();
        }
    },

    confirmFinish() {
        const unanswered = this.questions.length - Object.keys(this.answers).length;
        if (unanswered > 0) {
            if (!confirm(`还有 ${unanswered} 题未作答，确定要交卷吗？`)) {
                return;
            }
        } else {
            if (!confirm('确定要交卷吗？')) return;
        }
        this.finishExam();
    },

    finishExam() {
        if (this.timer) clearInterval(this.timer);
        this.isFinished = true;

        let correct = 0;
        this.questions.forEach(q => {
            if (this.answers[q.id] === q.answer) correct++;
        });

        const score = Math.round((correct / this.questions.length) * 100);
        const duration = Math.round((Date.now() - this.startTime) / 1000);

        Storage.addExamRecord({
            subjectId: this.currentSubject,
            score,
            correct,
            total: this.questions.length,
            duration
        });

        this.renderResult(score, correct, duration);
    },

    renderResult(score, correct, duration) {
        const subject = this.subjects[this.currentSubject];
        const mainContent = document.getElementById('main-content');

        mainContent.innerHTML = `
            <div style="padding:40px 24px;max-width:800px;margin:0 auto">
                <div class="exam-result">
                    <h2 style="font-size:20px;margin-bottom:8px">考试结束</h2>
                    <div style="font-size:14px;color:var(--text-muted);margin-bottom:24px">${subject.name}</div>

                    <div class="exam-result-score">${score}</div>
                    <div class="exam-result-label">${score >= 60 ? '恭喜通过！' : '继续努力！'}</div>

                    <div class="exam-result-stats">
                        <div class="exam-result-stat">
                            <div class="exam-result-stat-value" style="color:var(--success)">${correct}</div>
                            <div class="exam-result-stat-label">答对</div>
                        </div>
                        <div class="exam-result-stat">
                            <div class="exam-result-stat-value" style="color:var(--danger)">${this.questions.length - correct}</div>
                            <div class="exam-result-stat-label">答错</div>
                        </div>
                        <div class="exam-result-stat">
                            <div class="exam-result-stat-value">${Utils.formatTime(duration)}</div>
                            <div class="exam-result-stat-label">用时</div>
                        </div>
                    </div>

                    <div class="exam-result-actions">
                        <button class="btn btn-outline" onclick="ExamModule.showAnswers()">查看解析</button>
                        <button class="btn btn-primary" onclick="ExamModule.retakeExam()">重新考试</button>
                    </div>
                </div>

                <div class="exam-answers" id="exam-answers" style="display:none">
                    <h3 style="margin-bottom:16px">答题解析</h3>
                    ${this.questions.map((q, i) => {
                        const userAnswer = this.answers[q.id];
                        const isCorrect = userAnswer === q.answer;
                        return `
                            <div class="exam-answer-item ${isCorrect ? 'correct' : 'wrong'}">
                                <div class="exam-answer-header">
                                    <span class="exam-answer-number">第 ${i + 1} 题</span>
                                    <span class="exam-answer-result" style="color:${isCorrect ? 'var(--success)' : 'var(--danger)'}">
                                        ${isCorrect ? '✓ 正确' : '✗ 错误'}
                                    </span>
                                </div>
                                <div class="exam-answer-text">${q.text}</div>
                                <div class="exam-answer-correct">
                                    正确答案: ${q.answer}
                                    ${!isCorrect ? ` · 你的答案: ${userAnswer || '未作答'}` : ''}
                                </div>
                                <div class="exam-answer-explanation">${q.explanation}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    showAnswers() {
        const answersEl = document.getElementById('exam-answers');
        if (answersEl) {
            answersEl.style.display = answersEl.style.display === 'none' ? 'block' : 'none';
        }
    },

    retakeExam() {
        this.selectSubject(this.currentSubject);
    }
};
