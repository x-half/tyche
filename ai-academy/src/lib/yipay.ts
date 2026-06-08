import crypto from "crypto";

/**
 * 签名算法（与 PHP Demo 一致）
 * 1. ksort 按 key 字母排序
 * 2. 跳过空值、sign、sign_type
 * 3. 拼接 key=value&
 * 4. 追加商户密钥
 * 5. md5 哈希，小写
 */
export function generateSign(params: Record<string, string>, key?: string): string {
  const signKey = key || process.env.YIPAY_KEY || "";
  const sorted = Object.keys(params).sort();
  const parts: string[] = [];

  for (const k of sorted) {
    if (k === "sign" || k === "sign_type") continue;
    const val = params[k];
    if (val === "" || val === undefined || val === null) continue;
    parts.push(`${k}=${val}`);
  }

  return crypto.createHash("md5").update(parts.join("&") + signKey).digest("hex");
}

/**
 * 验证回调签名
 */
export function verifySign(params: Record<string, string>): boolean {
  if (!params.sign) return false;
  return params.sign === generateSign(params);
}

/**
 * 构建支付参数（POST 表单提交到 submit.php）
 * 支持从数据库配置覆盖 PID、KEY、API_URL
 */
export function buildPayParams(params: {
  orderNo: string;
  name: string;
  money: string;
  type: string;
  notifyUrl: string;
  returnUrl: string;
  pid?: string;
  key?: string;
  apiUrl?: string;
}): { payUrl: string; payParams: Record<string, string> } {
  const pid = params.pid || process.env.YIPAY_PID || "";
  const apiUrl = params.apiUrl || process.env.YIPAY_API_URL || "https://www.ezfpy.cn";

  const data: Record<string, string> = {
    pid,
    type: params.type,
    out_trade_no: params.orderNo,
    notify_url: params.notifyUrl,
    return_url: params.returnUrl,
    name: params.name,
    money: params.money,
  };
  const sign = generateSign(data, params.key);
  return {
    payUrl: `${apiUrl}/submit.php`,
    payParams: { ...data, sign, sign_type: "MD5" },
  };
}

/**
 * 查询订单状态
 */
export async function queryOrder(orderNo: string, opts?: { pid?: string; key?: string; apiUrl?: string }): Promise<any> {
  const pid = opts?.pid || process.env.YIPAY_PID || "";
  const key = opts?.key || process.env.YIPAY_KEY || "";
  const apiUrl = opts?.apiUrl || process.env.YIPAY_API_URL || "https://www.ezfpy.cn";

  const params = new URLSearchParams({
    pid,
    key,
    order_no: orderNo,
    order_type: "2", // 2=商户订单号
  });
  const res = await fetch(`${apiUrl}/api/findorder`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  return res.json();
}
