#!/bin/bash
# Start the Flask backend server

cd "$(dirname "$0")"

echo "🚀 Starting Flask Backend Server..."
echo "📁 Working directory: $(pwd)"

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Creating one..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📦 Installing dependencies..."
pip install -q -r requirements.txt

# Start the server
echo "✅ Starting Flask server on http://localhost:5000"
echo "API Documentation:"
echo "  - POST /api/auth/register - Register a new user"
echo "  - POST /api/auth/login - Login a user"
echo "  - GET /api/me - Get current user (requires token)"
echo ""

python server.py
