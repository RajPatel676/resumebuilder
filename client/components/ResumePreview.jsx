export default function ResumePreview({ personalInfo, education, experience, skills }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] p-8 text-sm">
      {/* Header */}
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center">
              📧 {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              📞 {personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span className="flex items-center">
              📍 {personalInfo.address}
            </span>
          )}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-4 text-gray-600 mt-2">
            {personalInfo.linkedin && (
              <span className="flex items-center">
                🔗 {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center">
                🌐 {personalInfo.website}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Experience Section */}
      {experience.some(exp => exp.company || exp.position) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              (exp.company || exp.position) && (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {exp.position || "Position Title"}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-gray-600 text-right">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed">
                      {exp.description.split('\n').map((line, index) => (
                        <p key={index} className="mb-1">
                          {line.trim().startsWith('•') || line.trim().startsWith('-') ? line : `• ${line}`}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700">
                        {edu.institution || "Institution Name"}
                      </p>
                      {edu.gpa && (
                        <p className="text-gray-600">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills.some(skill => skill.name) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              skill.name && (
                <div key={skill.id} className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">{skill.name}</span>
                  <span className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded">
                    {skill.level}
                  </span>
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
          <h3 className="text-xl font-semibold mb-2">Your Resume Preview</h3>
          <p>Start filling out the form to see your resume come to life!</p>
        </div>
      )}
    </div>
  );
}
