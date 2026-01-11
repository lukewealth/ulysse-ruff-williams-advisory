// pages/client/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register({ email, password });
      navigate('/client/login');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to register';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0A192F', padding: '20px' }}>
      <form onSubmit={handleRegister} style={{ padding: '40px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#0A192F', marginBottom: '30px' }}>Create Client Account</h2>
        {error && <p style={{ color: '#DC2626', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            borderRadius: '4px', 
            border: 'none', 
            backgroundColor: loading ? '#cccccc' : '#C5A059', 
            color: '#fff', 
            fontWeight: 'bold', 
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>
          Already have an account? <a href="/client/login" style={{ color: '#C5A059', textDecoration: 'none', fontWeight: 'bold' }}>Login here</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;