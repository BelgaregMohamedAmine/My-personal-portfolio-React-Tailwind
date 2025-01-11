import React, { useState } from 'react';
import { 
  Code, 
  Database, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail,
  Terminal,
  Boxes,
  Cpu
} from 'lucide-react';

// Composant Home
const Home = () => {
  const [hoveredBox, setHoveredBox] = useState(null);

  const features = [
    {
      icon: <Terminal size={32} />,
      title: "Développement Web",
      description: "Création d'applications modernes avec React"
    },
    {
      icon: <Database size={32} />,
      title: "Data Analysis",
      description: "Analyse de données et visualisations"
    },
    {
      icon: <Boxes size={32} />,
      title: "Solutions Full-Stack",
      description: "Architecture complète et performante"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
              Belgareg Mohamed Amine
            </h1>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
              Développeur Full-Stack & Data Analyst
            </p>
            <div className="flex justify-center gap-4 pt-8">
              <a href="#projects" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-all transform hover:scale-105">
                Voir mes projets
              </a>
              <a href="/about" className="px-8 py-3 border border-purple-500 rounded-full text-white hover:bg-purple-500/20 transition-all">
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredBox(index)}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full transform transition-all duration-300 hover:scale-105">
                <div className="text-purple-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant About

export default Home