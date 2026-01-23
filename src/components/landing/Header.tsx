import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-xl md:text-2xl font-medium tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Aptos Apartments
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 md:gap-10">
          <ul className="flex items-center gap-6 md:gap-10">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
              >
                {t('nav.about')}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('booking')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
              >
                {t('nav.book')}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
              >
                {t('nav.contact')}
              </button>
            </li>
          </ul>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 ml-4 border-l border-border pl-4">
            <button
              onClick={() => setLanguage('en')}
              className={`text-sm font-medium transition-colors px-2 py-1 rounded ${
                language === 'en'
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
            <span className="text-muted-foreground/50">/</span>
            <button
              onClick={() => setLanguage('fi')}
              className={`text-sm font-medium transition-colors px-2 py-1 rounded ${
                language === 'fi'
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              FI
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
