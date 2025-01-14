import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendedProjects = ({ currentProject, allProjects }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Update slides to show based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter projects from the same category
  const relatedProjects = allProjects.filter(project => 
    project.category === currentProject.category && 
    project.id !== currentProject.id
  );

  if (relatedProjects.length === 0) return null;

  const totalSlides = Math.max(0, relatedProjects.length - slidesToShow);
  
  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-10 mt-0" >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            More {currentProject.category} Projects
          </h2>
          
          {/* Navigation Dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-8 bg-orange-500' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          {currentSlide < totalSlides && (
            <button
              onClick={nextSlide}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next projects"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          )}

          {/* Projects Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
              }}
            >
              {relatedProjects.map((project) => (
                <div 
                  key={project.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                >
                  <Link 
                    to={`/portfolio/${project.slug}`}
                    className="block group h-full"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProjects;