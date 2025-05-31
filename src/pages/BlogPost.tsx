
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

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

interface BlogData {
  posts: BlogPost[];
}

const BlogPostContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch('/data/blog.json');
        const data: BlogData = await response.json();
        const foundPost = data.posts.find(p => p.id === parseInt(id || '0'));
        setPost(foundPost || null);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
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
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </div>

        {/* Blog Post Header */}
        <header className="mb-8">
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Blog Post Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br><br>') }}
            />
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
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
