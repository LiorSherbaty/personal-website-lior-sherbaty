
import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['summary', 'experience', 'about', 'blog'];
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
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blogs' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-6 left-6 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex space-x-4">
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
        </div>
      </nav>

      {/* Mobile Navigation - 4 Button Layout */}
      <nav className="md:hidden fixed top-4 left-4 right-20 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex justify-between px-2 py-2">
          {navigationItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative px-2 py-2 rounded-xl text-xs font-medium transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-enhanced ${
                activeSection === id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {label}
              {activeSection === id && (
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-xl -z-10 animate-scale-in" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
