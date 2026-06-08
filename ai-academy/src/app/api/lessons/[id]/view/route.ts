import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const FREE_LIMIT = 3;

// POST - 记录课时预览（未登录用户）
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: lessonId } = await params;

  // 已登录用户不受限制
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return NextResponse.json({ allowed: true, viewed: 0, limit: FREE_LIMIT });
  }

  // 获取客户端 IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";

  // 查询该 IP 已预览的不同课时数
  const viewedCount = await prisma.lessonView.count({
    where: { ip },
  });

  // 检查是否已记录过该课时
  const existing = await prisma.lessonView.findUnique({
    where: { ip_lessonId: { ip, lessonId } },
  });

  if (!existing) {
    if (viewedCount >= FREE_LIMIT) {
      return NextResponse.json({ allowed: false, viewed: viewedCount, limit: FREE_LIMIT });
    }

    // 记录本次预览
    await prisma.lessonView.create({
      data: { ip, lessonId },
    });
  }

  return NextResponse.json({ allowed: true, viewed: existing ? viewedCount : viewedCount + 1, limit: FREE_LIMIT });
}
