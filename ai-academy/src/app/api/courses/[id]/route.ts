import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to find by ID first, then by slug
    let course = await prisma.course.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        modules: {
          orderBy: { sortOrder: "asc" },
          include: {
            lessons: {
              orderBy: { sortOrder: "asc" },
              select: {
                id: true, title: true, slug: true, type: true,
                duration: true, sortOrder: true, isFree: true, isPreview: true,
              },
            },
          },
        },
        _count: {
          select: { enrollments: true, comments: true },
        },
      },
    });

    // If not found by ID, try by slug
    if (!course) {
      course = await prisma.course.findUnique({
        where: { slug: id },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          modules: {
            orderBy: { sortOrder: "asc" },
            include: {
              lessons: {
                orderBy: { sortOrder: "asc" },
                select: {
                  id: true, title: true, slug: true, type: true,
                  duration: true, sortOrder: true, isFree: true, isPreview: true,
                },
              },
            },
          },
          _count: {
            select: { enrollments: true, comments: true },
          },
        },
      });
    }

    if (!course) {
      return NextResponse.json({ error: "课程不存在" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Fetch course error:", error);
    return NextResponse.json({ error: "获取课程详情失败" }, { status: 500 });
  }
}
