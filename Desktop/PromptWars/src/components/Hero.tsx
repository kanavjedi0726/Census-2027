import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Smartphone, QrCode, ArrowRight, Calendar, Sparkles, Lock } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-slate-50 border-b border-slate-200 py-12 md:py-20">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-300 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-emerald-300 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 border border-orange-200 text-orange-900 text-xs md:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-tight">
            {t.hero.title}
            <span className="block mt-2 bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent">
              {t.hero.highlight}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('walkthrough')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-bold text-base md:text-lg shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer group"
            >
              <span>{t.hero.ctaWalkthrough}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('dates')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base md:text-lg border-2 border-slate-300 hover:border-slate-400 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-orange-600" />
              <span>{t.hero.ctaDates}</span>
            </button>
          </div>

          <div className="pt-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {t.hero.disclaimerBadge}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 md:mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">1. Self-Enumerate in 15 Mins</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Use any smartphone or web browser to record household and member details with zero queues.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">2. Get Instant QR Token</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upon completion, receive an official Census Reference Number (CRN) & QR code for quick doorstep verification.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">3. 100% Legally Protected</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Section 15 of Census Act 1948 guarantees absolute privacy. No court, police, or tax agency can access individual data.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-slate-800">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-orange-400 font-mono">{t.hero.stat1}</p>
            <p className="text-xs md:text-sm text-slate-300 font-medium">{t.hero.stat1Sub}</p>
          </div>
          <div className="space-y-1 border-l border-slate-800 pl-4 md:pl-0">
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 font-mono">{t.hero.stat2}</p>
            <p className="text-xs md:text-sm text-slate-300 font-medium">{t.hero.stat2Sub}</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0">
            <p className="text-3xl md:text-4xl font-extrabold text-amber-400 font-mono">{t.hero.stat3}</p>
            <p className="text-xs md:text-sm text-slate-300 font-medium">{t.hero.stat3Sub}</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 border-l border-slate-800 pt-4 md:pt-0 pl-4 md:pl-0">
            <p className="text-3xl md:text-4xl font-extrabold text-blue-400 font-mono">{t.hero.stat4}</p>
            <p className="text-xs md:text-sm text-slate-300 font-medium">{t.hero.stat4Sub}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
