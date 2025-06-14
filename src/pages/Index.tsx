import React, { useState, useEffect } from 'react';
import { Download, Mail, MapPin, ArrowUp } from 'lucide-react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navigation from '../components/Navigation';
import ExperienceCard from '../components/ExperienceCard';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import BlogSearch from '../components/BlogSearch';
import PersonalInfo from '../components/PersonalInfo';
import { blogData } from '../data/blogData';
import { BlogData, BlogPost } from '../types/blog';

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

const PortfolioContent: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, experienceRes, projectsRes] = await Promise.all([
          fetch('/data/profile.json'),
          fetch('/data/experience.json'),
          fetch('/data/projects.json')
        ]);

        const [profile, experience, projects] = await Promise.all([
          profileRes.json(),
          experienceRes.json(),
          projectsRes.json()
        ]);

        setProfileData(profile);
        setExperienceData(experience);
        setProjectsData(projects);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Alex_Johnson_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPosts = blogData.posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));

    return matchesSearch && matchesTags;
  }) || [];

  const availableTags = Array.from(
    new Set(blogData.posts.flatMap(post => post.tags) || [])
  ).sort();

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (!profileData || !experienceData || !projectsData) {
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

      <Navigation />

      {/* Hero/Summary Section - Updated with proper mobile spacing */}
      <section id="summary" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-20 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8 animate-fade-in">
              <div className="space-y-4 lg:space-y-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={profileData.bio.avatar}
                    alt={profileData.bio.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-xl transform hover:scale-105 transition-transform duration-300 mx-auto md:mx-0"
                    loading="eager"
                  />
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
                      {profileData.bio.name}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-blue-600 dark:text-blue-400 font-semibold">
                      {profileData.bio.title}
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                  {profileData.bio.description}
                </p>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-base md:text-lg">{profileData.bio.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600 dark:text-gray-400">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                    <a 
                      href={`mailto:${profileData.bio.email}`}
                      className="text-base md:text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:underline"
                    >
                      {profileData.bio.email}
                    </a>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start space-x-4">
                  <a
                    href={profileData.bio.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 md:p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus-visible:ring-enhanced"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={profileData.bio.github} target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus-visible:ring-enhanced" aria-label="GitHub Profile"><svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 5.424c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.397.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path></svg></a>
                  <button
                    onClick={handleDownloadResume}
                    className="p-3 md:p-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center focus-visible:ring-enhanced"
                    title="Download Resume"
                  >
                    <Download className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 text-center md:text-left">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                    {profileData.bio.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-full shadow-md border border-gray-200 dark:border-gray-700 text-xs md:text-sm font-medium backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="animate-fade-in mt-8 lg:mt-0" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 text-center">Quick Facts</h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">8+</div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">5+</div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Major Professional Projects Contributaions</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
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
      <section id="experience" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Building innovative solutions across different industries
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {experienceData.experience.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - NEW */}
      <section id="projects" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Showcasing key projects and technical achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {projectsData.projects.map((project: any, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Beyond the code - who I am and what drives me
            </p>
          </div>

          {profileData.personalInfo && (
            <PersonalInfo personalInfo={profileData.personalInfo} />
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus-visible:ring-enhanced"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-8 md:py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 {profileData.bio.name}. Built with React and Tailwind CSS.
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
