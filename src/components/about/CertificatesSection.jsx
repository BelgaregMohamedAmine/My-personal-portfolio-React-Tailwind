import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, Building, Medal, ExternalLink, X, Maximize2 } from 'lucide-react';

const CertificatesSection = ({ aboutData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const certBgColors = [
    'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/30',
    'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/30',
    'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
    'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/30'
  ];

  const ImageModal = ({ image, onClose }) => {
    const imageSize = {
      maxWidth: Math.min(windowSize.width * 0.9, 1200),
      maxHeight: windowSize.height * 0.9,
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative w-full h-full flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <button
            aria-label="Close Image"
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 bg-black/50 
              rounded-full hover:bg-black/70 transition-colors z-10"

          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <img 
            src={image} 
            alt="Certificate preview"
            style={imageSize}
            className="w-auto h-auto object-contain rounded-lg"
          />
        </motion.div>
      </motion.div>
    );
  };

  const CertificateCard = ({ cert, index }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 }}
        className="h-full"
      >
        <div className={`h-full rounded-lg sm:rounded-xl overflow-hidden ${certBgColors[index % certBgColors.length]} 
          border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 relative group`}
        >
          <div className="p-3 sm:p-4 h-full flex flex-col">
            {/* Image container with optimized aspect ratio */}
            <div className="relative rounded-lg  aspect-[16/11] overflow-hidden mb-3 sm:mb-4 aspect-video bg-gray-100 dark:bg-gray-700">
              <img 
                src={cert.image} 
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
                touch-device:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => setSelectedImage(cert.image)}
                  className="p-1.5 sm:p-2 bg-black/50 rounded-full hover:bg-black/70 
                    transition-colors transform hover:scale-110"
                  aria-label="Agrandir l'image"
                >
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content with optimized spacing */}
            <div className="flex-1 flex flex-col min-h-0">
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-800 
                dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 
                transition-colors duration-300 line-clamp-2"
              >
                {cert.title}
              </h3>
              
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span className="line-clamp-1">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span>{cert.date}</span>
                </div>
                {cert["Credential ID"] && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Medal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-2xs sm:text-xs truncate">{cert["Credential ID"]}</span>
                  </div>
                )}
              </div>

              {cert["Credential URL"] && (
                <motion.a
                  href={cert["Credential URL"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm 
                    text-orange-600 dark:text-orange-400 hover:text-orange-700 
                    dark:hover:text-orange-300 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  
                >
                  Voir le certificat
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id='certificates' className="py-8 sm:py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="inline-block bg-orange-100 dark:bg-orange-900/30 p-2.5 sm:p-3 rounded-xl mb-4"
            >
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
              My Certifications
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm">
              A Journey of Continuous Learning and Professional Development
            </p>
          </div>

          {/* Certificates grid */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.certificates.map((cert, index) => (
              <CertificateCard 
                key={index} 
                cert={cert} 
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;