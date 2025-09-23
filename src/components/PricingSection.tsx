"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import PackageInquiryDialog from './PackageInquiryDialog'; // Aangepast: default import

interface Feature {
  text: string;
  available: boolean;
}

interface Package {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  buttonText: string;
  buttonVariant: "default" | "outline";
}

const packages: Package[] = [
  {
    name: "Basis",
    price: "€299",
    description: "Perfect voor starters die een professionele online aanwezigheid willen.",
    features: [
      { text: "Professioneel webdesign", available: true },
      { text: "Responsief op alle apparaten", available: true },
      { text: "SEO-vriendelijke structuur", available: true },
      { text: "Contactformulier", available: true },
      { text: "Basis beveiliging", available: true },
      { text: "1 revisieronde", available: true },
      { text: "Gratis domeinnaam (.nl)", available: false },
      { text: "Gratis hosting (1 jaar)", available: false },
      { text: "Google Analytics integratie", available: false },
      { text: "Social media integratie", available: false },
      { text: "Content management systeem (CMS)", available: false },
      { text: "E-commerce functionaliteit", available: false },
    ],
    buttonText: "Kies Basis",
    buttonVariant: "outline",
  },
  {
    name: "Standaard",
    price: "€599",
    description: "Ideaal voor groeiende bedrijven die meer functionaliteit nodig hebben.",
    features: [
      { text: "Professioneel webdesign", available: true },
      { text: "Responsief op alle apparaten", available: true },
      { text: "SEO-vriendelijke structuur", available: true },
      { text: "Contactformulier", available: true },
      { text: "Basis beveiliging", available: true },
      { text: "3 revisierondes", available: true },
      { text: "Gratis domeinnaam (.nl)", available: true },
      { text: "Gratis hosting (1 jaar)", available: true },
      { text: "Google Analytics integratie", available: true },
      { text: "Social media integratie", available: true },
      { text: "Content management systeem (CMS)", available: false },
      { text: "E-commerce functionaliteit", available: false },
    ],
    buttonText: "Kies Standaard",
    buttonVariant: "default",
  },
  {
    name: "Premium",
    price: "Op Maat",
    description: "Voor bedrijven met specifieke eisen en geavanceerde functionaliteiten.",
    features: [
      { text: "Professioneel webdesign", available: true },
      { text: "Responsief op alle apparaten", available: true },
      { text: "SEO-vriendelijke structuur", available: true },
      { text: "Contactformulier", available: true },
      { text: "Basis beveiliging", available: true },
      { text: "Onbeperkt revisies", available: true },
      { text: "Gratis domeinnaam (.nl)", available: true },
      { text: "Gratis hosting (1 jaar)", available: true },
      { text: "Google Analytics integratie", available: true },
      { text: "Social media integratie", available: true },
      { text: "Content management systeem (CMS)", available: true },
      { text: "E-commerce functionaliteit", available: true },
    ],
    buttonText: "Neem Contact Op",
    buttonVariant: "outline",
  },
];

export function PricingSection() {
  return (
    <section id="pakketten" className="py-16 bg-gradient-to-b from-white to-zutly-light-purple">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className="flex flex-col justify-between p-6 shadow-lg rounded-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-bold text-zutly-dark-purple mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-zutly-dark-purple text-lg mb-4">{pkg.description}</CardDescription>
                <p className="text-5xl font-extrabold text-zutly-purple mb-6">{pkg.price}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-left text-zutly-dark-purple">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center ${!feature.available ? 'opacity-50 line-through' : ''}`}>
                      <CheckCircle2 className="text-zutly-purple mr-3 flex-shrink-0" size={20} />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <PackageInquiryDialog packageName={pkg.name}>
                  <Button className="w-full py-3 text-lg" variant={pkg.buttonVariant}>
                    {pkg.buttonText}
                  </Button>
                </PackageInquiryDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;