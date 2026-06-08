# 部署指南

## 项目结构

```
ai-academy/
├── src/                    # 主应用源码（端口 3000）
├── admin-app/              # 管理后台（独立 Next.js 应用，端口 3001）
├── prisma/                 # 数据库 schema、种子文件、SQLite 数据库
├── docs/                   # PRD、设计文档、部署文档
├── scripts/                # 课程内容生成脚本
├── public/                 # 静态资源
├── .env                    # 环境变量
├── package.json            # 主应用依赖
└── CLAUDE.md               # 项目开发指南
```

## 环境要求

- Node.js >= 18
- npm >= 9
- SQLite（Prisma 自动管理，无需额外安装）

## 部署步骤

### 1. 上传文件

排除以下文件/目录后上传到服务器：

```
node_modules/
.next/
admin-app/node_modules/
admin-app/.next/
prisma/dev.db
test-*.js
test-screenshots/
```

### 2. 安装依赖

```bash
# 主应用
cd ai-academy
npm install

# 管理后台
cd admin-app
npm install
cd ..
```

### 3. 配置环境变量

编辑 `.env` 文件：

```bash
# 数据库
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="https://你的域名"
NEXTAUTH_SECRET="替换为随机密钥"

# 易支付
YIPAY_PID="你的商户ID"
YIPAY_KEY="你的商户密钥"
YIPAY_API_URL="https://www.ezfpy.cn"

# 应用地址
NEXT_PUBLIC_APP_URL="https://你的域名"

# 邮箱（QQ邮箱SMTP）
EMAIL_USER="你的邮箱@qq.com"
EMAIL_PASS="你的邮箱授权码"
```

**重要**：`NEXTAUTH_SECRET` 必须是随机字符串，可用以下命令生成：

```bash
openssl rand -base64 32
```

### 4. 初始化数据库

```bash
# 生成 Prisma Client
npx prisma generate

# 创建数据库表
npx prisma db push

# 填充示例数据（可选）
npm run db:seed

# 管理后台也需要生成 Prisma Client
cd admin-app
npx prisma generate --schema=../prisma/schema.prisma
cd ..
```

### 5. 构建

```bash
# 主应用
npm run build

# 管理后台
cd admin-app
npm run build
cd ..
```

### 6. 启动

**方式一：直接启动**

```bash
# 主应用（端口 3000）
npm run start

# 管理后台（端口 3001，另开终端）
cd admin-app && npm run start
```

**方式二：PM2 守护进程（推荐）**

```bash
npm install -g pm2

# 启动主应用
pm2 start npm --name "ai-academy" -- run start

# 启动管理后台
pm2 start npm --name "ai-admin" --cwd /path/to/ai-academy/admin-app -- run start

# 设置开机自启
pm2 save
pm2 startup

# 查看状态
pm2 status

# 查看日志
pm2 logs ai-academy
pm2 logs ai-admin
```

### 7. Nginx 反向代理（推荐）

```nginx
# 主应用
server {
    listen 80;
    server_name 你的域名;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 管理后台（可用子域名或子路径）
server {
    listen 80;
    serveradmin admin.你的域名;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8. 管理后台配置

部署完成后，登录管理后台配置支付参数：

1. 访问 `https://admin.你的域名/login` 或 `http://服务器IP:3001/login`
2. 使用默认管理员账号登录：
   - 邮箱：`admin@aiacademy.com`
   - 密码：`admin123456`
3. 进入「系统设置」→「支付设置」：
   - 填入 `site_url`：`https://你的域名`
   - 确认 `yipay_pid`、`yipay_key`、`yipay_url` 正确
4. 保存

## 默认账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | `admin@aiacademy.com` | `admin123456` |
| 测试用户 | `user@aiacademy.com` | `user123456` |

**部署后请立即修改默认密码。**

## 数据库说明

- 使用 SQLite，数据库文件位于 `prisma/dev.db`
- 管理员和普通用户分开存储：
  - `admins` 表：管理员账号
  - `users` 表：普通用户账号
- 数据库迁移使用 `npx prisma db push`

## 支付配置

### 易支付参数

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `yipay_pid` | 商户ID | `3556` |
| `yipay_key` | 商户密钥 | `30Leou6ReVHFYRAOp9mr99DheOaX1DV6` |
| `yipay_url` | 网关地址 | `https://www.ezfpy.cn` |
| `site_url` | 本站域名 | `https://你的域名` |

### 回调地址

- 异步通知：`{site_url}/api/payment/notify`
- 同步跳转：`{site_url}/payment/callback`

换域名时只需修改 `site_url`，回调地址自动生成。

### 签名算法

与支付宝签名算法相同：
1. 参数按 key ASCII 排序
2. 除去 `sign` 和 `sign_type`
3. 跳过空值
4. 拼接 `key=value&`
5. 末尾加上商户密钥
6. MD5 哈希，小写

## 邮件配置

使用 QQ 邮箱 SMTP 发送验证码：

1. 登录 QQ 邮箱 → 设置 → 账户 → 开启 SMTP 服务
2. 获取授权码
3. 填入 `.env` 的 `EMAIL_USER` 和 `EMAIL_PASS`

## 常见问题

### 支付页面 500 错误

- 检查 PID 和密钥是否正确
- 检查 `site_url` 是否配置（管理后台 → 系统设置）
- 确认回调地址可被外网访问

### 登录后跳转回登录页

