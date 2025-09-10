import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
  History, GitBranch, Clock, Download, Eye,
  RotateCcw, GitCompare, Star, MoreVertical,
  TrendingUp, TrendingDown, Minus, Plus
} from "lucide-react";

export default function ResumeVersionHistory({ resumeId, onVersionRestore }) {
  const [versions, setVersions] = useState([]);
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock version data - replace with API call
  useEffect(() => {
    const mockVersions = [
      {
        id: "v1.0.0",
        title: "Current Version",
        description: "Latest updates with enhanced experience section",
        createdAt: "2024-01-15T10:30:00Z",
        score: 87,
        scoreChange: +5,
        changes: [
          "Added new work experience at Google",
          "Updated skills section with React expertise",
          "Enhanced project descriptions"
        ],
        isCurrent: true,
        tags: ["current", "complete"]
      },
      {
        id: "v0.9.0",
        title: "Skills Update",
        description: "Major skills section overhaul",
        createdAt: "2024-01-12T14:20:00Z",
        score: 82,
        scoreChange: +3,
        changes: [
          "Reorganized skills by category",
          "Added proficiency levels",
          "Removed outdated technologies"
        ],
        isCurrent: false,
        tags: ["skills", "update"]
      },
      {
        id: "v0.8.5",
        title: "Template Change",
        description: "Switched to modern template",
        createdAt: "2024-01-10T09:15:00Z",
        score: 79,
        scoreChange: +7,
        changes: [
          "Changed from classic to modern template",
          "Updated color scheme",
          "Improved visual hierarchy"
        ],
        isCurrent: false,
        tags: ["template", "design"]
      },
      {
        id: "v0.8.0",
        title: "Content Revision",
        description: "AI-enhanced content improvements",
        createdAt: "2024-01-08T16:45:00Z",
        score: 72,
        scoreChange: -2,
        changes: [
          "AI rewrite of experience descriptions",
          "Grammar and style improvements",
          "Added quantifiable achievements"
        ],
        isCurrent: false,
        tags: ["ai", "content"]
      },
      {
        id: "v0.7.0",
        title: "Initial Draft",
        description: "First complete version",
        createdAt: "2024-01-05T12:00:00Z",
        score: 74,
        scoreChange: 0,
        changes: [
          "Created initial resume structure",
          "Added all basic sections",
          "Completed first draft"
        ],
        isCurrent: false,
        tags: ["initial", "draft"]
      }
    ];

    setTimeout(() => {
      setVersions(mockVersions);
      setIsLoading(false);
    }, 1000);
  }, [resumeId]);

  const handleVersionSelect = (versionId) => {
    if (selectedVersions.includes(versionId)) {
      setSelectedVersions(selectedVersions.filter(id => id !== versionId));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, versionId]);
    } else {
      setSelectedVersions([selectedVersions[1], versionId]);
    }
  };

  const handleRestore = (version) => {
    if (confirm(`Are you sure you want to restore to version ${version.id}? This will create a new version with the restored content.`)) {
      onVersionRestore && onVersionRestore(version);
    }
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      setShowComparison(true);
    }
  };

  const getScoreChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getScoreChangeColor = (change) => {
    if (change > 0) return "text-green-600 bg-green-50";
    if (change < 0) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading version history...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <History className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <CardTitle>Version History</CardTitle>
                <CardDescription>
                  Track changes and restore previous versions of your resume
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedVersions.length === 2 && (
                <Button onClick={handleCompare} variant="outline">
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare Versions
                </Button>
              )}
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {versions.length} versions
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Version Timeline */}
      <div className="space-y-4">
        {versions.map((version, index) => (
          <Card 
            key={version.id} 
            className={`transition-all ${
              selectedVersions.includes(version.id) 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : version.isCurrent 
                  ? 'border-green-500 bg-green-50' 
                  : 'hover:shadow-md'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  
                  {/* Version Selector */}
                  <div className="flex flex-col items-center">
                    <input
                      type="checkbox"
                      checked={selectedVersions.includes(version.id)}
                      onChange={() => handleVersionSelect(version.id)}
                      className="mb-2"
                      disabled={selectedVersions.length >= 2 && !selectedVersions.includes(version.id)}
                    />
                    <div className="w-4 h-4 bg-blue-500 rounded-full relative">
                      {index < versions.length - 1 && (
                        <div className="absolute top-4 left-1.5 w-0.5 h-16 bg-gray-300"></div>
                      )}
                    </div>
                  </div>

                  {/* Version Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{version.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {version.id}
                      </Badge>
                      
                      {version.isCurrent && (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="w-3 h-3 mr-1" />
                          Current
                        </Badge>
                      )}
                      
                      {version.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{version.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(version.createdAt)}
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {getScoreChangeIcon(version.scoreChange)}
                          <span className={`ml-1 px-2 py-1 rounded text-xs ${getScoreChangeColor(version.scoreChange)}`}>
                            Score: {version.score}%
                            {version.scoreChange !== 0 && ` (${version.scoreChange > 0 ? '+' : ''}${version.scoreChange})`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Changes List */}
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-gray-700">Changes made:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {version.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className="flex items-start">
                            <span className="text-gray-400 mr-2 mt-1">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  {!version.isCurrent && (
                    <Button size="sm" variant="outline" onClick={() => handleRestore(version)}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Version Comparison Modal */}
      {showComparison && selectedVersions.length === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Version Comparison</CardTitle>
              <Button variant="outline" onClick={() => setShowComparison(false)}>
                Close Comparison
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {selectedVersions.map((versionId) => {
                const version = versions.find(v => v.id === versionId);
                return (
                  <div key={versionId} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{version.title}</h4>
                      <Badge variant="outline">{version.id}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Score: {version.score}%</div>
                      <div>Date: {formatDate(version.createdAt)}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <h5 className="font-medium mb-2">Changes:</h5>
                      <ul className="space-y-1">
                        {version.changes.map((change, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auto-save Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-blue-800">
            <GitBranch className="w-4 h-4" />
            <span className="text-sm">
              <strong>Auto-save enabled:</strong> Changes are automatically saved every 30 seconds. 
              Major updates create new versions for easy restoration.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
