export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  publishedDate: string; // Alias for date
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  readingTime?: number;
}

export interface BlogPostMetadata {
  id: string;
  slug: string;
  title: string;
  date: string;
  publishedDate: string; // Alias for date
  excerpt: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  readingTime?: number;
}

