"use client";

import { useState, useEffect } from "react";
import { Save, Settings } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("设置已保存");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("保存失败");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const settingGroups = [
    {
      title: "基本设置",
      settings: [
        { key: "site_name", label: "网站名称", placeholder: "学AI" },
        { key: "site_description", label: "网站描述", placeholder: "AI学习平台" },
        { key: "site_keywords", label: "网站关键词", placeholder: "AI,人工智能,学习" },
        { key: "site_logo", label: "网站Logo URL", placeholder: "/logo.png" },
      ],
    },
    {
      title: "联系方式",
      settings: [
        { key: "contact_email", label: "联系邮箱", placeholder: "support@example.com" },
        { key: "contact_phone", label: "联系电话", placeholder: "400-xxx-xxxx" },
        { key: "contact_address", label: "联系地址", placeholder: "" },
      ],
    },
    {
      title: "支付设置",
      settings: [
        { key: "yipay_pid", label: "易支付商户ID", placeholder: "" },
        { key: "yipay_key", label: "易支付商户密钥", placeholder: "" },
        { key: "yipay_url", label: "易支付网关地址", placeholder: "https://www.ezfpy.cn" },
        { key: "site_url", label: "本站域名（回调地址基础域名）", placeholder: "https://yourdomain.com" },
      ],
    },
    {
      title: "邮件设置",
      settings: [
        { key: "smtp_host", label: "SMTP服务器", placeholder: "smtp.qq.com" },
        { key: "smtp_port", label: "SMTP端口", placeholder: "465" },
        { key: "smtp_user", label: "SMTP用户名", placeholder: "" },
        { key: "smtp_pass", label: "SMTP密码", placeholder: "" },
      ],
    },
    {
      title: "其他设置",
      settings: [
        { key: "free_lessons_count", label: "免费试看课时数", placeholder: "3" },
        { key: "copyright_year", label: "版权年份", placeholder: "2024" },
        { key: "icp_number", label: "ICP备案号", placeholder: "" },
      ],
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-500 mt-1">管理平台全局配置</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-5 w-5 mr-2" />
          {saving ? "保存中..." : "保存设置"}
        </button>
      </div>

      <div className="space-y-6">
        {settingGroups.map((group) => (
          <div
            key={group.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-400" />
              {group.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.settings.map((setting) => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {setting.label}
                  </label>
                  <input
                    type="text"
                    value={settings[setting.key] || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={setting.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
