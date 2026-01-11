#!/usr/bin/env python3
"""
Script to create an admin user in MongoDB
Email: contact@tricode.pro
Password: ChangeMe!
"""

import os
import sys
import bcrypt
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
MONGODB_URI = os.getenv(
    'MONGODB_URI',
    'mongodb+srv://lukeokagha_db_user:S5irpzuDutKWnFOu@ulysseswilliams.gamdqzp.mongodb.net/?retryWrites=true&w=majority'
)

try:
    print("🔗 Connecting to MongoDB...")
    mongo_client = MongoClient(
        MONGODB_URI, 
        serverSelectionTimeoutMS=10000,
        tlsAllowInvalidCertificates=True,
        tlsCAFile=None
    )
    db = mongo_client.get_database(os.getenv('MONGODB_DB', 'ulysse_cms'))
    users_collection = db['users']
    
    # Ensure email index
    users_collection.create_index('email', unique=True)
    print("✅ Connected to MongoDB")
    
    # Admin credentials
    admin_email = "contact@tricode.pro"
    admin_password = "ChangeMe!"
    
    # Check if admin already exists
    existing_admin = users_collection.find_one({'email': admin_email})
    if existing_admin:
        print(f"⚠️  Admin user with email '{admin_email}' already exists")
        print(f"   ID: {existing_admin.get('_id')}")
        print(f"   Created: {existing_admin.get('created_at')}")
        sys.exit(0)
    
    # Hash password
    hashed_password = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())
    
    # Create admin user
    admin_user = {
        'email': admin_email,
        'password': hashed_password.decode('utf-8'),
        'role': 'Admin',
        'is_admin': True,
        'created_at': datetime.utcnow()
    }
    
    result = users_collection.insert_one(admin_user)
    
    print(f"✅ Admin user created successfully!")
    print(f"   Email: {admin_email}")
    print(f"   Password: {admin_password}")
    print(f"   Role: Admin")
    print(f"   ID: {result.inserted_id}")
    print(f"   Created: {admin_user['created_at']}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
finally:
    if mongo_client:
        mongo_client.close()
        print("🔌 MongoDB connection closed")
