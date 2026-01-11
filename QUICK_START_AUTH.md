# 🚀 Quick Start Guide

## Prerequisites
- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- MongoDB Atlas account (or local MongoDB)

## Frontend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## Backend Setup

### 1. Create Virtual Environment
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
Create `.env` file in backend directory:
```env
SECRET_KEY=your-secret-key
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=ulysse_cms
```

### 4. Start Backend Server
```bash
python server.py
```

Backend API available at: `http://localhost:5000`

## 🔐 First Time Setup - Create Admin User

### Step 1: Make sure backend is running
```bash
cd backend
bash start.sh
# In another terminal, do the next steps
```

### Step 2: Create admin user
```bash
cd backend
source venv/bin/activate
python create_admin_api.py
```

**Admin Credentials:**
- Email: `contact@tricode.pro`
- Password: `ChangeMe!`

## ✅ Verify Setup

### Frontend
1. Open `http://localhost:5173` in browser
2. Click "Login" or "Create Account" button
3. You should see the modal

### Backend
```bash
curl http://localhost:5000/api/services
```

### Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test12345"
  }'

# Login with admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contact@tricode.pro",
    "password": "ChangeMe!"
  }'
```

## 🗂️ Project Structure

```
ulysse-ruff-williams-advisory/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.tsx         # Main app
│   └── package.json
├── backend/
│   ├── server.py           # Flask app
│   ├── requirements.txt     # Python dependencies
│   ├── venv/               # Virtual environment
│   ├── .env                # Configuration
│   └── DATABASE_SETUP.md   # Database guide
└── README.md
```

## 🐛 Common Issues

### "Connection error" on signup
- Verify backend is running on `http://localhost:5000`
- Check CORS is enabled
- Look at browser console for details

### "User already exists"
- Email is registered in database
- Try different email or delete user

### Module not found (Python)
```bash
cd backend
pip install -r requirements.txt
```

### MongoDB connection error
- Check connection string in `.env`
- Verify network access in MongoDB Atlas
- Try without SSL for development

## 📊 Architecture

### Authentication Flow
```
User → Frontend Modal
↓
POST /api/auth/register or /api/auth/login
↓
Backend validates credentials
↓
Generate JWT token
↓
Frontend stores token in localStorage
↓
Token injected in all API requests
```

### Protected Routes
- Frontend: ProtectedRoute component checks localStorage token
- Backend: `@token_required` decorator validates JWT
- Frontend redirects to login if token missing

## 🎯 Next Steps

1. ✅ Backend running at `http://localhost:5000`
2. ✅ Frontend running at `http://localhost:5173`
3. ✅ Admin user created (`contact@tricode.pro` / `ChangeMe!`)
4. 📋 Test registration/login flow
5. 🚀 Deploy to production

## 📞 Support

For issues:
1. Check `backend/DATABASE_SETUP.md` for detailed docs
2. Review console logs (Frontend & Backend)
3. Check network requests in browser DevTools
4. Verify environment variables are set correctly

---

**Last Updated:** January 11, 2026
**Version:** 1.0
