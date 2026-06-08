import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { buildPayParams } from "@/lib/yipay";
import { generateOrderNo } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "请先登录" }, { status: 401 });

    const { courseId, examId, type = "course", paymentMethod = "alipay" } = await req.json();

    let amount = 0;
    let name = "";

    if (type === "course" && courseId) {
      const course = await prisma.course.findUnique({ where: { id: courseId } });
      if (!course) return NextResponse.json({ error: "课程不存在" }, { status: 404 });

      const existing = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: (session.user as any).id, courseId } },
      });
      if (existing) return NextResponse.json({ error: "您已购买过该课程" }, { status: 400 });

      amount = course.price;
      name = course.title;
    } else if (type === "exam" && examId) {
      const exam = await prisma.exam.findUnique({ where: { id: examId } });
      if (!exam) return NextResponse.json({ error: "考试不存在" }, { status: 404 });
      amount = exam.price;
      name = exam.title;
    } else {
      return NextResponse.json({ error: "参数错误" }, { status: 400 });
    }

    const orderNo = generateOrderNo();

    // 从数据库读取支付配置，优先级：数据库 > .env
    const dbSettings = await prisma.systemSetting.findMany({
      where: { key: { in: ["yipay_pid", "yipay_key", "yipay_url", "site_url"] } },
    });
    const settings: Record<string, string> = {};
    dbSettings.forEach(s => { settings[s.key] = s.value; });

    const siteUrl = settings.site_url || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const notifyUrl = `${siteUrl}/api/payment/notify`;
    const returnUrl = `${siteUrl}/payment/callback`;

    // 创建订单
    const order = await prisma.order.create({
      data: {
        orderNo,
        userId: (session.user as any).id,
        courseId: type === "course" ? courseId : undefined,
        examId: type === "exam" ? examId : undefined,
        type,
        amount,
        status: "pending",
        paymentMethod,
        expiredAt: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    // 创建支付记录
    await prisma.payment.create({
      data: {
        orderId: order.id,
        pid: process.env.YIPAY_PID || "",
        type: paymentMethod,
        money: amount,
        status: "pending",
      },
    });

    // 构建支付参数（POST 表单提交）
    // return_url 带上 courseId，支付完跳回课程页
    const returnParams = new URLSearchParams({ orderNo });
    if (courseId) returnParams.set("courseId", courseId);

    const { payUrl, payParams } = buildPayParams({
      orderNo,
      name,
      money: amount.toFixed(2),
      type: paymentMethod,
      notifyUrl,
      returnUrl: `${returnUrl}?${returnParams.toString()}`,
      pid: settings.yipay_pid,
      key: settings.yipay_key,
      apiUrl: settings.yipay_url,
    });

    return NextResponse.json({ success: true, data: { orderNo, payUrl, payParams, amount, courseId } });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "创建支付失败" }, { status: 500 });
  }
}
