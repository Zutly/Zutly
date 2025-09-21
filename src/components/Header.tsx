"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Diensten", href: "#usps" },
    { name: "Over ons", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/zutly-logo.png" 
            alt="Zutly Logo" 
            className="h-8 w-auto" 
          />
          <span className={`text-lg font-bold transition-colors duration-300 ${
            isScrolled ? "text-zutly-dark-purple" : "text-white"
          }`}>
            Zutly
          </span>
        </Link>

        {isMobile ? (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-zutly-dark-purple" : "text-white"}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-full py-2 text-lg font-medium text-zutly-dark-purple hover:text-zutly-medium-blue transition-colors duration-200"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? "text-zutly-dark-purple hover:text-zutly-medium-blue" 
                    : "text-white hover:text-zutly-tiffany-light"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact">
              <Button className="bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white text-sm">
                Start Project
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;