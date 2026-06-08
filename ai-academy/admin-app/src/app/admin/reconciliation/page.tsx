"use client";

import { useState, useEffect } from "react";
import { RefreshCw, AlertTriangle, CheckCircle, Wrench, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ReconciliationPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fixing, setFixing] = useState(false);

  const fetchReconciliation = () => {
    setLoading(true);
    fetch("/api/admin/reconciliation")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchReconciliation(); }, []);

  const handleAutoFix = async () => {
    if (!confirm("确定要自动修复缺失的报名记录吗？")) return;
    setFixing(true);
    try {
      const res = await fetch("/api/admin/reconciliation", { method: "POST" });
      const result = await res.json();
      if (result.fixed > 0) {
        toast.success(`已修复 ${result.fixed} 条记录`);
        fetchReconciliation();
      } else {
        toast.success("无需修复");
      }
      if (result.errors?.length > 0) {
        toast.error(`${result.errors.length} 条修复失败`);
      }
    } catch { toast.error("修复失败"); }
    finally { setFixing(false); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (!data) return <div className="text-center py-20" style={{ color: "var(--foreground-muted)" }}>加载失败</div>;

  const { summary, mismatches } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>数据对账</h1>
          <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>检查订单表和报名表数据一致性</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchReconciliation} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all" style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)" }}>
            <RefreshCw className="h-4 w-4" /> 刷新
          </button>
          {mismatches.length > 0 && (
            <button onClick={handleAutoFix} disabled={fixing} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold" style={{ background: "var(--color-primary)", color: "#fff" }}>
              {fixing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wrench className="h-4 w-4" />} 自动修复
            </button>
          )}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "已支付订单", value: summary.totalPaidOrders, color: "var(--color-primary)" },
          { label: "数据匹配", value: summary.matched, color: "var(--color-success)" },
          { label: "异常数据", value: summary.mismatches, color: summary.mismatches > 0 ? "var(--color-error)" : "var(--color-success)" },
          { label: "一致性", value: summary.isConsistent ? "正常" : "异常", color: summary.isConsistent ? "var(--color-success)" : "var(--color-error)" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border p-4" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
            <p className="text-xs mb-1" style={{ color: "var(--foreground-muted)" }}>{stat.label}</p>
            <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 状态提示 */}
      {summary.isConsistent ? (
        <div className="rounded-xl border p-4 mb-6 flex items-center gap-3" style={{ background: "var(--color-success-light)", borderColor: "var(--color-success)" }}>
          <CheckCircle className="h-5 w-5" style={{ color: "var(--color-success)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--color-success)" }}>数据一致性检查通过，所有已支付订单均有对应报名记录</span>
        </div>
      ) : (
        <div className="rounded-xl border p-4 mb-6 flex items-center gap-3" style={{ background: "var(--color-error-light)", borderColor: "var(--color-error)" }}>
          <AlertTriangle className="h-5 w-5" style={{ color: "var(--color-error)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--color-error)" }}>发现 {summary.mismatches} 条异常数据，请查看下方详情或点击自动修复</span>
        </div>
      )}

      {/* 异常列表 */}
      {mismatches.length > 0 && (
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <div className="px-5 py-3" style={{ background: "var(--color-surface)" }}>
            <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>异常数据详情</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--color-surface)" }}>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>订单号</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>用户</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>课程</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>金额</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>问题</th>
              </tr>
            </thead>
            <tbody>
              {mismatches.map((item: any, i: number) => (
                <tr key={i} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: "var(--foreground)" }}>{item.orderNo || "-"}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.userName || "-"}</p>
                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{item.userEmail || "-"}</p>
                  </td>
                  <td className="px-5 py-3 text-sm" style={{ color: "var(--foreground-secondary)" }}>{item.courseName || "-"}</td>
                  <td className="px-5 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{item.amount ? `¥${item.amount.toFixed(2)}` : "-"}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: "var(--color-error-light)", color: "var(--color-error)" }}>{item.issue}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
