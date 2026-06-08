import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [users, courses, orders, paidOrders] = await Promise.all([
      prisma.user.count(),
      prisma.course.count({ where: { status: "published" } }),
      prisma.order.count(),
      prisma.order.findMany({ where: { status: "paid" }, select: { amount: true } }),
    ]);

    const revenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);

    return NextResponse.json({ users, courses, orders, revenue });
  } catch (error) {
    console.error("Fetch admin stats error:", error);
    return NextResponse.json({ error: "获取统计数据失败" }, { status: 500 });
  }
}
