"use client"

import { ResumeContent, TemplateStyle } from "@/types/resume"

interface MinimalTemplateProps {
  content: ResumeContent
  style: TemplateStyle
}

export function MinimalTemplate({ content, style }: MinimalTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return (
    <div
      className="bg-white w-full min-h-full p-8"
      style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        color: "#333",
      }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-wider mb-2">{personalInfo.name}</h1>
        <p className="text-lg text-gray-400">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-6 text-sm text-gray-400 mt-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">简介</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">经历</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4 pl-4 border-l-2 border-gray-200">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{exp.position}</h3>
                <span className="text-sm text-gray-400">{exp.startDate} - {exp.current ? "至今" : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-500">{exp.company}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm mt-2">
                  {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">教育</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 pl-4 border-l-2 border-gray-200">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{edu.school}</h3>
                <span className="text-sm text-gray-400">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-500">{edu.degree} · {edu.field}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">技能</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 text-sm border border-gray-200 rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
