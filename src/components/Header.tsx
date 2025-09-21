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
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20" 
        : "bg-transparent"
    }`}>
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            isScrolled ? "bg-zutly-dark-purple/10" : "bg-white/10"
          }`}>
            <img 
              src="/zutly-logo.png" 
              alt="Zutly Logo" 
              className="h-8 w-auto" 
            />
          </div>
          <span className={`text-xl font-bold transition-colors duration-300 ${
            isScrolled ? "text-zutly-dark-purple" : "text-white"
          }`}>
            Zutly
          </span>
        </Link>

        {isMobile ? (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-zutly-dark-purple" : "text-white"}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b">
                  <img src="/zutly-logo.png" alt="Zutly Logo" className="h-8 w-auto" />
                  <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex-1 p-6 space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-lg font-medium text-zutly-dark-purple hover:text-zutly-medium-blue transition-colors duration-200 py-2"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-zutly-medium-blue after:transition-all after:duration-300 hover:after:w-full ${
                  isScrolled 
                    ? "text-zutly-dark-purple hover:text-zutly-medium-blue" 
                    : "text-white hover:text-zutly-tiffany-light"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact">
              <Button className="bg-zutly-medium-blue hover:bg-zutly-dark-purple text-white">
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