# 🛡️ Rate Limiting Implementation Guide

## Overview

Rate limiting has been implemented across both the Flask backend and Wix backend to protect against:
- **Brute force attacks** on login/registration endpoints
- **Abuse** and excessive requests
- **DDoS attacks** targeting authentication

---

## Flask Backend (`server.py`)

### Implementation Details

**Library:** Flask-Limiter

**Installed:** Added `Flask-Limiter==3.5.0` to [requirements.txt](backend/requirements.txt)

### Rate Limits

| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| `POST /api/auth/register` | 5 attempts | Per hour per IP | Prevent registration spam |
| `POST /api/auth/login` | 10 attempts | Per hour per IP | Prevent brute force attacks |
| Global default | 200 requests | Per day per IP | Catch-all limit |
| Global default | 50 requests | Per hour per IP | Catch-all limit |

### Configuration

Located at top of [backend/server.py](backend/server.py):

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)
```

### Usage

Decorators on routes:
```python
@app.route('/api/auth/register', methods=['POST'])
@limiter.limit("5 per hour")
def register():
    # Function body...
```

### Error Response

When rate limit is exceeded, client receives:

```json
{
  "message": "Rate limit exceeded. 5 per 1 hour"
}
```

HTTP Status: **429 Too Many Requests**

---

## Wix Backend (`wix_http_functions.js`)

### Implementation Details

**Method:** Custom in-memory rate limiting using IP tracking

**Storage:** In-memory map with automatic cleanup

### Rate Limits

| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| `POST /_functions/auth/register` | 5 attempts | Per hour per IP | Prevent registration spam |
| `POST /_functions/auth/login` | 10 attempts | Per hour per IP | Prevent brute force attacks |

### Configuration

The rate limiting store and checker are at top of [backend/wix_http_functions.js](backend/wix_http_functions.js):

```javascript
const rateLimitStore = {};

function checkRateLimit(ip, limit, windowSeconds) {
  // Tracks requests per IP
  // Returns: { allowed, remaining, resetTime, retryAfter }
}
```

### Usage

In request handlers:

```javascript
const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
const rateLimit = checkRateLimit(clientIp, 5, 3600); // 5 per hour

if (!rateLimit.allowed) {
  return badRequest({
    error: 'Too many attempts. Please try again later.',
    retryAfter: rateLimit.retryAfter
  }, { 
    headers: { 'Retry-After': rateLimit.retryAfter.toString() }
  });
}
```

### Error Response

When rate limit is exceeded:

```json
{
  "error": "Too many registration attempts. Please try again later.",
  "retryAfter": 3456
}
```

**Headers:**
- `Retry-After: 3456` (seconds until reset)
- `X-RateLimit-Remaining: 0`

HTTP Status: **400 Bad Request**

### Cleanup

Automatic cleanup runs every hour to remove old tracking data:

```javascript
setInterval(() => {
  // Remove entries older than 1 hour
  // Clean up empty IPs
}, CLEANUP_INTERVAL);
```

---

## Testing Rate Limits

### Test Flask Backend

**Normal request (succeeds):**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test1@example.com","password":"Test123!"}'
```

**Rapid requests (hits limit after 5):**
```bash
for i in {1..7}; do
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test$i@example.com\",\"password\":\"Test123!\"}"
  echo "\n"
done
```

Expected: First 5 succeed, 6th and 7th return 429 with rate limit message.

### Test Wix Backend

Use Wix API Playground or curl from CLI:

```bash
# First few requests succeed
for i in {1..5}; do
  curl -X POST https://ulyssesruff38.wixstudio.com/_functions/auth/register \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: 203.0.113.5" \
    -d "{\"email\":\"test$i@example.com\",\"password\":\"Test123!\"}"
done

# 6th request hits limit
curl -X POST https://ulyssesruff38.wixstudio.com/_functions/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 203.0.113.5" \
  -d '{"email":"test6@example.com","password":"Test123!"}'
```

---

## How Rate Limiting Works

### Flask-Limiter Flow

1. Request arrives at decorated endpoint
2. Flask-Limiter extracts client IP via `get_remote_address()`
3. Checks if IP has exceeded limit in time window
4. If exceeded: Returns 429 status
5. If allowed: Increments counter and processes request

