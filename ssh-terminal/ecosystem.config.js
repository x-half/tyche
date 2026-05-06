module.exports = {
  apps: [{
    name: 'ssh-terminal',
    script: 'server.js',
    cwd: '/home/tyche/ssh-terminal',
    env: {
      NODE_ENV: 'production',
      PORT: 3500,
      SSH_USERS: 'tyche:tyche2026',
      SESSION_SECRET: 'tyche-ssh-secret-key-2026'
    }
  }]
};
