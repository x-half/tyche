module.exports = {
  apps: [{
    name: 'resume-builder',
    script: 'npm',
    args: 'start',
    cwd: '/home/tyche/resume-builder',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'file:/home/tyche/resume-builder/prisma/dev.db',
      NEXTAUTH_URL: 'https://resume.tyche.love',
      NEXTAUTH_SECRET: 'resume-builder-tyche-love-secret-2024-prod',
      SMTP_HOST: 'smtp.qq.com',
      SMTP_PORT: '465',
      SMTP_USER: 'half-x@qq.com',
      SMTP_PASS: 'qrttmzdcwntqcgif',
      SMTP_FROM: 'half-x@qq.com',
      APP_NAME: 'ResumeBuilder',
      APP_URL: 'https://resume.tyche.love'
    }
  }]
}