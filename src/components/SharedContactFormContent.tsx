"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";

const API_ENDPOINT = "/api/send_email.php";

interface SharedContactFormContentProps {
  initialMessage?: string;
  onSubmissionSuccess?: () => void;
}

const SharedContactFormContent: React.FC<SharedContactFormContentProps> = ({ initialMessage = "", onSubmissionSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Nieuw veld: Telefoonnummer
    companyName: "", // Nieuw veld: Bedrijfsnaam (optioneel)
    message: initialMessage,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update message when initialMessage prop changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      message: initialMessage,
    }));
  }, [initialMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      showError("Vul alstublieft alle verplichte velden in (Naam, E-mail, Bericht).");
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showError("Voer een geldig e-mailadres in.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSuccess("Uw bericht is succesvol verzonden!");
        setFormData({ name: "", email: "", phone: "", companyName: "", message: initialMessage }); // Clear form, but keep initial message if any
        onSubmissionSuccess?.(); // Call callback to close dialog
      } else {
        const errorData = await response.json();
        showError(errorData.message || "Er is een fout opgetreden bij het verzenden van uw bericht.");
      }
    } catch (error) {
      console.error("Fout bij het verzenden van het contactformulier:", error);
      showError("Netwerkfout of server is niet bereikbaar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-0">
      <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-zutly-dark-purple text-base font-semibold mb-1 block">Naam</Label>
            <Input
              id="name"
              type="text"
              placeholder="Uw naam"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-3 border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zutly-medium-blue focus-visible:ring-offset-2"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-zutly-dark-purple text-base font-semibold mb-1 block">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="uw@voorbeeld.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-3 border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zutly-medium-blue focus-visible:ring-offset-2"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-zutly-dark-purple text-base font-semibold mb-1 block">Telefoonnummer</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Uw telefoonnummer (optioneel)"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-3 border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zutly-medium-blue focus-visible:ring-offset-2"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="companyName" className="text-zutly-dark-purple text-base font-semibold mb-1 block">Bedrijfsnaam (optioneel)</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Uw bedrijfsnaam"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 p-3 border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zutly-medium-blue focus-visible:ring-offset-2"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-zutly-dark-purple text-base font-semibold mb-1 block">Bericht</Label>
            <Textarea
              id="message"
              placeholder="Uw bericht..."
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="mt-1 p-3 border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zutly-medium-blue focus-visible:ring-offset-2"
              disabled={isSubmitting}
              required
            />
          </div>
          <Button type="submit" className="w-full py-3 text-lg bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white font-bold rounded-full shadow-xl hover:scale-105 transition-all duration-300" disabled={isSubmitting}>
            {isSubmitting ? "Verzenden..." : "Verzenden"}
          </Button>
        </form>
    </div>
  );
};

export default SharedContactFormContent;