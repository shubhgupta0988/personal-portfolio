// Mock blog service for development (until backend is ready)

import type {
  BlogPost,
  BlogPostPreview,
  BlogPostFilters,
  PaginatedResponse,
} from "@/types";
import { filterBlogPosts } from "@/utils/blogUtils";

// Mock data - will be replaced by API calls
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "design-patterns-software-engineering",
    title: "Design Patterns in Software Engineering",
    excerpt:
      "A comprehensive guide to essential design patterns, their use cases, and practical implementations in modern software development.",
    content: "# Design Patterns in Software Engineering\n\nContent coming soon...",
    author: "Shubh Gupta",
    authorBio: "Graduate SDE at Fynd, building scalable systems",
    date: "2025-11-10",
    readTime: "12 min read",
    tags: ["Design Patterns", "Software Engineering", "Architecture"],
    published: true,
    createdAt: "2025-11-10T00:00:00Z",
    updatedAt: "2025-11-10T00:00:00Z",
  },
  // Add more mock posts as needed
];

export const mockBlogService = {
  async getPosts(
    filters?: BlogPostFilters
  ): Promise<PaginatedResponse<BlogPostPreview>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let posts = MOCK_BLOG_POSTS.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      tags: post.tags,
      author: post.author,
      thumbnail: post.thumbnail,
    }));

    // Apply filters
    if (filters) {
      posts = filterBlogPosts(posts, filters);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: posts.slice(start, end),
      pagination: {
        page,
        limit,
        total: posts.length,
        totalPages: Math.ceil(posts.length / limit),
      },
    };
  },

  async getPostBySlug(slug: string): Promise<BlogPost> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },

  async getTags(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const tags = new Set<string>();
    MOCK_BLOG_POSTS.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  },

  async searchPosts(query: string): Promise<BlogPostPreview[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const lowerQuery = query.toLowerCase();
    return MOCK_BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    ).map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      tags: post.tags,
      author: post.author,
      thumbnail: post.thumbnail,
    }));
  },
};

