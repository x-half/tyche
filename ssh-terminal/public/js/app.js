const $ = (id) => document.getElementById(id);

let ws = null;
let connected = false;
let term = null;
let fitAddon = null;
let currentConnectData = null;

const HISTORY_KEY = 'ssh_history';
const MAX_HISTORY = 10;

// History
function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function saveHistory(data) {
  let h = getHistory().filter(i => !(i.host === data.host && i.port === data.port && i.username === data.username));
  h.unshift({ host: data.host, port: data.port, username: data.username, authType: data.authType });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, MAX_HISTORY)));
  renderHistory();
}

function removeHistory(host, port, username) {
  let h = getHistory().filter(i => !(i.host === host && i.port === port && i.username === username));
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  renderHistory();
}

function renderHistory() {
  const list = getHistory().slice(0, 2);
  const el = $('history-list');
  if (!el) return;
  
  if (!list.length) {
    el.innerHTML = '<div class="history-empty">暂无记录</div>';
    return;
  }
  
  el.innerHTML = list.map(h => `
    <div class="history-item" data-host="${h.host}" data-port="${h.port}" data-user="${h.username}" data-auth="${h.authType}">
      <div class="info">
        <span class="icon">${h.authType === 'password' ? '🔑' : '🔐'}</span>
        <div class="text">
          <span class="name">${h.username}@${h.host}</span>
          <span class="port">:${h.port}</span>
        </div>
      </div>
      <button class="del" onclick="event.stopPropagation();removeHistory('${h.host}',${h.port},'${h.username}')">×</button>
    </div>
  `).join('');
  
  el.querySelectorAll('.history-item').forEach(item => {
    item.onclick = () => {
      $('host').value = item.dataset.host;
      $('port').value = item.dataset.port;
      $('username').value = item.dataset.user;
      const auth = item.dataset.auth;
      document.querySelectorAll('.auth-switch button').forEach(b => b.classList.remove('active'));
      document.querySelector(`.auth-switch button[data-auth="${auth}"]`).classList.add('active');
      $('password-group').classList.toggle('hidden', auth !== 'password');
      $('key-group').classList.toggle('hidden', auth !== 'privateKey');
      auth === 'password' ? $('password').focus() : $('private-key').focus();
    };
  });
}

// Terminal
function initTerminal() {
  term = new Terminal({
    cursorBlink: true,
    cursorStyle: 'bar',
    fontSize: 14,
    fontFamily: '"Menlo","Monaco","Courier New","Noto Sans Mono CJK SC","Microsoft YaHei",monospace',
    lineHeight: 1.3,
    scrollback: 5000,
    allowProposedApi: true,
    theme: {
      background: '#0d1117',
      foreground: '#c9d1d9',
      cursor: '#00d4ff',
      selectionBackground: '#264f78',
      black: '#0d1117',
      red: '#ff7b72',
      green: '#3fb950',
      yellow: '#d29922',
      blue: '#58a6ff',
      magenta: '#bc8cff',
      cyan: '#39d353',
      white: '#c9d1d9',
      brightBlack: '#484f58',
      brightRed: '#ffa198',
      brightGreen: '#56d364',
      brightYellow: '#e3b341',
      brightBlue: '#79c0ff',
      brightMagenta: '#d2a8ff',
      brightCyan: '#56d364',
      brightWhite: '#f0f6fc'
    }
  });
  
  fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.loadAddon(new WebLinksAddon.WebLinksAddon());
  
  term.onData(data => {
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'data', data }));
  });
  
  term.onResize(({ cols, rows }) => {
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'resize', cols, rows }));
    if ($('terminal-size')) $('terminal-size').textContent = `${cols}×${rows}`;
  });
}

function showPage(page) {
  $('ssh-connect-page').classList.add('hidden');
  $('terminal-page').classList.add('hidden');
  page.classList.remove('hidden');
}

