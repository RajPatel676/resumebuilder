import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import base64
import io
import logging
from typing import Dict, List, Any
from wordcloud import WordCloud
import os

logger = logging.getLogger(__name__)

class DataVisualizer:
    def __init__(self):
        # Set style for matplotlib
        plt.style.use('seaborn-v0_8')
        sns.set_palette("husl")
        
        # Create output directory for visualizations
        self.output_dir = 'static/visualizations'
        os.makedirs(self.output_dir, exist_ok=True)
    
    def create_resume_visualizations(self, analysis_data):
        """Create comprehensive visualizations for resume analysis"""
        try:
            logger.info("Creating resume visualizations")
            
            visualizations = {}
            
            # Extract data from analysis
            ml_analysis = analysis_data.get('ml_analysis', {})
            gemini_analysis = analysis_data.get('gemini_analysis', {})
            parsed_data = analysis_data.get('parsed_data', {})
            
            # 1. Overall Score Visualization
            visualizations['score_chart'] = self._create_score_visualization(ml_analysis, gemini_analysis)
            
            # 2. Skills Analysis
            visualizations['skills_chart'] = self._create_skills_visualization(parsed_data.get('skills', []))
            
            # 3. Category Scores Radar Chart
            visualizations['radar_chart'] = self._create_radar_chart(gemini_analysis.get('category_scores', {}))
            
            # 4. Experience Timeline
            visualizations['timeline'] = self._create_experience_timeline(parsed_data.get('experience', []))
            
            # 5. Skills Word Cloud
            visualizations['wordcloud'] = self._create_skills_wordcloud(parsed_data.get('skills', []))
            
            # 6. Text Analysis Metrics
            visualizations['text_metrics'] = self._create_text_metrics_chart(parsed_data.get('text_analysis', {}))
            
            # 7. Industry Fit Analysis
            visualizations['industry_fit'] = self._create_industry_fit_chart(ml_analysis.get('industry_classification', {}))
            
            # 8. Improvement Areas
            visualizations['improvement_areas'] = self._create_improvement_chart(gemini_analysis.get('category_scores', {}))
            
            logger.info("Visualizations created successfully")
            return visualizations
            
        except Exception as e:
            logger.error(f"Visualization creation error: {str(e)}")
            return {'error': str(e)}
    
    def _create_score_visualization(self, ml_analysis, gemini_analysis):
        """Create overall score comparison visualization"""
        try:
            ml_score = ml_analysis.get('overall_score', 0)
            gemini_score = gemini_analysis.get('score', 0)
            overall_score = (ml_score + gemini_score) / 2
            
            # Create gauge-style chart using Plotly
            fig = go.Figure()
            
            # Add gauge for overall score
            fig.add_trace(go.Indicator(
                mode = "gauge+number+delta",
                value = overall_score,
                domain = {'x': [0, 1], 'y': [0, 1]},
                title = {'text': "Overall Resume Score"},
                delta = {'reference': 70},
                gauge = {
                    'axis': {'range': [None, 100]},
                    'bar': {'color': "darkblue"},
                    'steps': [
                        {'range': [0, 50], 'color': "lightgray"},
                        {'range': [50, 80], 'color': "gray"}],
                    'threshold': {
                        'line': {'color': "red", 'width': 4},
                        'thickness': 0.75,
                        'value': 90}
                }
            ))
            
            fig.update_layout(
                title="Resume Analysis Score",
                height=400,
                font={'size': 14}
            )
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Score visualization error: {str(e)}")
            return None
    
    def _create_skills_visualization(self, skills):
        """Create skills distribution visualization"""
        try:
            if not skills:
                return None
            
            # Categorize skills
            skill_categories = {
                'Programming': ['python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'php'],
                'Web Technologies': ['html', 'css', 'react', 'angular', 'vue', 'node.js'],
                'Databases': ['mysql', 'postgresql', 'mongodb', 'oracle', 'sqlite'],
                'Cloud & DevOps': ['aws', 'azure', 'docker', 'kubernetes', 'jenkins'],
                'Data Science': ['pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch'],
                'Other': []
            }
            
            # Categorize each skill
            categorized_skills = {category: 0 for category in skill_categories}
            
            for skill in skills:
                skill_lower = skill.lower()
                categorized = False
                for category, keywords in skill_categories.items():
                    if category != 'Other' and any(keyword in skill_lower for keyword in keywords):
                        categorized_skills[category] += 1
                        categorized = True
                        break
                if not categorized:
                    categorized_skills['Other'] += 1
            
            # Create pie chart
            fig = px.pie(
                values=list(categorized_skills.values()),
                names=list(categorized_skills.keys()),
                title="Skills Distribution by Category"
            )
            
            fig.update_layout(height=400)
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Skills visualization error: {str(e)}")
            return None
    
    def _create_radar_chart(self, category_scores):
        """Create radar chart for category scores"""
        try:
            if not category_scores:
                return None
            
            categories = list(category_scores.keys())
            values = list(category_scores.values())
            
            # Close the radar chart
            categories += [categories[0]]
            values += [values[0]]
            
            fig = go.Figure()
            
            fig.add_trace(go.Scatterpolar(
                r=values,
                theta=categories,
                fill='toself',
                name='Resume Scores'
            ))
            
            fig.update_layout(
                polar=dict(
                    radialaxis=dict(
                        visible=True,
                        range=[0, 100]
                    )),
                showlegend=True,
                title="Category Performance Radar Chart",
                height=500
            )
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Radar chart error: {str(e)}")
            return None
    
    def _create_experience_timeline(self, experience):
        """Create experience timeline visualization"""
        try:
            if not experience:
                return None
            
            # Extract timeline data
            timeline_data = []
            for i, exp in enumerate(experience):
                timeline_data.append({
                    'Position': exp.get('title', f'Position {i+1}'),
                    'Company': exp.get('company', 'Unknown'),
                    'Order': i
                })
            
            df = pd.DataFrame(timeline_data)
            
            fig = px.bar(
                df, 
                x='Order', 
                y='Position',
                title='Career Progression',
                labels={'Order': 'Chronological Order', 'Position': 'Job Titles'},
                orientation='h'
            )
            
            fig.update_layout(height=400)
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Timeline visualization error: {str(e)}")
            return None
    
    def _create_skills_wordcloud(self, skills):
        """Create word cloud from skills"""
        try:
            if not skills:
                return None
            
            # Create word frequency dictionary
            skills_text = ' '.join(skills)
            
            # Generate word cloud
            wordcloud = WordCloud(
                width=800, 
                height=400, 
                background_color='white',
                colormap='viridis',
                max_words=50
            ).generate(skills_text)
            
            # Convert to base64 for web display
            img_buffer = io.BytesIO()
            plt.figure(figsize=(10, 5))
            plt.imshow(wordcloud, interpolation='bilinear')
            plt.axis('off')
            plt.title('Skills Word Cloud')
            plt.tight_layout()
            plt.savefig(img_buffer, format='png', bbox_inches='tight', dpi=150)
            img_buffer.seek(0)
            
            img_base64 = base64.b64encode(img_buffer.read()).decode()
            plt.close()
            
            return {
                'type': 'image',
                'data': f"data:image/png;base64,{img_base64}"
            }
            
        except Exception as e:
            logger.error(f"Word cloud error: {str(e)}")
            return None
    
    def _create_text_metrics_chart(self, text_analysis):
        """Create text analysis metrics visualization"""
        try:
            if not text_analysis:
                return None
            
            metrics = {
                'Word Count': text_analysis.get('word_count', 0),
                'Unique Words': text_analysis.get('unique_words', 0),
                'Sentence Count': text_analysis.get('sentence_count', 0),
                'Avg Sentence Length': text_analysis.get('avg_sentence_length', 0)
            }
            
            fig = go.Figure()
            
            fig.add_trace(go.Bar(
                x=list(metrics.keys()),
                y=list(metrics.values()),
                text=list(metrics.values()),
                textposition='auto',
                name='Text Metrics'
            ))
            
            fig.update_layout(
                title='Resume Text Analysis Metrics',
                xaxis_title='Metrics',
                yaxis_title='Count',
                height=400
            )
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Text metrics chart error: {str(e)}")
            return None
    
    def _create_industry_fit_chart(self, industry_classification):
        """Create industry fit analysis chart"""
        try:
            if not industry_classification or 'industry_scores' not in industry_classification:
                return None
            
            industry_scores = industry_classification['industry_scores']
            
            # Get top 5 industries
            sorted_industries = sorted(industry_scores.items(), key=lambda x: x[1], reverse=True)[:5]
            
            industries = [item[0] for item in sorted_industries]
            scores = [item[1] for item in sorted_industries]
            
            fig = px.horizontal_bar(
                x=scores,
                y=industries,
                title='Industry Fit Analysis',
                labels={'x': 'Relevance Score', 'y': 'Industries'},
                orientation='h'
            )
            
            fig.update_layout(height=400)
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Industry fit chart error: {str(e)}")
            return None
    
    def _create_improvement_chart(self, category_scores):
        """Create improvement areas visualization"""
        try:
            if not category_scores:
                return None
            
            # Calculate improvement potential (100 - current score)
            improvement_data = {}
            for category, score in category_scores.items():
                improvement_potential = 100 - score
                improvement_data[category.replace('_', ' ').title()] = improvement_potential
            
            # Sort by improvement potential
            sorted_improvements = sorted(improvement_data.items(), key=lambda x: x[1], reverse=True)
            
            categories = [item[0] for item in sorted_improvements]
            improvements = [item[1] for item in sorted_improvements]
            
            fig = go.Figure()
            
            fig.add_trace(go.Bar(
                x=categories,
                y=improvements,
                text=[f"{imp:.1f}%" for imp in improvements],
                textposition='auto',
                name='Improvement Potential',
                marker_color='lightcoral'
            ))
            
            fig.update_layout(
                title='Areas for Improvement',
                xaxis_title='Categories',
                yaxis_title='Improvement Potential (%)',
                height=400,
                xaxis_tickangle=-45
            )
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Improvement chart error: {str(e)}")
            return None
    
    def create_comparison_chart(self, multiple_analyses):
        """Create comparison chart for multiple resume analyses"""
        try:
            if len(multiple_analyses) < 2:
                return None
            
            comparison_data = []
            for i, analysis in enumerate(multiple_analyses):
                comparison_data.append({
                    'Version': f'Version {i+1}',
                    'ML Score': analysis.get('ml_analysis', {}).get('overall_score', 0),
                    'AI Score': analysis.get('gemini_analysis', {}).get('score', 0),
                    'Overall': analysis.get('overall_score', 0)
                })
            
            df = pd.DataFrame(comparison_data)
            
            fig = px.line(
                df, 
                x='Version', 
                y=['ML Score', 'AI Score', 'Overall'],
                title='Resume Score Progression',
                markers=True
            )
            
            fig.update_layout(height=400)
            
            return fig.to_json()
            
        except Exception as e:
            logger.error(f"Comparison chart error: {str(e)}")
            return None
