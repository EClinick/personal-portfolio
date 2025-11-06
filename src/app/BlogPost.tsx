import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useState } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { ScrollFadeIn } from '../components/scroll-animations';
import { getPostBySlug, getAllPosts } from '../blog/blogLoader';
import { formatDate, getRelatedPosts } from '../blog/blogUtils';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getAllPosts();
  const relatedPosts = post ? getRelatedPosts(post, allPosts, 3) : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-orange-500">Post Not Found</h1>
          <p className="text-gray-400">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="
              px-6 py-3 rounded-lg
              bg-orange-500/20 hover:bg-orange-500/30
              border border-orange-500/30
              text-orange-400
              transition-all duration-300
              inline-flex items-center gap-2
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Menu Component */}
      <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-8 md:pb-12">
        {/* Back Button */}
        <ScrollFadeIn>
          <button
            onClick={() => navigate('/blog')}
            className="
              mb-8 inline-flex items-center gap-2
              text-gray-400 hover:text-orange-500
              transition-colors duration-300
              group
            "
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>
        </ScrollFadeIn>

        {/* Article Header */}
        <ScrollFadeIn delay={100} className="max-w-4xl mx-auto mb-12">
          <article>
            {/* Category Badge */}
            <div className="mb-4">
              <span className="
                inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm
                bg-gradient-to-r from-orange-500/10 to-orange-600/10
                border border-orange-500/20 text-orange-400
              ">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.publishedDate}>
                  {formatDate(post.publishedDate)}
                </time>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>{post.readingTime} min read</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <span>By {post.author}</span>
              </div>

              <button
                onClick={handleShare}
                className="
                  ml-auto flex items-center gap-2
                  px-4 py-2 rounded-lg
                  bg-white/5 hover:bg-orange-500/20
                  border border-white/10 hover:border-orange-500/30
                  text-gray-400 hover:text-orange-400
                  transition-all duration-300
                "
                title="Share this post"
              >
                <Share2 className="w-4 h-4" />
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <Tag className="w-4 h-4 text-gray-400" />
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/blog?tag=${tag}`}
                  className="
                    px-3 py-1 rounded-md text-sm
                    bg-white/5 text-gray-400
                    hover:bg-orange-500/20 hover:text-orange-400
                    border border-white/10 hover:border-orange-500/30
                    transition-all duration-300
                  "
                >
                  {tag}
                </Link>
              ))}
            </div>
          </article>
        </ScrollFadeIn>

        {/* Article Content */}
        <ScrollFadeIn delay={200} className="max-w-4xl mx-auto">
          <article className="
            prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:leading-tight
            prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-orange-500 prose-h2:leading-tight
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:leading-tight
            prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:leading-tight
            prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-4 prose-h5:leading-tight prose-h5:text-gray-100
            prose-h6:text-base prose-h6:mb-2 prose-h6:mt-4 prose-h6:leading-tight prose-h6:text-gray-200 prose-h6:font-semibold
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
            prose-a:text-orange-400 prose-a:underline prose-a:decoration-orange-500/50 prose-a:underline-offset-4 prose-a:decoration-2
            hover:prose-a:text-orange-300 hover:prose-a:decoration-orange-400 prose-a:transition-all
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-orange-400 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-8
            prose-ul:text-gray-300 prose-ul:my-6 prose-ul:space-y-2
            prose-ol:text-gray-300 prose-ol:my-6 prose-ol:space-y-2
            prose-li:my-2 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg
            prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-10
            prose-hr:border-white/10 prose-hr:my-12
            prose-table:w-full prose-table:my-8 prose-table:border-collapse
            prose-th:bg-white/5 prose-th:p-4 prose-th:text-left prose-th:border prose-th:border-white/10 prose-th:font-semibold
            prose-td:p-4 prose-td:border prose-td:border-white/10
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom code block styling with syntax highlighting
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';

                  return !inline && language ? (
                    <div className="my-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-mono uppercase">{language}</span>
                      </div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={language}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: '1.5rem',
                          background: 'rgba(0, 0, 0, 0.4)',
                          fontSize: '0.875rem',
                          lineHeight: '1.7',
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                          }
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // Enhanced link styling with external link indicators
                a: ({ node, children, href, ...props }) => {
                  const isExternal = href?.startsWith('http');
                  return (
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="
                        text-orange-400 underline decoration-orange-500/50
                        underline-offset-4 decoration-2
                        hover:text-orange-300 hover:decoration-orange-400
                        transition-all duration-200
                        inline-flex items-center gap-1
                      "
                      {...props}
                    >
                      {children}
                      {isExternal && (
                        <svg
                          className="w-3.5 h-3.5 inline-block flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </a>
                  );
                },
                // Better paragraph spacing
                p: ({ node, children, ...props }) => {
                  return <p className="mb-6" {...props}>{children}</p>;
                },
                // Better list styling
                ul: ({ node, children, ...props }) => {
                  return <ul className="space-y-3 my-6" {...props}>{children}</ul>;
                },
                ol: ({ node, children, ...props }) => {
                  return <ol className="space-y-3 my-6" {...props}>{children}</ol>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </ScrollFadeIn>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <ScrollFadeIn delay={300} className="mt-16 max-w-6xl mx-auto">
            <div className="border-t border-white/10 pt-12">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Related Posts
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </ScrollFadeIn>
        )}

        {/* Call to Action */}
        <ScrollFadeIn delay={350} className="mt-16 max-w-4xl mx-auto">
          <div className="
            p-8 rounded-2xl
            bg-gradient-to-r from-orange-500/10 to-orange-600/10
            border border-orange-500/20
            text-center
          ">
            <h3 className="text-2xl font-bold mb-4">Enjoyed this post?</h3>
            <p className="text-gray-300 mb-6">
              Check out more articles or get in touch to discuss your project
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/blog"
                className="
                  px-6 py-3 rounded-lg
                  bg-orange-500/20 hover:bg-orange-500/30
                  border border-orange-500/30
                  text-orange-400
                  transition-all duration-300
                  inline-flex items-center gap-2
                "
              >
                More Articles
              </Link>
              <a
                href="https://www.linkedin.com/in/ethanclinick"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-6 py-3 rounded-lg
                  bg-white/5 hover:bg-white/10
                  border border-white/10 hover:border-orange-500/30
                  text-gray-400 hover:text-orange-400
                  transition-all duration-300
                "
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </ScrollFadeIn>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
