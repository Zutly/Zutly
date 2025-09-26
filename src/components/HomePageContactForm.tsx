"use client";

import React from "react";
import SharedContactFormContent from "@/components/SharedContactFormContent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

const HomePageContactForm = () => {
  return (
    <section id="contact" className="py-20 bg-background"> {/* bg-zutly-tiffany-dark/10 naar bg-background */}
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-xl border-b-4 border-zutly-medium-blue p-6 bg-card"> {/* bg-card toegevoegd */}
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-foreground">Neem Contact Op</CardTitle> {/* text-zutly-dark-purple naar text-foreground */}
            <CardDescription className="text-muted-foreground mt-2 text-lg"> {/* text-gray-600 naar text-muted-foreground */}
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