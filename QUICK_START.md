# Quick Start Guide - Full-Stack Web Application

## 🚀 5-Minute Setup

### 1. Start Backend
```bash
# Terminal 1
cd backend
python server.py
# Output: Running on http://localhost:5000
```

### 2. Start Frontend
```bash
# Terminal 2
npm run dev
# Output: Local: http://localhost:5173
```

### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api

## 📝 Test Credentials

### Create New Account
1. Click "Register" on login page
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Confirm password: `password123`
5. Click "Register"

### Login
1. Click "Login" (if not already registered)
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click "Login"

## 🎯 Key Features to Try

### Dashboard
- View your portfolio stats
- See recent activity
- Quick links to other sections

### My Projects
- Browse active projects
- Check project progress
- See start and end dates

### Case Filing
- File a new legal case
- View existing cases
- Check hearing dates

### Investments & ROI
- Track investment portfolio
- View current values
- Calculate ROI percentages

### Invoices & Downloads
- View all invoices
- Check payment status
- Download documents

### Legal Support
- Browse legal resources
- Contact attorneys
- Submit support requests

### Profile & Settings
- Update your profile
- Change password
- Set notification preferences

## 💬 Live Chat
- Click the Tawk.to widget (bottom right)
- Chat with support team
- Available 24/7

## 🔧 Configuration Files

### Backend `.env`
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
PORT=5000
MONGODB_URI=mongodb+srv://lukeokagha_db_user:S5irpzuDutKWnFOu@ulysseswilliams.gamdqzp.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=ulysse_cms
```

### Frontend `.env.local`
```env
VITE_API_BASE_URL=http://localhost:5000/api
GEMINI_API_KEY=optional
```

## 🐛 Troubleshooting

### Backend Won't Start
- Check if port 5000 is available
- Install requirements: `pip install -r requirements.txt`
- Check Python version: `python --version` (needs 3.8+)

### Frontend Won't Start
- Check if port 5173 is available
- Install dependencies: `npm install`
- Check Node version: `node --version` (needs 18+)

### Can't Login
- Ensure backend is running
- Check API URL in `.env.local`
- Try creating a new account
- Clear browser localStorage

### MongoDB Connection Error
- Verify MongoDB URI is correct
- Check internet connection
- Add IP to MongoDB Atlas whitelist
- Fallback to in-memory storage works offline

## 📱 Responsive Design
All pages work on:
- Desktop (1920px+)
- Tablet (768px-1024px)
- Mobile (320px-767px)

## 🎨 Design Theme
- **Primary Color**: Navy (#0A192F)
- **Accent Color**: Gold (#C5A059)
- **Font Family**: Inter (body), Playfair Display (headers)

## 📊 API Endpoints Reference

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/me` - Current user (requires token)

### Content
- `GET /api/services` - Services
- `GET /api/insights` - Blog posts
- `GET /api/case-studies` - Cases
- `GET /api/team` - Team members

### Other
- `GET /api/health` - Health check
- `POST /api/contact` - Contact form

## 🔐 Security Notes
- Tokens expire after 30 minutes
- Passwords are encrypted with bcrypt
- All sensitive data protected
- Use HTTPS in production

## 📚 Full Documentation
- [Backend Setup](./BACKEND_SETUP.md)
- [Frontend Setup](./FRONTEND_SETUP.md)
- [Implementation Summary](./IMPLEMENTATION_COMPLETE.md)

## ✅ What's Included

### Backend
- ✅ Flask REST API
- ✅ JWT Authentication
- ✅ MongoDB Integration
- ✅ Password Encryption
- ✅ CORS Support
- ✅ Error Handling

### Frontend
- ✅ React 19 UI
- ✅ TypeScript Types
- ✅ Client Portal
- ✅ Authentication Pages
- ✅ API Service Layer
- ✅ Responsive Design
- ✅ Tawk.to Chat

### Database
- ✅ MongoDB Atlas
- ✅ User Collection
- ✅ Email Index
- ✅ Auto Indexing

## 🎓 Learning Resources
- React: https://react.dev/
- Flask: https://flask.palletsprojects.com/
- MongoDB: https://docs.mongodb.com/
- Tailwind: https://tailwindcss.com/

## 🚀 Next Steps
1. Customize branding/colors
2. Add more pages as needed
3. Implement payment processing
4. Set up email notifications
5. Deploy to production

---

**Ready to go!** Start the backend and frontend, then visit http://localhost:5173

Need help? Check the detailed setup guides in the documentation files.
