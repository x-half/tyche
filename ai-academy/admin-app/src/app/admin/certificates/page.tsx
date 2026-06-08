"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trash2, Award, Download } from "lucide-react";

interface Certificate {
  id: string;
  certificateNo: string;
  title: string;
  issuedAt: string;
  user: { id: string; name: string | null; email: string };
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCertificates();
  }, [page]);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "20",
      });
      const res = await fetch(`/api/admin/certificates?${params}`);
      const data = await res.json();
      setCertificates(data.certificates);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除此证书吗？")) return;
    try {
      const res = await fetch(`/api/admin/certificates?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCertificates();
      }
    } catch (error) {
      console.error("Failed to delete certificate:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">证书管理</h1>
        <p className="text-gray-500 mt-1">管理平台颁发的所有证书</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Award className="h-12 w-12 mb-4" />
            <p>暂无证书</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      证书编号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      证书名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      获得者
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      颁发时间
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-mono text-sm text-gray-900">
                          {cert.certificateNo}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{cert.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">
                          {cert.user?.name || "未设置"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {cert.user?.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(cert.issuedAt).toLocaleDateString("zh-CN")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="p-2 text-gray-400 hover:text-blue-600"
                            title="下载"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cert.id)}
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
