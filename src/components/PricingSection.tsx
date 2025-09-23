"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import PackageInquiryDialog from "./PackageInquiryDialog";

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  buttonText: string;
}

const packages: Package[] = [
  {
    name: "Basis",
    price: "€499",
    description: "Perfect voor starters die een professionele online aanwezigheid willen.",
    features: [
      { text: "Professioneel webdesign", included: true },
      { text: "Responsief op alle apparaten", included: true },
      { text: "Contactformulier", included: true },
      { text: "SEO-vriendelijke structuur", included: true },
      { text: "Basis beveiliging", included: true },
      { text: "1 revisieronde", included: true },
      { text: "Gratis hosting (1 jaar)", included: false },
      { text: "Maandelijks onderhoud", included: false },
      { text: "Geavanceerde SEO-optimalisatie", included: false },
      { text: "E-commerce functionaliteit", included: false },
    ],
    buttonText: "Meer info",
  },
  {
    name: "Standaard",
    price: "€999",
    description: "Ideaal voor groeiende bedrijven die meer functionaliteit en ondersteuning nodig hebben.",
    features: [
      { text: "Alles van Basis", included: true },
      { text: "Geavanceerd webdesign", included: true },
      { text: "Integratie van sociale media", included: true },
      { text: "Blog functionaliteit", included: true },
      { text: "Uitgebreide beveiliging", included: true },
      { text: "3 revisierondes", included: true },
      { text: "Gratis hosting (1 jaar)", included: true },
      { text: "Maandelijks onderhoud (3 maanden)", included: true },
      { text: "Geavanceerde SEO-optimalisatie", included: false },
      { text: "E-commerce functionaliteit", included: false },
    ],
    buttonText: "Meer info",
  },
  {
    name: "Premium",
    price: "€1999",
    description: "De complete oplossing voor bedrijven die het maximale uit hun online aanwezigheid willen halen.",
    features: [
      { text: "Alles van Standaard", included: true },
      { text: "Maatwerk webdesign", included: true },
      { text: "API-integraties", included: true },
      { text: "Geavanceerde analytics", included: true },
      { text: "Premium beveiliging", included: true },
      { text: "Onbeperkt revisies", included: true },
      { text: "Gratis hosting (1 jaar)", included: true },
      { text: "Maandelijks onderhoud (1 jaar)", included: true },
      { text: "Geavanceerde SEO-optimalisatie", included: true },
      { text: "E-commerce functionaliteit", included: true },
    ],
    buttonText: "Meer info",
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="pakketten" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        {/* <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">Onze Pakketten</h2> */} {/* Deze regel is verwijderd */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className="flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-2 border-transparent hover:border-zutly-medium-blue">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-bold text-zutly-dark-purple mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600 text-lg">{pkg.description}</CardDescription>
                <p className="text-5xl font-extrabold text-zutly-medium-blue mt-4">{pkg.price}</p>
              </CardHeader>
              <CardContent className="flex-grow py-4">
                <ul className="space-y-3 text-left text-gray-700">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center ${!feature.included ? 'text-gray-400 line-through' : ''}`}>
                      <CheckCircle2 className={`mr-2 h-5 w-5 ${feature.included ? 'text-green-500' : 'text-gray-400'}`} />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <PackageInquiryDialog
                  packageName={pkg.name}
                  trigger={
                    <Button className="w-full py-3 text-lg bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white font-bold rounded-full shadow-xl hover:scale-105 transition-all duration-300">
                      {pkg.buttonText}
                    </Button>
                  }
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;