"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Code, Rocket, Settings } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="h-10 w-10 text-zutly-medium-blue" />,
    title: "1. Ontdekking & Strategie",
    description: "We beginnen met een diepgaand gesprek om uw visie, doelen en doelgroep te begrijpen. Samen formuleren we een heldere strategie.",
  },
  {
    icon: <Code className="h-10 w-10 text-zutly-medium-blue" />,
    title: "2. Ontwerp & Ontwikkeling",
    description: "Op basis van de strategie ontwerpen en ontwikkelen we een maatwerkoplossing, met focus op gebruiksvriendelijkheid en technische perfectie.",
  },
  {
    icon: <Rocket className="h-10 w-10 text-zutly-medium-blue" />,
    title: "3. Lancering & Optimalisatie",
    description: "Na uitgebreide tests lanceren we uw project. We monitoren de prestaties en optimaliseren waar nodig voor het beste resultaat.",
  },
  {
    icon: <Settings className="h-10 w-10 text-zutly-medium-blue" />,
    title: "4. Onderhoud & Support",
    description: "Ook na de lancering staan we voor u klaar met doorlopend onderhoud, updates en support om uw digitale aanwezigheid te waarborgen.",
  },
];

const HowWeWorkSection = () => {
  return (
    <section id="how-we-work" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-4">Hoe Wij Werken</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Onze gestructureerde aanpak zorgt voor succesvolle projecten, van concept tot realisatie.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white shadow-lg border-b-4 border-zutly-tiffany-dark flex flex-col items-center p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-col items-center p-0 mb-4">
                <div className="mb-4">{step.icon}</div>
                <CardTitle className="text-xl font-semibold text-zutly-dark-purple text-center">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-700 text-center text-sm leading-relaxed">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;