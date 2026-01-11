# Wix App Setup & Deployment Guide

**Status**: Implementation-ready  
**Date**: January 11, 2026  
**Project**: Ulysse Ruff Williams Advisory

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20.11.0 or higher
- Git installed & configured
- Wix account (sign up at https://manage.wix.com/account/custom-apps)

### 1. Create New Wix App Project
```bash
npm create @wix/new@latest app
# When prompted:
# - Select "Create a new Wix App"
# - Enter app name (e.g., "Ulysse Advisory")
# - Enter folder name for your project
```

### 2. Authenticate with Wix
```bash
# This will open browser to authenticate
# The CLI will prompt you during app creation
cd <your-app-folder>
wix dev
# Select "Create a new Development Site" for testing
# Or select an existing site
```

### 3. Set Up Environment Variables
```bash
# Copy and fill in your credentials
cp .env.wix .env.local

# Edit .env.local with your actual values:
# - VITE_WIX_API_KEY (from Wix Developer Dashboard)
# - VITE_WIX_FUNCTIONS_BASE (your Wix site functions URL)
# - JWT_SECRET (generate: openssl rand -base64 32)
# - VITE_VERCEL_API_URL (Vercel deployment URL)
```

### 4. Deploy Velo Backend Functions
```bash
# Copy Velo functions to your Wix app backend
# 1. Open Wix Editor or use Wix CLI
# 2. Go to Backend > Code Files
# 3. Create new file (e.g., auth-functions.web.js)
# 4. Copy contents from backend/wix_http_functions.js
# 5. Deploy via Wix Editor or CLI:

npm run build    # Build your app
wix deploy       # Deploy to Wix
```

### 5. Install & Test
```bash
# Start local dev environment
wix dev
# Press Enter to open browser
# Install app on your test site
# Test registration/login on http://localhost:3000
```

---

## � Integration Strategy

### What is the Wix CLI App?
The `npm create @wix/new@latest app` creates a **business app** that:
- Runs in the Wix Apps Dashboard (for business owners/admins)
- Has backend (Node.js) for business logic
- Can access Wix APIs via built-in auth

### What About Your React Frontend?
Your existing React + Vite app (**this repo**) remains separate:
- **Wix CLI App** = Backend HTTP functions + Dashboard management
- **React App** = Client-facing frontend (kept as-is)
- **Connection** = Velo HTTP functions call your Vercel backend; React calls Velo functions

### Architecture Clarification
```
┌─────────────────────────────────────────────────────────┐
│ Your Current Setup (Unchanged)                          │
│ React App (Vite) → Vercel                              │
│ Services: api.ts (Flask) → wix-api.ts (New)            │
└─────────────────────────────────────────────────────────┘
                      ↓ (Calls)
┌─────────────────────────────────────────────────────────┐
│ New Wix Integration                                     │
│ - Velo HTTP Functions (auth, proxy)                    │
│ - CRM Event Handlers                                    │
│ - Optional: Dashboard for analytics                    │
└─────────────────────────────────────────────────────────┘
                      ↓ (Backend logic)
┌─────────────────────────────────────────────────────────┐
│ Vercel Backend (Flask)                                  │
│ - Business logic (ROI, legal, mining)                  │
│ - MongoDB integrations                                  │
└─────────────────────────────────────────────────────────┘
```

### Two Options for Wix Integration

#### Option 1: Use Wix CLI App (Recommended for B2B)
Best if you want Wix dashboard for admin features
```bash
npm create @wix/new@latest app
# Creates: Wix business app + Velo backend
# Deploy to: Wix platform
# React app: Calls Velo functions via wix-api.ts
```

#### Option 2: Keep React-Only + Velo Functions (Simpler)
Best if you don't need Wix dashboard, just want server-side auth
```bash
# Skip Wix CLI app creation
# Deploy wix_http_functions.js directly to Wix site
# React app: Calls Velo functions via wix-api.ts
# No additional dashboard needed
```

---

### Frontend (React + Vite)
```
src/
├── services/
│   ├── api.ts           # Original Flask backend (deprecated)
│   └── wix-api.ts       # NEW: Wix/Velo integration
├── components/
│   ├── LoginModal.tsx   # UPDATED: Uses wixLogin()
│   ├── SignupModal.tsx  # UPDATED: Uses wixRegister()
│   └── ...
└── pages/
    └── ...
```

### Backend (Wix Velo)
```
backend/
├── wix_http_functions.js    # HTTP functions to deploy to Wix
├── server.py                 # Legacy Flask (optional keep for reference)
└── ...
```

---

## 🔐 Authentication Flow (New)

```
┌─────────────────────────────────────────────────────────┐
│ 1. User Registration (React)                           │
│    → wixRegister(email, password)                       │
│    → POST /_functions/auth/register                     │
└────────────┬────────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Wix Velo Backend                                     │
│    → post_auth_register(request)                        │
│    → Hash password (bcrypt)                             │
│    → Create Wix Contact                                 │
│    → Issue JWT token                                    │
│    → Return { token, contact }                          │
└────────────┬────────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Frontend Stores Token                                │
│    → localStorage.setItem('token', data.token)          │
│    → Redirect to /client/dashboard                      │
└────────────┬────────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────────┐
│ 4. All Requests Include Token                           │
│    → Authorization: Bearer <token>                      │
│    → JWT verified on Wix side                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing

### Test Registration
```bash
# Option 1: Use browser
# 1. Open app
# 2. Click "Sign Up"
# 3. Enter test email & password
# 4. Should redirect to dashboard

# Option 2: Manual API call
curl -X POST http://localhost:5173/_functions/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!"}'
```

### Test Login
```bash
curl -X POST http://localhost:5173/_functions/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!"}'
```

### Verify CRM Event Handlers
```bash
# In Wix Editor > Backend > Logs
# Should see: "✅ Contact created: <id>"
# When a new contact is added
```

---

## 🚨 Common Issues & Fixes

### Issue: "WIX_FUNCTIONS_BASE not configured"
**Fix**: Set `VITE_WIX_FUNCTIONS_BASE` in `.env.local`
```
VITE_WIX_FUNCTIONS_BASE=https://ulysse-ruff-williams.wixsite.com/_functions
```

### Issue: CORS errors
**Fix**: Add your frontend domain to Wix CORS settings
```
Wix Editor > Settings > API & Extensions > CORS
Add: https://your-vercel-domain.vercel.app
```

### Issue: "Invalid JWT token"
**Fix**: Ensure `JWT_SECRET` matches between frontend and Wix backend
```bash
# Generate new secret
openssl rand -base64 32
# Update both .env.local and Wix backend environment
```

### Issue: Contact not created
**Fix**: Check Wix collection permissions
```
Wix Editor > CMS > Contacts > Permissions
- Logged-in members can create contacts
- Public can read (if needed)
```

---

## 📦 Deployment Checklist

### Pre-Deployment
- [ ] All environment variables filled in `.env.local`
- [ ] Wix site created and linked with `wix login`
- [ ] `wix_http_functions.js` deployed to Wix backend
- [ ] CRM event handlers in Wix Velo (`events.js`)
- [ ] Contacts collection created with custom fields
- [ ] Test registration/login locally

### Deployment
- [ ] Run `npm run build`
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Run `wix deploy` for Velo updates
- [ ] Verify environment variables on Vercel
- [ ] Test live URLs

### Post-Deployment
- [ ] Monitor error logs (Wix Editor > Logs)
- [ ] Test user registration/login on live site
- [ ] Verify JWT tokens work
- [ ] Check performance metrics
- [ ] Monitor for 24 hours before full launch

---

## 📚 Resources

- [Wix CLI Docs](https://dev.wix.com/docs/cli)
- [Wix HTTP Functions](https://dev.wix.com/docs/velo/api-reference/web-modules/http-functions)
- [Wix CRM Events](https://dev.wix.com/docs/velo/events-service-plugins/crm/events/introduction)
- [Wix Collections API](https://dev.wix.com/api/rest/wix-data/items)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)

---

## ✅ Next Steps

1. **Install Wix CLI**: `npm install -g @wix/cli`
2. **Authenticate**: `wix login`
3. **Link site**: `wix link` (or create new: `wix create --template velo`)
4. **Configure env**: Fill in `.env.wix` → copy to `.env.local`
5. **Deploy functions**: `wix deploy`
6. **Test locally**: `npm run dev`
7. **Deploy frontend**: `vercel --prod`

---

**Questions?** Check Wix developer docs or review the implementation guides in the repo.
