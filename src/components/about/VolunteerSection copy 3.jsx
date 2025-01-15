import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Building, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const ImageGallery = ({ images, currentIndex, setCurrentIndex, isHovering, isMobile }) => {
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
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-md bg-black/30 p-3
              rounded-full text-white transition-all duration-300 
              ${isMobile ? 'opacity-100' : isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} 
              hover:bg-black/50 hover:scale-110`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => handleClick(e, 'next')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-md bg-black/30 p-3
              rounded-full text-white transition-all duration-300
              ${isMobile ? 'opacity-100' : isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
              hover:bg-black/50 hover:scale-110`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-opacity duration-300">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 ${
              idx === currentIndex 
                ? 'w-8 h-2 bg-white rounded-full' 
                : 'w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full'
            }`}
          />
        ))}
      </div>
    </>
  );
};

const FullscreenModal = ({ isOpen, onClose, images, currentIndex, setCurrentIndex }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    setTouchStart(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black z-50 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-3 hover:bg-white/10 rounded-full z-50 
          transition-all duration-300 hover:rotate-90"
      >
        <X className="w-6 h-6" />
      </button>

      <div 
        className="flex-1 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          onClick={e => e.stopPropagation()} 
          className="relative w-full h-full flex items-center justify-center"
        >
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-[85vh] w-full md:w-auto object-contain"
          />
          
          <ImageGallery 
            images={images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isHovering={true}
            isMobile={isMobile}
          />
        </div>
      </div>

      {isMobile && (
        <div className="bg-black/80 p-4">
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden snap-start
                  ${idx === currentIndex ? 'ring-2 ring-white' : 'opacity-50'}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const VolunteerCard = ({ data, isVisible }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div className="bg-white/90 dark:bg-gray-900 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row p-4 md:p-8 gap-6 md:gap-8">
        <div 
          className="relative w-full md:w-[320px] h-[240px] md:h-[320px] rounded-xl overflow-hidden group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={data.images[currentImageIndex]}
            alt={data.organization}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

          <ImageGallery 
            images={data.images}
            currentIndex={currentImageIndex}
            setCurrentIndex={setCurrentImageIndex}
            isHovering={isHovering || isMobile}
            isMobile={isMobile}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFullscreen(true);
            }}
            className="absolute top-4 right-4 backdrop-blur-md bg-black/30 p-2 
              rounded-full text-white transition-all duration-300 hover:scale-110 
              hover:bg-black/50 opacity-0 group-hover:opacity-100 md:opacity-0"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col min-w-0 px-1 md:px-0">
          <h3 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            {data.role}
          </h3>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 text-base md:text-lg text-gray-700 dark:text-gray-200">
              <Building className="w-5 h-5 flex-shrink-0" />
              <span className="truncate font-medium">{data.organization}</span>
            </div>
            <div className="flex items-center gap-3 text-base md:text-lg text-gray-700 dark:text-gray-200">
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{data.period}</span>
            </div>
          </div>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            {data.description}
          </p>
        </div>
      </div>

      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        images={data.images}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
    </div>
  );
};

const VolunteerSection = ({ aboutData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (e, direction) => {
    e.preventDefault();
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % aboutData.volunteer.length;
      }
      return (prev - 1 + aboutData.volunteer.length) % aboutData.volunteer.length;
    });
  };

  return (
    <section className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block p-4 rounded-full bg-white/20 backdrop-blur-sm mb-6 
            transition-transform duration-300 hover:scale-110">
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Volunteer Work & Clubs
          </h2>
          <div className="w-20 md:w-32 h-1 bg-white/60 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto mb-20">
          <div className="relative">
            {aboutData.volunteer.map((item, index) => (
              <div 
                key={index} 
                className={`transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <VolunteerCard 
                  data={item}
                  isVisible={index === currentIndex}
                />
              </div>
            ))}
          </div>

          {isMobile ? (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={(e) => handleNavigation(e, 'prev')}
                className="bg-white/80 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-xl 
                  hover:bg-white hover:scale-110 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => handleNavigation(e, 'next')}
                className="bg-white/80 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-xl 
                  hover:bg-white hover:scale-110 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:block absolute -left-24 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => handleNavigation(e, 'prev')}
                  className="bg-white/80 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-xl 
                    hover:bg-white hover:scale-110 transition-all duration-300"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
              </div>
              
              <div className="hidden md:block absolute -right-24 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => handleNavigation(e, 'next')}
                  className="bg-white/80 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-xl 
                    hover:bg-white hover:scale-110 transition-all duration-300"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            </>
          )}

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {aboutData.volunteer.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-10 h-2 bg-white rounded-full' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;