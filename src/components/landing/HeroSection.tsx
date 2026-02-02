import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract Geometric Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
        
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 right-10 md:right-20 w-64 h-64 md:w-96 md:h-96 border border-border/40 rotate-45 opacity-60" />
        <div className="absolute top-32 right-20 md:right-32 w-48 h-48 md:w-72 md:h-72 border border-border/30 rotate-45 opacity-40" />
        <div className="absolute bottom-20 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 border border-border/20 rotate-12 opacity-30" />
        
        {/* Subtle lines */}
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        <div className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-border to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight tracking-tight text-foreground mb-6 md:mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {t('hero.headline')}
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            {t('hero.subheadline')}
          </p>

          {/* CTA Button */}
          <div 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base font-medium tracking-wide"
            >
              {t('hero.cta')}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
