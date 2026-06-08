#!/bin/bash
# 学AI 数据库备份脚本
# 用法: bash scripts/backup.sh

BACKUP_DIR="backups"
DB_FILE="prisma/dev.db"
KEEP_DAYS=30

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 检查数据库文件
if [ ! -f "$DB_FILE" ]; then
  echo "错误: 数据库文件不存在: $DB_FILE"
  exit 1
fi

# 生成备份文件名
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_FILE="$BACKUP_DIR/dev.db.$TIMESTAMP"

# 备份
cp "$DB_FILE" "$BACKUP_FILE"
echo "备份完成: $BACKUP_FILE"

# 清理过期备份
find "$BACKUP_DIR" -name "dev.db.*" -mtime +$KEEP_DAYS -delete 2>/dev/null
echo "已清理 $KEEP_DAYS 天前的备份"

# 显示当前备份
echo ""
echo "当前备份文件:"
ls -lh "$BACKUP_DIR"/dev.db.* 2>/dev/null
