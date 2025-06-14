
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['summary', 'experience', 'projects', 'about', 'blog'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { id: 'summary', label: 'Home' },
    { id: 'experience', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-6 left-6 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex space-x-2">
          {navigationItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:ring-enhanced ${
                activeSection === id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {label}
              {activeSection === id && (
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full -z-10 animate-scale-in" />
              )}
            </button>
          ))}
          
          {/* Theme Toggle Button - Desktop */}
          <button
            onClick={toggleTheme}
            className="relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:ring-enhanced bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50"
            aria-label="Toggle theme"
          >
            <div className="flex items-center justify-center w-5 h-5">
              {theme === 'light' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - 6 Button Layout */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="grid grid-cols-6 gap-1 px-1 py-2">
          {navigationItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative px-1 py-2 rounded-xl text-xs font-medium transition-all duration-300 min-h-[44px] flex items-center justify-center focus-visible:ring-enhanced ${
                activeSection === id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <span className="text-center leading-tight">{label}</span>
              {activeSection === id && (
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-xl -z-10 animate-scale-in" />
              )}
            </button>
          ))}
          
          {/* Theme Toggle Button - Mobile */}
          <button
            onClick={toggleTheme}
            className="relative px-1 py-2 rounded-xl text-xs font-medium transition-all duration-300 min-h-[44px] flex items-center justify-center focus-visible:ring-enhanced bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50"
            aria-label="Toggle theme"
          >
            <div className="flex items-center justify-center w-4 h-4">
              {theme === 'light' ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
