// src/components/layout/Header.jsx
import React from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export const Header = ({ isLargeScreen, isSidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 bg-white dark:bg-gray-800 transition-colors duration-200 z-10">
      <div className="flex items-center w-full">
        {!isLargeScreen && !isSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-white"
          >
            <Menu size={24} />
          </button>
        )}
        
        <div className="flex items-center">
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            Belgareg
          </span>
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};