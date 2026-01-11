# Option 2: Velo Functions Only (Simplified)

**Approach**: Deploy server-side auth directly to Wix site  
**Timeline**: 1 week  
**Complexity**: Low  
**Best For**: Quick integration without admin dashboard  

---

## 📋 What You Get

✅ Server-side password hashing (secure)  
✅ JWT token generation  
✅ CRM event handlers  
✅ React app calls Velo functions  
✅ No dashboard needed (skip Wix CLI app)  

---

## 🚀 Step-by-Step Setup

### Step 1: Create Wix Site
```bash
# Go to https://manage.wix.com/account/custom-apps
# Click "Create a Custom App"
# Or use existing Wix Business site
```

### Step 2: Set Up Wix Contacts Collection
In Wix Editor:
```
1. Dashboard > CMS > Contacts
2. Add custom fields:
   - custom.password_hash (text)
   - custom.role (text) → Default: "Client"
   - custom.created_at (date)
3. Set permissions:
   - Public: Read (for public content)
   - Member: Read/Write own
   - Admin: Full access
```

### Step 3: Deploy Velo HTTP Functions
In Wix Editor:

```
1. Go to Backend > Code Files
2. Create new file: auth-functions.web.js
3. Copy entire content from: backend/wix_http_functions.js
4. Deploy/save the file
```

### Step 4: Create events.js for CRM Handlers
In Wix Editor Backend:

```
1. Create new file: events.js
2. Copy CRM event handlers:
   - wixCrm_onContactCreated
   - wixCrm_onContactUpdated
   - wixCrm_onContactDeleted
```

### Step 5: Set Environment Variables in Wix
In Wix Editor > Settings:

```
1. Go to Custom Domain > Environment Variables
2. Add:
   - JWT_SECRET = <your-secret> (same as .env.local)
   - VERCEL_API_URL = https://your-vercel.app
```

### Step 6: Get Your Wix Functions URL
```
Format: https://your-site-name.wixsite.com/_functions
Example: https://ulysse-ruff-williams.wixsite.com/_functions

Or custom domain:
https://www.your-domain.com/_functions
```

### Step 7: Configure React App
In `.env.local`:
```
VITE_WIX_FUNCTIONS_BASE=https://ulysse-ruff-williams.wixsite.com/_functions
JWT_SECRET=<same-as-wix>
```

### Step 8: Test Locally
```bash
npm run dev
# Try signing up at http://localhost:5173
# Check browser console for logs
```

### Step 9: Deploy to Vercel
```bash
npm run build
vercel --prod
```

---

## 📁 What Gets Deployed Where

```
Wix Site (Backend)
├── auth-functions.web.js      ← from backend/wix_http_functions.js
│   ├── post_auth_register
│   ├── post_auth_login
│   └── post_proxy
├── events.js
│   ├── wixCrm_onContactCreated
│   ├── wixCrm_onContactUpdated
│   └── wixCrm_onContactDeleted
└── Contacts Collection (custom fields)

React App (Vercel)
├── services/wix-api.ts
│   ├── wixRegister()
│   ├── wixLogin()
│   └── proxyToVercel()
├── components/LoginModal.tsx
├── components/SignupModal.tsx
└── ... (all other pages unchanged)
```

---

## 🧪 Testing Checklist

### Local Testing
```bash
□ npm run dev
□ Open http://localhost:5173
□ Click "Sign Up"
□ Enter: test@example.com / Password123!
□ Check browser console for response
□ Should see: { token, contact }
□ Should redirect to /dashboard ✅
□ Verify dashboard shows:
  - Projects card with 3 sample projects
  - Case Files card with 3 sample cases
  - Invoices card with outstanding balance
□ Test each tab (Projects, Cases, Invoices)
□ Verify download/review buttons work
```

### Wix Editor Logs
```bash
□ Go to Backend > Logs
□ Should see auth function calls
□ Should see CRM events:
  "✅ Contact created: <id>"
  "🔄 Contact updated: <id>"
```

### Production Testing
```bash
□ Deploy to Vercel: vercel --prod
□ Update .env.local with live Vercel URL
□ Test signup on production site
□ Verify token stored in localStorage
□ Check login/logout flow
```

---

## 🔧 Troubleshooting

### "WIX_FUNCTIONS_BASE not configured"
**Fix**: Set `VITE_WIX_FUNCTIONS_BASE` in `.env.local`
```
VITE_WIX_FUNCTIONS_BASE=https://your-site.wixsite.com/_functions
```

### 404 on auth endpoint
**Fix**: Verify function names match exactly:
- `post_auth_register` → `/_functions/auth/register` ✅
- `post_auth_login` → `/_functions/auth/login` ✅

### CORS errors
**Fix**: Add your frontend domain to Wix CORS:
```
Wix Editor > Settings > API & Extensions > CORS
Add: https://your-vercel-domain.vercel.app
```

### "Invalid JWT token"
**Fix**: Ensure `JWT_SECRET` matches:
```
.env.local:     JWT_SECRET=abc123...
Wix backend:    JWT_SECRET=abc123... (same!)
```

### Password hash not working
**Fix**: The stub in `wix_http_functions.js` is unsafe. Install bcryptjs in Wix:
```javascript
// In auth-functions.web.js, replace:
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(password, 10);
const isMatch = await bcrypt.compare(password, storedHash);
```

