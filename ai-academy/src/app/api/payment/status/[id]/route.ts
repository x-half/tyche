import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { queryOrder } from "@/lib/yipay";

/**
 * 查询订单支付状态
 * GET /api/payment/status/[id]  (id = orderNo)
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "未登录" }, { status: 401 });

    const { id: orderNo } = await params;

    const order = await prisma.order.findUnique({ where: { orderNo } });
    if (!order) return NextResponse.json({ error: "订单不存在" }, { status: 404 });
    if (order.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "无权查看" }, { status: 403 });
    }

    // 如果本地还是 pending，向易支付查询最新状态
    if (order.status === "pending") {
      try {
        const result = await queryOrder(orderNo);
        if (result.code === 1 && result.status === "TRADE_SUCCESS") {
          await prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: order.id },
              data: { status: "paid", tradeNo: result.trade_no || "", paidAt: new Date() },
            });
            await tx.payment.updateMany({
              where: { orderId: order.id },
              data: { status: "paid", tradeNo: result.trade_no || "" },
            });
            if (order.courseId) {
              const existing = await tx.enrollment.findUnique({
                where: { userId_courseId: { userId: order.userId, courseId: order.courseId } },
              });
              if (!existing) {
                await tx.enrollment.create({
                  data: { userId: order.userId, courseId: order.courseId, orderId: order.id },
                });
                await tx.course.update({
                  where: { id: order.courseId },
                  data: { totalStudents: { increment: 1 } },
                });
              }
            }
          });
          order.status = "paid";
        }
      } catch (e) {
        console.error("Query order failed:", e);
      }
    }

    return NextResponse.json({ status: order.status, orderNo: order.orderNo });
  } catch (error) {
    console.error("Payment status error:", error);
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}
