import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import BookingSection from '@/components/landing/BookingSection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
