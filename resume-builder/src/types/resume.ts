export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  achievements?: string[]
}

export interface Skill {
  id: string
  name: string
  level: number // 1-5
  category?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  achievements?: string[]
}

export interface ResumeContent {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  languages?: { name: string; level: string }[]
  certifications?: { name: string; issuer: string; date: string }[]
  interests?: string[]
}

export interface Resume {
  id: string
  title: string
  templateId: string
  content: ResumeContent
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface Template {
  id: string
  name: string
  slug: string
  description: string
  category: string
  thumbnail: string
  style: TemplateStyle
}

export interface TemplateStyle {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  fontSize: string
  lineHeight: string
  spacing: string
  layout: "single-column" | "two-column" | "creative"
}