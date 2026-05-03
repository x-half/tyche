"use client"

import { UseFormReturn, useFieldArray } from "react-hook-form"
import { ResumeContent } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface ProjectsEditorProps {
  form: UseFormReturn<ResumeContent>
}

export function ProjectsEditor({ form }: ProjectsEditorProps) {
  const { register, control, watch, setValue } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  })

  const addProject = () => {
    append({
      id: uuidv4(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
      achievements: [],
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>项目经验</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addProject}>
          <Plus className="h-4 w-4 mr-2" />
          添加项目
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            暂无项目经验，点击上方按钮添加
          </p>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">项目 {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>项目名称</Label>
                <Input
                  {...register(`projects.${index}.name`)}
                  placeholder="请输入项目名称"
                />
              </div>
              <div className="space-y-2">
                <Label>技术栈（逗号分隔）</Label>
                <Input
                  {...register(`projects.${index}.technologies`)}
                  placeholder="React, TypeScript, Node.js"
                  onChange={(e) => {
                    const value = e.target.value
                    const technologies = value.split(",").map((t) => t.trim()).filter(Boolean)
                    setValue(`projects.${index}.technologies`, technologies)
                  }}
                  defaultValue={watch(`projects.${index}.technologies`)?.join(", ") || ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>项目描述</Label>
              <Textarea
                {...register(`projects.${index}.description`)}
                placeholder="请描述项目的内容和您的职责"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>项目链接（可选）</Label>
                <Input
                  {...register(`projects.${index}.link`)}
                  placeholder="https://"
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub（可选）</Label>
                <Input
                  {...register(`projects.${index}.github`)}
                  placeholder="github.com/username/repo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>主要成就（每行一个）</Label>
              <Textarea
                {...register(`projects.${index}.achievements`)}
                placeholder="请输入主要成就，每行一个"
                rows={3}
                onChange={(e) => {
                  const value = e.target.value
                  const achievements = value.split("\n").filter((a) => a.trim())
                  setValue(`projects.${index}.achievements`, achievements)
                }}
                defaultValue={watch(`projects.${index}.achievements`)?.join("\n") || ""}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}