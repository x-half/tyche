# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

学AI（AI Academy）—— 一个中文 AI 学习平台，课程涵盖 LLM、RAG、Agent、提示词工程、微调等领域。支持免费/付费课程、学习进度跟踪、考试认证、博客和管理后台。

## 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器（端口 3000）
npm run build            # 生产构建
npm run start            # 启动生产服务器
npm run lint             # ESLint 检查

# 数据库（Prisma + SQLite）
npm run db:push          # 推送 schema 变更到数据库
npm run db:seed          # 填充示例数据（课程、用户等）
npm run db:studio        # 打开 Prisma Studio 图形界面
npm run db:reset         # 重置并重新填充数据库

# Prisma generate 在 npm install 时通过 postinstall 钩子自动执行
```

## 架构

### 两个独立的 Next.js 应用

- **主应用**（`/src`）—— 面向用户的前台网站，运行在端口 3000
- **管理后台**（`/admin-app`）—— 完全独立的 Next.js 项目，运行在端口 3001

两者共享同一个 SQLite 数据库（`prisma/dev.db`）和 Prisma schema（`prisma/schema.prisma`）。管理后台使用 NextAuth 5 beta，主应用使用 NextAuth 4，两者的认证代码不能互换。

### 主应用路由结构

使用 Next.js App Router，通过路由分组组织：

- `(main)/` —— 公开页面，带可折叠侧边栏布局（`/`、`/courses`、`/courses/[id]`、`/paths`、`/exams`、`/about`、`/blog`）
- `(auth)/` —— 登录/注册页面，最小化布局
- `/admin` —— 管理后台仪表盘（仅客户端角色检查，无中间件保护）
- `/learn/[courseId]` —— 重定向到 `/courses/[courseId]`
- `/payment/callback` —— 易支付回调页面
- `/profile` —— 用户个人中心

### 关键模式

- **所有页面组件都是客户端组件**（`"use client"`）—— 根布局和管理后台布局是例外
- **路径别名**：`@/*` 映射到 `./src/*`
- **无 middleware.ts** —— 路由保护在客户端进行（管理页面检查 `session.user.role !== "admin"`）
- **无 loading.tsx 或 error.tsx** 边界
- **无测试框架**
- **UI**：直接使用 Tailwind CSS 类，无组件库（无 shadcn/ui）
- **内容渲染**：ReactMarkdown + `prism-react-renderer` 代码高亮 + `mermaid` 图表

### 数据库

通过 Prisma ORM 使用 SQLite，17 个模型：

- **用户系统**：`User`（角色、VIP 状态、经验值、金币、连续学习天数、邮箱验证）
- **课程层级**：`Category` → `Course` → `Module` → `Lesson`
- **学习进度**：`UserProgress`（单课进度）、`Enrollment`（课程注册，含完成百分比）
- **支付系统**：`Order`、`Payment`（易支付集成 —— 支付宝/微信支付）
- **考试认证**：`Quiz`、`Exam`、`ExamAttempt`、`Certificate`
- **成就系统**：`Achievement`、`UserAchievement`、`UserStreak`
- **内容系统**：`Comment`、`Notification`、`BlogPost`、`SystemSetting`

### API 路由（`src/app/api/`）

- 认证：NextAuth 处理器、注册（需要邮箱验证码）、发送验证码（QQ 邮箱 SMTP）
- 课程：列表（支持分页/筛选/排序）、按 ID/slug 获取详情
- 课程内容：按 ID 获取课时内容
- 支付：创建订单、易支付回调通知、查询支付状态
- 用户：已购课程、个人资料（GET/PUT）
- 管理：仪表盘统计数据

### 邮箱验证码

验证码存储在**内存中**（JavaScript Map），服务器重启后丢失。这是开发环境的临时方案，不适合生产环境。

### 种子数据

`prisma/seed.ts` 创建：
- 管理员：`admin@aiacademy.com` / `admin123456`
- 测试用户：`user@aiacademy.com` / `user123456`
- 12 个分类、28+ 门课程（含模块和课时）、6 个成就、4 场考试、3 篇博客

### 脚本目录（`/scripts`）

包含 20 个独立的 JS 工具脚本，用于课程内容生成和管理。这些不属于应用运行时代码，是用于生成/修复课时内容和转换 Mermaid 图表的独立工具。

## 重要注意事项

- **NextAuth 版本不一致**：主应用用 NextAuth 4，管理后台用 NextAuth 5 beta。认证代码不能混用。
- **页面无服务端组件**：几乎所有页面都使用 `"use client"`。如需添加服务端组件模式，需先重构数据获取方式。
- **管理后台保护仅在客户端**：无中间件。管理布局在客户端检查 session。API 管理路由应在服务端验证 session。
- **中文界面**：所有面向用户的文本均为简体中文。修改 UI 时请保持中文。
- **Next.js 16**：此版本可能与你训练数据中的版本有破坏性变更。如遇异常行为，请查阅 `node_modules/next/dist/docs/`。
