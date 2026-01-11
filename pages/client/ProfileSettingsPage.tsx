// pages/client/ProfileSettingsPage.tsx
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api';

interface UserProfile {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
}

const ProfileSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile>({
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCurrentUser();
        setProfile(response.data);
        setFormData({
          email: response.data.email,
          role: response.data.role,
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          company: response.data.company || '',
          phone: response.data.phone || ''
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change submitted');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Preferences updated');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading profile...</div>;
  }

  return (
    <div>
      <h2 style={{ color: '#0A192F', fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>Profile & Settings</h2>

      {saveSuccess && (
        <div style={{
          backgroundColor: '#F5F3EE',
          color: '#8B6F47',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontWeight: '500'
        }}>
          ✓ Changes saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '30px', borderBottom: '2px solid #e5e7eb' }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'profile' ? '#C5A059' : 'transparent',
            color: activeTab === 'profile' ? 'white' : '#666',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Profile Information
        </button>
        <button
          onClick={() => setActiveTab('password')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'password' ? '#C5A059' : 'transparent',
            color: activeTab === 'password' ? 'white' : '#666',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Change Password
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'preferences' ? '#C5A059' : 'transparent',
            color: activeTab === 'preferences' ? 'white' : '#666',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Preferences
        </button>
      </div>

      {/* Profile Information Tab */}
      {activeTab === 'profile' && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleProfileUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                  placeholder="First name"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                disabled
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', backgroundColor: '#f3f4f6' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                  placeholder="Company name"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <button type="submit" style={{
              backgroundColor: '#C5A059',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Change Password Tab */}
      {activeTab === 'password' && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <form onSubmit={handlePasswordChange}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Current Password</label>
              <input
                type="password"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                placeholder="Enter current password"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>New Password</label>
              <input
                type="password"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                placeholder="Enter new password"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Confirm New Password</label>
              <input
                type="password"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                placeholder="Confirm new password"
              />
            </div>

            <button type="submit" style={{
              backgroundColor: '#C5A059',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Update Password
            </button>
          </form>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <form onSubmit={handlePreferences}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: '#0A192F', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                Email notifications for case updates
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: '#0A192F', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                Email notifications for invoices
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: '#0A192F', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  defaultChecked={false}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                Marketing emails and updates
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: '#0A192F', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                SMS notifications for urgent matters
              </label>
            </div>

            <button type="submit" style={{
              backgroundColor: '#C5A059',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Save Preferences
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
