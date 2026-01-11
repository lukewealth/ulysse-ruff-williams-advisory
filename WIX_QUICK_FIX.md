# 🔧 Quick Fix: Configure Wix Functions Base URL

**Problem**: `WIX_FUNCTIONS_BASE not configured` error on login  
**Solution**: Add your Wix site URL to `.env.local`  
**Time**: 2 minutes  

---

## ✅ Step 1: Update `.env.local`

Your `.env.local` has been updated with Wix configuration fields. Now you need to fill in your actual values:

```bash
# Edit .env.local and replace these with YOUR values:

VITE_WIX_FUNCTIONS_BASE=https://your-site-name.wixsite.com/_functions
JWT_SECRET=your-actual-jwt-secret
VITE_WIX_API_KEY=your-wix-api-key
VITE_VERCEL_API_URL=http://localhost:5000/api
```

---

## 📍 Step 2: Find Your Wix Functions Base URL

You have 3 options depending on your Wix setup:

### Option A: Using Wix Site (If you don't have HTTP functions deployed yet)
For **testing only** (won't work until you deploy functions to Wix):
```
VITE_WIX_FUNCTIONS_BASE=https://your-site-name.wixsite.com/_functions
```

Example: `https://ulysse-ruff-williams.wixsite.com/_functions`

### Option B: Using Wix CLI App
If you created a Wix CLI app:
```
npm create @wix/new@latest app
wix dev
# Look at browser URL to find your site URL
```

### Option C: Using Custom Domain
If you have a custom domain:
```
VITE_WIX_FUNCTIONS_BASE=https://www.your-domain.com/_functions
```

---

## 🔑 Step 3: Generate JWT Secret

```bash
# Terminal command:
openssl rand -base64 32

# Copy the output (32+ char string)
# Paste into .env.local:
JWT_SECRET=<your-generated-secret>
```

**IMPORTANT**: This JWT_SECRET must also be set in Wix backend environment variables with the same value.

---

## 📋 Step 4: Verify Your Configuration

Your `.env.local` should look like:

```bash
# Wix Integration
VITE_WIX_FUNCTIONS_BASE=https://ulysse-ruff-williams.wixsite.com/_functions
VITE_WIX_API_KEY=your-api-key-here
JWT_SECRET=gK8x9mP2nL5qR7vW1bZ3dFjH6tY4sU8xV2cE5nG9hK1mQ3rT6wJ8yL0pM2sO4uB
VITE_VERCEL_API_URL=http://localhost:5000/api

# Rest of config...
```

---

## ✨ Step 5: Restart Development Server

```bash
# Stop your dev server (Ctrl+C)
# Restart it to load new environment variables:
npm run dev
```

---

## 🧪 Step 6: Test Login Again

1. Open `http://localhost:5173`
2. Click "Sign Up"
3. Enter test email: `test@example.com`
4. Enter password: `TestPass123!`
5. Click "Create Account"
6. **Should redirect to `/dashboard`** ✅

---

## ❌ Still Getting Errors?

### Error: "WIX_FUNCTIONS_BASE not configured"
**Fix**: You didn't set `VITE_WIX_FUNCTIONS_BASE` in `.env.local`
```bash
# Check your .env.local has this line:
VITE_WIX_FUNCTIONS_BASE=https://your-site.wixsite.com/_functions
```

### Error: "404 on /_functions/auth/register"
**Cause**: HTTP functions not deployed to Wix yet  
**Fix**: 
1. Create Wix site
2. Deploy `backend/wix_http_functions.js` to Wix Backend
3. Restart dev server

### Error: "Network error / CORS"
**Fix**: The Wix functions are being called but might have issues:
1. Check Wix Editor > Backend > Logs for errors
2. Verify `backend/wix_http_functions.js` is deployed
3. Check JWT_SECRET matches between .env.local and Wix

### Error: "Invalid JWT token"
**Fix**: JWT_SECRET doesn't match
```bash
# Generate new secret:
openssl rand -base64 32

# Update both:
1. .env.local → VITE_WIX_FUNCTIONS_BASE
2. Wix Editor > Settings > Environment Variables → JWT_SECRET
# Use the SAME value in both places!
```

---

## 🚀 Next Steps

1. **Update `.env.local`** with your Wix site URL
2. **Restart dev server**: `npm run dev`
3. **Test signup/login** at http://localhost:5173
4. **If still failing**: Deploy `wix_http_functions.js` to Wix backend (see `OPTION_2_IMPLEMENTATION.md`)

---

## 📚 Full Setup Reference

For complete setup instructions, see:
- [OPTION_2_IMPLEMENTATION.md](./OPTION_2_IMPLEMENTATION.md) — Step-by-step 5-day deployment
- [WIX_SETUP_GUIDE.md](./WIX_SETUP_GUIDE.md) — Detailed Wix configuration
- [WIX_IMPLEMENTATION_COMPLETE.md](./WIX_IMPLEMENTATION_COMPLETE.md) — Full overview

---

**Questions?** Check if:
- ✅ `.env.local` has `VITE_WIX_FUNCTIONS_BASE` set
- ✅ Dev server restarted after .env changes
- ✅ Wix HTTP functions deployed to backend
- ✅ JWT_SECRET matches between .env and Wix