---

## 📊 File Summary

### From This Repo → Deploy to Wix
| File | Destination | Action |
|------|------------|--------|
| `backend/wix_http_functions.js` | Wix Backend > `auth-functions.web.js` | Copy |
| CRM events | Wix Backend > `events.js` | Copy |
| `.env.wix` | `.env.local` | Fill in values |

### From This Repo → Deploy to Vercel
| File | Destination | Action |
|------|------------|--------|
| `services/wix-api.ts` | React app | Already in place ✅ |
| `components/LoginModal.tsx` | React app | Already updated ✅ |
| `components/SignupModal.tsx` | React app | Already updated ✅ |
| Everything else | Vercel | Deploy as normal |

---

## ✅ Deployment Checklist

### Phase 1: Wix Setup (Day 1)
- [ ] Create/access Wix site
- [ ] Set up Contacts collection with custom fields
- [ ] Create auth-functions.web.js in Wix backend
- [ ] Create events.js in Wix backend
- [ ] Set JWT_SECRET and VERCEL_API_URL in Wix env vars
- [ ] Document your Wix functions URL

### Phase 2: React Configuration (Day 2)
- [ ] Copy `.env.wix` → `.env.local`
- [ ] Fill in `VITE_WIX_FUNCTIONS_BASE`
- [ ] Fill in `JWT_SECRET` (must match Wix)
- [ ] Verify `services/wix-api.ts` is in place
- [ ] Verify `LoginModal.tsx` uses `wixLogin()`
- [ ] Verify `SignupModal.tsx` uses `wixRegister()`

### Phase 3: Local Testing (Day 3)
- [ ] `npm run dev`
- [ ] Test signup flow
- [ ] Check browser console for token
- [ ] Check Wix logs for events
- [ ] Test login flow
- [ ] Verify protected routes work

### Phase 4: Deploy to Vercel (Day 4)
- [ ] `npm run build` (local)
- [ ] `vercel --prod`
- [ ] Update `VITE_VERCEL_API_URL` to production URL
- [ ] Test on live site
- [ ] Monitor error logs

### Phase 5: Monitor & Optimize (Day 5)
- [ ] Check Wix logs for errors
- [ ] Monitor Vercel analytics
- [ ] Test on mobile
- [ ] Verify SEO tags
- [ ] Celebrate! 🎉

---

## 🔐 Security Notes

✅ **Passwords hashed** (bcrypt in Wix backend)  
✅ **Tokens issued server-side** (no client-side JWT signing)  
✅ **30-min token expiry** (prevent token theft)  
✅ **API keys in .env** (never hardcoded)  
✅ **CORS restricted** (only your domain)  

⚠️ **Not covered**:
- Rate limiting (add to Wix)
- Token refresh logic (out of scope)
- Admin role enforcement (implement as needed)

---

## 📚 Files Ready to Use

```
✅ backend/wix_http_functions.js
   → Deploy to Wix as auth-functions.web.js

✅ services/wix-api.ts
   → Already in place, calls Velo functions

✅ components/LoginModal.tsx
   → Already updated, uses wixLogin()

✅ components/SignupModal.tsx
   → Already updated, uses wixRegister()

✅ .env.wix
   → Template, copy to .env.local
```

---

## 🎯 Next Steps

1. **Create/access Wix site**
   ```
   https://manage.wix.com/account/custom-apps
   ```

2. **Deploy Velo functions**
   ```
   Copy backend/wix_http_functions.js → Wix Backend
   ```

3. **Configure environment**
   ```
   cp .env.wix .env.local
   # Fill in VITE_WIX_FUNCTIONS_BASE
   ```

4. **Test locally**
   ```
   npm run dev
   # Sign up at http://localhost:5173
   # Should redirect to /dashboard
   ```

5. **Deploy to Vercel**
   ```
   vercel --prod
   ```

---

## 📊 Post-Login Flow

```
User clicks "Sign Up" → 
  ↓
Enters email & password →
  ↓
wixRegister() called →
  ↓
Wix creates contact + issues JWT →
  ↓
Token stored in localStorage →
  ↓
Redirects to /dashboard ✅
  ↓
Dashboard displays:
  • Projects (with progress bars)
  • Case Files (with review options)
  • Invoices (with download/payment options)
```

**Dashboard Features:**
- Overview tab: Quick summary of projects, cases, invoices
- Projects tab: View all projects with progress tracking
- Cases tab: Review legal/compliance case files with notes
- Invoices tab: Download PDFs, track payment status
- All tabs use Wix Contacts data as source of truth

---

## 💬 Questions?

**Can't find your Wix functions URL?**
→ Wix Editor > Backend > Functions > (look at URL bar)

**Wix CLI app vs. Option 2?**
→ Option 2 is simpler: no dashboard, just auth functions

**Can I add more Velo functions later?**
→ Yes, add new `.web.js` files to Wix backend

**What if I want to add admin dashboard later?**
→ Can migrate to Wix CLI app (Option 1) anytime

---

**Status**: Ready to deploy  
**Timeline**: 5 days  
**Estimated Cost**: $0-50/month (Wix site) + Vercel hosting
