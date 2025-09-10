export default function TemplateLatexSidebar({ personalInfo, education, experience, skills, summary, certifications, projects }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] flex text-sm">
      {/* Left Colored Sidebar - 35% width */}
      <div className="w-[35%] bg-blue-700 text-white p-8">
        {/* Name */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">
            {personalInfo.fullName || "John Doe"}
          </h1>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <div className="space-y-3">
            {personalInfo.email && (
              <div className="break-all">{personalInfo.email}</div>
            )}
            {personalInfo.phone && (
              <div>{personalInfo.phone}</div>
            )}
            {personalInfo.linkedin && (
              <div className="break-all">{personalInfo.linkedin}</div>
            )}
            {personalInfo.website && (
              <div className="break-all">{personalInfo.website}</div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Skills</h3>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="text-blue-100">
                  <span className="font-medium">{skill.name}</span>
                  {skill.level && <span className="text-sm text-blue-200 ml-2">({skill.level})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Certifications</h3>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="text-blue-100">
                  <div className="font-medium">{cert.name}</div>
                  {cert.issuer && <div className="text-xs text-blue-200">{cert.issuer}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area - 65% width */}
      <div className="w-[65%] p-8 pl-12">
        {/* Profile/Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Profile</h2>
            <p className="text-gray-800 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="font-bold text-gray-900 text-base">
                  {exp.position}, {exp.company}
                </div>
                <div className="text-gray-600 text-sm mb-3">
                  {formatDate(exp.startDate)} -- {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
                {exp.description && (
                  <div className="text-gray-800">
                    {exp.description.split('\n').filter(item => item.trim()).map((item, idx) => (
                      <div key={idx} className="flex mb-2">
                        <span className="mr-2">-</span>
                        <span>{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="font-bold text-gray-900">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </div>
                <div className="text-gray-700">
                  {edu.institution}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </div>
                <div className="text-gray-600 text-sm">
                  {formatDate(edu.startDate)} -- {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="font-bold text-gray-900">{project.name}</div>
                {project.description && (
                  <div className="text-gray-800 text-sm mb-2">{project.description}</div>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="text-gray-600 text-xs">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
