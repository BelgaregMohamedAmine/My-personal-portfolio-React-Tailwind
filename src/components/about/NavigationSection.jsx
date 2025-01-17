import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationSection = ({ activeSection }) => {
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const scrollContainerRef = useRef(null);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' }
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const activeElement = document.querySelector(`[data-section="${activeSection}"]`);
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeSection]);

  return (
    <div className="sticky top-0 bg-white dark:bg-gray-800 shadow-lg z-10 transition-all duration-300 h-16 w-full">
      <div className="relative h-full w-full">
        {showLeftScroll && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-8 bg-gradient-to-r from-white via-white to-transparent 
              dark:from-gray-800 dark:via-gray-800 dark:to-transparent flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-orange-600" />
          </button>
        )}

        {showRightScroll && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-8 bg-gradient-to-l from-white via-white to-transparent 
              dark:from-gray-800 dark:via-gray-800 dark:to-transparent flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-orange-600" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex h-full overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={checkScroll}
        >
          <div className="flex h-full justify-start md:justify-center gap-1 md:gap-2 ">
            {navItems.map((item) => (
              <button
                key={item.id}
                data-section={item.id}
                className={`
                  px-3 md:px-6 h-full text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200
                  flex-shrink-0 flex items-center
                  ${
                    activeSection === item.id
                      ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                  }
                `}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSection;