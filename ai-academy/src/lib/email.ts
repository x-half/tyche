import nodemailer from "nodemailer";
import crypto from "crypto";

// Validate required env vars
if (!process.env.EMAIL_USER) {
  throw new Error("Missing required environment variable: EMAIL_USER");
}
if (!process.env.EMAIL_PASS) {
  throw new Error("Missing required environment variable: EMAIL_PASS");
}

// QQ邮箱SMTP配置
const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true, // 使用SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 验证码存储
// NOTE: In production, replace this in-memory Map with Redis or another
// distributed store. The in-memory approach does not survive restarts
// and does not work across multiple server instances.
const verificationCodes = new Map<string, { code: string; expires: number }>();

// Proactive cleanup of expired verification codes every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [email, entry] of verificationCodes) {
    if (entry.expires < now) {
      verificationCodes.delete(email);
    }
  }
}, CLEANUP_INTERVAL_MS);

// 生成6位随机验证码 (cryptographically secure)
function generateCode(): string {
  // crypto.randomInt(100000, 1000000) returns a value in [100000, 1000000)
  return crypto.randomInt(100000, 1000000).toString();
}

// 发送验证码
export async function sendVerificationCode(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // 检查是否频繁发送（60秒内只能发一次）
    const existing = verificationCodes.get(email);
    if (existing && existing.expires > Date.now() - 60000) {
      return { success: false, message: "请60秒后再试" };
    }

    const code = generateCode();
    const expires = Date.now() + 5 * 60 * 1000; // 5分钟有效

    // 存储验证码
    verificationCodes.set(email, { code, expires });

    // 发送邮件
    await transporter.sendMail({
      from: `"学AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "【学AI】邮箱验证码",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">邮箱验证码</h2>
          <p>您好，您正在注册学AI账号。</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 14px; color: #666; margin: 0;">您的验证码是：</p>
            <h1 style="font-size: 36px; color: #111; letter-spacing: 8px; margin: 10px 0;">${code}</h1>
            <p style="font-size: 12px; color: #999; margin: 0;">验证码5分钟内有效</p>
          </div>
          <p style="font-size: 12px; color: #999;">如非本人操作，请忽略此邮件。</p>
        </div>
      `,
    });

    return { success: true, message: "验证码已发送" };
  } catch (error) {
    console.error("Send email error:", error);
    return { success: false, message: "发送失败，请稍后重试" };
  }
}

// 验证验证码
export function verifyCode(email: string, code: string): boolean {
  const stored = verificationCodes.get(email);

  if (!stored) {
    return false;
  }

  // 检查是否过期
  if (stored.expires < Date.now()) {
    verificationCodes.delete(email);
    return false;
  }

  // 检查验证码是否匹配
  if (stored.code !== code) {
    return false;
  }

  // 验证成功后删除验证码
  verificationCodes.delete(email);
  return true;
}
