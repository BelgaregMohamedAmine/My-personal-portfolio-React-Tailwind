import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookmarkIcon, Code, ChartBar, Globe, Palette, Film } from 'lucide-react';

const InterestsSection = () => {
  const [hoveredInterest, setHoveredInterest] = useState(null);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      id='interests'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Interests
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 mx-auto rounded-full" />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {interests.map((interest, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredInterest(index)}
              onHoverEnd={() => setHoveredInterest(null)}
              className={`
                group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300
                bg-white dark:bg-gray-800 p-6 text-center
                ${hoveredInterest === index ? 'scale-105 shadow-xl' : ''}
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
                text-gray-600 dark:text-gray-400 text-sm mt-2
                transition-all duration-300
                ${hoveredInterest === index ? 'opacity-100' : 'opacity-100'}
              `}>
                {interest.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InterestsSection;