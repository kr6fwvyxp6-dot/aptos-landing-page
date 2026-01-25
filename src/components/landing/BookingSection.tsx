import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    SimplybookWidget: any;
  }
}

const BookingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
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

  useEffect(() => {
    // Initialize the SimplyBook widget when the script is loaded
    const initWidget = () => {
      if (window.SimplybookWidget && widgetContainerRef.current && !widgetLoaded) {
        new window.SimplybookWidget({
          widget_type: "iframe",
          url: "https://aptos.simplybook.it",
          theme: "default",
          theme_settings: {
            timeline_hide_unavailable: "1",
            hide_past_days: "0",
            timeline_show_end_time: "0",
            timeline_modern_display: "as_slots",
            sb_base_color: "#dd3649",
            display_item_mode: "block",
            booking_nav_bg_color: "#dd3649",
            body_bg_color: "#f2f2f2",
            sb_review_image: "",
            dark_font_color: "#474747",
            light_font_color: "#f5fcff",
            btn_color_1: "#dd3649",
            sb_company_label_color: "#552f34",
            hide_img_mode: "1",
            show_sidebar: "1",
            sb_busy: "#c7b3b3",
            sb_available: "#d6ebff"
          },
          timeline: "modern",
          datepicker: "top_calendar",
          is_rtl: false,
          app_config: {
            clear_session: 0,
            allow_switch_to_ada: 0,
            predefined: []
          }
        });
        setWidgetLoaded(true);
      }
    };

    // Check if script is already loaded
    if (window.SimplybookWidget) {
      initWidget();
    } else {
      // Wait for the script to load
      const checkInterval = setInterval(() => {
        if (window.SimplybookWidget) {
          clearInterval(checkInterval);
          initWidget();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);

      return () => clearInterval(checkInterval);
    }
  }, [widgetLoaded]);

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
            {t('booking.label')}
          </span>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
            {t('booking.headline')}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
            {t('booking.description')}
          </p>
        </div>

        {/* Booking Widget Container */}
        <div 
          ref={widgetContainerRef}
          className={`max-w-3xl mx-auto section-fade ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative">
            {/* Decorative border */}
            <div className="absolute -inset-px bg-gradient-to-br from-border via-transparent to-border opacity-50" />
            
            {/* Main container - SimplyBook widget will render here */}
            <div className="relative bg-card border border-border p-4 md:p-8 min-h-[600px]">
              {/* The SimplyBook widget automatically creates an iframe and appends it to the body */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
