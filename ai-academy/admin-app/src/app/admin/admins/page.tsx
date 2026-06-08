"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Shield, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [creating, setCreating] = useState(false);

  const fetchAdmins = () => {
    fetch("/api/admin/admins")
      .then(r => r.json())
      .then(d => { setAdmins(d.admins || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleCreate = async () => {
    if (!form.email || !form.password) { toast.error("邮箱和密码必填"); return; }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success("创建成功");
      setShowCreate(false);
      setForm({ email: "", password: "", name: "" });
      fetchAdmins();
    } catch { toast.error("创建失败"); }
    finally { setCreating(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除该管理员？")) return;
    try {
      const res = await fetch(`/api/admin/admins?id=${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("已删除"); fetchAdmins(); }
      else toast.error("删除失败");
    } catch { toast.error("删除失败"); }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--color-primary)" }} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>管理员管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold" style={{ background: "var(--color-primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> 添加管理员
        </button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border p-6 mb-6" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: "var(--foreground)" }}>新建管理员</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input placeholder="邮箱" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="px-3 py-2 rounded-lg text-sm border" style={{ background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }} />
            <input placeholder="密码" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="px-3 py-2 rounded-lg text-sm border" style={{ background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }} />
            <input placeholder="姓名（可选）" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="px-3 py-2 rounded-lg text-sm border" style={{ background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }} />
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} disabled={creating} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: "var(--color-primary)", color: "#fff" }}>
              {creating ? "创建中..." : "确认创建"}
            </button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg text-sm" style={{ background: "var(--color-hover)", color: "var(--foreground-secondary)" }}>取消</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--color-surface)" }}>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>管理员</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>邮箱</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>角色</th>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>创建时间</th>
              <th className="text-right px-5 py-3 font-semibold" style={{ color: "var(--foreground-muted)" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--color-primary-soft)" }}>
                      <Shield className="h-4 w-4" style={{ color: "var(--color-primary)" }} />
                    </div>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{admin.name || "管理员"}</span>
                  </div>
                </td>
                <td className="px-5 py-3" style={{ color: "var(--foreground-secondary)" }}>{admin.email}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: "var(--color-primary-soft)", color: "var(--color-primary)" }}>{admin.role}</span>
                </td>
                <td className="px-5 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>{new Date(admin.createdAt).toLocaleDateString("zh-CN")}</td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => handleDelete(admin.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" style={{ color: "var(--color-error)" }}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {admins.length === 0 && (
          <div className="text-center py-12" style={{ color: "var(--foreground-muted)" }}>暂无管理员</div>
        )}
      </div>
    </div>
  );
}
