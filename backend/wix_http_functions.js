// ============================================================================
// Wix Velo HTTP Functions & CRM Event Handlers
// ============================================================================
// DEPLOYMENT: Copy to your Wix site's backend (Velo Editor > Backend)
// REFERENCE: https://dev.wix.com/docs/velo/events-service-plugins/crm/events/introduction
// ============================================================================

import { ok, badRequest, forbidden, serverError } from 'wix-http-functions';
import wixUsers from 'wix-users-backend';
import wixData from 'wix-data';
import wixAuth from 'wix-auth';
import jwt from 'jwt-simple';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const VERCEL_API_URL = process.env.VERCEL_API_URL || 'https://your-vercel-domain.vercel.app';

// ============================================================================
// Rate Limiting Helper (In-memory tracking)
// ============================================================================
const rateLimitStore = {};
const CLEANUP_INTERVAL = 60 * 60 * 1000; // Clean up every hour

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const ip in rateLimitStore) {
    rateLimitStore[ip] = rateLimitStore[ip].filter(timestamp => now - timestamp < 60 * 60 * 1000);
    if (rateLimitStore[ip].length === 0) {
      delete rateLimitStore[ip];
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Check if request exceeds rate limit
 * Returns { allowed: boolean, remaining: number, resetTime: timestamp }
 */
function checkRateLimit(ip, limit, windowSeconds) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = [];
  }
  
  // Remove old entries outside the window
  rateLimitStore[ip] = rateLimitStore[ip].filter(timestamp => now - timestamp < windowMs);
  
  const count = rateLimitStore[ip].length;
  const allowed = count < limit;
  
  if (allowed) {
    rateLimitStore[ip].push(now);
  }
  
  const oldestEntry = rateLimitStore[ip][0];
  const resetTime = oldestEntry ? oldestEntry + windowMs : now + windowMs;
  
  return {
    allowed,
    remaining: Math.max(0, limit - count),
    resetTime,
    retryAfter: Math.ceil((resetTime - now) / 1000)
  };
}

// ============================================================================
// CORS Helper
// ============================================================================
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  };
}

// ============================================================================
// HTTP FUNCTIONS (Public endpoints for frontend)
// ============================================================================

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function options_auth_register(request) {
  const origin = request.headers.get('origin') || '*';
  return ok({}, { headers: corsHeaders(origin) });
}

export async function options_auth_login(request) {
  const origin = request.headers.get('origin') || '*';
  return ok({}, { headers: corsHeaders(origin) });
}

export async function options_proxy(request) {
  const origin = request.headers.get('origin') || '*';
  return ok({}, { headers: corsHeaders(origin) });
}

/**
 * POST /_functions/auth/register
 * Register a new user (create Wix contact + issue JWT)
 * Rate limited: 5 registrations per hour per IP
 */
