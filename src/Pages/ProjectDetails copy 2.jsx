import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Globe, 
         ChevronRight, ChevronLeft, BarChart2, 
         Building2, Users, Clock } from 'lucide-react';

import projectData from '../data/projectData.json';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    loadProject();
  }, [slug]);

  const loadProject = () => {
    setIsLoading(true);
    try {
      const foundProject = projectData.projects.find(p => p.slug === slug);
      setProject(foundProject);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header simplifié */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center mb-6 text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </button>

          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              {project.client}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {project.duration} mois
            </span>
            <span>
              {project.category}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b dark:border-gray-700">
                <div className="flex">
                  {['overview', 'gallery', 'results'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 capitalize relative ${
                        activeTab === tab 
                          ? 'text-blue-500 dark:text-blue-400' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="prose dark:prose-invert max-w-none">
                    {project.description}
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setShowLightbox(true);
                        }}
                        className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'results' && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {project.results.map((result, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <div 
                    key={tech.name}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-4 h-4"
                    />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>

              {/* Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-col gap-3 mt-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Globe className="w-4 h-4" />
                      Voir le Projet
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                    >
                      <Github className="w-4 h-4" />
                      Code Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-4xl mx-auto p-4">
            <img
              src={project.images[currentImageIndex].url}
              alt={project.images[currentImageIndex].alt}
              className="max-h-[80vh] w-auto"
            />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => 
                    prev === 0 ? project.images.length - 1 : prev - 1
                  );
                }}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => 
                    prev === project.images.length - 1 ? 0 : prev + 1
                  );
                }}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;