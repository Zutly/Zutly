"use client";

import React from "react";
import SharedContactFormContent from "@/components/SharedContactFormContent";

const HomePageContactForm = () => {
  return (
    <section id="contact" className="py-20 bg-zutly-tiffany-dark/10">
      <div className="container mx-auto px-4 max-w-2xl">
        <SharedContactFormContent />
      </div>
    </section>
  );
};

export default HomePageContactForm;