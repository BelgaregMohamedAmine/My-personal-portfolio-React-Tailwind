import React from 'react';
import { motion } from 'framer-motion';

const BIAnalystLoader = () => {
  const welcomeMessages = [
    "Turning Data into Insights",
    "Analyzing the Business Landscape",
    "Visualizing Success"
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-8">
          {welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}
        </h1>
        
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.8,
              type: "spring"
            }
          }}
        >
          <div className="w-64 h-64 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-orange-200 rounded-full border-4 border-gray-700">
              <div className="absolute top-1/4 left-1/4 w-12 h-4 bg-gray-600 rounded" />
              <div className="absolute top-1/4 right-1/4 w-12 h-4 bg-gray-600 rounded" />
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-700 rounded-full" />
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gray-600 rounded-b-full">
              <motion.div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-orange-500 rounded-lg"
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity
                  }
                }}
              >
                <div className="absolute top-2 left-1 w-6 h-8 bg-blue-300">
                  <motion.div 
                    className="absolute bottom-0 w-full bg-green-500"
                    initial={{ height: 0 }}
                    animate={{
                      height: ['0%', '80%', '0%'],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity
                      }
                    }}
                  />
                </div>
                <div className="absolute top-2 right-1 w-6 h-8 bg-red-300">
                  <motion.div 
                    className="absolute bottom-0 w-full bg-purple-500"
                    initial={{ height: 0 }}
                    animate={{
                      height: ['0%', '60%', '0%'],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.5
                      }
                    }}
                  />
                </div>
              </motion.div>

              <motion.div 
                className="absolute -left-4 top-4 w-8 h-16 bg-orange-400 transform rotate-45"
                animate={{
                  rotate: [45, -45, 45],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity
                  }
                }}
              />
              <motion.div 
                className="absolute -right-4 top-4 w-8 h-16 bg-orange-400 transform -rotate-45"
                animate={{
                  rotate: [-45, 45, -45],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BIAnalystLoader;