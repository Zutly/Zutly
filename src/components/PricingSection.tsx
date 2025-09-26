"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import PackageInquiryDialog from "@/components/PackageInquiryDialog";

const PricingSection = () => {
  const packages = [
    {
      name: "Gratis Opzet",
      initialPrice: "€0",
      recurringPrice: "Geheel gratis",
      description: "Ontvang een gratis en vrijblijvende eerste opzet van uw website om de mogelijkheden te ontdekken.",
      features: [
        "Gratis eerste concept van uw website",
        "Vrijblijvend en zonder verplichtingen",
        "Inclusief basis designvoorstel",
        "Persoonlijk adviesgesprek",
        "Optie tot upgrade naar Starter Website",
      ],
      buttonText: "Vraag gratis opzet aan",
      dialogTitlePrefix: "Gratis opzet aanvragen",
      cardVariant: "free",
      popular: false,
    },
    {
      name: "Starter Website",
      initialPrice: "€400",
      recurringPrice: "Eenmalige betaling",
      description: "Perfect voor ondernemers die al hosting hebben en alleen een moderne website willen laten bouwen.",
      features: [
        "Professionele maatwerk website (incl. responsive design)",
        "Installatie op eigen hosting (door klant geregeld of bestaande server)",
        "Basis SEO-optimalisatie (zodat je beter gevonden wordt in Google)",
        "Contactformulier + basisbeveiliging",
        "Ongelimiteerde revisieronde inbegrepen",
      ],
      buttonText: "Vraag offerte aan",
      dialogTitlePrefix: "Offerte aanvragen",
      cardVariant: "default",
      popular: false,
    },
    {
      name: "Website + Hosting",
      initialPrice: "€300",
      recurringPrice: "Daarna €50 p/m",
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
      buttonText: "Vraag offerte aan",
      dialogTitlePrefix: "Offerte aanvragen",
      cardVariant: "medium",
      popular: true,
    },
    {
      name: "Premium Website + Branding",
      initialPrice: "In overleg",
      recurringPrice: "Eenmalig of abonnementsvorm",
      description: "Perfect voor bedrijven die een volledige online uitstraling willen, inclusief huisstijl en professionele branding.",
      features: [
        "Alles uit Pakket 2 (website, hosting, onderhoud, SSL, support)",
        "Of: installatie op eigen hosting (indien gewenst)",
        "Volledige huisstijl & branding (logo, kleurenpalet, typografie)",
        "Social media set (profiel- en bannerafbeeldingen in de nieuwe stijl)",
        "Uitgebreide SEO-optimalisatie (technisch + contentadvies)",
        "Ongelimiteerde revisierondes inbegrepen",
      ],
      buttonText: "Vraag advies aan",
      dialogTitlePrefix: "Advies aanvragen",
      cardVariant: "premium",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center"> {/* 'max-w-7xl' verwijderd */}
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-4">Onze Pakketten</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Kies het pakket dat het beste past bij uw bedrijf en online ambities
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="relative">
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-zutly-medium-blue text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    POPULAIRST
                  </span>
                </div>
              )}
              <Card
                className={cn(
                  "flex flex-col p-6 shadow-lg border-b-4 transition-all duration-300 h-full",
                  pkg.cardVariant === "premium" &&
                    "bg-gradient-to-b from-zutly-dark-purple to-zutly-dark-purple/90 text-white border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl",
                  pkg.cardVariant === "medium" &&
                    "bg-gradient-to-b from-white to-zutly-tiffany-light/20 text-gray-800 border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl",
                  pkg.cardVariant === "default" &&
                    "bg-white text-gray-800 border-zutly-tiffany-dark hover:scale-[1.01] hover:shadow-lg",
                  pkg.cardVariant === "free" &&
                    "bg-gradient-to-b from-white to-zutly-tiffany-light/30 text-gray-800 border-zutly-tiffany-dark hover:scale-[1.01] hover:shadow-lg",
                  pkg.popular && "ring-2 ring-zutly-medium-blue ring-opacity-50"
                )}
              >
                <CardHeader className="p-0 mb-6">
                  <CardTitle
                    className={cn(
                      "text-2xl font-bold mb-3",
                      pkg.cardVariant === "premium" && "text-white",
                      pkg.cardVariant === "medium" && "text-zutly-dark-purple",
                      pkg.cardVariant === "default" && "text-zutly-dark-purple",
                      pkg.cardVariant === "free" && "text-zutly-dark-green"
                    )}
                  >
                    {pkg.name}
                  </CardTitle>
                  <p
                    className={cn(
                      "text-sm leading-relaxed min-h-[60px]",
                      pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                      pkg.cardVariant === "medium" && "text-gray-700",
                      pkg.cardVariant === "default" && "text-gray-600",
                      pkg.cardVariant === "free" && "text-gray-700"
                    )}
                  >
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-0">
                  <ul className="list-none space-y-3 mb-8 text-left">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <CheckCircle
                          className={cn(
                            "h-5 w-5 mr-3 flex-shrink-0 mt-0.5",
                            pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                            pkg.cardVariant === "medium" && "text-zutly-medium-blue",
                            pkg.cardVariant === "default" && "text-zutly-medium-blue",
                            pkg.cardVariant === "free" && "text-zutly-dark-green"
                          )}
                        />
                        <span 
                          className={cn(
                            "text-sm",
                            pkg.cardVariant === "premium" ? "text-white" : "text-gray-700"
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Verplaatste prijsinformatie */}
                  <div className="mb-6 mt-auto"> {/* mt-auto zorgt ervoor dat het naar de onderkant duwt */}
                    <div className="flex items-baseline justify-center">
                      <p
                        className={cn(
                          "text-3xl font-extrabold",
                          pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                          pkg.cardVariant === "medium" && "text-zutly-medium-blue",
                          pkg.cardVariant === "default" && "text-zutly-dark-purple",
                          pkg.cardVariant === "free" && "text-zutly-dark-green"
                        )}
                      >
                        {pkg.initialPrice}
                      </p>
                    </div>
                    {pkg.recurringPrice && (
                      <p
                        className={cn(
                          "text-xs mt-1 text-center",
                          pkg.cardVariant === "premium" && "text-zutly-tiffany-light/80",
                          pkg.cardVariant === "medium" && "text-gray-600",
                          pkg.cardVariant === "default" && "text-gray-500",
                          pkg.cardVariant === "free" && "text-gray-600"
                        )}
                      >
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
                          "w-full py-3 text-base font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300", // mt-auto verwijderd, nu in de parent div
                          pkg.cardVariant === "premium"
                            ? "bg-zutly-tiffany-light text-zutly-dark-purple hover:bg-zutly-tiffany-dark hover:text-white"
                            : pkg.cardVariant === "free"
                            ? "bg-zutly-dark-green text-white hover:bg-zutly-dark-purple"
                            : "bg-zutly-medium-blue text-white hover:bg-zutly-dark-purple"
                        )}
                      >
                        {pkg.buttonText}
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;