
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Navigation from '../components/Navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../components/ui/breadcrumb';
import { blogData } from '../data/blogData';
import type { BlogPost } from '../types/blog';

const BlogPostContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = () => {
      const foundPost = blogData.posts.find(p => p.id === parseInt(id || '0'));
      setPost(foundPost || null);
      setLoading(false);
    };

    loadPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content: string, images?: Array<{url: string; caption?: string; alt: string}>) => {
    const sections = content.split('\n\n');
    const imageMap = images ? Object.fromEntries(images.map((img, idx) => [`[IMAGE_${idx}]`, img])) : {};
    
    return sections.map((section, index) => {
      // Check if this section is an image placeholder
      if (section.startsWith('[IMAGE_') && section.endsWith(']')) {
        const imageData = imageMap[section];
        if (imageData) {
          return (
            <div key={index} className="my-8">
              <img
                src={imageData.url}
                alt={imageData.alt}
                className="w-full h-auto rounded-xl shadow-lg"
              />
              {imageData.caption && (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3 italic">
                  {imageData.caption}
                </p>
              )}
            </div>
          );
        }
      }
      
      // Check if this section is a heading
      if (section.startsWith('#')) {
        const level = section.match(/^#+/)?.[0].length || 1;
        const text = section.replace(/^#+\s/, '');
        const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
        
        return (
          <HeadingTag
            key={index}
            className={`font-bold text-gray-900 dark:text-white mb-4 mt-8 ${
              level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl'
            }`}
          >
            {text}
          </HeadingTag>
        );
      }
      
      // Check if this section is a code block
      if (section.startsWith('```') && section.endsWith('```')) {
        const code = section.slice(3, -3).trim();
        return (
          <pre key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-6">
            <code className="text-sm text-gray-800 dark:text-gray-200">{code}</code>
          </pre>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
          {section}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <ThemeToggle />
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <ThemeToggle />
      <Navigation />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#blog" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Blog
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-600 dark:text-gray-400">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/#blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>

        {/* Blog Post Header */}
        <header className="mb-12">
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center justify-between text-white/90 text-sm mb-4">
                <time dateTime={post.date} className="bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  {formatDate(post.date)}
                </time>
                <span className="bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">{post.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Blog Post Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="prose prose-xl dark:prose-invert max-w-none">
              {renderContent(post.content, post.images)}
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <Link
            to="/#blog"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
};

const BlogPost: React.FC = () => {
  return (
    <ThemeProvider>
      <BlogPostContent />
    </ThemeProvider>
  );
};

export default BlogPost;
