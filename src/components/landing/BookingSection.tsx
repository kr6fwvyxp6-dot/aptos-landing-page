import { useEffect, useRef, useState } from 'react';

const BookingSection = () => {
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
      id="booking"
      className="py-24 md:py-32 lg:py-40"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`max-w-4xl mx-auto text-center section-fade ${isVisible ? 'visible' : ''}`}>
          {/* Section Label */}
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
            Get Started
          </span>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
            Schedule Your Session
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
            Take the first step toward mastering apartment investing. Book your complimentary strategy session and discover how to build a portfolio that aligns with your goals.
          </p>
        </div>

        {/* Booking Widget Container */}
        <div 
          className={`max-w-3xl mx-auto section-fade ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative">
            {/* Decorative border */}
            <div className="absolute -inset-px bg-gradient-to-br from-border via-transparent to-border opacity-50" />
            
            {/* Main container */}
            <div className="relative bg-card border border-border p-8 md:p-12">
              {/* 
                SimplyBook.me Integration Instructions:
                
                To embed your SimplyBook.me booking widget, replace the placeholder below with one of these options:
                
                Option 1 - iframe embed:
                <iframe 
                  src="https://YOUR-COMPANY.simplybook.me/v2/" 
                  width="100%" 
                  height="600" 
                  frameBorder="0"
                  title="Book a session with Aptos Apartments"
                />
                
                Option 2 - Script embed (recommended for better styling):
                Add to your index.html before </body>:
                <script src="//widget.simplybook.me/v2/widget/widget.js"></script>
                
                Then use the widget configuration from your SimplyBook.me dashboard.
                
                For responsive height, consider using:
                - Mobile: 500-600px
                - Tablet: 600-700px  
                - Desktop: 600-800px
              */}
              
              {/* Placeholder UI */}
              <div className="min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-2 border-muted-foreground/30 mb-6 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-muted-foreground/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-3">
                  Booking Widget
                </h3>
                
                <p className="text-muted-foreground max-w-md">
                  Your SimplyBook.me calendar will appear here. See the code comments for integration instructions.
                </p>
                
                {/* Visual separator */}
                <div className="w-16 h-px bg-border mt-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
