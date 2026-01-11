# Backend Setup & Configuration Guide

## Overview
The backend is built with Flask and integrates with MongoDB for user authentication and data persistence. The system supports both in-memory fallback and MongoDB storage.

## Prerequisites
- Python 3.8+
- MongoDB Atlas Account (free tier available)
- Virtual Environment (recommended)

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables
Create a `.env` file in the backend directory:

```env
# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your-secure-secret-key-change-this-in-production
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://lukeokagha_db_user:S5irpzuDutKWnFOu@ulysseswilliams.gamdqzp.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=ulysse_cms
```

### 3. Running the Server
```bash
python server.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "role": "Client"
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- Response:
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

#### Get Current User
- **GET** `/api/me`
- Headers: `x-access-token: <token>`
- Returns current user data from MongoDB or fallback database

### Services Endpoints
- **GET** `/api/services` - Get all services
- **GET** `/api/services/<id>` - Get single service
- **POST** `/api/services` - Create service (Admin only)

### Insights Endpoints
- **GET** `/api/insights` - Get all insights
- **GET** `/api/insights/<id>` - Get single insight
- **GET** `/api/insights/category/<category>` - Get insights by category
- **POST** `/api/insights` - Create insight (Admin only)

### Case Studies Endpoints
- **GET** `/api/case-studies` - Get all case studies
- **GET** `/api/case-studies/<id>` - Get single case study

### Team Endpoints
- **GET** `/api/team` - Get all team members
- **GET** `/api/team/<id>` - Get single team member

### Other Endpoints
- **GET** `/api/health` - Health check
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/cms/content/<content_type>` - Get CMS content by type

## MongoDB Connection Details

### Connection String
```
mongodb+srv://lukeokagha_db_user:S5irpzuDutKWnFOu@ulysseswilliams.gamdqzp.mongodb.net/?retryWrites=true&w=majority
```

### Database Name
```
ulysse_cms
```

### Collections
- `users` - User authentication records with email index

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Authentication**: Token-based authentication for protected routes
3. **Token Expiration**: Tokens expire after 30 minutes
4. **Email Index**: Unique email index in MongoDB for fast user lookup
5. **CORS Enabled**: Cross-origin requests from frontend allowed

## Token Usage

All protected endpoints require the `x-access-token` header:

```bash
curl -H "x-access-token: <your_token>" http://localhost:5000/api/me
```

## Testing with curl

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123",
    "role": "Client"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### Get Current User
```bash
curl -H "x-access-token: <token>" http://localhost:5000/api/me
```

## MongoDB Troubleshooting

### Connection Issues
1. Verify MongoDB URI is correct
2. Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
3. Ensure credentials are correct
4. Verify network connectivity

### Enable Debugging
Set `serverSelectionTimeoutMS` to higher value:
```python
mongo_client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=10000)
```

## Database Fallback

If MongoDB connection fails, the application automatically falls back to in-memory storage (`USERS_DB`). This is useful for development but should not be used in production.

## Production Deployment

For production:
1. Use a strong `SECRET_KEY`
2. Set `FLASK_ENV=production`
3. Use environment variables from secure vault
4. Enable SSL/TLS
5. Implement rate limiting
6. Set up proper logging
7. Use database backups
8. Configure firewall rules

## Support

For issues or questions, refer to:
- Flask Documentation: https://flask.palletsprojects.com/
- MongoDB Documentation: https://docs.mongodb.com/
- PyJWT Documentation: https://pyjwt.readthedocs.io/
