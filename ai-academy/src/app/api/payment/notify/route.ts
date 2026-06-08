import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifySign } from "@/lib/yipay";

/**
 * 易支付异步通知回调（notify_url）
 * GET 请求，参数通过 query string 传递
 * 验签成功返回 "success"，失败返回 "error"
 */
export async function GET(req: NextRequest) {
  try {
    const params: Record<string, string> = {};
    req.nextUrl.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    console.log("📩 Payment notify:", params);

    // 验签
    if (!verifySign(params)) {
      console.error("❌ Sign verification failed");
      return new NextResponse("error", { status: 400 });
    }

    const { out_trade_no, trade_no, trade_status } = params;

    if (!out_trade_no) {
      return new NextResponse("error", { status: 400 });
    }

    // 查询订单
    const order = await prisma.order.findUnique({ where: { orderNo: out_trade_no } });
    if (!order) {
      console.error("❌ Order not found:", out_trade_no);
      return new NextResponse("error", { status: 400 });
    }

    // 已支付的订单不重复处理
    if (order.status === "paid") {
      return new NextResponse("success");
    }

    if (trade_status === "TRADE_SUCCESS" || trade_status === "TRADE_FINISHED") {
      await prisma.$transaction(async (tx) => {
        // 更新订单
        await tx.order.update({
          where: { id: order.id },
          data: { status: "paid", tradeNo: trade_no || "", paidAt: new Date() },
        });

        // 更新支付记录
        await tx.payment.updateMany({
          where: { orderId: order.id },
          data: {
            status: "paid",
            tradeNo: trade_no || "",
            notifyData: JSON.stringify(params),
          },
        });

        // 课程订单：创建报名
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

        // 通知用户
        await tx.notification.create({
          data: {
            userId: order.userId,
            type: "payment",
            title: "支付成功",
            content: `您的订单 ${out_trade_no} 已支付成功`,
            link: order.courseId ? `/learn/${order.courseId}` : undefined,
          },
        });
      });

      console.log("✅ Payment success:", out_trade_no);
    }

    return new NextResponse("success");
  } catch (error) {
    console.error("Payment notify error:", error);
    return new NextResponse("error", { status: 500 });
  }
}
