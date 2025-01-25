import React from 'react';
import { Code, Compass, Layers, Palette, Zap } from 'lucide-react';

const InterestsSection = () => {
  const interests = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Crafting responsive, performant web applications using modern frameworks and best practices.'
    },
    {
      icon: Zap,
      title: 'Emerging Technologies',
      description: 'Exploring AI, machine learning, blockchain, and cutting-edge tech innovations.'
    },
    {
      icon: Palette,
      title: 'UX/UI Design',
      description: 'Creating intuitive, beautiful interfaces that enhance user experience and engagement.'
    },
    {
      icon: Layers,
      title: 'Design Systems',
      description: 'Building scalable design systems and component libraries for consistent digital experiences.'
    },
    {
      icon: Compass,
      title: 'Digital Innovation',
      description: 'Pushing boundaries with innovative solutions and forward-thinking digital strategies.'
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Interests
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Exploring the intersection of technology, design, and innovation
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interests.map((interest) => {
            const IconComponent = interest.icon;
            return (
              <div 
                key={interest.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-4 text-orange-500">
                  <IconComponent className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {interest.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {interest.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;