// pages/client/MyProjectsPage.tsx
import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'On Hold' | 'Completed';
  progress: number;
  startDate: string;
  expectedEnd: string;
}

const MyProjectsPage: React.FC = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Blockchain Advisory - Phase 1',
      description: 'Technical due diligence and infrastructure assessment',
      status: 'Active',
      progress: 65,
      startDate: 'Dec 1, 2024',
      expectedEnd: 'Mar 15, 2025'
    },
    {
      id: '2',
      name: 'RWA Tokenization Strategy',
      description: 'Real world asset tokenization protocol development',
      status: 'Active',
      progress: 45,
      startDate: 'Dec 10, 2024',
      expectedEnd: 'Apr 30, 2025'
    },
    {
      id: '3',
      name: 'Mining Infrastructure Audit',
      description: 'Infrastructure validation and compliance check',
      status: 'Completed',
      progress: 100,
      startDate: 'Oct 15, 2024',
      expectedEnd: 'Nov 30, 2024'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return '#C5A059';
      case 'On Hold': return '#F59E0B';
      case 'Completed': return '#6B7280';
      default: return '#C5A059';
    }
  };

  return (
    <div>
      <h2 style={{ color: '#0A192F', fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>My Projects</h2>
      
      <button style={{
        backgroundColor: '#C5A059',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '600',
        marginBottom: '30px'
      }}>
        + New Project
      </button>

      <div style={{ display: 'grid', gap: '20px' }}>
        {projects.map(project => (
          <div key={project.id} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${getStatusColor(project.status)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div>
                <h3 style={{ color: '#0A192F', margin: '0 0 5px 0' }}>{project.name}</h3>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{project.description}</p>
              </div>
              <span style={{
                backgroundColor: getStatusColor(project.status),
                color: 'white',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {project.status}
              </span>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>Progress</span>
                <span style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>{project.progress}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${project.progress}%`,
                  height: '100%',
                  backgroundColor: '#C5A059',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px', color: '#666' }}>
              <div>
                <p style={{ margin: '0 0 5px 0' }}>Started</p>
                <p style={{ margin: 0, fontWeight: '600', color: '#0A192F' }}>{project.startDate}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0' }}>Expected Completion</p>
                <p style={{ margin: 0, fontWeight: '600', color: '#0A192F' }}>{project.expectedEnd}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjectsPage;
