"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Scale, Users, TrendingUp } from "lucide-react";

const coreValues = [
  {
    icon: <Zap className="h-10 w-10 text-zutly-medium-blue" />,
    title: "Innovatie",
    description: "We omarmen de nieuwste technologieën en creatieve ideeën om grensverleggende oplossingen te leveren die uw bedrijf vooruit helpen.",
  },
  {
    icon: <Scale className="h-10 w-10 text-zutly-medium-blue" />,
    title: "Transparantie",
    description: "Open communicatie en eerlijkheid staan centraal in al onze interacties. U bent altijd op de hoogte van de voortgang en beslissingen.",
  },
  {
    icon: <Users className="h-10 w-10 text-zutly-medium-blue" />,
    title: "Klantgerichtheid",
    description: "Uw succes is onze prioriteit. We luisteren aandachtig naar uw behoeften en werken nauw samen om oplossingen te creëren die perfect aansluiten.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-zutly-medium-blue" />,
    title: "Kwaliteit",
    description: "We streven naar de hoogste standaarden in alles wat we doen, van codekwaliteit tot design en gebruikerservaring, voor duurzame resultaten.",
  },
];

const CoreValuesSection = () => {
  return (
    <section id="core-values" className="py-20 bg-zutly-tiffany-light/20">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-4">Onze Kernwaarden</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Deze principes vormen de basis van onze werkwijze en onze toewijding aan uw succes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <Card key={index} className="bg-white shadow-lg border-b-4 border-zutly-medium-blue flex flex-col items-center p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-col items-center p-0 mb-4">
                <div className="mb-4">{value.icon}</div>
                <CardTitle className="text-xl font-semibold text-zutly-dark-purple text-center">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-700 text-center text-sm leading-relaxed">
                {value.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;