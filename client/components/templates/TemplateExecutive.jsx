import React from 'react';

export default function TemplateExecutive({ personalInfo, education, experience, skills, projects, certifications }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '11in', padding: '0.75in' }}>
      {/* Header with Executive Styling */}
      <header className="relative mb-8">
        <div className="border-b-4 border-gray-900 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-wide">
            {personalInfo?.fullName || 'EXECUTIVE NAME'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              {personalInfo?.email && (
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium w-16">Email:</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium w-16">Phone:</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              {personalInfo?.address && (
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium w-16">Address:</span>
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo?.linkedin && (
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium w-16">LinkedIn:</span>
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
          EXECUTIVE SUMMARY
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 leading-relaxed text-justify">
            Senior executive with 15+ years of progressive leadership experience driving organizational growth, 
            operational excellence, and strategic initiatives. Proven track record of delivering measurable results 
            through data-driven decision making, team development, and stakeholder engagement across multiple industries.
          </p>
        </div>
      </section>

      {/* Core Competencies */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <div className="font-medium text-gray-900 text-sm">{skill.name}</div>
                <div className="text-xs text-gray-600 mt-1">{skill.level}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                  <h4 className="text-md font-semibold text-gray-700">{exp.company}</h4>
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <div>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                </div>
              </div>
              
              {exp.description && (
                <div className="ml-4 border-l-2 border-gray-200 pl-4">
                  {exp.description.split('\n').map((line, lineIndex) => (
                    line.trim() && (
                      <div key={lineIndex} className="flex items-start mb-2">
                        <span className="text-gray-400 mr-2 mt-1">▪</span>
                        <span className="text-gray-700 text-sm leading-relaxed">{line.trim()}</span>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Key Achievements */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
          KEY ACHIEVEMENTS
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-900 mb-1">$50M+</div>
            <div className="text-sm text-blue-700">Revenue Growth Delivered</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-900 mb-1">200+</div>
            <div className="text-sm text-green-700">Team Members Led</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-900 mb-1">15+</div>
            <div className="text-sm text-purple-700">Strategic Initiatives</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-900 mb-1">95%</div>
            <div className="text-sm text-orange-700">Client Retention Rate</div>
          </div>
        </div>
      </section>

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            EDUCATION & CREDENTIALS
          </h2>
          
          {education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <h4 className="text-gray-700">{edu.institution}</h4>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Professional Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            PROFESSIONAL CERTIFICATIONS
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-400 mr-2">●</span>
                <span className="text-gray-700 text-sm">{cert.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Board Positions / Advisory Roles */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
          BOARD POSITIONS & ADVISORY ROLES
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-700 text-sm">Board Member, Tech Innovation Council</span>
            <span className="text-gray-600 text-sm">2022 - Present</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 text-sm">Strategic Advisor, Growth Ventures LLC</span>
            <span className="text-gray-600 text-sm">2021 - Present</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          References and detailed portfolio available upon request
        </div>
      </footer>
    </div>
  );
}
