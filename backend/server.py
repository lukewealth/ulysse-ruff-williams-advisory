import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
from datetime import datetime, timedelta
import json
import jwt
import bcrypt
from functools import wraps
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize rate limiter
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-default-secret-key')

# --- MongoDB setup ---
MONGODB_URI = os.getenv(
    'MONGODB_URI',
    'mongodb+srv://lukeokagha_db_user:S5irpzuDutKWnFOu@ulysseswilliams.gamdqzp.mongodb.net/?retryWrites=true&w=majority'
)
try:
    mongo_client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    db = mongo_client.get_database(os.getenv('MONGODB_DB', 'ulysse_cms'))
    users_collection = db['users']
    # Ensure email index for fast lookups
    users_collection.create_index('email', unique=True)
    print("Connected to MongoDB")
except PyMongoError as e:
    print(f"MongoDB connection error: {e}")
    mongo_client = None
    users_collection = None
# --- end MongoDB setup ---

# Mock database - in production, use a real database
USERS_DB = []

SERVICES_DB = [
    {
        'id': 'advisory',
        'title': 'Blockchain Advisory',
        'description': 'Technical due diligence and infrastructure assessment for institutional grade deployments.',
        'details': [
            'PoW / PoS systems validation',
            'Infrastructure risk assessment',
            'Governance framework design',
            'Protocol selection & strategy'
        ]
    },
    {
        'id': 'tokenization',
        'title': 'Tokenization Strategy',
        'description': 'Bridging the gap between physical assets and digital liquidity through RWA frameworks.',
        'details': [
            'Real World Asset (RWA) modeling',
            'Token economy design',
            'Regulatory-aware architectures',
            'Lifecycle management systems'
        ]
    },
    {
        'id': 'scaling',
        'title': 'Startup Capital Readiness',
        'description': 'Preparing high-growth Web3 ventures for institutional investment and global scale.',
        'details': [
            'Technical roadmap audit',
            'Pitch deck & strategy alignment',
            'Investor due diligence prep',
            'Operational scaling roadmaps'
        ]
    },
    {
        'id': 'consulting',
        'title': 'Web3 Infrastructure',
        'description': 'Designing resilient, scalable systems that power the next generation of finance.',
        'details': [
            'API-driven fintech integration',
            'Validator node operations',
            'Smart contract systems audit',
            'Network performance optimization'
        ]
    }
]

INSIGHTS_DB = [
    {
        'id': '1',
        'title': 'The Future of Institutional RWA Tokenization',
        'category': 'Investment',
        'date': 'Oct 24, 2024',
        'readTime': '8 min read',
        'excerpt': 'An in-depth analysis of how mining operations are stabilizing the ERCOT grid while adhering to new SEC guidelines.',
        'imageUrl': 'https://picsum.photos/seed/blockchain/800/600'
    },
    {
        'id': '2',
        'title': 'Regulatory Updates: Energy Compliance for Web3',
        'category': 'Strategy',
        'date': 'Oct 15, 2024',
        'readTime': '6 min read',
        'excerpt': 'Navigating the intersection of grid stability and proof-of-work in a rapidly evolving legislative landscape.',
        'imageUrl': 'https://picsum.photos/seed/finance/800/600'
    },
    {
        'id': '3',
        'title': 'Optimizing Validator Node Performance',
        'category': 'Blockchain',
        'date': 'Sep 28, 2024',
        'readTime': '12 min read',
        'excerpt': 'How VCs are valuing real-world asset tokenization protocols in the current market cycle.',
        'imageUrl': 'https://picsum.photos/seed/tech/800/600'
    }
]

CASE_STUDIES_DB = [
    {
        'id': '1',
        'title': 'Institutional Mining Operation Scaling',
        'description': 'Designing and validating infrastructure for 500MW mining operation in Texas',
        'industry': 'Infrastructure',
        'results': ['Grid compliance achieved', '99.9% uptime', '$50M+ capital deployed'],
        'imageUrl': 'https://picsum.photos/seed/mining/800/600',
    },
    {
        'id': '2',
        'title': 'RWA Tokenization Framework',
        'description': 'Building real-world asset tokenization protocol for $200M in physical commodities',
        'industry': 'Tokenization',
        'results': ['SEC compliance', 'Institutional grade', '2M+ monthly transactions'],
        'imageUrl': 'https://picsum.photos/seed/tokenization/800/600',
    }
]

TEAM_DB = [
    {
        'id': '1',
        'name': 'Ulysse Ruff Williams',
        'title': 'Principal Advisor',
        'bio': 'Blockchain infrastructure specialist with 10+ years experience',
        'imageUrl': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976',
        'expertise': ['Blockchain Infrastructure', 'Mining Operations', 'RWA Tokenization'],
        'social': {'linkedin': '#', 'email': 'ulysse@example.com'}
    }
]

# Auth decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            # Prefer MongoDB users collection; fallback to in-memory USERS_DB
            if users_collection:
                current_user = users_collection.find_one({'email': data.get('email')})
                if current_user and '_id' in current_user:
                    current_user['id'] = str(current_user['_id'])
            else:
                current_user = next((user for user in USERS_DB if user['email'] == data.get('email')), None)
        except Exception:
            return jsonify({'message' : 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Routes
@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})

