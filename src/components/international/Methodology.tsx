import { useEffect, useRef, useState } from 'react';

const Methodology = () => {
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

  const steps = [
    {
      number: '01',
      title: 'Understanding the Finnish Apartment System',
      description: 'Most mistakes happen before an apartment is even considered. We help you understand how apartment ownership, housing companies (taloyhtiö), shared debt, maintenance charges, and renovations really work in Finland, and how these differ from property investing in other countries.',
    },
    {
      number: '02',
      title: 'Matching Strategy, Location, and Reality',
      description: 'Once the system is clear, we look at your goals and constraints and match them against real market conditions. Not every Finnish city, neighborhood, or apartment type works as an investment, and national averages often hide local risks.',
    },
    {
      number: '03',
      title: 'Identifying and Evaluating Actual Apartments',
      description: 'We then focus on concrete opportunities. This can mean apartments from our own inventory, properties available through our local network, or listings you’ve found on the public market. We analyse these cases in detail, including housing company finances, debt, renovations, cash flow, and downside scenarios, to determine whether they make sense as investments.',
    },
    {
      number: '04',
      title: 'Risk, Liquidity, and Exit Awareness',
      description: 'Finally, we look beyond the purchase. We assess rental demand, liquidity, and exit scenarios, because some apartments are easy to sell while others can take months or years. Understanding this upfront is essential for managing risk, especially for investors operating from abroad.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="methodology"
      className="py-20 md:py-28"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className={`section-fade ${isVisible ? 'visible' : ''}`}>
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Our Approach
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-foreground mb-6">
              How We Help International Investors Invest in Finnish Apartments
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              We work with international investors who want to understand how apartment investing in Finland actually works, before committing capital. Our approach combines guidance, local market insight, and access to real opportunities, so decisions are made with clarity rather than assumptions.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex gap-6 section-fade ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="flex-shrink-0">
                    <span className="font-serif text-2xl font-medium text-muted-foreground/50">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
