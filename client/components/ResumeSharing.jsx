import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { 
  Share2, Copy, Download, Link2, QrCode, 
  Mail, MessageSquare, Globe, Lock, 
  Eye, Calendar, BarChart3, ExternalLink,
  Clock, Users, Settings, Trash2,
  Twitter, Linkedin, Facebook
} from "lucide-react";

export default function ResumeSharing({ resumeId, resumeTitle }) {
  const [shareLinks, setShareLinks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState('view');
  const [expirationDate, setExpirationDate] = useState('');
  const [password, setPassword] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [analytics, setAnalytics] = useState({});

  const permissionOptions = [
    { value: 'view', label: 'View Only', description: 'Recipients can only view the resume' },
    { value: 'download', label: 'View & Download', description: 'Recipients can view and download the resume' },
    { value: 'comment', label: 'View & Comment', description: 'Recipients can view and leave feedback' }
  ];

  const expirationOptions = [
    { value: '', label: 'Never expires' },
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' },
    { value: 'custom', label: 'Custom date' }
  ];

  // Mock data - replace with API calls
  useEffect(() => {
    const mockShareLinks = [
      {
        id: '1',
        url: 'https://resume.app/share/abc123xyz',
        type: 'public',
        permissions: 'download',
        created_date: '2024-01-15T10:30:00Z',
        expires_date: '2024-02-15T10:30:00Z',
        views: 24,
        downloads: 8,
        password_protected: false,
        status: 'active'
      },
      {
        id: '2',
        url: 'https://resume.app/share/def456uvw',
        type: 'private',
        permissions: 'view',
        created_date: '2024-01-10T14:20:00Z',
        expires_date: null,
        views: 7,
        downloads: 0,
        password_protected: true,
        status: 'active'
      }
    ];

    const mockAnalytics = {
      total_views: 31,
      total_downloads: 8,
      unique_visitors: 18,
      avg_view_duration: '2:34',
      top_referrers: ['LinkedIn', 'Email', 'Direct'],
      geographic_data: [
        { country: 'United States', views: 18 },
        { country: 'Canada', views: 8 },
        { country: 'United Kingdom', views: 5 }
      ]
    };

    setShareLinks(mockShareLinks);
    setAnalytics(mockAnalytics);
  }, [resumeId]);

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newLink = {
        id: Date.now().toString(),
        url: `https://resume.app/share/${Math.random().toString(36).substr(2, 9)}`,
        type: password ? 'private' : 'public',
        permissions: selectedPermissions,
        created_date: new Date().toISOString(),
        expires_date: expirationDate ? new Date(expirationDate).toISOString() : null,
        views: 0,
        downloads: 0,
        password_protected: !!password,
        status: 'active'
      };
      
      setShareLinks([newLink, ...shareLinks]);
      
    } catch (error) {
      console.error('Failed to generate share link:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    // Show toast notification
    alert('Link copied to clipboard!');
  };

  const revokeLink = (linkId) => {
    setShareLinks(shareLinks.map(link => 
      link.id === linkId 
        ? { ...link, status: 'revoked' }
        : link
    ));
  };

  const deleteLink = (linkId) => {
    setShareLinks(shareLinks.filter(link => link.id !== linkId));
  };

  const shareViaEmail = (url) => {
    const subject = encodeURIComponent(`Resume: ${resumeTitle}`);
    const body = encodeURIComponent(`${customMessage}\n\nView my resume: ${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSocial = (platform, url) => {
    const text = encodeURIComponent(`Check out my resume: ${resumeTitle}`);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    window.open(urls[platform], '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <CardTitle>Resume Sharing</CardTitle>
              <CardDescription>
                Create secure shareable links for your resume
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Share Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Share</CardTitle>
          <CardDescription>Share your resume instantly with common settings</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              className="h-auto flex-col space-y-2 p-6"
              onClick={() => {
                setSelectedPermissions('view');
                setPassword('');
                setExpirationDate('');
                generateShareLink();
              }}
            >
              <Globe className="w-6 h-6" />
              <span>Public Link</span>
              <span className="text-xs opacity-75">Anyone with link can view</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto flex-col space-y-2 p-6"
              onClick={() => {
                setSelectedPermissions('download');
                setPassword('secure123');
                setExpirationDate('30d');
                generateShareLink();
              }}
            >
              <Lock className="w-6 h-6" />
              <span>Private Link</span>
              <span className="text-xs opacity-75">Password protected</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto flex-col space-y-2 p-6"
              onClick={() => {
                setSelectedPermissions('comment');
                setPassword('');
                setExpirationDate('7d');
                generateShareLink();
              }}
            >
              <MessageSquare className="w-6 h-6" />
              <span>Feedback Link</span>
              <span className="text-xs opacity-75">Allow comments</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Share Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Customize permissions and security options</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          
          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium mb-3">Permissions</label>
            <div className="grid md:grid-cols-3 gap-3">
              {permissionOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedPermissions === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPermissions(option.value)}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiration */}
          <div>
            <label className="block text-sm font-medium mb-3">Link Expiration</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {expirationOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={expirationDate === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExpirationDate(option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            {expirationDate === 'custom' && (
              <div className="mt-3">
                <Input
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full md:w-1/2"
                />
              </div>
            )}
          </div>

          {/* Password Protection */}
          <div>
            <label className="block text-sm font-medium mb-3">Password Protection (Optional)</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to protect link"
              className="w-full md:w-1/2"
            />
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-medium mb-3">Custom Message</label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Add a personal message that recipients will see..."
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generateShareLink}
            disabled={isGenerating}
            className="w-full md:w-auto"
          >
            {isGenerating ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Generating Link...
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-2" />
                Generate Share Link
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Share Links */}
      <Card>
        <CardHeader>
          <CardTitle>Your Share Links</CardTitle>
          <CardDescription>Manage and track your shared resume links</CardDescription>
        </CardHeader>
        
        <CardContent>
          {shareLinks.length === 0 ? (
            <div className="text-center py-8">
              <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No share links yet</h3>
              <p className="text-gray-600">Generate your first share link to start sharing your resume</p>
            </div>
          ) : (
            <div className="space-y-4">
              {shareLinks.map((link) => (
                <div key={link.id} className="border rounded-lg p-4">
                  
                  {/* Link Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        link.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <Badge className={getStatusColor(link.status)}>
                        {link.status}
                      </Badge>
                      <Badge variant="outline">
                        {link.permissions}
                      </Badge>
                      {link.password_protected && (
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          <Lock className="w-3 h-3 mr-1" />
                          Protected
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(link.url)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => window.open(link.url, '_blank')}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => revokeLink(link.id)}>
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteLink(link.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Link URL */}
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-gray-700 font-mono flex-1 mr-3">
                        {link.url}
                      </code>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(link.url)}>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* Link Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">{link.views}</div>
                      <div className="text-xs text-blue-700">Views</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">{link.downloads}</div>
                      <div className="text-xs text-green-700">Downloads</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="text-xs font-medium text-purple-700">Created</div>
                      <div className="text-xs text-purple-600">{formatDate(link.created_date)}</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="text-xs font-medium text-orange-700">Expires</div>
                      <div className="text-xs text-orange-600">
                        {link.expires_date ? formatDate(link.expires_date) : 'Never'}
                      </div>
                    </div>
                  </div>

                  {/* Share Actions */}
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => shareViaEmail(link.url)}>
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => shareViaSocial('linkedin', link.url)}>
                      <Linkedin className="w-3 h-3 mr-1" />
                      LinkedIn
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => shareViaSocial('twitter', link.url)}>
                      <Twitter className="w-3 h-3 mr-1" />
                      Twitter
                    </Button>
                    <Button size="sm" variant="outline">
                      <QrCode className="w-3 h-3 mr-1" />
                      QR Code
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics */}
      {shareLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Sharing Analytics
            </CardTitle>
            <CardDescription>Track how your resume is being viewed and shared</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analytics.total_views}</div>
                <div className="text-sm text-blue-700">Total Views</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analytics.total_downloads}</div>
                <div className="text-sm text-green-700">Downloads</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analytics.unique_visitors}</div>
                <div className="text-sm text-purple-700">Unique Visitors</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{analytics.avg_view_duration}</div>
                <div className="text-sm text-orange-700">Avg. View Time</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Top Referrers */}
              <div>
                <h4 className="font-medium mb-3">Top Referrers</h4>
                <div className="space-y-2">
                  {analytics.top_referrers?.map((referrer, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{referrer}</span>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Data */}
              <div>
                <h4 className="font-medium mb-3">Geographic Distribution</h4>
                <div className="space-y-2">
                  {analytics.geographic_data?.map((geo, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{geo.country}</span>
                      <span className="text-sm font-medium">{geo.views} views</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
