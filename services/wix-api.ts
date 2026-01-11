import axios from 'axios';

export const WIX_BASE_URL = import.meta.env.VITE_WIX_API_BASE_URL || 'https://www.wixapis.com/v1';
export const WIX_API_KEY = import.meta.env.VITE_WIX_API_KEY || '';

// Velo HTTP Functions base (e.g., https://ulysse-ruff-williams.wixsite.com/_functions)
export const WIX_FUNCTIONS_BASE = import.meta.env.VITE_WIX_FUNCTIONS_BASE || '';

const wixApi = axios.create({
  baseURL: WIX_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(WIX_API_KEY ? { Authorization: `Bearer ${WIX_API_KEY}` } : {}),
  },
});

// Velo functions client (recommended for auth flows)
const wixFunctions = WIX_FUNCTIONS_BASE
  ? axios.create({
      baseURL: WIX_FUNCTIONS_BASE,
      headers: { 'Content-Type': 'application/json' },
    })
  : null;

// ============================================================================
// Collections
// ============================================================================

export const fetchServicesFromWix = async () => {
  const res = await wixApi.get('/items/services', {
    params: {
      sort: JSON.stringify([{ fieldName: 'title', order: 'ASC' }]),
    },
  });
  return res.data?.items ?? [];
};

// ============================================================================
// Authentication (via Velo HTTP Functions - RECOMMENDED)
// ============================================================================

/**
 * Register via Velo HTTP function
 * Preferred approach: server-side password hashing, JWT issuance
 */
export const wixRegister = async (email: string, password: string, role = 'Client') => {
  try {
    if (!wixFunctions) {
      throw new Error('WIX_FUNCTIONS_BASE not configured');
    }

    const res = await wixFunctions.post('/auth/register', {
      email,
      password,
      role
    });

    return res.data; // { token, contact, message }
  } catch (err: any) {
    console.error('❌ Register error:', err.response?.data || err.message);
    throw err?.response?.data || { error: err.message };
  }
};

/**
 * Login via Velo HTTP function
 * Recommended: server-side password verification, JWT issuance
 */
export const wixLogin = async (email: string, password: string) => {
  try {
    if (!wixFunctions) {
      throw new Error('WIX_FUNCTIONS_BASE not configured');
    }

    const res = await wixFunctions.post('/auth/login', {
      email,
      password
    });

    return res.data; // { token, contact, message }
  } catch (err: any) {
    console.error('❌ Login error:', err.response?.data || err.message);
    throw err?.response?.data || { error: err.message };
  }
};

// ============================================================================
// Proxy to Vercel Backend (optional, for advanced workflows)
// ============================================================================

/**
 * Call a Vercel backend endpoint via Wix proxy (JWT forwarding)
 * Use this to securely forward requests with token
 */
export const proxyToVercel = async (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
  payload?: any,
  token?: string
) => {
  try {
    if (!wixFunctions) {
      throw new Error('WIX_FUNCTIONS_BASE not configured for proxy');
    }

    const authToken = token || localStorage.getItem('token');
    if (!authToken) {
      throw new Error('No authentication token');
    }

    const res = await wixFunctions.post('/proxy', {
      path,
      method,
      payload
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    return res.data;
  } catch (err: any) {
    console.error('❌ Proxy error:', err.response?.data || err.message);
    throw err?.response?.data || { error: err.message };
  }
};

export default wixApi;
