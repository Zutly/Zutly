"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation(); // Get current location

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Diensten", href: "/diensten" },
    { name: "Over ons", href: "/over-ons" }, // Changed to full path
    { name: "Contact", href: "/contact" },   // Changed to full path
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only prevent default and scroll if it's an anchor link AND we are on the home page
    if (href.startsWith("#") && location.pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(1); // Remove the '#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href === "/" && location.pathname !== "/") {
      // If clicking home from another page, let Link handle it
      return;
    } else if (href === "/" && location.pathname === "/") {
      // If clicking home on home page, scroll to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // For other full paths like /diensten, /over-ons, /contact, let react-router-dom's Link component handle it
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={(e) => handleSmoothScroll(e, "/")}>
          <img src="/zutly-logo.png" alt="Zutly Logo" className="h-9 w-auto" />
          <span className="sr-only">Zutly Home</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigatiemenu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigeer door de verschillende secties van de website.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      to={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-lg font-medium hover:text-zutly-medium-blue transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-base font-medium text-foreground transition-colors hover:text-zutly-medium-blue relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-zutly-medium-blue after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;