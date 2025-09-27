"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import PackageInquiryDialog from "@/components/PackageInquiryDialog";
import { motion } from "framer-motion"; // Importeer motion

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
      popular: false,
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
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }} // Start 50px naar beneden en onzichtbaar
              whileInView={{ opacity: 1, y: 0 }} // Beweeg naar boven en wordt zichtbaar in de viewport
              viewport={{ once: true, amount: 0.8 }} // Animeer één keer wanneer 80% van het element zichtbaar is (aangepast)
              transition={{ duration: 0.8, delay: index * 0.2 }} // Aangepaste duur en staggered delay
            >
              <Card
                className={cn(
                  "flex flex-col p-6 shadow-lg transition-all duration-300 h-full rounded-2xl",
                  pkg.cardVariant === "premium" &&
                    "bg-gradient-to-b from-zutly-dark-purple/70 to-zutly-dark-purple/90 text-white hover:scale-[1.02] hover:shadow-xl",
                  pkg.cardVariant === "medium" &&
                    "bg-gradient-to-b from-zutly-dark-purple/20 to-zutly-dark-purple/40 text-gray-800 hover:scale-[1.02] hover:shadow-xl",
                  pkg.cardVariant === "default" &&
                    "bg-gradient-to-b from-zutly-medium-blue/20 to-zutly-medium-blue/40 text-gray-800 hover:scale-[1.01] hover:shadow-lg",
                  pkg.cardVariant === "free" &&
                    "bg-gradient-to-b from-zutly-tiffany-light/20 to-zutly-tiffany-light/40 text-gray-800 hover:scale-[1.01] hover:shadow-lg",
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
                      pkg.cardVariant === "premium" ? "text-zutly-tiffany-light" : "text-gray-700"
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
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline justify-center">
                      <p
                        className={cn(
                          "text-3xl font-extrabold",
                          pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                          pkg.cardVariant === "medium" && "text-zutly-medium-blue",
                          pkg.cardVariant === "default" && "text-zutly-medium-blue",
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
                          pkg.cardVariant === "premium" ? "text-zutly-tiffany-light/80" : "text-gray-600"
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
                          "w-full py-3 text-base font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300",
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;