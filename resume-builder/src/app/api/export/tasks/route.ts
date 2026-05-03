import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      )
    }

    // 获取用户的导出任务列表
    const tasks = await prisma.exportTask.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        resume: {
          select: {
            title: true
          }
        }
      }
    })

    return NextResponse.json(tasks)

  } catch (error) {
    console.error("Get export tasks error:", error)
    return NextResponse.json(
      { error: "获取导出任务失败" },
      { status: 500 }
    )
  }
}
