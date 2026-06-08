import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          select: { id: true, title: true, slug: true, coverImage: true },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    return NextResponse.json({ error: "获取注册信息失败" }, { status: 500 });
  }
}
