import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Book, Clock, User, ChevronRight, Search, Filter, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

import blogData from '../data/blogData.json';

// Custom Dialog Components remain the same
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
      aria-label="Close Dialog"
    >
      <X className="w-4 h-4" />
    </button>
    {children}
  </div>
);

const BlogPage = () => {
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Existing states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // Rest of the existing states and handlers remain the same...
  const categories = ['All Posts', ...new Set(blogData.blogs.map(blog => blog.category))];
  const timePeriods = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Filter blogs based on all criteria
  const filteredBlogs = useMemo(() => {
    return blogData.blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Posts' || blog.category === selectedCategory;
      
      const blogDate = new Date(blog.date);
      const currentDate = new Date();
      let matchesPeriod = true;

      if (selectedPeriod !== 'all') {
        const timeDiff = currentDate - blogDate;
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

  // Sort blogs by date
  const sortedBlogs = useMemo(() => {
    return [...filteredBlogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filteredBlogs]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = sortedBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset filters and pagination
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Posts');
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
    selectedCategory !== 'All Posts',
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
    <div className="bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      {/* Hero Section remains the same */}
      <div className="bg-[url('./assets/cover-blog.webp')] bg-center bg-cover bg-no-repeat">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.9)]">
            Discover articles about data analysis, business intelligence, and web development
          </p>
        </div>
        </div>

      <div>  
      {/* Filters Section remains the same */}
      <div className="relative container mx-auto px-4" ref={divRef} style={{ marginTop: negativeMargin }}>
        <div className="flex items-center gap-4 flex-wrap bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-dark-200 focus:border-transparent transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <button 
            onClick={() => setIsFilterDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Open Filters Dialog"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="text-sm text-dark-900 dark:text-gray-200">
            {sortedBlogs.length} {sortedBlogs.length === 1 ? 'result' : 'results'}
          </div>
        </div>
      </div>

      </div>

      {/* Filter Dialog remains the same */}
      {isFilterDialogOpen && (
        <DialogOverlay onClose={() => setIsFilterDialogOpen(false)}>
          <DialogContent onClose={() => setIsFilterDialogOpen(false)}>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Filter Articles</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-medium">Categories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors
                          ${selectedCategory === category 
                            ? 'bg-orange-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        aria-label={`Filter by ${category}`}
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
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        aria-label={`Filter by ${period.label}`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>

                {(selectedCategory !== 'All Posts' || selectedPeriod !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Reset Filters"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      )}

      {/* Blog Grid with updated card layout */}
      <div className="container mx-auto px-4 py-8 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                    <Book className="w-4 h-4" />
                    <span>{blog.category}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <Link 
                  to={`/blog/${blog.slug}`} 
                  className="flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:gap-2 transition-all"
                  aria-label={`Read more about ${blog.title}`}
                  >
                    
                    Read More <ChevronRight className="w-4 h-4" />
        
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === page
                    ? 'bg-orange-600 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
              aria-label="Next Page"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* No results message */}
        {sortedBlogs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Reset Filters 2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>


      {/* Newsletter Section */}
      {/* <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>
          
          
          <div className="relative z-10">
            <Mail className="w-12 h-12 mx-auto mb-4 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Stay updated with the latest insights in data analysis, business intelligence, and web development.
              Get exclusive content and early access to new articles.
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg max-w-md mx-auto">
                Thanks for subscribing! Check your email to confirm your subscription.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                  aria-label="Subscribe"
                >
                  Subscribe
                </button>
              </form>
            )}
            
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No spam ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BlogPage;