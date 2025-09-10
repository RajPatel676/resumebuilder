import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import re
import logging
from typing import Dict, List, Any
import joblib
import os

logger = logging.getLogger(__name__)

class MLAnalyzer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self.scaler = StandardScaler()
        self.models_path = 'models'
        os.makedirs(self.models_path, exist_ok=True)
        
        # Industry-specific keywords for classification
        self.industry_keywords = {
            'Technology': ['software', 'programming', 'developer', 'engineer', 'python', 'java', 'javascript', 'react', 'angular', 'node.js', 'database', 'api', 'cloud', 'aws', 'azure'],
            'Data Science': ['data', 'analytics', 'machine learning', 'statistics', 'python', 'r', 'sql', 'tableau', 'powerbi', 'pandas', 'numpy', 'tensorflow', 'scikit-learn'],
            'Marketing': ['marketing', 'seo', 'social media', 'campaign', 'brand', 'advertising', 'content', 'digital marketing', 'google analytics', 'email marketing'],
            'Finance': ['finance', 'accounting', 'financial', 'budget', 'investment', 'banking', 'excel', 'financial modeling', 'risk management', 'audit'],
            'Healthcare': ['healthcare', 'medical', 'patient', 'clinical', 'hospital', 'nursing', 'physician', 'healthcare administration', 'medical records'],
            'Education': ['education', 'teaching', 'curriculum', 'student', 'academic', 'research', 'university', 'school', 'learning', 'instruction'],
            'Sales': ['sales', 'client', 'customer', 'revenue', 'quota', 'crm', 'lead generation', 'business development', 'account management', 'negotiation']
        }
        
        # Quality indicators
        self.quality_indicators = {
            'action_words': ['achieved', 'improved', 'increased', 'developed', 'managed', 'led', 'created', 'implemented', 'optimized', 'designed'],
            'quantifiable_results': [r'\d+%', r'\$\d+', r'\d+\s*million', r'\d+\s*thousand', r'\d+\s*years?', r'\d+\s*people'],
            'technical_skills': ['programming', 'software', 'database', 'framework', 'algorithm', 'architecture', 'development']
        }
        
    def analyze_resume(self, parsed_data):
        """Comprehensive ML analysis of resume data"""
        try:
            logger.info("Starting ML analysis of resume")
            
            # Extract features
            features = self._extract_features(parsed_data)
            
            # Perform different types of analysis
            analysis = {
                'features': features,
                'industry_classification': self._classify_industry(parsed_data),
                'quality_score': self._calculate_quality_score(parsed_data),
                'skills_analysis': self._analyze_skills(parsed_data),
                'experience_analysis': self._analyze_experience(parsed_data),
                'education_analysis': self._analyze_education(parsed_data),
                'text_complexity': self._analyze_text_complexity(parsed_data),
                'keyword_relevance': self._analyze_keyword_relevance(parsed_data),
                'recommendations': self._generate_ml_recommendations(parsed_data)
            }
            
            # Calculate overall ML score
            analysis['overall_score'] = self._calculate_overall_ml_score(analysis)
            
            logger.info(f"ML analysis completed with score: {analysis['overall_score']}")
            return analysis
            
        except Exception as e:
            logger.error(f"ML analysis error: {str(e)}")
            return {
                'error': str(e),
                'overall_score': 0,
                'recommendations': ['Unable to analyze resume due to processing error']
            }
    
    def _extract_features(self, parsed_data):
        """Extract numerical features from parsed resume data"""
        features = {}
        
        # Text-based features
        raw_text = parsed_data.get('raw_text', '')
        features['text_length'] = len(raw_text)
        features['word_count'] = len(raw_text.split())
        features['line_count'] = len(raw_text.split('\n'))
        
        # Experience features
        experience = parsed_data.get('experience', [])
        features['experience_count'] = len(experience)
        features['total_experience_mentions'] = sum(1 for exp in experience if exp.get('title'))
        
        # Education features
        education = parsed_data.get('education', [])
        features['education_count'] = len(education)
        features['degree_mentions'] = sum(1 for edu in education if edu.get('degree'))
        
        # Skills features
        skills = parsed_data.get('skills', [])
        features['skills_count'] = len(skills)
        features['technical_skills_count'] = len([s for s in skills if any(tech in s.lower() for tech in self.quality_indicators['technical_skills'])])
        
        # Personal info completeness
        personal_info = parsed_data.get('personal_info', {})
        features['contact_info_completeness'] = sum(1 for key in ['email', 'phone', 'name'] if personal_info.get(key))
        
        # Readability features
        readability = parsed_data.get('readability', {})
        features['flesch_reading_ease'] = readability.get('flesch_reading_ease', 0)
        features['gunning_fog'] = readability.get('gunning_fog', 0)
        
        # Metrics features
        metrics = parsed_data.get('metrics', [])
        features['quantifiable_achievements'] = len(metrics)
        
        return features
    
    def _classify_industry(self, parsed_data):
        """Classify resume into industry categories"""
        raw_text = parsed_data.get('raw_text', '').lower()
        industry_scores = {}
        
        for industry, keywords in self.industry_keywords.items():
            score = sum(1 for keyword in keywords if keyword in raw_text)
            industry_scores[industry] = score
        
        # Find top industries
        sorted_industries = sorted(industry_scores.items(), key=lambda x: x[1], reverse=True)
        
        return {
            'primary_industry': sorted_industries[0][0] if sorted_industries[0][1] > 0 else 'General',
            'industry_scores': dict(sorted_industries),
            'confidence': sorted_industries[0][1] / max(sum(industry_scores.values()), 1)
        }
    
    def _calculate_quality_score(self, parsed_data):
        """Calculate resume quality score using ML features"""
        raw_text = parsed_data.get('raw_text', '').lower()
        score_components = {}
        
        # Action words score (0-25 points)
        action_word_count = sum(1 for word in self.quality_indicators['action_words'] if word in raw_text)
        score_components['action_words'] = min(action_word_count * 3, 25)
        
        # Quantifiable results score (0-25 points)
        quantifiable_count = sum(1 for pattern in self.quality_indicators['quantifiable_results'] 
                                if re.search(pattern, raw_text))
        score_components['quantifiable_results'] = min(quantifiable_count * 5, 25)
        
        # Technical skills score (0-20 points)
        tech_skills = parsed_data.get('skills', [])
        tech_score = min(len(tech_skills) * 2, 20)
        score_components['technical_skills'] = tech_score
        
        # Experience depth score (0-15 points)
        experience = parsed_data.get('experience', [])
        exp_score = min(len(experience) * 3, 15)
        score_components['experience_depth'] = exp_score
        
        # Education score (0-10 points)
        education = parsed_data.get('education', [])
        edu_score = min(len(education) * 5, 10)
        score_components['education'] = edu_score
        
        # Contact completeness score (0-5 points)
        personal_info = parsed_data.get('personal_info', {})
        contact_score = sum(1 for key in ['email', 'phone', 'name'] if personal_info.get(key))
        score_components['contact_completeness'] = contact_score
        
        total_score = sum(score_components.values())
        
        return {
            'total_score': total_score,
            'components': score_components,
            'grade': self._score_to_grade(total_score)
        }
    
    def _analyze_skills(self, parsed_data):
        """Analyze skills using ML techniques"""
        skills = parsed_data.get('skills', [])
        
        if not skills:
            return {'skills_analysis': 'No skills detected'}
        
        # Categorize skills
        skill_categories = {
            'Technical': [],
            'Programming': [],
            'Frameworks': [],
            'Databases': [],
            'Cloud': [],
            'Soft Skills': []
        }
        
        # Categorization keywords
        categorization_map = {
            'Technical': ['software', 'hardware', 'system', 'network', 'security'],
            'Programming': ['python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'php', 'go', 'rust'],
            'Frameworks': ['react', 'angular', 'vue', 'django', 'flask', 'spring', 'express', 'bootstrap'],
            'Databases': ['mysql', 'postgresql', 'mongodb', 'oracle', 'sqlite', 'redis', 'elasticsearch'],
            'Cloud': ['aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'terraform'],
            'Soft Skills': ['leadership', 'communication', 'management', 'teamwork', 'problem solving']
        }
        
        for skill in skills:
            skill_lower = skill.lower()
            categorized = False
            for category, keywords in categorization_map.items():
                if any(keyword in skill_lower for keyword in keywords):
                    skill_categories[category].append(skill)
                    categorized = True
                    break
            if not categorized:
                skill_categories['Technical'].append(skill)
        
        # Calculate skill diversity
        diversity_score = len([cat for cat, skills_list in skill_categories.items() if skills_list]) / len(skill_categories)
        
        return {
            'skill_categories': skill_categories,
            'total_skills': len(skills),
            'diversity_score': diversity_score,
            'top_category': max(skill_categories.items(), key=lambda x: len(x[1]))[0]
        }
    
    def _analyze_experience(self, parsed_data):
        """Analyze work experience using ML"""
        experience = parsed_data.get('experience', [])
        
        if not experience:
            return {'experience_analysis': 'No experience detected'}
        
        # Analyze experience descriptions
        all_descriptions = ' '.join([exp.get('description', '') for exp in experience])
        
        # Count impact words
        impact_words = ['improved', 'increased', 'reduced', 'optimized', 'enhanced', 'streamlined', 'developed', 'created', 'led', 'managed']
        impact_count = sum(1 for word in impact_words if word in all_descriptions.lower())
        
        # Analyze job progression
        job_titles = [exp.get('title', '') for exp in experience]
        progression_indicators = ['senior', 'lead', 'principal', 'manager', 'director', 'head', 'chief']
        
        progression_score = 0
        for title in job_titles:
            title_lower = title.lower()
            for i, indicator in enumerate(progression_indicators):
                if indicator in title_lower:
                    progression_score += (i + 1) * 2
                    break
        
        return {
            'total_positions': len(experience),
            'impact_words_count': impact_count,
            'progression_score': progression_score,
            'avg_description_length': len(all_descriptions) / len(experience) if experience else 0,
            'has_leadership_experience': any(word in all_descriptions.lower() for word in ['led', 'managed', 'supervised', 'coordinated'])
        }
    
    def _analyze_education(self, parsed_data):
        """Analyze education using ML"""
        education = parsed_data.get('education', [])
        
        if not education:
            return {'education_analysis': 'No education detected'}
        
        # Degree level scoring
        degree_scores = {
            'phd': 10, 'doctorate': 10, 'ph.d': 10,
            'master': 8, 'mba': 8, 'm.s': 8, 'm.a': 8,
            'bachelor': 6, 'b.s': 6, 'b.a': 6,
            'associate': 4, 'diploma': 3, 'certificate': 2
        }
        
        total_education_score = 0
        highest_degree = 'Unknown'
        
        for edu in education:
            degree = edu.get('degree', '').lower()
            for degree_type, score in degree_scores.items():
                if degree_type in degree:
                    total_education_score = max(total_education_score, score)
                    if score > degree_scores.get(highest_degree.lower(), 0):
                        highest_degree = degree_type.title()
                    break
        
        return {
            'education_count': len(education),
            'highest_degree': highest_degree,
            'education_score': total_education_score,
            'has_relevant_education': total_education_score > 0
        }
    
    def _analyze_text_complexity(self, parsed_data):
        """Analyze text complexity using readability metrics"""
        readability = parsed_data.get('readability', {})
        text_analysis = parsed_data.get('text_analysis', {})
        
        # Complexity score based on multiple factors
        complexity_factors = {
            'readability': readability.get('flesch_reading_ease', 50),
            'vocabulary_richness': text_analysis.get('vocabulary_richness', 0.5) * 100,
            'avg_sentence_length': min(text_analysis.get('avg_sentence_length', 15), 25)
        }
        
        # Normalize scores (higher is better for our use case)
        normalized_score = (
            (100 - abs(complexity_factors['readability'] - 65)) / 100 * 40 +  # Optimal readability around 65
            complexity_factors['vocabulary_richness'] * 0.3 +
            (25 - complexity_factors['avg_sentence_length']) / 25 * 30
        )
        
        return {
            'complexity_score': min(max(normalized_score, 0), 100),
            'factors': complexity_factors,
            'assessment': 'Well-balanced' if 60 <= normalized_score <= 80 else 'Needs improvement'
        }
    
    def _analyze_keyword_relevance(self, parsed_data):
        """Analyze keyword relevance for ATS systems"""
        raw_text = parsed_data.get('raw_text', '').lower()
        
        # Common ATS keywords
        ats_keywords = [
            'experience', 'skills', 'education', 'achievements', 'results',
            'leadership', 'management', 'development', 'project', 'team',
            'analysis', 'communication', 'problem solving', 'innovation'
        ]
        
        keyword_density = {}
        total_words = len(raw_text.split())
        
        for keyword in ats_keywords:
            count = raw_text.count(keyword)
            density = (count / total_words) * 100 if total_words > 0 else 0
            keyword_density[keyword] = {
                'count': count,
                'density': round(density, 2)
            }
        
        # Calculate ATS compatibility score
        ats_score = min(sum(1 for kw, data in keyword_density.items() if data['count'] > 0) * 5, 100)
        
        return {
            'keyword_density': keyword_density,
            'ats_compatibility_score': ats_score,
            'total_keywords_found': sum(1 for kw, data in keyword_density.items() if data['count'] > 0)
        }
    
    def _generate_ml_recommendations(self, parsed_data):
        """Generate ML-based recommendations"""
        recommendations = []
        
        # Analyze features and provide recommendations
        features = self._extract_features(parsed_data)
        
        if features['quantifiable_achievements'] < 3:
            recommendations.append("Add more quantifiable achievements with specific numbers and percentages")
        
        if features['skills_count'] < 8:
            recommendations.append("Include more relevant technical and soft skills")
        
        if features['experience_count'] < 2:
            recommendations.append("Provide more detailed work experience descriptions")
        
        # Text quality recommendations
        text_analysis = parsed_data.get('text_analysis', {})
        if text_analysis.get('avg_sentence_length', 0) > 25:
            recommendations.append("Use shorter, more concise sentences for better readability")
        
        # Industry-specific recommendations
        industry_analysis = self._classify_industry(parsed_data)
        if industry_analysis['confidence'] < 0.3:
            recommendations.append("Focus on industry-specific keywords to improve relevance")
        
        return recommendations
    
    def _calculate_overall_ml_score(self, analysis):
        """Calculate overall ML-based score"""
        # Weight different components
        weights = {
            'quality_score': 0.3,
            'text_complexity': 0.2,
            'keyword_relevance': 0.2,
            'skills_analysis': 0.15,
            'experience_analysis': 0.1,
            'education_analysis': 0.05
        }
        
        scores = {}
        scores['quality_score'] = analysis.get('quality_score', {}).get('total_score', 0)
        scores['text_complexity'] = analysis.get('text_complexity', {}).get('complexity_score', 0)
        scores['keyword_relevance'] = analysis.get('keyword_relevance', {}).get('ats_compatibility_score', 0)
        
        # Normalize other scores to 100-point scale
        skills_analysis = analysis.get('skills_analysis', {})
        scores['skills_analysis'] = min(skills_analysis.get('total_skills', 0) * 5, 100)
        
        experience_analysis = analysis.get('experience_analysis', {})
        scores['experience_analysis'] = min(experience_analysis.get('total_positions', 0) * 20 + 
                                          experience_analysis.get('impact_words_count', 0) * 5, 100)
        
        education_analysis = analysis.get('education_analysis', {})
        scores['education_analysis'] = education_analysis.get('education_score', 0) * 10
        
        # Calculate weighted average
        overall_score = sum(scores[component] * weights[component] for component in weights)
        
        return round(min(overall_score, 100), 2)
    
    def _score_to_grade(self, score):
        """Convert numerical score to letter grade"""
        if score >= 90:
            return 'A'
        elif score >= 80:
            return 'B'
        elif score >= 70:
            return 'C'
        elif score >= 60:
            return 'D'
        else:
            return 'F'
