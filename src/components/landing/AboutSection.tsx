import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
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

  const features = [
    {
      title: t('about.feature1.title'),
      description: t('about.feature1.description'),
    },
    {
      title: t('about.feature2.title'),
      description: t('about.feature2.description'),
    },
    {
      title: t('about.feature3.title'),
      description: t('about.feature3.description'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 lg:py-40 bg-secondary/30"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Text Content */}
          <div className={`section-fade ${isVisible ? 'visible' : ''}`}>
            {/* Section Label */}
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              {t('about.label')}
            </span>

            {/* Heading */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
              {t('about.headline')}
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t('about.description')}
            </p>

            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
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

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
