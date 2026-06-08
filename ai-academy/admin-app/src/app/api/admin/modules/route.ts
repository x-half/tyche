import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the max sortOrder for this course
    const maxModule = await prisma.module.findFirst({
      where: { courseId: body.courseId },
      orderBy: { sortOrder: "desc" },
    });

    const module = await prisma.module.create({
      data: {
        ...body,
        sortOrder: (maxModule?.sortOrder || 0) + 1,
      },
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Create module error:", error);
    return NextResponse.json({ error: "创建模块失败" }, { status: 500 });
  }
}
