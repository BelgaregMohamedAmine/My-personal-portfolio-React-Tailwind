import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import {Link} from 'react-router-dom';

import blogData from '../../data/blogData.json';

const BlogSection = () => {
  // Get the 3 most recent blogs
  const recentBlogs = [...blogData.blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12 relative">
          <div className="inline-block">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              Latest Blogs
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 mx-auto rounded-full" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
            Insights and guides on data analysis, business intelligence, and web development
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlogs.map((blog) => (
            <article 
              key={blog.id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full">
                  {blog.category}
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-5">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={blog.date}>
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={`${blog.id}-${tag}-${index}`}
                    className="px-2 py-1 text-xs font-medium bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                </div>

                {/* Read More Link */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 transition-colors duration-300"
                  aria-label={`Read more about ${blog.title}`}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
            aria-label="View all blog posts"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;