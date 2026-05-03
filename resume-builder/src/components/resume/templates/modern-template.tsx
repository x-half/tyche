"use client"

import { ResumeContent, TemplateStyle } from "@/types/resume"

interface ModernTemplateProps {
  content: ResumeContent
  style: TemplateStyle
}

export function ModernTemplate({ content, style }: ModernTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } =
    content

  return (
    <div
      className="bg-white w-full min-h-full flex"
      style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
      }}
    >
      {/* Left Sidebar */}
      <aside className="w-1/3 p-6" style={{ backgroundColor: style.primaryColor }}>
        <div className="text-white">
          {/* Avatar placeholder */}
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold">{personalInfo.name.charAt(0)}</span>
          </div>

          <h1 className="text-2xl font-bold text-center mb-1">{personalInfo.name}</h1>
          <p className="text-center text-white/80 mb-6">{personalInfo.title}</p>

          {/* Contact */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-white/60">
              联系方式
            </h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-white/60">
                专业技能
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-white/60">{skill.level * 20}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${skill.level * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-white/60">
                语言能力
              </h2>
              <div className="space-y-2 text-sm">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-white/60">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-white/60">
                证书认证
              </h2>
              <div className="space-y-2 text-sm">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-white/60">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
              个人简介
            </h2>
            <p className="text-sm text-gray-600">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
              工作经历
            </h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold" style={{ color: style.primaryColor }}>
                      {exp.position}
                    </h3>
                    <p className="text-sm font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${style.primaryColor}15`, color: style.primaryColor }}>
                    {exp.startDate} - {exp.current ? "至今" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="text-sm mb-2 text-gray-600">{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
              教育背景
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold" style={{ color: style.primaryColor }}>
                      {edu.school}
                    </h3>
                    <p className="text-sm">
                      {edu.degree} · {edu.field}
                    </p>
                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${style.primaryColor}15`, color: style.primaryColor }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 text-gray-600">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
              项目经验
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h3 className="font-bold" style={{ color: style.primaryColor }}>
                  {project.name}
                </h3>
                <p className="text-sm mb-2 text-gray-600">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 text-xs rounded"
                        style={{
                          backgroundColor: `${style.primaryColor}15`,
                          color: style.primaryColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.achievements && project.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {project.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}