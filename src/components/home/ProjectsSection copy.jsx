import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ArrowRight, Calendar } from 'lucide-react';
import projectData from '../../data/projectData.json';

// Category Pill component reste inchangé
const CategoryPill = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5
      ${isActive
        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 shadow-sm'
      }
    `}
    aria-pressed={isActive}
  >
    {category}
  </button>
);

// Project Card component reste inchangé
const ProjectCard = ({ project }) => {
  const formattedDate = useMemo(() => 
    new Date(project.endDate).toLocaleDateString(), 
    [project.endDate]
  );

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
      role="article"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={`${project.title} project thumbnail`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
          {project.domain}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-3 left-3 flex gap-2">
            {project.githubUrl !== "empty" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/95 rounded-full hover:bg-orange-500 transition-colors duration-300 group/icon"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="w-4 h-4 text-gray-900 group-hover/icon:text-white" />
              </a>
            )}
            {project.liveUrl !== "empty" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/95 rounded-full hover:bg-orange-500 transition-colors duration-300 group/icon"
                aria-label={`Visit ${project.title} live site`}
              >
                <ExternalLink className="w-4 h-4 text-gray-900 group-hover/icon:text-white" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <span className="px-2 py-0.5 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full whitespace-nowrap">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={project.endDate}>{formattedDate}</time>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={`/portfolio/${project.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 transition-colors duration-300"
          aria-label={`View details for ${project.title}`}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Modification de la logique de filtrage et tri
  const filteredProjects = useMemo(() => {
    // D'abord, on filtre selon la catégorie si nécessaire
    const filtered = activeCategory === 'All' 
      ? [...projectData.projects]
      : projectData.projects.filter(project => project.category === activeCategory);
    
    // Ensuite, on trie toujours par date décroissante
    return filtered
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
      .slice(0, 3); // On prend les 3 premiers projets après le tri
  }, [activeCategory]);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
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

        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist">
          {projectData.categories.map((category) => (
            <CategoryPill
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;