import React from 'react';

export default function TemplateElegant({ personalInfo, education, experience, skills, projects, certifications }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '11in' }}>
      {/* Header with Sidebar */}
      <div className="flex">
        
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8">
          
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {personalInfo?.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('') : 'JD'}
              </span>
            </div>
            <h1 className="text-xl font-light tracking-wide mb-2">
              {personalInfo?.fullName || 'John Doe'}
            </h1>
            <div className="w-12 h-px bg-white bg-opacity-50 mx-auto"></div>
          </div>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 text-gray-300">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {personalInfo?.email && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white bg-opacity-30 rounded mr-3"></div>
                  <span className="text-gray-200">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white bg-opacity-30 rounded mr-3"></div>
                  <span className="text-gray-200">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.address && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white bg-opacity-30 rounded mr-3"></div>
                  <span className="text-gray-200">{personalInfo.address}</span>
                </div>
              )}
              {personalInfo?.linkedin && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white bg-opacity-30 rounded mr-3"></div>
                  <span className="text-gray-200">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo?.website && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white bg-opacity-30 rounded mr-3"></div>
                  <span className="text-gray-200">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 text-gray-300">
                Expertise
              </h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-200">{skill.name}</span>
                      <span className="text-xs text-gray-400">{skill.level}</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
                      <div 
                        className="bg-white h-1 rounded-full" 
                        style={{ 
                          width: `${
                            skill.level === 'Expert' ? '95%' : 
                            skill.level === 'Advanced' ? '80%' : 
                            skill.level === 'Intermediate' ? '65%' : '45%'
                          }` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 text-gray-300">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-sm text-gray-200 leading-tight">
                    {cert.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 text-gray-300">
              Languages
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-200">English</span>
                <span className="text-xs text-gray-400">Native</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-200">Spanish</span>
                <span className="text-xs text-gray-400">Fluent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-200">French</span>
                <span className="text-xs text-gray-400">Basic</span>
              </div>
            </div>
          </section>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          
          {/* Professional Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-light text-slate-800 mb-4 relative">
              Professional Summary
              <div className="absolute bottom-0 left-0 w-12 h-px bg-slate-400"></div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              Experienced professional with a passion for innovation and excellence. Demonstrated ability 
              to lead teams, drive strategic initiatives, and deliver exceptional results in fast-paced 
              environments. Committed to continuous learning and professional development.
            </p>
          </section>

          {/* Professional Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-light text-slate-800 mb-6 relative">
                Professional Experience
                <div className="absolute bottom-0 left-0 w-12 h-px bg-slate-400"></div>
              </h2>
              
              {experience.map((exp, index) => (
                <div key={index} className="mb-8 last:mb-0 relative">
                  
                  {/* Timeline */}
                  <div className="absolute left-0 top-0 w-3 h-3 bg-slate-600 rounded-full"></div>
                  {index < experience.length - 1 && (
                    <div className="absolute left-1.5 top-3 w-px h-20 bg-slate-300"></div>
                  )}
                  
                  <div className="ml-8">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-medium text-slate-800">{exp.position}</h3>
                        <h4 className="text-md text-slate-600 italic">{exp.company}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                    </div>
                    
                    {exp.description && (
                      <div className="mt-3 text-gray-700">
                        {exp.description.split('\n').map((line, lineIndex) => (
                          line.trim() && (
                            <div key={lineIndex} className="flex items-start mb-2">
                              <span className="text-slate-400 mr-3 mt-1">●</span>
                              <span className="text-sm leading-relaxed">{line.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-light text-slate-800 mb-6 relative">
                Education
                <div className="absolute bottom-0 left-0 w-12 h-px bg-slate-400"></div>
              </h2>
              
              {education.map((edu, index) => (
                <div key={index} className="mb-6 last:mb-0 bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-slate-800">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <h4 className="text-md text-slate-600">{edu.institution}</h4>
                      {edu.gpa && (
                        <p className="text-sm text-slate-500 mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <span className="text-sm text-slate-500">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-light text-slate-800 mb-6 relative">
                Key Projects
                <div className="absolute bottom-0 left-0 w-12 h-px bg-slate-400"></div>
              </h2>
              
              <div className="grid gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-slate-400 pl-4 py-2">
                    <h3 className="text-lg font-medium text-slate-800 mb-2">{project.name}</h3>
                    
                    {project.description && (
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                    )}
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs"
                          >
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

          {/* Awards & Achievements */}
          <section>
            <h2 className="text-2xl font-light text-slate-800 mb-6 relative">
              Awards & Recognition
              <div className="absolute bottom-0 left-0 w-12 h-px bg-slate-400"></div>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <div className="w-8 h-8 bg-amber-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-amber-700 text-sm">🏆</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-amber-800">Employee of the Year</div>
                  <div className="text-xs text-amber-600">2023</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-blue-700 text-sm">⭐</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-800">Innovation Award</div>
                  <div className="text-xs text-blue-600">2022</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
