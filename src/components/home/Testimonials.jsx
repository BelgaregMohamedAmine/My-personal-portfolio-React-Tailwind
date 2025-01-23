import React, { useState } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const Recommendations = () => {
    const recommendations = [
        {
          name: "Makram BEN JEDDOU",
          role: "Professeur Technologue, consultant et formateur en traitement et analyse de données",
          date: "August 19, 2024",
          text: "Mohamed Amine Belgareg fut un excellent étudiant doté d'une grande capacité d'analyse et d'autonomie. Il a surtout excellé lors de son travail de mémoire de master en accomplissant un travail de grande qualité. Je recommande vivement Mohamed Amine Belgareg pour son sérieux, sa persévérance, son autonomie et son abnégation.",
          image: "https://media.licdn.com/dms/image/v2/C4E03AQHwyBrEZmoG6A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1645391887696?e=1743033600&v=beta&t=m6lEiRRGJ34xfe4y4A9P7SSP1kMzkwN64JdyhSU2MG0",
        },
        {
          name: "Nesrine Elleuch Jallouli",
          role: "BI | UX/UI enthousiast | Women Techmakers Ambassador | SEO, GA, GTM | University Teacher",
          date: "August 19, 2024",
          text: "Mohamed Amine est un élément très sérieux qui a dépassé mes attentes dans tous les projets qu'il a réalisé. Il est autonome, persévérant et sait travailler en équipe. Je recommande vivement son profil.",
          image: "https://media.licdn.com/dms/image/v2/D4D03AQHqO8umCEU26A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1666868599148?e=1743033600&v=beta&t=IdezCr5W42tZ-EWFMNeJTnYu0IlTgFZDzXKpEbQFMTQ",
        },
        {
          name: "ISLAM ATTAOUI",
          role: "Directeur Commercial TOYOTA",
          date: "August 19, 2024",
          text: "Dès le début de votre stage et mon encadrement de votre groupe. J'ai eu l'impression que vous êtes professionnel, intelligent et innovant. Je vous souhaite le succès personnel et professionnel. Nchalah bel tawfik",
          image: "https://media.licdn.com/dms/image/v2/C4E03AQHXmuLeHiTQCQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1651374954242?e=1743033600&v=beta&t=cSnQ3hzMH0rd8vQqwX1twbynjhe5ICEShoWLfJQln6U", // Remplacez par une image par défaut si nécessaire
        }
      ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  const recommendation = recommendations[currentIndex];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900  p-4">
      <div className="container mx-auto max-w-4xl w-full">
      <header className="text-center mb-12 relative">
          <div className="inline-block">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Professional Recommendations
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 mx-auto rounded-full" />
          </div>
        </header>

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 relative">
          {/* Navigation Arrows */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              onClick={handlePrev}
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="Previous recommendation"
            >
              <ArrowLeft />
            </button>
            <button 
              onClick={handleNext}
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="Next recommendation"
            >
              <ArrowRight />
            </button>
          </div>

          {/* Quote */}
          <blockquote className="relative pl-10 mb-6">
            <Quote className="absolute left-0 top-0 text-blue-500 dark:text-blue-400 w-8 h-8 opacity-30" />
            <p className="text-lg italic text-gray-700 dark:text-gray-300">
              "{recommendation.text}"
            </p>
          </blockquote>

          {/* Author Details */}
          <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-700 flex items-center">
            <img 
              src={recommendation.image} 
              alt={recommendation.name}
              className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white dark:border-gray-700"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {recommendation.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {recommendation.role}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {recommendation.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;