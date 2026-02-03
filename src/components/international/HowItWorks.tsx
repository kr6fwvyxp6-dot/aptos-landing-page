import { useEffect, useRef, useState } from 'react';

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 md:py-28 bg-secondary/30"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className={`section-fade ${isVisible ? 'visible' : ''}`}>
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Understanding the System
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-foreground mb-6">
              How Apartment Investing Works in Finland
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Finland's apartment ownership structure is unique. Understanding it is essential before making any investment decisions.
            </p>

            <div className="space-y-8">
              {/* Asunto-osake */}
              <div 
                className={`p-6 bg-background border border-border/50 section-fade ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '150ms' }}
              >
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  Apartments as Shares (Asunto-osake)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  In Finland, you don't own an apartment directly—you own shares in a housing company that grant you the right to occupy a specific unit. This is called <em>asunto-osake</em>. The distinction matters for taxation, financing, and liability.
                </p>
              </div>

              {/* Housing Company */}
              <div 
                className={`p-6 bg-background border border-border/50 section-fade ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '300ms' }}
              >
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  Housing Companies (Taloyhtiö)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each building is managed by a <em>taloyhtiö</em> (housing company). This entity handles maintenance, renovations, and shared expenses. As a shareholder, you're responsible for your portion of the company's debts and decisions—which can significantly impact your returns.
                </p>
              </div>

              {/* What's Different */}
              <div 
                className={`p-6 bg-background border border-border/50 section-fade ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '450ms' }}
              >
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  Why This System Is Different
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike direct ownership in most countries, Finnish apartment investing requires analyzing both the unit and the housing company. A cheap apartment in a company with high debt or upcoming renovations can be a costly mistake. Understanding this dual structure is where most foreign investors need guidance.
                </p>
              </div>

              {/* Common Misunderstandings */}
              <div 
                className={`p-6 bg-background border border-border/50 section-fade ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '600ms' }}
              >
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  What Foreigners Usually Misunderstand
                </h3>
                <ul className="text-muted-foreground leading-relaxed space-y-2">
                  <li>• The listed price is only part of the cost—housing company loans add hidden liability</li>
                  <li>• Monthly charges (vastike) aren't just maintenance—they often include loan payments</li>
                  <li>• Upcoming renovations (like pipe replacements) can cost tens of thousands of euros</li>
                  <li>• Liquidity varies significantly by location and apartment type</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
