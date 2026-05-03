"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, X } from "lucide-react"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "确认",
  cancelText = "取消",
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 overflow-hidden border-0 shadow-2xl bg-card [&>button]:hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="px-8 pt-8 pb-6">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
            variant === "destructive" ? "bg-red-100" : "bg-blue-100"
          }`}>
            <AlertCircle className={`h-6 w-6 ${
              variant === "destructive" ? "text-red-500" : "text-blue-500"
            }`} />
          </div>
          <DialogTitle className="text-xl font-bold text-center">
            {title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {message}
          </p>
        </div>

        <div className="px-8 pb-8 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-11 rounded-lg"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            className="flex-1 h-11 rounded-lg"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}