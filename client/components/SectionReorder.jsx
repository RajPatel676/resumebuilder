import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { 
  GripVertical, ArrowUp, ArrowDown, Eye, 
  EyeOff, Settings, RotateCcw, Save,
  User, Briefcase, GraduationCap, Award,
  FileText, Code, Languages, Trophy,
  Target, Plus, Minus
} from "lucide-react";

export default function SectionReorder({ sections, onSectionsChange, onVisibilityChange }) {
  const [sectionOrder, setSectionOrder] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Default section configurations
  const defaultSections = [
    { 
      id: 'personal_info', 
      name: 'Personal Information', 
      icon: User, 
      required: true, 
      visible: true,
      description: 'Contact details and basic info'
    },
    { 
      id: 'summary', 
      name: 'Professional Summary', 
      icon: FileText, 
      required: false, 
      visible: true,
      description: 'Brief overview of your background'
    },
    { 
      id: 'experience', 
      name: 'Work Experience', 
      icon: Briefcase, 
      required: false, 
      visible: true,
      description: 'Employment history and achievements'
    },
    { 
      id: 'education', 
      name: 'Education', 
      icon: GraduationCap, 
      required: false, 
      visible: true,
      description: 'Academic background and degrees'
    },
    { 
      id: 'skills', 
      name: 'Skills', 
      icon: Award, 
      required: false, 
      visible: true,
      description: 'Technical and soft skills'
    },
    { 
      id: 'projects', 
      name: 'Projects', 
      icon: Code, 
      required: false, 
      visible: true,
      description: 'Personal and professional projects'
    },
    { 
      id: 'certifications', 
      name: 'Certifications', 
      icon: Trophy, 
      required: false, 
      visible: false,
      description: 'Professional certificates and licenses'
    },
    { 
      id: 'languages', 
      name: 'Languages', 
      icon: Languages, 
      required: false, 
      visible: false,
      description: 'Language proficiencies'
    },
    { 
      id: 'awards', 
      name: 'Awards & Achievements', 
      icon: Trophy, 
      required: false, 
      visible: false,
      description: 'Recognition and accomplishments'
    },
    { 
      id: 'interests', 
      name: 'Interests & Hobbies', 
      icon: Target, 
      required: false, 
      visible: false,
      description: 'Personal interests and activities'
    }
  ];

  useEffect(() => {
    if (sections && sections.length > 0) {
      setSectionOrder(sections);
    } else {
      setSectionOrder(defaultSections);
    }
  }, [sections]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      return;
    }

    const draggedIndex = sectionOrder.findIndex(item => item.id === draggedItem.id);
    const targetIndex = sectionOrder.findIndex(item => item.id === targetItem.id);

    const newOrder = [...sectionOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setSectionOrder(newOrder);
    setHasChanges(true);
    setDraggedItem(null);
  };

  const moveSection = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sectionOrder.length - 1)
    ) {
      return;
    }

    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    
    setSectionOrder(newOrder);
    setHasChanges(true);
  };

  const toggleVisibility = (sectionId) => {
    const newOrder = sectionOrder.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    );
    setSectionOrder(newOrder);
    setHasChanges(true);
    
    onVisibilityChange && onVisibilityChange(sectionId, !sectionOrder.find(s => s.id === sectionId).visible);
  };

  const resetToDefault = () => {
    setSectionOrder(defaultSections);
    setHasChanges(true);
  };

  const saveChanges = () => {
    onSectionsChange && onSectionsChange(sectionOrder);
    setHasChanges(false);
  };

  const addCustomSection = () => {
    const customSection = {
      id: `custom_${Date.now()}`,
      name: 'Custom Section',
      icon: Plus,
      required: false,
      visible: true,
      description: 'Add your custom content here',
      isCustom: true
    };
    
    setSectionOrder([...sectionOrder, customSection]);
    setHasChanges(true);
  };

  const removeCustomSection = (sectionId) => {
    setSectionOrder(sectionOrder.filter(section => section.id !== sectionId));
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <GripVertical className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <CardTitle>Section Management</CardTitle>
                <CardDescription>
                  Reorder, show/hide, and customize your resume sections
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" onClick={resetToDefault}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={saveChanges} disabled={!hasChanges}>
                <Save className="w-4 h-4 mr-2" />
                Save Layout
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How to customize your resume layout:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Drag sections by the grip handle to reorder them</li>
                <li>• Toggle visibility with the eye icon - hidden sections won't appear on your resume</li>
                <li>• Use arrow buttons for precise positioning</li>
                <li>• Add custom sections for unique content like publications or volunteer work</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Resume Sections</CardTitle>
            <Button onClick={addCustomSection} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Section
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {sectionOrder.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className={`group relative p-4 border rounded-lg transition-all cursor-move ${
                    draggedItem?.id === section.id
                      ? 'bg-blue-50 border-blue-300 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  } ${
                    !section.visible ? 'opacity-60' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, section)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section)}
                >
                  
                  <div className="flex items-center justify-between">
                    
                    {/* Left Side - Section Info */}
                    <div className="flex items-center space-x-4">
                      
                      {/* Drag Handle */}
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab group-hover:text-gray-600" />
                        <div className="text-sm font-medium text-gray-500 w-8">
                          #{index + 1}
                        </div>
                      </div>
                      
                      {/* Section Icon and Info */}
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          section.visible 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{section.name}</h3>
                            {section.required && (
                              <Badge variant="outline" className="text-xs text-red-600 border-red-300">
                                Required
                              </Badge>
                            )}
                            {section.isCustom && (
                              <Badge variant="outline" className="text-xs text-purple-600 border-purple-300">
                                Custom
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side - Controls */}
                    <div className="flex items-center space-x-2">
                      
                      {/* Visibility Toggle */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVisibility(section.id)}
                        disabled={section.required}
                        className={section.visible ? 'text-blue-600' : 'text-gray-400'}
                      >
                        {section.visible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
                      
                      {/* Move Up/Down */}
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="h-6 p-1"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === sectionOrder.length - 1}
                          className="h-6 p-1"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Remove Custom Section */}
                      {section.isCustom && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomSection(section.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Section Preview</CardTitle>
          <CardDescription>How your sections will appear on the resume</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            {sectionOrder
              .filter(section => section.visible)
              .map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={section.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-sm font-medium text-gray-500 w-6">
                        {index + 1}.
                      </span>
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{section.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Visible
                    </Badge>
                  </div>
                );
              })}
          </div>
          
          {sectionOrder.filter(section => section.visible).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <EyeOff className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No visible sections. Enable at least one section to display content.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {sectionOrder.filter(s => s.visible).length}
            </div>
            <div className="text-sm text-gray-600">Visible Sections</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {sectionOrder.filter(s => s.isCustom).length}
            </div>
            <div className="text-sm text-gray-600">Custom Sections</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {sectionOrder.length}
            </div>
            <div className="text-sm text-gray-600">Total Sections</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
