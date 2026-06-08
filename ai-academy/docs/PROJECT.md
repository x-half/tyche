# 学AI（AI Academy）项目完整说明文档

## 一、项目概述

学AI 是一个中文 AI 学习平台，提供结构化课程（LLM、RAG、Agent、提示词工程、微调等），支持免费/付费课程、学习进度跟踪、考试认证、支付系统、博客和管理后台。

**技术栈：**

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 | 前端框架（App Router） |
| React | 19.2.4 | UI 库 |
| TypeScript | 5.x | 类型系统 |
| Prisma | 6.19.3 | ORM |
| SQLite | - | 数据库 |
| NextAuth.js | 4.24.14 | 主应用认证 |
| JWT (jsonwebtoken) | - | 管理后台认证 |
| Tailwind CSS | 4.x | 样式 |
| bcryptjs | - | 密码加密 |
| react-markdown | - | Markdown 渲染 |
| prism-react-renderer | - | 代码高亮 |
| mermaid | - | 图表渲染 |

---

## 二、目录结构

```
ai-academy/
├── src/                          # 主应用源码（端口 3000）
│   ├── app/
│   │   ├── (main)/               # 主站路由组（带顶部导航）
│   │   │   ├── layout.tsx        # 主站布局（Navbar）
│   │   │   ├── page.tsx          # 首页
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx      # 课程列表
│   │   │   │   └── [id]/page.tsx # 课程详情
│   │   │   ├── paths/page.tsx    # 学习路径
│   │   │   ├── exams/page.tsx    # 认证考试
│   │   │   ├── blog/page.tsx     # 博客
│   │   │   ├── about/page.tsx    # 关于
│   │   │   └── profile/          # 个人中心
│   │   │       ├── page.tsx      # 个人资料
│   │   │       ├── orders/page.tsx # 我的订单
│   │   │       └── certificates/ # 我的证书
│   │   ├── (auth)/               # 认证路由组
│   │   │   ├── login/page.tsx    # 登录
│   │   │   └── register/page.tsx # 注册
│   │   ├── admin/page.tsx        # 管理后台入口
│   │   ├── api/                  # API 路由
│   │   │   ├── auth/             # 认证 API
│   │   │   ├── courses/          # 课程 API
│   │   │   ├── lessons/          # 课时 API
│   │   │   ├── payment/          # 支付 API
│   │   │   ├── user/             # 用户 API
│   │   │   ├── admin/            # 管理 API
│   │   │   ├── blog/             # 博客 API
│   │   │   └── settings/         # 配置 API
│   │   ├── payment/callback/     # 支付回调页
│   │   └── layout.tsx            # 根布局
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # 顶部导航栏
│   │   │   ├── Header.tsx        # 页头（备用）
│   │   │   └── Footer.tsx        # 页脚
│   │   ├── providers/
│   │   │   └── AuthProvider.tsx   # NextAuth SessionProvider
│   │   ├── CourseCard.tsx         # 课程卡片组件
│   │   ├── CodeBlock.tsx          # 代码高亮组件
│   │   ├── Mermaid.tsx            # Mermaid 图表组件
│   │   ├── ThemeProvider.tsx      # 主题上下文
│   │   └── ThemeToggle.tsx        # 主题切换按钮
│   ├── lib/
│   │   ├── auth.ts               # NextAuth 配置
│   │   ├── prisma.ts             # Prisma Client
│   │   ├── yipay.ts              # 易支付工具
│   │   ├── utils.ts              # 通用工具
│   │   └── constants.ts          # 常量定义
│   └── types/                    # TypeScript 类型
├── admin-app/                    # 管理后台（独立 Next.js，端口 3001）
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx    # 管理后台布局（侧边栏）
│   │   │   │   ├── page.tsx      # 仪表盘
│   │   │   │   ├── courses/      # 课程管理
│   │   │   │   ├── users/        # 用户管理
│   │   │   │   ├── orders/       # 订单管理
│   │   │   │   ├── admins/       # 管理员管理
│   │   │   │   ├── blog/         # 博客管理
│   │   │   │   ├── settings/     # 系统设置
│   │   │   │   └── reconciliation/ # 数据对账
│   │   │   ├── api/              # 管理端 API
│   │   │   └── login/page.tsx    # 管理员登录
│   │   └── lib/
│   │       ├── auth.ts           # JWT 认证
│   │       └── prisma.ts         # Prisma Client
│   └── package.json
├── prisma/
│   ├── schema.prisma             # 数据库 Schema
│   ├── seed.ts                   # 种子数据
│   └── dev.db                    # SQLite 数据库文件
├── docs/                         # 文档
│   ├── PRD.md                    # 产品需求文档（功能、用户故事、业务流程）
│   ├── DESIGN.md                 # 详细设计文档（架构、数据库、API、前端）
│   ├── DEPLOY.md                 # 部署指南（部署步骤、配置、备份、使用指南）
│   └── PROJECT.md                # 本文档（项目完整说明）
├── scripts/                      # 脚本工具
│   ├── backup.sh                 # 数据库备份脚本
│   └── *.js                      # 内容生成脚本
├── public/                       # 静态资源
├── .env                          # 环境变量
├── package.json                  # 主应用依赖
└── CLAUDE.md                     # 项目开发指南
```

