import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const categoryId = searchParams.get("categoryId") || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (status) {
      where.status = status;
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [courses, total, categories] = await Promise.all([
      prisma.course.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { name: true } },
          _count: {
            select: {
              modules: true,
              enrollments: true,
              orders: { where: { status: "paid" } },
            },
          },
        },
      }),
      prisma.course.count({ where }),
      prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

    return NextResponse.json({
      courses,
      categories,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Courses API error:", error);
    return NextResponse.json({ error: "获取课程列表失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const course = await prisma.course.create({
      data: body,
    });
    return NextResponse.json(course);
  } catch (error) {
    console.error("Create course error:", error);
    return NextResponse.json({ error: "创建课程失败" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const course = await prisma.course.update({
      where: { id },
      data,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json({ error: "更新课程失败" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "缺少课程ID" }, { status: 400 });
    }

    await prisma.course.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json({ error: "删除课程失败" }, { status: 500 });
  }
}
