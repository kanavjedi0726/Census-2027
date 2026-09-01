import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, PhoneCall, Globe, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-900">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                2027
              </div>
              <div>
                <h4 className="text-white font-extrabold text-base tracking-tight">
                  {t.nav.brand}
                </h4>
                <p className="text-xs text-slate-500">{t.nav.subBrand}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t.footer.disclaimer}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-md border border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Census Act 1948 Statutory Privacy Safeguard</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#phases" className="hover:text-white transition-colors">Two Phases Breakdown</a>
              </li>
              <li>
                <a href="#dates" className="hover:text-white transition-colors">State-wise Dates Directory</a>
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
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Official Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://censusindia.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-orange-400 transition-colors"
                >
                  <span>Census India (ORGI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://mha.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-orange-400 transition-colors"
                >
                  <span>Ministry of Home Affairs</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://digitalindia.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-orange-400 transition-colors"
                >
                  <span>Digital India Platform</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                {t.footer.helpline}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{t.footer.simulatedNotice}</span>
          </div>
        </div>

        {/* Subtle Tricolor Bottom Strip */}
        <div className="h-1 w-full grid grid-cols-3 rounded-full overflow-hidden opacity-60">
          <div className="bg-amber-600"></div>
          <div className="bg-white"></div>
          <div className="bg-emerald-600"></div>
        </div>

      </div>
    </footer>
  );
};
