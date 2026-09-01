import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../types';
import { Globe, Menu, X, Shield, Calendar, Users, HelpCircle, BarChart3, Award } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'phases', label: t.nav.phases, icon: Award },
    { id: 'dates', label: t.nav.dates, icon: Calendar },
    { id: 'walkthrough', label: t.nav.walkthrough, icon: Users },
    { id: 'privacy', label: t.nav.privacy, icon: Shield },
    { id: 'insights', label: t.nav.insights, icon: BarChart3 },
    { id: 'faq', label: t.nav.faq, icon: HelpCircle },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const currentLang = supportedLanguages.find(l => l.code === language) || supportedLanguages[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-amber-600"></div>
        <div className="bg-white"></div>
        <div className="bg-emerald-600"></div>
      </div>

      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Government of India &bull; Ministry of Home Affairs
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300">Office of the Registrar General & Census Commissioner, India</span>
          <span className="ml-auto bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
            CENSUS 2027 SIMULATION
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            onClick={() => handleItemClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-700 p-0.5 shadow-md flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex flex-col items-center justify-center">
                <span className="text-orange-400 text-xs font-black tracking-tighter">2027</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">INDIA</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg md:text-xl text-slate-900 tracking-tight">
                  {t.nav.brand}
                </span>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200 hidden sm:inline-block">
                  Digital 1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-normal">
                {t.nav.subBrand}
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive 
                      ? 'text-orange-600 bg-orange-50 font-semibold' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-xs md:text-sm font-semibold border border-slate-300 transition-colors focus:ring-2 focus:ring-orange-500 focus:outline-hidden cursor-pointer"
                aria-label="Change Language"
              >
                <Globe className="w-4 h-4 text-orange-600" />
                <span className="font-bold">{currentLang.nativeName}</span>
                <span className="text-xs text-slate-500 uppercase">({currentLang.code})</span>
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Select Language / भाषा चुनें
                  </div>
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-orange-50 transition-colors cursor-pointer ${
                        language === lang.code ? 'bg-orange-50/80 text-orange-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-slate-400">{lang.name}</span>
                      </div>
                      {language === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleItemClick('walkthrough')}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>{t.nav.startBtn}</span>
              <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded font-mono">5m</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleItemClick('walkthrough')}
              className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-lg font-semibold text-sm shadow-sm cursor-pointer"
            >
              {t.nav.startBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
