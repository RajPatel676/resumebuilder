export default function TemplateLatexClassic({ personalInfo, education, experience, skills, summary, certifications, projects }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] p-12 text-sm font-serif">
      {/* Header - Center aligned like LaTeX */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {personalInfo.fullName || "John Doe"}
        </h1>
        <div className="text-sm text-gray-700 space-x-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
            Summary
          </h2>
          <p className="text-gray-800 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="font-bold text-gray-900">
                {edu.degree} {edu.field && `in ${edu.field}`}, {edu.institution}
              </div>
              <div className="text-gray-700 text-sm">
                {formatDate(edu.startDate)} -- {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="font-bold text-gray-900">
                {exp.position}, {exp.company}
              </div>
              <div className="text-gray-700 text-sm mb-2">
                {formatDate(exp.startDate)} -- {exp.current ? 'Present' : formatDate(exp.endDate)}
              </div>
              {exp.description && (
                <ul className="list-none ml-0 space-y-1">
                  {exp.description.split('\n').filter(item => item.trim()).map((item, idx) => (
                    <li key={idx} className="text-gray-800 flex">
                      <span className="mr-3">--</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <p className="text-gray-800">
            {skills.join(', ')}
          </p>
        </div>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="font-bold text-gray-900">{project.name}</div>
              {project.description && (
                <div className="text-gray-800 mb-1">{project.description}</div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert, index) => (
              <div key={index} className="text-gray-800">
                <span className="font-medium">{cert.name}</span>
                {cert.issuer && <span> - {cert.issuer}</span>}
                {cert.date && <span> ({formatDate(cert.date)})</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
