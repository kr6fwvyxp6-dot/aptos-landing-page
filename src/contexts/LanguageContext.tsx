import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.about': 'About',
    'nav.book': 'Book',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.headline': 'Master Your Path to Apartment Investing in Finland',
    'hero.subheadline': 'Book a complimentary sparring session to refine your strategy and gain the confidence to grow your portfolio.',
    'hero.cta': 'Book Your Session',
    'hero.scroll': 'Scroll to explore',
    
    // About
    'about.label': 'The Approach',
    'about.headline': 'The Aptos Approach',
    'about.description': 'At Aptos Apartments, we help emerging investors navigate the real estate market through personalized guidance and access to exclusive opportunities. Our approach combines deep market expertise with a commitment to your individual success.',
    'about.feature1.title': 'Personalized Guidance',
    'about.feature1.description': 'One-on-one strategy sessions tailored to your unique investment goals and risk profile.',
    'about.feature2.title': 'Market Insights',
    'about.feature2.description': 'Access to exclusive market analysis and emerging opportunities before they hit the mainstream.',
    'about.feature3.title': 'Portfolio Growth',
    'about.feature3.description': 'Proven frameworks to scale your apartment portfolio with confidence and clarity.',
    
    // Booking
    'booking.label': 'Get Started',
    'booking.headline': 'Schedule Your Session',
    'booking.description': 'Take the first step toward mastering apartment investing. Book your complimentary strategy session and discover how to build a portfolio that aligns with your goals.',
    'booking.widget.title': 'Booking Widget',
    'booking.widget.description': 'Your SimplyBook.me calendar will appear here. See the code comments for integration instructions.',
    
    // Footer
    'footer.label': 'Contact',
    'footer.headline': 'Get in Touch',
    'footer.copyright': 'Aptos Apartments. All rights reserved.',
  },
  fi: {
    // Header
    'nav.about': 'Tietoa',
    'nav.book': 'Varaa',
    'nav.contact': 'Yhteystiedot',
    
    // Hero
    'hero.headline': 'Hallitse polkusi asuntosijoittamiseen',
    'hero.subheadline': 'Varaa maksuton sparraussessio hiomaan strategiaasi ja saadaksesi itsevarmuutta kasvattaa portfoliotasi.',
    'hero.cta': 'Varaa aika',
    'hero.scroll': 'Vieritä tutkimaan',
    
    // About
    'about.label': 'Lähestymistapa',
    'about.headline': 'Aptos-lähestymistapa',
    'about.description': 'Aptos Asunnoilla autamme aloittelevia sijoittajia navigoimaan  asuntomarkkinan läpi henkilökohtaisen ohjauksen ja ainutlaatuisten mahdollisuuksien avulla. Lähestymistapamme yhdistää syvän markkinaosaamisen sitoutumiseen yksilölliseen menestykseesi.',
    'about.feature1.title': 'Henkilökohtainen ohjaus',
    'about.feature1.description': 'Kahdenkeskiset strategiaistunnot räätälöitynä ainutlaatuisiin sijoitustavoitteisiisi ja riskiprofiiliisi.',
    'about.feature2.title': 'Markkinanäkemykset',
    'about.feature2.description': 'Pääsy ainutlaatuisiin markkina-analyyseihin ja nouseviin mahdollisuuksiin ennen valtavirtaa.',
    'about.feature3.title': 'Portfolion kasvu',
    'about.feature3.description': 'Todistetut kehykset asuntoportfoliosi kasvattamiseen luottavaisesti ja selkeästi.',
    
    // Booking
    'booking.label': 'Aloita',
    'booking.headline': 'Varaa aikasi',
    'booking.description': 'Ota ensimmäinen askel kohti asuntosijoittamisen hallintaa. Varaa maksuton strategiaistunto ja löydä miten rakentaa portfolio, joka vastaa tavoitteitasi.',
    'booking.widget.title': 'Varausjärjestelmä',
    'booking.widget.description': 'SimplyBook.me-kalenterisi tulee näkymään tässä. Katso koodikommentit integraatio-ohjeita varten.',
    
    // Footer
    'footer.label': 'Yhteystiedot',
    'footer.headline': 'Ota yhteyttä',
    'footer.copyright': 'Aptos Apartments. Kaikki oikeudet pidätetään.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fi');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
