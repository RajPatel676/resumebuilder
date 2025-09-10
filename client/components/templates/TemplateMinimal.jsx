import React from 'react';

export default function TemplateMinimal({ personalInfo, education, experience, skills, projects, certifications }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm" style={{ minHeight: '11in', padding: '1in' }}>
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-wider">
          {personalInfo?.fullName || 'YOUR NAME'}
        </h1>
        
        <div className="text-sm text-gray-600 space-x-4">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>•</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.address && <span>•</span>}
          {personalInfo?.address && <span>{personalInfo.address}</span>}
        </div>
        
        {(personalInfo?.linkedin || personalInfo?.website) && (
          <div className="text-sm text-gray-600 mt-2 space-x-4">
            {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo?.website && personalInfo?.linkedin && <span>•</span>}
            {personalInfo?.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      <section className="mb-10">
        <div className="w-16 h-px bg-gray-400 mb-4"></div>
        <p className="text-gray-700 leading-relaxed text-justify">
          Dedicated professional with expertise in creating innovative solutions and driving results. 
          Passionate about continuous learning and contributing to team success through collaborative 
          problem-solving and strategic thinking.
        </p>
      </section>

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-light text-gray-900 mb-6 tracking-wider uppercase">
            Experience
          </h2>
          
          {experience.map((exp, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-500">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              
              <h4 className="text-sm text-gray-600 mb-3 italic">{exp.company}</h4>
              
              {exp.description && (
                <div className="text-sm text-gray-700 leading-relaxed">
                  {exp.description.split('\n').map((line, lineIndex) => (
                    line.trim() && (
                      <div key={lineIndex} className="mb-1">
                        {line.trim()}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-light text-gray-900 mb-6 tracking-wider uppercase">
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium text-gray-900">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <span className="text-sm text-gray-500">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              
              <h4 className="text-sm text-gray-600 italic">{edu.institution}</h4>
              
              {edu.gpa && (
                <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-light text-gray-900 mb-6 tracking-wider uppercase">
            Skills
          </h2>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{skill.name}</span>
                <span className="text-xs text-gray-500">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-light text-gray-900 mb-6 tracking-wider uppercase">
            Projects
          </h2>
          
          {projects.map((project, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-base font-medium text-gray-900 mb-2">{project.name}</h3>
              
              {project.description && (
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">{project.description}</p>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-xs text-gray-500">
                  Technologies: {project.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-6 tracking-wider uppercase">
            Certifications
          </h2>
          
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-sm text-gray-700">
                {cert.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