---

## 三、数据库设计

### 3.1 数据库概览

- **类型**：SQLite
- **文件**：`prisma/dev.db`（3MB）
- **ORM**：Prisma 6.19.3
- **总表数**：17 张

### 3.2 数据统计

| 表名 | 记录数 | 说明 |
|------|--------|------|
| users | 2 | 普通用户 |
| admins | 1 | 管理员 |
| categories | 12 | 课程分类 |
| courses | 33 | 课程 |
| modules | 102 | 课程模块 |
| lessons | 323 | 课时 |
| enrollments | 2 | 用户报名 |
| orders | 28 | 订单 |
| payments | 28 | 支付记录 |
| achievements | 6 | 成就 |
| userAchievements | 0 | 用户成就 |
| comments | 0 | 评论 |
| notifications | 2 | 通知 |
| blogPosts | 3 | 博客文章 |
| systemSettings | 2 | 系统设置 |
| lessonViews | 3 | 课时预览记录 |

### 3.3 表结构详解

#### 用户系统

**users 表**
```
id            String   主键
email         String   唯一
password      String   bcrypt 加密
name          String?  用户名
avatar        String?  头像
role          String   默认 "user"
bio           String?  简介
vipLevel      Int      默认 0
vipExpiresAt  DateTime? VIP 过期时间
exp           Int      经验值
coins         Int      金币
streak        Int      连续学习天数
lastActiveAt  DateTime? 最后活跃时间
emailVerified DateTime? 邮箱验证时间
createdAt     DateTime 创建时间
updatedAt     DateTime 更新时间
```

**admins 表**
```
id            String   主键
email         String   唯一
password      String   bcrypt 加密
name          String?  管理员名
role          String   默认 "admin"
createdAt     DateTime 创建时间
updatedAt     DateTime 更新时间
```

#### 课程系统

**categories 表**
```
id            String   主键
name          String   分类名称
slug          String   唯一，URL 友好名称
description   String?  描述
icon          String?  图标
sortOrder     Int      排序
```

**courses 表**
```
id            String   主键
title         String   课程标题
slug          String   唯一
subtitle      String?  副标题
description   String?  描述
coverImage    String?  封面图
price         Float    价格（0=免费）
originalPrice Float?   原价
isFree        Boolean  是否免费
level         String   入门/进阶/高级
status        String   draft/published
featured      Boolean  是否推荐
sortOrder     Int      排序
totalLessons  Int      总课时数
totalStudents Int      总学员数
totalDuration Int      总时长（分钟）
rating        Float    评分
ratingCount   Int      评分人数
tags          String?  JSON 数组
prerequisites String?  前置要求
learningGoals String?  学习目标
categoryId    String   外键→categories
createdAt     DateTime
updatedAt     DateTime
```

**modules 表**
```
id            String   主键
title         String   模块标题
description   String?  描述
courseId      String   外键→courses
sortOrder     Int      排序
isFree        Boolean  是否免费
createdAt     DateTime
```

**lessons 表**
```
id            String   主键
title         String   课时标题
slug          String   URL 友好名称
moduleId      String   外键→modules
type          String   text/coding/hands-on/quiz/project
content       String   Markdown 内容
videoUrl      String?  视频 URL
duration      Int      时长（分钟）
sortOrder     Int      排序
isFree        Boolean  是否免费
isPreview     Boolean  是否预览
createdAt     DateTime
updatedAt     DateTime
```

