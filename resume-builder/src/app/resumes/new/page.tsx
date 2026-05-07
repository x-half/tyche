"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { ResumeEditor } from "@/components/resume/editor/resume-editor"
import { defaultResumeContent } from "@/lib/resume-data"
import { ResumeContent } from "@/types/resume"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AuthModal } from "@/components/auth/auth-modal"
import { useToast } from "@/components/ui/toast"

function NewResumeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "classic"
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [authModal, setAuthModal] = useState(false)
  const [pendingContent, setPendingContent] = useState<ResumeContent | null>(null)
  const [pendingAction, setPendingAction] = useState<"save" | "export" | null>(null)

  const handleSave = async (content: ResumeContent) => {
    // 如果正在加载，不处理
    if (status === "loading") {
      return
    }
    // 如果未登录，提示登录
    if (status === "unauthenticated" || !session) {
      setPendingContent(content)
      setPendingAction("save")
      setAuthModal(true)
      return
    }

    setSaving(true)
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: content.personalInfo.name ? `${content.personalInfo.name}的简历` : "未命名简历",
          templateId: templateId,
          content: JSON.stringify(content),
        }),
      })

      if (!response.ok) {
        throw new Error("保存失败")
      }

      const resume = await response.json()
      toast("保存成功", "success")
      router.push(`/resumes/${resume.id}`)
    } catch (error) {
      console.error("Save error:", error)
      toast("保存失败，请重试", "error")
    } finally {
      setSaving(false)
    }
  }

  const handleExport = (content: ResumeContent) => {
    // 如果正在加载，不处理
    if (status === "loading") {
      return
    }
    // 如果未登录，提示登录
    if (status === "unauthenticated" || !session) {
      setPendingContent(content)
      setPendingAction("export")
      setAuthModal(true)
      return
    }
    // 已登录则执行导出
    doExport(content)
  }

  const doExport = async (content: ResumeContent) => {
    const { exportToPDF } = await import("@/lib/export")
    const filename = content.personalInfo.name
      ? `${content.personalInfo.name}_简历.pdf`
      : "简历.pdf"
    
    const result = await exportToPDF(content, templateId, filename)
    if (result.success) {
      toast("导出任务已创建，请在导出记录中查看", "success")
    } else {
      toast(result.error || "导出失败", "error")
    }
  }

  const handleAuthSuccess = async () => {
    setAuthModal(false)
    // 登录成功后，如果有待处理的内容，根据操作类型执行
    if (pendingContent) {
      if (pendingAction === "export") {
        // 执行导出
        doExport(pendingContent)
        setPendingContent(null)
        setPendingAction(null)
      } else {
        // 执行保存
        setSaving(true)
        try {
          const response = await fetch("/api/resumes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: pendingContent.personalInfo.name 
                ? `${pendingContent.personalInfo.name}的简历` 
                : "未命名简历",
              templateId: "classic",
              content: JSON.stringify(pendingContent),
            }),
          })

          if (response.ok) {
            const resume = await response.json()
            router.push(`/resumes/${resume.id}`)
          }
        } catch (error) {
          console.error("Save error:", error)
        } finally {
          setSaving(false)
          setPendingContent(null)
          setPendingAction(null)
        }
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="mb-6">
            <Button variant="ghost">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                返回首页
              </Link>
            </Button>
          </div>
          <ResumeEditor
            templateId={templateId}
            onSave={handleSave}
            onExport={handleExport}
          />
        </main>
      </div>

      <AuthModal
        isOpen={authModal}
        onClose={() => {
          setAuthModal(false)
          setPendingContent(null)
          setPendingAction(null)
        }}
        defaultView="login"
        onSuccess={handleAuthSuccess}
      />
    </>
  )
}

export default function NewResumePage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <NewResumeContent />
    </Suspense>
  )
}