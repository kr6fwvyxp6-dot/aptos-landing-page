import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
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

  const faqs = [
    {
      question: 'Can foreigners buy apartments in Finland?',
      answer: 'Yes. Foreigners can freely buy apartments (shares in housing companies) in Finland. For detached houses or land, non-EU/EEA buyers may need a permit in certain cases, but this rarely affects typical city apartment investments.',
    },
    {
      question: 'Do I need to live in Finland to invest in Finnish apartments?',
      answer: 'No. You can own and rent out Finnish apartments while living abroad. However, you\'ll need to handle tax obligations in Finland (rental income is taxed), and practical management becomes more complex. Having a local contact or property manager is often necessary.',
    },
    {
      question: 'How do housing company loans affect my investment risk and returns?',
      answer: 'Housing company loans (yhtiölaina) are debts attached to the building, allocated to each apartment as shares. When you buy, you take on responsibility for your portion. These loans affect your monthly charges (vastike) and can significantly reduce—or sometimes improve—your returns depending on interest rates and how the loan was structured. Always analyze the full debt picture, not just the purchase price.',
    },
    {
      question: 'How does the buying process work for non-residents?',
      answer: 'The process involves: (1) Finding a property and making an offer, (2) Signing a preliminary agreement with a deposit, (3) Arranging financing if needed (Finnish banks are cautious with non-residents), (4) Signing the final deed of sale, (5) Registering with the housing company\'s shareholder list. The process typically takes 1–3 months, depending on financing, seller readiness, and banking arrangements. Having a Finnish bank account simplifies transactions.',
    },
    {
      question: 'What is a putkiremontti and why does it matter?',
      answer: 'Putkiremontti is a major pipe renovation that most Finnish apartment buildings undergo every 40-50 years. It typically costs €500-1000 per square meter and takes several months. If a building hasn\'t had one and is approaching that age, you should factor this into your investment calculations—it can add €20,000-50,000 to your costs.',
    },
    {
      question: 'How liquid is the Finnish apartment market?',
      answer: 'Liquidity varies dramatically by location. Apartments in the major cities typically sell within 1-3 months if priced right. In smaller cities or less desirable areas, selling can take 6-12 months or longer. Studio apartments in declining population areas can be particularly difficult to sell. Always research local market conditions before investing.',
    },
    {
      question: 'What taxes apply to foreign apartment investors?',
      answer: 'Rental income is taxed at 30% (or 34% above €30,000). Capital gains from selling are taxed similarly. Most investment-related expenses (such as maintenance charges, interest, and management costs) are deductible, which materially affects net taxation.',
    },
    {
      question: 'Can I get a mortgage from a Finnish bank as a foreigner?',
      answer: 'It\'s possible but challenging. Finnish banks typically require substantial down payments (often 50% or more for non-residents), proof of stable income, and sometimes existing assets in Finland. EU citizens may find it easier than non-EU residents. Many international investors purchase with cash or arrange financing in their home country. In practice, financing availability often determines whether an investment is feasible for non-residents.',
    },
  ];

  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    // Add FAQ structured data
    const existingScript = document.querySelector('script[data-faq-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-schema', 'true');
    script.textContent = JSON.stringify(faqStructuredData);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.querySelector('script[data-faq-schema]');
      if (cleanup) cleanup.remove();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-20 md:py-28 bg-secondary/30"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className={`section-fade ${isVisible ? 'visible' : ''}`}>
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Common Questions
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-foreground mb-10">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`bg-background border border-border/50 px-6 section-fade ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <AccordionTrigger className="text-left font-serif text-lg font-medium text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
