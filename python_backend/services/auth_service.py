import bcrypt
from datetime import datetime
from bson import ObjectId
import re
import logging

logger = logging.getLogger(__name__)

class AuthService:
    def __init__(self, db):
        self.db = db
        self.users_collection = db.users
    
    def register_user(self, user_data):
        """Register a new user with validation"""
        try:
            # Validate email format
            if not self._validate_email(user_data['email']):
                return {
                    'success': False,
                    'message': 'Invalid email format'
                }
            
            # Validate password strength
            if not self._validate_password(user_data['password']):
                return {
                    'success': False,
                    'message': 'Password must be at least 6 characters long'
                }
            
            # Check if user already exists
            existing_user = self.users_collection.find_one({
                '$or': [
                    {'email': user_data['email'].lower()},
                    {'username': user_data['username'].lower()}
                ]
            })
            
            if existing_user:
                return {
                    'success': False,
                    'message': 'User with this email or username already exists'
                }
            
            # Hash password
            password_hash = bcrypt.hashpw(
                user_data['password'].encode('utf-8'),
                bcrypt.gensalt()
            )
            
            # Create user document
            user_doc = {
                'username': user_data['username'].lower(),
                'email': user_data['email'].lower(),
                'password_hash': password_hash,
                'firstName': user_data['firstName'],
                'lastName': user_data['lastName'],
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
                'is_active': True,
                'resume_count': 0
            }
            
            # Insert user
            result = self.users_collection.insert_one(user_doc)
            user_doc['_id'] = result.inserted_id
            
            logger.info(f"User registered successfully: {user_data['email']}")
            
            return {
                'success': True,
                'user': user_doc
            }
            
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return {
                'success': False,
                'message': 'Registration failed',
                'error': str(e)
            }
    
    def authenticate_user(self, email, password):
        """Authenticate user with email and password"""
        try:
            # Find user by email
            user = self.users_collection.find_one({
                'email': email.lower(),
                'is_active': True
            })
            
            if not user:
                return {
                    'success': False,
                    'message': 'Invalid email or password'
                }
            
            # Check password
            if bcrypt.checkpw(password.encode('utf-8'), user['password_hash']):
                # Update last login
                self.users_collection.update_one(
                    {'_id': user['_id']},
                    {'$set': {'last_login': datetime.utcnow()}}
                )
                
                logger.info(f"User authenticated successfully: {email}")
                
                return {
                    'success': True,
                    'user': user
                }
            else:
                return {
                    'success': False,
                    'message': 'Invalid email or password'
                }
                
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return {
                'success': False,
                'message': 'Authentication failed',
                'error': str(e)
            }
    
    def get_user_by_id(self, user_id):
        """Get user by ID"""
        try:
            user = self.users_collection.find_one({
                '_id': ObjectId(user_id),
                'is_active': True
            })
            return user
        except Exception as e:
            logger.error(f"Get user error: {str(e)}")
            return None
    
    def update_user_resume_count(self, user_id):
        """Increment user's resume count"""
        try:
            self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$inc': {'resume_count': 1}}
            )
        except Exception as e:
            logger.error(f"Update resume count error: {str(e)}")
    
    def _validate_email(self, email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def _validate_password(self, password):
        """Validate password strength"""
        return len(password) >= 6
