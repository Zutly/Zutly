import React from "react";
import Header from "@/components/Header";
import USPsSection from "@/components/USPsSection";
import AboutUsSection from "@/components/AboutUsSection";
import WaveSeparator from "@/components/WaveSeparator";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Original Design */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-zutly-dark-purple via-zutly-medium-blue to-zutly-tiffany-dark text-white overflow-hidden">
          {/* Original background pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--zutly-medium-blue)_0%,_transparent_70%)] opacity-20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--zutly-tiffany-light)_0%,_transparent_70%)] opacity-15 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_center,_var(--zutly-tiffany-dark)_0%,_transparent_70%)] opacity-20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="mb-8">
              <img src="/zutly-logo.png" alt="Zutly Logo" className="h-16 w-auto mx-auto mb-6" />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Innovatieve <span className="text-zutly-tiffany-light">Digitale</span><br />Oplossingen
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/90 leading-relaxed">
                Wij transformeren uw visie in hoogwaardige webapplicaties met focus op 
                gebruikservaring, prestaties en schaalbaarheid.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contact" className="group">
                <button className="px-12 py-4 bg-white text-zutly-dark-purple font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group-hover:bg-zutly-tiffany-light">
                  Start Jouw Project →
                </button>
              </a>
              <a href="#usps" className="group">
                <button className="px-12 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white transition-all duration-300 hover:bg-white/10">
                  Ontdek Onze Diensten
                </button>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <USPsSection />

        {/* About Us Section */}
        <AboutUsSection />

        {/* Wave Separator */}
        <WaveSeparator topBgColorVar="--background" bottomBgClass="bg-zutly-tiffany-dark/5" />

        {/* Contact Form */}
        <ContactForm />

        {/* FAQ Section */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;