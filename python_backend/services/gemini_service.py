import google.generativeai as genai
import json
import logging
from typing import Dict, Any
import time

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self, api_key):
        self.api_key = api_key
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-pro')
        else:
            self.model = None
            logger.warning("Gemini API key not provided")
    
    def analyze_resume(self, parsed_data):
        """Analyze resume using Google Gemini AI"""
        if not self.model:
            return {
                'error': 'Gemini API not configured',
                'score': 0,
                'feedback': 'Gemini AI analysis unavailable'
            }
        
        try:
            logger.info("Starting Gemini AI analysis")
            
            # Prepare prompt for comprehensive analysis
            prompt = self._create_analysis_prompt(parsed_data)
            
            # Get Gemini response with retry logic
            response = self._get_gemini_response(prompt)
            
            if response:
                # Parse the structured response
                analysis = self._parse_gemini_response(response)
                logger.info(f"Gemini analysis completed with score: {analysis.get('score', 0)}")
                return analysis
            else:
                return {
                    'error': 'Failed to get response from Gemini',
                    'score': 0,
                    'feedback': 'AI analysis unavailable'
                }
                
        except Exception as e:
            logger.error(f"Gemini analysis error: {str(e)}")
            return {
                'error': str(e),
                'score': 0,
                'feedback': 'AI analysis failed due to technical error'
            }
    
    def _create_analysis_prompt(self, parsed_data):
        """Create comprehensive analysis prompt for Gemini"""
        raw_text = parsed_data.get('raw_text', '')
        personal_info = parsed_data.get('personal_info', {})
        education = parsed_data.get('education', [])
        experience = parsed_data.get('experience', [])
        skills = parsed_data.get('skills', [])
        metrics = parsed_data.get('metrics', [])
        
        prompt = f"""
You are an expert resume reviewer and career coach with extensive experience in hiring across multiple industries. 
Please analyze this resume comprehensively and provide detailed feedback.

RESUME DATA:
=============

PERSONAL INFORMATION:
{json.dumps(personal_info, indent=2)}

EDUCATION:
{json.dumps(education, indent=2)}

WORK EXPERIENCE:
{json.dumps(experience, indent=2)}

SKILLS:
{json.dumps(skills, indent=2)}

QUANTIFIABLE ACHIEVEMENTS:
{json.dumps(metrics, indent=2)}

FULL RESUME TEXT:
{raw_text[:3000]}  # Limit to avoid token limits

ANALYSIS REQUIREMENTS:
=====================

Please provide a comprehensive analysis in the following JSON format:

{{
    "overall_score": <number between 0-100>,
    "category_scores": {{
        "content_quality": <0-100>,
        "structure_format": <0-100>,
        "skills_relevance": <0-100>,
        "experience_depth": <0-100>,
        "achievements_impact": <0-100>,
        "ats_compatibility": <0-100>
    }},
    "strengths": [
        "List specific strengths found in the resume",
        "Include concrete examples"
    ],
    "weaknesses": [
        "List areas for improvement",
        "Be specific and actionable"
    ],
    "detailed_feedback": {{
        "content": "Detailed feedback on content quality and relevance",
        "structure": "Feedback on resume structure and formatting",
        "impact": "Feedback on achievement presentation and quantification",
        "keywords": "Feedback on keyword usage and ATS optimization"
    }},
    "recommendations": [
        "Specific, actionable recommendations for improvement",
        "Prioritized by impact"
    ],
    "industry_fit": {{
        "primary_industry": "Most suitable industry based on resume",
        "alternative_industries": ["Other suitable industries"],
        "industry_specific_advice": "Advice for target industry"
    }},
    "missing_elements": [
        "Key elements missing from the resume",
        "Important sections that should be added"
    ],
    "keyword_analysis": {{
        "strong_keywords": ["Keywords that stand out positively"],
        "missing_keywords": ["Important keywords that are missing"],
        "ats_score": <0-100>
    }},
    "career_level_assessment": {{
        "experience_level": "Entry/Mid/Senior/Executive",
        "career_progression": "Assessment of career progression shown",
        "leadership_indicators": "Evidence of leadership and growth"
    }},
    "competitive_advantage": [
        "Unique selling points identified",
        "Differentiators from other candidates"
    ]
}}

EVALUATION CRITERIA:
===================

1. CONTENT QUALITY (25%):
   - Relevance of experience to career goals
   - Quality of job descriptions and achievements
   - Professional language and tone

2. STRUCTURE & FORMAT (20%):
   - Clear organization and flow
   - Appropriate use of sections
   - Professional presentation

3. SKILLS RELEVANCE (15%):
   - Technical skills alignment with industry
   - Soft skills demonstration
   - Skill diversity and depth

4. EXPERIENCE DEPTH (20%):
   - Progression and growth shown
   - Responsibility levels
   - Duration and consistency

5. ACHIEVEMENTS IMPACT (15%):
   - Quantifiable results and metrics
   - Business impact demonstration
   - Problem-solving examples

6. ATS COMPATIBILITY (5%):
   - Keyword optimization
   - Format compatibility
   - Scanning friendliness

Please be thorough, specific, and constructive in your analysis. Focus on actionable feedback that will help improve the resume's effectiveness.

Respond ONLY with the JSON format specified above.
"""
        
        return prompt
    
    def _get_gemini_response(self, prompt, max_retries=3):
        """Get response from Gemini with retry logic"""
        for attempt in range(max_retries):
            try:
                logger.info(f"Gemini API attempt {attempt + 1}")
                
                response = self.model.generate_content(
                    prompt,
                    generation_config=genai.types.GenerationConfig(
                        temperature=0.3,
                        max_output_tokens=4000,
                    )
                )
                
                if response and response.text:
                    return response.text
                else:
                    logger.warning(f"Empty response from Gemini on attempt {attempt + 1}")
                    
            except Exception as e:
                logger.error(f"Gemini API error on attempt {attempt + 1}: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                
        return None
    
    def _parse_gemini_response(self, response_text):
        """Parse and validate Gemini response"""
        try:
            # Try to extract JSON from the response
            response_text = response_text.strip()
            
            # Remove any markdown formatting
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            # Parse JSON
            analysis = json.loads(response_text)
            
            # Validate required fields and provide defaults
            validated_analysis = {
                'score': analysis.get('overall_score', 0),
                'category_scores': analysis.get('category_scores', {}),
                'strengths': analysis.get('strengths', []),
                'weaknesses': analysis.get('weaknesses', []),
                'detailed_feedback': analysis.get('detailed_feedback', {}),
                'recommendations': analysis.get('recommendations', []),
                'industry_fit': analysis.get('industry_fit', {}),
                'missing_elements': analysis.get('missing_elements', []),
                'keyword_analysis': analysis.get('keyword_analysis', {}),
                'career_level_assessment': analysis.get('career_level_assessment', {}),
                'competitive_advantage': analysis.get('competitive_advantage', []),
                'ai_provider': 'Google Gemini Pro',
                'analysis_timestamp': time.time()
            }
            
            return validated_analysis
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse Gemini JSON response: {str(e)}")
            # Fallback: create a basic analysis from text
            return self._create_fallback_analysis(response_text)
        except Exception as e:
            logger.error(f"Error processing Gemini response: {str(e)}")
            return self._create_fallback_analysis(response_text)
    
    def _create_fallback_analysis(self, response_text):
        """Create a fallback analysis when JSON parsing fails"""
        # Extract basic insights from the text response
        basic_score = 70  # Default middle score
        
        # Try to extract some insights from the text
        feedback_text = response_text[:1000] if response_text else "Analysis completed but formatting was incomplete."
        
        return {
            'score': basic_score,
            'category_scores': {
                'content_quality': basic_score,
                'structure_format': basic_score,
                'skills_relevance': basic_score,
                'experience_depth': basic_score,
                'achievements_impact': basic_score,
                'ats_compatibility': basic_score
            },
            'strengths': ['Resume analysis completed'],
            'weaknesses': ['Detailed analysis formatting needs improvement'],
            'detailed_feedback': {
                'content': feedback_text,
                'structure': 'Analysis available in text format',
                'impact': 'Review quantifiable achievements',
                'keywords': 'Consider industry-specific keywords'
            },
            'recommendations': [
                'Review resume for quantifiable achievements',
                'Ensure industry-relevant keywords are included',
                'Optimize structure for ATS systems'
            ],
            'industry_fit': {
                'primary_industry': 'Technology',
                'alternative_industries': ['Business', 'Consulting'],
                'industry_specific_advice': 'Focus on technical skills and measurable results'
            },
            'missing_elements': ['Specific analysis pending'],
            'keyword_analysis': {
                'strong_keywords': ['Professional skills detected'],
                'missing_keywords': ['Industry-specific terms'],
                'ats_score': basic_score
            },
            'career_level_assessment': {
                'experience_level': 'Professional',
                'career_progression': 'Assessment in progress',
                'leadership_indicators': 'Review leadership examples'
            },
            'competitive_advantage': ['Unique qualifications identified'],
            'ai_provider': 'Google Gemini Pro (Fallback)',
            'analysis_timestamp': time.time(),
            'note': 'This is a fallback analysis due to response formatting issues'
        }
    
    def get_career_suggestions(self, parsed_data, target_role=None):
        """Get career suggestions and improvements from Gemini"""
        if not self.model:
            return {'error': 'Gemini API not configured'}
        
        try:
            target_info = f"\nTARGET ROLE: {target_role}" if target_role else ""
            
            prompt = f"""
Based on this resume analysis, provide specific career advice and improvement suggestions:

RESUME SUMMARY:
Skills: {parsed_data.get('skills', [])}
Experience: {len(parsed_data.get('experience', []))} positions
Education: {len(parsed_data.get('education', []))} entries
{target_info}

Please provide:
1. Career progression opportunities
2. Skills gaps to address
3. Industry recommendations
4. Networking suggestions
5. Professional development priorities

Respond in JSON format with actionable advice.
"""
            
            response = self._get_gemini_response(prompt)
            if response:
                return {'suggestions': response}
            else:
                return {'error': 'Failed to generate career suggestions'}
                
        except Exception as e:
            logger.error(f"Career suggestions error: {str(e)}")
            return {'error': str(e)}
