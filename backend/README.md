# Backend API Documentation

## Overview

This directory will contain the backend API implementation using Node.js, Express, and MongoDB.

## Planned Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   ├── environment.ts        # Environment variables
│   │   └── middleware.ts         # Express middleware setup
│   ├── models/
│   │   ├── BlogPost.ts           # Blog post schema/model
│   │   └── Contact.ts            # Contact submission schema/model
│   ├── controllers/
│   │   ├── blogController.ts     # Blog post handlers
│   │   └── contactController.ts  # Contact form handlers
│   ├── services/
│   │   ├── blogService.ts        # Blog business logic
│   │   └── contactService.ts     # Contact business logic
│   ├── routes/
│   │   ├── blogRoutes.ts         # Blog API routes
│   │   └── contactRoutes.ts      # Contact API routes
│   ├── middleware/
│   │   ├── errorHandler.ts       # Error handling
│   │   ├── validation.ts         # Request validation
│   │   └── auth.ts               # Authentication (if needed)
│   ├── utils/
│   │   ├── logger.ts             # Logging utility
│   │   └── validators.ts         # Validation helpers
│   └── app.ts                    # Express app setup
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── package.json
└── tsconfig.json
```

## API Endpoints (Planned)

### Blog Posts

- `GET /api/blog/posts` - Get all blog posts (with pagination, filters)
- `GET /api/blog/posts/:slug` - Get single blog post by slug
- `GET /api/blog/tags` - Get all unique tags
- `GET /api/blog/search?q=query` - Search blog posts
- `POST /api/blog/posts` - Create blog post (admin)
- `PUT /api/blog/posts/:id` - Update blog post (admin)
- `DELETE /api/blog/posts/:id` - Delete blog post (admin)

### Contact

- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get all submissions (admin)
- `PUT /api/contact/submissions/:id` - Update submission status (admin)

## Database Schema (MongoDB)

### BlogPost Collection

```typescript
{
  _id: ObjectId,
  slug: string (unique, indexed),
  title: string,
  excerpt: string,
  content: string,
  author: string,
  authorBio: string,
  date: Date,
  readTime: string,
  tags: string[],
  thumbnail?: string,
  published: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  subject: string,
  message: string,
  status: "pending" | "read" | "replied",
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# CORS
CORS_ORIGIN=http://localhost:8080

# Optional: Authentication
JWT_SECRET=your-secret-key
```

## Next Steps

1. Initialize Node.js/Express project
2. Set up MongoDB connection
3. Create Mongoose schemas
4. Implement API endpoints
5. Add validation and error handling
6. Set up testing

