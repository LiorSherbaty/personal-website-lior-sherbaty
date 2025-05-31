
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PersonalInfoProps {
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

const PersonalInfo: React.FC<PersonalInfoProps> = ({ personalInfo }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % personalInfo.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + personalInfo.photos.length) % personalInfo.photos.length);
  };

  return (
    <div className="space-y-16">
      {/* Philosophy Section */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Philosophy</h3>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto italic">
          "{personalInfo.philosophy}"
        </p>
      </div>

      {/* Photo Gallery Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Life in Pictures</h3>
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={personalInfo.photos[currentPhotoIndex].url}
              alt={personalInfo.photos[currentPhotoIndex].alt}
              className="w-full h-96 object-cover transition-all duration-500 transform hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-lg font-medium">
                {personalInfo.photos[currentPhotoIndex].caption}
              </p>
            </div>
          </div>
          
          {personalInfo.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>
            </>
          )}
          
          {/* Photo indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {personalInfo.photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPhotoIndex
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Facts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Hobbies */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🎨</span>
            Hobbies
          </h4>
          <div className="space-y-3">
            {personalInfo.hobbies.map((hobby, index) => (
              <span
                key={index}
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium mr-2 mb-2 border border-blue-200 dark:border-blue-700"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">💡</span>
            Interests
          </h4>
          <div className="space-y-3">
            {personalInfo.interests.map((interest, index) => (
              <span
                key={index}
                className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium mr-2 mb-2 border border-green-200 dark:border-green-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">⚡</span>
            Fun Facts
          </h4>
          <ul className="space-y-3">
            {personalInfo.funFacts.map((fact, index) => (
              <li
                key={index}
                className="flex items-start text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                <span className="text-orange-500 dark:text-orange-400 mr-3 text-lg">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
