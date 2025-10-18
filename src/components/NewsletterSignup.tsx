"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !/\S+@\S+\.\S+/.test(trimmed)) {
      showError("Voer een geldig e-mailadres in.");
      return;
    }

    setIsSubmitting(true);

    // In development is er geen PHP, dus simuleren we succes.
    if (import.meta.env.DEV) {
      setTimeout(() => {
        showSuccess("Bedankt! (dev-simulatie) Je staat op de lijst.");
        setEmail("");
        setIsSubmitting(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch("/api/newsletter.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const text = await res.text();
      let json: { ok?: boolean; message?: string } | null = null;

      try {
        json = JSON.parse(text);
      } catch {
        // Val terug op generieke fout als er geen JSON terugkomt
        showError("Onverwachte serverrespons. Probeer later opnieuw.");
        setIsSubmitting(false);
        return;
      }

      if (res.ok && json?.ok) {
        showSuccess(json.message || "Bedankt! Je bent ingeschreven.");
        setEmail("");
      } else {
        showError(json?.message || "Inschrijven mislukt. Probeer later opnieuw.");
      }
    } catch (err) {
      showError("Netwerkfout. Controleer je verbinding en probeer opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-16 bg-zutly-tiffany-light/20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-zutly-dark-purple">
              Schrijf je in voor onze nieuwsbrief
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Ontvang updates, tips en nieuws rechtstreeks in je inbox.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="newsletter-email" className="sr-only">
                  E-mailadres
                </Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12 text-base"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-6 bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white font-semibold rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Bezig..." : "Inschrijven"}
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
              Je kunt je op elk moment uitschrijven. We respecteren je privacy.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSignup;