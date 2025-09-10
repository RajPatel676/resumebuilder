import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { 
  Users, FileText, BarChart3, Settings, 
  Search, Filter, MoreVertical, Download,
  Shield, Activity, Database, Zap,
  TrendingUp, AlertTriangle, CheckCircle,
  Calendar, Globe, Cpu, HardDrive
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_resumes: 0,
    active_sessions: 0,
    storage_used: 0
  });
  
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with API calls
  useEffect(() => {
    const mockStats = {
      total_users: 1247,
      total_resumes: 3891,
      active_sessions: 89,
      storage_used: 67.8,
      growth_rate: 12.3,
      avg_score: 76.2
    };

    const mockUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        resumes_count: 3,
        last_active: '2024-01-15T10:30:00Z',
        status: 'active',
        plan: 'premium'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        resumes_count: 2,
        last_active: '2024-01-14T15:20:00Z',
        status: 'active',
        plan: 'free'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        resumes_count: 5,
        last_active: '2024-01-10T09:15:00Z',
        status: 'inactive',
        plan: 'premium'
      }
    ];

    const mockTemplates = [
      {
        id: 'modern',
        name: 'Modern Professional',
        usage_count: 1234,
        rating: 4.8,
        status: 'active',
        created_date: '2023-12-01'
      },
      {
        id: 'classic',
        name: 'Classic Traditional',
        usage_count: 891,
        rating: 4.6,
        status: 'active',
        created_date: '2023-11-15'
      },
      {
        id: 'creative',
        name: 'Creative Design',
        usage_count: 567,
        rating: 4.4,
        status: 'active',
        created_date: '2023-12-15'
      }
    ];

    const mockActivities = [
      {
        id: '1',
        type: 'user_registration',
        user: 'alice@example.com',
        description: 'New user registered',
        timestamp: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        type: 'resume_created',
        user: 'john@example.com',
        description: 'Created new resume using Modern template',
        timestamp: '2024-01-15T13:45:00Z'
      },
      {
        id: '3',
        type: 'system_alert',
        user: 'system',
        description: 'High server load detected',
        timestamp: '2024-01-15T12:20:00Z'
      }
    ];

    setStats(mockStats);
    setUsers(mockUsers);
    setTemplates(mockTemplates);
    setActivities(mockActivities);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'suspended': 'bg-red-100 text-red-800'
    };
    return variants[status] || variants.inactive;
  };

  const getPlanBadge = (plan) => {
    const variants = {
      'free': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'enterprise': 'bg-gold-100 text-gold-800'
    };
    return variants[plan] || variants.free;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration': return <Users className="w-4 h-4 text-green-500" />;
      case 'resume_created': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'system_alert': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">System administration and analytics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
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

      <div className="container mx-auto px-4 pb-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total_users?.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +{stats.growth_rate}% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total_resumes?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">Avg score: {stats.avg_score}%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.active_sessions}</p>
                      <p className="text-xs text-gray-500 mt-1">Currently online</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Storage Used</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.storage_used}%</p>
                      <p className="text-xs text-gray-500 mt-1">of 1TB capacity</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <HardDrive className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cpu className="w-5 h-5 mr-2" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm text-green-600">120ms</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Performance</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-sm text-green-600">Optimal</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Service Uptime</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="text-sm text-yellow-600">78%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">United States</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Europe</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Asia Pacific</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-medium">9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button>
                    Add User
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">User</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Plan</th>
                        <th className="text-left p-3">Resumes</th>
                        <th className="text-left p-3">Last Active</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={getStatusBadge(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={getPlanBadge(user.plan)}>
                              {user.plan}
                            </Badge>
                          </td>
                          <td className="p-3">{user.resumes_count}</td>
                          <td className="p-3 text-sm text-gray-600">
                            {formatDate(user.last_active)}
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Management</CardTitle>
                <CardDescription>Manage resume templates and their usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">{template.name}</h3>
                          <Badge className={getStatusBadge(template.status)}>
                            {template.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Usage Count:</span>
                            <span className="font-medium">{template.usage_count.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Rating:</span>
                            <span className="font-medium">{template.rating}/5.0</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Created:</span>
                            <span className="font-medium">{template.created_date}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Preview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Real-time system events and user activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <div className="font-medium">{activity.description}</div>
                        <div className="text-sm text-gray-600">
                          {activity.user} • {formatDate(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">AI Service Configuration</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Gemini API Key</label>
                        <Input type="password" placeholder="••••••••••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Rate Limit (requests/hour)</label>
                        <Input type="number" defaultValue="1000" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Storage Settings</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Max File Size (MB)</label>
                        <Input type="number" defaultValue="10" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Storage Retention (days)</label>
                        <Input type="number" defaultValue="365" />
                      </div>
                    </div>
                  </div>
                  
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
