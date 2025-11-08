// React Query hook for blog posts

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/api/blogService";
import type { BlogPost, BlogPostPreview, BlogPostFilters } from "@/types";

export function useBlogPosts(filters?: BlogPostFilters) {
  return useQuery({
    queryKey: ["blogPosts", filters],
    queryFn: () => blogService.getPosts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => blogService.getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useBlogTags() {
  return useQuery({
    queryKey: ["blogTags"],
    queryFn: () => blogService.getTags(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useSearchBlogPosts(query: string) {
  return useQuery({
    queryKey: ["blogSearch", query],
    queryFn: () => blogService.searchPosts(query),
    enabled: query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

