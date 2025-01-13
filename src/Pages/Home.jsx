import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, BarChart2, GitBranch } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transformez vos données en décisions stratégiques
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Je suis Mohamed Amine Belgareg, Data Analyst & BI Developer passionné par la transformation des données complexes en insights actionnables.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/projects" className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
              Découvrir mes projets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Solutions BI & Data Analytics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <Database className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Data Warehousing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Conception et implémentation de solutions de stockage de données évolutives et performantes.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <BarChart2 className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Visualisation Power BI
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Création de tableaux de bord interactifs pour une prise de décision éclairée.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <GitBranch className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à transformer vos données en valeur ajoutée ?
          </h2>
          <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-gray-100 transition-colors">
            Démarrons votre projet
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;