// pages/client/CaseFilingPage.tsx
import React, { useState } from 'react';

interface Case {
  id: string;
  title: string;
  description: string;
  filedDate: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  nextHearing?: string;
  attorney: string;
}

const CaseFilingPage: React.FC = () => {
  const [cases] = useState<Case[]>([
    {
      id: '1',
      title: 'Contract Dispute - ABC Corp',
      description: 'Dispute over service delivery contract terms',
      filedDate: 'Nov 20, 2024',
      status: 'In Progress',
      nextHearing: 'Jan 15, 2025',
      attorney: 'Sarah Mitchell, Esq.'
    },
    {
      id: '2',
      title: 'Regulatory Compliance Review',
      description: 'SEC compliance review for blockchain operations',
      filedDate: 'Dec 1, 2024',
      status: 'Pending',
      nextHearing: 'Jan 22, 2025',
      attorney: 'James Chen, Esq.'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    caseType: 'contract'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Case filed:', formData);
    setFormData({ title: '', description: '', caseType: 'contract' });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress': return '#C5A059';
      case 'Pending': return '#F59E0B';
      case 'Resolved': return '#6B7280';
      default: return '#999';
    }
  };

  return (
    <div>
      <h2 style={{ color: '#0A192F', fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>Case Filing & Management</h2>

      <button 
        onClick={() => setShowForm(!showForm)}
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
        {showForm ? '✕ Cancel' : '+ File New Case'}
      </button>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#0A192F', marginBottom: '20px' }}>File a New Case</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Case Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                placeholder="e.g., Contract Dispute with XYZ Company"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0A192F' }}>Case Type</label>
              <select
                value={formData.caseType}
                onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              >
                <option value="contract">Contract Dispute</option>
                <option value="regulatory">Regulatory Compliance</option>
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
                placeholder="Provide details about your case..."
              />
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
              Submit Case
            </button>
          </form>
        </div>
      )}

      <h3 style={{ color: '#0A192F', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Your Cases</h3>

      <div style={{ display: 'grid', gap: '20px' }}>
        {cases.map(caseItem => (
          <div key={caseItem.id} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${getStatusColor(caseItem.status)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div>
                <h4 style={{ color: '#0A192F', margin: '0 0 5px 0' }}>{caseItem.title}</h4>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{caseItem.description}</p>
              </div>
              <span style={{
                backgroundColor: getStatusColor(caseItem.status),
                color: 'white',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {caseItem.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', fontSize: '14px', color: '#666' }}>
              <div>
                <p style={{ margin: '0 0 5px 0' }}>Filed Date</p>
                <p style={{ margin: 0, fontWeight: '600', color: '#0A192F' }}>{caseItem.filedDate}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0' }}>Attorney</p>
                <p style={{ margin: 0, fontWeight: '600', color: '#0A192F' }}>{caseItem.attorney}</p>
              </div>
              {caseItem.nextHearing && (
                <div>
                  <p style={{ margin: '0 0 5px 0' }}>Next Hearing</p>
                  <p style={{ margin: 0, fontWeight: '600', color: '#0A192F' }}>{caseItem.nextHearing}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseFilingPage;
