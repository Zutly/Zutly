"use client";

import { Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion"; // Importeer motion

const USPsSection = () => {
  const usps = [
    {
      icon: <Lightbulb className="h-10 w-10 text-zutly-medium-blue" />,
      title: "Innovatieve Oplossingen",
      description: "Wij bieden cutting-edge oplossingen die uw bedrijf vooruit helpen.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-zutly-medium-blue" />,
      title: "Snelle Implementatie",
      description: "Onze projecten worden efficiënt en snel opgeleverd, zonder concessies aan kwaliteit.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-zutly-medium-blue" />,
      title: "Betrouwbare Service",
      description: "U kunt rekenen op onze expertise en ondersteuning, elke stap van de weg.",
    },
  ];

  return (
    <section id="usps" className="py-20 bg-zutly-tiffany-light/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">Waarom Kiezen voor Zutly?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }} // Start 50px naar beneden en onzichtbaar
              whileInView={{ opacity: 1, y: 0 }} // Beweeg naar boven en wordt zichtbaar in de viewport
              viewport={{ once: true, amount: 0.5 }} // Animeer één keer wanneer 50% van het element zichtbaar is
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay
            >
              <Card className="bg-white shadow-lg border-b-4 border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="flex flex-col items-center p-6">
                  <div className="mb-4">{usp.icon}</div>
                  <CardTitle className="text-2xl font-semibold text-zutly-dark-purple">
                    {usp.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                  <p className="text-gray-700">{usp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPsSection;