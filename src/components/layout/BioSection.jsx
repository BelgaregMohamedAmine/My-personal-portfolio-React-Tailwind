import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Database, Share2 } from 'lucide-react';

const BioSection = ({ aboutData }) => {
  // Séparation du texte bio en trois parties
  const bioParts = aboutData.personalInfo.bio.split('\n').map(part => part.trim());

  // Configuration des icônes pour chaque section
  const bioSections = [
    { icon: BookOpen, color: 'from-blue-400 to-blue-600' },
    { icon: Database, color: 'from-indigo-400 to-indigo-600' },
    { icon: Share2, color: 'from-purple-400 to-purple-600' }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* En-tête */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
              {aboutData.personalInfo.name}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
          </div>

          {/* Sections bio */}
          <div className="space-y-8">
            {bioParts.map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${bioSections[index].color} flex items-center justify-center`}>
                    {React.createElement(bioSections[index].icon, {
                      className: "w-6 h-6 text-white"
                    })}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {part}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioSection;