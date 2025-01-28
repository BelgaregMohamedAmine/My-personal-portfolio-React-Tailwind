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
          linkedin: "https://www.linkedin.com/in/makram-ben-jeddou-3a3aa7182/",
        },
        {
          name: "Nesrine Elleuch Jallouli",
          role: "BI | UX/UI enthousiast | Women Techmakers Ambassador | SEO, GA, GTM | University Teacher",
          date: "August 19, 2024",
          text: "Mohamed Amine est un élément très sérieux qui a dépassé mes attentes dans tous les projets qu'il a réalisé. Il est autonome, persévérant et sait travailler en équipe. Je recommande vivement son profil.",
          image: "https://media.licdn.com/dms/image/v2/D4D03AQHqO8umCEU26A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1666868599148?e=1743033600&v=beta&t=IdezCr5W42tZ-EWFMNeJTnYu0IlTgFZDzXKpEbQFMTQ",
          linkedin: "https://www.linkedin.com/in/nesrineelleuch/",
        },
        {
          name: "ISLAM ATTAOUI",
          role: "Directeur Commercial TOYOTA",
          date: "August 19, 2024",
          text: "Dès le début de votre stage et mon encadrement de votre groupe. J'ai eu l'impression que vous êtes professionnel, intelligent et innovant. Je vous souhaite le succès personnel et professionnel. Nchalah bel tawfik",
          image: "https://media.licdn.com/dms/image/v2/C4E03AQHXmuLeHiTQCQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1651374954242?e=1743033600&v=beta&t=cSnQ3hzMH0rd8vQqwX1twbynjhe5ICEShoWLfJQln6U",
          linkedin: "https://www.linkedin.com/in/islam-attaoui-77947217b/",
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
        <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 p-4">
            <div className="container mx-auto max-w-6xl w-full">
                <header className="text-center mb-8 md:mb-12 relative">
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                            Recommendations
                        </h2>
                        <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 mx-auto rounded-full" />
                    </div>
                </header>

                <div className="bg-gray-50 dark:bg-gray-700 shadow-xl rounded-xl p-16 relative">
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button 
                            onClick={handlePrev}
                            className="text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 transition"
                            aria-label="Previous recommendation"
                        >
                            <ArrowLeft className="w-6 md:w-8 h-6 md:h-8" />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 transition"
                            aria-label="Next recommendation"
                        >
                            <ArrowRight className="w-6 md:w-8 h-6 md:h-8" />
                        </button>
                    </div>

                    <blockquote className="relative pl-8 mb-6">
                        <Quote className="absolute left-0 top-0 text-orange-500 dark:text-orange-400 w-6 h-6 opacity-30" />
                        <p className="text-base md:text-lg italic text-gray-700 dark:text-gray-300">
                            "{recommendation.text}"
                        </p>
                    </blockquote>

                    <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-700 flex items-center">
                        <a 
                            href={recommendation.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-4 transition-transform hover:scale-105"
                        >
                            <img 
                                src={recommendation.image} 
                                alt={recommendation.name}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 md:border-4 border-white dark:border-gray-700"
                            />
                        </a>
                        <div>
                            <a 
                                href={recommendation.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    {recommendation.name}
                                </h3>
                            </a>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                {recommendation.role}
                            </p>
                            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                                {recommendation.date}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                    {recommendations.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentIndex 
                                    ? 'bg-orange-500 dark:bg-orange-400' 
                                    : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            aria-label={`Go to recommendation ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;