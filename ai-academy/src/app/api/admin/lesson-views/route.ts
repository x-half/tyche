import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - 管理员查看课时预览记录
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    // 获取所有预览记录，按时间倒序
    const views = await prisma.lessonView.findMany({
      orderBy: { viewedAt: "desc" },
      take: 500,
    });

    // 按 IP 分组统计
    const ipStats: Record<string, { count: number; lessons: string[]; lastView: string }> = {};
    for (const view of views) {
      if (!ipStats[view.ip]) {
        ipStats[view.ip] = { count: 0, lessons: [], lastView: view.viewedAt.toISOString() };
      }
      ipStats[view.ip].count++;
      if (!ipStats[view.ip].lessons.includes(view.lessonId)) {
        ipStats[view.ip].lessons.push(view.lessonId);
      }
    }

    // 总览统计
    const totalViews = views.length;
    const uniqueIPs = Object.keys(ipStats).length;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayViews = views.filter(v => v.viewedAt >= todayStart).length;

    return NextResponse.json({
      summary: { totalViews, uniqueIPs, todayViews },
      ipStats,
      recentViews: views.slice(0, 100).map(v => ({
        id: v.id,
        ip: v.ip,
        lessonId: v.lessonId,
        viewedAt: v.viewedAt.toISOString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}