#### 学习进度

**enrollments 表**
```
id            String   主键
userId        String   外键→users
courseId      String   外键→courses
orderId       String?  外键→orders
enrolledAt    DateTime 报名时间
expiresAt     DateTime? 过期时间
progress      Float    进度百分比 0-100
@@unique([userId, courseId])
```

**userProgress 表**（如存在）
```
id            String   主键
userId        String   外键→users
lessonId      String   外键→lessons
completed     Boolean  是否完成
completedAt   DateTime? 完成时间
@@unique([userId, lessonId])
```

#### 支付系统

**orders 表**
```
id              String   主键
orderNo         String   唯一，订单号
userId          String   外键→users
courseId        String?  外键→courses
examId          String?  外键→exams
type            String   course/exam
amount          Float    金额
originalAmount  Float?   原始金额
discount        Float    折扣
status          String   pending/paid/expired/refunded
paymentMethod   String   alipay/wxpay
tradeNo         String?  第三方交易号
paidAt          DateTime? 支付时间
expiredAt       DateTime? 过期时间
remark          String?  备注
createdAt       DateTime
updatedAt       DateTime
```

**payments 表**
```
id            String   主键
orderId       String   唯一，外键→orders
tradeNo       String?  第三方交易号
pid           String   商户 ID
type          String   alipay/wxpay
money         Float    金额
status        String   pending/paid/failed
notifyData    String?  回调原始数据 JSON
createdAt     DateTime
updatedAt     DateTime
```

#### 课时预览追踪

**lessonViews 表**
```
id            String   主键
ip            String   客户端 IP
lessonId      String   课时 ID
viewedAt      DateTime 预览时间
@@unique([ip, lessonId])
@@index([ip])
```

#### 考试认证

**quizzes 表**
```
id            String   主键
lessonId      String   外键→lessons
question      String   问题
options       String   JSON 选项
correctAnswer String   正确答案
explanation   String?  解释
sortOrder     Int      排序
```

**exams 表**
```
id            String   主键
title         String   考试标题
description   String?  描述
price         Float    价格
passScore     Int      及格分
timeLimit     Int      时间限制（分钟）
categoryId    String?  外键→categories
status        String   draft/published
createdAt     DateTime
```

**examAttempts 表**
```
id            String   主键
userId        String   外键→users
examId        String   外键→exams
score         Int      得分
passed        Boolean  是否通过
answers       String?  JSON 答案
startedAt     DateTime 开始时间
finishedAt    DateTime? 结束时间
```

**certificates 表**
```
id            String   主键
userId        String   外键→users
examId        String   外键→exams
certificateNo String   唯一，证书编号
score         Int      得分
issuedAt      DateTime 发放时间
```

#### 成就系统

**achievements 表**
```
id            String   主键
name          String   成就名称
description   String?  描述
icon          String?  图标
type          String   类型
requirement   Int      要求值
rewardExp     Int      奖励经验
rewardCoins   Int      奖励金币
```

**userAchievements 表**
```
id            String   主键
userId        String   外键→users
achievementId String   外键→achievements
progress      Int      进度
completed     Boolean  是否完成
completedAt   DateTime? 完成时间
@@unique([userId, achievementId])
```

**userStreaks 表**
```
id            String   主键
userId        String   唯一，外键→users
currentStreak Int      当前连续天数
maxStreak     Int      最大连续天数
lastActiveDate DateTime 最后活跃日期
```

#### 内容系统

**comments 表**
```
id            String   主键
userId        String   外键→users
lessonId      String   外键→lessons
content       String   评论内容
parentId      String?  父评论 ID
createdAt     DateTime
updatedAt     DateTime
```

**notifications 表**
```
id            String   主键
userId        String   外键→users
type          String   通知类型
title         String   标题
content       String   内容
link          String?  链接
read          Boolean  是否已读
createdAt     DateTime
```

**blogPosts 表**
```
id            String   主键
title         String   标题
slug          String   唯一
excerpt       String?  摘要
content       String   内容
coverImage    String?  封面图
category      String?  分类
tags          String?  JSON 标签
status        String   draft/published
viewCount     Int      浏览数
publishedAt   DateTime? 发布时间
createdAt     DateTime
updatedAt     DateTime
```

**systemSettings 表**
```
id            String   主键
key           String   唯一
value         String   值
```

