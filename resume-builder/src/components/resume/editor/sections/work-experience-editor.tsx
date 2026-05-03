"use client"

import { UseFormReturn, useFieldArray } from "react-hook-form"
import { ResumeContent } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface WorkExperienceEditorProps {
  form: UseFormReturn<ResumeContent>
}

export function WorkExperienceEditor({ form }: WorkExperienceEditorProps) {
  const { register, control, watch } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  })

  const addExperience = () => {
    append({
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>工作经历</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addExperience}>
          <Plus className="h-4 w-4 mr-2" />
          添加经历
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            暂无工作经历，点击上方按钮添加
          </p>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">经历 {index + 1}</h4>
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
                <Label>公司名称</Label>
                <Input
                  {...register(`workExperience.${index}.company`)}
                  placeholder="请输入公司名称"
                />
              </div>
              <div className="space-y-2">
                <Label>职位</Label>
                <Input
                  {...register(`workExperience.${index}.position`)}
                  placeholder="请输入职位"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>开始时间</Label>
                <Input
                  type="month"
                  {...register(`workExperience.${index}.startDate`)}
                />
              </div>
              <div className="space-y-2">
                <Label>结束时间</Label>
                <div className="space-y-2">
                  <Input
                    type="month"
                    {...register(`workExperience.${index}.endDate`)}
                    disabled={watch(`workExperience.${index}.current`)}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${index}`}
                      {...register(`workExperience.${index}.current`)}
                    />
                    <Label htmlFor={`current-${index}`} className="text-sm font-normal">
                      至今
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>工作描述</Label>
              <Textarea
                {...register(`workExperience.${index}.description`)}
                placeholder="请描述您的工作职责"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>主要成就（每行一个）</Label>
              <Textarea
                {...register(`workExperience.${index}.achievements`)}
                placeholder="请输入主要成就，每行一个"
                rows={3}
                onChange={(e) => {
                  const value = e.target.value
                  const achievements = value.split("\n").filter((a) => a.trim())
                  form.setValue(`workExperience.${index}.achievements`, achievements)
                }}
                defaultValue={watch(`workExperience.${index}.achievements`)?.join("\n") || ""}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}