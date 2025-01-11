import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Github, Calendar, 
  ChevronRight, ChevronLeft, User, Timer,
  Clock, Briefcase, Award, Code
} from 'lucide-react';

import projectData from '../data/projectData.json';
import RecommendedProjects from "../components/layout/RecommendedProjects.jsx";


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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                  (end.getMonth() - start.getMonth());
    return months <= 1 ? '1 month' : `${months} months`;
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      {/* Simplified Header */}
      <header className="relative bg-gradient-to-br from-gray-700 via-blue-500 to-gray-700 text-white py-16" >
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/happy-young-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-office_7861-2537.jpg?t=st=1736576626~exp=1736580226~hmac=6dc6d0a1bf60bc52c90222047d40cf99ff40cafd985673753f4896bd35a7645c&w=1380')] opacity-30" />
        <div className="container mx-auto px-4 relative">
          <button
            onClick={() => window.history.back()}
            className="flex items-center mb-8 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </button>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Project Quick Info Bar */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-16 z-10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Période */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(project.startDate)}</span>
                <span>→</span>
                <span>{project.endDate ? formatDate(project.endDate) : 'Present'}</span>
              </div>

              {/* Durée */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Timer className="w-5 h-5" />
                <span>{calculateDuration(project.startDate, project.endDate)}</span>
              </div>

              {/* Client */}
              {project.client && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Briefcase className="w-5 h-5" />
                  <span>{project.client}</span>
                </div>
              )}
            </div>

            {/* Boutons */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <main className="container mx-auto px-0 md:px-4 py-4 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          {/* Left Content */}
          <div className="lg:col-span-2 ">
            <div className="bg-white dark:bg-gray-800 md:min-h-64 md:rounded-md shadow-xl overflow-hidden">
              {/* Creative Tab Navigation */}
              
              <div className="flex border-b dark:border-gray-700">
                {['overview', 'gallery', 'results'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-center relative transition-all ${
                      activeTab === tab 
                        ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {tab === 'overview' && <Code className="w-4 h-4" />}
                      {tab === 'gallery' && <ExternalLink className="w-4 h-4" />}
                      {tab === 'results' && <Award className="w-4 h-4" />}
                      <span className="capitalize">{tab}</span>
                    </div>
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
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
                        className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer"
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                          <span className="text-white text-sm font-medium">View larger</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'results' && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {project.results.map((result, index) => (
                      <div 
                        key={index}
                        className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <p className="text-gray-700 dark:text-gray-300">{result}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div>
            <div className="bg-white dark:bg-gray-800 md:rounded-md shadow-xl p-4 md:min-h-64">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <Code className="w-5 h-5" />
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {project.technologies.map(tech => (
                  <div 
                    key={tech.name}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-6 h-6"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <RecommendedProjects 
          currentProject={project}
          allProjects={projectData.projects}
        />
      </main>

      {/* Enhanced Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-5xl mx-auto p-4">
            <img
              src={project.images[currentImageIndex].url}
              alt={project.images[currentImageIndex].alt}
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl"
            />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => 
                    prev === 0 ? project.images.length - 1 : prev - 1
                  );
                }}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
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
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
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