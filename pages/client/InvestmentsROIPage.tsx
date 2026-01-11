// pages/client/InvestmentsROIPage.tsx
import React, { useState } from 'react';

interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  invested: string;
  currentValue: number;
  roi: number;
  status: 'Active' | 'Pending' | 'Completed';
}

const InvestmentsROIPage: React.FC = () => {
  const [investments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Blockchain Infrastructure Fund',
      type: 'Equity Investment',
      amount: 100000,
      invested: 'Aug 15, 2024',
      currentValue: 145230,
      roi: 45.23,
      status: 'Active'
    },
    {
      id: '2',
      name: 'RWA Tokenization Project',
      type: 'Project Investment',
      amount: 50000,
      invested: 'Oct 1, 2024',
      currentValue: 58750,
      roi: 17.50,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Mining Operations Support',
      type: 'Infrastructure Investment',
      amount: 75000,
      invested: 'May 20, 2024',
      currentValue: 92100,
      roi: 22.80,
      status: 'Active'
    }
  ]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGain = totalValue - totalInvested;
  const averageROI = (totalGain / totalInvested * 100).toFixed(2);

  return (
    <div>
      <h2 style={{ color: '#0A192F', fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>Investments & ROI Analysis</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #C5A059'
        }}>
          <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>Total Invested</p>
          <p style={{ color: '#0A192F', margin: 0, fontSize: '24px', fontWeight: '700' }}>${totalInvested.toLocaleString()}</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #C5A059'
        }}>
          <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>Current Portfolio Value</p>
          <p style={{ color: '#0A192F', margin: 0, fontSize: '24px', fontWeight: '700' }}>${totalValue.toLocaleString()}</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #C5A059'
        }}>
          <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>Total Gain</p>
          <p style={{ color: '#C5A059', margin: 0, fontSize: '24px', fontWeight: '700' }}>+${totalGain.toLocaleString()}</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #F59E0B'
        }}>
          <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>Average ROI</p>
          <p style={{ color: '#C5A059', margin: 0, fontSize: '24px', fontWeight: '700' }}>{averageROI}%</p>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#0A192F', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Investment Breakdown</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#0A192F' }}>Investment Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#0A192F' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#0A192F' }}>Invested</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#0A192F' }}>Current Value</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#0A192F' }}>ROI</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#0A192F' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(inv => (
                <tr key={inv.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', color: '#0A192F', fontWeight: '600' }}>{inv.name}</td>
                  <td style={{ padding: '12px', color: '#666' }}>{inv.type}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#0A192F' }}>${inv.amount.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#0A192F', fontWeight: '600' }}>${inv.currentValue.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#C5A059', fontWeight: '600' }}>+{inv.roi.toFixed(2)}%</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: '#F5F3EE',
                      color: '#8B6F47',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F0F4F8', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#0A192F' }}>💡 Investment Insights</p>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Your portfolio is performing well with an average ROI of {averageROI}%. Consider diversifying across different investment types for optimal returns.</p>
      </div>
    </div>
  );
};

export default InvestmentsROIPage;
