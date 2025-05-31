import React, { useState, useEffect } from 'react';
import { Download, Mail, MapPin } from 'lucide-react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Navigation from '../components/Navigation';
import ExperienceCard from '../components/ExperienceCard';
import BlogCard from '../components/BlogCard';
import BlogSearch from '../components/BlogSearch';
import PersonalInfo from '../components/PersonalInfo';

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
  personalInfo?: {
    philosophy: string;
    hobbies: string[];
    interests: string[];
    funFacts: string[];
    photos: Array<{
      url: string;
      caption: string;
      alt: string;
    }>;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <ThemeToggle />
      <Navigation />

      {/* Hero/Summary Section */}
      <section id="summary" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={profileData.bio.avatar}
                    alt={profileData.bio.name}
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-xl transform hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                  <div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
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

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg">{profileData.bio.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <a 
                      href={`mailto:${profileData.bio.email}`}
                      className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:underline"
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
                    className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <button
                    onClick={handleDownloadResume}
                    className="p-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center"
                    title="Download Resume"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technical Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {profileData.bio.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-full shadow-md border border-gray-200 dark:border-gray-700 text-sm font-medium backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Quick Facts</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Building innovative solutions and creating exceptional user experiences 
                      while maintaining a perfect work-life balance with family and personal growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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

      {/* About Me Section - Now after Experience */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Beyond the code - who I am and what drives me
            </p>
          </div>

          {profileData.personalInfo && (
            <PersonalInfo personalInfo={profileData.personalInfo} />
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-12 relative z-10">
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
