module.exports = {
  apps: [{
    name: 'news-site',
    script: 'node_modules/.bin/next',
    args: 'start -p 3031 -H 127.0.0.1',
    cwd: '/home/tyche/news-site',
    instances: 1,
    autorestart: true,
    watch: false,
    memory_limit: 512
  }]
}
