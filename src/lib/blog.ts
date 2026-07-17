import { BlogPost, BlogPostMetadata } from '../types/blog';
import { estimateReadingTime } from './blogUtils';

// Import all markdown files from the blog directory as raw text
// Using Vite's glob import with ?raw suffix
const blogModules = import.meta.glob('../blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

interface BlogFrontmatter {
  [key: string]: string | string[] | boolean | undefined;
  slug?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: BlogFrontmatter; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  
  const frontmatter: BlogFrontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''));
      } else if (value === 'true' || value === 'false') {
        // Handle boolean values
        frontmatter[key] = value === 'true';
      } else {
        frontmatter[key] = value;
      }
    }
  });
  
  return { frontmatter, body };
}

// Get all blog posts
export function getAllBlogPosts(): BlogPostMetadata[] {
  const posts: BlogPostMetadata[] = [];
  
  Object.keys(blogModules).forEach((path) => {
    try {
      const content = blogModules[path];
      const { frontmatter } = parseFrontmatter(content);
      
      // Validate required fields
      if (frontmatter.slug && frontmatter.title && frontmatter.date && frontmatter.excerpt) {
        const fullContent = blogModules[path];
        const readingTime = estimateReadingTime(fullContent);
        
        posts.push({
          id: frontmatter.slug, // Use slug as id
          slug: frontmatter.slug,
          title: frontmatter.title,
          date: frontmatter.date,
          publishedDate: frontmatter.date, // Alias for date
          excerpt: frontmatter.excerpt,
          category: frontmatter.category,
          tags: frontmatter.tags || [],
          featured: frontmatter.featured || false,
          readingTime: readingTime,
        });
      } else {
        console.warn(`Blog post at ${path} is missing required frontmatter fields`);
      }
    } catch (error) {
      console.error(`Error parsing blog post at ${path}:`, error);
    }
  });
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single blog post by slug
export function getBlogPost(slug: string): BlogPost | null {
  // Find the module that matches the slug
  // The paths from glob will be like '../blog/welcome-to-my-blog.md'
  const postPath = Object.keys(blogModules).find(path => {
    const fileName = path.split('/').pop() || '';
    return fileName === `${slug}.md` || fileName.replace('.md', '') === slug;
  });
  
  if (!postPath) {
    console.warn(`Blog post not found for slug: ${slug}`);
    console.log('Available paths:', Object.keys(blogModules));
    return null;
  }
  
  const content = blogModules[postPath];
  const { frontmatter, body } = parseFrontmatter(content);
  const readingTime = estimateReadingTime(content);

  const { slug: postSlug, title, date, excerpt } = frontmatter;
  if (!postSlug || !title || !date || !excerpt) {
    console.warn(`Blog post at ${postPath} is missing required frontmatter fields`);
    return null;
  }

  return {
    id: postSlug,
    slug: postSlug,
    title,
    date,
    publishedDate: date,
    excerpt,
    content: body,
    category: frontmatter.category,
    tags: frontmatter.tags || [],
    featured: frontmatter.featured || false,
    readingTime: readingTime,
  };
}
