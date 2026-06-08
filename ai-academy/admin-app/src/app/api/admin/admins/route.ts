import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET - 获取管理员列表
export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json({ admins });
  } catch (error) {
    console.error("Admins API error:", error);
    return NextResponse.json({ error: "获取管理员列表失败" }, { status: 500 });
  }
}

// POST - 创建管理员
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和密码必填" }, { status: 400 });
    }

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "该邮箱已存在" }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 12);
    const admin = await prisma.admin.create({
      data: { email, password: hash, name },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return NextResponse.json({ admin });
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json({ error: "创建管理员失败" }, { status: 500 });
  }
}

// DELETE - 删除管理员
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "缺少管理员ID" }, { status: 400 });
    }

    await prisma.admin.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete admin error:", error);
    return NextResponse.json({ error: "删除管理员失败" }, { status: 500 });
  }
}
