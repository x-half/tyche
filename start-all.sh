#!/bin/bash

# 启动所有 Tyche 服务
# 在启动前会检查端口是否被占用，如果被占用会先终止占用进程

echo "=== Tyche 服务启动脚本 ==="
echo ""

# 定义服务和端口
SERVICES=(
    "news-site:3031"
    "resume-builder:3000"
    "analytics:3033"
)

# 启动每个服务
for SERVICE_ENTRY in "${SERVICES[@]}"; do
    SERVICE_NAME="${SERVICE_ENTRY%%:*}"
    PORT="${SERVICE_ENTRY##*:}"
    
    echo "--- 启动 $SERVICE_NAME (端口: $PORT) ---"
    
    # 检查端口是否被占用
    PID=$(lsof -ti :$PORT 2>/dev/null)
    
    if [ ! -z "$PID" ]; then
        echo "  端口 $PORT 被进程 $PID 占用，正在终止..."
        kill -9 $PID 2>/dev/null
        sleep 1
        echo "  进程 $PID 已终止"
    else
        echo "  端口 $PORT 空闲"
    fi
    
    # 启动服务
    cd /home/tyche/$SERVICE_NAME && pm2 start ecosystem.config.js
    echo "  $SERVICE_NAME 启动完成"
    echo ""
done

echo "=== 所有服务启动完成 ==="
echo ""
pm2 list
