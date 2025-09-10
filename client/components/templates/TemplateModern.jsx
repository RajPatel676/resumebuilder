export default function TemplateModern({ personalInfo, education, experience, skills }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-[800px] overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-4 text-blue-100">
              {personalInfo.email && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.address && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  {personalInfo.address}
                </span>
              )}
            </div>
            {(personalInfo.linkedin || personalInfo.website) && (
              <div className="flex flex-wrap gap-4 text-blue-100 mt-2">
                {personalInfo.linkedin && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                    </svg>
                    {personalInfo.linkedin}
                  </span>
                )}
                {personalInfo.website && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"/>
                    </svg>
                    {personalInfo.website}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Experience Section */}
        {experience.some(exp => exp.company || exp.position) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-600">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                (exp.company || exp.position) && (
                  <div key={exp.id} className="relative pl-8 border-l-2 border-blue-200">
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-0"></div>
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {exp.position || "Position Title"}
                          </h3>
                          <p className="text-lg text-blue-600 font-medium">
                            {exp.company || "Company Name"}
                          </p>
                        </div>
                        <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <div className="text-gray-700 leading-relaxed">
                          {exp.description.split('\n').map((line, index) => (
                            <p key={index} className="mb-2">
                              {line.trim().startsWith('•') || line.trim().startsWith('-') 
                                ? <span><span className="text-blue-600 mr-2">•</span>{line.replace(/^[•\-]\s*/, '')}</span>
                                : <span><span className="text-blue-600 mr-2">•</span>{line}</span>
                              }
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.some(skill => skill.name) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-600">
              SKILLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                skill.name && (
                  <div key={skill.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-800 font-medium">{skill.name}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                      skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                      skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.some(edu => edu.institution || edu.degree) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-600">
              EDUCATION
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                (edu.institution || edu.degree) && (
                  <div key={edu.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                        </h3>
                        <p className="text-lg text-blue-600 font-medium">
                          {edu.institution || "Institution Name"}
                        </p>
                        {edu.gpa && (
                          <p className="text-gray-600 mt-1">
                            GPA: <span className="font-semibold">{edu.gpa}</span>
                          </p>
                        )}
                      </div>
                      <span className="text-gray-600 bg-white px-3 py-1 rounded-full text-sm">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!personalInfo.fullName && !experience.some(exp => exp.company) && !education.some(edu => edu.institution) && !skills.some(skill => skill.name) && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Modern Resume Template</h3>
            <p>Start filling out the form to see your resume come to life!</p>
          </div>
        )}
      </div>
    </div>
  );
}
