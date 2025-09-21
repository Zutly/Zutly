"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showError("Vul alstublieft alle velden in.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showError("Voer een geldig e-mailadres in.");
      return;
    }

    console.log("Contact form submitted:", formData);
    showSuccess("Uw bericht is succesvol verzonden!");
    setFormData({ name: "", email: "", message: "" }); // Clear form
  };

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg border-zutly-medium-blue">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-zutly-dark-purple">Neem Contact Op</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Heeft u vragen of wilt u meer weten? Vul het onderstaande formulier in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-zutly-dark-purple">Naam</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Uw naam"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-zutly-dark-purple">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="uw@voorbeeld.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-zutly-dark-purple">Bericht</Label>
                <Textarea
                  id="message"
                  placeholder="Uw bericht..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white">
                Verzenden
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;