"use client";

import React from "react";
import { Link } from "react-router-dom"; // Voor navigatielinks

const Header = () => {
  return (
    <header className="bg-zutly-dark-purple text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/zutly-logo.png" alt="Zutly Logo" className="h-8" />
          <span className="text-2xl font-bold text-zutly-tiffany-light">Zutly</span>
        </Link>
        <nav className="space-x-4 hidden md:flex"> {/* Verberg op kleine schermen, toon op medium en groter */}
          <a href="#diensten" className="hover:text-zutly-tiffany-light transition-colors duration-200">Diensten</a>
          <a href="#about" className="hover:text-zutly-tiffany-light transition-colors duration-200">Over Ons</a>
          <a href="#contact" className="hover:text-zutly-tiffany-light transition-colors duration-200">Contact</a>
          <a href="#faq" className="hover:text-zutly-tiffany-light transition-colors duration-200">FAQ</a>
        </nav>
        {/* Hier kan eventueel een mobiele menuknop worden toegevoegd */}
      </div>
    </header>
  );
};

export default Header;