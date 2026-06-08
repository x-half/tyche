import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * 对账接口：检查订单表和报名表数据一致性
 * GET /api/admin/reconciliation
 * 
 * 逻辑：
 * 1. 查找所有已支付的课程订单
 * 2. 检查每个订单是否在 enrollment 表中有对应记录
 * 3. 记录不匹配的异常
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    // 获取所有已支付的课程订单
    const paidOrders = await prisma.order.findMany({
      where: {
        status: "paid",
        type: "course",
        courseId: { not: null },
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true } },
      },
    });

    const mismatches: any[] = [];
    const matched: any[] = [];

    for (const order of paidOrders) {
      if (!order.courseId) continue;

      // 检查是否有对应的报名记录
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: order.userId,
            courseId: order.courseId,
          },
        },
      });

      if (enrollment) {
        matched.push({
          orderId: order.id,
          orderNo: order.orderNo,
          userId: order.userId,
          userName: order.user?.name,
          courseId: order.courseId,
          courseName: order.course?.title,
          status: "matched",
        });
      } else {
        mismatches.push({
          orderId: order.id,
          orderNo: order.orderNo,
          userId: order.userId,
          userName: order.user?.name,
          userEmail: order.user?.email,
          courseId: order.courseId,
          courseName: order.course?.title,
          amount: order.amount,
          paidAt: order.paidAt,
          status: "missing_enrollment",
          issue: "已支付但未创建报名记录",
        });
      }
    }

    // 反向检查：有报名但没有已支付订单的情况
    const enrollments = await prisma.enrollment.findMany({
      where: { orderId: { not: null } },
    });

    for (const enrollment of enrollments) {
      if (!enrollment.orderId) continue;
      const order = await prisma.order.findUnique({
        where: { id: enrollment.orderId },
        select: { id: true, status: true, orderNo: true },
      });
      if (order && order.status !== "paid") {
        mismatches.push({
          enrollmentId: enrollment.id,
          userId: enrollment.userId,
          courseId: enrollment.courseId,
          orderId: enrollment.orderId,
          orderNo: order.orderNo,
          orderStatus: order.status,
          status: "invalid_enrollment",
          issue: "报名记录存在但订单未支付",
        });
      }
    }

    const summary = {
      totalPaidOrders: paidOrders.length,
      matched: matched.length,
      mismatches: mismatches.length,
      isConsistent: mismatches.length === 0,
    };

    return NextResponse.json({
      summary,
      mismatches,
      matched: matched.slice(0, 10), // 只返回前10条匹配记录
    });
  } catch (error) {
    console.error("Reconciliation error:", error);
    return NextResponse.json({ error: "对账失败" }, { status: 500 });
  }
}

/**
 * 自动修复：为缺失报名记录的已支付订单创建报名
 * POST /api/admin/reconciliation
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    // 找到已支付但没有报名记录的订单
    const paidOrders = await prisma.order.findMany({
      where: {
        status: "paid",
        type: "course",
        courseId: { not: null },
      },
    });

    let fixed = 0;
    const errors: string[] = [];

    for (const order of paidOrders) {
      if (!order.courseId) continue;

      const existing = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: order.userId,
            courseId: order.courseId,
          },
        },
      });

      if (!existing) {
        try {
          await prisma.$transaction(async (tx) => {
            await tx.enrollment.create({
              data: {
                userId: order.userId,
                courseId: order.courseId!,
                orderId: order.id,
                progress: 0,
              },
            });
            await tx.course.update({
              where: { id: order.courseId! },
              data: { totalStudents: { increment: 1 } },
            });
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
