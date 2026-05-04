const DailyModule = {
    questions: [],
    answers: {},
    currentIndex: 0,
    isFinished: false,

    getTodayDate() {
        return Utils.formatDate(new Date());
    },

    getTodaySeed() {
        const today = new Date();
        return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    },

    generateDailyQuestions() {
        const seed = this.getTodaySeed();
        const allQuestions = [];

        Object.entries(PracticeModule.questionBank).forEach(([subjectId, questions]) => {
            questions.forEach(q => {
                allQuestions.push({ ...q, subjectId });
            });
        });

        const shuffled = this.seededShuffle(allQuestions, seed);
        return shuffled.slice(0, 5);
    },

    seededShuffle(array, seed) {
        const shuffled = [...array];
        let m = shuffled.length;
        let t;
        let s = seed;

        while (m) {
            s = (s * 1103515245 + 12345) & 0x7fffffff;
            t = s % m--;
            [shuffled[m], shuffled[t]] = [shuffled[t], shuffled[m]];
        }

        return shuffled;
    },

    renderPage() {
        const progress = Storage.getDailyProgress();
        const isCompleted = Storage.isDailyCompleted();

        if (isCompleted && this.questions.length === 0) {
            return this.renderCompleted();
        }

        if (this.questions.length === 0) {
            this.questions = this.generateDailyQuestions();
        }

        if (this.isFinished) {
            return this.renderResult();
        }

        return this.renderQuestion();
    },

    renderQuestion() {
        const question = this.questions[this.currentIndex];
        const progress = Storage.getDailyProgress();
        const selectedAnswer = this.answers[question.id];
        const subject = PracticeModule.subjects[question.subjectId];

        return `
            <div class="daily-container" style="padding:24px">
                <div class="daily-header">
                    <div class="daily-date">${this.getTodayDate()}</div>
                    <h1 class="daily-title">每日一练</h1>
                    <div class="daily-subtitle">每天5道题，轻松备考软考</div>
                    <div class="daily-streak">
                        🔥 连续打卡 ${progress.streak} 天
                    </div>
                </div>

                <div class="question-card">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                        <div>
                            <span class="question-number">${this.currentIndex + 1}</span>
                            <span class="badge badge-info" style="margin-left:8px">${subject ? subject.name : ''}</span>
                        </div>
                        <span style="font-size:13px;color:var(--text-muted)">${this.currentIndex + 1}/5</span>
                    </div>

                    <div class="question-text">${question.text}</div>

                    <div class="options-list">
                        ${question.options.map((option, i) => {
                            const letter = Utils.getLetter(i);
                            let className = 'option-item';
                            if (selectedAnswer === letter) className += ' selected';
                            return `
                                <div class="${className}" onclick="DailyModule.selectAnswer('${question.id}', '${letter}')">
                                    <span class="option-letter">${letter}</span>
                                    <span class="option-text">${option.substring(2)}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="answer-actions">
                        ${this.currentIndex > 0 ? `
                            <button class="btn btn-ghost" onclick="DailyModule.prevQuestion()">← 上一题</button>
                        ` : ''}
                        <div style="flex:1"></div>
                        ${this.currentIndex < this.questions.length - 1 ? `
                            <button class="btn btn-primary" onclick="DailyModule.nextQuestion()" ${!selectedAnswer ? 'disabled' : ''}>
                                下一题 →
                            </button>
                        ` : `
                            <button class="btn btn-success" onclick="DailyModule.finishDaily()" ${Object.keys(this.answers).length < this.questions.length ? 'disabled' : ''}>
                                提交答案
                            </button>
                        `}
                    </div>
                </div>

                <div style="display:flex;justify-content:center;gap:8px;margin-top:24px">
                    ${this.questions.map((q, i) => {
                        let style = 'width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:13px;';
                        if (i === this.currentIndex) {
                            style += 'background:var(--primary);color:white;';
                        } else if (this.answers[q.id]) {
                            style += 'background:var(--primary-50);color:var(--primary);';
                        } else {
                            style += 'background:var(--bg-tertiary);color:var(--text-muted);';
                        }
                        return `<div style="${style}">${i + 1}</div>`;
                    }).join('')}
                </div>
            </div>
        `;
    },

    selectAnswer(questionId, letter) {
        this.answers[questionId] = letter;
        App.render();
    },

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            App.render();
            // 滚动到题目区域
            const questionCard = document.querySelector('.question-card');
            if (questionCard) {
                questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    },

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            App.render();
            // 滚动到题目区域
            const questionCard = document.querySelector('.question-card');
            if (questionCard) {
                questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    },

    finishDaily() {
        let correct = 0;
        this.questions.forEach(q => {
            if (this.answers[q.id] === q.answer) {
                correct++;
            } else {
                Storage.addWrongQuestion(q.subjectId, q);
            }
        });

        this.isFinished = true;
        Storage.updateDailyProgress(correct, this.questions.length);
        App.render();
    },

    renderResult() {
        let correct = 0;
        this.questions.forEach(q => {
            if (this.answers[q.id] === q.answer) correct++;
        });

        const score = Math.round((correct / this.questions.length) * 100);
        const progress = Storage.getDailyProgress();

        return `
            <div class="daily-container" style="padding:24px">
                <div class="daily-header">
                    <div class="daily-date">${this.getTodayDate()}</div>
                    <h1 class="daily-title">每日一练</h1>
                </div>

                <div class="daily-footer">
                    <div class="daily-complete-icon">${score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}</div>
                    <div class="daily-complete-title">${score >= 80 ? '太棒了！' : score >= 60 ? '不错！' : '继续努力！'}</div>
                    <div class="daily-complete-desc">今日练习已完成</div>

                    <div class="daily-score">${correct}/${this.questions.length}</div>
                    <div class="daily-score-label">答对题数</div>

                    <div class="daily-streak" style="margin-top:16px">
                        🔥 连续打卡 ${progress.streak} 天
                    </div>
                </div>

                <div style="margin-top:24px">
                    <h3 style="margin-bottom:16px">答题解析</h3>
                    ${this.questions.map((q, i) => {
                        const userAnswer = this.answers[q.id];
                        const isCorrect = userAnswer === q.answer;
                        const subject = PracticeModule.subjects[q.subjectId];

                        return `
                            <div class="exam-answer-item ${isCorrect ? 'correct' : 'wrong'}" style="margin-bottom:12px">
                                <div class="exam-answer-header">
                                    <div>
                                        <span class="exam-answer-number">第 ${i + 1} 题</span>
                                        <span class="badge badge-info" style="margin-left:8px">${subject ? subject.name : ''}</span>
                                    </div>
                                    <span style="color:${isCorrect ? 'var(--success)' : 'var(--danger)'};font-weight:500">
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

                <div style="text-align:center;margin-top:24px">
                    <button class="btn btn-primary" onclick="DailyModule.startNew()">明天再来</button>
                </div>
            </div>
        `;
    },

    renderCompleted() {
        const progress = Storage.getDailyProgress();

        return `
            <div class="daily-container" style="padding:24px">
                <div class="daily-header">
                    <div class="daily-date">${this.getTodayDate()}</div>
                    <h1 class="daily-title">每日一练</h1>
                </div>

                <div class="daily-footer">
                    <div class="daily-complete-icon">✅</div>
                    <div class="daily-complete-title">今日已完成</div>
                    <div class="daily-complete-desc">你今天已经完成了每日一练</div>

                    <div class="daily-streak" style="margin-top:16px">
                        🔥 连续打卡 ${progress.streak} 天
                    </div>

                    <div style="margin-top:24px">
                        <button class="btn btn-outline" onclick="DailyModule.startNew()">再练一次</button>
                    </div>
                </div>
            </div>
        `;
    },

    startNew() {
        this.questions = [];
        this.answers = {};
        this.currentIndex = 0;
        this.isFinished = false;
        App.render();
    }
};
