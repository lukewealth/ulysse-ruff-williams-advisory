// components/layouts/ClientLayout.tsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ClientLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/client/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: isMenuOpen ? '250px' : '60px', 
        backgroundColor: '#0A192F', 
        color: 'white', 
        padding: '20px',
        transition: 'width 0.3s ease',
        overflowY: 'auto'
      }}>
        {isMenuOpen && <h2 style={{ color: '#C5A059', marginBottom: '30px', fontSize: '18px', fontWeight: '700' }}>Client Portal</h2>}
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <a href="/client/dashboard" style={{ color: '#E0E0E0', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ minWidth: '24px' }}>📊</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>Dashboard</span>}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="/client/projects" style={{ color: '#E0E0E0', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ minWidth: '24px' }}>📁</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>My Projects</span>}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="/client/case-filing" style={{ color: '#E0E0E0', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ minWidth: '24px' }}>📋</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>Case Filing</span>}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="/client/investments" style={{ color: '#E0E0E0', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ minWidth: '24px' }}>💰</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>Investments & ROI</span>}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="/client/invoices" style={{ color: '#E0E0E0', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ minWidth: '24px' }}>📥</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>Invoices & Downloads</span>}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="/client/support" style={{ color: '#E0E0E0', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ minWidth: '24px' }}>⚖️</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>Legal Support</span>}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="/client/profile" style={{ color: '#E0E0E0', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ minWidth: '24px' }}>⚙️</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>Profile & Settings</span>}
              </a>
            </li>
            <li style={{ marginBottom: '15px', marginTop: '30px', borderTop: '1px solid #333', paddingTop: '15px' }}>
              <button 
                onClick={handleLogout}
                style={{ 
                  width: '100%',
                  color: '#E0E0E0', 
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  transition: 'background-color 0.2s' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2a47'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ minWidth: '24px' }}>🚪</span>
                {isMenuOpen && <span style={{ marginLeft: '10px' }}>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <header style={{ backgroundColor: 'white', padding: '20px', marginBottom: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#0A192F', margin: '0', fontSize: '28px', fontWeight: '700' }}>Welcome to Your Portal</h1>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Manage your projects and investments</p>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              backgroundColor: '#C5A059', 
              color: '#fff',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {isMenuOpen ? '◀ Hide' : '▶ Show'}
          </button>
        </header>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flexGrow: 1 }}>
          <Outlet /> {/* This is where nested routes will render */}
        </div>
      </main>
    </div>
  );
};

export default ClientLayout;
