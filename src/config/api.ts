// API configuration

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
} as const;

export const API_ENDPOINTS = {
  // Blog endpoints
  BLOG: {
    POSTS: "/blog/posts",
    POST_BY_SLUG: (slug: string) => `/blog/posts/${slug}`,
    TAGS: "/blog/tags",
    SEARCH: "/blog/search",
  },
  // Contact endpoints
  CONTACT: {
    SUBMIT: "/contact/submit",
    SUBMISSIONS: "/contact/submissions",
  },
} as const;

