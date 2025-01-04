import React, { useState, useMemo } from 'react';
import { Book, Clock, User, ChevronRight, Search, TrendingUp, Mail } from 'lucide-react';
import blogData from '../data/blogData.json';

const BlogPage = () => {
  // States for filters and newsletter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Get unique categories from blogs
  const categories = ['All Posts', ...new Set(blogData.blogs.map(blog => blog.category))];

  // Time periods for filtering
  const timePeriods = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  // Newsletter subscription handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically make an API call to handle the subscription
      setTimeout(() => setIsSubscribed(false), 3000); // Reset after 3 seconds
    }
  };

  // Filter blogs based on all criteria
  const filteredBlogs = useMemo(() => {
    return blogData.blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Posts' || blog.category === selectedCategory;
      
      // Date filtering
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

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Posts');
    setSelectedPeriod('all');
  };

  return (
    <div className="bg-orange-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover articles about data analysis, business intelligence, and web development
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          {/* Search and Time Period */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Time Period Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {timePeriods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                    ${selectedPeriod === period.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results count and Reset filters */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {sortedBlogs.length} {sortedBlogs.length === 1 ? 'result' : 'results'}
            </div>
            {(searchQuery || selectedCategory !== 'All Posts' || selectedPeriod !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <Book className="w-4 h-4" />
                    <span>{blog.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{blog.views.toLocaleString()} views</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                {/* Tags */}
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
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No results message */}
        {sortedBlogs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold mb-4">Subscribe to My Newsletter</h2>
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
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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
      </div>
    </div>
  );
};

export default BlogPage;