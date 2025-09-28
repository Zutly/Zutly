"use client";

const Footer = () => {
  return (
    <footer className="bg-zutly-dark-purple text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} Zutly. Alle rechten voorbehouden.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-white hover:text-zutly-tiffany-light transition-colors duration-200">Privacybeleid</a>
          <span className="text-white">|</span>
          <a href="#" className="text-white hover:text-zutly-tiffany-light transition-colors duration-200">Algemene Voorwaarden</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;