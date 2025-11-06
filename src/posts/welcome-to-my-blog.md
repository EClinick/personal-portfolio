---
id: '1'
title: 'Welcome to My Blog - A Markdown Showcase'
excerpt: 'An introduction to this blog featuring every markdown component possible - headings, lists, code blocks, tables, and more!'
author: 'Ethan Clinick'
publishedDate: '2025-01-15'
tags: ['introduction', 'welcome', 'markdown', 'demo']
category: 'General'
featured: true
---

# Welcome to My Blog

I'm excited to launch this blog as a space to share my thoughts, experiences, and learnings in the world of software development, AI, and product management. This post showcases all the markdown features available!

## What to Expect (H2 Heading)

This blog will cover a range of topics that I'm passionate about. Here's a **bold statement**: I love building things! And here's an *italic emphasis* on quality code.

### Software Development (H3 Heading)

Deep dives into various programming languages and best practices. Here are some topics:

- **Languages**: Rust, Python, TypeScript, JavaScript
- **Frameworks**: React, Next.js, Node.js
- **Tools**: Git, Docker, AWS, Vite

#### Code Examples (H4 Heading)

Let me show you some code! Here's a simple TypeScript function:

```typescript
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function greetUser(user: User): string {
  return `Hello, ${user.name}! You are logged in as ${user.role}.`;
}

const currentUser: User = {
  name: "Ethan Clinick",
  email: "ethan@example.com",
  role: "admin"
};

console.log(greetUser(currentUser));
```

##### Python Example (H5 Heading)

Here's a Python implementation of a simple class:

```python
class BlogPost:
    def __init__(self, title, content, author):
        self.title = title
        self.content = content
        self.author = author
        self.published = False

    def publish(self):
        """Publish the blog post"""
        if not self.published:
            self.published = True
            print(f"✓ Published: {self.title}")
        else:
            print("Already published!")

    def __str__(self):
        status = "Published" if self.published else "Draft"
        return f"{self.title} by {self.author} ({status})"

# Create and publish a post
post = BlogPost(
    title="Welcome to My Blog",
    content="This is my first post!",
    author="Ethan Clinick"
)
post.publish()
```

###### Rust Example (H6 Heading)

And here's some Rust code showcasing ownership:

```rust
use std::collections::HashMap;

#[derive(Debug)]
struct Portfolio {
    projects: HashMap<String, Project>,
}

#[derive(Debug)]
struct Project {
    name: String,
    description: String,
    stars: u32,
}

impl Portfolio {
    fn new() -> Self {
        Portfolio {
            projects: HashMap::new(),
        }
    }

    fn add_project(&mut self, id: String, project: Project) {
        self.projects.insert(id, project);
    }

    fn get_total_stars(&self) -> u32 {
        self.projects.values()
            .map(|p| p.stars)
            .sum()
    }
}

fn main() {
    let mut portfolio = Portfolio::new();

    portfolio.add_project(
        String::from("tan-ai"),
        Project {
            name: String::from("Tan.ai"),
            description: String::from("AI-powered tanning app"),
            stars: 42,
        }
    );

    println!("Total stars: {}", portfolio.get_total_stars());
}
```

### Lists and Task Lists

#### Unordered Lists

Here are my current projects:

- **Tan.ai** - AI-driven iOS application for personalized tanning advice
- **PlanGenie** - AI-powered task management for neurodivergent individuals
- **Vcrypt Software** - Financial trading platform
  - Trading algorithms
  - Market data solutions
  - Risk management systems

#### Ordered Lists

My development workflow:

1. Plan the feature requirements
2. Design the architecture
3. Write tests first (TDD)
4. Implement the feature
5. Code review
6. Deploy to production
7. Monitor and iterate

#### Task Lists

My current TODO list:

- [x] Launch personal portfolio
- [x] Set up blog system with markdown
- [x] Add syntax highlighting
- [ ] Write blog post about Tan.ai development
- [ ] Create tutorial series on Rust
- [ ] Add dark mode toggle
- [ ] Implement search functionality

## Tables

Here's a comparison of the technologies I use:

| Technology | Type | Experience | Use Case |
|------------|------|------------|----------|
| **TypeScript** | Language | 3 years | Full-stack development |
| **Rust** | Language | 2 years | Trading systems, performance-critical apps |
| **Python** | Language | 4 years | AI/ML, scripting, data analysis |
| **React** | Framework | 3 years | Frontend development |
| **AWS** | Cloud | 2 years | Infrastructure, deployment |
| **Docker** | Tool | 2 years | Containerization |

### Performance Comparison

| Language | Avg Latency | Memory Usage | Best For |
|----------|-------------|--------------|----------|
| Rust | 8ms | 128MB | System programming, trading |
| Python | 45ms | 512MB | ML, rapid prototyping |
| TypeScript | 15ms | 256MB | Web applications |

## Blockquotes

Here's some wisdom I've learned along the way:

> The best code is no code at all. Every line of code is a liability.
>
> Write code that is easy to delete, not easy to extend.

And a nested quote:

> "Premature optimization is the root of all evil." - Donald Knuth
>
> > But that doesn't mean you should write slow code intentionally!

