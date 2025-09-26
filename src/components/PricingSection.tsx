"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Laptop, Cloud, Sparkles } from "lucide-react"; // Nieuwe iconen geïmporteerd
import { cn } from "@/lib/utils";
import PackageInquiryDialog from "@/components/PackageInquiryDialog";
import { Separator } from "@/components/ui/separator"; // Separator geïmporteerd
import { Badge } from "@/components/ui/badge"; // Badge geïmporteerd

const PricingSection = () => {
  const packages = [
    {
      name: "Starter Website",
      price: "€499",
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
      icon: <Laptop className="h-10 w-10 text-zutly-tiffany-light" />,
      iconBgClass: "bg-gradient-to-br from-zutly-medium-blue/30 to-zutly-tiffany-dark/30",
      popular: false,
    },
    {
      name: "Website + Hosting",
      price: "€79/maand",
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
      icon: <Cloud className="h-10 w-10 text-white" />,
      iconBgClass: "bg-gradient-to-br from-zutly-dark-purple/50 to-zutly-medium-blue/50",
      popular: true,
    },
    {
      name: "Premium Website + Branding",
      price: "Op Maat",
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
      icon: <Sparkles className="h-10 w-10 text-zutly-tiffany-light" />,
      iconBgClass: "bg-gradient-to-br from-zutly-tiffany-dark/30 to-zutly-dark-green/30",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-zinc-950 text-white"> {/* Sectie achtergrond donker gemaakt */}
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col p-0 shadow-lg rounded-xl overflow-hidden relative border transition-all duration-300",
                pkg.cardVariant === "premium" &&
                  "bg-zutly-dark-purple border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl",
                pkg.cardVariant === "medium" &&
                  "bg-zutly-medium-blue border-zutly-tiffany-light hover:scale-[1.03] hover:shadow-2xl", // Extra prominent voor populair
                pkg.cardVariant === "default" &&
                  "bg-zinc-900 border-zinc-800 hover:scale-[1.01] hover:shadow-lg"
              )}
            >
              {pkg.popular && (
                <Badge className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                  Meest populair
                </Badge>
              )}
              <div className={cn("relative h-32 flex items-center justify-center", pkg.iconBgClass)}>
                {/* Subtiel achtergrondpatroon/gradiënt */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000%2Fsvg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M29.999 4.003c-14.486 0-26.203 11.717-26.203 26.203 0 14.485 11.717 26.202 26.203 26.202 14.486 0 26.203-11.717-26.203-26.202 0-14.486-11.717-26.203-26.203-26.203zm0 1.999c13.344 0 24.204 10.86 24.204 24.204 0 13.344-10.86 24.203-24.204 24.203-13.344 0-24.204-10.859-24.204-24.203 0-13.344 10.86-24.204 24.204-24.204zM12 29.999c0 9.94 8.06 18 18 18s18-8.06 18-18-8.06-18-18-18-18 8.06-18 18zm2 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zM16 29.999c0 7.732 6.268 14 14 14s14-6.268 14-14-6.268-14-14-14-14 6.268-14 14zm2 0c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zM20 29.999c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10zm2 0c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zM24 29.999c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6zm2 0c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM28 29.999c0 1.105.895 2 2 2s2-.895 2-2-.895-2-2-2-2 .895-2 2z\'/%3E%3C/g%3E%3C/svg%3E'}} />
                <div className="relative z-10">{pkg.icon}</div>
              </div>
              <CardHeader className="p-6 pb-4 text-center">
                <CardTitle
                  className={cn(
                    "text-3xl font-bold mb-2",
                    pkg.cardVariant === "premium" && "text-white",
                    pkg.cardVariant === "medium" && "text-white",
                    pkg.cardVariant === "default" && "text-white"
                  )}
                >
                  {pkg.name}
                </CardTitle>
                <p
                  className={cn(
                    "text-base leading-relaxed",
                    pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                    pkg.cardVariant === "medium" && "text-zutly-tiffany-light",
                    pkg.cardVariant === "default" && "text-gray-400"
                  )}
                >
                  {pkg.description}
                </p>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <div className="mb-6">
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                      pkg.cardVariant === "medium" && "text-zutly-tiffany-light",
                      pkg.cardVariant === "default" && "text-gray-400"
                    )}
                  >
                    {pkg.paymentInfo}
                  </p>
                </div>
                <Separator className={cn("my-6", pkg.cardVariant === "premium" || pkg.cardVariant === "medium" ? "bg-zutly-tiffany-light/30" : "bg-zinc-700")} />
                <ul className="list-none space-y-3 mb-8 text-left">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <CheckCircle
                        className={cn(
                          "h-5 w-5 mr-3 flex-shrink-0",
                          pkg.cardVariant === "premium" || pkg.cardVariant === "medium" ? "text-zutly-tiffany-light" : "text-zutly-medium-blue"
                        )}
                      />
                      <span className={pkg.cardVariant === "premium" || pkg.cardVariant === "medium" ? "text-white" : "text-gray-300"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Separator className={cn("my-6", pkg.cardVariant === "premium" || pkg.cardVariant === "medium" ? "bg-zutly-tiffany-light/30" : "bg-zinc-700")} />
                {/* Prijsweergave direct boven de knop */}
                <p
                  className={cn(
                    "text-5xl font-extrabold mb-6",
                    pkg.cardVariant === "premium" && "text-zutly-tiffany-light",
                    pkg.cardVariant === "medium" && "text-zutly-tiffany-light",
                    pkg.cardVariant === "default" && "text-zutly-medium-blue"
                  )}
                >
                  {pkg.price}
                </p>
                <PackageInquiryDialog
                  packageName={pkg.name}
                  dialogTitlePrefix={pkg.dialogTitlePrefix}
                  trigger={
                    <Button
                      className={cn(
                        "w-full py-3 text-lg font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300",
                        pkg.cardVariant === "premium"
                          ? "bg-zutly-tiffany-light text-zutly-dark-purple hover:bg-zutly-tiffany-dark"
                          : pkg.cardVariant === "medium"
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