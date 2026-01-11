PROJECT NAME: ProofLex WebApp - Client & Admin Portal

DESCRIPTION:
Build a full-stack Vite + React web application with separate Client and Admin portals. 
The platform supports legal-tech, crypto mining, investment, and project management workflows. 
It includes interactive dashboards, micro-interactions, billing, ROI calculations, case filing, mining pool protections, and invoice downloads.

TECH STACK:
- Frontend: Vite + React 18
- Styling: TailwindCSS (optionally Radix UI / Chakra UI)
- Routing: React Router v6
- State Management: Redux Toolkit or Zustand
- Backend: Node.js + Express or NestJS (or mock with JSON server)
- Database: PostgreSQL or MongoDB
- Authentication: JWT-based, role-based access (Client/Admin)
- Storage: AWS S3 / Firebase Storage for invoices & documents
- Optional: TypeScript for type safety

USER ROLES & AUTH:
Client:
- Login to personal dashboard
- Access projects, invoices, ROI calculations
- Case filing and support requests

Admin:
- Full control over clients, projects, mining pools
- Generate invoices
- Audit logs
- ROI and investment network insights

Auth Features:
- Email/password login
- Forgot password
- Role-based route guarding

NAVIGATION:
Client:
- Dashboard
- My Projects
- Case Filing
- Investments & ROI
- Invoices & Downloads
- Legal Support / Miners Protection
- Profile / Settings

Admin:
- Dashboard Overview
- Project Management
- Client Management
- Mining Pools Protection
- ROI & Investment Network
- Billing Catalog / Invoice Audit
- Reports & Analytics
- Admin Settings

DASHBOARDS & MICRO-INTERACTIONS:
Client Dashboard:
- Interactive cards: Projects, Investments, Pending Cases, ROI
- Charts & graphs: ROI over time, investment network map
- Hover effects & tooltips for metrics
- Notifications: pending invoices, mining alerts

Admin Dashboard:
- Project Map: all active projects by category & status
- Investment Network: graph of investors, miners, ROI
- Mining Pool Protection Status: interactive badges
- Billing Catalog: auditable invoices
- Invoice download: CSV/PDF
- Case Management: status badges & timelines

PROJECT CATEGORIES:
- Mining Projects
- Investor Projects
- Legal Cases
- Audit Reports
- ROI & Financial Reports
- Compliance & Protection

PROJECT CARD ELEMENTS:
- Title
- Status (Active, Pending, Completed)
- ROI %
- Investment Amount
- Mining Pool Protection Status
- Action Buttons: View, Edit, Download Invoice

CORE FEATURES:
1. Case Filing - form submission and status tracking
2. Project Mapping - visual map / Kanban board
3. Investment Network & ROI Calculation - network graph, projected ROI
4. Mining Pools Protection - security alerts and badges
5. Billing & Invoice System - generate/download invoices, filter by audit/project
6. Miners Legal Protection - client portal for legal agreements, smart contract summaries

UI/UX REQUIREMENTS:
- Modern theme: Blue / White / Gold / Micro Yellow accents
- Responsive design: Mobile-first, desktop optimized
- Illustrations & icons: mining, projects, ROI, legal protection
- Micro-interactions: hover cards, live graph updates, notifications slide-in
- Accessibility: keyboard navigation, ARIA labels

TECHNICAL REQUIREMENTS:
- Backend API endpoints for dashboard CRUD operations
- Frontend components: cards, tables, charts, modals, forms, notifications
- Business logic: ROI computation, billing catalog, case workflows
- Security: JWT auth, role-based access, input validation
- Modular, reusable components

DELIVERABLES:
- Full Vite + React project
- Client and Admin portals
- Interactive dashboards
- Project categories & mapping interface
- Investment network visualization
- ROI calculator
- Mining pool status tracker
- Billing catalog + invoice download
- Case filing & legal protection tracking
- Fully commented code
- Sample seed data for testing
- Responsive layouts

MICRO-INTERACTIONS & ANIMATIONS:
- Fade-in, slide-up, hover lift
- Duration: 200-300ms
- Easing: ease-out

NOTES:
- Use global Tailwind tokens for colors, typography, spacing, shadows
- Blue/White/Gold with Micro Yellow accents for highlights
- Ensure dashboards are clean, professional, and investor-ready
- Prioritize simplicity, clarity, and modular code structure
