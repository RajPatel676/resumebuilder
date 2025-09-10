#!/usr/bin/env python3
"""
Setup script for Resume Builder Python Backend
"""

import os
import sys
import subprocess
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def install_requirements():
    """Install Python requirements"""
    try:
        logger.info("Installing Python requirements...")
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        logger.info("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"❌ Failed to install requirements: {e}")
        return False

def setup_environment():
    """Setup environment variables"""
    env_file = '.env'
    env_example = '.env.example'
    
    if not os.path.exists(env_file) and os.path.exists(env_example):
        logger.info("Creating .env file from .env.example...")
        with open(env_example, 'r') as src, open(env_file, 'w') as dst:
            dst.write(src.read())
        logger.info("✅ .env file created")
        logger.warning("⚠️  Please update .env file with your actual API keys")
    else:
        logger.info("📄 .env file already exists")

def create_directories():
    """Create necessary directories"""
    directories = ['uploads', 'static', 'static/visualizations', 'models']
    
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            logger.info(f"📁 Created directory: {directory}")
        else:
            logger.info(f"📁 Directory exists: {directory}")

def check_mongodb():
    """Check if MongoDB is available"""
    try:
        import pymongo
        client = pymongo.MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000)
        client.server_info()
        logger.info("✅ MongoDB is running and accessible")
        return True
    except Exception as e:
        logger.warning(f"⚠️  MongoDB not accessible: {e}")
        logger.info("💡 Install and start MongoDB or use a cloud MongoDB service")
        return False

def download_nltk_data():
    """Download required NLTK data"""
    try:
        import nltk
        logger.info("Downloading NLTK data...")
        
        downloads = ['punkt', 'stopwords', 'averaged_perceptron_tagger', 'maxent_ne_chunker', 'words']
        for item in downloads:
            try:
                nltk.data.find(f'tokenizers/{item}' if item == 'punkt' else 
                              f'corpora/{item}' if item in ['stopwords', 'words'] else 
                              f'taggers/{item}' if item == 'averaged_perceptron_tagger' else
                              f'chunkers/{item}')
                logger.info(f"✅ NLTK {item} already available")
            except LookupError:
                logger.info(f"📥 Downloading NLTK {item}...")
                nltk.download(item, quiet=True)
                
        logger.info("✅ NLTK data ready")
        return True
    except Exception as e:
        logger.error(f"❌ NLTK data download failed: {e}")
        return False

def main():
    """Main setup function"""
    logger.info("🚀 Setting up Resume Builder Python Backend")
    logger.info("=" * 50)
    
    # Change to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Setup steps
    steps = [
        ("Installing requirements", install_requirements),
        ("Setting up environment", setup_environment),
        ("Creating directories", create_directories),
        ("Checking MongoDB", check_mongodb),
        ("Downloading NLTK data", download_nltk_data)
    ]
    
    success_count = 0
    for step_name, step_func in steps:
        logger.info(f"📋 {step_name}...")
        if step_func():
            success_count += 1
        logger.info("-" * 30)
    
    logger.info("=" * 50)
    logger.info(f"🎯 Setup completed: {success_count}/{len(steps)} steps successful")
    
    if success_count == len(steps):
        logger.info("🎉 All setup steps completed successfully!")
        logger.info("📝 Next steps:")
        logger.info("   1. Update .env file with your Gemini API key")
        logger.info("   2. Start the backend: python app.py")
        logger.info("   3. Test the API: http://localhost:5000/api/health")
    else:
        logger.warning("⚠️  Some setup steps failed. Please review the errors above.")
    
    return success_count == len(steps)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        logger.info("\n🛑 Setup interrupted by user")
        sys.exit(1)
    except Exception as e:
        logger.error(f"❌ Setup failed with error: {e}")
        sys.exit(1)
