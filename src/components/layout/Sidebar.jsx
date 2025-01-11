// src/components/layout/Sidebar.jsx
import React from 'react';
import { X, Home, Contact , Newspaper, Briefcase, Mail, Github, Linkedin, Twitter, Facebook,Instagram } from 'lucide-react';
import { NavItem } from './NavItem';
import profile from '../../assets/profile.png';


export const Sidebar = ({ isSidebarOpen, isLargeScreen, setSidebarOpen }) => {
  return (
    <div
      className={`fixed ${isLargeScreen ? 'top-16' : 'top-0'} mt-0 bottom-0 left-0 w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${!isLargeScreen ? 'z-20' : ''} overflow-y-auto`}
    >
      <div className="flex flex-col h-full">
        {/* Close button - only visible on small screens */}
        {!isLargeScreen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-2 right-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-white"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}

        {/* Profile Section */}
        <div className="p-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src={profile}
              alt="Profile"
              className="rounded-full border-2 border-gray-200 dark:border-gray-700"
            />
          </div>
          <h2 className="text-md font-bold text-gray-900 dark:text-white mb-1">Belgareg Mohamed Amine</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">BI Developer</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem href="/" text="Home" icon={<Home size={20} />} />
          <NavItem href="/about" text="About" icon={<Contact size={20} />} />
          <NavItem href="/blog" text="Blog" icon={<Newspaper size={20} />} />
          <NavItem href="/portfolio" text="Portfolio" icon={<Briefcase size={20} />} />
          <NavItem href="/contact" text="Contact" icon={<Mail size={20} />} />
        </nav>

        {/* Social Links */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Follow me on</p>
          <div className="flex justify-center space-x-1">
            <a
              href="https://github.com/BelgaregMohamedAmine"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-700 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-amine-belgareg-bi-analyst/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-700  transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://x.com/MohamedAmi87477"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-700  transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100087518705181"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-700  transition-colors" 
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/belgareg.mohamed.amine/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-700  transition-colors"
            >
              <Instagram size={20} />
            </a>
          
          </div>
        </div>
      </div>
    </div>
  );
};