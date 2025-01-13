import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Award, 
  ChevronRight, 
  X, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight as ChevronNextIcon,
  ExternalLink
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCertSlide, setCertCurrentSlide] = useState(0);
  const [fullscreenContent, setFullscreenContent] = useState(null);

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

  // Animation variants
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

  // Slider controls
  const nextSlide = (current, setCurrent, length) => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = (current, setCurrent, length) => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Enhanced Card Component
  const EnhancedCard = ({ children, className = '' }) => (
    <Card 
      className={`transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
    >
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );

  // Slider Component
  const Slider = ({ items, current, setCurrent, renderItem }) => (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative"
          >
            {renderItem(items[current])}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 z-10"
        onClick={() => prevSlide(current, setCurrent, items.length)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 z-10"
        onClick={() => nextSlide(current, setCurrent, items.length)}
      >
        <ChevronNextIcon className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-blue-600 w-4' : 'bg-gray-400'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section with Video Background */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0 overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover scale-110 blur-[2px]"
          >
            <source src={videoHeader} type="video/mp4" />
            <img 
              src="/placeholder-hero.jpg"
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </video>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 backdrop-blur-sm"></div>

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

      {/* Navigation Bar */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 shadow-lg z-50">
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
            className="max-w-4xl mx-auto"
            {...fadeIn}
          >
            <EnhancedCard className="text-center">
              <h2 className="text-3xl font-bold mb-8 dark:text-white">
                {aboutData.personalInfo.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {aboutData.personalInfo.bio}
              </p>
              <div className="flex justify-center gap-8 text-gray-600 dark:text-gray-300">
                <span>{aboutData.personalInfo.location}</span>
                <span>{aboutData.personalInfo.email}</span>
              </div>
            </EnhancedCard>
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
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <EnhancedCard>
                    <h3 className="text-xl font-bold dark:text-white">{edu.degree}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{edu.description}</p>
                  </EnhancedCard>
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <EnhancedCard>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold dark:text-white">{exp.role}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
                      </div>
                      {exp.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(exp.link, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </Button>
                      )}
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">{exp.description}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </EnhancedCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Heart className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold dark:text-white">Volunteer Work</h2>
            </div>
            
            <Slider
              items={aboutData.volunteer}
              current={currentSlide}
              setCurrent={setCurrentSlide}
              renderItem={(vol) => (
                <EnhancedCard className="bg-gray-50 dark:bg-gray-700">
                  <div className="relative h-64 mb-4">
                    <img 
                      src={vol.image} 
                      alt={vol.organization}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80"
                      onClick={() => setFullscreenContent({ type: 'volunteer', data: vol })}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">{vol.role}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{vol.organization}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{vol.period}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{vol.description}</p>
                </EnhancedCard>
              )}
            />
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
            {/* Continuing from previous Skills section */}
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(aboutData.skills).map(([category, { title, skills }], index) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <EnhancedCard className="h-full">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">{title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </EnhancedCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Award className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold dark:text-white">Certificates</h2>
            </div>

            <Slider
              items={aboutData.certificates}
              current={currentCertSlide}
              setCurrent={setCertCurrentSlide}
              renderItem={(cert) => (
                <EnhancedCard className="bg-gray-50 dark:bg-gray-700">
                  <div className="relative">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80"
                      onClick={() => setFullscreenContent({ type: 'certificate', data: cert })}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold dark:text-white">{cert.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</p>
                    {cert.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => window.open(cert.link, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    )}
                  </div>
                </EnhancedCard>
              )}
            />
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Dialog */}
      <Dialog open={!!fullscreenContent} onOpenChange={() => setFullscreenContent(null)}>
        <DialogContent className="max-w-5xl w-full h-[90vh]">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-50"
            onClick={() => setFullscreenContent(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {fullscreenContent && (
            <div className="h-full flex flex-col">
              <div className="relative h-[70vh]">
                <img
                  src={fullscreenContent.data.image}
                  alt={fullscreenContent.data.title || fullscreenContent.data.organization}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold dark:text-white">
                  {fullscreenContent.type === 'certificate' ? fullscreenContent.data.title : fullscreenContent.data.role}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {fullscreenContent.type === 'certificate' ? fullscreenContent.data.issuer : fullscreenContent.data.organization}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {fullscreenContent.type === 'certificate' ? fullscreenContent.data.date : fullscreenContent.data.period}
                </p>
                {fullscreenContent.data.description && (
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {fullscreenContent.data.description}
                  </p>
                )}
                {fullscreenContent.data.link && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => window.open(fullscreenContent.data.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {fullscreenContent.type === 'certificate' ? 'View Certificate' : 'Learn More'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronRight className="h-6 w-6 transform rotate-[-90deg]" />
      </motion.button>
    </div>
  );
};

export default AboutPage;