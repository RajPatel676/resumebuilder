import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { FileText, Upload as UploadIcon, ArrowLeft, CheckCircle, AlertCircle, Brain, Download, Zap, XCircle } from "lucide-react";

export default function Upload() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!user || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">Authentication Required</CardTitle>
            <CardDescription>
              Please log in to upload and analyze your resume
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Go to Login
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document (.pdf, .docx, .doc)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    startAnalysis(file);
  };

  const startAnalysis = async (file) => {
    setAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisResult(null);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', file);

      console.log('Starting resume analysis for:', file.name);

      // Send file to backend for analysis
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Analysis failed');
      }

      const result = await response.json();
      console.log('Analysis completed:', result);

      setAnalysisResult(result);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Analysis error:', error);

      let userFriendlyMessage = 'Failed to analyze resume. Please try again.';

      if (error.message.includes('API key')) {
        userFriendlyMessage = 'AI analysis service is temporarily unavailable. Please try again later.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        userFriendlyMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('file') || error.message.includes('content')) {
        userFriendlyMessage = error.message;
      }

      setError(userFriendlyMessage);
      setAnalysisResult(null);
      setAnalysisComplete(false);
    } finally {
      setAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">AI Resume Analyzer</h1>
          </div>
          <Link to="/builder">
            <Button>
              Build New Resume
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Analysis
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upload & Analyze Your Resume
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant AI feedback on your resume with detailed scoring, ATS compatibility check, 
              and personalized recommendations to improve your chances of landing interviews.
            </p>
          </div>

          {!uploadedFile && (
            <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
              <CardContent className="p-12">
                <div
                  className={`relative ${dragActive ? 'bg-primary/5 border-primary' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <UploadIcon className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Drop your resume here
                    </h3>
                    <p className="text-gray-600 mb-6">
                      or click to browse files
                    </p>
                    <div className="space-y-4">
                      <Button size="lg" className="relative">
                        <UploadIcon className="w-5 h-5 mr-2" />
                        Choose File
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileInput}
                        />
                      </Button>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">PDF</Badge>
                        <Badge variant="outline">DOC</Badge>
                        <Badge variant="outline">DOCX</Badge>
                        <span>•</span>
                        <span>Max 10MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {uploadedFile && (
            <div className="space-y-8">
              {/* File Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Uploaded File
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                      <p className="text-gray-600 text-sm">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!analyzing && !analysisComplete && (
                        <Button variant="outline" onClick={resetUpload}>
                          Remove
                        </Button>
                      )}
                      {analysisComplete && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Analyzed
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Status */}
              {analyzing && (
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        AI Analysis in Progress
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Our AI is analyzing your resume for structure, content, and ATS compatibility...
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Error Display */}
              {error && !analyzing && (
                <Card className="border-l-4 border-l-destructive">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">Analysis Failed</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <div className="flex space-x-3">
                          <Button onClick={() => startAnalysis(uploadedFile)} size="sm">
                            Try Again
                          </Button>
                          <Button variant="outline" onClick={resetUpload} size="sm">
                            Upload Different File
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Analysis Results */}
              {analysisComplete && analysisResult && (
                <div className="space-y-6">
                  {/* Score Card */}
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Resume Score</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-primary">{analysisResult.score}</span>
                          <span className="text-gray-500">/100</span>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        Overall assessment of your resume quality and effectiveness
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            analysisResult.score >= 80 ? 'bg-green-500' : 
                            analysisResult.score >= 60 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`} 
                          style={{ width: `${analysisResult.score}%` }}
                        ></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">ATS Compatibility:</span>
                          <span className="ml-2 text-green-600">{analysisResult.feedback.atsCompatibility}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Grammar Check:</span>
                          <span className="ml-2 text-yellow-600">{analysisResult.feedback.grammar}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Feedback */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                          Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResult.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{rec}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Strengths */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResult.strengths.map((strength, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{strength}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Missing Keywords */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Missing Keywords</CardTitle>
                      <CardDescription>
                        Consider adding these keywords to improve ATS compatibility
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-blue-600 border-blue-600">
                            + {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Link to="/builder" className="flex-1">
                      <Button size="lg" className="w-full">
                        <FileText className="w-5 h-5 mr-2" />
                        Build Improved Resume
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="flex-1">
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </Button>
                    <Button size="lg" variant="outline" onClick={resetUpload}>
                      <UploadIcon className="w-5 h-5 mr-2" />
                      Analyze Another
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Advanced AI analyzes your resume for content quality, structure, and industry relevance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">ATS Compatibility</h3>
                <p className="text-gray-600 text-sm">
                  Ensures your resume passes through Applicant Tracking Systems used by employers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Get immediate suggestions and recommendations to improve your resume effectiveness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
