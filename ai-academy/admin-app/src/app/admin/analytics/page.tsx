"use client";

import { useState, useEffect } from "react";
import { BarChart3, Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";

interface Analytics {
  dailyUsers: number;
  dailyOrders: number;
  courseStats: { status: string; _count: number }[];
  userRoleStats: { role: string; _count: number }[];
  topCourses: { id: string; title: string; totalStudents: number; rating: number; price: number }[];
  totalRevenue: number;
  monthlyRevenue: number;
  progressStats: { status: string; _count: number }[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return <div className="text-center text-gray-500">加载失败</div>;
  }

  const statCards = [
    {
      title: "总用户数",
      value: analytics.dailyUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "总课程数",
      value: analytics.courseStats.reduce((sum, s) => sum + s._count, 0),
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "总收入",
      value: `¥${analytics.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-orange-500",
    },
    {
      title: "本月收入",
      value: `¥${analytics.monthlyRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">数据报表</h1>
        <p className="text-gray-500 mt-1">平台运营数据分析</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Course Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">课程状态分布</h2>
          <div className="space-y-4">
            {analytics.courseStats.map((stat) => (
              <div key={stat.status} className="flex items-center justify-between">
                <span className="text-gray-600">
                  {stat.status === "draft"
                    ? "草稿"
                    : stat.status === "published"
                    ? "已发布"
                    : "已归档"}
                </span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className={`h-2 rounded-full ${
                        stat.status === "published"
                          ? "bg-green-500"
                          : stat.status === "draft"
                          ? "bg-gray-500"
                          : "bg-yellow-500"
                      }`}
                      style={{
                        width: `${
                          (stat._count /
                            analytics.courseStats.reduce(
                              (sum, s) => sum + s._count,
                              0
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="font-medium text-gray-900 w-8 text-right">
                    {stat._count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Role Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">用户角色分布</h2>
          <div className="space-y-4">
            {analytics.userRoleStats.map((stat) => (
              <div key={stat.role} className="flex items-center justify-between">
                <span className="text-gray-600">
                  {stat.role === "admin"
                    ? "管理员"
                    : stat.role === "superadmin"
                    ? "超级管理员"
                    : "普通用户"}
                </span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className={`h-2 rounded-full ${
                        stat.role === "admin" || stat.role === "superadmin"
                          ? "bg-purple-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${
                          (stat._count /
                            analytics.userRoleStats.reduce(
                              (sum, s) => sum + s._count,
                              0
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="font-medium text-gray-900 w-8 text-right">
                    {stat._count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Courses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">热门课程 TOP 10</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  排名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  课程名称
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  学生数
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  评分
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  价格
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analytics.topCourses.map((course, index) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        index < 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {course.totalStudents}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-gray-600">
                        {course.rating?.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    ¥{course.price?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">学习进度统计</h2>
        <div className="grid grid-cols-3 gap-4">
          {analytics.progressStats.map((stat) => (
            <div
              key={stat.status}
              className="text-center p-4 bg-gray-50 rounded-lg"
            >
              <p className="text-3xl font-bold text-gray-900">{stat._count}</p>
              <p className="text-sm text-gray-500 mt-1">
                {stat.status === "not_started"
                  ? "未开始"
                  : stat.status === "in_progress"
                  ? "学习中"
                  : "已完成"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
