import crypto from "crypto"
import prisma from "./prisma"

export function generateVerificationCode(): string {
  return crypto.randomInt(100000, 1000000).toString()
}

export async function createVerificationToken(email: string) {
  const token = generateVerificationCode()
  const expires = new Date(Date.now() + 10 * 60 * 1000)

  await prisma.verificationToken.deleteMany({
    where: { email },
  })

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}

export async function verifyToken(email: string, token: string) {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      email,
      token,
      expires: {
        gt: new Date(),
      },
    },
  })

  if (!verificationToken) {
    return { success: false, error: "验证码无效或已过期" }
  }

  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  })

  return { success: true }
}

export async function cleanupExpiredTokens() {
  try {
    await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
      },
    })
  } catch (error) {
    console.error("Failed to cleanup expired tokens:", error)
  }
}
