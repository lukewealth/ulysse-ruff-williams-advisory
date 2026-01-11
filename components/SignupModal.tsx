import React, { useState } from 'react';
import { X } from 'lucide-react';
import { API_BASE_URL } from '../services/api';
import { useToast } from './ToastProvider';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('📝 Signup attempt:', { email });
    showToast('📝 Creating your account...', 'info');

    if (password !== confirmPassword) {
      console.warn('⚠️ Password mismatch');
      const msg = 'Passwords do not match';
      setError(msg);
      showToast(msg, 'warning');
      return;
    }

    if (password.length < 8) {
      console.warn('⚠️ Password too short');
      const msg = 'Password must be at least 8 characters';
      setError(msg);
      showToast(msg, 'warning');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Account created successfully');
        showToast('Account created! Welcome aboard! 🎉', 'success', 2000);
        localStorage.setItem('token', data.token);
        onClose();
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/client/dashboard';
        }, 500);
      } else {
        console.warn('❌ Signup failed:', data.message);
        const message = data.message || 'Registration failed. Please try again.';
        setError(message);
        showToast(message, 'error');
      }
    } catch (err) {
      console.error('⚠️ Signup error:', err);
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
          <h2 className="text-2xl font-serif text-navy">Create Account</h2>
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
            <p className="text-xs text-slate/50 mt-1">At least 8 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-navy mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
