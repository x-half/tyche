"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface Stats {
  totalUsers: number;
  totalCourses: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyUsers: number;
  monthlyOrders: number;
  monthlyRevenue: number;
  recentOrders: any[];
  popularCourses: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
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

  if (!stats) {
    return <div className="text-center text-gray-500">加载失败</div>;
  }

  const statCards = [
    {
      title: "总用户数",
      value: stats.totalUsers,
      change: `+${stats.monthlyUsers} 本月`,
      icon: Users,
      color: "bg-blue-500",
      href: "/admin/users",
    },
    {
      title: "课程总数",
      value: stats.totalCourses,
      change: "已发布",
      icon: BookOpen,
      color: "bg-green-500",
      href: "/admin/courses",
    },
    {
      title: "已完成订单",
      value: stats.totalOrders,
      change: `+${stats.monthlyOrders} 本月`,
      icon: ShoppingBag,
      color: "bg-purple-500",
      href: "/admin/orders",
    },
    {
      title: "总收入",
      value: `¥${stats.totalRevenue.toFixed(2)}`,
      change: `+¥${stats.monthlyRevenue.toFixed(2)} 本月`,
      icon: DollarSign,
      color: "bg-orange-500",
      href: "/admin/analytics",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-gray-500 mt-1">欢迎回来，这是平台的数据概览</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            <div className="flex items-center mt-3">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">最近订单</h2>
              <Link
                href="/admin/orders"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                查看全部 →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">暂无订单</p>
            ) : (
              <div className="space-y-4">
                {stats.recentOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user?.name || order.user?.email || "未知用户"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.course?.title || "VIP会员"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ¥{order.amount?.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status === "paid"
                          ? "已支付"
                          : order.status === "pending"
                          ? "待支付"
                          : order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">热门课程</h2>
              <Link
                href="/admin/courses"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                查看全部 →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.popularCourses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">暂无课程</p>
            ) : (
              <div className="space-y-4">
                {stats.popularCourses.map((course: any, index: number) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          {course.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.totalStudents} 名学生
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ¥{course.price?.toFixed(2)}
                      </p>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600">
                          {course.rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/courses"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">管理课程</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">管理用户</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">管理订单</span>
          </Link>
          <Link
            href="/admin/blog"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">管理博客</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
