export default function TemplateLatexModern({ personalInfo, education, experience, skills, summary, certifications, projects }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] p-8 text-sm">
      <div className="flex gap-8">
        {/* Left Sidebar - 33% width */}
        <div className="w-1/3 bg-slate-50 p-6 rounded-lg">
          {/* Name and Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-2">
              {personalInfo.fullName || "John Doe"}
            </h1>
<p className="text-gray-600 italic text-base">{personalInfo.jobTitle || 'Full Stack Developer'}</p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-base">Contact</h3>
            <div className="space-y-2 text-gray-700">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
              {personalInfo.website && <div>{personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="text-gray-700">
                    <span className="font-medium">{skill.name}</span>
                    {skill.level && <span className="text-sm text-gray-600 ml-2">({skill.level})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Projects</h3>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <div key={index} className="text-gray-700">
                    <div className="font-medium">{project.name}</div>
                    {project.description && <div className="text-sm mb-1">{project.description}</div>}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Tech:</span> {project.technologies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-gray-700">
                    <div className="font-medium">{cert.name}</div>
                    {cert.issuer && <div className="text-sm">{cert.issuer}</div>}
                    {cert.date && <div className="text-xs text-gray-600">{formatDate(cert.date)}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content - 67% width */}
        <div className="w-2/3">
          {/* Summary */}
          {summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3">Summary</h2>
              <p className="text-gray-800 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-4">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-5">
                  <div className="font-bold text-gray-900 text-base">
                    {exp.position}, {exp.company}
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    {formatDate(exp.startDate)} -- {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                  {exp.description && (
                    <div className="text-gray-800">
                      {exp.description.split('\n').filter(item => item.trim()).map((item, idx) => (
                        <div key={idx} className="flex mb-1">
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
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `, ${edu.field}`}
                  </div>
                  <div className="text-gray-700">
                    {edu.institution}, {formatDate(edu.endDate) || formatDate(edu.startDate)}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
