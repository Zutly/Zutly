"use client";

import React from "react";
import { Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const USPsSection = () => {
  const usps = [
    {
      icon: <Lightbulb className="h-8 w-8 text-zutly-medium-blue" />,
      title: "Innovatieve Oplossingen",
      description: "Wij bieden cutting-edge oplossingen die uw bedrijf vooruit helpen.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-zutly-medium-blue" />,
      title: "Snelle Implementatie",
      description: "Onze projecten worden efficiënt en snel opgeleverd, zonder concessies aan kwaliteit.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-zutly-medium-blue" />,
      title: "Betrouwbare Service",
      description: "U kunt rekenen op onze expertise en ondersteuning, elke stap van de weg.",
    },
  ];

  return (
    <section id="usps" className="py-16 bg-zutly-tiffany-light/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-12">Waarom Kiezen voor Zutly?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <Card key={index} className="bg-white shadow-lg border-zutly-tiffany-dark">
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4">{usp.icon}</div>
                <CardTitle className="text-2xl font-semibold text-zutly-dark-purple">
                  {usp.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{usp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPsSection;