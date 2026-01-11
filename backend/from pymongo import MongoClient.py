from pymongo import MongoClient
from pymongo.errors import PyMongoError

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