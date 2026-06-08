"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(d => { setConfig(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) toast.success("保存成功");
      else toast.error("保存失败");
    } catch { toast.error("保存失败"); }
    finally { setSaving(false); }
  };

  const handleReset = async () => {
    if (!confirm("确定要重置为默认配置吗？")) return;
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setConfig(data);
      toast.success("已重置");
    } catch { toast.error("重置失败"); }
  };

  const updateField = (path: string, value: string) => {
    setConfig((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateArrayItem = (path: string, index: number, field: string, value: string) => {
    setConfig((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (const key of keys) obj = obj[key];
      obj[index][field] = value;
      return next;
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--color-primary)" }} />
    </div>
  );

  if (!config) return <div className="py-20 text-center" style={{ color: "var(--foreground-muted)" }}>加载失败</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>首页配置</h1>
          <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>管理首页展示的内容和数据</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--color-border)", color: "var(--foreground-secondary)" }}>
            <RotateCcw className="h-4 w-4" /> 重置
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold" style={{ background: "var(--color-primary)", color: "#fff" }}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 保存
          </button>
        </div>
      </div>

      {/* 站点名称 */}
      <Section title="站点信息">
        <Field label="站点名称" value={config.siteName} onChange={v => updateField("siteName", v)} />
        <Field label="版权信息" value={config.footer.copyright} onChange={v => updateField("footer.copyright", v)} />
      </Section>

      {/* Hero */}
      <Section title="Hero 区域">
        <Field label="徽章文字" value={config.hero.badge} onChange={v => updateField("hero.badge", v)} />
        <Field label="标题第一行" value={config.hero.titleLine1} onChange={v => updateField("hero.titleLine1", v)} />
        <Field label="标题第二行（渐变）" value={config.hero.titleLine2} onChange={v => updateField("hero.titleLine2", v)} />
        <Field label="描述文字" value={config.hero.description} onChange={v => updateField("hero.description", v)} textarea />
        <Field label="主按钮文字" value={config.hero.ctaPrimary} onChange={v => updateField("hero.ctaPrimary", v)} />
        <Field label="副按钮文字" value={config.hero.ctaSecondary} onChange={v => updateField("hero.ctaSecondary", v)} />
      </Section>

      {/* Stats */}
      <Section title="数据统计条">
        {config.stats.map((stat: any, i: number) => (
          <div key={i} className="grid grid-cols-3 gap-3 mb-3">
            <Field label={`#${i + 1} 标签`} value={stat.label} onChange={v => updateArrayItem("stats", i, "label", v)} />
            <Field label={`#${i + 1} 数值`} value={stat.value} onChange={v => updateArrayItem("stats", i, "value", v)} />
            <Field label={`#${i + 1} 图标`} value={stat.icon} onChange={v => updateArrayItem("stats", i, "icon", v)} />
          </div>
        ))}
        <p className="text-xs mt-2" style={{ color: "var(--foreground-muted)" }}>数值填 "auto" 自动使用实际课程数量</p>
      </Section>

      {/* Features */}
      <Section title="价值主张">
        <Field label="区块标题" value={config.features.sectionTitle} onChange={v => updateField("features.sectionTitle", v)} />
        <Field label="区块副标题" value={config.features.sectionSubtitle} onChange={v => updateField("features.sectionSubtitle", v)} />
        {config.features.items.map((item: any, i: number) => (
          <div key={i} className="border rounded-xl p-4 mb-3" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground-muted)" }}>特性 #{i + 1}</p>
            <Field label="标题" value={item.title} onChange={v => updateArrayItem("features.items", i, "title", v)} />
            <Field label="描述" value={item.description} onChange={v => updateArrayItem("features.items", i, "description", v)} textarea />
            <Field label="图标" value={item.icon} onChange={v => updateArrayItem("features.items", i, "icon", v)} />
            <Field label="渐变色" value={item.gradient} onChange={v => updateArrayItem("features.items", i, "gradient", v)} />
          </div>
        ))}
      </Section>

      {/* Courses Section */}
      <Section title="课程区块">
        <Field label="免费课程标题" value={config.coursesSection.freeTitle} onChange={v => updateField("coursesSection.freeTitle", v)} />
        <Field label="付费课程标题" value={config.coursesSection.paidTitle} onChange={v => updateField("coursesSection.paidTitle", v)} />
        <Field label="查看全部文字" value={config.coursesSection.ctaText} onChange={v => updateField("coursesSection.ctaText", v)} />
      </Section>

      {/* Paths Section */}
      <Section title="学习路径">
        <Field label="区块标题" value={config.pathsSection.sectionTitle} onChange={v => updateField("pathsSection.sectionTitle", v)} />
        <Field label="区块副标题" value={config.pathsSection.sectionSubtitle} onChange={v => updateField("pathsSection.sectionSubtitle", v)} />
        <Field label="区块描述" value={config.pathsSection.sectionDescription} onChange={v => updateField("pathsSection.sectionDescription", v)} />
        {config.pathsSection.items.map((item: any, i: number) => (
          <div key={i} className="border rounded-xl p-4 mb-3" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground-muted)" }}>路径 #{i + 1}</p>
            <Field label="标题" value={item.title} onChange={v => updateArrayItem("pathsSection.items", i, "title", v)} />
            <Field label="描述" value={item.description} onChange={v => updateArrayItem("pathsSection.items", i, "description", v)} textarea />
            <Field label="课程数量" value={item.count.toString()} onChange={v => updateArrayItem("pathsSection.items", i, "count", v)} />
            <Field label="图标" value={item.icon} onChange={v => updateArrayItem("pathsSection.items", i, "icon", v)} />
            <Field label="渐变色" value={item.gradient} onChange={v => updateArrayItem("pathsSection.items", i, "gradient", v)} />
          </div>
        ))}
      </Section>

      {/* CTA Section */}
      <Section title="底部 CTA">
        <Field label="标题" value={config.ctaSection.title} onChange={v => updateField("ctaSection.title", v)} textarea />
        <Field label="描述" value={config.ctaSection.description} onChange={v => updateField("ctaSection.description", v)} textarea />
        <Field label="主按钮文字" value={config.ctaSection.ctaPrimary} onChange={v => updateField("ctaSection.ctaPrimary", v)} />
        <Field label="副按钮文字" value={config.ctaSection.ctaSecondary} onChange={v => updateField("ctaSection.ctaSecondary", v)} />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-2xl border p-6" style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}>
      <h2 className="text-base font-bold mb-4" style={{ color: "var(--foreground)" }}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--foreground-muted)" }}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg text-sm border resize-none" style={{ background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm border" style={{ background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }} />
      )}
    </div>
  );
}
