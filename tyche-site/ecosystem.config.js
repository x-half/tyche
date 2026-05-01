module.exports = {
  apps: [{
    name: 'tyche-site',
    script: 'node_modules/.bin/next',
    args: 'start -p 3032 -H 127.0.0.1',
    cwd: '/home/tyche/tyche-site',
    instances: 1,
    autorestart: true,
    watch: false,
    memory_limit: 512
  }]
}
