// pages/client/InvoicesDownloadsPage.tsx
import React, { useState } from 'react';

interface Document {
  id: string;
  name: string;
  type: 'Invoice' | 'Contract' | 'Report' | 'Receipt';
  date: string;
  amount?: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  downloadUrl: string;
}

const InvoicesDownloadsPage: React.FC = () => {
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Invoice - Blockchain Advisory Q1 2025',
      type: 'Invoice',
      date: 'Jan 5, 2025',
      amount: 25000,
      status: 'Paid',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Service Agreement - RWA Tokenization',
      type: 'Contract',
      date: 'Dec 20, 2024',
      status: 'Pending',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'Quarterly Report - Q4 2024',
      type: 'Report',
      date: 'Dec 15, 2024',
      status: 'Paid',
      downloadUrl: '#'
    },
    {
      id: '4',
      name: 'Invoice - Mining Infrastructure Support',
      type: 'Invoice',
      date: 'Dec 10, 2024',
      amount: 15000,
      status: 'Paid',
      downloadUrl: '#'
    },
    {
      id: '5',
      name: 'Payment Receipt - November 2024',
      type: 'Receipt',
      date: 'Dec 1, 2024',
      amount: 10000,
      status: 'Paid',
      downloadUrl: '#'
    },
    {
      id: '6',
      name: 'Invoice - Legal Support Services',
      type: 'Invoice',
      date: 'Nov 25, 2024',
      amount: 8500,
      status: 'Overdue',
      downloadUrl: '#'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return '#C5A059';
      case 'Pending': return '#F59E0B';
      case 'Overdue': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Invoice': return '📄';
      case 'Contract': return '📋';
      case 'Report': return '📊';
      case 'Receipt': return '✓';
      default: return '📎';
    }
  };

  return (
    <div>
      <h2 style={{ color: '#0A192F', fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>Invoices & Downloads</h2>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <p style={{ color: '#666', margin: '0 0 8px 0', fontSize: '14px' }}>Total Documents</p>
            <p style={{ color: '#0A192F', margin: 0, fontSize: '24px', fontWeight: '700' }}>{documents.length}</p>
          </div>
          <div>
            <p style={{ color: '#666', margin: '0 0 8px 0', fontSize: '14px' }}>Invoices Paid</p>
            <p style={{ color: '#C5A059', margin: 0, fontSize: '24px', fontWeight: '700' }}>${documents.filter(d => d.status === 'Paid' && d.amount).reduce((sum, d) => sum + (d.amount || 0), 0).toLocaleString()}</p>
          </div>
          <div>
            <p style={{ color: '#666', margin: '0 0 8px 0', fontSize: '14px' }}>Pending Invoices</p>
            <p style={{ color: '#F59E0B', margin: 0, fontSize: '24px', fontWeight: '700' }}>${documents.filter(d => d.status === 'Pending' && d.amount).reduce((sum, d) => sum + (d.amount || 0), 0).toLocaleString()}</p>
          </div>
          <div>
            <p style={{ color: '#666', margin: '0 0 8px 0', fontSize: '14px' }}>Overdue Invoices</p>
            <p style={{ color: '#EF4444', margin: 0, fontSize: '24px', fontWeight: '700' }}>${documents.filter(d => d.status === 'Overdue' && d.amount).reduce((sum, d) => sum + (d.amount || 0), 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#0A192F' }}>Document</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#0A192F' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#0A192F' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#0A192F' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#0A192F' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#0A192F' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={doc.id} style={{ borderBottom: idx < documents.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <td style={{ padding: '12px', color: '#0A192F', fontWeight: '500' }}>
                  <span style={{ marginRight: '8px' }}>{getTypeIcon(doc.type)}</span>
                  {doc.name}
                </td>
                <td style={{ padding: '12px', color: '#666' }}>{doc.type}</td>
                <td style={{ padding: '12px', color: '#666' }}>{doc.date}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#0A192F', fontWeight: '600' }}>
                  {doc.amount ? `$${doc.amount.toLocaleString()}` : '-'}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{
                    backgroundColor: getStatusColor(doc.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {doc.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button style={{
                    backgroundColor: '#C5A059',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    ⬇ Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F5F3EE', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#0A192F' }}>📌 Reminder</p>
        <p style={{ margin: 0, color: '#1E40AF', fontSize: '14px' }}>You have 1 overdue invoice. Please review and settle payment to avoid late fees.</p>
      </div>
    </div>
  );
};

export default InvoicesDownloadsPage;
