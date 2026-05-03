"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { ResumeContent, Template } from "@/types/resume"
import { defaultResumeContent } from "@/lib/resume-data"
import { exportToPDF } from "@/lib/export"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoEditor } from "./sections/personal-info-editor"
import { WorkExperienceEditor } from "./sections/work-experience-editor"
import { EducationEditor } from "./sections/education-editor"
import { SkillsEditor } from "./sections/skills-editor"
import { ProjectsEditor } from "./sections/projects-editor"
import { TemplateRenderer } from "../templates/template-renderer"
import { getTemplateById } from "@/lib/templates"
import { Save, Download, Eye, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/toast"

interface ResumeEditorProps {
  initialContent?: ResumeContent
  templateId: string
  onSave?: (content: ResumeContent) => void
  onExport?: (content: ResumeContent) => void
}

export function ResumeEditor({
  initialContent = defaultResumeContent,
  templateId,
  onSave,
  onExport,
}: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState("edit")
  const [saving, setSaving] = useState(false)
  const [exporting, setExporting] = useState(false)
  const { toast } = useToast()
  const template = getTemplateById(templateId) || getTemplateById("classic")!

  const form = useForm<ResumeContent>({
    defaultValues: initialContent,
  })

  const watchedContent = form.watch()

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave?.(watchedContent)
    } finally {
      setSaving(false)
    }
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      // 如果有onExport回调，调用它（用于检查登录状态）
      if (onExport) {
        onExport(watchedContent)
        setExporting(false)
        return
      }
      // 否则直接导出
      const filename = watchedContent.personalInfo.name
        ? `${watchedContent.personalInfo.name}_简历.pdf`
        : "简历.pdf"
      const result = await exportToPDF(watchedContent, templateId, filename)
      if (result.success) {
        toast("导出任务已创建，请在导出记录中查看", "success")
      } else {
        toast(result.error || "导出失败", "error")
      }
    } catch (error) {
      toast("导出失败，请重试", "error")
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Editor Panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">编辑简历</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "保存中..." : "保存"}
            </Button>
            <Button onClick={handleExport} disabled={exporting}>
              {exporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {exporting ? "导出中..." : "导出PDF"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="edit">编辑内容</TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              预览
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <form className="space-y-6">
              <PersonalInfoEditor form={form} />
              <WorkExperienceEditor form={form} />
              <EducationEditor form={form} />
              <SkillsEditor form={form} />
              <ProjectsEditor form={form} />
            </form>
          </TabsContent>

          <TabsContent value="preview">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div id="resume-preview" className="transform origin-top-left" style={{ width: "800px" }}>
                <TemplateRenderer template={template} content={watchedContent} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

        {/* Preview Panel (Desktop) */}
        <div className="hidden lg:block w-[400px] shrink-0">
            <div className="sticky top-6">
              <h2 className="text-lg font-semibold mb-4">实时预览</h2>
              <div className="border rounded-lg overflow-hidden bg-gray-50" style={{ height: "calc(100vh - 200px)" }}>
                <div className="overflow-y-auto h-full p-4">
                  <div 
                    id="resume-preview" 
                    data-resume-preview 
                    className="bg-white shadow-sm"
                    style={{ 
                      width: "800px", 
                      minHeight: "1131px", // A4 比例: 800 * (297/210)
                      transform: "scale(0.5)", 
                      transformOrigin: "top left" 
                    }}
                  >
                    <TemplateRenderer template={template} content={watchedContent} />
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}