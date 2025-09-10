import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  Brain, 
  FileText,
  Zap,
  Award,
  Clock
} from "lucide-react";

export default function ResumeScoring({ personalInfo, education, experience, skills, onImprove }) {
  const [score, setScore] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateDetailedScore = async () => {
    setIsAnalyzing(true);

    try {
      // Prepare resume data for AI analysis
      const resumeData = {
        personal_info: personalInfo,
        education: education,
        experience: experience,
        skills: skills.map(skill => skill.name ? skill : { name: skill, level: 'Intermediate' })
      };

      // Call real Gemini API for resume analysis
      const response = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_data: resumeData,
          job_title: null
        })
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          // Use real AI analysis results
          const aiAnalysis = result.data;
          setScore(aiAnalysis.score || 75);

          const feedback = {
            categories: {
              ats: {
                score: aiAnalysis.ats_score || aiAnalysis.score,
                maxScore: 100,
                title: "ATS Compatibility",
                status: (aiAnalysis.ats_score || aiAnalysis.score) >= 80 ? "excellent" :
                       (aiAnalysis.ats_score || aiAnalysis.score) >= 60 ? "good" : "needs-improvement",
                feedback: aiAnalysis.feedback?.ats_compatibility || "ATS analysis completed"
              },
              content: {
                score: Math.round((aiAnalysis.score || 75) * 0.8),
                maxScore: 100,
                title: "Content Quality",
                status: (aiAnalysis.score || 75) >= 80 ? "excellent" :
                       (aiAnalysis.score || 75) >= 60 ? "good" : "needs-improvement",
                feedback: aiAnalysis.feedback?.impact || "Content analysis completed"
              }
            },
            recommendations: aiAnalysis.recommendations || [],
            strengths: aiAnalysis.strengths || [],
            missingKeywords: aiAnalysis.missing_keywords || [],
            atsWarnings: aiAnalysis.ats_warnings || [],
            atsScore: aiAnalysis.ats_score || aiAnalysis.score
          };

          setAnalysis(feedback);
          setIsAnalyzing(false);
          return;
        }
      }
    } catch (error) {
      console.error('AI analysis failed, using fallback:', error);
    }

    // Fallback to mock analysis if API fails
    setTimeout(() => {
      let totalScore = 0;
      const feedback = {
        categories: {},
        recommendations: [],
        strengths: [],
        missingKeywords: [],
        atsScore: 0
      };

      // Personal Information Analysis (20 points)
      let personalScore = 0;
      if (personalInfo.fullName) personalScore += 4;
      if (personalInfo.email) personalScore += 4;
      if (personalInfo.phone) personalScore += 3;
      if (personalInfo.address) personalScore += 3;
      if (personalInfo.linkedin || personalInfo.website) personalScore += 6;
      
      feedback.categories.personal = {
        score: personalScore,
        maxScore: 20,
        title: "Contact Information",
        status: personalScore >= 15 ? "excellent" : personalScore >= 10 ? "good" : "needs-improvement",
        feedback: personalScore >= 15 ? "Complete contact information provided" : 
                 personalScore >= 10 ? "Good contact details, consider adding LinkedIn/portfolio" :
                 "Missing essential contact information"
      };
      totalScore += personalScore;

      // Experience Analysis (35 points)
      let experienceScore = 0;
      const validExperience = experience.filter(exp => exp.company && exp.position);
      
      if (validExperience.length > 0) {
        experienceScore += 15;
        if (validExperience.length >= 2) experienceScore += 10;
        
        const hasDetailedDescriptions = validExperience.some(exp => 
          exp.description && exp.description.length > 50
        );
        if (hasDetailedDescriptions) experienceScore += 10;
        
        if (validExperience.some(exp => exp.current)) {
          feedback.strengths.push("Current employment shows career stability");
        }
      } else {
        feedback.recommendations.push("Add work experience to strengthen your profile");
      }

      feedback.categories.experience = {
        score: experienceScore,
        maxScore: 35,
        title: "Work Experience",
        status: experienceScore >= 28 ? "excellent" : experienceScore >= 20 ? "good" : "needs-improvement",
        feedback: experienceScore >= 28 ? "Strong work experience with detailed descriptions" :
                 experienceScore >= 20 ? "Good experience, add more specific achievements" :
                 "Needs more detailed work experience"
      };
      totalScore += experienceScore;

      // Education Analysis (20 points)
      let educationScore = 0;
      const validEducation = education.filter(edu => edu.institution && edu.degree);
      
      if (validEducation.length > 0) {
        educationScore += 15;
        if (validEducation.some(edu => edu.field)) educationScore += 3;
        if (validEducation.some(edu => edu.gpa)) educationScore += 2;
      } else {
        feedback.recommendations.push("Add educational background");
      }

      feedback.categories.education = {
        score: educationScore,
        maxScore: 20,
        title: "Education",
        status: educationScore >= 18 ? "excellent" : educationScore >= 12 ? "good" : "needs-improvement",
        feedback: educationScore >= 18 ? "Comprehensive educational background" :
                 educationScore >= 12 ? "Good education details, consider adding GPA if strong" :
                 "Add more educational details"
      };
      totalScore += educationScore;

      // Skills Analysis (25 points)
      let skillsScore = 0;
      const validSkills = skills.filter(skill => skill.name);
      
      if (validSkills.length > 0) {
        skillsScore += 10;
        if (validSkills.length >= 5) skillsScore += 8;
        if (validSkills.length >= 8) skillsScore += 4;
        
        const hasAdvancedSkills = validSkills.some(skill => 
          skill.level === "Advanced" || skill.level === "Expert"
        );
        if (hasAdvancedSkills) skillsScore += 3;
      } else {
        feedback.recommendations.push("Add relevant technical and soft skills");
      }

      feedback.categories.skills = {
        score: skillsScore,
        maxScore: 25,
        title: "Skills & Expertise",
        status: skillsScore >= 20 ? "excellent" : skillsScore >= 15 ? "good" : "needs-improvement",
        feedback: skillsScore >= 20 ? "Comprehensive skill set with advanced proficiencies" :
                 skillsScore >= 15 ? "Good skills, consider adding more industry-specific ones" :
                 "Expand your skills section"
      };
      totalScore += skillsScore;

      // ATS Compatibility Score
      feedback.atsScore = Math.min(95, totalScore + 10);

      // Missing Keywords Analysis
      const commonKeywords = ["leadership", "project management", "team collaboration", "problem solving", "communication"];
      const presentContent = [
        personalInfo.fullName || "",
        ...experience.map(exp => exp.description || ""),
        ...skills.map(skill => skill.name || "")
      ].join(" ").toLowerCase();

      feedback.missingKeywords = commonKeywords.filter(keyword => 
        !presentContent.includes(keyword.toLowerCase())
      );

      // Additional Recommendations
      if (totalScore < 60) {
        feedback.recommendations.unshift("Focus on completing all basic sections first");
      }
      if (validSkills.length < 5) {
        feedback.recommendations.push("Add more skills relevant to your target role");
      }
      if (!validExperience.some(exp => exp.description && exp.description.includes("•"))) {
        feedback.recommendations.push("Use bullet points to highlight key achievements");
      }

      // Strengths
      if (validExperience.length >= 2) {
        feedback.strengths.push("Strong work history progression");
      }
      if (validSkills.length >= 6) {
        feedback.strengths.push("Diverse skill set");
      }
      if (personalInfo.linkedin && personalInfo.website) {
        feedback.strengths.push("Complete professional online presence");
      }

      setScore(totalScore);
      setAnalysis(feedback);
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    calculateDetailedScore();
  }, [personalInfo, education, experience, skills]);

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score) => {
    if (score >= 85) return "from-green-500 to-emerald-600";
    if (score >= 70) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-600";
  };

  const getCategoryStatusIcon = (status) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "good":
        return <Target className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="animate-spin">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Analyzing Resume...</h3>
              <p className="text-gray-600">AI is evaluating your resume quality and providing recommendations</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-blue/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getScoreGradient(score)} flex items-center justify-center`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Resume Score</CardTitle>
                <CardDescription>AI-powered analysis of your resume quality</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-gray-500 text-sm">/100</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full bg-gradient-to-r ${getScoreGradient(score)} transition-all duration-1000`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>ATS Compatible: {analysis.atsScore}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Last updated: Just now</span>
              </div>
            </div>

            {score >= 85 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Excellent Resume!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Your resume is highly optimized and ready for applications.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Detailed Analysis</span>
          </CardTitle>
          <CardDescription>
            Breakdown of your resume score by category
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(analysis.categories).map(([key, category]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryStatusIcon(category.status)}
                  <span className="font-medium">{category.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {category.score}/{category.maxScore}
                  </span>
                  <Badge variant={category.status === "excellent" ? "default" : 
                                category.status === "good" ? "secondary" : "destructive"}>
                    {Math.round((category.score / category.maxScore) * 100)}%
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    category.status === "excellent" ? "bg-green-500" :
                    category.status === "good" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{category.feedback}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>AI Recommendations</span>
            </CardTitle>
            <CardDescription>
              Actionable suggestions to improve your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{rec}</p>
                  </div>
                  {onImprove && (
                    <Button size="sm" variant="outline" onClick={() => onImprove(rec)}>
                      Apply
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strengths */}
      {analysis.strengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Your Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p className="text-sm text-green-800">{strength}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Missing Keywords */}
      {analysis.missingKeywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Suggested Keywords</span>
            </CardTitle>
            <CardDescription>
              Consider adding these keywords to improve ATS compatibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  + {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
