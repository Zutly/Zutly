"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  description: string;
  link: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "De Kracht van een Goed Webdesign",
    description: "Ontdek waarom een doordacht webdesign essentieel is voor het succes van uw online aanwezigheid en hoe het uw merk kan versterken.",
    link: "#", // Vervang met echte blogpost link
    image: "/placeholder.svg", // Vervang met relevante afbeelding
  },
  {
    title: "SEO Tips voor Lokale Bedrijven",
    description: "Verbeter uw zichtbaarheid in lokale zoekresultaten met deze praktische SEO-strategieën en trek meer klanten aan in uw regio.",
    link: "#", // Vervang met echte blogpost link
    image: "/placeholder.svg", // Vervang met relevante afbeelding
  },
  {
    title: "Waarom TypeScript Uw Volgende Project Moet Zijn",
    description: "Leer hoe TypeScript de ontwikkeling van robuuste en schaalbare webapplicaties verbetert en fouten vermindert.",
    link: "#", // Vervang met echte blogpost link
    image: "/placeholder.svg", // Vervang met relevante afbeelding
  },
];

const LatestBlogPostsSection = () => {
  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-4">Laatste Nieuws & Insights</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Blijf op de hoogte van de nieuwste trends en ontwikkelingen in webontwikkeling.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-white shadow-lg border-b-4 border-zutly-tiffany-dark flex flex-col hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
              <CardHeader className="p-6 pb-0 text-left">
                <CardTitle className="text-xl font-bold text-zutly-dark-purple mb-2">{post.title}</CardTitle>
                <CardDescription className="text-gray-700 text-sm leading-relaxed min-h-[70px]">{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4 mt-auto">
                <Link to={post.link} className="inline-flex items-center text-zutly-medium-blue hover:text-zutly-dark-purple font-semibold transition-colors duration-200">
                  Lees meer <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16">
          <Link to="#" className="inline-block"> {/* Link naar een algemene blogpagina */}
            <Button className="bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300">
              Bekijk alle artikelen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPostsSection;