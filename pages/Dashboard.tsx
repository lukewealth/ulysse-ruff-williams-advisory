import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, FolderOpen, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';

interface Project {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  budget: number;
  progress: number;
}

interface CaseFile {
  id: string;
  title: string;
  type: string;
  dateAdded: string;
  status: 'open' | 'review' | 'closed';
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  downloadUrl: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'cases' | 'invoices'>('overview');
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Blockchain Infrastructure Audit',
      status: 'active',
      startDate: '2026-01-05',
      budget: 50000,
      progress: 65
    },
    {
      id: '2',
      title: 'Smart Contract Review',
      status: 'active',
      startDate: '2025-12-20',
      budget: 35000,
      progress: 45
    },
    {
      id: '3',
      title: 'Compliance Assessment',
      status: 'completed',
      startDate: '2025-11-15',
      budget: 25000,
      progress: 100
    }
  ]);

  const [caseFiles, setCaseFiles] = useState<CaseFile[]>([
    {
      id: '1',
      title: 'AML Compliance Documentation',
      type: 'Legal',
      dateAdded: '2026-01-08',
      status: 'review'
    },
    {
      id: '2',
      title: 'Mining Pool Verification',
      type: 'Technical',
      dateAdded: '2026-01-06',
      status: 'open'
    },
    {
      id: '3',
      title: 'Regulatory Filing Package',
      type: 'Compliance',
      dateAdded: '2026-01-01',
      status: 'closed'
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2026-001',
      amount: 15000,
      dueDate: '2026-02-08',
      status: 'pending',
      downloadUrl: '/invoices/INV-2026-001.pdf'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2026-002',
      amount: 12500,
      dueDate: '2026-02-15',
      status: 'pending',
      downloadUrl: '/invoices/INV-2026-002.pdf'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-012',
      amount: 25000,
      dueDate: '2025-12-20',
      status: 'paid',
      downloadUrl: '/invoices/INV-2025-012.pdf'
    }
  ]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    
    // Simulate loading data
    setLoading(false);
  }, [navigate]);

  const handleDownloadInvoice = (invoice: Invoice) => {
    showToast(`Downloading ${invoice.invoiceNumber}...`, 'info');
    // Implement actual download logic
    console.log('Download invoice:', invoice.id);
  };

  const handleReviewCase = (caseFile: CaseFile) => {
    showToast(`Opening case: ${caseFile.title}`, 'info');
    navigate(`/case-filing?id=${caseFile.id}`);
  };

  const handleViewProject = (project: Project) => {
    showToast(`Viewing project: ${project.title}`, 'info');
    navigate(`/project/${project.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'open':
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy to-navy/90 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/95 to-navy/90 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-white mb-3">Client Dashboard</h1>
          <p className="text-gray-300">Manage your projects, review case files, and download invoices</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gold/30">
          {(['overview', 'projects', 'cases', 'invoices'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold text-sm transition-all duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-gold text-gold'
                  : 'text-gray-400 hover:text-gray-300 border-b-2 border-transparent'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Projects Summary */}
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <FolderOpen className="w-8 h-8 text-gold" />
                <span className="text-2xl font-bold text-gold">{projects.length}</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Active Projects</h3>
              <p className="text-gray-400 text-sm">
                {projects.filter(p => p.status === 'active').length} currently active
              </p>
              <button
                onClick={() => setActiveTab('projects')}
                className="mt-4 text-gold hover:text-gold/80 text-sm font-semibold transition-colors"
              >
                View All →
              </button>
            </div>

            {/* Case Files Summary */}
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-gold" />
                <span className="text-2xl font-bold text-gold">{caseFiles.length}</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Case Files</h3>
              <p className="text-gray-400 text-sm">
                {caseFiles.filter(c => c.status === 'review').length} pending review
              </p>
              <button
                onClick={() => setActiveTab('cases')}
                className="mt-4 text-gold hover:text-gold/80 text-sm font-semibold transition-colors"
              >
                Review →
              </button>
            </div>

            {/* Invoices Summary */}
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-gold" />
                <span className="text-2xl font-bold text-gold">
                  ${invoices
                    .filter(i => i.status === 'pending')
                    .reduce((sum, i) => sum + i.amount, 0)
                    .toLocaleString()}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-2">Outstanding</h3>
              <p className="text-gray-400 text-sm">
                {invoices.filter(i => i.status === 'pending').length} invoices pending
              </p>
              <button
                onClick={() => setActiveTab('invoices')}
                className="mt-4 text-gold hover:text-gold/80 text-sm font-semibold transition-colors"
              >
                Manage →
              </button>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-white mb-6">Your Projects</h2>
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400">Started: {new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gold rounded-full h-2 transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gold font-semibold">
                    Budget: ${project.budget.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleViewProject(project)}
                    className="px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Case Files Tab */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-white mb-6">Case Files</h2>
            {caseFiles.map((caseFile) => (
              <div
                key={caseFile.id}
                className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{caseFile.title}</h3>
                    <p className="text-sm text-gray-400">
                      Type: {caseFile.type} • Added: {new Date(caseFile.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(caseFile.status)}`}>
                    {caseFile.status.charAt(0).toUpperCase() + caseFile.status.slice(1)}
                  </span>
                </div>

                <button
                  onClick={() => handleReviewCase(caseFile)}
                  className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Review & Comment
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-white mb-6">Invoices</h2>
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{invoice.invoiceNumber}</h3>
                    <p className="text-sm text-gray-400">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gold">
                    ${invoice.amount.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(invoice)}
                    className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
