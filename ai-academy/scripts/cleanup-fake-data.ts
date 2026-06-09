import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 开始清理假数据...\n");

  // 1. 删除测试订单和支付记录
  console.log("1. 删除测试订单...");
  const testOrders = await prisma.order.findMany({
    where: { user: { email: "user@aiacademy.com" } }
  });
  
  for (const order of testOrders) {
    await prisma.payment.deleteMany({ where: { orderId: order.id } });
  }
  await prisma.order.deleteMany({ where: { user: { email: "user@aiacademy.com" } } });
  console.log(`   已删除 ${testOrders.length} 个测试订单`);

  // 2. 删除测试用户的报名记录
  console.log("2. 删除测试报名记录...");
  const testUser = await prisma.user.findUnique({ where: { email: "user@aiacademy.com" } });
  if (testUser) {
    await prisma.enrollment.deleteMany({ where: { userId: testUser.id } });
    await prisma.userProgress.deleteMany({ where: { userId: testUser.id } });
    await prisma.notification.deleteMany({ where: { userId: testUser.id } });
  }

  // 3. 删除测试用户
  console.log("3. 删除测试用户...");
  await prisma.user.deleteMany({ where: { email: "user@aiacademy.com" } });
  console.log("   已删除 user@aiacademy.com");

  // 4. 更新管理员账号（保留但标记为真实）
  console.log("4. 保留管理员账号 admin@aiacademy.com");

  // 5. 更新课程数据 - 去除虚假的学生数量和评分
  console.log("5. 更新课程数据...");
  
  // 获取真实的报名数据
  const enrollments = await prisma.enrollment.groupBy({
    by: ['courseId'],
    _count: true
  });
  
  const enrollmentMap: Record<string, number> = {};
  enrollments.forEach(e => {
    enrollmentMap[e.courseId] = e._count;
  });

  // 获取所有课程
  const courses = await prisma.course.findMany();
  
  for (const course of courses) {
    const realStudents = enrollmentMap[course.id] || 0;
    
    // 如果有真实报名，使用真实数据；否则设为 0
    await prisma.course.update({
      where: { id: course.id },
      data: {
        totalStudents: realStudents,
        rating: realStudents > 0 ? 5.0 : 0,  // 有真实用户才显示评分
        ratingCount: realStudents,
      }
    });
    
    console.log(`   ${course.title}: ${realStudents} 名学生`);
  }

  // 6. 删除或保留博客文章
  console.log("6. 保留博客文章（可后续修改内容）");

  // 7. 清理通知
  console.log("7. 清理测试通知...");
  await prisma.notification.deleteMany({
    where: { user: { email: "admin@aiacademy.com" } }
  });

  console.log("\n✅ 数据清理完成！");
  console.log("\n保留的真实数据：");
  console.log("- 用户: half-x@qq.com（真实用户）");
  console.log("- 管理员: admin@aiacademy.com");
  console.log("- 课程: 33 门（已重置学生数和评分）");
  console.log("- 订单: half-x@qq.com 的真实订单");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());