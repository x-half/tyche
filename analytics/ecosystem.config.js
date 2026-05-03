module.exports = {
  apps: [{
    name: 'analytics',
    script: 'server/server.js',
    cwd: '/home/tyche/analytics',
    instances: 1,
    autorestart: true,
    watch: false,
    memory_limit: 256
  }]
}
