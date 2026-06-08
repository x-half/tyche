"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trash2, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  likes: number;
  createdAt: string;
  user: { id: string; name: string | null; email: string; avatar: string | null };
  lesson: { id: string; title: string } | null;
  course: { id: string; title: string } | null;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchComments();
  }, [page]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "20",
      });
      const res = await fetch(`/api/admin/comments?${params}`);
      const data = await res.json();
      setComments(data.comments);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除此评论吗？")) return;
    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">评论管理</h1>
        <p className="text-gray-500 mt-1">管理平台所有评论内容</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <MessageSquare className="h-12 w-12 mb-4" />
            <p>暂无评论</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <div key={comment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {comment.user?.name?.[0] || comment.user?.email?.[0] || "?"}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {comment.user?.name || "未设置昵称"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {comment.user?.email}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>
                          评论于:{" "}
                          {comment.lesson?.title || comment.course?.title || "未知"}
                        </span>
                        <span>👍 {comment.likes}</span>
                        <span>
                          {new Date(comment.createdAt).toLocaleString("zh-CN")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(comment.id)}
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
    </div>
  );
}
