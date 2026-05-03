"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Lock, Save } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { data: session, status, update } = useSession()
  const [name, setName] = useState(session?.user?.name || "")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  if (status === "loading") {
    return <div>加载中...</div>
  }

  if (!session) {
    router.push("/login")
    return null
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error("更新失败")
      }

      await update({ name })
      setMessage("个人资料已更新")
    } catch (error) {
      setMessage("更新失败，请重试")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">账户设置</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              个人资料
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              安全设置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>更新你的个人信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="text-2xl">
                      {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{session.user?.email}</p>
                    <p className="text-sm text-muted-foreground">邮箱地址</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入姓名"
                  />
                </div>

                {message && (
                  <p className={`text-sm ${message.includes("失败") ? "text-red-500" : "text-green-500"}`}>
                    {message}
                  </p>
                )}

                <Button onClick={handleSaveProfile} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "保存中..." : "保存更改"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>管理你的密码和安全选项</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">安全设置功能开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}