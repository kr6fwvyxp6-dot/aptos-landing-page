import { useEffect, useRef, useState } from 'react';

const BookingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const calInitialized = useRef(false);

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

  useEffect(() => {
    if (calInitialized.current) return;
    calInitialized.current = true;

    // Cal.com embed script - exactly as provided
    (function (C: Window & { Cal?: any }, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window as any, "https://app.cal.eu/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    Cal("init", "apartment-investing-in-finland-free-call", { origin: "https://app.cal.eu" });
    Cal.ns["apartment-investing-in-finland-free-call"]("inline", {
      elementOrSelector: "#my-cal-inline-apartment-investing-in-finland-free-call",
      config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
      calLink: "aptos/apartment-investing-in-finland-free-call",
    });
    Cal.ns["apartment-investing-in-finland-free-call"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
  }, []);

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
            A 30-minute call to discuss your situation, goals and constraints. You'll walk away with either a first-step roadmap, or confirmation that Finnish apartment investing may not be the right fit for you at this stage.
          </p>

          <p className="text-sm text-muted-foreground mb-12 max-w-2xl mx-auto">
            This is not a sales call. There's no obligation, and we'll be honest about whether we can help.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            id="my-cal-inline-apartment-investing-in-finland-free-call"
            style={{ width: '100%', height: '700px', overflow: 'scroll' }} 
            className="bg-background rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