### Custom Wix Implementation

1. Request arrives with client IP in `X-Forwarded-For` header
2. `checkRateLimit()` is called with IP and limits
3. Function filters old timestamps outside the window
4. Checks if current count < limit
5. If allowed: Adds timestamp and continues
6. If blocked: Returns error with `Retry-After` header

---

## Monitoring & Logging

### Flask Backend

Enable logging to monitor rate limiting:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

Logs show:
- IP addresses being rate limited
- Request counts per endpoint
- Limit reset times

### Wix Backend

Rate limit status is logged in Wix Backend > Logs:

```javascript
console.log(`Rate limit check: ${clientIp} - Allowed: ${rateLimit.allowed}, Remaining: ${rateLimit.remaining}`);
```

Monitor in Wix Editor:
1. Backend > Logs
2. Filter by function name
3. Look for rate limit messages

---

## Adjusting Limits

### Flask Backend

Edit [backend/server.py](backend/server.py#L24-L26):

```python
@app.route('/api/auth/register', methods=['POST'])
@limiter.limit("10 per hour")  # ← Change this
def register():
```

### Wix Backend

Edit [backend/wix_http_functions.js](backend/wix_http_functions.js#L59-L60):

```javascript
const rateLimit = checkRateLimit(clientIp, 10, 3600); // ← Change second parameter
```

---

## Deployment Checklist

- [ ] Updated Flask requirements: `pip install flask-limiter`
- [ ] Deployed updated [backend/server.py](backend/server.py)
- [ ] Copied updated [backend/wix_http_functions.js](backend/wix_http_functions.js) to Wix
- [ ] Published Wix site with new functions
- [ ] Tested rate limiting locally
- [ ] Verified Wix logs show rate limit messages
- [ ] Tested with multiple IP addresses if possible

---

## Frontend Handling

### Display Retry-After to User

```typescript
// In error handler
if (error.response?.status === 429 || error.response?.data?.retryAfter) {
  const retryAfter = error.response.data.retryAfter || 60;
  toast.error(`Too many attempts. Try again in ${retryAfter} seconds`);
}
```

### Button Disable Pattern

```typescript
const [isDisabled, setIsDisabled] = useState(false);
const [retryTimer, setRetryTimer] = useState(0);

const handleSubmit = async (email, password) => {
  try {
    // Make request...
  } catch (error) {
    if (error.response?.data?.retryAfter) {
      setRetryTimer(error.response.data.retryAfter);
      setIsDisabled(true);
      
      // Countdown timer
      const interval = setInterval(() => {
        setRetryTimer(t => {
          if (t <= 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
  }
};

// In JSX:
<button disabled={isDisabled}>
  {isDisabled ? `Try again in ${retryTimer}s` : 'Login'}
</button>
```

---

## Troubleshooting

### Issue: Rate limit always triggers

**Solution:** Check client IP extraction
- Flask: Verify proxy headers are set correctly
- Wix: Ensure `X-Forwarded-For` header is present

### Issue: Rate limit not working on Wix

**Solution:** Verify deployment
1. File must be saved and published
2. Check logs for errors
3. Clear browser cache
4. Test from different IP if possible

### Issue: Need to bypass for testing

**Temporary solution (development only):**
```javascript
// In Wix backend, comment out rate limit check
// const rateLimit = checkRateLimit(clientIp, 5, 3600);
// if (!rateLimit.allowed) { return error; }
```

**Never disable in production!**

---

## Security Best Practices

1. ✅ **Always include rate limiting** on auth endpoints
2. ✅ **Log failed attempts** for security monitoring
3. ✅ **Use strict limits** for login (10/hour)
4. ✅ **Use stricter limits** for registration (5/hour)
5. ✅ **Return vague error messages** (don't expose limits to users)
6. ✅ **Include Retry-After header** (helps clients retry properly)
7. ✅ **Monitor for patterns** (multiple IPs hammering same endpoint)

---

## References

- [Flask-Limiter Documentation](https://flask-limiter.readthedocs.io/)
- [RFC 6585 - HTTP 429 Too Many Requests](https://tools.ietf.org/html/rfc6585)
- [Retry-After Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After)
- [OWASP Rate Limiting](https://owasp.org/www-community/attacks/Rate_Limiting)
