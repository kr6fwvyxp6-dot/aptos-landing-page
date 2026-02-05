import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  variant?: 'landing' | 'finnish';
}

const Header = ({ variant = 'landing' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            {variant === 'landing' && (
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
                  <Link
                    to="/fi"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    Suomalaisille
                  </Link>
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
              <>
                <li>
                  <Link
                    to="/"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    In English
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('booking')}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
                  >
                    Varaa aika
                  </button>
                </li>
              </>
            )}
          </ul>
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
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              {variant === 'landing' && (
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
                    <Link
                      to="/fi"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Suomalaisille
                    </Link>
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
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      In English
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('booking')}
                      className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Varaa aika
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
