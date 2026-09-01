import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp, PhoneCall, ExternalLink } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    {
      q: 'How do I verify if an enumerator visiting my home is genuine?',
      a: 'Official Census enumerators will carry a Government Issued QR Identity Card and official Census 2027 tablet/bag. You can scan their ID badge using the official mobile app to verify their credentials on the spot.'
    },
    {
      q: 'What language options are supported in the digital self-enumeration portal?',
      a: 'The self-enumeration portal and mobile application support 6 major Indian languages: English, Hindi, Tamil, Bengali, Telugu, and Marathi.'
    }
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#E5DFD5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A45] tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-normal">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FDFBF7] rounded-lg border border-[#E5DFD5] shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-[#162A45] text-sm sm:text-base hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-[#F2ECE1] text-[#162A45] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#B83A24]' : 'text-stone-400'}`} />
                </button>

                <div 
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#E5DFD5] bg-[#FAF7F2]">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpline Banner */}
        <div className="bg-[#162A45] text-white rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-[#233854]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#233854] border border-[#354D6E] text-[#E6C280] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white">Need Official Assistance?</h4>
              <p className="text-xs text-stone-300">Available 8:00 AM &ndash; 8:00 PM (All 7 Days) in 6 languages</p>
              <p className="text-base font-mono font-bold text-[#E6C280] mt-1">1800-180-2027 (Toll-Free)</p>
            </div>
          </div>
          <a
            href="https://censusindia.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#233854] hover:bg-[#2C4669] text-white text-xs font-semibold border border-[#354D6E] transition-colors shrink-0"
          >
            <span>Visit Census Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
