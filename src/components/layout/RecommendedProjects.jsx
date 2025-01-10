import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendedProjects = ({ currentProject, allProjects }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter projects from the same category, excluding the current project
  const relatedProjects = allProjects.filter(project => 
    project.category === currentProject.category && 
    project.id !== currentProject.id
  );

  // Show 3 projects at a time on desktop, 1 on mobile
  const projectsPerSlide = window.innerWidth >= 768 ? 3 : 1;
  const totalSlides = Math.ceil(relatedProjects.length / projectsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  if (relatedProjects.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Related {currentProject.category} Projects
      </h2>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Projects Carousel */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {relatedProjects.map((project) => (
              <div 
                key={project.id}
                className="w-full md:w-1/3 flex-shrink-0 px-4"
              >
                <Link 
                  to={`/portfolio/${project.slug}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-6 bg-blue-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProjects;