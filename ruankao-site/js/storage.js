const Storage = {
    PREFIX: 'ruankao_',

    get(key) {
        try {
            const data = localStorage.getItem(this.PREFIX + key);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(this.PREFIX + key);
    },

    getProgress(subjectId) {
        return this.get(`progress_${subjectId}`) || {
            completedChapters: [],
            lastStudyTime: null,
            totalStudyTime: 0
        };
    },

    setProgress(subjectId, progress) {
        this.set(`progress_${subjectId}`, progress);
    },

    updateChapterProgress(subjectId, chapterId) {
        const progress = this.getProgress(subjectId);
        if (!progress.completedChapters.includes(chapterId)) {
            progress.completedChapters.push(chapterId);
        }
        progress.lastStudyTime = Date.now();
        this.setProgress(subjectId, progress);
    },

    getWrongQuestions(subjectId) {
        return this.get(`wrong_${subjectId}`) || [];
    },

    addWrongQuestion(subjectId, question) {
        const wrongs = this.getWrongQuestions(subjectId);
        const exists = wrongs.find(w => w.id === question.id);
        if (!exists) {
            wrongs.push({
                ...question,
                addedTime: Date.now(),
                reviewCount: 0
            });
            this.set(`wrong_${subjectId}`, wrongs);
        }
    },

    removeWrongQuestion(subjectId, questionId) {
        const wrongs = this.getWrongQuestions(subjectId);
        const filtered = wrongs.filter(w => w.id !== questionId);
        this.set(`wrong_${subjectId}`, filtered);
    },

    clearWrongQuestions(subjectId) {
        this.set(`wrong_${subjectId}`, []);
    },

    getFavorites(type) {
        return this.get(`favorites_${type}`) || [];
    },

    toggleFavorite(type, item) {
        const favorites = this.getFavorites(type);
        const index = favorites.findIndex(f => f.id === item.id);
        if (index >= 0) {
            favorites.splice(index, 1);
        } else {
            favorites.push({ ...item, addedTime: Date.now() });
        }
        this.set(`favorites_${type}`, favorites);
        return index < 0;
    },

    isFavorite(type, itemId) {
        const favorites = this.getFavorites(type);
        return favorites.some(f => f.id === itemId);
    },

    getExamHistory() {
        return this.get('exam_history') || [];
    },

    addExamRecord(record) {
        const history = this.getExamHistory();
        history.unshift({
            ...record,
            id: Date.now().toString(),
            timestamp: Date.now()
        });
        if (history.length > 50) {
            history.length = 50;
        }
        this.set('exam_history', history);
    },

    getDailyProgress() {
        return this.get('daily_progress') || {
            streak: 0,
            lastDate: null,
            completedDates: [],
            todayCompleted: false
        };
    },

    updateDailyProgress(correct, total) {
        const progress = this.getDailyProgress();
        const today = Utils.formatDate(new Date());

        if (!progress.completedDates.includes(today)) {
            progress.completedDates.push(today);

            const yesterday = Utils.formatDate(new Date(Date.now() - 86400000));
            if (progress.lastDate === yesterday) {
                progress.streak += 1;
            } else if (progress.lastDate !== today) {
                progress.streak = 1;
            }

            progress.lastDate = today;
            progress.todayCompleted = true;
        }

        this.set('daily_progress', progress);
        return progress;
    },

    isDailyCompleted() {
        const progress = this.getDailyProgress();
        const today = Utils.formatDate(new Date());
        return progress.completedDates.includes(today);
    },

    getStudyStats() {
        const stats = {
            totalQuestions: 0,
            correctQuestions: 0,
            studyDays: 0,
            subjects: {}
        };

        const subjects = ['software-designer', 'network-engineer', 'security-engineer', 'database-engineer', 'info-system-manager'];
        subjects.forEach(subjectId => {
            const progress = this.getProgress(subjectId);
            const wrongs = this.getWrongQuestions(subjectId);
            stats.subjects[subjectId] = {
                completedChapters: progress.completedChapters.length,
                wrongCount: wrongs.length
            };
        });

        const dailyProgress = this.getDailyProgress();
        stats.studyDays = dailyProgress.completedDates.length;

        return stats;
    },

    exportData() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.PREFIX)) {
                data[key] = localStorage.getItem(key);
            }
        }
        return JSON.stringify(data, null, 2);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            Object.entries(data).forEach(([key, value]) => {
                if (key.startsWith(this.PREFIX)) {
                    localStorage.setItem(key, value);
                }
            });
            return true;
        } catch {
            return false;
        }
    },

    clearAll() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.PREFIX)) {
                keys.push(key);
            }
        }
        keys.forEach(key => localStorage.removeItem(key));
    }
};
