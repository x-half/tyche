import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalUsers, totalCourses, totalOrders, totalRevenue, recentOrders, popularCourses] =
      await Promise.all([
        prisma.user.count(),
        prisma.course.count(),
        prisma.order.count({ where: { status: "paid" } }),
        prisma.order.aggregate({
          where: { status: "paid" },
          _sum: { amount: true },
        }),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { user: { select: { name: true, email: true } }, course: { select: { title: true } } },
        }),
        prisma.course.findMany({
          take: 5,
          orderBy: { totalStudents: "desc" },
          select: { id: true, title: true, totalStudents: true, price: true },
        }),
      ]);

    // 获取本月数据
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [monthlyUsers, monthlyOrders, monthlyRevenue] = await Promise.all([
      prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.count({ where: { status: "paid", createdAt: { gte: startOfMonth } } }),
      prisma.order.aggregate({
        where: { status: "paid", createdAt: { gte: startOfMonth } },
        _sum: { amount: true },
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalCourses,
      totalOrders,
      totalRevenue: totalRevenue._sum.amount || 0,
      monthlyUsers,
      monthlyOrders,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      recentOrders,
      popularCourses,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "获取统计数据失败" }, { status: 500 });
  }
}
