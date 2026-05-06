const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const { Client } = require('ssh2');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 连接池管理
const MAX_CONNECTIONS = 50;
let activeConnections = 0;
const waitingQueue = []; // 等待队列：{ ws, msg, timestamp }

const IDLE_TIMEOUT = 30 * 60 * 1000;

// 分配连接
function allocateConnection(ws, msg) {
  if (activeConnections >= MAX_CONNECTIONS) {
    // 加入等待队列
    const queueItem = { ws, msg, timestamp: Date.now() };
    waitingQueue.push(queueItem);
    
    ws.send(JSON.stringify({
      type: 'queued',
      position: waitingQueue.length,
      message: `当前连接数已满(${activeConnections}/${MAX_CONNECTIONS})，您在队列中排第 ${waitingQueue.length} 位`
    }));
    
    // 监听ws关闭，从队列移除
    ws.on('close', () => {
      const index = waitingQueue.indexOf(queueItem);
      if (index > -1) {
        waitingQueue.splice(index, 1);
        updateQueuePositions();
      }
    });
    
    return;
  }
  
  // 直接建立连接
  activeConnections++;
  ws.send(JSON.stringify({ type: 'connecting', active: activeConnections, max: MAX_CONNECTIONS }));
  createSSHConnection(ws, msg);
}

// 更新队列位置
function updateQueuePositions() {
  waitingQueue.forEach((item, index) => {
    if (item.ws.readyState === 1) {
      item.ws.send(JSON.stringify({
        type: 'queue-update',
        position: index + 1,
        message: `您在队列中排第 ${index + 1} 位`
      }));
    }
  });
}

// 处理连接释放
function releaseConnection(ws) {
  activeConnections--;
  
  // 从等待队列取出下一个
  while (waitingQueue.length > 0) {
    const next = waitingQueue.shift();
    if (next.ws.readyState === 1) {
      activeConnections++;
      next.ws.send(JSON.stringify({
        type: 'connecting',
        active: activeConnections,
        max: MAX_CONNECTIONS,
        message: '队列轮到您了，正在连接...'
      }));
      createSSHConnection(next.ws, next.msg);
      break;
    }
    // 如果ws已关闭，跳过继续取下一个
  }
  
  updateQueuePositions();
}

// 创建SSH连接
function createSSHConnection(ws, msg) {
  const sshClient = new Client();
  ws.sshClient = sshClient;
  ws.sshStream = null;
  ws.idleTimer = null;
  
  const resetIdleTimer = () => {
    if (ws.idleTimer) clearTimeout(ws.idleTimer);
    ws.idleTimer = setTimeout(() => {
      ws.send(JSON.stringify({ type: 'error', data: '连接超时：30分钟无操作' }));
      cleanupAndClose(ws);
    }, IDLE_TIMEOUT);
  };
  
  sshClient.on('ready', () => {
    resetIdleTimer();
    sshClient.shell({
      term: msg.term || 'xterm-256color',
      cols: msg.cols || 80,
      rows: msg.rows || 24,
      env: {
        LANG: 'en_US.UTF-8',
        LC_ALL: 'en_US.UTF-8'
      }
    }, (err, stream) => {
      if (err) {
        ws.send(JSON.stringify({ type: 'error', data: err.message }));
        cleanupAndClose(ws);
        return;
      }
      ws.sshStream = stream;
      ws.send(JSON.stringify({ type: 'connected' }));
      
      stream.on('data', (data) => {
        resetIdleTimer();
        ws.send(JSON.stringify({ type: 'data', data: data.toString('utf-8') }));
      });
      
      stream.on('close', () => {
        cleanupAndClose(ws);
      });
      
      stream.stderr.on('data', (data) => {
        ws.send(JSON.stringify({ type: 'data', data: data.toString('utf-8') }));
      });
    });
  });
  
  sshClient.on('error', (err) => {
    ws.send(JSON.stringify({ type: 'error', data: err.message }));
    cleanupAndClose(ws);
  });
  
  sshClient.on('close', () => {
    cleanupAndClose(ws);
  });
  
  const connectConfig = {
    host: msg.host,
    port: msg.port || 22,
    username: msg.username,
  };
  
  if (msg.authType === 'password') {
    connectConfig.password = msg.password;
  } else if (msg.authType === 'privateKey') {
    connectConfig.privateKey = msg.privateKey;
    if (msg.passphrase) connectConfig.passphrase = msg.passphrase;
  }
  
  sshClient.connect(connectConfig);
}

// 清理并关闭
function cleanupAndClose(ws) {
  if (ws.idleTimer) {
    clearTimeout(ws.idleTimer);
    ws.idleTimer = null;
  }
  if (ws.sshStream) {
    ws.sshStream.close();
    ws.sshStream = null;
  }
  if (ws.sshClient) {
    ws.sshClient.end();
    ws.sshClient = null;
  }
  if (ws._connectionCounted) {
    ws._connectionCounted = false;
    releaseConnection(ws);
  }
  if (ws.readyState === 1) {
    ws.send(JSON.stringify({ type: 'closed' }));
    ws.close();
  }
}

// WebSocket连接
wss.on('connection', (ws) => {
  ws._connectionCounted = false;
  
  ws.on('message', (data) => {
    let msg;
    try {
      msg = JSON.parse(data);
    } catch (e) {
      if (ws.sshStream) ws.sshStream.write(data);
      return;
    }
    
    switch (msg.type) {
      case 'connect':
        ws._connectionCounted = true;
        allocateConnection(ws, msg);
        break;
        
      case 'data':
        if (ws.sshStream) {
          ws.sshStream.write(msg.data);
          if (ws.idleTimer) {
            clearTimeout(ws.idleTimer);
            ws.idleTimer = setTimeout(() => {
              ws.send(JSON.stringify({ type: 'error', data: '连接超时：30分钟无操作' }));
              cleanupAndClose(ws);
            }, IDLE_TIMEOUT);
          }
        }
        break;
        
      case 'resize':
        if (ws.sshStream) ws.sshStream.setWindow(msg.rows, msg.cols);
        break;
        
      case 'disconnect':
        cleanupAndClose(ws);
        break;
    }
  });
  
  ws.on('close', () => {
    // 从等待队列移除
    const queueIndex = waitingQueue.findIndex(item => item.ws === ws);
    if (queueIndex > -1) {
      waitingQueue.splice(queueIndex, 1);
      updateQueuePositions();
    }
    
    // 释放连接
    if (ws._connectionCounted) {
      ws._connectionCounted = false;
      releaseConnection(ws);
    } else {
      // 清理可能存在的SSH连接
      if (ws.idleTimer) clearTimeout(ws.idleTimer);
      if (ws.sshStream) ws.sshStream.close();
      if (ws.sshClient) ws.sshClient.end();
    }
  });
});

// 状态API
app.get('/api/status', (req, res) => {
  res.json({
    active: activeConnections,
    max: MAX_CONNECTIONS,
    waiting: waitingQueue.length
  });
});

const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
  console.log(`SSH Terminal running on port ${PORT}`);
  console.log(`Max connections: ${MAX_CONNECTIONS}`);
});
