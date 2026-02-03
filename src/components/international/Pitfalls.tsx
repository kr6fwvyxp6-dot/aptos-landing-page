import { useEffect, useRef, useState } from 'react';

const Pitfalls = () => {
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

  const pitfalls = [
    {
      title: 'Misunderstanding Housing Company Loans',
      description: 'Many buyers focus on the listed apartment price while overlooking the housing company debt attached to their shares. This debt can add 30-50% to your actual investment—and you\'re liable for paying it off through monthly charges.',
    },
    {
      title: 'Overestimating Liquidity',
      description: 'Not all Finnish apartments sell quickly. Studio apartments in small cities can sit on the market for months. Understanding local demand patterns is critical before committing capital.',
    },
    {
      title: 'Underestimating Management Realities',
      description: 'Managing a Finnish rental property from abroad requires understanding local tenant rights, language barriers with housing companies, and practical matters like key handovers and maintenance coordination.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pitfalls"
      className="py-20 md:py-28 bg-secondary/30"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className={`section-fade ${isVisible ? 'visible' : ''}`}>
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Common Mistakes
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-foreground mb-6">
              Pitfalls for International Buyers
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              These are the issues we see most often with foreign investors attempting to navigate the Finnish market independently:
            </p>

            <div className="space-y-6">
              {pitfalls.map((pitfall, index) => (
                <div
                  key={index}
                  className={`p-6 bg-background border border-border/50 section-fade ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                    {pitfall.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pitfall.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pitfalls;
