// 拼豆游戏主逻辑
class PerlerBeadGame {
    constructor() {
        this.canvas = document.getElementById('gameBoard');
        this.ctx = this.canvas.getContext('2d');
        this.previewCanvas = document.getElementById('previewCanvas');
        this.previewCtx = this.previewCanvas.getContext('2d');
        
        // 游戏配置
        this.boardSize = 29; // 29x29 的标准拼豆板
        this.cellSize = 20; // 每个格子的大小
        this.beadRadius = 8; // 珠子半径
        
        // 游戏状态
        this.board = [];
        this.currentColor = '#FF0000'; // 默认红色
        this.currentTool = 'place';
        this.history = [];
        this.historyIndex = -1;
        this.isMouseDown = false;
        
        // 品牌色卡数据
        this.brandPalettes = {
            'Mard': [
                { code: 'M01', name: '白色', hex: '#FFFFFF' },
                { code: 'M02', name: '黄色', hex: '#FFD700' },
                { code: 'M03', name: '橙色', hex: '#FF8C00' },
                { code: 'M04', name: '红色', hex: '#FF0000' },
                { code: 'M05', name: '粉红', hex: '#FF69B4' },
                { code: 'M06', name: '紫色', hex: '#800080' },
                { code: 'M07', name: '深蓝', hex: '#00008B' },
                { code: 'M08', name: '蓝色', hex: '#0000FF' },
                { code: 'M09', name: '浅蓝', hex: '#87CEEB' },
                { code: 'M10', name: '绿色', hex: '#008000' },
                { code: 'M11', name: '深绿', hex: '#006400' },
                { code: 'M12', name: '棕色', hex: '#8B4513' },
                { code: 'M13', name: '黑色', hex: '#000000' },
                { code: 'M14', name: '灰色', hex: '#808080' },
                { code: 'M15', name: '浅灰', hex: '#C0C0C0' }
            ],
            '优肯': [
                { code: 'U01', name: '白色', hex: '#FFFFFF' },
                { code: 'U02', name: '柠檬黄', hex: '#FFF44F' },
                { code: 'U03', name: '橙色', hex: '#FFA500' },
                { code: 'U04', name: '红色', hex: '#FF0000' },
                { code: 'U05', name: '玫红', hex: '#FF007F' },
                { code: 'U06', name: '紫色', hex: '#800080' },
                { code: 'U07', name: '深蓝', hex: '#00008B' },
                { code: 'U08', name: '宝蓝', hex: '#4169E1' },
                { code: 'U09', name: '天蓝', hex: '#87CEEB' },
                { code: 'U10', name: '草绿', hex: '#7CFC00' },
                { code: 'U11', name: '深绿', hex: '#006400' },
                { code: 'U12', name: '咖啡', hex: '#6F4E37' },
                { code: 'U13', name: '黑色', hex: '#000000' },
                { code: 'U14', name: '灰色', hex: '#808080' },
                { code: 'U15', name: '肤色', hex: '#FFDAB9' }
            ],
            '黄豆豆': [
                { code: 'H01', name: '白色', hex: '#FFFFFF' },
                { code: 'H02', name: '黄色', hex: '#FFD700' },
                { code: 'H03', name: '橙色', hex: '#FF8C00' },
                { code: 'H04', name: '大红', hex: '#FF0000' },
                { code: 'H05', name: '粉红', hex: '#FF69B4' },
                { code: 'H06', name: '紫色', hex: '#800080' },
                { code: 'H07', name: '深蓝', hex: '#00008B' },
                { code: 'H08', name: '蓝色', hex: '#0000FF' },
                { code: 'H09', name: '浅蓝', hex: '#ADD8E6' },
                { code: 'H10', name: '绿色', hex: '#008000' },
                { code: 'H11', name: '深绿', hex: '#006400' },
                { code: 'H12', name: '棕色', hex: '#8B4513' },
                { code: 'H13', name: '黑色', hex: '#000000' },
                { code: 'H14', name: '灰色', hex: '#808080' },
                { code: 'H15', name: '米色', hex: '#F5F5DC' }
            ]
        };
        
        // 当前使用的颜色列表
        this.colors = this.brandPalettes['Mard'].map(p => p.hex);
        this.currentBrand = 'Mard';
        
        // 预设图案库
        this.presetPatterns = {
            'animals': [
                {
                    name: '小猫',
                    difficulty: '简单',
                    size: '15x15',
                    beadCount: 120,
                    pattern: [
                        '000000000000000',
                        '000001100011000',
                        '000011111111000',
                        '000111111111100',
                        '001111111111110',
                        '011111111111110',
                        '011111111111110',
                        '011111111111110',
                        '001111111111100',
                        '000111111111000',
                        '000011111110000',
                        '000001111100000',
                        '000000111000000',
                        '000000010000000',
                        '000000000000000'
                    ],
                    colors: { '1': '#FFA500' }
                },
                {
                    name: '小狗',
                    difficulty: '简单',
                    size: '15x15',
                    beadCount: 130,
                    pattern: [
                        '000000000000000',
                        '000110000011000',
                        '001111001111000',
                        '011111111111100',
                        '011111111111100',
                        '011111111111100',
                        '001111111111000',
                        '000111111110000',
                        '000011111100000',
                        '000001111000000',
                        '000000110000000',
                        '000000010000000',
                        '000000000000000',
                        '000000000000000',
                        '000000000000000'
                    ],
                    colors: { '1': '#8B4513' }
                }
            ],
            'food': [
                {
                    name: '苹果',
                    difficulty: '简单',
                    size: '13x13',
                    beadCount: 80,
                    pattern: [
                        '0000000000000',
                        '0000001000000',
                        '0000011100000',
                        '0001111111000',
                        '0011111111100',
                        '0111111111110',
                        '0111111111110',
                        '0111111111110',
                        '0011111111100',
                        '0001111111000',
                        '0000111110000',
                        '0000011100000',
                        '0000000000000'
                    ],
                    colors: { '1': '#FF0000' }
                }
            ],
            'emoji': [
                {
                    name: '笑脸',
                    difficulty: '简单',
                    size: '15x15',
                    beadCount: 100,
                    pattern: [
                        '000000000000000',
                        '000001111100000',
                        '000111111111000',
                        '001111111111100',
                        '011111111111110',
                        '011111111111110',
                        '011111111111110',
                        '011111111111110',
                        '011111111111110',
                        '001111111111100',
                        '000111111111000',
                        '000011111110000',
                        '000001111100000',
                        '000000111000000',
                        '000000000000000'
                    ],
                    colors: { '1': '#FFD700' }
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.initBoard();
        this.setupColorPalette();
        this.setupEventListeners();
        this.drawBoard();
        this.updatePreview();
        this.updateStats();
    }
    
    setupCanvas() {
        // 设置主画布大小
        this.canvas.width = this.boardSize * this.cellSize;
        this.canvas.height = this.boardSize * this.cellSize;
        
        // 设置预览画布大小
        this.previewCanvas.width = 200;
        this.previewCanvas.height = 200;
    }
    
    initBoard() {
        // 初始化空白棋盘
        this.board = Array(this.boardSize).fill().map(() => 
            Array(this.boardSize).fill(null)
        );
    }
    
    setupColorPalette() {
        const colorsContainer = document.querySelector('.colors-container');
        colorsContainer.innerHTML = '';
        
        const brandPalette = this.brandPalettes[this.currentBrand];
        
        brandPalette.forEach(item => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = item.hex;
            swatch.dataset.color = item.hex;
            swatch.dataset.code = item.code;
            swatch.dataset.name = item.name;
            swatch.title = `${item.code} ${item.name}`;
            
            if (item.hex === this.currentColor) {
                swatch.classList.add('active');
            }
            
            swatch.addEventListener('click', () => this.selectColor(item.hex));
            colorsContainer.appendChild(swatch);
        });
    }
    
    setupEventListeners() {
        // 画布事件
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('mouseleave', () => this.handleMouseUp());
        
        // 工具按钮
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTool(e.target.dataset.tool));
        });
        
