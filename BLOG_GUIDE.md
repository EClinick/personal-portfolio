# Blog System Guide

This portfolio includes a modern, file-based blogging system with markdown support, syntax highlighting, and an easy-to-use editor.

## Features

- **File-based Posts**: Write posts as `.md` files with YAML front matter
- **Syntax Highlighting**: Beautiful code blocks with syntax highlighting
- **GitHub Flavored Markdown**: Support for tables, task lists, and more
- **Visual Editor**: Built-in editor with live preview
- **Auto-loading**: New posts are automatically discovered and loaded

## Quick Start: Creating a New Blog Post

### Method 1: Using the Blog Editor (Recommended)

1. Navigate to `/blog/editor` in your browser
2. Fill in the post details:
   - **Title**: Your post title
   - **Excerpt**: Brief description (shown in blog cards)
   - **Category**: Choose from predefined categories
   - **Tags**: Comma-separated tags (e.g., `AI, iOS, startup`)
   - **Featured**: Check to mark as featured post
   - **Content**: Write your post in Markdown
3. Preview your post in real-time
4. Click "Download .md File"
5. Save the file to `src/posts/` directory
6. Done! Your post will appear automatically

### Method 2: Manual File Creation

Create a new `.md` file in `src/posts/` with this format:

```markdown
---
id: '4'
title: 'Your Post Title'
excerpt: 'A brief description of your post'
author: 'Ethan Clinick'
publishedDate: '2025-01-30'
tags: ['tag1', 'tag2', 'tag3']
category: 'Software Development'
featured: false
---

# Your Post Title

Your markdown content goes here...

## Subheading

- List item 1
- List item 2

\`\`\`javascript
// Code blocks are automatically highlighted
const example = "Hello World";
\`\`\`
```

## Markdown Features Supported

### Headers
```markdown
# H1
## H2
### H3
#### H4
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
`Inline code`
```

### Links
```markdown
[Link text](https://example.com)
```

### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

### Code Blocks
Use triple backticks with language identifier:

````markdown
```python
def hello_world():
    print("Hello, world!")
```

```rust
fn main() {
    println!("Hello, world!");
}
```

```typescript
const greeting: string = "Hello, world!";
console.log(greeting);
```
````

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Images
```markdown
![Alt text](image-url.jpg)
```

## Front Matter Fields

### Required Fields
- `id`: Unique identifier (use timestamp or sequential number)
- `title`: Post title
- `excerpt`: Short description for blog cards
- `publishedDate`: Date in YYYY-MM-DD format
- `category`: Post category
- `tags`: Array of tags

### Optional Fields
- `author`: Author name (defaults to 'Ethan Clinick')
- `updatedDate`: Last update date
- `featured`: Boolean - displays in featured section
- `thumbnailUrl`: URL to thumbnail image

## Categories

Available categories:
- General
- AI & ML
- Software Development
- Product Management
- Finance

To add new categories, edit `src/app/BlogEditor.tsx`

## File Naming

Use kebab-case for file names (lowercase with hyphens):
- ✅ `building-ai-powered-apps.md`
- ✅ `rust-for-trading.md`
- ❌ `Building AI Apps.md`
- ❌ `rust_trading.md`

## Tips for Better Posts

### 1. Use Proper Heading Hierarchy
Start content with H2 (##), not H1 - the title is already H1

### 2. Add Code Language Identifiers
Always specify the language for syntax highlighting:
- `javascript`, `typescript`, `python`, `rust`, `bash`, etc.

### 3. Write Descriptive Excerpts
Make your excerpt compelling - it appears on blog cards and search results

### 4. Use Tags Strategically
- Use 3-5 relevant tags per post
- Keep tags consistent across posts
- Use lowercase for better consistency

### 5. Feature Important Posts
Mark your best/newest posts as featured to highlight them

## Folder Structure

```
src/
├── posts/                          # Your markdown files go here
│   ├── welcome-to-my-blog.md
│   ├── building-ai-powered-ios-apps.md
│   └── rust-for-financial-systems.md
├── blog/
│   ├── blogLoader.ts              # Loads .md files automatically
│   ├── blogUtils.ts               # Helper functions
│   └── blogData.ts                # Legacy - can be removed
├── app/
│   ├── Blog.tsx                   # Blog listing page
│   ├── BlogPost.tsx               # Individual post page
│   └── BlogEditor.tsx             # Blog editor interface
└── components/
    └── BlogCard.tsx               # Blog post card component
```

## Accessing the Blog

- **Blog Home**: `/blog`
- **Blog Editor**: `/blog/editor`
- **Individual Post**: `/blog/your-post-slug`

## Styling

The blog automatically matches your portfolio's design:
- Dark theme with orange accents
- Glass morphism effects
- Responsive design
- Smooth animations

## Advanced: Custom Styling

To customize markdown styling, edit the prose classes in `src/app/BlogPost.tsx`:

```tsx
className="
  prose prose-invert prose-lg max-w-none
  prose-h2:text-orange-500  // H2 color
  prose-p:mb-6              // Paragraph spacing
  // ... more customizations
"
```

## Troubleshooting

### Post not appearing?
1. Check file is in `src/posts/` directory
2. Verify front matter is valid YAML
3. Ensure file has `.md` extension
4. Check browser console for errors

### Code blocks not highlighting?
1. Verify language identifier (e.g., ```javascript)
2. Check supported languages in react-syntax-highlighter docs
3. Ensure triple backticks are used

### Images not loading?
1. Use absolute URLs for external images
2. For local images, import them in the component
3. Consider hosting images on a CDN

## Technical Details

**Libraries Used:**
- `react-markdown`: Markdown rendering
- `gray-matter`: Front matter parsing
- `react-syntax-highlighter`: Code highlighting
- `remark-gfm`: GitHub Flavored Markdown
- `rehype-raw`: HTML support in markdown

**Build Process:**
- Markdown files are loaded at build time using Vite's `import.meta.glob`
- Front matter is parsed on load
- Reading time is calculated automatically
- Posts are sorted by date (newest first)

---

Happy blogging! 🚀
