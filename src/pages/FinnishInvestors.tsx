import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import SEOHead from '@/components/SEOHead';
import FinnishBookingSection from '@/components/finnish/BookingSection';

const FinnishInvestors = () => {
  return (
    <>
      <SEOHead
        title="Asuntosijoittaminen | Ilmainen Sparraus | Aptos"
        description="Varaa maksuton sparraussessio ja keskustele asuntosijoittamisesta. Henkilökohtaista ohjausta ilman myyntipainetta."
        canonical="https://aptos.fi/fi"
        hreflang={[
          { lang: 'fi', href: 'https://aptos.fi/fi' },
          { lang: 'en', href: 'https://aptos.fi/international' },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Asuntosijoituksen sparrauspalvelu",
          "provider": {
            "@type": "Organization",
            "name": "Aptos Apartments"
          },
          "description": "Maksuton sparraussessio asuntosijoittamisesta kiinnostuneille.",
          "areaServed": "Finland"
        }}
      />
      <div className="min-h-screen bg-background">
        <Header variant="finnish" />
        <main>
          {/* Hero Section - Minimal */}
          <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <h1 
                  className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-foreground mb-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  Asuntosijoittamisen Sparraus
                </h1>

                <p 
                  className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.4s' }}
                >
                  Varaa maksuton keskusteluhetki, jossa käymme läpi tilanteesi ja tavoitteesi. Ei myyntipuhetta—vain selkeää keskustelua.
                </p>
              </div>
            </div>
          </section>

          <FinnishBookingSection />
        </main>
        <Footer variant="finnish" />
      </div>
    </>
  );
};

export default FinnishInvestors;
