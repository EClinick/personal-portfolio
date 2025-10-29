import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { ScrollFadeIn } from '../components/scroll-animations';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { getAllPosts } from '../blog/blogData';
import { searchPosts, filterByCategory, filterByTag, getAllCategories, getAllTags } from '../blog/blogUtils';

export default function Blog() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allPosts = getAllPosts();
  const categories = ['All', ...getAllCategories(allPosts)];
  const tags = ['All', ...getAllTags(allPosts)];

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Apply search
    if (searchQuery) {
      posts = searchPosts(posts, searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      posts = filterByCategory(posts, selectedCategory);
    }

    // Apply tag filter
    if (selectedTag !== 'All') {
      posts = filterByTag(posts, selectedTag);
    }

    return posts;
  }, [allPosts, searchQuery, selectedCategory, selectedTag]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Menu Component */}
      <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-8 md:pb-12">
        {/* Header */}
        <ScrollFadeIn className="text-center mb-12 md:mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Insights on software development, AI, product management, and more
            </p>
          </div>
        </ScrollFadeIn>

        {/* Search and Filters */}
        <ScrollFadeIn delay={100} className="mb-8 md:mb-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search blog posts"
                className="
                  w-full pl-12 pr-4 py-3 h-12 rounded-xl
                  bg-black/40 backdrop-blur-sm
                  border-white/10
                  focus:border-orange-500/50
                  text-white placeholder-gray-500
                  transition-all duration-300
                "
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <label htmlFor="category-filter" className="block text-sm text-gray-400 mb-2">Category</label>
                <Select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by category"
                  className="
                    w-full px-4 py-2 h-10 rounded-lg
                    bg-black/40 backdrop-blur-sm
                    border-white/10
                    focus:border-orange-500/50
                    text-white
                  "
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-black">
                      {category}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Tag Filter */}
              <div className="flex-1">
                <label htmlFor="tag-filter" className="block text-sm text-gray-400 mb-2">Tag</label>
                <Select
                  id="tag-filter"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  aria-label="Filter by tag"
                  className="
                    w-full px-4 py-2 h-10 rounded-lg
                    bg-black/40 backdrop-blur-sm
                    border-white/10
                    focus:border-orange-500/50
                    text-white
                  "
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag} className="bg-black">
                      {tag}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedCategory !== 'All' || selectedTag !== 'All') && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-400">Active filters:</span>
                {searchQuery && (
                  <span className="px-3 py-1 rounded-full text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="px-3 py-1 rounded-full text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTag !== 'All' && (
                  <span className="px-3 py-1 rounded-full text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Tag: {selectedTag}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedTag('All');
                  }}
                  className="text-xs text-gray-400 hover:text-orange-500 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </ScrollFadeIn>

        {/* Results Count */}
        {filteredPosts.length > 0 && (
          <ScrollFadeIn delay={150} className="text-center mb-8">
            <p className="text-gray-400">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </ScrollFadeIn>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <ScrollFadeIn delay={200} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </ScrollFadeIn>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <ScrollFadeIn delay={250}>
            {featuredPosts.length > 0 && (
              <h2 className="text-2xl font-bold text-white mb-6">All Posts</h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </ScrollFadeIn>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <ScrollFadeIn className="text-center py-12">
            <div className="space-y-4">
              <p className="text-gray-400 text-xl">No posts found</p>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag('All');
                }}
                className="
                  px-6 py-2 rounded-lg
                  bg-orange-500/20 hover:bg-orange-500/30
                  border border-orange-500/30
                  text-orange-400
                  transition-all duration-300
                "
              >
                Clear filters
              </button>
            </div>
          </ScrollFadeIn>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
