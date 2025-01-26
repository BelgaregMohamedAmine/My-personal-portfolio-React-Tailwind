import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Rocket, Target, Sparkles, ChevronRight, Database, LineChart } from 'lucide-react';

const AboutSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  const journeyCards = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "The Analyst's Mind",
      description: "Passionate about transforming complex data into clear insights. My analytical approach combines technical expertise with creative problem-solving.",
      skills: ["Data Mining", "Statistical Analysis", "Pattern Recognition"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Mission & Vision",
      description: "Dedicated to helping businesses unlock the power of their data. Every dataset tells a story, and I'm here to help you discover it.",
      skills: ["Strategic Planning", "Goal Setting", "KPI Development"]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "The Journey",
      description: "From data analysis to BI development, my path has been driven by curiosity and continuous learning.",
      skills: ["Continuous Learning", "Adaptability", "Innovation"]
    }
  ];

  return (
    <div className="bg-gray-200 dark:bg-gray-900 py-20 transition-colors duration-300 ">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Floating Elements Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <Database className="absolute top-20 left-10 w-24 h-24 text-orange-500 animate-float" />
          <LineChart className="absolute bottom-20 right-10 w-24 h-24 text-orange-500 animate-float-delayed" />
          <Sparkles className="absolute top-1/2 left-1/2 w-24 h-24 text-orange-500 animate-pulse" />
        </div>

        {/* Main Content */}
        <div className="relative space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Beyond the Numbers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Where data meets creativity, and analysis transforms into action
            </p>
          </div>

          {/* Interactive Journey Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {journeyCards.map((card, index) => (
              <div
                key={index}
                className={`
                  relative p-8 rounded-2xl transition-all duration-500 cursor-pointer
                  ${activeCard === index 
                    ? 'bg-orange-500 text-white transform -translate-y-2'
                    : 'bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-gray-700'
                  }
                `}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className={`
                  transition-colors duration-300
                  ${activeCard === index ? 'text-white' : 'text-orange-500'}
                `}>
                  {card.icon}
                </div>
                <h3 className={`
                  text-xl font-bold mt-4 mb-3
                  ${activeCard === index ? 'text-white' : 'text-gray-900 dark:text-white'}
                `}>
                  {card.title}
                </h3>
                <p className={`
                  mb-6
                  ${activeCard === index ? 'text-white' : 'text-gray-600 dark:text-gray-300'}
                `}>
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`
                        px-3 py-1 rounded-full text-sm
                        ${activeCard === index 
                          ? 'bg-white/20 text-white'
                          : 'bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400'}
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Discover My Full Story
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

// Add these keyframes to your global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: 2s;
  }
`;
document.head.appendChild(style);