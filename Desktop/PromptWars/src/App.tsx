import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhasesExplainer } from './components/PhasesExplainer';
import { StateDatesFinder } from './components/StateDatesFinder';
import { WalkthroughWizard } from './components/WalkthroughWizard';
import { TrustPrivacyCenter } from './components/TrustPrivacyCenter';
import { DataInsights } from './components/DataInsights';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'phases', 'dates', 'walkthrough', 'privacy', 'insights', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-orange-500/20 selection:text-orange-900">
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />
      
      <main className="flex-grow">
        <Hero onNavigate={scrollToSection} />
        <PhasesExplainer />
        <StateDatesFinder />
        <WalkthroughWizard />
        <TrustPrivacyCenter />
        <DataInsights />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
