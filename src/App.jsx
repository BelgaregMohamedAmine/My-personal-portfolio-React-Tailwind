import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth > 1024;
      setIsLargeScreen(large);
      if (large) setSidebarOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
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

        {/* Main content */}
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
          
          {/* Footer */}
          <Footer />

        </main>


        {/* <div
          className={`${
            isSidebarOpen ? 'lg:ml-64' : ''
          } fixed bottom-0 left-0 w-full bg-orange-500 dark:bg-orange-500 text-gray-900 dark:text-white transition-colors duration-200`}
        >
          <div className="container mx-auto px-4 py-2">
            <Footer />
          </div>
        </div> */}


      </div>
      
    </Router>
  );
};

export default App;
