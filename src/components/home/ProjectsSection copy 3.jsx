import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';
import projectData from '../../data/projectData.json';

const ProjectCarousel = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(3);
  // Responsive project count and theme detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleProjects(1);
      } else if (window.innerWidth < 1024) {
        setVisibleProjects(2);
      } else {
        setVisibleProjects(3);
      }
    };



    handleResize();

    window.addEventListener('resize', handleResize);
    window.matchMedia('(prefers-color-scheme: dark)');

    return () => {
      window.removeEventListener('resize', handleResize);
      window.matchMedia('(prefers-color-scheme: dark)');
    };
  }, []);


  const projects = projectData.projects.slice(-3);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(projects.length / visibleProjects));
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(projects.length / visibleProjects)) % Math.ceil(projects.length / visibleProjects));
  };

  const renderProjectCard = (project) => {
    const additionalImages = project.images.slice(1);
    const displayImage = hoveredProject === project.id
      ? additionalImages[Math.floor(Date.now() / 1000) % additionalImages.length].url
      : project.thumbnail;

    return (
      <div
        key={project.id}
        className="carousel-item w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        <div className="card h-full bg-white dark:bg-gray-800 shadow-md dark:shadow-xl rounded-lg overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300">
          <div className="card-image relative">
            <img
              src={displayImage}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-white/70 dark:bg-gray-900/70 rounded-full p-1">
              <ArrowUpRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </div>
          </div>
          <div className="card-content p-4">
            <h3 className="text-lg font-semibold mb-2 truncate text-gray-900 dark:text-white">{project.title}</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{new Date(project.endDate).getFullYear()}</p>
              </div>
              <a
                href={`/portfolio/${project.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <ArrowUpRight className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-gray-200 to-white dark:from-gray-900 dark:to-gray-800 py-16 transition-colors duration-300">
        <div className="project-carousel w-full max-w-6xl mx-auto px-4  dark:bg-gray-900">
            <header className="text-center mb-12 relative">
              <div className="inline-block">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  Latest Projects
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 mx-auto rounded-full" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
                Discover my most recent work in business intelligence, data analysis, and web development.
              </p>
            </header>

          <div className="carousel relative flex items-center">

            <button
              onClick={handlePrevious}
              className="carousel-prev z-10 absolute left-0 -translate-x-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Carousel Items */}
            <div className="carousel-content flex overflow-hidden w-full">
              {projects
                .slice(currentSlide * visibleProjects, (currentSlide + 1) * visibleProjects)
                .map(renderProjectCard)}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="carousel-next z-10 absolute right-0 translate-x-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Indicators */}
          <div className="carousel-indicators flex justify-center mt-4">
            {Array.from({ length: Math.ceil(projects.length / visibleProjects) }).map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-500 w-4' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
    </section>
  );
};

export default ProjectCarousel;