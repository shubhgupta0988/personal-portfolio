// Blog post domain model and business logic

import type { BlogPost, BlogPostPreview } from "@/types";

export class BlogPostModel {
  constructor(private data: BlogPost) {}

  get id(): string {
    return this.data.id;
  }

  get slug(): string {
    return this.data.slug;
  }

  get title(): string {
    return this.data.title;
  }

  get excerpt(): string {
    return this.data.excerpt;
  }

  get content(): string {
    return this.data.content;
  }

  get author(): string {
    return this.data.author;
  }

  get authorBio(): string {
    return this.data.authorBio;
  }

  get date(): Date {
    return new Date(this.data.date);
  }

  get readTime(): string {
    return this.data.readTime;
  }

  get tags(): string[] {
    return this.data.tags;
  }

  get isPublished(): boolean {
    return this.data.published;
  }

  /**
   * Format date for display
   */
  getFormattedDate(locale: string = "en-US"): string {
    return this.date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  /**
   * Get preview data
   */
  toPreview(): BlogPostPreview {
    return {
      slug: this.slug,
      title: this.title,
      excerpt: this.excerpt,
      date: this.data.date,
      readTime: this.readTime,
      tags: this.tags,
      author: this.author,
      thumbnail: this.data.thumbnail,
    };
  }

  /**
   * Check if post matches search query
   */
  matchesSearch(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return (
      this.title.toLowerCase().includes(lowerQuery) ||
      this.excerpt.toLowerCase().includes(lowerQuery) ||
      this.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Check if post has any of the given tags
   */
  hasAnyTag(tags: string[]): boolean {
    return tags.some((tag) => this.tags.includes(tag));
  }
}

