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
      title: 'Market & Location Reality Check',
      description: 'We assess whether your target city or area makes sense for your goals. Not every Finnish city is suitable for investment, and local dynamics matter more than national averages.',
    },
    {
      number: '02',
      title: 'Housing Company Analysis',
      description: 'We examine the taloyhtiö\'s financial statements, debt structure, upcoming renovations (like putkiremontti), and management quality. This is where many investments go wrong.',
    },
    {
      number: '03',
      title: 'Cash Flow & Downside Scenarios',
      description: 'We model realistic rental income against all costs—including vacancy, maintenance charges, loan payments, and taxes. We stress-test against interest rate changes and unexpected expenses.',
    },
    {
      number: '04',
      title: 'Liquidity & Exit Considerations',
      description: 'We evaluate how easily you could sell the property if needed. Some apartments in certain areas can take months or years to sell—this affects your risk profile significantly.',
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
              How We Evaluate Finnish Apartment Investments
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Our methodology is built on experience with the Finnish market—not generic real estate advice. Here's how we analyze potential investments:
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
