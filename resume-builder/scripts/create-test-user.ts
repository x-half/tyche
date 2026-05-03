import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const prisma = new PrismaClient();

  const hashedPassword = await bcrypt.hash('test123456', 10);

  const user = await prisma.user.upsert({
    where: { email: '3328761594@qq.com' },
    update: {},
    create: {
      email: '3328761594@qq.com',
      password: hashedPassword,
      name: '测试用户',
      emailVerified: new Date(),
    },
  });

  console.log('测试账号创建成功:', JSON.stringify(user, null, 2));
  await prisma.$disconnect();
}

main().catch(console.error);
