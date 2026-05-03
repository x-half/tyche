"use client"

import { ResumeContent, TemplateStyle } from "@/types/resume"

interface ClassicTemplateProps {
  content: ResumeContent
  style: TemplateStyle
}

export function ClassicTemplate({ content, style }: ClassicTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } =
    content

  return (
    <div
      className="bg-white p-8 w-full min-h-full"
      style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        color: "#333",
      }}
    >
      {/* Header */}
      <header className="text-center mb-6 pb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: style.primaryColor }}>
          {personalInfo.name}
        </h1>
        <p className="text-lg mb-3" style={{ color: style.secondaryColor }}>
          {personalInfo.title}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
            个人简介
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
            工作经历
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="text-sm" style={{ color: style.secondaryColor }}>
                    {exp.company}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? "至今" : exp.endDate}
                </span>
              </div>
              {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1">
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
          <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
            教育背景
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.school}</h3>
                  <p className="text-sm">
                    {edu.degree} · {edu.field}
                    {edu.gpa && <span className="ml-2">GPA: {edu.gpa}</span>}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm mt-1">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
            专业技能
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: `${style.primaryColor}15`,
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
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
            项目经验
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm mb-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs rounded"
                      style={{
                        backgroundColor: `${style.secondaryColor}20`,
                        color: style.secondaryColor,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.achievements && project.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm">
                  {project.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Languages & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
              语言能力
            </h2>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{lang.name}</span>
                  <span className="text-gray-500">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: style.primaryColor, borderColor: style.primaryColor }}>
              证书认证
            </h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-gray-500">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}