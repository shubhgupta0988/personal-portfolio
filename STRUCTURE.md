# Project Structure

## Complete Directory Tree

```
personal-portfolio/
├── backend/                          # Backend API (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── models/
│   │   │   ├── BlogPost.ts          # Blog post schema
│   │   │   └── Contact.ts           # Contact submission schema
│   │   ├── controllers/             # Request handlers
│   │   ├── services/                # Business logic
│   │   ├── routes/                  # API routes
│   │   ├── middleware/              # Express middleware
│   │   └── app.ts                   # Express app setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── src/                              # Frontend source code
│   ├── components/                   # React components
│   │   ├── ui/                      # shadcn/ui primitives
│   │   ├── Blog.tsx                 # Blog preview component
│   │   ├── BlogHeader.tsx           # Blog page header
│   │   ├── Contact.tsx              # Contact form (uses service layer)
│   │   ├── Hero.tsx                 # Homepage hero
│   │   └── ...                      # Other components
│   │
│   ├── pages/                       # Page components (routes)
│   │   ├── Index.tsx                # Homepage
│   │   ├── BlogIndex.tsx            # Blog listing (uses hooks)
│   │   ├── BlogPost.tsx             # Single blog post (uses hooks)
│   │   └── ...
│   │
│   ├── services/                    # Service layer (API communication)
│   │   ├── api/                     # Real API services
│   │   │   ├── client.ts           # Base API client
│   │   │   ├── blogService.ts      # Blog API service
│   │   │   └── contactService.ts   # Contact API service
│   │   └── mock/                    # Mock services (dev only)
│   │       ├── blogMockService.ts
│   │       └── contactMockService.ts
│   │
│   ├── hooks/                       # React Query hooks
│   │   ├── useBlogPosts.ts         # Blog data fetching
│   │   └── useContactForm.ts       # Contact form mutation
│   │
│   ├── models/                      # Domain models
│   │   └── BlogPost.ts             # Blog post domain model
│   │
│   ├── types/                       # TypeScript types
│   │   └── index.ts                # All type definitions
│   │
│   ├── utils/                       # Utility functions
│   │   └── blogUtils.ts            # Blog-related utilities
│   │
│   ├── config/                      # Configuration
│   │   └── api.ts                  # API endpoints config
│   │
│   ├── constants/                   # Constants
│   │   └── blog.ts                 # Blog constants
│   │
│   └── lib/                         # Shared libraries
│       └── utils.ts                # General utilities
│
├── public/                          # Static assets
├── api/                             # Serverless functions (Vercel)
│   └── tech-news.js                # GNews API proxy
│
├── ARCHITECTURE.md                  # Architecture documentation
├── STRUCTURE.md                     # This file
├── README.md                        # Main README
└── package.json                     # Frontend dependencies
```

## Layer Responsibilities

### 1. Presentation Layer (`components/`, `pages/`)
- **What**: UI rendering and user interactions
- **Dependencies**: Only hooks and types
- **No**: Business logic, API calls, data transformation

### 2. Data Layer (`hooks/`)
- **What**: Data fetching, caching, mutations
- **Technology**: React Query
- **Dependencies**: Services layer

### 3. Service Layer (`services/`)
- **What**: API communication abstraction
- **Features**:
  - Automatic mock/real API switching
  - Error handling
  - Request/response transformation
- **Dependencies**: Types only

### 4. Domain Layer (`models/`)
- **What**: Business logic and domain rules
- **Features**: Encapsulated business rules

### 5. Utility Layer (`utils/`)
- **What**: Pure, reusable functions
- **Features**: No side effects, easily testable

## Data Flow Example

### Blog Post Fetching

```
User visits /blog
    ↓
BlogIndex component renders
    ↓
useBlogPosts() hook called
    ↓
blogService.getPosts() called
    ↓
Checks VITE_API_BASE_URL
    ├─ Not set → mockBlogService.getPosts()
    └─ Set → apiRequest("/blog/posts")
    ↓
Response received
    ↓
React Query caches data
    ↓
Component re-renders with data
```

### Contact Form Submission

```
User submits form
    ↓
Contact component calls handleSubmit()
    ↓
useContactForm() mutation
    ↓
contactService.submitContactForm() called
    ↓
Checks VITE_API_BASE_URL
    ├─ Not set → mockContactService.submitContactForm()
    └─ Set → apiRequest("/contact/submit", POST)
    ↓
Response received
    ↓
Toast notification shown
    ↓
Form reset
```

## Backend Integration Checklist

When implementing the backend:

- [ ] Set up Express server
- [ ] Connect MongoDB
- [ ] Create Mongoose schemas (already defined in `backend/src/models/`)
- [ ] Implement controllers
- [ ] Create routes matching API endpoints
- [ ] Add validation middleware
- [ ] Implement error handling
- [ ] Set up CORS
- [ ] Add rate limiting
- [ ] Set `VITE_API_BASE_URL` in frontend `.env`
- [ ] Test API endpoints
- [ ] Deploy backend
- [ ] Update frontend environment variables

## Key Files to Understand

1. **`src/types/index.ts`** - All TypeScript interfaces (single source of truth)
2. **`src/services/api/client.ts`** - Base API client (handles all HTTP requests)
3. **`src/services/api/blogService.ts`** - Blog API service (switches mock/real)
4. **`src/hooks/useBlogPosts.ts`** - React Query hooks (data fetching)
5. **`backend/src/models/`** - MongoDB schemas (ready to use)

## Migration Path

### Current State (Mock Services)
- Frontend works with mock data
- All types and interfaces defined
- Service layer ready

### After Backend Implementation
1. Set `VITE_API_BASE_URL` in `.env`
2. Services automatically switch to real API
3. No component changes needed
4. No hook changes needed

This architecture ensures zero breaking changes when switching from mock to real backend!

