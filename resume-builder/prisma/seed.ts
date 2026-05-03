import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const templates = [
  {
    id: "classic",
    name: "经典",
    slug: "classic",
    description: "简洁大方的传统简历模板，适合金融、法律等传统行业",
    category: "传统",
    thumbnail: "/templates/classic.svg",
    style: JSON.stringify({
      primaryColor: "#1a365d",
      secondaryColor: "#2d3748",
      fontFamily: "serif",
      fontSize: "14px",
      lineHeight: "1.6",
      spacing: "normal",
      layout: "single-column",
    }),
  },
  {
    id: "modern",
    name: "现代",
    slug: "modern",
    description: "时尚现代的设计风格，适合科技、互联网行业",
    category: "现代",
    thumbnail: "/templates/modern.svg",
    style: JSON.stringify({
      primaryColor: "#7c3aed",
      secondaryColor: "#4f46e5",
      fontFamily: "sans-serif",
      fontSize: "14px",
      lineHeight: "1.6",
      spacing: "relaxed",
      layout: "two-column",
    }),
  },
  {
    id: "creative",
    name: "创意",
    slug: "creative",
    description: "独特创意的布局设计，适合设计师、艺术家",
    category: "创意",
    thumbnail: "/templates/creative.svg",
    style: JSON.stringify({
      primaryColor: "#ec4899",
      secondaryColor: "#f43f5e",
      fontFamily: "sans-serif",
      fontSize: "14px",
      lineHeight: "1.6",
      spacing: "relaxed",
      layout: "creative",
    }),
  },
  {
    id: "minimal",
    name: "简约",
    slug: "minimal",
    description: "极简主义设计，突出内容本身",
    category: "简约",
    thumbnail: "/templates/minimal.svg",
    style: JSON.stringify({
      primaryColor: "#374151",
      secondaryColor: "#6b7280",
      fontFamily: "sans-serif",
      fontSize: "14px",
      lineHeight: "1.8",
      spacing: "loose",
      layout: "single-column",
    }),
  },
  {
    id: "professional",
    name: "专业",
    slug: "professional",
    description: "专业商务风格，适合管理层和高级职位",
    category: "商务",
    thumbnail: "/templates/professional.svg",
    style: JSON.stringify({
      primaryColor: "#0f172a",
      secondaryColor: "#1e293b",
      fontFamily: "serif",
      fontSize: "14px",
      lineHeight: "1.6",
      spacing: "normal",
      layout: "two-column",
    }),
  },
  {
    id: "tech",
    name: "技术",
    slug: "tech",
    description: "专为技术人员设计，突出技术栈和项目经验",
    category: "技术",
    thumbnail: "/templates/tech.svg",
    style: JSON.stringify({
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      fontFamily: "mono",
      fontSize: "13px",
      lineHeight: "1.6",
      spacing: "normal",
      layout: "two-column",
    }),
  },
]

async function main() {
  console.log('Seeding templates...')
  
  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: template,
      create: template,
    })
  }
  
  console.log('Templates seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })