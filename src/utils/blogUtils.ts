// Blog-related utility functions

import type { BlogPost, BlogPostPreview, BlogPostFilters } from "@/types";

/**
 * Calculate reading time from content
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Filter blog posts based on criteria
 */
export function filterBlogPosts(
  posts: BlogPostPreview[],
  filters: BlogPostFilters
): BlogPostPreview[] {
  let filtered = [...posts];

  // Search filter
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Tag filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((post) =>
      filters.tags!.some((tag) => post.tags.includes(tag))
    );
  }

  // Author filter
  if (filters.author) {
    filtered = filtered.filter((post) => post.author === filters.author);
  }

  // Sort
  if (filters.sortBy) {
    const order = filters.sortOrder || "desc";
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "date":
          comparison =
            new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "readTime":
          const aTime = parseInt(a.readTime);
          const bTime = parseInt(b.readTime);
          comparison = aTime - bTime;
          break;
      }
      return order === "asc" ? comparison : -comparison;
    });
  }

  return filtered;
}

/**
 * Extract all unique tags from posts
 */
export function extractTags(posts: BlogPostPreview[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

