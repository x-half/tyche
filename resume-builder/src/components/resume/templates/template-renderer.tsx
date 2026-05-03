"use client"

import { ResumeContent, Template, TemplateStyle } from "@/types/resume"
import { ClassicTemplate } from "./classic-template"
import { ModernTemplate } from "./modern-template"
import { CreativeTemplate } from "./creative-template"
import { MinimalTemplate } from "./minimal-template"
import { ProfessionalTemplate } from "./professional-template"
import { TechTemplate } from "./tech-template"

interface TemplateRendererProps {
  template: Template
  content: ResumeContent
}

export function TemplateRenderer({ template, content }: TemplateRendererProps) {
  switch (template.id) {
    case "classic":
      return <ClassicTemplate content={content} style={template.style} />
    case "modern":
      return <ModernTemplate content={content} style={template.style} />
    case "creative":
      return <CreativeTemplate content={content} style={template.style} />
    case "minimal":
      return <MinimalTemplate content={content} style={template.style} />
    case "professional":
      return <ProfessionalTemplate content={content} style={template.style} />
    case "tech":
      return <TechTemplate content={content} style={template.style} />
    default:
      return <ClassicTemplate content={content} style={template.style} />
  }
}
