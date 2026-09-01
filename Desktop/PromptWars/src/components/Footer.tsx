import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#121E31] text-stone-400 border-t border-[#1C2C44] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#1C2C44]">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#B83A24] text-white font-mono font-bold flex items-center justify-center text-xs shadow-xs">
                2027
              </div>
              <div>
                <h4 className="font-serif text-white font-bold text-base tracking-tight">
                  {t.nav.brand}
                </h4>
                <p className="text-xs text-stone-400">{t.nav.subBrand}</p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              {t.footer.disclaimer}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#95C8A6] bg-[#1E3326] px-3 py-1 rounded border border-[#2B4B38]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#95C8A6]" />
              <span>Census Act 1948 Statutory Privacy Safeguard</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              Navigation
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#phases" className="hover:text-white transition-colors">Two Phases Breakdown</a>
              </li>
              <li>
                <a href="#dates" className="hover:text-white transition-colors">State-wise Schedule</a>
              </li>
              <li>
                <a href="#walkthrough" className="hover:text-white transition-colors">Self-Enumeration Wizard</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Trust & Privacy Center</a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors">Historical Census Trends</a>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              Official Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://censusindia.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#E6C280] transition-colors"
                >
                  <span>Census India (ORGI)</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://mha.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#E6C280] transition-colors"
                >
                  <span>Ministry of Home Affairs</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://digitalindia.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#E6C280] transition-colors"
                >
                  <span>Digital India Platform</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-stone-400">
                {t.footer.helpline}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{t.footer.simulatedNotice}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
