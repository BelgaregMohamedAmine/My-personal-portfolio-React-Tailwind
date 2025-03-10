import React, { useEffect, useRef, useState } from 'react';
import { Database, ChartBar, LineChart, Table, Mail, FolderKanban, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of your professional images
  const backgroundImages = [
    "https://res.cloudinary.com/medaminebelgareg/image/upload/v1737398855/portfolio/me/0d54592e-99f9-4c64-9b41-385814053aba.png",
    "https://res.cloudinary.com/medaminebelgareg/image/upload/v1737377139/portfolio/me/55f693a3-1c78-4d50-9e39-41df8507c845.png", // Replace with your actual image paths
    "https://res.cloudinary.com/medaminebelgareg/image/upload/v1737377174/portfolio/me/1a0df7a6-2364-432d-9d43-41f765dad07b.png",
    "https://res.cloudinary.com/medaminebelgareg/image/upload/v1737377235/portfolio/me/b949d459-282d-4e34-b475-96fca286110b.png",
    "https://res.cloudinary.com/medaminebelgareg/image/upload/v1737377257/portfolio/me/ad55cbba-b83d-4696-b07c-6e196b475310.png",
    "https://res.cloudinary.com/medaminebelgareg/image/upload/v1737394268/portfolio/me/30accd85-8241-427d-9afe-a3a5ad6fc62b_ky0u56.png"];

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Particle animation effect (keeping your existing code)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: 0, y: 0 };
    let particles = [];

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 15 + 5;
      }

      draw() {
        ctx.fillStyle = 'rgba(249, 115, 22, 0.12)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx/20;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy/20;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative bg-gray-50 dark:bg-gray-800 min-h-[90vh] flex items-center overflow-hidden transition-colors duration-300">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Professional background ${index + 1}`}
              className="w-full h-full object-cover opacity-15 dark:opacity-16"
            />
          </div>
        ))}
      </div>

      {/* Interactive Particle Layer */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-16 w-full">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl  font-bold text-gray-900 dark:text-white transition-colors">
                Mohamed Amine Belagreg
                <span className="block text-2xl text-orange-500 dark:text-orange-400 mt-3 transition-colors">
                  Data Analyst & BI Developer
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
                Helping businesses make data-driven decisions through analytics and visualization solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
               to="/contact" 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
               className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <Mail className="w-5 h-5" />
                Contact Me
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link >
              <Link to="/portfolio" className="flex items-center gap-2 border-2 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-400 hover:bg-orange-500 dark:hover:bg-orange-600 hover:text-white dark:hover:text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <FolderKanban className="w-5 h-5" />
                Projects
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-2 md:gap-6">
            {[
              {
                icon: <Database className="w-6 h-6" />,
                title: "Data Analysis",
                description: "SQL, Python, Excel"
              },
              {
                icon: <ChartBar className="w-6 h-6" />,
                title: "BI Development",
                description: "Power BI, Tableau"
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Visualization",
                description: "Charts, Dashboards"
              },
              {
                icon: <Table className="w-6 h-6" />,
                title: "Reporting",
                description: "Analytics, KPIs"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-orange-500 dark:text-orange-400 mb-3 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="absolute inset-0 flex items-end justify-center pb-2 md:pb-6">
        <div className="relative w-[22px] md:w-[33px] h-[35px] md:h-[50px] border-2 border-orange-500 dark:border-white rounded-full flex justify-center items-start animate-bounce">
          <div className="absolute w-[3px] md:w-[6px] h-[3px] md:h-[6px] bg-orange-500 dark:bg-white rounded-full top-2 animate-blink"></div>
        </div>
      </div>
   
    
    </div>
  );
};

export default HeroSection;