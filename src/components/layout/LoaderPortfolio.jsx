import React from 'react';
import loading from '../../../public/loading.gif';

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
        
        <div className="flex flex-col items-center">
          <img 
            src={loading} 
            alt="Loading" 
            className="w-64 h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BIAnalystLoader;