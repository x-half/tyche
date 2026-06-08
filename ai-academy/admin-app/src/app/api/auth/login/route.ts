import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "请输入邮箱和密码" }, { status: 400 });
    }

    const result = await login(email, password);
    if (!result) {
      return NextResponse.json({ error: "邮箱或密码错误，或您没有管理员权限" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, user: result.user });
    response.cookies.set("admin_token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "登录失败", detail: String(e) }, { status: 500 });
  }
}
