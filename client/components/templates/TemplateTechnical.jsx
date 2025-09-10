import React from 'react';

export default function TemplateTechnical({ personalInfo, education, experience, skills, projects, certifications }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '11in', padding: '0.75in' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 mb-8 -mx-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {personalInfo?.fullName || 'SOFTWARE ENGINEER'}
            </h1>
            <p className="text-gray-300 text-lg">Full-Stack Developer | Tech Lead</p>
          </div>
          
          <div className="text-right space-y-1 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center justify-end">
                <span className="bg-gray-600 px-2 py-1 rounded text-xs mr-2">EMAIL</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center justify-end">
                <span className="bg-gray-600 px-2 py-1 rounded text-xs mr-2">PHONE</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center justify-end">
                <span className="bg-gray-600 px-2 py-1 rounded text-xs mr-2">LINKEDIN</span>
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center justify-end">
                <span className="bg-gray-600 px-2 py-1 rounded text-xs mr-2">PORTFOLIO</span>
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          
          {/* Technical Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-1">
                TECHNICAL SKILLS
              </h2>
              
              <div className="space-y-4">
                {/* Group skills by category */}
                {(() => {
                  const skillCategories = {
                    'Languages': ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'Go', 'Rust'],
                    'Frameworks': ['React', 'Angular', 'Vue', 'Express', 'Django', 'Spring', 'Flask'],
                    'Databases': ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'DynamoDB'],
                    'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins'],
                    'Tools': ['Git', 'Webpack', 'Jest', 'Cypress', 'Figma', 'Jira']
                  };
                  
                  return Object.entries(skillCategories).map(([category, categorySkills]) => {
                    const matchedSkills = skills.filter(skill => 
                      categorySkills.some(cat => 
                        skill.name.toLowerCase().includes(cat.toLowerCase()) ||
                        cat.toLowerCase().includes(skill.name.toLowerCase())
                      )
                    );
                    
                    if (matchedSkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
                        <div className="space-y-1">
                          {matchedSkills.map((skill, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">{skill.name}</span>
                              <div className="flex space-x-1">
                                {[1,2,3,4,5].map((level) => (
                                  <div 
                                    key={level}
                                    className={`w-2 h-2 rounded-full ${
                                      level <= (skill.level === 'Expert' ? 5 : skill.level === 'Advanced' ? 4 : skill.level === 'Intermediate' ? 3 : 2)
                                        ? 'bg-gray-900' 
                                        : 'bg-gray-300'
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }).filter(Boolean);
                })()}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-1">
                CERTIFICATIONS
              </h2>
              
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                    {cert.year && (
                      <div className="text-xs text-gray-600">{cert.year}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-1">
                EDUCATION
              </h2>
              
              {education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                  {edu.field && (
                    <p className="text-sm text-gray-700">{edu.field}</p>
                  )}
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          
          {/* Professional Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              
              {experience.map((exp, index) => (
                <div key={index} className="mb-8 last:mb-0 relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 top-2 w-3 h-3 bg-gray-900 rounded-full"></div>
                  {index < experience.length - 1 && (
                    <div className="absolute -left-5 top-5 w-0.5 h-full bg-gray-300"></div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                        <h4 className="text-md font-semibold text-gray-700">{exp.company}</h4>
                      </div>
                      <div className="text-right">
                        <span className="bg-gray-900 text-white px-3 py-1 rounded text-xs font-medium">
                          {exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}
                        </span>
                      </div>
                    </div>
                    
                    {exp.description && (
                      <div className="mt-3">
                        {exp.description.split('\n').map((line, lineIndex) => (
                          line.trim() && (
                            <div key={lineIndex} className="flex items-start mb-2">
                              <span className="text-gray-900 mr-3 mt-1">▶</span>
                              <span className="text-sm text-gray-700 leading-relaxed">{line.trim()}</span>
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-1">
                KEY PROJECTS
              </h2>
              
              <div className="grid gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-bold text-gray-900 mb-2">{project.name}</h3>
                    
                    {project.description && (
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                    )}
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium"
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

          {/* Technical Achievements */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-1">
              TECHNICAL ACHIEVEMENTS
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">99.9%</div>
                <div className="text-sm text-blue-700">System Uptime</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-900 mb-1">50%</div>
                <div className="text-sm text-green-700">Performance Improvement</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-900 mb-1">10+</div>
                <div className="text-sm text-purple-700">APIs Developed</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-900 mb-1">1M+</div>
                <div className="text-sm text-orange-700">Users Served</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
