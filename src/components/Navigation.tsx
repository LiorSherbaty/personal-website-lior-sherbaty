
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

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex space-x-8">
        {[
          { id: 'summary', label: 'Home' },
          { id: 'experience', label: 'Experience' },
          { id: 'about', label: 'About Me' },
          { id: 'blog', label: 'Blog' }
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
  );
};

export default Navigation;
