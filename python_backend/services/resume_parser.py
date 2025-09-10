import os
import re
import json
import pandas as pd
import numpy as np
from datetime import datetime
import fitz  # PyMuPDF
from docx import Document
import logging
from typing import Dict, List, Any
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.chunk import ne_chunk
from nltk.tag import pos_tag
import textstat

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
    
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('taggers/averaged_perceptron_tagger')
except LookupError:
    nltk.download('averaged_perceptron_tagger')

try:
    nltk.data.find('chunkers/maxent_ne_chunker')
except LookupError:
    nltk.download('maxent_ne_chunker')

try:
    nltk.data.find('corpora/words')
except LookupError:
    nltk.download('words')

logger = logging.getLogger(__name__)

class ResumeParser:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.skills_database = self._load_skills_database()
        self.education_keywords = ['university', 'college', 'institute', 'school', 'bachelor', 'master', 'phd', 'degree', 'diploma', 'certificate']
        self.experience_keywords = ['experience', 'work', 'employment', 'career', 'position', 'role', 'job']
        
    def parse_resume(self, file):
        """Parse resume file and extract structured data"""
        try:
            # Save uploaded file temporarily
            filename = file.filename
            file_path = os.path.join('uploads', filename)
            file.save(file_path)
            
            # Extract text based on file type
            if filename.lower().endswith('.pdf'):
                text = self._extract_text_from_pdf(file_path)
            elif filename.lower().endswith(('.docx', '.doc')):
                text = self._extract_text_from_docx(file_path)
            else:
                return {
                    'success': False,
                    'message': 'Unsupported file format. Please upload PDF or DOCX files.'
                }
            
            # Clean up temporary file
            os.remove(file_path)
            
            if not text.strip():
                return {
                    'success': False,
                    'message': 'Could not extract text from the resume. Please check the file.'
                }
            
            # Parse the extracted text
            parsed_data = self._parse_resume_text(text)
            
            return {
                'success': True,
                'data': parsed_data
            }
            
        except Exception as e:
            logger.error(f"Resume parsing error: {str(e)}")
            return {
                'success': False,
                'message': 'Failed to parse resume',
                'error': str(e)
            }
    
    def _extract_text_from_pdf(self, file_path):
        """Extract text from PDF file"""
        try:
            doc = fitz.open(file_path)
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text
        except Exception as e:
            logger.error(f"PDF extraction error: {str(e)}")
            return ""
    
    def _extract_text_from_docx(self, file_path):
        """Extract text from DOCX file"""
        try:
            doc = Document(file_path)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        except Exception as e:
            logger.error(f"DOCX extraction error: {str(e)}")
            return ""
    
    def _parse_resume_text(self, text):
        """Parse resume text and extract structured information"""
        # Basic text preprocessing
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        
        # Extract different sections
        personal_info = self._extract_personal_info(text)
        education = self._extract_education(text, lines)
        experience = self._extract_experience(text, lines)
        skills = self._extract_skills(text)
        
        # Perform text analysis
        text_analysis = self._analyze_text_quality(text)
        
        # Calculate readability scores
        readability = self._calculate_readability(text)
        
        # Extract key metrics
        metrics = self._extract_metrics(text)
        
        return {
            'raw_text': text,
            'personal_info': personal_info,
            'education': education,
            'experience': experience,
            'skills': skills,
            'text_analysis': text_analysis,
            'readability': readability,
            'metrics': metrics,
            'parsed_at': datetime.utcnow().isoformat()
        }
    
    def _extract_personal_info(self, text):
        """Extract personal information using regex and NLP"""
        personal_info = {}
        
        # Extract email
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        personal_info['email'] = emails[0] if emails else None
        
        # Extract phone number
        phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
        phones = re.findall(phone_pattern, text)
        personal_info['phone'] = ''.join(phones[0]) if phones else None
        
        # Extract name (first few words, likely to be name)
        lines = text.split('\n')
        for line in lines[:5]:  # Check first 5 lines
            line = line.strip()
            if line and not any(keyword in line.lower() for keyword in ['email', 'phone', 'address', '@']):
                words = line.split()
                if 2 <= len(words) <= 4:  # Likely a name
                    personal_info['name'] = line
                    break
        
        # Extract LinkedIn
        linkedin_pattern = r'linkedin\.com/in/[\w-]+'
        linkedin = re.findall(linkedin_pattern, text, re.IGNORECASE)
        personal_info['linkedin'] = linkedin[0] if linkedin else None
        
        return personal_info
    
    def _extract_education(self, text, lines):
        """Extract education information"""
        education = []
        education_section = False
        
        for i, line in enumerate(lines):
            line_lower = line.lower()
            
            # Check if we're entering education section
            if any(keyword in line_lower for keyword in ['education', 'academic', 'qualification']):
                education_section = True
                continue
            
            # Check if we're leaving education section
            if education_section and any(keyword in line_lower for keyword in self.experience_keywords):
                education_section = False
            
            # Extract education entries
            if education_section or any(keyword in line_lower for keyword in self.education_keywords):
                degree_match = re.search(r'(bachelor|master|phd|b\.?[as]|m\.?[as]|ph\.?d)', line_lower)
                if degree_match:
                    education_entry = {
                        'degree': line,
                        'institution': self._find_institution(lines, i),
                        'year': self._extract_year(line)
                    }
                    education.append(education_entry)
        
        return education
    
    def _extract_experience(self, text, lines):
        """Extract work experience"""
        experience = []
        experience_section = False
        
        for i, line in enumerate(lines):
            line_lower = line.lower()
            
            # Check if we're entering experience section
            if any(keyword in line_lower for keyword in self.experience_keywords):
                experience_section = True
                continue
            
            # Extract job titles and companies
            if experience_section or self._is_job_title(line):
                job_entry = {
                    'title': line,
                    'company': self._find_company(lines, i),
                    'duration': self._extract_duration(line),
                    'description': self._extract_job_description(lines, i)
                }
                experience.append(job_entry)
        
        return experience
    
    def _extract_skills(self, text):
        """Extract skills using keyword matching and NLP"""
        text_lower = text.lower()
        found_skills = []
        
        # Technical skills from database
        for skill in self.skills_database:
            if skill.lower() in text_lower:
                found_skills.append(skill)
        
        # Extract skills from skills section
        skills_section = re.search(r'skills?\s*:?\s*(.*?)(?=\n\s*\n|\n[A-Z]|$)', text, re.IGNORECASE | re.DOTALL)
        if skills_section:
            skills_text = skills_section.group(1)
            # Split by common delimiters
            skills_list = re.split(r'[,;•\n\t]+', skills_text)
            for skill in skills_list:
                skill = skill.strip()
                if skill and len(skill) < 50:  # Reasonable skill length
                    found_skills.append(skill)
        
        return list(set(found_skills))  # Remove duplicates
    
    def _analyze_text_quality(self, text):
        """Analyze text quality using NLP"""
        # Tokenize and analyze
        sentences = sent_tokenize(text)
        words = word_tokenize(text.lower())
        
        # Remove stopwords
        filtered_words = [word for word in words if word.isalpha() and word not in self.stop_words]
        
        # Calculate statistics
        analysis = {
            'word_count': len(words),
            'sentence_count': len(sentences),
            'unique_words': len(set(filtered_words)),
            'avg_sentence_length': len(words) / len(sentences) if sentences else 0,
            'vocabulary_richness': len(set(filtered_words)) / len(filtered_words) if filtered_words else 0
        }
        
        # POS tagging analysis
        pos_tags = pos_tag(words)
        pos_counts = {}
        for word, pos in pos_tags:
            pos_counts[pos] = pos_counts.get(pos, 0) + 1
        
        analysis['pos_distribution'] = pos_counts
        
        return analysis
    
    def _calculate_readability(self, text):
        """Calculate readability scores"""
        return {
            'flesch_kincaid_grade': textstat.flesch_kincaid().grade(text),
            'flesch_reading_ease': textstat.flesch_reading_ease(text),
            'gunning_fog': textstat.gunning_fog(text),
            'automated_readability_index': textstat.automated_readability_index(text)
        }
    
    def _extract_metrics(self, text):
        """Extract quantifiable metrics from resume"""
        metrics = []
        
        # Look for numbers followed by units or descriptors
        metric_patterns = [
            r'\$?(\d+(?:,\d{3})*(?:\.\d+)?)\s*(million|billion|k|thousand|%|percent)',
            r'(\d+(?:\.\d+)?)\s*(years?|months?|weeks?)',
            r'(\d+)(?:\+|\s+or\s+more|\s+plus)?\s*(people|team|members|employees)',
            r'improved?\s+by\s+(\d+(?:\.\d+)?)(%|percent|times|x)',
            r'increased?\s+by\s+(\d+(?:\.\d+)?)(%|percent|times|x)',
            r'reduced?\s+by\s+(\d+(?:\.\d+)?)(%|percent|times|x)'
        ]
        
        for pattern in metric_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            for match in matches:
                if isinstance(match, tuple):
                    metrics.append(' '.join(match))
                else:
                    metrics.append(match)
        
        return metrics
    
    def _find_institution(self, lines, index):
        """Find institution name near education entry"""
        # Look in nearby lines for institution
        for i in range(max(0, index-2), min(len(lines), index+3)):
            if any(keyword in lines[i].lower() for keyword in self.education_keywords):
                return lines[i]
        return None
    
    def _find_company(self, lines, index):
        """Find company name near job entry"""
        # Look in nearby lines for company
        for i in range(max(0, index-1), min(len(lines), index+2)):
            if i != index and lines[i].strip():
                return lines[i]
        return None
    
    def _extract_year(self, text):
        """Extract year from text"""
        year_pattern = r'(19|20)\d{2}'
        years = re.findall(year_pattern, text)
        return years[-1] + years[-1][2:] if years else None
    
    def _extract_duration(self, text):
        """Extract duration from text"""
        duration_pattern = r'(\d{4})\s*[-–]\s*(\d{4}|present|current)'
        duration = re.search(duration_pattern, text, re.IGNORECASE)
        return duration.group(0) if duration else None
    
    def _is_job_title(self, line):
        """Determine if line is likely a job title"""
        job_keywords = ['engineer', 'developer', 'manager', 'analyst', 'specialist', 'coordinator', 'director', 'lead', 'senior', 'junior']
        return any(keyword in line.lower() for keyword in job_keywords)
    
    def _extract_job_description(self, lines, index):
        """Extract job description following the job title"""
        description = []
        for i in range(index + 1, min(len(lines), index + 5)):
            line = lines[i].strip()
            if line and not self._is_job_title(line):
                description.append(line)
            else:
                break
        return ' '.join(description)
    
    def _load_skills_database(self):
        """Load comprehensive skills database"""
        # Technical skills database
        skills = [
            # Programming Languages
            'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go', 'Rust', 'TypeScript',
            'R', 'MATLAB', 'Scala', 'Perl', 'Shell', 'Bash', 'PowerShell',
            
            # Web Technologies
            'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
            'Bootstrap', 'jQuery', 'SASS', 'LESS', 'webpack', 'Babel',
            
            # Databases
            'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Oracle', 'SQL Server', 'Redis', 'Elasticsearch',
            'Cassandra', 'DynamoDB', 'Firebase',
            
            # Cloud & DevOps
            'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform',
            'Ansible', 'Chef', 'Puppet', 'Git', 'GitHub', 'GitLab', 'Bitbucket',
            
            # Data Science & ML
            'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
            'Matplotlib', 'Seaborn', 'Plotly', 'Jupyter', 'Apache Spark', 'Hadoop', 'Kafka',
            
            # Mobile Development
            'iOS', 'Android', 'React Native', 'Flutter', 'Xamarin', 'Cordova', 'Ionic',
            
            # Soft Skills
            'Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Project Management',
            'Agile', 'Scrum', 'Kanban', 'Public Speaking', 'Negotiation', 'Critical Thinking'
        ]
        
        return skills
