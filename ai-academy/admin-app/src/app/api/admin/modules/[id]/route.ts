import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true } },
        lessons: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!module) {
      return NextResponse.json({ error: "模块不存在" }, { status: 404 });
    }

    return NextResponse.json(module);
  } catch (error) {
    console.error("Get module error:", error);
    return NextResponse.json({ error: "获取模块失败" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const module = await prisma.module.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Update module error:", error);
    return NextResponse.json({ error: "更新模块失败" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.module.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete module error:", error);
    return NextResponse.json({ error: "删除模块失败" }, { status: 500 });
  }
}
