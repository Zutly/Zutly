"use client";

import React from "react";
import SharedContactFormContent from "@/components/SharedContactFormContent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

const HomePageContactForm = () => {
  return (
    <section id="contact" className="py-20 bg-zutly-blue-gray/10">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-xl border-b-4 border-zutly-true-blue p-6"> {/* Keep this Card wrapper */}
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-zutly-platinum">Neem Contact Op</CardTitle>
            <CardDescription className="text-gray-300 mt-2 text-lg">
              Heeft u vragen of wilt u meer weten? Vul het onderstaande formulier in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SharedContactFormContent />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HomePageContactForm;