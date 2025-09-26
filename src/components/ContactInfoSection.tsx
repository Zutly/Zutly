"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContactInfoSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-zutly-platinum mb-4">Neem direct contact op</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Heb je vragen over onze diensten of wil je meer weten over wat we voor jouw bedrijf kunnen
          betekenen? We staan altijd klaar om te helpen en denken graag mee over de beste oplossing
          voor jouw online ambities.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="flex items-center p-6 shadow-sm border-b-2 border-zutly-blue-gray bg-card">
          <Mail className="h-6 w-6 text-zutly-true-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-zutly-platinum">E-mail</h3>
            <p className="text-gray-300">info@zutly.nl</p>
          </div>
        </Card>

        <Card className="flex items-center p-6 shadow-sm border-b-2 border-zutly-blue-gray bg-card">
          <Phone className="h-6 w-6 text-zutly-true-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-zutly-platinum">Telefoon</h3>
            <p className="text-gray-300">+31 6 31035258</p>
          </div>
        </Card>

        <Card className="flex items-center p-6 shadow-sm border-b-2 border-zutly-blue-gray bg-card">
          <MapPin className="h-6 w-6 text-zutly-true-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-zutly-platinum">Locatie</h3>
            <p className="text-gray-300">Nederland</p>
          </div>
        </Card>
      </div>

      <div className="bg-zutly-blue-gray/20 p-6 rounded-lg shadow-sm border border-zutly-blue-gray">
        <h3 className="text-lg font-semibold text-zutly-platinum mb-2">Reactietijd</h3>
        <p className="text-gray-300 text-base">
          We streven ernaar om binnen 24 uur te reageren op alle berichten. Voor urgente vragen kun je ons
          direct bellen.
        </p>
      </div>
    </div>
  );
};

export default ContactInfoSection;