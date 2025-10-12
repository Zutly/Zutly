"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import { Globe } from "@/components/Globe";
import SharedContactFormContent from "@/components/SharedContactFormContent"; // Import SharedContactFormContent
import ContactInfoSection from "@/components/ContactInfoSection"; // Import ContactInfoSection

const HomePageContactForm = () => {
  return (
    <section id="contact" className="py-20 bg-zutly-tiffany-dark/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-zutly-dark-purple mb-12">
          Neem Contact Op
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <FadeIn delay={0.1}>
            <Card className="shadow-xl p-6">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-zutly-dark-purple">
                  Stuur ons een bericht
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 text-lg">
                  Heeft u vragen of wilt u meer weten? Vul het onderstaande formulier in.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <SharedContactFormContent /> {/* Gebruik de gedeelde contactformulier component */}
              </CardContent>
            </Card>
          </FadeIn>

          {/* Contact Info & Globe */}
          <FadeIn delay={0.3}>
            <div className="space-y-8">
              <ContactInfoSection /> {/* Gebruik de gedeelde contactinformatie component */}
              {/* Globe component hieronder geplaatst */}
              <Globe
                config={{
                  markers: [{ location: [52.1435, 6.1937], size: 0.08 }], // Zutphen coordinates
                }}
                className="mt-8" // Voeg wat marge toe bovenaan
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HomePageContactForm;