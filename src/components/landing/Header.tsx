import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
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
            setIsMobileMenuOpen(false);
          }}
          className="font-serif text-xl md:text-2xl font-medium tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Aptos Apartments
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <ul className="flex items-center gap-6 lg:gap-10">
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

          {/* Desktop Language Switcher */}
          <div className="flex items-center gap-1 ml-4 border-l border-border pl-4">
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
            <span className="text-muted-foreground/50">/</span>
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
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-muted-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {t('nav.book')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground mr-2">Language:</span>
              <button
                onClick={() => setLanguage('fi')}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                  language === 'fi'
                    ? 'text-foreground bg-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Suomi
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                  language === 'en'
                    ? 'text-foreground bg-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
