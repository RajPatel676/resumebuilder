import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
import google.generativeai as genai
from dotenv import load_dotenv
import logging

# Import our modules
from services.auth_service import AuthService
from services.resume_parser import ResumeParser
from services.ml_analyzer import MLAnalyzer
from services.gemini_service import GeminiService
from services.data_visualizer import DataVisualizer

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/resume_builder_ml')

# Initialize extensions
CORS(app, origins=['http://localhost:3000', 'http://localhost:8080'])
mongo = PyMongo(app)
jwt = JWTManager(app)

# Initialize services
auth_service = AuthService(mongo.db)
resume_parser = ResumeParser()
ml_analyzer = MLAnalyzer()
gemini_service = GeminiService(os.getenv('GEMINI_API_KEY'))
data_visualizer = DataVisualizer()

# Configure Google Gemini
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    logger.info("✅ Google Gemini API configured successfully")
else:
    logger.warning("⚠️ GEMINI_API_KEY not found in environment variables")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Test MongoDB connection
        mongo.db.command('ping')
        mongo_status = 'connected'
    except Exception as e:
        mongo_status = f'error: {str(e)}'
    
    return jsonify({
        'status': 'healthy',
        'services': {
            'mongodb': mongo_status,
            'gemini_api': 'configured' if GEMINI_API_KEY else 'not configured',
            'ml_models': 'ready'
        },
        'features': [
            'Resume Parsing',
            'ML Analysis',
            'Gemini AI Scoring',
            'Data Visualization',
            'Authentication'
        ]
    })

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration with validation"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'firstName', 'lastName']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        # Register user
        result = auth_service.register_user(data)
        
        if result['success']:
            # Create JWT token
            token = create_access_token(identity=str(result['user']['_id']))
            
            return jsonify({
                'success': True,
                'message': 'User registered successfully',
                'data': {
                    'user': {
                        'id': str(result['user']['_id']),
                        'username': result['user']['username'],
                        'email': result['user']['email'],
                        'firstName': result['user']['firstName'],
                        'lastName': result['user']['lastName']
                    },
                    'token': token
                }
            }), 201
        else:
            return jsonify(result), 400
            
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Registration failed',
            'error': str(e)
        }), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login with JWT token generation"""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'message': 'Email and password are required'
            }), 400
        
        # Authenticate user
        result = auth_service.authenticate_user(data['email'], data['password'])
        
        if result['success']:
            # Create JWT token
            token = create_access_token(identity=str(result['user']['_id']))
            
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'data': {
                    'user': {
                        'id': str(result['user']['_id']),
                        'username': result['user']['username'],
                        'email': result['user']['email'],
                        'firstName': result['user']['firstName'],
                        'lastName': result['user']['lastName']
                    },
                    'token': token
                }
            })
        else:
            return jsonify(result), 401
            
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Login failed',
            'error': str(e)
        }), 500

@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get user profile (protected route)"""
    try:
        user_id = get_jwt_identity()
        user = auth_service.get_user_by_id(user_id)
        
        if user:
            return jsonify({
                'success': True,
                'data': {
                    'user': {
                        'id': str(user['_id']),
                        'username': user['username'],
                        'email': user['email'],
                        'firstName': user['firstName'],
                        'lastName': user['lastName']
                    }
                }
            })
        else:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
            
    except Exception as e:
        logger.error(f"Profile error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to get profile',
            'error': str(e)
        }), 500

# Resume Analysis Routes (Protected)
@app.route('/api/resume/upload', methods=['POST'])
@jwt_required()
def upload_resume():
    """Upload and analyze resume with ML and Gemini AI"""
    try:
        user_id = get_jwt_identity()
        
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No file uploaded'
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                'success': False,
                'message': 'No file selected'
            }), 400
        
        # Parse resume
        logger.info(f"Parsing resume for user: {user_id}")
        parsed_data = resume_parser.parse_resume(file)
        
        if not parsed_data['success']:
            return jsonify(parsed_data), 400
        
        # Perform ML analysis
        logger.info("Performing ML analysis")
        ml_analysis = ml_analyzer.analyze_resume(parsed_data['data'])
        
        # Get Gemini AI analysis
        logger.info("Getting Gemini AI analysis")
        gemini_analysis = gemini_service.analyze_resume(parsed_data['data'])
        
        # Create comprehensive analysis
        comprehensive_analysis = {
            'user_id': user_id,
            'parsed_data': parsed_data['data'],
            'ml_analysis': ml_analysis,
            'gemini_analysis': gemini_analysis,
            'overall_score': calculate_overall_score(ml_analysis, gemini_analysis),
            'timestamp': str(datetime.utcnow())
        }
        
        # Save to database
        analysis_id = mongo.db.resume_analyses.insert_one(comprehensive_analysis).inserted_id
        
        return jsonify({
            'success': True,
            'message': 'Resume analyzed successfully',
            'data': {
                'analysis_id': str(analysis_id),
                'analysis': comprehensive_analysis
            }
        })
        
    except Exception as e:
        logger.error(f"Resume upload error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Resume analysis failed',
            'error': str(e)
        }), 500

@app.route('/api/resume/analyze/<analysis_id>', methods=['GET'])
@jwt_required()
def get_analysis(analysis_id):
    """Get detailed resume analysis"""
    try:
        user_id = get_jwt_identity()
        
        from bson import ObjectId
        analysis = mongo.db.resume_analyses.find_one({
            '_id': ObjectId(analysis_id),
            'user_id': user_id
        })
        
        if not analysis:
            return jsonify({
                'success': False,
                'message': 'Analysis not found'
            }), 404
        
        # Generate visualizations
        visualizations = data_visualizer.create_resume_visualizations(analysis)
        
        return jsonify({
            'success': True,
            'data': {
                'analysis': analysis,
                'visualizations': visualizations
            }
        })
        
    except Exception as e:
        logger.error(f"Get analysis error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to get analysis',
            'error': str(e)
        }), 500

@app.route('/api/resume/history', methods=['GET'])
@jwt_required()
def get_resume_history():
    """Get user's resume analysis history"""
    try:
        user_id = get_jwt_identity()
        
        analyses = list(mongo.db.resume_analyses.find(
            {'user_id': user_id},
            {'_id': 1, 'overall_score': 1, 'timestamp': 1}
        ).sort('timestamp', -1))
        
        return jsonify({
            'success': True,
            'data': {
                'analyses': analyses,
                'count': len(analyses)
            }
        })
        
    except Exception as e:
        logger.error(f"Resume history error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to get resume history',
            'error': str(e)
        }), 500

def calculate_overall_score(ml_analysis, gemini_analysis):
    """Calculate overall resume score from ML and Gemini analyses"""
    try:
        ml_score = ml_analysis.get('overall_score', 0)
        gemini_score = gemini_analysis.get('score', 0)
        
        # Weighted average (60% Gemini, 40% ML)
        overall_score = (gemini_score * 0.6 + ml_score * 0.4)
        return round(overall_score, 2)
    except:
        return 0

if __name__ == '__main__':
    # Import datetime here to avoid circular imports
    from datetime import datetime
    
    # Create uploads directory
    os.makedirs('uploads', exist_ok=True)
    
    logger.info("🚀 Starting Flask server with ML capabilities")
    logger.info("🔬 Features: Resume Analysis, ML Scoring, Gemini AI, Data Visualization")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
