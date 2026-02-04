import { useEffect, useRef, useState } from 'react';

const FinnishBookingSection = () => {
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
    Cal("init", "ilmainen-asuntosijoitus-sparraus", { origin: "https://app.cal.eu" });
    Cal.ns["ilmainen-asuntosijoitus-sparraus"]("inline", {
      elementOrSelector: "#my-cal-inline-ilmainen-asuntosijoitus-sparraus",
      config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
      calLink: "aptos/ilmainen-asuntosijoitus-sparraus",
    });
    Cal.ns["ilmainen-asuntosijoitus-sparraus"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`max-w-4xl mx-auto text-center section-fade ${isVisible ? 'visible' : ''}`}>
          <h2 className="font-serif text-2xl md:text-3xl font-medium leading-tight text-foreground mb-4">
            Varaa Maksuton Sparraus
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Valitse sopiva aika ja kerro lyhyesti tilanteestasi. Käymme läpi tavoitteesi ja mietimme yhdessä seuraavat askeleet.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            id="my-cal-inline-ilmainen-asuntosijoitus-sparraus"
            style={{ width: '100%', height: '700px', overflow: 'scroll' }} 
            className="bg-background rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FinnishBookingSection;
