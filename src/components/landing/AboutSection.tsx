import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
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

  const features = [
    {
      title: 'Personalized Guidance',
      description: 'One-on-one strategy sessions tailored to your unique investment goals and risk profile.',
    },
    {
      title: 'Market Insights',
      description: 'Access to exclusive market analysis and emerging opportunities before they hit the mainstream.',
    },
    {
      title: 'Portfolio Growth',
      description: 'Proven frameworks to scale your apartment portfolio with confidence and clarity.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 lg:py-40 bg-secondary/30"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className={`section-fade ${isVisible ? 'visible' : ''}`}>
            {/* Section Label */}
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              The Approach
            </span>

            {/* Heading */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
              The Aptos Approach
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              At Aptos Apartments, we help emerging investors navigate the multifamily real estate market through personalized guidance and access to exclusive opportunities. Our approach combines deep market expertise with a commitment to your individual success.
            </p>

            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group p-6 bg-background border border-border/50 transition-all duration-300 hover:border-border hover:shadow-sm section-fade ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <h3 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Abstract Visual */}
          <div 
            className={`relative section-fade ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="aspect-[4/5] relative">
              {/* Background shape */}
              <div className="absolute inset-4 bg-card border border-border" />
              
              {/* Overlapping geometric elements */}
              <div className="absolute top-0 left-0 w-3/4 h-3/4 border-2 border-foreground/10" />
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-muted to-secondary" />
              
              {/* Decorative lines */}
              <div className="absolute top-1/4 left-1/4 right-1/4 h-px bg-border" />
              <div className="absolute top-1/4 bottom-1/4 left-1/4 w-px bg-border" />
              
              {/* Central accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-foreground/20 rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
