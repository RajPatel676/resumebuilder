export default function TemplateCreative({ personalInfo, education, experience, skills }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-[800px] overflow-hidden">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-800 text-white p-8">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {personalInfo.fullName || "Your Name"}
            </h1>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-purple-200">CONTACT</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 mr-3 mt-0.5 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 mr-3 mt-0.5 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 mr-3 mt-0.5 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                  </svg>
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 mr-3 mt-0.5 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"/>
                  </svg>
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.some(skill => skill.name) && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-purple-200">SKILLS</h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  skill.name && (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-purple-200">{skill.level}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{ 
                            width: skill.level === 'Expert' ? '100%' : 
                                   skill.level === 'Advanced' ? '80%' : 
                                   skill.level === 'Intermediate' ? '60%' : '40%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.some(edu => edu.institution || edu.degree) && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-purple-200">EDUCATION</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  (edu.institution || edu.degree) && (
                    <div key={edu.id}>
                      <h4 className="font-semibold text-sm">
                        {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                      </h4>
                      <p className="text-purple-200 text-sm">
                        {edu.institution || "Institution Name"}
                      </p>
                      <p className="text-xs text-purple-300">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-purple-300">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Experience Section */}
          {experience.some(exp => exp.company || exp.position) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  EXPERIENCE
                </span>
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  (exp.company || exp.position) && (
                    <div key={exp.id} className="relative">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {exp.position || "Position Title"}
                          </h3>
                          <p className="text-lg font-semibold text-purple-600">
                            {exp.company || "Company Name"}
                          </p>
                        </div>
                        <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <div className="text-gray-700 leading-relaxed">
                          {exp.description.split('\n').map((line, index) => (
                            <p key={index} className="mb-2 flex items-start">
                              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              <span>{line.replace(/^[•\-]\s*/, '')}</span>
                            </p>
                          ))}
                        </div>
                      )}
                      {experience.indexOf(exp) < experience.length - 1 && (
                        <div className="mt-6 border-b border-gray-200"></div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!personalInfo.fullName && !experience.some(exp => exp.company) && !education.some(edu => edu.institution) && !skills.some(skill => skill.name) && (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Creative Resume Template</h3>
              <p>Start filling out the form to see your resume come to life!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
