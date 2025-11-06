import { useState } from 'react';
import { FileDown, Eye, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

export default function BlogEditor() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [content, setContent] = useState('');

  const categories = ['General', 'AI & ML', 'Software Development', 'Product Management', 'Finance'];

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const generateMarkdownFile = (): string => {
    const slug = generateSlug(title);
    const today = new Date().toISOString().split('T')[0];
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    return `---
id: '${Date.now()}'
title: '${title}'
excerpt: '${excerpt}'
author: 'Ethan Clinick'
publishedDate: '${today}'
tags: [${tagArray.map(tag => `'${tag}'`).join(', ')}]
category: '${category}'
featured: ${featured}
---

${content}
`;
  };

  const downloadMarkdownFile = () => {
    const slug = generateSlug(title);
    const markdownContent = generateMarkdownFile();

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const markdownContent = generateMarkdownFile();
    navigator.clipboard.writeText(markdownContent);
    alert('Markdown copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main className="container mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Blog Post Editor
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Create your blog post and download it as a markdown file to add to your blog.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-orange-500" />
                  Post Details
                </h2>

                {/* Title */}
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="
                      w-full px-4 py-3 rounded-xl
                      bg-black/40 backdrop-blur-sm
                      border border-white/10
                      hover:border-white/20
                      focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20
                      text-white placeholder-gray-500
                      transition-all duration-300
                    "
                  />
                </div>

                {/* Excerpt */}
                <div className="mb-4">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-400 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of the post..."
                    rows={3}
                    className="
                      w-full px-4 py-3 rounded-xl
                      bg-black/40 backdrop-blur-sm
                      border border-white/10
                      hover:border-white/20
                      focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20
                      text-white placeholder-gray-500
                      transition-all duration-300
                      resize-none
                    "
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
                      w-full px-4 py-3 rounded-xl
                      bg-black/40 backdrop-blur-sm
                      border border-white/10
                      hover:border-white/20
                      focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20
                      text-white
                      cursor-pointer
                      appearance-none
                      transition-all duration-300
                    "
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-black">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-400 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    id="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="AI, iOS, startup, machine-learning"
                    className="
                      w-full px-4 py-3 rounded-xl
                      bg-black/40 backdrop-blur-sm
                      border border-white/10
                      hover:border-white/20
                      focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20
                      text-white placeholder-gray-500
                      transition-all duration-300
                    "
                  />
                </div>

                {/* Featured */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="
                        w-5 h-5 rounded
                        bg-black/40 border border-white/10
                        checked:bg-orange-500 checked:border-orange-500
                        focus:ring-2 focus:ring-orange-500/20
                        cursor-pointer
                      "
                    />
                    <span className="text-gray-300">Featured Post</span>
                  </label>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-2">
                    Content (Markdown)
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post content in markdown..."
                    rows={20}
                    className="
                      w-full px-4 py-3 rounded-xl
                      bg-black/40 backdrop-blur-sm
                      border border-white/10
                      hover:border-white/20
                      focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20
                      text-white placeholder-gray-500
                      transition-all duration-300
                      resize-vertical
                      font-mono text-sm
                    "
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={downloadMarkdownFile}
                    disabled={!title || !content}
                    className="
                      flex items-center gap-2 px-6 py-3 rounded-xl
                      bg-orange-500/20 hover:bg-orange-500/30
                      border border-orange-500/30
                      text-orange-400
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-300
                    "
                  >
                    <FileDown className="w-5 h-5" />
                    Download .md File
                  </button>

                  <button
                    onClick={copyToClipboard}
                    disabled={!title || !content}
                    className="
                      flex items-center gap-2 px-6 py-3 rounded-xl
                      bg-white/5 hover:bg-white/10
                      border border-white/10 hover:border-orange-500/30
                      text-gray-400 hover:text-orange-400
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-300
                    "
                  >
                    Copy to Clipboard
                  </button>

                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="
                      lg:hidden
                      flex items-center gap-2 px-6 py-3 rounded-xl
                      bg-white/5 hover:bg-white/10
                      border border-white/10
                      text-gray-400
                      transition-all duration-300
                    "
                  >
                    <Eye className="w-5 h-5" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-28">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-orange-500" />
                  Preview
                </h2>

                {title && (
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                    {excerpt && <p className="text-gray-400">{excerpt}</p>}
                  </div>
                )}

                <div className="
                  prose prose-invert prose-sm max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6
                  prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:text-orange-500
                  prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-orange-400 prose-a:underline prose-a:decoration-orange-500/50 prose-a:underline-offset-2 prose-a:decoration-1
                  hover:prose-a:text-orange-300 hover:prose-a:decoration-orange-400 prose-a:transition-all
                  prose-strong:text-white
                  prose-code:text-orange-400 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                  prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-4
                  prose-ul:text-gray-300 prose-ul:my-4
                  prose-ol:text-gray-300 prose-ol:my-4
                  prose-li:my-1
                  max-h-[600px] overflow-y-auto
                ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        return !inline && language ? (
                          <div className="my-4 rounded-lg overflow-hidden border border-white/10">
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={language}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                padding: '1rem',
                                background: 'rgba(0, 0, 0, 0.4)',
                                fontSize: '0.75rem',
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
                    }}
                  >
                    {content || '*Start writing to see preview...*'}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-500 mb-3">How to Use</h3>
            <ol className="space-y-2 text-gray-300 text-sm">
              <li>1. Fill in the post details and write your content using Markdown syntax</li>
              <li>2. Preview your post in real-time on the right panel</li>
              <li>3. Click "Download .md File" to save the file</li>
              <li>4. Add the downloaded file to <code className="text-orange-400 bg-white/5 px-2 py-1 rounded">src/posts/</code> directory</li>
              <li>5. The blog will automatically load and display your new post!</li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
