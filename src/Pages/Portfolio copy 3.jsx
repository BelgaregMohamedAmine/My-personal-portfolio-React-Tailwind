import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  ChevronRight, 
  ChevronLeft,
  Database,
  BarChart2,
  Globe,
  Terminal,
  PieChart,
  Mail,
  ArrowRight 
} from 'lucide-react';

import projectData from '../data/projectData.json';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectData.projects);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider content
  const heroSlides = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEGVjOtSBUnGpiJuRr2YeNEYEtdtlijpeBA&s",
      title: "Web Development",
      subtitle: "Creating modern & responsive applications",
      description: "Full-stack development with React, Node.js, and modern web technologies"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEGVjOtSBUnGpiJuRr2YeNEYEtdtlijpeBA&s",
      title: "Data Analysis",
      subtitle: "Transforming data into insights",
      description: "Advanced analytics using Python, SQL, and statistical methods"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEGVjOtSBUnGpiJuRr2YeNEYEtdtlijpeBA&s",
      title: "Business Intelligence",
      subtitle: "Visualizing data for better decisions",
      description: "Creating interactive dashboards with Power BI and Tableau"
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Project filtering logic
  useEffect(() => {
    const filtered = projectData.projects.filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Slider */}
      <div className="relative h-screen">
        {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 z-20 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 z-20 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto text-center text-white"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-6xl md:text-7xl font-bold mb-4">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-2xl md:text-3xl text-blue-300 mb-6">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  <p className="text-xl text-gray-200 mb-8">
                    {heroSlides[currentSlide].description}
                  </p>
                  <div className="flex justify-center gap-6">
                    <a
                      href="#projects"
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                      View Projects
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-600' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Introduction Section */}
      <div className="relative bg-white dark:bg-gray-800 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Turning Complex Data into Clear Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Hi, I'm [Your Name]. I specialize in web development, data analysis, and business intelligence.
              With expertise in multiple domains, I help businesses leverage their data through custom solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Web Development</h3>
                <p className="text-gray-600 dark:text-gray-300">Full-stack solutions with modern technologies</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Data Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">Transforming raw data into actionable insights</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <BarChart2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Business Intelligence</h3>
                <p className="text-gray-600 dark:text-gray-300">Interactive dashboards and reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>

          {/* Projects Section */}
           <div id="projects" className="container mx-auto px-4 py-16">
             <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
               Mes Projets
             </h2>
     
             {/* Filters */}
             <div className="mb-12">
               <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                 <div className="flex flex-wrap gap-4 items-center">
                   <div className="flex-1 min-w-[200px]">
                     <input
                       type="text"
                       placeholder="Rechercher des projets..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                     />
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {['All', 'Web', 'Data', 'BI'].map((category) => (
                       <button
                         key={category}
                         onClick={() => setSelectedCategory(category)}
                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                           ${selectedCategory === category
                           ? 'bg-blue-600 text-white'
                           : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                           }`}
                       >
                         {category}
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
     
             {/* Projects Grid */}
             <AnimatePresence mode="wait">
               <motion.div
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                 layout
               >
                 {filteredProjects.map((project) => (
                   <motion.article
                     key={project.id}
                     layout
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg 
                              hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                   >
                     <div className="relative group h-48 overflow-hidden">
                       <img
                         src={project.thumbnail}
                         alt={project.title}
                         className="w-full h-full object-cover transition-transform duration-300 
                                  group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                                     opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                           {project.liveUrl && (
                             <a
                               href={project.liveUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-2 text-white hover:text-blue-400"
                             >
                               <ExternalLink className="w-4 h-4" />
                               <span>Démo</span>
                             </a>
                           )}
                           {project.githubUrl && (
                             <a
                               href={project.githubUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-2 text-white hover:text-blue-400"
                             >
                               <Github className="w-4 h-4" />
                               <span>Code</span>
                             </a>
                           )}
                         </div>
                       </div>
                     </div>
     
                     <div className="p-6">
                       <div className="flex flex-wrap gap-2 mb-3">
                         {project.tags.slice(0, 3).map((tag, index) => (
                           <span
                             key={index}
                             className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900
                                      text-blue-600 dark:text-blue-300"
                           >
                             {tag}
                           </span>
                         ))}
                       </div>
     
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                         {project.title}
                       </h3>
     
                       <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                         {project.shortDescription}
                       </p>
     
                       <div className="flex items-center justify-between">
                         <span className="text-sm text-gray-500 dark:text-gray-400">
                           {new Date(project.date).toLocaleDateString('fr-FR', {
                             year: 'numeric',
                             month: 'long'
                           })}
                         </span>
                         <Link
                           to={`/portfolio/${project.slug}`}
                           className="flex items-center gap-1 text-blue-600 dark:text-blue-400
                                    hover:gap-2 transition-all"
                         >
                           Voir Détails <ChevronRight className="w-4 h-4" />
                         </Link>
                       </div>
                     </div>
                   </motion.article>
                 ))}
               </motion.div>
             </AnimatePresence>
     
             {filteredProjects.length === 0 && (
               <div className="text-center py-12">
                 <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                   Aucun projet trouvé
                 </h3>
                 <p className="text-gray-600 dark:text-gray-400">
                   Essayez d'ajuster vos filtres de recherche.
                 </p>
                 <button
                   onClick={() => {
                     setSelectedCategory('All');
                     setSearchQuery('');
                   }}
                   className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                            transition-colors"
                 >
                   Réinitialiser les filtres
                 </button>
               </div>
             )}
           </div>
     
           {/* Contact Section */}
           <div id="contact" className="bg-white dark:bg-gray-800 py-16">
             <div className="container mx-auto px-4">
               <div className="max-w-2xl mx-auto text-center">
                 <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                   Collaborons Ensemble
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 mb-8">
                   Vous avez un projet web, besoin d'analyser vos données ou de créer des tableaux de bord BI ?
                   Je peux vous aider à concrétiser vos idées.
                 </p>
                 <div className="flex justify-center gap-4">
                   <a
                     href="mailto:votre.email@example.com"
                     className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg 
                              hover:bg-blue-700 transition-colors"
                   >
                     <Mail className="w-5 h-5" />
                     Me Contacter
                   </a>
                   <a
                     href="/cv"
                     className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 
                              rounded-lg hover:bg-blue-50 transition-colors"
                   >
                     Voir mon CV
                   </a>
                 </div>
               </div>
             </div>
           </div>
    </div>
  );
};

export default PortfolioPage;