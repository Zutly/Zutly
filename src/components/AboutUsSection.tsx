"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion"; // Importeer motion

interface Owner {
  name: string;
  title: string;
  description: string;
  image: string;
  fallback: string;
}

interface AboutUsSectionProps {
  sectionTitle: string;
  sectionDescription: string;
  owners: Owner[];
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ sectionTitle, sectionDescription, owners }) => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">{sectionTitle}</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-16">
          {sectionDescription}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {owners.map((owner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }} // Start 50px naar beneden en onzichtbaar
              whileInView={{ opacity: 1, y: 0 }} // Beweeg naar boven en wordt zichtbaar in de viewport
              viewport={{ once: true, amount: 0.5 }} // Animeer één keer wanneer 50% van het element zichtbaar is
              transition={{ duration: 0.8, delay: index * 0.2 }} // Aangepaste duur en staggered delay
            >
              <Card className="shadow-lg border-b-4 border-zutly-tiffany-dark flex flex-col items-center p-8 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                <Avatar className="h-40 w-40 mb-6 border-4 border-zutly-medium-blue shadow-md">
                  <AvatarImage src={owner.image} alt={owner.name} />
                  <AvatarFallback className="bg-zutly-medium-blue text-white text-2xl font-bold">{owner.fallback}</AvatarFallback>
                </Avatar>
                <CardHeader className="p-0 mb-3 text-center">
                  <CardTitle className="text-2xl font-bold text-zutly-dark-purple">{owner.name}</CardTitle>
                  <CardDescription className="text-zutly-medium-blue text-lg">{owner.title}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 text-gray-700 text-center text-base">
                  {owner.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;