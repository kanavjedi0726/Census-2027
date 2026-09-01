import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { censusMythsData, privacyMatrixData } from '../data/mythsData';
import { ShieldAlert, Lock, CheckCircle2, XCircle, AlertTriangle, Scale } from 'lucide-react';

export const TrustPrivacyCenter: React.FC = () => {
  const { t } = useLanguage();
  const [activeMythId, setActiveMythId] = useState<string | null>(null);

  const collectedItems = privacyMatrixData.filter(i => i.status === 'collected');
  const neverAskedItems = privacyMatrixData.filter(i => i.status === 'never_asked');

  return (
    <section id="privacy" className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A45] tracking-tight">
            {t.trust.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-normal">
            {t.trust.subtitle}
          </p>
        </div>

        {/* Legal Safeguard Hero Card (Section 15 Census Act) */}
        <div className="bg-[#162A45] text-white rounded-lg p-6 md:p-10 shadow-sm border border-[#233854] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            <div className="w-14 h-14 rounded-lg bg-[#233854] border border-[#354D6E] text-[#E6C280] flex items-center justify-center shrink-0">
              <Scale className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#233854] text-[#E6C280] text-xs font-semibold px-2.5 py-0.5 rounded border border-[#354D6E]">
                  Statutory Confidentiality
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                  {t.trust.confidentialityTitle}
                </h3>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed">
                {t.trust.confidentialityDesc}
              </p>
            </div>
          </div>
        </div>

        {/* What We Collect vs What We NEVER Ask Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* WHAT WE COLLECT */}
          <div className="bg-[#FDFBF7] rounded-lg p-6 md:p-8 border border-[#C5DEC8] shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#EBF4EE] text-[#26533A] border border-[#C5DEC8] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.trust.whatWeCollectTitle}</h3>
                <p className="text-xs text-stone-500">{t.trust.whatWeCollectDesc}</p>
              </div>
            </div>

            <div className="space-y-3">
              {collectedItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-md bg-[#FAF7F2] border border-[#E5DFD5] hover:border-[#C5DEC8] transition-colors">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#26533A] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#162A45]">{item.field}</h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{item.description}</p>
                      <p className="text-xs text-[#1E432E] font-medium mt-1">
                        <strong>Why:</strong> {item.whyNeeded}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT WE NEVER ASK */}
          <div className="bg-[#FDFBF7] rounded-lg p-6 md:p-8 border border-[#E8D2C5] shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#F7EFE9] text-[#B83A24] border border-[#E8D2C5] flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.trust.whatWeNeverAskTitle}</h3>
                <p className="text-xs text-stone-500">{t.trust.whatWeNeverAskDesc}</p>
              </div>
            </div>

            <div className="space-y-3">
              {neverAskedItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-md bg-[#FAF7F2] border border-[#E5DFD5] hover:border-[#E8D2C5] transition-colors">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#B83A24] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#7A2818]">{item.field}</h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{item.description}</p>
                      <p className="text-xs text-[#B83A24] font-semibold mt-1">
                        <strong>Safeguard:</strong> {item.safeguard}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Fraud Warning Box */}
              <div className="p-4 rounded-md bg-[#FAF1E4] border border-[#E8D4B8] text-xs text-[#784A12] flex items-start gap-2.5 mt-4">
                <AlertTriangle className="w-5 h-5 text-[#B36B15] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Citizen Safety Advisory:</strong> If any individual claims to be a census official and requests money, OTPs, or banking details, report immediately to the National Cyber Crime Helpline (1930) or your local police station.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Myth-Busters Section */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#162A45]">
              {t.trust.mythsTitle}
            </h3>
            <p className="text-sm text-stone-600 font-normal">
              {t.trust.mythsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {censusMythsData.map((myth) => {
              return (
                <div
                  key={myth.id}
                  className="bg-[#FDFBF7] rounded-lg p-6 border border-[#E5DFD5] shadow-xs hover:shadow-sm transition-all space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-[#F2ECE1] text-stone-700">
                      Topic: {myth.category}
                    </span>
                    <span className="text-xs text-[#B83A24] font-semibold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Common Misconception
                    </span>
                  </div>

                  <div className="p-3 bg-[#F7EFE9] border border-[#E8D2C5] rounded-md text-xs font-semibold text-[#7A2818] leading-relaxed">
                    {myth.rumor}
                  </div>

                  <div className="p-4 bg-[#EBF4EE] border border-[#C5DEC8] rounded-md text-xs text-[#1E432E] leading-relaxed space-y-2">
                    <div className="flex items-center gap-1.5 text-[#1E432E] font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#26533A]" />
                      <span>Legal & Fact Check:</span>
                    </div>
                    <p>{myth.truth}</p>
                    <p className="text-[11px] text-stone-500 pt-1 border-t border-[#C5DEC8]">
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
