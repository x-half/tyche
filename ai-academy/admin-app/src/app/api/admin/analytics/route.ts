import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 获取最近30天的数据
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 每日注册用户
    const dailyUsers = await prisma.user.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: true,
    });

    // 每日订单
    const dailyOrders = await prisma.order.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: thirtyDaysAgo }, status: "paid" },
      _count: true,
      _sum: { amount: true },
    });

    // 课程统计
    const courseStats = await prisma.course.groupBy({
      by: ["status"],
      _count: true,
    });

    // 用户角色统计
    const userRoleStats = await prisma.user.groupBy({
      by: ["role"],
      _count: true,
    });

    // 热门课程 TOP10
    const topCourses = await prisma.course.findMany({
      take: 10,
      orderBy: { totalStudents: "desc" },
      select: {
        id: true,
        title: true,
        totalStudents: true,
        rating: true,
        price: true,
      },
    });

    // 收入统计
    const totalRevenue = await prisma.order.aggregate({
      where: { status: "paid" },
      _sum: { amount: true },
    });

    const monthlyRevenue = await prisma.order.aggregate({
      where: {
        status: "paid",
        createdAt: { gte: thirtyDaysAgo },
      },
      _sum: { amount: true },
    });

    // 用户学习进度
    const progressStats = await prisma.userProgress.groupBy({
      by: ["status"],
      _count: true,
    });

    return NextResponse.json({
      dailyUsers: dailyUsers.length,
      dailyOrders: dailyOrders.length,
      courseStats,
      userRoleStats,
      topCourses,
      totalRevenue: totalRevenue._sum.amount || 0,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      progressStats,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "获取分析数据失败" }, { status: 500 });
  }
}
