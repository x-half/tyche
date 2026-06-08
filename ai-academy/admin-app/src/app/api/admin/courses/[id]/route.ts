import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
        modules: {
          orderBy: { sortOrder: "asc" },
          include: {
            lessons: {
              orderBy: { sortOrder: "asc" },
              select: {
                id: true,
                title: true,
                slug: true,
                type: true,
                content: true,
                duration: true,
                sortOrder: true,
                isFree: true,
                isPreview: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
            orders: { where: { status: "paid" } },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "课程不存在" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Get course error:", error);
    return NextResponse.json({ error: "获取课程失败" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const course = await prisma.course.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json({ error: "更新课程失败" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.course.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json({ error: "删除课程失败" }, { status: 500 });
  }
}