function showError(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `
    <div class="toast-icon">✕</div>
    <div class="toast-body">
      <div class="toast-title">连接失败</div>
      <div class="toast-msg">${msg}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  document.body.appendChild(t);
  setTimeout(() => { if (t.parentElement) { t.classList.add('toast-hide'); setTimeout(() => t.remove(), 300); } }, 6000);
}

function showQueue(msg) {
  $('queue-status').classList.remove('hidden');
  $('queue-message').textContent = msg;
  $('connect-btn').disabled = true;
  $('connect-btn').textContent = '排队中...';
}

function hideQueue() {
  $('queue-status').classList.add('hidden');
  $('connect-btn').disabled = false;
  $('connect-btn').textContent = '连接';
}

async function fetchStatus() {
  try {
    const d = await (await fetch('/api/status')).json();
    $('server-status').textContent = `${d.active}/${d.max}`;
  } catch {}
}

// Auth switch
document.querySelectorAll('.auth-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.auth-switch button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const auth = btn.dataset.auth;
    $('password-group').classList.toggle('hidden', auth !== 'password');
    $('key-group').classList.toggle('hidden', auth !== 'privateKey');
  });
});

// Connect
$('connect-form').addEventListener('submit', e => {
  e.preventDefault();
  connect();
});

function connect() {
  const host = $('host').value.trim();
  const port = parseInt($('port').value) || 22;
  const username = $('username').value.trim();
  const authType = document.querySelector('.auth-switch button.active').dataset.auth;
  
  if (!host || !username) return showError('请填写主机和用户名');
  
  const data = { type: 'connect', host, port, username, authType };
  if (authType === 'password') {
    data.password = $('password').value;
    if (!data.password) return showError('请输入密码');
  } else {
    data.privateKey = $('private-key').value;
    if (!data.privateKey) return showError('请输入私钥');
    data.passphrase = $('passphrase').value;
  }
  
  currentConnectData = data;
  $('connect-btn').disabled = true;
  $('connect-btn').textContent = '连接中...';
  
  if (!term) initTerminal();
  
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  ws = new WebSocket(`${proto}//${location.host}/ws`);
  
  ws.onopen = () => ws.send(JSON.stringify(data));
  
  ws.onmessage = e => {
    let msg;
    try { msg = JSON.parse(e.data); } catch { return; }
    
    switch (msg.type) {
      case 'connected':
        connected = true;
        hideQueue();
        saveHistory(currentConnectData);
        showPage($('terminal-page'));
        term.open($('terminal'));
        setTimeout(() => { fitAddon.fit(); term.focus(); }, 50);
        $('connection-info').textContent = `${username}@${host}:${port}`;
        $('status-text').textContent = '已连接';
        $('status-text').className = 'status-connected';
        $('terminal-size').textContent = `${term.cols}×${term.rows}`;
        window.addEventListener('resize', () => fitAddon.fit());
        break;
      case 'data':
        term.write(msg.data);
        break;
      case 'queued':
        showQueue(msg.message);
        break;
      case 'queue-update':
        $('queue-message').textContent = msg.message;
        break;
      case 'error':
        hideQueue();
        if (connected) disconnect();
        else { resetBtn(); showError(msg.data); }
        break;
      case 'closed':
        disconnect();
        break;
    }
  };
  
  ws.onerror = () => { hideQueue(); resetBtn(); showError('连接失败'); };
  ws.onclose = () => { hideQueue(); resetBtn(); };
}

function disconnect() {
  connected = false;
  if (ws) { ws.send(JSON.stringify({ type: 'disconnect' })); ws.close(); ws = null; }
  if (term) term.clear();
  hideQueue();
  resetBtn();
  showPage($('ssh-connect-page'));
  fetchStatus();
}

function resetBtn() {
  $('connect-btn').disabled = false;
  $('connect-btn').textContent = '连接';
}

$('new-tab-btn').onclick = () => { disconnect(); showPage($('ssh-connect-page')); };
$('disconnect-btn').onclick = () => disconnect();

fetchStatus();
renderHistory();
setInterval(fetchStatus, 10000);
