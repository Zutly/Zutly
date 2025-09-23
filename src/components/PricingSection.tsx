"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import PackageInquiryDialog from "@/components/PackageInquiryDialog";

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
    description: "Perfect voor starters die online zichtbaar willen zijn.",
    features: [
      { text: "Professioneel website ontwerp", included: true },
      { text: "Responsief design (mobielvriendelijk)", included: true },
      { text: "Contactformulier", included: true },
      { text: "Basis SEO-optimalisatie", included: true },
      { text: "Tot 5 pagina's", included: true },
      { text: "Gratis hosting (1 jaar)", included: true },
      { text: "Gratis domeinnaam (1 jaar)", included: true },
      { text: "Onderhoud & updates", included: false },
      { text: "Geavanceerde SEO", included: false },
      { text: "E-commerce functionaliteit", included: false },
    ],
    buttonText: "Meer info",
  },
  {
    name: "Standaard",
    price: "€999",
    description: "Ideaal voor groeiende bedrijven met specifieke behoeften.",
    features: [
      { text: "Professioneel website ontwerp", included: true },
      { text: "Responsief design (mobielvriendelijk)", included: true },
      { text: "Contactformulier", included: true },
      { text: "Basis SEO-optimalisatie", included: true },
      { text: "Tot 10 pagina's", included: true },
      { text: "Gratis hosting (1 jaar)", included: true },
      { text: "Gratis domeinnaam (1 jaar)", included: true },
      { text: "Onderhoud & updates", included: true },
      { text: "Geavanceerde SEO", included: false },
      { text: "E-commerce functionaliteit", included: false },
    ],
    buttonText: "Meer info",
  },
  {
    name: "Premium",
    price: "€1499",
    description: "Voor bedrijven die een complete online oplossing zoeken.",
    features: [
      { text: "Professioneel website ontwerp", included: true },
      { text: "Responsief design (mobielvriendelijk)", included: true },
      { text: "Contactformulier", included: true },
      { text: "Basis SEO-optimalisatie", included: true },
      { text: "Tot 20 pagina's", included: true },
      { text: "Gratis hosting (1 jaar)", included: true },
      { text: "Gratis domeinnaam (1 jaar)", included: true },
      { text: "Onderhoud & updates", included: true },
      { text: "Geavanceerde SEO", included: true },
      { text: "E-commerce functionaliteit", included: true },
    ],
    buttonText: "Meer info",
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="pakketten" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        {/* <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">Onze Pakketten</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-2 border-transparent hover:border-zutly-medium-blue"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-bold text-zutly-dark-purple mb-2">
                  {pkg.name}
                </CardTitle>
                <p className="text-5xl font-extrabold text-zutly-medium-blue mb-2">
                  {pkg.price}
                </p>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
              </CardHeader>
              <CardContent className="flex-grow py-4">
                <ul className="space-y-2 text-left">
                  {pkg.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-center ${
                        feature.included ? "text-gray-800" : "text-gray-400 line-through"
                      }`}
                    >
                      <CheckCircle
                        className={`mr-2 h-5 w-5 ${
                          feature.included ? "text-green-500" : "text-gray-400"
                        }`}
                      />
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