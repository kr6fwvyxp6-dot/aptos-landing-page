import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Declare Cal for TypeScript
declare global {
  interface Window {
    Cal?: {
      (action: string, ...args: unknown[]): void;
      ns?: Record<string, (action: string, config: unknown) => void>;
      loaded?: boolean;
      q?: unknown[];
    };
  }
}

const BookingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

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

  // Load Cal.com embed script and initialize the appropriate calendar
  useEffect(() => {
    // Load the Cal.com script
    const loadCalScript = () => {
      (function (C: Window, A: string, L: string) {
        const p = function (a: { q: unknown[] }, ar: unknown) { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function () {
          const cal = C.Cal!;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.head.appendChild(d.createElement("script"));
            script.src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api as unknown as { q: unknown[] }, arguments); } as unknown as { q: unknown[]; (action: string, config: unknown): void };
            const namespace = ar[1] as string;
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns![namespace] = cal.ns![namespace] || api;
              p(cal.ns![namespace] as unknown as { q: unknown[] }, ar);
              p(cal as unknown as { q: unknown[] }, ["initNamespace", namespace]);
            } else {
              p(cal as unknown as { q: unknown[] }, ar);
            }
            return;
          }
          p(cal as unknown as { q: unknown[] }, ar);
        };
      })(window, "https://app.cal.eu/embed/embed.js", "init");
    };

    loadCalScript();

    // Initialize the appropriate calendar based on language
    if (language === 'fi') {
      window.Cal?.("init", "ilmainen-asuntosijoitus-sparraus", { origin: "https://app.cal.eu" });
      window.Cal?.ns?.["ilmainen-asuntosijoitus-sparraus"]?.("inline", {
        elementOrSelector: "#my-cal-inline-ilmainen-asuntosijoitus-sparraus",
        config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
        calLink: "aptos/ilmainen-asuntosijoitus-sparraus",
      });
      window.Cal?.ns?.["ilmainen-asuntosijoitus-sparraus"]?.("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    } else {
      window.Cal?.("init", "apartment-investing-in-finland-free-call", { origin: "https://app.cal.eu" });
      window.Cal?.ns?.["apartment-investing-in-finland-free-call"]?.("inline", {
        elementOrSelector: "#my-cal-inline-apartment-investing-in-finland-free-call",
        config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
        calLink: "aptos/apartment-investing-in-finland-free-call",
      });
      window.Cal?.ns?.["apartment-investing-in-finland-free-call"]?.("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    }
  }, [language]);

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
            {language === 'fi' ? 'Aloita' : 'Get Started'}
          </span>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
            {language === 'fi' ? 'Varaa aikasi' : 'Schedule Your Session'}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
            {language === 'fi' 
              ? 'Ota ensimmäinen askel kohti asuntosijoittamisen hallintaa. Varaa maksuton strategiaistunto ja löydä miten rakentaa portfolio, joka vastaa tavoitteitasi.'
              : 'Take the first step toward mastering apartment investing. Book your complimentary strategy session and discover how to build a portfolio that aligns with your goals.'}
          </p>
        </div>

        {/* Cal.com Inline Calendar */}
        <div className="max-w-4xl mx-auto">
          {language === 'fi' ? (
            <div 
              style={{ width: '100%', height: '700px', overflow: 'auto' }} 
              id="my-cal-inline-ilmainen-asuntosijoitus-sparraus"
              className="bg-background rounded-lg"
            />
          ) : (
            <div 
              style={{ width: '100%', height: '700px', overflow: 'auto' }} 
              id="my-cal-inline-apartment-investing-in-finland-free-call"
              className="bg-background rounded-lg"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
