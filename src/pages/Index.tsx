"use client";

import Header from "@/components/Header";
import USPsSection from "@/components/USPsSection";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-zutly-dark-purple to-zutly-medium-blue text-white">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Welkom bij <span className="text-zutly-tiffany-light">Zutly</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Uw partner voor innovatieve weboplossingen en digitale transformatie.
            </p>
            <a href="#contact">
              <button className="mt-8 px-8 py-3 bg-zutly-tiffany-dark text-zutly-dark-purple font-semibold rounded-full shadow-lg hover:bg-zutly-tiffany-light transition-colors duration-300">
                Start Uw Project
              </button>
            </a>
          </div>
        </section>
        <USPsSection />
        <ContactForm />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;