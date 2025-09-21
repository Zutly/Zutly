"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const IndexPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zutly-dark text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center py-20 md:py-32 overflow-hidden">
        {/* Subtle background pattern/overlay for modern feel */}
        <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M29.999 4.003c-14.486 0-26.203 11.717-26.203 26.203 0 14.485 11.717 26.202 26.203 26.202 14.486 0 26.203-11.717 26.203-26.202 0-14.486-11.717-26.203-26.203-26.203zm0 1.999c13.344 0 24.204 10.86 24.204 24.204 0 13.344-10.86 24.203-24.204 24.203-13.344 0-24.204-10.859-24.204-24.203 0-13.344 10.86-24.204 24.204-24.204zM12 29.999c0 9.94 8.06 18 18 18s18-8.06 18-18-8.06-18-18-18-18 8.06-18 18zm2 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zM16 29.999c0 7.732 6.268 14 14 14s14-6.268 14-14-6.268-14-14-14-14 6.268-14 14zm2 0c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zM20 29.999c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10zm2 0c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zM24 29.999c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6zm2 0c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM28 29.999c0 1.105.895 2 2 2s2-.895 2-2-.895-2-2-2-2 .895-2 2z\'/%3E%3C/g%3E%3C/svg%3E'}} />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
            Welkom bij <span className="text-zutly-tiffany-light">Zutly</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-zutly-gray-light">
            Jouw partner in digitale transformatie. Wij bouwen innovatieve weboplossingen die jouw bedrijf laten groeien.
          </p>
          <Button className="bg-zutly-tiffany-light hover:bg-zutly-tiffany-dark text-zutly-dark font-semibold py-3 px-8 rounded-full text-lg transition-colors duration-300">
            Ontdek Meer
          </Button>
        </div>
      </section>

      {/* USPs Section */}
      <section id="diensten" className="py-20 bg-zutly-dark-alt">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-zutly-tiffany-light">Onze Kernwaarden</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-zutly-dark rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-zutly-tiffany-light">Innovatie</h3>
              <p className="text-zutly-gray-light">
                We omarmen de nieuwste technologieën om vooruitstrevende oplossingen te leveren die jouw bedrijf een voorsprong geven.
              </p>
            </div>
            <div className="p-8 bg-zutly-dark rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-zutly-tiffany-light">Klantgerichtheid</h3>
              <p className="text-zutly-gray-light">
                Jouw succes is onze prioriteit. We luisteren aandachtig en bouwen oplossingen die perfect aansluiten bij jouw behoeften.
              </p>
            </div>
            <div className="p-8 bg-zutly-dark rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-zutly-tiffany-light">Kwaliteit</h3>
              <p className="text-zutly-gray-light">
                Van concept tot implementatie, we streven naar de hoogste kwaliteitsstandaarden in alles wat we doen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-zutly-dark">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-12 text-zutly-tiffany-light">Neem Contact Op</h2>
          <form className="space-y-6 text-left">
            <div>
              <label htmlFor="name" className="block text-zutly-gray-light text-sm font-medium mb-2">Naam</label>
              <Input
                type="text"
                id="name"
                placeholder="Jouw naam"
                className="w-full p-3 bg-zutly-dark-alt border border-zutly-gray-dark rounded-md text-white focus:ring-2 focus:ring-zutly-tiffany-light focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-zutly-gray-light text-sm font-medium mb-2">E-mail</label>
              <Input
                type="email"
                id="email"
                placeholder="Jouw e-mailadres"
                className="w-full p-3 bg-zutly-dark-alt border border-zutly-gray-dark rounded-md text-white focus:ring-2 focus:ring-zutly-tiffany-light focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-zutly-gray-light text-sm font-medium mb-2">Bericht</label>
              <Textarea
                id="message"
                placeholder="Jouw bericht"
                rows={5}
                className="w-full p-3 bg-zutly-dark-alt border border-zutly-gray-dark rounded-md text-white focus:ring-2 focus:ring-zutly-tiffany-light focus:border-transparent"
              />
            </div>
            <Button type="submit" className="w-full bg-zutly-tiffany-light hover:bg-zutly-tiffany-dark text-zutly-dark font-semibold py-3 px-8 rounded-md text-lg transition-colors duration-300">
              Verstuur Bericht
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-zutly-dark-alt">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-zutly-tiffany-light">Veelgestelde Vragen</h2>
          <div className="space-y-6 text-left">
            {/* FAQ Item 1 */}
            <div className="bg-zutly-dark p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-zutly-tiffany-light">Wat voor diensten biedt Zutly aan?</h3>
              <p className="text-zutly-gray-light">
                Zutly specialiseert zich in het ontwikkelen van op maat gemaakte webapplicaties, websites en digitale oplossingen die bedrijven helpen groeien en innoveren.
              </p>
            </div>
            {/* FAQ Item 2 */}
            <div className="bg-zutly-dark p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-zutly-tiffany-light">Hoe werkt het proces van een project?</h3>
              <p className="text-zutly-gray-light">
                Ons proces begint met een grondige analyse van jouw behoeften, gevolgd door conceptontwikkeling, design, ontwikkeling, testen en uiteindelijke implementatie. We houden je gedurende het hele traject betrokken.
              </p>
            </div>
            {/* FAQ Item 3 */}
            <div className="bg-zutly-dark p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-zutly-tiffany-light">Wat maakt Zutly uniek?</h3>
              <p className="text-zutly-gray-light">
                Onze unieke combinatie van innovatieve technologieën, klantgerichte aanpak en een onwrikbare toewijding aan kwaliteit onderscheidt ons. We bouwen niet alleen websites, we bouwen partnerschappen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndexPage;