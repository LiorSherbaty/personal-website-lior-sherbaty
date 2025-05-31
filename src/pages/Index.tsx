import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  Search,
  Calendar,
  ArrowUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navigation from '../components/Navigation';
import ExperienceCard from '../components/ExperienceCard';
import BlogCard from '../components/BlogCard';
import PersonalInfo from '../components/PersonalInfo';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

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
  personalInfo: {
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

const fetchData = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

const Index: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const images = [
    '/images/profile1.webp',
    '/images/profile2.webp',
    '/images/profile3.webp',
  ];

  // Load profile data
  const { data: profileData, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchData<ProfileData>('/data/profile.json'),
    refetchOnWindowFocus: false,
    retry: 3,
  });

  // Load experience data
  const { data: experienceData } = useQuery({
    queryKey: ['experience'],
    queryFn: () => fetchData<{experience: Array<{
      id: number;
      company: string;
      position: string;
      location: string;
      duration: string;
      logo: string;
      description: string;
      achievements: string[];
      technologies: string[];
    }>}>('/data/experience.json'),
    refetchOnWindowFocus: false,
    retry: 3,
  });

  // Load blog data
  const { data: blogData } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => fetchData<{posts: Blog[]}>('/data/blog.json'),
    refetchOnWindowFocus: false,
    retry: 3,
  });

  useEffect(() => {
    if (blogData?.posts) {
      setBlogs(blogData.posts);
      setFilteredBlogs(blogData.posts);
    }
  }, [blogData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setShowScrollToTop(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const heroSection = document.getElementById('summary');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: () => fetchData<GitHubRepo[]>('https://api.github.com/users/leovergarajr/repos?sort=stars&direction=desc'),
    refetchOnWindowFocus: false,
    retry: 3,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const results = blogs.filter(blog =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(results);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section */}
      <section id="summary" className="relative py-24 md:py-32 lg:py-40 pt-32 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="lg:flex items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Hi, I'm Leo! 👋
              </h1>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
                A passionate software engineer dedicated to crafting efficient and user-friendly solutions.
                Explore my portfolio to see how I can bring value to your projects.
              </p>
              {/* Contact Info */}
              <div className="flex flex-col space-y-2 mb-6">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Philippines</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>leovergarajr@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+63 927 827 4122</span>
                </div>
              </div>
              <div className="mt-6">
                <a href="/files/Leo-Vergara-Resume.pdf" target="_blank" className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-blue-500">
                  Download Resume
                  <Download className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative w-64 h-64 rounded-full overflow-hidden mx-auto">
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 z-10 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200">
                  <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt={`Profile of Leo ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full transition-opacity duration-500"
                />
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 z-10 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200">
                  <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experienceData?.experience?.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About Me
          </h2>
          <div className="lg:flex items-start mb-12">
            <div className="lg:w-1/3 mb-6 lg:mb-0">
              <img
                src="/images/about-me.webp"
                alt="Leo Vergara"
                className="rounded-2xl shadow-lg mx-auto"
              />
            </div>
            <div className="lg:w-2/3 lg:pl-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                I am a software engineer with a passion for creating innovative and efficient solutions.
                With experience in both front-end and back-end development, I enjoy tackling complex
                challenges and delivering high-quality results.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                My expertise includes React, TypeScript, Node.js, and various other technologies. I am
                always eager to learn new skills and stay up-to-date with the latest industry trends.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Outside of work, I enjoy playing video games, watching movies, and spending time with my
                family.
              </p>
            </div>
          </div>
          
          {/* Personal Info Section */}
          {profileLoading && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              Loading personal information...
            </div>
          )}
          {profileError && (
            <div className="text-center text-red-500">
              Error loading personal information.
            </div>
          )}
          {profileData && profileData.personalInfo && (
            <PersonalInfo personalInfo={profileData.personalInfo} />
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Blog
          </h2>
           <div className="mb-6 flex items-center">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-md"
            />
            <Search className="ml-3 w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="projects" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Projects
          </h2>
          {isLoading && <p className="text-center text-gray-600 dark:text-gray-400">Loading projects...</p>}
          {error && <p className="text-center text-red-500">Error loading projects.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos && repos.map((repo) => (
              <div key={repo.name} className="rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{repo.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{repo.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 dark:text-gray-400 mr-2">
                        <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L3 12l5.714-2.143L13 3z"></path>
                        </svg>
                        {repo.stargazers_count}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17h2a2 2 0 002-2V9a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17h2a2 2 0 002-2V9a2 2 0 00-2-2H16a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                        </svg>
                        {repo.forks_count}
                      </span>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-blue-500">
                      View Project
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Blog */}
      {isModalOpen && selectedBlog && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedBlog.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                {selectedBlog.date}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedBlog.content}</p>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-right">
              <button onClick={closeModal} className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll-to-top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 mx-auto" />
        </button>
      )}
    </div>
  );
};

export default Index;
