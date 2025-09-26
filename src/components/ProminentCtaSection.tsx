"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProminentCtaSection = () => {
  return (
    <section className="py-20 bg-zutly-dark-purple text-white text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Klaar om uw digitale ambities te realiseren?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
          Neem vandaag nog contact met ons op voor een vrijblijvend gesprek en ontdek hoe Zutly uw bedrijf online kan laten groeien.
        </p>
        <Link to="/contact">
          <Button className="bg-zutly-tiffany-light hover:bg-zutly-tiffany-dark text-zutly-dark-purple hover:text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300">
            Vraag een gratis consult aan
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProminentCtaSection;