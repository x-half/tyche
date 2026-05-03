import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

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

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: { template: true },
    })

    if (!resume) {
      return NextResponse.json(
        { error: "简历不存在" },
        { status: 404 }
      )
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error("Get resume error:", error)
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}

export async function PUT(
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
    const { title, content, isPublic } = await request.json()

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!resume) {
      return NextResponse.json(
        { error: "简历不存在" },
        { status: 404 }
      )
    }

    const updatedResume = await prisma.resume.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(isPublic !== undefined && { isPublic }),
      },
      include: { template: true },
    })

    return NextResponse.json(updatedResume)
  } catch (error) {
    console.error("Update resume error:", error)
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!resume) {
      return NextResponse.json(
        { error: "简历不存在" },
        { status: 404 }
      )
    }

    await prisma.resume.delete({
      where: { id },
    })

    return NextResponse.json({ message: "删除成功" })
  } catch (error) {
    console.error("Delete resume error:", error)
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}