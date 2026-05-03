# ResumeBuilder - 专业简历制作工具

一个基于 Next.js 16 的现代化简历制作和导出网站，提供多种精美模板，支持PDF导出。

## 功能特点

- 🎨 **多种模板风格**：经典、现代、创意、简约等多种模板，适配不同行业场景
- ✏️ **智能编辑器**：实时预览，拖拽式编辑，轻松调整内容顺序
- 📄 **PDF导出**：一键导出高质量PDF简历
- 👤 **用户系统**：邮箱注册、验证码验证、登录功能
- ☁️ **云端保存**：简历数据云端保存，随时随地访问
- 📱 **响应式设计**：完美适配桌面和移动设备

## 技术栈

- **前端**：Next.js 16、React 19、TypeScript、Tailwind CSS、shadcn/ui
- **后端**：Next.js API Routes、Prisma ORM
- **数据库**：SQLite（开发）/ PostgreSQL（生产）
- **认证**：NextAuth.js
- **邮件**：Nodemailer

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，配置以下变量：

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (SMTP)
SMTP_HOST="smtp.qq.com"
SMTP_PORT="465"
SMTP_USER="your-email@qq.com"
SMTP_PASS="your-smtp-password"
SMTP_FROM="your-email@qq.com"
```

### 3. 初始化数据库

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 开始使用。

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── (auth)/            # 认证相关页面
│   ├── dashboard/         # 用户仪表盘
│   ├── resumes/           # 简历管理
│   ├── settings/          # 用户设置
│   └── templates/         # 模板展示
├── components/            # React 组件
│   ├── auth/              # 认证组件
│   ├── home/              # 首页组件
│   ├── layout/            # 布局组件
│   ├── resume/            # 简历相关组件
│   └── ui/                # UI 组件库
├── lib/                   # 工具函数
│   ├── auth.ts            # 认证配置
│   ├── email.ts           # 邮件发送
│   ├── export.ts          # PDF导出
│   ├── prisma.ts          # 数据库连接
│   └── templates.ts       # 模板数据
└── types/                 # TypeScript 类型定义
```

## 主要页面

- **首页** (`/`)：产品展示，功能介绍
- **模板页** (`/templates`)：浏览所有简历模板
- **登录** (`/login`)：用户登录
- **注册** (`/register`)：用户注册（邮箱验证）
- **仪表盘** (`/dashboard`)：管理简历
- **简历编辑** (`/resumes/[id]`)：编辑简历内容
- **设置** (`/settings`)：账户设置

## API 接口

- `POST /api/auth/send-code` - 发送验证码
- `POST /api/auth/register` - 用户注册
- `GET/POST /api/resumes` - 获取/创建简历
- `GET/PUT/DELETE /api/resumes/[id]` - 简历详情/更新/删除
- `PUT /api/user/profile` - 更新用户资料
- `POST /api/export` - 导出简历

## 部署

### Vercel 部署

1. Fork 本仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

### Docker 部署

```bash
docker build -t resume-builder .
docker run -p 3000:3000 resume-builder
```

## 开发说明

### 添加新模板

1. 在 `src/lib/templates.ts` 中添加模板配置
2. 在 `src/components/resume/templates/` 中创建模板组件
3. 在 `src/components/resume/templates/template-renderer.tsx` 中注册模板

### 数据库迁移

```bash
npx prisma migrate dev --name your-migration-name
```

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或联系开发者。