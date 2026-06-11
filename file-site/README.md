# 文件下载服务说明

## 服务信息

- 服务地址：`https://file.tyche.love`
- 服务端口：3501（仅内部访问）
- 配置文件：`/home/tyche/file-site/resources.json`
- 二进制文件：`/home/tyche/file-site/auth`
- 文件目录：`/home/tyche/file-site/files/`

## 添加新资源

### 第一步：生成随机ID

```bash
openssl rand -hex 8
```

输出示例：`a1b2c3d4e5f6g7h8`

### 第二步：生成随机密钥

```bash
openssl rand -base64 24
```

输出示例：`kL9xM2nP5qR8sT1vW3yZ6aB4cD7eF0gH`

### 第三步：上传文件

把文件放到 `/home/tyche/file-site/files/` 目录

### 第四步：编辑配置文件

编辑 `/home/tyche/file-site/resources.json`，添加新资源：

```json
[
  {
    "id": "xK9mP2vL7nQ4wR8j",
    "title": "Codex + DeepSeek 配置教程",
    "filename": "codex-deepseek-resources.zip",
    "file": "/home/tyche/file-site/files/codex-deepseek-resources.zip",
    "key": "yJGcG6VbGkjR9zbbsqJnkROteAKwxYEw"
  },
  {
    "id": "生成的随机ID",
    "title": "资源标题",
    "filename": "文件名.zip",
    "file": "/home/tyche/file-site/files/文件名.zip",
    "key": "生成的随机密钥"
  }
]
```

### 第五步：重启服务

```bash
systemctl restart file-auth
```

## 配置字段说明

| 字段 | 说明 |
|------|------|
| id | 资源唯一标识，用于访问路径 |
| title | 资源标题，显示在页面上 |
| filename | 下载时的文件名 |
| file | 服务器上的文件完整路径 |
| key | 下载密钥，用户输入正确才能下载 |

## 访问方式

- 页面：`https://file.tyche.love/{资源ID}`
- API：`https://file.tyche.love/api/{资源ID}`

## 服务管理

```bash
# 查看状态
systemctl status file-auth

# 重启服务
systemctl restart file-auth

# 停止服务
systemctl stop file-auth

# 查看日志
journalctl -u file-auth
```

## 注意事项

1. 添加新资源后必须重启服务才能生效
2. 密钥必须足够复杂，防止被猜到
3. 资源ID也必须足够复杂，防止被遍历
4. 文件路径必须是绝对路径
