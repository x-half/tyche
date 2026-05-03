"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Loader2, RefreshCw, Trash2 } from "lucide-react"
import { getExportTasks, downloadExportFile } from "@/lib/export"
import { useToast } from "@/components/ui/toast"
import { AuthModal } from "@/components/auth/auth-modal"

interface ExportTask {
  id: string
  status: string
  filename: string
  fileUrl: string | null
  error: string | null
  createdAt: string
  completedAt: string | null
  resume: {
    title: string
  }
}

export default function ExportHistoryPage() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<ExportTask[]>([])
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      fetchTasks()
    } else if (status === "unauthenticated") {
      setLoading(false)
    }
  }, [session, status])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const data = await getExportTasks()
      setTasks(data)
    } catch (error) {
      console.error("Fetch tasks error:", error)
      toast("获取导出记录失败", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (task: ExportTask) => {
    if (task.status !== "completed" || !task.fileUrl) {
      toast("文件未就绪", "error")
      return
    }

    setDownloading(task.id)
    try {
      const result = await downloadExportFile(task.id, task.filename)
      if (!result.success) {
        toast(result.error || "下载失败", "error")
      }
    } catch (error) {
      toast("下载失败", "error")
    } finally {
      setDownloading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">等待中</Badge>
      case "processing":
        return <Badge variant="secondary"><Loader2 className="h-3 w-3 mr-1 animate-spin" />处理中</Badge>
      case "completed":
        return <Badge variant="default">已完成</Badge>
      case "failed":
        return <Badge variant="destructive">失败</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
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

  if (!session) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container py-8">
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-3">登录后查看导出记录</h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                登录账户后，你可以查看和下载导出的简历
              </p>
              <Button onClick={() => setAuthModal(true)}>
                登录 / 注册
              </Button>
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
      </>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">导出记录</h1>
            <p className="text-muted-foreground mt-2">
              查看你导出的简历 PDF 文件
            </p>
          </div>
          <Button variant="outline" onClick={fetchTasks}>
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新
          </Button>
        </div>

        {tasks.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="mb-2">还没有导出记录</CardTitle>
              <CardDescription className="mb-6 max-w-md mx-auto">
                导出简历后，记录会显示在这里
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">{task.filename}</h3>
                        {getStatusBadge(task.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>简历：{task.resume.title}</p>
                        <p>创建时间：{formatDate(task.createdAt)}</p>
                        {task.completedAt && (
                          <p>完成时间：{formatDate(task.completedAt)}</p>
                        )}
                        {task.error && (
                          <p className="text-red-500">错误：{task.error}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {task.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(task)}
                          disabled={downloading === task.id}
                        >
                          {downloading === task.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4 mr-2" />
                          )}
                          下载
                        </Button>
                      )}
                    </div>
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
