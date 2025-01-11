import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ChevronRight, Search, Filter, X, ChevronLeft } from 'lucide-react';

import projectData from '../data/projectData.json';

// Dialog Components
const DialogOverlay = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
      {children}
    </div>
  </div>
);

const DialogContent = ({ children, onClose }) => (
  <div className="relative">
    <button 
      onClick={onClose}
      className="absolute right-4 top-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full"
    >
      <X className="w-4 h-4" />
    </button>
    {children}
  </div>
);

const PortfolioPage = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const timePeriods = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  // Filter projects based on all criteria
  const filteredProjects = useMemo(() => {
    return projectData.projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      
      const projectDate = new Date(project.date);
      const currentDate = new Date();
      let matchesPeriod = true;

      if (selectedPeriod !== 'all') {
        const timeDiff = currentDate - projectDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        switch (selectedPeriod) {
          case 'week':
            matchesPeriod = daysDiff <= 7;
            break;
          case 'month':
            matchesPeriod = daysDiff <= 30;
            break;
          case '3months':
            matchesPeriod = daysDiff <= 90;
            break;
          default:
            matchesPeriod = true;
        }
      }

      return matchesSearch && matchesCategory && matchesPeriod;
    });
  }, [searchQuery, selectedCategory, selectedPeriod]);

  // Sort projects by date
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filteredProjects]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = sortedProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset filters and pagination
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPeriod('all');
    setCurrentPage(1);
    setIsFilterDialogOpen(false);
  };

  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Count active filters
  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedPeriod !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length;

  const divRef = useRef(null);
  const [negativeMargin, setNegativeMargin] = useState('-2rem'); // Default negative margin

  useEffect(() => {
    if (divRef.current) {
      const divHeight = divRef.current.offsetHeight;
      setNegativeMargin(`-${divHeight / 2}px`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-[url('./assets/cover-portfolio.webp')] bg-center bg-cover bg-no-repeat">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Portfolio
          </h1>
          <p className="text-xl text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.9)]">
            Exploring the intersection of data and technology through innovative solutions
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="relative container mx-auto px-4" ref={divRef} style={{ marginTop: negativeMargin }}>
        <div className="flex items-center gap-4 flex-wrap bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <button 
            onClick={() => setIsFilterDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="text-sm text-dark-900 dark:text-gray-200">
            {sortedProjects.length} {sortedProjects.length === 1 ? 'project' : 'projects'}
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      {isFilterDialogOpen && (
        <DialogOverlay onClose={() => setIsFilterDialogOpen(false)}>
          <DialogContent onClose={() => setIsFilterDialogOpen(false)}>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Filter Projects</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-medium">Categories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {projectData.categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors
                          ${selectedCategory === category 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Time Period</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timePeriods.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => setSelectedPeriod(period.value)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors
                          ${selectedPeriod === period.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>

                {(selectedCategory !== 'All' || selectedPeriod !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      )}

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {paginatedProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg 
                         hover:shadow-xl transition-shadow"
              >
                {/* Project content remains the same */}
                <div className="relative group h-48 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 
                             group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white hover:text-blue-400"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white hover:text-blue-400"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900
                                 text-blue-600 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                    <Link
                      to={`/portfolio/${project.slug}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400
                               hover:gap-2 transition-all"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* No results message */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                       transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;