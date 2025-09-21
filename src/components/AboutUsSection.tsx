"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutUsSection = () => {
  const owners = [
    {
      name: "Jesse Roessink",
      title: "Oprichter & Lead Developer",
      description: "Met jarenlange ervaring in webontwikkeling en een passie voor innovatie, stuurt Jesse de technische visie van Zutly aan.",
      image: "/jesse-roessink.jpg",
      fallback: "JR",
    },
    {
      name: "Bas Jansen",
      title: "Oprichter & Strategisch Adviseur",
      description: "Als strategisch denker en expert in digitale transformatie, helpt Bas klanten hun doelen te bereiken met op maat gemaakte oplossingen.",
      image: "/bas-jansen.jpg",
      fallback: "BJ",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">Over Ons</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-16">
          Bij Zutly geloven we in de kracht van innovatie en persoonlijke service. Maak kennis met de gezichten achter ons bedrijf.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {owners.map((owner, index) => (
            <Card key={index} className="shadow-xl border-b-4 border-zutly-tiffany-dark flex flex-col items-center p-8 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              <Avatar className="h-40 w-40 mb-6 border-4 border-zutly-medium-blue shadow-md">
                <AvatarImage src={owner.image} alt={owner.name} />
                <AvatarFallback className="bg-zutly-medium-blue text-white text-2xl font-bold">{owner.fallback}</AvatarFallback>
              </Avatar>
              <CardHeader className="p-0 mb-3 text-center">
                <CardTitle className="text-2xl font-bold text-zutly-dark-purple">{owner.name}</CardTitle>
                <CardDescription className="text-zutly-medium-blue text-lg">{owner.title}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 text-gray-700 text-center text-base">
                {owner.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;