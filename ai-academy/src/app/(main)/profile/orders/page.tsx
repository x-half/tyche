"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Loader2 } from "lucide-react";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (!session) return;

    fetch("/api/user/orders")
      .then(r => r.json())
      .then(d => { setOrders(d.orders || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: "待支付", color: "var(--color-warning)" },
    paid: { label: "已支付", color: "var(--color-success)" },
    expired: { label: "已过期", color: "var(--foreground-muted)" },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>我的订单</h1>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => {
              const st = statusMap[order.status] || statusMap.pending;
              return (
                <div key={order.id} className="rounded-2xl border p-5" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>{order.orderNo}</span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full" style={{ background: `${st.color}20`, color: st.color }}>{st.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{order.course?.title || "课程"}</h3>
                      <p className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>{new Date(order.createdAt).toLocaleString("zh-CN")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>¥{order.amount?.toFixed(2)}</p>
                      <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{order.paymentMethod === "alipay" ? "支付宝" : "微信"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--foreground-muted)" }} />
            <p className="text-sm mb-2" style={{ color: "var(--foreground)" }}>暂无订单</p>
            <p className="text-xs mb-6" style={{ color: "var(--foreground-muted)" }}>去浏览课程开始学习吧</p>
            <Link href="/courses" className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>浏览课程 →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
