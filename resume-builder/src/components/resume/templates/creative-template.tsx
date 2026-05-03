"use client"

import { ResumeContent, TemplateStyle } from "@/types/resume"

interface CreativeTemplateProps {
  content: ResumeContent
  style: TemplateStyle
}

export function CreativeTemplate({ content, style }: CreativeTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return (
    <div
      className="bg-gradient-to-br from-pink-50 to-white w-full min-h-full p-6"
      style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        color: "#333",
      }}
    >
      {/* Header */}
      <header className="flex items-center gap-4 mb-6 pb-4 border-b-2" style={{ borderColor: `${style.primaryColor}40` }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(to bottom right, ${style.primaryColor}, ${style.secondaryColor})` }}
        >
          <span className="text-white text-2xl font-bold">{personalInfo.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
          <p className="text-lg" style={{ color: style.primaryColor }}>{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
            {personalInfo.email && <span>📧 {personalInfo.email}</span>}
            {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2" style={{ color: style.primaryColor }}>个人简介</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>工作经历</h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-sm" style={{ color: style.secondaryColor }}>{exp.company} · {exp.startDate} - {exp.current ? "至今" : exp.endDate}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1">
                    {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
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
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>专业技能</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  background: `linear-gradient(to right, ${style.primaryColor}20, ${style.secondaryColor}20)`,
                  color: style.primaryColor,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: style.primaryColor }}>项目经验</h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold mb-1">{project.name}</h3>
                <p className="text-sm mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: `${style.primaryColor}15`, color: style.primaryColor }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
