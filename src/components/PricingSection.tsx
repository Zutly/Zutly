"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import PackageInquiryDialog from "@/components/PackageInquiryDialog";

const PricingSection = () => {
  const packages = [
    {
      name: "Starter Website",
      price: "€499", // Toegevoegde prijs
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
      dialogTitlePrefix: "Offerte aanvragen",
      cardVariant: "default",
    },
    {
      name: "Website + Hosting",
      price: "€79/maand", // Toegevoegde prijs
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
      dialogTitlePrefix: "Offerte aanvragen",
      cardVariant: "medium",
    },
    {
      name: "Premium Website + Branding",
      price: "Op Maat", // Toegevoegde prijs
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
      dialogTitlePrefix: "Advies aanvragen",
      cardVariant: "premium",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col p-8 shadow-lg border-b-4 transition-all duration-300",
                pkg.cardVariant === "premium" &&
                  "bg-zutly-dark-purple text-white border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl",
                pkg.cardVariant === "medium" &&
                  "bg-zutly-tiffany-light/20 text-gray-800 border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl",
                pkg.cardVariant === "default" &&
                  "bg-white text-gray-800 border-zutly-tiffany-dark hover:scale-[1.01] hover:shadow-lg"
              )}
            >
              <CardHeader className="p-0 mb-6">
                <CardTitle
                  className={cn(
                    "text-3xl font-bold mb-2",
                    pkg.cardVariant === "premium" && "text-white",
                    pkg.cardVariant === "medium" && "text-zutly-dark-purple",
                    pkg.cardVariant === "default" && "text-zutly-dark-purple"
                  )}
                >
                  {pkg.name}
                </CardTitle>
                {/* Toegevoegde prijsweergave */}
                <p
                  className={cn(
                    "text-5xl font-extrabold mb-4",
                    pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                    pkg.cardVariant === "medium" && "text-zutly-medium-blue",
                    pkg.cardVariant === "default" && "text-zutly-dark-purple"
                  )}
                >
                  {pkg.price}
                </p>
                <p
                  className={cn(
                    "text-base leading-relaxed",
                    pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                    pkg.cardVariant === "medium" && "text-gray-800",
                    pkg.cardVariant === "default" && "text-gray-600"
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
                      pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                      pkg.cardVariant === "medium" && "text-zutly-dark-purple",
                      pkg.cardVariant === "default" && "text-zutly-medium-blue"
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
                          pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                          pkg.cardVariant === "medium" && "text-zutly-medium-blue",
                          pkg.cardVariant === "default" && "text-zutly-medium-blue"
                        )}
                      />
                      <span className={pkg.cardVariant === "premium" ? "text-white" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <PackageInquiryDialog
                  packageName={pkg.name}
                  dialogTitlePrefix={pkg.dialogTitlePrefix}
                  trigger={
                    <Button
                      className={cn(
                        "w-full py-3 text-lg font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300",
                        pkg.cardVariant === "premium"
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
    </section>
  );
};

export default PricingSection;