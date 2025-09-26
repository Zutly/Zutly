"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TechLogo {
  name: string;
  logo: string;
}

const techLogos: TechLogo[] = [
  { name: "React", logo: "/react-logo.svg" }, // Vervang met echte logo's
  { name: "TypeScript", logo: "/typescript-logo.svg" },
  { name: "Tailwind CSS", logo: "/tailwind-logo.svg" },
  { name: "Node.js", logo: "/nodejs-logo.svg" },
  { name: "Vite", logo: "/vite-logo.svg" },
  { name: "Shadcn/ui", logo: "/shadcn-logo.svg" },
];

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="py-20 bg-zutly-tiffany-dark/10">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-4">Onze Technologieën</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Wij bouwen met de nieuwste en meest robuuste technologieën voor schaalbare en efficiënte oplossingen.
        </p>
        <Card className="bg-white shadow-lg border-b-4 border-zutly-medium-blue p-8">
          <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
            {techLogos.map((tech, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-2">
                <img src={tech.logo} alt={tech.name} className="h-16 w-auto object-contain mb-2" />
                <p className="text-sm font-medium text-gray-700">{tech.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TechStackSection;