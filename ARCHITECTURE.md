# Architecture Documentation

## Overview

This portfolio follows FAANG-level design standards with clear separation of concerns, scalable architecture, and preparation for backend integration.

## Project Structure

```
src/
├── components/          # UI components (presentation layer)
│   ├── ui/             # Reusable UI primitives (shadcn/ui)
│   └── [feature]/        # Feature-specific components
│
├── pages/              # Page-level components (routes)
│
├── services/           # Service layer (API communication)
│   ├── api/           # API clients and services
│   │   ├── client.ts  # Base API client
│   │   ├── blogService.ts
│   │   └── contactService.ts
│   └── mock/          # Mock services for development
│
├── hooks/              # React Query hooks (data fetching)
│   ├── useBlogPosts.ts
│   └── useContactForm.ts
│
├── models/            # Domain models (business logic)
│   └── BlogPost.ts
│
├── types/             # TypeScript types and interfaces
│   └── index.ts
│
├── utils/             # Utility functions
│   └── blogUtils.ts
│
├── config/            # Configuration files
│   └── api.ts
│
└── constants/         # Application constants
    └── blog.ts
```

## Architecture Layers

### 1. Presentation Layer (`components/`, `pages/`)
- **Responsibility**: UI rendering and user interaction
- **Dependencies**: Only hooks and types
- **No business logic**: Components are pure presentation

### 2. Data Layer (`hooks/`)
- **Responsibility**: Data fetching and caching
- **Technology**: React Query
- **Dependencies**: Services layer

### 3. Service Layer (`services/`)
- **Responsibility**: API communication
- **Features**:
  - Centralized API client
  - Error handling
  - Request/response transformation
  - Mock services for development

### 4. Domain Layer (`models/`)
- **Responsibility**: Business logic and domain models
- **Features**:
  - Encapsulated business rules
  - Data transformation
  - Validation logic

### 5. Utility Layer (`utils/`)
- **Responsibility**: Pure utility functions
- **Features**: Reusable, testable functions

## Data Flow

```
User Action
    ↓
Component (UI)
    ↓
Hook (React Query)
    ↓
Service (API Client)
    ↓
Backend API / Mock Service
    ↓
Response
    ↓
Model (Domain Logic)
    ↓
Component (Render)
```

## Backend Integration

### Current State
- Mock services provide data
- Frontend is fully functional
- Types and interfaces defined
- Service layer ready for API integration

### Backend Integration Steps

1. **Set up MongoDB backend**
   - Create Express server
   - Set up MongoDB connection
   - Create Mongoose schemas

2. **Implement API endpoints**
   - Follow the service layer interface
   - Match the types defined in `types/index.ts`
   - Implement pagination, filtering, search

3. **Update environment variables**
   - Set `VITE_API_BASE_URL` in `.env`
   - Services will automatically switch from mock to real API

4. **No frontend changes needed**
   - Service layer abstracts the implementation
   - Components and hooks remain unchanged

## Design Principles

### 1. Separation of Concerns
- Each layer has a single responsibility
- Clear boundaries between layers
- Easy to test and maintain

### 2. Dependency Inversion
- High-level modules don't depend on low-level modules
- Both depend on abstractions (types/interfaces)
- Services can be swapped (mock → real API)

### 3. Single Source of Truth
- Types defined once in `types/`
- Shared across all layers
- Prevents inconsistencies

### 4. Scalability
- Easy to add new features
- Clear patterns to follow
- Modular structure

## MongoDB Schema Design

### BlogPost Collection
```typescript
{
  _id: ObjectId,
  slug: string (unique, indexed),
  title: string (indexed),
  excerpt: string,
  content: string,
  author: string,
  authorBio: string,
  date: Date (indexed),
  readTime: string,
  tags: string[] (indexed),
  thumbnail?: string,
  published: boolean (indexed),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (indexed),
  subject: string,
  message: string,
  status: "pending" | "read" | "replied" (indexed),
  createdAt: Date (indexed),
  updatedAt: Date
}
```

## API Contract

### Blog Posts

**GET /api/blog/posts**
- Query params: `page`, `limit`, `tags[]`, `search`, `sortBy`, `sortOrder`
- Response: `PaginatedResponse<BlogPostPreview>`

**GET /api/blog/posts/:slug**
- Response: `BlogPost`

**GET /api/blog/tags**
- Response: `string[]`

**GET /api/blog/search?q=query**
- Response: `BlogPostPreview[]`

### Contact

**POST /api/contact/submit**
- Body: `ContactFormData`
- Response: `ApiResponse<ContactSubmission>`

## Testing Strategy

### Unit Tests
- Models: Business logic
- Utils: Pure functions
- Services: API calls (mocked)

### Integration Tests
- Hooks: Data fetching
- Components: User interactions

### E2E Tests
- Full user flows
- API integration

## Future Enhancements

1. **Authentication**
   - JWT-based auth
   - Protected admin routes
   - User management

2. **Caching**
   - Redis for frequently accessed data
   - CDN for static assets

3. **Real-time Features**
   - WebSocket for live updates
   - Server-sent events

4. **Analytics**
   - Track blog post views
   - User engagement metrics

5. **Search**
   - Full-text search with Elasticsearch
   - Advanced filtering

