"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Cloud, Sparkles } from "lucide-react";
import { cn } = "@/lib/utils";
import PackageInquiryDialog from "@/components/PackageInquiryDialog";

const PricingSection = () => {
  const packages = [
    {
      name: "Gratis Opzet",
      initialPrice: "€0",
      recurringPrice: "Vrijblijvend",
      description: "Ontvang een gratis en vrijblijvende eerste opzet van uw website om de mogelijkheden te ontdekken.",
      features: [
        { icon: Users, text: "Gratis eerste concept van uw website" },
        { icon: CheckCircle, text: "Vrijblijvend en zonder verplichtingen" },
        { icon: Sparkles, text: "Inclusief basis designvoorstel" },
        { icon: Users, text: "Persoonlijk adviesgesprek" },
        { icon: CheckCircle, text: "Optie tot upgrade naar Starter Website" },
      ],
      paymentInfo: "Geheel gratis",
      buttonText: "Vraag gratis opzet aan",
      dialogTitlePrefix: "Gratis opzet aanvragen",
      highlight: false,
      additionalFeaturesTitle: null,
      additionalFeatures: [],
      cardGradientClass: "bg-gradient-to-br from-zutly-medium-blue to-zutly-tiffany-light",
    },
    {
      name: "Starter Website",
      initialPrice: "€400",
      recurringPrice: "eenmalig",
      description: "Perfect voor ondernemers die al hosting hebben en alleen een moderne website willen laten bouwen.",
      features: [
        { icon: CheckCircle, text: "Professionele maatwerk website (incl. responsive design)" },
        { icon: Cloud, text: "Installatie op eigen hosting (door klant geregeld of bestaande server)" },
        { icon: Sparkles, text: "Basis SEO-optimalisatie (zodat je beter gevonden wordt in Google)" },
        { icon: Users, text: "Contactformulier + basisbeveiliging" },
        { icon: CheckCircle, text: "Ongelimiteerde revisieronde inbegrepen" },
      ],
      paymentInfo: "Eenmalige betaling",
      buttonText: "Vraag offerte aan",
      dialogTitlePrefix: "Offerte aanvragen",
      highlight: false,
      additionalFeaturesTitle: null,
      additionalFeatures: [],
      cardGradientClass: "bg-gradient-to-br from-zutly-dark-purple to-zutly-medium-blue",
    },
    {
      name: "Website + Hosting",
      initialPrice: "€300",
      recurringPrice: "daarna €50 p/m",
      description: "Ideaal voor bedrijven die volledig ontzorgd willen worden en vaste maandelijkse kosten willen.",
      features: [
        { icon: CheckCircle, text: "Professionele maatwerk website" },
        { icon: Cloud, text: "Hosting via Zutly (snel, veilig en betrouwbaar)" },
        { icon: Sparkles, text: "Gratis SSL-certificaat (voor https en veiligheid)" },
        { icon: Users, text: "Domeinnaamregistratie inbegrepen" },
      ],
      paymentInfo: "Eenmalig + Maandelijks abonnement",
      buttonText: "Vraag offerte aan",
      dialogTitlePrefix: "Offerte aanvragen",
      highlight: true, // This is the "Most popular" one
      additionalFeaturesTitle: "Inclusief:",
      additionalFeatures: [
        { icon: CheckCircle, text: "Automatische beveiligingsupdates en back-ups" },
        { icon: CheckCircle, text: "Onderhoud & support inbegrepen (bijv. kleine wijzigingen per maand)" },
        { icon: CheckCircle, text: "Ongelimiteerde revisierondes inbegrepen" },
      ],
      cardGradientClass: "bg-gradient-to-br from-zutly-tiffany-dark to-zutly-dark-green",
    },
    {
      name: "Premium Website + Branding",
      initialPrice: "Op Maat",
      recurringPrice: null,
      description: "Perfect voor bedrijven die een volledige online uitstraling willen, inclusief huisstijl en professionele branding.",
      features: [
        { icon: CheckCircle, text: "Alles uit Pakket 2 (website, hosting, onderhoud, SSL, support)" },
        { icon: Cloud, text: "Of: installatie op eigen hosting (indien gewenst)" },
        { icon: Sparkles, text: "Volledige huisstijl & branding (logo, kleurenpalet, typografie)" },
        { icon: Users, text: "Social media set (profiel- en bannerafbeeldingen in de nieuwe stijl)" },
        { icon: CheckCircle, text: "Uitgebreide SEO-optimalisatie (technisch + contentadvies)" },
        { icon: CheckCircle, text: "Ongelimiteerde revisierondes inbegrepen" },
      ],
      paymentInfo: "Keuze: eenmalig of abonnementsvorm",
      buttonText: "Vraag advies aan",
      dialogTitlePrefix: "Advies aanvragen",
      highlight: false,
      additionalFeaturesTitle: null,
      additionalFeatures: [],
      cardGradientClass: "bg-gradient-to-br from-zutly-tiffany-light to-zutly-medium-blue",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">Onze Pakketten</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col p-8 rounded-xl shadow-lg transition-all duration-300 overflow-hidden",
                pkg.cardGradientClass, // Apply the gradient to the entire card
                pkg.highlight ? "transform scale-[1.03] shadow-zutly-medium-blue/20 border-2 border-zutly-tiffany-light" : "border border-gray-200",
              )}
            >
              {pkg.highlight && (
                <div className="absolute top-4 right-4 bg-zutly-tiffany-light text-zutly-dark-purple text-xs font-bold px-3 py-1 rounded-full rotate-6">
                  Meest Populair
                </div>
              )}

              <div className="flex flex-col flex-grow">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-bold mb-2 text-white"> {/* Text color for title */}
                    {pkg.name}
                  </CardTitle>
                  <p className="text-base leading-relaxed text-gray-100"> {/* Text color for description */}
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-0">
                  <ul className="list-none space-y-3 mb-8 text-left">
                    {pkg.features.map((feature, fIndex) => {
                      const IconComponent = feature.icon;
                      return (
                        <li key={fIndex} className="flex items-start">
                          <IconComponent className="h-5 w-5 text-zutly-tiffany-light mr-3 flex-shrink-0" /> {/* Icon color */}
                          <span className="text-gray-100"> {/* Text color for features */}
                            {feature.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {pkg.additionalFeaturesTitle && (
                    <>
                      <div className="border-t border-gray-600 my-6"></div> {/* Border color for separator */}
                      <p className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider"> {/* Text color for additional features title */}
                        {pkg.additionalFeaturesTitle}
                      </p>
                      <ul className="list-none space-y-3 mb-8 text-left">
                        {pkg.additionalFeatures.map((feature, fIndex) => {
                          const IconComponent = feature.icon;
                          return (
                            <li key={fIndex} className="flex items-start">
                              <IconComponent className="h-5 w-5 text-zutly-tiffany-light mr-3 flex-shrink-0" /> {/* Icon color */}
                              <span className="text-gray-100"> {/* Text color for additional features */}
                                {feature.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  <div className="mt-auto mb-4 text-center"> {/* Added text-center for price alignment */}
                    <p className="text-5xl font-extrabold text-white"> {/* Text color for initial price */}
                      {pkg.initialPrice}
                    </p>
                    {pkg.recurringPrice && (
                      <p className="text-base mt-1 text-gray-100"> {/* Text color for recurring price */}
                        {pkg.recurringPrice}
                      </p>
                    )}
                    <p className="text-base mt-4 text-gray-100"> {/* Payment info moved here */}
                      {pkg.paymentInfo}
                    </p>
                  </div>
                  <PackageInquiryDialog
                    packageName={pkg.name}
                    dialogTitlePrefix={pkg.dialogTitlePrefix}
                    trigger={
                        <Button
                          className="w-full py-3 text-lg font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300 bg-zutly-tiffany-light text-zutly-dark-purple hover:bg-zutly-tiffany-dark" // Consistent button style for all cards
                        >
                          {pkg.buttonText}
                        </Button>
                    }
                  />
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;