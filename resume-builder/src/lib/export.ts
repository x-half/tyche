"use client"

import { ResumeContent } from "@/types/resume"

export async function exportToPDF(content: ResumeContent, templateId: string, filename: string = "resume.pdf") {
  try {
    // 调用服务端 API 创建导出任务
    const response = await fetch("/api/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        templateId,
        filename,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "创建导出任务失败")
    }

    const data = await response.json()
    
    return { 
      success: true, 
      taskId: data.taskId,
      message: data.message 
    }
  } catch (error) {
    console.error("Export to PDF error:", error)
    return { success: false, error: error instanceof Error ? error.message : "导出PDF失败" }
  }
}

export async function getExportTasks() {
  try {
    const response = await fetch("/api/export/tasks")
    
    if (!response.ok) {
      throw new Error("获取导出任务失败")
    }

    return await response.json()
  } catch (error) {
    console.error("Get export tasks error:", error)
    return []
  }
}

export async function downloadExportFile(taskId: string, filename: string) {
  try {
    const response = await fetch(`/api/export/${taskId}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "下载失败")
    }

    // 下载文件
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    return { success: true }
  } catch (error) {
    console.error("Download export file error:", error)
    return { success: false, error: error instanceof Error ? error.message : "下载失败" }
  }
}
