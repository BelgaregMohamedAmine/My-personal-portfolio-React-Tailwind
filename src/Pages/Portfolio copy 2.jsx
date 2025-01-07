import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  ChevronRight, 
  Code, 
  DatabaseIcon,
  BarChart2,
  Globe,
  Terminal,
  PieChart,
  Mail 
} from 'lucide-react';

import projectData from '../data/projectData.json';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectData.projects);

  // Stats montrant l'expertise dans les trois domaines
  const stats = [
    { label: "Projets Web", value: "15+" },
    { label: "Analyses de Données", value: "20+" },
    { label: "Dashboards BI", value: "10+" },
    { label: "Clients Satisfaits", value: "25+" }
  ];

  // Expertise par domaine
  const expertise = [
    {
      title: "Développement Web",
      icon: <Globe className="w-8 h-8" />,
      skills: ["React", "Node.js", "TypeScript", "API REST", "MongoDB", "Express"]
    },
    {
      title: "Data Analysis",
      icon: <DatabaseIcon className="w-8 h-8" />,
      skills: ["Python", "Pandas", "SQL", "ETL", "Data Cleaning", "Statistical Analysis"]
    },
    {
      title: "Business Intelligence",
      icon: <BarChart2 className="w-8 h-8" />,
      skills: ["Power BI", "Tableau", "Data Modeling", "DAX", "Data Visualization", "Reporting"]
    }
  ];

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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              De la Donnée à la 
              <span className="text-yellow-300"> Valeur</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Web Developer | Data Analyst | Business Intelligence Developer
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#projects" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Voir Projets
              </a>
              <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                Me Contacter
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12 -mt-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expertise Sections */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Mes Domaines d'Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {domain.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {domain.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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