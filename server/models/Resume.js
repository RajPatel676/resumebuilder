import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  template: {
    type: String,
    required: true,
    enum: ['modern', 'classic', 'creative', 'elegant', 'executive', 'minimal', 'technical', 'latex-classic', 'latex-modern', 'latex-minimal', 'latex-sidebar'],
    default: 'modern'
  },
  personalInfo: {
    fullName: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    address: String,
    linkedin: String,
    website: String
  },
  education: [{
    id: String,
    institution: { type: String, required: false },
    degree: { type: String, required: false },
    field: { type: String, required: false },
    startDate: { type: String, required: false },
    endDate: { type: String, required: false },
    gpa: String
  }],
  experience: [{
    id: String,
    company: { type: String, required: false },
    position: { type: String, required: false },
    startDate: { type: String, required: false },
    endDate: String,
    current: { type: Boolean, default: false },
    description: { type: String, required: false }
  }],
  skills: [{
    id: String,
    name: { type: String, required: false },
    level: { type: String, required: false, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
  }],
  summary: {
    type: String,
    required: false
  },
  certifications: [{
    id: String,
    name: { type: String, required: false },
    issuer: { type: String, required: false },
    date: { type: String, required: false }
  }],
  projects: [{
    id: String,
    name: { type: String, required: false },
    description: { type: String, required: false },
    technologies: [String],
    url: String,
    date: { type: String, required: false }
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

export const Resume = mongoose.model('Resume', resumeSchema);
