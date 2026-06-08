import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true, title: true, slug: true, excerpt: true,
        category: true, publishedAt: true, createdAt: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Fetch blog posts error:", error);
    return NextResponse.json({ error: "获取博客列表失败" }, { status: 500 });
  }
}
