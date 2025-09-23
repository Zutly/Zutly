"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ShoppingCart, Image, Settings, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const serviceItems = [
    {
      icon: <Globe className="h-8 w-8 text-zutly-medium-blue" />,
      title: "Bedrijfswebsites",
      description: "Een professionele bedrijfswebsite is jouw online visitekaartje. Wij zorgen voor een modern design dat jouw merk versterkt en klanten aanspreekt.",
      features: [
        "Responsive design",
        "SEO geoptimaliseerd",
        "Contact formulieren",
        "Content management",
      ],
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-zutly-medium-blue" />,
      title: "Webshops",
      description: "Een snelle en gebruiksvriendelijke webshop die de verkoop stimuleert. We integreren veilige betaalmethoden en zorgen dat jouw producten optimaal worden gepresenteerd.",
      features: [
        "E-commerce functionaliteit",
        "Veilige betalingen",
        "Voorraadbeheer",
        "Analytics dashboard",
      ],
    },
    {
      icon: <Image className="h-8 w-8 text-zutly-medium-blue" />,
      title: "Portfolio-sites",
      description: "Laat je werk spreken. Met een strakke en visuele portfolio-website breng je jouw projecten of creaties perfect onder de aandacht.",
      features: [
        "Visuele galerijen",
        "Project showcases",
        "Artistieke layouts",
        "Snelle laadtijden",
      ],
    },
    {
      icon: <Settings className="h-8 w-8 text-zutly-medium-blue" />,
      title: "Maatwerk oplossingen",
      description: "Heb je iets unieks in gedachten? Zutly ontwikkelt ook maatwerkoplossingen die passen bij de specifieke wensen van jouw bedrijf.",
      features: [
        "Custom functionaliteit",
        "API integraties",
        "Database oplossingen",
        "Gespecialiseerde tools",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="relative min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-br from-zutly-dark-purple/80 via-zutly-medium-blue/80 to-zutly-tiffany-dark/80 text-white overflow-hidden py-16 px-4 text-center"
          style={{ 
            backgroundImage: 'url("/zutphen-smoke.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M29.999 4.003c-14.486 0-26.203 11.717-26.203 26.203 0 14.485 11.717 26.202 26.203 26.202 14.486 0 26.203-11.717 26.203-26.202 0-14.486-11.717-26.203-26.203-26.203zm0 1.999c13.344 0 24.204 10.86 24.204 24.204 0 13.344-10.86 24.203-24.204 24.203-13.344 0-24.204-10.859-24.204-24.203 0-13.344 10.86-24.204 24.204-24.204zM12 29.999c0 9.94 8.06 18 18 18s18-8.06 18-18-8.06-18-18-18-18 8.06-18 18zm2 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zM16 29.999c0 7.732 6.268 14 14 14s14-6.268 14-14-6.268-14-14-14-14 6.268-14 14zm2 0c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zM20 29.999c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10zm2 0c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zM24 29.999c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6zm2 0c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM28 29.999c0 1.105.895 2 2 2s2-.895 2-2-.895-2-2-2-2 .895-2 2z\'/%3E%3C/g%3E%3C/svg%3E'}} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
              Onze Diensten
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-sm">
              Van bedrijfswebsites tot webshops - wij hebben de perfecte oplossing voor jouw online ambities
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceItems.map((service, index) => (
                <Card key={index} className="shadow-lg border-b-4 border-zutly-tiffany-dark p-6 flex flex-col hover:scale-[1.01] hover:shadow-xl transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 p-0 mb-4">
                    {service.icon}
                    <CardTitle className="text-2xl font-bold text-zutly-dark-purple">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-0">
                    <p className="text-gray-700 mb-4 text-base leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="list-none space-y-2 mb-6">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center text-gray-700 text-sm">
                          <CheckCircle className="h-4 w-4 text-zutly-medium-blue mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="text-zutly-medium-blue hover:underline font-semibold text-sm">
                      Meer informatie
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-zutly-tiffany-light/20 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-bold text-zutly-dark-purple mb-6">
              Welke dienst past bij jouw bedrijf?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Niet zeker welke oplossing het beste bij je past? We helpen je graag met het kiezen van de juiste aanpak.
            </p>
            <Link to="/contact">
              <Button className="bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300">
                Vraag advies aan
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;