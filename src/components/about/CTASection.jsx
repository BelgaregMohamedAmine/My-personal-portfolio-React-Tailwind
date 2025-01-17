import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900/50" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 sm:py-20"
      >
        <div className="relative  max-w-4xl mx-auto text-center">
          {/* Icon container with animation */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mx-auto w-16 h-16 mb-6 rounded-full bg-orange-100 dark:bg-orange-900/30 
              flex items-center justify-center"
          >
            <MessageCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </motion.div>

          {/* Main content */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. 
            Let's discuss your ideas and bring them to life!
          </p>

          {/* CTA Button with hover animation */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 
                text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300
                shadow-lg hover:shadow-xl"
              onClick={() => window.scrollTo(0, 0)}
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Optional subtitle */}
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Response guaranteed within 24-48 hours
          </p>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 -translate-x-16 -translate-y-16 
        bg-orange-200 dark:bg-orange-800/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-32 h-32 translate-x-16 translate-y-16 
        bg-orange-200 dark:bg-orange-800/20 rounded-full blur-3xl opacity-50" />
    </div>
  );
};

export default CTASection;