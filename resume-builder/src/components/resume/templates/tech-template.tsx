"use client"

import { ResumeContent, TemplateStyle } from "@/types/resume"

interface TechTemplateProps {
  content: ResumeContent
  style: TemplateStyle
}

export function TechTemplate({ content, style }: TechTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, languages, certifications } = content

  return (
    <div
      className="bg-gray-900 text-green-400 w-full min-h-full p-6 font-mono"
      style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
      }}
    >
      {/* Header */}
      <header className="mb-6">
        <div className="text-green-300 mb-2">$ whoami</div>
        <h1 className="text-2xl font-bold text-white mb-1">{personalInfo.name}</h1>
        <p className="text-lg text-green-500">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <div className="text-green-300 mb-2">$ cat summary.txt</div>
          <p className="text-sm text-gray-300">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <div className="text-green-300 mb-2">$ cat skills.txt</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 text-sm bg-green-900/30 border border-green-800 rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <div className="text-green-300 mb-2">$ cat experience.txt</div>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4 pl-4 border-l-2 border-green-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white">{exp.position}</h3>
                  <p className="text-sm text-green-500">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? "至今" : exp.endDate}</span>
              </div>
              {exp.description && <p className="text-sm text-gray-300 mt-1">{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul className="mt-2">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="text-sm text-gray-300">→ {a}</li>
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
          <div className="text-green-300 mb-2">$ cat education.txt</div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <h3 className="font-bold text-white">{edu.school}</h3>
              <p className="text-sm text-gray-300">{edu.degree} · {edu.field}</p>
              <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <div className="text-green-300 mb-2">$ cat projects.txt</div>
          {projects.map((project) => (
            <div key={project.id} className="mb-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="font-bold text-white">{project.name}</h3>
              <p className="text-sm text-gray-300 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs bg-green-900/20 border border-green-800/50 rounded">
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
  )
}
