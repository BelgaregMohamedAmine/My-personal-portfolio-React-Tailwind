import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowUpRight, CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

import projectData from '../../data/projectData.json';

const ProjectCarousel = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(3);

  // Responsive project count detection
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projects = [...projectData.projects.slice(-4), { isViewAllCard: true }];

  const handleNext = () => {
    setCurrentProjectIndex((prev) => 
      Math.min(prev + 1, projects.length - visibleProjects)
    );
  };

  const handlePrevious = () => {
    setCurrentProjectIndex((prev) => Math.max(prev - 1, 0));
  };

  const renderProjectCard = (project) => {
    if (project.isViewAllCard) {
      return (
        <div
          key="view-all"
          className="carousel-item w-full md:w-1/2 lg:w-1/3 px-2 mb-4 "
        >
          <div className="card h-full bg-white dark:bg-gray-800 shadow-md dark:shadow-xl rounded-lg overflow-hidden hover:shadow-xl  dark:hover:shadow-2xl transition-all duration-300 flex flex-col justify-center items-center ">
            <CirclePlus className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              View All Projects
            </h3>
            <Link
              to="/portfolio"
              className="mt-4 px-6 py-2 bg-orange-600 dark:bg-orange-700 text-white rounded-full hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Explore Portfolio <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      );
    }

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
        <div className="card h-full bg-white dark:bg-gray-800 shadow-md dark:shadow-xl rounded-lg overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 ">
          <div className="card-image relative">
            <img
              src={displayImage}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
             <div className="absolute top-3 right-3 px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full">
                  {project.category}
                </div>
          </div>
          <div className="card-content p-4">
            <h3 className="text-lg font-semibold mb-2  text-gray-900 dark:text-white">{project.title}</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{new Date(project.endDate).getFullYear()}</p>
              </div>
              <a
                href={`/portfolio/${project.slug}`}
                className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
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
    <section className="  min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-16 transition-colors duration-300">
      <div className="project-carousel w-full max-w-6xl mx-auto px-4">
        {/* header */}
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
            disabled={currentProjectIndex === 0}
            className="carousel-prev z-10 absolute left-0 -translate-x-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
            aria-label="Previous projects"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>

          <div className="carousel-content flex overflow-hidden w-full">
            {projects
              .slice(currentProjectIndex, currentProjectIndex + visibleProjects)
              .map(renderProjectCard)}
          </div>

          <button
            onClick={handleNext}
            disabled={currentProjectIndex + visibleProjects >= projects.length}
            className="carousel-next z-10 absolute right-0 translate-x-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
            aria-label="Next projects"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;