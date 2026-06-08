import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawPage = parseInt(searchParams.get("page") || "1", 10);
    const rawLimit = parseInt(searchParams.get("limit") || "12", 10);

    const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
    const limit = Number.isNaN(rawLimit) ? 12 : Math.min(Math.max(rawLimit, 1), 100);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort") || "newest";

    const skip = (page - 1) * limit;

    const where: any = {
      status: "published",
    };

    if (category) {
      where.category = { slug: category };
    }

    if (level) {
      where.level = level;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (featured === "true") {
      where.featured = true;
    }

    let orderBy: any = { createdAt: "desc" };

    switch (sort) {
      case "popular":
        orderBy = { totalStudents: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "price_asc":
        orderBy = { price: "asc" };
        break;
      case "price_desc":
        orderBy = { price: "desc" };
        break;
      case "newest":
      default:
        orderBy = { createdAt: "desc" };
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          _count: {
            select: {
              modules: true,
              enrollments: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch courses error:", error);
    return NextResponse.json(
      { error: "获取课程列表失败" },
      { status: 500 }
    );
  }
}
