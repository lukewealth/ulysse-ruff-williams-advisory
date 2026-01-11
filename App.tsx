
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import InsightDetailPage from './pages/InsightDetailPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import PortfolioPage from './pages/PortfolioPage';
import TeamPage from './pages/TeamPage';
import AMLSanctionsPage from './pages/AMLSanctions';
import BlockchainSecurityPage from './pages/BlockchainSecurity';
import DigitalAssetsPage from './pages/DigitalAssets';
import ExpertisePage from './pages/Expertise';
import IndustriesPage from './pages/Industries';
import MiningCompliancePage from './pages/MiningCompliance';
import PublicationsPage from './pages/Publications';
import RegulatoryInsightPage from './pages/RegulatoryInsight';

// Layouts
import ClientLayout from './components/layouts/ClientLayout';

// Client Portal Pages
import ClientDashboardPage from './pages/client/ClientDashboardPage';
import LoginPage from './pages/client/LoginPage'; // New Import
import RegisterPage from './pages/client/RegisterPage'; // New Import
import MyProjectsPage from './pages/client/MyProjectsPage';
import CaseFilingPage from './pages/client/CaseFilingPage';
import InvestmentsROIPage from './pages/client/InvestmentsROIPage';
import InvoicesDownloadsPage from './pages/client/InvoicesDownloadsPage';
import LegalSupportPage from './pages/client/LegalSupportPage';
import ProfileSettingsPage from './pages/client/ProfileSettingsPage';


// Components
import ProtectedRoute from './components/ProtectedRoute'; // New Import


function App() {
  return (
    <Router>
      <Routes>
        {/* Existing Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/insights/:id" element={<InsightDetailPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/team" element={<TeamPage />} />
        
        {/* Additional Public Pages */}
        <Route path="/aml-sanctions" element={<AMLSanctionsPage />} />
        <Route path="/blockchain-security" element={<BlockchainSecurityPage />} />
        <Route path="/digital-assets" element={<DigitalAssetsPage />} />
        <Route path="/expertise" element={<ExpertisePage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/mining-compliance" element={<MiningCompliancePage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/regulatory-insight" element={<RegulatoryInsightPage />} />

        {/* Authentication Routes */}
        <Route path="/client/login" element={<LoginPage />} />
        <Route path="/client/register" element={<RegisterPage />} />

        {/* New Client Portal Routes (Protected) */}
        <Route path="/client" element={<ProtectedRoute />}>
          <Route element={<ClientLayout />}>
            <Route index element={<ClientDashboardPage />} />
            <Route path="dashboard" element={<ClientDashboardPage />} />
            <Route path="projects" element={<MyProjectsPage />} />
            <Route path="case-filing" element={<CaseFilingPage />} />
            <Route path="investments" element={<InvestmentsROIPage />} />
            <Route path="invoices" element={<InvoicesDownloadsPage />} />
            <Route path="support" element={<LegalSupportPage />} />
            <Route path="profile" element={<ProfileSettingsPage />} />
            {/* Add more client routes here later */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
