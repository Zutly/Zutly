"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface Owner {
  name: string;
  title: string;
  description: string;
  image: string;
  fallback: string;
}

interface AboutUsSectionProps {
  sectionTitle: string;
  sectionDescription: string; // This prop will no longer be rendered directly in this component
  owners: Owner[];
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  sectionTitle,
  sectionDescription, // Still passed, but not used for rendering in this component
  owners,
}) => {
  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-16">{sectionTitle}</h2>
        {/* The sectionDescription paragraph has been removed from here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {owners.map((owner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-white shadow-lg border-b-4 border-zutly-medium-blue hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center p-6 text-center">
                <Avatar className="h-24 w-24 mb-6 border-4 border-zutly-tiffany-dark shadow-md">
                  <AvatarImage src={owner.image} alt={owner.name} />
                  <AvatarFallback className="bg-zutly-medium-blue text-white text-3xl font-semibold">
                    {owner.fallback}
                  </AvatarFallback>
                </Avatar>
                <CardContent className="p-0">
                  <h3 className="text-2xl font-semibold text-zutly-dark-purple mb-2">
                    {owner.name}
                  </h3>
                  <p className="text-zutly-medium-blue text-lg font-medium mb-4">
                    {owner.title}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {owner.description}
                  </p>
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