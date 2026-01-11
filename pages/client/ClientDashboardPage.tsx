// pages/client/ClientDashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api';

interface User {
  email: string;
  role: string;
  id?: string;
}

const ClientDashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{ color: '#0A192F', fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>Dashboard Overview</h2>
      
      {error && (
        <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {user && (
        <div style={{ backgroundColor: '#f0f4f8', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <p style={{ margin: '5px 0', color: '#0A192F' }}><strong>Logged in as:</strong> {user.email}</p>
          <p style={{ margin: '5px 0', color: '#0A192F' }}><strong>Role:</strong> {user.role}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {/* Card 1: Active Projects */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #C5A059'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
          <h3 style={{ color: '#0A192F', margin: '0 0 10px 0' }}>Active Projects</h3>
          <p style={{ color: '#666', margin: 0 }}>You have <strong>3</strong> active projects</p>
          <a href="/client/projects" style={{ color: '#C5A059', textDecoration: 'none', fontWeight: '600', marginTop: '10px', display: 'inline-block' }}>View Projects →</a>
        </div>

        {/* Card 2: Pending Investments */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #C5A059'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>💰</div>
          <h3 style={{ color: '#0A192F', margin: '0 0 10px 0' }}>Investments</h3>
          <p style={{ color: '#666', margin: 0 }}>Total ROI: <strong>+$45,230</strong></p>
          <a href="/client/investments" style={{ color: '#C5A059', textDecoration: 'none', fontWeight: '600', marginTop: '10px', display: 'inline-block' }}>View Details →</a>
        </div>

        {/* Card 3: Open Cases */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #C5A059'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚖️</div>
          <h3 style={{ color: '#0A192F', margin: '0 0 10px 0' }}>Open Cases</h3>
          <p style={{ color: '#666', margin: 0 }}>You have <strong>2</strong> open legal cases</p>
          <a href="/client/case-filing" style={{ color: '#C5A059', textDecoration: 'none', fontWeight: '600', marginTop: '10px', display: 'inline-block' }}>Manage Cases →</a>
        </div>

        {/* Card 4: Pending Documents */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #C5A059'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📥</div>
          <h3 style={{ color: '#0A192F', margin: '0 0 10px 0' }}>Documents</h3>
          <p style={{ color: '#666', margin: 0 }}>You have <strong>5</strong> new documents</p>
          <a href="/client/invoices" style={{ color: '#C5A059', textDecoration: 'none', fontWeight: '600', marginTop: '10px', display: 'inline-block' }}>View Documents →</a>
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#0A192F', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Recent Activity</h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px'
        }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '4px',
            borderLeft: '3px solid #C5A059'
          }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#0A192F' }}>Project "Blockchain Advisory" Updated</p>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>2 hours ago</p>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '4px',
            borderLeft: '3px solid #C5A059'
          }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#0A192F' }}>New Invoice: INV-2024-1205</p>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>1 day ago</p>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '4px',
            borderLeft: '3px solid #C5A059'
          }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#0A192F' }}>Case Hearing Scheduled</p>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardPage;
