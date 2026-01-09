# Quick Reference Guide

## 🚀 Start Development in 30 Seconds

### First Time Setup
```bash
chmod +x setup.sh
./setup.sh
```

### Every Development Session
```bash
chmod +x start.sh
./start.sh
```

This starts both:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000

---

## 📍 Where Things Are

| What | Where | Port |
|------|-------|------|
| Frontend App | http://localhost:5173 | 5173 |
| Backend API | http://localhost:5000/api | 5000 |
| Health Check | http://localhost:5000/api/health | 5000 |

---

## 🧭 Page Routes

| Page | Route | File |
|------|-------|------|
| Home | `/` | pages/HomePage.tsx |
| Service Detail | `/services/:id` | pages/ServiceDetailPage.tsx |
| Blog Post | `/insights/:id` | pages/InsightDetailPage.tsx |
| Case Studies | `/case-studies` | pages/CaseStudiesPage.tsx |
| Portfolio | `/portfolio` | pages/PortfolioPage.tsx |
| Team | `/team` | pages/TeamPage.tsx |

---

## 🔌 API Quick Commands

### Test Backend
```bash
curl http://localhost:5000/api/health
```

### Get All Services
```bash
curl http://localhost:5000/api/services
```

### Get Single Service
```bash
curl http://localhost:5000/api/services/advisory
```

### Create New Insight
```bash
curl -X POST http://localhost:5000/api/insights \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post Title",
    "category": "Strategy",
    "excerpt": "Short description",
    "readTime": "5 min read",
    "imageUrl": "https://..."
  }'
```

---

## 📁 Key Files

```
Frontend Entry Point
├── App.tsx                      # Main routing setup
├── index.tsx                    # React render
├── types.ts                     # TypeScript interfaces
└── constants.tsx               # Static data

New Pages Created
├── pages/HomePage.tsx
├── pages/ServiceDetailPage.tsx
├── pages/InsightDetailPage.tsx
├── pages/CaseStudiesPage.tsx
├── pages/PortfolioPage.tsx
└── pages/TeamPage.tsx

API Integration
├── services/api.ts              # Axios client
└── .env.local                  # Frontend config

Backend
├── backend/server.py            # Flask app
├── backend/requirements.txt      # Dependencies
└── backend/.env                # Backend config

Documentation
├── task.md                      # Full tech docs
├── IMPLEMENTATION_SUMMARY.md    # What was built
├── backend/README.md            # API docs
└── README.md                    # Project overview
```

---

## 🛠️ Common Tasks

### Add New Page

1. Create file: `pages/NewPage.tsx`
2. Add route in `App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```
3. Update navigation in `components/Navbar.tsx`

### Add New API Endpoint

1. Add route in `backend/server.py`:
```python
@app.route('/api/new-endpoint', methods=['GET'])
def get_new_endpoint():
    return jsonify(data)
```

2. Add function in `services/api.ts`:
```ts
export const fetchNewEndpoint = () => api.get('/new-endpoint');
```

### Add New Component

1. Create: `components/NewComponent.tsx`
2. Import and use in pages

---

## 🎨 Design System Quick Reference

### Colors
```
Navy (Primary):    #0A192F
Gold (Accent):     #C5A059
Light Gray:        #F1F5F9
Medium Gray:       #94A3B8
Dark Gray:         #475569
```

### CSS Classes (Tailwind)
```
Main heading:      text-6xl md:text-7xl font-display text-navy
Secondary heading: text-4xl font-display text-navy
Body text:         text-slate-600 font-light
Button:            px-8 py-5 bg-navy text-white font-bold uppercase
Link:              text-gold hover:text-navy transition-colors
```

### Spacing
- Container: `max-w-7xl mx-auto`
- Padding: `px-6 md:px-12`
- Gaps: Multiples of 4 (gap-4, gap-8, gap-12, gap-16)

---

## 🚨 Common Issues & Fixes

### "Cannot find module 'react-router-dom'"
```bash
npm install
```

### "Backend not responding"
```bash
cd backend
source venv/bin/activate
python server.py
```

### "Port already in use"
```bash
# Find process on port 5173 or 5000
lsof -i :5173
# Kill it
kill -9 <PID>
```

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

## 📊 Project Stats

- **Total Pages**: 7 (1 existing + 6 new)
- **API Endpoints**: 13
- **Components**: 7 (main) + utilities
- **Lines of Code**: ~2,500+
- **TypeScript Files**: 6
- **Python Files**: 1
- **Bundle Size**: ~326KB (gzip: 99KB)

---

## 📚 Learn More

- Full Details: See `task.md`
- API Reference: See `backend/README.md`
- Project Overview: See `README.md`
- Complete Summary: See `IMPLEMENTATION_SUMMARY.md`

---

## ✅ Verification Checklist

Before going to production:

- [ ] Run `npm run build` (should succeed)
- [ ] Test all 6 routes in browser
- [ ] Verify backend responds to `http://localhost:5000/api/health`
- [ ] Check responsive design on mobile
- [ ] Verify API calls in browser dev tools
- [ ] Test contact form submission
- [ ] Review environment variables
- [ ] Check TypeScript errors (should be 0)

---

## 🆘 Need Help?

1. Check `task.md` for detailed documentation
2. Check `backend/README.md` for API details
3. Look at existing page files for patterns
4. Run `npm run build` to catch TypeScript errors
5. Check browser console for runtime errors

---

**Last Updated**: January 9, 2026  
**Status**: Ready for Development ✅
