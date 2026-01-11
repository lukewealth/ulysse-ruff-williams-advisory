# 🌐 CORS & Deployment Configuration Guide

## ❌ The Problem You're Experiencing

Your Vercel-deployed frontend is trying to reach `localhost:5000`:
- **Frontend:** `https://ulysse-ruff-williams-advisory.vercel.app` (Vercel)
- **Backend:** `http://localhost:5000` (Your local machine)
- **Issue:** Localhost is NOT accessible from the internet!

```
Browser (on Vercel) ❌ Cannot reach → localhost:5000 (your computer)
```

## ✅ The Solution

### Option 1: Local Development Only (Quick Fix)

For testing locally, both frontend and backend on your machine:

```bash
# Terminal 1: Start Backend
cd backend
bash start.sh

# Terminal 2: Start Frontend  
npm run dev
```

Access frontend at: `http://localhost:5173`
Both talk to backend at: `http://localhost:5000`

### Option 2: Deploy Backend & Update Frontend (Production)

**Step 1: Deploy Backend**

Choose one of these services:
- **Heroku** (easy, free tier)
- **Railway** (modern, free tier)
- **Render** (easy, free tier)
- **AWS Elastic Beanstalk** (scalable)
- **DigitalOcean App Platform** (affordable)
- **PythonAnywhere** (Python-specific)

Example with **Railway**:
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Create new project
cd backend
railway init

# 4. Add environment variables
railway variable add SECRET_KEY=your-secret
railway variable add MONGODB_URI=your-mongodb-uri

# 5. Deploy
railway up
```

Your backend will get a public URL like: `https://your-backend.up.railway.app`

**Step 2: Update Vercel Environment Variables**

Go to Vercel Project Settings:
1. Go to https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Add: `VITE_API_BASE_URL=https://your-backend.up.railway.app/api`
5. Redeploy

### Option 3: Deploy Both Frontend & Backend Together

Use **Docker** to containerize both and deploy to:
- AWS ECS
- Google Cloud Run
- DigitalOcean
- Heroku

## 🔧 Backend CORS Configuration

Your backend (`server.py`) already has CORS enabled:

```python
from flask_cors import CORS
CORS(app)
```

This allows requests from ANY origin. For production, restrict it:

```python
CORS(app, origins=['https://ulysse-ruff-williams-advisory.vercel.app'])
```

## 📝 Environment Variables

### Frontend (.env files)

**`.env.local`** (Your machine)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**`.env.development`** (Development)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**`.env.production`** (Production)
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### Backend (.env file)

```env
SECRET_KEY=your-secret-key
MONGODB_URI=mongodb+srv://...
MONGODB_DB=ulysse_cms
FLASK_ENV=production
PORT=5000
```

## 🚀 Quick Deploy Path

### For Testing Now:
1. Start backend locally: `cd backend && bash start.sh`
2. Start frontend locally: `npm run dev`
3. Test at: `http://localhost:5173`

### For Production:
1. Deploy backend to Railway/Render/Heroku
2. Get public backend URL (e.g., `https://app.railway.app`)
3. Set `VITE_API_BASE_URL` in Vercel environment
4. Redeploy frontend on Vercel

## 📊 Architecture After Deployment

```
┌─────────────────────────────────────┐
│  User Browser                       │
│  https://ulysse-ruff-williams-...   │
└──────────────┬──────────────────────┘
               │
               ├─→ Static Files (HTML/JS/CSS)
               │   Vercel CDN ✅
               │
               └─→ API Requests
                   https://your-backend.up.railway.app/api ✅
```

## 🔗 Testing API Connectivity

After deploying backend, test with:

```bash
# Get services
curl https://your-backend.up.railway.app/api/services

# Login
curl -X POST https://your-backend.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"contact@tricode.pro","password":"ChangeMe!"}'
```

## ⚠️ Common Mistakes

### ❌ Wrong
```
VITE_API_BASE_URL=localhost:5000
VITE_API_BASE_URL=http://127.0.0.1:5000
```

### ✅ Correct (Production)
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### ✅ Correct (Local)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🎯 Recommended Next Steps

1. **For Testing**: Keep backend local, use `.env.local`
2. **For Staging**: Deploy backend to Railway for testing
3. **For Production**: 
   - Deploy backend to production server
   - Update Vercel `VITE_API_BASE_URL`
   - Test end-to-end

## 📞 Backend Deployment Services Comparison

| Service | Free Tier | Ease | Startup Time |
|---------|-----------|------|--------------|
| Railway | Yes | ⭐⭐⭐ | 5 min |
| Render | Yes | ⭐⭐⭐ | 5 min |
| Heroku | Limited | ⭐⭐⭐ | 10 min |
| PythonAnywhere | Yes | ⭐⭐ | 15 min |
| AWS | Yes (free tier) | ⭐ | 30 min |

**Recommendation:** Use **Railway** or **Render** for quickest setup.

---

**Key Takeaway:**
- Local: Backend on your computer = `localhost:5000` ✅
- Deployed: Backend on internet = `https://your-domain.com` ✅
- Vercel can't reach `localhost` from internet ❌
