# Shubh Gupta - Portfolio

Professional SDE portfolio with dark mode default, Framer Motion animations, complete blog system, AI-powered chatbot, and scalable backend architecture.

## Quick Start

```bash
npm install
npm run dev
```

## Features

- ✨ Smooth Framer Motion animations
- 🌓 Light mode by default (respects user preference)
- 📝 Complete blog with search & tags
- 🤖 **ShubhGPT** - AI chatbot powered by Google Gemini
- ♿ Accessible (prefers-reduced-motion support)
- 📱 Fully responsive

## ShubhGPT Chatbot Setup

The portfolio includes an interactive AI chatbot powered by Google Gemini API. To enable it:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root directory:
   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Restart the dev server

The chatbot will appear as a floating button in the bottom-right corner. It can answer questions about:
- Work experience and current role
- Projects and achievements
- Technical skills
- Education background
- And more!

**Note:** The chatbot uses your resume data as context, so it has comprehensive knowledge about your background.

## Tech News Widget Setup

The blog includes a tech news widget powered by GNews API. To enable it:

1. Get a free GNews API key from [gnews.io](https://gnews.io/register)
2. Add to your `.env` file:
   ```bash
   VITE_GNEWS_API_KEY=your_gnews_api_key_here
   ```
3. For **production deployment**:
   - **Vercel**: Add the `api/tech-news.js` file to your project root. Vercel will automatically deploy it as a serverless function.
   - **Netlify**: Place the function in `netlify/functions/tech-news.js` and add `GNEWS_API_KEY` to your Netlify environment variables.
   - **Other platforms**: The Vite proxy works for development, but you'll need a serverless function or backend API for production.

**Note:** The widget caches results for 10 minutes to stay within the free tier limit (100 requests/day).

## Theme

Defaults to dark mode. Saves preference to localStorage.

## Architecture

The project follows FAANG-level design standards with clear separation of concerns:

- **Presentation Layer**: Components and pages (UI only)
- **Data Layer**: React Query hooks for data fetching
- **Service Layer**: API clients with automatic mock/real API switching
- **Domain Layer**: Business logic and models
- **Utility Layer**: Pure utility functions

See `ARCHITECTURE.md` for detailed documentation.

## Backend Integration

The frontend is ready for backend integration. The service layer automatically switches between mock and real API based on `VITE_API_BASE_URL`.

### Setting up Backend

1. Navigate to `backend/` directory
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure
4. Start MongoDB (local or Atlas)
5. Run `npm run dev` to start the backend server

See `backend/README.md` for detailed backend setup instructions.

## Blog

Blog posts are managed through the API. The frontend uses React Query hooks (`useBlogPosts`, `useBlogPost`) to fetch data from the backend or mock service.

## Deploy

Works with Vercel, Netlify, or any static host. Build: `npm run build`

**For ShubhGPT:** Make sure to add `VITE_GEMINI_API_KEY` as an environment variable in your hosting platform.
