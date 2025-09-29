"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react"; // MapPin is niet meer nodig
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn"; // Import the new FadeIn component

const HomePageContactForm = () => {
  return (
    <section id="contact" className="py-20 bg-zutly-tiffany-dark/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-zutly-dark-purple mb-12">
          Neem Contact Op
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeIn delay={0.1}>
            <Card className="p-8 shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl font-bold text-zutly-dark-purple">
                  Stuur ons een bericht
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="sr-only">
                      Naam
                    </Label>
                    <Input
                      id="name"
                      placeholder="Jouw naam"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="sr-only">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Jouw e-mailadres"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="sr-only">
                      Bericht
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Jouw bericht"
                      rows={6}
                      className="text-base"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white py-3 text-lg font-semibold transition-colors duration-300"
                  >
                    Verstuur Bericht
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.3}>
            <div className="space-y-8">
              <Card className="flex items-center p-6 shadow-md">
                <Mail className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-zutly-dark-purple">
                    E-mail
                  </h3>
                  <p className="text-gray-700">info@zutly.nl</p>
                </div>
              </Card>

              <Card className="flex items-center p-6 shadow-md">
                <Phone className="h-6 w-6 text-zutly-medium-blue mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-zutly-dark-purple">
                    Telefoon
                  </h3>
                  <p className="text-gray-700">+31 6 31035258</p> {/* Telefoonnummer aangepast */}
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HomePageContactForm;