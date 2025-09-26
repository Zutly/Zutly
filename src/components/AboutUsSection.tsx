"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <h2 className="text-4xl font-bold text-zutly-medium-blue mb-16">{sectionTitle}</h2> {/* text-zutly-dark-purple naar text-zutly-medium-blue */}
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16"> {/* text-gray-700 naar text-muted-foreground */}
          {sectionDescription}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {owners.map((owner, index) => (
            <Card key={index} className="bg-card shadow-lg border-b-4 border-zutly-tiffany-dark flex flex-col items-center p-8 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"> {/* bg-card toegevoegd */}
              <Avatar className="h-40 w-40 mb-6 border-4 border-zutly-medium-blue shadow-md">
                <AvatarImage src={owner.image} alt={owner.name} />
                <AvatarFallback className="bg-zutly-medium-blue text-white text-2xl font-bold">{owner.fallback}</AvatarFallback>
              </Avatar>
              <CardHeader className="p-0 mb-3 text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{owner.name}</CardTitle> {/* text-zutly-dark-purple naar text-foreground */}
                <CardDescription className="text-zutly-medium-blue text-lg">{owner.title}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground text-center text-base"> {/* text-gray-700 naar text-muted-foreground */}
                {owner.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;