        // 品牌选择器
        document.getElementById('brandSelect').addEventListener('change', (e) => {
            this.switchBrand(e.target.value);
        });
        
        // 动作按钮
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearBoard());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveDesign());
        document.getElementById('ironBtn').addEventListener('click', () => this.ironBeads());
        document.getElementById('patternBtn').addEventListener('click', () => this.showPatternLibrary());
    }
    
    selectColor(color) {
        this.currentColor = color;
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.classList.toggle('active', swatch.dataset.color === color);
        });
    }
    
    selectTool(tool) {
        this.currentTool = tool;
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tool === tool);
        });
    }
    
    switchBrand(brand) {
        this.currentBrand = brand;
        this.colors = this.brandPalettes[brand].map(p => p.hex);
        this.currentColor = this.colors[0];
        this.setupColorPalette();
    }
    
    handleMouseDown(e) {
        this.isMouseDown = true;
        this.handleAction(e);
    }
    
    handleMouseMove(e) {
        if (this.isMouseDown) {
            this.handleAction(e);
        }
    }
    
    handleMouseUp() {
        this.isMouseDown = false;
    }
    
    handleAction(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        
        if (row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize) {
            switch (this.currentTool) {
                case 'place':
                    this.placeBead(row, col);
                    break;
                case 'erase':
                    this.eraseBead(row, col);
                    break;
                case 'fill':
                    this.fillArea(row, col);
                    break;
                case 'eyedropper':
                    this.pickColor(row, col);
                    break;
            }
        }
    }
    
    placeBead(row, col) {
        if (this.board[row][col] !== this.currentColor) {
            // 保存历史状态
            this.saveHistory();
            
            this.board[row][col] = this.currentColor;
            this.drawBoard();
            this.updatePreview();
            this.updateStats();
        }
    }
    
    eraseBead(row, col) {
        if (this.board[row][col] !== null) {
            this.saveHistory();
            this.board[row][col] = null;
            this.drawBoard();
            this.updatePreview();
            this.updateStats();
        }
    }
    
    fillArea(row, col) {
        const targetColor = this.board[row][col];
        if (targetColor === this.currentColor) return;
        
        this.saveHistory();
        this.floodFill(row, col, targetColor, this.currentColor);
        this.drawBoard();
        this.updatePreview();
        this.updateStats();
    }
    
    floodFill(row, col, targetColor, fillColor) {
        if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) return;
        if (this.board[row][col] !== targetColor) return;
        
        this.board[row][col] = fillColor;
        
        this.floodFill(row + 1, col, targetColor, fillColor);
        this.floodFill(row - 1, col, targetColor, fillColor);
        this.floodFill(row, col + 1, targetColor, fillColor);
        this.floodFill(row, col - 1, targetColor, fillColor);
    }
    
    pickColor(row, col) {
        if (this.board[row][col]) {
            this.selectColor(this.board[row][col]);
        }
    }
    
    drawBoard() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格背景
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格线
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.boardSize; i++) {
            // 垂直线
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.canvas.height);
            this.ctx.stroke();
            
            // 水平线
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.cellSize);
            this.ctx.stroke();
        }
        
        // 绘制珠子
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col]) {
                    this.drawBead(row, col, this.board[row][col]);
                }
            }
        }
    }
    
    drawBead(row, col, color) {
        const x = col * this.cellSize + this.cellSize / 2;
        const y = row * this.cellSize + this.cellSize / 2;
        
        // 绘制珠子阴影
        this.ctx.beginPath();
        this.ctx.arc(x + 1, y + 1, this.beadRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.ctx.fill();
        
        // 绘制珠子主体
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.beadRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // 绘制珠子高光
        this.ctx.beginPath();
        this.ctx.arc(x - 2, y - 2, this.beadRadius * 0.3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
        this.ctx.fill();
    }
    
    updatePreview() {
        const scale = 200 / (this.boardSize * this.cellSize);
        this.previewCtx.clearRect(0, 0, 200, 200);
        
        // 绘制缩小的预览
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col]) {
                    const x = col * this.cellSize * scale;
                    const y = row * this.cellSize * scale;
                    const size = this.cellSize * scale;
                    
                    this.previewCtx.fillStyle = this.board[row][col];
                    this.previewCtx.fillRect(x, y, size, size);
                }
            }
        }
    }
    
    updateStats() {
        let placed = 0;
        const colorCounts = new Map();
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col]) {
                    placed++;
                    const color = this.board[row][col];
                    colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
                }
            }
        }
        
        const total = this.boardSize * this.boardSize;
        const percent = total > 0 ? Math.round((placed / total) * 100) : 0;
        
        // 更新基础统计
        document.getElementById('placedCount').textContent = placed;
        document.getElementById('remainingCount').textContent = total - placed;
        
        // 更新进度条
        document.getElementById('progressFill').style.width = `${percent}%`;
        document.getElementById('progressPercent').textContent = `${percent}%`;
        document.getElementById('progressText').textContent = `${placed}/${total}`;
        
        // 更新按颜色统计
        this.updateColorProgress(colorCounts, placed);
    }
    
    updateColorProgress(colorCounts, totalPlaced) {
        const container = document.getElementById('colorProgressList');
        container.innerHTML = '';
        
        // 按使用频率排序
        const sortedColors = Array.from(colorCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // 只显示前10个颜色
        
        sortedColors.forEach(([color, count]) => {
            const percent = totalPlaced > 0 ? Math.round((count / totalPlaced) * 100) : 0;
            
            const item = document.createElement('div');
            item.className = 'color-progress-item';
            item.innerHTML = `
                <div class="color-progress-swatch" style="background-color: ${color}"></div>
                <div class="color-progress-bar">
                    <div class="color-progress-fill" style="width: ${percent}%"></div>
                </div>
                <span class="color-progress-text">${count}个</span>
            `;
            
            container.appendChild(item);
        });
    }
    
    saveHistory() {
        // 保存当前状态到历史记录
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(JSON.parse(JSON.stringify(this.board)));
        this.historyIndex = this.history.length - 1;
        
        // 限制历史记录大小
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.board = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
            this.drawBoard();
            this.updatePreview();
            this.updateStats();
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.board = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
            this.drawBoard();
            this.updatePreview();
            this.updateStats();
        }
    }
    
    clearBoard() {
        if (confirm('确定要清空整个棋盘吗？')) {
            this.saveHistory();
            this.initBoard();
            this.drawBoard();
            this.updatePreview();
            this.updateStats();
        }
    }
    
    saveDesign() {
        // 显示保存选项对话框
        this.showSaveDialog();
    }
    
    showSaveDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'save-dialog';
        dialog.innerHTML = `
            <div class="save-dialog-content">
                <h3>保存设计</h3>
                <div class="save-options">
                    <button class="save-option-btn" id="saveToLocalStorage">
                        <span class="save-icon">💾</span>
                        <span>保存到浏览器</span>
                    </button>
                    <button class="save-option-btn" id="saveAsPng">
                        <span class="save-icon">🖼️</span>
                        <span>导出为PNG</span>
                    </button>
                    <button class="save-option-btn" id="saveAsJson">
                        <span class="save-icon">📄</span>
                        <span>导出为JSON</span>
                    </button>
                    <button class="save-option-btn" id="loadFromLocalStorage">
                        <span class="save-icon">📂</span>
                        <span>从浏览器加载</span>
                    </button>
                    <button class="save-option-btn" id="loadFromJson">
                        <span class="save-icon">📁</span>
                        <span>从JSON加载</span>
                    </button>
                </div>
                <button class="action-btn secondary" id="closeSaveDialog">关闭</button>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 添加事件监听
        document.getElementById('saveToLocalStorage').addEventListener('click', () => {
            this.saveToLocalStorage();
            dialog.remove();
        });
        
        document.getElementById('saveAsPng').addEventListener('click', () => {
            this.saveAsPng();
            dialog.remove();
        });
        
        document.getElementById('saveAsJson').addEventListener('click', () => {
            this.saveAsJson();
            dialog.remove();
        });
        
        document.getElementById('loadFromLocalStorage').addEventListener('click', () => {
            this.loadFromLocalStorage();
            dialog.remove();
        });
        
        document.getElementById('loadFromJson').addEventListener('click', () => {
            this.loadFromJson();
            dialog.remove();
        });
        
        document.getElementById('closeSaveDialog').addEventListener('click', () => {
            dialog.remove();
        });
    }
    
    saveToLocalStorage() {
        const designData = {
            board: this.board,
            boardSize: this.boardSize,
            brand: this.currentBrand,
            timestamp: new Date().toISOString()
        };
        
        const designName = prompt('请输入设计名称:', `拼豆设计_${new Date().toLocaleDateString()}`);
        if (!designName) return;
        
        const savedDesigns = JSON.parse(localStorage.getItem('perlerBeadDesigns') || '{}');
        savedDesigns[designName] = designData;
        localStorage.setItem('perlerBeadDesigns', JSON.stringify(savedDesigns));
        
        alert(`设计 "${designName}" 已保存到浏览器！`);
    }
    
    saveAsPng() {
        const link = document.createElement('a');
        link.download = `拼豆设计_${new Date().toLocaleDateString()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    saveAsJson() {
        const designData = {
            board: this.board,
            boardSize: this.boardSize,
            brand: this.currentBrand,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(designData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `拼豆设计_${new Date().toLocaleDateString()}.json`;
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
    }
    
    loadFromLocalStorage() {
        const savedDesigns = JSON.parse(localStorage.getItem('perlerBeadDesigns') || '{}');
        const designNames = Object.keys(savedDesigns);
        
        if (designNames.length === 0) {
            alert('没有找到已保存的设计！');
            return;
        }
        
        // 显示设计列表
        const dialog = document.createElement('div');
        dialog.className = 'load-dialog';
        dialog.innerHTML = `
            <div class="load-dialog-content">
                <h3>加载设计</h3>
                <div class="design-list">
                    ${designNames.map(name => `
                        <div class="design-item" data-name="${name}">
                            <span class="design-name">${name}</span>
                            <span class="design-date">${new Date(savedDesigns[name].timestamp).toLocaleString()}</span>
                            <button class="delete-design-btn" data-name="${name}">删除</button>
                        </div>
                    `).join('')}
                </div>
                <button class="action-btn secondary" id="closeLoadDialog">关闭</button>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 添加事件监听
        document.querySelectorAll('.design-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-design-btn')) {
                    const name = e.target.dataset.name;
                    delete savedDesigns[name];
                    localStorage.setItem('perlerBeadDesigns', JSON.stringify(savedDesigns));
                    item.remove();
                    return;
                }
                
                const name = item.dataset.name;
                const designData = savedDesigns[name];
                this.loadDesignData(designData);
                dialog.remove();
            });
        });
        
        document.getElementById('closeLoadDialog').addEventListener('click', () => {
            dialog.remove();
        });
    }
    
    loadFromJson() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const designData = JSON.parse(event.target.result);
                    this.loadDesignData(designData);
                } catch (error) {
                    alert('无法解析JSON文件！');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    loadDesignData(designData) {
        if (!designData.board || !designData.boardSize) {
            alert('无效的设计数据！');
            return;
        }
        
        // 保存当前状态到历史记录
        this.saveHistory();
        
        // 加载设计数据
        this.board = designData.board;
        this.boardSize = designData.boardSize;
        
        // 如果有品牌信息，切换品牌
        if (designData.brand && this.brandPalettes[designData.brand]) {
            this.currentBrand = designData.brand;
            this.colors = this.brandPalettes[designData.brand].map(p => p.hex);
            document.getElementById('brandSelect').value = designData.brand;
            this.setupColorPalette();
        }
        
        // 更新画布大小
        this.setupCanvas();
        
        // 重新绘制
        this.drawBoard();
        this.updatePreview();
        this.updateStats();
        
        alert('设计加载成功！');
    }
    
    showPatternLibrary() {
        const dialog = document.createElement('div');
        dialog.className = 'pattern-dialog';
        dialog.innerHTML = `
            <div class="pattern-dialog-content">
                <h3>图案库</h3>
                <div class="pattern-categories">
                    <button class="category-btn active" data-category="animals">动物</button>
                    <button class="category-btn" data-category="food">食物</button>
                    <button class="category-btn" data-category="emoji">表情</button>
                </div>
                <div class="pattern-list" id="patternList">
                    ${this.renderPatternList('animals')}
                </div>
                <button class="action-btn secondary" id="closePatternDialog">关闭</button>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 添加事件监听
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('patternList').innerHTML = this.renderPatternList(e.target.dataset.category);
                this.addPatternItemListeners(dialog);
            });
        });
        
        this.addPatternItemListeners(dialog);
        
        document.getElementById('closePatternDialog').addEventListener('click', () => {
            dialog.remove();
        });
    }
    
    renderPatternList(category) {
        const patterns = this.presetPatterns[category] || [];
        return patterns.map(pattern => `
            <div class="pattern-item" data-name="${pattern.name}">
                <div class="pattern-preview">
                    <canvas class="pattern-canvas" width="150" height="150"></canvas>
                </div>
                <div class="pattern-info">
                    <h4>${pattern.name}</h4>
                    <p>难度: ${pattern.difficulty}</p>
                    <p>尺寸: ${pattern.size}</p>
                    <p>珠子: ${pattern.beadCount}个</p>
                </div>
            </div>
        `).join('');
    }
    
    addPatternItemListeners(dialog) {
        document.querySelectorAll('.pattern-item').forEach(item => {
            item.addEventListener('click', () => {
                const name = item.dataset.name;
                const category = document.querySelector('.category-btn.active').dataset.category;
                const pattern = this.presetPatterns[category].find(p => p.name === name);
                
                if (pattern) {
                    this.loadPattern(pattern);
                    dialog.remove();
                }
            });
        });
        
        // 绘制图案预览
        document.querySelectorAll('.pattern-canvas').forEach(canvas => {
            const item = canvas.closest('.pattern-item');
            const name = item.dataset.name;
            const category = document.querySelector('.category-btn.active').dataset.category;
            const pattern = this.presetPatterns[category].find(p => p.name === name);
            
            if (pattern) {
                this.drawPatternPreview(canvas, pattern);
            }
        });
    }
    
    drawPatternPreview(canvas, pattern) {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        const cellSize = size / pattern.pattern.length;
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, size, size);
        
        pattern.pattern.forEach((row, y) => {
            row.split('').forEach((cell, x) => {
                if (cell !== '0') {
                    const color = pattern.colors[cell] || '#333';
                    ctx.fillStyle = color;
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
                }
            });
        });
    }
    
    loadPattern(pattern) {
        // 保存当前状态到历史记录
        this.saveHistory();
        
        // 解析图案尺寸
        const [width, height] = pattern.size.split('x').map(Number);
        
        // 更新游戏板大小
        this.boardSize = Math.max(width, height);
        this.setupCanvas();
        
        // 初始化空白棋盘
        this.board = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(null));
        
        // 计算偏移量（居中显示）
        const offsetX = Math.floor((this.boardSize - width) / 2);
        const offsetY = Math.floor((this.boardSize - height) / 2);
        
        // 加载图案
        pattern.pattern.forEach((row, y) => {
            row.split('').forEach((cell, x) => {
                if (cell !== '0' && pattern.colors[cell]) {
                    const boardX = x + offsetX;
                    const boardY = y + offsetY;
                    if (boardX >= 0 && boardX < this.boardSize && boardY >= 0 && boardY < this.boardSize) {
                        this.board[boardY][boardX] = pattern.colors[cell];
                    }
                }
            });
        });
        
        // 重新绘制
        this.drawBoard();
        this.updatePreview();
        this.updateStats();
        
        alert(`图案 "${pattern.name}" 加载成功！`);
    }
    
    ironBeads() {
        // 检查是否有珠子
        let hasBeads = false;
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col]) {
                    hasBeads = true;
                    break;
                }
            }
            if (hasBeads) break;
        }
        
        if (!hasBeads) {
            alert('请先放置一些珠子再进行熨烫！');
            return;
        }
        
        // 显示熨烫选项对话框
        this.showIronDialog();
    }
    
    showIronDialog() {
        // 创建对话框
        const dialog = document.createElement('div');
        dialog.className = 'iron-dialog';
        dialog.innerHTML = `
            <div class="iron-dialog-content">
                <h3>熨烫设置</h3>
                <div class="iron-options">
                    <div class="iron-option">
                        <label>熨烫方式:</label>
                        <select id="ironSide">
                            <option value="single">单面熨烫</option>
                            <option value="double">双面熨烫</option>
                        </select>
                    </div>
                    <div class="iron-option">
                        <label>温度:</label>
                        <input type="range" id="ironTemp" min="1" max="5" value="3">
                        <span id="tempDisplay">中</span>
                    </div>
                    <div class="iron-option">
                        <label>时间:</label>
                        <input type="range" id="ironTime" min="1" max="10" value="5">
                        <span id="timeDisplay">5秒</span>
                    </div>
                </div>
                <div class="iron-buttons">
                    <button class="action-btn" id="startIronBtn">开始熨烫</button>
                    <button class="action-btn secondary" id="cancelIronBtn">取消</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 添加事件监听
        document.getElementById('ironTemp').addEventListener('input', (e) => {
            const tempNames = ['低', '中低', '中', '中高', '高'];
            document.getElementById('tempDisplay').textContent = tempNames[e.target.value - 1];
        });
        
        document.getElementById('ironTime').addEventListener('input', (e) => {
            document.getElementById('timeDisplay').textContent = `${e.target.value}秒`;
        });
        
        document.getElementById('startIronBtn').addEventListener('click', () => {
            const side = document.getElementById('ironSide').value;
            const temp = parseInt(document.getElementById('ironTemp').value);
            const time = parseInt(document.getElementById('ironTime').value);
            dialog.remove();
            this.startIronAnimation(side, temp, time);
        });
        
        document.getElementById('cancelIronBtn').addEventListener('click', () => {
            dialog.remove();
        });
    }
    
    startIronAnimation(side, temp, time) {
        // 保存当前状态
        this.saveHistory();
        
        // 创建熨烫动画
        const animationDuration = time * 1000; // 转换为毫秒
        const startTime = Date.now();
        
        // 创建临时画布用于动画
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        
        // 复制当前画布内容
        tempCtx.drawImage(this.canvas, 0, 0);
        
        // 开始动画
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            // 清空画布
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 绘制背景
            this.ctx.fillStyle = '#f0f0f0';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 绘制网格
            this.drawGrid();
            
            // 绘制珠子（带熔化效果）
            this.drawMeltedBeads(progress, temp);
            
            // 绘制熨斗（如果正在熨烫）
            if (progress < 1) {
                this.drawIron(progress);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // 熨烫完成
                this.ironComplete(side, temp);
            }
        };
        
        animate();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.boardSize; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.cellSize);
            this.ctx.stroke();
        }
    }
    
    drawMeltedBeads(progress, temp) {
        const meltFactor = progress * (temp / 5); // 熔化程度
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col]) {
                    const x = col * this.cellSize + this.cellSize / 2;
                    const y = row * this.cellSize + this.cellSize / 2;
                    
                    // 计算熔化后的大小和形状
                    const baseRadius = this.beadRadius;
                    const meltedRadius = baseRadius * (1 + meltFactor * 0.5);
                    const opacity = 1 - meltFactor * 0.3;
                    
                    // 绘制熔化的珠子
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, meltedRadius, 0, Math.PI * 2);
                    this.ctx.fillStyle = this.board[row][col];
                    this.ctx.globalAlpha = opacity;
                    this.ctx.fill();
                    
                    // 添加熔化效果（边缘模糊）
                    if (meltFactor > 0.1) {
                        this.ctx.beginPath();
                        this.ctx.arc(x, y, meltedRadius * 1.2, 0, Math.PI * 2);
                        this.ctx.fillStyle = this.board[row][col];
                        this.ctx.globalAlpha = opacity * 0.3;
                        this.ctx.fill();
                    }
                    
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    drawIron(progress) {
        // 计算熨斗位置（从左上角到右下角）
        const ironSize = this.cellSize * 3;
        const startX = -ironSize;
        const startY = -ironSize;
        const endX = this.canvas.width;
        const endY = this.canvas.height;
        
        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;
        
        // 绘制熨斗
        this.ctx.save();
        this.ctx.translate(currentX, currentY);
        
        // 熨斗主体
        this.ctx.fillStyle = '#8B0000';
        this.ctx.fillRect(-ironSize/2, -ironSize/4, ironSize, ironSize/2);
        
        // 熨斗底部
        this.ctx.fillStyle = '#666';
        this.ctx.fillRect(-ironSize/2, ironSize/4, ironSize, 10);
        
        // 熨斗手柄
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(-ironSize/4, -ironSize/2, ironSize/2, ironSize/4);
        
        this.ctx.restore();
    }
    
    ironComplete(side, temp) {
        // 显示完成消息
        const message = side === 'single' ? '单面熨烫完成！' : '双面熨烫完成！';
        alert(`${message}\n温度: ${['低', '中低', '中', '中高', '高'][temp - 1]}`);
        
        // 重新绘制最终状态
        this.drawBoard();
        this.updatePreview();
    }
}

// 图片导入处理类
class ImageImporter {
    constructor(game) {
        this.game = game;
        this.originalImage = null;
        this.convertedPattern = null;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // 文件选择
        document.getElementById('selectImageBtn').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });
        
        document.getElementById('imageInput').addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });
        
        // 拖放支持
        const dropZone = document.querySelector('.image-import');
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#667eea';
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = '#e0e0e0';
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#e0e0e0';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFileSelect(file);
            }
        });
        
        // 转换设置
        document.getElementById('gridSize').addEventListener('change', (e) => {
            const customSize = document.getElementById('customSize');
            customSize.style.display = e.target.value === 'custom' ? 'block' : 'none';
        });
        
        // 转换按钮
        document.getElementById('convertBtn').addEventListener('click', () => {
            this.convertImage();
        });
        
        // 重置按钮
        document.getElementById('resetImageBtn').addEventListener('click', () => {
            this.reset();
        });
    }
    
    handleFileSelect(file) {
        if (!file) return;
        
        // 验证文件类型
        if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
            alert('请选择 JPG、PNG 或 WebP 格式的图片');
            return;
        }
        
        // 显示文件信息
        document.getElementById('fileInfo').textContent = file.name;
        
        // 读取文件
        const reader = new FileReader();
        reader.onload = (e) => {
            this.loadImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    
    loadImage(src) {
        const img = new Image();
        img.onload = () => {
            this.originalImage = img;
            this.showPreview(src);
            this.showSettings();
        };
        img.src = src;
    }
    
    showPreview(src) {
        const preview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        previewImg.src = src;
        preview.style.display = 'block';
    }
    
    showSettings() {
        document.getElementById('conversionSettings').style.display = 'flex';
    }
    
    convertImage() {
        if (!this.originalImage) {
            alert('请先选择图片');
            return;
        }
        
        // 获取转换参数
        const gridSize = this.getGridSize();
        const colorCount = parseInt(document.getElementById('colorCount').value);
        const brightness = parseInt(document.getElementById('brightness').value);
        const contrast = parseInt(document.getElementById('contrast').value);
        
        // 创建临时画布处理图片
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = gridSize;
        tempCanvas.height = gridSize;
        
        // 绘制缩放后的图片
        tempCtx.drawImage(this.originalImage, 0, 0, gridSize, gridSize);
        
        // 获取像素数据
        const imageData = tempCtx.getImageData(0, 0, gridSize, gridSize);
        const pixels = imageData.data;
        
        // 应用亮度和对比度调整
        this.adjustImage(pixels, brightness, contrast);
        
        // 转换为拼豆颜色
        this.convertedPattern = this.convertToBeadColors(pixels, gridSize, colorCount);
        
        // 应用到游戏板
        this.applyToGameBoard(gridSize);
        
        // 显示颜色用量
        this.showColorUsage();
        
        // 更新游戏板大小
        this.game.boardSize = gridSize;
        this.game.setupCanvas();
        this.game.drawBoard();
        this.game.updatePreview();
        this.game.updateStats();
    }
    
    getGridSize() {
        const gridSizeSelect = document.getElementById('gridSize');
        if (gridSizeSelect.value === 'custom') {
            return parseInt(document.getElementById('customSize').value) || 29;
        }
        return parseInt(gridSizeSelect.value);
    }
    
    adjustImage(pixels, brightness, contrast) {
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        
        for (let i = 0; i < pixels.length; i += 4) {
            // 应用亮度
            pixels[i] = Math.max(0, Math.min(255, pixels[i] + brightness));
            pixels[i + 1] = Math.max(0, Math.min(255, pixels[i + 1] + brightness));
            pixels[i + 2] = Math.max(0, Math.min(255, pixels[i + 2] + brightness));
            
            // 应用对比度
            pixels[i] = Math.max(0, Math.min(255, factor * (pixels[i] - 128) + 128));
            pixels[i + 1] = Math.max(0, Math.min(255, factor * (pixels[i + 1] - 128) + 128));
            pixels[i + 2] = Math.max(0, Math.min(255, factor * (pixels[i + 2] - 128) + 128));
        }
    }
    
    convertToBeadColors(pixels, gridSize, colorLimit) {
        const pattern = [];
        const colorMap = new Map();
        
        for (let y = 0; y < gridSize; y++) {
            pattern[y] = [];
            for (let x = 0; x < gridSize; x++) {
                const i = (y * gridSize + x) * 4;
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                
                // 找到最接近的拼豆颜色
                const beadColor = this.findClosestBeadColor(r, g, b);
                pattern[y][x] = beadColor;
                
                // 统计颜色用量
                colorMap.set(beadColor, (colorMap.get(beadColor) || 0) + 1);
            }
        }
        
        // 如果需要限制颜色数量
        if (colorLimit > 0 && colorMap.size > colorLimit) {
            return this.limitColors(pattern, colorMap, colorLimit, gridSize);
        }
        
        return pattern;
    }
    
    findClosestBeadColor(r, g, b) {
        let closestColor = this.game.colors[0];
        let minDistance = Infinity;
        
        for (const color of this.game.colors) {
            const colorRgb = this.hexToRgb(color);
            const distance = this.colorDistance(r, g, b, colorRgb.r, colorRgb.g, colorRgb.b);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = color;
            }
        }
        
        return closestColor;
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }
    
    colorDistance(r1, g1, b1, r2, g2, b2) {
        // 使用加权欧氏距离，考虑人眼对颜色的感知
        const rmean = (r1 + r2) / 2;
        const dr = r1 - r2;
        const dg = g1 - g2;
        const db = b1 - b2;
        return Math.sqrt((2 + rmean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rmean) / 256) * db * db);
    }
    
    limitColors(pattern, colorMap, colorLimit, gridSize) {
        // 按使用频率排序颜色
        const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, colorLimit)
            .map(entry => entry[0]);
        
        // 将不在限制列表中的颜色替换为最接近的限制颜色
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (!sortedColors.includes(pattern[y][x])) {
                    pattern[y][x] = this.findClosestColorInList(pattern[y][x], sortedColors);
                }
            }
        }
        
        return pattern;
    }
    
    findClosestColorInList(targetColor, colorList) {
        const targetRgb = this.hexToRgb(targetColor);
        let closestColor = colorList[0];
        let minDistance = Infinity;
        
        for (const color of colorList) {
            const colorRgb = this.hexToRgb(color);
            const distance = this.colorDistance(
                targetRgb.r, targetRgb.g, targetRgb.b,
                colorRgb.r, colorRgb.g, colorRgb.b
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = color;
            }
        }
        
        return closestColor;
    }
    
    applyToGameBoard(gridSize) {
        // 保存当前状态到历史记录
        this.game.saveHistory();
        
        // 初始化新的游戏板
        this.game.board = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
        
        // 应用转换后的图案
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (this.convertedPattern[y][x]) {
                    this.game.board[y][x] = this.convertedPattern[y][x];
                }
            }
        }
    }
    
    showColorUsage() {
        const usageContainer = document.getElementById('colorUsage');
        const usageList = document.getElementById('usageList');
        usageContainer.style.display = 'block';
        
        // 统计颜色用量
        const colorCounts = new Map();
        for (let y = 0; y < this.convertedPattern.length; y++) {
            for (let x = 0; x < this.convertedPattern[y].length; x++) {
                const color = this.convertedPattern[y][x];
                if (color) {
                    colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
                }
            }
        }
        
        // 按用量排序
        const sortedColors = Array.from(colorCounts.entries())
            .sort((a, b) => b[1] - a[1]);
        
        // 生成用量列表
        usageList.innerHTML = sortedColors.map(([color, count]) => `
            <div class="usage-item">
                <div class="usage-color" style="background-color: ${color}"></div>
                <span>${color}</span>
                <span class="usage-count">${count} 个</span>
            </div>
        `).join('');
    }
    
    reset() {
        this.originalImage = null;
        this.convertedPattern = null;
        
        // 重置UI
        document.getElementById('imageInput').value = '';
        document.getElementById('fileInfo').textContent = '支持 JPG、PNG、WebP';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('conversionSettings').style.display = 'none';
        document.getElementById('colorUsage').style.display = 'none';
        
        // 重置设置
        document.getElementById('gridSize').value = '29';
        document.getElementById('customSize').style.display = 'none';
        document.getElementById('colorCount').value = '0';
        document.getElementById('brightness').value = 0;
        document.getElementById('contrast').value = 0;
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.game = new PerlerBeadGame();
    window.imageImporter = new ImageImporter(window.game);
});