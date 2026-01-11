# 🎯 Wix Integration & Deployment Guide (CLI + Vercel)
**Ulysse Ruff Williams Advisory – Blockchain & Web3 Consulting Platform**

This document is an **implementation-focused update** that extends the existing Migration Guide and shows **exactly how an agent should deploy the frontend + CMS on Wix (via Wix CLI / Velo)** while keeping the **backend APIs on Vercel** for a production-grade full‑stack setup.

---

## 1️⃣ Target Architecture (Final)

```
┌──────────────────────────┐
│        Wix (Frontend)    │
│  - Marketing Pages       │
│  - Client Portal UI      │
│  - CMS (Collections)     │
│  - Auth (Members)        │
│  - Velo HTTP Functions   │
└────────────┬─────────────┘
             │ HTTPS (JWT)
┌────────────▼─────────────┐
│   Vercel (Backend APIs)  │
│  - Python Flask / Edge   │
│  - Business Logic        │
│  - ROI / Legal / Mining  │
│  - Invoice Generation    │
│  - Admin-only endpoints  │
└────────────┬─────────────┘
             │ Secure Access
┌────────────▼─────────────┐
│     MongoDB Atlas        │
│  - users                 │
│  - projects              │
│  - investments           │
│  - invoices              │
└──────────────────────────┘
```

**Key Principle**
- **Wix = UI + CMS + Auth + Content ownership**
- **Vercel = computation, protected logic, scaling**
- **MongoDB = source of truth for transactional data**

---

## 2️⃣ Wix CLI + Velo Setup (Required)

### Install Wix CLI
```bash
npm install -g @wix/cli
```

### Login to Wix
```bash
wix login
```

### Initialize Wix Project
```bash
wix create
# Select: Velo project
# Choose: Existing Wix site or new site
```

Project structure created by Wix:
```
.
├── backend/
│   ├── http-functions.js
│   ├── auth.js
│   └── cms.js
├── public/
│   └── assets/
├── src/
│   ├── pages/
│   ├── components/
│   └── styles/
└── wix.config.json
```

Enable **Velo Dev Mode** in the Wix Editor.

---

## 3️⃣ Wix CMS Collections (Authoritative)

Create the following **Collections** inside Wix CMS:

### Core CMS
- `Services`
- `Insights`
- `CaseStudies`
- `Team`

### Client Portal
- `Projects`
- `Investments`
- `Invoices`
- `LegalCases`

### Example: Projects Collection
```
name: Projects
fields:
  - title (text)
  - clientId (reference → Members)
  - status (text)
  - budget (number)
  - roi (number)
  - createdAt (date)
```

⚠️ **Permissions**
- Public: Read (marketing content only)
- Member: Read/Write (own records)
- Admin: Full access

---

## 4️⃣ Velo HTTP Functions (API Bridge)

Wix acts as a **secure gateway** between frontend UI and Vercel backend.

### backend/http-functions.js
```js
import { fetch } from 'wix-fetch';
import { ok, badRequest, forbidden } from 'wix-http-functions';
import jwt from 'jwt-simple';

const API_BASE = process.env.VERCEL_API_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export async function post_proxy(request) {
  try {
    const auth = request.headers.authorization;
    if (!auth) return forbidden('No token');

    const token = auth.replace('Bearer ', '');
    const decoded = jwt.decode(token, JWT_SECRET);

    const body = await request.body.json();

    const res = await fetch(`${API_BASE}${body.path}`, {
      method: body.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body.payload)
    });

    return ok(await res.json());
  } catch (e) {
    return badRequest({ error: e.message });
  }
}
```

This allows:
- Wix UI → `/proxy`
- Secure forwarding → Vercel backend

---

## 5️⃣ Authentication Strategy (Wix + JWT)

### Source of Truth
- **Wix Members** = identity
- **JWT** = session + backend authorization

### Login Flow
```
User → Wix Login
     → Velo generates JWT (30 min)
     → Token stored (sessionStorage)
     → Token sent to Vercel APIs
```

### backend/auth.js
```js
import wixUsers from 'wix-users-backend';
import jwt from 'jwt-simple';

export async function issueToken() {
  const user = wixUsers.currentUser;
  if (!user.loggedIn) throw new Error('Unauthorized');

  return jwt.encode({
    sub: user.id,
    role: 'Client',
    exp: Date.now() + 30 * 60 * 1000
  }, process.env.JWT_SECRET);
}
```

---

## 6️⃣ Frontend Integration (Wix Pages)

### Calling Vercel APIs from Wix UI
```js
import { fetch } from 'wix-fetch';

export async function createProject(data, token) {
  const res = await fetch('/_functions/proxy', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      path: '/projects',
      payload: data
    })
  });

  return res.json();
}
```

Used in:
- Case Filing
- Investment ROI Calculator
- Invoice Requests
- Legal Support Submissions

---

## 7️⃣ Vercel Backend Deployment

### vercel.json
```json
{
  "functions": {
    "api/**/*.py": {
      "runtime": "python3.9"
    }
  }
}
```

### Environment Variables (Vercel)
```
MONGO_URI=
JWT_SECRET=
ALLOWED_ORIGINS=https://*.wixsite.com
```

Deploy:
```bash
vercel --prod
```

---

## 8️⃣ Responsibility Split (Agent Rules)

### Wix Handles
- UI rendering
- CMS content
- SEO & marketing pages
- Member authentication
- Admin content editing

### Vercel Handles
- Financial calculations
- ROI engines
- Mining pool validation
- Invoice PDF generation
- Legal workflow logic

---

## 9️⃣ Security Rules (Non‑Negotiable)

- ❌ No DB credentials in Wix frontend
- ❌ No secrets in client JS
- ✅ JWT verified on Vercel
- ✅ Wix HTTP functions as gatekeeper
- ✅ IP allowlist on MongoDB
- ✅ HTTPS only

---

## 🔟 Deployment Checklist

### Wix
- [ ] CMS collections created
- [ ] Permissions locked
- [ ] Velo enabled
- [ ] Environment variables set
- [ ] HTTP functions deployed

### Vercel
- [ ] Backend deployed
- [ ] MongoDB connected
- [ ] JWT secret synced
- [ ] CORS restricted

---

## ✅ Final Recommendation

**This hybrid Wix + Vercel architecture is optimal** for:
- Blockchain advisory platforms
- Legal & compliance dashboards
- Investor portals
- Regulated Web3 products

It preserves **developer power** while enabling **non‑technical CMS control**.

---

**File:** `wix.md`  
**Status:** Implementation‑ready  
**Updated:** January 2026