"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import PackageInquiryDialog from "@/components/PackageInquiryDialog"; // Import the new dialog component

const PricingSection = () => {
  // De state voor isDialogOpen en selectedPackageName is niet langer nodig,
  // omdat elke PackageInquiryDialog zijn eigen staat beheert.

  const packages = [
    {
      name: "Starter Website",
      description: "Perfect voor ondernemers die al hosting hebben en alleen een moderne website willen laten bouwen.",
      features: [
        "Professionele maatwerk website (incl. responsive design)",
        "Installatie op eigen hosting (door klant geregeld of bestaande server)",
        "Basis SEO-optimalisatie (zodat je beter gevonden wordt in Google)",
        "Contactformulier + basisbeveiliging",
        "Ongelimiteerde revisieronde inbegrepen",
      ],
      paymentInfo: "Eenmalige betaling",
      buttonText: "Vraag offerte aan",
      buttonLink: "/contact", // Deze link wordt nu overschreven door de DialogTrigger
      highlight: false,
    },
    {
      name: "Website + Hosting",
      description: "Ideaal voor bedrijven die volledig ontzorgd willen worden en vaste maandelijkse kosten willen.",
      features: [
        "Professionele maatwerk website",
        "Hosting via Zutly (snel, veilig en betrouwbaar)",
        "Gratis SSL-certificaat (voor https en veiligheid)",
        "Domeinnaamregistratie inbegrepen",
        "Automatische beveiligingsupdates en back-ups",
        "Onderhoud & support inbegrepen (bijv. kleine wijzigingen per maand)",
        "Ongelimiteerde revisierondes inbegrepen",
      ],
      paymentInfo: "Maandelijkse abonnementsvorm (lagere instapkosten)",
      buttonText: "Vraag offerte aan",
      buttonLink: "/contact", // Deze link wordt nu overschreven door de DialogTrigger
      highlight: false,
    },
    {
      name: "Premium Website + Branding",
      description: "Perfect voor bedrijven die een volledige online uitstraling willen, inclusief huisstijl en professionele branding.",
      features: [
        "Alles uit Pakket 2 (website, hosting, onderhoud, SSL, support)",
        "Of: installatie op eigen hosting (indien gewenst)",
        "Volledige huisstijl & branding (logo, kleurenpalet, typografie)",
        "Social media set (profiel- en bannerafbeeldingen in de nieuwe stijl)",
        "Uitgebreide SEO-optimalisatie (technisch + contentadvies)",
        "Ongelimiteerde revisierondes inbegrepen",
      ],
      paymentInfo: "Keuze: eenmalig of abonnementsvorm",
      buttonText: "Vraag advies aan",
      buttonLink: "/contact", // Deze link wordt nu overschreven door de DialogTrigger
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">Onze Pakketten</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col p-8 shadow-lg border-b-4 transition-all duration-300",
                pkg.highlight
                  ? "bg-zutly-dark-purple text-white border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl"
                  : "bg-white text-gray-800 border-zutly-tiffany-dark hover:scale-[1.01] hover:shadow-lg"
              )}
            >
              <CardHeader className="p-0 mb-6">
                <CardTitle
                  className={cn(
                    "text-3xl font-bold mb-2",
                    pkg.highlight ? "text-white" : "text-zutly-dark-purple"
                  )}
                >
                  {pkg.name}
                </CardTitle>
                <p
                  className={cn(
                    "text-base leading-relaxed",
                    pkg.highlight ? "text-zutly-tiffany-light" : "text-gray-600"
                  )}
                >
                  {pkg.description}
                </p>
              </CardHeader>
              <CardContent className="flex-grow p-0">
                <div className="mb-6">
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      pkg.highlight ? "text-zutly-tiffany-light" : "text-zutly-medium-blue"
                    )}
                  >
                    {pkg.paymentInfo}
                  </p>
                </div>
                <ul className="list-none space-y-3 mb-8 text-left">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <CheckCircle
                        className={cn(
                          "h-5 w-5 mr-3 flex-shrink-0",
                          pkg.highlight ? "text-zutly-tiffany-light" : "text-zutly-medium-blue"
                        )}
                      />
                      <span className={pkg.highlight ? "text-white" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Gebruik PackageInquiryDialog direct hier, en geef de Button als trigger mee */}
                <PackageInquiryDialog
                  packageName={pkg.name}
                  trigger={
                    <Button
                      className={cn(
                        "w-full py-3 text-lg font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300",
                        pkg.highlight
                          ? "bg-zutly-tiffany-light text-zutly-dark-purple hover:bg-zutly-tiffany-dark"
                          : "bg-zutly-medium-blue text-white hover:bg-zutly-dark-purple"
                      )}
                    >
                      {pkg.buttonText}
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* De globale PackageInquiryDialog is niet langer nodig */}
    </section>
  );
};

export default PricingSection;