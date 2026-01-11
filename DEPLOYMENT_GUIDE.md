# Full-Stack Deployment Guide

## 🎯 Project Overview

**Ulysse Ruff Williams Advisory** - A comprehensive web3 advisory platform with:
- MongoDB database integration for user management
- JWT-based authentication
- Client Portal with protected routes
- Admin dashboard capabilities
- Tawk.to chatbot integration
- Responsive design with Tailwind CSS

---

## 📋 Prerequisites

- **Node.js** v16+ and npm
- **Python** 3.8+ with pip
- **MongoDB** Atlas account (or local MongoDB instance)
- **Git** for version control

---

## 🚀 Backend Setup

### 1. Create Python Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
MONGODB_URI=mongodb+srv://lukeokagha_db_user:S5irpzuDutKWnFOu@ulysseswilliams.gamdqzp.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=ulysse_cms
SECRET_KEY=your-default-secret-key
PORT=5000
FLASK_ENV=development
```

### 4. Start Backend Server

```bash
python server.py
```

The backend will run on `http://localhost:5000`

---

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🔐 Authentication Flow

### Register New User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Access Protected Routes
Include the token in headers:
```
x-access-token: eyJhbGciOiJIUzI1NiIs...
```

---

## 📁 Database Collections

### users Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "bcrypt_hashed_password",
  "role": "Client",
  "created_at": ISODate
}
```

**Indexes:**
- `email` (unique)

---

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/me` - Get current user (protected)

### Content
- `GET /api/services` - Get all services
- `GET /api/services/<id>` - Get service details
- `GET /api/insights` - Get all insights
- `GET /api/insights/<id>` - Get insight details
- `GET /api/case-studies` - Get all case studies
- `GET /api/team` - Get team members
- `GET /api/cms/content/<type>` - Get CMS content

### Admin (Protected)
- `POST /api/services` - Create service
- `POST /api/insights` - Create insight

---

## 🗺️ Frontend Routes

### Public Routes
- `/` - Home page
- `/services/:id` - Service detail
- `/insights/:id` - Insight detail
- `/case-studies` - Case studies
- `/portfolio` - Portfolio
- `/team` - Team

### Authentication Routes
- `/client/login` - Login page
- `/client/register` - Registration page

### Protected Client Routes (requires token)
- `/client/dashboard` - Client dashboard
- `/client/projects` - My projects
- `/client/case-filing` - Case filing
- `/client/investments` - Investments & ROI
- `/client/invoices` - Invoices & downloads
- `/client/support` - Legal support
- `/client/profile` - Profile settings

---

## 🤖 Chatbot Integration

Tawk.to chatbot is integrated via script in `index.html`:

```html
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

---

## 🧪 Testing the Full Stack

### 1. Register a New User

Navigate to `http://localhost:5173/client/register`

```
Email: test@example.com
Password: testpass123
Confirm: testpass123
```

### 2. Login

Navigate to `http://localhost:5173/client/login`

```
Email: test@example.com
Password: testpass123
```

### 3. Access Protected Routes

After login, you'll be redirected to `/client/dashboard`

Token is automatically stored in `localStorage` and sent in headers via axios interceptor.

---

## 🚨 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB URI is correct
- Check network access is allowed in MongoDB Atlas
- Ensure credentials are correct

### Token Not Working
- Clear `localStorage` and re-login
- Check `x-access-token` header is being sent
- Verify token hasn't expired (30 min expiry)

### CORS Issues
- Backend has CORS enabled via `flask_cors`
- Verify `VITE_API_BASE_URL` matches backend URL

### Frontend Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

---

## 📦 Deployment

### Backend (Heroku/Railway)

1. Add `Procfile`:
```
web: gunicorn server:app
```

2. Add `runtime.txt`:
```
python-3.10.13
```

3. Push to deployment platform

### Frontend (Vercel/Netlify)

1. Connect repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL`

---

## 🔒 Security Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Use HTTPS in production
- [ ] Implement rate limiting on auth endpoints
- [ ] Add password validation rules
- [ ] Enable MFA for admin accounts
- [ ] Regularly rotate MongoDB credentials
- [ ] Set up monitoring and logging
- [ ] Implement CORS whitelist in production

---

## 📊 Project Structure

```
ulysse-ruff-williams-advisory/
├── backend/
│   ├── server.py          # Flask app & routes
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Virtual environment
├── pages/
│   ├── client/            # Client portal pages
│   └── *.tsx              # Public pages
├── components/
│   ├── layouts/           # Layout components
│   └── *.tsx              # Reusable components
├── services/
│   └── api.ts            # API client
├── index.html            # HTML template (Tawk.to)
├── App.tsx               # Main routing
├── package.json          # Node dependencies
└── .env.local           # Environment variables
```

---

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review error logs in browser console and terminal
3. Check MongoDB connection status
4. Verify all environment variables are set correctly

---

**Last Updated:** January 11, 2026