---

## 四、API 接口文档

### 4.1 主应用 API（端口 3000）

#### 认证相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/[...nextauth]` | NextAuth 处理器 | 无 |
| POST | `/api/auth/register` | 用户注册 | 无 |
| POST | `/api/auth/send-code` | 发送邮箱验证码 | 无 |

#### 课程相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/courses` | 课程列表（分页/筛选/排序） | 无 |
| GET | `/api/courses/:id` | 课程详情 | 无 |
| GET | `/api/lessons/:id` | 课时内容 | 部分（付费需登录+报名） |
| POST | `/api/lessons/:id/view` | 记录课时预览（IP 追踪） | 无 |

#### 支付相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/payment/create` | 创建支付订单 | 必须 |
| GET | `/api/payment/notify` | 易支付异步回调 | 无（验签） |
| GET | `/api/payment/status/:id` | 查询订单状态 | 必须 |

#### 用户相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/user/profile` | 获取用户资料 | 必须 |
| PUT | `/api/user/profile` | 更新用户资料 | 必须 |
| GET | `/api/user/enrollments` | 已报名课程 | 必须 |
| GET | `/api/user/orders` | 我的订单 | 必须 |

#### 其他

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/blog` | 博客列表 | 无 |
| GET | `/api/settings` | 首页配置 | 无 |
| GET | `/api/admin/stats` | 管理统计 | 管理员 |

### 4.2 管理后台 API（端口 3001）

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/login` | 管理员登录（JWT） | 无 |
| GET | `/api/auth/me` | 当前管理员信息 | JWT |
| POST | `/api/auth/logout` | 退出登录 | JWT |
| GET | `/api/admin/users` | 用户列表 | JWT |
| PUT | `/api/admin/users` | 更新用户 | JWT |
| DELETE | `/api/admin/users` | 删除用户 | JWT |
| GET | `/api/admin/orders` | 订单列表 | JWT |
| GET | `/api/admin/admins` | 管理员列表 | JWT |
| POST | `/api/admin/admins` | 创建管理员 | JWT |
| DELETE | `/api/admin/admins` | 删除管理员 | JWT |
| GET | `/api/admin/settings` | 系统设置 | JWT |
| PUT | `/api/admin/settings` | 更新设置 | JWT |
| GET | `/api/admin/reconciliation` | 数据对账 | JWT |
| POST | `/api/admin/reconciliation` | 自动修复 | JWT |

---

## 五、页面功能详解

### 5.1 主站页面

#### 首页（`/`）
- Hero 区域：产品标题、描述、CTA 按钮
- 数据统计栏：课程数、课时数、学员数、认证方向
- 价值主张：3 个特性卡片（体系化课程、前沿技术、专业认证）
- 免费课程推荐：3 门免费课程卡片
- 精品付费课程：6 门付费课程卡片
- 学习路径：3 条路径推荐
- 底部 CTA：注册引导

#### 课程列表（`/courses`）
- 大搜索框
- 分类标签筛选（12 个分类）
- 隐藏筛选面板（等级、排序、免费筛选）
- 课程卡片网格（渐变头部、分类图标、等级标签、价格、课时数、学员数）
- 空状态提示

#### 课程详情（`/courses/:id`）
- 顶部 Hero：课程信息、统计数据、购买/学习按钮、学习目标标签
- 左侧大纲：可折叠模块列表、课时列表（已解锁/锁定状态）
- 右侧内容：Markdown 渲染、代码高亮、Mermaid 图表
- 登录提示弹窗
- 未购买课程：显示锁定提示 + 购买按钮

#### 学习路径（`/paths`）
- 6 条预定义学习路径
- 每条路径包含课程列表

#### 认证考试（`/exams`）
- 4 场预定义考试
- 考试信息展示

#### 博客（`/blog`）
- 博客文章列表
- 分类标签

#### 个人中心（`/profile`）
- 用户信息卡片
- 快捷链接（我的课程、订单、证书、考试中心）
- 已报名课程列表

#### 我的订单（`/profile/orders`）
- 订单列表（订单号、课程、金额、状态、时间）
- 状态筛选

#### 登录（`/login`）
- 邮箱 + 密码登录
- 品牌展示面板

#### 注册（`/register`）
- 用户名 + 邮箱 + 验证码 + 密码
- 密码强度检查
- 邮箱验证码发送

