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
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E5DFD5] shadow-xs">
      {/* Official Gov Header */}
      <div className="bg-[#162A45] text-stone-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-[#0F1E32]">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="inline-flex items-center gap-1.5 text-[#E6C280] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#26533A]"></span>
            Government of India &bull; Ministry of Home Affairs
          </span>
          <span className="hidden md:inline text-stone-500">|</span>
          <span className="hidden md:inline text-stone-300 text-[11px]">Office of the Registrar General & Census Commissioner, India</span>
          <span className="ml-auto bg-[#233854] text-[#E6C280] px-2.5 py-0.5 rounded text-[11px] font-medium tracking-normal border border-[#354D6E]">
            Census 2027 Simulation
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Emblem */}
          <div 
            onClick={() => handleItemClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-lg bg-[#162A45] border border-[#233854] flex items-center justify-center text-white shadow-xs group-hover:bg-[#B83A24] transition-colors">
              <div className="flex flex-col items-center justify-center leading-none">
                <span className="text-[#E6C280] text-[11px] font-mono font-bold">2027</span>
                <span className="text-[9px] text-stone-300 tracking-wider mt-0.5">INDIA</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg md:text-xl text-[#162A45] tracking-tight group-hover:text-[#B83A24] transition-colors">
                  {t.nav.brand}
                </span>
                <span className="bg-[#F2ECE1] text-[#7A2818] text-[11px] font-medium px-2 py-0.5 rounded border border-[#E0D5C1] hidden sm:inline-block">
                  Official Guide
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block font-normal">
                {t.nav.subBrand}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    isActive 
                      ? 'text-[#B83A24] bg-[#F7EFE9] font-semibold border-b-2 border-[#B83A24]' 
                      : 'text-stone-700 hover:text-[#162A45] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#B83A24]' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Selector & CTA */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 bg-[#F2ECE1] hover:bg-[#EAE2D4] text-[#162A45] px-3 py-2 rounded-md text-xs md:text-sm font-medium border border-[#DCD2C0] transition-colors focus:ring-2 focus:ring-[#B83A24] focus:outline-hidden cursor-pointer"
                aria-label="Change Language"
              >
                <Globe className="w-4 h-4 text-[#B83A24]" />
                <span className="font-semibold">{currentLang.nativeName}</span>
                <span className="text-xs text-stone-500 uppercase">({currentLang.code})</span>
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-[#FAF7F2] rounded-lg shadow-lg border border-[#DCD2C0] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-xs font-semibold text-stone-500 border-b border-[#E8E0D2]">
                    Select Language / ???? ?????
                  </div>
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-[#F2ECE1] transition-colors cursor-pointer ${
                        language === lang.code ? 'bg-[#EFE7D8] text-[#B83A24] font-bold' : 'text-stone-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-stone-400">{lang.name}</span>
                      </div>
                      {language === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-[#B83A24]"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleItemClick('walkthrough')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#B83A24] hover:bg-[#9C2F1C] active:scale-98 text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-md shadow-xs transition-all cursor-pointer"
            >
              <span>{t.nav.startBtn}</span>
              <span className="text-xs bg-black/15 px-1.5 py-0.5 rounded font-mono">5m</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-[#F2ECE1] focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5DFD5] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'bg-[#F2ECE1] text-[#B83A24] font-semibold' : 'text-stone-700 hover:bg-[#F2ECE1]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#B83A24]' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#E5DFD5]">
            <button
              onClick={() => handleItemClick('walkthrough')}
              className="w-full flex items-center justify-center gap-2 bg-[#B83A24] hover:bg-[#9C2F1C] text-white py-3 rounded-md font-semibold text-sm shadow-xs cursor-pointer"
            >
              {t.nav.startBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
