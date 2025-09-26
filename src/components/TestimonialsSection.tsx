"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image?: string;
  fallback: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Zutly heeft onze verwachtingen overtroffen met een prachtige en functionele website. De communicatie was helder en het resultaat is verbluffend!",
    name: "Anna van Dijk",
    title: "Eigenaar, Bloemenwinkel 'De Groene Duim'",
    image: "/placeholder.svg", // Vervang met echte afbeelding indien beschikbaar
    fallback: "AD",
  },
  {
    quote: "De expertise van Zutly in webontwikkeling is ongeëvenaard. Ze hebben ons geholpen onze digitale aanwezigheid aanzienlijk te verbeteren.",
    name: "Mark de Vries",
    title: "CEO, Tech Solutions B.V.",
    image: "/placeholder.svg", // Vervang met echte afbeelding indien beschikbaar
    fallback: "MV",
  },
  {
    quote: "Vanaf het eerste contact tot de lancering was Zutly een professionele en betrouwbare partner. Ze leveren echt maatwerk.",
    name: "Sophie Bakker",
    title: "Marketing Manager, Food & Co.",
    image: "/placeholder.svg", // Vervang met echte afbeelding indien beschikbaar
    fallback: "SB",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-zutly-tiffany-dark/10">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-4">Wat Onze Klanten Zeggen</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Lees de ervaringen van bedrijven die met Zutly hebben samengewerkt.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg border-b-4 border-zutly-medium-blue flex flex-col items-center p-6 text-center hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 flex flex-col items-center">
                <Quote className="h-10 w-10 text-zutly-medium-blue mb-4" />
                <p className="text-gray-700 italic mb-6 text-base leading-relaxed">"{testimonial.quote}"</p>
                <Avatar className="h-20 w-20 mb-4 border-2 border-zutly-tiffany-dark shadow-sm">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-zutly-tiffany-dark text-white text-lg font-bold">{testimonial.fallback}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-zutly-dark-purple">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;