### 5.2 管理后台页面

#### 仪表盘（`/admin`）
- 统计卡片（用户数、课程数、订单数、收入）

#### 课程管理（`/admin/courses`）
- 课程列表
- 创建/编辑课程

#### 用户管理（`/admin/users`）
- 用户列表（过滤管理员）
- 搜索、筛选
- 编辑用户角色、VIP 等级

#### 订单管理（`/admin/orders`）
- 订单列表
- 搜索、状态筛选
- 订单统计

#### 管理员管理（`/admin/admins`）
- 管理员列表
- 添加/删除管理员

#### 系统设置（`/admin/settings`）
- 基本设置（站点名称、描述、关键词）
- 联系方式
- 支付设置（商户ID、密钥、网关、回调域名）
- 邮件设置（SMTP）
- 其他设置（免费课时数、版权年份）

#### 数据对账（`/admin/reconciliation`）
- 订单-报名一致性检查
- 异常数据列表
- 一键自动修复

---

## 六、认证系统

### 6.1 主应用认证（NextAuth 4）

- **方式**：Credentials Provider（邮箱+密码）
- **存储**：JWT Session
- **加密**：bcrypt（12 轮）
- **邮箱验证**：6 位验证码，QQ 邮箱 SMTP 发送
- **验证码存储**：内存 Map（重启丢失）

### 6.2 管理后台认证（JWT）

- **方式**：自定义 JWT（jsonwebtoken）
- **存储**：httpOnly Cookie（`admin_token`）
- **过期**：7 天
- **独立于主应用**：管理后台使用 `admins` 表，主应用使用 `users` 表

---

## 七、支付系统

### 7.1 支付流程

```
用户点击购买 → 创建订单 → POST 表单提交到易支付 → 用户在易支付付款
    → 易支付异步回调 notify_url → 验签 → 更新订单状态 → 创建报名记录
    → 用户跳转 return_url → 轮询订单状态 → 显示结果 → 跳回课程页
```

### 7.2 签名算法

```
1. 参数按 key ASCII 排序
2. 除去 sign 和 sign_type
3. 跳过空值
4. 拼接 key=value&key=value
5. 末尾加上商户密钥
6. MD5 哈希，小写
```

### 7.3 支付配置

| 配置项 | 说明 | 当前值 |
|--------|------|--------|
| yipay_pid | 商户 ID | 3556 |
| yipay_key | 商户密钥 | 30Leou6ReVHFYRAOp9mr99DheOaX1DV6 |
| yipay_url | 网关地址 | https://www.ezfpy.cn |
| site_url | 本站域名 | http://localhost:3000 |

### 7.4 订单状态流转

```
创建 → pending → paid（支付成功）
                → expired（过期）
                → refunded（退款）
```

---

## 八、课时访问控制

### 8.1 访问规则

| 课程类型 | 用户状态 | 权限 |
|----------|----------|------|
| 免费 | 已登录 | 全部课时 |
| 免费 | 未登录 | 前 3 课时（IP 计数） |
| 付费 | 已登录 + 已报名 | 全部课时 |
| 付费 | 已登录 + 未报名 | 锁定 |
| 付费 | 未登录 | 锁定 |

### 8.2 实现方式

- **API 层**：`GET /api/lessons/:id` 检查课程价格 → 检查登录状态 → 检查报名记录
- **前端层**：检测 `locked` 字段，显示购买提示而非内容
- **IP 追踪**：`lessonViews` 表记录未登录用户的预览行为

---

## 九、主题系统

### 9.1 双色系

- **浅色模式**：白色背景、深色文字、indigo 强调色
- **深色模式**：深蓝背景、浅色文字、indigo 强调色

### 9.2 实现

- `ThemeProvider.tsx`：React Context + localStorage 持久化
- `ThemeToggle.tsx`：圆形扩散动画切换
- CSS 变量：40+ 设计令牌（背景、文字、边框、强调色等）
- `data-theme` 属性控制

---

## 十、当前数据

### 10.1 默认账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@aiacademy.com | admin123456 |
| 测试用户 | user@aiacademy.com | user123456 |

### 10.2 课程数据

- 12 个分类
- 33 门课程
- 102 个模块
- 323 个课时
- 涵盖：LLM、RAG、Agent、Prompt Engineering、Fine-tuning、CV、NLP、AI 安全、部署运维、AI 工具、多模态、AI 基础

