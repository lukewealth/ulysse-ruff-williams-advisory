<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ulysse Ruff Williams Advisory - Professional Services Website

Professional advisory website for blockchain infrastructure, digital asset strategy, and institutional consulting services.

## Features

- **Multi-page Application**: Landing page, service details, blog/insights, case studies, portfolio, team
- **React 19 + TypeScript**: Modern, type-safe frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **RESTful API**: Flask backend for content management
- **Dynamic Routing**: Client-side routing with React Router
- **CMS Integration**: Content management system for services, insights, case studies, team
- **Professional Design**: Navy/Gold color scheme with elegant typography

## Pages

1. **Home** (`/`) - Landing page with hero, services overview, insights
2. **Service Detail** (`/services/:id`) - Individual service deep-dive
3. **Insight Detail** (`/insights/:id`) - Blog post view
4. **Case Studies** (`/case-studies`) - Case studies showcase
5. **Portfolio** (`/portfolio`) - Project portfolio
6. **Team** (`/team`) - Team member profiles

## Tech Stack

### Frontend
- React 19.2.3
- React Router 6.20.0
- TypeScript 5.8.2
- Vite 6.2.0
- Tailwind CSS
- Lucide React Icons
- Axios for API calls

### Backend
- Flask 3.0.0
- Flask-CORS 4.0.0
- Python 3.x
- RESTful API

## Quick Start

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run development server (runs on http://localhost:5000)
python server.py
```

## Environment Variables

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000/api
GEMINI_API_KEY=your_api_key
```

### Backend (backend/.env)
```
FLASK_ENV=development
PORT=5000
DEBUG=True
```

## Project Structure

```
/
├── pages/
│   ├── HomePage.tsx
│   ├── ServiceDetailPage.tsx
│   ├── InsightDetailPage.tsx
│   ├── CaseStudiesPage.tsx
│   ├── PortfolioPage.tsx
│   └── TeamPage.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ServicesSection.tsx
│   ├── AboutSection.tsx
│   ├── InsightsSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── services/
│   └── api.ts
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   ├── .env
│   └── README.md
├── App.tsx
├── types.ts
├── constants.tsx
├── task.md
└── package.json
```

## API Endpoints

```
GET  /api/health                           # Health check
GET  /api/services                         # All services
GET  /api/services/<id>                    # Single service
POST /api/services                         # Create service
GET  /api/insights                         # All insights
GET  /api/insights/<id>                    # Single insight
GET  /api/insights/category/<category>     # Insights by category
POST /api/insights                         # Create insight
GET  /api/case-studies                     # All case studies
GET  /api/case-studies/<id>                # Single case study
GET  /api/team                             # All team members
GET  /api/team/<id>                        # Single team member
POST /api/contact                          # Submit contact form
GET  /api/cms/content/<type>               # CMS content by type
```

See [backend/README.md](backend/README.md) for detailed API documentation.

## Design System

### Colors
- **Navy (Primary)**: #0A192F
- **Gold (Accent)**: #C5A059
- **Slate (Secondary)**: #F1F5F9 to #94A3B8

### Typography
- **Display**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend (from backend/ directory)
python server.py     # Run Flask development server
```

## Documentation

- [Frontend Documentation](./task.md)
- [Backend Documentation](./backend/README.md)
- [Architecture & Implementation Details](./task.md)

## Features Implemented

- ✅ Multi-page routing
- ✅ Dynamic service pages
- ✅ Blog/insights system
- ✅ Case studies showcase
- ✅ Portfolio section
- ✅ Team profiles
- ✅ Flask CMS backend
- ✅ RESTful API
- ✅ Responsive design
- ✅ Contact form submission

## Future Enhancements

- [ ] Admin dashboard for content management
- [ ] User authentication
- [ ] Real database integration (PostgreSQL)
- [ ] Image upload/CDN
- [ ] Search functionality
- [ ] Newsletter subscription
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Caching layer (Redis)
- [ ] Performance optimization

## Deployment

### Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, AWS S3, etc.

### Backend
- Deploy Flask app to: Heroku, AWS, DigitalOcean, etc.
- Configure environment variables
- Set up persistent database (PostgreSQL)

## License

Proprietary - Ulysse Ruff Williams Advisory

## Contact

For inquiries, visit [contact form](/#contact)
# ulysse-ruff-williams-advisory
