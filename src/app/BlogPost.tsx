import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlogPost } from '../lib/blog';
import { ScrollFadeIn, ScrollSlideIn } from '../components/scroll-animations';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { useState } from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { formatDate } from '../lib/blogUtils';

export default function BlogPost() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <ScrollFadeIn>
            <div className="text-center py-12">
              <h1 className="text-4xl font-semibold mb-4">Post Not Found</h1>
              <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </ScrollFadeIn>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Menu Component */}
      <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
        {/* Back Button */}
        <ScrollFadeIn>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </ScrollFadeIn>

        {/* Article Header */}
        <ScrollSlideIn className="mb-12">
          <div className="space-y-6">
            {/* Category Badge */}
            {post.category && (
              <div className="mb-4">
                <span className="
                  inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm
                  bg-gradient-to-r from-orange-500/10 to-orange-600/10
                  border border-orange-500/20 text-orange-400
                ">
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-white/90">
              {post.excerpt}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-gray-400 flex-wrap pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <time dateTime={post.publishedDate} className="text-sm">
                  {formatDate(post.publishedDate)}
                </time>
              </div>
              {post.readingTime && (
                <>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{post.readingTime} min read</span>
                  </div>
                </>
              )}
              <span className="text-gray-600">•</span>
              <span className="text-sm">By Ethan Clinick</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
              {post.tags && post.tags.length > 0 && (
                <>
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
                </>
              )}
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
          </div>
        </ScrollSlideIn>

        {/* Article Content */}
        <ScrollFadeIn delay={200}>
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="markdown-content">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-4xl font-semibold mt-8 mb-4 text-white" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-3xl font-semibold mt-6 mb-3 text-white" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-2xl font-semibold mt-4 mb-2 text-white" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-300 leading-relaxed mb-4" {...props} />
                  ),
                  code: ({ node, ...props }: any) => {
                    const isInline = !props.className || !props.className.includes('language-');
                    if (isInline) {
                      return (
                        <code className="bg-gray-800 px-2 py-1 rounded text-orange-400 text-sm" {...props} />
                      );
                    }
                    return (
                      <code className="block bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                    );
                  },
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-orange-500 hover:text-orange-400 underline" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-300" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-400 my-4" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-white" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="italic text-gray-300" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </ScrollFadeIn>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

