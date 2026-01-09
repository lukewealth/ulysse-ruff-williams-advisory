# Ulysse Ruff Williams Advisory - Backend CMS API

## Overview

Flask-based REST API for content management system serving the Ulysse Ruff Williams Advisory website. Provides endpoints for services, insights/blog posts, case studies, team members, and contact submissions.

## Features

- RESTful API for all content types
- CORS enabled for frontend integration
- Mock database (in-memory) for development
- Easy migration to persistent database
- Contact form submission handling
- CMS content management

## Quick Start

### Setup

1. **Create virtual environment:**
```bash
python3 -m venv venv
source venv/bin/activate
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Configure environment:**
```bash
cp .env .env.local
# Edit .env.local with your settings
```

4. **Run development server:**
```bash
python server.py
```

Server will run on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Health Check
```
GET /api/health
```
Returns server status and timestamp.

#### Services
```
GET    /api/services              # Get all services
GET    /api/services/<id>         # Get service by ID
POST   /api/services              # Create new service
```

#### Insights/Blog
```
GET    /api/insights              # Get all insights
GET    /api/insights/<id>         # Get insight by ID
GET    /api/insights/category/<category>  # Get by category
POST   /api/insights              # Create new insight
```

#### Case Studies
```
GET    /api/case-studies          # Get all case studies
GET    /api/case-studies/<id>     # Get case study by ID
```

#### Team
```
GET    /api/team                  # Get all team members
GET    /api/team/<id>             # Get team member by ID
```

#### Contact
```
POST   /api/contact               # Submit contact form
```

#### CMS Content
```
GET    /api/cms/content/<type>    # Get content by type (services, insights, etc.)
```

## Request/Response Examples

### Create Service
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "id": "custom-service",
    "title": "Custom Service",
    "description": "Service description",
    "details": ["Detail 1", "Detail 2"]
  }'
```

### Create Insight
```bash
curl -X POST http://localhost:5000/api/insights \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Blog Post Title",
    "category": "Strategy",
    "excerpt": "Post excerpt",
    "readTime": "10 min read",
    "imageUrl": "https://..."
  }'
```

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Message content"
  }'
```

## Configuration

### Environment Variables
```
FLASK_ENV=development          # development or production
PORT=5000                      # Server port
DEBUG=True                     # Debug mode
DATABASE_URL=sqlite:///cms.db  # Database URL
CORS_ORIGINS=http://localhost:5173  # Frontend URL
```

## Project Structure

```
backend/
├── server.py              # Main Flask app
├── requirements.txt       # Python dependencies
├── .env                  # Environment configuration
└── README.md             # This file
```

## Database Integration

### Development (Current)
Uses in-memory Python dictionaries as mock database.

### Production
To use a persistent database:

1. **Option 1: SQLite**
```python
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cms.db'
db = SQLAlchemy(app)
```

2. **Option 2: PostgreSQL**
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost/dbname'
```

## CORS Configuration

Currently accepts requests from `http://localhost:5173` (Vite default).

Update `CORS(app)` in server.py for production:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})
```

## Error Handling

### Response Formats

**Success (200)**
```json
{
  "id": "1",
  "title": "Item",
  ...
}
```

**Not Found (404)**
```json
{
  "error": "Item not found"
}
```

**Server Error (500)**
```json
{
  "error": "Internal server error"
}
```

## Testing

### Health Check
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

## Deployment

### Docker
```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "server.py"]
```

### Heroku
```bash
git push heroku main
```

### Environment Variables for Production
- `FLASK_ENV=production`
- `DEBUG=False`
- `DATABASE_URL=postgresql://...`
- Update CORS origins

## Security Considerations

- [ ] Add authentication for admin endpoints
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Add input sanitization
- [ ] Implement CSRF protection

## Future Enhancements

- [ ] Admin dashboard
- [ ] User authentication
- [ ] Content versioning
- [ ] Image upload/CDN integration
- [ ] Email notifications
- [ ] Search functionality
- [ ] Analytics integration
- [ ] Caching layer (Redis)

## Support

For issues or questions, contact: backend@example.com

## License

Proprietary - Ulysse Ruff Williams Advisory
