"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "USPs", href: "#usps" },
    { name: "Over ons", href: "#about" },
    { name: "Diensten", href: "/diensten" }, // New link for Services
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if the href is an internal anchor link or a full path
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1); // Remove the '#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href === "/") {
      // Special handling for home link if it's not an anchor on the same page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // For other full paths like /diensten, let react-router-dom handle it
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
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      to={link.href} // Use Link component for navigation
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
                to={link.href} // Use Link component for navigation
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