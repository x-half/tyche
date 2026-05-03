"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ResumeEditor } from "@/components/resume/editor/resume-editor"
import { Resume, ResumeContent } from "@/types/resume"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/toast"

export default function EditResumePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (session) {
      fetchResume()
    }
  }, [session, id])

  const fetchResume = async () => {
    try {
      const response = await fetch(`/api/resumes/${id}`)
      if (!response.ok) {
        throw new Error("获取简历失败")
      }
      const data = await response.json()
      setResume(data)
    } catch (error) {
      console.error("Fetch resume error:", error)
      toast("获取简历失败", "error")
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return <div>加载中...</div>
  }

  if (!session) {
    router.push("/login")
    return null
  }

  if (!resume) {
    return <div>简历不存在</div>
  }

  // 解析 JSON 字符串
  const resumeContent = typeof resume.content === 'string' 
    ? JSON.parse(resume.content) 
    : resume.content

  const handleSave = async (content: ResumeContent) => {
    setSaving(true)
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: content.personalInfo.name ? `${content.personalInfo.name}的简历` : resume.title,
          content: JSON.stringify(content),
        }),
      })

      if (!response.ok) {
        throw new Error("保存失败")
      }

      toast("保存成功", "success")
    } catch (error) {
      console.error("Save error:", error)
      toast("保存失败，请重试", "error")
    } finally {
      setSaving(false)
    }
  }

  const handleExport = async () => {
    if (!resume) return
    
    const { exportToPDF } = await import("@/lib/export")
    const content = typeof resume.content === 'string' 
      ? JSON.parse(resume.content) 
      : resume.content
    
    const filename = content.personalInfo?.name
      ? `${content.personalInfo.name}_简历.pdf`
      : "简历.pdf"
    
    const result = await exportToPDF(content, resume.templateId, filename)
    if (!result.success) {
      toast(result.error || "导出失败", "error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button variant="ghost">
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回仪表盘
            </Link>
          </Button>
        </div>
        <ResumeEditor
          initialContent={resumeContent}
          templateId={resume.templateId}
          onSave={handleSave}
          onExport={handleExport}
        />
      </main>
    </div>
  )
}