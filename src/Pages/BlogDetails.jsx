import React from "react";
import { useParams } from "react-router-dom";
import {
  Clock,
  User,
  ChevronLeft,
  Share2,
  Bookmark,
  ThumbsUp,
} from "lucide-react";
import blogData from "../data/blogData.json";
import BlogSectionRenderer from "../components/layout/BlogSectionRenderer";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogData.blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog not found
          </h1>
          <a
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to blogs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 py-16">
            <a
              href="/blog"
              className="text-white mb-4 hover:text-blue-400 flex items-center gap-2 w-fit"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to blogs
            </a>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
              <div className="relative group">
                <div className="flex flex-wrap gap-2 max-w-full">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-blue-600 bg-opacity-50 
                            inline-flex items-center whitespace-nowrap"
                    >
                      <span className="truncate">#{tag}</span>
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <button
                      className="px-2 py-1 text-xs rounded-full bg-gray-500 bg-opacity-50 
                            hover:bg-opacity-70 transition-colors"
                    >
                      +{blog.tags.length - 3} more
                    </button>
                  )}
                </div>

                {/* Menu déroulant pour tous les tags */}
                {blog.tags.length > 3 && (
                  <div
                    className="hidden group-hover:block absolute top-full left-0 mt-2 
                                bg-white text-gray-700 dark:bg-gray-800 shadow-lg rounded-lg p-2 z-10
                                max-h-48 overflow-y-auto"
                  >
                    <div className="flex flex-col gap-1">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 
                                rounded-full truncate"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
             

              {/* Blog content */}
              <div className="prose dark:prose-invert max-w-none">
                {blog.sections.map((section, index) => (
                  <BlogSectionRenderer key={index} section={section} />
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <ThumbsUp className="w-5 h-5" />
                  Like
                </button>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Bookmark className="w-5 h-5" />
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
             {/* Author info */}
            <div className="flex items-center gap-4  bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {blog.author.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {blog.author.bio}
                  </p>
                </div>
            </div>

            {/* Trending Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Trending Posts
              </h3>
              <div className="space-y-4">
                {blogData.trending.map((post, index) => (
                  <a
                    key={index}
                    href={post.url}
                    className="block hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      {post.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Latest Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Latest Posts
              </h3>
              <div className="space-y-4">
                {blogData.latest.map((post, index) => (
                  <a
                    key={index}
                    href={post.url}
                    className="block hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      {post.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
