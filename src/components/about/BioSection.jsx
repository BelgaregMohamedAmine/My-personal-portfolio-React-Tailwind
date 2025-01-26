import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Database, Share2, ChevronsLeftRightEllipsis } from 'lucide-react';

const BioSection = ({ aboutData }) => {
  // Séparation du texte bio en trois parties
  const bioParts = aboutData.personalInfo.bio.split('\n').map(part => part.trim());

  // Configuration des icônes pour chaque section
  const bioSections = [
    { icon: BookOpen, color: 'from-orange-400 to-orange-600' },
    { icon: Database, color: 'from-red-400 to-red-600' },
    { icon: Share2, color: 'from-yellow-400 to-yellow-600' }
  ];

  return (
    <section  id="about" className="py-20 bg-gray-60 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >

           {/* Header with decorated title */}
           <div className="text-center mb-16">
            <motion.div 
              className="inline-block p-3 rounded-full bg-orange-50 dark:bg-orange-900/30 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <ChevronsLeftRightEllipsis  className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h2 className="text-4xl font-bold dark:text-white mb-4">{aboutData.personalInfo.name}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
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