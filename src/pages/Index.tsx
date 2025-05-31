
import React, { useState, useEffect } from 'react';
import { Download, Mail } from 'lucide-react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Navigation from '../components/Navigation';
import ExperienceCard from '../components/ExperienceCard';
import BlogCard from '../components/BlogCard';
import BlogSearch from '../components/BlogSearch';

interface ProfileData {
  bio: {
    name: string;
    title: string;
    description: string;
    avatar: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    skills: string[];
  };
}

interface ExperienceData {
  experience: Array<{
    id: number;
    company: string;
    position: string;
    location: string;
    duration: string;
    logo: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;
}

interface BlogData {
  posts: Array<{
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
  }>;
}

const PortfolioContent: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, experienceRes, blogRes] = await Promise.all([
          fetch('/data/profile.json'),
          fetch('/data/experience.json'),
          fetch('/data/blog.json')
        ]);

        const [profile, experience, blog] = await Promise.all([
          profileRes.json(),
          experienceRes.json(),
          blogRes.json()
        ]);

        setProfileData(profile);
        setExperienceData(experience);
        setBlogData(blog);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Alex_Johnson_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPosts = blogData?.posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));

    return matchesSearch && matchesTags;
  }) || [];

  const availableTags = Array.from(
    new Set(blogData?.posts.flatMap(post => post.tags) || [])
  ).sort();

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (!profileData || !experienceData || !blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">
      <ThemeToggle />
      <Navigation />

      {/* About Me Section */}
      <section id="summary" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Main Bio Section - Takes up 2 columns */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={profileData.bio.avatar}
                    alt={profileData.bio.name}
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-xl"
                  />
                  <div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3">
                      {profileData.bio.name}
                    </h1>
                    <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold">
                      {profileData.bio.title}
                    </p>
                  </div>
                </div>

                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                  {profileData.bio.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-lg">{profileData.bio.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <Mail className="w-6 h-6" />
                    <a 
                      href={`mailto:${profileData.bio.email}`}
                      className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                      {profileData.bio.email}
                    </a>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={profileData.bio.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <button
                    onClick={handleDownloadResume}
                    className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                    title="Download Resume"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {profileData.bio.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-md border border-gray-200 dark:border-gray-700 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Family Photo Section - Takes up 1 column */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">About Me</h3>
                
                <div className="space-y-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
                    alt="Family photo"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  
                  <div className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      When I'm not coding, I enjoy spending time with my family, exploring new technologies, 
                      and contributing to open-source projects. I believe in continuous learning and 
                      sharing knowledge with the developer community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Building innovative solutions across different industries
            </p>
          </div>

          <div className="space-y-8">
            {experienceData.experience.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Sharing insights and learnings from my development journey
            </p>
          </div>

          <BlogSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            availableTags={availableTags}
          />

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12c0-3.042-1.135-5.824-3-7.938l-3 2.647z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 {profileData.bio.name}. Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default Index;
