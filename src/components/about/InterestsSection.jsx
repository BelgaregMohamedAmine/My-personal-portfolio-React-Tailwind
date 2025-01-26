import React, { useState } from 'react';
import { BookmarkIcon, Code, ChartBar, Globe, Palette, Film } from 'lucide-react';

const InterestsSection = () => {
  const [activeInterest, setActiveInterest] = useState(null);

  const interests = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Creating responsive and interactive web applications using modern technologies.',
      color: 'text-green-500'
    },
    {
      icon: Globe,
      title: 'Technology Trends',
      description: 'Staying updated with emerging technologies and digital innovation.',
      color: 'text-orange-500'
    },
    {
      icon: Palette,
      title: 'UX/UI Design',
      description: 'Creating intuitive and visually appealing user interfaces and experiences.',
      color: 'text-indigo-500'
    },
    {
      icon: BookmarkIcon,
      title: 'Business Intelligence',
      description: 'Transforming complex data into actionable insights and strategic decisions.',
      color: 'text-blue-500'
    },
    {
      icon: ChartBar,
      title: 'Sport',
      description: 'Passionate about fitness, team sports, and understanding athletic performance.',
      color: 'text-purple-500'
    },
    {
      icon: Film,
      title: 'Watching Anime',
      description: 'Exploring diverse anime genres and storytelling styles from Japanese animation.',
      color: 'text-pink-500'
    }
  ];

  return (
    <section id='interests' className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Interests
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Exploring diverse domains of technology, creativity, and personal passions.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <div 
              key={index}
              onMouseEnter={() => setActiveInterest(index)}
              onMouseLeave={() => setActiveInterest(null)}
              className={`
                group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300
                ${activeInterest === index 
                  ? 'scale-105 shadow-xl' 
                  : 'scale-100 shadow-md'}
                bg-white dark:bg-gray-800 p-6 text-center
              `}
            >
              <interest.icon 
                className={`
                  mx-auto mb-4 w-12 h-12 
                  ${interest.color} 
                  group-hover:scale-110 transition-transform
                `} 
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {interest.title}
              </h3>
              <p className={`
                text-gray-600 dark:text-gray-400 text-sm 
                ${activeInterest === index ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-300 mt-2
              `}>
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;