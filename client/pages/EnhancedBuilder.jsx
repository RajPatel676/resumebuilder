import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { 
  FileText, User, GraduationCap, Briefcase, Award, 
  Download, Eye, Share2, Save, History, Settings,
  Sparkles, Target, BarChart3, MessageSquare, Plus,
  ArrowLeft, RotateCcw, Wand2, Edit3, Code, Layout
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import all our new components
import AIContentImprover from "@/components/AIContentImprover.jsx";
import ResumeVersionHistory from "@/components/ResumeVersionHistory.jsx";
import JobMatchAnalyzer from "@/components/JobMatchAnalyzer.jsx";
import ResumeSharing from "@/components/ResumeSharing.jsx";
import SectionReorder from "@/components/SectionReorder.jsx";
import DynamicFormBuilder from "@/components/DynamicFormBuilder.jsx";

// Import templates
import TemplateModern from "@/components/templates/TemplateModern.jsx";
import TemplateClassic from "@/components/templates/TemplateClassic.jsx";
import TemplateCreative from "@/components/templates/TemplateCreative.jsx";
import TemplateExecutive from "@/components/templates/TemplateExecutive.jsx";
import TemplateMinimal from "@/components/templates/TemplateMinimal.jsx";
import TemplateTechnical from "@/components/templates/TemplateTechnical.jsx";
import TemplateElegant from "@/components/templates/TemplateElegant.jsx";

export default function EnhancedBuilder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [resumeScore, setResumeScore] = useState(0);
  
  // Resume data state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: ""
  });

  const [education, setEducation] = useState([
    {
      id: "1",
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: ""
    }
  ]);

  const [experience, setExperience] = useState([
    {
      id: "1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }
  ]);

  const [skills, setSkills] = useState([
    { id: "1", name: "", level: "Beginner" }
  ]);

  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [customSections, setCustomSections] = useState([]);

  const tabs = [
    { id: 'content', label: 'Content', icon: Edit3 },
    { id: 'ai-improve', label: 'AI Improve', icon: Sparkles },
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'sections', label: 'Sections', icon: Settings },
    { id: 'job-match', label: 'Job Match', icon: Target },
    { id: 'versions', label: 'Versions', icon: History },
    { id: 'share', label: 'Share', icon: Share2 },
    { id: 'builder', label: 'Form Builder', icon: Code }
  ];

  const templates = [
    { id: "modern", name: "Modern", description: "Clean and professional with gradients", component: TemplateModern },
    { id: "classic", name: "Classic", description: "Traditional and formal layout", component: TemplateClassic },
    { id: "creative", name: "Creative", description: "Eye-catching design with sidebar", component: TemplateCreative },
    { id: "executive", name: "Executive", description: "Senior leadership focused design", component: TemplateExecutive },
    { id: "minimal", name: "Minimal", description: "Clean typography-focused layout", component: TemplateMinimal },
    { id: "technical", name: "Technical", description: "Perfect for developers and engineers", component: TemplateTechnical },
    { id: "elegant", name: "Elegant", description: "Sophisticated design with sidebar", component: TemplateElegant }
  ];

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Award }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (hasUnsavedChanges) {
        saveResume();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSave);
  }, [hasUnsavedChanges]);

  // Calculate resume score
  useEffect(() => {
    const calculateScore = () => {
      let score = 0;
      
      // Personal info (25 points)
      if (personalInfo.fullName) score += 5;
      if (personalInfo.email) score += 5;
      if (personalInfo.phone) score += 5;
      if (personalInfo.address) score += 5;
      if (personalInfo.linkedin || personalInfo.website) score += 5;

      // Experience (35 points)
      const validExperience = experience.filter(exp => exp.company && exp.position);
      if (validExperience.length > 0) {
        score += 15;
        if (validExperience.length >= 2) score += 10;
        if (validExperience.some(exp => exp.description && exp.description.length > 50)) {
          score += 10;
        }
      }

      // Education (20 points)
      const validEducation = education.filter(edu => edu.institution && edu.degree);
      if (validEducation.length > 0) {
        score += 15;
        if (validEducation.some(edu => edu.field)) score += 5;
      }

      // Skills (20 points)
      const validSkills = skills.filter(skill => skill.name);
      if (validSkills.length > 0) {
        score += 10;
        if (validSkills.length >= 5) score += 5;
        if (validSkills.length >= 8) score += 5;
      }

      setResumeScore(Math.min(score, 100));
    };

    calculateScore();
  }, [personalInfo, education, experience, skills]);

  const saveResume = async () => {
    // Save resume logic here
    setHasUnsavedChanges(false);
    console.log("Resume saved");
  };

  const loadSampleData = () => {
    setPersonalInfo({
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.dev"
    });

    setEducation([
      {
        id: "1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2018-08",
        endDate: "2022-05",
        gpa: "3.8/4.0"
      }
    ]);

    setExperience([
      {
        id: "1",
        company: "Google Inc.",
        position: "Software Engineer",
        startDate: "2022-06",
        endDate: "",
        current: true,
        description: "Developed and maintained web applications using React and Node.js\nCollaborated with cross-functional teams to deliver high-quality software\nOptimized application performance and improved user experience"
      }
    ]);

    setSkills([
      { id: "1", name: "JavaScript", level: "Expert" },
      { id: "2", name: "React", level: "Advanced" },
      { id: "3", name: "Node.js", level: "Advanced" },
      { id: "4", name: "Python", level: "Intermediate" },
      { id: "5", name: "SQL", level: "Intermediate" }
    ]);

    setHasUnsavedChanges(true);
  };

  const getSelectedTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    return template ? template.component : TemplateModern;
  };

  const getResumeData = () => ({
    personal_info: personalInfo,
    education,
    experience,
    skills,
    projects,
    certifications
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const renderContentTab = () => (
    <div className="grid lg:grid-cols-3 gap-8">
      
      {/* Left Sidebar - Navigation */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resume Sections</CardTitle>
            <CardDescription>Complete each section to build your resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {section.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Resume Score */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Resume Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-3xl font-bold px-4 py-2 rounded-lg ${getScoreColor(resumeScore)}`}>
                {resumeScore}%
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {resumeScore >= 90 ? 'Excellent!' : resumeScore >= 70 ? 'Good progress!' : 'Needs work'}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${resumeScore}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className={showPreview ? "lg:col-span-1" : "lg:col-span-2"}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {sections.find(s => s.id === activeSection)?.label}
            </CardTitle>
            <CardDescription>
              Fill in your information to build a professional resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Render current section content here */}
            <div className="text-center py-12">
              <Edit3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Section Content</h3>
              <p className="text-gray-600">
                The original Builder.jsx form content would be rendered here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg overflow-hidden">
                <div className="transform scale-50 origin-top-left" style={{ width: '200%' }}>
                  {(() => {
                    const SelectedTemplate = getSelectedTemplate();
                    return (
                      <SelectedTemplate
                        personalInfo={personalInfo}
                        education={education}
                        experience={experience}
                        skills={skills}
                        projects={projects}
                        certifications={certifications}
                      />
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/enhanced-dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Enhanced Resume Builder</h1>
                <p className="text-sm text-gray-600">Professional resume creation with AI assistance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {hasUnsavedChanges && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Unsaved Changes
                </Badge>
              )}
              
              <Button variant="outline" onClick={loadSampleData}>
                <FileText className="w-4 h-4 mr-2" />
                Load Sample
              </Button>
              
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              
              <Button onClick={saveResume}>
                <Save className="w-4 h-4 mr-2" />
                Save Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-8">
        {activeTab === 'content' && renderContentTab()}
        
        {activeTab === 'ai-improve' && (
          <AIContentImprover
            content={experience[0]?.description || ""}
            sectionType="experience"
            onContentUpdate={(newContent) => {
              const updated = experience.map((exp, index) => 
                index === 0 ? {...exp, description: newContent} : exp
              );
              setExperience(updated);
              setHasUnsavedChanges(true);
            }}
            resumeId="current"
            jobTarget=""
          />
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Template</CardTitle>
                <CardDescription>Select a design that matches your professional style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedTemplate === template.id
                          ? 'border-primary border-2 shadow-lg bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-6">
                        <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Preview</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-gray-600 text-sm">{template.description}</p>
                        {selectedTemplate === template.id && (
                          <Badge className="mt-3 bg-primary text-primary-foreground">
                            Selected
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'sections' && (
          <SectionReorder
            sections={[]}
            onSectionsChange={(newSections) => {
              console.log('Sections updated:', newSections);
              setHasUnsavedChanges(true);
            }}
            onVisibilityChange={(sectionId, visible) => {
              console.log('Visibility changed:', sectionId, visible);
            }}
          />
        )}

        {activeTab === 'job-match' && (
          <JobMatchAnalyzer
            resumeId="current"
            resumeData={getResumeData()}
          />
        )}

        {activeTab === 'versions' && (
          <ResumeVersionHistory
            resumeId="current"
            onVersionRestore={(version) => {
              console.log('Restore version:', version);
            }}
          />
        )}

        {activeTab === 'share' && (
          <ResumeSharing
            resumeId="current"
            resumeTitle={personalInfo.fullName ? `${personalInfo.fullName}'s Resume` : 'My Resume'}
          />
        )}

        {activeTab === 'builder' && (
          <DynamicFormBuilder
            onFormSave={(formConfig) => {
              setCustomSections([...customSections, formConfig]);
              setHasUnsavedChanges(true);
            }}
            initialFields={[]}
          />
        )}
      </div>
    </div>
  );
}
