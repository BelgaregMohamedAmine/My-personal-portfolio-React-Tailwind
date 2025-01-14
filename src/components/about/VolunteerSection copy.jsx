import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Building, ChevronLeft, ChevronRight } from 'lucide-react';

const VolunteerCard = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % data.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
  };

  return (
    <div className="w-full md:w-96 flex-shrink-0 px-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full">
        {/* Image Slider */}
        <div className="relative h-48 bg-gray-200">
          <img
            src={data.images[imageIndex]}
            alt={`${data.organization} - ${imageIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {data.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {data.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      idx === imageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {data.role}
          </h3>
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Building className="w-4 h-4" />
              <span>{data.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>{data.period}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const VolunteerSection = ({ aboutData }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = 384; // 96*4 (w-96) + 16 (px-2) = 384px
      const newPosition = direction === 'left' 
        ? Math.max(scrollPosition - cardWidth, 0)
        : Math.min(scrollPosition + cardWidth, (aboutData.volunteer.length * cardWidth) - container.offsetWidth);
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section id="volunteer" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            className="inline-block p-3 rounded-full bg-orange-50 dark:bg-orange-900/30 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Volunteer Work & Clubs
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={containerRef}
            className="flex overflow-x-hidden scroll-smooth gap-4"
          >
            {aboutData.volunteer.map((item, index) => (
              <VolunteerCard key={index} data={item} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={scrollPosition >= (aboutData.volunteer.length * 384) - containerRef.current?.offsetWidth}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;