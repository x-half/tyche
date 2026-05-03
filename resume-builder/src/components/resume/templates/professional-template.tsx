"use client"

import { ResumeContent, TemplateStyle } from "@/types/resume"

interface ProfessionalTemplateProps {
  content: ResumeContent
  style: TemplateStyle
}

export function ProfessionalTemplate({ content, style }: ProfessionalTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return (
    <div
      className="bg-white w-full min-h-full"
      style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        color: "#333",
      }}
    >
      {/* Header */}
      <header className="p-6 text-white" style={{ backgroundColor: style.primaryColor }}>
        <h1 className="text-2xl font-bold mb-1">{personalInfo.name}</h1>
        <p className="text-lg opacity-80">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-6 text-sm opacity-60 mt-3">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2" style={{ color: style.primaryColor }}>个人简介</h2>
            <p className="text-sm">{personalInfo.summary}</p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>工作经历</h2>
                {workExperience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <p className="text-sm" style={{ color: style.secondaryColor }}>{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">{exp.startDate} - {exp.current ? "至今" : exp.endDate}</span>
                    </div>
                    {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-sm">
                        {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>项目经验</h2>
                {projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-sm mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: `${style.primaryColor}15`, color: style.primaryColor }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>教育背景</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h3 className="font-bold">{edu.school}</h3>
                    <p className="text-sm">{edu.degree} · {edu.field}</p>
                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>专业技能</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="px-2 py-1 text-xs rounded" style={{ backgroundColor: `${style.primaryColor}15`, color: style.primaryColor }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>语言能力</h2>
                <div className="space-y-2">
                  {languages.map((lang, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>证书认证</h2>
                <div className="space-y-2">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-sm">
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-gray-500">{cert.issuer} · {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
