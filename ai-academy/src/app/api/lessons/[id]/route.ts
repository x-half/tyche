import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const FREE_PREVIEW_LIMIT = 3;

// 返回锁定课时的元数据（不含内容）
function lockedResponse(lesson: any) {
  return NextResponse.json({
    id: lesson.id,
    title: lesson.title,
    slug: lesson.slug,
    type: lesson.type,
    duration: lesson.duration,
    sortOrder: lesson.sortOrder,
    isFree: lesson.isFree,
    moduleId: lesson.moduleId,
    module: lesson.module,
    content: null,
    locked: true,
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            courseId: true,
            isFree: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "课时不存在" }, { status: 404 });
    }

    // 查询课程
    const course = await prisma.course.findUnique({
      where: { id: lesson.module.courseId },
      select: { isFree: true },
    });

    if (!course) {
      return NextResponse.json({ error: "课程不存在" }, { status: 404 });
    }

    // 付费课程：必须登录 + 已报名
    if (!course.isFree) {
      const session = await getServerSession(authOptions);
      const userId = (session?.user as { id?: string })?.id;

      if (!userId) {
        return lockedResponse(lesson);
      }

      const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId: lesson.module.courseId } },
      });

      if (!enrollment) {
        return lockedResponse(lesson);
      }

      return NextResponse.json(lesson);
    }

    // 免费课程：已登录用户全部开放
    const session = await getServerSession(authOptions);
    if (session?.user) {
      return NextResponse.json(lesson);
    }

    // 免费课程 + 未登录：限制预览 3 课时（按 IP 计数）
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    // 查询该 IP 已预览的不同课时数
    const viewedCount = await prisma.lessonView.count({
      where: { ip },
    });

    // 检查是否已记录过该课时
    const existing = await prisma.lessonView.findUnique({
      where: { ip_lessonId: { ip, lessonId: id } },
    });

    if (!existing) {
      if (viewedCount >= FREE_PREVIEW_LIMIT) {
        return NextResponse.json({
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          type: lesson.type,
          duration: lesson.duration,
          sortOrder: lesson.sortOrder,
          isFree: lesson.isFree,
          moduleId: lesson.moduleId,
          module: lesson.module,
          content: null,
          locked: true,
          reason: "preview_limit",
          previewLimit: FREE_PREVIEW_LIMIT,
          previewUsed: viewedCount,
        });
      }

      // 记录本次预览
      await prisma.lessonView.create({
        data: { ip, lessonId: id },
      });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Fetch lesson error:", error);
    return NextResponse.json({ error: "获取课时内容失败" }, { status: 500 });
  }
}
