import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// 默认配置（从 .env 读取，数据库值覆盖）
function getDefaults(): Record<string, string> {
  return {
    // 基本设置
    site_name: process.env.NEXT_PUBLIC_APP_NAME || "学AI",
    site_description: "系统化AI学习平台",
    site_keywords: "AI,人工智能,学习,LLM,RAG,Agent",
    site_logo: "/logo.png",

    // 联系方式
    contact_email: "",
    contact_phone: "",
    contact_address: "",

    // 支付设置
    yipay_pid: process.env.YIPAY_PID || "",
    yipay_key: process.env.YIPAY_KEY || "",
    yipay_url: process.env.YIPAY_API_URL || "https://www.ezfpy.cn",
    site_url: process.env.NEXT_PUBLIC_APP_URL || "",

    // 邮件设置
    smtp_host: "smtp.qq.com",
    smtp_port: "465",
    smtp_user: process.env.EMAIL_USER || "",
    smtp_pass: process.env.EMAIL_PASS || "",

    // 其他设置
    free_lessons_count: "3",
    copyright_year: "2026",
    icp_number: "",
  };
}

export async function GET() {
  try {
    const dbSettings = await prisma.systemSetting.findMany();
    const defaults = getDefaults();

    // 数据库值覆盖默认值
    const settings: Record<string, string> = { ...defaults };
    for (const s of dbSettings) {
      settings[s.key] = s.value;
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings API error:", error);
    return NextResponse.json({ error: "获取设置失败" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    for (const [key, value] of Object.entries(body)) {
      await prisma.systemSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "更新设置失败" }, { status: 500 });
  }
}
