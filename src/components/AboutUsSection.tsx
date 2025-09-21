"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutUsSection = () => {
  const owners = [
    {
      name: "Jesse Roessink",
      title: "Oprichter & Strategisch Adviseur",
      description: "Als strategisch denker en expert in digitale transformatie, helpt Jesse klanten hun doelen te bereiken met op maat gemaakte oplossingen.",
      image: "/jesse-roessink.jpg",
      fallback: "JR",
    },
    {
      name: "Bas Jansen",
      title: "Oprichter & Lead Developer",
      description: "Met jarenlange ervaring in webontwikkeling en een passie voor innovatie, stuurt Bas de technische visie van Zutly aan.",
      image: "/bas-jansen.jpg",
      fallback: "BJ",
    },
  ];

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-12">Over Ons</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Bij Zutly geloven we in de kracht van innovatie en persoonlijke service. Maak kennis met de gezichten achter ons bedrijf.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {owners.map((owner, index) => (
            <Card key={index} className="shadow-lg border-zutly-tiffany-dark flex flex-col items-center p-6">
              <Avatar className="h-36 w-36 mb-4 border-4 border-zutly-medium-blue">
                <AvatarImage src={owner.image} alt={owner.name} />
                <AvatarFallback className="bg-zutly-medium-blue text-white text-xl font-bold">{owner.fallback}</AvatarFallback>
              </Avatar>
              <CardHeader className="p-0 mb-2 text-center">
                <CardTitle className="text-2xl font-semibold text-zutly-dark-purple">{owner.name}</CardTitle>
                <CardDescription className="text-gray-700">{owner.description}</CardDescription> {/* Description now here */}
              </CardHeader>
              <CardContent className="p-0 text-zutly-medium-blue text-center"> {/* Title now here */}
                {owner.title}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;