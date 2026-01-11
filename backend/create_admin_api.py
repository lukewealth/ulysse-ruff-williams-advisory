#!/usr/bin/env python3
"""
Create admin user by making HTTP request to the API
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def create_admin():
    admin_email = "contact@tricode.pro"
    admin_password = "ChangeMe!"
    
    print("📝 Creating admin user via API...")
    print(f"Email: {admin_email}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                'email': admin_email,
                'password': admin_password,
                'role': 'Admin'
            },
            timeout=10
        )
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print(f"✅ Admin user created successfully!")
            print(f"   Email: {admin_email}")
            print(f"   Password: {admin_password}")
            print(f"   Role: Admin")
            if 'token' in data:
                print(f"   Token: {data['token'][:30]}...")
            print("\nYou can now login with these credentials!")
            return True
        elif response.status_code == 409:
            print(f"⚠️  User already exists: {response.json()}")
            return False
        else:
            print(f"❌ Error: {response.json()}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to backend server")
        print("   Make sure the Flask server is running on http://localhost:5000")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    create_admin()
