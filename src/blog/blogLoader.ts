import { Buffer } from 'buffer';
import matter from 'gray-matter';
import { BlogPost } from '../types/types';
import { calculateReadingTime } from './blogUtils';

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

// Import all markdown files
// @ts-ignore - Vite handles this import pattern
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

/**
 * Load and parse all blog posts from markdown files
 */
export function loadBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in postFiles) {
    const fileContent = postFiles[path];

    // Parse front matter
    const { data, content } = matter(fileContent);

    // Create blog post object
    const post: BlogPost = {
      id: data.id || '',
      slug: path.split('/').pop()?.replace('.md', '') || '',
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: content,
      author: data.author || 'Ethan Clinick',
      publishedDate: data.publishedDate || '',
      updatedDate: data.updatedDate,
      tags: data.tags || [],
      category: data.category || 'General',
      featured: data.featured || false,
      readingTime: calculateReadingTime(content),
      thumbnailUrl: data.thumbnailUrl,
    };

    posts.push(post);
  }

  // Sort by date (newest first)
  return posts.sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/**
 * Get all blog posts
 */
export const getAllPosts = (): BlogPost[] => {
  return loadBlogPosts();
};

/**
 * Get a single post by slug
 */
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = loadBlogPosts();
  return posts.find(post => post.slug === slug);
};

/**
 * Get featured posts
 */
export const getFeaturedPosts = (): BlogPost[] => {
  const posts = loadBlogPosts();
  return posts.filter(post => post.featured);
};

/**
 * Get posts by category
 */
export const getPostsByCategory = (category: string): BlogPost[] => {
  const posts = loadBlogPosts();
  return posts.filter(post => post.category === category);
};

/**
 * Get posts by tag
 */
export const getPostsByTag = (tag: string): BlogPost[] => {
  const posts = loadBlogPosts();
  return posts.filter(post => post.tags.includes(tag));
};