- 检查 `NEXTAUTH_URL` 是否与实际访问域名一致
- 检查浏览器 Cookie 是否被清除

### 管理后台登录失败

- 管理后台使用独立的 JWT 认证，与主应用 NextAuth 无关
- 确认使用 `admins` 表中的账号登录
- 默认账号：`admin@aiacademy.com` / `admin123456`

### 数据库重置

```bash
rm prisma/dev.db
npx prisma db push
npm run db:seed
```

## 数据备份与恢复

### 备份

数据库是 SQLite 文件，直接复制即可备份：

```bash
# 手动备份
cp prisma/dev.db prisma/dev.db.backup.$(date +%Y%m%d%H%M%S)

# 使用备份脚本
bash scripts/backup.sh
```

备份脚本 `scripts/backup.sh` 会：
1. 复制数据库文件到 `backups/` 目录
2. 保留最近 30 天的备份
3. 自动清理过期备份

### 恢复

```bash
# 停止服务
pm2 stop ai-academy
pm2 stop ai-admin

# 恢复数据库
cp backups/dev.db.20260608120000 prisma/dev.db

# 重启服务
pm2 restart ai-academy
pm2 restart ai-admin
```

### 定时备份（Cron）

```bash
# 每天凌晨 3 点自动备份
0 3 * * * cd /path/to/ai-academy && bash scripts/backup.sh >> /var/log/ai-academy-backup.log 2>&1
```

### 迁移到新服务器

1. 备份当前数据库：`cp prisma/dev.db ~/backup/`
2. 打包项目：`tar -czf ai-academy.tar.gz --exclude='node_modules' --exclude='.next' .`
3. 上传到新服务器
4. 解压：`tar -xzf ai-academy.tar.gz`
5. 恢复数据库：将 `dev.db` 放到 `prisma/` 目录
6. 安装依赖：`npm install && cd admin-app && npm install`
7. 修改 `.env` 中的域名
8. 构建启动：`npm run build && npm run start`

## 系统使用指南

### 前台（用户端）

**注册/登录：**
- 访问 `/register` 注册新账号（需要邮箱验证码）
- 访问 `/login` 登录已有账号
- 默认测试用户：`user@aiacademy.com` / `user123456`

**浏览课程：**
- 首页展示推荐课程和学习路径
- `/courses` 查看全部课程，支持分类筛选、搜索、排序
- 未登录用户可免费预览 3 个课时

**购买课程：**
- 进入付费课程详情页，点击「立即购买」
- 跳转到易支付页面完成付款
- 支付成功后自动跳回课程页，课程已解锁

**学习课程：**
- 已购买的课程在 `/profile` 个人中心查看
- 点击课程进入学习页面
- 左侧大纲选择课时，右侧显示内容
- 支持 Markdown、代码高亮、Mermaid 图表

**我的订单：**
- `/profile/orders` 查看所有订单记录
- 订单状态：待支付、已支付、已过期

### 管理后台

**登录：**
- 访问 `http://你的域名:3001/login`
- 默认管理员：`admin@aiacademy.com` / `admin123456`

**课程管理：**
- 查看、创建、编辑课程
- 管理课程模块和课时
- 设置课程价格、分类、等级

**用户管理：**
- 查看所有注册用户
- 编辑用户角色、VIP 等级
- 搜索、筛选用户

**订单管理：**
- 查看所有订单记录
- 按状态筛选（待支付/已支付/已过期）
- 查看订单详情（用户、课程、金额、时间）

**管理员管理：**
- 添加/删除管理员账号
- 管理员使用独立的 `admins` 表

**数据对账：**
- 检查订单和报名数据一致性
- 自动修复缺失的报名记录

**系统设置：**
- 基本设置：站点名称、描述、关键词
- 支付设置：商户ID、密钥、网关地址、回调域名
- 邮件设置：SMTP 服务器配置
- 其他：免费试看课时数、版权年份

### 课时访问规则

| 课程类型 | 用户状态 | 权限 |
|----------|----------|------|
| 免费课程 | 已登录 | 全部课时 |
| 免费课程 | 未登录 | 前 3 课时（IP 追踪） |
| 付费课程 | 已登录 + 已购买 | 全部课时 |
| 付费课程 | 已登录 + 未购买 | 锁定（显示购买按钮） |
| 付费课程 | 未登录 | 锁定（显示登录提示） |

### 支付配置

部署后需要在管理后台配置支付参数：

1. 登录管理后台
2. 进入「系统设置」→「支付设置」
3. 填入：
   - `yipay_pid`：易支付商户ID
   - `yipay_key`：易支付商户密钥
   - `yipay_url`：易支付网关地址（默认 `https://www.ezfpy.cn`）
   - `site_url`：本站域名（如 `https://yourdomain.com`）
4. 保存

回调地址自动生成：
- 异步通知：`{site_url}/api/payment/notify`
- 同步跳转：`{site_url}/payment/callback`

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 | 前端框架 |
| React | 19.2.4 | UI 库 |
| TypeScript | 5.x | 类型系统 |
| Prisma | 6.19.3 | ORM |
| SQLite | - | 数据库 |
| NextAuth.js | 4.24.14 | 主应用认证 |
| JWT | - | 管理后台认证 |
| Tailwind CSS | 4.x | 样式 |
| bcryptjs | - | 密码加密 |
| react-markdown | - | Markdown 渲染 |
