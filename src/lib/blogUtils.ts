import { BlogPostMetadata } from '../types/blog';

// Format date to readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Estimate reading time based on content (rough estimate)
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Search posts by title, excerpt, or content
export function searchPosts(posts: BlogPostMetadata[], query: string): BlogPostMetadata[] {
  if (!query.trim()) return posts;
  
  const lowerQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    (post.category && post.category.toLowerCase().includes(lowerQuery)) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
}

// Filter posts by category
export function filterByCategory(posts: BlogPostMetadata[], category: string): BlogPostMetadata[] {
  if (category === 'All') return posts;
  return posts.filter(post => post.category === category);
}

// Filter posts by tag
export function filterByTag(posts: BlogPostMetadata[], tag: string): BlogPostMetadata[] {
  if (tag === 'All') return posts;
  return posts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
}

// Get all unique categories from posts
export function getAllCategories(posts: BlogPostMetadata[]): string[] {
  const categories = new Set<string>();
  posts.forEach(post => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories).sort();
}

// Get all unique tags from posts
export function getAllTags(posts: BlogPostMetadata[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

