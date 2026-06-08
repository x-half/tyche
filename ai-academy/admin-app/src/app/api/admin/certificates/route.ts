import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { issuedAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.certificate.count(),
    ]);

    return NextResponse.json({
      certificates,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Certificates API error:", error);
    return NextResponse.json({ error: "获取证书列表失败" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "缺少证书ID" }, { status: 400 });
    }

    await prisma.certificate.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete certificate error:", error);
    return NextResponse.json({ error: "删除证书失败" }, { status: 500 });
  }
}
