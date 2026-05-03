"use client"

import { UseFormReturn, useFieldArray } from "react-hook-form"
import { ResumeContent } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface SkillsEditorProps {
  form: UseFormReturn<ResumeContent>
}

export function SkillsEditor({ form }: SkillsEditorProps) {
  const { register, control, watch, setValue } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  })

  const addSkill = () => {
    append({
      id: uuidv4(),
      name: "",
      level: 3,
      category: "",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>专业技能</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addSkill}>
          <Plus className="h-4 w-4 mr-2" />
          添加技能
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            暂无技能，点击上方按钮添加
          </p>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>技能名称</Label>
                <Input
                  {...register(`skills.${index}.name`)}
                  placeholder="如：React"
                />
              </div>
              <div className="space-y-2">
                <Label>分类（可选）</Label>
                <Input
                  {...register(`skills.${index}.category`)}
                  placeholder="如：前端框架"
                />
              </div>
              <div className="space-y-2">
                <Label>熟练程度：{watch(`skills.${index}.level`) * 20}%</Label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[watch(`skills.${index}.level`)]}
                  onValueChange={(value: number | readonly number[]) => {
                    const val = Array.isArray(value) ? value[0] : value
                    setValue(`skills.${index}.level`, val)
                  }}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-700 mt-6"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}