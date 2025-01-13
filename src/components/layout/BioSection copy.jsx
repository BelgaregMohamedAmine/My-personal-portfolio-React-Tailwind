import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Share2, Database, ChartBar, ArrowRight } from 'lucide-react';

const BioSection = ({ aboutData }) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const bioHighlights = [
    {
      icon: Brain,
      title: "Curiosité & Innovation",
      description: "Naturellement curieux et observateur, je relève constamment de nouveaux défis et je suis toujours à la recherche d'opportunités d'apprentissage."
    },
    {
      icon: Database,
      title: "Analyse de Données",
      description: "J'aime résoudre des problèmes grâce aux données, développant des solutions d'analyse pour optimiser les performances de l'entreprise."
    },
    {
      icon: ChartBar,
      title: "Visualisation",
      description: "Création d'outils interactifs de visualisation des données avec Power BI pour améliorer la prise de décision."
    },
    {
      icon: Share2,
      title: "Partage & Mentorat",
      description: "J'apprécie le mentorat et le partage des connaissances avec mes collègues et les professionnels du secteur."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div className="max-w-6xl mx-auto">
          {/* En-tête avec effet de soulignement animé */}
          <div className="text-center mb-16 relative">
            <motion.h2 
              className="text-4xl font-bold mb-6 dark:text-white inline-block relative"
              {...fadeIn}
            >
              À Propos de Moi
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            </motion.h2>
          </div>

          {/* Citation avec style personnalisé */}
          <motion.div 
            className="relative text-xl text-gray-700 dark:text-gray-300 mb-16 text-center italic py-8"
            {...fadeIn}
          >
            <span className="absolute top-0 left-0 text-6xl text-blue-400 opacity-20">"</span>
            Passionné par la transformation des données en insights actionnables
            <span className="absolute bottom-0 right-0 text-6xl text-blue-400 opacity-20">"</span>
          </motion.div>

          {/* Points forts avec style de carte personnalisé */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {bioHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                      <highlight.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Description détaillée avec style personnalisé */}
          <motion.div 
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            {...fadeIn}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Mon travail actuel inclut l'analyse avancée des données, la modélisation prédictive, 
              la création de rapports interactifs avec Power BI, ainsi que la mise en place de 
              processus ETL pour assurer la qualité et la fiabilité des données.
            </p>
            <div className="flex items-center justify-center space-x-4 group cursor-pointer">
              <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                Découvrez mes projets pour en savoir plus
              </span>
              <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioSection;
