"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Cloud, Sparkles } from "lucide-react"; // Added Users, Cloud, Sparkles for feature icons
import { cn } from "@/lib/utils";
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
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 text-gray-800"> {/* Light background for the section */}
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">Onze Pakketten</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col p-8 rounded-xl shadow-lg transition-all duration-300",
                "bg-white border border-gray-200", // Base light card style
                pkg.highlight &&
                  "border-zutly-medium-blue bg-zutly-tiffany-light/30 transform scale-[1.03] shadow-zutly-medium-blue/20", // Highlighted card style
              )}
            >
              {pkg.highlight && (
                <div className="absolute top-4 right-4 bg-zutly-medium-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                  Meest Populair
                </div>
              )}
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl font-bold mb-2 text-zutly-dark-purple">
                  {pkg.name}
                </CardTitle>
                <p className="text-base leading-relaxed text-gray-700">
                  {pkg.description}
                </p>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow p-0">
                <div className="mb-6">
                  <p className="text-lg font-semibold text-zutly-medium-blue">
                    {pkg.paymentInfo}
                  </p>
                </div>
                <ul className="list-none space-y-3 mb-8 text-left">
                  {pkg.features.map((feature, fIndex) => {
                    const IconComponent = feature.icon;
                    return (
                      <li key={fIndex} className="flex items-start">
                        <IconComponent className="h-5 w-5 text-zutly-medium-blue mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {pkg.additionalFeaturesTitle && (
                  <>
                    <div className="border-t border-gray-200 my-6"></div>
                    <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">
                      {pkg.additionalFeaturesTitle}
                    </p>
                    <ul className="list-none space-y-3 mb-8 text-left">
                      {pkg.additionalFeatures.map((feature, fIndex) => {
                        const IconComponent = feature.icon;
                        return (
                          <li key={fIndex} className="flex items-start">
                            <IconComponent className="h-5 w-5 text-zutly-medium-blue mr-3 flex-shrink-0" />
                            <span className="text-gray-700">
                              {feature.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                <div className="mb-4 mt-auto">
                  <p className="text-5xl font-extrabold text-zutly-dark-purple">
                    {pkg.initialPrice}
                  </p>
                  {pkg.recurringPrice && (
                    <p className="text-base mt-1 text-gray-600">
                      {pkg.recurringPrice}
                    </p>
                  )}
                </div>
                <PackageInquiryDialog
                  packageName={pkg.name}
                  dialogTitlePrefix={pkg.dialogTitlePrefix}
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
    </section>
  );
};

export default PricingSection;