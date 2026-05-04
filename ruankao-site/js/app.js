const App = {
    currentRoute: '/',
    isLoading: false,

    init() {
        this.setupRouter();
        this.setupTheme();
        this.setupMobileMenu();
        this.setupKeyboardShortcuts();
        this.render();
    },

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        this.currentRoute = hash;
        this.updateActiveNav();
        this.render();
    },

    updateActiveNav() {
        const route = this.currentRoute.split('/')[1] || '/';
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            const linkRoute = link.getAttribute('data-route');
            const isActive = linkRoute === '/' ? route === '/' : route === linkRoute.slice(1);
            link.classList.toggle('active', isActive);
        });
    },

    setupTheme() {
        const savedTheme = localStorage.getItem('ruankao_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        document.getElementById('theme-toggle').addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('ruankao_theme', next);
            this.updateThemeIcon(next);
        });
    },

    updateThemeIcon(theme) {
        const sunIcon = document.querySelector('.icon-sun');
        const moonIcon = document.querySelector('.icon-moon');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
            moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
        }
    },

    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        menu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    },

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const route = this.currentRoute;

            if (route.startsWith('/practice/') || route.startsWith('/exam-papers/')) {
                if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                    if (typeof PracticeModule !== 'undefined' && PracticeModule.currentSubject && PracticeModule.currentIndex > 0) {
                        PracticeModule.prevQuestion();
                    } else if (typeof ExamPapersModule !== 'undefined' && ExamPapersModule.currentPaper) {
                        ExamPapersModule.prevQuestion();
                    }
                } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                    if (typeof PracticeModule !== 'undefined' && PracticeModule.currentSubject) {
                        PracticeModule.nextQuestion();
                    } else if (typeof ExamPapersModule !== 'undefined' && ExamPapersModule.currentPaper) {
                        ExamPapersModule.nextQuestion();
                    }
                } else if (['1', '2', '3', '4'].includes(e.key)) {
                    const letter = Utils.getLetter(parseInt(e.key) - 1);
                    if (typeof PracticeModule !== 'undefined' && PracticeModule.currentSubject) {
                        const questions = PracticeModule.questionBank[PracticeModule.currentSubject] || [];
                        const question = questions[PracticeModule.currentIndex];
                        if (question && !PracticeModule.showAnswer) {
                            PracticeModule.selectAnswer(letter);
                        }
                    } else if (typeof ExamPapersModule !== 'undefined' && ExamPapersModule.currentPaper) {
                        const question = ExamPapersModule.currentPaper.questions[ExamPapersModule.currentQuestionIndex];
                        if (question) {
                            ExamPapersModule.selectAnswer(question.id, letter);
                        }
                    }
                } else if (e.key === 'Enter') {
                    if (typeof PracticeModule !== 'undefined' && PracticeModule.currentSubject && !PracticeModule.showAnswer) {
                        PracticeModule.submitAnswer();
                    } else if (typeof ExamPapersModule !== 'undefined' && ExamPapersModule.currentPaper) {
                        const question = ExamPapersModule.currentPaper.questions[ExamPapersModule.currentQuestionIndex];
                        if (question && ExamPapersModule.answers[question.id] && !ExamPapersModule.answers[question.id + '_checked']) {
                            ExamPapersModule.checkAnswer(question.id);
                        }
                    }
                }
            }
        });
    },

    render() {
        const mainContent = document.getElementById('main-content');
        const route = this.currentRoute;

        if (route === '/' || route === '') {
            mainContent.innerHTML = this.renderHome();
        } else if (route === '/knowledge') {
            mainContent.innerHTML = KnowledgeModule.renderHomePage();
        } else if (route.startsWith('/knowledge/')) {
            const parts = route.split('/');
            const subjectId = parts[2];
            const chapterId = parts[3];
            if (chapterId) {
                KnowledgeModule.currentChapter = chapterId;
            }
            mainContent.innerHTML = KnowledgeModule.renderSubjectPage(subjectId);
        } else if (route === '/practice') {
            mainContent.innerHTML = PracticeModule.renderHomePage();
        } else if (route.startsWith('/practice/')) {
            const subjectId = route.split('/')[2];
            mainContent.innerHTML = PracticeModule.renderPracticePage(subjectId);
        } else if (route === '/exam-papers') {
            mainContent.innerHTML = ExamPapersModule.renderHomePage();
        } else if (route.startsWith('/exam-papers/')) {
            const parts = route.split('/');
            const subjectId = parts[2];
            if (subjectId) {
                ExamPapersModule.currentSubject = subjectId;
            }
            mainContent.innerHTML = ExamPapersModule.renderHomePage();
        } else if (route === '/exam') {
            mainContent.innerHTML = ExamModule.renderHomePage();
        } else if (route === '/daily') {
            mainContent.innerHTML = DailyModule.renderPage();
        } else {
            mainContent.innerHTML = this.render404();
        }
    },

    renderHome() {
        const stats = Storage.getStudyStats();
        const dailyProgress = Storage.getDailyProgress();

        return `
            <section class="hero">
                <div class="container">
                    <div class="hero-badge">📚 专注软考中级备考</div>
                    <h1 class="hero-title">
                        Tyche软考
                        <br>
                        <span class="gradient-text">让你的备考更高效</span>
                    </h1>
                    <p class="hero-subtitle">
                        涵盖软件设计师、网络工程师等5大科目，提供知识点学习、题库练习、历年真题、模拟考试，助你一次通过软考
                    </p>
                    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
                        <a href="#/knowledge" class="btn btn-primary btn-lg">开始学习</a>
                        <a href="#/exam-papers" class="btn btn-outline btn-lg">历年真题</a>
                        <a href="#/daily" class="btn btn-ghost btn-lg">每日一练</a>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number">5</div>
                            <div class="stat-label">考试科目</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${stats.studyDays}</div>
                            <div class="stat-label">学习天数</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${dailyProgress.streak}</div>
                            <div class="stat-label">连续打卡</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">50+</div>
                            <div class="stat-label">精选题目</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section" style="background:var(--bg-secondary)">
                <div class="container">
                    <div class="section-header">
                        <span class="section-label">Subjects</span>
                        <h2 class="section-title">覆盖5大热门科目</h2>
                        <p class="section-desc">针对软考中级最常见的证书考试，提供全面的学习资料</p>
                    </div>

                    <div class="subjects-grid">
                        ${Object.entries(KnowledgeModule.subjects).map(([id, subject]) => `
                            <a href="#/knowledge/${id}" class="subject-card" onclick="KnowledgeModule.selectSubject('${id}')">
                                <div class="subject-icon">${subject.icon}</div>
                                <div class="subject-name">${subject.name}</div>
                                <div class="subject-desc">${subject.description}</div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-header">
                        <span class="section-label">Features</span>
                        <h2 class="section-title">五大核心功能</h2>
                        <p class="section-desc">全方位覆盖你的备考需求</p>
                    </div>

                    <div class="features-grid">
                        <div class="feature-card" onclick="location.hash='#/knowledge'" style="cursor:pointer">
                            <div class="feature-icon">📖</div>
                            <div class="feature-title">知识点学习</div>
                            <div class="feature-desc">系统化的知识体系，按章节组织，支持进度追踪，夯实理论基础</div>
                        </div>
                        <div class="feature-card" onclick="location.hash='#/practice'" style="cursor:pointer">
                            <div class="feature-icon">✏️</div>
                            <div class="feature-title">题库练习</div>
                            <div class="feature-desc">海量真题模拟，支持分类练习，自动收集错题，针对性强化</div>
                        </div>
                        <div class="feature-card" onclick="location.hash='#/exam-papers'" style="cursor:pointer">
                            <div class="feature-icon">📋</div>
                            <div class="feature-title">历年真题</div>
                            <div class="feature-desc">近五年软考真题，真实考试体验，了解考试趋势和重点</div>
                        </div>
                        <div class="feature-card" onclick="location.hash='#/exam'" style="cursor:pointer">
                            <div class="feature-icon">📝</div>
                            <div class="feature-title">模拟考试</div>
                            <div class="feature-desc">真实考试环境，计时答题，自动评分，检验学习成果</div>
                        </div>
                        <div class="feature-card" onclick="location.hash='#/daily'" style="cursor:pointer">
                            <div class="feature-icon">📅</div>
                            <div class="feature-title">每日一练</div>
                            <div class="feature-desc">每天5道精选题目，保持学习节奏，连续打卡养成习惯</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section" style="background:var(--primary-50)">
                <div class="container" style="text-align:center">
                    <h2 style="font-size:28px;margin-bottom:12px">开始你的备考之旅</h2>
                    <p style="color:var(--text-secondary);margin-bottom:32px">每天坚持学习，软考一次通过</p>
                    <a href="#/knowledge" class="btn btn-primary btn-lg">立即开始</a>
                </div>
            </section>
        `;
    },

    render404() {
        return `
            <div style="text-align:center;padding:120px 20px">
                <div style="font-size:64px;margin-bottom:16px">🔍</div>
                <h1 style="font-size:24px;margin-bottom:8px">页面未找到</h1>
                <p style="color:var(--text-muted);margin-bottom:24px">你访问的页面不存在</p>
                <a href="#/" class="btn btn-primary">返回首页</a>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

function navigateTo(path) {
    window.location.hash = path;
    return false;
}
