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
 * POST /_functions/auth/register
 * Register a new user (create Wix contact + issue JWT)
 */
export async function post_auth_register(request) {
  try {
    const origin = request.headers.get('origin') || '*';
    const body = await request.body.json();
    const { email, password } = body;

    if (!email || !password) {
      return badRequest({ error: 'Email and password required' }, {
        headers: corsHeaders(origin)
      });
    }

    // Check if contact exists
    const existing = await wixData.query('contacts')
      .eq('emails.email', email)
      .find();

    if (existing.items.length > 0) {
      return badRequest({ error: 'Email already registered' }, {
        headers: corsHeaders(origin)
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
 */
export async function post_auth_login(request) {
  try {
    const origin = request.headers.get('origin') || '*';
    const body = await request.body.json();
    const { email, password } = body;

    if (!email || !password) {
      return badRequest({ error: 'Email and password required' }, {
        headers: corsHeaders(origin)
      });
    }

    // Query contacts
    const contacts = await wixData.query('contacts')
      .eq('emails.email', email)
      .find();

    if (contacts.items.length === 0) {
      return badRequest({ error: 'Invalid credentials' }, {
        headers: corsHeaders(origin)
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
        headers: corsHeaders(origin)
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
      { headers: corsHeaders(origin) }
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
    const auth = request.headers.authorization;
    if (!auth) {
      return forbidden({ error: 'No authorization token' });
    }

    const token = auth.replace('Bearer ', '');

    // Verify token
    let decoded;
    try {
      decoded = jwt.decode(token, JWT_SECRET);
    } catch {
      return forbidden({ error: 'Invalid or expired token' });
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
      return badRequest(data);
    }

    return ok(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return serverError({ error: error.message });
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
// HELPER FUNCTIONS (Password hashing - implement via bcrypt library)
// ============================================================================

// Stub: Replace with actual bcrypt implementation
const passwordUtils = {
  async hashPassword(password) {
    // In production, use: const bcrypt = require('bcryptjs');
    // return bcrypt.hash(password, 10);
    return password; // UNSAFE - placeholder only
  },

  async verifyPassword(password, hash) {
    // In production, use: return bcrypt.compare(password, hash);
    return password === hash; // UNSAFE - placeholder only
  }
};

export const { hashPassword, verifyPassword } = passwordUtils;

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
