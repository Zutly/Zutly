"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zutly-dark-purple text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Zutly. Alle rechten voorbehouden.
        </p>
        <div className="mt-4">
          {/* Optioneel: Social media links of andere footer content */}
          <a href="#" className="text-white hover:text-zutly-tiffany-light mx-2">Privacybeleid</a>
          <span className="text-white">|</span>
          <a href="#" className="text-white hover:text-zutly-tiffany-light mx-2">Algemene Voorwaarden</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;