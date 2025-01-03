// src/components/layout/Layout.jsx
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024; // Changed to 1024px
      setIsLargeScreen(large);
      if (large) setSidebarOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header 
        isLargeScreen={isLargeScreen} 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        isLargeScreen={isLargeScreen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Backdrop - only for small screens */}
      {!isLargeScreen && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main 
        className={`pt-16 ${isSidebarOpen ? 'lg:ml-64' : ''} p-4 text-gray-900 dark:text-white transition-colors duration-200`}
      >
        <div className="mx-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p>Your content goes here...</p>
        </div>
      </main>
    </div>
  );
};

export default Layout;