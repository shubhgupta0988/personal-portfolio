// Blog-related constants

export const BLOG_CONSTANTS = {
  POSTS_PER_PAGE: 10,
  MAX_EXCERPT_LENGTH: 200,
  WORDS_PER_MINUTE: 200,
  DEFAULT_SORT: "date" as const,
  DEFAULT_SORT_ORDER: "desc" as const,
} as const;

export const BLOG_CATEGORIES = [
  "Design Patterns",
  "Software Engineering",
  "Architecture",
  "Git",
  "Version Control",
  "DevOps",
  "SDLC",
  "Project Management",
  "Observability",
  "Monitoring",
  "Kafka",
  "Distributed Systems",
  "Backend",
  "Multi-Tenancy",
  "System Design",
] as const;

