"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, RefreshCw } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const pageSize = 20;

  const fetchOrders = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    fetch(`/api/admin/orders?${params}`)
      .then(r => r.json())
      .then(d => { setOrders(d.orders || []); setTotal(d.pagination?.total || 0); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [page, status]);

  const statusMap: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "#fffbeb", text: "#d97706", label: "待支付" },
    paid: { bg: "#ecfdf5", text: "#059669", label: "已支付" },
    expired: { bg: "#f3f4f6", text: "#6b7280", label: "已过期" },
    refunded: { bg: "#fef2f2", text: "#ef4444", label: "已退款" },
  };

  const totalPages = Math.ceil(total / pageSize);
  const paidSum = orders.filter(o => o.status === "paid").reduce((s, o) => s + o.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>订单管理</h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && (setPage(1), fetchOrders())} placeholder="搜索订单号、用户、课程..." className="w-full pl-10 pr-4 py-2 rounded-lg text-sm border" style={{ background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }} />
        </div>
        <div className="flex gap-2">
          {[{ id: "", label: "全部" }, { id: "pending", label: "待支付" }, { id: "paid", label: "已支付" }, { id: "expired", label: "已过期" }].map(s => (
            <button key={s.id} onClick={() => { setStatus(s.id); setPage(1); }} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: status === s.id ? "var(--color-primary)" : "var(--color-card)", color: status === s.id ? "#fff" : "var(--foreground-secondary)", border: `1px solid ${status === s.id ? "var(--color-primary)" : "var(--color-border)"}` }}>{s.label}</button>
          ))}
        </div>
        <button onClick={fetchOrders} className="p-2 rounded-lg border" style={{ borderColor: "var(--color-border)", color: "var(--foreground-muted)" }}><RefreshCw className="h-4 w-4" /></button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{ label: "全部订单", value: total }, { label: "待支付", value: orders.filter(o => o.status === "pending").length }, { label: "已支付", value: orders.filter(o => o.status === "paid").length }, { label: "已支付金额", value: `¥${paidSum.toFixed(2)}` }].map((stat, i) => (
          <div key={i} className="rounded-xl border p-4" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
            <p className="text-xs mb-1" style={{ color: "var(--foreground-muted)" }}>{stat.label}</p>
            <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--color-primary)" }} /></div>
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <table className="w-full text-sm">
            <thead><tr style={{ background: "var(--color-surface)" }}>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>订单号</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>用户</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>课程</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>金额</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>方式</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>状态</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>时间</th>
            </tr></thead>
            <tbody>
              {orders.map(order => {
                const sc = statusMap[order.status] || statusMap.pending;
                return (
                  <tr key={order.id} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                    <td className="px-5 py-3 font-mono text-xs" style={{ color: "var(--foreground)" }}>{order.orderNo}</td>
                    <td className="px-5 py-3"><p className="text-sm" style={{ color: "var(--foreground)" }}>{order.user?.name || "-"}</p><p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{order.user?.email}</p></td>
                    <td className="px-5 py-3 text-sm" style={{ color: "var(--foreground-secondary)" }}>{order.course?.title || "-"}</td>
                    <td className="px-5 py-3 font-semibold" style={{ color: "var(--foreground)" }}>¥{order.amount?.toFixed(2)}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>{order.paymentMethod === "alipay" ? "支付宝" : order.paymentMethod === "wxpay" ? "微信" : order.paymentMethod}</td>
                    <td className="px-5 py-3"><span className="px-2 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span></td>
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>{new Date(order.createdAt).toLocaleString("zh-CN")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {orders.length === 0 && <div className="text-center py-12" style={{ color: "var(--foreground-muted)" }}>暂无订单</div>}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-sm border disabled:opacity-50" style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)" }}>上一页</button>
          <span className="text-sm px-3" style={{ color: "var(--foreground-muted)" }}>{page} / {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-sm border disabled:opacity-50" style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)" }}>下一页</button>
        </div>
      )}
    </div>
  );
}
