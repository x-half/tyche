import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "未登录" }, { status: 401 });

    const orders = await prisma.order.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: "desc" },
      include: { course: { select: { id: true, title: true } } },
    });

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "获取订单失败" }, { status: 500 });
  }
}
