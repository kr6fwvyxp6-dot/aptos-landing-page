import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const BookingSection = () => {
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
          className={`max-w-3xl mx-auto section-fade ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative">
            {/* Decorative border */}
            <div className="absolute -inset-px bg-gradient-to-br from-border via-transparent to-border opacity-50" />
            
            {/* Main container with embedded iframe */}
            <div className="relative bg-card border border-border overflow-hidden">
              <iframe
                src="https://aptos.simplybook.it/v2/?widget-type=iframe&theme=default&theme_settings%5Btimeline_hide_unavailable%5D=1&theme_settings%5Bhide_past_days%5D=0&theme_settings%5Btimeline_show_end_time%5D=0&theme_settings%5Btimeline_modern_display%5D=as_slots&theme_settings%5Bsb_base_color%5D=%232D3436&theme_settings%5Bdisplay_item_mode%5D=block&theme_settings%5Bbooking_nav_bg_color%5D=%232D3436&theme_settings%5Bbody_bg_color%5D=%23FAFAF8&theme_settings%5Bdark_font_color%5D=%232D3436&theme_settings%5Blight_font_color%5D=%23FAFAF8&theme_settings%5Bbtn_color_1%5D=%232D3436&theme_settings%5Bsb_company_label_color%5D=%232D3436&theme_settings%5Bhide_img_mode%5D=1&theme_settings%5Bshow_sidebar%5D=1&theme_settings%5Bsb_busy%5D=%23636E72&theme_settings%5Bsb_available%5D=%23F5F5F3&timeline=modern&datepicker=top_calendar&is_rtl=false"
                width="100%"
                height="600"
                frameBorder="0"
                title="Book a session with Aptos Apartments"
                className="w-full min-h-[500px] md:min-h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
