import { BlogPost } from '../types/types';
import { calculateReadingTime } from './blogUtils';

/**
 * Blog posts data
 *
 * To add a new blog post:
 * 1. Add a new object to the blogPosts array
 * 2. Use markdown formatting in the 'content' field
 * 3. The reading time will be calculated automatically
 * 4. Set featured: true to display on homepage
 */
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    excerpt: 'An introduction to this blog and what you can expect to find here - insights on software development, AI, and product management.',
    author: 'Ethan Clinick',
    publishedDate: '2025-01-15',
    tags: ['introduction', 'welcome', 'meta'],
    category: 'General',
    featured: true,
    readingTime: 0, // Will be calculated
    content: `# Welcome to My Blog

I'm excited to launch this blog as a space to share my thoughts, experiences, and learnings in the world of software development, AI, and product management.

## What to Expect

This blog will cover a range of topics that I'm passionate about:

- **Software Development**: Deep dives into languages like Rust and Python, best practices, and architectural decisions
- **AI & Machine Learning**: Practical applications of AI in real-world products, including my experiences building Tan.ai and PlanGenie
- **Product Management**: Lessons learned from founding and growing startups
- **Algorithmic Trading**: Insights from building trading platforms and financial data solutions
- **Cloud Infrastructure**: AWS, scalable architectures, and deployment strategies

## My Background

As a founder of multiple AI-driven products and co-founder of Vcrypt Software, I've had the opportunity to work on challenging problems at the intersection of technology and business. I'm currently pursuing my Computer Science degree at Oregon State University while building products that make a real impact.

## Let's Connect

I'd love to hear from you! Whether you have questions, suggestions for topics, or just want to chat about technology, feel free to reach out through the chat feature on this site or connect with me on [LinkedIn](https://www.linkedin.com/in/ethanclinick).

Stay tuned for more posts!
`
  },
  {
    id: '2',
    slug: 'building-ai-powered-ios-apps',
    title: 'Building AI-Powered iOS Apps: Lessons from Tan.ai',
    excerpt: 'A behind-the-scenes look at developing Tan.ai, an AI-driven iOS application that provides personalized tanning advice using custom-trained models.',
    author: 'Ethan Clinick',
    publishedDate: '2025-01-20',
    tags: ['AI', 'iOS', 'mobile-development', 'startup', 'machine-learning'],
    category: 'AI & ML',
    featured: true,
    readingTime: 0,
    content: `# Building AI-Powered iOS Apps: Lessons from Tan.ai

When I set out to build [Tan.ai](https://tanai.app), I wanted to create an app that would help people make informed decisions about sun exposure while maintaining their privacy. Here's what I learned along the way.

## The Challenge

The main challenge was creating an AI system that could:
- Accurately detect skin tones from images
- Provide personalized recommendations
- Work without requiring user accounts (privacy-first approach)
- Scale to handle multiple concurrent users

## Technical Architecture

### Backend Infrastructure

I built the backend on AWS to ensure scalability and low latency:

\`\`\`
┌─────────────┐
│   iOS App   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  AWS Lambda │ ◄─► OpenAI API
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  DynamoDB   │
└─────────────┘
\`\`\`

This architecture reduced latency by 25% compared to my initial prototype.

### Privacy-First Authentication

Instead of traditional accounts, I implemented a UUID-based system:

\`\`\`swift
// Generate unique identifier on first launch
let userId = UUID().uuidString
UserDefaults.standard.set(userId, forKey: "userId")
\`\`\`

This approach ensures user privacy while still allowing for personalized recommendations.

## AI Model Training

The skin tone detection model was one of the most challenging aspects. I used OpenAI's API with custom training data:

1. **Data Collection**: Gathered diverse skin tone samples
2. **Model Fine-tuning**: Adjusted parameters for accuracy
3. **Validation**: Tested across various lighting conditions
4. **Iteration**: Continuously improved based on user feedback

## Key Learnings

### 1. Start with an MVP

Don't over-engineer from the start. My first version was much simpler, which allowed me to validate the concept quickly.

### 2. Privacy Sells

Users appreciate apps that don't require accounts or collect unnecessary data. This became a key differentiator for Tan.ai.

### 3. Cloud Optimization Matters

Spending time optimizing AWS configuration paid off:
- Reduced costs by 40%
- Improved response times
- Better scalability during peak usage

### 4. User Feedback is Gold

Early beta testers helped identify edge cases I hadn't considered, especially around different skin tones and lighting conditions.

## Tools & Technologies

- **iOS Development**: Swift, SwiftUI
- **Backend**: AWS Lambda, API Gateway, DynamoDB
- **AI/ML**: OpenAI API, custom model training
- **Analytics**: CloudWatch for monitoring
- **CI/CD**: GitHub Actions for automated deployment

## What's Next

I'm currently working on:
- Additional features based on user requests
- Improved accuracy for edge cases
- Integration with health tracking apps
- Expansion to Android

## Conclusion

Building Tan.ai taught me that successful AI applications require more than just good models - they need thoughtful architecture, user-centric design, and continuous iteration.

If you're building an AI-powered mobile app, focus on solving a real problem, start simple, and always prioritize user privacy and experience.

---

*Have questions about building AI apps? Feel free to reach out!*
`
  },
  {
    id: '3',
    slug: 'rust-for-financial-systems',
    title: 'Why Rust is Perfect for Financial Trading Systems',
    excerpt: 'Exploring how Rust\'s performance, safety, and concurrency features make it ideal for building high-frequency trading platforms.',
    author: 'Ethan Clinick',
    publishedDate: '2025-01-25',
    tags: ['Rust', 'trading', 'finance', 'backend', 'performance'],
    category: 'Software Development',
    featured: true,
    readingTime: 0,
    content: `# Why Rust is Perfect for Financial Trading Systems

At Vcrypt Software, we made the decision to build our trading infrastructure in Rust. After a year of production use, I'm convinced it was the right choice. Here's why.

## The Requirements

Financial trading systems have unique requirements:

- **Performance**: Milliseconds matter in trading
- **Reliability**: Crashes can cost thousands
- **Concurrency**: Handle multiple data streams simultaneously
- **Memory Safety**: No room for memory leaks or buffer overflows
- **Type Safety**: Catch errors at compile time

## Why Rust?

### 1. Zero-Cost Abstractions

Rust's abstractions don't sacrifice performance:

\`\`\`rust
// This iterates with zero overhead
let sum: i64 = prices
    .iter()
    .filter(|&&p| p > threshold)
    .map(|&p| p as i64)
    .sum();
\`\`\`

In production, our Rust code performs identically to hand-optimized C++, but with much better safety guarantees.

### 2. Fearless Concurrency

Handling multiple market data feeds simultaneously is critical:

\`\`\`rust
use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(100);

    // Spawn multiple data feed handlers
    for exchange in exchanges {
        let tx = tx.clone();
        tokio::spawn(async move {
            process_feed(exchange, tx).await;
        });
    }

    // Process all feeds
    while let Some(trade) = rx.recv().await {
        execute_strategy(&trade).await;
    }
}
\`\`\`

Rust's ownership system prevents data races at compile time, giving us confidence in our concurrent code.

### 3. Memory Safety Without Garbage Collection

In trading systems, unpredictable GC pauses are unacceptable:

- **No GC**: Deterministic performance
- **No null pointers**: Eliminated an entire class of bugs
- **No buffer overflows**: Memory safety guaranteed

### 4. Strong Type System

Rust's type system catches errors before they reach production:

\`\`\`rust
// Price is a newtype wrapper
struct Price(f64);
struct Quantity(f64);

// This won't compile - type safety!
fn calculate_value(price: Price, qty: Quantity) -> f64 {
    price.0 * qty.0
}

// Can't accidentally swap parameters
let value = calculate_value(Quantity(10), Price(50.0)); // ❌ Compiler error
\`\`\`

## Real-World Impact

After migrating to Rust:

- **30% improvement** in data processing efficiency
- **Zero crashes** in production over 6 months
- **50% reduction** in memory usage
- **Faster development**: Compile-time guarantees reduce debugging time

## Challenges & Solutions

### Learning Curve

Rust's ownership model takes time to learn:

**Solution**: Invested in team training and pair programming

### Ecosystem Maturity

Some libraries aren't as mature as Python/JavaScript equivalents:

**Solution**: Built custom solutions for critical paths, used FFI for legacy code

### Compile Times

Rust compilation can be slow:

**Solution**: Used \`sccache\` and optimized build configurations

## Example: High-Frequency Trading Algorithm

Here's a simplified version of our order execution logic:

\`\`\`rust
use rust_decimal::Decimal;

#[derive(Debug)]
struct Order {
    symbol: String,
    price: Decimal,
    quantity: u64,
    side: Side,
}

enum Side {
    Buy,
    Sell,
}

async fn execute_order(order: Order) -> Result<ExecutionReport, Error> {
    // Validate order
    validate_order(&order)?;

    // Check risk limits
    check_risk_limits(&order).await?;

    // Route to exchange
    let execution = route_to_exchange(order).await?;

    // Update position
    update_position(&execution).await?;

    Ok(execution)
}
\`\`\`

## Performance Comparison

| Language | Avg Latency | Memory | Crashes/Month |
|----------|-------------|---------|---------------|
| Python   | 45ms        | 512MB   | 3-5           |
| Java     | 12ms        | 384MB   | 1-2           |
| **Rust** | **8ms**     | **128MB** | **0**       |

## Conclusion

Rust isn't just a systems language - it's a excellent choice for financial applications where performance, safety, and reliability are paramount.

The initial learning investment pays dividends in production stability and performance.

## Resources

- [Rust Book](https://doc.rust-lang.org/book/)
- [Tokio Documentation](https://tokio.rs/)
- [Rust Decimal](https://github.com/paupino/rust-decimal) - Essential for financial calculations

---

*Building a trading system? I'd love to hear about your technology choices!*
`
  }
];

// Calculate reading times for all posts
blogPosts.forEach(post => {
  post.readingTime = calculateReadingTime(post.content);
});

// Export helper functions
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const getAllPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
};
