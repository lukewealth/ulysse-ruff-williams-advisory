# Frontend Setup & Configuration Guide

## Overview
The frontend is built with React 19, TypeScript, and Tailwind CSS. It includes both public pages and a protected client portal with authentication.

## Prerequisites
- Node.js 18.0+
- npm or yarn
- Modern web browser

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
GEMINI_API_KEY=your-gemini-api-key-optional
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## Project Structure

```
├── pages/
│   ├── HomePage.tsx
│   ├── ServiceDetailPage.tsx
│   ├── InsightDetailPage.tsx
│   ├── CaseStudiesPage.tsx
│   ├── PortfolioPage.tsx
│   ├── TeamPage.tsx
│   └── client/
│       ├── ClientDashboardPage.tsx
│       ├── LoginPage.tsx
│       ├── RegisterPage.tsx
│       ├── MyProjectsPage.tsx
│       ├── CaseFilingPage.tsx
│       ├── InvestmentsROIPage.tsx
│       ├── InvoicesDownloadsPage.tsx
│       ├── LegalSupportPage.tsx
│       └── ProfileSettingsPage.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServicesSection.tsx
│   ├── InsightsSection.tsx
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── ProtectedRoute.tsx
│   └── layouts/
│       └── ClientLayout.tsx
├── services/
│   └── api.ts
├── App.tsx
├── index.tsx
└── types.ts
```

## Public Pages

### Home Page
- Hero section with call-to-action
- Services showcase
- Insights/blog section
- Case studies
- About section
- Contact form

### Service Detail Page
- Detailed service information
- Related services
- CTA buttons

### Insight Detail Page
- Full article content
- Related articles
- Share options

### Case Studies Page
- Case study cards
- Filter by industry
- Detailed case information

### Portfolio Page
- Project showcase
- Gallery/images
- Project details

### Team Page
- Team member profiles
- Expertise areas
- Contact information

## Client Portal Pages (Protected)

All client portal pages require authentication (token in localStorage).

### Dashboard
- Quick stats cards
- Recent activity
- Navigation to other sections

### My Projects
- List of active projects
- Project progress bars
- Start/end dates
- Status tracking

### Case Filing
- File new cases
- View existing cases
- Case details and status
- Attorney information

### Investments & ROI
- Portfolio summary
- Investment breakdown
- ROI calculation
- Investment details table

### Invoices & Downloads
- Invoice list with filters
- Download functionality
- Payment status
- Amount tracking

### Legal Support
- Legal resources
- Contact attorneys
- Support request form
- Knowledge base

### Profile & Settings
- User information
- Password change
- Notification preferences
- Account settings

## Authentication Flow

### Registration
1. User fills registration form
2. Frontend sends POST to `/api/auth/register`
3. Backend creates user in MongoDB
4. User redirected to login

### Login
1. User enters email and password
2. Frontend sends POST to `/api/auth/login`
3. Backend validates and returns JWT token
4. Frontend stores token in localStorage
5. User redirected to client dashboard

### Protected Routes
- ProtectedRoute component checks for token
- Redirects to login if token missing
- Provides token to all API requests via interceptor

## API Service Layer

The `services/api.ts` file provides:

### Authentication Functions
- `login(credentials)` - User login
- `register(userData)` - User registration
- `getCurrentUser()` - Fetch current user

### Content Functions
- `fetchServices()` - Get all services
- `fetchServiceById(id)` - Get service details
- `fetchInsights()` - Get all insights
- `fetchInsightById(id)` - Get insight details
- `fetchCaseStudies()` - Get case studies
- `fetchTeamMembers()` - Get team info
- `submitContactForm(data)` - Submit contact

### Token Interceptor
Automatically adds token to all requests:
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});
```

## Styling

### Tailwind CSS
Primary configuration in `tailwind.config.js`:
- Color palette: Navy (#0A192F), Gold (#C5A059)
- Responsive design
- Custom utilities

### Color Scheme
- Primary: #0A192F (Navy)
- Accent: #C5A059 (Gold)
- Success: #10B981 (Green)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)

## Chatbot Integration

Tawk.to chatbot is integrated via script tag in `index.html`:
```javascript
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/696341b2556653197fb5ddd0/1jelrh8to';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
})();
</script>
```

## Development Tools

### Build Tools
- Vite for fast development and builds
- React 19 with latest features
- TypeScript for type safety

### Code Quality
- ESLint configuration available
- TypeScript strict mode enabled
- Proper error handling

## Common Tasks

### Add New Page
1. Create file in `pages/` directory
2. Import in `App.tsx`
3. Add route in Router
4. Create navigation link

### Add New API Endpoint
1. Add function in `services/api.ts`
2. Use in component via `useEffect` and `useState`
3. Handle loading and error states

### Style New Component
Use inline styles or Tailwind classes:
```tsx
style={{
  backgroundColor: '#C5A059',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '4px'
}}
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
1. Update vite config
2. Build: `npm run build`
3. Deploy dist/ folder

### Environment Variables
Set in deployment platform:
- `VITE_API_BASE_URL` - Backend API URL
- `GEMINI_API_KEY` - Gemini API key (optional)

## Troubleshooting

### Token Issues
- Clear localStorage and login again
- Check token expiration (30 min default)
- Verify token is sent in headers

### API Connection Issues
- Verify `VITE_API_BASE_URL` is correct
- Ensure backend is running
- Check CORS configuration

### Build Issues
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf .vite`
- Update dependencies: `npm update`

## Performance Tips

1. Use React.memo for expensive components
2. Lazy load routes with React.lazy
3. Optimize images
4. Minimize bundle size
5. Use production builds

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Modern versions

## Support

For issues or questions:
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- TypeScript: https://www.typescriptlang.org/
