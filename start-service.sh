#!/bin/bash

# 通用服务启动脚本
# 用法: ./start-service.sh <服务名> <端口>
# 示例: ./start-service.sh resume-builder 3000

SERVICE_NAME=$1
PORT=$2

if [ -z "$SERVICE_NAME" ] || [ -z "$PORT" ]; then
    echo "用法: $0 <服务名> <端口>"
    echo "示例: $0 resume-builder 3000"
    exit 1
fi

echo "准备启动 $SERVICE_NAME (端口: $PORT)..."

# 检查端口是否被占用
PID=$(lsof -ti :$PORT 2>/dev/null)

if [ ! -z "$PID" ]; then
    echo "端口 $PORT 被进程 $PID 占用，正在终止..."
    kill -9 $PID 2>/dev/null
    sleep 1
    echo "进程 $PID 已终止"
fi

# 启动服务
echo "启动 $SERVICE_NAME..."
cd /home/tyche/$SERVICE_NAME && pm2 start ecosystem.config.js

echo "$SERVICE_NAME 启动完成"
