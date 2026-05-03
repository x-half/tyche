import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import puppeteer from "puppeteer-core"
import { defaultTemplates } from "@/lib/templates"

// 通用的区块渲染函数
function renderSection(title: string, content: string, style: any): string {
  return `
    <section style="margin-bottom: 0.5rem;">
      <h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.25rem; padding-bottom: 0.125rem; border-bottom: 1px solid ${style.primaryColor}; color: ${style.primaryColor};">${title}</h2>
      ${content}
    </section>
  `
}

// Classic 模板渲染 - 单栏居中布局
function renderClassicTemplate(content: any, style: any): string {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return `
    <div style="font-family: ${style.fontFamily}; font-size: ${style.fontSize}; line-height: ${style.lineHeight}; color: #333; width: 100%; min-height: 100%;">
      <header style="text-align: center; margin-bottom: 0.5rem;">
        <h1 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 0.25rem; color: ${style.primaryColor};">${personalInfo.name}</h1>
        <p style="font-size: 1.125rem; margin-bottom: 0.5rem; color: ${style.secondaryColor};">${personalInfo.title}</p>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; font-size: 0.875rem;">
          ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
          ${personalInfo.website ? `<span>${personalInfo.website}</span>` : ''}
        </div>
      </header>

      ${personalInfo.summary ? renderSection('个人简介', `<p style="font-size: 0.875rem;">${personalInfo.summary}</p>`, style) : ''}

      ${workExperience.length > 0 ? renderSection('工作经历', workExperience.map((exp: any) => `
        <div style="margin-bottom: 0.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.125rem;">
            <div>
              <h3 style="font-weight: bold;">${exp.position}</h3>
              <p style="font-size: 0.875rem; color: ${style.secondaryColor};">${exp.company}</p>
            </div>
            <span style="font-size: 0.875rem; color: #6b7280;">${exp.startDate} - ${exp.current ? "至今" : exp.endDate}</span>
          </div>
          ${exp.description ? `<p style="font-size: 0.875rem; margin-bottom: 0.125rem;">${exp.description}</p>` : ''}
          ${exp.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem;">${exp.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
        </div>
      `).join(''), style) : ''}

      ${education.length > 0 ? renderSection('教育背景', education.map((edu: any) => `
        <div style="margin-bottom: 0.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h3 style="font-weight: bold;">${edu.school}</h3>
              <p style="font-size: 0.875rem;">${edu.degree} · ${edu.field}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
            </div>
            <span style="font-size: 0.875rem; color: #6b7280;">${edu.startDate} - ${edu.endDate}</span>
          </div>
          ${edu.achievements && edu.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem; margin-top: 0.125rem;">${edu.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
        </div>
      `).join(''), style) : ''}

      ${skills.length > 0 ? renderSection('专业技能', `<div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">${skills.map((skill: any) => `<span style="padding: 0.125rem 0.5rem; font-size: 0.875rem; border-radius: 9999px; background-color: ${style.primaryColor}15; color: ${style.primaryColor};">${skill.name}</span>`).join('')}</div>`, style) : ''}

      ${projects.length > 0 ? renderSection('项目经验', projects.map((project: any) => `
        <div style="margin-bottom: 0.25rem;">
          <h3 style="font-weight: bold;">${project.name}</h3>
          <p style="font-size: 0.875rem; margin-bottom: 0.125rem;">${project.description}</p>
          ${project.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 0.125rem; margin-bottom: 0.25rem;">${project.technologies.map((tech: string) => `<span style="padding: 0.0625rem 0.375rem; font-size: 0.75rem; border-radius: 0.25rem; background-color: ${style.secondaryColor}20; color: ${style.secondaryColor};">${tech}</span>`).join('')}</div>` : ''}
          ${project.achievements && project.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem;">${project.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
        </div>
      `).join(''), style) : ''}

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
        ${languages && languages.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.25rem; padding-bottom: 0.125rem; border-bottom: 1px solid ${style.primaryColor}; color: ${style.primaryColor};">语言能力</h2><div>${languages.map((lang: any) => `<div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.125rem;"><span>${lang.name}</span><span style="color: #6b7280;">${lang.level}</span></div>`).join('')}</div></section>` : ''}
        ${certifications && certifications.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.25rem; padding-bottom: 0.125rem; border-bottom: 1px solid ${style.primaryColor}; color: ${style.primaryColor};">证书认证</h2><div>${certifications.map((cert: any) => `<div style="font-size: 0.875rem; margin-bottom: 0.125rem;"><p style="font-weight: 500;">${cert.name}</p><p style="color: #6b7280;">${cert.issuer} · ${cert.date}</p></div>`).join('')}</div></section>` : ''}
      </div>
    </div>
  `
}

// Modern 模板渲染 - 左右两栏布局
function renderModernTemplate(content: any, style: any): string {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return `
    <div style="font-family: ${style.fontFamily}; font-size: ${style.fontSize}; line-height: ${style.lineHeight}; display: flex; width: 100%; min-height: 100%;">
      <aside style="width: 33.333%; padding: 1.5rem; background-color: ${style.primaryColor}; color: white;">
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="width: 6rem; height: 6rem; border-radius: 50%; background-color: rgba(255,255,255,0.2); margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 1.875rem; font-weight: bold;">${personalInfo.name.charAt(0)}</span>
          </div>
          <h1 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.25rem;">${personalInfo.name}</h1>
          <p style="color: rgba(255,255,255,0.8); margin-bottom: 1.5rem;">${personalInfo.title}</p>
        </div>

        <section style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; color: rgba(255,255,255,0.6);">联系方式</h2>
          <div style="font-size: 0.875rem;">
            ${personalInfo.email ? `<div style="margin-bottom: 0.5rem;">📧 ${personalInfo.email}</div>` : ''}
            ${personalInfo.phone ? `<div style="margin-bottom: 0.5rem;">📱 ${personalInfo.phone}</div>` : ''}
            ${personalInfo.location ? `<div style="margin-bottom: 0.5rem;">📍 ${personalInfo.location}</div>` : ''}
            ${personalInfo.website ? `<div style="margin-bottom: 0.5rem;">🌐 ${personalInfo.website}</div>` : ''}
          </div>
        </section>

        ${skills.length > 0 ? `
          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; color: rgba(255,255,255,0.6);">专业技能</h2>
            <div>
              ${skills.map((skill: any) => `
                <div style="margin-bottom: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.25rem;"><span>${skill.name}</span><span style="color: rgba(255,255,255,0.6);">${skill.level * 20}%</span></div>
                  <div style="width: 100%; height: 0.375rem; background-color: rgba(255,255,255,0.2); border-radius: 9999px;"><div style="height: 100%; background-color: white; border-radius: 9999px; width: ${skill.level * 20}%;"></div></div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${languages && languages.length > 0 ? `
          <section>
            <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; color: rgba(255,255,255,0.6);">语言能力</h2>
            <div style="font-size: 0.875rem;">${languages.map((lang: any) => `<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"><span>${lang.name}</span><span style="color: rgba(255,255,255,0.6);">${lang.level}</span></div>`).join('')}</div>
          </section>
        ` : ''}
      </aside>

      <main style="flex: 1; padding: 1.5rem;">
        ${personalInfo.summary ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem; color: ${style.primaryColor};">个人简介</h2><p style="font-size: 0.875rem;">${personalInfo.summary}</p></section>` : ''}

        ${workExperience.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">工作经历</h2>${workExperience.map((exp: any) => `
          <div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid ${style.primaryColor}40;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;"><div><h3 style="font-weight: bold;">${exp.position}</h3><p style="font-size: 0.875rem; color: ${style.secondaryColor};">${exp.company}</p></div><span style="font-size: 0.875rem; color: #6b7280;">${exp.startDate} - ${exp.current ? "至今" : exp.endDate}</span></div>
            ${exp.description ? `<p style="font-size: 0.875rem; margin-bottom: 0.25rem;">${exp.description}</p>` : ''}
            ${exp.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem;">${exp.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}</section>` : ''}

        ${education.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">教育背景</h2>${education.map((edu: any) => `
          <div style="margin-bottom: 0.75rem; padding-left: 1rem; border-left: 2px solid ${style.primaryColor}40;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;"><div><h3 style="font-weight: bold;">${edu.school}</h3><p style="font-size: 0.875rem;">${edu.degree} · ${edu.field}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p></div><span style="font-size: 0.875rem; color: #6b7280;">${edu.startDate} - ${edu.endDate}</span></div>
            ${edu.achievements && edu.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem; margin-top: 0.25rem;">${edu.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}</section>` : ''}

        ${projects.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">项目经验</h2>${projects.map((project: any) => `
          <div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid ${style.primaryColor}40;">
            <h3 style="font-weight: bold;">${project.name}</h3>
            <p style="font-size: 0.875rem; margin-bottom: 0.25rem;">${project.description}</p>
            ${project.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 0.5rem;">${project.technologies.map((tech: string) => `<span style="padding: 0.125rem 0.5rem; font-size: 0.75rem; border-radius: 0.25rem; background-color: ${style.primaryColor}20; color: ${style.primaryColor};">${tech}</span>`).join('')}</div>` : ''}
            ${project.achievements && project.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem;">${project.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}</section>` : ''}

        ${certifications && certifications.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">证书认证</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">${certifications.map((cert: any) => `<div style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;"><p style="font-weight: 500; font-size: 0.875rem;">${cert.name}</p><p style="font-size: 0.75rem; color: #6b7280;">${cert.issuer} · ${cert.date}</p></div>`).join('')}</div></section>` : ''}
      </main>
    </div>
  `
}

// Creative 模板渲染 - 头像+网格布局
function renderCreativeTemplate(content: any, style: any): string {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return `
    <div style="font-family: ${style.fontFamily}; font-size: ${style.fontSize}; line-height: ${style.lineHeight}; background: linear-gradient(to bottom right, #fdf2f8, white); width: 100%; min-height: 100%; padding: 1.5rem;">
      <header style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 3px solid ${style.primaryColor}40;">
        <div style="width: 5rem; height: 5rem; border-radius: 50%; background: linear-gradient(to bottom right, ${style.primaryColor}, ${style.secondaryColor}); display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 1.5rem; font-weight: bold;">${personalInfo.name.charAt(0)}</span>
        </div>
        <div>
          <h1 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 0.25rem;">${personalInfo.name}</h1>
          <p style="font-size: 1.125rem; color: ${style.primaryColor};">${personalInfo.title}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">
            ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
          </div>
        </div>
      </header>

      ${personalInfo.summary ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem; color: ${style.primaryColor};">个人简介</h2><p style="font-size: 0.875rem;">${personalInfo.summary}</p></section>` : ''}

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
        ${workExperience.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">工作经历</h2>${workExperience.map((exp: any) => `
          <div style="margin-bottom: 0.75rem;">
            <h3 style="font-weight: bold;">${exp.position}</h3>
            <p style="font-size: 0.875rem; color: ${style.secondaryColor};">${exp.company} · ${exp.startDate} - ${exp.current ? "至今" : exp.endDate}</p>
            ${exp.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem; margin-top: 0.25rem;">${exp.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}</section>` : ''}

        ${education.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">教育背景</h2>${education.map((edu: any) => `
          <div style="margin-bottom: 0.75rem;">
            <h3 style="font-weight: bold;">${edu.school}</h3>
            <p style="font-size: 0.875rem;">${edu.degree} · ${edu.field}</p>
            <p style="font-size: 0.875rem; color: #6b7280;">${edu.startDate} - ${edu.endDate}</p>
          </div>
        `).join('')}</section>` : ''}
      </div>

      ${skills.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">专业技能</h2><div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${skills.map((skill: any) => `<span style="padding: 0.25rem 0.75rem; font-size: 0.875rem; border-radius: 9999px; background: linear-gradient(to right, ${style.primaryColor}20, ${style.secondaryColor}20); color: ${style.primaryColor};">${skill.name}</span>`).join('')}</div></section>` : ''}

      ${projects.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">项目经验</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">${projects.map((project: any) => `
        <div style="padding: 1rem; background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="font-weight: bold; margin-bottom: 0.25rem;">${project.name}</h3>
          <p style="font-size: 0.875rem; margin-bottom: 0.5rem;">${project.description}</p>
          ${project.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">${project.technologies.map((tech: string) => `<span style="padding: 0.125rem 0.375rem; font-size: 0.75rem; border-radius: 0.25rem; background-color: ${style.primaryColor}15; color: ${style.primaryColor};">${tech}</span>`).join('')}</div>` : ''}
        </div>
      `).join('')}</div></section>` : ''}
    </div>
  `
}

// Minimal 模板渲染 - 极简单栏布局
function renderMinimalTemplate(content: any, style: any): string {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return `
    <div style="font-family: ${style.fontFamily}; font-size: ${style.fontSize}; line-height: ${style.lineHeight}; color: #333; width: 100%; min-height: 100%; padding: 2rem;">
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: 300; letter-spacing: 0.1em; margin-bottom: 0.5rem;">${personalInfo.name}</h1>
        <p style="font-size: 1.125rem; color: #9ca3af;">${personalInfo.title}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.875rem; color: #9ca3af; margin-top: 1rem;">
          ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
        </div>
      </header>

      ${personalInfo.summary ? `<section style="margin-bottom: 2rem;"><h2 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.2em; color: #9ca3af; margin-bottom: 0.75rem;">简介</h2><p style="font-size: 0.875rem;">${personalInfo.summary}</p></section>` : ''}

      ${workExperience.length > 0 ? `<section style="margin-bottom: 2rem;"><h2 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.2em; color: #9ca3af; margin-bottom: 0.75rem;">经历</h2>${workExperience.map((exp: any) => `
        <div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;"><h3 style="font-weight: 500;">${exp.position}</h3><span style="font-size: 0.875rem; color: #9ca3af;">${exp.startDate} - ${exp.current ? "至今" : exp.endDate}</span></div>
          <p style="font-size: 0.875rem; color: #6b7280;">${exp.company}</p>
          ${exp.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem; margin-top: 0.5rem;">${exp.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
        </div>
      `).join('')}</section>` : ''}

      ${education.length > 0 ? `<section style="margin-bottom: 2rem;"><h2 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.2em; color: #9ca3af; margin-bottom: 0.75rem;">教育</h2>${education.map((edu: any) => `
        <div style="margin-bottom: 0.75rem; padding-left: 1rem; border-left: 2px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;"><h3 style="font-weight: 500;">${edu.school}</h3><span style="font-size: 0.875rem; color: #9ca3af;">${edu.startDate} - ${edu.endDate}</span></div>
          <p style="font-size: 0.875rem; color: #6b7280;">${edu.degree} · ${edu.field}</p>
        </div>
      `).join('')}</section>` : ''}

      ${skills.length > 0 ? `<section><h2 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.2em; color: #9ca3af; margin-bottom: 0.75rem;">技能</h2><div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${skills.map((skill: any) => `<span style="padding: 0.25rem 0.75rem; font-size: 0.875rem; border: 1px solid #e5e7eb; border-radius: 0.25rem;">${skill.name}</span>`).join('')}</div></section>` : ''}
    </div>
  `
}

// Professional 模板渲染 - 深色头部+双栏内容区
function renderProfessionalTemplate(content: any, style: any): string {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return `
    <div style="font-family: ${style.fontFamily}; font-size: ${style.fontSize}; line-height: ${style.lineHeight}; color: #333; width: 100%; min-height: 100%;">
      <header style="background-color: ${style.primaryColor}; color: white; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 0.25rem;">${personalInfo.name}</h1>
        <p style="font-size: 1.125rem; color: rgba(255,255,255,0.8);">${personalInfo.title}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.875rem; color: rgba(255,255,255,0.6); margin-top: 0.75rem;">
          ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
        </div>
      </header>

      <div style="padding: 0 1.5rem;">
        ${personalInfo.summary ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem; color: ${style.primaryColor};">个人简介</h2><p style="font-size: 0.875rem;">${personalInfo.summary}</p></section>` : ''}

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
          <div>
            ${workExperience.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">工作经历</h2>${workExperience.map((exp: any) => `
              <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;"><div><h3 style="font-weight: bold;">${exp.position}</h3><p style="font-size: 0.875rem; color: ${style.secondaryColor};">${exp.company}</p></div><span style="font-size: 0.875rem; color: #6b7280;">${exp.startDate} - ${exp.current ? "至今" : exp.endDate}</span></div>
                ${exp.description ? `<p style="font-size: 0.875rem; margin-bottom: 0.25rem;">${exp.description}</p>` : ''}
                ${exp.achievements.length > 0 ? `<ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.875rem;">${exp.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
              </div>
            `).join('')}</section>` : ''}

            ${projects.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">项目经验</h2>${projects.map((project: any) => `
              <div style="margin-bottom: 1rem;">
                <h3 style="font-weight: bold;">${project.name}</h3>
                <p style="font-size: 0.875rem; margin-bottom: 0.25rem;">${project.description}</p>
                ${project.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 0.5rem;">${project.technologies.map((tech: string) => `<span style="padding: 0.125rem 0.375rem; font-size: 0.75rem; border-radius: 0.25rem; background-color: ${style.primaryColor}15; color: ${style.primaryColor};">${tech}</span>`).join('')}</div>` : ''}
              </div>
            `).join('')}</section>` : ''}
          </div>

          <div>
            ${education.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">教育背景</h2>${education.map((edu: any) => `
              <div style="margin-bottom: 0.75rem;">
                <h3 style="font-weight: bold;">${edu.school}</h3>
                <p style="font-size: 0.875rem;">${edu.degree} · ${edu.field}</p>
                <p style="font-size: 0.875rem; color: #6b7280;">${edu.startDate} - ${edu.endDate}</p>
              </div>
            `).join('')}</section>` : ''}

            ${skills.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">专业技能</h2><div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">${skills.map((skill: any) => `<span style="padding: 0.125rem 0.5rem; font-size: 0.875rem; border-radius: 0.25rem; background-color: ${style.primaryColor}15; color: ${style.primaryColor};">${skill.name}</span>`).join('')}</div></section>` : ''}

            ${languages && languages.length > 0 ? `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">语言能力</h2><div>${languages.map((lang: any) => `<div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.25rem;"><span>${lang.name}</span><span style="color: #6b7280;">${lang.level}</span></div>`).join('')}</div></section>` : ''}

            ${certifications && certifications.length > 0 ? `<section><h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem; color: ${style.primaryColor};">证书认证</h2><div>${certifications.map((cert: any) => `<div style="font-size: 0.875rem; margin-bottom: 0.5rem;"><p style="font-weight: 500;">${cert.name}</p><p style="color: #6b7280;">${cert.issuer} · ${cert.date}</p></div>`).join('')}</div></section>` : ''}
          </div>
        </div>
      </div>
    </div>
  `
}

// Tech 模板渲染 - 终端风格布局
function renderTechTemplate(content: any, style: any): string {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return `
    <div style="font-family: ${style.fontFamily}; font-size: ${style.fontSize}; line-height: ${style.lineHeight}; background-color: #1a1a2e; color: #00ff00; width: 100%; min-height: 100%; padding: 1.5rem;">
      <header style="margin-bottom: 1.5rem;">
        <div style="color: #00ff00; margin-bottom: 0.5rem;">$ whoami</div>
        <h1 style="font-size: 1.875rem; font-weight: bold; color: white; margin-bottom: 0.25rem;">${personalInfo.name}</h1>
        <p style="font-size: 1.125rem; color: #00ff88;">${personalInfo.title}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: #666; margin-top: 0.75rem;">
          ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
        </div>
      </header>

      ${personalInfo.summary ? `<section style="margin-bottom: 1.5rem;"><div style="color: #00ff00; margin-bottom: 0.5rem;">$ cat summary.txt</div><p style="font-size: 0.875rem; color: #ccc;">${personalInfo.summary}</p></section>` : ''}

      ${skills.length > 0 ? `<section style="margin-bottom: 1.5rem;"><div style="color: #00ff00; margin-bottom: 0.5rem;">$ cat skills.txt</div><div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${skills.map((skill: any) => `<span style="padding: 0.25rem 0.75rem; font-size: 0.875rem; background-color: #00ff0020; border: 1px solid #00ff0040; border-radius: 0.25rem;">${skill.name}</span>`).join('')}</div></section>` : ''}

      ${workExperience.length > 0 ? `<section style="margin-bottom: 1.5rem;"><div style="color: #00ff00; margin-bottom: 0.5rem;">$ cat experience.txt</div>${workExperience.map((exp: any) => `
        <div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid #00ff0040;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;"><div><h3 style="font-weight: bold; color: white;">${exp.position}</h3><p style="font-size: 0.875rem; color: #00ff88;">${exp.company}</p></div><span style="font-size: 0.875rem; color: #666;">${exp.startDate} - ${exp.current ? "至今" : exp.endDate}</span></div>
          ${exp.description ? `<p style="font-size: 0.875rem; color: #ccc; margin-bottom: 0.25rem;">${exp.description}</p>` : ''}
          ${exp.achievements.length > 0 ? `<ul style="list-style-type: none; padding-left: 1rem; font-size: 0.875rem;">${exp.achievements.map((a: string) => `<li style="color: #ccc;">→ ${a}</li>`).join('')}</ul>` : ''}
        </div>
      `).join('')}</section>` : ''}

      ${education.length > 0 ? `<section style="margin-bottom: 1.5rem;"><div style="color: #00ff00; margin-bottom: 0.5rem;">$ cat education.txt</div>${education.map((edu: any) => `
        <div style="margin-bottom: 0.75rem;">
          <h3 style="font-weight: bold; color: white;">${edu.school}</h3>
          <p style="font-size: 0.875rem; color: #ccc;">${edu.degree} · ${edu.field}</p>
          <p style="font-size: 0.875rem; color: #666;">${edu.startDate} - ${edu.endDate}</p>
        </div>
      `).join('')}</section>` : ''}

      ${projects.length > 0 ? `<section><div style="color: #00ff00; margin-bottom: 0.5rem;">$ cat projects.txt</div>${projects.map((project: any) => `
        <div style="margin-bottom: 1rem; padding: 1rem; background-color: #ffffff08; border: 1px solid #ffffff15; border-radius: 0.5rem;">
          <h3 style="font-weight: bold; color: white;">${project.name}</h3>
          <p style="font-size: 0.875rem; color: #ccc; margin-bottom: 0.5rem;">${project.description}</p>
          ${project.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">${project.technologies.map((tech: string) => `<span style="padding: 0.125rem 0.375rem; font-size: 0.75rem; background-color: #00ff0015; border: 1px solid #00ff0030; border-radius: 0.25rem;">${tech}</span>`).join('')}</div>` : ''}
        </div>
      `).join('')}</section>` : ''}
    </div>
  `
}

// 模板 HTML 渲染函数
function renderTemplate(content: any, templateId: string): string {
  const template = defaultTemplates.find(t => t.id === templateId) || defaultTemplates[0]
  const style = template.style

  switch (templateId) {
    case "modern":
      return renderModernTemplate(content, style)
    case "creative":
      return renderCreativeTemplate(content, style)
    case "minimal":
      return renderMinimalTemplate(content, style)
    case "professional":
      return renderProfessionalTemplate(content, style)
    case "tech":
      return renderTechTemplate(content, style)
    case "classic":
    default:
      return renderClassicTemplate(content, style)
  }
}

// 后台处理导出任务
async function processExportTask(taskId: string) {
  try {
    await prisma.exportTask.update({
      where: { id: taskId },
      data: { status: "processing" }
    })

    const task = await prisma.exportTask.findUnique({
      where: { id: taskId },
      include: { resume: true }
    })

    if (!task) {
      throw new Error("任务不存在")
    }

    const content = JSON.parse(task.resume.content)
    const templateId = task.resume.templateId
    const html = renderTemplate(content, templateId)

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @page { size: A4; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; margin: 0; padding: 0; }
          body { width: 210mm; min-height: 297mm; background: white; }
          h1, h2, h3 { page-break-after: avoid; }
          section, div { page-break-inside: avoid; }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `

    const browser = await puppeteer.launch({
      executablePath: "/snap/bin/chromium",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    })

    const page = await browser.newPage()
    await page.setContent(fullHtml, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    })

    await browser.close()

    const fs = require("fs")
    const path = require("path")
    const exportDir = path.join(process.cwd(), "public", "exports")
    
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true })
    }
    
    const filename = task.filename
    const filePath = path.join(exportDir, filename)
    fs.writeFileSync(filePath, pdfBuffer)

    await prisma.exportTask.update({
      where: { id: taskId },
      data: { 
        status: "completed",
        fileUrl: `/exports/${filename}`,
        completedAt: new Date()
      }
    })

  } catch (error) {
    console.error("Export task error:", error)
    await prisma.exportTask.update({
      where: { id: taskId },
      data: { 
        status: "failed",
        error: error instanceof Error ? error.message : "导出失败"
      }
    })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "请先登录" }, { status: 401 })
    }

    const { content, templateId, filename, resumeId } = await request.json()

    if (!content || !templateId) {
      return NextResponse.json({ error: "缺少内容或模板ID" }, { status: 400 })
    }

    let actualResumeId = resumeId
    if (!actualResumeId) {
      const resume = await prisma.resume.create({
        data: {
          title: filename || "未命名简历",
          userId: session.user.id,
          templateId: templateId,
          content: JSON.stringify(content)
        }
      })
      actualResumeId = resume.id
    }

    const exportTask = await prisma.exportTask.create({
      data: {
        userId: session.user.id,
        resumeId: actualResumeId,
        filename: filename || `resume_${Date.now()}.pdf`,
        status: "pending"
      }
    })

    processExportTask(exportTask.id).catch(console.error)

    return NextResponse.json({
      taskId: exportTask.id,
      message: "导出任务已创建，请在导出记录中查看"
    })

  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "创建导出任务失败" }, { status: 500 })
  }
}
