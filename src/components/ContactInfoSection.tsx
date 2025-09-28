"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContactInfoSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-zutly-dark-purple mb-4">Neem direct contact op</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Heb je vragen over onze diensten of wil je meer weten over wat we voor jouw bedrijf kunnen
          betekenen? We staan altijd klaar om te helpen en denken graag mee over de beste oplossing
          voor jouw online ambities.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="flex items-center p-6 shadow-md">
          <Mail className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-zutly-dark-purple">E-mail</h3>
            <p className="text-gray-700">info@zutly.nl</p>
          </div>
        </Card>

        <Card className="flex items-center p-6 shadow-md">
          <Phone className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-zutly-dark-purple">Telefoon</h3>
            <p className="text-gray-700">+31 6 31035258</p>
          </div>
        </Card>

        <Card className="flex items-center p-6 shadow-md">
          <MapPin className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-zutly-dark-purple">Locatie</h3>
            <p className="text-gray-700">Nederland</p>
          </div>
        </Card>
      </div>

      <div className="bg-zutly-tiffany-dark/20 p-6 rounded-lg shadow-sm border border-zutly-tiffany-dark">
        <h3 className="text-lg font-semibold text-zutly-dark-purple mb-2">Reactietijd</h3>
        <p className="text-gray-700 text-base">
          We streven ernaar om binnen 24 uur te reageren op alle berichten. Voor urgente vragen kun je ons
          direct bellen.
        </p>
      </div>
    </div>
  );
};

export default ContactInfoSection;