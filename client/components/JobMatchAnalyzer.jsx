import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { 
  Target, TrendingUp, AlertTriangle, CheckCircle, 
  Zap, Brain, BookOpen, Award, ArrowRight,
  BarChart3, PieChart, Lightbulb, ExternalLink
} from "lucide-react";

export default function JobMatchAnalyzer({ resumeId, resumeData }) {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skillGaps, setSkillGaps] = useState([]);
  const [matchScore, setMatchScore] = useState(0);

  const analyzeJobMatch = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result
      const mockResult = {
        overall_match_score: 78,
        category_scores: {
          skills_match: 85,
          experience_match: 72,
          education_match: 90,
          cultural_fit: 65
        },
        matched_requirements: [
          "JavaScript/React experience",
          "Frontend development",
          "Team collaboration",
          "Problem-solving skills",
          "Bachelor's degree"
        ],
        missing_requirements: [
          "5+ years experience (you have 3)",
          "Node.js backend experience",
          "Docker containerization",
          "AWS cloud services",
          "Team leadership experience"
        ],
        skill_gaps: [
          {
            skill: "Node.js",
            importance: "high",
            current_level: "beginner",
            required_level: "intermediate",
            learning_resources: [
              "Node.js Complete Guide on Udemy",
              "Official Node.js Documentation",
              "FreeCodeCamp Node.js Course"
            ]
          },
          {
            skill: "Docker",
            importance: "medium",
            current_level: "none",
            required_level: "basic",
            learning_resources: [
              "Docker for Beginners",
              "Docker Official Tutorial",
              "Containerization Bootcamp"
            ]
          },
          {
            skill: "AWS",
            importance: "high",
            current_level: "none",
            required_level: "intermediate",
            learning_resources: [
              "AWS Cloud Practitioner",
              "AWS Solutions Architect",
              "Cloud Guru AWS Courses"
            ]
          }
        ],
        recommendations: [
          "Highlight your React and JavaScript expertise more prominently",
          "Add a section about your problem-solving approach with specific examples",
          "Consider taking AWS certification to meet cloud requirements",
          "Emphasize any leadership experiences, even informal ones",
          "Add personal projects using Node.js to demonstrate backend capability"
        ],
        strengths_for_role: [
          "Strong frontend development skills",
          "Relevant educational background",
          "Modern JavaScript framework experience",
          "Good cultural fit based on company values",
          "Demonstrated learning ability"
        ]
      };

      setAnalysisResult(mockResult);
      setMatchScore(mockResult.overall_match_score);
      setSkillGaps(mockResult.skill_gaps);
      
    } catch (error) {
      console.error("Job match analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getMatchGrade = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <CardTitle>Job Match Analyzer</CardTitle>
              <CardDescription>
                Analyze how well your resume matches a specific job posting
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Senior Frontend Developer"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google Inc."
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here..."
              rows={8}
            />
          </div>
          
          <Button 
            onClick={analyzeJobMatch}
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Analyzing Match...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analyze Job Match
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <>
          {/* Overall Score */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{matchScore}%</div>
                    <div className="text-xs opacity-75">MATCH</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">
                  Grade: {getMatchGrade(matchScore)} - {
                    matchScore >= 80 ? "Excellent Match" :
                    matchScore >= 60 ? "Good Match" :
                    "Needs Improvement"
                  }
                </h3>
                
                <p className="text-gray-600">
                  Your resume is a {matchScore >= 80 ? "strong" : matchScore >= 60 ? "good" : "moderate"} fit 
                  for the {jobTitle} position at {company}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Match Breakdown
              </CardTitle>
              <CardDescription>Detailed scoring by category</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(analysisResult.category_scores).map(([category, score]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {category.replace('_', ' ')}
                      </span>
                      <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Matched vs Missing Requirements */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Matched Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Matched Requirements
                </CardTitle>
                <CardDescription>Skills and qualifications you already have</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {analysisResult.matched_requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-green-800">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Missing Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Missing Requirements
                </CardTitle>
                <CardDescription>Areas where you could improve your match</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {analysisResult.missing_requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-red-800">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Skill Gap Analysis
              </CardTitle>
              <CardDescription>Skills to develop and learning resources</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {skillGaps.map((gap, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-lg">{gap.skill}</h4>
                        <Badge className={getImportanceColor(gap.importance)}>
                          {gap.importance} priority
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {gap.current_level === "none" ? "Not on resume" : `Current: ${gap.current_level}`} 
                        <ArrowRight className="w-4 h-4 inline mx-2" />
                        Required: {gap.required_level}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-2">Learning Resources:</h5>
                      <div className="grid md:grid-cols-3 gap-2">
                        {gap.learning_resources.map((resource, resourceIndex) => (
                          <Button 
                            key={resourceIndex}
                            variant="outline" 
                            size="sm"
                            className="justify-start"
                          >
                            <ExternalLink className="w-3 h-3 mr-2" />
                            {resource}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Recommendations
              </CardTitle>
              <CardDescription>Actionable steps to improve your match score</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {analysisResult.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-blue-900">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <Award className="w-5 h-5 mr-2" />
                Your Strengths for This Role
              </CardTitle>
              <CardDescription>Leverage these advantages in your application</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {analysisResult.strengths_for_role.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-green-800">{strength}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Next Steps</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="h-auto flex-col space-y-2 p-4">
                  <BookOpen className="w-6 h-6" />
                  <span>Start Learning</span>
                  <span className="text-xs opacity-75">Begin skill development</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
                  <Target className="w-6 h-6" />
                  <span>Update Resume</span>
                  <span className="text-xs opacity-75">Apply recommendations</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
                  <PieChart className="w-6 h-6" />
                  <span>Track Progress</span>
                  <span className="text-xs opacity-75">Monitor improvements</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
