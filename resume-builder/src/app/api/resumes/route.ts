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

    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      include: { template: true },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json(resumes)
  } catch (error) {
    console.error("Get resumes error:", error)
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      )
    }

    const { title, templateId, content } = await request.json()

    if (!title || !templateId || !content) {
      return NextResponse.json(
        { error: "请填写所有必填字段" },
        { status: 400 }
      )
    }

    const resume = await prisma.resume.create({
      data: {
        title,
        userId: session.user.id,
        templateId,
        content,
      },
      include: { template: true },
    })

    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error("Create resume error:", error)
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}