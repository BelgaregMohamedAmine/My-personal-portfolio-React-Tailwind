import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, BarChart2, GitBranch } from 'lucide-react';

import HeroSection from "../components/home/HeroSection";
//import FilmstripGallery from "../components/home/FilmstripGallery";
import projectData from '../data/projectData.json';
import blogData from "../data/blogData.json";

const HomePage = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50">
      {/* Hero Section */}
      < HeroSection />


      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Solutions BI & Data Analytics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <Database className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Data Warehousing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Conception et implémentation de solutions de stockage de données évolutives et performantes.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <BarChart2 className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Visualisation Power BI
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Création de tableaux de bord interactifs pour une prise de décision éclairée.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <GitBranch className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ETL Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automatisation des processus d'extraction, transformation et chargement des données.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Expertise Technique
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Power BI',
              'SQL & MSBI',
              'Python',
              'ETL Development',
              'Data Modeling',
              'Data Analysis',
              'JavaScript',
              'Web Development'
            ].map((skill, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-900 dark:text-white font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-600 dark:bg-orange-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à transformer vos données en valeur ajoutée ?
          </h2>
          <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-orange-600 hover:bg-gray-100 transition-colors">
            Démarrons votre projet projet
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;