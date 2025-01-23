import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
    // Ajoutez d'autres recommandations ici
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Recommendations
        </h2>
        <div className="">
          <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
            {recommendations.map((rec, index) => (
              <div key={index} className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <div className="flex items-center mb-4">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {rec.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rec.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {rec.date}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {rec.text}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;