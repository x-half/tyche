import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { createVerificationToken, cleanupExpiredTokens } from "@/lib/verification"
import { sendVerificationEmail } from "@/lib/email"
import {
  checkSendCodeRateLimit,
  recordSendCode,
} from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "请输入邮箱地址" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "邮箱格式不正确" },
        { status: 400 }
      )
    }

    const rateLimitResult = checkSendCodeRateLimit(email)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: `请求过于频繁，请 ${rateLimitResult.retryAfter} 秒后重试` },
        { status: 429 }
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

    const verificationToken = await createVerificationToken(email)

    const result = await sendVerificationEmail(email, verificationToken.token)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    recordSendCode(email)

    cleanupExpiredTokens()

    return NextResponse.json(
      { message: "验证码已发送到您的邮箱" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Send code error:", error)
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}
