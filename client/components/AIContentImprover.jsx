import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { 
  Sparkles, RefreshCw, CheckCircle, XCircle, 
  Lightbulb, Target, Zap, ArrowRight, Copy,
  Wand2, TrendingUp, Edit3, Download
} from "lucide-react";

export default function AIContentImprover({ 
  content, 
  sectionType = "experience", 
  onContentUpdate, 
  resumeId,
  jobTarget = "" 
}) {
  const [isImproving, setIsImproving] = useState(false);
  const [improvedContent, setImprovedContent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [grammarIssues, setGrammarIssues] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [improvementScore, setImprovementScore] = useState(0);
  const [tone, setTone] = useState("professional");

  const toneOptions = [
    { value: "professional", label: "Professional", description: "Formal and polished" },
    { value: "confident", label: "Confident", description: "Bold and assertive" },
    { value: "creative", label: "Creative", description: "Innovative and dynamic" },
    { value: "technical", label: "Technical", description: "Precise and detailed" }
  ];

  const handleImproveContent = async () => {
    setIsImproving(true);
    try {
      // Call AI rewrite API
      const response = await fetch('/api/ai/rewrite-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          section_type: sectionType,
          content: content,
          job_target: jobTarget,
          tone: tone
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setImprovedContent(data.data.rewritten_content);
        setSuggestions(data.data.improvements || []);
        setShowComparison(true);
        setImprovementScore(85); // Mock score - calculate based on improvements
      }
    } catch (error) {
      console.error('Content improvement failed:', error);
      // Fallback to local improvements
      generateLocalImprovements();
    } finally {
      setIsImproving(false);
    }
  };

  const handleGrammarCheck = async () => {
    try {
      const response = await fetch('/api/ai/advanced/grammar-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text: content })
      });

      const data = await response.json();
      
      if (data.success) {
        setGrammarIssues(data.data.issues || []);
      }
    } catch (error) {
      console.error('Grammar check failed:', error);
    }
  };

  const generateLocalImprovements = () => {
    // Local content improvement logic
    let improved = content;
    const localSuggestions = [];

    // Replace weak verbs with action verbs
    const weakVerbs = ['was', 'were', 'did', 'made', 'worked on'];
    const actionVerbs = ['achieved', 'developed', 'implemented', 'managed', 'led'];
    
    weakVerbs.forEach((weak, index) => {
      if (improved.toLowerCase().includes(weak)) {
        improved = improved.replace(new RegExp(weak, 'gi'), actionVerbs[index % actionVerbs.length]);
        localSuggestions.push(`Replaced "${weak}" with stronger action verb`);
      }
    });

    // Add quantification suggestions
    if (!/\d/.test(content)) {
      localSuggestions.push("Consider adding specific numbers, percentages, or metrics");
    }

    setImprovedContent(improved);
    setSuggestions(localSuggestions);
    setShowComparison(true);
    setImprovementScore(75);
  };

  const applyImprovement = () => {
    onContentUpdate(improvedContent);
    setShowComparison(false);
  };

  const getIssueIcon = (type) => {
    switch (type) {
      case 'grammar': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'spelling': return <XCircle className="w-4 h-4 text-orange-500" />;
      case 'style': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      default: return <XCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    if (content && content.length > 20) {
      handleGrammarCheck();
    }
  }, [content]);

  return (
    <div className="space-y-6">
      {/* AI Content Improver Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle>AI Content Improver</CardTitle>
                <CardDescription>
                  Enhance your {sectionType} section with AI-powered suggestions
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {toneOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <Button 
                onClick={handleImproveContent}
                disabled={isImproving || !content}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isImproving ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4 mr-2" />
                )}
                {isImproving ? 'Improving...' : 'Improve Content'}
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Quick Actions */}
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" onClick={handleGrammarCheck}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Grammar Check
            </Button>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Keyword Optimize
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Impact Score
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Quick Fix
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grammar Issues */}
      {grammarIssues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Edit3 className="w-5 h-5 mr-2 text-orange-500" />
              Grammar & Style Issues
            </CardTitle>
            <CardDescription>
              Found {grammarIssues.length} issue(s) that can be improved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {grammarIssues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  {getIssueIcon(issue.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {issue.type}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">
                        "{issue.text}"
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{issue.explanation}</p>
                    <Button size="sm" variant="outline" className="text-xs">
                      Apply: "{issue.suggestion}"
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Comparison */}
      {showComparison && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-green-500" />
                  Improved Content
                </CardTitle>
                <CardDescription>
                  AI-enhanced version with {improvementScore}% improvement score
                </CardDescription>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">
                  +{improvementScore}% Better
                </Badge>
                <Button size="sm" onClick={applyImprovement}>
                  Apply Changes
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original Content */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  Original
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{content}</p>
                </div>
              </div>

              {/* Improved Content */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  AI-Improved
                </h4>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{improvedContent}</p>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <Button size="sm" variant="outline" className="mr-2">
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Improvements Made:</h4>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tone Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Tone & Style Guide</CardTitle>
          <CardDescription>
            Current tone: {toneOptions.find(t => t.value === tone)?.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toneOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  tone === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setTone(option.value)}
              >
                <h5 className="font-medium text-gray-900 mb-1">{option.label}</h5>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
