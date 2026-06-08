import crypto from "crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price === 0) return "免费";
  return `¥${price.toFixed(2)}`;
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
}

export function generateOrderNo(): string {
  const now = new Date();
  const timestamp = now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0");
  // Use cryptographically secure random bytes instead of Math.random()
  const random = crypto.randomBytes(4).readUInt32BE(0) % 1000000;
  return `${timestamp}${random.toString().padStart(6, "0")}`;
}

export function generateCertificateNo(): string {
  const prefix = "AIAC";
  const now = new Date();
  const year = now.getFullYear();
  // Use cryptographically secure random bytes instead of Math.random()
  const random = crypto.randomBytes(4).readUInt32BE(0) % 1000000;
  return `${prefix}-${year}-${random.toString().padStart(6, "0")}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-龥]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getLevelBadge(level: string): { label: string; color: string } {
  switch (level) {
    case "beginner":
      return { label: "入门", color: "bg-green-100 text-green-800" };
    case "intermediate":
      return { label: "进阶", color: "bg-blue-100 text-blue-800" };
    case "advanced":
      return { label: "高级", color: "bg-purple-100 text-purple-800" };
    default:
      return { label: "入门", color: "bg-gray-100 text-gray-800" };
  }
}

export function getStatusBadge(status: string): { label: string; color: string } {
  switch (status) {
    case "pending":
      return { label: "待支付", color: "bg-yellow-100 text-yellow-800" };
    case "paid":
      return { label: "已支付", color: "bg-green-100 text-green-800" };
    case "failed":
      return { label: "支付失败", color: "bg-red-100 text-red-800" };
    case "refunded":
      return { label: "已退款", color: "bg-gray-100 text-gray-800" };
    case "cancelled":
      return { label: "已取消", color: "bg-gray-100 text-gray-800" };
    default:
      return { label: status, color: "bg-gray-100 text-gray-800" };
  }
}