### 10.3 其他数据

- 6 个成就
- 3 篇博客文章
- 2 个系统设置项
- 28 笔订单（测试数据）
- 2 条报名记录

---

## 十一、迁移与备份

### 11.1 迁移清单

```
整个项目目录（排除 node_modules、.next、.git、test-*）
数据库文件：prisma/dev.db（3MB，包含所有数据）
```

### 11.2 迁移步骤

1. 备份数据库：`cp prisma/dev.db ~/backup/`
2. 打包项目：`tar -czf ai-academy.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' .`
3. 上传到服务器
4. 解压：`tar -xzf ai-academy.tar.gz`
5. 安装依赖：`npm install && cd admin-app && npm install && cd ..`
6. 生成 Prisma Client：`npx prisma generate && cd admin-app && npx prisma generate --schema=../prisma/schema.prisma && cd ..`
7. 修改 `.env`（域名、密钥等）
8. 构建：`npm run build && cd admin-app && npm run build && cd ..`
9. 启动：`npm run start`（主应用）、`cd admin-app && npm run start`（管理后台）

### 11.3 需要修改的配置

**主应用 `.env`：**
- `NEXTAUTH_URL`：改为真实域名（如 `https://yourdomain.com`）
- `NEXTAUTH_SECRET`：改为随机密钥（`openssl rand -base64 32`）
- `NEXT_PUBLIC_APP_URL`：改为真实域名
- `EMAIL_USER` / `EMAIL_PASS`：邮箱 SMTP 配置

**管理后台 `admin-app/.env`：**
- `NEXTAUTH_URL`：改为管理后台域名（如 `https://admin.yourdomain.com`）
- `NEXT_PUBLIC_APP_URL`：改为主应用域名
- `YIPAY_PID`、`YIPAY_KEY`：支付商户配置

**管理后台系统设置：**
- 登录管理后台 → 系统设置
- `site_url`：改为真实域名（用于支付回调）

### 11.4 数据备份

**备份方式：** SQLite 数据库是单个文件，直接复制即可

```bash
# 手动备份
cp prisma/dev.db prisma/dev.db.backup.$(date +%Y%m%d%H%M%S)

# 使用备份脚本（保留最近 30 天）
bash scripts/backup.sh
```

**定时备份（Cron）：**
```bash
# 每天凌晨 3 点自动备份
0 3 * * * cd /path/to/ai-academy && bash scripts/backup.sh >> /var/log/ai-academy-backup.log 2>&1
```

**恢复数据：**
```bash
pm2 stop ai-academy ai-admin
cp backups/dev.db.20260608120000 prisma/dev.db
pm2 restart ai-academy ai-admin
```

### 11.5 当前数据统计

| 数据 | 数量 |
|------|------|
| 用户 | 2 |
| 管理员 | 1 |
| 课程分类 | 12 |
| 课程 | 33 |
| 模块 | 102 |
| 课时 | 323 |
| 订单 | 28 |
| 支付记录 | 28 |
| 成就 | 6 |
| 博客 | 3 |
| 数据库大小 | 3MB |

---

## 十二、依赖列表

### 主应用

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "next-auth": "4.24.14",
    "@prisma/client": "6.19.3",
    "bcryptjs": "3.0.2",
    "react-markdown": "10.1.0",
    "remark-gfm": "4.0.1",
    "prism-react-renderer": "2.4.1",
    "mermaid": "11.9.0",
    "react-hot-toast": "2.5.2",
    "lucide-react": "0.511.0",
    "jsonwebtoken": "9.0.2"
  },
  "devDependencies": {
    "typescript": "5.x",
    "prisma": "6.19.3",
    "@types/node": "22.x",
    "@types/react": "19.x",
    "@types/bcryptjs": "3.0.0",
    "@types/jsonwebtoken": "9.0.0",
    "tailwindcss": "4.x",
    "@tailwindcss/postcss": "4.x",
    "postcss": "8.x",
    "eslint": "9.x",
    "eslint-config-next": "16.x"
  }
}
```

### 管理后台

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "@prisma/client": "6.19.3",
    "bcryptjs": "3.0.2",
    "jsonwebtoken": "9.0.2",
    "lucide-react": "0.511.0",
    "react-hot-toast": "2.5.2"
  }
}
```
