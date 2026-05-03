#!/bin/bash

# ResumeBuilder 生产环境启动脚本

# 设置环境变量
export NODE_ENV=production
export DATABASE_URL="file:$(pwd)/prisma/dev.db"
export NEXTAUTH_URL="https://resume.tyche.love"
export NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# 邮件配置
export SMTP_HOST="smtp.qq.com"
export SMTP_PORT="465"
export SMTP_USER="half-x@qq.com"
export SMTP_PASS="qrttmzdcwntqcgif"
export SMTP_FROM="half-x@qq.com"

# 应用配置
export APP_NAME="ResumeBuilder"
export APP_URL="https://resume.tyche.love"

# 运行数据库迁移
echo "Running database migrations..."
npx prisma migrate deploy

# 构建项目
echo "Building project..."
npm run build

# 启动应用
echo "Starting application..."
npm run start