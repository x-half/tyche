import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: { select: { id: true, title: true } },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "课时不存在" }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Get lesson error:", error);
    return NextResponse.json({ error: "获取课时失败" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const lesson = await prisma.lesson.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Update lesson error:", error);
    return NextResponse.json({ error: "更新课时失败" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.lesson.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete lesson error:", error);
    return NextResponse.json({ error: "删除课时失败" }, { status: 500 });
  }
}
