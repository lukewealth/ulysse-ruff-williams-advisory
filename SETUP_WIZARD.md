# 🎯 Wix Configuration Setup Wizard

Your configuration is **incomplete**. Follow these steps to fix the login error:

---

## Step 1️⃣: Generate JWT Secret

Run this command in your terminal:

```bash
openssl rand -base64 32
```

**Example output:**
```
gK8x9mP2nL5qR7vW1bZ3dFjH6tY4sU8xV2cE5nG9hK1mQ3rT6wJ8yL0pM2sO4uB
```

Copy this value (you'll need it in Step 2).

---

## Step 2️⃣: Get Your Wix Site URL

You need your Wix site's functions endpoint. Choose your situation:

### If you DON'T have a Wix site yet:
1. Go to https://manage.wix.com/account/custom-apps
2. Click "Create a Custom App"
3. Follow setup wizard
4. Once created, your site URL will be something like:
   ```
   https://your-site-name.wixsite.com/_functions
   ```

### If you ALREADY have a Wix site:
1. Go to your Wix Editor
2. Look at the browser address bar
3. Your site is typically:
   ```
   https://your-site-name.wixsite.com/
   ```
4. Add `_functions` to get:
   ```
   https://your-site-name.wixsite.com/_functions
   ```

### If you have a custom domain:
```
https://www.your-custom-domain.com/_functions
```

---

## Step 3️⃣: Update `.env.local`

Edit the file `/Users/Apple/Downloads/ulysse-ruff-williams-advisory/.env.local`

Replace these placeholder values:

```bash
# Change THIS:
VITE_WIX_FUNCTIONS_BASE=https://ulysse-ruff-williams.wixsite.com/_functions
JWT_SECRET=your-jwt-secret-key-min-32-chars-12345678901234567890
VITE_WIX_API_KEY=your-wix-api-key

# To THIS (with YOUR actual values):
VITE_WIX_FUNCTIONS_BASE=https://your-actual-site.wixsite.com/_functions
JWT_SECRET=gK8x9mP2nL5qR7vW1bZ3dFjH6tY4sU8xV2cE5nG9hK1mQ3rT6wJ8yL0pM2sO4uB
VITE_WIX_API_KEY=your-actual-wix-api-key
```

**Values to update:**
1. `VITE_WIX_FUNCTIONS_BASE` = Your Wix site URL from Step 2
2. `JWT_SECRET` = The generated string from Step 1
3. `VITE_WIX_API_KEY` = From Wix Dashboard (optional for login, but get it anyway)

---

## Step 4️⃣: Verify Configuration

Run this to check if everything is set up correctly:

```bash
bash check-wix-config.sh
```

You should see:
```
✅ Configuration looks GOOD!
```

---

## Step 5️⃣: Restart Dev Server

Stop your dev server (Ctrl+C) and restart:

```bash
npm run dev
```

---

## Step 6️⃣: Test Login

1. Open http://localhost:5173
2. Click "Sign Up"
3. Enter:
   - Email: `test@example.com`
   - Password: `TestPass123!`
4. Click "Create Account"
5. **Should redirect to `/dashboard`** ✅

---

## ⚠️ What if it still doesn't work?

### Error: "404 on /_functions/auth/register"
**Cause**: You haven't deployed the HTTP functions to Wix yet
**Fix**: 
1. Go to Wix Editor
2. Backend > Code Files
3. Create new file: `auth-functions.web.js`
4. Copy entire content from: `backend/wix_http_functions.js`
5. Save/Deploy

### Error: "Network timeout"
**Cause**: Functions might have a syntax error
**Fix**:
1. Go to Wix Editor > Backend > Logs
2. Check for error messages
3. Review the function code for issues

### Error: "Invalid JWT token"
**Cause**: JWT_SECRET doesn't match between .env.local and Wix
**Fix**:
1. Generate new secret: `openssl rand -base64 32`
2. Update `.env.local`: `JWT_SECRET=<new-secret>`
3. Update Wix: Editor > Settings > Environment Variables > JWT_SECRET=<same-new-secret>
4. Restart both dev server and Wix

---

## 📝 Checklist

Before proceeding, verify:

- [ ] I generated a JWT secret with `openssl rand -base64 32`
- [ ] I have a Wix site created
- [ ] I updated `.env.local` with:
  - `VITE_WIX_FUNCTIONS_BASE` (my Wix site URL)
  - `JWT_SECRET` (the generated string)
  - `VITE_WIX_API_KEY` (from Wix Dashboard)
- [ ] Ran `bash check-wix-config.sh` and saw ✅ all green
- [ ] Restarted dev server with `npm run dev`
- [ ] Tested signup at http://localhost:5173

---

## 🆘 Still Stuck?

1. **Check Wix Logs**: Wix Editor > Backend > Logs
2. **Check Console**: Browser DevTools > Console tab
3. **Review**: `OPTION_2_IMPLEMENTATION.md` for full step-by-step
4. **Contact**: Wix support for deployment issues

---

## ✅ When Everything Works

You'll see:
1. Signup form loads
2. Click "Create Account"
3. 2-second pause (calling Wix functions)
4. Toast notification: "Account created! Welcome aboard! 🎉"
5. Redirects to `/dashboard` with projects/cases/invoices

**Congratulations!** 🎉 Your Wix integration is live!

---

**Next**: Deploy HTTP functions to Wix (see `OPTION_2_IMPLEMENTATION.md` Day 1-2)
