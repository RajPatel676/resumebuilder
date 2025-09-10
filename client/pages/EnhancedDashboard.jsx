import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
  FileText, Plus, Download, Share2, Star, TrendingUp,
  Clock, Users, Target, BarChart3, Zap, Award,
  Search, Filter, MoreVertical, Edit3, Trash2, Copy, Upload
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EnhancedDashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [analytics, setAnalytics] = useState({
    total_resumes: 0,
    avg_score: 0,
    total_downloads: 0,
    improvement_trend: 0
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API calls
  useEffect(() => {
    setResumes([
      {
        id: '1',
        title: 'Software Engineer Resume',
        last_modified: '2024-01-15',
        score: 87,
        status: 'complete',
        downloads: 5,
        template: 'modern'
      },
      {
        id: '2',
        title: 'Product Manager Resume',
        last_modified: '2024-01-10',
        score: 73,
        status: 'draft',
        downloads: 2,
        template: 'classic'
      },
      {
        id: '3',
        title: 'Data Scientist Resume',
        last_modified: '2024-01-08',
        score: 91,
        status: 'complete',
        downloads: 8,
        template: 'creative'
      }
    ]);

    setAnalytics({
      total_resumes: 3,
      avg_score: 84,
      total_downloads: 15,
      improvement_trend: 12
    });
  }, []);

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || resume.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusBadge = (status) => {
    const variants = {
      'complete': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'archived': 'bg-gray-100 text-gray-800'
    };
    return variants[status] || variants.draft;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Dashboard</h1>
              <p className="text-gray-600">Manage and optimize your professional resumes</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => navigate('/builder')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Resume
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.total_resumes}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.avg_score}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.total_downloads}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improvement</p>
                  <p className="text-2xl font-bold text-gray-900">+{analytics.improvement_trend}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Fast track your resume management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => navigate('/builder')}
              >
                <Plus className="w-6 h-6 mb-2" />
                New Resume
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => navigate('/templates')}
              >
                <FileText className="w-6 h-6 mb-2" />
                Templates
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => navigate('/upload')}
              >
                <Upload className="w-6 h-6 mb-2" />
                Import
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
              >
                <BarChart3 className="w-6 h-6 mb-2" />
                Analytics
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
              >
                <Target className="w-6 h-6 mb-2" />
                Job Match
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
              >
                <Share2 className="w-6 h-6 mb-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumes Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Resumes</CardTitle>
                <CardDescription>
                  Manage, edit, and optimize your resume collection
                </CardDescription>
              </div>
              
              {/* Search and Filter */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resumes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="complete">Complete</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {filteredResumes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filter !== 'all' 
                    ? "Try adjusting your search or filter criteria" 
                    : "Create your first resume to get started"
                  }
                </p>
                <Button onClick={() => navigate('/builder')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Resume
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResumes.map((resume) => (
                  <Card key={resume.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{resume.title}</h3>
                          <p className="text-sm text-gray-600">
                            Last modified: {new Date(resume.last_modified).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadge(resume.status)}>
                            {resume.status}
                          </Badge>
                          
                          <div className="relative">
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Score and Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Resume Score</span>
                          <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(resume.score)}`}>
                            {resume.score}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${resume.score}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Template and Downloads */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <span>Template: {resume.template}</span>
                        <span>{resume.downloads} downloads</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
