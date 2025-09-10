import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { 
  FileText, Sparkles, Download, Copy, RefreshCw, 
  Target, Building, User, Briefcase, Zap, Edit3,
  Clock, Save, Share2, Eye, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CoverLetterGenerator() {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    company: "",
    position: "",
    jobDescription: "",
    recruiterName: "",
    applicationDate: new Date().toISOString().split('T')[0]
  });
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const [coverLetterContent, setCoverLetterContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [tone, setTone] = useState("professional");
  const [savedLetters, setSavedLetters] = useState([]);

  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "Traditional, formal tone suitable for corporate roles",
      preview: "Dear Hiring Manager,\n\nI am writing to express my strong interest in the [Position] role at [Company]..."
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary style with personality while maintaining professionalism",
      preview: "Hello [Recruiter Name],\n\nI'm excited to apply for the [Position] opportunity at [Company]..."
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold and engaging for creative industries and startups",
      preview: "Hi there!\n\nWhen I saw the [Position] role at [Company], I knew I had to reach out..."
    },
    {
      id: "technical",
      name: "Technical",
      description: "Data-driven approach perfect for engineering and tech roles",
      preview: "Dear [Recruiter Name],\n\nAs a [Your Role] with [X] years of experience in [Technology]..."
    }
  ];

  const toneOptions = [
    { value: "professional", label: "Professional", description: "Formal and respectful" },
    { value: "enthusiastic", label: "Enthusiastic", description: "Energetic and passionate" },
    { value: "confident", label: "Confident", description: "Assertive and self-assured" },
    { value: "humble", label: "Humble", description: "Modest and team-oriented" }
  ];

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generatedContent = generateLocalCoverLetter();
      setCoverLetterContent(generatedContent);
      
    } catch (error) {
      console.error("Cover letter generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLocalCoverLetter = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    
    return `${personalInfo.fullName}
${personalInfo.email} | ${personalInfo.phone}
${personalInfo.address}

${jobDetails.applicationDate}

${jobDetails.recruiterName ? `${jobDetails.recruiterName}` : 'Hiring Manager'}
${jobDetails.company}

Dear ${jobDetails.recruiterName || 'Hiring Manager'},

I am writing to express my strong interest in the ${jobDetails.position} position at ${jobDetails.company}. With my background in [your field] and passion for [relevant area], I am excited about the opportunity to contribute to your team's success.

In my previous roles, I have developed expertise in:
• [Key skill 1 from job description]
• [Key skill 2 from job description]  
• [Key skill 3 from job description]

What particularly attracts me to ${jobDetails.company} is [specific company attribute from research]. I am impressed by [company achievement/value] and would love to contribute to [specific company goal].

I am confident that my experience in [relevant experience] and proven track record of [specific achievement] make me an ideal candidate for this role. I would welcome the opportunity to discuss how my skills align with your team's needs.

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
${personalInfo.fullName}`;
  };

  const saveCoverLetter = () => {
    const newLetter = {
      id: Date.now().toString(),
      company: jobDetails.company,
      position: jobDetails.position,
      content: coverLetterContent,
      template: selectedTemplate,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    setSavedLetters([newLetter, ...savedLetters]);
    alert("Cover letter saved successfully!");
  };

  const downloadCoverLetter = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetterContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${jobDetails.company}-${jobDetails.position}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetterContent);
    alert("Cover letter copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Cover Letter Generator</h1>
                <p className="text-sm text-gray-600">Create personalized cover letters in minutes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={saveCoverLetter} disabled={!coverLetterContent}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={downloadCoverLetter} disabled={!coverLetterContent}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={copyToClipboard} disabled={!coverLetterContent}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your contact details for the letter header</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                    placeholder="City, State, Country"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Job Details
                </CardTitle>
                <CardDescription>Information about the position you're applying for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={jobDetails.company}
                    onChange={(e) => setJobDetails({...jobDetails, company: e.target.value})}
                    placeholder="Google Inc."
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position Title</Label>
                  <Input
                    id="position"
                    value={jobDetails.position}
                    onChange={(e) => setJobDetails({...jobDetails, position: e.target.value})}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor="recruiterName">Recruiter Name (Optional)</Label>
                  <Input
                    id="recruiterName"
                    value={jobDetails.recruiterName}
                    onChange={(e) => setJobDetails({...jobDetails, recruiterName: e.target.value})}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    value={jobDetails.jobDescription}
                    onChange={(e) => setJobDetails({...jobDetails, jobDescription: e.target.value})}
                    placeholder="Paste the job description here for AI to tailor your cover letter..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>Select a style that matches the company culture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      {selectedTemplate === template.id && (
                        <Badge className="bg-purple-100 text-purple-800">Selected</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      {template.preview.substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tone Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Tone & Style</CardTitle>
                <CardDescription>Choose the tone that fits your personality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {toneOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-3 border rounded-lg cursor-pointer text-center ${
                        tone === option.value 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setTone(option.value)}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-600">{option.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={generateCoverLetter}
              disabled={isGenerating || !personalInfo.fullName || !jobDetails.company || !jobDetails.position}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Generated Cover Letter */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Edit3 className="w-5 h-5 mr-2" />
                      Your Cover Letter
                    </CardTitle>
                    <CardDescription>
                      Review and customize your AI-generated cover letter
                    </CardDescription>
                  </div>
                  
                  {coverLetterContent && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Generated
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                {coverLetterContent ? (
                  <div className="space-y-4">
                    <Textarea
                      value={coverLetterContent}
                      onChange={(e) => setCoverLetterContent(e.target.value)}
                      rows={20}
                      className="font-mono text-sm"
                      placeholder="Your cover letter will appear here..."
                    />
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Words: {coverLetterContent.split(/\s+/).length}</span>
                        <span>Characters: {coverLetterContent.length}</span>
                        <span>Template: {templates.find(t => t.id === selectedTemplate)?.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={generateCoverLetter}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                        <Button size="sm" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Generate</h3>
                    <p className="text-gray-600 mb-6">
                      Fill in your details and job information to create a personalized cover letter
                    </p>
                    <div className="text-sm text-gray-500">
                      ✓ Enter personal information<br />
                      ✓ Add job details<br />
                      ✓ Choose template and tone<br />
                      ✓ Click generate
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Previously Saved Letters */}
            {savedLetters.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Previously Saved Letters</CardTitle>
                  <CardDescription>Quick access to your cover letter history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savedLetters.slice(0, 3).map((letter) => (
                      <div key={letter.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{letter.position} at {letter.company}</h4>
                          <p className="text-sm text-gray-600">
                            Created: {new Date(letter.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">Load</Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
