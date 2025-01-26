import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Code, Layout, 
  ProjectorIcon, PencilRuler, Briefcase,
  ChevronDown
} from 'lucide-react';

const getIconForCategory = (category) => {
  switch(category) {
    case 'Business Intelligence': return <Database className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'Data Analysis': return <Code className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'Web Development': return <Layout className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'Project Management': return <ProjectorIcon className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'Design & Documentation': return <PencilRuler className="w-4 h-4 sm:w-5 sm:h-5" />;
    default: return null;
  }
};

const SkillTag = ({ item }) => {
  // Responsive column spans based on screen size and text length
  const getResponsiveColSpan = (text) => {
    const length = text.length;
    if (length > 35) return 'col-span-full sm:col-span-2 lg:col-span-3';
    if (length > 20) return 'col-span-full sm:col-span-1 lg:col-span-2';
    return 'col-span-full sm:col-span-1';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${getResponsiveColSpan(item)} group relative`}
    >
      <div className="h-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        {item}
      </div>
    </motion.div>
  );
};

const AccordionItem = ({ category, categoryData, isExpanded, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-xl sm:rounded-2xl overflow-hidden ${
        isExpanded 
          ? 'bg-gradient-to-br from-white to-white dark:from-gray-800 dark:gray-900' 
          : 'bg-white dark:bg-gray-800'
      } transition-all duration-300`}
    >
      <motion.button
        aria-label={`Toggle ${category} skills`}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
              isExpanded
                ? 'bg-orange-500 text-white'
                : 'bg-orange-100 text-orange-500 dark:bg-gray-700 dark:text-orange-400'
            } transition-colors duration-300`}
          >
            {getIconForCategory(category)}
          </motion.div>
          <div className="text-left">
            <h3 className={`font-bold text-base sm:text-lg ${
              isExpanded ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {category}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {Object.values(categoryData).flat().length} competences
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className={`${isExpanded ? 'text-orange-500' : 'text-gray-400'}`}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />
              {Object.entries(categoryData).map(([subCategory, items], i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <h4 className="text-sm sm:text-base font-semibold text-orange-500 dark:text-orange-400">
                    {subCategory}
                  </h4>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {items.map((item, j) => (
                      <motion.div
                        key={j}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                      >
                        <SkillTag item={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillsSection = ({ aboutData }) => {
  const skills = aboutData.Skills;
  const [expandedIndex, setExpandedIndex] = useState(null);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      id='skills' 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="py-8 sm:py-12 bg-gray-60 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
        >
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            variants={headerVariants}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-block p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 mb-3 sm:mb-4"
            >
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 dark:text-orange-400" />
            </motion.div>
            <motion.h2 
              variants={headerVariants}
              className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3"
            >
              Technical Skills
            </motion.h2>
            <motion.p 
              variants={headerVariants}
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto"
            >
              Explore My Professional Skills Across Various Domains
            </motion.p>
          </motion.div>

          <motion.div 
            className="space-y-3 sm:space-y-4"
            variants={sectionVariants}
          >
            {Object.entries(skills).map(([category, categoryData], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.5 
                }}
              >
                <AccordionItem 
                  category={category}
                  categoryData={categoryData}
                  index={index}
                  isExpanded={expandedIndex === index}
                  onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;