# Auth routes
@app.route('/api/auth/register', methods=['POST'])
@limiter.limit("5 per hour")
def register():
    """Register a new user - Rate limited to 5 attempts per hour"""
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required!'}), 400

    # Check if user exists in MongoDB or USERS_DB
    if users_collection:
        if users_collection.find_one({'email': data['email']}):
            return jsonify({'message': 'User already exists!'}), 409
    else:
        if any(user['email'] == data['email'] for user in USERS_DB):
            return jsonify({'message': 'User already exists!'}), 409

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    new_user = {
        'email': data['email'],
        'password': hashed_password.decode('utf-8'),
        'role': data.get('role', 'Client'), # Default role is Client
        'created_at': datetime.utcnow()
    }
    
    if users_collection:
        result = users_collection.insert_one(new_user)
        new_user['id'] = str(result.inserted_id)
    else:
        new_user['id'] = str(len(USERS_DB) + 1)
        USERS_DB.append(new_user)
    
    # Generate token for new user
    token = jwt.encode({
        'email': new_user['email'],
        'role': new_user.get('role', 'Client'),
        'exp': datetime.utcnow() + timedelta(minutes=30)
    }, app.config['SECRET_KEY'])
    
    return jsonify({'message': 'New user created!', 'token': token}), 201

@app.route('/api/auth/login', methods=['POST'])
@limiter.limit("10 per hour")
def login():
    """Login a user - Rate limited to 10 attempts per hour"""
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400

    # Look up user in MongoDB or USERS_DB
    user = None
    if users_collection:
        user = users_collection.find_one({'email': data['email']})
    else:
        user = next((u for u in USERS_DB if u['email'] == data['email']), None)
    
    if not user:
        return jsonify({'message': 'Invalid email or password'}), 401

    if bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
        token = jwt.encode({
            'email': user['email'],
            'role': user.get('role', 'Client'),
            'exp' : datetime.utcnow() + timedelta(minutes=30)
        }, app.config['SECRET_KEY'])
        return jsonify({'token' : token})

    return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/api/me')
@token_required
def get_current_user(current_user):
    """Get current user"""
    if not current_user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(current_user)

# Services endpoints
@app.route('/api/services', methods=['GET'])
def get_services():
    """Get all services"""
    return jsonify(SERVICES_DB)

@app.route('/api/services/<service_id>', methods=['GET'])
def get_service(service_id):
    """Get single service by ID"""
    service = next((s for s in SERVICES_DB if s['id'] == service_id), None)
    if service:
        return jsonify(service)
    return jsonify({'error': 'Service not found'}), 404

@app.route('/api/services', methods=['POST'])
@token_required
def create_service(current_user):
    """Create new service"""
    if current_user['role'] != 'Admin':
        return jsonify({'message': 'Cannot perform that function!'}), 403
    data = request.json
    new_service = {
        'id': data.get('id', f"service_{len(SERVICES_DB) + 1}"),
        'title': data.get('title'),
        'description': data.get('description'),
        'details': data.get('details', [])
    }
    SERVICES_DB.append(new_service)
    return jsonify(new_service), 201

# Insights endpoints
@app.route('/api/insights', methods=['GET'])
def get_insights():
    """Get all insights"""
    return jsonify(INSIGHTS_DB)

@app.route('/api/insights/<insight_id>', methods=['GET'])
def get_insight(insight_id):
    """Get single insight by ID"""
    insight = next((i for i in INSIGHTS_DB if i['id'] == insight_id), None)
    if insight:
        return jsonify(insight)
    return jsonify({'error': 'Insight not found'}), 404

@app.route('/api/insights/category/<category>', methods=['GET'])
def get_insights_by_category(category):
    """Get insights by category"""
    insights = [i for i in INSIGHTS_DB if i['category'] == category]
    return jsonify(insights)

@app.route('/api/insights', methods=['POST'])
@token_required
def create_insight(current_user):
    """Create new insight"""
    if current_user['role'] != 'Admin':
        return jsonify({'message': 'Cannot perform that function!'}), 403
    data = request.json
    new_insight = {
        'id': str(len(INSIGHTS_DB) + 1),
        'title': data.get('title'),
        'category': data.get('category'),
        'date': datetime.now().strftime('%b %d, %Y'),
        'readTime': data.get('readTime', '5 min read'),
        'excerpt': data.get('excerpt'),
        'imageUrl': data.get('imageUrl')
    }
    INSIGHTS_DB.append(new_insight)
    return jsonify(new_insight), 201

# Case Studies endpoints
@app.route('/api/case-studies', methods=['GET'])
def get_case_studies():
    """Get all case studies"""
    return jsonify(CASE_STUDIES_DB)

@app.route('/api/case-studies/<case_id>', methods=['GET'])
def get_case_study(case_id):
    """Get single case study by ID"""
    case = next((c for c in CASE_STUDIES_DB if c['id'] == case_id), None)
    if case:
        return jsonify(case)
    return jsonify({'error': 'Case study not found'}), 404

# Team endpoints
@app.route('/api/team', methods=['GET'])
def get_team():
    """Get all team members"""
    return jsonify(TEAM_DB)

@app.route('/api/team/<member_id>', methods=['GET'])
def get_team_member(member_id):
    """Get single team member by ID"""
    member = next((m for m in TEAM_DB if m['id'] == member_id), None)
    if member:
        return jsonify(member)
    return jsonify({'error': 'Team member not found'}), 404

# Contact endpoint
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Submit contact form"""
    data = request.json
    # In production, save to database and send email
    print(f"Contact submission: {data}")
    return jsonify({'status': 'success', 'message': 'We will be in touch soon!'}), 201

# CMS Content endpoint
@app.route('/api/cms/content/<content_type>', methods=['GET'])
def get_cms_content(content_type):
    """Get CMS content by type"""
    content_map = {
        'services': SERVICES_DB,
        'insights': INSIGHTS_DB,
        'case-studies': CASE_STUDIES_DB,
        'team': TEAM_DB,
    }
    
    content = content_map.get(content_type)
    if content:
        return jsonify(content)
    return jsonify({'error': 'Content type not found'}), 404

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug, port=port, host='0.0.0.0')