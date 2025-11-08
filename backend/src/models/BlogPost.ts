// MongoDB schema for BlogPost (Mongoose)

import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio: string;
  date: Date;
  readTime: string;
  tags: string[];
  thumbnail?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: "Shubh Gupta",
    },
    authorBio: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
      default: Date.now,
    },
    readTime: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      index: true,
      default: [],
    },
    thumbnail: {
      type: String,
      required: false,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for better query performance
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ published: 1, date: -1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ title: "text", excerpt: "text", content: "text" });

export const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

