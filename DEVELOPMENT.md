# Tyche 服务器开发规范

## 项目目录结构

所有项目统一放在 `/home/tyche/` 目录下：

```
/home/tyche/
├── tyche-site/           → tyche.love（主站）
├── analytics/            → analytics.tyche.love（数据统计）
├── news-site/            → news.tyche.love（新闻日报）
├── fortune-teller/       → fortune.tyche.love（命理运势）
├── resume-builder/       → resume.tyche.love（简历制作）
└── [新项目目录]          → [子域名].tyche.love
```

---

## 服务管理

### Caddy（反向代理）

**配置文件**：`/etc/caddy/Caddyfile`（唯一，不要在其他地方创建 Caddyfile）

**管理命令**：
```bash
# 查看状态
systemctl status caddy

# 启动
systemctl start caddy

# 停止
systemctl stop caddy

# 重启
systemctl restart caddy

# 重新加载配置（修改 Caddyfile 后执行）
systemctl reload caddy

# 查看日志
journalctl -u caddy -f
```

### PM2（Node.js 进程管理）

**配置文件**：每个项目根目录下的 `ecosystem.config.js`

**管理命令**：
```bash
# 查看所有进程状态
pm2 status

# 启动项目
pm2 start /home/tyche/[项目名]/ecosystem.config.js

# 重启项目
pm2 restart [项目名]

# 停止项目
pm2 stop [项目名]

# 删除项目
pm2 delete [项目名]

# 查看日志
pm2 logs [项目名]

# 保存当前进程列表（开机自启）
pm2 save

# 恢复进程列表
pm2 resurrect
```

---

## 新项目部署流程

### 1. 创建项目目录

```bash
cd /home/tyche
mkdir [项目名]
cd [项目名]
```

### 2. 开发项目

按照项目类型（Next.js、Express、静态站点等）进行开发。

### 3. 创建 PM2 配置

在项目根目录创建 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [{
    name: '项目名称',
    script: 'npm',        // 或 'node', 'pnpm' 等
    args: 'start',        // 启动命令参数
    cwd: '/home/tyche/[项目名]',  // 项目目录（必须用绝对路径）
    env: {
      NODE_ENV: 'production',
      PORT: 3000,         // 端口号（每个项目不同）
      // 其他环境变量...
    }
  }]
}
```

**端口分配**：
| 项目 | 端口 |
|------|------|
| news-site | 3031 |
| analytics | 3033 |
| resume-builder | 3000 |
| 新项目 | 3035+ （递增） |

### 4. 启动项目

```bash
pm2 start /home/tyche/[项目名]/ecosystem.config.js
```

### 5. 配置 Caddy

编辑 `/etc/caddy/Caddyfile`，添加新站点：

```caddyfile
[子域名].tyche.love {
    reverse_proxy localhost:[端口号]
    encode gzip
}
```

对于静态站点：
```caddyfile
[子域名].tyche.love {
    root * /home/tyche/[项目名]
    file_server
    encode gzip
}
```

### 6. 重新加载 Caddy

```bash
systemctl reload caddy
```

### 7. 保存 PM2 进程列表

```bash
pm2 save
```

---

## 注意事项

### ⚠️ 必须遵守

1. **所有项目放在 `/home/tyche/` 下**，不要放在其他目录
2. **Caddyfile 只在 `/etc/caddy/Caddyfile`**，不要在项目目录创建
3. **ecosystem.config.js 中的 cwd 必须用绝对路径**
4. **每个项目使用不同的端口号**
5. **修改 Caddyfile 后必须执行 `systemctl reload caddy`**

### ⚠️ 避免操作

1. **不要直接修改 `/usr/lib/systemd/system/caddy.service`**
2. **不要用 `nohup` 手动运行 Caddy**
3. **不要覆盖他人的 Caddyfile 配置**
4. **不要在 PM2 中使用相对路径**

---

## 常见问题

### Q: 网站返回 502 错误
A: 检查对应的 Node.js 服务是否运行：`pm2 status`

### Q: 网站无法访问
A: 检查 Caddy 是否运行：`systemctl status caddy`

### Q: 修改配置后不生效
A: Caddy 配置修改后执行 `systemctl reload caddy`

### Q: 服务器重启后服务丢失
A: 执行 `pm2 resurrect` 恢复进程列表

---

## 当前服务列表

| 域名 | 项目 | 端口 | 状态 |
|------|------|------|------|
| tyche.love | tyche-site | 静态 | ✅ |
| analytics.tyche.love | analytics | 3033 | ✅ |
| news.tyche.love | news-site | 3031 | ✅ |
| fortune.tyche.love | fortune-teller | 静态 | ✅ |
| resume.tyche.love | resume-builder | 3000 | ✅ |

---

*最后更新：2026-05-02*