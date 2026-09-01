import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { censusMythsData, privacyMatrixData } from '../data/mythsData';
import { ShieldCheck, ShieldAlert, Lock, CheckCircle2, XCircle, AlertTriangle, Scale, FileText, ChevronRight, HelpCircle } from 'lucide-react';

export const TrustPrivacyCenter: React.FC = () => {
  const { t } = useLanguage();
  const [activeMythId, setActiveMythId] = useState<string | null>(null);

  const collectedItems = privacyMatrixData.filter(i => i.status === 'collected');
  const neverAskedItems = privacyMatrixData.filter(i => i.status === 'never_asked');

  return (
    <section id="privacy" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            Legal & Citizen Security
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.trust.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.trust.subtitle}
          </p>
        </div>

        {/* Legal Safeguard Hero Card (Section 15 Census Act) */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <Scale className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  INDIAN FEDERAL LAW
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {t.trust.confidentialityTitle}
                </h3>
              </div>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {t.trust.confidentialityDesc}
              </p>
            </div>
          </div>
        </div>

        {/* What We Collect vs What We NEVER Ask Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* WHAT WE COLLECT */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-emerald-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t.trust.whatWeCollectTitle}</h3>
                <p className="text-xs text-slate-500">{t.trust.whatWeCollectDesc}</p>
              </div>
            </div>

            <div className="space-y-3">
              {collectedItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.field}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
                      <p className="text-[11px] text-emerald-700 font-medium mt-1">
                        <strong>Why:</strong> {item.whyNeeded}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT WE NEVER ASK */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-rose-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t.trust.whatWeNeverAskTitle}</h3>
                <p className="text-xs text-slate-500">{t.trust.whatWeNeverAskDesc}</p>
              </div>
            </div>

            <div className="space-y-3">
              {neverAskedItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 hover:border-rose-300 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-rose-950">{item.field}</h4>
                      <p className="text-xs text-slate-700 mt-0.5">{item.description}</p>
                      <p className="text-[11px] text-rose-700 font-semibold mt-1">
                        <strong>Safeguard:</strong> {item.safeguard}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Fraud Warning Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5 mt-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Cyber Advisory:</strong> If any individual claims to be a census official and requests money, OTPs, or bank details, report immediately to the National Cyber Crime Portal (1930) or your local police station.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Myth-Busters Interactive Section */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.trust.mythsTitle}
            </h3>
            <p className="text-sm text-slate-600">
              {t.trust.mythsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {censusMythsData.map((myth) => {
              const isRevealed = activeMythId === myth.id;
              return (
                <div
                  key={myth.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                      Category: {myth.category}
                    </span>
                    <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Rumor Check
                    </span>
                  </div>

                  <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-xs font-semibold text-rose-950 leading-relaxed">
                    {myth.rumor}
                  </div>

                  <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>The Fact & Reality:</span>
                    </div>
                    <p>{myth.truth}</p>
                    <p className="text-[10px] text-slate-500 pt-1 border-t border-emerald-200">
                      <strong>Reference:</strong> {myth.legalReference}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
