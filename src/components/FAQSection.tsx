"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Wat voor diensten biedt Zutly aan?",
      answer: "Zutly is gespecialiseerd in het ontwikkelen van moderne webapplicaties, van concept tot implementatie, met een focus op gebruiksvriendelijkheid en schaalbaarheid.",
    },
    {
      question: "Hoe lang duurt een gemiddeld project?",
      answer: "De duur van een project varieert sterk afhankelijk van de complexiteit en de specifieke eisen. Na een initiële consultatie kunnen we een gedetailleerde tijdslijn opstellen.",
    },
    {
      question: "Werken jullie ook met bestaande systemen?",
      answer: "Ja, we kunnen integreren met bestaande systemen en platforms om zo een naadloze overgang en functionaliteit te garanderen.",
    },
    {
      question: "Wat zijn de kosten van jullie diensten?",
      answer: "De kosten zijn afhankelijk van de omvang en specificaties van het project. Neem contact met ons op voor een vrijblijvende offerte op maat.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-zutly-tiffany-light/20"> {/* Changed background here */}
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-zutly-dark-purple mb-12">Veelgestelde Vragen</h2>
        <Accordion type="single" collapsible className="w-full text-left">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-zutly-tiffany-dark">
              <AccordionTrigger className="text-lg font-semibold text-zutly-dark-purple hover:text-zutly-medium-blue">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;