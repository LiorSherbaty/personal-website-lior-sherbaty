
import React from 'react';

interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  duration: string;
  logo: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start space-x-4 mb-6">
        <img
          src={experience.logo}
          alt={`${experience.company} logo`}
          className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {experience.position}
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">
            {experience.company}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-400 space-y-1 sm:space-y-0 sm:space-x-4">
            <span>{experience.duration}</span>
            <span className="hidden sm:block">•</span>
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        {experience.description}
      </p>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Technologies:
        </h4>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
