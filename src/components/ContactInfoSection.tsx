"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContactInfoSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-foreground mb-4">Neem direct contact op</h2> {/* text-zutly-dark-purple naar text-foreground */}
        <p className="text-lg text-muted-foreground leading-relaxed"> {/* text-gray-700 naar text-muted-foreground */}
          Heb je vragen over onze diensten of wil je meer weten over wat we voor jouw bedrijf kunnen
          betekenen? We staan altijd klaar om te helpen en denken graag mee over de beste oplossing
          voor jouw online ambities.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="flex items-center p-6 shadow-sm border-b-2 border-zutly-tiffany-dark bg-card"> {/* bg-card toegevoegd */}
          <Mail className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">E-mail</h3> {/* text-zutly-dark-purple naar text-foreground */}
            <p className="text-muted-foreground">info@zutly.nl</p> {/* text-gray-700 naar text-muted-foreground */}
          </div>
        </Card>

        <Card className="flex items-center p-6 shadow-sm border-b-2 border-zutly-tiffany-dark bg-card"> {/* bg-card toegevoegd */}
          <Phone className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Telefoon</h3> {/* text-zutly-dark-purple naar text-foreground */}
            <p className="text-muted-foreground">+31 6 31035258</p> {/* text-gray-700 naar text-muted-foreground */}
          </div>
        </Card>

        <Card className="flex items-center p-6 shadow-sm border-b-2 border-zutly-tiffany-dark bg-card"> {/* bg-card toegevoegd */}
          <MapPin className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Locatie</h3> {/* text-zutly-dark-purple naar text-foreground */}
            <p className="text-muted-foreground">Nederland</p> {/* text-gray-700 naar text-muted-foreground */}
          </div>
        </Card>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm border border-zutly-tiffany-dark"> {/* bg-zutly-tiffany-dark/20 naar bg-card */}
        <h3 className="text-lg font-semibold text-foreground mb-2">Reactietijd</h3> {/* text-zutly-dark-purple naar text-foreground */}
        <p className="text-muted-foreground text-base"> {/* text-gray-700 naar text-muted-foreground */}
          We streven ernaar om binnen 24 uur te reageren op alle berichten. Voor urgente vragen kun je ons
          direct bellen.
        </p>
      </div>
    </div>
  );
};

export default ContactInfoSection;