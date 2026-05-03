"use client"

import { UseFormReturn } from "react-hook-form"
import { ResumeContent } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PersonalInfoEditorProps {
  form: UseFormReturn<ResumeContent>
}

export function PersonalInfoEditor({ form }: PersonalInfoEditorProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>个人信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              {...register("personalInfo.name", { required: "请输入姓名" })}
              placeholder="请输入姓名"
            />
            {errors.personalInfo?.name && (
              <p className="text-sm text-red-500">{errors.personalInfo.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">职位</Label>
            <Input
              id="title"
              {...register("personalInfo.title")}
              placeholder="请输入目标职位"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              {...register("personalInfo.email", {
                required: "请输入邮箱",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "邮箱格式不正确",
                },
              })}
              placeholder="请输入邮箱"
            />
            {errors.personalInfo?.email && (
              <p className="text-sm text-red-500">{errors.personalInfo.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">电话</Label>
            <Input
              id="phone"
              {...register("personalInfo.phone")}
              placeholder="请输入电话号码"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">所在地</Label>
          <Input
            id="location"
            {...register("personalInfo.location")}
            placeholder="请输入所在地"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">个人网站</Label>
            <Input
              id="website"
              {...register("personalInfo.website")}
              placeholder="https://"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              {...register("personalInfo.linkedin")}
              placeholder="linkedin.com/in/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            {...register("personalInfo.github")}
            placeholder="github.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">个人简介</Label>
          <Textarea
            id="summary"
            {...register("personalInfo.summary")}
            placeholder="请简要介绍自己的专业背景和优势"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}