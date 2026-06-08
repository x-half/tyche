"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, ChevronLeft, ChevronRight, Trash2, Edit2, Eye } from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
  price: number;
  status: string;
  level: string;
  totalStudents: number;
  totalLessons: number;
  rating: number;
  createdAt: string;
  category: { name: string } | null;
  _count: {
    modules: number;
    enrollments: number;
    orders: number;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCourses();
  }, [page, statusFilter]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "20",
        search,
        status: statusFilter,
      });
      const res = await fetch(`/api/admin/courses?${params}`);
      const data = await res.json();
      setCourses(data.courses);
      setCategories(data.categories);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchCourses();
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除此课程吗？此操作不可恢复。")) return;
    try {
      const res = await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    published: "bg-green-100 text-green-700",
    archived: "bg-yellow-100 text-yellow-700",
  };

  const statusLabels: Record<string, string> = {
    draft: "草稿",
    published: "已发布",
    archived: "已归档",
  };

  const levelLabels: Record<string, string> = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">课程管理</h1>
          <p className="text-gray-500 mt-1">管理平台所有课程内容</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          新建课程
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程标题..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部状态</option>
            <option value="draft">草稿</option>
            <option value="published">已发布</option>
            <option value="archived">已归档</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            搜索
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      课程
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      分类
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      价格
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      学生数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      课时数
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {course.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {levelLabels[course.level] || course.level}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {course.category?.name || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {course.price > 0 ? (
                          <span className="font-medium text-gray-900">
                            ¥{course.price.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-green-600">免费</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={course.status}
                          onChange={(e) =>
                            handleStatusChange(course.id, e.target.value)
                          }
                          className={`px-2 py-1 text-xs rounded-full border-0 ${statusColors[course.status]}`}
                        >
                          <option value="draft">草稿</option>
                          <option value="published">已发布</option>
                          <option value="archived">已归档</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {course.totalStudents}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {course.totalLessons}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <a
                            href={`http://localhost:3000/courses/${course.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-green-600"
                            title="预览"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <Link
                            href={`/admin/courses/${course.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600"
                            title="编辑"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="p-2 text-gray-400 hover:text-red-600"
                            title="删除"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
