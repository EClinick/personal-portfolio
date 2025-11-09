import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPostMetadata } from '../types/blog';
import { formatDate } from '../lib/blogUtils';

interface BlogCardProps {
  post: BlogPostMetadata;
  featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`
        group block h-full
        ${featured ? 'md:col-span-2' : ''}
      `}
    >
      <article className="
        h-full p-6 rounded-2xl
        bg-black/40 backdrop-blur-sm
        border border-white/10
        hover:border-orange-500/50
        hover:bg-black/60
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-xl hover:shadow-orange-500/10
      ">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedDate}>
                {formatDate(post.publishedDate)}
              </time>
              <span className="text-gray-600">•</span>
              <Clock className="w-4 h-4" />
              <span>{post.readingTime || 1} min read</span>
            </div>
            <h3 className={`
              font-bold text-white mb-3
              group-hover:text-orange-500 transition-colors
              ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}
            `}>
              {post.title}
            </h3>
          </div>
          {post.featured && (
            <span className="
              px-3 py-1 rounded-full text-xs font-semibold
              bg-orange-500/20 text-orange-400 border border-orange-500/30
              flex-shrink-0 ml-4
            ">
              Featured
            </span>
          )}
        </div>

        {/* Excerpt */}
        <p className={`
          text-gray-300 mb-4 line-clamp-3
          ${featured ? 'text-lg' : 'text-base'}
        `}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags && post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="
                  px-2 py-1 rounded-md text-xs
                  bg-white/5 text-gray-400
                  hover:bg-orange-500/10 hover:text-orange-400
                  transition-colors
                "
              >
                {tag}
              </span>
            ))}
            {post.tags && post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Read More */}
          <span className="
            text-orange-500 text-sm font-semibold
            group-hover:translate-x-1 transition-transform
            flex items-center gap-1
          ">
            Read More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>

        {/* Category badge */}
        {post.category && (
          <div className="mt-4">
            <span className="
              inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs
              bg-gradient-to-r from-orange-500/10 to-orange-600/10
              border border-orange-500/20 text-orange-400
            ">
              {post.category}
            </span>
          </div>
        )}
      </article>
    </Link>
  );
};

export default BlogCard;
