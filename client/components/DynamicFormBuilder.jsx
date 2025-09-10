import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { 
  Plus, Minus, GripVertical, Type, Calendar, 
  List, ToggleLeft, Hash, Mail, Phone, Globe,
  Save, Eye, Code, Settings, Trash2, Copy,
  FileText, Edit3, ArrowUp, ArrowDown,
  CheckSquare, Radio, Star, Image, Link2
} from "lucide-react";

export default function DynamicFormBuilder({ onFormSave, initialFields = [] }) {
  const [formFields, setFormFields] = useState([]);
  const [formTitle, setFormTitle] = useState('Custom Section');
  const [formDescription, setFormDescription] = useState('');
  const [draggedField, setDraggedField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({});

  const fieldTypes = [
    { 
      type: 'text', 
      label: 'Text Input', 
      icon: Type, 
      description: 'Single line text field',
      defaultProps: { placeholder: 'Enter text...', required: false }
    },
    { 
      type: 'textarea', 
      label: 'Text Area', 
      icon: FileText, 
      description: 'Multi-line text field',
      defaultProps: { placeholder: 'Enter description...', rows: 3, required: false }
    },
    { 
      type: 'email', 
      label: 'Email', 
      icon: Mail, 
      description: 'Email address field',
      defaultProps: { placeholder: 'email@example.com', required: false }
    },
    { 
      type: 'phone', 
      label: 'Phone', 
      icon: Phone, 
      description: 'Phone number field',
      defaultProps: { placeholder: '+1 (555) 123-4567', required: false }
    },
    { 
      type: 'url', 
      label: 'URL', 
      icon: Link2, 
      description: 'Website or link field',
      defaultProps: { placeholder: 'https://example.com', required: false }
    },
    { 
      type: 'date', 
      label: 'Date', 
      icon: Calendar, 
      description: 'Date picker field',
      defaultProps: { required: false }
    },
    { 
      type: 'number', 
      label: 'Number', 
      icon: Hash, 
      description: 'Numeric input field',
      defaultProps: { placeholder: '0', min: 0, required: false }
    },
    { 
      type: 'select', 
      label: 'Dropdown', 
      icon: List, 
      description: 'Select from options',
      defaultProps: { 
        options: ['Option 1', 'Option 2', 'Option 3'], 
        required: false 
      }
    },
    { 
      type: 'radio', 
      label: 'Radio Buttons', 
      icon: Radio, 
      description: 'Single choice selection',
      defaultProps: { 
        options: ['Option 1', 'Option 2', 'Option 3'], 
        required: false 
      }
    },
    { 
      type: 'checkbox', 
      label: 'Checkbox', 
      icon: CheckSquare, 
      description: 'Multiple choice selection',
      defaultProps: { 
        options: ['Option 1', 'Option 2', 'Option 3'], 
        required: false 
      }
    },
    { 
      type: 'rating', 
      label: 'Rating', 
      icon: Star, 
      description: 'Star rating field',
      defaultProps: { max: 5, required: false }
    },
    { 
      type: 'file', 
      label: 'File Upload', 
      icon: Image, 
      description: 'File attachment field',
      defaultProps: { accept: '.pdf,.doc,.docx', required: false }
    }
  ];

  useEffect(() => {
    if (initialFields.length > 0) {
      setFormFields(initialFields);
    }
  }, [initialFields]);

  const addField = (fieldType) => {
    const fieldConfig = fieldTypes.find(f => f.type === fieldType.type);
    const newField = {
      id: Date.now().toString(),
      type: fieldType.type,
      label: fieldType.label,
      name: fieldType.label.toLowerCase().replace(/\s+/g, '_'),
      ...fieldConfig.defaultProps,
      validation: {
        required: false,
        minLength: '',
        maxLength: '',
        pattern: ''
      }
    };
    
    setFormFields([...formFields, newField]);
  };

  const updateField = (fieldId, updates) => {
    setFormFields(formFields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const removeField = (fieldId) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
  };

  const moveField = (fieldId, direction) => {
    const index = formFields.findIndex(field => field.id === fieldId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === formFields.length - 1)
    ) {
      return;
    }

    const newFields = [...formFields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
    setFormFields(newFields);
  };

  const duplicateField = (fieldId) => {
    const field = formFields.find(f => f.id === fieldId);
    if (field) {
      const duplicatedField = {
        ...field,
        id: Date.now().toString(),
        name: `${field.name}_copy`,
        label: `${field.label} (Copy)`
      };
      setFormFields([...formFields, duplicatedField]);
    }
  };

  const handleDragStart = (e, field) => {
    setDraggedField(field);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetField) => {
    e.preventDefault();
    
    if (!draggedField || draggedField.id === targetField.id) {
      return;
    }

    const draggedIndex = formFields.findIndex(field => field.id === draggedField.id);
    const targetIndex = formFields.findIndex(field => field.id === targetField.id);

    const newFields = [...formFields];
    newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, draggedField);

    setFormFields(newFields);
    setDraggedField(null);
  };

  const saveForm = () => {
    const formConfig = {
      title: formTitle,
      description: formDescription,
      fields: formFields,
      createdAt: new Date().toISOString()
    };
    
    onFormSave && onFormSave(formConfig);
  };

  const renderFieldPreview = (field) => {
    const commonProps = {
      id: field.id,
      name: field.name,
      required: field.validation?.required || false,
      placeholder: field.placeholder,
      value: formData[field.name] || '',
      onChange: (e) => setFormData({ ...formData, [field.name]: e.target.value })
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return <Input {...commonProps} type={field.type} />;
      
      case 'textarea':
        return <Textarea {...commonProps} rows={field.rows || 3} />;
      
      case 'date':
        return <Input {...commonProps} type="date" />;
      
      case 'number':
        return <Input {...commonProps} type="number" min={field.min} max={field.max} />;
      
      case 'select':
        return (
          <select {...commonProps} className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name={field.name} 
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  value={option}
                  checked={(formData[field.name] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = formData[field.name] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    setFormData({ ...formData, [field.name]: newValues });
                  }}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'rating':
        return (
          <div className="flex space-x-1">
            {[...Array(field.max || 5)].map((_, index) => (
              <Star 
                key={index}
                className={`w-6 h-6 cursor-pointer ${
                  index < (formData[field.name] || 0) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
                onClick={() => setFormData({ ...formData, [field.name]: index + 1 })}
              />
            ))}
          </div>
        );
      
      case 'file':
        return (
          <Input 
            type="file" 
            accept={field.accept}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.files[0] })}
          />
        );
      
      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <CardTitle>Dynamic Form Builder</CardTitle>
                <CardDescription>
                  Create custom sections with tailored input fields
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button onClick={saveForm} disabled={formFields.length === 0}>
                <Save className="w-4 h-4 mr-2" />
                Save Form
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Form Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Form Configuration</CardTitle>
          <CardDescription>Set up the basic information for your custom section</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="formTitle">Section Title</Label>
            <Input
              id="formTitle"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g., Publications, Volunteer Work, Patents"
            />
          </div>
          
          <div>
            <Label htmlFor="formDescription">Section Description (Optional)</Label>
            <Textarea
              id="formDescription"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Brief description of what this section contains..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Field Types */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Field Types</CardTitle>
              <CardDescription>Drag or click to add fields to your form</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                {fieldTypes.map((fieldType) => {
                  const Icon = fieldType.icon;
                  return (
                    <div
                      key={fieldType.type}
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => addField(fieldType)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-sm">{fieldType.label}</div>
                          <div className="text-xs text-gray-500">{fieldType.description}</div>
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-gray-400" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Builder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Form Fields ({formFields.length})</CardTitle>
              <CardDescription>Configure and arrange your form fields</CardDescription>
            </CardHeader>
            
            <CardContent>
              {formFields.length === 0 ? (
                <div className="text-center py-12">
                  <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No fields added yet</h3>
                  <p className="text-gray-600 mb-6">
                    Add fields from the panel on the left to start building your custom section
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formFields.map((field, index) => {
                    const Icon = fieldTypes.find(f => f.type === field.type)?.icon || Type;
                    return (
                      <div
                        key={field.id}
                        className="border rounded-lg p-4 bg-white"
                        draggable
                        onDragStart={(e) => handleDragStart(e, field)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, field)}
                      >
                        
                        {/* Field Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium">{field.label}</span>
                            <Badge variant="outline" className="text-xs">
                              {field.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveField(field.id, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveField(field.id, 'down')}
                              disabled={index === formFields.length - 1}
                            >
                              <ArrowDown className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => duplicateField(field.id)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeField(field.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Field Configuration */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs">Field Label</Label>
                            <Input
                              value={field.label}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-xs">Field Name</Label>
                            <Input
                              value={field.name}
                              onChange={(e) => updateField(field.id, { name: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>

                          {field.placeholder !== undefined && (
                            <div className="md:col-span-2">
                              <Label className="text-xs">Placeholder Text</Label>
                              <Input
                                value={field.placeholder}
                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                className="h-8 text-sm"
                              />
                            </div>
                          )}

                          {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                            <div className="md:col-span-2">
                              <Label className="text-xs">Options (one per line)</Label>
                              <Textarea
                                value={field.options?.join('\n') || ''}
                                onChange={(e) => updateField(field.id, { 
                                  options: e.target.value.split('\n').filter(opt => opt.trim()) 
                                })}
                                className="h-20 text-sm"
                                placeholder="Option 1&#10;Option 2&#10;Option 3"
                              />
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`required-${field.id}`}
                              checked={field.validation?.required || false}
                              onChange={(e) => updateField(field.id, { 
                                validation: { ...field.validation, required: e.target.checked }
                              })}
                            />
                            <Label htmlFor={`required-${field.id}`} className="text-xs">
                              Required field
                            </Label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Preview */}
      {showPreview && formFields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Form Preview</CardTitle>
            <CardDescription>See how your form will look to users</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold mb-2">{formTitle}</h3>
              {formDescription && (
                <p className="text-gray-600 mb-6">{formDescription}</p>
              )}
              
              <div className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.id}>
                    <Label htmlFor={field.id} className="flex items-center space-x-1">
                      <span>{field.label}</span>
                      {field.validation?.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </Label>
                    <div className="mt-1">
                      {renderFieldPreview(field)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <Button className="w-full md:w-auto">
                  Save {formTitle}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form JSON Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Form Configuration
          </CardTitle>
          <CardDescription>JSON representation of your form (for developers)</CardDescription>
        </CardHeader>
        
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
            {JSON.stringify({ title: formTitle, description: formDescription, fields: formFields }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
