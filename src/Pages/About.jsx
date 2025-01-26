import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Building, Calendar,ArrowRight, Layers , MapPin , Award } from 'lucide-react';


import aboutData from '../data/aboutData.json';

import  videoHeader from '../../public/videoHeder.mp4'

import NavigationSection from "../components/about/NavigationSection"
import BioSection from "../components/about/BioSection";
import VolunteerSection from "../components/about/VolunteerSection";
import SkillsSection from "../components/about/SkillsSection";
import CertificatesSection from "../components/about/CertificatesSection";
import InterestsSection from "../components/about/InterestsSection";
import CTASection from "../components/about/CTASection";

const AboutPage = () => {

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
    { id: 'certificates', label: 'Certificates' },
    { id: 'interests', label: 'Interests' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section with Video Background */}
      <div className="relative h-[40vh]">
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
              Data Analyst || Business Intelligence Developer || web developer
            </motion.p>
          </div>
      </div>

      {/* Bottom Navigation Bar */}
      <NavigationSection activeSection={activeSection} />

      {/* About Section */}
      <BioSection aboutData={aboutData} />

      {/* Education Section */}
      <section id="education" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto"
          {...fadeIn}
        >
          {/* Header with decorated title */}
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block p-3 rounded-full bg-orange-50 dark:bg-orange-900/30 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <GraduationCap className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h2 className="text-4xl font-bold dark:text-white mb-4">Educational Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
          </div>

          {/* Timeline */}
          <div className="relative space-y-12">
            {/* Central line */}
            <div className="absolute -left-1 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>

            {aboutData.education.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-1 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white dark:border-gray-800"></div>

                {/* Content card */}
                <div className="w-full md:w-5/12 pl-2 md:pl-0">
                  <motion.div 
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {edu.degree}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Building className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <span className="text-base md:text-lg font-medium">{edu.institution}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <span className='text-xs md:text-sm'>{edu.period}</span>
                      </div>

                      {edu.description && (
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-start gap-2">
                            <Award className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{edu.description}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hover effect arrow */}
                    <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 md:py-20 bg-gray-60 dark:bg-gray-900">
      <div className="container mx-auto px-4 ">
        {/* Header */}
        <div className="text-center mb-16">
            <motion.div 
              className="inline-block p-3 rounded-full bg-orange-50 dark:bg-orange-900/30 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Layers className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h2 className="text-4xl font-bold dark:text-white mb-4">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
          </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-1 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-600 via-orange-400 to-orange-300"></div>

          {/* Experience Items */}
          {aboutData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative mb-8 md:mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-1 md:left-8 -translate-x-1/2 w-3 md:w-4 h-3 md:h-4 bg-orange-600 rounded-full border-4 border-white dark:border-gray-800"></div>

              {/* Content */}
              <div className="ml-4 md:ml-20">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 group hover:shadow-xl transition-all duration-300">
                  {/* Role and Company */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 md:space-y-3 relative">
                    {exp.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        className="pl-4 md:pl-6 relative group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute left-0 top-2 w-1.5 md:w-2 h-1.5 md:h-2 bg-orange-600 rounded-full"></div>
                        <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {highlight}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </section>

      {/* Volunteer Section */}
      <VolunteerSection aboutData={aboutData} />

      {/* Skills Section */}
      <SkillsSection aboutData={aboutData} />

      {/* Certificates Section */}
      <CertificatesSection aboutData={aboutData} />

      {/* Interests Section  */}
      <InterestsSection />

      {/* CALL TO ACTION SECTION */}
      <CTASection/>
    </div>
  );
};

export default AboutPage;