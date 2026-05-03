import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hashPassword } from "@/lib/password"
import { verifyToken } from "@/lib/verification"
import {
  checkVerifyRateLimit,
  recordVerifyAttempt,
} from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const { email, password, name, code } = await request.json()

    if (!email || !password || !code) {
      return NextResponse.json(
        { error: "请填写所有必填字段" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "密码至少需要6个字符" },
        { status: 400 }
      )
    }

    const rateLimitResult = checkVerifyRateLimit(email)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: `验证码尝试次数过多，请 ${rateLimitResult.retryAfter} 秒后重试` },
        { status: 429 }
      )
    }

    recordVerifyAttempt(email)

    const verificationResult = await verifyToken(email, code)
    if (!verificationResult.success) {
      return NextResponse.json(
        { error: verificationResult.error },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "该邮箱已注册" },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        emailVerified: new Date(),
      },
    })

    return NextResponse.json(
      { message: "注册成功", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}
