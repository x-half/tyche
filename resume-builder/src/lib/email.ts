import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationEmail(email: string, code: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `【${process.env.APP_NAME}】邮箱验证码`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0;">${process.env.APP_NAME}</h1>
        </div>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center;">
          <p style="color: #666; font-size: 16px; margin-bottom: 20px;">您的验证码是：</p>
          <div style="background: #007bff; color: white; font-size: 32px; font-weight: bold; padding: 15px 30px; border-radius: 8px; display: inline-block; letter-spacing: 5px;">
            ${code}
          </div>
          <p style="color: #999; font-size: 14px; margin-top: 20px;">验证码有效期为 10 分钟，请勿泄露给他人。</p>
        </div>
        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
          <p>此邮件由系统自动发送，请勿直接回复。</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error: "邮件发送失败" }
  }
}