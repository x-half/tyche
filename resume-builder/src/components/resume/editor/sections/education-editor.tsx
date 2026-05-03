"use client"

import { UseFormReturn, useFieldArray } from "react-hook-form"
import { ResumeContent } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface EducationEditorProps {
  form: UseFormReturn<ResumeContent>
}

export function EducationEditor({ form }: EducationEditorProps) {
  const { register, control } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  })

  const addEducation = () => {
    append({
      id: uuidv4(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      achievements: [],
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>教育背景</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addEducation}>
          <Plus className="h-4 w-4 mr-2" />
          添加教育
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            暂无教育背景，点击上方按钮添加
          </p>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">教育 {index + 1}</h4>
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
                <Label>学校名称</Label>
                <Input
                  {...register(`education.${index}.school`)}
                  placeholder="请输入学校名称"
                />
              </div>
              <div className="space-y-2">
                <Label>学位</Label>
                <Input
                  {...register(`education.${index}.degree`)}
                  placeholder="如：本科、硕士"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>专业</Label>
                <Input
                  {...register(`education.${index}.field`)}
                  placeholder="请输入专业"
                />
              </div>
              <div className="space-y-2">
                <Label>GPA（可选）</Label>
                <Input
                  {...register(`education.${index}.gpa`)}
                  placeholder="如：3.8/4.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>开始时间</Label>
                <Input
                  type="month"
                  {...register(`education.${index}.startDate`)}
                />
              </div>
              <div className="space-y-2">
                <Label>结束时间</Label>
                <Input
                  type="month"
                  {...register(`education.${index}.endDate`)}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}