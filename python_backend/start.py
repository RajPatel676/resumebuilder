#!/usr/bin/env python3
"""
Startup script for Resume Builder Python Backend
"""

import os
import sys
import logging
from app import app

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def check_environment():
    """Check if environment is properly configured"""
    required_env = ['GEMINI_API_KEY']
    missing_env = []
    
    for env_var in required_env:
        if not os.getenv(env_var):
            missing_env.append(env_var)
    
    if missing_env:
        logger.warning(f"⚠️  Missing environment variables: {', '.join(missing_env)}")
        logger.info("💡 Update .env file with your API keys")
        logger.info("🤖 Gemini API key can be obtained from: https://makersuite.google.com/app/apikey")
        return False
    
    logger.info("✅ Environment variables configured")
    return True

def main():
    """Main startup function"""
    logger.info("🚀 Starting Resume Builder Python Backend")
    logger.info("=" * 60)
    
    # Check environment
    if not check_environment():
        logger.warning("⚠️  Starting with missing environment variables")
        logger.info("🔧 Some features may not work properly")
    
    # Display startup information
    logger.info("🔗 Backend Features:")
    logger.info("   • User Authentication (JWT)")
    logger.info("   • Resume Parsing (PDF/DOCX)")
    logger.info("   • Machine Learning Analysis")
    logger.info("   • Google Gemini AI Integration")
    logger.info("   • Data Visualization")
    logger.info("   • MongoDB Integration")
    
    logger.info("📡 API Endpoints:")
    logger.info("   • Health Check: http://localhost:5000/api/health")
    logger.info("   • Authentication: http://localhost:5000/api/auth/*")
    logger.info("   • Resume Analysis: http://localhost:5000/api/resume/*")
    
    logger.info("=" * 60)
    
    # Start the Flask application
    try:
        logger.info("🌐 Starting Flask server on http://localhost:5000")
        app.run(
            debug=True,
            host='0.0.0.0',
            port=5000,
            threaded=True
        )
    except KeyboardInterrupt:
        logger.info("\n🛑 Server stopped by user")
    except Exception as e:
        logger.error(f"❌ Server failed to start: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
