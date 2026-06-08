# 学AI (AI Academy) 详细设计文档

> 版本: 1.0 | 最后更新: 2026-06-07

---

## 目录

1. [系统架构设计](#1-系统架构设计)
2. [数据库设计](#2-数据库设计)
3. [API 设计](#3-api-设计)
4. [前端架构](#4-前端架构)
5. [安全设计](#5-安全设计)
6. [性能设计](#6-性能设计)
7. [部署架构](#7-部署架构)
8. [代码规范](#8-代码规范)

---

## 1. 系统架构设计

### 1.1 整体架构描述

学AI 是一个面向 AI 技术学习者的在线教育平台，采用前后端一体的 Next.js App Router 架构。系统由两个独立的 Next.js 应用组成：主站应用（端口 3000）和管理后台应用（端口 3001），两者共享同一个 SQLite 数据库和 Prisma ORM 数据访问层。

**架构分层：**

```
┌─────────────────────────────────────────────────────────┐
│                     客户端 (浏览器)                        │
├──────────────────────────┬──────────────────────────────┤
│     主站 (localhost:3000) │   管理后台 (localhost:3001)    │
│  ┌─────────────────────┐ │  ┌──────────────────────────┐ │
│  │  App Router 页面     │ │  │  App Router 页面          │ │
│  │  (main)/(auth)/admin │ │  │  admin/                  │ │
│  └────────┬────────────┘ │  └────────┬─────────────────┘ │
│           │              │           │                    │
│  ┌────────▼────────────┐ │  ┌────────▼─────────────────┐ │
│  │  API Routes         │ │  │  API Routes              │ │
│  │  /api/*             │ │  │  /api/admin/*            │ │
│  └────────┬────────────┘ │  └────────┬─────────────────┘ │
├───────────┼──────────────┼───────────┼────────────────────┤
│           └──────────────┼───────────┘                    │
│                          │                                │
│              ┌───────────▼───────────┐                    │
│              │   Prisma ORM 层       │                    │
│              │   (共享 @prisma/client)│                    │
│              └───────────┬───────────┘                    │
│              ┌───────────▼───────────┐                    │
│              │   SQLite 数据库        │                    │
│              │   (dev.db)            │                    │
│              └───────────────────────┘                    │
│                                                          │
│              ┌───────────────────────┐                    │
│              │   外部服务             │                    │
│              │  - Yipay 支付网关      │                    │
│              │  - QQ 邮箱 SMTP       │                    │
│              └───────────────────────┘                    │
└──────────────────────────────────────────────────────────┘
```

### 1.2 技术栈选型及理由

| 技术 | 版本 | 选型理由 |
|------|------|----------|
| **Next.js** | 16.2.6 | App Router 提供文件系统路由、服务端组件、API Routes 一体化开发体验，减少架构复杂度 |
| **React** | 19.2.4 | 最新版本，支持 Server Components 和并发特性 |
| **TypeScript** | 5.x | 类型安全，减少运行时错误，提升代码可维护性 |
| **Prisma** | 6.19.3 | 类型安全的 ORM，自动生成类型，Schema-first 设计，迁移管理便捷 |
| **SQLite** | - | 零配置、无外部依赖，适合初期快速迭代和中小规模部署 |
| **NextAuth.js** | 4.24.14 | 与 Next.js 深度集成，支持 JWT 策略、Credentials Provider，开箱即用 |
| **Tailwind CSS** | 4.x | 原子化 CSS，开发效率高，配合 clsx/tailwind-merge 实现动态样式 |
| **bcryptjs** | 3.0.3 | 纯 JS 实现的 bcrypt，无需 native 编译，跨平台兼容 |
| **nodemailer** | 7.0.13 | 成熟的邮件发送库，支持 QQ SMTP SSL 连接 |
| **react-markdown** | 10.1.0 | Markdown 渲染，支持 GFM 扩展，用于课程内容展示 |
| **mermaid** | 11.15.0 | 流程图、架构图渲染，增强课程内容的可视化表达 |
| **prism-react-renderer** | 2.4.1 | 代码语法高亮，支持多种编程语言 |
| **react-hot-toast** | 2.6.0 | 轻量级 Toast 通知组件 |
| **lucide-react** | 1.17.0 | 图标库，Tree-shaking 友好，风格统一 |
| **recharts** | 3.8.1 | 基于 React 的图表库，用于管理后台数据可视化 |
| **framer-motion** | 12.40.0 | 动画库，用于页面过渡和交互动效 |

### 1.3 两个应用的关系和交互

**主站应用 (ai-academy, port 3000)**

- 面向终端用户（学习者）
- 提供课程浏览、学习、支付、个人中心等功能
- 区域划分：`(main)` 主内容区、`(auth)` 认证区、`admin` 管理区
- API 路径前缀：`/api/*`

**管理后台应用 (admin-app, port 3001)**

- 面向平台管理员
- 提供课程管理、用户管理、订单管理、数据报表等功能
- 独立的 API 路径前缀：`/api/admin/*`
- 独立的认证流程，仅允许 role=admin 的用户登录

**共享机制：**

- 两个应用共享同一个 SQLite 数据库文件（通过 `DATABASE_URL` 环境变量指向同一个 `dev.db`）
- 共享同一个 Prisma Schema 定义（`prisma/schema.prisma`）
- 共享同一个 `NEXTAUTH_SECRET`，确保 JWT Token 互通
- 各自独立部署，通过数据库实现数据一致性

### 1.4 目录结构说明

**主站应用目录结构：**

```
src/
├── app/                          # App Router 页面
│   ├── layout.tsx                # 根布局（AuthProvider + Toaster）
│   ├── globals.css               # 全局样式（Tailwind 入口）
│   ├── favicon.ico
│   ├── (main)/                   # 主内容路由组
│   │   ├── layout.tsx            # 主布局（Sidebar + 主内容区）
│   │   ├── page.tsx              # 首页（课程展示、学习路径）
│   │   ├── courses/
│   │   │   ├── page.tsx          # 课程列表页（筛选、搜索、排序）
│   │   │   └── [id]/page.tsx     # 课程详情页（大纲 + 课时内容）
│   │   ├── paths/page.tsx        # 学习路径页
│   │   ├── exams/page.tsx        # 考试认证页
│   │   ├── blog/page.tsx         # 博客列表页
│   │   └── about/page.tsx        # 关于页
│   ├── (auth)/                   # 认证路由组
│   │   ├── layout.tsx            # 认证布局（无侧边栏）
│   │   ├── login/page.tsx        # 登录页
│   │   └── register/page.tsx     # 注册页（含邮箱验证码）
│   ├── admin/                    # 管理后台路由（主站内嵌）
│   │   ├── layout.tsx            # 管理后台布局（独立侧边栏）
│   │   └── page.tsx              # 管理仪表盘
│   ├── api/                      # API 路由
│   │   ├── auth/
│   │   │   ├── [...nextauth]/    # NextAuth 处理器
│   │   │   ├── register/         # 注册接口
│   │   │   └── send-code/        # 发送验证码
│   │   ├── courses/              # 课程 CRUD
│   │   ├── lessons/[id]/         # 课时内容
│   │   ├── payment/              # 支付相关
│   │   ├── user/                 # 用户信息
│   │   ├── admin/stats/          # 管理统计
│   │   └── blog/                 # 博客
│   ├── learn/                    # 学习路由（重定向）
│   │   ├── [courseId]/page.tsx
│   │   └── [courseId]/[lessonId]/page.tsx
│   ├── payment/callback/         # 支付回调页
│   ├── profile/                  # 个人中心
│   └── test/page.tsx             # CSS 测试页
├── components/                   # 组件
│   ├── layout/
│   │   ├── Header.tsx            # 顶部导航（移动端）
│   │   ├── Footer.tsx            # 页脚
│   │   └── Sidebar.tsx           # 侧边栏导航（桌面端 + 移动端底部）
│   ├── providers/
│   │   └── AuthProvider.tsx      # NextAuth SessionProvider
│   ├── Mermaid.tsx               # Mermaid 图表渲染组件
│   └── CodeBlock.tsx             # 代码高亮组件
├── lib/                          # 工具库
│   ├── auth.ts                   # NextAuth 配置（JWT + Credentials）
│   ├── prisma.ts                 # Prisma Client 单例
│   ├── email.ts                  # 邮件发送（QQ SMTP + 验证码）
│   ├── yipay.ts                  # Yipay 支付工具（签名、验签）
│   └── utils.ts                  # 通用工具函数
├── types/
│   └── index.ts                  # TypeScript 类型定义
└── app/test/page.tsx             # 测试页
```

**管理后台应用目录结构：**

```
admin-app/
├── src/
│   ├── app/
│   │   ├── login/page.tsx        # 管理员登录页
│   │   ├── admin/
│   │   │   ├── layout.tsx        # 管理后台布局
│   │   │   ├── page.tsx          # 仪表盘
│   │   │   ├── users/page.tsx    # 用户管理
│   │   │   ├── orders/page.tsx   # 订单管理
│   │   │   ├── courses/
│   │   │   │   └── new/page.tsx  # 新建课程
│   │   │   ├── comments/page.tsx # 评论管理
│   │   │   ├── certificates/     # 证书管理
│   │   │   ├── notifications/    # 通知管理
│   │   │   ├── analytics/        # 数据分析
│   │   │   └── settings/         # 系统设置
│   │   └── api/
│   │       ├── auth/             # 独立的 NextAuth 处理器
│   │       └── admin/            # 管理 API
│   │           ├── stats/        # 统计数据
│   │           ├── users/        # 用户 CRUD
│   │           ├── courses/      # 课程 CRUD
│   │           ├── orders/       # 订单管理
│   │           ├── blog/         # 博客管理
│   │           ├── comments/     # 评论管理
│   │           ├── certificates/ # 证书管理
│   │           ├── notifications/# 通知管理
│   │           └── analytics/    # 分析数据
│   ├── lib/
│   │   └── prisma.ts             # Prisma Client 单例
│   └── types/
│       └── next-auth.d.ts        # NextAuth 类型扩展
└── next.config.ts
```

**数据库和脚本：**

```
prisma/
├── schema.prisma                 # 数据模型定义（17 个模型）
├── seed.ts                       # 种子数据（课程、分类、用户、考试等）
├── prisma.config.ts              # Prisma 配置
└── dev.db                        # SQLite 数据库文件

scripts/                          # 内容生成脚本
├── generate-all-content.js       # 批量生成课程内容
├── fix-generic-content.js        # 修复通用模板内容
├── workflow-content-generation.js # 内容生成工作流
└── ...                           # 其他内容维护脚本
```

---

## 2. 数据库设计

### 2.1 ER 图描述（文字版）

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Category   │1     *│    Course     │1     *│    Module     │
│──────────────│───────│──────────────│───────│──────────────│
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ name         │       │ title        │       │ title        │
│ slug (UQ)    │       │ slug (UQ)    │       │ description  │
│ icon         │       │ description  │       │ courseId (FK)│
│ description  │       │ price        │       │ sortOrder    │
│ sortOrder    │       │ isFree       │       │ isFree       │
└──────────────┘       │ level        │       └──────┬───────┘
                       │ status       │              │1
                       │ featured     │              │*
                       │ categoryId   │       ┌──────▼───────┐
                       │ tags (JSON)  │       │    Lesson     │
                       │ rating       │       │──────────────│
                       └──────┬───────┘       │ id (PK)      │
                              │1              │ title        │
                              │*              │ slug         │
                       ┌──────▼───────┐       │ moduleId (FK)│
                       │  Enrollment  │       │ type         │
                       │──────────────│       │ content      │
                       │ id (PK)      │       │ videoUrl     │
                       │ userId (FK)  │       │ duration     │
                       │ courseId(FK) │       │ isFree       │
                       │ progress     │       └──────┬───────┘
                       └──────────────┘              │1
                                                    │*
┌──────────────┐1     *│    User      │1     *┌──────▼───────┐
│ UserStreak   │───────│──────────────│───────│ UserProgress │
│──────────────│       │ id (PK)      │       │──────────────│
│ id (PK)      │       │ email (UQ)   │       │ id (PK)      │
│ userId (FK)  │       │ password     │       │ userId (FK)  │
│ date         │       │ name         │       │ lessonId(FK) │
│ lessonsCount │       │ role         │       │ status       │
└──────────────┘       │ vipLevel     │       │ score        │
                       │ exp          │       │ watchTime    │
                       │ coins        │       └──────────────┘
                       │ streak       │
                       └──────┬───────┘
                              │1
                    ┌─────────┼─────────┐
                    │*        │*        │*
             ┌──────▼──┐ ┌───▼────┐ ┌──▼──────────┐
             │  Order   │ │Comment │ │Notification │
             │──────────│ │────────│ │─────────────│
             │ id (PK)  │ │id (PK) │ │ id (PK)     │
             │ orderNo  │ │userId  │ │ userId (FK) │
             │ userId   │ │lessonId│ │ type        │
             │ courseId  │ │courseId│ │ title       │
             │ type     │ │content │ │ content     │
             │ amount   │ │likes   │ │ read        │
             │ status   │ └────────┘ └─────────────┘
             └────┬─────┘
                  │1
                  │1
             ┌────▼──────┐
             │  Payment  │
             │───────────│
             │ id (PK)   │
             │ orderId   │
             │ tradeNo   │
             │ type      │
             │ money     │
             │ status    │
             │ notifyData│
             └───────────┘

┌──────────┐    ┌──────────────┐    ┌──────────────┐
│   Quiz   │    │     Exam     │    │ ExamAttempt  │
│──────────│    │──────────────│    │──────────────│
│ id (PK)  │    │ id (PK)      │    │ id (PK)      │
│ lessonId │    │ title        │    │ userId (FK)  │
│ question │    │ courseId (FK)│    │ examId (FK)  │
│ type     │    │ passScore    │    │ score        │
│ options  │    │ timeLimit    │    │ passed       │
│ answer   │    │ isPaid       │    │ answers (JSON│
│ difficulty│   │ price        │    └──────────────┘
└──────────┘    └──────────────┘

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Achievement  │    │UserAchievement│   │ Certificate  │
│──────────────│    │──────────────│    │──────────────│
│ id (PK)      │    │ id (PK)      │    │ id (PK)      │
│ name (UQ)    │    │ userId (FK)  │    │ userId (FK)  │
│ description  │    │ achievementId│    │ certificateNo│
│ icon         │    │ unlockedAt   │    │ title        │
│ condition    │    └──────────────┘    │ issuedAt     │
│ expReward    │                       └──────────────┘
└──────────────┘

┌──────────────┐    ┌──────────────┐
│  BlogPost    │    │SystemSetting │
│──────────────│    │──────────────│
│ id (PK)      │    │ id (PK)      │
│ title        │    │ key (UQ)     │
│ slug (UQ)    │    │ value        │
│ content      │    └──────────────┘
│ status       │
│ viewCount    │
└──────────────┘
```

### 2.2 各模型详细说明和关系

#### 用户系统

**User（用户）** - 表名 `users`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键，自动生成 |
| email | String | 唯一，用于登录和通信 |
| password | String | bcrypt 加密存储（salt rounds=12） |
| name | String? | 用户昵称 |
| avatar | String? | 头像 URL |
| role | String | 角色：`user` / `admin` / `superadmin`，默认 `user` |
| bio | String? | 个人简介 |
| vipLevel | Int | VIP 等级，默认 0 |
| vipExpiresAt | DateTime? | VIP 到期时间 |
| exp | Int | 经验值，用于等级系统 |
| coins | Int | 学习币 |
| streak | Int | 连续学习天数 |
| lastActiveAt | DateTime? | 最后活跃时间 |
| emailVerified | DateTime? | 邮箱验证时间 |
| createdAt | DateTime | 注册时间 |
| updatedAt | DateTime | 最后更新时间 |

关系：一对多 -> Enrollment, Order, UserProgress, ExamAttempt, Certificate, UserAchievement, UserStreak, Comment, Notification

#### 课程系统

**Category（课程分类）** - 表名 `categories`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name | String | 分类名称 |
| slug | String | URL 友好的标识符，唯一 |
| icon | String? | 图标（emoji） |
| description | String? | 分类描述 |
| sortOrder | Int | 排序权重 |

关系：一对多 -> Course

**Course（课程）** - 表名 `courses`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | String | 课程标题 |
| slug | String | URL 标识符，唯一 |
| subtitle | String? | 副标题 |
| description | String? | 课程描述 |
| coverImage | String? | 封面图 URL |
| price | Float | 价格（元），0 表示免费 |
| originalPrice | Float? | 原价 |
| isFree | Boolean | 是否免费课程 |
| level | String | 难度：`beginner` / `intermediate` / `advanced` |
| status | String | 状态：`draft` / `published` / `archived` |
| featured | Boolean | 是否推荐课程 |
| sortOrder | Int | 排序权重 |
| totalLessons | Int | 课时总数（冗余字段，加速查询） |
| totalStudents | Int | 学员总数（冗余字段） |
| totalDuration | Int | 总时长（分钟，冗余字段） |
| rating | Float | 平均评分 |
| ratingCount | Int | 评分人数 |
| tags | String? | JSON 数组，标签列表 |
| prerequisites | String? | JSON 数组，前置知识 |
| learningGoals | String? | JSON 数组，学习目标 |
| categoryId | String? | 外键，关联分类 |

关系：多对一 -> Category；一对多 -> Module, Enrollment, Order, Exam, Comment

**Module（课程模块/章节）** - 表名 `modules`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | String | 章节标题 |
| description | String? | 章节描述 |
| courseId | String | 外键，关联课程，级联删除 |
| sortOrder | Int | 排序权重 |
| isFree | Boolean | 是否免费章节 |

关系：多对一 -> Course（级联删除）；一对多 -> Lesson

**Lesson（课时）** - 表名 `lessons`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | String | 课时标题 |
| slug | String | URL 标识符，与 moduleId 组成唯一约束 |
| moduleId | String | 外键，关联模块，级联删除 |
| type | String | 类型：`video` / `text` / `quiz` / `code` |
| content | String? | Markdown/MDX 内容 |
| videoUrl | String? | 视频 URL |
| duration | Int | 时长（分钟） |
| sortOrder | Int | 排序权重 |
| isFree | Boolean | 是否免费课时 |
| isPreview | Boolean | 是否预览课时 |

关系：多对一 -> Module（级联删除）；一对多 -> UserProgress, Quiz, Comment
唯一约束：`@@unique([moduleId, slug])`

#### 学习进度系统

**UserProgress（用户学习进度）** - 表名 `user_progress`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| userId | String | 外键，关联用户，级联删除 |
| lessonId | String | 外键，关联课时，级联删除 |
| status | String | 状态：`not_started` / `in_progress` / `completed` |
| score | Int? | 测验得分 |
| watchTime | Int | 观看时长（秒） |
| completedAt | DateTime? | 完成时间 |

关系：多对一 -> User, Lesson（均级联删除）
唯一约束：`@@unique([userId, lessonId])`

**Enrollment（课程报名）** - 表名 `enrollments`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| userId | String | 外键，关联用户，级联删除 |
| courseId | String | 外键，关联课程，级联删除 |
| orderId | String? | 关联订单号 |
| enrolledAt | DateTime | 报名时间 |
| expiresAt | DateTime? | 过期时间（用于限时课程） |
| progress | Float | 学习进度百分比（0-100） |

关系：多对一 -> User, Course（均级联删除）
唯一约束：`@@unique([userId, courseId])`

#### 支付系统

**Order（订单）** - 表名 `orders`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| orderNo | String | 订单号（时间戳+随机数），唯一 |
| userId | String | 外键，关联用户 |
| courseId | String? | 外键，关联课程（课程购买时） |
| examId | String? | 外键，关联考试（考试购买时） |
| type | String | 订单类型：`course` / `exam` / `vip` |
| amount | Float | 实际支付金额 |
| originalAmount | Float? | 原始金额 |
| discount | Float | 折扣金额 |
| status | String | 状态：`pending` / `paid` / `failed` / `refunded` / `cancelled` |
| paymentMethod | String? | 支付方式：`alipay` / `wxpay` |
| tradeNo | String? | 第三方交易号 |
| paidAt | DateTime? | 支付时间 |
| expiredAt | DateTime? | 订单过期时间（30分钟） |
| remark | String? | 备注 |

关系：多对一 -> User, Course?, Exam?；一对一 -> Payment

**Payment（支付记录）** - 表名 `payments`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| orderId | String | 外键，关联订单，唯一 |
| tradeNo | String? | 第三方交易号 |
| pid | String | 商户 ID |
| type | String | 支付类型：`alipay` / `wxpay` |
| money | Float | 支付金额 |
| status | String | 状态：`pending` / `success` / `failed` |
| notifyData | String? | JSON 格式的回调原始数据 |

关系：多对一 -> Order（唯一约束）

#### 考试系统

**Quiz（测验题目）** - 表名 `quizzes`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| lessonId | String? | 外键，关联课时（SetNull） |
| courseId | String? | 关联课程 |
| question | String | 题目内容 |
| type | String | 题型：`choice` / `multi_choice` / `boolean` / `fill` |
| options | String? | JSON 数组，选项列表 |
| answer | String | 正确答案 |
| explanation | String? | 答案解析 |
| difficulty | Int | 难度等级（1-5） |
| exp | Int | 答对获得的经验值 |

**Exam（考试）** - 表名 `exams`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | String | 考试标题 |
| description | String? | 考试描述 |
| courseId | String? | 外键，关联课程（SetNull） |
| passScore | Int | 及格分数，默认 60 |
| timeLimit | Int | 考试时长（分钟），默认 60 |
| isPaid | Boolean | 是否付费考试 |
| price | Float | 考试费用 |
| totalQuestions | Int | 题目总数 |
| status | String | 状态：`active` / `inactive` |

关系：多对一 -> Course?（SetNull）；一对多 -> Order, ExamAttempt

**ExamAttempt（考试记录）** - 表名 `exam_attempts`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| userId | String | 外键，关联用户，级联删除 |
| examId | String | 外键，关联考试，级联删除 |
| score | Int | 得分 |
| totalScore | Int | 满分，默认 100 |
| passed | Boolean | 是否通过 |
| answers | String? | JSON 格式的答题记录 |
| startedAt | DateTime | 开始时间 |
| finishedAt | DateTime? | 结束时间 |

#### 成就系统

**Achievement（成就定义）** - 表名 `achievements`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name | String | 成就名称，唯一 |
| description | String | 成就描述 |
| icon | String? | 图标 |
| condition | String | JSON 格式的解锁条件 |
| expReward | Int | 解锁奖励经验值 |

**UserAchievement（用户成就）** - 表名 `user_achievements`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| userId | String | 外键，关联用户，级联删除 |
| achievementId | String | 外键，关联成就，级联删除 |
| unlockedAt | DateTime | 解锁时间 |

唯一约束：`@@unique([userId, achievementId])`

**UserStreak（学习打卡）** - 表名 `user_streaks`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| userId | String | 外键，关联用户，级联删除 |
| date | DateTime | 打卡日期 |
| lessonsCompleted | Int | 当日完成课时数 |

唯一约束：`@@unique([userId, date])`

#### 内容系统

**Comment（评论）** - 表名 `comments`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| userId | String | 外键，关联用户 |
| lessonId | String? | 外键，关联课时（SetNull） |
| courseId | String? | 外键，关联课程（SetNull） |
| content | String | 评论内容 |
| likes | Int | 点赞数 |

**Notification（通知）** - 表名 `notifications`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| userId | String | 外键，关联用户，级联删除 |
| type | String | 类型：`system` / `course` / `payment` / `achievement` |
| title | String | 通知标题 |
| content | String? | 通知内容 |
| link | String? | 关联链接 |
| read | Boolean | 是否已读 |

**BlogPost（博客文章）** - 表名 `blog_posts`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | String | 文章标题 |
| slug | String | URL 标识符，唯一 |
| excerpt | String? | 摘要 |
| content | String | 文章内容 |
| coverImage | String? | 封面图 |
| category | String? | 分类标签 |
| tags | String? | JSON 数组，标签列表 |
| status | String | 状态：`draft` / `published` |
| viewCount | Int | 阅读量 |
| publishedAt | DateTime? | 发布时间 |

**SystemSetting（系统设置）** - 表名 `system_settings`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| key | String | 设置键名，唯一 |
| value | String | 设置值 |

### 2.3 索引策略

Prisma Schema 中已定义的索引和唯一约束：

| 模型 | 索引/约束 | 类型 | 用途 |
|------|----------|------|------|
| User | email | @@unique | 登录查询 |
| Category | slug | @@unique | URL 路由 |
| Course | slug | @@unique | URL 路由 |
| Lesson | [moduleId, slug] | @@unique | 模块内课时唯一标识 |
| UserProgress | [userId, lessonId] | @@unique | 用户-课时进度唯一 |
| Enrollment | [userId, courseId] | @@unique | 用户-课程报名唯一 |
| Order | orderNo | @@unique | 订单号查询 |
| Payment | orderId | @@unique | 订单-支付一对一 |
| Certificate | certificateNo | @@unique | 证书编号查询 |
| Achievement | name | @@unique | 成就名称唯一 |
| UserAchievement | [userId, achievementId] | @@unique | 用户-成就唯一 |
| UserStreak | [userId, date] | @@unique | 用户-日期打卡唯一 |
| BlogPost | slug | @@unique | URL 路由 |
| SystemSetting | key | @@unique | 设置键查询 |

**建议补充的索引（SQLite 自动为主键和唯一约束创建索引）：**

- `Course.status` - 按状态筛选课程
- `Course.categoryId` - 按分类筛选
- `Course.featured` - 推荐课程查询
- `Order.userId` - 用户订单查询
- `Order.status` - 订单状态筛选
- `Enrollment.userId` - 用户报名查询
- `Comment.lessonId` - 课时评论查询
- `Comment.courseId` - 课程评论查询
- `Notification.userId` + `Notification.read` - 用户未读通知查询
- `UserProgress.userId` - 用户进度查询

### 2.4 数据迁移策略

当前项目使用 Prisma 的 `db push` 命令进行 Schema 同步（开发阶段），适合快速迭代。

**开发阶段：**
```bash
# 推送 Schema 变更到数据库
npx prisma db push

# 重置数据库并重新填充种子数据
npx prisma db push --force-reset && npm run db:seed

# 打开 Prisma Studio 查看数据
npx prisma studio
```

**生产阶段建议：**

1. 使用 `prisma migrate dev` 创建迁移文件
2. 使用 `prisma migrate deploy` 应用迁移
3. 迁移前备份数据库文件
4. 对于 SQLite，迁移即复制新的 `.db` 文件

**种子数据管理：**

`prisma/seed.ts` 包含完整的种子数据脚本，涵盖：
- 管理员账号和测试用户
- 12 个课程分类
- 30 门完整课程（含模块和课时）
- 6 个成就定义
- 4 个认证考试
- 3 篇博客文章

---

## 3. API 设计

### 3.1 RESTful API 规范

**通用规范：**

- 所有 API 返回 JSON 格式
- 成功响应使用 HTTP 200/201
- 错误响应使用 HTTP 4xx/5xx，包含 `{ "error": "错误信息" }` 结构
- 分页响应包含 `{ "data": [], "pagination": { "page", "limit", "total", "totalPages" } }`
- 认证接口使用 `getServerSession(authOptions)` 获取用户会话
- 所有写操作需要用户登录（401 未授权）
- 管理接口额外检查 `role === "admin"`（403 禁止访问）

**HTTP 方法约定：**

| 方法 | 用途 | 示例 |
|------|------|------|
| GET | 查询资源 | `GET /api/courses` |
| POST | 创建资源 | `POST /api/payment/create` |
| PUT | 更新资源 | `PUT /api/user/profile` |
| DELETE | 删除资源 | `DELETE /api/admin/users?id=xxx` |

### 3.2 各端点详细说明

#### 3.2.1 认证相关 API

**POST /api/auth/send-code** - 发送邮箱验证码

```
请求：
{
  "email": "user@example.com"
}

成功响应 (200)：
{ "message": "验证码已发送" }

错误响应 (400)：
{ "error": "请输入邮箱" }
{ "error": "邮箱格式不正确" }
{ "error": "请60秒后再试" }

错误响应 (500)：
{ "error": "发送失败" }
```

业务逻辑：
1. 验证邮箱格式
2. 检查 60 秒发送频率限制
3. 生成 6 位随机验证码
4. 通过 QQ SMTP 发送邮件
5. 验证码存储在内存 Map 中，5 分钟过期

**POST /api/auth/register** - 用户注册

```
请求：
{
  "name": "用户名",
  "email": "user@example.com",
  "password": "password123",
  "code": "123456"
}

成功响应 (201)：
{
  "message": "注册成功",
  "user": { "id": "uuid", "name": "用户名", "email": "user@example.com" }
}

错误响应 (400)：
{ "error": "请填写所有字段" }
{ "error": "密码至少需要6位" }
{ "error": "验证码错误或已过期" }
{ "error": "该邮箱已被注册" }
```

业务逻辑：
1. 验证必填字段
2. 验证密码长度 >= 6
3. 验证邮箱验证码
4. 检查邮箱是否已注册
5. bcrypt 加密密码（salt rounds=12）
6. 创建用户记录

**POST /api/auth/[...nextauth]** - NextAuth 认证处理器

处理路径：
- `POST /api/auth/signin` - 登录
- `POST /api/auth/signout` - 登出
- `GET /api/auth/session` - 获取当前会话
- `GET /api/auth/csrf` - 获取 CSRF Token

认证流程：
1. Credentials Provider 验证邮箱和密码
2. 查询数据库验证用户存在性
3. bcrypt 比对密码
4. 更新 `lastActiveAt` 时间
5. 生成 JWT Token（有效期 30 天）
6. Token 包含 `id` 和 `role` 字段

#### 3.2.2 课程相关 API

**GET /api/courses** - 获取课程列表

```
查询参数：
  page: number (默认 1)
  limit: number (默认 12)
  category: string (分类 slug)
  level: string (beginner/intermediate/advanced)
  search: string (搜索关键词)
  featured: string ("true" 获取推荐课程)
  sort: string (newest/popular/rating/price_asc/price_desc)

成功响应 (200)：
{
  "courses": [
    {
      "id": "uuid",
      "title": "课程标题",
      "slug": "course-slug",
      "description": "...",
      "price": 19.9,
      "isFree": false,
      "level": "intermediate",
      "status": "published",
      "category": { "id": "...", "name": "LLM开发", "slug": "llm" },
      "_count": { "modules": 4, "enrollments": 2800 },
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 30,
    "totalPages": 3
  }
}
```

业务逻辑：
1. 默认只返回 `status: "published"` 的课程
2. 支持按分类、等级、关键词筛选
3. 支持多种排序方式
4. 使用 `Promise.all` 并行查询列表和总数

**GET /api/courses/[id]** - 获取课程详情

```
路径参数：id (课程 ID 或 slug)

成功响应 (200)：
{
  "id": "uuid",
  "title": "...",
  "slug": "...",
  "description": "...",
  "category": { "id": "...", "name": "...", "slug": "..." },
  "modules": [
    {
      "id": "...",
      "title": "模块标题",
      "sortOrder": 1,
      "isFree": false,
      "lessons": [
        {
          "id": "...",
          "title": "课时标题",
          "slug": "lesson-1-1",
          "type": "video",
          "duration": 20,
          "isFree": true,
          "isPreview": false
        }
      ]
    }
  ],
  "_count": { "enrollments": 100, "comments": 50 }
}

错误响应 (404)：
{ "error": "课程不存在" }
```

业务逻辑：
1. 先按 ID 查询，未找到则按 slug 查询
2. 包含模块和课时列表（按 sortOrder 排序）
3. 课时不返回 content 字段（节省带宽）
4. 包含报名数和评论数统计

**GET /api/lessons/[id]** - 获取课时内容

```
路径参数：id (课时 ID)

成功响应 (200)：
{
  "id": "...",
  "title": "课时标题",
  "slug": "lesson-1-1",
  "type": "video",
  "content": "# Markdown 内容...",
  "videoUrl": "https://...",
  "duration": 20,
  "module": {
    "id": "...",
    "title": "模块标题",
    "courseId": "...",
    "isFree": false
  }
}

错误响应 (404)：
{ "error": "课时不存在" }
```

#### 3.2.3 支付相关 API

**POST /api/payment/create** - 创建支付订单

```
请求（需要登录）：
{
  "courseId": "uuid",        // 课程购买时
  "examId": "uuid",          // 考试购买时
  "type": "course",          // "course" / "exam"
  "paymentMethod": "alipay"  // "alipay" / "wxpay"
}

成功响应 (200)：
{
  "success": true,
  "data": {
    "orderNo": "202406071234567890",
    "paymentUrl": "https://api.ezfpy.cn/submit.php?...",
    "amount": 19.9
  }
}

错误响应：
(401) { "error": "请先登录" }
(400) { "error": "参数错误" }
(404) { "error": "课程不存在" }
(400) { "error": "您已购买过该课程" }
```

业务逻辑：
1. 验证用户登录状态
2. 验证课程/考试存在性
3. 检查是否重复购买（课程类型）
4. 生成订单号（时间戳+4位随机数）
5. 创建 Order 记录（status=pending，30分钟过期）
6. 创建 Payment 记录
7. 生成 Yipay 支付 URL（MD5 签名）
8. 返回支付链接

**POST /api/payment/notify** - Yipay 异步回调

```
请求（FormData，由 Yipay 服务器发送）：
  pid: 商户 ID
  trade_status: "TRADE_SUCCESS"
  out_trade_no: 订单号
  trade_no: 第三方交易号
  sign: MD5 签名
  sign_type: "MD5"
  ...其他参数

成功响应：返回 "success" 字符串 (200)
失败响应：返回 "fail" 字符串 (400)
```

业务逻辑：
1. 解析 FormData 参数
2. 验证 MD5 签名（防止伪造回调）
3. 检查交易状态为 `TRADE_SUCCESS`
4. 查找订单记录
5. 跳过已支付订单（幂等性）
6. 更新订单状态为 `paid`，记录交易号和支付时间
7. 更新 Payment 记录状态
8. 如果是课程购买，创建 Enrollment 记录，更新课程学员数
9. 发送支付成功通知

**GET /api/payment/status/[id]** - 查询支付状态

```
路径参数：id (订单号)

成功响应 (200)：
{
  "orderNo": "202406071234567890",
  "status": "paid",
  "amount": 19.9,
  "paymentMethod": "alipay",
  "paidAt": "2024-06-07T12:34:56Z"
}

错误响应 (404)：
{ "error": "订单不存在" }
```

#### 3.2.4 用户相关 API

**GET /api/user/profile** - 获取用户资料（需要登录）

```
成功响应 (200)：
{
  "id": "uuid",
  "name": "用户名",
  "email": "user@example.com",
  "avatar": null,
  "role": "user",
  "bio": "...",
  "vipLevel": 0,
  "exp": 100,
  "coins": 0,
  "streak": 5,
  "createdAt": "2024-01-01T00:00:00Z",
  "_count": {
    "enrollments": 3,
    "certificates": 1,
    "achievements": 2
  }
}
```

**PUT /api/user/profile** - 更新用户资料（需要登录）

```
请求：
{
  "name": "新用户名",
  "bio": "新的个人简介",
  "avatar": "https://..."
}

成功响应 (200)：
{
  "id": "uuid",
  "name": "新用户名",
  "email": "user@example.com",
  "avatar": "https://...",
  "bio": "新的个人简介"
}
```

**GET /api/user/enrollments** - 获取用户报名课程（需要登录）

```
成功响应 (200)：
[
  {
    "id": "uuid",
    "courseId": "uuid",
    "enrolledAt": "2024-01-01T00:00:00Z",
    "progress": 45.5,
    "course": {
      "id": "uuid",
      "title": "课程标题",
      "slug": "course-slug",
      "coverImage": "https://..."
    }
  }
]
```

#### 3.2.5 管理相关 API

**GET /api/admin/stats** - 获取管理统计数据（需要 admin 角色）

```
成功响应 (200)：
{
  "users": 1500,
  "courses": 30,
  "orders": 500,
  "revenue": 25000.00
}
```

**GET /api/blog** - 获取博客列表

```
成功响应 (200)：
[
  {
    "id": "uuid",
    "title": "文章标题",
    "slug": "article-slug",
    "excerpt": "摘要...",
    "category": "技术深度",
    "publishedAt": "2024-01-01T00:00:00Z",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### 3.2.6 管理后台 API (admin-app)

**GET /api/admin/users** - 用户管理

```
查询参数：page, pageSize, search, role

响应：
{
  "users": [...],
  "pagination": { "page", "pageSize", "total", "totalPages" }
}
```

**PUT /api/admin/users** - 更新用户角色/VIP

```
请求：{ "id": "uuid", "role": "admin", "vipLevel": 1 }
```

**DELETE /api/admin/users?id=xxx** - 删除用户

**GET /api/admin/courses** - 课程管理（含分类列表）

**POST /api/admin/courses** - 创建课程

**PUT /api/admin/courses** - 更新课程

**DELETE /api/admin/courses?id=xxx** - 删除课程

**GET /api/admin/orders** - 订单管理

**PUT /api/admin/orders** - 更新订单状态

### 3.3 认证与授权机制

**认证流程：**

```
1. 用户提交邮箱+密码
   ↓
2. NextAuth CredentialsProvider 处理
   ↓
3. 数据库查询用户 → bcrypt 密码比对
   ↓
4. 生成 JWT Token (有效期 30 天)
   ↓
5. Token 存储在 HTTP-Only Cookie 中
   ↓
6. 后续请求通过 getServerSession() 获取会话
```

**JWT Token 结构：**

```json
{
  "id": "user-uuid",
  "role": "user",
  "email": "user@example.com",
  "name": "用户名",
  "iat": 1717776000,
  "exp": 1720368000
}
```

**授权层级：**

| 层级 | 检查方式 | 示例 |
|------|----------|------|
| 公开 | 无需认证 | 课程列表、课程详情 |
| 登录 | `getServerSession()` | 个人资料、报名课程 |
| 管理员 | `role === "admin"` | 管理后台 API |

### 3.4 错误处理规范

**统一错误响应格式：**

```json
{
  "error": "错误信息（中文，面向用户）"
}
```

**HTTP 状态码使用：**

| 状态码 | 含义 | 使用场景 |
|--------|------|----------|
| 200 | OK | 查询成功、更新成功 |
| 201 | Created | 注册成功、创建资源成功 |
| 400 | Bad Request | 参数错误、验证失败、业务规则违反 |
| 401 | Unauthorized | 未登录、Token 过期 |
| 403 | Forbidden | 权限不足 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器内部错误 |

**错误处理模式：**

所有 API 路由使用 try-catch 包裹，catch 块中：
1. `console.error()` 记录详细错误到服务器日志
2. 返回通用错误信息给客户端（不暴露内部细节）

```typescript
try {
  // 业务逻辑
} catch (error) {
  console.error("具体操作 error:", error);
  return NextResponse.json(
    { error: "面向用户的错误信息" },
    { status: 500 }
  );
}
```

### 3.5 限流策略

当前实现中，限流主要体现在以下方面：

**邮箱验证码发送限流：**
- 同一邮箱 60 秒内只能发送一次
- 实现方式：检查内存 Map 中的发送时间戳

**订单过期机制：**
- 待支付订单 30 分钟后过期
- 实现方式：`expiredAt` 字段记录过期时间

**建议补充的限流措施：**

1. **API 全局限流**：使用中间件限制每 IP 每分钟请求数
2. **登录失败限流**：连续 5 次失败后锁定 15 分钟
3. **验证码存储**：生产环境应使用 Redis 替代内存 Map
4. **支付回调限流**：限制同一订单号的回调频率

---

## 4. 前端架构

### 4.1 组件设计规范

**组件分类：**

| 分类 | 路径 | 说明 |
|------|------|------|
| 布局组件 | `src/components/layout/` | Header, Footer, Sidebar |
| Provider | `src/components/providers/` | AuthProvider (SessionProvider) |
| 通用组件 | `src/components/` | Mermaid, CodeBlock |
| 页面组件 | `src/app/` | 各路由目录下的 page.tsx |

**组件设计原则：**

1. **客户端组件**：使用 `"use client"` 指令，用于需要交互、状态、浏览器 API 的场景
2. **服务端组件**：默认为服务端组件，用于静态展示和数据获取
3. **当前状态**：由于大多数页面需要客户端数据获取（fetch API），目前大部分页面组件标记为 `"use client"`

**布局嵌套结构：**

```
RootLayout (layout.tsx)
├── AuthProvider (SessionProvider)
├── Toaster (react-hot-toast)
└── children
    ├── MainLayout ((main)/layout.tsx)
    │   ├── Sidebar (侧边栏导航)
    │   └── children (主内容区)
    ├── AuthLayout ((auth)/layout.tsx)
    │   └── children (认证页面，无侧边栏)
    └── AdminLayout (admin/layout.tsx)
        ├── AdminSidebar (管理后台侧边栏)
        └── children (管理内容区)
```

**响应式设计策略：**

- 使用 Tailwind CSS 的响应式前缀（`sm:`, `md:`, `lg:`）
- Sidebar 组件同时实现桌面端（固定侧边栏）和移动端（顶部导航 + 底部 Tab 栏）
- 主内容区通过 `md:pl-56` 为侧边栏留出空间
- 移动端使用 `pt-14 pb-14` 为顶部和底部导航留出空间

### 4.2 状态管理方案

**当前方案：React 内置状态 + fetch API**

项目未使用第三方状态管理库（如 Redux、Zustand），而是采用以下策略：

1. **服务端状态**：通过 `fetch()` 直接调用 API，使用 `useState` 存储响应数据
2. **认证状态**：通过 `next-auth/react` 的 `useSession()` Hook 获取
3. **UI 状态**：使用 `useState` 管理组件内部状态（loading、error、modal 等）
4. **本地持久化**：使用 `localStorage` 存储已查看课时记录

**典型数据获取模式：**

```typescript
const [data, setData] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const res = await fetch("/api/endpoint");
    if (res.ok) {
      const result = await res.json();
      setData(result);
    }
  } catch (error) {
    console.error("Failed to fetch");
  } finally {
    setLoading(false);
  }
};
```

**类型定义：**

`src/types/index.ts` 定义了完整的 TypeScript 接口，包括：
- `CourseWithDetails` - 课程详情
- `ModuleWithLessons` - 模块及课时
- `LessonBasic` / `LessonWithContent` - 课时信息
- `UserProgressInfo` - 学习进度
- `EnrollmentInfo` - 报名信息
- `OrderInfo` - 订单信息
- `CertificateInfo` - 证书信息
- `AchievementInfo` - 成就信息
- `QuizQuestion` - 测验题目
- `ExamInfo` - 考试信息
- `DashboardStats` - 仪表盘统计
- `CategoryInfo` - 分类信息
- `LearningPath` - 学习路径
- `BlogPostInfo` - 博客文章

### 4.3 路由设计

**主站路由表：**

| 路径 | 页面 | 权限 | 说明 |
|------|------|------|------|
| `/` | 首页 | 公开 | Hero、免费课程、推荐课程、学习路径 |
| `/courses` | 课程列表 | 公开 | 筛选、搜索、排序 |
| `/courses/[id]` | 课程详情 | 公开 | 课程大纲 + 课时内容（右侧布局） |
| `/paths` | 学习路径 | 公开 | 6 条学习路径展示 |
| `/exams` | 考试认证 | 公开 | 认证考试列表 |
| `/blog` | 博客 | 公开 | 博客文章列表 |
| `/about` | 关于 | 公开 | 平台介绍 |
| `/login` | 登录 | 公开 | 邮箱+密码登录 |
| `/register` | 注册 | 公开 | 邮箱+验证码+密码注册 |
| `/profile` | 个人中心 | 登录 | 已报名课程、快捷入口 |
| `/learn/[courseId]` | 学习页 | 登录 | 重定向到 `/courses/[courseId]` |
| `/learn/[courseId]/[lessonId]` | 课时页 | 登录 | 重定向到 `/courses/[courseId]?lesson=[lessonId]` |
| `/payment/callback` | 支付回调 | 公开 | 支付结果展示 |
| `/admin` | 管理后台 | 管理员 | 管理仪表盘 |

**路由组说明：**

- `(main)` - 主内容组，使用 Sidebar 布局
- `(auth)` - 认证组，无侧边栏的全屏布局
- `admin` - 管理后台，独立的管理侧边栏布局

**URL 重定向策略：**

- `/learn/[courseId]` -> `/courses/[courseId]`（统一学习入口）
- `/learn/[courseId]/[lessonId]` -> `/courses/[courseId]?lesson=[lessonId]`（课时通过查询参数选择）

### 4.4 数据获取策略

**当前策略：客户端获取为主**

由于项目初期开发效率优先，当前主要采用客户端数据获取：

```typescript
"use client";
useEffect(() => { fetch("/api/...").then(...) }, []);
```

**各页面数据获取方式：**

| 页面 | 获取方式 | 数据源 |
|------|----------|--------|
| 首页 | 客户端 fetch | `/api/courses?limit=100` |
| 课程列表 | 客户端 fetch | `/api/courses?limit=100` + 前端筛选排序 |
| 课程详情 | 客户端 fetch | `/api/courses/[id]` + `/api/lessons/[id]` |
| 个人中心 | 客户端 fetch | `/api/user/enrollments` |
| 管理仪表盘 | 客户端 fetch | `/api/admin/stats` |
| 博客列表 | 客户端 fetch | `/api/blog` |

**优化建议：**

1. 首页和课程列表可改为服务端组件 + `fetch()` 缓存
2. 课程详情页可使用 `generateStaticParams` 预渲染热门课程
3. 使用 ` Suspense` 和 `loading.tsx` 实现流式渲染
4. 考虑引入 `@tanstack/react-query` 管理服务端状态

### 4.5 错误边界和加载状态

**加载状态实现：**

```typescript
// 骨架屏（课程列表页）
{loading ? (
  <div className="grid grid-cols-3 gap-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-4 bg-gray-100 rounded mb-3 w-1/3" />
        <div className="h-5 bg-gray-100 rounded mb-2" />
        <div className="h-4 bg-gray-100 rounded mb-4 w-2/3" />
      </div>
    ))}
  </div>
) : (/* 正常内容 */)}

// 旋转加载器（通用）
<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
```

**错误处理：**

- API 调用失败时使用 `toast.error()` 显示错误信息
- 页面级错误使用条件渲染展示空状态
- 支付回调页使用 `Suspense` 包裹，提供 fallback

**空状态设计：**

```typescript
// 课程列表为空
<BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
<p className="text-gray-500 text-sm">暂无匹配的课程</p>

// 已报名课程为空
<BookOpen className="h-8 w-8 text-gray-300 mx-auto mb-3" />
<p className="text-sm text-gray-500 mb-3">还没有报名任何课程</p>
<Link href="/courses" className="text-sm text-blue-600">浏览课程 →</Link>
```

---

## 5. 安全设计

### 5.1 认证流程

**注册流程：**

```
1. 用户填写邮箱 → 点击"发送验证码"
2. 前端验证邮箱格式 → POST /api/auth/send-code
3. 后端检查 60 秒频率限制 → 生成 6 位验证码
4. 通过 QQ SMTP 发送邮件 → 验证码存入内存 Map（5 分钟过期）
5. 用户填写验证码、密码 → 点击"注册"
6. 前端验证密码一致性、长度 → POST /api/auth/register
7. 后端验证验证码 → 检查邮箱唯一性 → bcrypt 加密密码
8. 创建用户记录 → 返回成功
9. 前端跳转到登录页
```

**登录流程：**

```
1. 用户填写邮箱和密码 → 点击"登录"
2. 前端调用 signIn("credentials", { email, password, redirect: false })
3. NextAuth CredentialsProvider 处理：
   a. 查询数据库用户记录
   b. bcrypt.compare() 比对密码
   c. 更新 lastActiveAt
   d. 返回用户信息（id, email, name, role）
4. NextAuth 生成 JWT Token（有效期 30 天）
5. Token 存入 HTTP-Only Cookie
6. 前端 router.push("/") + router.refresh()
```

**会话管理：**

- JWT 策略（非数据库 Session）
- Token 有效期 30 天
- Token 包含用户 ID 和角色信息
- 通过 `getServerSession(authOptions)` 在 API 路由中获取会话
- 通过 `useSession()` Hook 在客户端获取会话

### 5.2 授权机制

**角色定义：**

| 角色 | 权限 | 说明 |
|------|------|------|
| `user` | 浏览课程、学习免费内容、购买课程、查看个人中心 | 默认角色 |
| `admin` | 所有 user 权限 + 管理后台访问 | 管理员 |
| `superadmin` | 所有 admin 权限 + 系统设置 | 超级管理员（预留） |

**授权检查点：**

```typescript
// API 路由 - 检查登录
const session = await getServerSession(authOptions);
if (!session?.user) {
  return NextResponse.json({ error: "请先登录" }, { status: 401 });
}

// API 路由 - 检查管理员权限
if ((session.user as any).role !== "admin") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// 前端页面 - 检查登录
const { data: session, status } = useSession();
if (!session) { router.push("/login"); return null; }

// 前端页面 - 检查管理员权限
if ((session.user as any)?.role !== "admin") {
  router.push("/login"); return null;
}
```

**内容访问控制：**

- 免费课程/课时：任何人可访问
- 付费课程：未登录用户可免费预览 3 节课（`FREE_LESSON_LIMIT = 3`），登录用户需已报名
- 预览限制通过 `localStorage` 记录已查看课时（客户端实现）

### 5.3 支付安全

**签名验证（Yipay MD5）：**

```typescript
// 签名生成算法
function generateYipaySign(params: Record<string, string>): string {
  // 1. 过滤 sign、sign_type 和空值参数
  // 2. 按 key 字母序排序
  // 3. 拼接为 key=value& 格式
  // 4. 末尾追加商户密钥
  // 5. MD5 哈希
  const sortedKeys = Object.keys(params)
    .filter(k => k !== "sign" && k !== "sign_type" && params[k] !== "")
    .sort();
  const signStr = sortedKeys.map(k => `${k}=${params[k]}`).join("&") + YIPAY_KEY;
  return crypto.createHash("md5").update(signStr).digest("hex");
}
```

**回调验签：**

```typescript
// 支付回调时验证签名
export function verifyYipaySign(params: Record<string, string>): boolean {
  const { sign, sign_type, ...rest } = params;
  if (!sign) return false;
  const calculatedSign = generateYipaySign(rest);
  return calculatedSign === sign;
}
```

**幂等性保障：**

```typescript
// 支付回调处理中检查订单状态
if (order.status === "paid") {
  return new NextResponse("success", { status: 200 }); // 已支付则直接返回成功
}
```

**重复购买检查：**

```typescript
// 创建订单前检查是否已报名
const existingEnrollment = await prisma.enrollment.findUnique({
  where: { userId_courseId: { userId, courseId } },
});
if (existingEnrollment) {
  return NextResponse.json({ error: "您已购买过该课程" }, { status: 400 });
}
```

### 5.4 数据保护

**密码安全：**

- 使用 bcryptjs 加密，salt rounds = 12
- 密码不存储明文
- API 响应中不返回密码字段（使用 Prisma `select` 选择性返回字段）

**敏感信息处理：**

- `NEXTAUTH_SECRET` 通过环境变量注入
- `YIPAY_KEY` 通过环境变量注入
- `EMAIL_PASS`（QQ 邮箱授权码）通过环境变量注入
- 数据库文件不提交到版本控制（`.gitignore`）

**API 响应字段过滤：**

```typescript
// 用户资料查询 - 只返回必要字段
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true, name: true, email: true, avatar: true,
    role: true, bio: true, vipLevel: true, exp: true,
    coins: true, streak: true, createdAt: true,
    _count: { select: { enrollments: true, certificates: true, achievements: true } },
  },
});
```

### 5.5 API 安全

**输入验证：**

- 邮箱格式验证：`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- 密码长度验证：`password.length >= 6`
- 验证码长度验证：`code.length !== 6`
- 数字输入限制：`value.replace(/\D/g, '').slice(0, 6)`

**环境变量管理：**

```env
# .env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
YIPAY_PID="3556"
YIPAY_KEY="your-yipay-key"
YIPAY_API_URL="https://api.ezfpy.cn"
YIPAY_NOTIFY_URL="https://your-domain.com/api/payment/notify"
YIPAY_RETURN_URL="https://your-domain.com/payment/callback"
EMAIL_USER="your-email@qq.com"
EMAIL_PASS="your-qq-smtp-authorization-code"
```

---

## 6. 性能设计

### 6.1 数据库优化策略

**当前优化：**

1. **冗余字段**：Course 模型中的 `totalLessons`、`totalStudents`、`totalDuration`、`rating`、`ratingCount` 避免了频繁的聚合查询
2. **选择性返回**：使用 Prisma `select` 只查询需要的字段，减少数据传输
3. **关联查询优化**：使用 `include` 一次性获取关联数据，避免 N+1 问题
4. **并行查询**：使用 `Promise.all` 并行执行多个数据库查询

```typescript
// 示例：并行查询列表和总数
const [courses, total] = await Promise.all([
  prisma.course.findMany({ where, skip, take, include: {...} }),
  prisma.course.count({ where }),
]);
```

**建议优化：**

1. **添加数据库索引**：为高频查询字段添加索引（见 2.3 节）
2. **查询分页**：课程列表当前一次性获取 100 条数据（`limit=100`），应改为服务端分页
3. **缓存策略**：对分类列表、热门课程等变化不频繁的数据添加缓存
4. **SQLite WAL 模式**：启用 Write-Ahead Logging 提升并发读写性能

### 6.2 前端性能优化

**当前优化：**

1. **Tailwind CSS**：自动 Tree-shaking，只打包使用的样式
2. **图标按需引入**：使用 `lucide-react` 的 Tree-shaking 特性
3. **动态导入**：Mermaid 库使用 `import("mermaid")` 动态加载

```typescript
// Mermaid 动态加载
const mermaid = (await import("mermaid")).default;
```

4. **骨架屏加载**：课程列表页使用骨架屏替代空白等待
5. **图片优化**：课程封面使用 URL 引用，可配合 Next.js Image 组件优化

**建议优化：**

1. **代码分割**：利用 Next.js 自动代码分割，减少初始加载体积
2. **字体优化**：当前使用 Google Fonts 的 Inter 字体，已设置 `subsets: ["latin"]`
3. **字体加载策略**：
   ```typescript
   // 当前实现 - FOUT 策略
   const inter = Inter({ subsets: ["latin"] });
   // 建议优化 - 使用 display: "swap"
   const inter = Inter({ subsets: ["latin"], display: "swap" });
   ```
4. **图片懒加载**：课程封面图使用 Next.js `<Image>` 组件的 `loading="lazy"`
5. **Bundle 分析**：使用 `@next/bundle-analyzer` 分析打包体积

### 6.3 缓存策略

**当前状态：** 未实现显式缓存

**建议缓存方案：**

| 数据类型 | 缓存策略 | TTL | 说明 |
|----------|----------|-----|------|
| 课程分类列表 | ISR / 服务端缓存 | 1 小时 | 变化频率低 |
| 课程列表 | ISR | 5 分钟 | 支持增量更新 |
| 课程详情 | ISR + On-Demand Revalidation | 10 分钟 | 管理员更新时触发重新验证 |
| 用户会话 | JWT (客户端) | 30 天 | 已实现 |
| 验证码 | 内存 Map | 5 分钟 | 已实现，生产环境应改用 Redis |
| 统计数据 | 服务端缓存 | 1 分钟 | 管理后台仪表盘 |

**Next.js 缓存机制：**

```typescript
// fetch 请求默认缓存（Next.js 扩展）
const res = await fetch("https://api.example.com/data", {
  next: { revalidate: 3600 } // 1 小时重新验证
});

// On-Demand Revalidation
import { revalidatePath } from "next/cache";
revalidatePath("/courses"); // 管理员更新课程后触发
```

---

## 7. 部署架构

### 7.1 开发环境

**环境要求：**

- Node.js >= 18
- npm / pnpm
- Git

**启动步骤：**

```bash
# 1. 克隆项目
git clone <repo-url>
cd ai-academy

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 填写必要配置

# 4. 初始化数据库
npx prisma db push
npm run db:seed

# 5. 启动主站
npm run dev          # http://localhost:3000

# 6. 启动管理后台（另一个终端）
cd admin-app
npm install
npm run dev          # http://localhost:3001
```

**开发工具：**

```bash
# Prisma Studio - 数据库可视化管理
npm run db:studio

# 数据库重置
npm run db:reset

# 类型检查
npx tsc --noEmit

# ESLint 检查
npm run lint
```

### 7.2 生产环境建议

**部署方案选择：**

| 方案 | 适用场景 | 说明 |
|------|----------|------|
| Vercel | 快速部署、全球 CDN | Next.js 原生支持，零配置部署 |
| Docker + VPS | 完全控制、自定义域名 | 需要自行管理服务器 |
| 阿里云/腾讯云 | 国内访问优化 | 适合面向国内用户的场景 |

**Docker 部署示例：**

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

**生产环境配置要点：**

1. **数据库**：SQLite 适合中小规模，大规模部署建议迁移到 PostgreSQL
2. **文件存储**：课程封面、用户头像等建议使用对象存储（阿里云 OSS / 腾讯云 COS）
3. **验证码存储**：使用 Redis 替代内存 Map
4. **日志管理**：使用 Winston 或 Pino 替代 console.log
5. **监控告警**：接入 Sentry 错误监控
6. **HTTPS**：使用 Nginx 反向代理 + Let's Encrypt SSL 证书
7. **域名**：主站和管理后台可使用子域名区分（`www.xueai.com` / `admin.xueai.com`）

**环境变量（生产）：**

```env
DATABASE_URL="file:/data/ai-academy/prisma/dev.db"
NEXTAUTH_SECRET="<随机生成的强密钥>"
NEXTAUTH_URL="https://www.xueai.com"
NEXT_PUBLIC_APP_URL="https://www.xueai.com"
YIPAY_PID="<商户ID>"
YIPAY_KEY="<商户密钥>"
YIPAY_API_URL="https://api.ezfpy.cn"
YIPAY_NOTIFY_URL="https://www.xueai.com/api/payment/notify"
YIPAY_RETURN_URL="https://www.xueai.com/payment/callback"
EMAIL_USER="<QQ邮箱地址>"
EMAIL_PASS="<QQ邮箱SMTP授权码>"
```

---

## 8. 代码规范

### 8.1 TypeScript 规范

**类型使用：**

- 优先使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型和工具类型
- 避免使用 `any`，当前项目中存在多处 `(session.user as any).id` 类型断言，应通过 NextAuth 类型扩展解决

**NextAuth 类型扩展（admin-app 已实现）：**

```typescript
// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
```

**类型导入：**

```typescript
// 使用 import type 明确标记类型导入
import type { CourseWithDetails, LessonBasic } from "@/types";
```

**当前类型问题：**

项目中大量使用 `any` 类型，主要集中在：
- `useState<any[]>([])` - 应使用具体接口
- `(session.user as any).id` - 应通过类型扩展解决
- `where: any` - Prisma 查询条件类型
- `orderBy: any` - Prisma 排序类型

### 8.2 命名约定

**文件命名：**

| 类型 | 约定 | 示例 |
|------|------|------|
| 页面组件 | `page.tsx` | App Router 固定命名 |
| 布局组件 | `layout.tsx` | App Router 固定命名 |
| React 组件 | PascalCase | `Sidebar.tsx`, `CodeBlock.tsx` |
| 工具库 | camelCase | `utils.ts`, `auth.ts`, `email.ts` |
| 类型定义 | camelCase | `index.ts`, `next-auth.d.ts` |
| API 路由 | `route.ts` | App Router 固定命名 |
| 样式文件 | camelCase | `globals.css` |
| 配置文件 | kebab-case | `prisma.config.ts` |

**变量命名：**

| 类型 | 约定 | 示例 |
|------|------|------|
| 组件 | PascalCase | `Sidebar`, `AuthProvider` |
| 函数 | camelCase | `fetchCourses`, `handleEnroll` |
| 常量 | UPPER_SNAKE_CASE | `FREE_LESSON_LIMIT`, `YIPAY_PID` |
| 变量 | camelCase | `courseId`, `isFree` |
| 布尔值 | is/has/can 前缀 | `loading`, `completed`, `showPwd` |
| 事件处理 | handle 前缀 | `handleSubmit`, `handleLessonClick` |
| 获取数据 | fetch 前缀 | `fetchCourses`, `fetchEnrollments` |
| CSS 类名 | Tailwind 原子类 | `bg-gray-900 text-white` |

**数据库命名：**

| 类型 | 约定 | 示例 |
|------|------|------|
| 表名 | 复数 snake_case | `users`, `courses`, `user_progress` |
| 字段名 | camelCase | `createdAt`, `userId`, `orderNo` |
| 外键 | 关联表名+Id | `userId`, `courseId`, `moduleId` |
| Prisma 模型 | PascalCase 单数 | `User`, `Course`, `UserProgress` |

通过 `@@map()` 指令实现 Prisma 模型名与数据库表名的映射：

```prisma
model User {
  // ...字段定义
  @@map("users")  // 数据库中表名为 users
}
```

### 8.3 文件组织

**组件组织原则：**

```
src/components/
├── layout/           # 布局相关组件（Header, Footer, Sidebar）
├── providers/        # Context Provider 组件
├── ui/               # 通用 UI 组件（按钮、输入框等）[建议]
├── Mermaid.tsx       # 独立功能组件
└── CodeBlock.tsx     # 独立功能组件
```

**页面组织原则：**

```
src/app/
├── (main)/           # 使用相同布局的路由组
│   ├── page.tsx      # 组的首页
│   ├── courses/      # 功能模块
│   │   ├── page.tsx  # 列表页
│   │   └── [id]/     # 动态路由
│   │       └── page.tsx
│   └── layout.tsx    # 共享布局
├── (auth)/           # 认证页面组
├── api/              # API 路由
│   ├── auth/         # 认证 API
│   ├── courses/      # 课程 API
│   ├── payment/      # 支付 API
│   └── user/         # 用户 API
└── admin/            # 管理后台
```

**API 路由组织原则：**

```
src/app/api/
├── auth/
│   ├── [...nextauth]/route.ts   # NextAuth 处理器
│   ├── register/route.ts        # 注册
│   └── send-code/route.ts       # 发送验证码
├── courses/
│   ├── route.ts                 # GET 列表
│   └── [id]/route.ts            # GET 详情
├── lessons/
│   └── [id]/route.ts            # GET 课时内容
├── payment/
│   ├── create/route.ts          # POST 创建订单
│   ├── notify/route.ts          # POST 支付回调
│   └── status/[id]/route.ts     # GET 查询状态
├── user/
│   ├── profile/route.ts         # GET/PUT 用户资料
│   └── enrollments/route.ts     # GET 报名列表
├── admin/
│   └── stats/route.ts           # GET 统计数据
└── blog/
    └── route.ts                 # GET 博客列表
```

**通用工具函数（src/lib/utils.ts）：**

| 函数 | 用途 |
|------|------|
| `cn()` | 合并 Tailwind CSS 类名（clsx + twMerge） |
| `formatPrice()` | 格式化价格（"免费" / "¥19.90"） |
| `formatDate()` | 格式化日期（中文本地化） |
| `formatDuration()` | 格式化时长（分钟转小时分钟） |
| `generateOrderNo()` | 生成订单号（时间戳+随机数） |
| `generateCertificateNo()` | 生成证书编号（AIAC-年-随机数） |
| `truncateText()` | 文本截断 |
| `slugify()` | 生成 URL 友好的标识符 |
| `getInitials()` | 获取姓名首字母 |
| `calculateProgress()` | 计算进度百分比 |
| `getLevelBadge()` | 获取难度等级标签样式 |
| `getStatusBadge()` | 获取订单状态标签样式 |

---

## 附录

### A. 当前实现的已知限制

1. **验证码存储**：使用内存 `Map`，进程重启后丢失，多实例部署不共享
2. **类型安全**：多处使用 `any` 类型，缺少完整的 TypeScript 类型覆盖
3. **课程列表**：前端一次性获取 100 条数据，在客户端进行筛选排序，应改为服务端分页
4. **错误边界**：缺少 React Error Boundary 组件
5. **SEO**：大部分页面使用 `"use client"`，不利于搜索引擎爬取
6. **图片管理**：缺少图片上传和存储方案
7. **内容管理**：课程内容通过种子数据和脚本生成，缺少可视化编辑器
8. **测试**：缺少单元测试和集成测试

### B. 后续迭代建议

1. **短期**：补充 TypeScript 类型、添加错误边界、优化 SEO
2. **中期**：引入 Redis 缓存、实现服务端渲染优化、添加图片上传
3. **长期**：迁移到 PostgreSQL、引入 WebSocket 实时通知、开发移动端 App
