import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Building, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

// Composant pour la galerie d'images dans une carte
const ImageGallery = ({ images, currentIndex, setCurrentIndex, isHovering }) => {
  const handleClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    if (action === 'next') {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (!images?.length) return null;

  return (
    <>
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => handleClick(e, 'prev')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 
              rounded-full text-white transition-opacity duration-300 
              ${isHovering ? 'opacity-100' : 'opacity-0'} hover:bg-black/70`}
              aria-label="Previous Image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => handleClick(e, 'next')}
            aria-label="Next Image"
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 
              rounded-full text-white transition-opacity duration-300 
              ${isHovering ? 'opacity-100' : 'opacity-0'} hover:bg-black/70`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label = "Image Navigation"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 ${
              idx === currentIndex 
                ? 'w-6 h-2 bg-white rounded-full' 
                : 'w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full'
            }`}
          />
        ))}
      </div>
    </>
  );
};

// Composant Modal pour l'affichage en plein écran
const FullscreenModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full z-50"
      >
        <X className="w-8 h-8" />
      </button>
      <div 
        onClick={e => e.stopPropagation()} 
        className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
      >
        {children}
      </div>
    </div>
  );
};

// Composant Card
const VolunteerCard = ({ data, isVisible, onNavigate, currentIndex, totalItems }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isHovering && !isFullscreen && data.images?.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % data.images.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isHovering, isFullscreen, data.images]);

  if (!isVisible) return null;

  return (
    <div className="m-4 bg-gray-100 dark:bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-lg relative">
      {/* Navigation Bar - New Elegant Design */}
      <div className="top-0 left-0 right-0 bg-orange-400 dark:bg-gray-700  px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-white text-md font-medium">
            {currentIndex + 1}/{totalItems}
          </span>
          <div className="h-2 bg-white/20 rounded-full w-24 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous Item"
            onClick={(e) => onNavigate(e, 'prev')}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm transition-all duration-300 group"
          >
            <ChevronLeft className="w-4 h-4 md:w-8 md:h-8 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={(e) => onNavigate(e, 'next')}
            aria-label="Next Item"
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm transition-all duration-300 group"
          >
            <ChevronRight className="w-4 h-4 md:w-8 md:h-8 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-3 md:p-6 gap-4 md:gap-6">
        <div 
          className="relative w-full md:w-[450px] h-[200px] md:h-[280px] rounded-lg md:rounded-2xl overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={data.images[currentImageIndex]}
            alt={data.organization}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          <ImageGallery 
            images={data.images}
            currentIndex={currentImageIndex}
            setCurrentIndex={setCurrentImageIndex}
            isHovering={isHovering}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFullscreen(true);
            }}
            aria-label="View Fullscreen"
            className="absolute top-2 left-2 bg-black/50 p-1.5 rounded-full text-white hover:scale-110 transition-transform"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col min-w-0 px-1 md:px-0">
          <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            {data.role}
          </h3>

          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
              <Building className="w-4 h-4 flex-shrink-0" />
              <span className="">{data.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{data.period}</span>
            </div>
          </div>

          <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed ">
            {data.description}
          </p>
        </div>
      </div>

      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={data.images[currentImageIndex]}
              alt={data.organization}
              className="max-w-full max-h-[85vh] object-contain"
            />
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
              }}
              aria-label="Previous Image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-4 
                rounded-full text-white hover:bg-black/70 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % data.images.length);
              }}
              aria-label="Next Image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-4 
                rounded-full text-white hover:bg-black/70 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {data.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  aria-label="Image Navigation"
                  className={`transition-all duration-300 ${
                    idx === currentImageIndex 
                      ? 'w-8 h-2 bg-white rounded-full' 
                      : 'w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </FullscreenModal>
    </div>
  );
};

// Composant principal
const VolunteerSection = ({ aboutData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = (e, direction) => {
    e.preventDefault();
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % aboutData.volunteer.length;
      }
      return (prev - 1 + aboutData.volunteer.length) % aboutData.volunteer.length;
    });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      id='volunteer' 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="bg-white dark:bg-gray-800 py-8 md:py-16"
    >
      <div className="container mx-auto px-1">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          variants={headerVariants}
        >
          <motion.div 
            className="inline-block p-3 rounded-full bg-orange-50 dark:bg-orange-900/30 mb-4"
            whileHover={{ scale: 1.1 }}
          >
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400" />
          </motion.div>
          <motion.h2 
            variants={headerVariants}
            className="text-2xl md:text-3xl font-bold dark:text-white mb-2"
          >
            Volunteer Work & Clubs
          </motion.h2>
          <motion.div 
            variants={headerVariants}
            className="w-16 md:w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"
          />
        </motion.div>

        <div className="relative max-w-5xl mx-auto mb-20">
          <motion.div 
            className="relative"
            variants={sectionVariants}
          >
            {aboutData.volunteer.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0,
                  transition: { duration: 0.5 }
                }}
                className={index === currentIndex ? 'block' : 'hidden'}
              >
                <VolunteerCard 
                  data={item}
                  isVisible={index === currentIndex}
                  onNavigate={handleNavigation}
                  currentIndex={currentIndex}
                  totalItems={aboutData.volunteer.length}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Elegant dots navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3"
          >
            {aboutData.volunteer.map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
                aria-label="Navigate to Item"
                className={`transition-all duration-300 relative ${
                  idx === currentIndex 
                    ? 'w-8 h-2 bg-white rounded-full' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VolunteerSection;