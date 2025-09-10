export default function TemplateLatexMinimal({ personalInfo, education, experience, skills, summary, projects, certifications }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] p-12 text-sm font-sans">
      {/* Header - Clean and minimal */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {personalInfo.fullName || "John Doe"}
        </h1>
        <div className="text-gray-700 space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
        </div>
      </div>

      {/* Objective/Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 text-base">Objective</h2>
          <p className="text-gray-800 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 text-base">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="font-bold text-gray-900">
                {edu.degree} {edu.field && `in ${edu.field}`}, {edu.institution}
              </div>
              <div className="text-gray-700">
                {formatDate(edu.startDate)} -- {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 text-base">Technical Skills</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            <li>
              <span className="font-medium">Programming:</span> {skills.filter(skill =>
                ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'PHP', 'Ruby'].some(lang =>
                  skill.name && skill.name.toLowerCase().includes(lang.toLowerCase())
                )
              ).map(skill => skill.name).join(', ') || skills.slice(0, 3).map(skill => skill.name).join(', ')}
            </li>
            <li>
              <span className="font-medium">Frameworks:</span> {skills.filter(skill =>
                ['React', 'Flask', 'Node', 'Express', 'Angular', 'Vue', 'Django'].some(framework =>
                  skill.name && skill.name.toLowerCase().includes(framework.toLowerCase())
                )
              ).map(skill => skill.name).join(', ') || skills.slice(3, 6).map(skill => skill.name).join(', ')}
            </li>
            <li>
              <span className="font-medium">Databases:</span> {skills.filter(skill =>
                ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase'].some(db =>
                  skill.name && skill.name.toLowerCase().includes(db.toLowerCase())
                )
              ).map(skill => skill.name).join(', ') || skills.slice(6).map(skill => skill.name).join(', ')}
            </li>
          </ul>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 text-base">Projects</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            {projects.map((project, index) => (
              <li key={index}>
                <span className="font-medium">{project.name}</span> — {project.description}
                {project.technologies && (
                  <span className="text-gray-600"> ({project.technologies.join(', ')})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 text-base">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="font-bold text-gray-900">
                {exp.position}, {exp.company}
              </div>
              <div className="text-gray-700 text-sm mb-2">
                {formatDate(exp.startDate)} -- {exp.current ? 'Present' : formatDate(exp.endDate)}
              </div>
              {exp.description && (
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  {exp.description.split('\n').filter(item => item.trim()).map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 text-base">Certifications</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {certifications.map((cert, index) => (
              <li key={index}>
                <span className="font-medium">{cert.name}</span>
                {cert.issuer && <span> — {cert.issuer}</span>}
                {cert.date && <span className="text-gray-600"> ({formatDate(cert.date)})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
