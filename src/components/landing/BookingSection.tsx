import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

// Declare the global SimplybookWidget for TypeScript
declare global {
  interface Window {
    widget?: {
      open: () => void;
    };
  }
}

const BookingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openBookingWidget = () => {
    // The widget is initialized globally in index.html
    if (window.widget && typeof window.widget.open === 'function') {
      window.widget.open();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="py-24 md:py-32 lg:py-40"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`max-w-4xl mx-auto text-center section-fade ${isVisible ? 'visible' : ''}`}>
          {/* Section Label */}
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
            {t('booking.label')}
          </span>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
            {t('booking.headline')}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
            {t('booking.description')}
          </p>

          {/* CTA Button */}
          <Button
            onClick={openBookingWidget}
            size="lg"
            className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base font-medium tracking-wide"
          >
            {t('hero.cta')}
          </Button>
        </div>

        {/* 
          NOTE: The booking widget is now a floating button loaded via index.html
          The button appears on the right side of the screen and opens a booking modal.
          To update the widget, edit the script in index.html (search for "SIMPLYBOOK.ME WIDGET")
        */}
      </div>
    </section>
  );
};

export default BookingSection;
