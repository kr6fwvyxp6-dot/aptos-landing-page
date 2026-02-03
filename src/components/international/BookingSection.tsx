import { useEffect, useRef, useState } from 'react';

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
  const calContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const initializedRef = useRef(false);

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

  // Load Cal.com embed script
  useEffect(() => {
    if (window.Cal?.loaded) {
      setScriptReady(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://app.cal.eu/embed/embed.js"]');
    
    if (existingScript) {
      const checkLoaded = () => {
        if (window.Cal?.loaded) {
          setScriptReady(true);
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

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
          script.onload = () => {
            setScriptReady(true);
          };
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

    const fallbackTimeout = setTimeout(() => {
      if (window.Cal?.loaded) {
        setScriptReady(true);
      }
    }, 2000);

    return () => clearTimeout(fallbackTimeout);
  }, []);

  // Initialize English calendar
  useEffect(() => {
    if (!scriptReady || initializedRef.current || !calContainerRef.current) return;

    calContainerRef.current.innerHTML = '';
    
    window.Cal?.("init", "apartment-investing-in-finland-free-call", { origin: "https://app.cal.eu" });
    window.Cal?.ns?.["apartment-investing-in-finland-free-call"]?.("inline", {
      elementOrSelector: calContainerRef.current,
      config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
      calLink: "aptos/apartment-investing-in-finland-free-call",
    });
    window.Cal?.ns?.["apartment-investing-in-finland-free-call"]?.("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    
    initializedRef.current = true;
  }, [scriptReady]);

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="py-20 md:py-28"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`max-w-4xl mx-auto text-center section-fade ${isVisible ? 'visible' : ''}`}>
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
            Get Started
          </span>

          <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-foreground mb-6">
            Book a Free Sparring Session
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
            A 30-minute call to discuss your situation and goals. You'll walk away with either a first-step roadmap—or confirmation that Finnish apartment investing may not be the right fit for you.
          </p>

          <p className="text-sm text-muted-foreground mb-12 max-w-2xl mx-auto">
            This is not a sales call. There's no obligation, and we'll be honest about whether we can help.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={calContainerRef}
            style={{ width: '100%', height: '700px', overflow: 'auto' }} 
            className="bg-background rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
