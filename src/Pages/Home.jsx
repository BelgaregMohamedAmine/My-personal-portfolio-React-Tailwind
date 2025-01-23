import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, BarChart2, GitBranch } from 'lucide-react';

import HeroSection from "../components/home/HeroSection";
import AboutResume from "../components/home/AboutResume.jsx";
import ProjectsSection from '../components/home/ProjectsSection';
import BlogsSection from '../components/home/BlogsSection.jsx';
import Testimonials from '../components/home/Testimonials.jsx';


//import FilmstripGallery from "../components/home/FilmstripGallery";
import projectData from '../data/projectData.json';
import blogData from "../data/blogData.json";

const HomePage = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50">
      {/* Hero Section */}
      < HeroSection  />

      {/* About Section */}
      <AboutResume />

      {/* Blogs Section */}
      <BlogsSection />

      {/* Projects Section */}
      <ProjectsSection   
      />

      {/* Testimonials Section */}
      <Testimonials />

      <div className="text-center text-3xl mt-10">
        <Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact
          <ArrowRight className="inline-block w-6 h-6" />
        </Link>
      </div>
    

    </div>
  );
};

export default HomePage;