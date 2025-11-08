import { BlogPost } from '../types/types';

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Generate a URL-friendly slug from a title
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get related posts based on tags
 */
export const getRelatedPosts = (currentPost: BlogPost, allPosts: BlogPost[], limit: number = 3): BlogPost[] => {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      return { post, score: sharedTags.length };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
};

/**
 * Sort posts by date (newest first)
 */
export const sortPostsByDate = (posts: BlogPost[]): BlogPost[] => {
  return [...posts].sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
};

/**
 * Filter posts by category
 */
export const filterByCategory = (posts: BlogPost[], category: string): BlogPost[] => {
  return posts.filter(post => post.category === category);
};

/**
 * Filter posts by tag
 */
export const filterByTag = (posts: BlogPost[], tag: string): BlogPost[] => {
  return posts.filter(post => post.tags.includes(tag));
};

/**
 * Search posts by title or excerpt
 */
export const searchPosts = (posts: BlogPost[], query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Get all unique categories from posts
 */
export const getAllCategories = (posts: BlogPost[]): string[] => {
  return Array.from(new Set(posts.map(post => post.category)));
};

/**
 * Get all unique tags from posts
 */
export const getAllTags = (posts: BlogPost[]): string[] => {
  const allTags = posts.flatMap(post => post.tags);
  return Array.from(new Set(allTags));
};
