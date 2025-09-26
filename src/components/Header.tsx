"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import ThemeToggle

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", type: "link" },
    { name: "Diensten", href: "/diensten", type: "link" },
    { name: "Over ons", href: "/over-ons", type: "link" },
    { name: "Contact", href: "/contact", type: "link" }, // Toegevoegd: Contact als aparte link
    { name: "Offerte aanvragen", href: "/diensten", type: "button" }, // Aangepast: linkt nu naar /diensten
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && location.pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href === "/" && location.pathname !== "/") {
      return;
    } else if (href === "/" && location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
                {navItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    {item.type === "link" ? (
                      <Link
                        to={item.href}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                        className="text-lg font-medium hover:text-zutly-true-blue transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Link to={item.href}>
                        <Button
                          className="w-full bg-zutly-true-blue hover:bg-zutly-black text-white font-bold py-3 text-lg rounded-full shadow-md transition-all duration-300"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    )}
                  </SheetClose>
                ))}
                <div className="mt-4">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              item.type === "link" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-base font-medium text-foreground transition-colors hover:text-zutly-true-blue relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-zutly-true-blue after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ) : (
                <Link key={item.name} to={item.href}>
                  <Button
                    className="bg-zutly-true-blue hover:bg-zutly-black text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300"
                  >
                    {item.name}
                  </Button>
                </Link>
              )
            ))}
            <ThemeToggle /> {/* Add ThemeToggle here */}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;