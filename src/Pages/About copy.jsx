import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, Heart, Award, ChevronRight } from 'lucide-react';

import aboutData from '../data/aboutData.json';
import  videoHeader from '../../public/videoHeder.mp4'

const AboutPage = () => {

  const keywords = [
    { text: "Business Intelligence", size: "text-4xl", color: "text-blue-400" },
    { text: "Data Analysis", size: "text-3xl", color: "text-green-400" },
    { text: "Power BI", size: "text-2xl", color: "text-purple-400" },
    { text: "Dashboard", size: "text-xl", color: "text-yellow-400" },
    { text: "Data Visualization", size: "text-3xl", color: "text-pink-400" },
    { text: "Analytics", size: "text-2xl", color: "text-cyan-400" },
    { text: "KPI", size: "text-xl", color: "text-red-400" },
    { text: "Reporting", size: "text-2xl", color: "text-orange-400" },
    { text: "SQL", size: "text-xl", color: "text-teal-400" },
    { text: "ETL", size: "text-2xl", color: "text-indigo-400" },
  ];
  const [activeSection, setActiveSection] = useState('about');

  // Handle scroll and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'volunteer', 'skills', 'certificates'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Navigation items
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section with Bottom Nav */}
  
       {/* Hero Section with Video Background */}
    <div className="relative h-[60vh]">
      {/* Video Background with blur effect */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover scale-110 blur-[2px]"
        >
          <source src={videoHeader} type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="./assets/cover-about.webp" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Enhanced overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          {...fadeIn}
        >
          About Me
        </motion.h1>
        <motion.p
          className="text-xl text-white/90 max-w-2xl drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {aboutData.personalInfo.title}
        </motion.p>
      </div>
    </div>

        {/* Bottom Navigation Bar */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 shadow-lg top-16 z-10 ">
          <div className="container mx-auto px-4">
            <nav className="flex overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={`#${item.id}`}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold mb-8 dark:text-white">{aboutData.personalInfo.name}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {aboutData.personalInfo.bio}
            </p>
            <div className="flex justify-center gap-8 text-gray-600 dark:text-gray-300">
              <span>{aboutData.personalInfo.location}</span>
              <span>{aboutData.personalInfo.email}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            {...fadeIn}
          >
            <div className="flex items-center gap-4 mb-12">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold dark:text-white">Education</h2>
            </div>
            <div className="space-y-8">
              {aboutData.education.map((edu, index) => (
                <motion.div 
                  key={index}
                  className="relative pl-8 border-l-2 border-blue-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold dark:text-white">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            {...fadeIn}
          >
            <div className="flex items-center gap-4 mb-12">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold dark:text-white">Experience</h2>
            </div>
            <div className="space-y-8">
              {aboutData.experience.map((exp, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold dark:text-white">{exp.role}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{exp.description}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            {...fadeIn}
          >
            <div className="flex items-center gap-4 mb-12">
              <Heart className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold dark:text-white">Volunteer Work</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {aboutData.volunteer.map((vol, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <img 
                    src={vol.image} 
                    alt={vol.organization}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold dark:text-white">{vol.role}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{vol.organization}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{vol.period}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{vol.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.values(aboutData.skills).map((category, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4 dark:text-white">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            {...fadeIn}
          >
            <div className="flex items-center gap-4 mb-12">
              <Award className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold dark:text-white">Certificates</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {aboutData.certificates.map((cert, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold dark:text-white">{cert.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;