## Links

### External Links

Check out my projects and profiles:

- Visit [Tan.ai](https://tanai.app) - my AI-powered iOS app
- Connect with me on [LinkedIn](https://www.linkedin.com/in/ethanclinick)
- Explore [PlanGenie](https://plangenie.net) - task management for ADHD
- See my company [Vcrypt Software](https://vcryptfinancial.com)

### Internal Links

Navigate around this site:

- [About Me](/about)
- [All Blog Posts](/blog)
- [Home](/

## Inline Code and Emphasis

When working with React, you'll often use `useState` and `useEffect` hooks. The `import` statement is crucial: `import React from 'react'`.

Here's some **bold text**, some *italic text*, some ***bold and italic***, and some ~~strikethrough text~~.

You can also combine them: **This is bold with *italic inside* and `code` too!**

## Code Blocks - Multiple Languages

### JavaScript

```javascript
// Async/await example
async function fetchBlogPosts() {
  try {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    return posts.filter(post => post.published);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}
```

### Bash/Shell

```bash
# Deploy script
#!/bin/bash

echo "Building application..."
npm run build

echo "Running tests..."
npm test

if [ $? -eq 0 ]; then
  echo "✓ Tests passed! Deploying..."
  npm run deploy
else
  echo "✗ Tests failed. Aborting deployment."
  exit 1
fi
```

### SQL

```sql
-- Create blog posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Query to get recent posts
SELECT
  p.title,
  p.slug,
  u.name as author,
  p.published_at
FROM blog_posts p
JOIN users u ON p.author_id = u.id
WHERE p.published_at IS NOT NULL
ORDER BY p.published_at DESC
LIMIT 10;
```

### JSON

```json
{
  "name": "personal-portfolio",
  "version": "1.0.0",
  "description": "Ethan Clinick's personal portfolio and blog",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-markdown": "^9.0.1",
    "gray-matter": "^4.0.3"
  }
}
```

## Horizontal Rules

Here's a horizontal rule to separate sections:

---

## Images

While I don't have images in this post, you can add them like this:

```markdown
![Alt text for the image](https://example.com/image.jpg)
```

---

## Mixed Content Example

Let's combine multiple elements:

### Building a Trading System

When building **Vcrypt Software's** trading platform, we faced several challenges:

1. **Performance Requirements**
   - Sub-10ms latency ✓
   - Handle 10,000+ trades/second
   - Zero downtime deployment

2. **Technology Choices**
   - Chose Rust for `core trading engine`
   - Python for `backtesting and analytics`
   - TypeScript for `web dashboard`

Here's our architecture:

```rust
// Simplified order matching engine
pub struct OrderBook {
    bids: BTreeMap<Price, Vec<Order>>,
    asks: BTreeMap<Price, Vec<Order>>,
}

impl OrderBook {
    pub fn match_order(&mut self, order: Order) -> Vec<Trade> {
        // Matching logic here
        vec![]
    }
}
```

> **Note**: This is a simplified version. Production code includes risk management, order validation, and more.

**Results:**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Latency | 45ms | 8ms | **82% faster** |
| Throughput | 1,000/s | 10,000/s | **10x increase** |
| Memory | 512MB | 128MB | **75% reduction** |

---

## My Background

As a founder of multiple AI-driven products and co-founder of **Vcrypt Software**, I've had the opportunity to work on challenging problems at the intersection of technology and business.

I'm currently pursuing my Computer Science degree at ***Oregon State University*** while building products that make a real impact:

- 🎯 **Tan.ai**: Privacy-first AI tanning advisor
- 🧠 **PlanGenie**: ADHD-friendly task management
- 📈 **Vcrypt**: Algorithmic trading platform
- 💻 **Seeq Corporation**: AI integration engineer

### Skills & Technologies

Here's what I work with:

**Languages**: `TypeScript` • `Rust` • `Python` • `JavaScript` • `Swift`

**Frontend**: `React` • `Next.js` • `Tailwind CSS` • `Vite`

**Backend**: `Node.js` • `AWS Lambda` • `DynamoDB` • `PostgreSQL`

**AI/ML**: `OpenAI API` • `Custom Models` • `Prompt Engineering`

**DevOps**: `Docker` • `AWS` • `GitHub Actions` • `Netlify`

---

## Let's Connect!

I'd love to hear from you! Whether you have questions, suggestions for topics, or just want to chat about technology, feel free to reach out:

- 💼 [LinkedIn](https://www.linkedin.com/in/ethanclinick)
- 🌐 [Tan.ai Website](https://tanai.app)
- 🧠 [PlanGenie](https://plangenie.net)
- 📊 [Vcrypt Financial](https://vcryptfinancial.com)

### What's Next?

Stay tuned for upcoming posts about:

1. Building AI-powered mobile applications
2. Why Rust is perfect for trading systems
3. Lessons learned from founding multiple startups
4. Deep dive into AWS Lambda optimization
5. Creating accessible software for neurodivergent users

---

## Footnote

*This blog post was created to showcase all markdown features supported by this blog system. Every heading level, list type, code block, table, and formatting option is demonstrated above!*

**Thank you for reading!** 🚀