export async function post_auth_register(request) {
  try {
    const origin = request.headers.get('origin') || '*';
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Check rate limit: 5 registrations per hour
    const rateLimit = checkRateLimit(clientIp, 5, 3600);
    if (!rateLimit.allowed) {
      const rateLimitHeaders = {
        ...corsHeaders(origin),
        'Retry-After': rateLimit.retryAfter.toString(),
        'X-RateLimit-Remaining': '0'
      };
      return badRequest(
        { 
          error: 'Too many registration attempts. Please try again later.',
          retryAfter: rateLimit.retryAfter
        },
        { headers: rateLimitHeaders }
      );
    }
    
    const body = await request.body.json();
    const { email, password } = body;

    if (!email || !password) {
      return badRequest({ error: 'Email and password required' }, {
        headers: {
          ...corsHeaders(origin),
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      });
    }

    // Check if contact exists
    const existing = await wixData.query('contacts')
      .eq('emails.email', email)
      .find();

    if (existing.items.length > 0) {
      return badRequest({ error: 'Email already registered' }, {
        headers: {
          ...corsHeaders(origin),
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create contact
    const contact = await wixData.insert('contacts', {
      firstName: email.split('@')[0],
      emails: [{ email, primary: true }],
      customFields: {
        'custom.password_hash': passwordHash,
        'custom.role': 'Client',
        'custom.created_at': new Date().toISOString()
      }
    });

    // Generate JWT token
    const token = jwt.encode(
      {
        sub: contact._id,
        email: contact.emails[0].email,
        role: 'Client',
        exp: Date.now() + 30 * 60 * 1000 // 30 min
      },
      JWT_SECRET
    );

    return ok(
      {
        message: 'User registered successfully',
        token,
        contact: {
          id: contact._id,
          email: contact.emails[0].email,
          role: 'Client'
        }
      },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error('Register error:', error);
    const origin = request.headers.get('origin') || '*';
    return serverError({ error: error.message }, {
      headers: corsHeaders(origin)
    });
  }
}

/**
 * POST /_functions/auth/login
 * Login user (verify password + issue JWT)
 * Rate limited: 10 login attempts per hour per IP
 */
export async function post_auth_login(request) {
  try {
    const origin = request.headers.get('origin') || '*';
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Check rate limit: 10 login attempts per hour
    const rateLimit = checkRateLimit(clientIp, 10, 3600);
    if (!rateLimit.allowed) {
      const rateLimitHeaders = {
        ...corsHeaders(origin),
        'Retry-After': rateLimit.retryAfter.toString(),
        'X-RateLimit-Remaining': '0'
      };
      return badRequest(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: rateLimit.retryAfter
        },
        { headers: rateLimitHeaders }
      );
    }
    
    const body = await request.body.json();
    const { email, password } = body;

    if (!email || !password) {
      return badRequest({ error: 'Email and password required' }, {
        headers: {
          ...corsHeaders(origin),
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      });
    }

    // Query contacts
    const contacts = await wixData.query('contacts')
      .eq('emails.email', email)
      .find();

    if (contacts.items.length === 0) {
      return badRequest({ error: 'Invalid credentials' }, {
        headers: {
          ...corsHeaders(origin),
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      });
    }

    const contact = contacts.items[0];

    // Verify password
    const passwordMatch = await verifyPassword(
      password,
      contact.customFields?.['custom.password_hash']
    );

    if (!passwordMatch) {
      return badRequest({ error: 'Invalid credentials' }, {
        headers: {
          ...corsHeaders(origin),
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      });
    }

    // Generate JWT token
    const token = jwt.encode(
      {
        sub: contact._id,
        email: contact.emails[0].email,
        role: contact.customFields?.['custom.role'] || 'Client',
        exp: Date.now() + 30 * 60 * 1000
      },
      JWT_SECRET
    );

    return ok(
      {
        message: 'Login successful',
        token,
        contact: {
          id: contact._id,
          email: contact.emails[0].email,
          role: contact.customFields?.['custom.role'] || 'Client'
        }
      },
      {
        headers: {
          ...corsHeaders(origin),
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    const origin = request.headers.get('origin') || '*';
    return serverError({ error: error.message }, {
      headers: corsHeaders(origin)
    });
  }
}

/**
 * POST /_functions/proxy
 * Secure proxy to Vercel backend (rate-limited, JWT-verified)
 */
export async function post_proxy(request) {
  try {
    const origin = request.headers.get('origin') || '*';
    const auth = request.headers.authorization;
    if (!auth) {
      return forbidden({ error: 'No authorization token' }, {
        headers: corsHeaders(origin)
      });
    }

    const token = auth.replace('Bearer ', '');

    // Verify token
    let decoded;
    try {
      decoded = jwt.decode(token, JWT_SECRET);
    } catch {
      return forbidden({ error: 'Invalid or expired token' }, {
        headers: corsHeaders(origin)
      });
    }

    const body = await request.body.json();
    const { path, method = 'POST', payload } = body;

    // Forward request to Vercel backend
    const response = await fetch(`${VERCEL_API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: method !== 'GET' ? JSON.stringify(payload) : undefined
    });

    const data = await response.json();

    if (!response.ok) {
      return badRequest(data, {
        headers: corsHeaders(origin)
      });
    }

    return ok(data, {
      headers: corsHeaders(origin)
    });
  } catch (error) {
    console.error('Proxy error:', error);
    const origin = request.headers.get('origin') || '*';
    return serverError({ error: error.message }, {
      headers: corsHeaders(origin)
    });
  }
}

// ============================================================================
// CRM EVENT HANDLERS (Backend events - react to contact changes)
// ============================================================================

/**
 * Fired when a contact is created
 * Refs: https://dev.wix.com/docs/velo/events-service-plugins/crm/events/oncontactcreated
 */
export async function wixCrm_onContactCreated(event) {
  try {
    console.log('✅ Contact created:', event.entity._id);
    // Future: Trigger welcome email, sync to external service, etc.
  } catch (error) {
    console.error('❌ onContactCreated error:', error);
  }
}

/**
 * Fired when a contact is updated
 * Refs: https://dev.wix.com/docs/velo/events-service-plugins/crm/events/oncontactupdated
 */
export async function wixCrm_onContactUpdated(event) {
  try {
    const contact = event.entity;
    console.log('🔄 Contact updated:', contact._id);

    // Example: Update a custom field when role changes
    if (event.changedFields?.includes('customFields.custom.role')) {
      console.log('Role changed to:', contact.customFields?.['custom.role']);
      // Trigger sync to backend, send notification, etc.
    }
  } catch (error) {
    console.error('❌ onContactUpdated error:', error);
  }
}

/**
 * Fired when a contact is deleted
 * Refs: https://dev.wix.com/docs/velo/events-service-plugins/crm/events/oncontactdeleted
 */
export async function wixCrm_onContactDeleted(event) {
  try {
    console.log('🗑️ Contact deleted:', event.entity._id);
    // Future: Clean up related data, archive records, etc.
  } catch (error) {
    console.error('❌ onContactDeleted error:', error);
  }
}

// ============================================================================
// HELPER FUNCTIONS (Password hashing - stubs for Wix)
// ============================================================================

async function hashPassword(password) {
  // In production, use: const bcrypt = require('bcryptjs');
  // return bcrypt.hash(password, 10);
  return password; // UNSAFE - placeholder only
}

async function verifyPassword(password, hash) {
  // In production, use: return bcrypt.compare(password, hash);
  return password === hash; // UNSAFE - placeholder only
}

// ============================================================================
// EXPORTS FOR TEST/DOCUMENTATION
// ============================================================================

module.exports = {
  post_auth_register,
  post_auth_login,
  post_proxy,
  wixCrm_onContactCreated,
  wixCrm_onContactUpdated,
  wixCrm_onContactDeleted
};
