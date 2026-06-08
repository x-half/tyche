import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const paidOrders = await prisma.order.findMany({
      where: { status: "paid", type: "course", courseId: { not: null } },
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true } },
      },
    });

    const mismatches: any[] = [];
    const matched: any[] = [];

    for (const order of paidOrders) {
      if (!order.courseId) continue;
      const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: order.userId, courseId: order.courseId } },
      });

      if (enrollment) {
        matched.push({ orderId: order.id, orderNo: order.orderNo, userId: order.userId, userName: order.user?.name, courseId: order.courseId, courseName: order.course?.title, status: "matched" });
      } else {
        mismatches.push({ orderId: order.id, orderNo: order.orderNo, userId: order.userId, userName: order.user?.name, userEmail: order.user?.email, courseId: order.courseId, courseName: order.course?.title, amount: order.amount, paidAt: order.paidAt, status: "missing_enrollment", issue: "已支付但未创建报名记录" });
      }
    }

    const summary = { totalPaidOrders: paidOrders.length, matched: matched.length, mismatches: mismatches.length, isConsistent: mismatches.length === 0 };

    return NextResponse.json({ summary, mismatches, matched: matched.slice(0, 10) });
  } catch (error) {
    console.error("Reconciliation error:", error);
    return NextResponse.json({ error: "对账失败" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const paidOrders = await prisma.order.findMany({
      where: { status: "paid", type: "course", courseId: { not: null } },
    });

    let fixed = 0;
    const errors: string[] = [];

    for (const order of paidOrders) {
      if (!order.courseId) continue;
      const existing = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: order.userId, courseId: order.courseId } },
      });

      if (!existing) {
        try {
          await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            await tx.enrollment.create({ data: { userId: order.userId, courseId: order.courseId!, orderId: order.id, progress: 0 } });
            await tx.course.update({ where: { id: order.courseId! }, data: { totalStudents: { increment: 1 } } });
          });
          fixed++;
        } catch (e) {
          errors.push(`订单 ${order.orderNo}: ${e}`);
        }
      }
    }

    return NextResponse.json({ fixed, errors });
  } catch (error) {
    console.error("Reconciliation fix error:", error);
    return NextResponse.json({ error: "修复失败" }, { status: 500 });
  }
}
