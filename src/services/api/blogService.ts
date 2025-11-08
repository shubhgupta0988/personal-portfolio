// Blog posts API service

import { apiRequest } from "./client";
import type {
  BlogPost,
  BlogPostPreview,
  BlogPostFilters,
  ApiResponse,
  PaginatedResponse,
} from "@/types";
import { mockBlogService } from "../mock/blogMockService";

// Use mock service if API is not available
const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export const blogService = {
  /**
   * Get all blog posts with optional filters
   */
  async getPosts(
    filters?: BlogPostFilters
  ): Promise<PaginatedResponse<BlogPostPreview>> {
    if (USE_MOCK) {
      return mockBlogService.getPosts(filters);
    }
    return apiRequest<PaginatedResponse<BlogPostPreview>>("/blog/posts", {
      method: "GET",
      params: filters,
    });
  },

  /**
   * Get a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost> {
    if (USE_MOCK) {
      return mockBlogService.getPostBySlug(slug);
    }
    return apiRequest<BlogPost>(`/blog/posts/${slug}`, {
      method: "GET",
    });
  },

  /**
   * Get all unique tags
   */
  async getTags(): Promise<string[]> {
    if (USE_MOCK) {
      return mockBlogService.getTags();
    }
    return apiRequest<string[]>("/blog/tags", {
      method: "GET",
    });
  },

  /**
   * Search blog posts
   */
  async searchPosts(query: string): Promise<BlogPostPreview[]> {
    if (USE_MOCK) {
      return mockBlogService.searchPosts(query);
    }
    return apiRequest<BlogPostPreview[]>("/blog/search", {
      method: "GET",
      params: { q: query },
    });
  },
};

