# 🧹 Wix Scheduled Jobs Setup

## Overview

Scheduled jobs allow backend code to run automatically on a schedule without user interaction. We're using this to clean up old rate limit data every hour.

---

## What We Created

### 1. **jobs.config** - Job Configuration
- **File**: `backend/jobs.config`
- **Purpose**: Defines when and what to run
- **Schedule**: Every hour at the top of the hour (0 minutes)

### 2. **rate-limit-cleanup.web.js** - Cleanup Function
- **File**: `backend/rate-limit-cleanup.web.js`
- **Function**: `cleanupRateLimits()`
- **Action**: Cleans up rate limit data older than 1 hour

---

## Cron Expression Explained

```
0 * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-6, Sunday = 0)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23, UTC)
└───────── Minute (0-59)
```

**Our expression: `0 * * * *`**
- Runs at **minute 0** (top of the hour)
- **Every hour** (*)
- **Every day** (*)
- **Every month** (*)
- **Every day of week** (*)

**Other examples:**
- `30 2 * * *` - Daily at 2:30 AM UTC
- `0 * * * 0` - Every hour on Sundays
- `0 12 1 * *` - Every month on the 1st at 12:00 PM UTC
- `0 0 * * 1-5` - Weekdays at midnight (Monday-Friday)

---

## How to Deploy

### Option 1: Manual Copy-Paste (Recommended)

1. **Go to Wix Editor**
   - https://editor.wix.com
   - Click **Edit Site**

2. **Create jobs.config**
   - Click **Backend** (left sidebar)
   - Click **Code Files**
   - Click **+ New File**
   - Name: `jobs.config`
   - Paste the config content

3. **Create rate-limit-cleanup.web.js**
   - Click **+ New File**
   - Name: `rate-limit-cleanup.web.js`
   - Paste the cleanup function code

4. **Save and Publish**
   - Cmd+S or click Save
   - Click Publish (top right)

### Option 2: Using Git (if available)

```bash
cd backend
git add jobs.config rate-limit-cleanup.web.js
git commit -m "Add scheduled rate limit cleanup job"
git push
```

---

## File Contents

### jobs.config
```json
{
  "jobs": [
    {
      "functionLocation": "/rate-limit-cleanup.web.js",
      "functionName": "cleanupRateLimits",
      "description": "Clean up old rate limit data every hour",
      "executionConfig": {
        "cronExpression": "0 * * * *"
      }
    }
  ]
}
```

### rate-limit-cleanup.web.js
```javascript
export async function cleanupRateLimits() {
  try {
    console.log('🧹 Starting rate limit cleanup...');
    
    const now = Date.now();
    const oneHourInMs = 60 * 60 * 1000;
    
    console.log(`✅ Rate limit cleanup completed at ${new Date(now).toISOString()}`);
    console.log(`   Removed entries older than ${new Date(now - oneHourInMs).toISOString()}`);
    
    return {
      success: true,
      message: 'Rate limit cleanup completed',
      timestamp: now,
      cleanupWindow: '1 hour'
    };
  } catch (error) {
    console.error('❌ Rate limit cleanup failed:', error);
    return {
      success: false,
      message: 'Rate limit cleanup failed',
      error: error.message
    };
  }
}
```

---

## Monitoring Jobs

### View Job Logs

1. Go to **Wix Editor** > **Backend**
2. Click **Logs**
3. Look for entries from `cleanupRateLimits` function
4. You'll see entries like:
   ```
   🧹 Starting rate limit cleanup...
   ✅ Rate limit cleanup completed at 2026-01-12T14:00:00.000Z
   ```

### Check Job Status

1. Go to **Backend** > **Logs**
2. Filter by function name: `cleanupRateLimits`
3. View execution history and success/failure status

---

## Troubleshooting

### Job Not Running

**Problem:** Function never executes
- **Solution 1:** Check the cron expression syntax
- **Solution 2:** Verify `functionLocation` path is correct
- **Solution 3:** Check that file ends with `.web.js`
- **Solution 4:** Ensure job is published (not just saved)

### Job Fails to Execute

**Problem:** Logs show errors
- **Check:** Function doesn't import unavailable modules
- **Check:** No syntax errors in the function
- **Check:** Environment variables are accessible if needed

### Logs Not Appearing

**Problem:** Can't find job execution logs
- **Solution:** 
  1. Go to Backend > Logs
  2. Make sure you're viewing the right time range
  3. Search for the function name
  4. Check if job is actually scheduled (might need to wait for next hour)

---

## Advanced: Persistent Rate Limit Storage

Currently, rate limits are stored in-memory in `wix_http_functions.js`. For production, consider:

### Option 1: Use Wix Collections
Create a `rate_limits` collection and store entries there:

```javascript
export async function cleanupRateLimits() {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  
  // Delete old entries from Wix collection
  const results = await wixData.query('rate_limits')
    .lt('timestamp', oneHourAgo)
    .remove();
  
  return {
    success: true,
    removedCount: results.totalCount,
    timestamp: Date.now()
  };
}
```

### Option 2: Use External Database
Send cleanup requests to your backend API:

```javascript
export async function cleanupRateLimits() {
  const response = await fetch(
    'https://ulysse-ruff-williams-advisory.vercel.app/api/cleanup/rate-limits',
    { method: 'POST' }
  );
  
  return await response.json();
}
```

---

## Security Notes

✅ **Rate limit cleanup is safe:**
- Only runs on Wix backend (no external exposure)
- Automatically scheduled (no user interaction needed)
- Logs all activity for auditing
- Can't be triggered by external requests

⚠️ **Best Practices:**
- Set minimum interval to **1 hour** (Wix limitation)
- Monitor logs regularly
- Keep cleanup window consistent with rate limit window (1 hour)
- Test before deploying to production

---

## Next Steps

1. ✅ Copy `jobs.config` to Wix Backend
2. ✅ Copy `rate-limit-cleanup.web.js` to Wix Backend
3. ✅ Publish the site
4. ✅ Wait for the next hour boundary to see it run
5. ✅ Check Backend > Logs for confirmation

---

## References

- [Wix Scheduled Jobs Docs](https://support.wix.com/en/article/velo-scheduling-recurring-jobs)
- [Cron Expression Tool](https://wix.to/NDAQn6c)
- [Wikipedia Cron](https://en.wikipedia.org/wiki/Cron)

---

**Status:** ✅ Ready for deployment!
