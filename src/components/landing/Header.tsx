import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  variant?: 'home' | 'international' | 'finnish';
}

const Header = ({ variant = 'home' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const logoText = variant === 'finnish' ? 'Aptos Asunnot' : 'Aptos Apartments';
  const homeLink = variant === 'finnish' ? '/fi' : '/';

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
        <Link
          to={homeLink}
          onClick={() => setIsMobileMenuOpen(false)}
          className="font-serif text-xl md:text-2xl font-medium tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          {logoText}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <ul className="flex items-center gap-6 lg:gap-10">
            {variant === 'home' && (
              <>
                <li>
                  <Link
                    to="/international"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    International Investors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/fi"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    Suomalaisille
                  </Link>
                </li>
              </>
            )}
            {variant === 'international' && (
              <>
                <li>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('methodology')}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    Our Approach
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('booking')}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    Book
                  </button>
                </li>
              </>
            )}
            {variant === 'finnish' && (
              <li>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                >
                  Varaa aika
                </button>
              </li>
            )}
          </ul>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 ml-4 border-l border-border pl-4">
            <Link
              to="/fi"
              className={`text-sm font-medium transition-colors px-2 py-1 rounded ${
                variant === 'finnish'
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              FI
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <Link
              to={variant === 'home' ? '/' : '/international'}
              className={`text-sm font-medium transition-colors px-2 py-1 rounded ${
                variant !== 'finnish'
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </Link>
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
              {variant === 'home' && (
                <>
                  <li>
                    <Link
                      to="/international"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      International Investors
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/fi"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Suomalaisille sijoittajille
                    </Link>
                  </li>
                </>
              )}
              {variant === 'international' && (
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection('how-it-works')}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('methodology')}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Our Approach
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('faq')}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      FAQ
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('booking')}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Book Session
                    </button>
                  </li>
                </>
              )}
              {variant === 'finnish' && (
                <li>
                  <button
                    onClick={() => scrollToSection('booking')}
                    className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Varaa aika
                  </button>
                </li>
              )}
            </ul>

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground mr-2">Language:</span>
              <Link
                to="/fi"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                  variant === 'finnish'
                    ? 'text-foreground bg-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Suomi
              </Link>
              <Link
                to={variant === 'home' ? '/' : '/international'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                  variant !== 'finnish'
                    ? 'text-foreground bg-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                English
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
