"use client";

import React from "react";
import { Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const USPsSection = () => {
  const usps = [
    {
      icon: <Lightbulb className="h-12 w-12 text-zutly-medium-blue" />,
      title: "Innovatieve Oplossingen",
      description: "Wij ontwikkelen cutting-edge webapplicaties met de nieuwste technologieën die uw bedrijf vooruit helpen en onderscheiden van de concurrentie.",
    },
    {
      icon: <Rocket className="h-12 w-12 text-zutly-medium-blue" />,
      title: "Snelle Implementatie",
      description: "Onze agile aanpak garandeert efficiënte projecten die snel worden opgeleverd, zonder concessies aan kwaliteit of beveiliging.",
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-zutly-medium-blue" />,
      title: "Betrouwbare Service",
      description: "U kunt rekenen op onze expertise en continue ondersteuning, van concept tot implementatie en daarna.",
    },
  ];

  return (
    <section id="usps" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-zutly-dark-purple mb-6">
            Waarom Kiezen voor Zutly?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij combineren technische expertise met creatieve oplossingen om uw digitale doelen te realiseren
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-2xl border-0 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader className="flex flex-col items-center p-8 pb-4">
                <div className="mb-6 p-4 bg-zutly-tiffany-light/10 rounded-2xl group-hover:bg-zutly-medium-blue/10 transition-colors duration-300">
                  {usp.icon}
                </div>
                <CardTitle className="text-2xl font-semibold text-zutly-dark-purple text-center">
                  {usp.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 text-center">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {usp.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPsSection;