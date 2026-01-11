# Wix CLI App Implementation (Option 1)

**For**: Ulysse Ruff Williams Advisory  
**Status**: Implementation guide for Wix business app  
**Date**: January 11, 2026

---

## What is a Wix CLI App?

A Wix CLI App is a business application that:
- **Runs in**: Wix Editor > Apps Dashboard
- **Audience**: Business owners, admins, team members
- **Backend**: Node.js + Wix APIs
- **Frontend**: React component in Wix dashboard

**Use case**: Admin dashboard for invoices, case tracking, ROI analytics

---

## Quick Start: Create Wix CLI App

### Step 1: Create App Project
```bash
npm create @wix/new@latest app
```

When prompted:
```
? What would you like to do?
> Create a new Wix App

? What's the name of your app?
> Ulysse Advisory

? What's the folder name?
> ulysse-advisory-app
```

### Step 2: Generated Project Structure
```
ulysse-advisory-app/
├── src/
│   ├── extensions/
│   │   └── dashboard/
│   │       └── pages/
│   │           └── my-page/
│   │               ├── my-page.tsx        (Dashboard UI)
│   │               └── my-page.wix.json   (Config)
│   ├── components/
│   └── index.tsx
├── backend/
│   └── index.ts                           (HTTP functions)
├── package.json
├── wix.config.json                        (App config)
└── tsconfig.json
```

### Step 3: Test Locally
```bash
cd ulysse-advisory-app
wix dev

# When prompted:
# Option 1: Create new Development Site
# Option 2: Select existing Wix site
```

---

## Integration with React App

Your React app (this repo) **stays separate**. The Wix CLI app provides:

### 1. Backend HTTP Functions
File: `backend/index.ts`

```typescript
import { Permissions, withAuthorization } from '@wix/velo-service-sdk';

// Export auth functions for your React app
export const auth = withAuthorization(
  Permissions.PermissionsEnum.APP_MANAGE_CONTACTS,
  async (request) => {
    // Call your Velo functions
    return await fetch('/_functions/auth/login', {
      method: 'POST',
      body: JSON.stringify(request.body)
    });
  }
);
```

### 2. Dashboard Page (Optional)
File: `src/extensions/dashboard/pages/admin-dashboard/admin-dashboard.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { Page, WixDesignSystemProvider } from '@wix/design-system';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Fetch from Vercel backend
    fetch('https://your-vercel.app/api/metrics')
      .then(res => res.json())
      .then(setMetrics);
  }, []);

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page title="Ulysse Analytics Dashboard">
        {/* Display metrics, charts, etc. */}
      </Page>
    </WixDesignSystemProvider>
  );
};

export default AdminDashboard;
```

### 3. Call Wix APIs
```typescript
import { contacts } from '@wix/crm';
import { items } from '@wix/data';

// Example: Get all contacts
export const getContacts = async () => {
  const result = await contacts.queryContacts().find();
  return result.items;
};

// Example: Get collection items
export const getProjects = async () => {
  const result = await items.queryItems({ collectionId: 'Projects' }).find();
  return result.items;
};
```

---

## Deployment Checklist

### Local Testing
- [ ] Run `npm create @wix/new@latest app`
- [ ] Run `wix dev`
- [ ] Install app on development site
- [ ] Test dashboard loads
- [ ] Test Wix API calls in dashboard

### Before Production
- [ ] Configure app permissions in `wix.config.json`
- [ ] Set environment variables (JWT_SECRET, API keys)
- [ ] Deploy backend functions: `npm run build && wix deploy`
- [ ] Publish app to Wix App Market (if desired)
- [ ] Test on production site

### Integration with React App
- [ ] React app uses `wix-api.ts` to call Velo functions
- [ ] Wix app provides admin dashboard (optional)
- [ ] Both share same backend/database

---

## Permissions Configuration

File: `wix.config.json`

```json
{
  "name": "Ulysse Advisory",
  "displayName": "Ulysse Advisory App",
  "description": "Admin dashboard for blockchain consulting",
  "permissions": [
    "CONTACTS_READ",
    "CONTACTS_WRITE",
    "DATA_READ",
    "DATA_WRITE"
  ],
  "extensions": [
    {
      "type": "dashboard_page",
      "id": "admin-dashboard",
      "componentId": "admin-dashboard",
      "displayName": "Analytics"
    }
  ]
}
```

---

## Advanced: Custom Backend Endpoints

Create custom HTTP functions in `backend/`:

### backend/auth.ts
```typescript
import { Response } from '@wix/velo-service-sdk';

export async function loginUser(request: Request) {
  const { email, password } = await request.json();

  // Verify credentials
  const user = await verifyCredentials(email, password);
  if (!user) {
    return Response.error(401, { error: 'Invalid credentials' });
  }

  // Issue JWT
  const token = signToken(user);
  return Response.ok({ token, user });
}

export async function registerUser(request: Request) {
  const { email, password } = await request.json();

  // Create contact
  const contact = await createWixContact(email, password);
  const token = signToken(contact);

  return Response.ok({ token, contact });
}
```

### Call from React App
```typescript
// services/wix-api.ts
export const wixRegister = async (email: string, password: string) => {
  const res = await fetch('/_functions/registerUser', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return res.json(); // { token, contact }
};
```

---

## FAQ

### Q: Do I need both React app AND Wix CLI app?
**A:** You can use either:
- **Option 1** (Wix CLI): Creates business app + dashboard
- **Option 2** (Simple Velo): Just deploy functions, no dashboard needed

### Q: Can my React app call Wix CLI app endpoints?
**A:** Yes, via `wix-api.ts` using the Wix HTTP functions base URL

### Q: How do I share data between React app and Wix app?
**A:** Both access the same MongoDB backend and Wix Collections

### Q: Can I add more dashboard pages?
**A:** Yes, create new pages in `src/extensions/dashboard/pages/`

### Q: How do I test locally?
**A:** Run `wix dev`, select a test site, dashboard opens at localhost:3000

---

## Resources

- [Wix CLI Docs](https://dev.wix.com/docs/wix-cli)
- [Creating Apps](https://dev.wix.com/docs/wix-cli/guides/get-started/quick-start-an-app)
- [Project Structure](https://dev.wix.com/docs/wix-cli/guides/get-started/project-structure)
- [Wix APIs](https://dev.wix.com/docs/api-reference)
- [Backend Development](https://dev.wix.com/docs/wix-cli/guides/development/backend-development)

---

## Next Steps

1. **Decide**: Option 1 (Wix app) or Option 2 (Velo only)?
2. **Create**: `npm create @wix/new@latest app` (if Option 1)
3. **Deploy**: `wix deploy` backend functions
4. **Test**: `wix dev` local environment
5. **Connect**: React app calls via `wix-api.ts`

---

**Questions?** See [WIX_SETUP_GUIDE.md](./WIX_SETUP_GUIDE.md) for more details.
