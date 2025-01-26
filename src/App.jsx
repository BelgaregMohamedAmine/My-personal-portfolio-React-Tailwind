import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

/*loding page */
import PageLoader from './components/layout/LoaderPortfolio';

/** components */
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

/** pages */
import Home from './Pages/Home';
import About from './Pages/About';
import Blog from './Pages/Blog';
import Portfolio from './Pages/Portfolio';
import ContactForm from './Pages/ContactForm';
import BlogDetails from './Pages/BlogDetails';
import ProjectDetails from './Pages/ProjectDetails';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth > 1024;
      setIsLargeScreen(large);
      if (large) setSidebarOpen(true);
    };

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {isLoading && <PageLoader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
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

          {!isLargeScreen && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <main 
            className={`pt-16 ${isLargeScreen ? 'lg:ml-64' : 'ml-0'} p-0 text-gray-900 dark:text-white transition-colors duration-200`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<ProjectDetails />} />
              <Route path="/contact" element={<ContactForm />} />
            </Routes>
            
            <Footer />
          </main>
        </div>
      )}
    </Router>
  );
};

export default App;