# 🚀 Deploy HTTP Functions to Wix Backend

Follow these steps to deploy the authentication functions to your Wix site.

---

## Step 1️⃣: Open Wix Backend Code Editor

1. Go to your **Wix Editor** (https://editor.wix.com)
2. In the **left sidebar**, click the **Backend** icon (looks like `< >`)
3. You should see:
   - Code Files
   - Database
   - Backend Modules
   - Extensions

---

## Step 2️⃣: Create New Backend File

1. Click **Code Files**
2. Click **+ New File** (or **+ Add Code File**)
3. A modal appears asking for filename

**Enter filename:**
```
auth-functions.web.js
```

**Important:** Must end with `.web.js` to make it publicly accessible via HTTP

---

## Step 3️⃣: Paste the HTTP Functions Code

1. **Copy** the entire content from [backend/wix_http_functions.js](backend/wix_http_functions.js)
   - Select all (Cmd+A)
   - Copy (Cmd+C)

2. **In Wix Backend editor**, paste into the empty file:
   - Click in the code editor
   - Paste (Cmd+V)

3. The file should now contain all the functions:
   - `post_auth_register()`
   - `post_auth_login()`
   - `post_proxy()`
   - CRM event handlers

---

## Step 4️⃣: Configure Environment Variables

The HTTP functions need the JWT_SECRET and Vercel URL to work.

### In Wix Backend:

1. Click **Settings** (⚙️ icon in backend code area)
2. Click **Environment Variables** tab
3. Click **+ Add Variable**

**Add these variables:**

| Name | Value |
|------|-------|
| `JWT_SECRET` | `ZOrj4MhIRQAkiOv+I5m8LKociUsqF36HfXw7p4t8CB8=` |
| `VERCEL_API_URL` | `https://ulysse-ruff-williams-advisory.vercel.app/api` |

4. Click **Save** for each variable

⚠️ **Important**: The `JWT_SECRET` must match the one in your `.env.local` file!

---

## Step 5️⃣: Save & Deploy

1. Click **Save** (Ctrl+S or Cmd+S) in the code editor
2. Wait for the file to save (you'll see "Saved" message)
3. Click the **Publish** button (top right of Wix Editor)
   - This deploys your entire site including backend code
   - Wait for green checkmark ✅

---

## Step 6️⃣: Verify Deployment

After publishing, your functions are live at:
- `https://ulyssesruff38.wixstudio.com/_functions/auth/register`
- `https://ulyssesruff38.wixstudio.com/_functions/auth/login`

**To test quickly:**
```bash
curl -X POST https://ulyssesruff38.wixstudio.com/_functions/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

Should return:
```json
{
  "message": "User registered successfully",
  "token": "...",
  "contact": { ... }
}
```

---

## ⚠️ Common Issues

### Issue: "Module not found: jwt-simple"
**Solution**: Wix has this built-in. If error persists:
1. Go to **Backend > Extensions**
2. Install `jwt-simple` npm package

### Issue: "wixData is not defined"
**Solution**: Make sure imports are correct at top of file:
```javascript
import wixData from 'wix-data';
import { ok, badRequest, serverError } from 'wix-http-functions';
```

### Issue: "404 on /_functions/auth/register"
**Solution**: 
1. File name must end with `.web.js` ✓
2. Must click **Publish** in Wix Editor ✓
3. Published = blue banner shows "Last published: just now" ✓

### Issue: "CORS Error in browser"
**Solution**: This should be fixed with the CORS headers in the code. If still occurs:
1. Check Wix Backend > Logs
2. Look for error messages
3. Verify `corsHeaders()` function is in the code

---

## ✅ When It's Working

Your frontend (on Vercel) can now:
1. Sign up: POST to `https://ulyssesruff38.wixstudio.com/_functions/auth/register`
2. Login: POST to `https://ulyssesruff38.wixstudio.com/_functions/auth/login`
3. Get JWT token in response
4. Redirect to `/dashboard`

---

## 📋 Deployment Checklist

- [ ] Created file `auth-functions.web.js` in Wix Backend
- [ ] Pasted entire content from `backend/wix_http_functions.js`
- [ ] Set `JWT_SECRET` in Wix Environment Variables
- [ ] Set `VERCEL_API_URL` in Wix Environment Variables
- [ ] Clicked **Publish** in Wix Editor
- [ ] Verified functions are live (checked logs)
- [ ] Tested signup at https://ulysse-ruff-williams-advisory.vercel.app

---

## 🔗 Quick Links

- Wix Backend Docs: https://dev.wix.com/docs/velo/api-reference/web-modules/web-modules-overview
- Wix HTTP Functions: https://dev.wix.com/docs/velo/http-functions/introduction
- JWT in Wix: https://dev.wix.com/docs/velo/api-reference/jwt/jwt

---

**Next Step**: Test the signup flow and check Wix logs for any errors.
