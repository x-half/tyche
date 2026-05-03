import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      )
    }

    const { id } = await params

    // 获取导出任务
    const task = await prisma.exportTask.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: "任务不存在" },
        { status: 404 }
      )
    }

    if (task.status !== "completed") {
      return NextResponse.json(
        { error: "任务未完成" },
        { status: 400 }
      )
    }

    // 读取文件
    const filePath = join(process.cwd(), "public", task.fileUrl!)
    const fileBuffer = await readFile(filePath)

    // 返回文件
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(task.filename)}"`,
      },
    })

  } catch (error) {
    console.error("Download export file error:", error)
    return NextResponse.json(
      { error: "下载文件失败" },
      { status: 500 }
    )
  }
}
