"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutUsSection from "@/components/AboutUsSection";

const AboutUsPage = () => {
  const aboutPageOwners = [
    {
      name: "Jesse Roessink",
      title: "Oprichter & Lead Developer",
      description: "Jesse is de technische drijvende kracht achter Zutly. Met een scherp oog voor detail en een diepgaande kennis van moderne webtechnologieën, zorgt hij ervoor dat elk project technisch solide en innovatief is. Zijn passie voor coderen en het oplossen van complexe vraagstukken is de basis van onze hoogwaardige weboplossingen.",
      image: "/jesse-roessink.jpg",
      fallback: "JR",
    },
    {
      name: "Bas Jansen",
      title: "Oprichter & Strategisch Adviseur",
      description: "Bas brengt een strategische visie en een klantgerichte benadering naar Zutly. Met zijn expertise in digitale strategie en bedrijfsprocessen, helpt hij klanten hun doelen te definiëren en te realiseren. Hij is de brug tussen jouw visie en onze technische uitvoering, en zorgt voor oplossingen die echt impact maken.",
      image: "/bas-jansen.jpg",
      fallback: "BJ",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative min-h-[30vh] flex flex-col items-center justify-center bg-gradient-to-br from-zutly-dark-purple via-zutly-medium-blue to-zutly-tiffany-dark text-white overflow-hidden py-16 px-4 text-center">
          <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M29.999 4.003c-14.486 0-26.203 11.717-26.203 26.203 0 14.485 11.717 26.202 26.203 26.202 14.486 0 26.203-11.717 26.203-26.202 0-14.486-11.717-26.203-26.203-26.203zm0 1.999c13.344 0 24.204 10.86 24.204 24.204 0 13.344-10.86 24.203-24.204 24.203-13.344 0-24.204-10.859-24.204-24.203 0-13.344 10.86-24.204 24.204-24.204zM12 29.999c0 9.94 8.06 18 18 18s18-8.06 18-18-8.06-18-18-18-18 8.06-18 18zm2 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zM16 29.999c0 7.732 6.268 14 14 14s14-6.268 14-14-6.268-14-14-14-14 6.268-14 14zm2 0c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zM20 29.999c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10zm2 0c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zM24 29.999c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6zm2 0c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM28 29.999c0 1.105.895 2 2 2s2-.895 2-2-.895-2-2-2-2 .895-2 2z\'/%3E%3C/g%3E%3C/svg%3E'}} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
              Over Ons
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-sm">
              Maak kennis met het team achter Zutly en onze missie.
            </p>
          </div>
        </section>
        <AboutUsSection
           sectionTitle="Over Zutly"
           sectionDescription="Hier stellen we de drijvende krachten achter Zutly voor. Ontdek wie we zijn en wat ons motiveert om de beste weboplossingen te leveren."
          owners={aboutPageOwners}
        />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;