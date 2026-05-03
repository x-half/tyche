"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Resume } from "@/types/resume"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Edit, Trash2, Download, LogIn } from "lucide-react"
import Link from "next/link"
import { AuthModal } from "@/components/auth/auth-modal"
import { useToast } from "@/components/ui/toast"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      fetchResumes()
    } else if (status === "unauthenticated") {
      setLoading(false)
    }
  }, [session, status])

  const fetchResumes = async () => {
    try {
      const response = await fetch("/api/resumes")
      if (!response.ok) {
        throw new Error("获取简历失败")
      }
      const data = await response.json()
      setResumes(data)
    } catch (error) {
      console.error("Fetch resumes error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleteConfirm(id)
  }

  const confirmDelete = async () => {
    if (!deleteConfirm) return

    try {
      const response = await fetch(`/api/resumes/${deleteConfirm}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("删除失败")
      }

      setResumes(resumes.filter((r) => r.id !== deleteConfirm))
      toast("简历已删除", "success")
    } catch (error) {
      console.error("Delete error:", error)
      toast("删除失败，请重试", "error")
    } finally {
      setDeleteConfirm(null)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">加载中...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 未登录状态
  if (!session) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container py-8">
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-6">
                <LogIn className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-3">登录后查看你的简历</h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                登录账户后，你可以保存、编辑和管理你的简历
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setAuthModal(true)}>
                  登录 / 注册
                </Button>
                <Button variant="outline">
                  <Link href="/resumes/new">先去制作简历</Link>
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>

      <AuthModal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        defaultView="login"
        onSuccess={() => {
          setAuthModal(false)
          window.location.reload()
        }}
      />

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="删除简历"
        message="确定要删除这份简历吗？此操作无法撤销。"
        confirmText="删除"
        cancelText="取消"
        variant="destructive"
      />
    </>
  )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">我的简历</h1>
            <p className="text-muted-foreground mt-2">
              管理你的简历，创建新的简历
            </p>
          </div>
          <Button>
            <Link href="/resumes/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              创建新简历
            </Link>
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="mb-2">还没有简历</CardTitle>
              <CardDescription className="mb-6 max-w-md mx-auto">
                创建你的第一份简历，开始你的求职之旅
              </CardDescription>
              <Button>
                <Link href="/resumes/new" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  创建新简历
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{resume.title}</CardTitle>
                    <Badge variant="secondary">{resume.templateId}</Badge>
                  </div>
                  <CardDescription>
                    更新于 {new Date(resume.updatedAt).toLocaleDateString("zh-CN")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Link href={`/resumes/${resume.id}`} className="flex items-center justify-center gap-2">
                        <Edit className="h-4 w-4" />
                        编辑
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      导出
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}