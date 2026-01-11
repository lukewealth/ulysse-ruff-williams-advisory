import React, { useState } from 'react';
import { X } from 'lucide-react';
import { wixLogin } from '../services/wix-api';
import { useToast } from './ToastProvider';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('🔐 Login attempt:', { email });
    showToast('🔐 Logging in...', 'info');

    try {
      const data = await wixLogin(email, password);

      if (data?.token) {
        console.log('✅ Login successful (token received)');
        showToast('Welcome back! Redirecting...', 'success', 2000);
        localStorage.setItem('token', data.token);
        onClose();
        setTimeout(() => (window.location.href = '/dashboard'), 500);
      } else if (data?.contact) {
        // Contact found but no token — recommend server-side auth (Velo).
        const msg = 'Account found. Please use site login (server-side auth required).';
        console.warn('⚠️', msg);
        setError(msg);
        showToast(msg, 'warning');
      } else {
        const message = data?.error || 'Login failed. Please try again.';
        console.warn('❌ Login failed:', message);
        setError(message);
        showToast(message, 'error');
      }
    } catch (err) {
      console.error('⚠️ Login error:', err);
      const errorMsg = 'Connection error. Please try again.';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-serif text-navy">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all duration-200 active:shadow-md active:shadow-gray-400/50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-navy mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-amber-600 hover:shadow-lg hover:shadow-gray-400/40 active:shadow-md active:shadow-gray-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
