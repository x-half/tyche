import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the max sortOrder for this module
    const maxLesson = await prisma.lesson.findFirst({
      where: { moduleId: body.moduleId },
      orderBy: { sortOrder: "desc" },
    });

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, "-")
      .replace(/(^-|-$)/g, "") || `lesson-${Date.now()}`;

    const lesson = await prisma.lesson.create({
      data: {
        ...body,
        slug,
        sortOrder: (maxLesson?.sortOrder || 0) + 1,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Create lesson error:", error);
    return NextResponse.json({ error: "创建课时失败" }, { status: 500 });
  }
}
