// pages/client/LegalSupportPage.tsx
import React, { useState } from 'react';

interface LegalResource {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const LegalSupportPage: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    issue: '',
    description: '',
    priority: 'medium'
  });

  const resources: LegalResource[] = [
    {
      id: '1',
      title: 'Mining Regulatory Compliance Guide',
      description: 'Comprehensive guide to mining operations and regulatory requirements',
      category: 'Compliance',
      icon: '📚'
    },
    {
      id: '2',
      title: 'Contract Templates',
      description: 'Pre-reviewed contract templates for blockchain operations',
      category: 'Templates',
      icon: '📄'
    },
    {
      id: '3',
      title: 'Risk Assessment Tools',
      description: 'Tools to assess legal and operational risks in your projects',
      category: 'Tools',
      icon: '🔍'
    },
    {
      id: '4',
      title: 'Regulatory Updates',
      description: 'Latest updates on blockchain and mining regulations',
      category: 'News',
      icon: '📰'
    },
    {
      id: '5',
      title: 'Insurance Guide',
      description: 'Information about insurance options for blockchain operations',
      category: 'Insurance',
      icon: '🛡️'
    },
    {
      id: '6',
      title: 'IP Protection',
      description: 'Intellectual property protection strategies for blockchain projects',
      category: 'IP Law',
      icon: '⚡'
    }
  ];

  const attorneys = [
    {
      name: 'Sarah Mitchell, Esq.',
      specialization: 'Contract Law & Compliance',
      email: 'sarah@legal.example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'James Chen, Esq.',
      specialization: 'Regulatory & Government Relations',
      email: 'james@legal.example.com',
      phone: '+1 (555) 234-5678'
    },
    {
      name: 'Patricia Okonkwo, Esq.',
      specialization: 'Intellectual Property',
      email: 'patricia@legal.example.com',
      phone: '+1 (555) 345-6789'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support request:', formData);
    setFormData({ issue: '', description: '', priority: 'medium' });
    setShowContactForm(false);
  };

  return (
    <div>
      <h2 style={{ color: '#0A192F', fontSize: '28px', fontWeight: '700', marginBottom: '10px' }}>Legal Support & Protection</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>Access comprehensive legal resources and connect with our team of experienced attorneys</p>

      <button 
        onClick={() => setShowContactForm(!showContactForm)}
        style={{
          backgroundColor: '#C5A059',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          marginBottom: '30px'
        }}
      >
        {showContactForm ? '✕ Cancel' : '+ Request Legal Assistance'}
      </button>

      {showContactForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#0A192F', marginBottom: '20px' }}>Legal Support Request</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Issue Type</label>
              <select
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              >
                <option value="">Select an issue type...</option>
                <option value="contract">Contract Review</option>
                <option value="compliance">Regulatory Compliance</option>
                <option value="dispute">Legal Dispute</option>
                <option value="ip">Intellectual Property</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', minHeight: '120px' }}
                placeholder="Describe your legal support needs..."
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <button 
              type="submit"
              style={{
                backgroundColor: '#C5A059',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Submit Request
            </button>
          </form>
        </div>
      )}

      <h3 style={{ color: '#0A192F', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Legal Resources</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {resources.map(resource => (
          <div key={resource.id} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #C5A059',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            _hover: { transform: 'translateY(-2px)' }
          }}>
            <p style={{ fontSize: '32px', margin: '0 0 10px 0' }}>{resource.icon}</p>
            <h4 style={{ color: '#0A192F', margin: '0 0 8px 0' }}>{resource.title}</h4>
            <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>{resource.description}</p>
            <p style={{ color: '#C5A059', margin: 0, fontSize: '12px', fontWeight: '600' }}>📁 {resource.category}</p>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#0A192F', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Our Legal Team</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {attorneys.map((attorney, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderTop: '4px solid #C5A059'
          }}>
            <h4 style={{ color: '#0A192F', margin: '0 0 5px 0' }}>{attorney.name}</h4>
            <p style={{ color: '#666', margin: '0 0 15px 0', fontSize: '14px' }}>{attorney.specialization}</p>
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
              <p style={{ margin: '8px 0', fontSize: '14px', color: '#0A192F' }}>
                <strong>Email:</strong> <a href={`mailto:${attorney.email}`} style={{ color: '#C5A059', textDecoration: 'none' }}>{attorney.email}</a>
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px', color: '#0A192F' }}>
                <strong>Phone:</strong> <a href={`tel:${attorney.phone}`} style={{ color: '#C5A059', textDecoration: 'none' }}>{attorney.phone}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalSupportPage;
