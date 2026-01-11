# Backend Database & Authentication Setup

## 🗄️ Database Structure

### MongoDB Collections

#### `users` Collection
Stores user account information with the following schema:

```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "bcrypt_hashed_password",
  "role": "Client|Admin",
  "is_admin": false,
  "created_at": "2026-01-11T00:00:00.000Z"
}
```

**Indexes:**
- `email`: Unique index for fast lookups and preventing duplicate accounts

## 🔐 Authentication

### Password Hashing
- Algorithm: bcrypt (salt rounds: 10)
- Storage: Hashed passwords only (never plain text)
- Verification: `bcrypt.checkpw()`

### JWT Tokens
- Created on successful login/registration
- Expiry: 30 minutes
- Claims: `email`, `role`, `exp`
- Secret Key: Stored in environment variable `SECRET_KEY`

## 👤 Admin User Credentials

**Email:** `contact@tricode.pro`
**Password:** `ChangeMe!`
**Role:** `Admin`

### Creating Admin User

#### Option 1: Via API (Recommended)
```bash
cd backend
source venv/bin/activate
python create_admin_api.py
```

**Prerequisites:**
- Backend server must be running on `http://localhost:5000`
- Run: `bash start.sh` in another terminal

#### Option 2: Direct MongoDB Script
```bash
cd backend
source venv/bin/activate
python create_admin.py
```

**Note:** Requires MongoDB connection to be working

## 📡 API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "Client"
}

Response: 201 Created
{
  "message": "New user created!",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Current User (Protected)
```
GET /api/me
Authorization: Bearer <token>

Response: 200 OK
{
  "email": "user@example.com",
  "role": "Client"
}
```

## 🚀 Starting the Backend

### Option 1: Using Startup Script
```bash
cd backend
bash start.sh
```

### Option 2: Manual Startup
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

### Option 3: Using Python Directly
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

## 📋 Environment Variables

Create or update `.env` file in backend directory:

```env
SECRET_KEY=your-secret-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=ulysse_cms
FLASK_ENV=development
```

**Default Values:**
- `SECRET_KEY`: `supersecretjwtkeythatshouldbechangedinproduction`
- `MONGODB_URI`: MongoDB Atlas connection string (see server.py)
- `MONGODB_DB`: `ulysse_cms`

## 🔗 Frontend Integration

### Login Flow
1. User enters credentials in LoginModal
2. Frontend calls `POST /api/auth/login`
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Token injected in all subsequent API requests via Axios interceptor

### Registration Flow
1. User enters email and password in SignupModal
2. Frontend validates password (min 8 chars, confirmation match)
3. Frontend calls `POST /api/auth/register`
4. Backend creates user with hashed password
5. Returns JWT token (auto-login)
6. Frontend redirects to `/client/dashboard`

## ✅ Testing

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contact@tricode.pro",
    "password": "ChangeMe!"
  }'
```

### Test Protected Endpoint
```bash
curl -X GET http://localhost:5000/api/me \
  -H "Authorization: Bearer <token_here>"
```

## 🐛 Troubleshooting

### "Connection error. Please try again."
- Ensure backend server is running on `http://localhost:5000`
- Check CORS is enabled in Flask
- Verify MongoDB connection in server logs

### "User already exists"
- Email already registered in database
- Try different email or delete user from MongoDB

### "Invalid email or password"
- Credentials don't match stored user
- Password is hashed with bcrypt; plaintext comparison will fail

### MongoDB SSL Errors
- May occur if MongoDB Atlas has connectivity issues
- Try: Disable SSL verification in development (set in server.py)
- Production: Use proper SSL certificates

## 📊 Database Management

### View All Users (MongoDB)
```javascript
db.users.find({})
```

### Delete User
```javascript
db.users.deleteOne({ email: "contact@tricode.pro" })
```

### Update User Role
```javascript
db.users.updateOne(
  { email: "contact@tricode.pro" },
  { $set: { role: "Admin" } }
)
```

## 🔐 Security Recommendations

1. **Change SECRET_KEY** in production environment
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** in production
4. **Implement rate limiting** on auth endpoints
5. **Add password complexity requirements**
6. **Implement email verification** for new accounts
7. **Add 2FA/MFA** for admin accounts
8. **Monitor failed login attempts**
9. **Keep bcrypt salt rounds ≥ 10**
10. **Regularly rotate secrets and tokens**

## 📝 Notes

- Tokens expire after 30 minutes
- Registration auto-logs in the new user
- Password minimum: 8 characters
- Email must be unique per user
- Default role for new users: "Client"
