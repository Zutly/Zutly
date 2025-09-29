"use client";

import Header from '@/components/Header';
import USPsSection from '@/components/USPsSection';
import AboutUsSection from '@/components/AboutUsSection';
import WaveSeparator from '@/components/WaveSeparator';
import HomePageContactForm from '@/components/HomePageContactForm';
import Footer from '@/components/Footer';
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Typewriter } from "@/components/ui/typewriter-text";

const Index = () => {
  const homePageOwners = [
    {
      name: "Jesse Roessink",
      title: "Oprichter & Lead Developer",
      description: "Met jarenlange ervaring in webontwikkeling en een passie voor innovatie, stuurt Jesse de technische visie van Zutly aan.",
      image: "/jesse-roessink.jpg",
      fallback: "JR",
    },
    {
      name: "Bas Jansen",
      title: "Oprichter & Strategisch Adviseur",
      description: "Als strategisch denker en expert in digitale transformatie, helpt Bas klanten hun doelen te bereiken met op maat gemaakte oplossingen.",
      image: "/bas-jansen.jpg",
      fallback: "BJ",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section 
          className="relative min-h-[85vh] flex items-center justify-center text-white overflow-hidden py-16"
          style={{ 
            backgroundImage: 'url("/zutphen-smoke.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-zutly-dark-purple/65 via-zutly-medium-blue/65 to-zutly-tiffany-dark/65 z-0"></div>
          {/* Subtle background pattern/overlay for modern feel */}
          <div className="absolute inset-0 z-10 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000%2Fsvg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M29.999 4.003c-14.486 0-26.203 11.717-26.203 26.203 0 14.485 11.717 26.202 26.203 26.202 14.486 0 26.203-11.717-26.203-26.202 0-14.486-11.717-26.203-26.203-26.203zm0 1.999c13.344 0 24.204 10.86 24.204 24.204 0 13.344-10.86 24.203-24.204 24.203-13.344 0-24.204-10.859-24.204-24.203 0-13.344 10.86-24.204 24.204-24.204zM12 29.999c0 9.94 8.06 18 18 18s18-8.06 18-18-8.06-18-18-18-18 8.06-18 18zm2 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zM16 29.999c0 7.732 6.268 14 14 14s14-6.268 14-14-6.268-14-14-14-14 6.268-14 14zm2 0c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zM20 29.999c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10zm2 0c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zM24 29.999c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6zm2 0c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM28 29.999c0 1.105.895 2 2 2s2-.895 2-2-.895-2-2-2-2 .895-2 2z\'/%3E%3C/g%3E%3C/svg%3E'}} />
          
          {/* Aurora Background */}
          <AuroraBackground className="absolute inset-0 z-20">
            <div className="relative z-20 text-center px-4">
              <div className="mb-4">
                <Typewriter
                  text={[
                    "Welkom bij Zutly",
                    "Uw partner voor webontwikkeling",
                    "Uw partner voor branding & huisstijl",
                    "Uw partner voor gratis advies",
                  ]}
                  speed={90}
                  loop={true}
                  delay={1500}
                  deleteSpeed={50}
                  className="text-5xl md:text-6xl text-white drop-shadow-md font-extrabold leading-tight"
                />
              </div>
            </div>
          </AuroraBackground>
        </section>
        <USPsSection />
        <section id="about" className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl font-bold text-zutly-dark-purple mb-6">Over Ons</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-16">
              Bij Zutly geloven we in de kracht van innovatie en persoonlijke service. Maak kennis met de gezichten achter ons bedrijf.
            </p>
          </div>
          <AboutUsSection
            owners={homePageOwners}
            enablePulseEffect={true} 
          />
        </section>
        <WaveSeparator topBgColorVar="--background" bottomBgClass="bg-zutly-tiffany-dark/10" />
        <HomePageContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;