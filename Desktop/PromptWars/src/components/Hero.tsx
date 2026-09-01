import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Smartphone, QrCode, ArrowRight, Calendar, Lock } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#E5DFD5] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Understated Sentence-Case Badge (No all-caps tracked label) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2ECE1] border border-[#DCD2C0] text-[#7A2818] text-xs md:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#B83A24]"></span>
            <span>Official citizen guidance portal &bull; Census 2027</span>
          </div>

          {/* Display Heading with Serif Face */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#162A45] tracking-tight leading-[1.15] md:leading-[1.15]">
            {t.hero.title}
            <span className="block mt-2 font-serif italic font-normal text-[#B83A24]">
              {t.hero.highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('walkthrough')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md bg-[#B83A24] hover:bg-[#9C2F1C] active:scale-98 text-white font-medium text-base shadow-xs hover:shadow transition-all cursor-pointer group"
            >
              <span>{t.hero.ctaWalkthrough}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('dates')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#162A45] font-medium text-base border border-[#C5BBAA] hover:border-[#162A45] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#B83A24]" />
              <span>{t.hero.ctaDates}</span>
            </button>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 bg-[#F2ECE1] px-3 py-1 rounded border border-[#E0D5C1]">
              <ShieldCheck className="w-4 h-4 text-[#26533A]" />
              <span>{t.hero.disclaimerBadge}</span>
            </span>
          </div>
        </div>

        {/* 3 Pillar Features Cards with Stationery Aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-5xl mx-auto">
          <div className="bg-[#FAF7F2] rounded-lg p-6 border border-[#E5DFD5] hover:border-[#C5BBAA] shadow-2xs transition-all relative">
            <div className="w-10 h-10 rounded-md bg-[#F2ECE1] border border-[#E0D5C1] text-[#B83A24] flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#162A45] mb-1.5">1. Self-Enumerate Online</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Use any smartphone or web browser to record household details safely prior to enumerator visits.
            </p>
          </div>

          <div className="bg-[#FAF7F2] rounded-lg p-6 border border-[#E5DFD5] hover:border-[#C5BBAA] shadow-2xs transition-all relative">
            <div className="w-10 h-10 rounded-md bg-[#EBF1F8] border border-[#CAD8E8] text-[#162A45] flex items-center justify-center mb-4">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#162A45] mb-1.5">2. Receive QR Confirmation</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Get an official Census Reference Number (CRN) and QR slip for 1-minute doorstep verification.
            </p>
          </div>

          <div className="bg-[#FAF7F2] rounded-lg p-6 border border-[#E5DFD5] hover:border-[#C5BBAA] shadow-2xs transition-all relative">
            <div className="w-10 h-10 rounded-md bg-[#EBF4EE] border border-[#C5DEC8] text-[#26533A] flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#162A45] mb-1.5">3. Complete Statutory Privacy</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Section 15 of Census Act 1948 strictly prohibits sharing individual information with any agency or court.
            </p>
          </div>
        </div>

        {/* Gazette Style Stats Ribbon */}
        <div className="mt-12 bg-[#162A45] text-white rounded-lg p-6 md:p-8 shadow-sm max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-[#233854]">
          <div className="space-y-1">
            <p className="font-mono text-2xl md:text-3xl font-bold text-[#E6C280]">{t.hero.stat1}</p>
            <p className="text-xs text-stone-300 font-normal">{t.hero.stat1Sub}</p>
          </div>
          <div className="space-y-1 border-l border-[#233854] pl-4 md:pl-0">
            <p className="font-mono text-2xl md:text-3xl font-bold text-[#FAF7F2]">{t.hero.stat2}</p>
            <p className="text-xs text-stone-300 font-normal">{t.hero.stat2Sub}</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#233854] pt-4 md:pt-0">
            <p className="font-mono text-2xl md:text-3xl font-bold text-[#E6C280]">{t.hero.stat3}</p>
            <p className="text-xs text-stone-300 font-normal">{t.hero.stat3Sub}</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 border-l border-[#233854] pt-4 md:pt-0 pl-4 md:pl-0">
            <p className="font-mono text-2xl md:text-3xl font-bold text-[#FAF7F2]">{t.hero.stat4}</p>
            <p className="text-xs text-stone-300 font-normal">{t.hero.stat4Sub}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
