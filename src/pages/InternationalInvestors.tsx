import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import SEOHead from '@/components/SEOHead';
import HowItWorks from '@/components/international/HowItWorks';
import Methodology from '@/components/international/Methodology';
import Pitfalls from '@/components/international/Pitfalls';
import BookingSection from '@/components/international/BookingSection';
import FAQ from '@/components/international/FAQ';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const InternationalInvestors = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead
        title="International Investors | Apartment Investing in Finland | Aptos"
        description="Learn how apartment investing works in Finland as a foreigner. Understand asunto-osake, housing companies (taloyhtiö), and get independent guidance for your investment."
        canonical="https://aptos.fi/international"
        hreflang={[
          { lang: 'en', href: 'https://aptos.fi/international' },
          { lang: 'fi', href: 'https://aptos.fi/fi' },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Apartment Investment Advisory for International Investors",
          "provider": {
            "@type": "Organization",
            "name": "Aptos Apartments"
          },
          "description": "Independent guidance for international investors looking to invest in Finnish apartments. Covers asunto-osake system, housing company analysis, and investment strategy.",
          "areaServed": "Finland"
        }}
      />
      <div className="min-h-screen bg-background">
        <Header variant="international" />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
              <div className="absolute top-20 right-10 md:right-20 w-48 h-48 md:w-72 md:h-72 border border-border/30 rotate-45 opacity-40" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="max-w-3xl">
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block opacity-0 animate-fade-in">
                  For International Investors
                </span>
                
                <h1 
                  className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-foreground mb-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  Investing in Finnish Apartments as a Foreigner
                </h1>

                <p 
                  className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8 opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.4s' }}
                >
                  Finland's apartment market works differently from most countries. We help international investors understand the system, evaluate opportunities, and make informed decisions—without the sales pressure.
                </p>

                <div 
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.6s' }}
                >
                  <Button
                    onClick={scrollToBooking}
                    size="lg"
                    className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium tracking-wide"
                  >
                    Book a Free Sparring Session
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <HowItWorks />
          <Methodology />
          <Pitfalls />
          <BookingSection />
          <FAQ />
        </main>
        <Footer variant="international" />
      </div>
    </>
  );
};

export default InternationalInvestors;
