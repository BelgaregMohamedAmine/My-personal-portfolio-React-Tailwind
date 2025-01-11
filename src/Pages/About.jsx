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




// Composant About
const About = () => {
  const experiences = [
    {
      period: "2023 - Présent",
      title: "Développeur Full-Stack",
      description: "Développement d'applications web complètes avec React et Node.js"
    },
    {
      period: "2022 - 2023",
      title: "Data Analyst",
      description: "Analyse de données et création de dashboards"
    }
  ];

  const skills = [
    "React.js", "Node.js", "Python", "SQL", "TailwindCSS", 
    "Git", "Data Analysis", "Machine Learning"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Intro Section */}
        <div className="mb-20">
          <h1 className="text-5xl font-bold text-white mb-8">
            Mon Parcours
          </h1>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              Passionné par la tech depuis mon plus jeune âge, je me suis spécialisé dans le développement web et l'analyse de données. Mon approche combine créativité et rigueur analytique pour créer des solutions innovantes et performantes.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-purple-400 hover:text-purple-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Expérience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-sm text-purple-400 mb-2">{exp.period}</div>
                <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Compétences</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <div className="text-center text-gray-300">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;