"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trash2, Bell, Plus, Send } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  content: string | null;
  read: boolean;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [newNotification, setNewNotification] = useState({
    userId: "",
    type: "system",
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "20",
      });
      const res = await fetch(`/api/admin/notifications?${params}`);
      const data = await res.json();
      setNotifications(data.notifications);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newNotification.title) return;
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotification),
      });
      if (res.ok) {
        setShowCreate(false);
        setNewNotification({ userId: "", type: "system", title: "", content: "" });
        fetchNotifications();
      }
    } catch (error) {
      console.error("Failed to create notification:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除此通知吗？")) return;
    try {
      const res = await fetch(`/api/admin/notifications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const typeColors: Record<string, string> = {
    system: "bg-blue-100 text-blue-700",
    course: "bg-green-100 text-green-700",
    payment: "bg-orange-100 text-orange-700",
    achievement: "bg-purple-100 text-purple-700",
  };

  const typeLabels: Record<string, string> = {
    system: "系统",
    course: "课程",
    payment: "支付",
    achievement: "成就",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">通知管理</h1>
          <p className="text-gray-500 mt-1">管理系统通知和消息</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          发送通知
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Bell className="h-12 w-12 mb-4" />
            <p>暂无通知</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-6 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${typeColors[notification.type]}`}
                        >
                          {typeLabels[notification.type]}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          发送给: {notification.user?.name || notification.user?.email}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {notification.title}
                      </h3>
                      {notification.content && (
                        <p className="text-gray-600 text-sm">
                          {notification.content}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString("zh-CN")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                第 {page} 页，共 {totalPages} 页
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">发送通知</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  通知类型
                </label>
                <select
                  value={newNotification.type}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      type: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="system">系统通知</option>
                  <option value="course">课程通知</option>
                  <option value="payment">支付通知</option>
                  <option value="achievement">成就通知</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题 *
                </label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="请输入通知标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  value={newNotification.content}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      content: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="请输入通知内容"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                disabled={!newNotification.title}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
