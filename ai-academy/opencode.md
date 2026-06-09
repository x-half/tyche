# AI Academy 项目开发指南

## 项目概述

- **技术栈**: Next.js 16.2.6 + Prisma + SQLite + NextAuth
- **主应用**: 端口 3002（ai.tyche.love）
- **管理后台**: 端口 3001（仅内网访问 http://10.1.0.7:3001）
- **品牌**: 学AI

---

## 部署架构

### 域名配置

| 域名 | 用途 | 访问方式 |
|------|------|----------|
| ai.tyche.love | 主应用 | 公网 HTTPS |
| aistudy.tyche.love | 重定向到 ai.tyche.love | 公网 |
| 10.1.0.7:3001 | 管理后台 | 仅内网 |

### 服务管理

```bash
# 主应用
pm2 restart ai-academy

# 管理后台
pm2 restart ai-admin

# 查看状态
pm2 status

# 查看日志
pm2 logs ai-academy
pm2 logs ai-admin
```

### Caddy 配置

配置文件: `/etc/caddy/Caddyfile`

- Caddy 自动申请 SSL 证书
- 修改后需 `systemctl reload caddy`

---

## 踩坑记录

### 1. OpenCode 后台代理 API Key 问题

**问题**: explore/librarian/oracle 后台代理报 "invalid api key"

**原因**: 
- 插件默认使用 `minimax-cn/MiniMax-M2.7-highspeed` 模型
- 需要配置使用 `xiaomi-token-plan-cn/mimo-v2.5-pro`

**解决方案**:

修改 `/root/.config/opencode/opencode.jsonc`:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["oh-my-openagent"],
  "model": "xiaomi-token-plan-cn/mimo-v2.5-pro",
  "agent": {
    "explore": { "model": "xiaomi-token-plan-cn/mimo-v2.5-pro" },
    "librarian": { "model": "xiaomi-token-plan-cn/mimo-v2.5-pro" },
    "oracle": { "model": "xiaomi-token-plan-cn/mimo-v2.5-pro" }
  }
}
```

设置环境变量 `~/.bashrc`:
```bash
export XIAOMI_API_KEY="tp-cuoynvmqewosga8e2pq1ppwzkyq6qle2wm7988po0ej5e561"
```

**注意**: 修改配置后需重启 OpenCode 会话

---

### 2. 管理后台 Prisma Client 问题

**问题**: 管理后台构建时报 "Prisma Client did not initialize yet"

**原因**: admin-app 和主应用共用同一个 Prisma schema，但 node_modules 分离

**解决方案**:
```bash
# 创建符号链接
ln -s /home/tyche/ai-academy/node_modules/.prisma /home/tyche/ai-academy/admin-app/node_modules/.prisma
ln -s /home/tyche/ai-academy/node_modules/@prisma /home/tyche/ai-academy/admin-app/node_modules/@prisma
```

---

### 3. 端口冲突

**问题**: 主应用启动失败 "EADDRINUSE: address already in use :::3000"

**原因**: resume-builder 占用了端口 3000

**解决方案**: 主应用改为端口 3002

---

### 4. 课程详情页交互问题

**问题**: 
- 切换课时时页面没有滚动到顶部
- 用户想要固定头部 + 内容区独立滚动

**注意**: 
- 不要添加复杂的动画效果，会导致卡顿
- 用户期望：课程介绍固定，只有课时内容区域滚动

**状态**: 已回滚，待重新实现

---

### 5. 数据清理

**问题**: 数据库中有大量假数据（测试用户、虚假学生数等）

**已清理**:
- 删除测试用户 `user@aiacademy.com`
- 删除 28 个测试订单
- 课程学生数和评分重置为真实值
- 付费课程下的免费课时改为付费

**保留**:
- 管理员: `admin@aiacademy.com`
- 真实用户: `half-x@qq.com`

---

### 6. 价格格式化

**要求**: 价格保留一位小数，0 显示"免费"

**实现**:
- API 返回时: `parseFloat(price.toFixed(1))`
- 前端显示: `course.price.toFixed(1)`
- 免费课程: `course.isFree` 为 true 时显示"免费"

---

### 7. 付费课程内容保护

**保护措施**:
- 课程列表 API: 只返回元数据，不含课时内容
- 课时详情 API: 付费课程需登录+报名才返回内容
- 未满足条件返回 `locked: true, content: null`

---

## 数据库说明

### 主要表结构

- `users` - 用户表
- `courses` - 课程表
- `modules` - 模块表
- `lessons` - 课时表
- `enrollments` - 报名表
- `orders` - 订单表
- `payments` - 支付表
- `system_settings` - 系统配置表

### 数据库文件

- 位置: `prisma/dev.db`
- 备份: `bash scripts/backup.sh`

---

## 环境变量

`.env` 文件关键配置:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="https://ai.tyche.love"
NEXTAUTH_SECRET="..."
YIPAY_PID="3556"
YIPAY_KEY="..."
EMAIL_USER="half-x@qq.com"
EMAIL_PASS="..."
```

---

## Git 版本控制

**已初始化**: 2026-06-09

**重要规范**: 每次改完代码都要 commit，不允许有未提交的改动。

```bash
# 查看状态
git status

# 查看 diff
git diff

# 提交（必须做）
git add -A && git commit -m "描述"

# 回滚单个文件
git checkout HEAD -- <file>
```

---

## 待办事项

- [ ] 课程详情页交互优化（固定头部 + 内容区独立滚动）
- [ ] 继续生成其他课程的课时内容
- [ ] 优化学习路径页（基于真实课程数据）
- [ ] 考试认证系统开发

---

## 常用命令

```bash
# 构建主应用
cd /home/tyche/ai-academy && npm run build

# 构建管理后台
cd /home/tyche/ai-academy/admin-app && npm run build

# 重启服务
pm2 restart ai-academy ai-admin

# 重载 Caddy
systemctl reload caddy

# 查看数据库
sqlite3 prisma/dev.db "SELECT * FROM users;"
```
